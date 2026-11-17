<script>
  import LpBoard from '../_shared/lp-board.svelte';
  import { DIET, FACTORY, RENTAL } from '../_shared/lp-problems.js';
</script>

<LpBoard problems={[FACTORY, DIET, RENTAL]} />
