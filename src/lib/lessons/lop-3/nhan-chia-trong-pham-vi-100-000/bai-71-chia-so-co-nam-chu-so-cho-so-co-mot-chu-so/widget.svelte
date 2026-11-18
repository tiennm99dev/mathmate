<script>
  import DivisionWorker from '#lib/core/kid/division-worker.svelte';
  import { firstTask, makeTask } from './engine.js';

  const KINDS = [
    { value: 'exact', label: 'Chia hết', first: firstTask('exact') },
    { value: 'rest', label: 'Có dư', first: firstTask('rest') },
    { value: 'zero', label: 'Thương có số 0', first: firstTask('zero') },
  ];
</script>

<DivisionWorker
  kinds={KINDS}
  draw={(kind, previous) => makeTask(Math.random, kind, previous)}
  compact
/>
