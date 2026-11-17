<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { clamp, planeScale } from '#lib/core/visuals/svg-math.js';
  import { gridHandle } from '../_shared/grid-handle.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { ptTex, ptText, ratioTex, ratioText } from '../_shared/transform.js';
  import { K_VALUES, NAMES, TRIANGLE, homothetyNote, scaled } from './engine.js';

  const plane = planeScale({ xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const { mx, my } = plane;
  const LIMIT = 3;
  const BLUE = '#4f46e5';
  const RED = '#e11d48';
  const GREEN = '#059669';
  const QUICK = [-1, -0.5, 0.5, 2];

  let o = $state({ x: 0, y: 0 });
  let index = $state(K_VALUES.indexOf(2));

  const k = $derived(K_VALUES[index]);
  const img = $derived(scaled(o, k));
  const offBoard = $derived(img.some((p) => Math.abs(p.x) > 9 || Math.abs(p.y) > 9));

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

  const label = $derived(
    `Mặt phẳng Oxy. Tâm vị tự I${ptText(o)}, tỉ số k = ${ratioText(k)}. ` +
      `Tam giác ABC có ảnh ${img.map((p, i) => `${NAMES[i]}'${ptText(p)}`).join(', ')}.`,
  );
</script>

<div class="space-y-4">
  <SliderField
    label="Tỉ số vị tự k"
    bind:value={index}
    min={0}
    max={K_VALUES.length - 1}
    format={(i) => ratioText(K_VALUES[i])}
  />
  <div class="flex flex-wrap gap-2">
    {#each QUICK as q (q)}
      <button
        type="button"
        class={k === q ? button.primary : button.quiet}
        aria-pressed={k === q}
        onclick={() => (index = K_VALUES.indexOf(q))}>k = {ratioText(q)}</button
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
        stroke-opacity="0.4"
        stroke-dasharray="3 3"
      />
      <line
        x1={mx(o.x)}
        y1={my(o.y)}
        x2={mx(img[i].x)}
        y2={my(img[i].y)}
        stroke={RED}
        stroke-opacity="0.4"
        stroke-dasharray="3 3"
      />
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
      aria-label="Tâm vị tự I{ptText(o)}: kéo hoặc dùng phím mũi tên"
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

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p>
      <Tex
        math={`V_{(I,\\ ${ratioTex(k)})}:\\quad ${img.map((p, i) => `${NAMES[i]}'${ptTex(p)}`).join(',\\ ')}`}
      />
    </p>
    <p>
      <Tex
        math={`\\overrightarrow{IA'} = ${ratioTex(k)}\\,\\overrightarrow{IA},\\quad \\overrightarrow{A'B'} = ${ratioTex(k)}\\,\\overrightarrow{AB}`}
      />
    </p>
  </div>
  <FeedbackNote tone={Math.abs(k) === 1 ? 'ok' : 'info'} text={homothetyNote(k)} />
  {#if offBoard}
    <FeedbackNote
      tone="warn"
      text="Một phần của tam giác $A'B'C'$ nằm ngoài bảng. Kéo tâm vị tự $I$ lại gần tam giác $ABC$ hoặc chọn $|k|$ nhỏ hơn."
    />
  {/if}
</div>
