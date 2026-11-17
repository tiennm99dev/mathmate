<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { hyperbola } from '../_shared/conic.js';
  import { slideHandle } from '../_shared/handles.js';
  import {
    A_RANGE,
    BOX,
    B_RANGE,
    PER_BRANCH,
    asymptotesTex,
    equationTex,
    keyStep,
    noteAt,
    readout,
    samplesOf,
  } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const STRING = '#d97706';
  const FOCUS = '#e11d48';
  const ASYM = '#0d9488';

  let a = $state(3);
  let b = $state(4);
  let at = $state(42);
  let showDirectrix = $state(false);

  const H = $derived(hyperbola(a, b));
  const samples = $derived(samplesOf(a, b));
  const M = $derived(samples[at]);
  const lines = $derived(readout(a, b, M, showDirectrix));
  /** @param {{ x: number, y: number }[]} pts */
  const pathOf = (pts) => `M ${pts.map((q) => `${mx(q.x)},${my(q.y)}`).join(' L ')}`;
  const path = $derived(
    `${pathOf(samples.slice(0, PER_BRANCH))} ${pathOf(samples.slice(PER_BRANCH))}`,
  );
  // The asymptotes y = ±(b/a)x, cut at the board's edge.
  const reach = $derived(Math.min(BOX.xMax, (BOX.yMax * a) / b));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const mHandle = $derived({
    ...slideHandle({
      samples,
      index: at,
      plane,
      svg: () => svgEl ?? null,
      onindex: (i) => (at = i),
      closed: false,
    }),
    /** @type {(dx: -1 | 0 | 1, dy: -1 | 0 | 1, big: boolean) => void} */
    onKeyMove: (dx, dy, big) => {
      at = keyStep(at, dx, dy, big);
    },
  });
  const coord = (/** @type {number} */ v) => formatNumber(v, 2);
  const label = $derived(
    `Hypebol có a = ${a}, b = ${b} với hai đường tiệm cận; điểm M(${coord(M.x)}; ${coord(M.y)}).`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <Stepper label="Bán trục thực a" bind:value={a} min={A_RANGE[0]} max={A_RANGE[1]} />
    <Stepper label="Bán trục ảo b" bind:value={b} min={B_RANGE[0]} max={B_RANGE[1]} />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 accent-indigo-600" bind:checked={showDirectrix} />
      Hiện đường chuẩn
    </label>
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    <rect
      x={mx(-a)}
      y={my(b)}
      width={mx(a) - mx(-a)}
      height={my(-b) - my(b)}
      fill="none"
      stroke="#94a3b8"
      stroke-width="1"
      stroke-dasharray="4 4"
      style="pointer-events:none"
    />
    {#each [1, -1] as s (s)}
      <line
        x1={mx(-reach)}
        y1={my((-s * reach * b) / a)}
        x2={mx(reach)}
        y2={my((s * reach * b) / a)}
        stroke={ASYM}
        stroke-width="1.5"
        stroke-dasharray="8 4"
        style="pointer-events:none"
      />
    {/each}
    {#if showDirectrix}
      {#each [-1, 1] as s (s)}
        <line
          x1={mx(s * H.directrix)}
          y1={my(BOX.yMax)}
          x2={mx(s * H.directrix)}
          y2={my(BOX.yMin)}
          stroke="#64748b"
          stroke-width="2"
          stroke-dasharray="6 4"
          style="pointer-events:none"
        />
      {/each}
      <line
        x1={mx(M.x)}
        y1={my(M.y)}
        x2={mx(Math.sign(M.x) * H.directrix)}
        y2={my(M.y)}
        stroke="#64748b"
        stroke-width="1.5"
        style="pointer-events:none"
      />
    {/if}
    <path d={path} fill="none" stroke={CURVE} stroke-width="2.5" style="pointer-events:none" />
    <polyline
      points="{mx(-H.c)},{my(0)} {mx(M.x)},{my(M.y)} {mx(H.c)},{my(0)}"
      fill="none"
      stroke={STRING}
      stroke-width="2.5"
      style="pointer-events:none"
    />
    {#each H.foci as F, i (i)}
      <circle cx={mx(F.x)} cy={my(F.y)} r="5" fill={FOCUS} style="pointer-events:none" />
      <text
        x={mx(F.x)}
        y={my(F.y) + 20}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill={FOCUS}
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none">{i === 0 ? 'F₁' : 'F₂'}</text
      >
    {/each}
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm M trên hypebol: kéo, hoặc dùng phím lên, xuống để trượt trên nhánh và phím trái, phải để sang nhánh kia"
      aria-valuenow={at}
      aria-valuemin={0}
      aria-valuemax={samples.length - 1}
      aria-valuetext="M({coord(M.x)}; {coord(M.y)}), nhánh {M.x > 0 ? 'phải' : 'trái'}"
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
    <p>
      <LiveRichText text={`$${equationTex(a, b)}$, tiệm cận $${asymptotesTex(a, b)}$`} />
    </p>
    {#each lines as line (line)}
      <p><LiveRichText text={line} /></p>
    {/each}
  </div>
  <FeedbackNote tone="info" text={noteAt(a, b, M)} />
</div>
