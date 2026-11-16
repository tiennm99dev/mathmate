<script>
  import DecimalColumn from '../_shared/decimal-column.svelte';

  /** Additions where the two numbers have different numbers of decimal digits. */
  const TASKS = /** @type {const} */ ([
    ['45,08', '24,7'],
    ['8,75', '6,5'],
    ['3,6', '12,48'],
    ['0,85', '2,9'],
    ['27,4', '5,36'],
    ['9,47', '0,6'],
  ]);
</script>

<DecimalColumn op="+" tasks={TASKS} />
