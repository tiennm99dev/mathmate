<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import LinePair from '../_shared/line-pair.svelte';
  import QuadFigure from '../_shared/quad-figure.svelte';
  import { BOARD, KIND_LABELS, SHAPES, buildRound } from './engine.js';

  /** @param {import('#lib/core/kid/quiz.js').KidOption} o */
  const isShape = (o) => typeof o !== 'string' && 'shape' in o;

  /** @param {import('#lib/core/kid/quiz.js').KidQuestion<any>} q */
  const sentences = (q) => q.kind === 've-hinh';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đã nắm chắc hai đường thẳng vuông góc, song song, hình bình hành và hình thoi."
  pictureOption={isShape}
  listOptions={sentences}
>
  {#snippet visual(q)}
    {@const v = q.visual}
    {#if v?.type === 'lines'}
      <div role="img" aria-label="Hai đường thẳng màu tím và màu xanh">
        <LinePair a={v.a} b={v.b} size="max-w-64" />
      </div>
    {:else if v?.type === 'quad'}
      <QuadFigure
        corners={SHAPES[/** @type {import('./engine.js').Shape} */ (v.shape)]}
        w={BOARD.w}
        h={BOARD.h}
        names={v.names}
        label="Hình tứ giác {v.names.join('')} vẽ trên lưới ô vuông"
      />
    {:else if v?.type === 'clock'}
      <ClockPicture minutes={v.minutes} size="w-40" />
    {/if}
  {/snippet}
  {#snippet option(opt)}
    {#if isShape(opt)}
      <span class="flex flex-col items-center">
        <QuadFigure
          corners={SHAPES[/** @type {import('./engine.js').Shape} */ (opt.shape)]}
          w={BOARD.w}
          h={BOARD.h}
          size="w-20"
        />
        <span class="text-sm">{opt.label}</span>
      </span>
    {:else}
      {opt}
    {/if}
  {/snippet}
</ChoiceRound>
