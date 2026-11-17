<script>
  import { variationText } from './variation.js';

  /**
   * Draws a bảng biến thiên the way it is written by hand: the x row, the
   * y′ row with its signs, zeros and the double bar where y is undefined, and
   * the y row with an arrow up or down on each interval. `active` highlights
   * one interval (index into `table.signs`) or, as `node`, one x value.
   * @type {{
   *   table: import('./variation.js').Variation;
   *   active?: { interval?: number, node?: number };
   *   caption?: string;
   * }}
   */
  let { table, active = {}, caption = 'Bảng biến thiên' } = $props();

  const columns = $derived(
    [
      'max-content',
      ...table.cells.flatMap((_, i) => (i === 0 ? ['auto'] : ['minmax(2.25rem, 1fr)', 'auto'])),
    ].join(' '),
  );
  /** @type {Record<import('./variation.js').Level, string>} */
  const ALIGN = { top: 'self-start', mid: 'self-center', bottom: 'self-end' };
  /** @type {Record<import('./variation.js').Level, number>} */
  const ARROW_Y = { top: 12, mid: 45, bottom: 78 };
  /** @param {number} i */
  const hot = (i) => active.interval === i;
  /** @param {number} i */
  const hotNode = (i) => active.node === i;
  /**
   * The head of an arrow from (6, y0) to (54, y1).
   * @param {number} y0 @param {number} y1
   */
  function headPath(y0, y1) {
    const len = Math.hypot(48, y1 - y0);
    const ux = 48 / len;
    const uy = (y1 - y0) / len;
    const bx = 54 - ux * 10;
    const by = y1 - uy * 10;
    return `M 54 ${y1} L ${bx - uy * 4.5} ${by + ux * 4.5} L ${bx + uy * 4.5} ${by - ux * 4.5} Z`;
  }
</script>

<figure class="min-w-0">
  <div class="overflow-x-auto">
    <div
      class="grid min-w-max border border-slate-300 bg-white text-sm tabular-nums"
      style="grid-template-columns: {columns}"
      role="img"
      aria-label={variationText(table)}
    >
      <!-- x row -->
      <div class="border-r border-b border-slate-300 px-2 py-1.5 font-semibold italic">x</div>
      {#each table.cells as c, i (i)}
        {#if i > 0}
          <div class="border-b border-slate-300 {hot(i - 1) ? 'bg-amber-100' : ''}"></div>
        {/if}
        <div
          class="border-b border-slate-300 px-1 py-1.5 text-center whitespace-nowrap {hotNode(i)
            ? 'bg-amber-100 font-bold'
            : ''}"
        >
          {c.x}
        </div>
      {/each}
      <!-- y′ row -->
      <div class="border-r border-b border-slate-300 px-2 py-1.5 font-semibold italic">y′</div>
      {#each table.cells as c, i (i)}
        {#if i > 0}
          <div
            class="border-b border-slate-300 py-1.5 text-center font-bold {table.signs[i - 1] ===
            '+'
              ? 'text-emerald-700'
              : 'text-rose-700'} {hot(i - 1) ? 'bg-amber-100' : ''}"
          >
            {table.signs[i - 1] === '+' ? '+' : '−'}
          </div>
        {/if}
        <div class="border-b border-slate-300 px-1 py-1.5 text-center">
          {#if c.mark === '||'}
            <span class="font-bold tracking-[-0.2em] text-slate-700">||</span>
          {:else}
            {c.mark}
          {/if}
        </div>
      {/each}
      <!-- y row -->
      <div class="flex items-center border-r border-slate-300 px-2 font-semibold italic">y</div>
      {#each table.cells as c, i (i)}
        {#if i > 0}
          {@const arrow = table.arrows[i - 1]}
          <div class="h-24 {hot(i - 1) ? 'bg-amber-100' : ''}">
            <svg viewBox="0 0 60 90" class="h-full w-full" aria-hidden="true">
              <line
                x1="6"
                y1={ARROW_Y[arrow.from]}
                x2="48"
                y2={ARROW_Y[arrow.to]}
                stroke="#334155"
                stroke-width="2"
              />
              <path d={headPath(ARROW_Y[arrow.from], ARROW_Y[arrow.to])} fill="#334155" />
            </svg>
          </div>
        {/if}
        <div class="flex h-24 px-1 whitespace-nowrap {hotNode(i) ? 'bg-amber-100 font-bold' : ''}">
          {#if c.kind === 'pole'}
            <span class="{c.levelL ? ALIGN[c.levelL] : ''} pr-0.5">{c.yl ?? ''}</span>
            <span class="w-1.5 self-stretch border-x-2 border-slate-600"></span>
            <span class="{c.levelR ? ALIGN[c.levelR] : ''} pl-0.5">{c.yr ?? ''}</span>
          {:else}
            <span class="w-full text-center {c.level ? ALIGN[c.level] : ''}">{c.y ?? ''}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <figcaption class="mt-1 text-xs text-slate-500">{caption}</figcaption>
</figure>
