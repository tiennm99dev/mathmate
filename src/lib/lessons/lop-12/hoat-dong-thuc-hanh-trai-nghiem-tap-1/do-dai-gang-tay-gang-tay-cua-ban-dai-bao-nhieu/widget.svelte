<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { niceAxis } from '#lib/stats-engine/index.js';
  import {
    BOYS_SAMPLE,
    GIRLS_SAMPLE,
    SPAN_MAX,
    SPAN_MIN,
    WIDTHS,
    compareText,
    groupSamples,
    groupText,
    measures,
    midpoint,
    parseSpans,
    percentText,
    valueText,
  } from './engine.js';

  /** @typedef {'nam' | 'nu'} Sex */

  const SERIES = /** @type {const} */ ([
    { key: 'nam', title: 'Nam', color: '#2563eb' },
    { key: 'nu', title: 'Nữ', color: '#db2777' },
  ]);

  let texts = $state({ nam: BOYS_SAMPLE, nu: GIRLS_SAMPLE });
  let width = $state(1);
  let entry = $state('');
  /** @type {Sex} */
  let entrySex = $state('nam');
  let entryNote = $state('');

  const parsed = $derived({ nam: parseSpans(texts.nam), nu: parseSpans(texts.nu) });
  const grouped = $derived(groupSamples([parsed.nam.values, parsed.nu.values], width));
  const groups = $derived({ nam: grouped[0], nu: grouped[1] });
  const stats = $derived({ nam: measures(groups.nam), nu: measures(groups.nu) });
  const top = $derived(niceAxis(0, Math.max(1, ...grouped.flat().map((g) => g.count)), 4));

  const W = 340;
  const H = 190;
  const L = 30;
  const R = 8;
  const T = 12;
  const B = 34;
  const count = $derived(grouped[0].length);
  /** @param {number} i */
  const gx = (i) => L + (i / Math.max(count, 1)) * (W - L - R);
  /** @param {number} v */
  const gy = (v) => H - B - (v / top.max) * (H - T - B);
  const labelEvery = $derived(Math.max(1, Math.ceil(count / 8)));

  /** @param {string | number} v */
  function pickWidth(v) {
    width = Number(v);
  }

  function add() {
    const v = readNumber(entry);
    if (v === null || v < SPAN_MIN || v > SPAN_MAX) {
      entryNote = `Hãy nhập một độ dài từ ${SPAN_MIN} cm đến ${SPAN_MAX} cm, chẳng hạn 19,5.`;
      return;
    }
    const written = formatNumber(v);
    texts[entrySex] = `${texts[entrySex].trim()} ${written}`.trim();
    entryNote = `Đã thêm ${written} cm vào số liệu của ${entrySex === 'nam' ? 'nam' : 'nữ'}.`;
    entry = '';
  }

  function restore() {
    texts = { nam: BOYS_SAMPLE, nu: GIRLS_SAMPLE };
    entryNote = 'Đã khôi phục số liệu mẫu.';
  }

  function clearAll() {
    texts = { nam: '', nu: '' };
    entryNote = 'Đã xoá hết số liệu. Hãy nhập số đo gang tay của lớp em.';
  }

  /** @param {import('./engine.js').Measures | null} m @param {keyof import('./engine.js').Measures} k */
  const cell = (m, k) => (m ? (k === 'cv' ? percentText(m.cv) : valueText(m[k])) : '–');

  const ROWS = /** @type {Array<[keyof import('./engine.js').Measures, string]>} */ ([
    ['n', 'Cỡ mẫu n'],
    ['mean', 'Số trung bình x̄ (cm)'],
    ['range', 'Khoảng biến thiên R (cm)'],
    ['q1', 'Tứ phân vị Q₁ (cm)'],
    ['q2', 'Trung vị Q₂ (cm)'],
    ['q3', 'Tứ phân vị Q₃ (cm)'],
    ['iqr', 'Khoảng tứ phân vị ΔQ (cm)'],
    ['variance', 'Phương sai s²'],
    ['std', 'Độ lệch chuẩn s (cm)'],
    ['cv', 'Hệ số biến thiên CV'],
  ]);

  const verdict = $derived(
    stats.nam && stats.nu
      ? compareText(stats.nam, stats.nu)
      : 'Cần số liệu của cả nam và nữ để so sánh hai nhóm.',
  );

  /** @param {Sex} key */
  const chartLabel = (key) =>
    `Biểu đồ tần số mẫu ghép nhóm gang tay của ${key === 'nam' ? 'nam' : 'nữ'}: ${groups[key]
      .map((g) => `nhóm ${groupText(g)} có ${g.count} bạn`)
      .join(', ')}.`;
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    {#each SERIES as s (s.key)}
      <div class="min-w-0">
        <label for="span-{s.key}" class="mb-1 block text-sm font-semibold" style="color: {s.color}">
          Gang tay của {s.title.toLowerCase()} (cm), cách nhau bởi dấu cách
        </label>
        <textarea
          id="span-{s.key}"
          rows="4"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm tabular-nums {focusRing}"
          bind:value={texts[s.key]}></textarea>
        <p class="text-xs text-slate-600">
          {parsed[s.key].values.length} số đo{#if parsed[s.key].bad.length}<span
              class="text-amber-800"
            >
              · bỏ qua: {parsed[s.key].bad.join(', ')}</span
            >{/if}
        </p>
      </div>
    {/each}
  </div>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      add();
    }}
  >
    <div class="w-32">
      <label for="span-entry" class="mb-1 block text-sm font-semibold text-slate-700"
        >Số đo mới (cm)</label
      >
      <input id="span-entry" class={textInput} inputmode="decimal" bind:value={entry} />
    </div>
    <SegmentedControl
      label="Giới tính"
      options={[
        { value: 'nam', label: 'Nam' },
        { value: 'nu', label: 'Nữ' },
      ]}
      value={entrySex}
      onchange={(v) => (entrySex = v === 'nu' ? 'nu' : 'nam')}
    />
    <button type="submit" class={button.primary}>Thêm</button>
    <button type="button" class={button.quiet} onclick={restore}>Số liệu mẫu</button>
    <button type="button" class={button.quiet} onclick={clearAll}>Xoá hết</button>
  </form>
  <p class="text-sm text-slate-700" aria-live="polite">{entryNote}</p>

  <SegmentedControl
    label="Độ dài mỗi nhóm h"
    options={WIDTHS.map((w) => ({ value: w, label: `${formatNumber(w)} cm` }))}
    value={width}
    onchange={pickWidth}
  />

  {#if count}
    <div class="grid gap-3 sm:grid-cols-2">
      {#each SERIES as s (s.key)}
        <figure class="min-w-0">
          <svg
            viewBox="0 0 {W} {H}"
            class="block w-full rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={chartLabel(s.key)}
          >
            {#each top.ticks as t (t)}
              <line x1={L} x2={W - R} y1={gy(t)} y2={gy(t)} stroke="#e2e8f0" />
              <text x={L - 4} y={gy(t) + 4} font-size="10" text-anchor="end" fill="#475569"
                >{formatNumber(t)}</text
              >
            {/each}
            {#each groups[s.key] as g, i (g.lo)}
              <rect
                x={gx(i)}
                y={gy(g.count)}
                width={gx(i + 1) - gx(i)}
                height={H - B - gy(g.count)}
                fill={s.color}
                fill-opacity="0.75"
                stroke="#ffffff"
              />
            {/each}
            {#each groups[s.key] as g, i (g.lo)}
              {#if i % labelEvery === 0}
                <text x={gx(i)} y={H - B + 14} font-size="10" text-anchor="middle" fill="#475569"
                  >{formatNumber(g.lo)}</text
                >
              {/if}
            {/each}
            <text x={gx(count)} y={H - B + 14} font-size="10" text-anchor="middle" fill="#475569"
              >{formatNumber(groups[s.key][count - 1].hi)}</text
            >
            <line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke="#64748b" />
            <text x={W - R} y={H - 4} font-size="10" text-anchor="end" fill="#475569">cm</text>
          </svg>
          <figcaption class="mt-1 text-center text-sm font-semibold" style="color: {s.color}">
            {s.title}
          </figcaption>
        </figure>
      {/each}
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-1 text-left text-sm font-semibold text-slate-700"
          >Bảng tần số ghép nhóm</caption
        >
        <thead>
          <tr class="border-b border-slate-300 text-left">
            <th class="py-1 pr-3">Nhóm (cm)</th>
            <th class="py-1 pr-3">Giá trị đại diện</th>
            <th class="py-1 pr-3">Nam</th>
            <th class="py-1">Nữ</th>
          </tr>
        </thead>
        <tbody>
          {#each groups.nam as g, i (g.lo)}
            <tr class="border-b border-slate-100">
              <td class="py-1 pr-3">{groupText(g)}</td>
              <td class="py-1 pr-3">{formatNumber(midpoint(g))}</td>
              <td class="py-1 pr-3">{g.count}</td>
              <td class="py-1">{groups.nu[i].count}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-1 text-left text-sm font-semibold text-slate-700"
          >Các số đặc trưng của mẫu ghép nhóm</caption
        >
        <thead>
          <tr class="border-b border-slate-300 text-left">
            <th class="py-1 pr-3">Số đặc trưng</th>
            <th class="py-1 pr-3">Nam</th>
            <th class="py-1">Nữ</th>
          </tr>
        </thead>
        <tbody>
          {#each ROWS as [k, title] (k)}
            <tr class="border-b border-slate-100">
              <td class="py-1 pr-3">{title}</td>
              <td class="py-1 pr-3">{cell(stats.nam, k)}</td>
              <td class="py-1">{cell(stats.nu, k)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <FeedbackNote tone={stats.nam && stats.nu ? 'info' : 'warn'} text={verdict} />
</div>
