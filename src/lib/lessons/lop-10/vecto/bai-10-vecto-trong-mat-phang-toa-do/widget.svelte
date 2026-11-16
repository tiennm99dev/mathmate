<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { gridHandle } from '../_shared/grid-handle.js';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import { add, coordTex, coordText, relation } from '../_shared/vectors.js';
  import { BOX, fits, kLimit, opTex, parallelTex, pointLines, result } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const O = { x: 0, y: 0 };
  const U = '#4f46e5';
  const VC = '#e11d48';
  const R = '#059669';

  let mode = $state('vecto');
  /** @type {import('./engine.js').Op} */
  let kind = $state('cong');
  const START_U = { x: 3, y: 1 };
  const START_V = { x: 1, y: 3 };
  let u = $state({ ...START_U });
  let v = $state({ ...START_V });
  let k = $state(2);
  const limit = $derived(kLimit(u));
  const r = $derived(result(kind, u, v, k));

  let pts = $state([
    { x: -4, y: -2 },
    { x: 2, y: 3 },
    { x: 4, y: -3 },
  ]);
  const info = $derived(pointLines(pts[0], pts[1], pts[2]));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  // A drag is taken only when the result vector stays on the grid.
  const uOpts = $derived(
    gridHandle({
      at: u,
      plane,
      svg,
      onmove: (g) => {
        if (fits(kind, g, v, k)) u = g;
      },
    }),
  );
  const vOpts = $derived(
    gridHandle({
      at: v,
      plane,
      svg,
      onmove: (g) => {
        if (fits(kind, u, g, k)) v = g;
      },
    }),
  );

  /** A new operation whose result would leave the grid starts from small vectors. @param {string | number} next */
  function switchKind(next) {
    const op = /** @type {import('./engine.js').Op} */ (next);
    if (op === 'nhan') k = Math.max(-limit, Math.min(limit, k));
    else if (!fits(op, u, v, k)) {
      u = { ...START_U };
      v = { ...START_V };
    }
  }
  /** @param {number} i */
  const pOpts = (i) => gridHandle({ at: pts[i], plane, svg, onmove: (g) => (pts[i] = g) });

  const NAMES = ['A', 'B', 'C'];
  const rel = $derived(relation(u, v));
  const note = $derived(
    mode === 'vecto'
      ? `$\\vec u = ${coordTex(u.x, u.y)}$ nghĩa là $\\vec u = ${u.x}\\vec i + ${u.y < 0 ? `(${u.y})` : u.y}\\vec j$: đi ${Math.abs(u.x)} ô ${u.x < 0 ? 'sang trái' : 'sang phải'} và ${Math.abs(u.y)} ô ${u.y < 0 ? 'xuống dưới' : 'lên trên'}. ${
          rel.parallel
            ? "$\\vec u$ và $\\vec v$ cùng phương: $xy' - x'y = 0$."
            : '$\\vec u$ và $\\vec v$ không cùng phương.'
        }`
      : `Toạ độ của $\\overrightarrow{AB}$ là "toạ độ điểm cuối trừ toạ độ điểm đầu". Trung điểm $I$ của $AB$ và trọng tâm $G$ của tam giác $ABC$ có toạ độ là trung bình cộng toạ độ các điểm.`,
  );
  const label = $derived(
    mode === 'vecto'
      ? `Mặt phẳng toạ độ Oxy với vectơ u ${coordText(u.x, u.y)}, vectơ v ${coordText(v.x, v.y)} và vectơ kết quả ${coordText(r.x, r.y)}.`
      : `Mặt phẳng toạ độ Oxy với A${coordText(pts[0].x, pts[0].y)}, B${coordText(pts[1].x, pts[1].y)}, C${coordText(pts[2].x, pts[2].y)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem"
    bind:value={mode}
    options={[
      { value: 'vecto', label: 'Phép toán vectơ' },
      { value: 'diem', label: 'Toạ độ điểm' },
    ]}
  />
  {#if mode === 'vecto'}
    <div class="flex flex-wrap items-end gap-4">
      <SegmentedControl
        label="Phép toán"
        bind:value={kind}
        onchange={switchKind}
        options={[
          { value: 'cong', label: 'u + v' },
          { value: 'tru', label: 'u − v' },
          { value: 'nhan', label: 'k · u' },
        ]}
      />
      {#if kind === 'nhan'}
        <Stepper label="k" bind:value={k} min={-limit} max={limit} format={intText} />
      {/if}
    </div>
  {/if}

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if mode === 'vecto'}
      {#if kind === 'cong'}
        <polygon
          points={pointsAttr([O, u, add(u, v), v].map(px))}
          fill={R}
          fill-opacity="0.06"
          stroke="#94a3b8"
          stroke-dasharray="5 4"
        />
      {:else if kind === 'tru'}
        <VectorArrow from={px(v)} to={px(u)} color={R} dashed width={2} />
      {/if}
      <VectorArrow from={px(O)} to={px(r)} color={R} width={6} opacity={0.5} />
      <VectorArrow from={px(O)} to={px(u)} color={U} name="u" side={-1} />
      {#if kind !== 'nhan'}
        <VectorArrow from={px(O)} to={px(v)} color={VC} name="v" />
      {/if}
      <text
        x={mx(r.x) + 8}
        y={my(r.y) - 8}
        font-size="12"
        font-weight="700"
        fill={R}
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none">{coordText(r.x, r.y)}</text
      >
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Ngọn vectơ u, toạ độ {coordText(u.x, u.y)}: kéo hoặc dùng phím mũi tên"
        style="cursor:grab; outline:none"
        use:draggable={uOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(u.x)}
          cy={my(u.y)}
          r="7"
          fill={U}
          fill-opacity="0.25"
          stroke={U}
          stroke-width="2"
        />
      </g>
      {#if kind !== 'nhan'}
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-label="Ngọn vectơ v, toạ độ {coordText(v.x, v.y)}: kéo hoặc dùng phím mũi tên"
          style="cursor:grab; outline:none"
          use:draggable={vOpts}
        >
          <circle
            class="drag-knob"
            cx={mx(v.x)}
            cy={my(v.y)}
            r="7"
            fill={VC}
            fill-opacity="0.25"
            stroke={VC}
            stroke-width="2"
          />
        </g>
      {/if}
    {:else}
      <polygon
        points={pointsAttr(pts.map(px))}
        fill="#4f46e5"
        fill-opacity="0.05"
        stroke="#94a3b8"
        stroke-width="1.2"
      />
      <line
        x1={mx(pts[2].x)}
        y1={my(pts[2].y)}
        x2={mx(info.I.x)}
        y2={my(info.I.y)}
        stroke="#94a3b8"
        stroke-dasharray="4 4"
      />
      <VectorArrow from={px(pts[0])} to={px(pts[1])} color={U} width={3} />
      <circle cx={mx(info.I.x)} cy={my(info.I.y)} r="4.5" fill={VC} />
      <circle cx={mx(info.G.x)} cy={my(info.G.y)} r="4.5" fill={R} />
      {#each [{ p: info.I, n: 'I', c: VC }, { p: info.G, n: 'G', c: R }] as t (t.n)}
        <text
          x={mx(t.p.x) + 8}
          y={my(t.p.y) - 8}
          font-size="13"
          font-weight="700"
          fill={t.c}
          stroke="#fff"
          stroke-width="3"
          paint-order="stroke"
          style="pointer-events:none">{t.n}</text
        >
      {/each}
      {#each pts as P, i (i)}
        <text
          x={mx(P.x) - 10}
          y={my(P.y) + 20}
          font-size="12"
          font-weight="700"
          text-anchor="middle"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="3"
          paint-order="stroke"
          style="pointer-events:none">{NAMES[i]}{coordText(P.x, P.y)}</text
        >
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-label="Điểm {NAMES[i]}{coordText(P.x, P.y)}: kéo hoặc dùng phím mũi tên"
          style="cursor:grab; outline:none"
          use:draggable={pOpts(i)}
        >
          <circle
            class="drag-knob"
            cx={mx(P.x)}
            cy={my(P.y)}
            r="7"
            fill="#fff"
            stroke="#0f172a"
            stroke-width="2"
          />
        </g>
      {/each}
    {/if}
  </CoordinatePlane>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    {#if mode === 'vecto'}
      <p><Tex math={`\\vec u = ${coordTex(u.x, u.y)},\\quad \\vec v = ${coordTex(v.x, v.y)}`} /></p>
      <p><Tex math={opTex(kind, u, v, k)} /></p>
      <p><Tex math={parallelTex(u, v)} /></p>
    {:else}
      {#each info.lines as line, i (i)}
        <p><Tex math={line} /></p>
      {/each}
    {/if}
  </div>
  <FeedbackNote tone="info" text={note} />
</div>
