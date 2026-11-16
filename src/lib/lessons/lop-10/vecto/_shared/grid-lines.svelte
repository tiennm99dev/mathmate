<script>
  /**
   * Light square grid lines of a plane scale, for boards that draw vectors
   * without coordinate axes.
   * @type {{ plane: import('#lib/core/visuals/svg-math.js').PlaneScale }}
   */
  let { plane } = $props();
</script>

<g style="pointer-events:none">
  {#each plane.gridX as x (x)}
    <line
      x1={plane.mx(x)}
      y1={plane.my(plane.yMin)}
      x2={plane.mx(x)}
      y2={plane.my(plane.yMax)}
      stroke="#e2e8f0"
    />
  {/each}
  {#each plane.gridY as y (y)}
    <line
      x1={plane.mx(plane.xMin)}
      y1={plane.my(y)}
      x2={plane.mx(plane.xMax)}
      y2={plane.my(y)}
      stroke="#e2e8f0"
    />
  {/each}
</g>
