<script>
  /**
   * A horizontal box plot drawn inside a parent SVG: the box from $Q_1$ to
   * $Q_3$ with the median line, whiskers out to the smallest and largest
   * values that are not outliers, and each outlier as a red dot.
   *
   * - `summary`: the sample's numbers from `summarize`.
   * - `x`: value to SVG x.
   * - `y`: the plot's centre line; `h`: the box height.
   * - `color`: the box's stroke colour; `fill`: its fill.
   * - `mean`: also mark the mean with a small diamond.
   * @type {{
   *   summary: import('./sample.js').Summary;
   *   x: (v: number) => number;
   *   y: number;
   *   h?: number;
   *   color?: string;
   *   fill?: string;
   *   mean?: boolean;
   * }}
   */
  let { summary, x, y, h = 28, color = '#4f46e5', fill = '#e0e7ff', mean = false } = $props();

  const inside = $derived(summary.sorted.filter((v) => !summary.outliers.includes(v)));
  const lo = $derived(inside[0] ?? summary.min);
  const hi = $derived(inside[inside.length - 1] ?? summary.max);
</script>

<g aria-hidden="true">
  <line x1={x(lo)} y1={y} x2={x(summary.q1)} y2={y} stroke={color} stroke-width="2" />
  <line x1={x(summary.q3)} y1={y} x2={x(hi)} y2={y} stroke={color} stroke-width="2" />
  <line x1={x(lo)} y1={y - h / 3} x2={x(lo)} y2={y + h / 3} stroke={color} stroke-width="2" />
  <line x1={x(hi)} y1={y - h / 3} x2={x(hi)} y2={y + h / 3} stroke={color} stroke-width="2" />
  <rect
    x={x(summary.q1)}
    y={y - h / 2}
    width={Math.max(1, x(summary.q3) - x(summary.q1))}
    height={h}
    {fill}
    stroke={color}
    stroke-width="2"
  />
  <line
    x1={x(summary.median)}
    y1={y - h / 2}
    x2={x(summary.median)}
    y2={y + h / 2}
    stroke="#0f172a"
    stroke-width="3"
  />
  {#if mean}
    {@const mx = x(summary.mean)}
    <polygon
      points="{mx},{y - 6} {mx + 6},{y} {mx},{y + 6} {mx - 6},{y}"
      fill="#d97706"
      stroke="#fff"
      stroke-width="1"
    />
  {/if}
  {#each summary.outliers as v, i (i)}
    <circle cx={x(v)} cy={y} r="5" fill="#e11d48" stroke="#fff" stroke-width="1.5" />
  {/each}
</g>
