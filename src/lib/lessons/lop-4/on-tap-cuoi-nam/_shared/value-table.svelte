<script>
  import { fmt } from '#lib/core/number-format.js';

  /**
   * A table of data for a review question: one row per child with its value
   * under `head`, as the book sets out its tables.
   * @type {{ title: string, head: string, rows: import('./visual.js').Row[] }}
   */
  let { title, head, rows } = $props();

  const cell = 'border-2 border-slate-300 px-3 py-2';
</script>

<div class="overflow-x-auto rounded-2xl bg-white">
  <table class="w-full border-collapse text-lg text-slate-800">
    <caption class="pb-2 text-left text-base font-semibold text-slate-600">{title}</caption>
    <thead>
      <tr class="bg-amber-50">
        <th scope="col" class="{cell} text-left">Tên</th>
        <th scope="col" class="{cell} text-right">{head}</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.label)}
        <tr>
          <th scope="row" class="{cell} text-left font-semibold">{row.label}</th>
          <td class="{cell} text-right font-bold tabular-nums">{fmt(row.value)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
