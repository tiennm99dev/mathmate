<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import FoldButtons from '../_shared/fold-buttons.svelte';
  import FoldView from '../_shared/fold-view.svelte';
  import { boxPieces } from '../_shared/fold.js';
  import { boxAreas } from '../_shared/measures.js';

  /**
   * A box the child sizes, shown as its net (or folded) with 1 cm squares on
   * every face. Picking "Mặt xung quanh" or "Hai mặt đáy" fades the other
   * faces, so the four lateral faces show as one long rectangle: its length
   * is the perimeter of the base and its width the height.
   */

  let a = $state(5);
  let b = $state(3);
  let c = $state(4);
  let t = $state(0);
  let part = $state(/** @type {string | number} */ ('xung-quanh'));

  const pieces = $derived(boxPieces(a, b, c, true));
  const s = $derived(boxAreas(a, b, c));
  const lit = $derived(
    part === 'toan-phan' ? null : pieces.filter((p) => p.role === part).map((p) => p.id),
  );

  const note = $derived.by(() => {
    if (part === 'xung-quanh') {
      return t <= 0
        ? `Bốn mặt xung quanh (màu xanh) ghép thành một hình chữ nhật dài ${fmt(s.perimeter)} cm, bằng chu vi mặt đáy, và rộng ${fmt(c)} cm, bằng chiều cao. Diện tích xung quanh là ${fmt(s.lateral)} cm².`
        : `Bốn mặt xung quanh (màu xanh) bao quanh hình hộp. Diện tích xung quanh là ${fmt(s.lateral)} cm².`;
    }
    if (part === 'day') {
      return `Hai mặt đáy (màu vàng) bằng nhau, mỗi mặt ${fmt(s.base)} cm². Hai mặt đáy là ${fmt(s.base * 2)} cm².`;
    }
    return `Cả 6 mặt: diện tích xung quanh ${fmt(s.lateral)} cm² cộng diện tích hai đáy ${fmt(s.base * 2)} cm². Diện tích toàn phần là ${fmt(s.total)} cm².`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-2 sm:grid-cols-3">
    <Stepper
      label="Chiều dài (cm)"
      bind:value={a}
      min={1}
      max={7}
      onchange={(v) => (b = Math.min(b, v))}
    />
    <Stepper label="Chiều rộng (cm)" bind:value={b} min={1} max={Math.min(6, a)} />
    <Stepper label="Chiều cao (cm)" bind:value={c} min={1} max={6} />
  </div>

  <SegmentedControl
    label="Tô màu"
    options={[
      { value: 'xung-quanh', label: 'Mặt xung quanh' },
      { value: 'day', label: 'Hai mặt đáy' },
      { value: 'toan-phan', label: 'Cả 6 mặt' },
    ]}
    bind:value={part}
  />

  <FoldView
    {pieces}
    {t}
    {lit}
    label="Hình hộp chữ nhật dài {fmt(a)} cm, rộng {fmt(b)} cm, cao {fmt(
      c,
    )} cm, mỗi mặt chia thành ô vuông 1 cm²"
  />

  <FoldButtons bind:t />

  <dl class="grid gap-2 text-lg tabular-nums sm:grid-cols-2">
    <div class="rounded-xl bg-slate-50 p-3">
      <dt class="text-base text-slate-600">Chu vi mặt đáy</dt>
      <dd class="font-semibold">{s.steps.perimeter} (cm)</dd>
    </div>
    <div class="rounded-xl p-3 {part === 'xung-quanh' ? 'bg-sky-100' : 'bg-slate-50'}">
      <dt class="text-base text-slate-600">Diện tích xung quanh</dt>
      <dd class="font-semibold">{s.steps.lateral} (cm²)</dd>
    </div>
    <div class="rounded-xl p-3 {part === 'day' ? 'bg-amber-100' : 'bg-slate-50'}">
      <dt class="text-base text-slate-600">Diện tích một mặt đáy</dt>
      <dd class="font-semibold">{s.steps.base} (cm²)</dd>
    </div>
    <div class="rounded-xl p-3 {part === 'toan-phan' ? 'bg-emerald-100' : 'bg-slate-50'}">
      <dt class="text-base text-slate-600">Diện tích toàn phần</dt>
      <dd class="font-semibold">{s.steps.total} (cm²)</dd>
    </div>
  </dl>

  <KidNote tone="info" text={note} />
</div>
