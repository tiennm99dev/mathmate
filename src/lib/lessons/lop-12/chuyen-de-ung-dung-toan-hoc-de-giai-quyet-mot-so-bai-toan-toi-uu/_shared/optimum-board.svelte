<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, tidy } from '#lib/core/number-format.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import { canHeight, readout, samples, slopeVerdict } from './optimum.js';

  /**
   * An optimisation problem solved with the derivative: drag the point along
   * the graph of the objective (or use the slider), watch the tangent and
   * the sign of the derivative, and find where the optimum is.
   *
   * - `problems`: the problems to switch between (`OptProblem` in `./optimum.js`).
   *
   * @type {{ problems: import('./optimum.js').OptProblem[] }}
   */
  let { problems } = $props();

  const W = 480;
  const H = 300;
  const LEFT = 58;
  const RIGHT = 16;
  const TOP = 16;
  const BOTTOM = 266;

  let index = $state(0);
  const pr = $derived(problems[index] ?? problems[0]);
  /** @param {number} i */
  const startOf = (i) => (problems[i] ?? problems[0]).start;
  let x = $state(startOf(0));

  /** @param {string | number} value */
  function choose(value) {
    index = Number(value);
    x = startOf(index);
  }

  const sx = $derived(linear(pr.domain[0], pr.domain[1], LEFT, W - RIGHT));
  const sy = $derived(linear(pr.yRange[0], pr.yRange[1], BOTTOM, TOP));
  /** @param {number} v */
  const cy = (v) => clamp(sy.map(v), TOP, BOTTOM);
  const curve = $derived(
    samples(pr)
      .map((p) => `${sx.map(p.x)},${cy(p.y)}`)
      .join(' '),
  );
  /** @param {[number, number]} r */
  const ticks = (r) => Array.from({ length: 5 }, (_, i) => tidy(r[0] + ((r[1] - r[0]) * i) / 4, 6));
  const xTicks = $derived(ticks(pr.domain));
  const yTicks = $derived(ticks(pr.yRange));

  const fx = $derived(pr.fn(x));
  const tangent = $derived.by(() => {
    const half = (pr.domain[1] - pr.domain[0]) * 0.14;
    const d = pr.dfn(x);
    return [x - half, x + half].map((t) => ({ px: sx.map(t), py: sy.map(fx + d * (t - x)) }));
  });

  let shownWidth = $state(0);
  const zoom = $derived(shownWidth > 0 ? Math.max(1, W / shownWidth) : 1);
  const font = (/** @type {number} */ base) => Math.max(base, 12 * zoom);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} v */
  function setX(v) {
    const s = pr.step;
    x = tidy(clamp(Math.round((v - pr.domain[0]) / s) * s + pr.domain[0], ...pr.domain), 6);
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setX(sx.invert(scratch.x)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setX(x + (dx - dy) * pr.step * (big ? 10 : 1)),
  });

  const verdict = $derived(slopeVerdict(pr, x));
  const reading = $derived(readout(pr, x));
  const fmtTick = (/** @type {number} */ v) => formatNumber(v, 2);
  const unitLabel = (/** @type {string} */ u) => (u ? ` (${u})` : '');

  // The can, drawn to scale: 5 px per cm.
  const CAN_SCALE = 5;
  const canR = $derived(x * CAN_SCALE);
  const canH = $derived(canHeight(x) * CAN_SCALE);
  const canTop = $derived(150 - canH);
</script>

