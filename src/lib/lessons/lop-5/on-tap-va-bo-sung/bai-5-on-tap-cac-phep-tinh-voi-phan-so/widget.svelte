<script>
  import { tick } from 'svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import { TASKS, exprText, isRight, optionsOf, resultStep, stepsOf } from './engine.js';

  let index = $state(0);
  /** How many preparing steps are shown. */
  let shown = $state(1);
  let solved = $state(false);
  /** Options already tried and wrong. */
  let tried = $state(/** @type {number[]} */ ([]));
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();

  const task = $derived(TASKS[index % TASKS.length]);
  const steps = $derived(stepsOf(task));
  const ready = $derived(shown >= steps.length);
  const step = $derived(solved ? resultStep(task) : steps[Math.min(shown, steps.length) - 1]);
  const options = $derived(optionsOf(task, index));
  const note = $derived(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ (
      solved
        ? { tone: 'ok', text: 'Đúng rồi! Băng xanh là kết quả.' }
        : tried.length > 0
          ? { tone: 'warn', text: 'Chưa đúng. Em nhìn lại các băng và thử lần nữa.' }
          : ready
            ? { tone: 'info', text: 'Em chọn kết quả của phép tính.' }
            : { tone: 'info', text: 'Em bấm "Bước tiếp theo" để xem cách làm.' }
    ),
  );

  async function focusControls() {
    await tick();
    /** @type {HTMLButtonElement | null | undefined} */ (
      controls?.querySelector('button:not(:disabled)')
    )?.focus();
  }

  function nextStep() {
    shown += 1;
    focusControls();
  }

  /** @param {number} i */
  function pick(i) {
    if (isRight(task, options[i])) {
      solved = true;
    } else {
      tried = [...tried, i];
    }
    focusControls();
  }

  function nextTask() {
    index += 1;
    shown = 1;
    solved = false;
    tried = [];
    focusControls();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-3xl font-bold text-slate-900">
    <LiveRichText text={exprText(task)} />
  </p>

  <FractionBars bars={step.bars} interactive={false} label="Băng phân số" />

  <p class="rounded-2xl bg-slate-50 px-4 py-3 text-lg text-slate-800" aria-live="polite">
    <LiveRichText text={step.text} />
  </p>

  <div bind:this={controls}>
    {#if solved}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextTask}>
          Phép tính khác
        </button>
      </div>
    {:else if !ready}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextStep}>
          Bước tiếp theo
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn kết quả">
        {#each options as o, i (i)}
          <button
            type="button"
            class="min-h-20 text-xl {button.quiet}"
            aria-label="{o.n} phần {o.d}"
            disabled={tried.includes(i)}
            onclick={() => pick(i)}><Frac n={o.n} d={o.d} size="lg" /></button
          >
        {/each}
      </div>
    {/if}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
