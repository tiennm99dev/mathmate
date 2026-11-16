<script>
  import ColumnWorker from '#lib/core/kid/column-worker.svelte';
  import { COLUMNS, FIRST_MUL, drawMul } from '../_shared/columns.js';
</script>

<div class="six-columns">
  <ColumnWorker
    op="×"
    columns={COLUMNS}
    draw={(kind, previous) => drawMul(Math.random, kind, previous)}
    switchLabel="Chọn loại phép nhân"
    nextLabel="Phép nhân khác"
    kinds={[
      { value: 'plain', label: 'Không nhớ', first: FIRST_MUL.plain },
      { value: 'one', label: 'Nhớ một lần', first: FIRST_MUL.one },
      { value: 'many', label: 'Nhớ nhiều lần', first: FIRST_MUL.many },
    ]}
  />
</div>

<style>
  /*
   * The kid sheet draws each place 3.25rem wide, so six places do not fit a
   * 390 px phone card. Narrower places keep the whole sheet in view there.
   */
  @media (max-width: 30rem) {
    .six-columns :global([role='img'].inline-grid) {
      grid-template-columns: 1.5rem repeat(6, 2.75rem) !important;
    }
  }
</style>
