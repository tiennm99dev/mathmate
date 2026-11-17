<script>
  import LineChart from '#lib/core/visuals/line-chart.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import {
    budget,
    growthTable,
    taxBreakdown,
    taxFormula,
    taxableIncome,
    DEDUCTION,
  } from './engine.js';

  let tab = $state('ngan-sach');

  /** @param {number} v */
  const mil = (v) => formatNumber(v, 2);

  // Budget: a month's income against four spending items.
  let income = $state(12);
  let items = $state([
    { name: 'Ăn uống, sinh hoạt', value: 5 },
    { name: 'Đi lại', value: 1.5 },
    { name: 'Học tập', value: 2 },
    { name: 'Giải trí, mua sắm', value: 2 },
  ]);
  const plan = $derived(
    budget(
      income,
      items.map((i) => i.value),
    ),
  );
  const budgetNote = $derived(
    plan.saved < 0
      ? {
          tone: /** @type {const} */ ('warn'),
          text: `Chi tiêu vượt thu nhập ${mil(-plan.saved)} triệu đồng: ngân sách bị thâm hụt. Hãy bớt các khoản không thiết yếu như giải trí, mua sắm.`,
        }
      : plan.rate >= 20
        ? {
            tone: /** @type {const} */ ('ok'),
            text: `Mỗi tháng để dành được ${mil(plan.saved)} triệu đồng, tức ${formatNumber(plan.rate, 1)}% thu nhập; sau $12$ tháng được ${mil(plan.saved * 12)} triệu đồng (chưa kể lãi).`,
          }
        : {
            tone: /** @type {const} */ ('info'),
            text: `Mỗi tháng để dành được ${mil(plan.saved)} triệu đồng, tức ${formatNumber(plan.rate, 1)}% thu nhập. Nhiều người đặt mục tiêu để dành ít nhất $20\\%$ thu nhập: hãy thử giảm một khoản chi.`,
          },
  );

  // Interest: simple against compound over the years.
  let principal = $state(100);
  let ratePct = $state(6);
  let years = $state(10);
  const table = $derived(growthTable(principal, ratePct / 100, years));
  const last = $derived(table[table.length - 1]);
  const chartSeries = $derived([
    { name: 'Lãi kép', values: table.map((r) => r.compound) },
    { name: 'Lãi đơn', values: table.map((r) => r.simple) },
  ]);

  // Income tax by the progressive table.
  let salary = $state(28);
  let dependants = $state(1);
  const taxable = $derived(taxableIncome(salary, dependants));
  const tax = $derived(taxBreakdown(taxable));
  const formula = $derived(taxFormula(taxable));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn phần"
    options={[
      { value: 'ngan-sach', label: 'Ngân sách' },
      { value: 'lai', label: 'Lãi đơn, lãi kép' },
      { value: 'thue', label: 'Thuế thu nhập' },
    ]}
    bind:value={tab}
  />

  {#if tab === 'ngan-sach'}
    <p class="text-sm text-slate-700">
      Kéo các thanh trượt để lập ngân sách một tháng (đơn vị: triệu đồng). Phần còn lại sau chi tiêu
      là tiền tiết kiệm.
    </p>
    <SliderField
      label="Thu nhập mỗi tháng"
      bind:value={income}
      min={0}
      max={30}
      step={0.5}
      unit="triệu đồng"
      format={mil}
    />
    <div class="space-y-2 rounded-xl border border-slate-200 p-3">
      <p class="text-sm font-semibold text-slate-700">Chi tiêu mỗi tháng</p>
      {#each items as item (item.name)}
        <SliderField
          label={item.name}
          bind:value={item.value}
          min={0}
          max={15}
          step={0.5}
          unit="triệu đồng"
          format={mil}
        />
      {/each}
    </div>
    <div class="grid grid-cols-3 gap-2 text-center text-sm tabular-nums">
      <div class="rounded-lg bg-slate-50 p-2">
        <div class="text-slate-600">Thu nhập</div>
        <div class="font-semibold">{mil(income)}</div>
      </div>
      <div class="rounded-lg bg-slate-50 p-2">
        <div class="text-slate-600">Chi tiêu</div>
        <div class="font-semibold">{mil(plan.spent)}</div>
      </div>
      <div class="rounded-lg p-2 {plan.saved < 0 ? 'bg-amber-50' : 'bg-emerald-50'}">
        <div class="text-slate-600">Tiết kiệm</div>
        <div class="font-semibold">{mil(plan.saved)}</div>
      </div>
    </div>
    <FeedbackNote tone={budgetNote.tone} text={budgetNote.text} />
  {:else if tab === 'lai'}
    <p class="text-sm text-slate-700">
      Gửi số tiền gốc <i>A</i> với lãi suất <i>r</i> mỗi năm. Lãi đơn: chỉ tiền gốc sinh lãi. Lãi kép:
      tiền lãi mỗi năm được cộng vào gốc để tính lãi năm sau.
    </p>
    <SliderField
      label="Tiền gốc A"
      bind:value={principal}
      min={10}
      max={500}
      step={10}
      unit="triệu đồng"
      format={mil}
    />
    <SliderField
      label="Lãi suất r"
      bind:value={ratePct}
      min={1}
      max={12}
      step={0.1}
      unit="%/năm"
      format={(v) => formatNumber(v, 1)}
    />
    <SliderField label="Số năm gửi n" bind:value={years} min={1} max={20} unit="năm" />
    <LineChart
      labels={table.map((r) => String(r.year))}
      series={chartSeries}
      unit="Triệu đồng"
      title="Số tiền nhận được theo số năm gửi, lãi kép và lãi đơn"
      showValues={false}
      width={560}
    />
    <p class="text-xs text-slate-500">
      Trục ngang: số năm gửi. Đường nét liền: lãi kép; đường nét đứt: lãi đơn.
    </p>
    <FeedbackNote
      tone="info"
      text={`Sau ${years} năm: lãi đơn $T = A(1 + nr)$ cho ${mil(last.simple)} triệu đồng; lãi kép $T = A(1 + r)^n$ cho ${mil(last.compound)} triệu đồng, nhiều hơn ${mil(last.compound - last.simple)} triệu đồng. Năm thứ nhất hai cách bằng nhau; về sau lãi kép tăng ngày càng nhanh vì lãi cũng sinh lãi.`}
    />
  {:else}
    <p class="text-sm text-slate-700">
      Thu nhập tính thuế = thu nhập − giảm trừ bản thân ({formatNumber(DEDUCTION.self)} triệu) − giảm
      trừ mỗi người phụ thuộc ({formatNumber(DEDUCTION.dependant)} triệu), theo biểu thuế trong sách giáo
      khoa.
    </p>
    <SliderField
      label="Thu nhập mỗi tháng"
      bind:value={salary}
      min={5}
      max={100}
      step={0.5}
      unit="triệu đồng"
      format={mil}
    />
    <Stepper label="Số người phụ thuộc" bind:value={dependants} min={0} max={4} />
    <div class="overflow-x-auto">
      <table class="w-full min-w-72 border-collapse text-sm tabular-nums">
        <caption class="mb-1 text-left text-slate-600">
          Thu nhập tính thuế: {mil(taxable)} triệu đồng/tháng
        </caption>
        <thead>
          <tr class="bg-slate-100">
            <th class="border border-slate-200 px-2 py-1">Bậc</th>
            <th class="border border-slate-200 px-2 py-1">Phần thu nhập (triệu)</th>
            <th class="border border-slate-200 px-2 py-1">Thuế suất</th>
            <th class="border border-slate-200 px-2 py-1">Thuế (triệu)</th>
          </tr>
        </thead>
        <tbody>
          {#each tax.rows as r (r.level)}
            <tr>
              <td class="border border-slate-200 px-2 py-1 text-center">{r.level}</td>
              <td class="border border-slate-200 px-2 py-1 text-center">{mil(r.part)}</td>
              <td class="border border-slate-200 px-2 py-1 text-center"
                >{formatNumber(r.rate * 100)}%</td
              >
              <td class="border border-slate-200 px-2 py-1 text-center">{mil(r.tax)}</td>
            </tr>
          {:else}
            <tr>
              <td colspan="4" class="border border-slate-200 px-2 py-1 text-center">
                Không có phần nào phải chịu thuế.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <FeedbackNote
      tone={taxable > 0 ? 'info' : 'ok'}
      text={taxable > 0
        ? `Thuế mỗi tháng: ${mil(tax.total)} triệu đồng, cả năm ${mil(tax.total * 12)} triệu đồng. Công thức của bậc ${tax.rows.length}: $y = ${numTex(formula.rate)}x${formula.minus > 0 ? ` - ${numTex(formula.minus)}` : ''}$ cũng cho ${mil(tax.total)} triệu đồng.`
        : 'Thu nhập không vượt quá mức giảm trừ gia cảnh nên không phải nộp thuế thu nhập cá nhân.'}
    />
  {/if}
</div>
