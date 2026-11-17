<script>
  import Frac from '#lib/core/frac.svelte';
  import Tex from '#lib/components/tex.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '#lib/core/kid/fraction-note.svelte';
  import PieceStrip from '../_shared/piece-strip.svelte';
  import { scaleTex } from '../_shared/fractions.js';
  import { TASKS, cutState, diffNote, maxCut } from './engine.js';

  let index = $state(0);
  let k1 = $state(1);
  let k2 = $state(1);
  let crossed = $state(0);

  const task = $derived(TASKS[index % TASKS.length]);
  const cut = $derived(cutState(task, k1, k2));
  const note = $derived(diffNote(task, k1, k2, crossed));
  const rows = $derived([
    {
      d: cut.d1,
      runs: [{ count: cut.A, color: '#6366f1' }],
      crossed,
      text: note.tone === 'ok' ? `${cut.A - crossed}/${cut.d1}` : `${cut.A}/${cut.d1}`,
    },
    { d: cut.d2, runs: [{ count: cut.C, color: '#f59e0b' }], text: `${cut.C}/${cut.d2}` },
  ]);
  const stripLabel = $derived(
    `Băng trên: ${cut.A} mảnh tô màu, đã gạch ${crossed} mảnh, mỗi băng ${cut.d1} mảnh. Băng dưới: ${cut.C} mảnh tô màu, mỗi băng ${cut.d2} mảnh.`,
  );

  /** @param {number} v */
  function setK1(v) {
    k1 = v;
    crossed = 0;
  }

  /** @param {number} v */
  function setK2(v) {
    k2 = v;
    crossed = 0;
  }

  function next() {
    index += 1;
    k1 = 1;
    k2 = 1;
    crossed = 0;
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-2xl font-semibold text-slate-800">
    Tính <Frac n={task.a} d={task.b} size="lg" /> − <Frac n={task.c} d={task.d} size="lg" />
  </p>

  <PieceStrip {rows} label={stripLabel} />

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-2xl bg-indigo-50 p-3 text-center">
      <p class="text-lg text-slate-800">
        Băng trên: mỗi mảnh chia thành <strong class="text-2xl">{k1}</strong>
      </p>
      <div class="my-2 overflow-x-auto text-xl"><Tex math={scaleTex(task.a, task.b, k1)} /></div>
      <CountStepper
        name="mảnh nhỏ ở băng trên"
        value={k1}
        min={1}
        max={maxCut(task.b)}
        onchange={setK1}
      />
    </div>
    <div class="rounded-2xl bg-amber-50 p-3 text-center">
      <p class="text-lg text-slate-800">
        Băng dưới: mỗi mảnh chia thành <strong class="text-2xl">{k2}</strong>
      </p>
      <div class="my-2 overflow-x-auto text-xl"><Tex math={scaleTex(task.c, task.d, k2)} /></div>
      <CountStepper
        name="mảnh nhỏ ở băng dưới"
        value={k2}
        min={1}
        max={maxCut(task.d)}
        onchange={setK2}
      />
    </div>
  </div>

  <div class="rounded-2xl bg-rose-50 p-3 text-center">
    <p class="text-lg text-slate-800">
      Gạch bớt ở băng trên: <strong class="text-2xl">{crossed}</strong> mảnh
    </p>
    <CountStepper
      name="mảnh gạch bớt"
      value={crossed}
      min={0}
      max={cut.same ? cut.A : 0}
      onchange={(v) => (crossed = v)}
    />
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {note.tone === 'ok' ? button.primary : button.secondary}"
      onclick={next}>Phép trừ khác</button
    >
  </div>
</div>
