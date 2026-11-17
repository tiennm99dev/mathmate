<script>
  import { frameOf, graphPath, tickText, ticksIn } from './plot.js';

  /**
   * A graph in a window of the plane: light grid with round ticks, the axes,
   * curves that lift where the function is undefined, points (filled or
   * hollow), shaded vertical strips (a solution set on the x-axis) and
   * dashed guide segments.
   *
   * - `win`: the window { xMin, xMax, yMin, yMax }.
   * - `label`: accessible name of the drawing; say what it shows.
   * - `curves`: { f, color, from?, to?, width?, dashed? }.
   * - `points`: { x, y, color, hollow?, r? }.
   * - `strips`: { lo, hi, color } vertical strips from x = lo to x = hi,
   *   drawn as a band and a thick stroke on the x-axis.
   * - `guides`: dashed segments { x1, y1, x2, y2, color? } in math units.
   * - `height`: box height; `squareHeight` from plot.js gives equal scales.
   * @type {{
   *   win: import('./plot.js').Window;
   *   label: string;
   *   curves?: Array<{ f: (x: number) => number, color: string, from?: number, to?: number, width?: number, dashed?: boolean }>;
   *   points?: Array<{ x: number, y: number, color: string, hollow?: boolean, r?: number }>;
   *   strips?: Array<{ lo: number, hi: number, color: string }>;
   *   guides?: Array<{ x1: number, y1: number, x2: number, y2: number, color?: string }>;
   *   height?: number;
   * }}
   */
  let { win, label, curves = [], points = [], strips = [], guides = [], height = 280 } = $props();

  const uid = $props.id();
  const clipId = `exp-graph-${uid}`;
  const frame = $derived(frameOf(win, { height }));
  const xt = $derived(ticksIn(win.xMin, win.xMax, 6));
  const yt = $derived(ticksIn(win.yMin, win.yMax, 6));
  const paths = $derived(curves.map((c) => graphPath(c.f, win, frame, { from: c.from, to: c.to })));
  /** @param {number} v @param {number} lo @param {number} hi */
  const inside = (v, lo, hi) => v >= lo && v <= hi;
  /** @param {number} x */
  const clampX = (x) => Math.min(frame.right, Math.max(frame.left, frame.sx(x)));
  const axisY = $derived(inside(0, win.yMin, win.yMax) ? frame.sy(0) : frame.bottom);
</script>

<svg
  viewBox="0 0 {frame.width} {frame.height}"
  class="block w-full select-none rounded-lg border border-slate-200 bg-white"
  role="img"
  aria-label={label}
>
  <defs>
    <clipPath id={clipId}>
      <rect
        x={frame.left}
        y={frame.top}
        width={frame.right - frame.left}
        height={frame.bottom - frame.top}
      />
    </clipPath>
  </defs>
  {#each strips as s, i (i)}
    <rect
      x={clampX(s.lo)}
      y={frame.top}
      width={Math.max(0, clampX(s.hi) - clampX(s.lo))}
      height={frame.bottom - frame.top}
      fill={s.color}
      opacity="0.14"
    />
  {/each}
  {#each xt as t (t)}
    <line
      x1={frame.sx(t)}
      y1={frame.top}
      x2={frame.sx(t)}
      y2={frame.bottom}
      stroke={t === 0 ? '#64748b' : '#e2e8f0'}
      stroke-width={t === 0 ? 1.5 : 1}
    />
    <text x={frame.sx(t)} y={frame.height - 8} font-size="12" text-anchor="middle" fill="#475569"
      >{tickText(t)}</text
    >
  {/each}
  {#each yt as t (t)}
    <line
      x1={frame.left}
      y1={frame.sy(t)}
      x2={frame.right}
      y2={frame.sy(t)}
      stroke={t === 0 ? '#64748b' : '#e2e8f0'}
      stroke-width={t === 0 ? 1.5 : 1}
    />
    <text x={frame.left - 5} y={frame.sy(t) + 4} font-size="12" text-anchor="end" fill="#475569"
      >{tickText(t)}</text
    >
  {/each}
  {#each strips as s, i (i)}
    <line
      x1={clampX(s.lo)}
      y1={axisY}
      x2={clampX(s.hi)}
      y2={axisY}
      stroke={s.color}
      stroke-width="6"
      stroke-linecap="round"
    />
  {/each}
  <g clip-path="url(#{clipId})">
    {#each guides as g, i (i)}
      <line
        x1={frame.sx(g.x1)}
        y1={frame.sy(g.y1)}
        x2={frame.sx(g.x2)}
        y2={frame.sy(g.y2)}
        stroke={g.color ?? '#94a3b8'}
        stroke-width="1.5"
        stroke-dasharray="5 4"
      />
    {/each}
    {#each curves as c, i (i)}
      <path
        d={paths[i]}
        fill="none"
        stroke={c.color}
        stroke-width={c.width ?? 2.5}
        stroke-dasharray={c.dashed ? '6 4' : null}
        stroke-linejoin="round"
      />
    {/each}
    {#each points as p, i (i)}
      {#if inside(p.x, win.xMin, win.xMax) && inside(p.y, win.yMin, win.yMax)}
        <circle
          cx={frame.sx(p.x)}
          cy={frame.sy(p.y)}
          r={p.r ?? 5}
          fill={p.hollow ? 'white' : p.color}
          stroke={p.color}
          stroke-width="2"
        />
      {/if}
    {/each}
  </g>
</svg>
