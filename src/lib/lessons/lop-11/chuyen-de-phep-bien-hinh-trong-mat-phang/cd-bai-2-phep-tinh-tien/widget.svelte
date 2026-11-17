<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { clamp, planeScale } from '#lib/core/visuals/svg-math.js';
  import { gridHandle } from '../_shared/grid-handle.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { clipLine, ptText, translate } from '../_shared/transform.js';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import {
    CIRCLE,
    LINE,
    TRIANGLE,
    U_LIMIT,
    translateLine,
    translationNote,
    workTex,
  } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -6, yMax: 6 });
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const O = { x: 0, y: 0 };
  const P_ON_LINE = { x: -2, y: 0 };
  const BLUE = '#4f46e5';
  const RED = '#e11d48';
  const GREEN = '#059669';

  /** @type {'tam-giac' | 'duong-tron' | 'duong-thang'} */
  let figure = $state('tam-giac');
  let u = $state({ x: 3, y: 2 });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const uOpts = $derived(
    gridHandle({
      at: u,
      plane,
      svg: () => svgEl ?? null,
      onmove: (g) => (u = { x: clamp(g.x, -U_LIMIT, U_LIMIT), y: clamp(g.y, -U_LIMIT, U_LIMIT) }),
    }),
  );

  const triImg = $derived(TRIANGLE.map((p) => translate(p, u)));
  const kImg = $derived(translate(CIRCLE.centre, u));
  const d = clipLine(LINE, plane);
  const dImg = $derived(clipLine(translateLine(LINE, u), plane));
  const lines = $derived(workTex(figure, u));

  const label = $derived(
    `Mặt phẳng Oxy với vectơ u${ptText(u)} vẽ từ gốc O. ` +
      (figure === 'tam-giac'
        ? `Tam giác ABC có ảnh A'${ptText(triImg[0])}, B'${ptText(triImg[1])}, C'${ptText(triImg[2])}.`
        : figure === 'duong-tron'
          ? `Đường tròn tâm K${ptText(CIRCLE.centre)} có ảnh là đường tròn tâm K'${ptText(kImg)}, bán kính ${CIRCLE.r}.`
          : 'Đường thẳng d và ảnh d′ của nó.'),
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hình cần tịnh tiến"
    bind:value={figure}
    options={[
      { value: 'tam-giac', label: 'Tam giác' },
      { value: 'duong-tron', label: 'Đường tròn' },
      { value: 'duong-thang', label: 'Đường thẳng' },
    ]}
  />

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if figure === 'tam-giac'}
      {#each TRIANGLE as p, i (i)}
        <VectorArrow from={px(p)} to={px(triImg[i])} color="#94a3b8" dashed width={1.6} />
      {/each}
      <PlaneFigure {plane} points={TRIANGLE} names={['A', 'B', 'C']} color={BLUE} />
      <PlaneFigure
        {plane}
        points={triImg}
        names={["A'", "B'", "C'"]}
        color={RED}
        dashed
        fill={0.08}
      />
    {:else if figure === 'duong-tron'}
      <circle
        cx={mx(CIRCLE.centre.x)}
        cy={my(CIRCLE.centre.y)}
        r={CIRCLE.r * plane.unit}
        fill={BLUE}
        fill-opacity="0.1"
        stroke={BLUE}
        stroke-width="2"
      />
      <circle
        cx={mx(kImg.x)}
        cy={my(kImg.y)}
        r={CIRCLE.r * plane.unit}
        fill={RED}
        fill-opacity="0.06"
        stroke={RED}
        stroke-width="2"
        stroke-dasharray="6 4"
      />
      <VectorArrow from={px(CIRCLE.centre)} to={px(kImg)} color="#94a3b8" dashed width={1.6} />
      <PlaneFigure {plane} points={[CIRCLE.centre]} names={['K']} color={BLUE} closed={false} />
      <PlaneFigure {plane} points={[kImg]} names={["K'"]} color={RED} closed={false} />
    {:else}
      {#if d}
        <line
          x1={mx(d[0].x)}
          y1={my(d[0].y)}
          x2={mx(d[1].x)}
          y2={my(d[1].y)}
          stroke={BLUE}
          stroke-width="2.5"
        />
      {/if}
      {#if dImg}
        <line
          x1={mx(dImg[0].x)}
          y1={my(dImg[0].y)}
          x2={mx(dImg[1].x)}
          y2={my(dImg[1].y)}
          stroke={RED}
          stroke-width="2.5"
          stroke-dasharray="7 5"
        />
      {/if}
      <VectorArrow
        from={px(P_ON_LINE)}
        to={px(translate(P_ON_LINE, u))}
        color="#94a3b8"
        dashed
        width={1.6}
      />
      <PlaneFigure {plane} points={[P_ON_LINE]} names={['P']} color={BLUE} closed={false} />
      <PlaneFigure
        {plane}
        points={[translate(P_ON_LINE, u)]}
        names={["P'"]}
        color={RED}
        closed={false}
      />
    {/if}

    <VectorArrow from={px(O)} to={px(u)} color={GREEN} width={3} name="u" />
    <g
      class="drag-handle"
      role="button"
      tabindex="0"
      aria-label="Ngọn vectơ u, toạ độ {ptText(u)}: kéo hoặc dùng phím mũi tên"
      style="cursor:grab; outline:none"
      use:draggable={uOpts}
    >
      <circle
        class="drag-knob"
        cx={mx(u.x)}
        cy={my(u.y)}
        r="8"
        fill={GREEN}
        fill-opacity="0.25"
        stroke={GREEN}
        stroke-width="2.5"
      />
    </g>
  </CoordinatePlane>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    {#each lines as line, i (i)}
      <p><Tex math={line} /></p>
    {/each}
  </div>
  <FeedbackNote tone="info" text={translationNote(figure, u)} />
</div>
