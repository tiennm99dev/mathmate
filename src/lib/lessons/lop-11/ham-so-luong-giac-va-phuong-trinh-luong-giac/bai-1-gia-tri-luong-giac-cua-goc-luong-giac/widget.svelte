<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    angleAt,
    circlePoint,
    degTex,
    quadrantOf,
    radTex,
    trigValue,
    turnsTex,
    unwrap,
    valueText,
  } from '../_shared/trig.js';
  import { MAX_TURN, angleSentence, signsOf, spiralPath, spiralTip, splitTurns } from './engine.js';

  // The unit circle: centre C, one unit is R pixels. The tangent axis
  // (trục tang) is the line x = 1, the cotangent axis the line y = 1.
  const W = 360;
  const C = { x: 180, y: 180 };
  const R = 120;
  // tan and cot are drawn on their axes only while they stay on the board.
  const AXIS_LIMIT = 1.4;
  const COLORS = { sin: '#e11d48', cos: '#2563eb', tan: '#059669', cot: '#d97706' };

  /** @type {15 | 1} */
  let step = $state(15);
  let theta = $state(30);
  let M = $state(circlePoint(C, R, 30));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** @param {number} deg */
  function setTheta(deg) {
    theta = Math.max(-MAX_TURN, Math.min(MAX_TURN, deg));
    M = circlePoint(C, R, theta);
  }

  const dragOpts = $derived({
    point: M,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: W },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) =>
      circlePoint(C, R, Math.round(angleAt(C, p) / step) * step),
    onChange: () => {
      const next = Math.round(unwrap(theta, angleAt(C, M)) / step) * step;
      if (Math.abs(next) > MAX_TURN) {
        M = circlePoint(C, R, theta);
        return;
      }
      theta = next;
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
      const dir = dx || -dy;
      setTheta(theta + dir * step * (big ? 6 : 1));
    },
  });

  const tanV = $derived(trigValue('tan', theta));
  const cotV = $derived(trigValue('cot', theta));
  const q = $derived(quadrantOf(theta));
  const signs = $derived(q ? signsOf(q) : null);
  const split = $derived(splitTurns(theta));
  const spiral = $derived(spiralPath(C, theta));
  const tip = $derived(spiralTip(C, theta));
  const head = $derived(
    theta === 0
      ? ''
      : [
          circlePoint(tip.tip, 8, tip.heading + 150),
          tip.tip,
          circlePoint(tip.tip, 8, tip.heading - 150),
        ]
          .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(' '),
  );
  const tanPoint = $derived(
    Number.isNaN(tanV) || Math.abs(tanV) > AXIS_LIMIT ? null : { x: C.x + R, y: C.y - tanV * R },
  );
  const cotPoint = $derived(
    Number.isNaN(cotV) || Math.abs(cotV) > AXIS_LIMIT ? null : { x: C.x + cotV * R, y: C.y - R },
  );

  /** @type {Array<{ name: import('../_shared/trig.js').TrigName, def: string, color: string }>} */
  const rows = [
    { name: 'cos', def: 'x_M', color: COLORS.cos },
    { name: 'sin', def: 'y_M', color: COLORS.sin },
    { name: 'tan', def: '\\dfrac{\\sin\\alpha}{\\cos\\alpha}', color: COLORS.tan },
    { name: 'cot', def: '\\dfrac{\\cos\\alpha}{\\sin\\alpha}', color: COLORS.cot },
  ];

  const measureTex = $derived(
    `\\alpha = ${degTex(theta)} ${radTex(theta).startsWith('\\approx') ? '' : '='} ${radTex(theta)}`,
  );
  const familyTex = $derived(`\\alpha = ${degTex(split.base)}${turnsTex(split.k, true)}`);
  const note = $derived(
    `${angleSentence(theta)}${
      signs
        ? ` Dấu: $\\sin\\alpha$ ${signs.sin}, $\\cos\\alpha$ ${signs.cos}, $\\tan\\alpha$ ${signs.tan}, $\\cot\\alpha$ ${signs.cot}.`
        : ''
    }`,
  );

  const turnButtons = [
    { label: '−1 vòng', delta: -360 },
    { label: '+1 vòng', delta: 360 },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bước quay của điểm M"
    options={[
      { value: 15, label: 'Bước 15°' },
      { value: 1, label: 'Bước 1°' },
    ]}
    bind:value={step}
    onchange={() => setTheta(Math.round(theta / step) * step)}
  />

  <div class="grid gap-4 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {W}"
      class="mx-auto block w-full max-w-md touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label="Đường tròn lượng giác tâm O, điểm gốc A(1; 0). Kéo điểm M để đổi góc lượng giác (OA, OM)."
    >
      <!-- axes -->
      <line x1="12" y1={C.y} x2={W - 12} y2={C.y} stroke="#94a3b8" stroke-width="1.5" />
      <line x1={C.x} y1={W - 12} x2={C.x} y2="12" stroke="#94a3b8" stroke-width="1.5" />
      <!-- tangent axis x = 1 and cotangent axis y = 1 -->
      <line
        x1={C.x + R}
        y1="12"
        x2={C.x + R}
        y2={W - 12}
        stroke={COLORS.tan}
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      <line
        x1="12"
        y1={C.y - R}
        x2={W - 12}
        y2={C.y - R}
        stroke={COLORS.cot}
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      <text x={C.x + R + 4} y="24" font-size="12" fill={COLORS.tan}>trục tang</text>
      <text x="16" y={C.y - R - 6} font-size="12" fill={COLORS.cot}>trục côtang</text>
      <circle cx={C.x} cy={C.y} r={R} fill="none" stroke="#334155" stroke-width="2" />

      <!-- the turning angle, as a spiral that keeps every turn -->
      {#if spiral}
        <path d={spiral} fill="none" stroke="#6366f1" stroke-width="2" />
        <polyline points={head} fill="none" stroke="#6366f1" stroke-width="2" />
      {/if}

      <!-- line OM, extended to the tangent and cotangent axes -->
      {#if tanPoint}
        <line
          x1={C.x}
          y1={C.y}
          x2={tanPoint.x}
          y2={tanPoint.y}
          stroke={COLORS.tan}
          stroke-width="1.5"
        />
        <circle cx={tanPoint.x} cy={tanPoint.y} r="5" fill={COLORS.tan} />
        <text
          x={tanPoint.x + 8}
          y={tanPoint.y + 4}
          font-size="13"
          font-weight="700"
          fill={COLORS.tan}>T</text
        >
      {/if}
      {#if cotPoint}
        <line
          x1={C.x}
          y1={C.y}
          x2={cotPoint.x}
          y2={cotPoint.y}
          stroke={COLORS.cot}
          stroke-width="1.5"
        />
        <circle cx={cotPoint.x} cy={cotPoint.y} r="5" fill={COLORS.cot} />
        <text
          x={cotPoint.x - 4}
          y={cotPoint.y - 10}
          font-size="13"
          font-weight="700"
          fill={COLORS.cot}>S</text
        >
      {/if}
      <line x1={C.x} y1={C.y} x2={M.x} y2={M.y} stroke="#0f172a" stroke-width="2" />

      <!-- projections: cos on the x axis, sin on the y axis -->
      <line x1={M.x} y1={M.y} x2={M.x} y2={C.y} stroke="#64748b" stroke-dasharray="3 3" />
      <line x1={M.x} y1={M.y} x2={C.x} y2={M.y} stroke="#64748b" stroke-dasharray="3 3" />
      <line
        x1={C.x}
        y1={C.y}
        x2={M.x}
        y2={C.y}
        stroke={COLORS.cos}
        stroke-width="5"
        stroke-linecap="round"
      />
      <line
        x1={C.x}
        y1={C.y}
        x2={C.x}
        y2={M.y}
        stroke={COLORS.sin}
        stroke-width="5"
        stroke-linecap="round"
      />

      <text x={C.x - 14} y={C.y + 16} font-size="13" font-weight="700" fill="#0f172a">O</text>
      <text x={C.x + R + 4} y={C.y + 16} font-size="13" font-weight="700" fill="#0f172a">A</text>
      <text x={C.x - R - 18} y={C.y + 16} font-size="13" font-weight="700" fill="#0f172a">A′</text>
      <text x={C.x + 6} y={C.y - R - 6} font-size="13" font-weight="700" fill="#0f172a">B</text>
      <text x={C.x + 6} y={C.y + R + 16} font-size="13" font-weight="700" fill="#0f172a">B′</text>

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm M trên đường tròn lượng giác; kéo, hoặc dùng phím mũi tên để quay"
        aria-valuemin={-MAX_TURN}
        aria-valuemax={MAX_TURN}
        aria-valuenow={theta}
        aria-valuetext={`${theta} độ`}
        style="cursor:grab; outline:none"
        use:draggable={dragOpts}
      >
        <circle
          class="drag-knob"
          cx={M.x}
          cy={M.y}
          r="10"
          fill="#4f46e5"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={circlePoint(C, R - 22, theta - 12).x - 6}
        y={circlePoint(C, R - 22, theta - 12).y + 5}
        font-size="14"
        font-weight="700"
        fill="#4f46e5"
        pointer-events="none">M</text
      >
    </svg>

    <div class="space-y-3">
      <p class="text-base"><Tex math={measureTex} /></p>
      <p class="text-sm text-slate-600">
        <LiveRichText
          text={`Các góc lượng giác $(OA, OM)$ có cùng điểm cuối M đều có số đo $${degTex(split.base)} + k \\cdot 360^\\circ$; góc đang xét ứng với $k = ${split.k}$: $${familyTex}$.`}
        />
      </p>
      <table class="w-full text-sm tabular-nums">
        <caption class="sr-only">Bốn giá trị lượng giác của góc α</caption>
        <tbody>
          {#each rows as row (row.name)}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1.5 pr-2 text-left font-semibold" style="color:{row.color}"
                ><Tex math={`\\${row.name}\\alpha`} /></th
              >
              <td class="py-1.5 pr-2 text-slate-600"><Tex math={`= ${row.def}`} /></td>
              <td class="py-1.5 font-semibold text-slate-900"
                >= <LiveRichText text={valueText(row.name, theta)} /></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Quay thêm hoặc bớt vòng">
    {#each turnButtons as b (b.label)}
      <button
        type="button"
        class={button.quiet}
        disabled={Math.abs(theta + b.delta) > MAX_TURN}
        onclick={() => setTheta(theta + b.delta)}>{b.label}</button
      >
    {/each}
    <button type="button" class={button.quiet} onclick={() => setTheta(0)}>Về góc 0</button>
  </div>

  <FeedbackNote tone={q ? 'info' : 'warn'} text={note} />
  <p class="text-sm text-slate-600">
    <LiveRichText
      text="Thêm hay bớt một vòng ($360^\circ$, tức $2\pi$), điểm M không đổi chỗ nên cả bốn giá trị lượng giác giữ nguyên. Đường thẳng OM cắt trục tang tại T có tung độ $\tan\alpha$ và cắt trục côtang tại S có hoành độ $\cot\alpha$."
    />
  </p>
</div>
