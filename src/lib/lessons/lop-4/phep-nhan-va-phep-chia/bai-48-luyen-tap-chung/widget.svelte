<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc phép nhân và phép chia.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} />
