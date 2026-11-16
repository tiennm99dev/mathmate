<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { pointAt } from '../_shared/lines.js';
  import SlideBoard from '../_shared/slide-board.svelte';
  import { STEP, TASKS, drawMessage, drawnLine, pointOf, slideMessage, stageOf } from './engine.js';

  let index = $state(0);
  let step = $state(/** @type {1 | 2} */ (1));
  let finished = $state(false);
  let s = $state(TASKS[0].start1);
  /** @type {number | null} */
  let drawnAt = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let said = $state(null);

  const task = $derived(TASKS[index]);
  const point = $derived(pointOf(task));
  const stage = $derived(stageOf(task, step));
  const note = $derived(said ?? { tone: 'info', text: slideMessage(step, stage, s) });

  const lines = $derived.by(() => {
    /** @type {import('svelte').ComponentProps<typeof SlideBoard>['drawn']} */
    const out = [];
    if (step === 2) {
      const ab = task.base;
      out.push({
        p: ab.o,
        deg: ab.deg,
        color: '#4F46E5',
        names: ['A', 'B'],
        at: [pointAt(ab, 0), pointAt(ab, task.len)],
      });
    }
    if (drawnAt !== null) {
      const l = drawnLine(stage, drawnAt);
      const right = finished;
      out.push({
        ...l,
        color: right ? '#059669' : '#DC2626',
        names: right ? /** @type {const} */ (['C', 'D']) : undefined,
      });
    }
    return out;
  });

  function draw() {
    if (finished) return;
    const result = drawMessage(step, stage, s);
    said = { tone: result.done ? 'ok' : 'warn', text: result.text };
    if (result.done && step === 1) {
      step = 2;
      s = stageOf(task, 2).start;
      drawnAt = null;
      return;
    }
    drawnAt = s;
    finished = result.done && step === 2;
  }

  function onslide() {
    if (finished) return;
    drawnAt = null;
    said = null;
  }

  function next() {
    index = (index + 1) % TASKS.length;
    step = 1;
    finished = false;
    s = TASKS[index].start1;
    drawnAt = null;
    said = null;
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Vẽ đường thẳng CD đi qua điểm H và <strong class="text-indigo-700">song song</strong> với đường thẳng
    AB.
  </p>
  <ol class="mx-auto flex max-w-xl flex-wrap justify-center gap-2 text-base font-semibold">
    <li
      class="rounded-full px-3 py-1 {step === 1
        ? 'bg-indigo-100 text-indigo-900'
        : 'bg-emerald-100 text-emerald-900'}"
      aria-current={step === 1 ? 'step' : undefined}
    >
      Bước 1: vẽ MN qua H, vuông góc với AB
    </li>
    <li
      class="rounded-full px-3 py-1 {finished
        ? 'bg-emerald-100 text-emerald-900'
        : step === 2
          ? 'bg-indigo-100 text-indigo-900'
          : 'bg-slate-100 text-slate-600'}"
      aria-current={step === 2 && !finished ? 'step' : undefined}
    >
      Bước 2: vẽ CD qua H, vuông góc với MN
    </li>
  </ol>

  <SlideBoard
    base={stage.base}
    names={stage.names}
    len={stage.len}
    {point}
    pointName="H"
    side={stage.side}
    bind:s
    min={0}
    max={stage.len}
    step={STEP}
    drawn={lines}
    label={step === 1
      ? 'Đường thẳng AB, điểm H ở ngoài AB và một chiếc ê ke có một cạnh góc vuông nằm trên AB.'
      : 'Đường thẳng AB, đường thẳng MN đi qua H và vuông góc với AB, và một chiếc ê ke có một cạnh góc vuông nằm trên MN.'}
    {onslide}
  />

  <KidNote
    tone={note.tone === 'info' ? 'info' : note.tone === 'ok' ? 'ok' : 'warn'}
    text={note.text}
  />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {finished ? button.secondary : button.primary}"
      onclick={draw}>Vẽ theo cạnh ê ke</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {finished ? button.primary : button.secondary}"
      onclick={next}>Hình khác</button
    >
  </div>
</div>
