<script>
  import ColumnWorker from '#lib/core/kid/column-worker.svelte';
  import { COLUMNS, FIRST_MUL, drawMul } from '../_shared/columns.js';
</script>

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
