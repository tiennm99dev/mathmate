<script>
  import { onDestroy } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { button } from '#lib/core/ui.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { num } from '../_shared/figures.js';
  import {
    CELL,
    COLS,
    GOALS,
    H,
    ROWS,
    START,
    W,
    areaOf,
    boardLabel,
    copyOf,
    cornersOf,
    dragTo,
    goalNote,
    goalText,
    isRight,
  } from './engine.js';

  /** Degrees per second of the half turn. */
  const SPEED = 180;

  let trap = $state(START);
  let turn = $state(0);
  let target = $state(0);
  let goal = $state(0);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {(() => void) | null} */
  let stop = null;

  /** @param {{ x: number, y: number }} p */
  const px = (p) => ({ x: p.x * CELL, y: p.y * CELL });

  const k = $derived(cornersOf(trap));
  const P = $derived({ A: px(k.A), B: px(k.B), C: px(k.C), D: px(k.D) });
  const copy = $derived(copyOf(trap));
  const mid = $derived({ x: (P.B.x + P.C.x) / 2, y: (P.B.y + P.C.y) / 2 });
  const joined = $derived(turn === 180);
  const want = $derived(GOALS[goal % GOALS.length]);
  const note = $derived(goalNote(want, trap, joined));
  const footX = $derived(P.A.x);

  const handles = $state({
    A: px(cornersOf(START).A),
    B: px(cornersOf(START).B),
    C: px(cornersOf(START).C),
  });

  /** @param {'A' | 'B' | 'C'} name */
  function moved(name) {
    const p = handles[name];
    trap = dragTo(trap, name, { x: Math.round(p.x / CELL), y: Math.round(p.y / CELL) });
    const c = cornersOf(trap);
    Object.assign(handles.A, px(c.A));
    Object.assign(handles.B, px(c.B));
    Object.assign(handles.C, px(c.C));
  }

  /** @param {'A' | 'B' | 'C'} name */
  const dragOf = (name) => ({
    point: handles[name],
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: CELL,
    keyShiftStep: CELL * 2,
    onChange: () => moved(name),
  });

  /** @param {number} to */
  function swing(to) {
    target = to;
    stop?.();
    stop = null;
    if (reducedMotion()) {
      turn = to;
      return;
    }
    stop = frameLoop((dt) => {
      const step = SPEED * dt * (target > turn ? 1 : -1);
      const next = turn + step;
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        turn = target;
        stop?.();
        stop = null;
      } else turn = next;
    });
  }

  onDestroy(() => stop?.());

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
    label={boardLabel(trap, joined)}
  >
    {#each gridX as x (x)}
      <line x1={x} y1="0" x2={x} y2={H} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each gridY as y (y)}
      <line x1="0" y1={y} x2={W} y2={y} stroke="#E2E8F0" stroke-width="1" />
    {/each}

    {#if turn > 0}
      <polygon
        points={pointsAttr([P.A, P.B, P.C, P.D])}
        transform="rotate({turn} {mid.x} {mid.y})"
        fill="#FDE68A"
        fill-opacity="0.85"
        stroke="#B45309"
        stroke-width="3"
      />
    {/if}
    {#if joined}
      <polygon
        points={pointsAttr([P.D, px(copy.A), px(copy.D), P.A])}
        fill="none"
        stroke="#0F172A"
        stroke-width="2"
        stroke-dasharray="8 5"
      />
      <text
        x={px(copy.D).x + 6}
        y={px(copy.D).y - 6}
        font-size="16"
        font-weight="700"
        fill="#B45309">D′</text
      >
      <text
        x={px(copy.A).x + 4}
        y={px(copy.A).y + 20}
        font-size="16"
        font-weight="700"
        fill="#B45309">A′</text
      >
    {/if}

    <polygon
      points={pointsAttr([P.A, P.B, P.C, P.D])}
      fill="#C7D2FE"
      fill-opacity="0.8"
      stroke="#4338CA"
      stroke-width="3"
    />
    <line x1={P.D.x} y1={P.D.y} x2={P.C.x} y2={P.C.y} stroke="#047857" stroke-width="5" />
    <line x1={P.A.x} y1={P.A.y} x2={P.B.x} y2={P.B.y} stroke="#0369A1" stroke-width="5" />

    {#if footX < P.D.x}
      <line
        x1={footX}
        y1={P.D.y}
        x2={P.D.x}
        y2={P.D.y}
        stroke="#334155"
        stroke-width="2"
        stroke-dasharray="6 5"
      />
    {/if}
    {#if trap.dx !== 0}
      <line
        x1={footX}
        y1={P.A.y}
        x2={footX}
        y2={P.D.y}
        stroke="#DC2626"
        stroke-width="3"
        stroke-dasharray="7 5"
      />
      <text
        x={footX}
        y={P.D.y + 20}
        text-anchor="middle"
        font-size="17"
        font-weight="700"
        fill="#DC2626">H</text
      >
    {/if}
    <path
      d="M {footX + 10} {P.D.y} V {P.D.y - 10} H {footX}"
      fill="none"
      stroke="#DC2626"
      stroke-width="2"
    />
    <text
      x={footX > 60 ? footX - 6 : footX + 8}
      y={(P.A.y + P.D.y) / 2 + 5}
      text-anchor={footX > 60 ? 'end' : 'start'}
      font-size="14"
      font-weight="600"
      fill="#DC2626">{trap.h} cm</text
    >

    <text
      x={P.D.x - 4}
      y={P.D.y + 20}
      text-anchor="end"
      font-size="17"
      font-weight="700"
      fill="#1F2937">D</text
    >
    <text
      x={(P.D.x + P.C.x) / 2}
      y={P.D.y + 20}
      text-anchor="middle"
      font-size="14"
      font-weight="600"
      fill="#047857">{trap.a} cm</text
    >
    <text
      x={(P.A.x + P.B.x) / 2}
      y={P.A.y - 8}
      text-anchor="middle"
      font-size="14"
      font-weight="600"
      fill="#0369A1">{trap.b} cm</text
    >

    <DragPoint
      drag={dragOf('C')}
      r={9}
      color="#047857"
      name="C"
      nameDx={8}
      nameDy={22}
      label="Đỉnh C, đáy lớn DC dài {trap.a} cm. Kéo hoặc bấm phím mũi tên trái, phải để đổi đáy lớn."
    />
    <DragPoint
      drag={dragOf('B')}
      r={9}
      color="#0369A1"
      name="B"
      nameDx={8}
      nameDy={-10}
      label="Đỉnh B, đáy bé AB dài {trap.b} cm. Kéo hoặc bấm phím mũi tên trái, phải để đổi đáy bé."
    />
    <DragPoint
      drag={dragOf('A')}
      r={9}
      name="A"
      nameDx={-18}
      nameDy={-10}
      label="Đỉnh A, chiều cao {trap.h} cm. Kéo hoặc bấm phím mũi tên để đổi chiều cao và dời đáy bé."
    />
  </GeometryBoard>

  <div class="rounded-2xl bg-indigo-50 px-4 py-3 text-center text-xl text-slate-800">
    <p>
      {isRight(trap) ? 'Hình thang vuông' : 'Hình thang'} ABCD: đáy lớn
      <strong class="text-emerald-700">{trap.a} cm</strong>, đáy bé
      <strong class="text-sky-700">{trap.b} cm</strong>, chiều cao
      <strong class="text-red-700">{trap.h} cm</strong>
    </p>
    {#if joined}
      <p class="mt-1 text-lg text-amber-800">
        Hình bình hành: ({trap.a} + {trap.b}) × {trap.h} = {(trap.a + trap.b) * trap.h} (cm²)
      </p>
    {/if}
    <p class="mt-1 font-bold">
      S = ({trap.a} + {trap.b}) × {trap.h} : 2 = {num(areaOf(trap))} (cm²)
    </p>
  </div>

  <KidNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      aria-pressed={target === 180}
      onclick={() => swing(target === 180 ? 0 : 180)}
      >{target === 180 ? 'Tách hình thang ra' : 'Ghép thêm một hình thang'}</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {note.tone === 'ok' ? button.primary : button.secondary}"
      onclick={() => (goal += 1)}>Thử thách khác</button
    >
  </div>
</div>
