<svelte:options namespace="svg" />

<script>
  /**
   * A polygon (or a segment, or a path when `closed` is false) drawn on a
   * coordinate plane from points in math coordinates, with the vertex names
   * written just outside it. Use it inside `coordinate-plane` for a figure
   * and its image: the image usually gets `dashed` and primed names.
   *
   * - `points`: the vertices in math coordinates.
   * - `names`: one name per vertex ('A', "A'"); empty draws none.
   * - `closed`: join the last vertex back to the first (true).
   * - `dots`: draw a small dot at each vertex (true).
   *
   * @type {{
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale;
   *   points: Array<{ x: number, y: number }>;
   *   names?: string[];
   *   color?: string;
   *   fill?: number;
   *   dashed?: boolean;
   *   closed?: boolean;
   *   dots?: boolean;
   * }}
   */
  let {
    plane,
    points,
    names = [],
    color = '#4f46e5',
    fill = 0.15,
    dashed = false,
    closed = true,
    dots = true,
  } = $props();

  const px = $derived(points.map((p) => ({ x: plane.mx(p.x), y: plane.my(p.y) })));
  const attr = $derived(px.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '));
  const centre = $derived({
    x: px.reduce((s, p) => s + p.x, 0) / Math.max(1, px.length),
    y: px.reduce((s, p) => s + p.y, 0) / Math.max(1, px.length),
  });

  /** A name pushed 14 px away from the centre of the figure (up and right for a lone point). @param {{ x: number, y: number }} p */
  function nameAt(p) {
    const dx = p.x - centre.x;
    const dy = p.y - centre.y;
    const len = Math.hypot(dx, dy);
    if (len < 1) return { x: p.x + 12, y: p.y - 9 };
    return { x: p.x + (dx / len) * 14, y: p.y + (dy / len) * 14 + 4 };
  }
</script>

<g style="pointer-events:none">
  {#if closed && px.length > 2}
    <polygon
      points={attr}
      fill={color}
      fill-opacity={fill}
      stroke={color}
      stroke-width="2"
      stroke-linejoin="round"
      stroke-dasharray={dashed ? '6 4' : null}
    />
  {:else if px.length > 1}
    <polyline
      points={attr}
      fill="none"
      stroke={color}
      stroke-width="2.5"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-dasharray={dashed ? '6 4' : null}
    />
  {/if}
  {#if dots}
    {#each px as p, i (i)}
      <circle cx={p.x} cy={p.y} r="3.5" fill={color} />
    {/each}
  {/if}
  {#each px as p, i (i)}
    {#if names[i]}
      {@const at = nameAt(p)}
      <text
        x={at.x}
        y={at.y}
        font-size="13"
        font-weight="700"
        text-anchor="middle"
        fill={color}
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke">{names[i]}</text
      >
    {/if}
  {/each}
</g>
