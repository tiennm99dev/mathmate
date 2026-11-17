<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import TallyMarks from '#lib/core/kid/tally-marks.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import PieChart from '#lib/core/visuals/pie-chart.svelte';
  import { MAX_PER_ANSWER, SURVEYS, findings, tapAnswer } from './engine.js';

  let pick = $state(0);
  let counts = $state([...SURVEYS[0].sample]);

  const survey = $derived(SURVEYS[pick]);
  const total = $derived(counts.reduce((a, c) => a + c, 0));
  const data = $derived(survey.labels.map((label, i) => ({ label, value: counts[i] })));
  const lines = $derived(findings(survey, counts));

  /** @param {string | number} v */
  function choose(v) {
    pick = Number(v);
    counts = [...SURVEYS[pick].sample];
  }

  /** @param {number} i @param {1 | -1} delta */
  function tap(i, delta) {
    counts = tapAnswer(counts, i, delta);
  }

  const cell = 'border-2 border-slate-300 px-2 py-2';
  const step = `inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-2xl font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn cuộc khảo sát"
    options={SURVEYS.map((s, i) => ({ value: i, label: s.short }))}
    value={pick}
    onchange={choose}
  />

  <div class="overflow-x-auto rounded-2xl bg-white">
    <table class="w-full border-collapse text-lg text-slate-800">
      <caption class="pb-2 text-left text-base font-semibold text-slate-600">
        Phiếu khảo sát: {survey.title}
      </caption>
      <thead>
        <tr>
          <th scope="col" class="{cell} bg-sky-100 text-left">{survey.head}</th>
          <th scope="col" class="{cell} bg-sky-100 text-left">Kiểm đếm</th>
          <th scope="col" class="{cell} bg-sky-100">Số phiếu</th>
        </tr>
      </thead>
      <tbody>
        {#each survey.labels as label, i (label)}
          <tr>
            <th scope="row" class="{cell} text-left font-semibold">{label}</th>
            <td class={cell}><TallyMarks count={counts[i]} settled /></td>
            <td class={cell}>
              <div class="flex items-center justify-center gap-2">
                <button
                  type="button"
                  class={step}
                  aria-label="Bớt một phiếu {label}"
                  disabled={counts[i] === 0}
                  onclick={() => tap(i, -1)}>−</button
                >
                <span class="w-10 text-center text-2xl font-bold tabular-nums">{counts[i]}</span>
                <button
                  type="button"
                  class={step}
                  aria-label="Thêm một phiếu {label}"
                  disabled={counts[i] >= MAX_PER_ANSWER}
                  onclick={() => tap(i, 1)}>+</button
                >
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => (counts = survey.labels.map(() => 0))}>Xoá hết để tự khảo sát</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => (counts = [...survey.sample])}>Dùng số liệu mẫu</button
    >
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div class="rounded-2xl bg-sky-50 p-2">
      <BarChart {data} unit="Số phiếu" title="Biểu đồ cột: {survey.title}" />
    </div>
    <div class="rounded-2xl bg-amber-50 p-3">
      {#if total > 0}
        <PieChart {data} decimals={1} title="Biểu đồ hình quạt tròn: {survey.title}" />
      {:else}
        <p class="text-lg text-slate-600">Biểu đồ hình quạt tròn hiện ra khi có phiếu.</p>
      {/if}
    </div>
  </div>

  <KidNote tone={total > 0 ? 'ok' : 'info'} text={lines.join(' ')} />
</div>
