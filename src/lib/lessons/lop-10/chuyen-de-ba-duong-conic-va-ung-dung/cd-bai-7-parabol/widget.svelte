<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { clamp, planeScale, snap } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { sampleParabola } from '../_shared/conic.js';
  import { BOX, P_RANGE, Y_STEP, noteFor, rayAt, readout, yLimit } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const RAY = '#d97706';
  const FOCUS = '#e11d48';

  let p = $state(2);
  let y = $state(4);
  let mode = $state(/** @type {import('./engine.js').Mode} */ ('anten'));
  let beam = $state(false);

  const lim = $derived(yLimit(p));
  const ray = $derived(rayAt(p, y));
  const path = $derived(
    `M ${sampleParabola(p, BOX.xMax, BOX.yMax, 81)
      .map((q) => `${mx(q.x)},${my(q.y)}`)
      .join(' L ')}`,
  );
  const others = $derived(
    beam
      ? [-6, -4.5, -3, -1.5, 1.5, 3, 4.5, 6]
          .filter((v) => Math.abs(v) <= lim)
          .map((v) => rayAt(p, v))
      : [],
  );
  const lines = $derived(readout(p, y));

  /** @param {number} next */
  const changeP = (next) => {
    y = clamp(y, -yLimit(next), yLimit(next));
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @param {number} py */
  const toY = (py) => clamp(snap(plane.toY(py), Y_STEP), -lim, lim);
  const handle = $derived.by(() => {
    const point = { x: mx(BOX.xMax - 0.5), y: my(y) };
    /** @type {import('#lib/actions/draggable.svelte.js').DraggableParams} */
    const params = {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: plane.width, h: plane.height },
      pad: 0,
      projector: (q) => ({ x: mx(BOX.xMax - 0.5), y: my(toY(q.y)) }),
      onChange: () => {
        y = toY(point.y);
      },
      onKeyMove: (dx, dy, big) => {
        const d = (dx || -dy) * Y_STEP * (big ? 4 : 1);
        y = clamp(snap(y + d, Y_STEP), -lim, lim);
      },
    };
    return params;
  });

  const half = $derived(p / 2);
  const arrow = 'url(#ray-head)';
  const label = $derived(
    `Parabol y² = ${2 * p}x với tiêu điểm F và đường chuẩn; tia sáng ở độ cao ${formatNumber(y, 2)} gặp parabol tại M rồi phản xạ qua F.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chiều tia sáng"
    bind:value={mode}
    options={[
      { value: 'anten', label: 'Ăng-ten: tia tới song song' },
      { value: 'den-pha', label: 'Đèn pha: tia từ tiêu điểm' },
    ]}
  />
  <div class="flex flex-wrap items-end gap-4">
    <Stepper
      label="Tham số tiêu p"
      bind:value={p}
      min={P_RANGE[0]}
      max={P_RANGE[1]}
      onchange={changeP}
    />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 accent-indigo-600" bind:checked={beam} />
      Chiếu cả chùm tia
    </label>
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    <defs>
      <marker
        id="ray-head"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill={RAY} />
      </marker>
    </defs>
    <line
      x1={mx(-half)}
      y1={my(BOX.yMax)}
      x2={mx(-half)}
      y2={my(BOX.yMin)}
      stroke="#64748b"
      stroke-width="2"
      stroke-dasharray="6 4"
      style="pointer-events:none"
    />
    <text
      x={mx(-half) - 6}
      y={my(BOX.yMax) + 14}
      font-size="12"
      font-weight="700"
      font-style="italic"
      text-anchor="end"
      fill="#64748b"
      style="pointer-events:none">Δ</text
    >
    <path d={path} fill="none" stroke={CURVE} stroke-width="3" style="pointer-events:none" />
    {#each others as r, i (i)}
      {#if mode === 'anten'}
        <polyline
          points="{mx(r.start.x)},{my(r.start.y)} {mx(r.M.x)},{my(r.M.y)} {mx(half)},{my(0)}"
          fill="none"
          stroke={RAY}
          stroke-width="1"
          opacity="0.45"
          style="pointer-events:none"
        />
      {:else}
        <polyline
          points="{mx(half)},{my(0)} {mx(r.M.x)},{my(r.M.y)} {mx(r.start.x)},{my(r.start.y)}"
          fill="none"
          stroke={RAY}
          stroke-width="1"
          opacity="0.45"
          style="pointer-events:none"
        />
      {/if}
    {/each}
    {#if mode === 'anten'}
      <line
        x1={mx(ray.start.x)}
        y1={my(ray.start.y)}
        x2={mx(ray.M.x)}
        y2={my(ray.M.y)}
        stroke={RAY}
        stroke-width="2.5"
        marker-end={arrow}
        style="pointer-events:none"
      />
      <line
        x1={mx(ray.M.x)}
        y1={my(ray.M.y)}
        x2={mx(half)}
        y2={my(0)}
        stroke={RAY}
        stroke-width="2.5"
        marker-end={arrow}
        style="pointer-events:none"
      />
      <line
        x1={mx(half)}
        y1={my(0)}
        x2={mx(ray.end.x)}
        y2={my(ray.end.y)}
        stroke={RAY}
        stroke-width="1.5"
        stroke-dasharray="3 4"
        style="pointer-events:none"
      />
    {:else}
      <line
        x1={mx(half)}
        y1={my(0)}
        x2={mx(ray.M.x)}
        y2={my(ray.M.y)}
        stroke={RAY}
        stroke-width="2.5"
        marker-end={arrow}
        style="pointer-events:none"
      />
      <line
        x1={mx(ray.M.x)}
        y1={my(ray.M.y)}
        x2={mx(ray.start.x)}
        y2={my(ray.start.y)}
        stroke={RAY}
        stroke-width="2.5"
        marker-end={arrow}
        style="pointer-events:none"
      />
    {/if}
    <line
      x1={mx(ray.M.x)}
      y1={my(ray.M.y)}
      x2={mx(-half)}
      y2={my(ray.M.y)}
      stroke="#64748b"
      stroke-width="1.5"
      style="pointer-events:none"
    />
    <circle cx={mx(ray.M.x)} cy={my(ray.M.y)} r="4.5" fill={CURVE} style="pointer-events:none" />
    <text
      x={mx(ray.M.x) - 8}
      y={my(ray.M.y) + (y >= 0 ? -10 : 18)}
      font-size="13"
      font-weight="700"
      text-anchor="end"
      fill={CURVE}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">M</text
    >
    <circle cx={mx(half)} cy={my(0)} r="5.5" fill={FOCUS} style="pointer-events:none" />
    <text
      x={mx(half)}
      y={my(0) + 20}
      font-size="12"
      font-weight="700"
      text-anchor="middle"
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
      aria-label="Độ cao của tia sáng: kéo lên xuống, hoặc dùng phím mũi tên"
      aria-valuenow={y}
      aria-valuemin={-lim}
      aria-valuemax={lim}
      aria-valuetext="tia ở độ cao {formatNumber(y, 2)}"
      style="cursor:ns-resize; outline:none"
      use:draggable={handle}
    >
      <rect
        class="drag-knob"
        x={mx(BOX.xMax - 0.5) - 7}
        y={my(y) - 11}
        width="14"
        height="22"
        rx="5"
        fill="#fff"
        stroke={RAY}
        stroke-width="3"
      />
    </g>
  </CoordinatePlane>

  <div
    class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3"
    aria-live="polite"
  >
    {#each lines as line (line)}
      <p><LiveRichText text={line} /></p>
    {/each}
  </div>
  <FeedbackNote tone="info" text={noteFor(mode, p, y)} />
</div>
