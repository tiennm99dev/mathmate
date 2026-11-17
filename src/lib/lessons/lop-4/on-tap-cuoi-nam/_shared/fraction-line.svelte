<script>
  import Frac from '#lib/core/frac.svelte';

  /**
   * A line of fractions, whole numbers, words and signs, drawn large. A `'?'`
   * item is what the question asks for.
   * @type {{ items: Array<import('./visual.js').Frac | string> }}
   */
  let { items } = $props();
</script>

<p
  class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-amber-50 p-4 text-3xl font-bold text-slate-800"
>
  {#each items as item, i (i)}
    {#if typeof item !== 'string'}
      <Frac n={item.n} d={item.d} size="lg" />
    {:else if item === '?'}
      <span class="sr-only">dấu hỏi</span>
      <span aria-hidden="true" class="text-indigo-700">?</span>
    {:else}
      <span>{item}</span>
    {/if}
  {/each}
</p>
