<script>
  import { ISOMETRIC, solidFaces } from './voxel.js';

  /**
   * A cube-built solid drawn in a parallel view: each unit cube shows its
   * free faces, the top light, the front mid and the left side dark, as on
   * triangular grid paper. The drawing is decorative (`aria-hidden`); the
   * caller names it. Props:
   * - `solid`: the solid (`#./voxel.js`);
   * - `view`: `{ yaw, pitch }` in degrees, the isometric view by default;
   * - `width`, `height`: the SVG box; the solid is fitted inside it;
   * - `fit`: the size of solid (in cells) the scale is fitted to, so several
   *   solids drawn with one `fit` share a scale; by default the solid itself.
   * @type {{
   *   solid: import('./voxel.js').Solid;
   *   view?: import('#lib/geom-engine/solid.js').View;
   *   width?: number;
   *   height?: number;
   *   fit?: number;
   * }}
   */
  let { solid, view = ISOMETRIC, width = 200, height = 160, fit = 0 } = $props();

  const TONES = { top: '#e0e7ff', front: '#a5b4fc', left: '#818cf8', other: '#c7d2fe' };
  const PAD = 10;

  const faces = $derived(solidFaces(solid, view));
  // The solid's diagonal bounds every view, so turning never changes the scale.
  const size = $derived(fit || Math.hypot(solid.nx, solid.ny, solid.nz));
  const unit = $derived((Math.min(width, height) - 2 * PAD) / size);

  /** @param {{ x: number, y: number }[]} pts */
  const path = (pts) =>
    pts
      .map((p, i) => `${i ? 'L' : 'M'}${width / 2 + p.x * unit} ${height / 2 + p.y * unit}`)
      .join(' ') + 'Z';
</script>

<svg viewBox="0 0 {width} {height}" class="block h-auto w-full select-none" aria-hidden="true">
  {#each faces as f, i (i)}
    <path
      d={path(f.pts)}
      fill={TONES[/** @type {keyof typeof TONES} */ (f.tone)]}
      stroke="#312e81"
      stroke-width="1"
      stroke-linejoin="round"
    />
  {/each}
</svg>
