<script>
  import ColumnWorker from '#lib/core/kid/column-worker.svelte';
  import { COLUMNS, drawColumn } from '../_shared/columns.js';
</script>

<ColumnWorker
  op="+"
  columns={COLUMNS}
  draw={(kind, previous) => drawColumn(Math.random, '+', kind, previous)}
  switchLabel="Chọn loại phép cộng"
  nextLabel="Phép cộng khác"
  kinds={[
    { value: 'plain', label: 'Không nhớ', first: { a: 3524, b: 2361 } },
    { value: 'one', label: 'Nhớ một lần', first: { a: 2435, b: 1248 } },
    { value: 'many', label: 'Nhớ nhiều lần', first: { a: 3628, b: 4845 } },
  ]}
/>
