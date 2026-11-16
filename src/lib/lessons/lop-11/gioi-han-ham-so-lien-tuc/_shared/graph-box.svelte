<script>
  import { frameOf, graphPath, tickText, ticksIn } from './plot.js';

  /**
   * A graph in a window of the plane, x and y scaled separately so the
   * window can zoom in around a point: light grid with round ticks, the
   * axes when 0 is in range, curves that break at jumps, holes and
   * asymptotes, points (filled, or hollow for a value the function does not
   * take), horizontal bands and dashed vertical marks.
   *
   * - `win`: the window { xMin, xMax, yMin, yMax }.
   * - `label`: accessible name of the drawing; say what it shows.
   * - `curves`: { f, color, breaks?, from?, to?, width?, dashed? }.
   * - `points`: { x, y, color, hollow?, r? }.
   * - `bands`: { lo, hi, color } horizontal strips (an ε band).
   * - `marks`: x values with a dashed vertical line (x₀, an asymptote).
   * - `children`: extra SVG, given the frame (`sx`, `sy`, box edges).
   * @type {{
   *   win: import('./plot.js').Window;
   *   label: string;
   *   curves?: Array<{ f: (x: number) => number, color: string, breaks?: number[], from?: number, to?: number, width?: number, dashed?: boolean }>;
   *   points?: Array<{ x: number, y: number, color: string, hollow?: boolean, r?: number }>;
   *   bands?: Array<{ lo: number, hi: number, color: string }>;
   *   marks?: number[];
   *   height?: number;
   *   children?: import('svelte').Snippet<[import('./plot.js').Frame]>;
   * }}
   */
  let {
    win,
    label,
    curves = [],
    points = [],
    bands = [],
    marks = [],
    height = 280,
    children,
  } = $props();

  const uid = $props.id();
  const clipId = `graph-box-${uid}`;
  const frame = $derived(frameOf(win, { height }));
  const xt = $derived(ticksIn(win.xMin, win.xMax, 5));
  const yt = $derived(ticksIn(win.yMin, win.yMax, 5));
  const paths = $derived(
    curves.map((c) => graphPath(c.f, win, frame, { breaks: c.breaks, from: c.from, to: c.to })),
  );
  /** @param {number} v @param {number} lo @param {number} hi */
  const inside = (v, lo, hi) => v >= lo && v <= hi;
  /** @param {number} y */
  const clampY = (y) => Math.min(frame.bottom, Math.max(frame.top, frame.sy(y)));
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
  {#each bands as b, i (i)}
    <rect
      x={frame.left}
      y={clampY(b.hi)}
      width={frame.right - frame.left}
      height={Math.max(0, clampY(b.lo) - clampY(b.hi))}
      fill={b.color}
      opacity="0.18"
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
  {#each marks as m (m)}
    {#if inside(m, win.xMin, win.xMax)}
      <line
        x1={frame.sx(m)}
        y1={frame.top}
        x2={frame.sx(m)}
        y2={frame.bottom}
        stroke="#94a3b8"
        stroke-dasharray="5 4"
      />
    {/if}
  {/each}
  <g clip-path="url(#{clipId})">
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
    {@render children?.(frame)}
  </g>
</svg>
