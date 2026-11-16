<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { rayDirection } from '../_shared/space.js';
  import { SHAPES, facts, figure, flattens, project } from './engine.js';

  /**
   * A virtual lamp casts parallel rays in the direction l onto the ground
   * plane (P). A square, an equilateral triangle or a circle held in a tilted
   * plane above (P) throws its parallel projection; turning and tilting l
   * shows what every projection keeps (parallel lines, midpoints, ratios on
   * parallel segments) and what it changes (angles, lengths).
   */

  const FIGURE = '#4F46E5';
  const IMAGE = '#D97706';
  const RAY = '#94A3B8';

  /** @type {import('./engine.js').Shape} */
  let shape = $state('vuong');
  let azimuth = $state(30);
  let elevation = $state(60);
  let view = $state({ yaw: -30, pitch: 26 });

  const dir = $derived(rayDirection(azimuth, elevation));
  const fig = $derived(figure(shape));
  const image = $derived(project(fig.points, dir));
  const flat = $derived(flattens(dir));
  const list = $derived(facts(shape, fig.points, image));

  const points = $derived.by(() => {
    /** @type {Record<string, import('#lib/geom-engine/solid.js').P3>} */
    const out = { ...fig.points };
    for (const [k, p] of Object.entries(image)) out[`${k}'`] = p;
    return out;
  });

  const ground = $derived.by(() => {
    const all = [...Object.values(fig.points), ...Object.values(image)];
    const xs = all.map((p) => p.x);
    const ys = all.map((p) => p.y);
    const x0 = Math.min(-2.2, ...xs) - 0.6;
    const x1 = Math.max(2.2, ...xs) + 0.6;
    const y0 = Math.min(-2.2, ...ys) - 0.6;
    const y1 = Math.max(2.2, ...ys) + 0.6;
    return [
      { x: x0, y: y0, z: 0 },
      { x: x1, y: y0, z: 0 },
      { x: x1, y: y1, z: 0 },
      { x: x0, y: y1, z: 0 },
    ];
  });

  // The frame follows the plane drawn under the figure and its shadow.
  const frame = $derived({
    centre: { x: (ground[0].x + ground[2].x) / 2, y: (ground[0].y + ground[2].y) / 2, z: 1.6 },
    radius: Math.max(4.2, Math.hypot(ground[2].x - ground[0].x, ground[2].y - ground[0].y) / 2),
  });

  const polygons = $derived([
    { key: 'P', pts: ground, fill: '#CBD5E1', opacity: 0.35, stroke: '#64748B' },
    {
      key: 'image',
      pts: fig.outline.map((k) => `${k}'`),
      fill: IMAGE,
      opacity: 0.3,
      stroke: IMAGE,
    },
    { key: 'figure', pts: fig.outline, fill: FIGURE, opacity: 0.25, stroke: FIGURE },
  ]);

  const segments = $derived.by(() => {
    /** @type {import('../_shared/space.js').SceneSegment[]} */
    const out = [];
    for (const k of fig.names) {
      out.push({ key: `ray-${k}`, from: k, to: `${k}'`, color: RAY, width: 1.2, dash: true });
    }
    const n = fig.outline.length;
    const closed = n > 4;
    fig.outline.forEach((k, i) => {
      const next = fig.outline[(i + 1) % n];
      out.push({
        key: `f-${k}`,
        from: k,
        to: next,
        color: FIGURE,
        width: closed ? 2 : 2.5,
        dash: false,
      });
      out.push({
        key: `i-${k}`,
        from: `${k}'`,
        to: `${next}'`,
        color: IMAGE,
        width: closed ? 2 : 2.5,
        dash: false,
      });
    });
    for (const [a, b] of fig.segments) {
      out.push({ key: `f-${a}${b}`, from: a, to: b, color: FIGURE, width: 1.6, dash: false });
      out.push({
        key: `i-${a}${b}`,
        from: `${a}'`,
        to: `${b}'`,
        color: IMAGE,
        width: 1.6,
        dash: false,
      });
    }
    return out;
  });

  const labels = $derived([
    ...fig.names.map((k) => ({ text: k, at: k, color: FIGURE })),
    ...fig.names.map((k) => ({ text: `${k}'`, at: `${k}'`, color: '#92400E' })),
    { text: '(P)', at: ground[1], color: '#334155', dx: -20, dy: -6 },
  ]);

  const dots = $derived(
    fig.names.flatMap((k) => [
      { at: k, color: FIGURE },
      { at: `${k}'`, color: IMAGE },
    ]),
  );

  const shapeName = $derived(SHAPES.find((s) => s.id === shape)?.label ?? '');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hình được chiếu"
    options={SHAPES.map((s) => ({ value: s.id, label: s.label }))}
    bind:value={shape}
  />
  <SpaceScene
    {points}
    {segments}
    {polygons}
    {labels}
    {dots}
    centre={frame.centre}
    radius={frame.radius}
    bind:view
    label={`${shapeName} trong một mặt phẳng nghiêng phía trên mặt phẳng chiếu P, cùng hình chiếu song song của nó theo phương l nghiêng ${elevation} độ so với P`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Hướng của phương chiếu l"
      bind:value={azimuth}
      min={0}
      max={345}
      step={15}
      unit="°"
    />
    <SliderField
      label="Góc giữa l và (P)"
      bind:value={elevation}
      min={35}
      max={90}
      step={5}
      unit="°"
    />
  </div>
  {#if flat}
    <FeedbackNote
      tone="warn"
      text="Phương chiếu $l$ song song hoặc gần song song với mặt phẳng chứa hình: hình chiếu dẹt (gần) thành một đoạn thẳng, nên ta không xét các tính chất ở đây. Hãy đổi phương chiếu."
    />
  {/if}
  <ul class="space-y-2" aria-live="polite" hidden={flat}>
    {#each list as f, i (i)}
      <li
        class="rounded-xl px-4 py-3 text-sm {f.kept
          ? 'bg-emerald-50 text-emerald-900'
          : 'bg-amber-50 text-amber-900'}"
      >
        <span class="font-semibold">{f.kept ? 'Giữ nguyên:' : 'Thay đổi:'}</span>
        <LiveRichText text={f.text} />
      </li>
    {/each}
  </ul>
</div>
