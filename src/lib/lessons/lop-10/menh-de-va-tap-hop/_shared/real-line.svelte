<script module>
  /** The viewBox of every line, for drag handles laid over it. */
  export const LINE_VIEW = { w: 400, h: 66 };
</script>

<script>
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { setText } from './intervals.js';

  /**
   * One subset of ℝ drawn on a number line: the part in the set is a thick
   * coloured stroke, a closed end a square bracket, an open end a round one,
   * a single point a dot, and an infinite end runs off with an arrow.
   *
   * - `set`: the subset (see `intervals.js`).
   * - `name`: the set's name written at the left (`A`, `A ∩ B`).
   * - `min`, `max`: the integer ticks shown.
   * - `color`: stroke colour.
   * - `svgEl` (bindable) and `children` (gets the x scale and the line's y)
   *   let a widget lay drag handles over the line.
   * @type {{
   *   set: import('./intervals.js').RealSet;
   *   name: string;
   *   min?: number;
   *   max?: number;
   *   color?: string;
   *   svgEl?: SVGSVGElement;
   *   children?: import('svelte').Snippet<[{ map: (v: number) => number, invert: (px: number) => number }, number]>;
   * }}
   */
  let { set, name, min = -6, max = 6, color = '#4f46e5', svgEl = $bindable(), children } = $props();

  const W = LINE_VIEW.w;
  const H = LINE_VIEW.h;
  const Y = 24;
  const LEFT = 56;
  const x = $derived(linear(min - 0.6, max + 0.6, LEFT, W - 14));
  const ticks = $derived(Array.from({ length: max - min + 1 }, (_, i) => min + i));
  /** The drawn ends: an infinite end stops just inside the arrow. */
  const clip = $derived((/** @type {number} */ v) => Math.min(max + 0.5, Math.max(min - 0.5, v)));

  /**
   * A bracket at an end; `d` is +1 for a left end (the set lies to the right).
   * @param {number} px @param {number} d @param {boolean} closed
   */
  function bracket(px, d, closed) {
    return closed
      ? `M ${px + 7 * d} ${Y - 11} H ${px} V ${Y + 11} H ${px + 7 * d}`
      : `M ${px + 7 * d} ${Y - 12} Q ${px - 4 * d} ${Y} ${px + 7 * d} ${Y + 12}`;
  }
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {W} {H}"
  class="block w-full select-none"
  style:aspect-ratio="{W} / {H}"
  role="img"
  aria-label="Tập {name} = {setText(set)} trên trục số"
>
  <text x="6" y={Y + 6} font-size="17" font-weight="700" fill={color}>{name}</text>
  <line x1={LEFT - 4} y1={Y} x2={W - 8} y2={Y} stroke="#94a3b8" stroke-width="1.5" />
  <path d="M {W - 4} {Y} l -9 -5 v 10 z" fill="#94a3b8" />
  {#each ticks as t (t)}
    <line x1={x.map(t)} y1={Y - 5} x2={x.map(t)} y2={Y + 5} stroke="#94a3b8" stroke-width="1" />
    <text x={x.map(t)} y={Y + 30} text-anchor="middle" font-size="16" fill="#475569"
      >{t < 0 ? `−${-t}` : t}</text
    >
  {/each}
  {#each set as I, i (i)}
    {#if I.lo === I.hi}
      <circle cx={x.map(I.lo)} cy={Y} r="6" fill={color} />
    {:else}
      {@const x0 = x.map(clip(I.lo))}
      {@const x1 = x.map(clip(I.hi))}
      <line x1={x0} y1={Y} x2={x1} y2={Y} stroke={color} stroke-width="7" stroke-opacity="0.75" />
      {#if Number.isFinite(I.lo)}
        <path d={bracket(x0, 1, I.loIn)} fill="none" stroke={color} stroke-width="3" />
      {:else}
        <path d="M {x0 - 4} {Y} l 10 -7 v 14 z" fill={color} />
      {/if}
      {#if Number.isFinite(I.hi)}
        <path d={bracket(x1, -1, I.hiIn)} fill="none" stroke={color} stroke-width="3" />
      {:else}
        <path d="M {x1 + 4} {Y} l -10 -7 v 14 z" fill={color} />
      {/if}
    {/if}
  {/each}
  {@render children?.(x, Y)}
</svg>
