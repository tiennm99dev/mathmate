<script>
  /**
   * A named point on a coordinate plane that snaps to whole grid points: a
   * round knob, its name and coordinates beside it, dragged by pointer or
   * moved one unit with the arrow keys. Drawn inside a `coordinate-plane`.
   *
   * - `at`: the point in math coordinates.
   * - `name`: its name ('A'); `color` the knob's colour.
   * - `onmove`: receives the grid point it moved to; the parent may refuse it.
   * - `labelDx`, `labelDy`: where the name sits, in SVG units from the knob.
   *
   * @type {{
   *   at: { x: number, y: number };
   *   name: string;
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale;
   *   svg: () => SVGSVGElement | null;
   *   onmove: (g: { x: number, y: number }) => void;
   *   color?: string;
   *   labelDx?: number;
   *   labelDy?: number;
   * }}
   */
  let { at, name, plane, svg, onmove, color = '#0f172a', labelDx = 10, labelDy = -10 } = $props();

  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { coordText } from './coords.js';
  import { gridHandle } from './grid-handle.js';

  const opts = $derived(gridHandle({ at, plane, svg, onmove }));
  const text = $derived(`${name}${coordText(at.x, at.y)}`);
  // Flip the name to the other side of the knob when it would leave the board.
  const dx = $derived.by(() => {
    const room = text.length * 7 + 12;
    const x = plane.mx(at.x);
    if (labelDx < 0 && x - room < 0) return Math.abs(labelDx);
    if (labelDx > 0 && x + room > plane.width) return -Math.abs(labelDx);
    return labelDx;
  });
</script>

<text
  x={plane.mx(at.x) + dx}
  y={plane.my(at.y) + labelDy}
  font-size="12"
  font-weight="700"
  text-anchor={dx < 0 ? 'end' : 'start'}
  fill={color}
  stroke="#fff"
  stroke-width="3"
  paint-order="stroke"
  style="pointer-events:none">{text}</text
>
<g
  class="drag-handle"
  role="button"
  tabindex="0"
  aria-label="Điểm {name}{coordText(at.x, at.y)}: kéo hoặc dùng phím mũi tên"
  style="cursor:grab; outline:none"
  use:draggable={opts}
>
  <circle
    class="drag-knob"
    cx={plane.mx(at.x)}
    cy={plane.my(at.y)}
    r="7"
    fill="#fff"
    stroke={color}
    stroke-width="2.5"
  />
</g>
