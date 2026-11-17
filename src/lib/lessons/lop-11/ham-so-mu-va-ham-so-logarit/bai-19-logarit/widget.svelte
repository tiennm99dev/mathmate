<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { rng } from '#lib/core/drill.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatNumber, MINUS } from '#lib/core/number-format.js';
  import { BASES } from '../_shared/plot.js';
  import { nearFraction } from '../_shared/values.js';
  import { ALPHA_MAX, ALPHA_MIN, ALPHA_STEP, challenge, convertTex, isLog } from './engine.js';

  const CHOICES = [BASES[2], BASES[3], BASES[10], BASES.half];
  const COL = 50;
  const LEFT = 35;

  let baseId = $state('2');
  let alpha = $state(3);
  let round = $state(1);
  let typed = $state('');
  let checked = $state(false);

  const base = $derived(CHOICES.find((b) => b.id === baseId) ?? CHOICES[0]);
  const sides = $derived(convertTex(base, alpha));
  const exponents = Array.from({ length: ALPHA_MAX - ALPHA_MIN + 1 }, (_, i) => ALPHA_MIN + i);

  /** @param {number} v a power written short for the ruler: '8', '1/8', '0,001' */
  function shortValue(v) {
    if (base.id === '10') return formatNumber(v, 6);
    const f = nearFraction(v);
    if (!f) return formatNumber(v, 3);
    return f.d === 1 ? `${f.n}` : `${f.n < 0 ? MINUS : ''}${Math.abs(f.n)}/${f.d}`;
  }
  /** @param {number} k */
  const colX = (k) => LEFT + (k - ALPHA_MIN) * COL;

  const quiz = $derived(challenge(rng(round * 7919 + 13), CHOICES));
  const typedValue = $derived(typed.trim() === '' ? null : readNumber(typed));
  const right = $derived(isLog(typedValue, quiz.alpha));
  const quizNote = $derived.by(() => {
    if (!checked)
      return 'Nhập kết quả rồi bấm "Kiểm tra". Có thể nhập số thập phân hoặc phân số $p/q$.';
    if (typedValue === null) return 'Hãy nhập một số, ví dụ $-2$, $1{,}5$ hay $3/2$.';
    return right
      ? `Đúng: vì $${quiz.pow}$ nên $${quiz.log}$.`
      : `Chưa đúng. Hãy tìm số mũ $\\alpha$ để luỹ thừa của cơ số bằng số đã cho, rồi thử lại.`;
  });

  function next() {
    round += 1;
    typed = '';
    checked = false;
  }
  const label = $derived(
    `Thước hai hàng: hàng trên là số mũ từ ${MINUS}3 đến 4, hàng dưới là luỹ thừa tương ứng của ${base.text}; đang chọn số mũ ${formatNumber(alpha)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cơ số a"
    options={CHOICES.map((b) => ({ value: b.id, label: b.text }))}
    bind:value={baseId}
  />
  <SliderField
    label="Số mũ α"
    bind:value={alpha}
    min={ALPHA_MIN}
    max={ALPHA_MAX}
    step={ALPHA_STEP}
  />

  <div
    class="grid gap-2 rounded-xl bg-indigo-50 p-3 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center"
  >
    <div class="overflow-x-auto"><Tex math={sides.pow} /></div>
    <div class="text-2xl font-bold text-indigo-700" aria-hidden="true">⇔</div>
    <div class="overflow-x-auto"><Tex math={sides.log} /></div>
  </div>

  <svg
    viewBox="0 0 420 96"
    class="block w-full rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={label}
  >
    <text x="6" y="30" font-size="12" fill="#475569">α</text>
    <text x="6" y="78" font-size="12" fill="#475569">aᵅ</text>
    <line x1={LEFT - 15} y1="48" x2={colX(ALPHA_MAX) + 15} y2="48" stroke="#cbd5e1" />
    {#each exponents as k (k)}
      <line x1={colX(k)} y1="40" x2={colX(k)} y2="56" stroke="#94a3b8" />
      <text x={colX(k)} y="30" font-size="13" text-anchor="middle" fill="#334155"
        >{k < 0 ? `${MINUS}${-k}` : k}</text
      >
      <text x={colX(k)} y="78" font-size="11" text-anchor="middle" fill="#334155"
        >{shortValue(base.value ** k)}</text
      >
    {/each}
    <circle cx={colX(alpha)} cy="48" r="7" fill="#e11d48" />
  </svg>
  <p class="text-sm text-slate-600">
    Mỗi bước sang phải ở hàng trên (cộng thêm 1 vào số mũ) là một lần nhân với cơ số ở hàng dưới.
    Lôgarit đọc ngược thước: từ một số ở hàng dưới, tìm số mũ ở hàng trên.
  </p>

  <div class="space-y-3 rounded-xl border border-slate-200 p-3">
    <p class="font-semibold text-slate-700">Đố em</p>
    <div class="text-center"><Tex math={`${quiz.log.split(' = ')[0]} = \\;?`} /></div>
    <div class="flex flex-wrap items-end gap-2">
      <label class="min-w-40 flex-1">
        <span class="mb-1 block text-sm font-semibold text-slate-700">Kết quả</span>
        <input
          class={textInput}
          inputmode="text"
          autocomplete="off"
          bind:value={typed}
          oninput={() => (checked = false)}
        />
      </label>
      <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button
      >
      <button type="button" class={button.quiet} onclick={next}>Câu đố mới</button>
    </div>
    <FeedbackNote tone={!checked ? 'info' : right ? 'ok' : 'warn'} text={quizNote} />
  </div>
</div>
