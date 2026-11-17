<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { pascalRow } from '../_shared/counting.js';
  import { FORMS, TOP_ROW, binomialTex, expansionTex, feedbackText } from './engine.js';

  let n = $state(4);
  let k = $state(1);
  let formId = $state('ab');

  const form = $derived(FORMS.find((f) => f.id === formId) ?? FORMS[0]);
  const rows = Array.from({ length: TOP_ROW + 1 }, (_, r) => pascalRow(r));
  const formOptions = FORMS.map((f) => ({
    value: f.id,
    label: binomialTex(f).replace(/ /g, '').replace('-', '−'),
  }));

  /** @param {number} r @param {number} c */
  function pick(r, c) {
    n = r;
    k = c;
  }

  /** @param {number} r @param {number} c */
  const isParent = (r, c) => k > 0 && k < n && r === n - 1 && (c === k - 1 || c === k);

  /** @param {number} r @param {number} c */
  function cellClass(r, c) {
    if (r === n && c === k) return 'border-indigo-700 bg-indigo-600 text-white';
    if (isParent(r, c)) return 'border-amber-500 bg-amber-100 text-amber-900';
    if (r === n) return 'border-indigo-300 bg-indigo-50 text-indigo-900';
    return 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';
  }
</script>

<div class="space-y-4">
  <SegmentedControl label="Nhị thức" options={formOptions} bind:value={formId} />

  <p class="text-sm text-slate-700">
    Hàng trên cùng là hàng n = 0, hàng dưới cùng là hàng n = {TOP_ROW}. Chạm vào một số để xem số
    hạng tương ứng của khai triển.
  </p>
  <div
    class="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-2"
    role="group"
    aria-label="Tam giác Pascal, hàng 0 đến hàng {TOP_ROW}"
  >
    {#each rows as row, r (r)}
      <div class="flex justify-center gap-1">
        {#each row as value, c (c)}
          <button
            type="button"
            class="h-11 w-11 shrink-0 rounded-full border-2 text-sm font-semibold tabular-nums {cellClass(
              r,
              c,
            )} {focusRing}"
            aria-pressed={r === n && c === k}
            aria-label="Hàng {r}, số thứ {c + 1}: {value}"
            onclick={() => pick(r, c)}>{value}</button
          >
        {/each}
      </div>
    {/each}
  </div>

  <div class="overflow-x-auto rounded-xl border border-indigo-200 bg-white p-3 text-lg">
    <Tex math={expansionTex(form, n, k)} display />
  </div>
  <FeedbackNote tone="info" text={feedbackText(form, n, k)} />
</div>
