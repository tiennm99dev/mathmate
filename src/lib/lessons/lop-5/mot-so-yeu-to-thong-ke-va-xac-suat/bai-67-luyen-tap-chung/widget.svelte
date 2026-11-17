<script>
  import Frac from '#lib/core/frac.svelte';
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood =
    'Tuyệt vời! Em đã nắm chắc cách sắp xếp, phân loại số liệu, đọc biểu đồ hình quạt tròn và viết tỉ số số lần lặp lại.';
  const cell = 'border-2 border-slate-300 px-2 py-2';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  {allGood}
  listOptions={(q) => q.kind === 'sap-xep'}
>
  {#snippet visual(/** @type {import('./engine.js').Question} */ q)}
    {@const v = q.visual}
    {#if v?.type === 'seq'}
      <div class="rounded-2xl bg-amber-50 p-3">
        <p class="text-base font-semibold text-slate-600">{v.title} (đơn vị: {v.unit})</p>
        <p class="text-2xl font-bold tabular-nums text-slate-800">
          {v.values.map((x) => formatNumber(x)).join('; ')}
        </p>
      </div>
    {:else if v?.type === 'pie'}
      <div class="rounded-2xl bg-sky-50 p-3">
        <PieChart data={v.data} title="Biểu đồ hình quạt tròn: {v.title}" />
      </div>
    {:else if v?.type === 'parts'}
      <div class="rounded-2xl bg-sky-50 p-3">
        <p class="text-base font-semibold text-slate-600">Biểu đồ hình quạt tròn: {v.title}</p>
        <ul class="mt-1 space-y-1 text-xl text-slate-800">
          {#each v.rows as row (row.label)}
            <li>
              {row.label}:
              <span class="font-bold tabular-nums">{row.text}</span>
              {#if row.text === '?'}<span class="sr-only">chưa biết</span>{/if}
            </li>
          {/each}
        </ul>
      </div>
    {:else if v?.type === 'table'}
      <div class="overflow-x-auto rounded-2xl bg-white">
        <table class="w-full border-collapse text-lg text-slate-800">
          <caption class="pb-2 text-left text-base font-semibold text-slate-600">{v.title}</caption>
          <thead>
            <tr>
              <th scope="col" class="{cell} bg-sky-100 text-left">{v.head}</th>
              <th scope="col" class="{cell} bg-sky-100">Số lần</th>
            </tr>
          </thead>
          <tbody>
            {#each v.rows as row (row.label)}
              <tr>
                <th scope="row" class="{cell} text-left font-semibold">{row.label}</th>
                <td class="{cell} text-center text-2xl font-bold tabular-nums">{row.count}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/snippet}
  {#snippet option(/** @type {import('#lib/core/kid/quiz.js').KidOption} */ opt)}
    {#if typeof opt !== 'string' && typeof opt.n === 'number'}
      <Frac n={opt.n} d={opt.d} size="lg" />
    {:else}
      {typeof opt === 'string' ? opt : opt.label}
    {/if}
  {/snippet}
</ChoiceRound>
