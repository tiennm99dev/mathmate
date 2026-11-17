<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import { MAX_TRIALS, emptyRun, playTrials, probabilityDecimal, runText } from './simulation.js';

  /**
   * Runs many random trials of a chosen problem and compares the relative
   * frequency of the event E with its probability n(E)/n(Ω): a picker, the
   * counting method, batch buttons, the latest trial and a graph of the
   * frequency (trials on a log scale) against a dashed line at P(E).
   * @type {{ problems: import('./simulation.js').TrialProblem[] }}
   */
  let { problems } = $props();

  let index = $state(0);
  let run = $state(emptyRun());
  const problem = $derived(problems[index]);
  const p = $derived(problem.favourable / problem.total);
  const pickId = $props.id();

  const W = 320;
  const H = 170;
  const L = 34;
  const R = 10;
  const T = 10;
  const B = 26;
  const top = $derived(Math.max(10, run.trials));
  /** @param {number} t */
  const xOf = (t) => L + ((W - L - R) * Math.log10(t)) / Math.log10(top);
  /** @param {number} f */
  const yOf = (f) => T + (H - T - B) * (1 - f);
  const line = $derived(
    run.trace.map(([t, f]) => `${xOf(t).toFixed(1)},${yOf(f).toFixed(1)}`).join(' '),
  );
  const decades = $derived([1, 10, 100, 1000, 10000, 100000].filter((t) => t <= top));

  /** @param {number} count */
  function play(count) {
    run = playTrials(problem, run, count, Math.random);
  }

  function reset() {
    run = emptyRun();
  }

  const batches = [1, 100, 1000, 10000];
</script>

<div class="space-y-4">
  <label class="block" for={pickId}>
    <span class="mb-1 block text-sm font-semibold text-slate-700">Phép thử</span>
    <select
      id={pickId}
      class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 {focusRing}"
      bind:value={index}
      onchange={reset}
    >
      {#each problems as item, i (item.id)}
        <option value={i}>{i + 1}. {item.title}</option>
      {/each}
    </select>
  </label>

  <p class="text-slate-800"><LiveRichText text={problem.prompt} /></p>
  <p class="rounded-xl bg-indigo-50 p-3 text-sm text-indigo-950">
    <LiveRichText text={problem.method} />
  </p>

  <div class="flex flex-wrap gap-2">
    {#each batches as count (count)}
      <button
        type="button"
        class={count === 1 ? button.primary : button.secondary}
        disabled={run.trials >= MAX_TRIALS}
        onclick={() => play(count)}>{count === 1 ? 'Thử 1 lần' : `+${fmt(count)} lần`}</button
      >
    {/each}
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  {#if run.last}
    <p class="text-sm text-slate-700">Lần thử gần nhất: {run.last}</p>
  {/if}

  <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full max-w-md rounded-xl border border-slate-200 bg-white"
      role="img"
      aria-label={run.trials === 0
        ? 'Đồ thị tần suất: chưa có lần thử nào'
        : `Đồ thị tần suất của E theo số lần thử, đường nét đứt là xác suất ${probabilityDecimal(p)}; hiện tần suất là ${formatNumber(run.hits / run.trials, 4)}`}
    >
      {#each [0, 0.5, 1] as f (f)}
        <line x1={L} x2={W - R} y1={yOf(f)} y2={yOf(f)} class="stroke-slate-200" />
        <text x={L - 4} y={yOf(f) + 4} text-anchor="end" class="fill-slate-500 text-[10px]"
          >{formatNumber(f)}</text
        >
      {/each}
      {#each decades as t (t)}
        <text x={xOf(t)} y={H - 8} text-anchor="middle" class="fill-slate-500 text-[10px]"
          >{fmt(t)}</text
        >
      {/each}
      <line
        x1={L}
        x2={W - R}
        y1={yOf(p)}
        y2={yOf(p)}
        class="stroke-rose-500"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
      {#if run.trace.length > 1}
        <polyline points={line} fill="none" class="stroke-indigo-600" stroke-width="2" />
      {/if}
    </svg>
    <dl class="grid grid-cols-2 gap-x-4 gap-y-1 self-start text-sm sm:grid-cols-1">
      <dt class="text-slate-500">Số lần thử</dt>
      <dd class="font-semibold tabular-nums">{fmt(run.trials)}</dd>
      <dt class="text-slate-500">Số lần E xảy ra</dt>
      <dd class="font-semibold tabular-nums">{fmt(run.hits)}</dd>
      <dt class="text-slate-500">Tần suất của E</dt>
      <dd class="font-semibold text-indigo-700 tabular-nums">
        {run.trials === 0 ? '–' : formatNumber(run.hits / run.trials, 4)}
      </dd>
      <dt class="text-slate-500">Xác suất P(E)</dt>
      <dd class="font-semibold text-rose-600 tabular-nums">{probabilityDecimal(p)}</dd>
    </dl>
  </div>

  <FeedbackNote tone={run.trials >= 1000 ? 'ok' : 'info'} text={runText(problem, run)} />
</div>
