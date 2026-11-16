<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { hasMode, num } from '../_shared/sample.js';
  import {
    HI,
    LO,
    MAX_N,
    MIN_N,
    START,
    centreLines,
    centreNote,
    clampValue,
    modeText,
    stackRanks,
  } from './engine.js';

  const W = 400;
  const H = 230;
  const LEFT = 25;
  const RIGHT = 385;
  const AXIS = 168;
  const STEP = 13;

  const X = (/** @type {number} */ v) => LEFT + ((v - LO) / (HI - LO)) * (RIGHT - LEFT);
  const fromX = (/** @type {number} */ x) => LO + ((x - LEFT) / (RIGHT - LEFT)) * (HI - LO);

  /** @param {readonly number[]} values */
  const toDots = (values) => values.map((v) => ({ x: X(v), y: AXIS }));

  let dots = $state(toDots(START));

  const values = $derived(dots.map((d) => clampValue(fromX(d.x))));
  const ranks = $derived(stackRanks(values));
  const centre = $derived(centreLines(values));
  const s = $derived(centre.s);
  const note = $derived(centreNote(s));
  const modeSet = $derived(new Set(hasMode(s) ? s.modes : []));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  /** @param {{ x: number, y: number }} point */
  const opts = (point) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => ({
      x: X(clampValue(fromX(p.x))),
      y: AXIS,
    }),
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      point.x = X(clampValue(fromX(point.x) + (dx || -dy) * (big ? 5 : 1)));
    },
  });

  function addDot() {
    if (dots.length < MAX_N) dots.push({ x: X(20), y: AXIS });
  }
  function removeDot() {
    if (dots.length > MIN_N) dots.pop();
  }
  function farValue() {
    const last = dots.length - 1;
    dots[last].x = X(HI);
  }

  const ticks = Array.from({ length: (HI - LO) / 10 + 1 }, (_, i) => LO + i * 10);
  const sortedText = $derived(s.sorted.map((v) => num(v)).join('; '));
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label="Biểu đồ chấm thời gian đi học của {s.n} bạn, có các vạch số trung bình, trung vị và tứ phân vị."
  >
    <rect
      x={X(s.q1)}
      y="34"
      width={Math.max(0, X(s.q3) - X(s.q1))}
      height={AXIS - 34}
      fill="#e0e7ff"
      opacity="0.6"
    />
    <line
      x1={X(s.q1)}
      y1="34"
      x2={X(s.q1)}
      y2={AXIS + 22}
      stroke="#4f46e5"
      stroke-dasharray="4 3"
    />
    <line
      x1={X(s.q3)}
      y1="34"
      x2={X(s.q3)}
      y2={AXIS + 22}
      stroke="#4f46e5"
      stroke-dasharray="4 3"
    />
    <line
      x1={X(s.median)}
      y1="34"
      x2={X(s.median)}
      y2={AXIS + 38}
      stroke="#0f172a"
      stroke-width="2.5"
    />
    <line x1={X(s.mean)} y1="20" x2={X(s.mean)} y2={AXIS} stroke="#d97706" stroke-width="2.5" />

    <line x1={LEFT} y1={AXIS + 8} x2={RIGHT} y2={AXIS + 8} stroke="#64748b" />
    {#each ticks as t (t)}
      <line x1={X(t)} y1={AXIS + 8} x2={X(t)} y2={AXIS + 13} stroke="#64748b" />
      <text x={X(t)} y={AXIS + 58} font-size="11" text-anchor="middle" fill="#475569">{t}</text>
    {/each}

    <text x={X(s.mean)} y="15" font-size="12" font-weight="700" text-anchor="middle" fill="#b45309"
      ><tspan text-decoration="overline">x</tspan></text
    >
    <text x={X(s.q1)} y={AXIS + 32} font-size="11" text-anchor="end" fill="#4338ca">Q₁ </text>
    <text x={X(s.q3)} y={AXIS + 32} font-size="11" text-anchor="start" fill="#4338ca"> Q₃</text>
    <text x={X(s.median)} y={AXIS + 48} font-size="12" font-weight="700" text-anchor="middle"
      >Mₑ</text
    >

    {#each dots as d, i (i)}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Bạn thứ {i + 1}"
        aria-valuemin={LO}
        aria-valuemax={HI}
        aria-valuenow={values[i]}
        aria-valuetext="{values[i]} phút"
        style="cursor:grab; outline:none"
        use:draggable={opts(d)}
      >
        <circle
          class="drag-knob"
          cx={X(values[i])}
          cy={AXIS - STEP * ranks[i]}
          r="6"
          fill={modeSet.has(values[i]) ? '#16a34a' : '#64748b'}
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>
    {/each}
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Mỗi chấm là thời gian (phút) đi từ nhà đến trường của một bạn. Chấm xanh lá thuộc mốt; vạch cam
    là số trung bình, vạch đen là trung vị, dải xanh từ <Tex math="Q_1" /> đến <Tex math="Q_3" />.
  </p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={addDot} disabled={dots.length >= MAX_N}
      >Thêm một bạn</button
    >
    <button type="button" class={button.quiet} onclick={removeDot} disabled={dots.length <= MIN_N}
      >Bớt một bạn</button
    >
    <button type="button" class={button.secondary} onclick={farValue}>Một bạn đi 60 phút</button>
    <button type="button" class={button.quiet} onclick={() => (dots = toDots(START))}
      >Mẫu ban đầu</button
    >
  </div>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-sm">
    <p><LiveRichText text={`Mẫu đã sắp xếp ($n = ${s.n}$): ${sortedText}`} /></p>
    {#each centre.lines as line, i (i)}
      <p><Tex math={line} /></p>
    {/each}
    <p><LiveRichText text={modeText(s)} /></p>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