<div class="space-y-4">
  {#if problems.length > 1}
    <SegmentedControl
      label="Bài toán"
      bind:value={index}
      onchange={choose}
      options={problems.map((p, i) => ({ value: i, label: p.label }))}
    />
  {/if}
  <p class="text-sm text-slate-700"><LiveRichText text={pr.story} /></p>
  <div
    class="space-y-1 overflow-x-auto rounded-lg border border-indigo-200 bg-white p-3 text-center"
  >
    <Tex math={pr.fTex} display />
    <Tex math={pr.dfTex} display />
  </div>

  <div class="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
    <svg
      bind:this={svgEl}
      bind:clientWidth={shownWidth}
      viewBox="0 0 {W} {H}"
      class="block w-full max-w-xl select-none"
      style:aspect-ratio="{W} / {H}"
      style:touch-action="none"
      role="group"
      aria-label="Đồ thị hàm {pr.f} theo {pr.x} với điểm kéo được và tiếp tuyến tại điểm đó"
    >
      {#each yTicks as t (t)}
        <line x1={LEFT} y1={sy.map(t)} x2={W - RIGHT} y2={sy.map(t)} stroke="#e2e8f0" />
        <text
          x={LEFT - 6}
          y={sy.map(t) + font(11) / 3}
          text-anchor="end"
          font-size={font(11)}
          fill="#64748b">{fmtTick(t)}</text
        >
      {/each}
      {#each xTicks as t (t)}
        <text
          x={sx.map(t)}
          y={BOTTOM + font(11) + 6}
          text-anchor="middle"
          font-size={font(11)}
          fill="#64748b">{fmtTick(t)}</text
        >
      {/each}
      <line x1={LEFT} y1={BOTTOM} x2={W - RIGHT} y2={BOTTOM} stroke="#334155" stroke-width="1.5" />
      <line x1={LEFT} y1={TOP} x2={LEFT} y2={BOTTOM} stroke="#334155" stroke-width="1.5" />
      <text x={W - RIGHT} y={BOTTOM - 6} text-anchor="end" font-size={font(12)} fill="#334155"
        >{pr.x}{unitLabel(pr.xUnit)}</text
      >
      <text x={LEFT + 6} y={TOP + font(12)} font-size={font(12)} fill="#334155"
        >{pr.f}{unitLabel(pr.fUnit)}</text
      >

      <polyline points={curve} fill="none" stroke="#4f46e5" stroke-width="2.5" />
      <line
        x1={sx.map(pr.best)}
        y1={TOP}
        x2={sx.map(pr.best)}
        y2={BOTTOM}
        stroke="#94a3b8"
        stroke-dasharray="3 5"
        opacity={verdict.tone === 'ok' ? 1 : 0}
      />
      <line
        x1={tangent[0].px}
        y1={tangent[0].py}
        x2={tangent[1].px}
        y2={tangent[1].py}
        stroke="#ea580c"
        stroke-width="2"
      />
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm trên đồ thị, kéo để đổi {pr.x}"
        aria-valuemin={pr.domain[0]}
        aria-valuemax={pr.domain[1]}
        aria-valuenow={x}
        aria-valuetext="{pr.x} = {formatNumber(x, 2)}{pr.xUnit ? ` ${pr.xUnit}` : ''}"
        aria-orientation="horizontal"
        style="cursor:ew-resize; outline:none"
        use:draggable={drag}
      >
        <circle
          class="drag-knob"
          cx={sx.map(x)}
          cy={cy(fx)}
          r="9"
          fill={verdict.tone === 'ok' ? '#059669' : '#ea580c'}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    </svg>

    {#if pr.picture === 'can'}
      <svg
        viewBox="0 0 90 160"
        class="block w-28 shrink-0"
        role="img"
        aria-label="Lon nước bán kính {formatNumber(x, 2)} cm, cao {formatNumber(
          canHeight(x),
          1,
        )} cm"
      >
        <rect
          x={45 - canR}
          y={canTop}
          width={canR * 2}
          height={canH}
          fill="#e0e7ff"
          stroke="#4338ca"
        />
        <ellipse cx="45" cy={canTop} rx={canR} ry={canR * 0.25} fill="#c7d2fe" stroke="#4338ca" />
        <path
          d="M {45 - canR} 150 A {canR} {canR * 0.25} 0 0 0 {45 + canR} 150"
          fill="none"
          stroke="#4338ca"
        />
      </svg>
    {/if}
  </div>

  <SliderField
    label="Kéo {pr.x}"
    bind:value={x}
    min={pr.domain[0]}
    max={pr.domain[1]}
    step={pr.step}
    unit={pr.xUnit}
    format={(v) => formatNumber(v, 2)}
  />
  <p class="text-sm text-slate-700" aria-live="polite"><LiveRichText text={reading} /></p>
  <FeedbackNote tone={verdict.tone} text={verdict.text} />
</div>
