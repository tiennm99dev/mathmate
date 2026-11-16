<svelte:options namespace="svg" />

<script>
  import { rightMarkPath } from '#lib/core/visuals/angle-math.js';

  /**
   * A see-through set square (ê ke) drawn inside an SVG: a right triangle
   * with its right-angle corner at `corner`, one leg ending at `foot` and the
   * other at `tip`, and the right-angle mark in the corner.
   *
   * - `corner`, `foot`, `tip`: its three vertices (`setSquare` in `lines.js`).
   * - `footDeg`, `tipDeg`: directions of the two legs from the corner.
   * @type {{
   *   corner: import('./lines.js').Pt;
   *   foot: import('./lines.js').Pt;
   *   tip: import('./lines.js').Pt;
   *   footDeg: number;
   *   tipDeg: number;
   * }}
   */
  let { corner, foot, tip, footDeg, tipDeg } = $props();
</script>

<g aria-hidden="true">
  <polygon
    points="{corner.x},{corner.y} {foot.x},{foot.y} {tip.x},{tip.y}"
    fill="#FDE68A"
    fill-opacity="0.55"
    stroke="#B45309"
    stroke-width="2"
    stroke-linejoin="round"
  />
  <path
    d={rightMarkPath(corner, footDeg, tipDeg, 14)}
    fill="none"
    stroke="#B45309"
    stroke-width="2"
  />
</g>
