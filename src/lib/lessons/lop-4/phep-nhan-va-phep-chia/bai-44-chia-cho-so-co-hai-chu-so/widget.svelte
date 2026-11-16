<script>
  import { tick } from 'svelte';
  import { fmt } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import DigitPad from '#lib/core/kid/digit-pad.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import DivisionSheet from '../_shared/division-sheet.svelte';
  import { quotientText, sheetRows, stepsOf } from '../_shared/division.js';
  import { FIRST, drawTask, promptOf, trialOf } from './engine.js';

  /** @typedef {import('./engine.js').Kind} Kind */

  let kind = $state(/** @type {Kind} */ ('exact'));
  let task = $state(FIRST.exact);
  let stage = $state(0);
  /** What the last try said, shown before the next question. */
  let said = $state('');
  let tone = $state(/** @type {'ok' | 'warn' | 'info'} */ ('info'));
  /** Digits tried in this round, with how they went. */
  /** @type {Array<{ digit: number, verdict: 'big' | 'small' | 'right' }>} */
  let tried = $state([]);
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const steps = $derived(stepsOf(task));
  const done = $derived(stage >= steps.length);
  const step = $derived(done ? null : steps[stage]);
  const quotient = $derived(quotientText(task, stage));
  const message = $derived(
    tone === 'warn' ? said : said ? `${said} ${promptOf(task, stage)}` : promptOf(task, stage),
  );

  /** @param {import('../_shared/division.js').Task} next */
  function start(next) {
    task = next;
    stage = 0;
    said = '';
    tone = 'info';
    tried = [];
  }

  /** @param {string | number} next */
  function chooseKind(next) {
    kind = /** @type {Kind} */ (next);
    start(FIRST[kind]);
  }

  /** The control just pressed may be gone, so focus moves to what replaced it. */
  async function refocus() {
    await tick();
    (done ? nextButton : controls?.querySelector('button'))?.focus();
  }

  /** @param {number} digit */
  function tryDigit(digit) {
    if (!step || step.kind !== 'digit') return;
    const trial = trialOf(step.partial, task.d, digit);
    tried = [...tried, { digit, verdict: trial.verdict }];
    said = trial.text;
    if (trial.verdict !== 'right') {
      tone = 'warn';
      return;
    }
    tone = 'ok';
    stage += 2;
    tried = [];
    refocus();
  }

  function bringDown() {
    said = '';
    tone = 'info';
    stage += 1;
    refocus();
  }

  const VERDICT = { big: 'quá lớn', small: 'quá bé', right: 'đúng' };
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn loại phép chia"
    hideLabel
    bind:value={kind}
    options={[
      { value: 'exact', label: 'Chia hết' },
      { value: 'rest', label: 'Có dư' },
      { value: 'big', label: 'Số bị chia lớn' },
    ]}
    onchange={chooseKind}
  />

  <div class="flex justify-center overflow-x-auto">
    <DivisionSheet
      rows={sheetRows(task, stage)}
      divisor={task.d}
      {quotient}
      label="Đặt tính {fmt(task.n)} chia {task.d}. Thương đã viết: {quotient || 'chưa có'}."
    />
  </div>

  {#if tried.length > 0}
    <p class="text-lg font-semibold text-slate-700">
      Đã thử:
      {#each tried as t, i (i)}
        <span class="mr-2 inline-block rounded-lg bg-amber-100 px-2 py-1 text-amber-900"
          >{t.digit} ({VERDICT[t.verdict]})</span
        >
      {/each}
    </p>
  {/if}

  <KidNote tone={done ? 'ok' : tone} text={message} />

  <div bind:this={controls}>
    {#if step?.kind === 'down'}
      <button type="button" class="min-h-14 w-full text-xl {button.primary}" onclick={bringDown}
        >Hạ {step.answer} xuống</button
      >
    {:else if step}
      <DigitPad label="Chọn chữ số để thử" onpick={tryDigit} />
    {/if}
  </div>

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={() => start(drawTask(Math.random, kind, task))}>Phép chia khác</button
  >
</div>
