<script>
  import Frac from '#lib/core/frac.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import FractionNote from '../_shared/fraction-note.svelte';
  import { TASKS, cutFraction, cutNote, maxCut, startCut } from './engine.js';

  let index = $state(0);
  let k = $state(startCut(TASKS[0]));

  const task = $derived(TASKS[index % TASKS.length]);
  const shown = $derived(cutFraction(task, k));
  const top = $derived(maxCut(task));
  const note = $derived(cutNote(task, k));
  const found = $derived(note.tone === 'ok');
  const bars = $derived([
    { numerator: task.n, denominator: task.d, label: `${task.n}/${task.d}` },
    { numerator: shown.n, denominator: shown.d, label: `${shown.n}/${shown.d}`, color: '#f59e0b' },
  ]);

  /** @param {number} delta */
  function cut(delta) {
    k = Math.min(top, Math.max(1, k + delta));
  }

  function next() {
    index += 1;
    k = startCut(TASKS[index % TASKS.length]);
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-xl font-semibold text-slate-800">
    Tìm phân số bằng <Frac n={task.n} d={task.d} size="lg" /> có mẫu số là
    <strong class="text-2xl text-indigo-700">{task.want}</strong>
  </p>

  <FractionBars
    {bars}
    interactive={false}
    label="Băng trên: {task.n}/{task.d}. Băng dưới: {shown.n}/{shown.d}."
  />

  <div
    class="flex flex-wrap items-center justify-center gap-3"
    role="group"
    aria-label="Chia nhỏ hoặc gộp băng dưới"
  >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={k <= 1}
      onclick={() => cut(-1)}>Gộp bớt</button
    >
    <span class="min-w-28 text-center text-lg font-semibold text-slate-700">
      Băng dưới: {shown.d} phần
    </span>
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={k >= top}
      onclick={() => cut(1)}>Chia nhỏ thêm</button
    >
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {found ? button.primary : button.quiet}"
      onclick={next}>Phân số khác</button
    >
  </div>
</div>
