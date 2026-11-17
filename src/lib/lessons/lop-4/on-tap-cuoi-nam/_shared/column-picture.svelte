<script>
  import { fmt } from '#lib/core/number-format.js';

  /**
   * An addition, subtraction or multiplication set out in columns, ones under
   * ones, small enough for a phone. While the question is open the result is
   * a "?"; once it has ended, the result shows under the line.
   * @type {{ a: number, b: number, op: '+' | '-' | '×', settled: boolean }}
   */
  let { a, b, op, settled } = $props();

  const result = $derived(op === '+' ? a + b : op === '-' ? a - b : a * b);
  const sign = $derived(op === '-' ? '−' : op);
  const word = $derived(op === '+' ? 'cộng' : op === '-' ? 'trừ' : 'nhân');
  const row = 'h-10 leading-10 sm:h-12 sm:leading-[3rem]';
</script>

<div class="flex justify-center">
  <div
    class="inline-flex rounded-2xl border-4 border-slate-300 bg-white px-4 py-3 text-2xl font-bold tabular-nums sm:text-3xl"
    role="img"
    aria-label="Đặt tính: {fmt(a)} {word} {fmt(b)}.{settled ? ` Kết quả: ${fmt(result)}.` : ''}"
  >
    <div class="w-7 text-slate-600" aria-hidden="true">
      <div class="h-10 sm:h-12"></div>
      <div class={row}>{sign}</div>
    </div>
    <div class="min-w-24 text-right" aria-hidden="true">
      <div class={row}>{fmt(a)}</div>
      <div class="{row} border-b-4 border-slate-700">{fmt(b)}</div>
      <div class="{row} text-indigo-700">{settled ? fmt(result) : '?'}</div>
    </div>
  </div>
</div>
