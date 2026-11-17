<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { MINUS } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { clamp, planeScale } from '#lib/core/visuals/svg-math.js';
  import { gridHandle } from '../_shared/grid-handle.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { ptText } from '../_shared/transform.js';
  import { NAMES, TRIANGLE, arcPath, imageTex, rotationNote, turned } from './engine.js';

  const plane = planeScale({ xMin: -7, xMax: 7, yMin: -7, yMax: 7 });
  const { mx, my } = plane;
  const LIMIT = 3;
  const BLUE = '#4f46e5';
  const RED = '#e11d48';
  const GREEN = '#059669';

  let o = $state({ x: 0, y: 0 });
  let deg = $state(90);

  const img = $derived(turned(o, deg));
  const half = $derived(Math.abs(deg) === 180);
  const offBoard = $derived(img.some((p) => Math.abs(p.x) > 7 || Math.abs(p.y) > 7));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const oOpts = $derived(
    gridHandle({
      at: o,
      plane,
      svg: () => svgEl ?? null,
      onmove: (g) => (o = { x: clamp(g.x, -LIMIT, LIMIT), y: clamp(g.y, -LIMIT, LIMIT) }),
    }),
  );

  /** @param {number} v */
  const degText = (v) => `${v < 0 ? MINUS : ''}${Math.abs(v)}°`;
  const label = $derived(
    `Mặt phẳng Oxy. Tâm quay I${ptText(o)}, góc quay ${degText(deg)}. ` +
      `Tam giác ABC có ảnh ${img.map((p, i) => `${NAMES[i]}'${ptText(p)}`).join(', ')}.`,
  );
</script>

<div class="space-y-4">
  <SliderField
    label="Góc quay α"
    bind:value={deg}
    min={-180}
    max={180}
    step={15}
    format={degText}
  />
  <div class="flex flex-wrap gap-2">
    {#each [-90, 0, 90, 180] as a (a)}
      <button
        type="button"
        class={deg === a ? button.primary : button.quiet}
        aria-pressed={deg === a}
        onclick={() => (deg = a)}>{degText(a)}</button
      >
    {/each}
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#each TRIANGLE as p, i (i)}
      <line
        x1={mx(o.x)}
        y1={my(o.y)}
        x2={mx(p.x)}
        y2={my(p.y)}
        stroke={BLUE}
        stroke-opacity="0.35"
        stroke-dasharray="3 3"
      />
      <line
        x1={mx(o.x)}
        y1={my(o.y)}
        x2={mx(img[i].x)}
        y2={my(img[i].y)}
        stroke={RED}
        stroke-opacity="0.35"
        stroke-dasharray="3 3"
      />
      <path d={arcPath(plane, o, p, deg)} fill="none" stroke="#94a3b8" stroke-width="1.6" />
    {/each}
    <PlaneFigure {plane} points={TRIANGLE} names={NAMES} color={BLUE} />
    <PlaneFigure
      {plane}
      points={img}
      names={NAMES.map((n) => `${n}'`)}
      color={RED}
      dashed
      fill={0.08}
    />
    <g
      class="drag-handle"
      role="button"
      tabindex="0"
      aria-label="Tâm quay I{ptText(o)}: kéo hoặc dùng phím mũi tên"
      style="cursor:grab; outline:none"
      use:draggable={oOpts}
    >
      <circle
        class="drag-knob"
        cx={mx(o.x)}
        cy={my(o.y)}
        r="8"
        fill={GREEN}
        fill-opacity="0.3"
        stroke={GREEN}
        stroke-width="2.5"
      />
    </g>
    <text
      x={mx(o.x) - 12}
      y={my(o.y) + 20}
      font-size="13"
      font-weight="700"
      text-anchor="end"
      fill={GREEN}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">I</text
    >
  </CoordinatePlane>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p>
      <Tex
        math={`${half ? `\\text{Đ}_I = ` : ''}Q_{(I,\\ ${deg}^\\circ)}:\\quad ${img.map((p, i) => imageTex(`${NAMES[i]}'`, p)).join(',\\ ')}`}
      />
    </p>
  </div>
  <FeedbackNote tone={half ? 'ok' : 'info'} text={rotationNote(o, deg)} />
  {#if offBoard}
    <FeedbackNote
      tone="warn"
      text="Một phần của tam giác $A'B'C'$ nằm ngoài bảng. Kéo tâm quay $I$ lại gần tam giác $ABC$ hơn để thấy trọn ảnh."
    />
  {/if}
</div>
