<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import GroupChart from '#lib/core/visuals/group-chart.svelte';
  import { cumulative, groupText, makeGroups, sampleSize } from '#lib/stats-engine/grouped.js';
  import { MEASURES, PRESETS, viewOf } from './engine.js';

  let presetId = $state(PRESETS[0].id);
  const preset = $derived(PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]);
  let counts = $state([...PRESETS[0].counts]);
  const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  let measure = $state(/** @type {import('./engine.js').Measure} */ ('median'));

  const groups = $derived(makeGroups(preset.start, preset.width, counts));
  const cum = $derived(cumulative(groups));
  const n = $derived(sampleSize(groups));
  const view = $derived(viewOf(groups, measure));

  /** @param {string | number} id */
  function changePreset(id) {
    const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
    counts = [...p.counts];
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Bảng số liệu"
      options={PRESETS.map((p) => ({
        value: p.id,
        label: p.unit === 'kg' ? 'Cân nặng' : 'Tự học',
      }))}
      bind:value={presetId}
      onchange={changePreset}
    />
    <button type="button" class={button.quiet} onclick={() => changePreset(presetId)}>
      Về bảng ban đầu
    </button>
  </div>

  <SegmentedControl label="Số đặc trưng" options={MEASURES} bind:value={measure} />

  <GroupChart
    {groups}
    title={preset.title}
    unit={preset.unit}
    layout="fixed"
    highlight={view.highlight === null ? [] : [view.highlight]}
    shades={view.shade ? [{ ...view.shade, opacity: 0.55 }] : []}
    markers={view.markers}
    modeIndex={view.modeIndex}
    midpoints={view.midpoints}
  />

  {#each view.tex as t, i (i)}
    <div class="overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-center">
      <Tex math={t} display />
    </div>
  {/each}
  <FeedbackNote tone={view.tone} text={view.note} />

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="pb-1 text-left text-xs text-slate-600">
        {preset.title}. Đổi tần số từng nhóm để xem số đặc trưng dịch chuyển.
      </caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">Nhóm</th>
          <th scope="col" class="py-1.5 pr-2">Tần số</th>
          <th scope="col" class="py-1.5">Tích luỹ</th>
        </tr>
      </thead>
      <tbody>
        {#each groups as g, i (i)}
          <tr class="border-b border-slate-100 {i === view.highlight ? 'bg-amber-50' : ''}">
            <th scope="row" class="py-1 pr-2 text-left font-semibold whitespace-nowrap">
              {groupText(g)}
            </th>
            <td class="py-1 pr-2">
              <Stepper label={`m${SUB[i + 1] ?? i + 1}`} bind:value={counts[i]} min={0} max={20} />
            </td>
            <td class="py-1">{cum[i]}</td>
          </tr>
        {/each}
        <tr class="font-semibold">
          <th scope="row" class="py-1.5 pr-2 text-left">Cỡ mẫu</th>
          <td class="py-1.5 pr-2" colspan="2">n = {n}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
