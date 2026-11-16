<script>
  import Banknote from '#lib/core/kid/banknote.svelte';
  import { GRADE2_NOTES as NOTES, NOTE_WORDS } from '#lib/core/kid/money.js';
</script>

<ul class="grid grid-cols-2 gap-3">
  {#each NOTES as value (value)}
    <li class="flex flex-col items-center gap-1 rounded-2xl bg-slate-50 p-3 text-center">
      <Banknote grouped={false} {value} />
      <span class="text-lg font-semibold text-slate-800">{NOTE_WORDS[value]}</span>
    </li>
  {/each}
</ul>
