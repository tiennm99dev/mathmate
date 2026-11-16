<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { balances, doublingYears } from './engine.js';

  let deposit = $state(100);
  let percent = $state(6);
  let years = $state(10);

  const data = $derived(balances(deposit, percent, years));
  const labels = $derived(Array.from({ length: years + 1 }, (_, n) => String(n)));
  const series = $derived([
    { name: 'Lãi đơn', values: data.simple.map((v) => Number(v.toFixed(2))), color: '#4f46e5' },
    { name: 'Lãi kép', values: data.compound.map((v) => Number(v.toFixed(2))), color: '#059669' },
  ]);
  const a = $derived(data.simple[years]);
  const b = $derived(data.compound[years]);
  const twice = $derived(doublingYears(percent));
  const r = $derived(percent / 100);
  const money = (/** @type {number} */ v) => `${formatFixed(v, 2)} triệu đồng`;

  const rows = $derived(
    [1, 2, 3, years]
      .filter((n, i, all) => n <= years && all.indexOf(n) === i)
      .map((n) => ({ n, simple: data.simple[n], compound: data.compound[n] })),
  );

  const note = $derived(
    `Lãi đơn: $A_n = ${numTex(deposit)}(1 + ${numTex(r, 4)}n)$ là cấp số cộng, công sai $d = ${numTex(deposit * r, 4)}$. ` +
      `Lãi kép: $B_n = ${numTex(deposit)} \\cdot ${numTex(1 + r, 4)}^n$ là cấp số nhân, công bội $q = ${numTex(1 + r, 4)}$. ` +
      `Sau ${years} năm: lãi đơn ${money(a)}, lãi kép ${money(b)}, chênh lệch ${money(b - a)}.`,
  );
  const doubling = $derived(
    `Với lãi suất ${formatNumber(percent)}% một năm, số tiền gấp đôi sau ${twice.simple} năm nếu tính lãi đơn, nhưng chỉ sau ${twice.compound} năm nếu tính lãi kép. Cấp số nhân với $q > 1$ cuối cùng luôn vượt xa cấp số cộng.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Số tiền gửi"
      bind:value={deposit}
      min={10}
      max={200}
      step={10}
      unit="triệu đồng"
    />
    <SliderField
      label="Lãi suất một năm"
      bind:value={percent}
      min={3}
      max={12}
      step={0.5}
      format={(v) => `${formatNumber(v)}%`}
    />
    <SliderField label="Số năm gửi" bind:value={years} min={1} max={20} unit="năm" />
  </div>

  <LineChart
    {labels}
    {series}
    title="Số tiền sau mỗi năm (triệu đồng)"
    unit="triệu đồng"
    showValues={false}
  />

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">Số tiền sau một số năm</caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">Số năm</th>
          <th scope="col" class="py-1.5 pr-2">Lãi đơn (triệu đồng)</th>
          <th scope="col" class="py-1.5">Lãi kép (triệu đồng)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.n)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 pr-2 text-left font-semibold">{row.n}</th>
            <td class="py-1.5 pr-2">{formatFixed(row.simple, 2)}</td>
            <td class="py-1.5">{formatFixed(row.compound, 2)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone="ok" text={doubling} />
</div>
