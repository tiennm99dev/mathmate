<script>
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { niceAxis } from '#lib/stats-engine/index.js';
  import {
    BENEFITS,
    BENEFIT_SHORT,
    HARMS,
    HARM_SHORT,
    MAX_MINUTES,
    SURVEY,
    compareGroups,
    countAnswers,
    frequencies,
    minutesOf,
    readMinutes,
    summarize,
  } from './engine.js';

  /** @typedef {import('./engine.js').Answer} Answer */
  /** @typedef {import('./engine.js').Summary} Summary */

  /** @type {Answer[]} */
  let answers = $state([...SURVEY]);
  let added = $state(0);

  // The survey form.
  /** @type {'nam' | 'nu'} */
  let sex = $state('nu');
  let minutesText = $state('');
  let benefit = $state(0);
  let harm = $state(0);
  let formNote = $state('');

  function addAnswer() {
    const m = readMinutes(minutesText);
    if (m === null) {
      formNote = `Nhập số phút là một số tự nhiên từ 0 đến ${formatNumber(MAX_MINUTES)} (một ngày có ${formatNumber(MAX_MINUTES)} phút).`;
      return;
    }
    answers = [...answers, { sex, minutes: m, benefit, harm }];
    added += 1;
    minutesText = '';
    formNote = `Đã thêm phiếu số ${answers.length}: ${sex === 'nam' ? 'nam' : 'nữ'}, ${formatNumber(m)} phút mỗi ngày. Các số đặc trưng và biểu đồ đã cập nhật.`;
  }
  function removeLast() {
    if (added === 0) return;
    answers = answers.slice(0, -1);
    added -= 1;
    formNote = `Đã xoá phiếu vừa thêm. Mẫu còn ${answers.length} phiếu.`;
  }
  function restore() {
    answers = [...SURVEY];
    added = 0;
    formNote = 'Đã khôi phục $30$ phiếu của lớp 10A.';
  }

  let tab = $state('thoi-gian');
  /** @type {'all' | 'nam' | 'nu'} */
  let group = $state('all');
  const GROUP_NAME = { all: 'cả lớp', nam: 'học sinh nam', nu: 'học sinh nữ' };

  const values = $derived(minutesOf(answers, group));
  const summary = $derived(values.length > 0 ? summarize(values) : null);
  const freq = $derived(
    frequencies(values).map((f) => ({ label: String(f.value), value: f.count })),
  );
  const compare = $derived(compareGroups(minutesOf(answers, 'nam'), minutesOf(answers, 'nu')));
  const benefitBars = $derived(
    countAnswers(answers, 'benefit', BENEFITS.length).map((c, i) => ({
      label: BENEFIT_SHORT[i],
      value: c,
    })),
  );
  const harmBars = $derived(
    countAnswers(answers, 'harm', HARMS.length).map((c, i) => ({ label: HARM_SHORT[i], value: c })),
  );
  const topBenefit = $derived(benefitBars.reduce((a, b) => (b.value > a.value ? b : a)));
  const topHarm = $derived(harmBars.reduce((a, b) => (b.value > a.value ? b : a)));

  /** @param {number} v */
  const f1 = (v) => formatNumber(v, 1);
  /** @param {number} v */
  const f2 = (v) => formatNumber(v, 2);

  // Box plots on one axis in minutes.
  const W = 360;
  const PAD = 24;
  const scale = $derived(niceAxis(0, Math.max(60, ...answers.map((a) => a.minutes))));
  const axisMax = $derived(scale.max);
  const ticks = $derived(scale.ticks);
  /** @param {number} v */
  const sx = (v) => PAD + (v / axisMax) * (W - 2 * PAD);

  /** @param {Summary} s */
  function whiskers(s, /** @type {number[]} */ vals) {
    const inside = [...vals].sort((a, b) => a - b).filter((v) => v >= s.low && v <= s.high);
    return { lo: inside[0] ?? s.min, hi: inside[inside.length - 1] ?? s.max };
  }

  /** @param {Summary} s */
  const statsRows = (s) => [
    ['Số phiếu $n$', String(s.n)],
    ['Số trung bình $\\overline{x}$', `≈ ${f2(s.mean)} phút`],
    ['Trung vị $Q_2$', `${f1(s.median)} phút`],
    ['Tứ phân vị $Q_1$; $Q_3$', `${f1(s.q1)}; ${f1(s.q3)} phút`],
    ['Mốt', `${s.modes.map((m) => formatNumber(m)).join('; ')} phút`],
    ['Khoảng biến thiên $R$', `${formatNumber(s.range)} phút`],
    ['Khoảng tứ phân vị $\\Delta_Q$', `${f1(s.iqr)} phút`],
    ['Phương sai $s^2$', `≈ ${f2(s.variance)}`],
    ['Độ lệch chuẩn $s$', `≈ ${f2(s.sd)} phút`],
    [
      'Giá trị ngoại lệ',
      s.outliers.length > 0
        ? `${s.outliers.map((v) => formatNumber(v)).join('; ')} (lớn hơn ${f1(s.high)})`
        : 'không có',
    ],
  ];
  /** @type {Array<[string, (s: Summary) => string]>} */
  const COMPARE_ROWS = [
    ['Số phiếu', (s) => String(s.n)],
    ['Số trung bình', (s) => f2(s.mean)],
    ['Trung vị', (s) => f1(s.median)],
    ['Khoảng tứ phân vị', (s) => f1(s.iqr)],
    ['Độ lệch chuẩn', (s) => f2(s.sd)],
  ];
  const selectClass = `min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ${focusRing}`;
