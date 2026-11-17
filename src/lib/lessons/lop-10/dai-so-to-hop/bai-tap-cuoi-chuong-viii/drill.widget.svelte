<script>
  import DrillBoard from '#lib/core/drill-board.svelte';
  import { intText, readInteger } from '#lib/core/number-format.js';
  import { CHAPTER_SKILLS } from '../_shared/skills.js';
</script>

<DrillBoard
  skills={CHAPTER_SKILLS}
  perSkill={2}
  mapLabel="Bản đồ kĩ năng chương VIII"
  read={readInteger}
  format={intText}
  invalidText="Hãy nhập một số nguyên (dùng dấu trừ cho số âm, ví dụ −405)."
/>
