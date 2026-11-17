<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import Calculator from '../_shared/calculator.svelte';
  import { off, press, screenValue } from '../_shared/calc.js';
  import { CHALLENGES, handInText, isRight, moneyText } from './engine.js';

  let pick = $state(/** @type {string | number} */ (0));
  let stepIndex = $state(0);
  let misses = $state(0);
  let calc = $state(off());
  let solved = $state(/** @type {number[]} */ ([]));
  let note = $state({
    tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
    text: 'Em bấm ON/C để bật máy, tính rồi bấm "Nộp kết quả".',
  });

  const c = $derived(CHALLENGES[Number(pick)]);
  const finished = $derived(stepIndex >= c.steps.length);
  const step = $derived(finished ? null : c.steps[stepIndex]);
  const allDone = $derived(solved.length === CHALLENGES.length);

  /** @param {import('../_shared/calc.js').Key} key */
  function onpress(key) {
    calc = press(calc, key);
  }

  function handIn() {
    if (!step) return;
    const shown = screenValue(calc);
    note = {
      tone: isRight(step, shown) ? 'ok' : shown === null ? 'info' : 'warn',
      text: handInText(step, shown, misses),
    };
    if (!isRight(step, shown)) {
      if (shown !== null) misses += 1;
      return;
    }
    stepIndex += 1;
    misses = 0;
    if (stepIndex >= c.steps.length && !solved.includes(Number(pick))) {
      solved = [...solved, Number(pick)];
      note = {
        tone: 'ok',
        text:
          solved.length === CHALLENGES.length
            ? 'Tuyệt vời! Em đã hoàn thành mọi thử thách mua sắm.'
            : `Xong thử thách! Em đã làm được ${solved.length}/${CHALLENGES.length} thử thách.`,
      };
    }
  }

  function openChallenge() {
    stepIndex = 0;
    misses = 0;
    calc = off();
    note = { tone: 'info', text: 'Em bấm ON/C để bật máy, tính rồi bấm "Nộp kết quả".' };
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thử thách"
    options={CHALLENGES.map((ch, i) => ({
      value: i,
      label: `${solved.includes(i) ? '✓ ' : ''}${i + 1}`,
    }))}
    bind:value={pick}
    onchange={openChallenge}
  />

  <div class="rounded-2xl bg-amber-50 p-4">
    <p class="text-lg font-bold text-amber-900">{c.title}</p>
    <p class="text-xl text-slate-900">{c.story}</p>
    <ol class="mt-2 space-y-1 text-lg">
      {#each c.steps as s, i (s.ask)}
        <li class={i === stepIndex ? 'font-bold text-indigo-800' : 'text-slate-700'}>
          {i + 1}. {s.ask}
          {#if i < stepIndex}<span class="font-bold text-emerald-700">
              {moneyText(s.value)}</span
            >{/if}
        </li>
      {/each}
    </ol>
  </div>

  <Calculator {calc} {onpress} />

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={finished}
      onclick={handIn}>Nộp kết quả</button
    >
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={openChallenge}
      >Làm lại</button
    >
  </div>

  <KidNote tone={note.tone} text={note.text} />

  {#if allDone}
    <p class="text-center text-lg font-semibold text-emerald-800">
      Em đã giải xong cả {CHALLENGES.length} thử thách.
    </p>
  {/if}
</div>
