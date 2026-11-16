<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import TallyMarks from '#lib/core/kid/tally-marks.svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã đọc tốt dãy số liệu, biểu đồ cột và bảng kiểm đếm.';
  const cell = 'border-2 border-slate-300 px-2 py-2';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(/** @type {import('./engine.js').Question} */ q, /** @type {boolean} */ settled)}
    {@const v = q.visual}
    {#if v?.type === 'seq'}
      <div class="rounded-2xl bg-amber-50 p-3">
        <p class="text-base font-semibold text-slate-600">{v.title} ({v.unit})</p>
        <p class="text-2xl font-bold tabular-nums text-slate-800">
          {v.values.map(fmt).join(', ')}
        </p>
      </div>
    {:else if v?.type === 'chart'}
      <div class="rounded-2xl bg-sky-50 p-2">
        <BarChart data={v.data} unit={v.unit} title="Biểu đồ cột: {v.title}" />
      </div>
    {:else if v?.type === 'tally'}
      <div class="overflow-x-auto rounded-2xl bg-white">
        <table class="w-full border-collapse text-lg text-slate-800">
          <caption class="pb-2 text-left text-base font-semibold text-slate-600">{v.title}</caption>
          <tbody>
            {#each v.rows as row (row.label)}
              <tr>
                <th scope="row" class="{cell} text-left font-semibold">{row.label}</th>
                <td class={cell}><TallyMarks count={row.count} {settled} /></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
