<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { sampleEllipse } from '../_shared/conic.js';
  import { axisHandle, slideHandle } from '../_shared/handles.js';
  import {
    A_RANGE,
    BOX,
    C_STEP,
    cMax,
    ellipseAC,
    equationTex,
    readout,
    shapeNote,
  } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const STRING = '#d97706';
  const FOCUS = '#e11d48';

  let a = $state(5);
  let c = $state(3);
  let at = $state(16);
  let showDirectrix = $state(true);

  const E = $derived(ellipseAC(a, c));
  const samples = $derived(sampleEllipse(a, E.b, 120));
  const M = $derived(samples[at]);
  const path = $derived(`M ${samples.map((q) => `${mx(q.x)},${my(q.y)}`).join(' L ')} Z`);
  const lines = $derived(readout(a, c, M, showDirectrix));
  const directrixOn = $derived(showDirectrix && c > 0 && E.directrix <= BOX.xMax);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  const mHandle = $derived(
    slideHandle({ samples, index: at, plane, svg, onindex: (i) => (at = i) }),
  );
  const fHandle = $derived(
    axisHandle({
      x: c,
      min: 0,
      max: cMax(a),
      step: C_STEP,
      plane,
      svg,
      onmove: (x) => (c = x),
    }),
  );

  /** @param {number} next */
  const changeA = (next) => {
    c = Math.min(c, cMax(next));
  };
  const coord = (/** @type {number} */ v) => formatNumber(v, 2);
  const label = $derived(
    `Elip có a = ${a}, c = ${coord(c)}; điểm M(${coord(M.x)}; ${coord(M.y)}) trên elip.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <Stepper
      label="Bán trục lớn a"
      bind:value={a}
      min={A_RANGE[0]}
      max={A_RANGE[1]}
      onchange={changeA}
    />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 accent-indigo-600" bind:checked={showDirectrix} />
      Hiện đường chuẩn
    </label>
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    <rect
      x={mx(-a)}
      y={my(E.b)}
      width={mx(a) - mx(-a)}
      height={my(-E.b) - my(E.b)}
      fill="none"
      stroke="#94a3b8"
      stroke-width="1"
      stroke-dasharray="4 4"
      style="pointer-events:none"
    />
    {#if directrixOn}
      {#each [-1, 1] as s (s)}
        <line
          x1={mx(s * E.directrix)}
          y1={my(BOX.yMax)}
          x2={mx(s * E.directrix)}
          y2={my(BOX.yMin)}
          stroke="#64748b"
          stroke-width="2"
          stroke-dasharray="6 4"
          style="pointer-events:none"
        />
        <text
          x={mx(s * E.directrix) + (s > 0 ? -6 : 6)}
          y={my(BOX.yMax) + 14}
          font-size="12"
          font-weight="700"
          font-style="italic"
          text-anchor={s > 0 ? 'end' : 'start'}
          fill="#64748b"
          style="pointer-events:none">{s > 0 ? 'Δ₂' : 'Δ₁'}</text
        >
      {/each}
    {/if}
    <path d={path} fill="none" stroke={CURVE} stroke-width="2.5" style="pointer-events:none" />
    <polyline
      points="{mx(-c)},{my(0)} {mx(M.x)},{my(M.y)} {mx(c)},{my(0)}"
      fill="none"
      stroke={STRING}
      stroke-width="2.5"
      style="pointer-events:none"
    />
    {#if directrixOn}
      <line
        x1={mx(M.x)}
        y1={my(M.y)}
        x2={mx(E.directrix)}
        y2={my(M.y)}
        stroke="#64748b"
        stroke-width="1.5"
        style="pointer-events:none"
      />
    {/if}
    <circle cx={mx(-c)} cy={my(0)} r="5" fill={FOCUS} style="pointer-events:none" />
    <text
      x={mx(-c)}
      y={my(0) + 20}
      font-size="12"
      font-weight="700"
      text-anchor="middle"
      fill={FOCUS}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">F₁</text
    >
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Tiêu điểm F₂ trên trục Ox: kéo, hoặc dùng phím mũi tên"
      aria-valuenow={c}
      aria-valuemin={0}
      aria-valuemax={cMax(a)}
      aria-valuetext="c = {coord(c)}, tâm sai e = {formatNumber(E.e, 3)}"
      style="cursor:ew-resize; outline:none"
      use:draggable={fHandle}
    >
      <circle
        class="drag-knob"
        cx={mx(c)}
        cy={my(0)}
        r="7"
        fill={FOCUS}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
    <text
      x={mx(c)}
      y={my(0) + 20}
      font-size="12"
      font-weight="700"
      text-anchor="middle"
      fill={FOCUS}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">F₂</text
    >
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm M trên elip: kéo, hoặc dùng phím mũi tên để trượt"
      aria-valuenow={at}
      aria-valuemin={0}
      aria-valuemax={samples.length - 1}
      aria-valuetext="M({coord(M.x)}; {coord(M.y)})"
      style="cursor:grab; outline:none"
      use:draggable={mHandle}
    >
      <circle
        class="drag-knob"
        cx={mx(M.x)}
        cy={my(M.y)}
        r="7"
        fill="#fff"
        stroke={STRING}
        stroke-width="3"
      />
    </g>
    <text
      x={mx(M.x) + (M.x >= 0 ? 10 : -10)}
      y={my(M.y) + (M.y >= 0 ? -10 : 18)}
      font-size="13"
      font-weight="700"
      text-anchor={M.x >= 0 ? 'start' : 'end'}
      fill={STRING}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">M</text
    >
  </CoordinatePlane>

  <div
    class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3"
    aria-live="polite"
  >
    <p><Tex math={equationTex(a, c)} /></p>
    {#each lines as line (line)}
      <p><Tex math={line} /></p>
    {/each}
    {#if showDirectrix && c > 0 && !directrixOn}
      <p class="text-sm text-slate-600">Đường chuẩn nằm ngoài khung hình: kéo F₂ ra xa tâm hơn.</p>
    {/if}
  </div>
  <FeedbackNote tone="info" text={shapeNote(a, c)} />
</div>
