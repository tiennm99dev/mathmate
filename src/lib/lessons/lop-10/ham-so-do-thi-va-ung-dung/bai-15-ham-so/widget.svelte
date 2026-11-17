<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import PlotClip from '../_shared/plot-clip.svelte';
  import { curvePath, valText } from '../_shared/quadratic.js';
  import { FUNCTIONS, compareSentence, pointSentence, runText, valueOf } from './engine.js';

  const plane = planeScale({ xMin: -4, xMax: 4, yMin: -4, yMax: 6, width: 420, pad: 24 });
  const { mx, my, toX, unit } = plane;
  const CURVE = '#4f46e5';
  const UP = '#059669';
  const DOWN = '#e11d48';
  const AXIS = '#0f172a';

  let fnId = $state('square');
  const fn = $derived(FUNCTIONS.find((f) => f.id === fnId) ?? FUNCTIONS[0]);

  let handle = $state({ x: mx(1), y: my(0) });
  const x = $derived(Math.max(fn.lo, Math.min(fn.hi, Math.round(toX(handle.x) * 2) / 2)));
  const y = $derived(valueOf(fn, x));

  /** x values visited so far, for the trace of the graph. */
  let visited = $state(/** @type {number[]} */ ([]));
  /** The x before the last move, for the comparison of two values. */
  let previous = $state(/** @type {number | null} */ (null));
  let showCurve = $state(false);
  let showRuns = $state(false);

  let last = 1;
  $effect(() => {
    const now = x;
    if (now !== last) {
      previous = last;
      last = now;
    }
    if (!visited.includes(now)) visited.push(now);
  });

  /** @param {string | number} id */
  function choose(id) {
    fnId = String(id);
    const f = FUNCTIONS.find((g) => g.id === id) ?? FUNCTIONS[0];
    const start = Math.max(f.lo, Math.min(f.hi, 1));
    handle = { x: mx(start), y: my(0) };
    last = start;
    previous = null;
    visited = [];
    showCurve = false;
    showRuns = false;
  }

  const snap = (/** @type {{ x: number, y: number }} */ p) => {
    const v = Math.max(fn.lo, Math.min(fn.hi, Math.round(toX(p.x) * 2) / 2));
    return { x: mx(v), y: my(0) };
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snap,
    pad: 0,
    keyStep: unit / 2,
    keyShiftStep: unit,
  });

  const curve = $derived(curvePath(fn.f, plane, { lo: fn.lo, hi: fn.hi, extra: fn.edges }));
  const runPaths = $derived(
    fn.runs.map((r) => ({
      run: r,
      d: curvePath(fn.f, plane, {
        lo: Math.max(r.from, fn.lo),
        hi: Math.min(r.to, fn.hi),
        extra: fn.edges,
      }),
    })),
  );
  const dots = $derived(
    visited
      .map((v) => ({ x: v, y: valueOf(fn, v) }))
      .filter((p) => p.y !== null && p.y >= plane.yMin && p.y <= plane.yMax),
  );
  const note = $derived(pointSentence(fn, x));
  const compare = $derived(previous === null ? null : compareSentence(fn, previous, x));
  const yLabel = $derived(y === null ? '' : valText(y).replace('≈ ', ''));
  const plotLabel = $derived(
    `Đồ thị của hàm số ${fn.text}. ${y === null ? `x = ${formatNumber(x)} không thuộc tập xác định.` : `Điểm M(${formatNumber(x)}; ${yLabel}).`} Đã đánh dấu ${dots.length} điểm của đồ thị.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hàm số"
    options={FUNCTIONS.map((f) => ({ value: f.id, label: f.label }))}
    value={fnId}
    onchange={choose}
  />

  <div class="grid gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700 sm:grid-cols-3">
    <p><Tex math={fn.tex} /></p>
    <p>Tập xác định: <Tex math={fn.domainTex} /></p>
    <p>Tập giá trị: <Tex math={fn.rangeTex} /></p>
  </div>

  <CoordinatePlane bind:svgEl {plane} label={plotLabel}>
    {#if showRuns}
      {#each fn.runs as r, i (i)}
        {@const lo = Math.max(r.from, plane.xMin)}
        {@const hi = Math.min(r.to, plane.xMax)}
        <rect
          x={mx(lo)}
          y={my(0) + 10}
          width={mx(hi) - mx(lo)}
          height="6"
          rx="3"
          fill={r.up ? UP : DOWN}
          opacity="0.55"
        />
      {/each}
    {/if}
    <PlotClip {plane}>
      {#if showRuns}
        {#each runPaths as p, i (i)}
          <path d={p.d} fill="none" stroke={p.run.up ? UP : DOWN} stroke-width="3" />
        {/each}
      {:else if showCurve}
        <path d={curve} fill="none" stroke={CURVE} stroke-width="2.5" opacity="0.8" />
      {/if}
      {#each dots as p (p.x)}
        <circle cx={mx(p.x)} cy={my(/** @type {number} */ (p.y))} r="3.5" fill={CURVE} />
      {/each}
    </PlotClip>

    {#if y !== null}
      <line
        x1={mx(x)}
        y1={my(0)}
        x2={mx(x)}
        y2={my(y)}
        stroke={AXIS}
        stroke-width="1.2"
        stroke-dasharray="4 3"
      />
      <line
        x1={mx(0)}
        y1={my(y)}
        x2={mx(x)}
        y2={my(y)}
        stroke={AXIS}
        stroke-width="1.2"
        stroke-dasharray="4 3"
      />
      <circle cx={mx(x)} cy={my(y)} r="6.5" fill={CURVE} stroke="#fff" stroke-width="2" />
      <text
        x={mx(x) + (x < 0 ? -10 : 10)}
        y={my(y) - 10}
        text-anchor={x < 0 ? 'end' : 'start'}
        font-size="13"
        font-weight="700"
        fill={CURVE}>M</text
      >
    {/if}

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Giá trị x trên trục hoành, kéo hoặc dùng phím mũi tên"
      aria-valuemin={fn.lo}
      aria-valuemax={fn.hi}
      aria-valuenow={x}
      aria-valuetext={`x = ${formatNumber(x)}`}
      style="cursor:grab; outline:none"
      use:draggable={dragOpts}
    >
      <rect
        class="drag-knob"
        x={mx(x) - 9}
        y={my(0) - 9}
        width="18"
        height="18"
        rx="4"
        fill={y === null ? '#f59e0b' : '#0f766e'}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
    <text
      x={mx(x)}
      y={my(0) + 30}
      text-anchor="middle"
      font-size="12"
      font-weight="700"
      fill="#0f766e">x = {formatNumber(x)}</text
    >
  </CoordinatePlane>

  <FeedbackNote tone={note.tone} text={note.text} />
  {#if compare}
    <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900" aria-live="polite">
      {compare}
    </p>
  {/if}

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.secondary}
      aria-pressed={showCurve}
      onclick={() => (showCurve = !showCurve)}
    >
      {showCurve ? 'Ẩn đồ thị' : 'Hiện toàn bộ đồ thị'}
    </button>
    <button
      type="button"
      class={button.secondary}
      aria-pressed={showRuns}
      onclick={() => (showRuns = !showRuns)}
    >
      {showRuns ? 'Bỏ tô màu' : 'Tô khoảng đồng biến, nghịch biến'}
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        visited = [x];
        previous = null;
      }}
    >
      Xoá vết
    </button>
  </div>

  {#if showRuns}
    <ul class="space-y-1 text-sm">
      {#each fn.runs as r, i (i)}
        <li style="color: {r.up ? UP : DOWN}" class="font-semibold">
          {r.up ? 'Đồng biến' : 'Nghịch biến'} trên {runText(r)}: đồ thị đi {r.up ? 'lên' : 'xuống'} từ
          trái sang phải.
        </li>
      {/each}
    </ul>
  {/if}
</div>
