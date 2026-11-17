<script>
  import { fmt } from '#lib/core/number-format.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { EDGES, boxLayout, labelSpot, rulerOn, tickStep } from './box-view.js';

  /**
   * A box of length a, width b and height c drawn to scale, as the book draws
   * a box. `labels` writes a measure beside each edge (length, width,
   * height; null leaves an edge bare). `rulers` lays a ruler of that many
   * units along each edge (null for none), read up to `rulerMax`; `fits`
   * marks the rulers that reach exactly to the end of their edge.
   * `label` is the picture's screen-reader name.
   * @type {{
   *   a: number;
   *   b: number;
   *   c: number;
   *   label: string;
   *   labels?: (string | null)[];
   *   rulers?: (number | null)[];
   *   rulerMax?: number;
   *   fits?: boolean[];
   *   tone?: 'amber' | 'sky';
   * }}
   */
  let {
    a,
    b,
    c,
    label,
    labels = [],
    rulers = [],
    rulerMax = 0,
    fits = [],
    tone = 'amber',
  } = $props();

  const view = $derived(boxLayout(a, b, c));
  const step = $derived(tickStep(rulerMax || Math.max(a, b, c)));

  const FILLS = {
    amber: { front: '#fde68a', top: '#fef3c7', right: '#fbbf24', line: '#92400e' },
    sky: { front: '#bae6fd', top: '#e0f2fe', right: '#7dd3fc', line: '#075985' },
  };
  const fill = $derived(FILLS[tone]);

  const ANCHOR = /** @type {const} */ ({ length: 'middle', width: 'start', height: 'end' });

  const marks = $derived(
    EDGES.map((edge, i) => {
      const m = rulers[i];
      return m == null ? null : { edge, m, fit: !!fits[i], ...rulerOn(view.edges[edge], m, step) };
    }),
  );
</script>

<svg
  viewBox="0 0 {view.width} {view.height}"
  class="mx-auto block h-auto w-full max-w-md"
  role="img"
  aria-label={label}
>
  {#each view.faces as f (f.kind)}
    <polygon
      points={pointsAttr(f.pts)}
      fill={fill[f.kind]}
      stroke={fill.line}
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  {/each}
  {#each EDGES as edge, i (edge)}
    {#if labels[i]}
      {@const spot = labelSpot(view.edges[edge])}
      <text
        x={spot.x}
        y={spot.y}
        text-anchor={ANCHOR[edge]}
        dominant-baseline="middle"
        class="fill-slate-900 text-[15px] font-bold">{labels[i]}</text
      >
    {/if}
  {/each}
  {#each marks as mark, i (i)}
    {#if mark}
      {@const color = mark.fit ? '#059669' : '#4f46e5'}
      <line
        x1={mark.start.x}
        y1={mark.start.y}
        x2={mark.end.x}
        y2={mark.end.y}
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
      />
      {#each mark.ticks as t, j (j)}
        <line x1={t.p.x} y1={t.p.y} x2={t.q.x} y2={t.q.y} stroke={color} stroke-width="1.5" />
      {/each}
      <line
        x1={mark.ends.p.x}
        y1={mark.ends.p.y}
        x2={mark.ends.q.x}
        y2={mark.ends.q.y}
        stroke={color}
        stroke-width="2.5"
      />
      {#if mark.m > 0}
        <text
          x={mark.label.x}
          y={mark.label.y}
          text-anchor={ANCHOR[mark.edge]}
          dominant-baseline="middle"
          fill={color}
          class="text-[14px] font-bold">{fmt(mark.m)}</text
        >
      {/if}
    {/if}
  {/each}
</svg>