</script>

{#snippet boxPlot(
  /** @type {Summary} */ s,
  /** @type {number[]} */ vals,
  /** @type {number} */ y,
  /** @type {string} */ color,
)}
  {@const w = whiskers(s, vals)}
  <line x1={sx(w.lo)} y1={y} x2={sx(s.q1)} y2={y} stroke={color} stroke-width="2" />
  <line x1={sx(s.q3)} y1={y} x2={sx(w.hi)} y2={y} stroke={color} stroke-width="2" />
  <line x1={sx(w.lo)} y1={y - 8} x2={sx(w.lo)} y2={y + 8} stroke={color} stroke-width="2" />
  <line x1={sx(w.hi)} y1={y - 8} x2={sx(w.hi)} y2={y + 8} stroke={color} stroke-width="2" />
  <rect
    x={sx(s.q1)}
    y={y - 12}
    width={Math.max(1, sx(s.q3) - sx(s.q1))}
    height="24"
    fill="white"
    stroke={color}
    stroke-width="2"
  />
  <line
    x1={sx(s.median)}
    y1={y - 12}
    x2={sx(s.median)}
    y2={y + 12}
    stroke={color}
    stroke-width="3"
  />
  <path
    d="M {sx(s.mean)} {y - 5} L {sx(s.mean) + 5} {y} L {sx(s.mean)} {y + 5} L {sx(s.mean) -
      5} {y} Z"
    fill={color}
  />
  {#each s.outliers as o, i (i)}
    <circle cx={sx(o)} cy={y} r="4" fill="#dc2626" />
  {/each}
{/snippet}

{#snippet axis(/** @type {number} */ y)}
  <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#94a3b8" />
  {#each ticks as t (t)}
    <line x1={sx(t)} y1={y} x2={sx(t)} y2={y + 4} stroke="#94a3b8" />
    <text x={sx(t)} y={y + 16} text-anchor="middle" font-size="11" fill="#475569"
      >{formatNumber(t)}</text
    >
  {/each}
{/snippet}

<div class="space-y-4">
  <details class="rounded-xl border border-indigo-200 bg-indigo-50 p-3" open>
    <summary class="cursor-pointer text-sm font-semibold text-indigo-950">
      Phiếu khảo sát ({answers.length} phiếu)
    </summary>
    <div class="mt-3 grid gap-3 sm:grid-cols-2">
      <SegmentedControl
        label="1. Giới tính"
        options={[
          { value: 'nam', label: 'Nam' },
          { value: 'nu', label: 'Nữ' },
        ]}
        bind:value={sex}
      />
      <label class="flex flex-col gap-1 text-sm font-semibold text-slate-700">
        2. Mỗi ngày em dùng mạng xã hội bao nhiêu phút?
        <input
          class={textInput}
          inputmode="numeric"
          bind:value={minutesText}
          placeholder="Ví dụ: 90"
          onkeydown={(e) => e.key === 'Enter' && addAnswer()}
        />
      </label>
      <label class="flex flex-col gap-1 text-sm font-semibold text-slate-700">
        3. Lợi ích lớn nhất
        <select class={selectClass} bind:value={benefit}>
          {#each BENEFITS as b, i (b)}<option value={i}>{b}</option>{/each}
        </select>
      </label>
      <label class="flex flex-col gap-1 text-sm font-semibold text-slate-700">
        4. Bất lợi lớn nhất
        <select class={selectClass} bind:value={harm}>
          {#each HARMS as h, i (h)}<option value={i}>{h}</option>{/each}
        </select>
      </label>
    </div>
    <div class="mt-3 flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={addAnswer}>Thêm phiếu</button>
      <button type="button" class={button.quiet} onclick={removeLast} disabled={added === 0}>
        Xoá phiếu vừa thêm
      </button>
      <button type="button" class={button.quiet} onclick={restore}>Số liệu lớp 10A</button>
    </div>
    {#if formNote}
      <div class="mt-3">
        <FeedbackNote tone="info" text={formNote} />
      </div>
    {/if}
  </details>

  <SegmentedControl
    label="Xem kết quả"
    options={[
      { value: 'thoi-gian', label: 'Thời gian' },
      { value: 'so-sanh', label: 'So sánh nam, nữ' },
      { value: 'loi-hai', label: 'Lợi ích, bất lợi' },
    ]}
    bind:value={tab}
  />

  {#if tab === 'thoi-gian'}
    <SegmentedControl
      label="Nhóm"
      options={[
        { value: 'all', label: 'Cả lớp' },
        { value: 'nam', label: 'Nam' },
        { value: 'nu', label: 'Nữ' },
      ]}
      bind:value={group}
    />
    {#if summary}
      <BarChart
        data={freq}
        unit="Số học sinh"
        title="Tần số thời gian dùng mạng xã hội mỗi ngày (phút) của {GROUP_NAME[group]}"
        width={560}
      />
      <p class="text-xs text-slate-500">
        Trục ngang: thời gian (phút/ngày); chiều cao cột: tần số.
      </p>
      <div class="overflow-x-auto">
        <table class="w-full min-w-72 border-collapse text-sm tabular-nums">
          <caption class="mb-1 text-left text-slate-600">
            Các số đặc trưng của {GROUP_NAME[group]}
          </caption>
          <tbody>
            {#each statsRows(summary) as [name, value] (name)}
              <tr>
                <th class="border border-slate-200 bg-slate-50 px-2 py-1 text-left font-semibold">
                  <LiveRichText text={name} />
                </th>
                <td class="border border-slate-200 px-2 py-1">{value}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <svg
        viewBox="0 0 {W} 64"
        class="w-full"
        role="img"
        aria-label="Biểu đồ hộp của {GROUP_NAME[group]}: Q1 {f1(summary.q1)}, trung vị {f1(
          summary.median,
        )}, Q3 {f1(summary.q3)} phút"
      >
        {@render boxPlot(summary, values, 20, '#4f46e5')}
        {@render axis(42)}
      </svg>
      <FeedbackNote
        tone="info"
        text={`Trung bình mỗi bạn dùng khoảng ${f1(summary.mean)} phút mỗi ngày. Có $75\\%$ số bạn dùng từ ${f1(summary.q1)} phút trở lên, $50\\%$ từ ${f1(summary.median)} phút và $25\\%$ từ ${f1(summary.q3)} phút trở lên.${summary.outliers.length > 0 ? ` Giá trị ngoại lệ ${summary.outliers.map((v) => formatNumber(v)).join('; ')} kéo số trung bình lên cao hơn trung vị.` : ''}`}
      />
    {:else}
      <FeedbackNote tone="warn" text="Nhóm này chưa có phiếu nào." />
    {/if}
  {:else if tab === 'so-sanh'}
    {#if compare}
      <svg
        viewBox="0 0 {W} 110"
        class="w-full"
        role="img"
        aria-label="Hai biểu đồ hộp: nam trung vị {f1(compare.boys.median)} phút, nữ trung vị {f1(
          compare.girls.median,
        )} phút"
      >
        <text x={PAD} y="12" font-size="12" fill="#1e3a8a" font-weight="600">Nam</text>
        {@render boxPlot(compare.boys, minutesOf(answers, 'nam'), 30, '#1d4ed8')}
        <text x={PAD} y="56" font-size="12" fill="#9d174d" font-weight="600">Nữ</text>
        {@render boxPlot(compare.girls, minutesOf(answers, 'nu'), 74, '#be185d')}
        {@render axis(92)}
      </svg>
      <div class="overflow-x-auto">
        <table class="w-full min-w-72 border-collapse text-sm tabular-nums">
          <thead>
            <tr class="bg-slate-100">
              <th class="border border-slate-200 px-2 py-1">Số đặc trưng (phút)</th>
              <th class="border border-slate-200 px-2 py-1">Nam</th>
              <th class="border border-slate-200 px-2 py-1">Nữ</th>
            </tr>
          </thead>
          <tbody>
            {#each COMPARE_ROWS as [name, get] (name)}
              <tr>
                <th class="border border-slate-200 px-2 py-1 text-left">{name}</th>
                <td class="border border-slate-200 px-2 py-1 text-center">{get(compare.boys)}</td>
                <td class="border border-slate-200 px-2 py-1 text-center">{get(compare.girls)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <FeedbackNote
        tone="info"
        text={`${compare.more === 'equal' ? 'Nam và nữ có cùng thời gian trung bình.' : `Trung bình, học sinh ${compare.more === 'nam' ? 'nam' : 'nữ'} dùng mạng xã hội nhiều hơn (${f1(compare.more === 'nam' ? compare.boys.mean : compare.girls.mean)} so với ${f1(compare.more === 'nam' ? compare.girls.mean : compare.boys.mean)} phút).`} ${compare.spread === 'equal' ? 'Hai nhóm có cùng độ lệch chuẩn.' : `Độ lệch chuẩn của nhóm ${compare.spread === 'nam' ? 'nam' : 'nữ'} lớn hơn: thời gian của nhóm này phân tán hơn, có bạn dùng rất ít và có bạn dùng rất nhiều.`}`}
      />
    {:else}
      <FeedbackNote tone="warn" text="Cần có phiếu của cả nam và nữ để so sánh." />
    {/if}
  {:else}
    <BarChart
      data={benefitBars}
      unit="Số học sinh"
      title="Lợi ích lớn nhất của mạng xã hội theo ý kiến học sinh"
      width={560}
    />
    <BarChart
      data={harmBars}
      unit="Số học sinh"
      title="Bất lợi lớn nhất của mạng xã hội theo ý kiến học sinh"
      width={560}
    />
    <FeedbackNote
      tone="info"
      text={`Lợi ích được chọn nhiều nhất: "${BENEFITS[benefitBars.indexOf(topBenefit)]}" (${topBenefit.value} bạn, ${f1((topBenefit.value / answers.length) * 100)}%). Bất lợi được chọn nhiều nhất: "${HARMS[harmBars.indexOf(topHarm)]}" (${topHarm.value} bạn, ${f1((topHarm.value / answers.length) * 100)}%).`}
    />
  {/if}
</div>
