<script>
  import Frac from '#lib/core/frac.svelte';
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { optionText } from '#lib/core/kid/quiz.js';
  import QuizVisual from './quiz-visual.svelte';

  /**
   * The adaptive year-end review of one part of the book: every part is asked
   * once, then the next question comes from the part the child is weakest at.
   * Fraction options are drawn stacked; long options go one per row.
   *
   * - `skills`: the parts of the review.
   * - `allGood`: what the end card says when every part is right.
   * @type {{ skills: import('./visual.js').ReviewSkill[], allGood: string }}
   */
  let { skills, allGood } = $props();
</script>

<AdaptiveQuiz
  {skills}
  length={Math.max(12, skills.length)}
  {allGood}
  listOptions={(q) => q.options.some((o) => optionText(o).length > 14)}
>
  {#snippet visual(q, settled)}
    {#if q.visual}<QuizVisual visual={q.visual} {settled} />{/if}
  {/snippet}
  {#snippet option(/** @type {import('#lib/core/kid/quiz.js').KidOption} */ opt)}
    {#if typeof opt !== 'string' && Array.isArray(opt.fracs)}
      <span class="inline-flex items-center gap-2" aria-hidden="true">
        {#each opt.fracs as f, i (i)}
          <Frac n={f.n} d={f.d} size="lg" />
        {/each}
      </span>
    {:else}
      {optionText(opt)}
    {/if}
  {/snippet}
</AdaptiveQuiz>
