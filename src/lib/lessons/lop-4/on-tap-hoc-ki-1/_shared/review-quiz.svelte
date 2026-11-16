<script>
  import AdaptiveQuiz from '#lib/core/kid/adaptive-quiz.svelte';
  import { optionText } from '#lib/core/kid/quiz.js';
  import QuizVisual from './quiz-visual.svelte';

  /**
   * The adaptive review of this chapter: every part is asked once, then the
   * next question comes from the part the child is weakest at. Long options
   * (a number read in words, a pair of sides) go one per row.
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
</AdaptiveQuiz>
