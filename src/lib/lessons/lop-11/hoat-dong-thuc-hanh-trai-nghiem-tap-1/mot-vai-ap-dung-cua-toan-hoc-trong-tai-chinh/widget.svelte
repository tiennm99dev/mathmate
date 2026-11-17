<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import { niceAxis } from '#lib/stats-engine/index.js';
  import { METHODS, annuityPayment, monthlyRate, schedule, totals } from './engine.js';

  /** @typedef {import('./engine.js').Method} Method */

  const W = 440;
  const H = 240;
  const L = 48;
  const R = 12;
  const T = 24;
  const B = 32;

  let loan = $state(600);
  let yearPct = $state(9);
  let months = $state(60);
  /** @type {Method} */
  let method = $state('deu');
  let shown = $state(1);

  const r = $derived(monthlyRate(yearPct));
  const rows = $derived(schedule(loan, r, months, method));
  const sum = $derived(totals(rows));
  const other = $derived(totals(schedule(loan, r, months, method === 'deu' ? 'goc' : 'deu')));
  const at = $derived(Math.min(Math.max(shown, 1), months));
  const row = $derived(rows[at - 1]);
  const before = $derived(at === 1 ? loan : rows[at - 2].balance);
  const axis = $derived(niceAxis(0, loan, 4));

  /** @param {number} k month index from 0 (0 = the day of the loan) */
  const px = (k) => L + (k / months) * (W - L - R);
  /** @param {number} v */
  const py = (v) => H - B - (v / axis.max) * (H - T - B);
  const barW = $derived(Math.max(((W - L - R) / months) * 0.7, 1));
  const xTicks = $derived(
    Array.from({ length: months + 1 }, (_, k) => k).filter(
      (k) => k % (months <= 60 ? 12 : 24) === 0,
    ),
  );

  /** Million đồng with three decimals, i.e. to the nearest thousand đồng. @param {number} v */
  const money = (v) => formatNumber(v, 3);
  /** @param {number} v */
  const texMoney = (v) => numTex(Math.round(v * 1000) / 1000, 3);

  const rateTex = $derived(numTex(r, 6));
  const stepTex = $derived(`${texMoney(row.interest)} = ${rateTex} \\cdot ${texMoney(before)}`);
  const balanceTex = $derived(
    `D_{${at}} = ${texMoney(before)} - ${texMoney(row.principal)} = ${texMoney(row.balance)}`,
  );
  const ruleTex = $derived(
    method === 'deu'
      ? `x = \\dfrac{A\\,r\\,(1 + r)^N}{(1 + r)^N - 1} = \\dfrac{${texMoney(loan)} \\cdot ${rateTex} \\cdot ${numTex(1 + r, 6)}^{${months}}}{${numTex(1 + r, 6)}^{${months}} - 1} \\approx ${texMoney(annuityPayment(loan, r, months))}`
      : `\\text{gốc mỗi tháng} = \\dfrac{A}{N} = \\dfrac{${texMoney(loan)}}{${months}} \\approx ${texMoney(loan / months)}`,
  );

  /** @param {string | number} v */
  function pickMethod(v) {
    method = /** @type {Method} */ (v);
  }

  const verdict = $derived(
    method === 'deu'
      ? `Mỗi tháng trả cùng một số tiền ${money(row.payment)} triệu đồng. Tháng đầu phần lãi lớn nên dư nợ giảm chậm; về sau phần gốc tăng dần. Tổng lãi ${money(sum.interest)} triệu đồng, nhiều hơn cách gốc đều (${money(other.interest)} triệu đồng) là ${money(sum.interest - other.interest)} triệu đồng.`
      : `Dư nợ giảm đều, mỗi tháng bớt ${money(loan / months)} triệu đồng; tiền lãi giảm dần như một cấp số cộng nên số tiền phải trả giảm từ ${money(rows[0].payment)} xuống ${money(rows[months - 1].payment)} triệu đồng. Tổng lãi ${money(sum.interest)} triệu đồng, ít hơn cách trả đều (${money(other.interest)} triệu đồng) là ${money(other.interest - sum.interest)} triệu đồng.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Số tiền vay A"
      bind:value={loan}
      min={50}
      max={2000}
      step={50}
      unit="triệu đồng"
    />
    <SliderField
      label="Lãi suất"
      bind:value={yearPct}
      min={3}
      max={15}
      step={0.1}
      unit="%/năm"
      format={(v) => formatFixed(v, 1)}
    />
    <SliderField
      label="Thời hạn vay N"
      bind:value={months}
      min={6}
      max={240}
      step={6}
      unit="tháng"
      oninput={(v) => (shown = Math.min(shown, v))}
    />
  </div>
  <SegmentedControl
    label="Cách trả nợ"
    options={METHODS.map((m) => ({ value: m.value, label: m.label }))}
    value={method}
    onchange={pickMethod}
  />
  <p class="text-sm text-slate-600">
    Lãi suất mỗi tháng: r = {formatNumber(yearPct, 1)}% : 12 = {formatNumber(r * 100, 4)}% = {formatNumber(
      r,
      6,
    )}.
  </p>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label="Biểu đồ dư nợ sau mỗi tháng, giảm dần từ {money(
      loan,
    )} triệu đồng về 0 sau {months} tháng. Sau tháng {at}, dư nợ còn {money(
      row.balance,
    )} triệu đồng."
  >
    {#each axis.ticks as t (t)}
      <line x1={L} x2={W - R} y1={py(t)} y2={py(t)} stroke="#E2E8F0" />
      <text x={L - 6} y={py(t) + 4} font-size="11" text-anchor="end" fill="#475569"
        >{formatNumber(t)}</text
      >
    {/each}
    {#each xTicks as k (k)}
      <text x={px(k)} y={H - B + 16} font-size="11" text-anchor="middle" fill="#475569">{k}</text>
    {/each}
    <text x={W - R} y={H - 4} font-size="11" text-anchor="end" fill="#475569">tháng</text>
    <text x={4} y={14} font-size="11" fill="#475569">dư nợ (triệu đồng)</text>
    {#each rows as b (b.k)}
      <rect
        x={px(b.k) - barW / 2}
        y={py(b.balance)}
        width={barW}
        height={H - B - py(b.balance)}
        fill={b.k === at ? '#F59E0B' : method === 'deu' ? '#7C3AED' : '#0EA5E9'}
      />
    {/each}
    <circle cx={px(0)} cy={py(loan)} r="4" fill="#475569" />
  </svg>

  <SliderField label="Xem tháng thứ" bind:value={shown} min={1} max={months} unit="" />

  <div class="grid gap-3 text-sm sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-3">
      <p class="text-slate-600">Tiền lãi tháng {at}</p>
      <p class="text-lg font-semibold tabular-nums">{money(row.interest)} triệu</p>
    </div>
    <div class="rounded-lg bg-slate-50 p-3">
      <p class="text-slate-600">Tiền gốc tháng {at}</p>
      <p class="text-lg font-semibold tabular-nums">{money(row.principal)} triệu</p>
    </div>
    <div class="rounded-lg bg-amber-50 p-3">
      <p class="text-slate-600">Phải trả tháng {at}</p>
      <p class="text-lg font-semibold tabular-nums">{money(row.payment)} triệu</p>
    </div>
    <div class="rounded-lg bg-slate-50 p-3">
      <p class="text-slate-600">Dư nợ sau tháng {at}</p>
      <p class="text-lg font-semibold tabular-nums">{money(row.balance)} triệu</p>
    </div>
  </div>

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 p-3 text-sm">
    <p><Tex math={ruleTex} /></p>
    <p>Tiền lãi tháng {at} = r · dư nợ đầu tháng: <Tex math={stepTex} /></p>
    <p>Dư nợ cuối tháng: <Tex math={balanceTex} /></p>
  </div>

  <div class="grid gap-3 text-sm sm:grid-cols-2">
    <div class="rounded-lg bg-violet-50 p-3">
      <p class="text-slate-600">Tổng số tiền đã trả</p>
      <p class="text-lg font-semibold tabular-nums">{money(sum.paid)} triệu đồng</p>
    </div>
    <div class="rounded-lg bg-sky-50 p-3">
      <p class="text-slate-600">Tổng tiền lãi</p>
      <p class="text-lg font-semibold tabular-nums">{money(sum.interest)} triệu đồng</p>
    </div>
  </div>

  <FeedbackNote tone="info" text={verdict} />
</div>
