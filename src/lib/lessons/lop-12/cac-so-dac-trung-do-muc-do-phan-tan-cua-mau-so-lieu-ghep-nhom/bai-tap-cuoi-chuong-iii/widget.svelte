<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import GroupChart from '../_shared/group-chart.svelte';
  import { SAMPLES } from '../_shared/datasets.js';
  import {
    cumulative,
    groupText,
    groupedIqr,
    groupedRange,
    sampleSize,
  } from '../_shared/grouped.js';
  import { checkTyped, compare } from './engine.js';

  let sampleId = $state(SAMPLES[0].id);
  const sample = $derived(SAMPLES.find((s) => s.id === sampleId) ?? SAMPLES[0]);
  let width = $state(SAMPLES[0].widths[Math.floor(SAMPLES[0].widths.length / 2)]);
  let typed = $state({ range: '', iqr: '', std: '' });
  let checked = $state(false);
  let shown = $state(false);
  const uid = $props.id();

  const result = $derived(compare(sample, width));
  const cum = $derived(cumulative(result.groups));
  const iqr = $derived(groupedIqr(result.groups));
  const spread = $derived(groupedRange(result.groups));
  const verdicts = $derived(
    result.rows.map((r) => ({ ...r, verdict: checkTyped(typed[r.id], r.grouped) })),
  );
  const allRight = $derived(verdicts.every((v) => v.verdict === 'ok'));

  function reset() {
    typed = { range: '', iqr: '', std: '' };
    checked = false;
    shown = false;
  }

  /** @param {string | number} id */
  function changeSample(id) {
    const s = SAMPLES.find((x) => x.id === id) ?? SAMPLES[0];
    width = s.widths[Math.floor(s.widths.length / 2)];
    reset();
  }

  const VERDICT = {
    ok: 'Đúng.',
    wrong: 'Chưa đúng, hãy tính lại.',
    empty: 'Chưa nhập.',
    invalid: 'Không đọc được số này.',
  };

  const summary = $derived.by(() => {
    if (!checked) return '';
    if (allRight) {
      return 'Cả ba kết quả đều đúng. Bấm "So sánh với mẫu gốc" để xem các số đo độ phân tán của mẫu ghép nhóm gần với số liệu gốc đến đâu.';
    }
    const wrong = verdicts.filter((v) => v.verdict !== 'ok').map((v) => v.name.toLowerCase());
    return `Cần xem lại: ${wrong.join(', ')}. Nhớ: $R = a_{k+1} - a_1$; $\\Delta_Q = Q_3 - Q_1$ với $Q_1$, $Q_3$ tính bằng công thức nội suy; $s$ là căn bậc hai của phương sai, tính bằng giá trị đại diện.`;
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Bộ dữ liệu"
      options={SAMPLES.map((s) => ({ value: s.id, label: s.label }))}
      bind:value={sampleId}
      onchange={changeSample}
    />
    <SegmentedControl
      label="Độ dài nhóm"
      options={sample.widths.map((w) => ({ value: w, label: formatNumber(w) }))}
      bind:value={width}
      onchange={reset}
    />
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="pb-1 text-left text-xs text-slate-600">
        {sample.title}, ghép thành các nhóm độ dài {formatNumber(width)}
        {sample.unit}.
      </caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">Nhóm</th>
          <th scope="col" class="py-1.5 pr-2">Tần số</th>
          <th scope="col" class="py-1.5">Tích luỹ</th>
        </tr>
      </thead>
      <tbody>
        {#each result.groups as g, i (i)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 pr-2 text-left font-semibold whitespace-nowrap"
              >{groupText(g)}</th
            >
            <td class="py-1 pr-2">{g.count}</td>
            <td class="py-1">{cum[i]}</td>
          </tr>
        {/each}
        <tr class="font-semibold">
          <th scope="row" class="py-1.5 pr-2 text-left">Cỡ mẫu</th>
          <td class="py-1.5" colspan="2">n = {sampleSize(result.groups)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <fieldset class="space-y-2">
    <legend class="mb-1 text-sm font-semibold text-slate-700">
      Tự tính từ bảng trên (làm tròn đến hàng phần trăm)
    </legend>
    {#each verdicts as v (v.id)}
      <div class="grid grid-cols-[8.5rem_1fr] items-center gap-2 sm:grid-cols-[9rem_10rem_1fr]">
        <label for="{uid}-{v.id}" class="text-sm font-semibold text-slate-700">{v.name}</label>
        <input
          id="{uid}-{v.id}"
          class={textInput}
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed[v.id]}
          oninput={() => (checked = false)}
        />
        {#if checked}
          <p
            class="col-span-2 text-sm font-semibold sm:col-span-1 {v.verdict === 'ok'
              ? 'text-emerald-700'
              : 'text-amber-800'}"
          >
            {VERDICT[v.verdict]}
          </p>
        {/if}
      </div>
    {/each}
    <div class="flex flex-wrap gap-2 pt-1">
      <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button
      >
      <button
        type="button"
        class={button.secondary}
        aria-expanded={shown}
        onclick={() => (shown = !shown)}
      >
        {shown ? 'Ẩn so sánh' : 'So sánh với mẫu gốc'}
      </button>
    </div>
  </fieldset>

  {#if checked}
    <FeedbackNote tone={allRight ? 'ok' : 'warn'} text={summary} />
  {/if}

  {#if shown}
    <GroupChart
      groups={result.groups}
      title={sample.title}
      unit={sample.unit}
      highlight={[...new Set([iqr.q1.index, iqr.q3.index])]}
      span={{
        from: spread.lo,
        to: spread.hi,
        label: `R = ${formatNumber(spread.value)}`,
      }}
      band={{
        from: iqr.q1.value,
        to: iqr.q3.value,
        label: `ΔQ ≈ ${formatNumber(iqr.value, 2)}`,
        color: '#7c3aed',
      }}
    />
    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">So sánh số đo độ phân tán của mẫu ghép nhóm và mẫu gốc</caption>
        <thead>
          <tr class="border-b border-slate-200 text-left text-slate-700">
            <th scope="col" class="py-1.5 pr-2">Số đo</th>
            <th scope="col" class="py-1.5 pr-2">Mẫu ghép nhóm</th>
            <th scope="col" class="py-1.5 pr-2">Mẫu gốc</th>
            <th scope="col" class="py-1.5">Chênh lệch</th>
          </tr>
        </thead>
        <tbody>
          {#each result.rows as r (r.id)}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1.5 pr-2 text-left font-semibold">{r.name}</th>
              <td class="py-1.5 pr-2">{formatNumber(r.grouped, 2)}</td>
              <td class="py-1.5 pr-2">{formatNumber(r.exact, 2)}</td>
              <td class="py-1.5">{formatNumber(Math.abs(r.grouped - r.exact), 2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <FeedbackNote
      tone="info"
      text="Các số đo tính từ mẫu ghép nhóm chỉ xấp xỉ số liệu gốc. Khoảng biến thiên của mẫu ghép nhóm luôn lớn hơn hoặc bằng của mẫu gốc, vì nhóm đầu và nhóm cuối thường rộng hơn phần có số liệu. Đổi độ dài nhóm: nhóm hẹp thường cho kết quả sát hơn, nhóm rộng làm mất nhiều thông tin hơn."
    />
  {/if}
</div>
