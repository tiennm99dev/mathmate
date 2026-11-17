<script>
  /**
   * A rectangle cut into `parts` equal pieces, `cols` to a row, with the
   * first `shaded` pieces coloured. Screen readers hear how many pieces there
   * are and how many are coloured, so the child can write the fraction.
   * @type {{ parts: number, shaded: number, cols: number }}
   */
  let { parts, shaded, cols } = $props();

  const S = 44;
  const rows = $derived(Math.ceil(parts / cols));
</script>

<svg
  viewBox="-3 -3 {cols * S + 6} {rows * S + 6}"
  class="mx-auto block w-full select-none"
  style="max-width: {Math.min(20, cols * 3)}rem"
  role="img"
  aria-label="Hình được chia thành {parts} phần bằng nhau, có {shaded} phần được tô màu."
>
  {#each { length: parts } as _, i (i)}
    <rect
      x={(i % cols) * S}
      y={Math.floor(i / cols) * S}
      width={S}
      height={S}
      fill={i < shaded ? '#FB923C' : '#FFFFFF'}
      stroke="#334155"
      stroke-width="3"
    />
  {/each}
</svg>
