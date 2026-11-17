<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { MEASURED, SHAPE_POINTS, SOLIDS, solidFaces } from './figures.js';

  /**
   * The picture of a review question (`Visual` in `visual.js`): a plane
   * shape to name, a shape with its given lengths, or a box or cube with its
   * given edges. It shows only the givens, so it never gives the answer away;
   * its spoken name is the visual's `alt`.
   * @type {{ visual: import('./visual.js').Visual }}
   */
  let { visual } = $props();

  const W = 240;
  const H = 170;
  const fill = '#C7D2FE';
  const shades = ['#C7D2FE', '#E0E7FF', '#A5B4FC'];
  const line = '#4338CA';
  const mark = '#DC2626';
  const text = 'font-size:15px;font-weight:700';

  const shape = $derived(visual.type === 'figure' ? SHAPE_POINTS[visual.shape] : null);
  const measured = $derived(visual.type === 'measured' ? MEASURED[visual.shape] : null);
  const solid = $derived(visual.type === 'solid' ? SOLIDS[visual.shape] : null);
  const faces = $derived(visual.type === 'solid' ? solidFaces(visual.shape) : []);
  const labels = $derived(visual.type === 'figure' ? [] : visual.labels);
  const spots = $derived(measured?.labelAt ?? solid?.labelAt ?? []);
</script>

<div class="rounded-2xl bg-sky-50 px-4 py-3">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xs"
    role="img"
    aria-label={visual.alt}
  >
    {#if shape}
      <polygon
        points={pointsAttr(shape.pts)}
        {fill}
        stroke={line}
        stroke-width="3"
        stroke-linejoin="round"
      />
      {#each shape.marks as d (d)}
        <path {d} fill="none" stroke={mark} stroke-width="2" />
      {/each}
    {:else if measured}
      {#if measured.circle}
        {@const c = measured.circle}
        <circle cx={c.x} cy={c.y} r={c.r} {fill} stroke={line} stroke-width="3" />
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
    {:else if solid}
      {#each faces as face, i (i)}
        <polygon
          points={pointsAttr(face)}
          fill={shades[i]}
          stroke={line}
          stroke-width="2.5"
          stroke-linejoin="round"
        />
      {/each}
    {/if}
    {#each labels as label, i (i)}
      {@const at = spots[i]}
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
  </svg>
</div>
