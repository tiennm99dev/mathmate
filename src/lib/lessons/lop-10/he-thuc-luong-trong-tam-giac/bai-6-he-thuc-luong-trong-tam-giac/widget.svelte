<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatFixed, tidy } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { circumcircle, incircle } from '#lib/geom-engine/centers.js';
  import { labelSpot, midpoint } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { areaCheck, cosineCheck, describe, isFat, measure, sineCheck } from './engine.js';

  const W = 400;
  const H = 300;
  const GRID = 10;
  const MARGIN = 16;
  const START = {
    A: { x: 120, y: 60 },
    B: { x: 50, y: 250 },
    C: { x: 330, y: 250 },
  };

  let A = $state({ ...START.A });
  let B = $state({ ...START.B });
  let C = $state({ ...START.C });
  let mode = $state('cos');
  /** @type {'A' | 'B' | 'C'} */
  let vertex = $state('A');

  const m = $derived(measure(A, B, C));
  const G = $derived({ x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 });
  const outer = $derived(circumcircle(A, B, C));
  const inner = $derived(incircle(A, B, C));
  const cos = $derived(cosineCheck(m, vertex));
  const sin = $derived(sineCheck(m));
  const area = $derived(areaCheck(m));

  /** @param {number} v @param {number} hi */
  const snapTo = (v, hi) => Math.max(MARGIN, Math.min(hi - MARGIN, Math.round(v / GRID) * GRID));

  /**
   * Snaps a dragged vertex to the grid and refuses a place that would flatten
   * the triangle.
   * @param {'A' | 'B' | 'C'} name
   */
  const project = (name) => (/** @type {{ x: number, y: number }} */ p) => {
    const next = { x: snapTo(p.x, W), y: snapTo(p.y, H) };
    const pts = { A, B, C, [name]: next };
    return isFat(pts.A, pts.B, pts.C) ? next : { ...{ A, B, C }[name] };
  };

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @param {{ x: number, y: number }} point @param {'A' | 'B' | 'C'} name */
  const opts = (point, name) => ({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: project(name),
    keyStep: GRID,
    keyShiftStep: 4 * GRID,
  });

  function restore() {
    A = { ...START.A };
    B = { ...START.B };
    C = { ...START.C };
  }

  /** Right triangle at A: 3, 4, 5 cm. */
  function rightAtA() {
    A = { x: 90, y: 250 };
    B = { x: 90, y: 90 };
    C = { x: 210, y: 250 };
  }

  /** An obtuse angle at A. */
  function obtuseAtA() {
    A = { x: 160, y: 190 };
    B = { x: 40, y: 260 };
    C = { x: 360, y: 250 };
  }

  const sides = $derived([
    { name: 'a', at: midpoint(B, C), color: '#be123c' },
    { name: 'b', at: midpoint(C, A), color: '#0f766e' },
    { name: 'c', at: midpoint(A, B), color: '#4f46e5' },
  ]);
  const vertices = $derived(
    /** @type {const} */ ([
      ['A', A],
      ['B', B],
      ['C', C],
    ]),
  );
  const f1 = (/** @type {number} */ v) => formatFixed(tidy(v, 6), 1);
  const f2 = (/** @type {number} */ v) => formatFixed(tidy(v, 6), 2);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Kiểm chứng"
    bind:value={mode}
    options={[
      { value: 'cos', label: 'Định lí côsin' },
      { value: 'sin', label: 'Định lí sin' },
      { value: 'area', label: 'Diện tích' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={W}
    height={H}
    interactive
    maxWidth="max-w-xl"
    label={describe(m)}
  >
    {#each { length: W / 40 + 1 } as _, i (i)}
      <line x1={i * 40} y1="0" x2={i * 40} y2={H} stroke="#e2e8f0" />
    {/each}
    {#each { length: H / 40 + 1 } as _, i (i)}
      <line x1="0" y1={i * 40} x2={W} y2={i * 40} stroke="#e2e8f0" />
    {/each}

    {#if mode === 'sin' && outer}
      <circle
        cx={outer.center.x}
        cy={outer.center.y}
        r={outer.radius}
        fill="none"
        stroke="#d97706"
        stroke-width="1.4"
        stroke-dasharray="5 4"
      />
      <circle cx={outer.center.x} cy={outer.center.y} r="3" fill="#d97706" />
      <line
        x1={outer.center.x}
        y1={outer.center.y}
        x2={A.x}
        y2={A.y}
        stroke="#d97706"
        stroke-width="1.2"
      />
      <text x={outer.center.x + 6} y={outer.center.y - 6} font-size="12" fill="#92400e">O</text>
    {/if}
    {#if mode === 'area' && inner}
      <circle
        cx={inner.center.x}
        cy={inner.center.y}
        r={inner.radius}
        fill="#fef3c7"
        stroke="#d97706"
        stroke-width="1.4"
      />
      <circle cx={inner.center.x} cy={inner.center.y} r="3" fill="#d97706" />
      <text x={inner.center.x + 6} y={inner.center.y - 6} font-size="12" fill="#92400e">I</text>
    {/if}

    <polygon
      points={pointsAttr([A, B, C])}
      fill={mode === 'area' ? 'rgba(79,70,229,0.08)' : 'none'}
      stroke="#0f172a"
      stroke-width="2"
    />
    {#each sides as s (s.name)}
      {@const spot = labelSpot(s.at, G, 14, W, H)}
      <text
        x={spot.x}
        y={spot.y + 4}
        font-size="13"
        font-style="italic"
        font-weight="700"
        text-anchor="middle"
        fill={s.color}>{s.name}</text
      >
    {/each}

    {#each vertices as [name, P] (name)}
      {@const spot = labelSpot(P, G, 22, W, H)}
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Đỉnh {name}; kéo hoặc dùng phím mũi tên để di chuyển"
        style="cursor:grab; outline:none"
        use:draggable={opts(P, name)}
      >
        <circle
          class="drag-knob"
          cx={P.x}
          cy={P.y}
          r="8"
          fill={mode === 'cos' && vertex === name ? '#e11d48' : '#4f46e5'}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={spot.x}
        y={spot.y + 5}
        font-size="14"
        font-weight="700"
        text-anchor="middle"
        fill="#0f172a"
        style="pointer-events:none">{name}</text
      >
    {/each}
  </GeometryBoard>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={restore}>Tam giác ban đầu</button>
    <button type="button" class={button.quiet} onclick={rightAtA}>Vuông tại A</button>
    <button type="button" class={button.quiet} onclick={obtuseAtA}>A tù</button>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="mb-1 text-left text-slate-600">Số đo (1 ô lưới = 1 cm)</caption>
      <tbody>
        <tr class="border-b border-slate-100">
          <th scope="row" class="py-1 pr-2 text-left">Cạnh</th>
          <td class="py-1 pr-2">a ≈ {f2(m.a)}</td>
          <td class="py-1 pr-2">b ≈ {f2(m.b)}</td>
          <td class="py-1">c ≈ {f2(m.c)}</td>
        </tr>
        <tr class="border-b border-slate-100">
          <th scope="row" class="py-1 pr-2 text-left">Góc</th>
          <td class="py-1 pr-2">A ≈ {f1(m.A)}°</td>
          <td class="py-1 pr-2">B ≈ {f1(m.B)}°</td>
          <td class="py-1">C ≈ {f1(m.C)}°</td>
        </tr>
        <tr>
          <th scope="row" class="py-1 pr-2 text-left">Khác</th>
          <td class="py-1 pr-2">R ≈ {f2(m.R)}</td>
          <td class="py-1 pr-2">r ≈ {f2(m.r)}</td>
          <td class="py-1">S ≈ {f2(m.S)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
    {#if mode === 'cos'}
      <SegmentedControl
        label="Định lí côsin cho góc"
        bind:value={vertex}
        options={[
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
        ]}
      />
      <div class="overflow-x-auto">
        <p><Tex math={cos.left} /></p>
        <p><Tex math={cos.right} /></p>
      </div>
    {:else}
      <div class="space-y-1 overflow-x-auto">
        {#each (mode === 'sin' ? sin : area).lines as line, i (i)}
          <p><Tex math={line} /></p>
        {/each}
      </div>
    {/if}
  </div>

  <FeedbackNote
    tone="ok"
    text={mode === 'cos' ? cos.note : mode === 'sin' ? sin.note : area.note}
  />
</div>
