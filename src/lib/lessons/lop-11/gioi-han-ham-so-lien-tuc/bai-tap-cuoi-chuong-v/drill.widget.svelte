<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương V"
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số nguyên, phân số (ví dụ −5/3) hoặc số thập phân."
/>
