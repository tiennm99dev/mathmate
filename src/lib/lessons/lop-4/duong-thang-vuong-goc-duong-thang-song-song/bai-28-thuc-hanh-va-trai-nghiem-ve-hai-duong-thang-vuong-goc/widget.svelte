<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { setSquare } from '../_shared/lines.js';
  import SlideBoard from '../_shared/slide-board.svelte';
  import {
    NAMES,
    STEP,
    TASKS,
    caseText,
    drawMessage,
    pointOf,
    sideOf,
    slideMessage,
  } from './engine.js';

  let index = $state(0);
  let s = $state(TASKS[0].start);
  /** @type {number | null} */
  let drawnAt = $state(null);

  const task = $derived(TASKS[index]);
  const point = $derived(pointOf(task));
  const side = $derived(sideOf(task));
  const result = $derived(drawnAt === null ? null : drawMessage(task, drawnAt));
  /** @type {'ok' | 'warn' | 'info'} */
  const tone = $derived(result ? (result.done ? 'ok' : 'warn') : 'info');
  const noteText = $derived(result ? result.text : slideMessage(task, s).text);
  const drawn = $derived.by(() => {
    if (drawnAt === null) return [];
    const sq = setSquare(task.base, drawnAt, side);
    const done = drawnAt === task.target;
    return [
      {
        p: sq.corner,
        deg: sq.legDeg,
        color: done ? '#059669' : '#DC2626',
        names: done ? /** @type {const} */ (['C', 'D']) : undefined,
      },
    ];
  });

  function draw() {
    drawnAt = s;
  }

  function next() {
    index = (index + 1) % TASKS.length;
    s = TASKS[index].start;
    drawnAt = null;
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Vẽ đường thẳng CD đi qua điểm M và <strong class="text-indigo-700">vuông góc</strong> với đường thẳng
    AB.
  </p>
  <p class="text-center text-lg text-slate-700">
    Hình {index + 1}/{TASKS.length}. {caseText(task)}
  </p>

  <SlideBoard
    base={task.base}
    names={NAMES}
    len={task.len}
    {point}
    pointName="M"
    {side}
    bind:s
    min={0}
    max={task.len}
    step={STEP}
    {drawn}
    label="Đường thẳng AB, điểm M và một chiếc ê ke có một cạnh góc vuông nằm trên AB. {caseText(
      task,
    )}"
    onslide={() => (drawnAt = null)}
  />

  <KidNote {tone} text={noteText} />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {result?.done ? button.secondary : button.primary}"
      onclick={draw}>Vẽ theo cạnh ê ke</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {result?.done ? button.primary : button.secondary}"
      onclick={next}>Hình khác</button
    >
  </div>
</div>
