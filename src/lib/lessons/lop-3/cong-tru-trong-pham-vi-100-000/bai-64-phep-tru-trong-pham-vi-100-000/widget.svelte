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
    { value: 'plain', label: 'Không nhớ', first: { a: 68795, b: 25432 } },
    { value: 'one', label: 'Nhớ một lần', first: { a: 57482, b: 23157 } },
    { value: 'many', label: 'Nhớ nhiều lần', first: { a: 23285, b: 12967 } },
  ]}
/>
