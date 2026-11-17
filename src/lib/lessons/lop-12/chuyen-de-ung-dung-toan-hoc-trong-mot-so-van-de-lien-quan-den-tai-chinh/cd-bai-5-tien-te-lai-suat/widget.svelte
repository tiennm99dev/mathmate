<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { PERIODS, growth, readout, verdict } from './engine.js';

  let P = $state(100);
  let rate = $state(9);
  let years = $state(10);
  let n = $state(12);
  let inflation = $state(4);

  const deposit = $derived({ P, rate, years, n, inflation });
  const g = $derived(growth(deposit));
  const series = $derived([
    { name: 'Lãi đơn', values: g.simple },
    { name: `Lãi kép ${PERIODS.find((p) => p.n === n)?.name ?? ''}`, values: g.compound },
  ]);
  const out = $derived(readout(deposit));
  const note = $derived(verdict(deposit));
  const pct = (/** @type {number} */ v) => formatNumber(v, 1);
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Số tiền vốn P"
      bind:value={P}
      min={10}
      max={1000}
      step={10}
      unit="triệu đồng"
    />
    <SliderField
      label="Lãi suất năm r"
      bind:value={rate}
      min={1}
      max={15}
      step={0.1}
      unit="%"
      format={pct}
    />
    <SliderField label="Thời gian gửi t" bind:value={years} min={1} max={20} unit="năm" />
    <SliderField
      label="Tỉ lệ lạm phát g"
      bind:value={inflation}
      min={0}
      max={15}
      step={0.5}
      unit="%"
      format={pct}
    />
  </div>
  <SegmentedControl
    label="Kì tính lãi kép"
    bind:value={n}
    options={PERIODS.map((p) => ({ value: p.n, label: p.label }))}
  />

  <LineChart
    labels={g.labels}
    {series}
    showValues={false}
    unit="triệu đồng"
    title="Số tiền nhận được theo năm gửi"
  />
  <p class="-mt-2 text-center text-xs text-slate-500">Trục ngang: số năm gửi.</p>

  <ul class="space-y-2 text-sm text-slate-700" aria-live="polite">
    {#each out.lines as line, i (i)}
      <li class="overflow-x-auto"><LiveRichText text={line} /></li>
    {/each}
  </ul>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
