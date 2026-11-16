<script>
  import { clipToBox } from '#lib/algebra-engine/system.js';
  import { excludedPolygon, isLinear, isStrict, polyPoints } from './half-plane.js';

  /**
   * SVG layers for linear inequalities on a `coordinate-plane`, drawn the
   * book's way: each cut-away half-plane is hatched in its colour (miền bị
   * gạch), the border line is dashed for `<`, `>` and solid for `≤`, `≥`,
   * and the region left clear is the solution region. Place it inside the
   * plane's children snippet.
   *
   * - `plane`: the plane scale the snippet receives.
   * - `items`: inequalities with their colours; `hatch: false` draws only the line.
   * - `region`: optional solution polygon, tinted green.
   *
   * @type {{
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale;
   *   items: Array<{ ineq: import('./half-plane.js').Ineq, color: string, hatch?: boolean }>;
   *   region?: import('./half-plane.js').Pt[];
   * }}
   */
  let { plane, items, region = [] } = $props();

  const uid = $props.id();
  const box = $derived({
    xMin: plane.xMin,
    xMax: plane.xMax,
    yMin: plane.yMin,
    yMax: plane.yMax,
  });
  const layers = $derived(
    items
      .filter((it) => isLinear(it.ineq))
      .map((it, i) => ({
        ...it,
        id: `${uid}-hatch-${i}`,
        cut: it.hatch === false ? [] : excludedPolygon(it.ineq, box),
        seg: clipToBox(it.ineq, box.xMin, box.xMax, box.yMin, box.yMax),
      })),
  );
</script>

<defs>
  {#each layers as layer (layer.id)}
    <pattern
      id={layer.id}
      width="8"
      height="8"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <line x1="0" y1="0" x2="0" y2="8" stroke={layer.color} stroke-width="1.6" opacity="0.55" />
    </pattern>
  {/each}
</defs>

{#if region.length}
  <polygon
    points={polyPoints(region, plane.mx, plane.my)}
    fill="#10b981"
    fill-opacity="0.12"
    stroke="none"
  />
{/if}

{#each layers as layer (layer.id)}
  {#if layer.cut.length}
    <polygon points={polyPoints(layer.cut, plane.mx, plane.my)} fill="url(#{layer.id})" />
  {/if}
{/each}

{#each layers as layer (layer.id)}
  {#if layer.seg}
    <line
      x1={plane.mx(layer.seg[0].x)}
      y1={plane.my(layer.seg[0].y)}
      x2={plane.mx(layer.seg[1].x)}
      y2={plane.my(layer.seg[1].y)}
      stroke={layer.color}
      stroke-width="2.5"
      stroke-dasharray={isStrict(layer.ineq.op) ? '7 5' : null}
      stroke-linecap="round"
    />
  {/if}
{/each}
