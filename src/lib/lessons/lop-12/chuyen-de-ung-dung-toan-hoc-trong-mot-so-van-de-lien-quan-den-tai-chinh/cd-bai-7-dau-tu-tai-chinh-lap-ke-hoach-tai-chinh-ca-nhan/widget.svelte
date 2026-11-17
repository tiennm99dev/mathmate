<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import { CHANNELS, paths, summary } from './engine.js';

  let start = $state(20);
  let monthly = $state(2);
  let years = $state(10);
  let goal = $state(400);
  let channel = $state('tiet-kiem');

  const plan = $derived({ start, monthly, years, goal, channel });
  const p = $derived(paths(plan));
  const s = $derived(summary(plan));
  const labels = $derived(p.expected.map((x) => String(x.year)));
  const series = $derived([
    { name: `Kì vọng (${p.c.rate}%/năm)`, values: p.expected.map((x) => x.value) },
    ...(p.c.low === p.c.rate
      ? []
      : [{ name: `Năm xấu (${p.c.low}%/năm)`, values: p.low.map((x) => x.value) }]),
    { name: 'Tiền đã góp', values: p.expected.map((x) => x.paid) },
    { name: 'Mục tiêu', values: p.expected.map(() => goal) },
  ]);
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Tiền có sẵn ban đầu"
      bind:value={start}
      min={0}
      max={300}
      step={5}
      unit="triệu đồng"
    />
    <SliderField
      label="Góp thêm cuối mỗi tháng"
      bind:value={monthly}
      min={0}
      max={20}
      step={0.5}
      unit="triệu đồng"
    />
    <SliderField label="Thời gian" bind:value={years} min={1} max={30} unit="năm" />
    <SliderField
      label="Mục tiêu"
      bind:value={goal}
      min={50}
      max={3000}
      step={50}
      unit="triệu đồng"
    />
  </div>
  <SegmentedControl
    label="Kênh đầu tư"
    bind:value={channel}
    options={CHANNELS.map((c) => ({ value: c.id, label: c.label }))}
  />
  <p class="text-sm text-slate-600">{s.risk}</p>

  <LineChart
    {labels}
    {series}
    showValues={false}
    unit="triệu đồng"
    title="Giá trị tài sản theo năm"
  />
  <p class="-mt-2 text-center text-xs text-slate-500">Trục ngang: số năm kể từ hôm nay.</p>

  <div class="space-y-2 text-sm text-slate-700" aria-live="polite">
    <p class="overflow-x-auto"><LiveRichText text={s.formula} /></p>
    <p><LiveRichText text={s.paid} /></p>
  </div>
  <FeedbackNote tone={s.tone} text={s.text} />
  <p class="text-xs text-slate-500">
    Lợi suất của các kênh chỉ là giả định để minh hoạ, không phải dự báo. Tiền được tính lãi kép
    hằng tháng.
  </p>
</div>
