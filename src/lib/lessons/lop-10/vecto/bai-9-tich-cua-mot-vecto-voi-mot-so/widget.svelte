<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import GridLines from '../_shared/grid-lines.svelte';
  import { gridHandle } from '../_shared/grid-handle.js';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import { add, scale, sub } from '../_shared/vectors.js';
  import { centroidChain, kTex, lengthLine, scaleNote } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -4, yMax: 4, width: 400, pad: 16 });
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const INDIGO = '#4f46e5';
  const GREEN = '#059669';
  const ROSE = '#e11d48';
  const AMBER = '#d97706';

  let mode = $state('k');

  // Scaling: A and B = A + a are handles, k a slider.
  let A = $state({ x: -2, y: -1 });
  let B = $state({ x: 0, y: 0 });
  let k = $state(2);
  const a = $derived(sub(B, A));
  const C = $derived(add(A, scale(a, k)));

  // Centroid: triangle PQR (named A, B, C on the board) and a free point M.
  let tri = $state([
    { x: -4, y: -3 },
    { x: 2, y: -3 },
    { x: -1, y: 2 },
  ]);
  let M = $state({ x: 4, y: 2 });
  const chain = $derived(centroidChain(tri[0], tri[1], tri[2], M));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  const tailOpts = $derived(
    gridHandle({
      at: A,
      plane,
      svg,
      onmove: (g) => {
        const d = sub(B, A);
        const next = add(g, d);
        if (Math.abs(next.x) <= 6 && Math.abs(next.y) <= 4) {
          A = g;
          B = next;
        }
      },
    }),
  );
  const headOpts = $derived(gridHandle({ at: B, plane, svg, onmove: (g) => (B = g) }));
  /** @param {number} i */
  const vertexOpts = (i) => gridHandle({ at: tri[i], plane, svg, onmove: (g) => (tri[i] = g) });
  const mOpts = $derived(gridHandle({ at: M, plane, svg, onmove: (g) => (M = g) }));

  function reset() {
    A = { x: -2, y: -1 };
    B = { x: 0, y: 0 };
    k = 2;
    tri = [
      { x: -4, y: -3 },
      { x: 2, y: -3 },
      { x: -1, y: 2 },
    ];
    M = { x: 4, y: 2 };
  }

  const NAMES = ['A', 'B', 'C'];
  const CHAIN_NOTE =
    'Nối tiếp ba vectơ $\\overrightarrow{MA}$ (tím), $\\overrightarrow{MB}$ (đỏ), $\\overrightarrow{MC}$ (cam) theo quy tắc ba điểm: điểm cuối luôn trùng điểm cuối của $3\\overrightarrow{MG}$ (vệt xanh), dù kéo $M$ hay các đỉnh đi đâu.';
  const label = $derived(
    mode === 'k'
      ? `Vectơ a từ A đến B, sang ${formatNumber(a.x)} ô và lên ${formatNumber(a.y)} ô; vectơ ${formatNumber(k)} nhân a từ A đến C.`
      : `Tam giác ABC có trọng tâm G, điểm M ở ô (${M.x}; ${M.y}); tổng MA + MB + MC đi tới cùng điểm với 3 MG.`,
  );
  const tag = (
    /** @type {{x:number,y:number}} */ p,
    /** @type {string} */ name,
    dx = -12,
    dy = 18,
  ) => ({
    x: mx(p.x) + dx,
    y: my(p.y) + dy,
    name,
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem"
    bind:value={mode}
    options={[
      { value: 'k', label: 'Nhân vectơ với số k' },
      { value: 'g', label: 'Hệ thức trọng tâm' },
    ]}
  />

  {#if mode === 'k'}
    <SliderField label="Số k" bind:value={k} min={-3} max={3} step={0.5} />
  {/if}

  <GeometryBoard
    bind:svgEl
    width={plane.width}
    height={plane.height}
    interactive
    maxWidth="max-w-xl"
    {label}
  >
    <GridLines {plane} />
    {#if mode === 'k'}
      <VectorArrow from={px(A)} to={px(C)} color={GREEN} width={7} opacity={0.45} name="" />
      <VectorArrow from={px(A)} to={px(B)} color={INDIGO} name="a" />
      {#each [tag(A, 'A'), tag(B, 'B', 12, -10), tag(C, 'C', 14, 18)] as t (t.name)}
        <text
          x={t.x}
          y={t.y}
          font-size="13"
          font-weight="700"
          text-anchor="middle"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="3"
          paint-order="stroke"
          style="pointer-events:none">{t.name}</text
        >
      {/each}
      <circle cx={mx(C.x)} cy={my(C.y)} r="4" fill={GREEN} />
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm A, điểm đầu của vectơ a: kéo để dời vectơ"
        style="cursor:grab; outline:none"
        use:draggable={tailOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(A.x)}
          cy={my(A.y)}
          r="7"
          fill="#fff"
          stroke={INDIGO}
          stroke-width="2"
        />
      </g>
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm B, điểm cuối của vectơ a: kéo để đổi vectơ a"
        style="cursor:grab; outline:none"
        use:draggable={headOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(B.x)}
          cy={my(B.y)}
          r="7"
          fill={INDIGO}
          fill-opacity="0.25"
          stroke={INDIGO}
          stroke-width="2"
        />
      </g>
    {:else}
      <polygon
        points={pointsAttr(tri.map(px))}
        fill="#4f46e5"
        fill-opacity="0.06"
        stroke="#334155"
        stroke-width="1.5"
      />
      {#each tri as P, i (i)}
        <VectorArrow from={px(M)} to={px(P)} color="#94a3b8" width={1.5} />
      {/each}
      {#each [0, 1, 2] as i (i)}
        <VectorArrow
          from={px(chain.chain[i])}
          to={px(chain.chain[i + 1])}
          color={[INDIGO, ROSE, AMBER][i]}
          dashed={i > 0}
        />
      {/each}
      <VectorArrow from={px(M)} to={px(chain.triple)} color={GREEN} width={6} opacity={0.4} />
      <VectorArrow from={px(M)} to={px(chain.G)} color={GREEN} width={3} name="MG" side={-1} />
      <circle cx={mx(chain.G.x)} cy={my(chain.G.y)} r="4" fill={GREEN} />
      {#each [tag(chain.G, 'G', 0, -10), tag(M, 'M', 12, -10), ...tri.map( (P, i) => tag(P, NAMES[i]) )] as t (t.name)}
        <text
          x={t.x}
          y={t.y}
          font-size="13"
          font-weight="700"
          text-anchor="middle"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="3"
          paint-order="stroke"
          style="pointer-events:none">{t.name}</text
        >
      {/each}
      {#each tri as P, i (i)}
        <g
          class="drag-handle"
          role="button"
          tabindex="0"
          aria-label="Đỉnh {NAMES[i]}: kéo hoặc dùng phím mũi tên để di chuyển"
          style="cursor:grab; outline:none"
          use:draggable={vertexOpts(i)}
        >
          <circle
            class="drag-knob"
            cx={mx(P.x)}
            cy={my(P.y)}
            r="7"
            fill="#fff"
            stroke="#334155"
            stroke-width="2"
          />
        </g>
      {/each}
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm M: kéo hoặc dùng phím mũi tên để di chuyển"
        style="cursor:grab; outline:none"
        use:draggable={mOpts}
      >
        <circle
          class="drag-knob"
          cx={mx(M.x)}
          cy={my(M.y)}
          r="7"
          fill={GREEN}
          fill-opacity="0.25"
          stroke={GREEN}
          stroke-width="2"
        />
      </g>
    {/if}
  </GeometryBoard>

  {#if mode === 'k'}
    <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-center">
      <Tex math={`\\overrightarrow{AC} = ${kTex(k)}\\vec a,\\quad ${lengthLine(a, k)}`} />
    </div>
    <FeedbackNote tone="info" text={scaleNote(a, k)} />
  {:else}
    <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-center">
      <Tex
        math={'\\overrightarrow{MA} + \\overrightarrow{MB} + \\overrightarrow{MC} = 3\\overrightarrow{MG}'}
      />
    </div>
    <FeedbackNote tone="ok" text={CHAIN_NOTE} />
  {/if}
  <button type="button" class={button.quiet} onclick={reset}>Vị trí ban đầu</button>
</div>
