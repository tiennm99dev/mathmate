<script>
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import AnglePicture from '#lib/core/kid/pictures/angle-picture.svelte';
  import ColumnPicture from './column-picture.svelte';
  import QuadPicture from '#lib/core/kid/pictures/quad-picture.svelte';

  /**
   * The picture of a review question (`Visual` in `visual.js`). A column
   * calculation shows its result only once the question has ended.
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();
</script>

{#if visual.type === 'column'}
  <ColumnPicture a={visual.a} b={visual.b} op={visual.op} {settled} />
{:else if visual.type === 'angle'}
  <AnglePicture
    m={visual.m}
    side={visual.side}
    protractor={visual.protractor}
    names={visual.names}
    {settled}
  />
{:else if visual.type === 'clock'}
  <ClockPicture minutes={visual.minutes} size="w-40" />
{:else}
  <QuadPicture shape={visual.shape} names={visual.names} />
{/if}
