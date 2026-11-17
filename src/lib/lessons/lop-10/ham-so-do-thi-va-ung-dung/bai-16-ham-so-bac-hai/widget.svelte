<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import PlotClip from '../_shared/plot-clip.svelte';
  import {
    curvePath,
    exactRoots,
    pointText,
    quadAt,
    quadTex,
    quadText,
  } from '../_shared/quadratic.js';
  import VariationTable from '../_shared/variation-table.svelte';
  import { A_VALUES, CHALLENGES, challengeFeedback, describe, keyPoints } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -8, yMax: 8, width: 420, pad: 24 });
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const AXIS = '#0f766e';
  const CUT = '#ea580c';
  const VERTEX = '#be123c';

  let ai = $state(4);
  let b = $state(2);
  let c = $state(-1);
  let challenge = $state(0);
  const a = $derived(A_VALUES[ai]);

  const k = $derived(keyPoints(a, b, c));
  const words = $derived(describe(a, b, c));
  const curve = $derived(curvePath((x) => quadAt(a, b, c, x), plane));
  const goal = $derived(CHALLENGES[challenge]);
  const verdict = $derived(challengeFeedback(a, b, c, goal));
  const inView = (/** @type {{ x: number, y: number }} */ p) =>
    p.x >= plane.xMin && p.x <= plane.xMax && p.y >= plane.yMin && p.y <= plane.yMax;

  // Doubling the coefficients keeps the roots and makes them whole (a may be ±0,5).
  const rootWords = $derived(
    exactRoots(2 * a, 2 * b, 2 * c)
      .map((r) => `x = ${r.text}`)
      .join(' và '),
  );
  const plotLabel = $derived(
    `Parabol y = ${quadText(a, b, c)}: đỉnh S${pointText(k.s)}, trục đối xứng x = ${formatNumber(k.s.x, 3)}, cắt trục tung tại ${pointText(k.yCut)}${k.roots.length ? `, cắt trục hoành tại điểm có hoành độ ${rootWords}` : ', không cắt trục hoành'}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Hệ số a"
      bind:value={ai}
      min={0}
      max={A_VALUES.length - 1}
      format={(i) => formatNumber(A_VALUES[i])}
    />
    <SliderField label="Hệ số b" bind:value={b} min={-3} max={3} />
    <SliderField label="Hệ số c" bind:value={c} min={-3} max={3} />
  </div>
  <p class="text-center text-lg" style="color: {CURVE}">
    <Tex math={`y = ${quadTex(a, b, c)}`} />
  </p>

  <CoordinatePlane {plane} label={plotLabel} interactive={false}>
    <line
      x1={mx(k.s.x)}
      y1={my(plane.yMax)}
      x2={mx(k.s.x)}
      y2={my(plane.yMin)}
      stroke={AXIS}
      stroke-width="1.5"
      stroke-dasharray="6 4"
    />
    <text x={mx(k.s.x) + 5} y={my(plane.yMin) - 6} font-size="12" font-weight="700" fill={AXIS}
      >x = {formatNumber(k.s.x, 3)}</text
    >
    <PlotClip {plane}>
      <path d={curve} fill="none" stroke={CURVE} stroke-width="2.5" />
    </PlotClip>
    {#if inView(goal.vertex)}
      <circle
        cx={mx(goal.vertex.x)}
        cy={my(goal.vertex.y)}
        r="9"
        fill="none"
        stroke={verdict.done ? '#059669' : '#94a3b8'}
        stroke-width="2"
        stroke-dasharray="3 3"
      />
    {/if}
    {#each [k.yCut, k.mirror] as p, i (i)}
      {#if inView(p)}
        <circle cx={mx(p.x)} cy={my(p.y)} r="4.5" fill={CUT} />
      {/if}
    {/each}
    {#each k.roots as p (p.x)}
      {#if inView(p)}
        <circle cx={mx(p.x)} cy={my(p.y)} r="4.5" fill="#0f172a" />
      {/if}
    {/each}
    {#if inView(k.s)}
      <circle cx={mx(k.s.x)} cy={my(k.s.y)} r="6" fill={VERTEX} stroke="#fff" stroke-width="2" />
      <text
        x={mx(k.s.x) + 9}
        y={my(k.s.y) + (a > 0 ? 18 : -9)}
        font-size="13"
        font-weight="700"
        fill={VERTEX}>S</text
      >
    {/if}
  </CoordinatePlane>

  <ul class="space-y-1 text-sm text-slate-700" aria-live="polite">
    <li>
      <span class="font-semibold" style="color: {VERTEX}">Đỉnh</span>
      <Tex math={'S\\left(-\\tfrac{b}{2a}; -\\tfrac{\\Delta}{4a}\\right)'} /> = S{pointText(k.s)};
      <span class="font-semibold" style="color: {AXIS}">trục đối xứng</span>
      x = {formatNumber(k.s.x, 3)}.
    </li>
    <li>
      <span class="font-semibold" style="color: {CUT}">Cắt trục tung</span> tại {pointText(k.yCut)},
      điểm đối xứng với nó qua trục là {pointText(k.mirror)}.
    </li>
    <li>
      {k.roots.length === 0
        ? 'Parabol không cắt trục hoành (Δ < 0).'
        : k.roots.length === 1
          ? `Parabol tiếp xúc trục hoành tại điểm có hoành độ ${rootWords} (Δ = 0).`
          : `Parabol cắt trục hoành tại hai điểm có hoành độ ${rootWords} (Δ > 0).`}
    </li>
    <li>{words.shape}</li>
    <li>{words.extreme} {words.variation}</li>
  </ul>

  <VariationTable {a} {b} {c} />

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Thử thách {challenge + 1}/{CHALLENGES.length}: chỉnh a, b, c để parabol có đỉnh S{pointText(
        goal.vertex,
      )} (vòng tròn nét đứt) và đi qua điểm {pointText(goal.point)}.
    </p>
    <FeedbackNote tone={verdict.done ? 'ok' : 'info'} text={verdict.text} />
    <button
      type="button"
      class={button.secondary}
      onclick={() => (challenge = (challenge + 1) % CHALLENGES.length)}
    >
      Thử thách khác
    </button>
  </div>
</div>
