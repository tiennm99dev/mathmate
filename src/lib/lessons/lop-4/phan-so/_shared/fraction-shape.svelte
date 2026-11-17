<script>
  import { sectorPath } from '#lib/core/visuals/svg-math.js';

  /**
   * A whole cut into equal parts: a round cake (`circle`), a strip (`bar`)
   * or a rectangle of `cols` columns (`grid`). Part i is filled with
   * `fills[i]`, or left white when that is null. With `ontoggle`, every part
   * is a big button that taps or keys (Enter, Space) on and off; its spoken
   * name comes from `partLabel`.
   * @type {{
   *   shape: 'circle' | 'bar' | 'grid';
   *   parts: number;
   *   fills: Array<string | null>;
   *   cols?: number;
   *   label: string;
   *   partLabel?: (i: number) => string;
   *   ontoggle?: (i: number) => void;
   *   small?: boolean;
   * }}
   */
  let { shape, parts, fills, cols = parts, label, partLabel, ontoggle, small = false } = $props();

  const CELL = 64;
  const rows = $derived(shape === 'grid' ? Math.ceil(parts / cols) : 1);
  const width = $derived(shape === 'circle' ? 200 : shape === 'bar' ? 320 : cols * CELL);
  const height = $derived(shape === 'circle' ? 200 : shape === 'bar' ? 80 : rows * CELL);

  /** @param {number} i */
  function partPath(i) {
    if (shape === 'circle') {
      if (parts === 1) return sectorPath(100, 100, 92, 0, 360);
      const sweep = 360 / parts;
      return sectorPath(100, 100, 92, i * sweep, (i + 1) * sweep);
    }
    const w = shape === 'bar' ? 320 / parts : CELL;
    const h = shape === 'bar' ? 80 : CELL;
    const x = shape === 'bar' ? i * w : (i % cols) * CELL;
    const y = shape === 'bar' ? 0 : Math.floor(i / cols) * CELL;
    return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
  }

  /** @param {KeyboardEvent} e @param {number} i */
  function key(e, i) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    ontoggle?.(i);
  }
</script>

<svg
  viewBox="-4 -4 {width + 8} {height + 8}"
  class="mx-auto block w-full {small ? 'max-w-28' : shape === 'circle' ? 'max-w-72' : 'max-w-sm'}"
  role="group"
  aria-label={label}
>
  {#each { length: parts } as _, i (i)}
    {#if ontoggle}
      <path
        class="part"
        d={partPath(i)}
        fill={fills[i] ?? '#ffffff'}
        stroke="#334155"
        stroke-width="3"
        role="button"
        tabindex="0"
        aria-pressed={fills[i] != null}
        aria-label={partLabel?.(i) ?? `Phần ${i + 1}`}
        onclick={() => ontoggle(i)}
        onkeydown={(e) => key(e, i)}
      />
    {:else}
      <path d={partPath(i)} fill={fills[i] ?? '#ffffff'} stroke="#334155" stroke-width="3" />
    {/if}
  {/each}
</svg>

<style>
  .part {
    cursor: pointer;
    outline: none;
  }
  .part:focus-visible {
    stroke: #4f46e5;
    stroke-width: 6;
  }
</style>
