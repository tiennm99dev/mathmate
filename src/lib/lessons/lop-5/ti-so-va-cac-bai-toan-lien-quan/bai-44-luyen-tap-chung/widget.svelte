<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc tỉ số, tỉ số phần trăm và các bài toán liên quan.';
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  {allGood}
  listOptions={(q) => q.kind === 'may-tinh'}
/>
