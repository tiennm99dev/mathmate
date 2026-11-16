<script>
  import { labelSpot } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';

  /**
   * A still quadrilateral drawn from grid corners, with its vertex names
   * outside the corners when `names` is given. No right-angle marks or
   * equal-length ticks are drawn, so the picture never gives an answer away.
   *
   * - `corners`: the four corners in grid units, going round.
   * - `w`, `h`: the grid size in grid units.
   * - `names`: the vertex names, in the order of `corners`.
   * - `label`: what a screen reader hears; without it the picture is hidden.
   * - `size`: CSS max-width class of the picture.
   * @type {{
   *   corners: readonly import('./lines.js').Pt[];
   *   w: number;
   *   h: number;
   *   names?: readonly string[];
   *   label?: string;
   *   size?: string;
   * }}
   */
  let { corners, w, h, names, label, size = 'max-w-xs' } = $props();

  const U = 30;
  const pts = $derived(corners.map((p) => ({ x: p.x * U, y: p.y * U })));
  const centre = $derived({
    x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
    y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
  });
</script>

<svg
  viewBox="0 0 {w * U} {h * U}"
  class="mx-auto block w-full {size}"
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
>
  {#if names}
    {#each { length: w + 1 } as _, i (i)}
      <line x1={i * U} y1="0" x2={i * U} y2={h * U} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each { length: h + 1 } as _, i (i)}
      <line x1="0" y1={i * U} x2={w * U} y2={i * U} stroke="#E2E8F0" stroke-width="1" />
    {/each}
  {/if}
  <polygon
    points={pointsAttr(pts)}
    fill="#E0E7FF"
    stroke="#4338CA"
    stroke-width="4"
    stroke-linejoin="round"
  />
  {#if names}
    {#each pts as p, i (i)}
      {@const at = labelSpot(p, centre, 18, w * U, h * U, 12)}
      <circle cx={p.x} cy={p.y} r="4" fill="#312E81" />
      <text
        x={at.x}
        y={at.y}
        text-anchor="middle"
        dominant-baseline="central"
        font-size="22"
        font-weight="700"
        fill="#1E1B4B">{names[i]}</text
      >
    {/each}
  {/if}
</svg>
