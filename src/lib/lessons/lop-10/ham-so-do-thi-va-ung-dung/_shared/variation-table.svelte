<script>
  import { formatNumber } from '#lib/core/number-format.js';
  import { vertexOf } from './quadratic.js';

  /**
   * The variation table (bảng biến thiên) of y = ax² + bx + c the book's
   * way: the x row −∞, −b/(2a), +∞ and the y row with arrows, the vertex
   * value at the bottom when a > 0 and at the top when a < 0.
   * @type {{ a: number, b: number, c: number }}
   */
  let { a, b, c } = $props();

  const s = $derived(vertexOf(a, b, c));
  const up = $derived(a > 0);
  const xs = $derived(formatNumber(s.x, 3));
  const ys = $derived(formatNumber(s.y, 3));
  const inf = $derived(up ? '+∞' : '−∞');
  const label = $derived(
    up
      ? `Bảng biến thiên: khi x tăng từ −∞ đến ${xs}, y giảm từ +∞ xuống ${ys}; khi x tăng từ ${xs} đến +∞, y tăng từ ${ys} lên +∞.`
      : `Bảng biến thiên: khi x tăng từ −∞ đến ${xs}, y tăng từ −∞ lên ${ys}; khi x tăng từ ${xs} đến +∞, y giảm từ ${ys} xuống −∞.`,
  );
</script>

<figure class="overflow-x-auto">
  <table class="mx-auto border-collapse text-center text-sm tabular-nums" aria-label={label}>
    <tbody>
      <tr class="border-b border-slate-400">
        <th scope="row" class="border-r border-slate-400 px-3 py-1 italic">x</th>
        <td class="px-3 py-1">−∞</td>
        <td class="px-3 py-1"></td>
        <td class="px-3 py-1 font-semibold">{xs}</td>
        <td class="px-3 py-1"></td>
        <td class="px-3 py-1">+∞</td>
      </tr>
      <tr class="h-20">
        <th scope="row" class="border-r border-slate-400 px-3 py-1 italic">y</th>
        <td class="px-3 {up ? 'align-top' : 'align-bottom'}">{inf}</td>
        <td class="px-1 align-middle text-xl text-indigo-600" aria-hidden="true"
          >{up ? '↘' : '↗'}</td
        >
        <td class="px-3 font-semibold text-indigo-800 {up ? 'align-bottom' : 'align-top'}">{ys}</td>
        <td class="px-1 align-middle text-xl text-indigo-600" aria-hidden="true"
          >{up ? '↗' : '↘'}</td
        >
        <td class="px-3 {up ? 'align-top' : 'align-bottom'}">{inf}</td>
      </tr>
    </tbody>
  </table>
</figure>
