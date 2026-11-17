<script>
  import PieChart from '#lib/core/visuals/pie-chart.svelte';

  /** The book's survey of 100 pupils, in percent. */
  const data = [
    { label: 'Thăm trang trại', value: 45 },
    { label: 'Leo núi', value: 30 },
    { label: 'Cắm trại', value: 25 },
  ];
</script>

<PieChart {data} title="Hoạt động dã ngoại yêu thích của 100 học sinh" />
