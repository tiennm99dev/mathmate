<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { gridHandle } from '../_shared/grid-handle.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { AXIS_TEXT, clipLine, ptText, reflect, samePoint } from '../_shared/transform.js';
  import {
    AXES,
    AXIS_LINE,
    SHAPES,
    START_PATH,
    axesOf,
    huntNote,
    isAxisOf,
    mirrorPath,
    penNote,
  } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -6, yMax: 6 });
  const { mx, my } = plane;
  const BLUE = '#4f46e5';
  const RED = '#e11d48';
  const AXIS = '#059669';

  let mode = $state('ve');
  /** @type {import('../_shared/transform.js').Axis} */
  let axis = $state('Oy');
  let path = $state(START_PATH.map((p) => ({ ...p })));
  let pen = $state({ x: 2, y: 4 });
  let shapeId = $state('vuong');
  /** Axes found so far, per shape. @type {Record<string, string[]>} */
  let found = $state({});

  const mirror = $derived(mirrorPath(path, axis));
  const penImg = $derived(reflect(pen, axis));
  const axisEnds = $derived(clipLine(AXIS_LINE[axis], plane));
  const shape = $derived(SHAPES.find((s) => s.id === shapeId) ?? SHAPES[0]);
  const shapeImg = $derived(mirrorPath(shape.points, axis));
  const hit = $derived(isAxisOf(shape, axis));
  const total = $derived(axesOf(shape).length);
  const foundHere = $derived(found[shape.id] ?? []);

  /**
   * Remember an axis once it has been seen to map the shape onto itself.
   * @param {string} id @param {import('../_shared/transform.js').Axis} a
   */
  function record(id, a) {
    const s = SHAPES.find((x) => x.id === id);
    const list = found[id] ?? [];
    if (s && isAxisOf(s, a) && !list.includes(a)) found[id] = [...list, a];
  }
  record('vuong', 'Oy');

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const penOpts = $derived(
    gridHandle({ at: pen, plane, svg: () => svgEl ?? null, onmove: (g) => (pen = g) }),
  );

  let said = $state('');
  function addPoint() {
    const last = path.at(-1);
    if (last && samePoint(last, pen)) {
      said = 'Điểm này đã là điểm cuối của nét vẽ. Hãy di chuyển bút.';
      return;
    }
    path.push({ ...pen });
    said = `Đã thêm điểm ${ptText(pen)}; ảnh của nó là ${ptText(penImg)}.`;
  }
  function undo() {
    path.pop();
    said = path.length ? 'Đã xoá điểm cuối.' : 'Nét vẽ trống.';
  }
  function clear() {
    path.length = 0;
    said = 'Đã xoá hết. Di chuyển bút rồi bấm "Thêm điểm" để vẽ lại.';
  }

  const axisOptions = AXES.map((a) => ({ value: a, label: AXIS_TEXT[a] }));
  const label = $derived(
    mode === 've'
      ? `Mặt phẳng Oxy, trục đối xứng ${AXIS_TEXT[axis]}. Nét vẽ có ${path.length} điểm và ảnh của nó. Bút M${ptText(pen)} có ảnh M'${ptText(penImg)}.`
      : `${shape.name} và ảnh của nó qua phép đối xứng trục ${AXIS_TEXT[axis]}${hit ? ', trùng khít với hình' : ', không trùng với hình'}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hoạt động"
    bind:value={mode}
    options={[
      { value: 've', label: 'Gương ảo' },
      { value: 'truc', label: 'Tìm trục đối xứng' },
    ]}
  />
  <SegmentedControl
    label="Trục d"
    options={axisOptions}
    bind:value={axis}
    onchange={(v) => record(shapeId, /** @type {import('../_shared/transform.js').Axis} */ (v))}
  />
  {#if mode === 'truc'}
    <SegmentedControl
      label="Hình"
      options={SHAPES.map((s) => ({ value: s.id, label: s.name }))}
      bind:value={shapeId}
      onchange={(v) => record(String(v), axis)}
    />
  {/if}

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if axisEnds}
      <line
        x1={mx(axisEnds[0].x)}
        y1={my(axisEnds[0].y)}
        x2={mx(axisEnds[1].x)}
        y2={my(axisEnds[1].y)}
        stroke={AXIS}
        stroke-width="3"
        stroke-opacity="0.7"
      />
    {/if}
    {#if mode === 've'}
      <PlaneFigure {plane} points={path} color={BLUE} closed={false} />
      <PlaneFigure {plane} points={mirror} color={RED} closed={false} />
      {#if !samePoint(pen, penImg)}
        <line
          x1={mx(pen.x)}
          y1={my(pen.y)}
          x2={mx(penImg.x)}
          y2={my(penImg.y)}
          stroke="#94a3b8"
          stroke-dasharray="4 4"
        />
      {/if}
      <PlaneFigure {plane} points={[penImg]} names={["M'"]} color={RED} closed={false} />
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Bút M{ptText(pen)}: kéo hoặc dùng phím mũi tên, rồi bấm Thêm điểm"
        style="cursor:grab; outline:none"
        use:draggable={penOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(pen.x)}
          cy={my(pen.y)}
          r="8"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="2.5"
        />
      </g>
      <text
        x={mx(pen.x) - 12}
        y={my(pen.y) - 10}
        font-size="13"
        font-weight="700"
        text-anchor="end"
        fill="#0f172a"
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none">M</text
      >
    {:else}
      <PlaneFigure {plane} points={shape.points} color={BLUE} fill={0.18} />
      <PlaneFigure {plane} points={shapeImg} color={hit ? AXIS : RED} dashed fill={0.06} />
    {/if}
  </CoordinatePlane>

  {#if mode === 've'}
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={addPoint}>Thêm điểm</button>
      <button type="button" class={button.quiet} onclick={undo} disabled={!path.length}
        >Xoá điểm cuối</button
      >
      <button type="button" class={button.quiet} onclick={clear} disabled={!path.length}
        >Xoá hết</button
      >
    </div>
    <p class="sr-only" aria-live="polite">{said}</p>
    <FeedbackNote tone="info" text={penNote(pen, axis)} />
  {:else}
    <p class="text-sm text-slate-700">
      {#if total === 0}
        Không đường thẳng nào trong bốn đường đang xét là trục đối xứng của
        {shape.name.toLowerCase()}.
      {:else}
        Trong bốn đường thẳng đang xét, đã tìm được {foundHere.length} / {total} trục đối xứng của
        {shape.name.toLowerCase()}.
      {/if}
    </p>
    <FeedbackNote tone={hit ? 'ok' : 'warn'} text={huntNote(shape, axis)} />
  {/if}
</div>
