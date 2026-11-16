<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import GridLines from '../_shared/grid-lines.svelte';
  import { gridHandle } from '../_shared/grid-handle.js';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import { BOX, COLOR, figure, fits, fourth } from './engine.js';

  const plane = planeScale({ ...BOX, width: 400, pad: 16 });
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });

  /** @type {Record<import('./engine.js').Mode, { x: number, y: number }[]>} */
  const START = {
    'ba-diem': [
      { x: 1, y: 1 },
      { x: 5, y: 5 },
      { x: 9, y: 2 },
    ],
    hbh: [
      { x: 1, y: 1 },
      { x: 6, y: 2 },
      { x: 3, y: 5 },
    ],
    hieu: [
      { x: 1, y: 2 },
      { x: 8, y: 5 },
      { x: 4, y: 6 },
    ],
    luc: [
      { x: 2, y: 2 },
      { x: 6, y: 2 },
      { x: 4, y: 5 },
    ],
  };

  let mode = $state(/** @type {import('./engine.js').Mode} */ ('ba-diem'));
  let pts = $state(START['ba-diem'].map((p) => ({ ...p })));
  const fig = $derived(figure(mode, pts));

  /** @param {string | number} next */
  function switchMode(next) {
    const m = /** @type {import('./engine.js').Mode} */ (next);
    if (!fits(m, pts)) pts = START[m].map((p) => ({ ...p }));
  }

  function restart() {
    pts = START[mode].map((p) => ({ ...p }));
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  /** @param {number} i */
  const opts = (i) =>
    gridHandle({
      at: pts[i],
      plane,
      svg: () => svgEl ?? null,
      onmove: (g) => {
        const next = pts.map((p, j) => (j === i ? g : p));
        if (fits(mode, next)) pts = next;
      },
    });

  const parallelogram = $derived(
    mode === 'hbh' || mode === 'luc'
      ? [pts[0], pts[1], fourth(pts[0], pts[1], pts[2]), pts[2]]
      : [],
  );
  const label = $derived(
    `Bảng vẽ vectơ. ${fig.points.map((p) => `Điểm ${p.name} ở ô (${p.at.x}; ${p.at.y})`).join(', ')}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Quy tắc"
    bind:value={mode}
    onchange={switchMode}
    options={[
      { value: 'ba-diem', label: 'Ba điểm' },
      { value: 'hbh', label: 'Hình bình hành' },
      { value: 'hieu', label: 'Hiệu' },
      { value: 'luc', label: 'Hợp lực' },
    ]}
  />

  <GeometryBoard
    bind:svgEl
    width={plane.width}
    height={plane.height}
    interactive
    maxWidth="max-w-xl"
    {label}
  >
    <GridLines {plane} />
    {#if parallelogram.length}
      <polygon points={pointsAttr(parallelogram.map(px))} fill="#059669" fill-opacity="0.06" />
    {/if}
    {#each fig.guides as [s, t], i (i)}
      <line
        x1={mx(s.x)}
        y1={my(s.y)}
        x2={mx(t.x)}
        y2={my(t.y)}
        stroke={COLOR.help}
        stroke-width="1.5"
        stroke-dasharray="5 4"
      />
    {/each}
    {#each fig.vectors as v, i (i)}
      <VectorArrow
        from={px(v.from)}
        to={px(v.to)}
        color={v.color}
        name={v.name}
        side={v.side ?? 1}
        dashed={v.dashed}
        width={v.bold ? 3.5 : 2.5}
      />
    {/each}
    {#each fig.points as p (p.name)}
      <text
        x={mx(p.at.x) - 10}
        y={my(p.at.y) + 18}
        font-size="13"
        font-weight="700"
        fill="#0f172a"
        text-anchor="middle"
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none">{p.name}</text
      >
    {/each}
    {#each pts as p, i (i)}
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm {fig.handles[i]}: kéo hoặc dùng phím mũi tên để di chuyển"
        style="cursor:grab; outline:none"
        use:draggable={opts(i)}
      >
        <circle
          class="drag-knob"
          cx={mx(p.x)}
          cy={my(p.y)}
          r="7"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="2"
        />
      </g>
    {/each}
  </GeometryBoard>

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-center">
    <Tex math={fig.tex} />
  </div>
  <FeedbackNote tone="info" text={fig.note} />
  <button type="button" class={button.quiet} onclick={restart}>Vị trí ban đầu</button>
</div>
