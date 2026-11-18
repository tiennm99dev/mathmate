<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { textInput } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import GraphBox from '#lib/core/visuals/graph-box.svelte';
  import { lineTex } from '../_shared/lines.js';
  import { PROBLEMS, judge } from './engine.js';

  const CURVE = '#334155';
  const LINE = '#ea580c';
  const POINT = '#2563eb';

  let id = $state('cubic');
  let kText = $state('');
  let bText = $state('');

  const p = $derived(PROBLEMS.find((x) => x.id === id) ?? PROBLEMS[0]);
  const k = $derived(kText.trim() === '' ? null : readNumber(kText));
  const b = $derived(bText.trim() === '' ? null : readNumber(bText));
  const ready = $derived(k !== null && b !== null);
  const verdict = $derived(k !== null && b !== null ? judge(p, k, b) : null);

  const curves = $derived([
    { f: p.f, color: CURVE },
    ...(k !== null && b !== null
      ? [{ f: (/** @type {number} */ x) => k * x + b, color: LINE, width: 2 }]
      : []),
  ]);

  const message = $derived.by(() => {
    if (kText.trim() === '' || bText.trim() === '')
      return `Tính $y_0 = f(${numTex(p.x0)})$ và $f'(${numTex(p.x0)})$, rồi nhập hệ số góc $k$ và tung độ gốc $b$ của tiếp tuyến $y = kx + b$.`;
    if (!ready)
      return 'Hãy nhập $k$ và $b$ là số nguyên, phân số $p/q$ hoặc số thập phân (ví dụ $-3$, $1/4$ hay $0{,}25$).';
    const line = `$${lineTex(/** @type {number} */ (k), /** @type {number} */ (b))}$`;
    switch (verdict) {
      case 'tangent':
        return `Đúng! ${line} là tiếp tuyến tại $M(${numTex(p.x0)}; ${numTex(p.y0)})$: nó đi qua tiếp điểm và có hệ số góc $f'(${numTex(p.x0)}) = ${numTex(p.k, 4)}$.`;
      case 'through':
        return `${line} đi qua $M(${numTex(p.x0)}; ${numTex(p.y0)})$ nhưng hệ số góc chưa đúng nên cắt ngang đồ thị: kiểm tra lại $f'(${numTex(p.x0)})$.`;
      case 'parallel':
        return `${line} có đúng hệ số góc nhưng không đi qua tiếp điểm $M(${numTex(p.x0)}; ${numTex(p.y0)})$: kiểm tra lại $b = y_0 - kx_0$.`;
      default:
        return `${line} không đi qua tiếp điểm $M(${numTex(p.x0)}; ${numTex(p.y0)})$ và hệ số góc cũng chưa đúng. Làm lại theo công thức $y - y_0 = f'(x_0)(x - x_0)$.`;
    }
  });
  const tone = $derived(verdict === 'tangent' ? 'ok' : ready ? 'warn' : 'info');
  const label = $derived(
    `Đồ thị hàm số của ${p.label.toLowerCase()} với tiếp điểm M(${formatNumber(p.x0)}; ${formatNumber(p.y0)})${
      k !== null && b !== null
        ? `, cùng đường thẳng y = ${formatNumber(k, 4)}x ${b < 0 ? '−' : '+'} ${formatNumber(Math.abs(b), 4)} em nhập`
        : ''
    }.`,
  );

  function choose() {
    kText = '';
    bText = '';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bài tập"
    options={PROBLEMS.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
    onchange={choose}
  />

  <p class="text-center text-sm text-slate-700">Viết phương trình tiếp tuyến của đồ thị hàm số</p>
  <div class="overflow-x-auto text-center">
    <Tex display math={`${p.tex} \\quad \\text{tại điểm có hoành độ } x_0 = ${numTex(p.x0)}`} />
  </div>

  <div class="grid grid-cols-2 gap-3">
    <label class="block">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Hệ số góc k =</span>
      <input class={textInput} inputmode="text" autocomplete="off" bind:value={kText} />
    </label>
    <label class="block">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Tung độ gốc b =</span>
      <input class={textInput} inputmode="text" autocomplete="off" bind:value={bText} />
    </label>
  </div>

  <GraphBox
    wide
    win={p.view}
    {label}
    {curves}
    points={[{ x: p.x0, y: p.y0, color: POINT, r: 6 }]}
    marks={[p.x0]}
  />

  <FeedbackNote {tone} text={message} />
</div>
