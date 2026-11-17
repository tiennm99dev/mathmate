<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import {
    PRESETS,
    STEPS,
    balanceText,
    expectationTex,
    feedback,
    summary,
    tiltOf,
    varianceTex,
  } from './engine.js';

  const W = 480;
  const H = 380;
  /** Highest bar, in twentieths (0,6). */
  const TOP_UNITS = 12;
  const BASE = 230;
  const BEAM = 312;

  let presetId = $state(PRESETS[0].id);
  const preset = $derived(PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]);
  let units = $state([...PRESETS[0].units]);
  /** Where the learner puts the pivot, in twentieths of a unit of X. */
  let pivot = $state(PRESETS[0].values[0] * STEPS);

  /** @param {string | number} id */
  function choosePreset(id) {
    const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
    units = [...p.units];
    pivot = p.values[0] * STEPS;
  }

  const values = $derived(preset.values);
  const lo = $derived(values[0]);
  const hi = $derived(values[values.length - 1]);
  const sx = $derived(linear(lo - 0.6, hi + 0.6, 44, W - 16));
  const sy = linear(0, TOP_UNITS / STEPS, BASE, 48);
  const barW = $derived(Math.min(44, (sx.map(1) - sx.map(0)) * 0.55));

  const s = $derived(summary(values, units));
  const note = $derived(feedback(values, units));
  const g = $derived(pivot / STEPS);
  const tilt = $derived(tiltOf(values, units, g));
  const balance = $derived(balanceText(values, units, g));

  let shownWidth = $state(0);
  const zoom = $derived(shownWidth > 0 ? Math.max(1, W / shownWidth) : 1);
  const font = (/** @type {number} */ base) => Math.max(base, 12 * zoom);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} i @param {number} u */
  function setUnits(i, u) {
    const next = clamp(Math.round(u), 0, TOP_UNITS);
    if (next !== units[i]) units[i] = next;
  }

  /** @param {number} i */
  const barDrag = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setUnits(i, sy.invert(scratch.y) * STEPS),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setUnits(i, units[i] + dx - dy),
  });

  /** @param {number} v */
  function setPivot(v) {
    pivot = clamp(Math.round(v), lo * STEPS, hi * STEPS);
  }

  const pivotDrag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => setPivot(sx.invert(scratch.x) * STEPS),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setPivot(pivot + (dx - dy) * (big ? 5 : 1)),
  });

  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tình huống"
    options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
    bind:value={presetId}
    onchange={choosePreset}
  />
  <p class="text-sm text-slate-600"><LiveRichText text={preset.story} /></p>

  <svg
    bind:this={svgEl}
    bind:clientWidth={shownWidth}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{W} / {H}"
    style:touch-action="none"
    role="group"
    aria-label="Biểu đồ phân bố xác suất của X và cán cân có điểm tựa kéo được"
  >
    {#each [0, 0.2, 0.4, 0.6] as t (t)}
      <line x1="44" y1={sy.map(t)} x2={W - 16} y2={sy.map(t)} stroke="#e2e8f0" />
      <text
        x="38"
        y={sy.map(t) + font(12) / 3}
        text-anchor="end"
        font-size={font(12)}
        fill="#64748b">{fmt(t)}</text
      >
    {/each}
    <text x="8" y="22" font-size={font(12)} font-weight="600" fill="#334155">P</text>
    <line x1="44" y1={BASE} x2={W - 16} y2={BASE} stroke="#334155" stroke-width="1.5" />

    {#if s.e !== null && s.sigma !== null && s.sigma > 0}
      <rect
        x={sx.map(s.e - s.sigma)}
        y="32"
        width={sx.map(s.e + s.sigma) - sx.map(s.e - s.sigma)}
        height={BASE - 32}
        fill="#e0e7ff"
        opacity="0.6"
      />
      <line
        x1={sx.map(s.e)}
        y1="32"
        x2={sx.map(s.e)}
        y2={BASE}
        stroke="#4338ca"
        stroke-width="2"
        stroke-dasharray="5 4"
      />
      <text
        x={clamp(sx.map(s.e), 90, W - 70)}
        y="24"
        text-anchor="middle"
        font-size={font(12)}
        font-weight="700"
        fill="#4338ca">E(X) = {fmt(s.e)}</text
      >
    {/if}

    {#each values as x, i (x)}
      {@const top = sy.map(units[i] / STEPS)}
      <rect
        x={sx.map(x) - barW / 2}
        y={top}
        width={barW}
        height={BASE - top}
        fill="#0d9488"
        rx="2"
      />
      <text
        x={sx.map(x)}
        y={top - 12}
        text-anchor="middle"
        font-size={font(12)}
        font-weight="700"
        fill="#1e293b">{fmt(units[i] / STEPS)}</text
      >
      <text
        x={sx.map(x)}
        y={BASE + font(13) + 6}
        text-anchor="middle"
        font-size={font(13)}
        fill="#334155">{x}</text
      >
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Xác suất P(X = {x})"
        aria-valuemin={0}
        aria-valuemax={TOP_UNITS / STEPS}
        aria-valuenow={units[i] / STEPS}
        aria-valuetext="P(X = {x}) = {fmt(units[i] / STEPS)}"
        aria-orientation="vertical"
        style="cursor:ns-resize; outline:none"
        use:draggable={barDrag(i)}
      >
        <rect
          class="drag-knob"
          x={sx.map(x) - barW / 2}
          y={top - 4}
          width={barW}
          height="8"
          rx="4"
          fill="#0f172a"
        />
      </g>
    {/each}
    <text
      x={W - 16}
      y={BASE + font(13) + 6}
      text-anchor="end"
      font-size={font(12)}
      font-weight="600"
      fill="#334155">X</text
    >

    <!-- The seesaw: each value of X is a weight p_k sitting at x_k on the beam. -->
    <g transform="rotate({tilt} {sx.map(g)} {BEAM})">
      <line
        x1={sx.map(lo - 0.4)}
        y1={BEAM}
        x2={sx.map(hi + 0.4)}
        y2={BEAM}
        stroke="#475569"
        stroke-width="5"
        stroke-linecap="round"
      />
      {#each values as x, i (x)}
        {@const r = 3 + 16 * Math.sqrt(units[i] / STEPS)}
        {#if units[i] > 0}
          <circle cx={sx.map(x)} cy={BEAM - 2.5 - r} {r} fill="#0d9488" opacity="0.85" />
        {/if}
      {/each}
    </g>
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm tựa của cán cân"
      aria-valuemin={lo}
      aria-valuemax={hi}
      aria-valuenow={g}
      aria-valuetext="Điểm tựa tại {fmt(g)}"
      aria-orientation="horizontal"
      style="cursor:ew-resize; outline:none"
      use:draggable={pivotDrag}
    >
      <polygon
        class="drag-knob"
        points="{sx.map(g)},{BEAM + 3} {sx.map(g) - 16},{BEAM + 34} {sx.map(g) + 16},{BEAM + 34}"
        fill="#f59e0b"
        stroke="#b45309"
        stroke-width="2"
      />
    </g>
    <text
      x={clamp(sx.map(g), 60, W - 60)}
      y={BEAM + 34 + font(12) + 4}
      text-anchor="middle"
      font-size={font(12)}
      fill="#92400e">điểm tựa {fmt(g)}</text
    >
  </svg>

  <p class="text-xs text-slate-600">
    Kéo đỉnh mỗi cột (hoặc dùng phím mũi tên) để đổi xác suất theo bước 0,05. Kéo điểm tựa màu cam
    dọc cán cân để tìm chỗ cán cân nằm thăng bằng.
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />
  <FeedbackNote tone={balance.tone} text={balance.text} />

  {#if s.valid}
    <div class="space-y-1 overflow-x-auto rounded-xl border border-indigo-200 bg-white p-3">
      <Tex math={expectationTex(values, units)} display />
      <Tex math={varianceTex(values, units)} display />
    </div>
  {/if}
</div>
