<script>
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import { CHARTS } from '../_shared/charts.js';

  const sports = CHARTS[0];
  const data = sports.labels.map((label, i) => ({ label, value: sports.values[i] }));
</script>

<BarChart {data} max={sports.max} unit={sports.unit} title="Biểu đồ cột: {sports.title}" />
