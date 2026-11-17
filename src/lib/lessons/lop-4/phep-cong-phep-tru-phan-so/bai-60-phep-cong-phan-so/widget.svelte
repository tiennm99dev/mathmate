<script>
  import Frac from '#lib/core/frac.svelte';
  import Tex from '#lib/components/tex.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '../_shared/fraction-note.svelte';
  import PieceStrip from '../_shared/piece-strip.svelte';
  import { scaleTex } from '../_shared/fractions.js';
  import { TASKS, cutState, maxCut, optionWords, sumNote, sumOptions } from './engine.js';

  const TOP = '#6366f1';
  const BOTTOM = '#f59e0b';

  let index = $state(0);
  let k1 = $state(1);
  let k2 = $state(1);
  let step = $state(/** @type {'read' | 'wrong' | 'miscount' | 'right'} */ ('read'));
  /** @type {number[]} */
  let tried = $state([]);

  const task = $derived(TASKS[index % TASKS.length]);
  const cut = $derived(cutState(task, k1, k2));
  const choice = $derived(sumOptions(task, cut.A, cut.C, cut.d1));
  const note = $derived(sumNote(task, k1, k2, step));
  const rows = $derived([
    { d: cut.d1, runs: [{ count: cut.A, color: TOP }], text: `${cut.A}/${cut.d1}` },
    { d: cut.d2, runs: [{ count: cut.C, color: BOTTOM }], text: `${cut.C}/${cut.d2}` },
    ...(cut.same
      ? [
          {
            d: cut.d1,
            runs: [
              { count: cut.A, color: TOP },
              { count: cut.C, color: BOTTOM },
            ],
            text: step === 'right' ? `${cut.A + cut.C}/${cut.d1}` : '?',
          },
        ]
      : []),
  ]);
  const stripLabel = $derived(
    `Băng trên: ${cut.A} mảnh tô màu, mỗi băng ${cut.d1} mảnh. Băng dưới: ${cut.C} mảnh tô màu, mỗi băng ${cut.d2} mảnh.` +
      (cut.same
        ? step === 'right'
          ? ` Băng tổng: ${cut.A + cut.C} mảnh tô màu, mỗi băng ${cut.d1} mảnh.`
          : ` Băng tổng: ${cut.A} mảnh của băng trên ghép với ${cut.C} mảnh của băng dưới, mỗi băng ${cut.d1} mảnh.`
        : ''),
  );

  /** @param {number} v */
  function setK1(v) {
    k1 = v;
    step = 'read';
    tried = [];
  }

  /** @param {number} v */
  function setK2(v) {
    k2 = v;
    step = 'read';
    tried = [];
  }

  /** @param {number} i */
  function pick(i) {
    if (step === 'right') return;
    if (i === choice.answer) step = 'right';
    else {
      step = choice.options[i].d === cut.d1 ? 'miscount' : 'wrong';
      tried = [...tried, i];
    }
  }

  function next() {
    index += 1;
    k1 = 1;
    k2 = 1;
    step = 'read';
    tried = [];
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-2xl font-semibold text-slate-800">
    Tính <Frac n={task.a} d={task.b} size="lg" /> + <Frac n={task.c} d={task.d} size="lg" />
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

  {#if cut.same}
    <div
      class="flex flex-wrap justify-center gap-3"
      role="group"
      aria-label="Băng tổng chỉ phân số"
    >
      {#each choice.options as f, i (`${f.n}/${f.d}`)}
        <button
          type="button"
          class="min-h-16 min-w-20 text-xl {step === 'right' && i === choice.answer
            ? button.primary
            : button.quiet} {tried.includes(i) ? 'opacity-50' : ''}"
          aria-label={tried.includes(i) ? `${optionWords(f)}, chưa đúng` : optionWords(f)}
          onclick={() => pick(i)}><Frac n={f.n} d={f.d} size="lg" /></button
        >
      {/each}
    </div>
  {/if}

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {step === 'right' ? button.primary : button.secondary}"
      onclick={next}>Phép cộng khác</button
    >
  </div>
</div>
