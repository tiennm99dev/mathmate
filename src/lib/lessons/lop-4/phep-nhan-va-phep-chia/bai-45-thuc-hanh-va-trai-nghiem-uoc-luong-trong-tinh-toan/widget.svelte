<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em ước lượng nhanh và đúng hết.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} />
