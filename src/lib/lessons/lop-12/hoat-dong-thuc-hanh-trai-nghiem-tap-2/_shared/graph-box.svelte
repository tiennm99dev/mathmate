<script>
  import { frameOf, graphPath, regionPath, tickText, ticksIn } from './plot.js';

  /**
   * A graph in a window of the plane, x and y scaled separately: light grid
   * with round ticks and the axes, shaded regions between two graphs (or a
   * graph and the x-axis), the trapezoids of the trapezoid rule (red below
   * the axis), curves, dashed straight lines and points.
   *
   * - `win`: the window { xMin, xMax, yMin, yMax }.
   * - `label`: accessible name of the drawing; say what it shows.
   * - `regions`: { f, g?, from, to, color } filled between f and g.
   * - `traps`: { x0, x1, y0, y1 } trapezoids with corners (x0; 0), (x1; 0),
   *   (x1; y1), (x0; y0): one piece of the trapezoid rule.
   * - `curves`: { f, color, from?, to?, width?, dashed? }.
   * - `lines`: y = a·x + b, or x = c when `vertical`, dashed.
   * - `points`: { x, y, color, r?, name? }.
   * - `children`: extra SVG drawn above everything, given the frame.
   * @type {{
   *   win: import('./plot.js').Window;
   *   label: string;
   *   regions?: Array<{ f: (x: number) => number, g?: (x: number) => number, from: number, to: number, color: string, opacity?: number }>;
   *   traps?: Array<{ x0: number, x1: number, y0: number, y1: number }>;
   *   curves?: Array<{ f: (x: number) => number, color: string, from?: number, to?: number, width?: number, dashed?: boolean }>;
   *   lines?: Array<{ a?: number, b?: number, c?: number, vertical?: boolean, color: string }>;
   *   points?: Array<{ x: number, y: number, color: string, r?: number, name?: string }>;
   *   height?: number;
   *   children?: import('svelte').Snippet<[import('./plot.js').Frame]>;
   * }}
   */
  let {
    win,
    label,
    regions = [],
    traps = [],
    curves = [],
    lines = [],
    points = [],
    height = 280,
    children,
  } = $props();

  const uid = $props.id();
  const clipId = `trapezoid-box-${uid}`;
  const frame = $derived(frameOf(win, { height }));
  const xt = $derived(ticksIn(win.xMin, win.xMax, 6));
  const yt = $derived(ticksIn(win.yMin, win.yMax, 5));
  const paths = $derived(curves.map((c) => graphPath(c.f, win, frame, { from: c.from, to: c.to })));
  const fills = $derived(regions.map((r) => regionPath(r.f, r.g, r.from, r.to, frame)));
  /** @param {{ a?: number, b?: number, c?: number, vertical?: boolean }} l */
  function ends(l) {
    if (l.vertical) {
      const x = frame.sx(l.c ?? 0);
      return { x1: x, y1: frame.top, x2: x, y2: frame.bottom };
    }
    const a = l.a ?? 0;
    const b = l.b ?? 0;
    return {
      x1: frame.sx(win.xMin),
      y1: frame.sy(a * win.xMin + b),
      x2: frame.sx(win.xMax),
      y2: frame.sy(a * win.xMax + b),
    };
  }
</script>

<svg
  viewBox="0 0 {frame.width} {frame.height}"
  class="mx-auto block w-full max-w-xl select-none rounded-lg border border-slate-200 bg-white"
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
  <g clip-path="url(#{clipId})">
    {#each regions as r, i (i)}
      <path d={fills[i]} fill={r.color} fill-opacity={r.opacity ?? 0.25} stroke="none" />
    {/each}
    {#each traps as t, i (i)}
      {@const below = t.y0 + t.y1 < 0}
      <polygon
        points="{frame.sx(t.x0)},{frame.sy(0)} {frame.sx(t.x1)},{frame.sy(0)} {frame.sx(
          t.x1,
        )},{frame.sy(t.y1)} {frame.sx(t.x0)},{frame.sy(t.y0)}"
        fill={below ? '#fb7185' : '#38bdf8'}
        fill-opacity="0.4"
        stroke={below ? '#be123c' : '#0369a1'}
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    {/each}
    {#each lines as l, i (i)}
      {@const e = ends(l)}
      <line {...e} stroke={l.color} stroke-width="1.5" stroke-dasharray="6 4" />
    {/each}
    {#each curves as c, i (i)}
      <path
        d={paths[i]}
        fill="none"
        stroke={c.color}
        stroke-width={c.width ?? 2.5}
        stroke-dasharray={c.dashed ? '6 4' : null}
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    {/each}
  </g>
  {#each points as p, i (i)}
    {#if p.x >= win.xMin && p.x <= win.xMax && p.y >= win.yMin && p.y <= win.yMax}
      <circle
        cx={frame.sx(p.x)}
        cy={frame.sy(p.y)}
        r={p.r ?? 5}
        fill={p.color}
        stroke="#fff"
        stroke-width="1.5"
      />
      {#if p.name}
        <text
          x={frame.sx(p.x) + 8}
          y={frame.sy(p.y) - 8}
          font-size="14"
          font-weight="700"
          fill="#0f172a"
          paint-order="stroke"
          stroke="#fff"
          stroke-width="3">{p.name}</text
        >
      {/if}
    {/if}
  {/each}
  {@render children?.(frame)}
</svg>
