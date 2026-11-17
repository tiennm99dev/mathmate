<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '../_shared/fraction-note.svelte';
  import FractionShape from '../_shared/fraction-shape.svelte';
  import { SHAPE_NAMES, TASKS, askText, countOn, shadeNote, toggle } from './engine.js';

  const COLOR = '#f59e0b';

  let index = $state(0);
  let shaded = $state(TASKS[0].parts > 0 ? Array(TASKS[0].parts).fill(false) : []);

  const task = $derived(TASKS[index % TASKS.length]);
  const count = $derived(countOn(shaded));
  const note = $derived(shadeNote(task, count));
  const done = $derived(note.tone === 'ok');
  const fills = $derived(shaded.map((on) => (on ? COLOR : null)));

  function next() {
    index += 1;
    shaded = Array(TASKS[index % TASKS.length].parts).fill(false);
  }
</script>

<div class="space-y-4">
  <p class="text-center text-2xl font-bold text-slate-800">
    <LiveRichText text={askText(task)} />
  </p>

  <FractionShape
    shape={task.shape}
    parts={task.parts}
    cols={task.cols}
    {fills}
    label="{SHAPE_NAMES[task.shape]} chia {task.parts} phần bằng nhau, đã tô {count} phần"
    partLabel={(i) => `Phần ${i + 1} trong ${task.parts} phần`}
    ontoggle={(i) => (shaded = toggle(shaded, i))}
  />

  <div class="flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-amber-50 p-4">
    <div class="text-4xl text-indigo-800">
      <Frac n={count} d={task.parts} size="lg" />
    </div>
    <ul class="space-y-1 text-lg text-slate-800">
      <li><strong>Tử số {count}</strong>: số phần đã tô màu.</li>
      <li><strong>Mẫu số {task.parts}</strong>: số phần bằng nhau của cả hình.</li>
    </ul>
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      disabled={count === 0}
      onclick={() => (shaded = shaded.map(() => false))}>Xoá màu</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {done ? button.primary : button.secondary}"
      onclick={next}>Hình khác</button
    >
  </div>
</div>
