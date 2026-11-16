<script>
  import { along } from '#lib/core/visuals/angle-math.js';
  import { clipLine, lineAngle } from './lines.js';

  /**
   * A small still picture of two straight lines for a sorting card: two
   * lines that cross at the picture's centre, or two parallel lines either
   * side of it. No right-angle mark is drawn, so the picture never gives the
   * answer away; the card's own label names it for screen readers.
   *
   * - `a`, `b`: directions of the two lines in degrees.
   * - `size`: CSS max-width class of the picture.
   * @type {{ a: number, b: number, size?: string }}
   */
  let { a, b, size = 'max-w-32' } = $props();

  const W = 140;
  const H = 100;
  const C = { x: W / 2, y: H / 2 };

  const lines = $derived.by(() => {
    if (lineAngle(a, b) === 0)
      return [
        clipLine(along(C, 18, a + 90), a, W, H, 6),
        clipLine(along(C, 18, a - 90), b, W, H, 6),
      ];
    return [clipLine(C, a, W, H, 6), clipLine(C, b, W, H, 6)];
  });
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="mx-auto block w-full rounded-lg border border-slate-200 bg-white {size}"
  aria-hidden="true"
>
  {#each lines as l, i (i)}
    {#if l}
      <line
        x1={l[0].x}
        y1={l[0].y}
        x2={l[1].x}
        y2={l[1].y}
        stroke={i === 0 ? '#4F46E5' : '#0F766E'}
        stroke-width="3.5"
        stroke-linecap="round"
      />
    {/if}
  {/each}
</svg>
