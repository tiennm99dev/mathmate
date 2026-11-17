<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import BoxFigure from '../_shared/box-figure.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  /**
   * The chapter's mixed practice: one tap-the-answer question of each part,
   * with the box or cube drawn and its measures written beside the edges.
   */

  const allGood =
    'Tuyệt vời! Em đã nắm chắc diện tích và thể tích hình hộp chữ nhật, hình lập phương.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(q)}
    {#if q.visual}
      {@const v = q.visual}
      <div class="rounded-2xl bg-sky-50 px-2 py-3">
        <BoxFigure
          a={v.a}
          b={v.b}
          c={v.c}
          labels={v.labels}
          tone="sky"
          label="{v.name}, các số đo: {v.labels.filter(Boolean).join(', ')}."
        />
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
