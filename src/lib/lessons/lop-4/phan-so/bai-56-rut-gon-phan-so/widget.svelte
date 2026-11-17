<script>
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionBars from '#lib/core/visuals/fraction-bars.svelte';
  import FractionNote from '#lib/core/kid/fraction-note.svelte';
  import { TABLE_DIVISORS } from '../_shared/fractions.js';
  import {
    TASKS,
    chainTex,
    current,
    hintDivisors,
    isDone,
    reduceNote,
    startState,
    tryDivide,
  } from './engine.js';

  let index = $state(0);
  let progress = $state(startState(TASKS[0]));
  let showHint = $state(false);

  const task = $derived(TASKS[index % TASKS.length]);
  const now = $derived(current(progress));
  const done = $derived(isDone(progress));
  const note = $derived(reduceNote(progress));
  const hint = $derived(showHint && !done ? hintDivisors(progress) : []);
  const bars = $derived([
    { numerator: task.n, denominator: task.d, label: `${task.n}/${task.d}` },
    { numerator: now.n, denominator: now.d, label: `${now.n}/${now.d}`, color: '#f59e0b' },
  ]);

  /** @param {number} k */
  function pick(k) {
    progress = tryDivide(progress, k);
    showHint = false;
  }

  function next() {
    index += 1;
    progress = startState(TASKS[index % TASKS.length]);
    showHint = false;
  }

  /** @param {number} k */
  function divisorClass(k) {
    if (hint.includes(k)) return 'border-emerald-500 bg-emerald-100 text-emerald-900';
    if (progress.misses.includes(k))
      return 'border-amber-400 bg-amber-50 text-amber-800 line-through';
    return 'border-slate-300 bg-white text-slate-800';
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Rút gọn phân số đến phân số tối giản
  </p>

  <div class="overflow-x-auto text-center text-2xl" aria-live="polite">
    <Tex math={chainTex(progress)} />
  </div>

  <FractionBars
    {bars}
    interactive={false}
    label="Băng trên: {task.n}/{task.d}. Băng dưới: {now.n}/{now.d}. Phần tô màu dài bằng nhau."
  />

  <div>
    <p class="mb-2 text-center text-lg text-slate-700">Chia cả tử số và mẫu số cho:</p>
    <div
      class="grid grid-cols-4 gap-2 sm:grid-cols-8"
      role="group"
      aria-label="Chọn số để chia cả tử số và mẫu số"
    >
      {#each TABLE_DIVISORS as k (k)}
        <button
          type="button"
          class="min-h-12 rounded-xl border-2 text-2xl font-bold disabled:opacity-50 {divisorClass(
            k,
          )}"
          disabled={done}
          aria-label="Chia cho {k}{progress.misses.includes(k)
            ? ', không chia được'
            : hint.includes(k)
              ? ', gợi ý'
              : ''}"
          onclick={() => pick(k)}>{k}</button
        >
      {/each}
    </div>
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={done}
      onclick={() => (showHint = true)}>Tô màu số chia được</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={progress.chain.length === 1 && progress.misses.length === 0}
      onclick={() => {
        progress = startState(task);
        showHint = false;
      }}>Làm lại</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.secondary}"
      onclick={next}>Phân số khác</button
    >
  </div>
</div>
