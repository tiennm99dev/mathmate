<script>
  import Tex from '#lib/components/tex.svelte';
  import { quadText, signTable } from './quadratic.js';

  /**
   * The sign table (bảng xét dấu) of f(x) = ax² + bx + c the book's way: the
   * x row with −∞, the roots and +∞, the f(x) row with a sign under each
   * interval and 0 under each root.
   * @type {{ a: number, b: number, c: number }}
   */
  let { a, b, c } = $props();

  const table = $derived(signTable(a, b, c));
</script>

<div class="overflow-x-auto">
  <table class="mx-auto border-collapse text-center text-sm">
    <caption class="mb-1 text-sm text-slate-600"
      >Bảng xét dấu của f(x) = {quadText(a, b, c)}</caption
    >
    <tbody>
      <tr class="border-b border-slate-400">
        <th scope="row" class="border-r border-slate-400 px-3 py-1 italic">x</th>
        {#each table.x as cell, i (i)}
          <td class="px-2 py-1"
            >{#if cell}<Tex math={cell} />{/if}</td
          >
        {/each}
      </tr>
      <tr>
        <th scope="row" class="border-r border-slate-400 px-3 py-1 italic">f(x)</th>
        {#each table.f as cell, i (i)}
          <td
            class="px-2 py-1 font-bold {cell === '+'
              ? 'text-emerald-700'
              : cell === '-'
                ? 'text-rose-700'
                : 'text-slate-900'}">{cell === '-' ? '−' : cell}</td
          >
        {/each}
      </tr>
    </tbody>
  </table>
</div>
