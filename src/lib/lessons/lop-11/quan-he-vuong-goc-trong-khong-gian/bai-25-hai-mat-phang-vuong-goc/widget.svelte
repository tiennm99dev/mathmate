<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { sub3 } from '#lib/geom-engine/solid.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { P, angleFan } from '#lib/geom-engine/space.js';
  import { LENGTH, WIDTH, pages, rays, verdict } from './engine.js';

  /**
   * A book opened on a table: the spine is the edge a of the dihedral angle
   * [P, a, Q] formed by its two pages. Opening the book changes the angle;
   * the two rays Ox, Oy drawn from a point O of the spine measure it only
   * when they are perpendicular to the spine.
   */

  const PAGE_P = '#38BDF8';
  const PAGE_Q = '#A78BFA';
  const RAY = '#DC2626';
  const SPINE = '#0F172A';

  let open = $state(70);
  let slant = $state(90);
  let at = $state(1.5);
  let view = $state({ yaw: -55, pitch: 22 });

  const book = $derived(pages(open));
  const r = $derived(rays(open, slant, at, 1.8));
  const said = $derived(verdict(open, slant));

  const points = $derived({ O: r.O, x: r.x, y: r.y });

  const polygons = $derived.by(() => {
    const fan = angleFan(r.O, sub3(r.x, r.O), sub3(r.y, r.O), 0.8);
    return [
      { key: 'P', pts: book.P, fill: PAGE_P, opacity: 0.3, stroke: '#0284C7' },
      { key: 'Q', pts: book.Q, fill: PAGE_Q, opacity: 0.3, stroke: '#7C3AED' },
      ...(fan.length
        ? [{ key: 'fan', pts: fan, fill: '#F59E0B', opacity: 0.55, stroke: '#D97706' }]
        : []),
    ];
  });

  const segments = $derived([
    {
      key: 'a',
      from: P(-0.6, 0, 0),
      to: P(LENGTH + 0.6, 0, 0),
      color: SPINE,
      width: 3,
      dash: false,
    },
    { key: 'Ox', from: 'O', to: 'x', color: RAY, width: 2.6, dash: false },
    { key: 'Oy', from: 'O', to: 'y', color: RAY, width: 2.6, dash: false },
  ]);

  const labels = $derived([
    { text: 'O', at: 'O', dx: 0, dy: 18 },
    { text: 'x', at: 'x', color: RAY },
    { text: 'y', at: 'y', color: RAY },
    { text: 'a', at: P(LENGTH + 0.9, 0, 0), dx: 0, dy: 0 },
    { text: '(P)', at: book.P[2], color: '#0369A1' },
    { text: '(Q)', at: book.Q[2], color: '#6D28D9' },
  ]);
</script>

<div class="space-y-4">
  <SpaceScene
    {points}
    {segments}
    {polygons}
    dots={[{ at: 'O' }]}
    {labels}
    centre={{ x: LENGTH / 2, y: WIDTH / 3, z: WIDTH / 3 }}
    radius={3.4}
    bind:view
    label={`Cuốn sách mở ${open} độ, gáy sách là đường thẳng a; tia Ox trên trang (P), tia Oy trên trang (Q), tạo với gáy góc ${slant} độ`}
  />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Độ mở của cuốn sách"
      bind:value={open}
      min={10}
      max={170}
      step={5}
      unit="°"
    />
    <SliderField
      label="Góc giữa hai tia và gáy"
      bind:value={slant}
      min={30}
      max={90}
      step={5}
      unit="°"
    />
    <SliderField label="Vị trí điểm O trên gáy" bind:value={at} min={0.5} max={2.5} step={0.5} />
  </div>
  <FeedbackNote tone={said.tone} text={said.text} />
</div>
