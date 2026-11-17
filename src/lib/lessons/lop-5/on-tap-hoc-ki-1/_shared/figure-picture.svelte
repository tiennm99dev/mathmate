<script>
  import { labelSpot } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { SHAPE_POINTS, HEIGHT_POINTS, MEASURED } from './figures.js';

  /**
   * The picture of a review question (`Visual` in `visual.js`): a plane
   * shape with its vertex names, a triangle with a height, or a shape with
   * its given lengths. It shows only the givens, so it never gives the answer
   * away; its spoken name is the visual's `alt`.
   * @type {{ visual: import('./visual.js').Visual }}
   */
  let { visual } = $props();

  const W = 240;
  const H = 170;
  const fill = '#C7D2FE';
  const line = '#4338CA';
  const mark = '#DC2626';
  const text = 'font-size:15px;font-weight:700';

  /** @param {{ x: number, y: number }[]} pts */
  const centre = (pts) => ({
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  });

  const shape = $derived(visual.type === 'figure' ? SHAPE_POINTS[visual.shape] : null);
  const tri = $derived(visual.type === 'height' ? HEIGHT_POINTS[visual.variant] : null);
  const measured = $derived(visual.type === 'measured' ? MEASURED[visual.shape] : null);
</script>

<div class="rounded-2xl bg-sky-50 px-4 py-3">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xs"
    role="img"
    aria-label={visual.alt}
  >
    {#if visual.type === 'figure' && shape}
      {#if shape.circle}
        <circle
          cx={shape.circle.x}
          cy={shape.circle.y}
          r={shape.circle.r}
          {fill}
          stroke={line}
          stroke-width="3"
        />
        <circle cx={shape.circle.x} cy={shape.circle.y} r="3.5" fill={line} />
      {:else}
        <polygon
          points={pointsAttr(shape.pts)}
          {fill}
          stroke={line}
          stroke-width="3"
          stroke-linejoin="round"
        />
      {/if}
      {#each shape.marks as d (d)}
        <path {d} fill="none" stroke={mark} stroke-width="2" />
      {/each}
      {#each visual.names as name, i (i)}
        {@const pts = shape.circle ? [shape.circle] : shape.pts}
        {@const p = shape.circle
          ? { x: shape.circle.x + 12, y: shape.circle.y - 10 }
          : labelSpot(pts[i], centre(pts), 14, W, H)}
        <text
          x={p.x}
          y={p.y}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#1E293B"
          style={text}>{name}</text
        >
      {/each}
    {:else if visual.type === 'height' && tri}
      <polygon
        points={pointsAttr(tri.pts)}
        {fill}
        stroke={line}
        stroke-width="3"
        stroke-linejoin="round"
      />
      {#if tri.foot}
        <line
          x1={tri.pts[0].x}
          y1={tri.pts[0].y}
          x2={tri.foot.x}
          y2={tri.foot.y}
          stroke={mark}
          stroke-width="2.5"
          stroke-dasharray="6 4"
        />
      {/if}
      <path d={tri.mark} fill="none" stroke={mark} stroke-width="2" />
      {#each tri.labelAt as p, i (i)}
        <text
          x={p.x}
          y={p.y}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#1E293B"
          style={text}>{visual.names[i]}</text
        >
      {/each}
    {:else if visual.type === 'measured' && measured}
      {#if measured.circle}
        {@const c = measured.circle}
        {#if measured.half}
          <path
            d="M {c.x - c.r} {c.y} A {c.r} {c.r} 0 0 1 {c.x + c.r} {c.y} Z"
            {fill}
            stroke={line}
            stroke-width="3"
          />
        {:else}
          <circle cx={c.x} cy={c.y} r={c.r} {fill} stroke={line} stroke-width="3" />
        {/if}
        <circle cx={c.x} cy={c.y} r="3.5" fill={line} />
        <text
          x={c.x - 8}
          y={c.y + 14}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#1E293B"
          style={text}>O</text
        >
      {:else}
        <polygon
          points={pointsAttr(measured.pts)}
          {fill}
          stroke={line}
          stroke-width="3"
          stroke-linejoin="round"
        />
      {/if}
      {#each measured.lines as l, i (i)}
        <line
          x1={l.from.x}
          y1={l.from.y}
          x2={l.to.x}
          y2={l.to.y}
          stroke={mark}
          stroke-width="2.5"
          stroke-dasharray={l.dashed ? '6 4' : undefined}
        />
      {/each}
      {#each measured.marks as d (d)}
        <path {d} fill="none" stroke={mark} stroke-width="2" />
      {/each}
      {#each visual.labels as label, i (i)}
        {@const at = measured.labelAt[i]}
        {#if at}
          <text
            x={at.x}
            y={at.y}
            text-anchor={at.anchor}
            dominant-baseline="middle"
            fill="#047857"
            style={text}>{label}</text
          >
        {/if}
      {/each}
    {/if}
  </svg>
</div>
