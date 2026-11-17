<script>
  import { onDestroy } from 'svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { flight } from './engine.js';

  const W = 420;
  const H = 300;
  const T_MAX = 3.5;
  const H_MAX = 14;
  const tx = linear(0, T_MAX, 44, W - 14).map;
  const hy = linear(0, H_MAX, H - 34, 14).map;
  const T_TICKS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];
  const H_TICKS = [0, 2, 4, 6, 8, 10, 12, 14];

  let v0 = $state(12.2);
  let h0 = $state(1.2);
  let t = $state(0);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const f = $derived(flight(v0, h0));
  const now = $derived(Math.min(t, f.land));
  const height = $derived(Math.max(0, f.at(now)));
  const landed = $derived(t >= f.land);

  const path = $derived.by(() => {
    let d = '';
    const n = 120;
    for (let i = 0; i <= n; i++) {
      const s = (f.land * i) / n;
      d += `${i ? 'L' : 'M'}${tx(s).toFixed(1)} ${hy(Math.max(0, f.at(s))).toFixed(1)} `;
    }
    return d.trim();
  });

  const formula = $derived(`h(t) = -4{,}9t^2 + ${numTex(v0)}t + ${numTex(h0)}`);

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }

  function play() {
    halt();
    if (reducedMotion()) {
      t = f.peakT;
      return;
    }
    t = 0;
    playing = true;
    stop = frameLoop((dt) => {
      t = Math.min(f.land, t + dt * 0.8);
      if (t >= f.land) halt();
    });
  }

  function changed() {
    halt();
    t = 0;
  }

  onDestroy(halt);

  const note = $derived(
    landed
      ? `Quả bóng chạm đất sau khoảng ${formatFixed(f.land, 2)} giây: đó là nghiệm dương của h(t) = 0.`
      : Math.abs(now - f.peakT) < 0.03
        ? `Quả bóng ở đỉnh parabol: độ cao lớn nhất ≈ ${formatFixed(f.peakH, 2)} m tại t ≈ ${formatFixed(f.peakT, 2)} s.`
        : now < f.peakT
          ? `t = ${formatFixed(now, 2)} s: bóng đang bay lên (h tăng), cao ${formatFixed(height, 2)} m.`
          : `t = ${formatFixed(now, 2)} s: bóng đang rơi xuống (h giảm), cao ${formatFixed(height, 2)} m.`,
  );
  const label = $derived(
    `Đồ thị độ cao theo thời gian, cung parabol từ (0; ${formatNumber(h0)}) lên đỉnh (${formatFixed(f.peakT, 2)}; ${formatFixed(f.peakH, 2)}) rồi xuống chạm đất tại t ≈ ${formatFixed(f.land, 2)}. Bóng đang ở t = ${formatFixed(now, 2)}, h = ${formatFixed(height, 2)}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Vận tốc ném lên v₀"
      bind:value={v0}
      min={5}
      max={15}
      step={0.1}
      unit="m/s"
      oninput={changed}
    />
    <SliderField
      label="Độ cao ban đầu h₀"
      bind:value={h0}
      min={0}
      max={2}
      step={0.1}
      unit="m"
      oninput={changed}
    />
  </div>
  <p class="text-center"><Tex math={formula} /></p>

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-md rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={label}
  >
    {#each H_TICKS as v (v)}
      <line x1={tx(0)} y1={hy(v)} x2={tx(T_MAX)} y2={hy(v)} stroke="#e2e8f0" />
      <text x={tx(0) - 6} y={hy(v) + 4} text-anchor="end" font-size="11" fill="#64748b"
        >{formatNumber(v)}</text
      >
    {/each}
    {#each T_TICKS as v (v)}
      <line x1={tx(v)} y1={hy(0)} x2={tx(v)} y2={hy(H_MAX)} stroke="#f1f5f9" />
      <text x={tx(v)} y={hy(0) + 16} text-anchor="middle" font-size="11" fill="#64748b"
        >{formatNumber(v)}</text
      >
    {/each}
    <line x1={tx(0)} y1={hy(0)} x2={tx(T_MAX)} y2={hy(0)} stroke="#0f172a" stroke-width="1.5" />
    <line x1={tx(0)} y1={hy(0)} x2={tx(0)} y2={hy(H_MAX)} stroke="#0f172a" stroke-width="1.5" />
    <text x={tx(T_MAX)} y={hy(0) - 6} text-anchor="end" font-size="12" font-style="italic"
      >t (s)</text
    >
    <text x={tx(0) + 6} y={hy(H_MAX) + 4} font-size="12" font-style="italic">h (m)</text>

    <path d={path} fill="none" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5 4" />
    <line
      x1={tx(f.peakT)}
      y1={hy(0)}
      x2={tx(f.peakT)}
      y2={hy(f.peakH)}
      stroke="#be123c"
      stroke-dasharray="3 3"
    />
    <circle cx={tx(f.peakT)} cy={hy(f.peakH)} r="4" fill="#be123c" />
    <text
      x={tx(f.peakT)}
      y={hy(f.peakH) - 8}
      text-anchor="middle"
      font-size="11"
      font-weight="700"
      fill="#be123c">đỉnh</text
    >
    <circle cx={tx(now)} cy={hy(height)} r="8" fill="#f59e0b" stroke="#92400e" stroke-width="1.5" />
  </svg>

  <SliderField
    label="Thời điểm t"
    bind:value={t}
    min={0}
    max={Math.ceil(f.land * 20) / 20}
    step={0.05}
    unit="s"
    format={(v) => formatFixed(v, 2)}
    oninput={() => halt()}
  />
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={play} disabled={playing}>Ném bóng</button>
  </div>
  <FeedbackNote tone={landed ? 'ok' : 'info'} text={note} />
</div>
