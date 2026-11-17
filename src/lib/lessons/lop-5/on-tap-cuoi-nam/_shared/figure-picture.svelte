<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { colorAt, polar, sectorPath } from '#lib/core/visuals/svg-math.js';
  import { MEASURED, SHAPE_POINTS, SOLIDS, solidFaces } from './figures.js';

  /**
   * The picture of a review question (`Visual` in `visual.js`): a plane
   * shape to name, a shape with its given lengths, a box or cube with its
   * given edges, a pie chart with its percentages, or a table of data. It shows only the givens, so it never gives the answer away;
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
  const labels = $derived(
    visual.type === 'measured' || visual.type === 'solid' ? visual.labels : [],
  );
  const spots = $derived(measured?.labelAt ?? solid?.labelAt ?? []);

  // The pie chart: sectors clockwise from the top, each with its percentage
  // written halfway along it, and a legend of names on the right.
  const PIE = { cx: 85, cy: 85, r: 75 };
  const sectors = $derived.by(() => {
    if (visual.type !== 'pie') return [];
    let start = 0;
    return visual.parts.map((part, i) => {
      const end = start + (part.percent * 360) / 100;
      const mid = polar(PIE.cx, PIE.cy, PIE.r * 0.62, (start + end) / 2);
      const d = sectorPath(PIE.cx, PIE.cy, PIE.r, start, end);
      start = end;
      return { d, mid, color: colorAt(i), text: part.hidden ? '?' : `${part.percent}%` };
    });
  });
</script>

{#if visual.type === 'table'}
  <div class="rounded-2xl bg-sky-50 px-4 py-3">
    <table class="mx-auto border-collapse text-lg">
      <caption class="sr-only">{visual.alt}</caption>
      <thead>
        <tr>
          {#each visual.head as cell (cell)}
            <th class="border-2 border-indigo-300 bg-indigo-100 px-3 py-1">{cell}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each visual.rows as row, i (i)}
          <tr>
            {#each row as cell, j (j)}
              <td class="border-2 border-indigo-300 bg-white px-3 py-1 text-center">{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else if visual.type === 'pie'}
  <div class="rounded-2xl bg-sky-50 px-4 py-3">
    <svg
      viewBox="0 0 300 170"
      class="mx-auto block w-full max-w-sm"
      role="img"
      aria-label={visual.alt}
    >
      {#each sectors as s, i (i)}
        <path d={s.d} fill={s.color} stroke="white" stroke-width="2" />
        <text
          x={s.mid.x}
          y={s.mid.y}
          text-anchor="middle"
          dominant-baseline="middle"
          fill="white"
          stroke="#1E293B"
          stroke-width="3"
          paint-order="stroke"
          style={text}>{s.text}</text
        >
      {/each}
      {#each visual.parts as part, i (i)}
        <rect x="178" y={22 + i * 34} width="16" height="16" rx="3" fill={colorAt(i)} />
        <text x="200" y={31 + i * 34} dominant-baseline="middle" fill="#1E293B" style={text}
          >{part.label}</text
        >
      {/each}
    </svg>
  </div>
{:else}
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
{/if}
