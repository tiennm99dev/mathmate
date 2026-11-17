<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { approxTex, approxText } from '../_shared/plot.js';
  import { CASES, RULES, exactOf, sumOf } from './engine.js';

  let id = $state('square');
  let rule = $state('left');
  const how = $derived(/** @type {import('./engine.js').Rule} */ (rule));
  let n = $state(4);

  const c = $derived(CASES.find((k) => k.id === id) ?? CASES[0]);
  const exact = $derived(exactOf(c));
  const result = $derived(sumOf(c, n, how));
  const below = $derived(result.rects.some((r) => r.y < 0));
  const ladder = $derived([4, 16, 64, 256].map((k) => ({ k, s: sumOf(c, k, how).sum })));

  const integralTex = $derived(
    `\\int_{${c.aTex}}^{${c.bTex}} ${c.fTex}\\,\\mathrm{d}x = \\left. ${c.FTex} \\right|_{${c.aTex}}^{${c.bTex}} = ${c.valueTex}${Number.isInteger(tidy(exact, 9)) ? '' : ` ${approxTex(exact, 4)}`}`,
  );
  const note = $derived.by(() => {
    const s = `Với $n = ${n}$ hình chữ nhật, mỗi hình rộng $\\dfrac{b - a}{n} ${approxTex((c.b - c.a) / n, 3)}$, tổng diện tích (có dấu) $S_{${n}} ${approxTex(result.sum, 4)}$, lệch so với tích phân khoảng $${numTex(Number(result.error.toPrecision(2)), 6)}$.`;
    const close =
      result.error < 0.01
        ? ' Sai số đã rất nhỏ: khi $n \\to +\\infty$, tổng $S_n$ dần tới đúng giá trị $F(b) - F(a)$.'
        : ' Tăng $n$ để thấy $S_n$ tiến gần tới $F(b) - F(a)$.';
    const sign = below
      ? ' Phần màu đỏ nằm dưới trục $Ox$ được tính với dấu âm, nên tích phân là hiệu của diện tích phần trên và phần dưới trục hoành.'
      : '';
    return s + close + sign;
  });
  const label = $derived(
    `Đồ thị y = ${c.label} với ${n} hình chữ nhật xấp xỉ diện tích; tổng ${approxText(result.sum, 4)}, tích phân ${approxText(exact, 4)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số và đoạn lấy tích phân"
    options={CASES.map((k) => ({ value: k.id, label: k.label }))}
    bind:value={id}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Chiều cao mỗi hình chữ nhật lấy tại"
      options={RULES.map((r) => ({ value: r.value, label: r.label }))}
      bind:value={rule}
    />
    <SliderField label="Số hình chữ nhật n" bind:value={n} min={1} max={100} step={1} />
  </div>

  <GraphBox
    win={c.win}
    {label}
    regions={[{ f: c.f, from: c.a, to: c.b, color: '#6366f1', opacity: 0.15 }]}
    rects={result.rects}
    curves={[{ f: c.f, color: '#4338ca' }]}
    lines={[
      { c: c.a, vertical: true, color: '#64748b' },
      { c: c.b, vertical: true, color: '#64748b' },
    ]}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={integralTex} />
  </div>
  <FeedbackNote tone={result.error < 0.01 ? 'ok' : 'info'} text={note} />

  <table class="w-full max-w-md text-center text-sm">
    <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
      Tổng S<sub>n</sub> theo số hình chữ nhật (cùng cách lấy chiều cao)
    </caption>
    <thead>
      <tr class="border-b border-slate-200">
        <th scope="col" class="py-1">n</th>
        <th scope="col" class="py-1">Tổng S<sub>n</sub></th>
        <th scope="col" class="py-1">Tích phân</th>
      </tr>
    </thead>
    <tbody>
      {#each ladder as row (row.k)}
        <tr class="border-b border-slate-100 tabular-nums">
          <td class="py-1">{formatNumber(row.k)}</td>
          <td class="py-1">{approxText(row.s, 4)}</td>
          <td class="py-1">{approxText(exact, 4)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
