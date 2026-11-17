<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import GroupChart from '../_shared/group-chart.svelte';
  import { SAMPLES } from '../_shared/datasets.js';
  import { groupText, groupValues, sampleSize } from '#lib/stats-engine/grouped.js';
  import { dotStack, groupingAdvice, valuesIn } from './engine.js';

  let sampleId = $state(SAMPLES[0].id);
  const sample = $derived(SAMPLES.find((s) => s.id === sampleId) ?? SAMPLES[0]);
  let start = $state(SAMPLES[0].start);
  let widthIndex = $state(Math.floor(SAMPLES[0].widths.length / 2));
  let picked = $state(/** @type {number | null} */ (null));

  const width = $derived(sample.widths[widthIndex] ?? sample.widths[0]);
  const groups = $derived(groupValues(sample.values, start, width));
  const n = $derived(sampleSize(groups));
  const chosen = $derived(picked !== null && picked < groups.length ? picked : null);
  const advice = $derived(groupingAdvice(groups.length));

  /** @param {string | number} id */
  function changeSample(id) {
    const s = SAMPLES.find((x) => x.id === id) ?? SAMPLES[0];
    start = s.start;
    widthIndex = Math.floor(s.widths.length / 2);
    picked = null;
  }

  // Dot plot of the raw values over the same axis as the chart.
  const W = 360;
  const LEFT = 34;
  const RIGHT = 14;
  const DOT = 8;
  const dots = $derived(dotStack(sample.values));
  const levels = $derived(Math.max(...dots.map((d) => d.level)) + 1);
  const H = $derived(28 + levels * DOT + 8);
  const sx = $derived(linear(groups[0].lo, groups.at(-1)?.hi ?? 1, LEFT, W - RIGHT));
  /** @param {number} v */
  const groupOf = (v) => groups.findIndex((g) => valuesIn([v], g).length === 1);

  const pickedText = $derived.by(() => {
    if (chosen === null) {
      return 'Chọn một nhóm trong bảng để xem những giá trị nào được đếm vào nhóm đó.';
    }
    const g = groups[chosen];
    const inside = valuesIn(sample.values, g);
    const tail = g.closed
      ? ` Đây là nhóm cuối nên lấy cả đầu mút phải $${numTex(g.hi)}$.`
      : ` Giá trị bằng đầu mút phải $${numTex(g.hi)}$ không thuộc nhóm này mà thuộc nhóm sau.`;
    return inside.length === 0
      ? `Nhóm ${groupText(g)} không có giá trị nào: tần số bằng $0$.`
      : `Nhóm ${groupText(g)} có ${inside.length} giá trị: ${inside.map((v) => formatNumber(v)).join('; ')}.${tail}`;
  });

  const summary = $derived(
    `Độ dài mỗi nhóm $h = ${numTex(width)}$, có ${groups.length} nhóm. Tổng các tần số là $${n}$, đúng bằng cỡ mẫu: mỗi số liệu được đếm đúng một lần.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mẫu số liệu"
    options={SAMPLES.map((s) => ({
      value: s.id,
      label: s.unit === 'cm' ? 'Chiều cao' : 'Điểm thi',
    }))}
    bind:value={sampleId}
    onchange={changeSample}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Đầu mút trái của nhóm đầu"
      bind:value={start}
      min={sample.starts.min}
      max={sample.starts.max}
      step={sample.starts.step}
      oninput={() => (picked = null)}
    />
    <SliderField
      label="Độ dài nhóm h"
      bind:value={widthIndex}
      min={0}
      max={sample.widths.length - 1}
      format={(i) => formatNumber(sample.widths[i] ?? 0)}
      oninput={() => (picked = null)}
    />
  </div>

  <figure class="space-y-1">
    <svg
      viewBox="0 0 {W} {H}"
      class="block w-full select-none rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="{sample.title}: mỗi chấm là một số liệu, các vạch đứng là đầu mút các nhóm."
    >
      {#each groups as g, i (i)}
        <rect
          x={sx.map(g.lo)}
          y="4"
          width={sx.map(g.hi) - sx.map(g.lo)}
          height={H - 26}
          fill={i === chosen ? '#fef3c7' : i % 2 === 0 ? '#eef2ff' : '#ffffff'}
        />
        <line x1={sx.map(g.lo)} y1="4" x2={sx.map(g.lo)} y2={H - 22} stroke="#94a3b8" />
      {/each}
      <line
        x1={sx.map(groups.at(-1)?.hi ?? 0)}
        y1="4"
        x2={sx.map(groups.at(-1)?.hi ?? 0)}
        y2={H - 22}
        stroke="#94a3b8"
      />
      {#each dots as d, i (i)}
        {@const k = groupOf(d.value)}
        <circle
          cx={sx.map(d.value)}
          cy={H - 26 - DOT / 2 - d.level * DOT}
          r="3.4"
          fill={k === chosen ? '#b45309' : k % 2 === 0 ? '#4f46e5' : '#0f766e'}
        />
      {/each}
      <line x1={LEFT} y1={H - 22} x2={W - RIGHT} y2={H - 22} stroke="#475569" stroke-width="1.5" />
      {#each groups as g, i (i)}
        {#if groups.length <= 8 || i % 2 === 0}
          <text x={sx.map(g.lo)} y={H - 7} font-size="12" text-anchor="middle" fill="#475569"
            >{formatNumber(g.lo)}</text
          >
        {/if}
      {/each}
      {#if groups.length <= 8 || groups.length % 2 === 0}
        <text
          x={sx.map(groups.at(-1)?.hi ?? 0)}
          y={H - 7}
          font-size="12"
          text-anchor="middle"
          fill="#475569">{formatNumber(groups.at(-1)?.hi ?? 0)}</text
        >
      {/if}
    </svg>
    <figcaption class="text-xs text-slate-600">
      {sample.title}: mỗi chấm là một số liệu, các dải màu là các nhóm.
    </figcaption>
  </figure>

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">Bảng tần số ghép nhóm</caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">Nhóm ({sample.unit})</th>
          <th scope="col" class="py-1.5">Tần số</th>
        </tr>
      </thead>
      <tbody>
        {#each groups as g, i (i)}
          <tr class="border-b border-slate-100 {i === chosen ? 'bg-amber-50' : ''}">
            <th scope="row" class="py-0.5 pr-2 text-left font-normal">
              <button
                type="button"
                class="min-h-11 rounded-md px-2 text-left font-semibold text-indigo-700 underline decoration-dotted underline-offset-4 hover:bg-indigo-50 {focusRing}"
                aria-pressed={i === chosen}
                onclick={() => (picked = i === chosen ? null : i)}>{groupText(g)}</button
              >
            </th>
            <td class="py-0.5">{g.count}</td>
          </tr>
        {/each}
        <tr class="font-semibold">
          <th scope="row" class="py-1.5 pr-2 text-left">Cỡ mẫu</th>
          <td class="py-1.5">n = {n}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <GroupChart
    {groups}
    title="Biểu đồ tần số ghép nhóm: {sample.title}"
    unit={sample.unit}
    highlight={chosen}
  />

  <FeedbackNote tone="info" text={pickedText} />
  <FeedbackNote tone="info" text={summary} />
  <FeedbackNote tone={advice.tone} text={advice.text} />
</div>
