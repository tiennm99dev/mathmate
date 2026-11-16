<script>
  import { tick } from 'svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import {
    TASKS,
    candidates,
    exprText,
    isRight,
    optionsOf,
    resultStep,
    tex,
    tryDenominator,
  } from './engine.js';

  let index = $state(0);
  /** The common denominator found, once a right one is picked. */
  let common = $state(/** @type {number | null} */ (null));
  /** The denominator tapped last, right or not. */
  let tried = $state(/** @type {number | null} */ (null));
  let solved = $state(false);
  /** Result options already tried and wrong. */
  let wrong = $state(/** @type {number[]} */ ([]));
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();

  const task = $derived(TASKS[index % TASKS.length]);
  const choices = $derived(candidates(task));
  const attempt = $derived(tried === null ? null : tryDenominator(task, tried));
  const step = $derived(
    solved && common !== null
      ? resultStep(task, common)
      : common !== null
        ? tryDenominator(task, common)
        : (attempt ?? {
            bars: [
              { numerator: task.a, denominator: task.b, label: `${task.a}/${task.b}` },
              { numerator: task.c, denominator: task.d, label: `${task.c}/${task.d}` },
            ],
            text: `Hai băng ${tex(task.a, task.b)} và ${tex(task.c, task.d)} chia thành số phần khác nhau, chưa ${task.op === '+' ? 'gộp' : 'bớt'} được.`,
          }),
  );
  const options = $derived(common === null ? [] : optionsOf(task, common, index));
  const note = $derived(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ (
      solved
        ? { tone: 'ok', text: 'Đúng rồi! Băng xanh là kết quả.' }
        : common !== null
          ? wrong.length > 0
            ? { tone: 'warn', text: 'Chưa đúng. Em đếm lại số phần tô màu trên hai băng.' }
            : {
                tone: 'info',
                text: `Hai băng đã cùng mẫu số. Em chọn kết quả của phép ${task.op === '+' ? 'cộng' : 'trừ'}.`,
              }
          : attempt && !attempt.ok
            ? { tone: 'warn', text: 'Em chọn một số khác làm mẫu số chung.' }
            : {
                tone: 'info',
                text: 'Em chọn mẫu số chung: số chia hết cho cả hai mẫu số.',
              }
    ),
  );

  async function focusControls() {
    await tick();
    /** @type {HTMLButtonElement | null | undefined} */ (
      controls?.querySelector('button:not(:disabled)')
    )?.focus();
  }

  /** @param {number} m */
  function chooseDenominator(m) {
    tried = m;
    if (tryDenominator(task, m).ok) {
      common = m;
      focusControls();
    }
  }

  /** @param {number} i */
  function pick(i) {
    if (isRight(task, options[i])) solved = true;
    else wrong = [...wrong, i];
    focusControls();
  }

  function nextTask() {
    index += 1;
    common = null;
    tried = null;
    solved = false;
    wrong = [];
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
    {:else if common === null}
      <p class="mb-2 text-center text-lg font-semibold text-slate-700">Mẫu số chung là:</p>
      <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Chọn mẫu số chung">
        {#each choices as m (m)}
          <button
            type="button"
            class="min-h-14 min-w-14 text-2xl font-bold {tried === m
              ? button.secondary
              : button.quiet}"
            aria-pressed={tried === m}
            onclick={() => chooseDenominator(m)}>{m}</button
          >
        {/each}
      </div>
    {:else}
      <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn kết quả">
        {#each options as o, i (i)}
          <button
            type="button"
            class="min-h-20 text-xl {button.quiet}"
            aria-label="{o.n} phần {o.d}"
            disabled={wrong.includes(i)}
            onclick={() => pick(i)}><Frac n={o.n} d={o.d} size="lg" /></button
          >
        {/each}
      </div>
    {/if}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
