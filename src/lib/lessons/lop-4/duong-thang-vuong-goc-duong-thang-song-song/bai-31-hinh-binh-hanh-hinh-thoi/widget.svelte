<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import TickMarks from '#lib/core/visuals/tick-marks.svelte';
  import { labelSpot } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    GOALS,
    GOAL_NAME,
    GRID,
    H,
    START,
    W,
    diagonalText,
    factsOf,
    goalMessage,
    snapPoint,
  } from './engine.js';

  const NAMES = /** @type {const} */ (['A', 'B', 'C', 'D']);
  const GRAY = '#64748B';
  const PAIR1 = '#2563EB';
  const PAIR2 = '#EA580C';

  const pts = $state(structuredClone(START));
  let goal = $state(0);
  let diagonals = $state(false);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const want = $derived(GOALS[goal % GOALS.length]);
  const facts = $derived(factsOf(pts));
  const status = $derived(goalMessage(facts, want));
  const centre = $derived({
    x: (pts.A.x + pts.B.x + pts.C.x + pts.D.x) / 4,
    y: (pts.A.y + pts.B.y + pts.C.y + pts.D.y) / 4,
  });
  /** Sides AB, BC, CD, DA with their colour and equal marks. */
  const sides = $derived.by(() => {
    const c1 = facts.convex && facts.abDc ? PAIR1 : GRAY;
    const c2 = facts.convex && facts.adBc ? PAIR2 : GRAY;
    /** @type {(1 | 2 | 0)[]} */
    const ticks = facts.convex
      ? facts.allEqual
        ? [1, 1, 1, 1]
        : [facts.abEqDc ? 1 : 0, facts.adEqBc ? 2 : 0, facts.abEqDc ? 1 : 0, facts.adEqBc ? 2 : 0]
      : [0, 0, 0, 0];
    return [
      { from: pts.A, to: pts.B, color: c1, ticks: ticks[0] },
      { from: pts.B, to: pts.C, color: c2, ticks: ticks[1] },
      { from: pts.C, to: pts.D, color: c1, ticks: ticks[2] },
      { from: pts.D, to: pts.A, color: c2, ticks: ticks[3] },
    ];
  });

  /** @param {'A' | 'B' | 'C' | 'D'} name */
  function dragOf(name) {
    return {
      point: pts[name],
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      keyStep: GRID,
      keyShiftStep: GRID * 2,
      projector: snapPoint,
    };
  }

  /** @param {'A' | 'B' | 'C' | 'D'} n */
  function nameSpot(n) {
    const p = labelSpot(pts[n], centre, 22, W, H);
    return { x: p.x - 6, y: p.y + 6 };
  }

  function reset() {
    goal += 1;
    Object.assign(pts, structuredClone(START));
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Em kéo các đỉnh để tạo <strong class="text-indigo-700">{GOAL_NAME[want]}</strong> ABCD.
  </p>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Tứ giác ABCD trên lưới ô vuông. Kéo các đỉnh A, B, C, D. Hai cạnh đối diện song song được tô cùng màu, các cạnh bằng nhau có cùng số vạch."
  >
    {#each Array.from({ length: W / GRID - 1 }, (_, i) => (i + 1) * GRID) as x (x)}
      <line x1={x} y1="0" x2={x} y2={H} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each Array.from({ length: H / GRID - 1 }, (_, i) => (i + 1) * GRID) as y (y)}
      <line x1="0" y1={y} x2={W} y2={y} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    <polygon
      points={pointsAttr([pts.A, pts.B, pts.C, pts.D])}
      fill={facts.convex ? '#EEF2FF' : 'none'}
      fill-opacity="0.7"
    />
    {#if diagonals}
      <line
        x1={pts.A.x}
        y1={pts.A.y}
        x2={pts.C.x}
        y2={pts.C.y}
        stroke="#7C3AED"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
      <line
        x1={pts.B.x}
        y1={pts.B.y}
        x2={pts.D.x}
        y2={pts.D.y}
        stroke="#7C3AED"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
    {/if}
    {#each sides as side, i (i)}
      <line
        x1={side.from.x}
        y1={side.from.y}
        x2={side.to.x}
        y2={side.to.y}
        stroke={side.color}
        stroke-width="4"
        stroke-linecap="round"
      />
      {#if side.ticks}
        <TickMarks from={side.from} to={side.to} count={side.ticks} color="#0F172A" length={7} />
      {/if}
    {/each}
    {#each NAMES as n (n)}
      {@const at = nameSpot(n)}
      <text x={at.x} y={at.y} font-size="18" font-weight="700" fill="#1F2937">{n}</text>
      <DragPoint
        drag={dragOf(n)}
        r={9}
        color="#4F46E5"
        label="Đỉnh {n}. Kéo hoặc bấm phím mũi tên để dời đỉnh, mỗi bước một ô."
      />
    {/each}
  </GeometryBoard>

  <ul class="flex flex-wrap justify-center gap-2 text-base font-semibold" aria-hidden="true">
    <li class="rounded-full bg-blue-100 px-3 py-1 text-blue-900">Xanh: AB song song DC</li>
    <li class="rounded-full bg-orange-100 px-3 py-1 text-orange-900">Cam: AD song song BC</li>
    <li class="rounded-full bg-slate-100 px-3 py-1 text-slate-800">Cùng số vạch: bằng nhau</li>
  </ul>

  <KidNote tone={status.done ? 'ok' : 'info'} text={status.text} />
  {#if diagonals && diagonalText(facts)}
    <p
      class="rounded-2xl bg-violet-50 px-4 py-3 text-lg font-semibold text-violet-900"
      aria-live="polite"
    >
      {diagonalText(facts)}
    </p>
  {/if}

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      aria-pressed={diagonals}
      onclick={() => (diagonals = !diagonals)}
      >{diagonals ? 'Ẩn hai đường chéo' : 'Vẽ hai đường chéo'}</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {status.done ? button.primary : button.secondary}"
      onclick={reset}>Hình khác</button
    >
  </div>
</div>
