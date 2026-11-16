<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { approxText, cosDeg, sinDeg } from '../_shared/trig.js';
  import {
    SPECIAL,
    TASKS,
    angleOfPoint,
    readout,
    signNote,
    supplementNote,
    taskNote,
  } from './engine.js';

  // The unit half circle: centre O, radius R pixels for one unit.
  const W = 400;
  const H = 240;
  const O = { x: 200, y: 205 };
  const R = 160;
  const MCOLOR = '#4f46e5';
  const BCOLOR = '#d97706';

  let alpha = $state(40);
  let mode = $state('explore');
  let task = $state(0);
  let showSupplement = $state(false);

  /** @param {number} deg */
  const onCircle = (deg) => ({ x: O.x + R * cosDeg(deg), y: O.y - R * sinDeg(deg) });
  const M = $derived(onCircle(alpha));
  const Mp = $derived(onCircle(180 - alpha));
  const lines = $derived(readout(alpha));
  const coords = $derived(`M(${approxText(cosDeg(alpha))}; ${approxText(sinDeg(alpha))})`);
  const note = $derived(
    mode === 'task'
      ? taskNote(task, alpha)
      : { tone: /** @type {'info'} */ ('info'), text: signNote(alpha) },
  );

  /** @param {number} deg */
  function setAlpha(deg) {
    alpha = Math.max(0, Math.min(180, Math.round(deg)));
  }

  /** @param {number} r */
  const arc = (r) => {
    const end = { x: O.x + r * cosDeg(alpha), y: O.y - r * sinDeg(alpha) };
    return `M ${O.x + r} ${O.y} A ${r} ${r} 0 0 0 ${end.x} ${end.y}`;
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: { ...M },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      setAlpha(angleOfPoint({ x: (p.x - O.x) / R, y: (O.y - p.y) / R }));
      return onCircle(alpha);
    },
    // Right and up turn M anticlockwise (α grows), left and down turn it back.
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) =>
      setAlpha(alpha + (dx || -dy) * (big ? 15 : 1)),
  });

  function nextTask() {
    task = (task + 1) % TASKS.length;
  }

  const label = $derived(
    `Nửa đường tròn đơn vị tâm O. Điểm M trên nửa đường tròn, góc xOM bằng ${alpha} độ, toạ độ ${coords}.${showSupplement ? ` Điểm M′ ứng với góc ${180 - alpha} độ, đối xứng với M qua trục tung.` : ''}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    bind:value={mode}
    options={[
      { value: 'explore', label: 'Khám phá' },
      { value: 'task', label: 'Tìm góc' },
    ]}
  />

  {#if mode === 'task'}
    <div
      class="flex flex-wrap items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3"
    >
      <p class="text-sm font-semibold text-indigo-900">
        Kéo M đến góc α thoả mãn
        <span class="ml-1 text-base"
          ><Tex math={TASKS[task].tex} ariaLabel={TASKS[task].text} /></span
        >
      </p>
      <button type="button" class={button.quiet} onclick={nextTask}>Bài khác</button>
    </div>
  {/if}

  <GeometryBoard bind:svgEl width={W} height={H} interactive maxWidth="max-w-xl" {label}>
    <!-- axes -->
    <line x1="16" y1={O.y} x2={W - 16} y2={O.y} stroke="#64748b" stroke-width="1.2" />
    <line x1={O.x} y1={H - 4} x2={O.x} y2="14" stroke="#64748b" stroke-width="1.2" />
    <path d="M {W - 16} {O.y} l -8 -4 v 8 z" fill="#64748b" />
    <path d="M {O.x} 14 l -4 8 h 8 z" fill="#64748b" />
    <text x={W - 18} y={O.y + 16} font-size="12" font-style="italic" fill="#334155">x</text>
    <text x={O.x + 8} y="22" font-size="12" font-style="italic" fill="#334155">y</text>
    <text x={O.x - 6} y={O.y + 15} font-size="12" text-anchor="end" fill="#334155">O</text>
    <text x={O.x + R} y={O.y + 15} font-size="12" text-anchor="middle" fill="#334155">1</text>
    <text x={O.x - R} y={O.y + 15} font-size="12" text-anchor="middle" fill="#334155">−1</text>
    <text x={O.x - 6} y={O.y - R - 4} font-size="12" text-anchor="end" fill="#334155">1</text>

    <!-- the unit half circle -->
    <path
      d="M {O.x + R} {O.y} A {R} {R} 0 0 0 {O.x - R} {O.y}"
      fill="none"
      stroke="#94a3b8"
      stroke-width="1.6"
    />

    {#if showSupplement}
      <line
        x1={M.x}
        y1={M.y}
        x2={Mp.x}
        y2={Mp.y}
        stroke={BCOLOR}
        stroke-width="1.2"
        stroke-dasharray="4 4"
      />
      <line x1={O.x} y1={O.y} x2={Mp.x} y2={Mp.y} stroke={BCOLOR} stroke-width="2" />
      <line
        x1={Mp.x}
        y1={Mp.y}
        x2={Mp.x}
        y2={O.y}
        stroke={BCOLOR}
        stroke-width="1"
        stroke-dasharray="3 3"
      />
      <circle cx={Mp.x} cy={Mp.y} r="5" fill={BCOLOR} />
      <text
        x={Mp.x + (Mp.x < O.x ? -10 : 10)}
        y={Mp.y - 8}
        font-size="13"
        font-weight="700"
        text-anchor={Mp.x < O.x ? 'end' : 'start'}
        fill={BCOLOR}>M′</text
      >
    {/if}

    <!-- projections of M on the axes: x0 = cos α, y0 = sin α -->
    <line
      x1={M.x}
      y1={M.y}
      x2={M.x}
      y2={O.y}
      stroke="#0f766e"
      stroke-width="1.4"
      stroke-dasharray="4 3"
    />
    <line
      x1={M.x}
      y1={M.y}
      x2={O.x}
      y2={M.y}
      stroke="#be123c"
      stroke-width="1.4"
      stroke-dasharray="4 3"
    />
    <line x1={O.x} y1={O.y} x2={M.x} y2={O.y} stroke="#0f766e" stroke-width="4" opacity="0.7" />
    <line x1={O.x} y1={O.y} x2={O.x} y2={M.y} stroke="#be123c" stroke-width="4" opacity="0.7" />
    <text x={M.x} y={O.y + 30} font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e"
      >x₀ = cos α</text
    >
    <text
      x={alpha <= 90 ? O.x - 6 : O.x + 6}
      y={(O.y + M.y) / 2 + 4}
      font-size="11"
      font-weight="700"
      text-anchor={alpha <= 90 ? 'end' : 'start'}
      fill="#be123c">y₀ = sin α</text
    >

    {#if alpha > 0}
      <path d={arc(28)} fill="none" stroke={MCOLOR} stroke-width="1.6" />
      <text
        x={O.x + 40 * cosDeg(alpha / 2)}
        y={O.y - 40 * sinDeg(alpha / 2) + 4}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill={MCOLOR}>α</text
      >
    {/if}
    <line x1={O.x} y1={O.y} x2={M.x} y2={M.y} stroke={MCOLOR} stroke-width="2.4" />

    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm M trên nửa đường tròn đơn vị; kéo hoặc dùng phím mũi tên để đổi góc α"
      aria-valuemin="0"
      aria-valuemax="180"
      aria-valuenow={alpha}
      aria-valuetext="α = {alpha} độ"
      style="cursor:grab; outline:none"
      use:draggable={dragOpts}
    >
      <circle
        class="drag-knob"
        cx={M.x}
        cy={M.y}
        r="9"
        fill={MCOLOR}
        stroke="#fff"
        stroke-width="2"
      />
    </g>
    <text
      x={M.x + (alpha > 90 ? -12 : 12)}
      y={M.y - 10}
      font-size="13"
      font-weight="700"
      text-anchor={alpha > 90 ? 'end' : 'start'}
      fill={MCOLOR}>M</text
    >
  </GeometryBoard>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Các góc đặc biệt">
    {#each SPECIAL as deg (deg)}
      <button
        type="button"
        class="min-h-11 min-w-12 rounded-lg border px-2 text-sm font-semibold {focusRing} {alpha ===
        deg
          ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}"
        aria-pressed={alpha === deg}
        onclick={() => setAlpha(deg)}>{deg}°</button
      >
    {/each}
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="space-y-1 rounded-lg border border-slate-200 bg-white p-3">
      <p class="text-sm font-semibold text-slate-700">
        α = {alpha}°, {coords}
      </p>
      <ul class="space-y-1" aria-live="polite">
        {#each lines as line (line.fn)}
          <li class={line.defined ? '' : 'text-slate-500'}><Tex math={line.tex} /></li>
        {/each}
      </ul>
    </div>
    <div
      class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
    >
      <p><Tex math="\sin \alpha = y_0,\quad \cos \alpha = x_0" /></p>
      <p>
        <Tex math={'\\tan \\alpha = \\dfrac{y_0}{x_0}\\ (\\alpha \\ne 90^\\circ)'} />
      </p>
      <p>
        <Tex math={'\\cot \\alpha = \\dfrac{x_0}{y_0}\\ (\\alpha \\ne 0^\\circ, 180^\\circ)'} />
      </p>
      <label class="flex min-h-11 cursor-pointer items-center gap-2 font-semibold">
        <input type="checkbox" class="size-5 accent-amber-600" bind:checked={showSupplement} />
        Hiện điểm M′ ứng với góc 180° − α
      </label>
    </div>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
  {#if showSupplement}
    <FeedbackNote tone="info" text={supplementNote(alpha)} />
  {/if}
</div>
