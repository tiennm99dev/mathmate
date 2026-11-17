<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import GroupChart from '../_shared/group-chart.svelte';
  import { groupText, midpoint, sampleSize } from '../_shared/grouped.js';
  import { FIELDS, UNIT, groupsOf, riskView, shareText, verdict } from './engine.js';

  let counts = $state({ A: [...FIELDS[0].counts], B: [...FIELDS[1].counts] });
  let editing = $state(/** @type {'A' | 'B'} */ ('A'));
  const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];

  const groupsA = $derived(groupsOf(counts.A));
  const groupsB = $derived(groupsOf(counts.B));
  const viewA = $derived(riskView(groupsA));
  const viewB = $derived(riskView(groupsB));
  const result = $derived(verdict(viewA, viewB));

  const field = $derived(FIELDS.find((f) => f.id === editing) ?? FIELDS[0]);
  const groups = $derived(editing === 'A' ? groupsA : groupsB);
  const view = $derived(editing === 'A' ? viewA : viewB);

  function reset() {
    counts = { A: [...FIELDS[0].counts], B: [...FIELDS[1].counts] };
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <figure class="space-y-1">
      <figcaption class="text-sm font-semibold text-slate-700">Lĩnh vực A</figcaption>
      <GroupChart
        groups={groupsA}
        title={FIELDS[0].title}
        unit={UNIT}
        markers={viewA.markers}
        band={viewA.band}
      />
    </figure>
    <figure class="space-y-1">
      <figcaption class="text-sm font-semibold text-slate-700">Lĩnh vực B</figcaption>
      <GroupChart
        groups={groupsB}
        title={FIELDS[1].title}
        unit={UNIT}
        markers={viewB.markers}
        band={viewB.band}
      />
    </figure>
  </div>
  <p class="text-xs text-slate-600">
    Dải đỏ đi từ x̄ − s đến x̄ + s: dải càng rộng, lợi nhuận càng phân tán quanh số trung bình.
  </p>

  <FeedbackNote tone={result.tone} text={result.text} />

  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Sửa bảng của"
      options={FIELDS.map((f) => ({ value: f.id, label: `Lĩnh vực ${f.id}` }))}
      bind:value={editing}
    />
    <button type="button" class={button.quiet} onclick={reset}>Về bảng ban đầu</button>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="pb-1 text-left text-xs text-slate-600">
        {field.title}. Cột cuối là phần đóng góp của mỗi nhóm vào tử số của phương sai.
      </caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">Nhóm</th>
          <th scope="col" class="py-1.5 pr-2">Tần số</th>
          <th scope="col" class="py-1.5 pr-2">xᵢ</th>
          <th scope="col" class="py-1.5">mᵢ(xᵢ − x̄)²</th>
        </tr>
      </thead>
      <tbody>
        {#each groups as g, i (i)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 pr-2 text-left font-semibold whitespace-nowrap">
              {groupText(g)}
            </th>
            <td class="py-1 pr-2">
              <Stepper
                label={`Lĩnh vực ${editing}, m${SUB[i + 1] ?? i + 1}`}
                bind:value={counts[editing][i]}
                min={0}
                max={20}
              />
            </td>
            <td class="py-1 pr-2">{formatNumber(midpoint(g))}</td>
            <td class="py-1">{view.empty ? '—' : shareText(view.shares[i])}</td>
          </tr>
        {/each}
        <tr class="font-semibold">
          <th scope="row" class="py-1.5 pr-2 text-left">Cỡ mẫu</th>
          <td class="py-1.5 pr-2" colspan="3">n = {sampleSize(groups)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  {#each view.tex as t, i (i)}
    <div class="overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-center">
      <Tex math={t} display />
    </div>
  {/each}
</div>
