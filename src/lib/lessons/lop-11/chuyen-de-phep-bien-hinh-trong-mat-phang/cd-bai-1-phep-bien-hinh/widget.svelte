<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { clamp, planeScale } from '#lib/core/visuals/svg-math.js';
  import { gridHandle } from '#lib/core/visuals/grid-handle.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { ptText, samePoint } from '../_shared/transform.js';
  import VectorArrow from '#lib/core/visuals/vector-arrow.svelte';
  import { I, RULES, TRIANGLE, imageNote, ruleOf } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -6, yMax: 7 });
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const LIMIT = 3;

  let ruleId = $state('dich');
  let m = $state({ x: -2, y: 2 });
  let showTriangle = $state(true);

  const rule = $derived(ruleOf(ruleId));
  const img = $derived(rule.map(m));
  const triImg = $derived(TRIANGLE.map(rule.map));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const mOpts = $derived(
    gridHandle({
      at: m,
      plane,
      svg: () => svgEl ?? null,
      onmove: (g) => (m = { x: clamp(g.x, -LIMIT, LIMIT), y: clamp(g.y, -LIMIT, LIMIT) }),
    }),
  );

  const label = $derived(
    `Mặt phẳng Oxy. Quy tắc ${rule.label}. Điểm M${ptText(m)} có ảnh M'${ptText(img)}.` +
      (showTriangle
        ? ` Tam giác ABC có ảnh là hình với các đỉnh ${triImg.map(ptText).join(', ')}.`
        : ''),
  );
  const ruleOptions = RULES.map((r) => ({ value: r.id, label: r.label }));
</script>

<div class="space-y-4">
  <SegmentedControl label="Quy tắc biến hình" options={ruleOptions} bind:value={ruleId} />
  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <Tex math={rule.ruleTex} display />
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if showTriangle}
      <PlaneFigure {plane} points={TRIANGLE} names={['A', 'B', 'C']} color="#4f46e5" />
      <PlaneFigure
        {plane}
        points={triImg}
        names={["A'", "B'", "C'"]}
        color="#e11d48"
        dashed
        fill={0.08}
      />
    {/if}
    {#if ruleId === 'trung-diem'}
      <circle cx={mx(I.x)} cy={my(I.y)} r="4.5" fill="#059669" />
      <text
        x={mx(I.x) + 8}
        y={my(I.y) + 16}
        font-size="13"
        font-weight="700"
        fill="#059669"
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none">I</text
      >
    {/if}
    {#if !samePoint(m, img)}
      <VectorArrow from={px(m)} to={px(img)} color="#94a3b8" dashed width={1.8} />
    {/if}
    <circle cx={mx(img.x)} cy={my(img.y)} r="6" fill="#e11d48" />
    <text
      x={mx(img.x) + 9}
      y={my(img.y) - 9}
      font-size="13"
      font-weight="700"
      fill="#e11d48"
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">M'</text
    >
    <g
      class="drag-handle"
      role="button"
      tabindex="0"
      aria-label="Điểm M{ptText(m)}: kéo hoặc dùng phím mũi tên"
      style="cursor:grab; outline:none"
      use:draggable={mOpts}
    >
      <circle
        class="drag-knob"
        cx={mx(m.x)}
        cy={my(m.y)}
        r="8"
        fill="#fff"
        stroke="#0f172a"
        stroke-width="2.5"
      />
    </g>
    <text
      x={mx(m.x) - 12}
      y={my(m.y) - 10}
      font-size="13"
      font-weight="700"
      text-anchor="end"
      fill="#0f172a"
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">M</text
    >
  </CoordinatePlane>

  <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
    <input type="checkbox" class="h-5 w-5 accent-indigo-600" bind:checked={showTriangle} />
    Hiện tam giác ABC và ảnh của nó
  </label>

  <FeedbackNote tone="info" text={`${imageNote(rule, m)} ${rule.about}`} />
</div>
