<script>
  import TallyMarks from '#lib/core/kid/tally-marks.svelte';

  /**
   * A tally of a trial for a review question: one row of strokes per
   * outcome. The strokes are read one by one until the question has ended,
   * so the label never gives a count away.
   * @type {{ title: string, rows: Array<{ label: string, count: number }>, settled: boolean }}
   */
  let { title, rows, settled } = $props();

  const cell = 'border-2 border-slate-300 px-2 py-2';
</script>

<div class="overflow-x-auto rounded-2xl bg-white">
  <table class="w-full border-collapse text-lg text-slate-800">
    <caption class="pb-2 text-left text-base font-semibold text-slate-600">{title}</caption>
    <tbody>
      {#each rows as row (row.label)}
        <tr>
          <th scope="row" class="{cell} text-left font-semibold">{row.label}</th>
          <td class={cell}><TallyMarks count={row.count} {settled} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
