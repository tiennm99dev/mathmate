<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { formatNumber, intText, numTex } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { add3, mul3 } from '#lib/geom-engine/solid.js';
  import { len3, P, planePatch } from '#lib/geom-engine/space.js';
  import { coordText } from '#lib/geom-engine/space-tex.js';
  import { LIMIT, planeWork } from './engine.js';

  /**
   * The plane (P) through M0 with normal vector n, both set by steppers. The
   * plane turns with n while its equation, in point-normal and general
   * form, updates. A point Q shows the distance formula: the perpendicular
   * from Q meets (P) at H and QH equals |Ax + By + Cz + D| / √(A² + B² + C²).
   */

  const N = '#059669';
  const PLANE = '#6366F1';
  const Q_COLOR = '#DC2626';

  let a = $state(1);
  let b = $state(1);
  let c = $state(2);
  let x0 = $state(1);
  let y0 = $state(0);
  let z0 = $state(0);
  let qx = $state(2);
  let qy = $state(2);
  let qz = $state(3);
  let showQ = $state(true);
  let view = $state({ yaw: -125, pitch: 22 });

  const n = $derived(P(a, b, c));
  const m0 = $derived(P(x0, y0, z0));
  const q = $derived(P(qx, qy, qz));
  const w = $derived(planeWork(n, m0, q));

  const tip = $derived(w ? add3(m0, mul3(n, 1.6 / len3(n))) : m0);

  const polygons = $derived(
    w
      ? [
          {
            key: 'plane',
            pts: planePatch(n, m0, 2.3),
            fill: PLANE,
            opacity: 0.18,
            stroke: '#A5B4FC',
          },
        ]
      : [],
  );
  const arrows = $derived(w ? [{ key: 'n', from: m0, to: tip, color: N, width: 3 }] : []);
  const segments = $derived(
    w && showQ ? [{ key: 'qh', from: q, to: w.foot, color: Q_COLOR, width: 1.6, dash: true }] : [],
  );
  const dots = $derived([
    { key: 'm0', at: m0, color: PLANE },
    ...(showQ ? [{ key: 'q', at: q, color: Q_COLOR }] : []),
    ...(w && showQ && w.value !== 0 ? [{ key: 'h', at: w.foot, color: '#0F172A', r: 3 }] : []),
  ]);
  const labels = $derived([
    { key: 'm0', text: 'M₀', at: m0, color: PLANE },
    ...(w ? [{ key: 'n', text: 'n', at: tip, color: N }] : []),
    ...(showQ ? [{ key: 'q', text: 'Q', at: q, color: Q_COLOR }] : []),
    ...(w && showQ && w.value !== 0 ? [{ key: 'h', text: 'H', at: w.foot }] : []),
  ]);

  const lines = $derived(
    w
      ? [
          `Vectơ pháp tuyến $${w.normalTex}$, mặt phẳng đi qua $M_0(${x0}; ${y0}; ${z0})$.`,
          `$${w.pointNormalTex}$`,
          `Phương trình tổng quát: $${w.generalTex}$ (ở đây $D = ${w.D}$).`,
          ...(showQ
            ? [
                w.value === 0
                  ? 'Toạ độ của $Q$ thoả mãn phương trình: $Q$ nằm trên $(P)$, khoảng cách bằng $0$.'
                  : `$${w.distanceTex}${Number.isInteger(w.distance) ? '' : ` \\approx ${numTex(w.distance, 2)}`}$.`,
              ]
            : []),
        ]
      : [
          '$\\vec{n} = \\vec{0}$ không phải vectơ pháp tuyến: $A$, $B$, $C$ không được đồng thời bằng $0$.',
        ],
  );
</script>

<div class="space-y-4">
  <SpaceScene
    look="coordinates"
    axes={4}
    {polygons}
    {arrows}
    {segments}
    {dots}
    {labels}
    radius={4.6}
    bind:view
    label={w
      ? `Mặt phẳng P đi qua M₀ ${coordText(m0)} với vectơ pháp tuyến ${coordText(n)}${showQ ? `, điểm Q ${coordText(q)} cách mặt phẳng ${formatNumber(w.distance, 2)}` : ''}`
      : 'Vectơ n bằng vectơ không, chưa có mặt phẳng'}
  />
  <div class="grid gap-3 sm:grid-cols-3">
    <div class="space-y-2" role="group" aria-label="Vectơ pháp tuyến n">
      <p class="text-sm font-semibold text-emerald-700">
        <LiveRichText text={'Vectơ pháp tuyến $\\vec{n} = (A; B; C)$'} />
      </p>
      <Stepper label="A" bind:value={a} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="B" bind:value={b} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="C" bind:value={c} min={-LIMIT} max={LIMIT} format={intText} />
    </div>
    <div class="space-y-2" role="group" aria-label="Điểm M₀ trên mặt phẳng">
      <p class="text-sm font-semibold text-indigo-700">
        <LiveRichText text="Điểm $M_0(x_0; y_0; z_0)$" />
      </p>
      <Stepper label="x₀" bind:value={x0} min={-2} max={2} format={intText} />
      <Stepper label="y₀" bind:value={y0} min={-2} max={2} format={intText} />
      <Stepper label="z₀" bind:value={z0} min={-2} max={2} format={intText} />
    </div>
    {#if showQ}
      <div class="space-y-2" role="group" aria-label="Điểm Q">
        <p class="text-sm font-semibold text-red-700"><LiveRichText text="Điểm $Q$" /></p>
        <Stepper label="x" bind:value={qx} min={-LIMIT} max={LIMIT} format={intText} />
        <Stepper label="y" bind:value={qy} min={-LIMIT} max={LIMIT} format={intText} />
        <Stepper label="z" bind:value={qz} min={-LIMIT} max={LIMIT} format={intText} />
      </div>
    {/if}
  </div>
  <button
    type="button"
    class={showQ ? button.primary : button.secondary}
    aria-pressed={showQ}
    onclick={() => (showQ = !showQ)}>Khoảng cách từ điểm Q</button
  >
  <ul
    class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base"
    aria-live="polite"
  >
    {#each lines as line, i (i)}
      <li><LiveRichText text={line} /></li>
    {/each}
  </ul>
</div>
