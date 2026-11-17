<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { percentages } from '#lib/stats-engine/frequency.js';
  import { SURVEYS, checkMessage, startCounts, stepPercent, targetPercents } from './engine.js';

  let pick = $state(0);
  const survey = $derived(SURVEYS[pick]);

  /** @param {import('./engine.js').Survey} s */
  const startData = (s) => startCounts(s).map((value, i) => ({ label: s.labels[i], value }));

  let data = $state(startData(SURVEYS[0]));
  const values = $derived(data.map((d) => d.value));
  const have = $derived(percentages(values, 1));
  const want = $derived(targetPercents(survey));
  const check = $derived(checkMessage(survey, values));

  /** @param {string | number} v */
  function choose(v) {
    pick = Number(v);
    data = startData(SURVEYS[pick]);
  }

  const cell = 'border-2 border-slate-300 px-2 py-2';
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn bảng số liệu"
    options={SURVEYS.map((s, i) => ({ value: i, label: s.short }))}
    value={pick}
    onchange={choose}
  />

  <div class="overflow-x-auto rounded-2xl bg-white">
    <table class="w-full border-collapse text-lg text-slate-800">
      <caption class="pb-2 text-left text-base font-semibold text-slate-600">{survey.title}</caption
      >
      <thead>
        <tr>
          <th scope="col" class="{cell} bg-sky-100 text-left">Loại</th>
          <th scope="col" class="{cell} bg-sky-100">Số {survey.noun}</th>
          <th scope="col" class="{cell} bg-sky-100">Trên biểu đồ</th>
        </tr>
      </thead>
      <tbody>
        {#each survey.labels as label, i (label)}
          {@const ok = Math.abs(have[i] - want[i]) < 1e-6}
          <tr>
            <th scope="row" class="{cell} text-left font-semibold">{label}</th>
            <td class="{cell} text-center tabular-nums">{survey.counts[i]}</td>
            <td
              class="{cell} text-center font-bold tabular-nums {ok
                ? 'text-emerald-700'
                : 'text-amber-700'}"
            >
              {formatNumber(have[i])}%{#if ok}<span aria-hidden="true"> ✓</span><span
                  class="sr-only">, đúng</span
                >{/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="rounded-2xl bg-sky-50 p-3">
    {#key pick}
      <PieChart
        bind:data
        interactive
        decimals={1}
        snapPercent={stepPercent(survey)}
        title="Biểu đồ hình quạt tròn: {survey.title}"
      />
    {/key}
  </div>

  <KidNote tone={check.done ? 'ok' : 'info'} text={check.text} />

  <button
    type="button"
    class="min-h-12 text-lg {button.quiet}"
    onclick={() => (data = startData(survey))}>Làm lại</button
  >
</div>
