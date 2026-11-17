<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import LpBoard from '../_shared/lp-board.svelte';
  import OptimumBoard from '../_shared/optimum-board.svelte';
  import { DIET, MACHINES } from '../_shared/lp-problems.js';
  import { BOX, WINDOW } from '../_shared/optimum.js';

  let method = $state('lp');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phương pháp"
    bind:value={method}
    options={[
      { value: 'lp', label: 'Quy hoạch tuyến tính' },
      { value: 'dao-ham', label: 'Dùng đạo hàm' },
    ]}
  />
  {#if method === 'lp'}
    <LpBoard problems={[MACHINES, DIET]} />
  {:else}
    <OptimumBoard problems={[BOX, WINDOW]} />
  {/if}
</div>
