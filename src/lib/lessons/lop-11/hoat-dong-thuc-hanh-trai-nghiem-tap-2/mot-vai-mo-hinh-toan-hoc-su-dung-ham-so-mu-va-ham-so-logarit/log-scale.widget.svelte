<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatFixed, formatNumber, numTex, sup, tidy } from '#lib/core/number-format.js';
  import { SCALES, scientific } from './engine.js';

  /**
   * A logarithmic scale (pH, Richter, decibel): the slider moves the
   * measured quantity across many powers of ten, the ruler shows the scale
   * value. Multiplying the quantity by 10 always moves the scale by the same
   * step: −1 for pH, +1 for Richter, +10 dB for the sound level.
   */

  const W = 360;
  const H = 108;
  const L = 20;
  const R = 20;
  const Y = 46;

  let scaleId = $state('ph');
  let e = $state(-7);
  let note = $state('');

  const scale = $derived(SCALES.find((s) => s.id === scaleId) ?? SCALES[0]);
  const value = $derived(tidy(scale.value(e), 6));
  const sci = $derived(scientific(e, 1));
  const lo = $derived(Math.min(scale.value(scale.lo), scale.value(scale.hi)));
  const hi = $derived(Math.max(scale.value(scale.lo), scale.value(scale.hi)));
  /** @param {number} v */
  const px = (v) => L + ((v - lo) / (hi - lo)) * (W - L - R);
  /** The tick values: every whole step of the scale (every 10 dB). */
  const ticks = $derived.by(() => {
    const step = Math.abs(scale.perDecade);
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(v);
    return out;
  });
  /** The exponent of the quantity at a scale value. @param {number} v */
  const expAt = (v) => Math.round(v / scale.perDecade + (scale.id === 'db' ? -12 : 0));
  /** @param {number} k */
  const tenPow = (k) => `10${k < 0 ? '⁻' : ''}${sup(Math.abs(k))}`;

  const symbol = $derived(
    scale.id === 'ph' ? '[H^+]' : scale.id === 'richter' ? '\\dfrac{A}{A_0}' : 'I',
  );
  const quantityTex = $derived(
    `${symbol} \\approx ${numTex(sci.m, 1)} \\cdot 10^{${sci.k}}${scale.id === 'ph' ? '\\ \\text{mol/l}' : scale.id === 'db' ? '\\ \\text{W/m}^2' : ''}`,
  );
  const scaleTex = $derived(
    scale.id === 'ph'
      ? `\\mathrm{pH} = -\\log[H^+] \\approx ${numTex(value, 1)}`
      : scale.id === 'richter'
        ? `M = \\log\\dfrac{A}{A_0} \\approx ${numTex(value, 1)}`
        : `L = 10\\log\\dfrac{I}{I_0} \\approx ${numTex(value, 1)}\\ \\text{dB}`,
  );
  const valueText = $derived(
    scale.id === 'db'
      ? `${formatFixed(value, 1)} dB`
      : `${scale.scaleName} = ${formatFixed(value, 1)}`,
  );

  /** @param {string | number} v */
  function pickScale(v) {
    scaleId = String(v);
    const s = SCALES.find((x) => x.id === scaleId) ?? SCALES[0];
    e = s.start;
    note = '';
  }

  /** @param {number} dir +1 multiplies the quantity by 10, −1 divides it */
  function times(dir) {
    const next = tidy(e + dir, 6);
    if (next < scale.lo - 1e-9 || next > scale.hi + 1e-9) {
      note = 'Đã đến đầu thang, không thể nhân hoặc chia thêm.';
      return;
    }
    const before = value;
    e = next;
    const after = tidy(scale.value(next), 6);
    const change = tidy(after - before, 6);
    const what = dir > 0 ? 'tăng gấp 10 lần' : 'giảm đi 10 lần';
    const shift = `${change > 0 ? 'tăng' : 'giảm'} ${formatNumber(Math.abs(change))}${scale.id === 'db' ? ' dB' : ''}`;
    note = `${scale.quantity} ${what} thì ${scale.id === 'db' ? 'mức cường độ âm' : scale.scaleName} ${shift}: từ ${formatFixed(before, 1)} thành ${formatFixed(after, 1)}. Vì $\\log(10x) = 1 + \\log x$.`;
  }

  const verdict = $derived.by(() => {
    if (note) return note;
    if (scale.id === 'ph') {
      const kind =
        value < 7 - 1e-9 ? 'có tính acid' : value > 7 + 1e-9 ? 'có tính base' : 'trung tính';
      return `pH ≈ ${formatFixed(value, 1)}: dung dịch ${kind} (so sánh pH với 7).`;
    }
    if (scale.id === 'richter')
      return `Biên độ gấp khoảng ${formatNumber(sci.m, 1)} · ${tenPow(sci.k)} lần biên độ chuẩn, nhưng độ lớn chỉ là ${formatFixed(value, 1)} độ Richter.`;
    return `Cường độ âm trải từ 10⁻¹² đến 10 W/m², còn mức cường độ âm chỉ từ 0 đến 130 dB.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thang đo"
    options={SCALES.map((s) => ({ value: s.id, label: s.label }))}
    value={scaleId}
    onchange={pickScale}
  />
  <SliderField
    label="{scale.quantity} (số mũ của 10)"
    bind:value={e}
    min={scale.lo}
    max={scale.hi}
    step={0.1}
    format={(v) => formatFixed(v, 1)}
    oninput={() => (note = '')}
  />
  <div class="overflow-x-auto rounded-lg border border-slate-200 p-3 text-sm">
    <p><Tex math={quantityTex} /></p>
    <p class="mt-1"><Tex math={scaleTex} /></p>
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label="Thang {scale.label}: giá trị hiện tại {valueText}"
  >
    <line x1={L} x2={W - R} y1={Y} y2={Y} stroke="#64748B" stroke-width="2" />
    {#each ticks as t, i (t)}
      <line x1={px(t)} x2={px(t)} y1={Y - 5} y2={Y + 5} stroke="#64748B" />
      <text x={px(t)} y={Y + 20} font-size="12" text-anchor="middle" fill="#334155"
        >{formatNumber(t)}</text
      >
      {#if ticks.length <= 10 || i % 2 === 0}
        <text x={px(t)} y={Y + 38} font-size="11" text-anchor="middle" fill="#64748B"
          >{tenPow(expAt(t))}</text
        >
      {/if}
    {/each}
    {#each scale.marks as m (m.name)}
      <line x1={px(m.at)} x2={px(m.at)} y1={Y - 14} y2={Y} stroke="#0EA5E9" stroke-width="2" />
      <text
        x={px(m.at)}
        y={Y - 18}
        font-size="12"
        text-anchor={px(m.at) < L + 40 ? 'start' : px(m.at) > W - R - 40 ? 'end' : 'middle'}
        fill="#0369A1">{m.name}</text
      >
    {/each}
    <circle cx={px(value)} cy={Y} r="7" fill="#F59E0B" stroke="#FFFFFF" stroke-width="2" />
  </svg>
  <p class="text-xs text-slate-500">
    Hàng số trên: giá trị của thang. Hàng số dưới: {scale.quantity.charAt(0).toLowerCase() +
      scale.quantity.slice(1)} tương ứng{scale.unit ? ` (${scale.unit})` : ''}.
  </p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} onclick={() => times(1)}>Nhân với 10</button>
    <button type="button" class={button.secondary} onclick={() => times(-1)}>Chia cho 10</button>
  </div>
  <FeedbackNote tone={note ? 'ok' : 'info'} text={verdict} />
</div>
