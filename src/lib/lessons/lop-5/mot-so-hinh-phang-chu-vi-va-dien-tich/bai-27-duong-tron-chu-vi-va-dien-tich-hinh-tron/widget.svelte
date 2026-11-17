<script>
  import { onDestroy } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { tidy } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { circumference, num } from '../_shared/figures.js';
  import {
    FULL,
    GROUND_Y,
    RADII,
    SCALE,
    START_X,
    WHEEL_H,
    WHEEL_W,
    diametersInTurn,
    trueTurn,
    rolledShown,
    turnFromX,
    wheelAt,
    wheelLabel,
    wheelNote,
  } from './engine.js';

  /** Seconds one turn takes when rolled by the button. */
  const TURN_SECONDS = 3;

  let r = $state(2);
  const handle = $state({ x: START_X, y: GROUND_Y - 2 * SCALE });
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @type {(() => void) | null} */
  let stop = null;

  const t = $derived(turnFromX(r, handle.x));
  const w = $derived(wheelAt(r, t));
  const turnLen = $derived(trueTurn(r) * SCALE);
  const note = $derived(wheelNote(r, t));
  const d = $derived(tidy(r * 2));
  const bars = $derived(diametersInTurn(r));
  const ticks = $derived(Array.from({ length: 17 }, (_, i) => i));

  /** @param {{ x: number, y: number }} p */
  const projector = (p) => ({
    x: Math.min(START_X + turnLen, Math.max(START_X, p.x)),
    y: GROUND_Y - r * SCALE,
  });

  const drag = {
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: WHEEL_W, h: WHEEL_H },
    pad: 0,
    get keyStep() {
      return turnLen / 16;
    },
    get keyShiftStep() {
      return turnLen / 4;
    },
    projector,
    onChange: () => halt(),
  };

  function halt() {
    stop?.();
    stop = null;
  }

  /** @param {number} radius */
  function pick(radius) {
    halt();
    r = radius;
    handle.x = START_X;
    handle.y = GROUND_Y - radius * SCALE;
  }

  function rollOnce() {
    halt();
    if (t >= FULL) handle.x = START_X;
    if (reducedMotion()) {
      handle.x = START_X + turnLen;
      return;
    }
    stop = frameLoop((dt) => {
      const next = handle.x + (turnLen / TURN_SECONDS) * dt;
      if (next >= START_X + turnLen) {
        handle.x = START_X + turnLen;
        halt();
      } else handle.x = next;
    });
  }

  onDestroy(halt);

  const options = RADII.map((v) => ({ value: v, label: `${num(v)} cm` }));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bán kính bánh xe"
    {options}
    value={r}
    onchange={(v) => pick(Number(v))}
  />

  <GeometryBoard
    bind:svgEl
    width={WHEEL_W}
    height={WHEEL_H}
    interactive
    maxWidth="max-w-xl"
    label={wheelLabel(r, t)}
  >
    <!-- ground and ruler in cm -->
    <line x1="0" y1={GROUND_Y} x2={WHEEL_W} y2={GROUND_Y} stroke="#475569" stroke-width="2" />
    {#each ticks as i (i)}
      {#if START_X + i * SCALE <= WHEEL_W - 4}
        <line
          x1={START_X + i * SCALE}
          y1={GROUND_Y}
          x2={START_X + i * SCALE}
          y2={GROUND_Y + (i % 5 === 0 ? 12 : 7)}
          stroke="#475569"
          stroke-width="1.5"
        />
        {#if i % 2 === 0}
          <text
            x={START_X + i * SCALE}
            y={GROUND_Y + 30}
            text-anchor="middle"
            font-size="17"
            fill="#334155">{i}</text
          >
        {/if}
      {/if}
    {/each}

    <!-- one turn: diameters laid along the ground -->
    {#each Array.from({ length: bars.whole }, (_, i) => i) as i (i)}
      <rect
        x={START_X + i * d * SCALE + 1}
        y={GROUND_Y + 40}
        width={d * SCALE - 2}
        height="10"
        rx="3"
        fill="#93C5FD"
      />
    {/each}
    <rect
      x={START_X + bars.whole * d * SCALE + 1}
      y={GROUND_Y + 40}
      width={Math.max(2, turnLen - bars.whole * d * SCALE - 2)}
      height="10"
      rx="3"
      fill="#FCA5A5"
    />
    <text x={START_X} y={GROUND_Y + 72} font-size="18" fill="#1E3A8A"
      >Một vòng = {bars.whole} đường kính và thêm {num(bars.rest)} cm</text
    >

    <!-- the painted trace -->
    <line
      x1={START_X}
      y1={GROUND_Y - 1}
      x2={START_X + w.trace}
      y2={GROUND_Y - 1}
      stroke="#DC2626"
      stroke-width="5"
      stroke-linecap="round"
    />

    <!-- the wheel -->
    <g transform="rotate({w.angle} {w.cx} {w.cy})">
      <circle cx={w.cx} cy={w.cy} r={w.R} fill="#E0E7FF" stroke="#3730A3" stroke-width="4" />
      <line x1={w.cx - w.R} y1={w.cy} x2={w.cx + w.R} y2={w.cy} stroke="#0369A1" stroke-width="3" />
      <line x1={w.cx} y1={w.cy} x2={w.cx} y2={w.cy - w.R} stroke="#047857" stroke-width="3" />
    </g>
    <circle cx={w.dot.x} cy={w.dot.y} r="6" fill="#DC2626" stroke="#fff" stroke-width="2" />
    <text x={w.cx + 6} y={w.cy + 18} font-size="17" font-weight="700" fill="#1F2937">O</text>

    <circle
      class="drag-handle"
      cx={handle.x}
      cy={handle.y}
      r="10"
      fill="#4F46E5"
      stroke="#fff"
      stroke-width="2"
      role="slider"
      tabindex="0"
      aria-label="Tâm bánh xe. Kéo hoặc bấm phím mũi tên trái, phải để lăn bánh xe."
      aria-valuemin="0"
      aria-valuemax={tidy(circumference(d), 2)}
      aria-valuenow={rolledShown(r, t)}
      aria-valuetext="Đã lăn {num(rolledShown(r, t))} cm"
      style="cursor:grab; outline:none"
      use:draggable={drag}
    />
  </GeometryBoard>

  <div class="rounded-2xl bg-indigo-50 px-4 py-3 text-center text-xl text-slate-800">
    <p>
      Bán kính <strong class="text-emerald-700">r = {num(r)} cm</strong>, đường kính
      <strong class="text-sky-700">d = {num(r)} × 2 = {num(d)} cm</strong>
    </p>
    <p class="mt-1 font-bold">C = {num(d)} × 3,14 = {num(circumference(d))} (cm)</p>
  </div>

  <KidNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-3">
    <button type="button" class="min-h-12 text-lg {button.primary}" onclick={rollOnce}>
      {t >= FULL ? 'Lăn lại một vòng' : 'Lăn một vòng'}
    </button>
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      onclick={() => {
        halt();
        handle.x = START_X;
      }}>Về chỗ cũ</button
    >
  </div>
</div>
