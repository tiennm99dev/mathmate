<script>
  import { pointsAttr } from '#lib/utils/svg.js';
  import { DEPTH, boxFaces, cubeBox, drawOrder, extentOf } from './cubes.js';

  /**
   * A shape built from unit cubes, drawn from the front, right and above.
   * `extent` fixes the drawing frame so two shapes side by side share one
   * scale; `cell` is the screen size of one cube edge. The picture is one
   * image named by `label`; never put the cube count in the label while the
   * child is asked to count.
   * @type {{
   *   cubes: readonly import('./cubes.js').Cube[];
   *   label: string;
   *   extent?: { nx: number, ny: number, nz: number };
   *   cell?: number;
   *   color?: 'sky' | 'amber' | 'rose' | 'emerald';
   * }}
   */
  let { cubes, label, extent, cell = 26, color = 'sky' } = $props();

  const SHADES = {
    sky: { front: '#7dd3fc', top: '#e0f2fe', right: '#38bdf8', line: '#0369a1' },
    amber: { front: '#fcd34d', top: '#fef3c7', right: '#f59e0b', line: '#b45309' },
    rose: { front: '#fda4af', top: '#ffe4e6', right: '#fb7185', line: '#be123c' },
    emerald: { front: '#6ee7b7', top: '#d1fae5', right: '#34d399', line: '#047857' },
  };

  const shade = $derived(SHADES[color]);
  const frame = $derived(extent ?? extentOf(cubes));
  const width = $derived((frame.nx + DEPTH * frame.ny) * cell + 2);
  const height = $derived((frame.nz + DEPTH * frame.ny) * cell + 2);
  const faces = $derived(
    drawOrder(cubes).flatMap((c) =>
      boxFaces(cubeBox(c)).map((f) => ({
        kind: f.kind,
        points: pointsAttr(f.pts.map((p) => ({ x: p.x * cell + 1, y: p.y * cell + height - 1 }))),
      })),
    ),
  );
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  class="block h-auto max-w-full"
  role="img"
  aria-label={label}
>
  {#each faces as f, i (i)}
    <polygon
      points={f.points}
      fill={shade[f.kind]}
      stroke={shade.line}
      stroke-width="1.2"
      stroke-linejoin="round"
    />
  {/each}
</svg>
