<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { KIND_LABELS, buildRound, isSentence } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc các kiến thức của chủ đề Số thập phân.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} listOptions={isSentence}>
  {#snippet visual(q)}
    {#if q.visual}
      <p
        class="flex items-center justify-center gap-3 rounded-2xl bg-sky-50 px-4 py-3 text-3xl font-bold text-slate-900"
      >
        <Frac n={q.visual.n} d={q.visual.d} size="lg" />
        <span>= ?</span>
      </p>
    {/if}
  {/snippet}
</ChoiceRound>
