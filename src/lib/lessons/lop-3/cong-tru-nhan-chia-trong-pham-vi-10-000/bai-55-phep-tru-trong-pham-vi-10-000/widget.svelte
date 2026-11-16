<script>
  import ColumnWorker from '#lib/core/kid/column-worker.svelte';
  import { COLUMNS, drawColumn } from '../_shared/columns.js';
</script>

<ColumnWorker
  op="-"
  columns={COLUMNS}
  draw={(kind, previous) => drawColumn(Math.random, '-', kind, previous)}
  switchLabel="Chọn loại phép trừ"
  nextLabel="Phép trừ khác"
  kinds={[
    { value: 'plain', label: 'Không nhớ', first: { a: 5876, b: 2453 } },
    { value: 'one', label: 'Nhớ một lần', first: { a: 5482, b: 2357 } },
    { value: 'many', label: 'Nhớ nhiều lần', first: { a: 6378, b: 2549 } },
  ]}
/>
