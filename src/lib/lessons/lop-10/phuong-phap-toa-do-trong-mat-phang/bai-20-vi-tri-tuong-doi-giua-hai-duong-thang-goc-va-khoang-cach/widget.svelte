<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import {
    coordText,
    distance,
    footOn,
    intersect,
    lineTex,
    lineText,
    lineThrough,
    relationOf,
    valueText,
  } from '../_shared/coords.js';
  import LinePath from '../_shared/line-path.svelte';
  import PointHandle from '../_shared/point-handle.svelte';
  import { BOX, angleTex, anglePath, distanceTex, relationText } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const C1 = '#4f46e5';
  const C2 = '#e11d48';
  const CM = '#059669';

  let mode = $state('hai-duong');
  let pts = $state([
    { x: -5, y: -3 },
    { x: 3, y: 1 },
    { x: -2, y: 4 },
    { x: 2, y: -4 },
  ]);
  let M = $state({ x: -1, y: 3 });
  const NAMES = ['A', 'B', 'C', 'D'];

  const l1 = $derived(lineThrough(pts[0], pts[1]));
  const l2 = $derived(lineThrough(pts[2], pts[3]));
  const kind = $derived(relationOf(l1, l2));
  const I = $derived(intersect(l1, l2));
  const ang = $derived(angleTex(l1, l2));
  const arc = $derived(anglePath(l1, l2, px, 1.2));
  const H = $derived(footOn(M, l1));
  const d = $derived(distance(M, l1));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  /** The two points of a line must stay apart. @param {number} i */
  const movePoint = (i) => (/** @type {{ x: number, y: number }} */ g) => {
    const other = pts[i % 2 === 0 ? i + 1 : i - 1];
    if (g.x !== other.x || g.y !== other.y) pts[i] = g;
  };
  /** @param {{ x: number, y: number }} g */
  const moveM = (g) => (M = g);

  const shown = $derived(mode === 'hai-duong' ? [0, 1, 2, 3] : [0, 1]);
  const note = $derived(
    mode === 'hai-duong'
      ? relationText(l1, l2)
      : d === 0
        ? '$M$ nằm trên $\\Delta$, nên $d(M, \\Delta) = 0$.'
        : `Đoạn $MH$ vuông góc với $\\Delta$ tại $H$; độ dài của nó là khoảng cách $d(M, \\Delta)$.`,
  );
  const label = $derived(
    mode === 'hai-duong'
      ? `Hai đường thẳng: Δ1 qua A và B, ${lineText(l1)}; Δ2 qua C và D, ${lineText(l2)}.`
      : `Đường thẳng Δ qua A và B, ${lineText(l1)}, và điểm M${coordText(M.x, M.y)}, cách Δ ${valueText(d)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem"
    bind:value={mode}
    options={[
      { value: 'hai-duong', label: 'Vị trí và góc' },
      { value: 'khoang-cach', label: 'Khoảng cách' },
    ]}
  />

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if mode === 'hai-duong'}
      {#if kind === 'cat' && arc}
        <path
          d={arc}
          fill="#f59e0b"
          fill-opacity="0.3"
          stroke="#d97706"
          style="pointer-events:none"
        />
      {/if}
      <LinePath line={l2} {plane} color={C2} name="Δ₂" />
      <LinePath line={l1} {plane} color={C1} name="Δ₁" />
      {#if I}
        <circle cx={mx(I.x)} cy={my(I.y)} r="4.5" fill="#0f172a" style="pointer-events:none" />
      {/if}
    {:else}
      <LinePath line={l1} {plane} color={C1} name="Δ" />
      <line
        x1={mx(M.x)}
        y1={my(M.y)}
        x2={mx(H.x)}
        y2={my(H.y)}
        stroke={CM}
        stroke-width="2.5"
        stroke-dasharray="6 4"
        style="pointer-events:none"
      />
      <circle cx={mx(H.x)} cy={my(H.y)} r="4" fill={CM} style="pointer-events:none" />
      <text
        x={mx(H.x) + 8}
        y={my(H.y) + 16}
        font-size="13"
        font-weight="700"
        fill={CM}
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none">H</text
      >
      <PointHandle at={M} name="M" {plane} {svg} onmove={moveM} color={CM} />
    {/if}
    {#each shown as i (i)}
      <PointHandle
        at={pts[i]}
        name={NAMES[i]}
        {plane}
        {svg}
        onmove={movePoint(i)}
        color={i < 2 ? C1 : C2}
        labelDx={i % 2 === 0 ? -10 : 10}
        labelDy={i % 2 === 0 ? 18 : -10}
      />
    {/each}
  </CoordinatePlane>

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    {#if mode === 'hai-duong'}
      <p><Tex math={`\\Delta_1: ${lineTex(l1)},\\quad \\vec n_1 = (${l1.a};\\ ${l1.b})`} /></p>
      <p><Tex math={`\\Delta_2: ${lineTex(l2)},\\quad \\vec n_2 = (${l2.a};\\ ${l2.b})`} /></p>
      <p><Tex math={ang.cos} /></p>
      <p><Tex math={ang.value} /></p>
      <p><Tex math={ang.angle} /></p>
    {:else}
      <p><Tex math={`\\Delta: ${lineTex(l1)}`} /></p>
      <p><Tex math={distanceTex(M, l1)} /></p>
    {/if}
  </div>
  <div aria-live="polite">
    <FeedbackNote tone={mode === 'hai-duong' && kind !== 'cat' ? 'warn' : 'info'} text={note} />
  </div>
</div>
