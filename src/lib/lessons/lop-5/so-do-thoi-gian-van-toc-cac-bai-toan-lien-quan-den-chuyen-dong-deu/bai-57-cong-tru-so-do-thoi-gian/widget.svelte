<script>
  import TimeColumn from '../_shared/time-column.svelte';
  import { PAIRS, addWorking, subWorking } from '../_shared/time-measure.js';

  const { gioPhut, phutGiay, namThang } = PAIRS;

  /** Additions and subtractions, with and without a change of units. */
  const WORKINGS = [
    addWorking({ big: 3, small: 15 }, { big: 2, small: 35 }, gioPhut),
    addWorking({ big: 22, small: 58 }, { big: 23, small: 25 }, phutGiay),
    subWorking({ big: 15, small: 55 }, { big: 13, small: 10 }, gioPhut),
    subWorking({ big: 3, small: 20 }, { big: 2, small: 45 }, phutGiay),
    addWorking({ big: 4, small: 45 }, { big: 1, small: 30 }, gioPhut),
    subWorking({ big: 5, small: 3 }, { big: 2, small: 8 }, namThang),
    subWorking({ big: 9, small: 10 }, { big: 6, small: 35 }, gioPhut),
  ];
</script>

<TimeColumn workings={WORKINGS} />
