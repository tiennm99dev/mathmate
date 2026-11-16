<script>
  import DecimalColumn from '../_shared/decimal-column.svelte';

  /** Subtractions, some needing zeros written after the minuend and borrows. */
  const TASKS = /** @type {const} */ ([
    ['45,8', '19,26'],
    ['7', '2,35'],
    ['12,5', '9,8'],
    ['68,4', '25,7'],
    ['5,2', '1,47'],
    ['20,05', '6,3'],
  ]);
</script>

<DecimalColumn op="-" tasks={TASKS} />
