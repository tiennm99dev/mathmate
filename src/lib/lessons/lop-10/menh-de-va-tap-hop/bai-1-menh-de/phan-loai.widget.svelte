<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import { SORT_BINS, SORT_CARDS } from './engine.js';

  const deck = shuffled(SORT_CARDS, 10);
</script>

<CardSorter
  cards={deck}
  bins={SORT_BINS}
  hintOnWrong
  label="Xếp mỗi câu vào ô mệnh đề đúng, mệnh đề sai hoặc không là mệnh đề"
/>
