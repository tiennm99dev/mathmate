<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { circlePoint, radTex, trigValue, valueText } from '../_shared/trig.js';
  import { asymptotes, graphPath, piText } from '../_shared/graph.js';
  import { FACTS, X_MAX, X_MIN, partnerOf } from './engine.js';

  /** @typedef {import('../_shared/trig.js').TrigName} TrigName */

  // One drawing: the unit circle on the left, the graph on the right, with
  // the same unit U on both so the height of M carries straight across.
  const W = 520;
  const H = 260;
  const C = { x: 75, y: 130 };
  const U = 60;
  const G0 = 170;
  const G1 = 510;
  const LIMIT = 2;
  const SPEED = 60; // degrees per second
  const COLOR = '#4f46e5';
  const PARTNER = '#e11d48';

  /** @param {number} deg */
  const gx = (deg) => G0 + ((deg - X_MIN) * (G1 - G0)) / (X_MAX - X_MIN);
  /** @param {number} y */
  const gy = (y) => C.y - y * U;

  let name = $state(/** @type {TrigName} */ ('sin'));
  let mode = $state(/** @type {'none' | 'mirror' | 'period'} */ ('none'));
  let x = $state(60);
  let playing = $state(false);
  let showAll = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const xs = $derived(Math.round(x));
  const value = $derived(trigValue(name, xs));
  const M = $derived(circlePoint(C, U, xs));
  const P = $derived(
    Number.isNaN(value) || Math.abs(value) > LIMIT ? null : { x: gx(xs), y: gy(value) },
  );
  // The point on the circle side whose height is the value: M itself for sin,
  // T on the tangent axis for tan, and the value raised onto the y axis for
  // cos and cot.
  const lift = $derived(
    Number.isNaN(value) || Math.abs(value) > LIMIT
      ? null
      : name === 'sin'
        ? M
        : name === 'tan'
          ? { x: C.x + U, y: gy(value) }
          : { x: C.x, y: gy(value) },
  );
  const partner = $derived(partnerOf(name, xs, mode));
  const pValue = $derived(partner === null ? NaN : trigValue(name, partner));
  const Mp = $derived(partner === null ? null : circlePoint(C, U, partner));
  const Pp = $derived(
    partner === null || Number.isNaN(pValue) || Math.abs(pValue) > LIMIT
      ? null
      : { x: gx(partner), y: gy(pValue) },
  );

  const fullPath = $derived(graphPath(name, X_MIN, X_MAX, gx, gy, LIMIT));
  const tracePath = $derived(graphPath(name, X_MIN, xs, gx, gy, LIMIT));
  const lines = $derived(name === 'tan' || name === 'cot' ? asymptotes(name, X_MIN, X_MAX) : []);
  const facts = $derived(FACTS[name]);
  const ticks = [-360, -270, -180, -90, 90, 180, 270, 360];

  /**
   * TeX of "x = 5π/6", or "x ≈ 1,2" when the angle is not a multiple of 15°.
   * @param {string} sym @param {number} deg
   */
  function xTex(sym, deg) {
    const r = radTex(deg);
    return r.startsWith('\\approx') ? `${sym} ${r}` : `${sym} = ${r}`;
  }

  function play() {
    if (playing) {
      pause();
      return;
    }
    if (x >= X_MAX) x = X_MIN;
    if (reducedMotion()) {
      x = X_MAX;
      return;
    }
    playing = true;
    stop = frameLoop((dt) => {
      x = Math.min(X_MAX, x + SPEED * dt);
      if (x >= X_MAX) pause();
    });
  }
  function pause() {
    stop?.();
    stop = null;
    playing = false;
  }
  $effect(() => () => stop?.());

  const valueLine = $derived(
    `$${xTex('x', xs)}$: $\\${name} x$ ${Number.isNaN(value) ? 'không xác định' : `= ${valueText(name, xs)}`}.`,
  );
  const partnerLine = $derived.by(() => {
    if (partner === null) return '';
    const v = Number.isNaN(pValue) ? 'không xác định' : `= ${valueText(name, partner)}`;
    const head = `Điểm đỏ: $${xTex("x'", partner)}$, $\\${name} x'$ ${v}.`;
    if (mode === 'mirror') {
      return `${head} Vì $${facts.parityTex}$ nên đồ thị ${
        facts.odd ? 'đối xứng qua gốc toạ độ: hàm số lẻ' : 'đối xứng qua trục tung: hàm số chẵn'
      }.`;
    }
    return `${head} Hai giá trị bằng nhau vì $x$ và $x'$ hơn kém nhau $${facts.periodTex}$, một chu kì.`;
  });
  const note = $derived(
    playing
      ? 'Điểm M đang chạy trên đường tròn; đồ thị được vẽ dần.'
      : `${valueLine} ${partnerLine}`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Hàm số"
      options={[
        { value: 'sin', label: 'y = sin x' },
        { value: 'cos', label: 'y = cos x' },
        { value: 'tan', label: 'y = tan x' },
        { value: 'cot', label: 'y = cot x' },
      ]}
      bind:value={name}
    />
    <SegmentedControl
      label="Điểm so sánh"
      options={[
        { value: 'none', label: 'Không' },
        { value: 'mirror', label: 'Điểm −x' },
        { value: 'period', label: 'Cách một chu kì' },
      ]}
      bind:value={mode}
    />
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="block w-full select-none rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={`Đường tròn lượng giác và đồ thị hàm số y = ${name} x trên đoạn từ −2π đến 2π, đã vẽ đến x = ${piText(xs)}.`}
  >
    <!-- unit circle -->
    <line x1={C.x - U - 10} y1={C.y} x2={C.x + U + 14} y2={C.y} stroke="#94a3b8" />
    <line x1={C.x} y1={C.y + U + 10} x2={C.x} y2={C.y - U - 14} stroke="#94a3b8" />
    <circle cx={C.x} cy={C.y} r={U} fill="none" stroke="#334155" stroke-width="1.5" />
    {#if name === 'tan'}
      <line x1={C.x + U} y1="8" x2={C.x + U} y2={H - 8} stroke="#059669" stroke-dasharray="4 4" />
    {/if}
    {#if name === 'cot'}
      <line
        x1="8"
        y1={C.y - U}
        x2={C.x + U + 30}
        y2={C.y - U}
        stroke="#d97706"
        stroke-dasharray="4 4"
      />
    {/if}
    <line x1={C.x} y1={C.y} x2={M.x} y2={M.y} stroke="#0f172a" stroke-width="1.5" />
    {#if name === 'cos'}
      <line
        x1={C.x}
        y1={C.y}
        x2={M.x}
        y2={C.y}
        stroke={COLOR}
        stroke-width="5"
        stroke-linecap="round"
      />
    {/if}
    {#if name === 'cot' && !Number.isNaN(value) && Math.abs(value) <= LIMIT}
      <circle cx={C.x + value * U} cy={C.y - U} r="4" fill="#d97706" />
    {/if}
    {#if lift}
      {#if name === 'tan'}
        <!-- OM extended to T on the tangent axis -->
        <line x1={C.x} y1={C.y} x2={lift.x} y2={lift.y} stroke="#059669" stroke-width="1.5" />
        <circle cx={lift.x} cy={lift.y} r="4" fill="#059669" />
      {/if}
      <line
        x1={name === 'tan' ? lift.x : C.x}
        y1={C.y}
        x2={name === 'tan' ? lift.x : C.x}
        y2={lift.y}
        stroke={COLOR}
        stroke-width="5"
        stroke-linecap="round"
        opacity={name === 'sin' ? 1 : 0.5}
      />
      {#if P}
        <line x1={lift.x} y1={lift.y} x2={P.x} y2={P.y} stroke={COLOR} stroke-dasharray="4 3" />
      {/if}
    {/if}
    {#if Mp}
      <circle cx={Mp.x} cy={Mp.y} r="5" fill={PARTNER} />
    {/if}
    <circle cx={M.x} cy={M.y} r="6" fill={COLOR} />
    <text x={C.x - 12} y={C.y + 14} font-size="12" fill="#475569">O</text>

    <!-- graph axes -->
    <line x1={G0 - 6} y1={C.y} x2={G1 + 6} y2={C.y} stroke="#94a3b8" />
    <line x1={gx(0)} y1="8" x2={gx(0)} y2={H - 8} stroke="#94a3b8" />
    {#each ticks as t (t)}
      <line x1={gx(t)} y1={C.y - 4} x2={gx(t)} y2={C.y + 4} stroke="#94a3b8" />
      {#if t % 180 === 0}
        <text x={gx(t)} y={C.y + 18} font-size="12" text-anchor="middle" fill="#475569"
          >{piText(t)}</text
        >
      {/if}
    {/each}
    {#each [1, -1] as v (v)}
      <line x1={gx(0) - 4} y1={gy(v)} x2={gx(0) + 4} y2={gy(v)} stroke="#94a3b8" />
      <line x1={G0} y1={gy(v)} x2={G1} y2={gy(v)} stroke="#e2e8f0" stroke-dasharray="2 4" />
      <text x={gx(0) - 8} y={gy(v) + 4} font-size="12" text-anchor="end" fill="#475569"
        >{v === 1 ? '1' : '−1'}</text
      >
    {/each}
    {#each lines as a (a)}
      <line x1={gx(a)} y1="8" x2={gx(a)} y2={H - 8} stroke="#cbd5e1" stroke-dasharray="5 4" />
    {/each}

    {#if showAll}
      <path d={fullPath} fill="none" stroke="#a5b4fc" stroke-width="2" />
    {/if}
    <path d={tracePath} fill="none" stroke={COLOR} stroke-width="2.5" />
    {#if Pp}
      <circle cx={Pp.x} cy={Pp.y} r="5" fill={PARTNER} />
    {/if}
    {#if P}
      <circle cx={P.x} cy={P.y} r="6" fill={COLOR} />
    {/if}
  </svg>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Giá trị của x"
      bind:value={x}
      min={X_MIN}
      max={X_MAX}
      step={15}
      format={(v) => piText(Math.round(v))}
      oninput={() => pause()}
    />
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={play}
        >{playing ? 'Tạm dừng' : x >= X_MAX ? 'Chạy lại' : 'Chạy'}</button
      >
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          pause();
          x = X_MIN;
        }}>Về −2π</button
      >
    </div>
  </div>
  <label class="flex min-h-11 items-center gap-2 text-sm text-slate-700">
    <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={showAll} />
    Hiện mờ cả đồ thị trên đoạn [−2π; 2π]
  </label>

  <FeedbackNote tone="info" text={note} />

  <table class="w-full text-sm">
    <caption class="sr-only">Tính chất của hàm số y = {name} x</caption>
    <tbody>
      <tr class="border-b border-slate-100">
        <th scope="row" class="py-1.5 pr-2 text-left font-semibold text-slate-700">Tập xác định</th>
        <td class="py-1.5"><Tex math={`D = ${facts.domainTex}`} /></td>
      </tr>
      <tr class="border-b border-slate-100">
        <th scope="row" class="py-1.5 pr-2 text-left font-semibold text-slate-700">Tập giá trị</th>
        <td class="py-1.5"><Tex math={facts.rangeTex} /></td>
      </tr>
      <tr class="border-b border-slate-100">
        <th scope="row" class="py-1.5 pr-2 text-left font-semibold text-slate-700">Chẵn, lẻ</th>
        <td class="py-1.5"
          >{facts.odd ? 'Hàm số lẻ' : 'Hàm số chẵn'}: <Tex math={facts.parityTex} /></td
        >
      </tr>
      <tr>
        <th scope="row" class="py-1.5 pr-2 text-left font-semibold text-slate-700">Chu kì</th>
        <td class="py-1.5"><Tex math={`T = ${facts.periodTex}`} /></td>
      </tr>
    </tbody>
  </table>
</div>
