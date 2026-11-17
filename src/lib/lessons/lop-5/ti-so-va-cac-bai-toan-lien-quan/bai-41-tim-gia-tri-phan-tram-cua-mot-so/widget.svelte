<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import {
    ITEMS,
    MAX_OFF,
    STEP_OFF,
    discount,
    discountLines,
    quizAt,
    shopNote,
    storyLine,
  } from './engine.js';

  const BAR = 300;
  const X0 = 8;

  let mode = $state(/** @type {string | number} */ ('shop'));
  let itemIndex = $state(/** @type {string | number} */ (0));
  let off = $state(15);
  let quizIndex = $state(0);
  let quiz = $state(quizAt(0, () => 0.5));
  let tries = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const asking = $derived(mode === 'quiz');
  const item = $derived(ITEMS[Number(itemIndex)]);
  const money = $derived(discount(item.price, off));
  const lines = $derived(discountLines(item.price, off));

  const note = $derived.by(() => {
    if (!asking) return { tone: /** @type {const} */ ('info'), text: shopNote(item, off) };
    if (result)
      return {
        tone: result.ok ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
        text: result.text,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Em lấy ${formatNumber(quiz.b)} nhân với ${formatNumber(quiz.a)} rồi chia cho 100.`,
    };
  });

  /** @param {number} i */
  async function choose(i) {
    if (result?.ok) return;
    if (i === quiz.answer) {
      result = { ok: true, text: `Đúng rồi! ${storyLine(quiz)}.` };
      await tick();
      nextButton?.focus();
      return;
    }
    tries += 1;
    result = {
      ok: false,
      text:
        tries >= 2
          ? `Em xem cách tính nhé: ${storyLine(quiz)}.`
          : 'Chưa đúng. Em đã chia cho 100 chưa? Em có tìm đúng phần được hỏi không?',
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
      { value: 'shop', label: 'Cửa hàng giảm giá' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
  />

  {#if asking}
    <p class="text-xl font-semibold text-slate-900">{quiz.story} {quiz.ask}</p>
    {#if result?.ok}
      <p class="rounded-2xl bg-sky-50 px-4 py-3 text-center text-2xl font-bold text-slate-900">
        {storyLine(quiz)}
      </p>
    {:else}
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Chọn đáp án">
        {#each quiz.options as opt, i (opt)}
          <button
            type="button"
            class="min-h-14 text-xl tabular-nums {button.quiet}"
            onclick={() => choose(i)}>{opt}</button
          >
        {/each}
      </div>
    {/if}
  {:else}
    <SegmentedControl
      label="Món hàng"
      options={ITEMS.map((it, i) => ({ value: i, label: it.name }))}
      bind:value={itemIndex}
    />

    <div class="flex items-center gap-4 rounded-2xl bg-amber-50 p-4">
      <Picture name={item.picture} size={72} />
      <div class="min-w-0 text-xl">
        <p class="font-semibold text-slate-900">{item.name}</p>
        <p class="tabular-nums text-slate-700">
          Giá: <span class={off > 0 ? 'line-through' : ''}>{formatNumber(item.price)} đồng</span>
        </p>
        {#if off > 0}
          <p class="font-bold text-rose-700 tabular-nums">
            Giảm {off}%: còn {formatNumber(money.pay)} đồng
          </p>
        {/if}
      </div>
    </div>

    <SliderField
      label="Kéo để giảm giá"
      bind:value={off}
      min={0}
      max={MAX_OFF}
      step={STEP_OFF}
      unit="%"
    />

    <svg
      viewBox="0 0 {X0 * 2 + BAR} 76"
      class="w-full max-w-xl"
      role="img"
      aria-label="Thanh giá tiền: cả thanh là {formatNumber(
        item.price,
      )} đồng, ứng với 100%. Phần màu hồng là số tiền được giảm, {formatNumber(
        money.off,
      )} đồng, ứng với {off}%. Phần màu xanh là số tiền phải trả, {formatNumber(money.pay)} đồng."
    >
      <rect x={X0} y="8" width={BAR} height="32" rx="6" class="fill-emerald-400" />
      <rect
        x={X0 + BAR - (off / 100) * BAR}
        y="8"
        width={(off / 100) * BAR}
        height="32"
        rx="6"
        class="fill-rose-400"
      />
      {#each [0, 25, 50, 75, 100] as t (t)}
        <line
          x1={X0 + (t / 100) * BAR}
          y1="4"
          x2={X0 + (t / 100) * BAR}
          y2="48"
          class="stroke-slate-500"
          stroke-dasharray="3 3"
        />
        <text
          x={X0 + (t / 100) * BAR}
          y="66"
          text-anchor={t === 0 ? 'start' : t === 100 ? 'end' : 'middle'}
          class="fill-slate-700 text-[13px] font-semibold">{t}%</text
        >
      {/each}
    </svg>

    <ol class="space-y-1 text-lg text-slate-800" aria-label="Các bước tính">
      {#each lines as line, i (i)}
        <li>{i + 1}. {line}</li>
      {/each}
    </ol>
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
