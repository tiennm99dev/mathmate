<script>
  import Frac from '#lib/core/frac.svelte';
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã cộng, trừ phân số rất giỏi.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(/** @type {import('./engine.js').Question} */ q)}
    {@const v = q.visual}
    {#if v?.type === 'line'}
      <p
        class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-amber-50 p-4 text-3xl font-bold text-slate-800"
      >
        {#each v.items as item, i (i)}
          {#if typeof item === 'string'}
            {#if item === '?'}
              <span class="sr-only">dấu ?</span>
              <span aria-hidden="true" class="text-indigo-700">?</span>
            {:else}
              <span>{item}</span>
            {/if}
          {:else}
            <Frac n={item.n} d={item.d} size="lg" />
          {/if}
        {/each}
      </p>
    {:else if v?.type === 'facts'}
      <ul class="grid gap-2 rounded-2xl bg-sky-50 p-3 text-xl text-slate-800">
        {#each v.rows as row (row.text)}
          <li class="flex flex-wrap items-center gap-2">
            <span>{row.text}</span>
            <Frac n={row.n} d={row.d} size="lg" />
            <span>{row.unit}</span>
          </li>
        {/each}
      </ul>
    {/if}
  {/snippet}
  {#snippet option(/** @type {import('#lib/core/kid/quiz.js').KidOption} */ opt)}
    {#if typeof opt !== 'string' && Array.isArray(opt.fracs)}
      <span class="inline-flex items-center gap-2" aria-hidden="true">
        {#each opt.fracs as f, i (i)}
          <Frac n={f.n} d={f.d} size="lg" />
        {/each}
      </span>
    {:else}
      {typeof opt === 'string' ? opt : opt.label}
    {/if}
  {/snippet}
</ChoiceRound>
