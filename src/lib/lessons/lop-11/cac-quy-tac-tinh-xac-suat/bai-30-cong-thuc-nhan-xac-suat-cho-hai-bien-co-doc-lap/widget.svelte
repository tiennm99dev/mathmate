<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button } from '#lib/core/ui.js';
  import { rng } from '#lib/core/drill.js';
  import { fmt, formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { percentText } from '../_shared/probability.js';
  import { LEAVES, TARGETS, leafProbs, simulate, targetText } from './engine.js';

  let p = $state(0.8);
  let q = $state(0.7);
  /** @type {import('./engine.js').Target} */
  let target = $state('atLeastOne');
  let seed = $state(1);
  let tally = $state({ AB: 0, AnB: 0, nAB: 0, nAnB: 0 });

  const probs = $derived(leafProbs(p, q));
  const t = $derived(TARGETS.find((x) => x.value === target) ?? TARGETS[0]);
  const marked = $derived(new Set(t.leaves));
  const total = $derived(tally.AB + tally.AnB + tally.nAB + tally.nAnB);
  const hits = $derived(t.leaves.reduce((s, l) => s + tally[l], 0));
  const exact = $derived(tidy(t.leaves.reduce((s, l) => s + probs[l], 0)));

  function reset() {
    tally = { AB: 0, AnB: 0, nAB: 0, nAnB: 0 };
  }

  /** @param {number} n */
  function run(n) {
    const more = simulate(rng(seed * 7919 + 17), n, p, q);
    seed += 1;
    tally = {
      AB: tally.AB + more.AB,
      AnB: tally.AnB + more.AnB,
      nAB: tally.nAB + more.nAB,
      nAnB: tally.nAnB + more.nAnB,
    };
  }

  const f = (/** @type {number} */ v) => formatNumber(tidy(v), 4);

  // Tree layout in a 360 × 230 box.
  const root = { x: 18, y: 115 };
  const mids = [
    { x: 130, y: 60, label: 'A', a: true },
    { x: 130, y: 170, label: 'Ā', a: false },
  ];
  const leafY = [25, 85, 145, 205];
  const LEAF_LABEL = { AB: 'AB', AnB: 'AB̄', nAB: 'ĀB', nAnB: 'ĀB̄' };

  const simNote = $derived(
    total === 0
      ? 'Bấm nút để mô phỏng nhiều lượt bắn và so tần số tương đối với xác suất tính trên sơ đồ cây.'
      : `Sau $${numTex(total)}$ lượt, biến cố "${t.label.toLowerCase()}" xảy ra $${numTex(hits)}$ lần, tần số tương đối ${percentText(hits, total)}; xác suất tính trên sơ đồ cây là ${formatNumber(exact * 100, 2)}%. Càng nhiều lượt, hai số thường càng gần nhau.`,
  );
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-600">
    Hai xạ thủ, mỗi người bắn một viên vào bia, độc lập với nhau. <i>A</i>: "Xạ thủ thứ nhất bắn
    trúng", <i>B</i>: "Xạ thủ thứ hai bắn trúng".
  </p>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="P(A)"
      bind:value={p}
      min={0}
      max={1}
      step={0.05}
      format={f}
      oninput={reset}
    />
    <SliderField
      label="P(B)"
      bind:value={q}
      min={0}
      max={1}
      step={0.05}
      format={f}
      oninput={reset}
    />
  </div>
  <SegmentedControl
    label="Biến cố cần tính"
    options={TARGETS.map((x) => ({ value: x.value, label: x.label }))}
    bind:value={target}
  />

  <svg
    viewBox="0 0 360 230"
    class="mx-auto block w-full max-w-md rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label="Sơ đồ cây: {LEAVES.map(
      (l) => `${LEAF_LABEL[l.id]} có xác suất ${f(probs[l.id])}`,
    ).join('; ')}. Các lá được tô thuộc biến cố {t.label.toLowerCase()}."
  >
    {#each mids as m, i (m.label)}
      <line x1={root.x} y1={root.y} x2={m.x} y2={m.y} stroke="#475569" stroke-width="1.5" />
      <text
        x={(root.x + m.x) / 2 - 4}
        y={(root.y + m.y) / 2 + (i === 0 ? -6 : 16)}
        font-size="12"
        fill="#0369a1"
        text-anchor="middle">{f(m.a ? p : 1 - p)}</text
      >
      <circle cx={m.x} cy={m.y} r="13" fill="#e0f2fe" stroke="#0369a1" />
      <text x={m.x} y={m.y + 5} font-size="14" font-weight="700" text-anchor="middle" fill="#0c4a6e"
        >{m.label}</text
      >
      {#each [true, false] as b, j (j)}
        {@const leaf = LEAVES[i * 2 + j]}
        {@const y = leafY[i * 2 + j]}
        <line
          x1={m.x + 13}
          y1={m.y}
          x2="232"
          y2={y}
          stroke={marked.has(leaf.id) ? '#059669' : '#94a3b8'}
          stroke-width={marked.has(leaf.id) ? 2.5 : 1.5}
        />
        <text
          x={(m.x + 232) / 2 + 6}
          y={(m.y + y) / 2 + (j === 0 ? -5 : 13)}
          font-size="12"
          fill="#b45309"
          text-anchor="middle">{b ? 'B' : 'B̄'} {f(b ? q : 1 - q)}</text
        >
        <rect
          x="234"
          y={y - 14}
          width="122"
          height="28"
          rx="6"
          fill={marked.has(leaf.id) ? '#a7f3d0' : '#f1f5f9'}
          stroke={marked.has(leaf.id) ? '#059669' : '#cbd5e1'}
        />
        <text x="242" y={y + 5} font-size="13" font-weight="700" fill="#1e293b"
          >{LEAF_LABEL[leaf.id]}</text
        >
        <text x="350" y={y + 5} font-size="13" text-anchor="end" fill="#1e293b"
          >{f(probs[leaf.id])}</text
        >
      {/each}
    {/each}
    <circle cx={root.x} cy={root.y} r="5" fill="#334155" />
  </svg>

  <FeedbackNote tone="info" text={targetText(target, p, q)} />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => run(100)}>Bắn 100 lượt</button>
    <button type="button" class={button.secondary} onclick={() => run(1000)}
      >Bắn {fmt(1000)} lượt</button
    >
    <button type="button" class={button.quiet} disabled={total === 0} onclick={reset}>Xoá</button>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">So sánh xác suất trên sơ đồ cây với tần số tương đối</caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-600">
          <th class="py-1 pr-2 font-semibold">Kết quả</th>
          <th class="py-1 pr-2 font-semibold">Xác suất</th>
          <th class="py-1 pr-2 font-semibold">Số lần</th>
          <th class="py-1 font-semibold">Tần số tương đối</th>
        </tr>
      </thead>
      <tbody>
        {#each LEAVES as l (l.id)}
          <tr class="border-b border-slate-100 {marked.has(l.id) ? 'bg-emerald-50' : ''}">
            <td class="py-1 pr-2"><LiveRichText text={`$${l.tex}$`} /></td>
            <td class="py-1 pr-2">{f(probs[l.id])}</td>
            <td class="py-1 pr-2">{fmt(tally[l.id])}</td>
            <td class="py-1">{percentText(tally[l.id], total)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <FeedbackNote tone="info" text={simNote} />
</div>
