<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { KIND_NAMES, kindOf } from '../_shared/conic.js';
  import { slideHandle } from '../_shared/handles.js';
  import {
    BOX,
    E_RANGE,
    E_STEP,
    K_RANGE,
    branchesOf,
    equationTex,
    kindNote,
    readout,
  } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const STRING = '#d97706';
  const FOCUS = '#e11d48';

  let e = $state(0.6);
  let k = $state(3);
  /** Where M sits along the first branch, as a share of its length. */
  let share = $state(0.3);

  const branches = $derived(branchesOf(e, k));
  const main = $derived(branches[0]);
  const at = $derived(Math.min(main.length - 1, Math.round(share * (main.length - 1))));
  const M = $derived(main[at]);
  const closed = $derived(kindOf(e) === 'elip' && main.length > 700);
  /** @param {{ x: number, y: number }[]} pts */
  const pathOf = (pts) => `M ${pts.map((q) => `${mx(q.x)},${my(q.y)}`).join(' L ')}`;
  const path = $derived(branches.map(pathOf).join(' '));
  const lines = $derived(readout(e, k, M));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const handle = $derived(
    slideHandle({
      samples: main,
      index: at,
      plane,
      svg: () => svgEl ?? null,
      onindex: (i) => (share = i / (main.length - 1)),
      closed,
    }),
  );
  const coord = (/** @type {number} */ v) => formatNumber(v, 2);
  const label = $derived(
    `Đường conic có tiêu điểm F(0; 0), đường chuẩn x = −${k}, tâm sai ${formatNumber(e, 2)}: ${KIND_NAMES[kindOf(e)]}; điểm M(${coord(M.x)}; ${coord(M.y)}).`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Tâm sai e"
      bind:value={e}
      min={E_RANGE[0]}
      max={E_RANGE[1]}
      step={E_STEP}
      format={(v) => formatNumber(v, 2)}
    />
    <Stepper label="Khoảng cách từ F đến Δ" bind:value={k} min={K_RANGE[0]} max={K_RANGE[1]} />
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    <line
      x1={mx(-k)}
      y1={my(BOX.yMax)}
      x2={mx(-k)}
      y2={my(BOX.yMin)}
      stroke="#64748b"
      stroke-width="2"
      stroke-dasharray="6 4"
      style="pointer-events:none"
    />
    <text
      x={mx(-k) - 6}
      y={my(BOX.yMax) + 14}
      font-size="12"
      font-weight="700"
      font-style="italic"
      text-anchor="end"
      fill="#64748b"
      style="pointer-events:none">Δ</text
    >
    <path d={path} fill="none" stroke={CURVE} stroke-width="2.5" style="pointer-events:none" />
    <line
      x1={mx(M.x)}
      y1={my(M.y)}
      x2={mx(-k)}
      y2={my(M.y)}
      stroke="#64748b"
      stroke-width="2"
      style="pointer-events:none"
    />
    <line
      x1={mx(M.x)}
      y1={my(M.y)}
      x2={mx(0)}
      y2={my(0)}
      stroke={STRING}
      stroke-width="2.5"
      style="pointer-events:none"
    />
    <circle cx={mx(0)} cy={my(0)} r="5.5" fill={FOCUS} style="pointer-events:none" />
    <text
      x={mx(0) + 8}
      y={my(0) + 18}
      font-size="12"
      font-weight="700"
      fill={FOCUS}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">F</text
    >
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm M trên đường conic: kéo, hoặc dùng phím mũi tên để trượt"
      aria-valuenow={at}
      aria-valuemin={0}
      aria-valuemax={main.length - 1}
      aria-valuetext="M({coord(M.x)}; {coord(M.y)})"
      style="cursor:grab; outline:none"
      use:draggable={handle}
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
      x={mx(M.x) + 10}
      y={my(M.y) + (M.y >= 0 ? -10 : 18)}
      font-size="13"
      font-weight="700"
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
    <p><Tex math={`MF = e \\cdot d(M, \\Delta) \\Leftrightarrow ${equationTex(e, k)}`} /></p>
    {#each lines as line (line)}
      <p><Tex math={line} /></p>
    {/each}
  </div>
  <FeedbackNote tone={kindOf(e) === 'parabol' ? 'ok' : 'info'} text={kindNote(e)} />
</div>
