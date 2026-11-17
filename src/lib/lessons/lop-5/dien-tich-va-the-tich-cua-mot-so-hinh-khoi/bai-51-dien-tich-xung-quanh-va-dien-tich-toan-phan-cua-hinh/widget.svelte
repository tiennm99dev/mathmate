<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import FoldButtons from '../_shared/fold-buttons.svelte';
  import FoldView from '../_shared/fold-view.svelte';
  import { boxPieces } from '../_shared/fold.js';
  import { cubeAreas } from '../_shared/measures.js';

  /**
   * A cube the child sizes, as its net or folded, with 1 cm squares on every
   * face. The child lights one face, the four lateral faces or all six, and
   * sees the area grow as one face × 4 and one face × 6.
   */

  let a = $state(3);
  let t = $state(0);
  let part = $state(/** @type {string | number} */ ('mot-mat'));

  const pieces = $derived(boxPieces(a, a, a, true));
  const s = $derived(cubeAreas(a));
  const lit = $derived(
    part === 'mot-mat'
      ? ['truoc']
      : part === 'xung-quanh'
        ? pieces.filter((p) => p.role === 'xung-quanh').map((p) => p.id)
        : null,
  );

  const note = $derived(
    part === 'mot-mat'
      ? `Một mặt là hình vuông cạnh ${fmt(a)} cm, có ${fmt(s.face)} ô vuông 1 cm². Diện tích một mặt là ${s.steps.face} (cm²).`
      : part === 'xung-quanh'
        ? `Bốn mặt xung quanh là 4 hình vuông bằng nhau. Diện tích xung quanh là ${s.steps.lateral} (cm²).`
        : `Sáu mặt là 6 hình vuông bằng nhau. Diện tích toàn phần là ${s.steps.total} (cm²).`,
  );
</script>

<div class="space-y-4">
  <Stepper label="Cạnh hình lập phương (cm)" bind:value={a} min={1} max={6} />

  <SegmentedControl
    label="Tô màu"
    options={[
      { value: 'mot-mat', label: 'Một mặt' },
      { value: 'xung-quanh', label: 'Mặt xung quanh' },
      { value: 'toan-phan', label: 'Cả 6 mặt' },
    ]}
    bind:value={part}
  />

  <FoldView
    {pieces}
    {t}
    {lit}
    label="Hình lập phương cạnh {fmt(a)} cm, mỗi mặt chia thành ô vuông 1 cm²"
  />

  <FoldButtons bind:t />

  <dl class="grid gap-2 text-lg tabular-nums sm:grid-cols-3">
    <div class="rounded-xl p-3 {part === 'mot-mat' ? 'bg-sky-100' : 'bg-slate-50'}">
      <dt class="text-base text-slate-600">Một mặt</dt>
      <dd class="font-semibold">{s.steps.face} (cm²)</dd>
    </div>
    <div class="rounded-xl p-3 {part === 'xung-quanh' ? 'bg-sky-100' : 'bg-slate-50'}">
      <dt class="text-base text-slate-600">Diện tích xung quanh</dt>
      <dd class="font-semibold">{s.steps.lateral} (cm²)</dd>
    </div>
    <div class="rounded-xl p-3 {part === 'toan-phan' ? 'bg-emerald-100' : 'bg-slate-50'}">
      <dt class="text-base text-slate-600">Diện tích toàn phần</dt>
      <dd class="font-semibold">{s.steps.total} (cm²)</dd>
    </div>
  </dl>

  <KidNote tone="info" text={note} />
</div>
