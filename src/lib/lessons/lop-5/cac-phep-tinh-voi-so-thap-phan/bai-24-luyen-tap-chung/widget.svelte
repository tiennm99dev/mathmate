<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc các phép tính với số thập phân.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(q)}
    {#if q.visual}
      <p
        class="rounded-2xl bg-sky-50 px-4 py-3 text-center text-2xl font-bold break-words text-slate-900 sm:text-3xl"
      >
        {q.visual.expr}
      </p>
    {/if}
  {/snippet}
</ChoiceRound>
