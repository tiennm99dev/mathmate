<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import CubeStack from '../_shared/cube-stack.svelte';
  import { boxVolume } from '../_shared/measures.js';
  import { fillWords } from '../_shared/stack.js';

  /**
   * A box the child sizes and fills with 1 cm³ cubes, row by row and layer
   * by layer. Once full, the live line counts the cubes as layers: a × b in
   * a layer, c layers, so the volume is a × b × c.
   */

  let a = $state(4);
  let b = $state(3);
  let c = $state(2);
  let count = $state(0);

  const v = $derived(boxVolume(a, b, c));

  const note = $derived.by(() => {
    if (count >= v.volume) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hộp có ${fmt(c)} lớp, mỗi lớp ${v.steps.layer} hình lập phương 1 cm³. Thể tích hình hộp là ${v.steps.volume} (cm³).`,
      };
    }
    if (count === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Hộp còn trống. Em xếp hình lập phương 1 cm³ vào. Một hàng có ${fmt(a)} khối.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Em đã xếp ${fmt(count)} hình lập phương 1 cm³ (${fillWords(a, b, c, count)}). Xếp tiếp cho đầy hộp nhé.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-2 sm:grid-cols-3">
    <Stepper label="Chiều dài (cm)" bind:value={a} min={1} max={6} />
    <Stepper label="Chiều rộng (cm)" bind:value={b} min={1} max={5} />
    <Stepper label="Chiều cao (cm)" bind:value={c} min={1} max={5} />
  </div>

  {#key `${a}-${b}-${c}`}
    <CubeStack {a} {b} {c} bind:count />
  {/key}

  <dl class="grid gap-2 text-lg tabular-nums sm:grid-cols-3">
    <div class="rounded-xl bg-slate-50 p-3">
      <dt class="text-base text-slate-600">Một lớp</dt>
      <dd class="font-semibold">{v.steps.layer} khối</dd>
    </div>
    <div class="rounded-xl bg-slate-50 p-3">
      <dt class="text-base text-slate-600">Số lớp</dt>
      <dd class="font-semibold">{fmt(c)} lớp</dd>
    </div>
    <div class="rounded-xl bg-amber-50 p-3">
      <dt class="text-base text-slate-600">Thể tích</dt>
      <dd class="font-semibold">
        {count >= v.volume ? `${fmt(v.volume)} cm³` : 'Xếp đầy để biết'}
      </dd>
    </div>
  </dl>

  <KidNote tone={note.tone} text={note.text} />
</div>
