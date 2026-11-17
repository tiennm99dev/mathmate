<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { fmt } from '#lib/core/number-format.js';
  import {
    FORMS,
    TOP_ROW,
    binomialTex,
    expansionTex,
    feedbackText,
    generalTermTex,
    pascalRow,
  } from './engine.js';

  let n = $state(6);
  let k = $state(2);
  let formId = $state('x-2y');

  const f = $derived(FORMS.find((x) => x.id === formId) ?? FORMS[0]);
  const rows = $derived(Array.from({ length: n + 1 }, (_, r) => pascalRow(r)));
  const formOptions = FORMS.map((x) => ({
    value: x.id,
    label: binomialTex(x).replace(/ /g, '').replace('-', '−'),
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

  <div class="flex flex-wrap gap-4">
    <Stepper
      label="Số mũ n"
      bind:value={n}
      min={0}
      max={TOP_ROW}
      onchange={(v) => {
        if (k > v) k = v;
      }}
    />
    <Stepper label="Chỉ số k" bind:value={k} min={0} max={n} />
  </div>

  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
    <div
      class="w-max min-w-full space-y-1"
      role="group"
      aria-label="Tam giác Pascal, hàng 0 đến hàng {n}"
    >
      {#each rows as row, r (r)}
        <div class="flex justify-center gap-1">
          {#each row as value, c (c)}
            <button
              type="button"
              class="h-11 min-w-11 shrink-0 rounded-full border-2 px-1 text-xs font-semibold tabular-nums {cellClass(
                r,
                c,
              )} {focusRing}"
              aria-pressed={r === n && c === k}
              aria-label="Hàng {r}, số thứ {c + 1}: {fmt(value)}"
              onclick={() => pick(r, c)}>{fmt(value)}</button
            >
          {/each}
        </div>
      {/each}
    </div>
  </div>

  {#if n >= 7}
    <p class="text-xs text-slate-600 sm:hidden">Vuốt ngang tam giác để xem hết các hàng dài.</p>
  {/if}

  <div class="space-y-2 rounded-xl border border-indigo-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-700">Số hạng tổng quát</p>
    <div class="overflow-x-auto">
      <Tex math={generalTermTex(f, n, k)} display />
    </div>
    <p class="text-sm font-semibold text-slate-700">Khai triển</p>
    <div class="overflow-x-auto">
      <Tex math={expansionTex(f, n, k)} display />
    </div>
  </div>
  <FeedbackNote tone="info" text={feedbackText(f, n, k)} />
</div>
