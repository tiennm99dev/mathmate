<script>
  import GlossaryPage from '#lib/core/glossary-page.svelte';

  let { data } = $props();
</script>

<GlossaryPage sections={data.sections} />
