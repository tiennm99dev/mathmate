<script>
  import TimeColumn from '../_shared/time-column.svelte';
  import { PAIRS, divWorking, mulWorking } from '../_shared/time-measure.js';

  const { gioPhut, phutGiay } = PAIRS;

  /** Multiplications and divisions, with and without a change of units. */
  const WORKINGS = [
    mulWorking({ big: 1, small: 10 }, 3, gioPhut),
    mulWorking({ big: 3, small: 15 }, 5, gioPhut),
    divWorking({ big: 42, small: 30 }, 3, phutGiay),
    divWorking({ big: 7, small: 40 }, 4, gioPhut),
    mulWorking({ big: 2, small: 25 }, 4, phutGiay),
    divWorking({ big: 9, small: 20 }, 5, gioPhut),
  ];
</script>

<TimeColumn workings={WORKINGS} />
