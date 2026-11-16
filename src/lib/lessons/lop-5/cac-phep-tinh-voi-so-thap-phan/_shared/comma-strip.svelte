<script>
  /**
   * A row of digit boxes with one comma that slides between them. Digits
   * outside `span` are zeros not written in the number and show faint. With
   * `onpick`, a big button under each gap lets the child put the comma
   * there (cells are then wider so every button is 48 px). A comma after the
   * last written digit is not drawn: the number is then a natural number.
   * @type {{
   *   digits: string;
   *   comma: number | null;
   *   span?: readonly [number, number] | null;
   *   label: string;
   *   onpick?: (gap: number) => void;
   * }}
   */
  let { digits, comma, span = null, label, onpick } = $props();

  const CELL = $derived(onpick ? 48 : 26);
  const GAP = $derived(onpick ? 16 : 6);
  const list = $derived(digits.split(''));
  const width = $derived(list.length * CELL + (list.length - 1) * GAP);

  /**
   * Middle of the gap after `g` digits, from the left edge.
   * @param {number} g
   */
  const gapX = (g) => g * (CELL + GAP) - GAP / 2;
  /** @param {number} i */
  const written = (i) => span === null || (i >= span[0] && i <= span[1]);
  const gaps = $derived(Array.from({ length: list.length - 1 }, (_, i) => i + 1));
</script>

<div class="flex justify-center overflow-x-auto py-1">
  <div class="relative" style:width="{width}px" style:height={onpick ? '7.5rem' : '3.75rem'}>
    <div class="absolute top-0 left-0 flex" style:gap="{GAP}px" role="img" aria-label={label}>
      {#each list as d, i (i)}
        <span
          class="flex h-14 items-center justify-center rounded-lg text-3xl font-bold tabular-nums {written(
            i,
          )
            ? 'bg-sky-50 text-slate-900'
            : 'text-slate-300'}"
          style:width="{CELL}px">{d}</span
        >
      {/each}
    </div>
    {#if comma !== null && comma > 0 && comma < list.length && (span === null || comma <= span[1])}
      <span
        class="comma pointer-events-none absolute top-6 text-4xl font-bold text-rose-600"
        style:left="{gapX(comma) - 6}px"
        aria-hidden="true">,</span
      >
    {/if}
    {#if onpick}
      {#each gaps as g (g)}
        <button
          type="button"
          class="absolute top-16 flex h-12 w-12 items-center justify-center rounded-lg border-2 text-2xl font-bold focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none {comma ===
          g
            ? 'border-rose-500 bg-rose-50 text-rose-600'
            : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-100'}"
          style:left="{gapX(g) - 24}px"
          aria-label="Đặt dấu phẩy sau chữ số thứ {g}: {list.slice(0, g).join('')},{list
            .slice(g)
            .join('')}"
          aria-pressed={comma === g}
          onclick={() => onpick?.(g)}>↑</button
        >
      {/each}
    {/if}
  </div>
</div>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .comma {
      transition: left 600ms ease-in-out;
    }
  }
</style>
