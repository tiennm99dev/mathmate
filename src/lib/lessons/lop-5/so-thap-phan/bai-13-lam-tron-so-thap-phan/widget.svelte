<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    ROUND_TARGETS,
    decText,
    readDecimal,
    roundDecimal,
    toScaled,
  } from '../_shared/decimals.js';
  import {
    QUIZ,
    ROUNDINGS,
    STRETCHES,
    checkPick,
    fineText,
    marksAround,
    roundNote,
  } from './engine.js';

  const MARK = '#4f46e5';
  const GOAL = '#059669';

  let mode = $state(/** @type {string | number} */ ('drag'));
  let places = $state(/** @type {string | number} */ (1));
  let stretch = $state(0);
  /** The dragged number, scaled by 10^(places + 1), as an offset from the left mark. */
  let offset = $state(3);
  let quizIndex = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const p = $derived(Number(places));
  const scale = $derived(10 ** (p + 1));
  const lows = $derived(STRETCHES[p]);
  const low = $derived(lows[stretch % lows.length]);
  const dragText = $derived(fineText(low * 10 + offset, p));
  const quizText = $derived(QUIZ[p][quizIndex % QUIZ[p].length]);
  const quizMarks = $derived(marksAround(quizText, p));

  /** Left mark scaled by 10^(places + 1), for the line shown. */
  const lineLow = $derived(mode === 'drag' ? low * 10 : toScaled(quizMarks.low).scaled * 10);
  const shown = $derived(mode === 'drag' ? dragText : quizText);
  const target = $derived(roundDecimal(dragText, p));

  /** Marker value on the line, as the number line takes it. */
  const value = $derived(
    mode === 'drag' ? (lineLow + offset) / scale : Number(quizText.replace(',', '.')),
  );
  const marks = $derived([
    { value: lineLow / scale, color: MARK },
    { value: (lineLow + 10) / scale, color: MARK },
  ]);
  const hops = $derived(
    mode === 'drag' && offset !== 0 && offset !== 10
      ? [
          {
            from: value,
            to: (lineLow + (target === decText(low, p) ? 0 : 10)) / scale,
            label: 'làm tròn',
            color: GOAL,
          },
        ]
      : [],
  );

  /** @param {number} v */
  const tenth = (v) => Math.round(v * scale) - lineLow;

  /**
   * The labels of the two marks and the halfway point.
   * @param {number} v
   */
  const tickText = (v) => fineText(lineLow + tenth(v), p);

  /** @param {number} v */
  function drag(v) {
    offset = Math.min(10, Math.max(0, tenth(v)));
  }

  function nextStretch() {
    stretch += 1;
    offset = 3;
  }

  function resetAll() {
    stretch = 0;
    offset = 3;
    quizIndex = 0;
    result = null;
  }

  /** @param {'low' | 'high'} pick */
  function choose(pick) {
    if (result?.ok) return;
    result = checkPick(quizText, p, pick);
  }

  /** @type {HTMLElement | null} */
  let choices = $state(null);

  async function nextQuiz() {
    quizIndex += 1;
    result = null;
    await tick();
    choices?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Làm tròn đến"
    options={ROUNDINGS.map((r) => ({ value: r.places, label: r.label }))}
    bind:value={places}
    onchange={resetAll}
  />
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'drag', label: 'Kéo số' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
  />

  <p class="text-center text-4xl font-bold text-slate-900 tabular-nums">{shown}</p>

  <NumberLine
    min={lineLow / scale}
    max={(lineLow + 10) / scale}
    step={5 / scale}
    subdivisions={5}
    {value}
    interactive={mode === 'drag'}
    {marks}
    {hops}
    format={tickText}
    valueText={(v) => readDecimal(fineText(lineLow + tenth(v), p))}
    width={360}
    label="Tia số từ {fineText(lineLow, p)} đến {fineText(lineLow + 10, p)}"
    markerLabel="Số cần làm tròn"
    onchange={drag}
  />
  <p
    class="flex justify-between text-base font-bold text-indigo-700 tabular-nums"
    aria-hidden="true"
  >
    <span>Mốc {decText(lineLow / 10, p)}</span><span>Mốc {decText(lineLow / 10 + 1, p)}</span>
  </p>

  {#if mode === 'drag'}
    <FeedbackNote tone="info" text={roundNote(dragText, p)} />
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={nextStretch}>
        Đoạn tia số khác
      </button>
    </div>
  {:else}
    <p class="text-center text-lg text-slate-700">
      Làm tròn {quizText} đến {ROUND_TARGETS[p]} được số nào?
    </p>
    <div class="grid grid-cols-2 gap-2" role="group" aria-label="Chọn mốc" bind:this={choices}>
      <button
        type="button"
        class="min-h-14 text-xl tabular-nums {button.quiet}"
        onclick={() => choose('low')}>{quizMarks.low}</button
      >
      <button
        type="button"
        class="min-h-14 text-xl tabular-nums {button.quiet}"
        onclick={() => choose('high')}>{quizMarks.high}</button
      >
    </div>
    <FeedbackNote
      tone={result === null ? 'info' : result.ok ? 'ok' : 'warn'}
      text={result?.text ?? 'Em chạm vào mốc mà số được làm tròn đến.'}
    />
    {#if result?.ok}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextQuiz}>
          Số khác
        </button>
      </div>
    {/if}
  {/if}
</div>
