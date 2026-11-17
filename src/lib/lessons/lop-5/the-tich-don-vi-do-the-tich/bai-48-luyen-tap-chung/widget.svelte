<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import CubePile from '../_shared/cube-pile.svelte';
  import { extentOf } from '../_shared/cubes.js';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc thể tích và các đơn vị đo thể tích.';
  const COLORS = /** @type {const} */ (['rose', 'sky']);
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(q)}
    {#if q.visual}
      {@const all = q.visual.shapes.flatMap((s) => s.cubes)}
      <div class="flex flex-wrap items-end justify-center gap-6 rounded-2xl bg-sky-50 px-4 py-3">
        {#each q.visual.shapes as shape, i (shape.name)}
          <figure class="flex flex-col items-center gap-1">
            <CubePile
              cubes={shape.cubes}
              extent={extentOf(all)}
              cell={26}
              color={q.visual.shapes.length > 1 ? COLORS[i] : 'amber'}
              label="{shape.name} xếp từ các khối lập phương nhỏ"
            />
            <figcaption class="text-lg font-bold text-slate-700">{shape.name}</figcaption>
          </figure>
        {/each}
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
