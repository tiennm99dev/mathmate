<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import CubeStack from '../_shared/cube-stack.svelte';
  import { boxVolume } from '../_shared/measures.js';

  /**
   * A cube the child grows by dragging its edge, built from 1 cm³ cubes. The
   * live line works the volume out as edge × edge × edge and, for an even
   * edge, compares it with the cube of half the edge: twice the edge, 8 times
   * the volume.
   */

  let a = $state(3);
  let count = $state(0);

  const v = $derived(boxVolume(a, a, a));

  const note = $derived.by(() => {
    if (count < v.volume) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Em đã xếp ${fmt(count)} hình lập phương 1 cm³. Xếp đầy để tìm thể tích.`,
      };
    }
    const base = `Hình lập phương cạnh ${fmt(a)} cm có ${fmt(a)} lớp, mỗi lớp ${v.steps.layer} hình lập phương 1 cm³. Thể tích là ${v.steps.volume} (cm³).`;
    if (a % 2 === 0 && a > 1) {
      const half = a / 2;
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${base} Cạnh ${fmt(a)} cm gấp 2 lần cạnh ${fmt(half)} cm, còn thể tích gấp 8 lần: ${fmt(half ** 3)} × 8 = ${fmt(v.volume)}.`,
      };
    }
    return { tone: /** @type {const} */ ('ok'), text: base };
  });
</script>

<div class="space-y-4">
  <SliderField label="Cạnh hình lập phương" bind:value={a} min={1} max={8} unit="cm" />

  {#key a}
    <CubeStack {a} b={a} c={a} bind:count full />
  {/key}

  <KidNote tone={note.tone} text={note.text} />
</div>
