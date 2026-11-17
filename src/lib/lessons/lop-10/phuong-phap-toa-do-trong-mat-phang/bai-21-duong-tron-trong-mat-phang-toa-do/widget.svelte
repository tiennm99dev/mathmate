<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { coordText, latticeOnCircle, lineText, tangentAt, valueText } from '../_shared/coords.js';
  import LinePath from '../_shared/line-path.svelte';
  import PointHandle from '../_shared/point-handle.svelte';
  import { BOX, R2_CHOICES, clampCentre, fits, panelTex } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const CC = '#4f46e5';
  const TC = '#e11d48';

  let r2 = $state(25);
  let I = $state({ x: 1, y: 0 });
  let pick = $state(1);
  const points = $derived(latticeOnCircle(I, r2));
  const M = $derived(points[pick % points.length]);
  const tangent = $derived(tangentAt(I, M));
  const tex = $derived(panelTex(I, r2, M));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  /** @param {{ x: number, y: number }} g */
  const moveI = (g) => {
    if (fits(g, r2)) I = g;
  };
  /** @param {string | number} next */
  function changeRadius(next) {
    I = clampCentre(I, Number(next));
    pick = 1;
  }
  /** @param {number} i */
  const choose = (i) => (pick = i);
  /** @param {KeyboardEvent} e @param {number} i */
  function onKey(e, i) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(i);
    }
  }

  const TANGENT_HEAD = 'Tiếp tuyến tại $M$, nhận $\\overrightarrow{MI}$ làm vectơ pháp tuyến:';

  const radiusLabel = (/** @type {number} */ v) => {
    const r = Math.sqrt(v);
    return Number.isInteger(r) ? `R = ${r}` : `R = √${v}`;
  };
  const label = $derived(
    `Đường tròn tâm I${coordText(I.x, I.y)}, bán kính ${valueText(Math.sqrt(r2))}; tiếp tuyến tại M${coordText(M.x, M.y)}: ${lineText(tangent)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bán kính"
    bind:value={r2}
    onchange={changeRadius}
    options={R2_CHOICES.map((v) => ({ value: v, label: radiusLabel(v) }))}
  />

  <CoordinatePlane bind:svgEl {plane} {label}>
    <circle
      cx={mx(I.x)}
      cy={my(I.y)}
      r={Math.sqrt(r2) * plane.unit}
      fill={CC}
      fill-opacity="0.06"
      stroke={CC}
      stroke-width="2.5"
      style="pointer-events:none"
    />
    <LinePath line={tangent} {plane} color={TC} name="Δ" />
    <line
      x1={mx(I.x)}
      y1={my(I.y)}
      x2={mx(M.x)}
      y2={my(M.y)}
      stroke="#64748b"
      stroke-width="2"
      stroke-dasharray="5 4"
      style="pointer-events:none"
    />
    {#each points as P, i (`${P.x};${P.y}`)}
      <g
        role="button"
        tabindex="0"
        aria-label="Chọn tiếp điểm M{coordText(P.x, P.y)}"
        aria-pressed={i === pick % points.length}
        class="cursor-pointer outline-none {focusRing}"
        onclick={() => choose(i)}
        onkeydown={(e) => onKey(e, i)}
      >
        <circle cx={mx(P.x)} cy={my(P.y)} r="12" fill="transparent" />
        <circle
          cx={mx(P.x)}
          cy={my(P.y)}
          r={i === pick % points.length ? 6 : 4}
          fill={i === pick % points.length ? TC : '#fff'}
          stroke={TC}
          stroke-width="2"
        />
      </g>
    {/each}
    <text
      x={mx(M.x) + (M.x >= I.x ? 10 : -10)}
      y={my(M.y) + (M.y >= I.y ? -10 : 18)}
      font-size="13"
      font-weight="700"
      text-anchor={M.x >= I.x ? 'start' : 'end'}
      fill={TC}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">M{coordText(M.x, M.y)}</text
    >
    <PointHandle at={I} name="I" {plane} {svg} onmove={moveI} color={CC} labelDy={18} />
  </CoordinatePlane>

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p><Tex math={tex.equation} /></p>
    <p><Tex math={tex.centre} /></p>
    <p><Tex math={tex.expanded} /></p>
    <p><Tex math={tex.coefs} /></p>
    <p class="text-sm text-slate-600">
      <LiveRichText text={TANGENT_HEAD} />
    </p>
    {#each tex.tangent as line (line)}
      <p><Tex math={line} /></p>
    {/each}
  </div>
  <div aria-live="polite">
    <FeedbackNote
      tone="info"
      text={`Tiếp tuyến $\\Delta$ tại $M$ vuông góc với bán kính $IM$, nên nhận $\\overrightarrow{MI}$ làm vectơ pháp tuyến. Kéo tâm $I$, đổi bán kính hoặc chọn điểm $M$ khác trên đường tròn.`}
    />
  </div>
</div>
