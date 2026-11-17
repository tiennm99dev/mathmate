<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { formulaText, money, plan, rowText, verdict } from './engine.js';

  let V = $state(500);
  let rate = $state(7.4);
  let months = $state(60);
  let k = $state(1);

  const loan = $derived({ V, rate, months });
  const p = $derived(plan(loan));
  const period = $derived(clamp(k, 1, months));
  const note = $derived(verdict(loan));

  const W = 480;
  const H = 200;
  const LEFT = 8;
  const RIGHT = 8;
  const TOP = 10;
  const BOTTOM = 190;
  const slot = $derived((W - LEFT - RIGHT) / months);
  const scale = $derived((BOTTOM - TOP) / p.payment);
  const row = $derived(p.rows[period - 1]);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** @param {PointerEvent} e */
  function pick(e) {
    if (!svgEl) return;
    const box = svgEl.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * W;
    k = clamp(Math.floor((x - LEFT) / slot) + 1, 1, months);
  }

  /** @param {KeyboardEvent} e */
  function key(e) {
    const step = {
      ArrowRight: 1,
      ArrowUp: 1,
      ArrowLeft: -1,
      ArrowDown: -1,
      PageUp: 12,
      PageDown: -12,
    }[e.key];
    if (e.key === 'Home') k = 1;
    else if (e.key === 'End') k = months;
    else if (step) k = clamp(period + step, 1, months);
    else return;
    e.preventDefault();
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Số tiền vay V"
      bind:value={V}
      min={10}
      max={1000}
      step={10}
      unit="triệu đồng"
    />
    <SliderField
      label="Lãi suất năm"
      bind:value={rate}
      min={1}
      max={20}
      step={0.1}
      unit="%"
      format={(v) => formatNumber(v, 1)}
    />
    <SliderField label="Số kì trả n" bind:value={months} min={6} max={120} step={6} unit="tháng" />
  </div>

  <div class="overflow-x-auto rounded-lg border border-indigo-200 bg-white p-3 text-center text-sm">
    <LiveRichText text={formulaText(loan)} />
  </div>

  <div>
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="block w-full rounded-lg {focusRing}"
      style:aspect-ratio="{W} / {H}"
      style:touch-action="none"
      role="slider"
      tabindex="0"
      aria-label="Biểu đồ gốc và lãi theo từng kì; chọn kì bằng phím mũi tên hoặc chạm vào cột"
      aria-valuemin={1}
      aria-valuemax={months}
      aria-valuenow={period}
      aria-valuetext="Kì {period}: lãi {money(row.interest)}, gốc {money(row.principal)} triệu đồng"
      onpointerdown={pick}
      onpointermove={(e) => e.buttons && pick(e)}
      onkeydown={key}
    >
      {#each p.rows as r (r.k)}
        {@const x = LEFT + (r.k - 1) * slot}
        {@const hp = r.principal * scale}
        {@const hi = r.interest * scale}
        <rect x={x + slot * 0.1} y={BOTTOM - hp} width={slot * 0.8} height={hp} fill="#4f46e5" />
        <rect
          x={x + slot * 0.1}
          y={BOTTOM - hp - hi}
          width={slot * 0.8}
          height={hi}
          fill="#f59e0b"
        />
      {/each}
      <rect
        x={LEFT + (period - 1) * slot}
        y={TOP - 4}
        width={slot}
        height={BOTTOM - TOP + 6}
        fill="none"
        stroke="#0f172a"
        stroke-width="2"
      />
      <line x1={LEFT} y1={BOTTOM} x2={W - RIGHT} y2={BOTTOM} stroke="#334155" />
    </svg>
    <div class="mt-1 flex flex-wrap justify-center gap-4 text-xs text-slate-600" aria-hidden="true">
      <span
        ><span class="inline-block size-3 rounded-sm bg-indigo-600 align-middle"></span> Tiền gốc</span
      >
      <span
        ><span class="inline-block size-3 rounded-sm bg-amber-500 align-middle"></span> Tiền lãi</span
      >
      <span>Kì 1 ở bên trái, kì cuối ở bên phải</span>
    </div>
  </div>

  <SliderField label="Xem kì thứ" bind:value={k} min={1} max={months} />
  <p class="text-sm text-slate-700" aria-live="polite">
    <LiveRichText text={rowText(loan, period)} />
  </p>

  <div class="max-h-64 overflow-auto rounded-lg border border-slate-200">
    <table class="w-full text-right text-sm tabular-nums">
      <caption class="sr-only">Lịch trả nợ (triệu đồng)</caption>
      <thead class="sticky top-0 bg-slate-100 text-slate-700">
        <tr>
          <th scope="col" class="px-2 py-1">Kì</th>
          <th scope="col" class="px-2 py-1">Khoản trả</th>
          <th scope="col" class="px-2 py-1">Lãi</th>
          <th scope="col" class="px-2 py-1">Gốc</th>
          <th scope="col" class="px-2 py-1">Còn nợ</th>
        </tr>
      </thead>
      <tbody>
        {#each p.rows as r (r.k)}
          <tr class={r.k === period ? 'bg-indigo-50 font-semibold' : ''}>
            <th scope="row" class="px-2 py-1">{r.k}</th>
            <td class="px-2 py-1">{money(r.payment)}</td>
            <td class="px-2 py-1">{money(r.interest)}</td>
            <td class="px-2 py-1">{money(r.principal)}</td>
            <td class="px-2 py-1">{money(r.balance)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
