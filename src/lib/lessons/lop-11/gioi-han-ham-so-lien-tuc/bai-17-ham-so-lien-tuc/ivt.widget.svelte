<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { bisect, ivtF } from './engine.js';

  const MAX_STEPS = 12;
  const CURVE = '#334155';
  const NEG = '#2563eb';
  const POS = '#e11d48';

  /** @type {Array<import('./engine.js').Halving>} */
  let steps = $state([]);
  let a = $state(0);
  let b = $state(1);

  const width = $derived(b - a);
  const win = $derived.by(() => {
    const pad = Math.max(width * 0.6, 1e-4);
    const xMin = a - pad;
    const xMax = b + pad;
    const ys = [ivtF(xMin), ivtF(xMax), 0];
    const lo = Math.min(...ys);
    const hi = Math.max(...ys);
    const room = (hi - lo) * 0.12;
    return { xMin, xMax, yMin: lo - room, yMax: hi + room };
  });
  /** @param {number} x */
  const dot = (x) => ({ x, y: ivtF(x), color: ivtF(x) < 0 ? NEG : POS, r: 6 });

  function halve() {
    const s = bisect(ivtF, a, b);
    steps = [...steps, { a: s.a, b: s.b, c: s.c, fc: s.fc }];
    [a, b] = s.next;
  }
  function restart() {
    steps = [];
    a = 0;
    b = 1;
  }

  /** @param {number} v */
  const signTex = (v) => (v < 0 ? '< 0' : v > 0 ? '> 0' : '= 0');
  const note = $derived(
    `$f(${numTex(a, 6)}) \\approx ${numTex(ivtF(a), 4)} ${signTex(ivtF(a))}$ và $f(${numTex(b, 6)}) \\approx ${numTex(ivtF(b), 4)} ${signTex(ivtF(b))}$: $f$ liên tục và đổi dấu trên đoạn này, nên phương trình có nghiệm thuộc khoảng $(${numTex(a, 6)}; ${numTex(b, 6)})$, dài $${numTex(width, 6)}$.`,
  );
  const close = $derived(
    steps.length >= MAX_STEPS
      ? `Sau ${MAX_STEPS} lần chia đôi, nghiệm $c \\approx ${numTex((a + b) / 2, 3)}$ (sai số nhỏ hơn $0{,}001$).`
      : steps.length === 0
        ? 'Bấm "Chia đôi": lấy trung điểm $c$, tính $f(c)$ và giữ lại nửa đoạn mà $f$ vẫn đổi dấu ở hai đầu.'
        : `Lần chia thứ ${steps.length}: $c = ${numTex(steps[steps.length - 1].c, 6)}$, $f(c) \\approx ${numTex(steps[steps.length - 1].fc, 4)}$.`,
  );
  const label = $derived(
    `Đồ thị y = x³ + x − 1 quanh đoạn từ ${formatNumber(a, 6)} đến ${formatNumber(b, 6)}. Đầu trái có f âm, đầu phải có f dương.`,
  );
</script>

<div class="space-y-4">
  <GraphBox
    {win}
    {label}
    curves={[{ f: ivtF, color: CURVE }]}
    points={[dot(a), dot(b)]}
    marks={[a, b]}
  >
    {#snippet children(fr)}
      <rect
        x={fr.sx(a)}
        y={fr.sy(0) - 4}
        width={Math.max(1, fr.sx(b) - fr.sx(a))}
        height="8"
        fill="#f59e0b"
        opacity="0.6"
        rx="3"
      />
    {/snippet}
  </GraphBox>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      disabled={steps.length >= MAX_STEPS}
      onclick={halve}>Chia đôi</button
    >
    <button type="button" class={button.quiet} onclick={restart}>Làm lại từ [0; 1]</button>
  </div>

  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone={steps.length >= MAX_STEPS ? 'ok' : 'info'} text={close} />

  {#if steps.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">Các lần chia đôi đoạn chứa nghiệm</caption>
        <thead>
          <tr class="border-b border-slate-200 text-left text-slate-700">
            <th scope="col" class="py-1.5 pr-2">Lần</th>
            <th scope="col" class="py-1.5 pr-2">Đoạn</th>
            <th scope="col" class="py-1.5 pr-2">Trung điểm c</th>
            <th scope="col" class="py-1.5">Dấu f(c)</th>
          </tr>
        </thead>
        <tbody>
          {#each steps as s, i (i)}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1.5 pr-2 text-left font-semibold">{i + 1}</th>
              <td class="py-1.5 pr-2">[{formatNumber(s.a, 6)}; {formatNumber(s.b, 6)}]</td>
              <td class="py-1.5 pr-2">{formatNumber(s.c, 6)}</td>
              <td class="py-1.5 {s.fc < 0 ? 'text-blue-700' : 'text-rose-700'}"
                >{s.fc < 0 ? 'âm' : s.fc > 0 ? 'dương' : 'bằng 0'}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
