<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { formatNumber, intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { P, add3, coordText, degreeTex, isZero3 } from '../_shared/space.js';
  import { LIMIT, drawnCross, work } from './engine.js';

  /**
   * Two vectors u, v set by their coordinates, drawn from O in the system
   * Oxyz with the parallelogram built on them, its diagonal u + v and the
   * cross product [u, v] standing perpendicular to both. Every result is
   * worked out with the coordinate formulas as the coordinates change.
   */

  const U = '#2563EB';
  const V = '#DC2626';
  const SUM = '#7C3AED';
  const CROSS = '#059669';

  let u1 = $state(2);
  let u2 = $state(0);
  let u3 = $state(1);
  let v1 = $state(1);
  let v2 = $state(2);
  let v3 = $state(0);
  let showSum = $state(true);
  let showCross = $state(true);
  let view = $state({ yaw: -125, pitch: 22 });

  const u = $derived(P(u1, u2, u3));
  const v = $derived(P(v1, v2, v3));
  const w = $derived(work(u, v));
  const drawn = $derived(drawnCross(w.cross));
  const parallel = $derived(isZero3(w.cross));

  const arrows = $derived([
    { key: 'u', from: P(), to: u, color: U, width: 3 },
    { key: 'v', from: P(), to: v, color: V, width: 3 },
    ...(showSum ? [{ key: 'sum', from: P(), to: w.sum, color: SUM, width: 2.6 }] : []),
    ...(showCross && !parallel
      ? [{ key: 'cross', from: P(), to: drawn.vec, color: CROSS, width: 3.2 }]
      : []),
  ]);

  const segments = $derived(
    showSum
      ? [
          { key: 'su', from: u, to: w.sum, color: V, width: 1.3, dash: true },
          { key: 'sv', from: v, to: w.sum, color: U, width: 1.3, dash: true },
        ]
      : [],
  );

  const polygons = $derived(
    showSum && !parallel
      ? [{ key: 'para', pts: [P(), u, add3(u, v), v], fill: SUM, opacity: 0.14, stroke: '#C4B5FD' }]
      : [],
  );

  const labels = $derived([
    { key: 'O', text: 'O', at: P(), dx: -12, dy: 12 },
    { key: 'u', text: 'u', at: u, color: U },
    { key: 'v', text: 'v', at: v, color: V },
    ...(showSum ? [{ key: 'sum', text: 'u + v', at: w.sum, color: SUM }] : []),
    ...(showCross && !parallel
      ? [{ key: 'cross', text: '[u, v]', at: drawn.vec, color: CROSS }]
      : []),
  ]);

  const lines = $derived(
    [
      `$${w.sumTex}$.`,
      `$${w.diffTex}$.`,
      `$${w.dotTex}$${w.dot === 0 && !isZero3(u) && !isZero3(v) ? ': hai vectơ vuông góc.' : '.'}`,
      `$${w.lenTex}$.`,
      w.cosTex && w.angle !== null
        ? `$${w.cosTex}$, nên $(\\vec{u}, \\vec{v}) ${degreeTex(w.angle)}$.`
        : 'Có một vectơ bằng $\\vec{0}$: không xác định góc.',
      `$${w.crossTex}$.`,
      parallel
        ? '$[\\vec{u}, \\vec{v}] = \\vec{0}$: hai vectơ cùng phương, không dựng được hình bình hành.'
        : `$${w.checkTex}$: $[\\vec{u}, \\vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$.`,
      ...(parallel ? [] : [`Diện tích hình bình hành: $${w.areaTex}$.`]),
    ].filter(Boolean),
  );
</script>

<div class="space-y-4">
  <SpaceScene
    axes={LIMIT + 0.5}
    {arrows}
    {segments}
    {polygons}
    {labels}
    radius={3.7}
    bind:view
    label={`Hệ trục Oxyz với vectơ u ${coordText(u)} màu xanh dương, vectơ v ${coordText(v)} màu đỏ${showSum ? `, vectơ tổng ${coordText(w.sum)}` : ''}${showCross && !parallel ? `, tích có hướng ${coordText(w.cross)} màu xanh lá` : ''}`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <div class="space-y-2" role="group" aria-label="Toạ độ của vectơ u">
      <p class="text-sm font-semibold text-blue-700"><LiveRichText text={'Vectơ $\\vec{u}$'} /></p>
      <Stepper label="u₁" bind:value={u1} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="u₂" bind:value={u2} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="u₃" bind:value={u3} min={-LIMIT} max={LIMIT} format={intText} />
    </div>
    <div class="space-y-2" role="group" aria-label="Toạ độ của vectơ v">
      <p class="text-sm font-semibold text-red-700"><LiveRichText text={'Vectơ $\\vec{v}$'} /></p>
      <Stepper label="v₁" bind:value={v1} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="v₂" bind:value={v2} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="v₃" bind:value={v3} min={-LIMIT} max={LIMIT} format={intText} />
    </div>
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={showSum ? button.primary : button.secondary}
      aria-pressed={showSum}
      onclick={() => (showSum = !showSum)}>Tổng và hình bình hành</button
    >
    <button
      type="button"
      class={showCross ? button.primary : button.secondary}
      aria-pressed={showCross}
      onclick={() => (showCross = !showCross)}>Tích có hướng</button
    >
  </div>
  <ul
    class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base"
    aria-live="polite"
  >
    {#each lines as line, i (i)}
      <li><LiveRichText text={line} /></li>
    {/each}
  </ul>
  {#if showCross && drawn.shrink > 1}
    <p class="text-sm text-slate-600">
      Vectơ tích có hướng quá dài nên được vẽ thu nhỏ {formatNumber(drawn.shrink, 1)} lần, giữ nguyên
      hướng.
    </p>
  {/if}
</div>
