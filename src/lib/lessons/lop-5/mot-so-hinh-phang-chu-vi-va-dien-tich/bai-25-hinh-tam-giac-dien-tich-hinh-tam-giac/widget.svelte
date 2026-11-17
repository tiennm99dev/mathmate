<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { num } from '../_shared/figures.js';
  import {
    BASE_ROW,
    B_COL,
    CELL,
    COLS,
    GOALS,
    H,
    ROWS,
    START,
    W,
    areaOf,
    baseOf,
    boardLabel,
    footOf,
    goalNote,
    goalText,
    heightOf,
    kindText,
    nextTrail,
    snapA,
    snapC,
  } from './engine.js';

  const A = $state({ x: START.ax * CELL, y: START.ay * CELL });
  const C = $state({ x: START.c * CELL, y: BASE_ROW * CELL });
  const B = { x: B_COL * CELL, y: BASE_ROW * CELL };

  let goal = $state(0);
  let showRect = $state(false);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const tri = $derived({ ax: A.x / CELL, ay: A.y / CELL, c: C.x / CELL });
  let trail = $state(nextTrail({ key: '', cols: [] }, START));
  const track = () => (trail = nextTrail(trail, tri));

  const want = $derived(GOALS[goal % GOALS.length]);
  const tried = $derived(trail.key === `${tri.ay},${tri.c}` ? trail.cols.length : 1);
  const note = $derived(goalNote(want, tri, tried));
  const foot = $derived({ x: A.x, y: B.y });
  const footKind = $derived(footOf(tri));
  const toward = $derived((B.x + C.x) / 2 >= foot.x ? 1 : -1);
  const ghosts = $derived(
    want.id === 'ngang' && trail.key === `${tri.ay},${tri.c}`
      ? trail.cols.filter((c) => c !== tri.ax)
      : [],
  );

  const dragA = {
    point: A,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: CELL,
    keyShiftStep: CELL * 2,
    projector: snapA,
    onChange: track,
  };
  const dragC = {
    point: C,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: CELL,
    keyShiftStep: CELL * 2,
    projector: snapC,
    onChange: track,
  };

  const gridX = Array.from({ length: COLS - 1 }, (_, i) => (i + 1) * CELL);
  const gridY = Array.from({ length: ROWS - 1 }, (_, i) => (i + 1) * CELL);
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">{goalText(want)}</p>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label={boardLabel(tri)}
  >
    {#each gridX as x (x)}
      <line x1={x} y1="0" x2={x} y2={H} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each gridY as y (y)}
      <line x1="0" y1={y} x2={W} y2={y} stroke="#E2E8F0" stroke-width="1" />
    {/each}

    <!-- the line through A parallel to BC -->
    <line
      x1="0"
      y1={A.y}
      x2={W}
      y2={A.y}
      stroke="#A5B4FC"
      stroke-width="2"
      stroke-dasharray="6 6"
    />

    {#if showRect}
      <rect
        x={B.x}
        y={A.y}
        width={C.x - B.x}
        height={B.y - A.y}
        fill="#FEF3C7"
        stroke="#D97706"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
    {/if}

    {#each ghosts as gx (gx)}
      <polygon
        points={pointsAttr([{ x: gx * CELL, y: A.y }, B, C])}
        fill="none"
        stroke="#94A3B8"
        stroke-width="2"
        stroke-dasharray="4 4"
      />
    {/each}

    {#if footKind === 'ngoai'}
      <line
        x1={foot.x < B.x ? foot.x : C.x}
        y1={B.y}
        x2={foot.x < B.x ? B.x : foot.x}
        y2={B.y}
        stroke="#334155"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
    {/if}

    <polygon
      points={pointsAttr([A, B, C])}
      fill="#C7D2FE"
      fill-opacity="0.75"
      stroke="#4338CA"
      stroke-width="3"
    />
    <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#047857" stroke-width="5" />

    {#if footKind !== 'dau'}
      <line
        x1={A.x}
        y1={A.y}
        x2={foot.x}
        y2={foot.y}
        stroke="#DC2626"
        stroke-width="3"
        stroke-dasharray="7 5"
      />
    {/if}
    <path
      d="M {foot.x + toward * 10} {foot.y} V {foot.y - 10} H {foot.x}"
      fill="none"
      stroke="#DC2626"
      stroke-width="2"
    />

    {#if footKind !== 'dau'}
      <text
        x={foot.x}
        y={foot.y + 22}
        text-anchor="middle"
        font-size="18"
        font-weight="700"
        fill="#DC2626">H</text
      >
    {/if}
    <text x={B.x - 6} y={B.y + 22} text-anchor="end" font-size="18" font-weight="700" fill="#1F2937"
      >B</text
    >
    <text
      x={(B.x + C.x) / 2}
      y={B.y + 24}
      text-anchor="middle"
      font-size="15"
      font-weight="600"
      fill="#047857">{baseOf(tri)} cm</text
    >
    <text
      x={foot.x + (toward > 0 ? -8 : 8)}
      y={(A.y + foot.y) / 2 + 5}
      text-anchor={toward > 0 ? 'end' : 'start'}
      font-size="15"
      font-weight="600"
      fill="#DC2626">{heightOf(tri)} cm</text
    >

    <DragPoint
      drag={dragC}
      r={10}
      color="#047857"
      name="C"
      nameDx={10}
      nameDy={24}
      label="Đỉnh C trên đáy, đáy BC dài {baseOf(
        tri,
      )} cm. Kéo hoặc bấm phím mũi tên trái, phải để đổi độ dài đáy."
    />
    <DragPoint
      drag={dragA}
      r={10}
      name="A"
      nameDx={-6}
      nameDy={-14}
      label="Đỉnh A, chiều cao {heightOf(tri)} cm. Kéo hoặc bấm phím mũi tên để dời đỉnh A."
    />
  </GeometryBoard>

  <div class="rounded-2xl bg-indigo-50 px-4 py-3 text-center text-xl text-slate-800">
    <p>
      Đáy <strong class="text-emerald-700">BC = {baseOf(tri)} cm</strong>, chiều cao
      <strong class="text-red-700">AH = {heightOf(tri)} cm</strong>
    </p>
    <p class="mt-1 font-bold">
      S = {baseOf(tri)} × {heightOf(tri)} : 2 = {num(areaOf(tri))} (cm²)
    </p>
    <p class="mt-1 text-lg">{kindText(tri)}</p>
    {#if showRect}
      <p class="mt-1 text-lg text-amber-800">
        Hình chữ nhật cùng đáy, cùng chiều cao: {baseOf(tri)} × {heightOf(tri)} = {baseOf(tri) *
          heightOf(tri)} (cm²). Tam giác bằng một nửa hình chữ nhật đó.
      </p>
    {/if}
  </div>

  <KidNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      aria-pressed={showRect}
      onclick={() => (showRect = !showRect)}
      >{showRect ? 'Ẩn hình chữ nhật' : 'Hiện hình chữ nhật cùng đáy, cùng chiều cao'}</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {note.tone === 'ok' ? button.primary : button.secondary}"
      onclick={() => (goal += 1)}>Thử thách khác</button
    >
  </div>
</div>
