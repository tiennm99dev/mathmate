<script>
  /**
   * A group clipped to the drawing area of a coordinate plane, so curves that
   * leave the plane end cleanly at its edge.
   * @type {{
   *   plane: import('#lib/core/visuals/svg-math.js').PlaneScale;
   *   children: import('svelte').Snippet;
   * }}
   */
  let { plane, children } = $props();

  const id = $props.id();
</script>

<defs>
  <clipPath {id}>
    <rect
      x={plane.mx(plane.xMin)}
      y={plane.my(plane.yMax)}
      width={plane.mx(plane.xMax) - plane.mx(plane.xMin)}
      height={plane.my(plane.yMin) - plane.my(plane.yMax)}
    />
  </clipPath>
</defs>
<g clip-path="url(#{id})">
  {@render children()}
</g>
