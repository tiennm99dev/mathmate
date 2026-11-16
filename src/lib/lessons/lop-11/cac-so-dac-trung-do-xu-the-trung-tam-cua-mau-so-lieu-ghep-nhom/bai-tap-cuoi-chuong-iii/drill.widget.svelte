<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { numberText, readNumber } from '#lib/core/decimal.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={3}
  mapLabel="Bản đồ kĩ năng chương III"
  read={readNumber}
  format={numberText}
  invalidText="Hãy nhập một số, dùng dấu phẩy thập phân (ví dụ 53,44)."
/>
