<script>
  import { frameOf, graphPath, tickText, ticksIn } from './plot.js';

  /**
   * A graph in a window of the plane, x and y scaled separately: light grid
   * with round ticks, the axes when 0 is in range, curves that lift the pen
   * at asymptotes, dashed lines (asymptotes, guides), points (filled, or
   * hollow for a value the function does not take) and shaded x-ranges.
   *
   * - `win`: the window { xMin, xMax, yMin, yMax }.
   * - `label`: accessible name of the drawing; say what it shows.
   * - `curves`: { f, color, breaks?, from?, to?, width?, dashed? }.
   * - `lines`: straight lines y = a·x + b, or x = c when `vertical`, dashed.
   * - `points`: { x, y, color, hollow?, r? }.
   * - `spans`: { from, to, color } shaded vertical strips (an interval [a; b]).
   * - `svgEl`: bindable, the drawing's `<svg>`, for drag handles.
   * - `children`: extra SVG drawn above the curves without clipping (drag
   *   handles, labels), given the frame.
   * @type {{
   *   win: import('./plot.js').Window;
   *   label: string;
   *   curves?: Array<{ f: (x: number) => number, color: string, breaks?: number[], from?: number, to?: number, width?: number, dashed?: boolean }>;
   *   lines?: Array<{ a?: number, b?: number, c?: number, vertical?: boolean, color: string }>;
   *   points?: Array<{ x: number, y: number, color: string, hollow?: boolean, r?: number }>;
   *   spans?: Array<{ from: number, to: number, color: string }>;
   *   height?: number;
   *   interactive?: boolean;
   *   svgEl?: SVGSVGElement;
   *   children?: import('svelte').Snippet<[import('./plot.js').Frame]>;
   * }}
   */
  let {
    win,
    label,
    curves = [],
    lines = [],
    points = [],
    spans = [],
    height = 280,
    interactive = false,
    svgEl = $bindable(),
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
  bind:this={svgEl}
  viewBox="0 0 {frame.width} {frame.height}"
  class="mx-auto block w-full max-w-xl select-none rounded-lg border border-slate-200 bg-white {interactive
    ? 'touch-none'
    : ''}"
  role={interactive ? 'group' : 'img'}
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
  {#each spans as s, i (i)}
    <rect
      x={frame.sx(Math.max(win.xMin, s.from))}
      y={frame.top}
      width={Math.max(0, frame.sx(Math.min(win.xMax, s.to)) - frame.sx(Math.max(win.xMin, s.from)))}
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
  <g clip-path="url(#{clipId})">
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
  {@render children?.(frame)}
</svg>
