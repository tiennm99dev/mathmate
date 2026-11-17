<script>
  import AnglePicture from './angle-picture.svelte';
  import ColumnPicture from './column-picture.svelte';
  import FractionLine from './fraction-line.svelte';
  import QuadPicture from './quad-picture.svelte';
  import ShadedPicture from './shaded-picture.svelte';

  /**
   * The picture of a review question (`Visual` in `visual.js`). A column
   * calculation and an angle's measure show only once the question has ended.
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();
</script>

{#if visual.type === 'column'}
  <ColumnPicture a={visual.a} b={visual.b} op={visual.op} {settled} />
{:else if visual.type === 'fracs'}
  <FractionLine items={visual.items} />
{:else if visual.type === 'shaded'}
  <ShadedPicture parts={visual.parts} shaded={visual.shaded} cols={visual.cols} />
{:else if visual.type === 'angle'}
  <AnglePicture
    m={visual.m}
    side={visual.side}
    protractor={visual.protractor}
    names={visual.names}
    {settled}
  />
{:else}
  <QuadPicture shape={visual.shape} names={visual.names} />
{/if}
