<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import { measureText, questionText, workingText } from './time-measure.js';

  /**
   * A time-measure operation set out in columns, worked one question at a
   * time: the child taps the answer of each step (the number of a unit, or
   * whether to change units), the result row fills in and each answered step
   * joins the work log. A wrong tap shows the step's hint.
   * @type {{ workings: import('./time-measure.js').Working[] }}
   */
  let { workings } = $props();

  let index = $state(0);
  let at = $state(0);
  /** @type {number | null} */
  let wrong = $state(null);

  const w = $derived(workings[index % workings.length]);
  const finished = $derived(at >= w.steps.length);
  const step = $derived(finished ? null : w.steps[at]);
  const passed = $derived(w.steps.slice(0, at));
  const top = $derived([...passed].reverse().find((s) => s.top)?.top ?? null);
  const cells = $derived([...passed].reverse().find((s) => s.cells)?.cells ?? {});
  const second = $derived(typeof w.b === 'number' ? null : w.b);

  const note = $derived.by(() => {
    if (finished) {
      return /** @type {const} */ ({ tone: 'ok', text: `Đúng rồi! ${workingText(w)}.` });
    }
    if (wrong !== null && step) {
      return /** @type {const} */ ({ tone: 'warn', text: `Chưa đúng. ${step.hint}` });
    }
    return /** @type {const} */ ({ tone: 'info', text: step?.ask ?? '' });
  });

  /** @type {HTMLElement | undefined} */
  let choices = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  /** @param {number} i */
  async function choose(i) {
    if (!step) return;
    if (i !== step.answer) {
      wrong = i;
      return;
    }
    wrong = null;
    at += 1;
    await tick();
    if (at >= w.steps.length) nextButton?.focus();
    else choices?.querySelector('button')?.focus();
  }

  async function next() {
    index += 1;
    at = 0;
    wrong = null;
    await tick();
    choices?.querySelector('button')?.focus();
  }

  /** @param {number | undefined} v */
  const cell = (v) => (v === undefined ? '?' : fmt(v));
</script>

<div class="space-y-4">
  <div
    class="mx-auto w-fit rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="{questionText(w)}. Kết quả: {finished
      ? measureText(w.result, w.pair)
      : 'đang tính'}."
  >
    <div class="grid grid-cols-[2rem_auto_auto_auto_auto] items-end gap-x-2 gap-y-1">
      {#if top}
        <span></span>
        <span class="text-right text-lg text-rose-600">{fmt(top.big)}</span>
        <span></span>
        <span class="text-right text-lg text-rose-600">{fmt(top.small)}</span>
        <span></span>
      {/if}
      <span></span>
      <span class="text-right {top ? 'text-slate-400 line-through' : ''}">{fmt(w.a.big)}</span>
      <span class="text-lg font-semibold text-slate-600">{w.pair.big}</span>
      <span class="text-right {top ? 'text-slate-400 line-through' : ''}">{fmt(w.a.small)}</span>
      <span class="text-lg font-semibold text-slate-600">{w.pair.small}</span>

      <span class="text-indigo-700">{w.op}</span>
      {#if second}
        <span class="text-right">{fmt(second.big)}</span>
        <span class="text-lg font-semibold text-slate-600">{w.pair.big}</span>
        <span class="text-right">{fmt(second.small)}</span>
        <span class="text-lg font-semibold text-slate-600">{w.pair.small}</span>
      {:else}
        <span class="col-span-4 text-left">{fmt(/** @type {number} */ (w.b))}</span>
      {/if}

      <span class="col-span-5 h-0.5 bg-slate-700"></span>

      <span></span>
      <span class="text-right {cells.big === undefined ? 'text-slate-300' : 'text-emerald-700'}"
        >{cell(cells.big)}</span
      >
      <span class="text-lg font-semibold text-slate-600">{w.pair.big}</span>
      <span class="text-right {cells.small === undefined ? 'text-slate-300' : 'text-emerald-700'}"
        >{cell(cells.small)}</span
      >
      <span class="text-lg font-semibold text-slate-600">{w.pair.small}</span>
    </div>
  </div>

  {#if passed.length > 0}
    <ol class="mx-auto max-w-md list-decimal space-y-1 pl-6 text-lg text-slate-700">
      {#each passed as s, i (i)}
        <li>{s.done}</li>
      {/each}
    </ol>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if step}
    <div class="grid gap-2 sm:grid-cols-2" role="group" aria-label={step.ask} bind:this={choices}>
      {#each step.options as label, i (label)}
        <button
          type="button"
          class="min-h-14 rounded-xl border-2 px-3 text-xl font-semibold {focusRing} {wrong === i
            ? 'border-amber-500 bg-amber-50 text-amber-900'
            : 'border-indigo-300 bg-white text-indigo-900 hover:bg-indigo-50'}"
          onclick={() => choose(i)}>{label}</button
        >
      {/each}
    </div>
  {:else}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Phép tính khác</button
      >
    </div>
  {/if}
</div>
