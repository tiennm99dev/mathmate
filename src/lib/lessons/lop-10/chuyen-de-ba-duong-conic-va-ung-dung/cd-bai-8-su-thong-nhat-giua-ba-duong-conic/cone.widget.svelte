<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { KIND_NAMES } from '../_shared/conic.js';
  import {
    ALPHA,
    sectionEccentricity,
    sectionKind,
    sectionNote,
    sectionShape,
    sideView,
  } from './engine.js';

  const W = 300;
  const H = 300;
  const apex = { x: W / 2, y: H / 2 };
  const LEN = 150 / Math.cos((ALPHA * Math.PI) / 180);
  const RIM = 130;
  const CONE = '#4f46e5';
  const PLANE = '#0d9488';
  const CUT = '#e11d48';

  let phi = $state(30);

  const view = $derived(sideView(phi, { apex, depth: 60 }));
  const kind = $derived(sectionKind(phi));
  const e = $derived(sectionEccentricity(phi));
  const rimR = RIM * Math.tan((ALPHA * Math.PI) / 180);

  // The plane, seen edge-on, drawn across the whole picture.
  const planeEnds = $derived({
    a: { x: view.P0.x - 260 * view.dir.x, y: view.P0.y - 260 * view.dir.y },
    b: { x: view.P0.x + 260 * view.dir.x, y: view.P0.y + 260 * view.dir.y },
  });

  /** Where the plane leaves the cone at the rim of a nappe, along the plane line. */
  const cuts = $derived.by(() => {
    const hits = view.hits.filter((h) => h !== null);
    /** @type {{ x: number, y: number }[][]} */
    const segs = [];
    const lower = hits.filter((h) => h.t > 0).map((h) => h.at);
    const upper = hits.filter((h) => h.t < 0).map((h) => h.at);
    /** Point on the plane line at the height of a rim. @param {number} y */
    const atHeight = (y) => {
      const u = (y - view.P0.y) / view.dir.y;
      return { x: view.P0.x + u * view.dir.x, y };
    };
    const bottom = apex.y + RIM;
    const top = apex.y - RIM;
    /** A hit below the drawn rim is cut back to the rim. @param {{ x: number, y: number }} q */
    const inLower = (q) => (q.y > bottom ? atHeight(bottom) : q);
    if (lower.length === 2) segs.push(lower.map(inLower));
    else if (lower.length === 1) segs.push([inLower(lower[0]), atHeight(bottom)]);
    if (upper.length === 1 && upper[0].y > top) segs.push([upper[0], atHeight(top)]);
    return segs;
  });

  /** The small picture of the section, in a 120 × 120 box. */
  const shapePath = $derived(
    sectionShape(e)
      .map((run) => `M ${run.map((q) => `${60 + q.x * 14},${60 - q.y * 14}`).join(' L ')}`)
      .join(' '),
  );
  const g = 90 - ALPHA;
</script>

<div class="space-y-4">
  <SliderField
    label="Góc nghiêng của mặt phẳng so với mặt phẳng vuông góc với trục"
    bind:value={phi}
    min={0}
    max={85}
    step={1}
    format={(v) => `${v}°`}
  />
  <div class="grid gap-4 sm:grid-cols-[3fr_2fr]">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-sm rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Mặt nón tròn xoay có góc ở đỉnh {2 *
        ALPHA}°, nhìn từ bên cạnh, bị cắt bởi mặt phẳng nghiêng {phi}°: giao tuyến là {KIND_NAMES[
        kind
      ]}."
    >
      <polygon
        points="{apex.x},{apex.y} {apex.x - rimR},{apex.y + RIM} {apex.x + rimR},{apex.y + RIM}"
        fill="#eef2ff"
        stroke="none"
      />
      <polygon
        points="{apex.x},{apex.y} {apex.x - rimR},{apex.y - RIM} {apex.x + rimR},{apex.y - RIM}"
        fill="#eef2ff"
        stroke="none"
      />
      {#each [1, -1] as s (s)}
        <ellipse
          cx={apex.x}
          cy={apex.y + s * RIM}
          rx={rimR}
          ry="12"
          fill="none"
          stroke={CONE}
          stroke-width="1.5"
        />
      {/each}
      {#each view.gens as gen, i (i)}
        <line
          x1={apex.x - LEN * gen.x}
          y1={apex.y - LEN * gen.y}
          x2={apex.x + LEN * gen.x}
          y2={apex.y + LEN * gen.y}
          stroke={CONE}
          stroke-width="2"
        />
      {/each}
      <line
        x1={apex.x}
        y1={apex.y - RIM - 14}
        x2={apex.x}
        y2={apex.y + RIM + 14}
        stroke="#94a3b8"
        stroke-width="1"
        stroke-dasharray="4 4"
      />
      <line
        x1={planeEnds.a.x}
        y1={planeEnds.a.y}
        x2={planeEnds.b.x}
        y2={planeEnds.b.y}
        stroke={PLANE}
        stroke-width="7"
        stroke-opacity="0.25"
      />
      <line
        x1={planeEnds.a.x}
        y1={planeEnds.a.y}
        x2={planeEnds.b.x}
        y2={planeEnds.b.y}
        stroke={PLANE}
        stroke-width="1.5"
      />
      {#each cuts as seg, i (i)}
        <line
          x1={seg[0].x}
          y1={seg[0].y}
          x2={seg[1].x}
          y2={seg[1].y}
          stroke={CUT}
          stroke-width="4"
          stroke-linecap="round"
        />
      {/each}
      <circle cx={apex.x} cy={apex.y} r="3.5" fill={CONE} />
      <text x={apex.x + 8} y={apex.y + 4} font-size="12" font-weight="700" fill={CONE}>đỉnh</text>
    </svg>
    <div class="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 120 120"
        class="block w-40 rounded-lg border border-slate-200 bg-white"
        role="img"
        aria-label="Hình dạng giao tuyến: {KIND_NAMES[kind]}, tâm sai {formatNumber(e, 3)}."
      >
        <path d={shapePath} fill="none" stroke={CUT} stroke-width="2.5" />
      </svg>
      <p class="text-center text-sm font-semibold text-slate-700">
        Giao tuyến: {KIND_NAMES[kind]}<br />e {Number.isInteger(e) ? '=' : '≈'}
        {formatNumber(e, 3)}
      </p>
    </div>
  </div>
  <p class="text-sm text-slate-600">
    Nửa góc ở đỉnh của mặt nón là {ALPHA}°, nên đường sinh nghiêng {g}° so với mặt phẳng vuông góc
    với trục. Thử đặt góc nghiêng của mặt phẳng nhỏ hơn, bằng và lớn hơn {g}°.
  </p>
  <FeedbackNote tone={kind === 'parabol' ? 'ok' : 'info'} text={sectionNote(phi)} />
</div>
