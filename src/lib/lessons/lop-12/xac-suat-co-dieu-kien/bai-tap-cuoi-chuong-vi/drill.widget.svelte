<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { readProbability } from '#lib/core/fractions.js';
  import { probText } from '../_shared/conditional.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương VI"
  read={readProbability}
  format={probText}
  invalidText="Hãy nhập một xác suất: số thập phân như 0,385 hoặc phân số a/b như 12/19."
/>
