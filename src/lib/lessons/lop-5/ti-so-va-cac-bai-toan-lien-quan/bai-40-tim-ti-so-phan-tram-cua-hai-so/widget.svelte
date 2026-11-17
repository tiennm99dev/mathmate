<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { WHOLES, barNote, percentOf, percentSteps, quizAt } from './engine.js';

  const BAR = 300;
  const X0 = 44;

  let mode = $state(/** @type {string | number} */ ('calc'));
  let whole = $state(/** @type {string | number} */ (40));
  let part = $state(18);
  let quizIndex = $state(0);
  let quiz = $state(quizAt(0, () => 0.5));
  let tries = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const asking = $derived(mode === 'quiz');
  const b = $derived(asking ? quiz.b : Number(whole));
  const a = $derived(asking ? quiz.a : Math.min(part, b));
  const p = $derived(percentOf(a, b).p);
  const steps = $derived(percentSteps(a, b));
  const solved = $derived(!asking || result?.ok === true);

  const note = $derived.by(() => {
    if (!asking) return { tone: /** @type {const} */ ('info'), text: barNote(a, b) };
    if (result)
      return {
        tone: result.ok ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
        text: result.text,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Em chia, nhân thương với 100 rồi viết kí hiệu %.',
    };
  });

  /** @param {string | number} v */
  function pickWhole(v) {
    part = Math.min(part, Number(v));
  }

  /** @param {number} i */
  async function choose(i) {
    if (result?.ok) return;
    if (i === quiz.answer) {
      result = {
        ok: true,
        text: `Đúng rồi! ${formatNumber(quiz.a)} : ${formatNumber(quiz.b)} = ${quiz.options[i]}.`,
      };
      await tick();
      nextButton?.focus();
      return;
    }
    tries += 1;
    result = {
      ok: false,
      text:
        tries >= 2
          ? `Em xem các bước nhé: ${steps.join('; ')}.`
          : 'Chưa đúng. Em đã nhân thương với 100 chưa?',
    };
  }

  function another() {
    quizIndex += 1;
    quiz = quizAt(quizIndex, Math.random);
    tries = 0;
    result = null;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'calc', label: 'Máy tính phần trăm' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
  />

  {#if asking}
    <p class="text-xl font-semibold text-slate-900">
      {quiz.story} Tìm tỉ số phần trăm của {formatNumber(quiz.a)} và {fmt(quiz.b)}.
    </p>
  {:else}
    <SegmentedControl
      label="Số thứ hai (cả)"
      options={WHOLES.map((v) => ({ value: v, label: fmt(v) }))}
      bind:value={whole}
      onchange={pickWhole}
    />
    <SliderField label="Số thứ nhất (phần)" bind:value={part} min={0} max={b} format={fmt} />
  {/if}

  <svg
    viewBox="0 0 {X0 + BAR + 16} 118"
    class="w-full max-w-xl"
    role="img"
    aria-label="Biểu đồ cột: thanh dưới là {fmt(b)}, ứng với 100%. Thanh trên là {formatNumber(
      a,
    )}{solved ? `, ứng với ${formatNumber(p)}%` : ''}."
  >
    <text x="0" y="28" class="fill-slate-800 text-[15px] font-bold">{formatNumber(a)}</text>
    <rect x={X0} y="12" width={BAR} height="24" rx="4" class="fill-slate-100" />
    <rect x={X0} y="12" width={(a / b) * BAR} height="24" rx="4" class="fill-rose-400" />
    <text x="0" y="66" class="fill-slate-800 text-[15px] font-bold">{fmt(b)}</text>
    <rect x={X0} y="50" width={BAR} height="24" rx="4" class="fill-indigo-400" />
    {#each [0, 25, 50, 75, 100] as t (t)}
      <line
        x1={X0 + (t / 100) * BAR}
        y1="8"
        x2={X0 + (t / 100) * BAR}
        y2="86"
        class="stroke-slate-500"
        stroke-dasharray="3 3"
      />
      <text
        x={X0 + (t / 100) * BAR}
        y="102"
        text-anchor="middle"
        class="fill-slate-700 text-[13px] font-semibold">{t}%</text
      >
    {/each}
  </svg>

  {#if solved}
    <ol class="space-y-1 text-lg text-slate-800" aria-label="Các bước tính">
      {#each steps as line, i (i)}
        <li>{i + 1}. {line}</li>
      {/each}
    </ol>
  {:else}
    <div class="grid grid-cols-2 gap-2" role="group" aria-label="Chọn tỉ số phần trăm">
      {#each quiz.options as opt, i (opt)}
        <button
          type="button"
          class="min-h-14 text-xl tabular-nums {button.quiet}"
          onclick={() => choose(i)}>{opt}</button
        >
      {/each}
    </div>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if asking}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {result?.ok ? button.primary : button.quiet}"
        bind:this={nextButton}
        onclick={another}>Câu khác</button
      >
    </div>
  {/if}
</div>
