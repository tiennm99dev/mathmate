<script>
  import { edgeShapes, badgeSpot } from './layout.js';

  /**
   * A graph drawn as an SVG: vertices as named circles, edges as lines, with
   * parallel edges bent apart so a multigraph stays readable. Optional edge
   * weights, a badge next to each vertex (a degree or a label) and per-vertex
   * and per-edge colours. When `onvertex` is set, each vertex is a focusable
   * button (pointer, Enter or Space).
   *
   * @type {{
   *   pos: Array<{ x: number, y: number }>;
   *   names: readonly string[];
   *   edges: Array<{ a: number, b: number, w?: number }>;
   *   label: string;
   *   width?: number;
   *   height?: number;
   *   weights?: boolean;
   *   edgeColor?: (i: number) => string | null;
   *   edgeBold?: (i: number) => boolean;
   *   vertexFill?: (v: number) => string;
   *   vertexRing?: (v: number) => string | null;
   *   badge?: (v: number) => string | null;
   *   badgeTone?: (v: number) => string;
   *   onvertex?: (v: number) => void;
   *   vertexLabel?: (v: number) => string;
   * }}
   */
  let {
    pos,
    names,
    edges,
    label,
    width = 360,
    height = 270,
    weights = false,
    edgeColor = () => null,
    edgeBold = () => false,
    vertexFill = () => '#ffffff',
    vertexRing = () => null,
    badge = () => null,
    badgeTone = () => '#475569',
    onvertex,
    vertexLabel = (v) => `Đỉnh ${names[v]}`,
  } = $props();

  const shapes = $derived(edgeShapes(pos, edges));
  const R = 15;

  /** @param {KeyboardEvent} e @param {number} v */
  function key(e, v) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onvertex?.(v);
    }
  }
</script>

<svg
  viewBox="0 0 {width} {height}"
  class="block h-auto w-full touch-manipulation rounded-xl border border-slate-200 bg-white select-none"
  role={onvertex ? 'group' : 'img'}
  aria-label={label}
>
  {#each shapes as s, i (i)}
    <path
      d={s.d}
      fill="none"
      stroke={edgeColor(i) ?? '#64748b'}
      stroke-width={edgeBold(i) ? 5 : 2.5}
      stroke-linecap="round"
    />
    {#if weights && edges[i].w !== undefined}
      <g aria-hidden="true">
        <circle cx={s.mid.x} cy={s.mid.y} r="10" fill="#fff" stroke="#cbd5e1" />
        <text
          x={s.mid.x}
          y={s.mid.y + 4.5}
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="#0f172a">{edges[i].w}</text
        >
      </g>
    {/if}
  {/each}

  {#each pos as p, v (v)}
    {@const ring = vertexRing(v)}
    {@const b = badge(v)}
    {@const spot = badgeSpot(pos, v, width, height)}
    {#if onvertex}
      <g
        role="button"
        tabindex="0"
        aria-label={vertexLabel(v)}
        class="drag-handle cursor-pointer outline-none"
        onclick={() => onvertex?.(v)}
        onkeydown={(e) => key(e, v)}
      >
        <circle cx={p.x} cy={p.y} r={R + 8} fill="transparent" />
        {#if ring}<circle
            cx={p.x}
            cy={p.y}
            r={R + 5}
            fill="none"
            stroke={ring}
            stroke-width="3"
          />{/if}
        <circle
          class="drag-knob"
          cx={p.x}
          cy={p.y}
          r={R}
          fill={vertexFill(v)}
          stroke="#1e293b"
          stroke-width="2"
        />
        <text
          x={p.x}
          y={p.y + 5}
          text-anchor="middle"
          font-size="15"
          font-weight="700"
          fill="#0f172a">{names[v]}</text
        >
      </g>
    {:else}
      <g aria-hidden="true">
        {#if ring}<circle
            cx={p.x}
            cy={p.y}
            r={R + 5}
            fill="none"
            stroke={ring}
            stroke-width="3"
          />{/if}
        <circle cx={p.x} cy={p.y} r={R} fill={vertexFill(v)} stroke="#1e293b" stroke-width="2" />
        <text
          x={p.x}
          y={p.y + 5}
          text-anchor="middle"
          font-size="15"
          font-weight="700"
          fill="#0f172a">{names[v]}</text
        >
      </g>
    {/if}
    {#if b}
      <text
        x={spot.x}
        y={spot.y + 4}
        text-anchor="middle"
        font-size="12.5"
        font-weight="700"
        fill={badgeTone(v)}
        stroke="#ffffff"
        stroke-width="3"
        paint-order="stroke"
        aria-hidden="true">{b}</text
      >
    {/if}
  {/each}
</svg>
