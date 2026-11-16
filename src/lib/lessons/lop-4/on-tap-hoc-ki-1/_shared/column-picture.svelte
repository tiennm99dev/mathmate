<script>
  import { fmt } from '#lib/core/number-format.js';

  /**
   * An addition or subtraction set out in columns, ones under ones, small
   * enough for a phone. While the question is open the result is a "?"; once
   * it has ended, the result shows under the line.
   * @type {{ a: number, b: number, op: '+' | '-', settled: boolean }}
   */
  let { a, b, op, settled } = $props();

  const result = $derived(op === '+' ? a + b : a - b);
  const sign = $derived(op === '+' ? '+' : '−');
  const word = $derived(op === '+' ? 'cộng' : 'trừ');
</script>

<div class="flex justify-center">
  <div
    class="inline-flex rounded-2xl border-4 border-slate-300 bg-white px-4 py-3 text-2xl font-bold tabular-nums sm:text-3xl"
    role="img"
    aria-label="Đặt tính: {fmt(a)} {word} {fmt(b)}.{settled ? ` Kết quả: ${fmt(result)}.` : ''}"
  >
    <div class="w-7 text-slate-600" aria-hidden="true">
      <div class="h-10 sm:h-12"></div>
      <div class="h-10 leading-10 sm:h-12 sm:leading-[3rem]">{sign}</div>
    </div>
    <div class="min-w-24 text-right">
      <div class="h-10 leading-10 sm:h-12 sm:leading-[3rem]">{fmt(a)}</div>
      <div class="h-10 border-b-4 border-slate-700 leading-10 sm:h-12 sm:leading-[3rem]">
        {fmt(b)}
      </div>
      <div class="h-10 leading-10 text-indigo-700 sm:h-12 sm:leading-[3rem]">
        {settled ? fmt(result) : '?'}
      </div>
    </div>
  </div>
</div>
