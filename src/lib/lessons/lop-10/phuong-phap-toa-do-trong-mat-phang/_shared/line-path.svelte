<script>
  /**
   * The part of a line ax + by + c = 0 that lies on a coordinate plane, with
   * an optional name written near one end. Drawn inside a `coordinate-plane`.
   *
   * @type {{
   *   line: import('./coords.js').Line;
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale;
   *   color?: string;
   *   width?: number;
   *   dashed?: boolean;
   *   name?: string;
   * }}
   */
  let { line, plane, color = '#0f766e', width = 2.5, dashed = false, name = '' } = $props();

  import { clipLine } from './coords.js';

  const ends = $derived(clipLine(line, plane));
  // The name sits a little inside the end nearest the top of the board.
  const tag = $derived.by(() => {
    if (!ends) return null;
    const [p, q] = ends[0].y >= ends[1].y ? ends : [ends[1], ends[0]];
    const t = 0.12;
    return { x: plane.mx(p.x + (q.x - p.x) * t) + 8, y: plane.my(p.y + (q.y - p.y) * t) };
  });
</script>

{#if ends}
  <line
    x1={plane.mx(ends[0].x)}
    y1={plane.my(ends[0].y)}
    x2={plane.mx(ends[1].x)}
    y2={plane.my(ends[1].y)}
    stroke={color}
    stroke-width={width}
    stroke-dasharray={dashed ? '6 4' : null}
    style="pointer-events:none"
  />
  {#if name && tag}
    <text
      x={tag.x}
      y={tag.y}
      font-size="13"
      font-weight="700"
      font-style="italic"
      fill={color}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">{name}</text
    >
  {/if}
{/if}
