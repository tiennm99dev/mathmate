<script>
  import DivisionWorker from '#lib/core/kid/division-worker.svelte';
  import { FIRST_DIV, drawDivision } from '../_shared/columns.js';

  const KINDS = [
    { value: 'exact', label: 'Chia hết', first: FIRST_DIV.exact },
    { value: 'rest', label: 'Có dư', first: FIRST_DIV.rest },
    { value: 'zero', label: 'Thương có số 0', first: FIRST_DIV.zero },
  ];
</script>

<DivisionWorker
  kinds={KINDS}
  draw={(kind, previous) => drawDivision(Math.random, kind, previous)}
  compact
/>
