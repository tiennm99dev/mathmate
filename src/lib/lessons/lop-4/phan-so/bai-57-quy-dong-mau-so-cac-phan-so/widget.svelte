<script>
  import Frac from '#lib/core/frac.svelte';
  import Tex from '#lib/components/tex.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import FractionNote from '../_shared/fraction-note.svelte';
  import { TASKS, commonNote, cutTex, isGivenCommon, maxCut } from './engine.js';

  let index = $state(0);
  let k1 = $state(1);
  let k2 = $state(1);

  const task = $derived(TASKS[index % TASKS.length]);
  const d1 = $derived(task.b * k1);
  const d2 = $derived(task.d * k2);
  const note = $derived(commonNote(task, k1, k2));
  const bars = $derived([
    { numerator: task.a * k1, denominator: d1, label: `${task.a * k1}/${d1}` },
    { numerator: task.c * k2, denominator: d2, label: `${task.c * k2}/${d2}`, color: '#f59e0b' },
  ]);

  function next() {
    index += 1;
    k1 = 1;
    k2 = 1;
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-xl font-semibold text-slate-800">
    Quy đồng mẫu số <Frac n={task.a} d={task.b} size="lg" /> và <Frac
      n={task.c}
      d={task.d}
      size="lg"
    />
    {#if isGivenCommon(task)}
      với mẫu số chung là <strong class="text-2xl text-indigo-700">{task.common}</strong>
    {/if}
  </p>

  <FractionBars
    {bars}
    interactive={false}
    label="Băng trên: {task.a * k1}/{d1}. Băng dưới: {task.c * k2}/{d2}."
  />

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-2xl bg-indigo-50 p-3 text-center">
      <p class="text-lg text-slate-800">
        Băng trên: mỗi phần chia thành <strong class="text-2xl">{k1}</strong>
      </p>
      <div class="my-2 overflow-x-auto text-xl"><Tex math={cutTex(task.a, task.b, k1)} /></div>
      <CountStepper
        name="phần nhỏ ở băng trên"
        value={k1}
        min={1}
        max={maxCut(task.b)}
        onchange={(v) => (k1 = v)}
      />
    </div>
    <div class="rounded-2xl bg-amber-50 p-3 text-center">
      <p class="text-lg text-slate-800">
        Băng dưới: mỗi phần chia thành <strong class="text-2xl">{k2}</strong>
      </p>
      <div class="my-2 overflow-x-auto text-xl"><Tex math={cutTex(task.c, task.d, k2)} /></div>
      <CountStepper
        name="phần nhỏ ở băng dưới"
        value={k2}
        min={1}
        max={maxCut(task.d)}
        onchange={(v) => (k2 = v)}
      />
    </div>
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {note.tone === 'ok' ? button.primary : button.secondary}"
      onclick={next}>Hai phân số khác</button
    >
  </div>
</div>
