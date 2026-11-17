<script>
  import { areaPath, curvePath, quadAt, solveInequality } from './quadratic.js';

  /**
   * Drawn inside a coordinate plane: the parabola y = ax² + bx + c, green
   * where it is above the x-axis (f(x) > 0) and red below it (f(x) < 0), with
   * the region between it and the axis tinted the same way, and, when `op` is given, the solution set of
   * f(x) op 0 marked along the x-axis (filled dots for ends that belong to
   * it, hollow dots for ends that do not).
   * @type {{
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale;
   *   a: number;
   *   b: number;
   *   c: number;
   *   op?: import('./quadratic.js').Op | null;
   * }}
   */
  let { plane, a, b, c, op = null } = $props();

  const POS = '#059669';
  const NEG = '#e11d48';
  const INK = '#0f172a';
  const uid = $props.id();
  const above = `${uid}-up`;
  const below = `${uid}-down`;

  const f = $derived((/** @type {number} */ x) => quadAt(a, b, c, x));
  const curve = $derived(curvePath(f, plane));
  const area = $derived(areaPath(f, plane));
  const pieces = $derived(op ? solveInequality(a, b, c, op) : []);
  const left = $derived(plane.mx(plane.xMin));
  const width = $derived(plane.mx(plane.xMax) - plane.mx(plane.xMin));
  /** @param {number} v */
  const clampX = (v) => Math.max(plane.xMin, Math.min(plane.xMax, v));
</script>

<defs>
  <clipPath id={above}>
    <rect x={left} y={plane.my(plane.yMax)} {width} height={plane.my(0) - plane.my(plane.yMax)} />
  </clipPath>
  <clipPath id={below}>
    <rect x={left} y={plane.my(0)} {width} height={plane.my(plane.yMin) - plane.my(0)} />
  </clipPath>
</defs>
<path d={area} fill={POS} opacity="0.12" clip-path="url(#{above})" />
<path d={area} fill={NEG} opacity="0.12" clip-path="url(#{below})" />
<path d={curve} fill="none" stroke={POS} stroke-width="3" clip-path="url(#{above})" />
<path d={curve} fill="none" stroke={NEG} stroke-width="3" clip-path="url(#{below})" />

{#each pieces as p, i (i)}
  {#if p.from === p.to}
    <circle cx={plane.mx(p.from)} cy={plane.my(0)} r="6" fill={INK} />
  {:else}
    <line
      x1={plane.mx(clampX(p.from))}
      y1={plane.my(0)}
      x2={plane.mx(clampX(p.to))}
      y2={plane.my(0)}
      stroke={INK}
      stroke-width="5"
      opacity="0.75"
    />
    {#each [{ at: p.from, closed: p.closedFrom }, { at: p.to, closed: p.closedTo }] as end, j (j)}
      {#if Number.isFinite(end.at)}
        <circle
          cx={plane.mx(end.at)}
          cy={plane.my(0)}
          r="6"
          fill={end.closed ? INK : '#fff'}
          stroke={INK}
          stroke-width="2"
        />
      {/if}
    {/each}
  {/if}
{/each}
