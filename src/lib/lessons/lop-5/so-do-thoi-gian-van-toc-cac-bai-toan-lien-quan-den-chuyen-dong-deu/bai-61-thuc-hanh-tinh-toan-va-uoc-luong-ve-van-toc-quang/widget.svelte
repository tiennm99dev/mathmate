<script>
  import { onDestroy, tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    LATE_STOP,
    RUNS,
    compareText,
    readTime,
    resultOptions,
    taskText,
    timingNote,
    trueTime,
    workText,
  } from './engine.js';

  /**
   * A pretend stopwatch: a child runs a stretch or a lap at a hidden speed;
   * the learner starts and stops the watch, then picks the speed (v = s : t)
   * or the lap (s = v × t) worked out from the time read.
   */

  /** @type {import('./engine.js').Mode} */
  let mode = $state('van-toc');
  let pick = $state(0);
  let phase = $state(/** @type {'ready' | 'running' | 'stopped' | 'answered'} */ ('ready'));
  let elapsed = $state(0);
  let read = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let crossed = $state(false);
  /** @type {HTMLButtonElement | undefined} */
  let stopButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let startButton = $state();

  const runs = $derived(RUNS[mode]);
  const run = $derived(runs[pick % runs.length]);
  const real = $derived(trueTime(run));
  const choice = $derived(resultOptions(mode, run, read));

  /** @type {(() => void) | null} */
  let stop = null;
  onDestroy(() => stop?.());

  function reset() {
    stop?.();
    stop = null;
    phase = 'ready';
    elapsed = 0;
    read = 0;
    wrong = [];
    crossed = false;
  }

  async function start() {
    reset();
    phase = 'running';
    stop = frameLoop((dt) => {
      elapsed += dt;
      if (!crossed && elapsed >= real) crossed = true;
      if (elapsed >= real + LATE_STOP) halt();
    });
    await tick();
    stopButton?.focus();
  }

  async function halt() {
    if (phase !== 'running') return;
    stop?.();
    stop = null;
    read = readTime(elapsed);
    phase = 'stopped';
    await tick();
    document.getElementById(`${uid}-opt-0`)?.focus();
  }

  /** @param {number} i */
  function choose(i) {
    if (phase !== 'stopped' || wrong.includes(i)) return;
    if (i === choice.answer) phase = 'answered';
    else wrong = [...wrong, i];
  }

  async function nextRun() {
    pick += 1;
    reset();
    await tick();
    startButton?.focus();
  }

  /** @param {string | number} v */
  function setMode(v) {
    mode = v === 'quang-duong' ? 'quang-duong' : 'van-toc';
    pick = 0;
    reset();
  }

  const uid = $props.id();

  // The drawing: a straight track with the finish line, or an oval lap whose
  // finish is its start.
  const W = 360;
  const START = 34;
  const FINISH = 290;
  const CX = 180;
  const CY = 68;
  const RX = 140;
  const RY = 48;

  /** How far along the run the child is, 1 at the line. */
  const along = $derived(elapsed / real);

  const spot = $derived.by(() => {
    if (mode === 'van-toc') {
      return { x: Math.min(W - 8, START + along * (FINISH - START)), y: 92 };
    }
    // Clockwise from the bottom of the oval, where the line is.
    const a = Math.PI / 2 + along * 2 * Math.PI;
    return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
  });

  const watchText = $derived(
    formatFixed(phase === 'running' ? Math.floor(elapsed * 10) / 10 : read, 1),
  );

  const note = $derived.by(() => {
    if (phase === 'ready') {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Em bấm "Bắt đầu" khi bạn xuất phát, rồi bấm "Dừng" đúng lúc bạn chạm vạch đích.',
      };
    }
    if (phase === 'running') {
      return {
        tone: /** @type {const} */ ('info'),
        text: crossed ? 'Bạn đã chạm vạch đích! Bấm "Dừng" ngay!' : 'Đồng hồ đang chạy…',
      };
    }
    if (phase === 'answered') {
      return { tone: /** @type {const} */ ('ok'), text: compareText(mode, run, read) };
    }
    if (wrong.length > 0) {
      return {
        tone: /** @type {const} */ ('warn'),
        text:
          mode === 'van-toc'
            ? `Chưa đúng. Vận tốc = quãng đường : thời gian. Em tính ${formatFixed(run.s, 0)} : ${formatFixed(read, 1)} rồi làm tròn đến hàng phần mười.`
            : `Chưa đúng. Quãng đường = vận tốc × thời gian. Em tính ${formatNumber(run.v)} × ${formatFixed(read, 1)}.`,
      };
    }
    return timingNote(run, read);
  });

  const optionClass = `min-h-14 rounded-2xl border-2 px-3 text-xl font-bold tabular-nums ${focusRing}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Em muốn tính gì?"
    options={[
      { value: 'van-toc', label: 'Tính vận tốc' },
      { value: 'quang-duong', label: 'Ước lượng một vòng' },
    ]}
    value={mode}
    onchange={setMode}
  />

  <p class="text-xl font-semibold text-slate-800">{taskText(mode, run)}</p>

  <svg
    viewBox="0 0 {W} 150"
    class="w-full rounded-2xl bg-emerald-50"
    role="img"
    aria-label={mode === 'van-toc'
      ? `Đường chạy thẳng dài ${run.s} m, ${run.who} ${phase === 'running' ? (crossed ? 'đã qua vạch đích' : 'đang chạy') : phase === 'ready' ? 'ở vạch xuất phát' : 'đã dừng'}.`
      : `Một vòng sân, vạch xuất phát cũng là vạch đích, ${run.who} ${phase === 'running' ? (crossed ? 'đã chạy hết một vòng' : 'đang chạy') : phase === 'ready' ? 'ở vạch xuất phát' : 'đã dừng'}.`}
  >
    {#if mode === 'van-toc'}
      <rect x="10" y="78" width={W - 20} height="30" rx="6" fill="#fca5a5" />
      <line x1={START} y1="74" x2={START} y2="112" stroke="#ffffff" stroke-width="3" />
      <line
        x1={FINISH}
        y1="74"
        x2={FINISH}
        y2="112"
        stroke="#1e293b"
        stroke-width="4"
        stroke-dasharray="4 4"
      />
      <text x={START} y="132" font-size="13" text-anchor="middle" fill="#334155">Xuất phát</text>
      <text x={FINISH} y="132" font-size="13" text-anchor="middle" fill="#334155">Đích</text>
      <text x={(START + FINISH) / 2} y="66" font-size="15" text-anchor="middle" fill="#334155"
        >{run.s} m</text
      >
    {:else}
      <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="#fca5a5" stroke-width="18" />
      <ellipse cx={CX} cy={CY} rx={RX - 30} ry={RY - 22} fill="#86efac" />
      <line
        x1={CX}
        y1={CY + RY - 12}
        x2={CX}
        y2={CY + RY + 12}
        stroke="#1e293b"
        stroke-width="4"
        stroke-dasharray="4 4"
      />
      <text x={CX} y={CY + RY + 28} font-size="13" text-anchor="middle" fill="#334155"
        >Xuất phát và đích</text
      >
      <text x={CX} y={CY + 5} font-size="15" text-anchor="middle" fill="#166534">Một vòng: ? m</text
      >
    {/if}
    <g transform="translate({spot.x} {spot.y})">
      <circle r="11" fill="#4f46e5" stroke="#ffffff" stroke-width="2" />
      <text y="5" font-size="13" font-weight="700" text-anchor="middle" fill="#ffffff"
        >{run.who[0]}</text
      >
    </g>
  </svg>

  <div class="flex flex-wrap items-center justify-center gap-3">
    <p
      class="min-w-36 rounded-2xl bg-slate-900 px-4 py-2 text-center font-mono text-3xl text-lime-300 tabular-nums"
      aria-label="Đồng hồ bấm giờ: {watchText} giây"
    >
      {watchText} s
    </p>
    {#if phase === 'running'}
      <button
        type="button"
        bind:this={stopButton}
        class="min-h-14 min-w-28 text-xl {button.primary}"
        onclick={halt}>Dừng</button
      >
    {:else}
      <button
        type="button"
        bind:this={startButton}
        class="min-h-14 min-w-28 text-xl {button.primary}"
        onclick={start}>{phase === 'ready' ? 'Bắt đầu' : 'Bấm lại'}</button
      >
    {/if}
  </div>

  {#if phase === 'stopped' || phase === 'answered'}
    <div class="space-y-2">
      <p class="text-xl text-slate-800" id="{uid}-ask">
        {mode === 'van-toc'
          ? `${run.who} ${run.doing} hết ${formatFixed(read, 1)} giây. Vận tốc của ${run.who} khoảng bao nhiêu?`
          : `${run.who} ${run.doing} hết ${formatFixed(read, 1)} giây. Một vòng dài khoảng bao nhiêu mét?`}
      </p>
      <div class="grid grid-cols-2 gap-2" role="group" aria-labelledby="{uid}-ask">
        {#each choice.options as opt, i (opt)}
          <button
            type="button"
            id="{uid}-opt-{i}"
            class="{optionClass} {phase === 'answered' && i === choice.answer
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : wrong.includes(i)
                ? 'border-amber-400 bg-amber-50 text-amber-800 line-through'
                : 'border-indigo-200 bg-white text-indigo-900 hover:bg-indigo-50'}"
            aria-disabled={phase === 'answered' || wrong.includes(i)}
            onclick={() => choose(i)}>{opt}</button
          >
        {/each}
      </div>
      {#if phase === 'answered'}
        <p class="text-center text-xl font-semibold text-slate-800">{workText(mode, run, read)}</p>
      {/if}
    </div>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if phase === 'answered'}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextRun}
        >Bạn khác</button
      >
    </div>
  {/if}
</div>
