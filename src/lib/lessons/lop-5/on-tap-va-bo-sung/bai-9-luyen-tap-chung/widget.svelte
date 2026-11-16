<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc các kiến thức của chủ đề Ôn tập và bổ sung.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(q)}
    {#if q.visual}
      <p
        class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-sky-50 px-4 py-3 text-3xl font-bold text-slate-900"
      >
        {#each q.visual.terms as term, i (i)}
          {#if typeof term === 'string'}
            <span>{term}</span>
          {:else}
            <Frac n={term.n} d={term.d} whole={term.whole} size="lg" />
          {/if}
        {/each}
      </p>
    {/if}
  {/snippet}
  {#snippet option(opt)}
    {#if typeof opt === 'object' && 'n' in opt}
      <Frac n={opt.n} d={opt.d} size="lg" />
    {:else}
      {opt}
    {/if}
  {/snippet}
</ChoiceRound>
