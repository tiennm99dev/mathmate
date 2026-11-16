<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Frac from '#lib/core/frac.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { CELLS, SIDE, TASKS, gridNote, nudge, tapAt } from './engine.js';

  const CELL = 30;
  const SIZE = CELL * SIDE;

  let index = $state(0);
  let count = $state(0);
  let mode = $state(/** @type {'columns' | 'cells'} */ ('columns'));

  const task = $derived(TASKS[index % TASKS.length]);
  const note = $derived(gridNote(count, task));
  const found = $derived(note.tone === 'ok');

  /** @param {PointerEvent} event */
  function tap(event) {
    const svg = /** @type {SVGSVGElement} */ (event.currentTarget);
    const box = svg.getBoundingClientRect();
    // The view box has a margin of 2 units around the grid.
    const col = Math.floor((((event.clientX - box.left) / box.width) * (SIZE + 4) - 2) / CELL);
    const row = Math.floor((((event.clientY - box.top) / box.height) * (SIZE + 4) - 2) / CELL);
    if (col < 0 || col >= SIDE || row < 0 || row >= SIDE) return;
    count = tapAt(count, mode, col, row);
  }

  /** @param {number} step */
  function step(step) {
    count = nudge(count, step);
  }

  function next() {
    index += 1;
    count = 0;
  }

  /** @param {number} i cell index counted down each column */
  const shaded = (i) => i < count;
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-xl font-semibold text-slate-800">
    Em tô <Frac n={task.n} d={task.d} size="lg" /> hình vuông
  </p>

  <SegmentedControl
    label="Cách tô"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'columns', label: 'Tô từng cột (phần mười)' },
      { value: 'cells', label: 'Tô từng ô (phần trăm)' },
    ]}
  />

  <!-- Tapping the grid is a pointer shortcut; the buttons below are the keyboard route. -->
  <svg
    viewBox="-2 -2 {SIZE + 4} {SIZE + 4}"
    class="mx-auto block w-full max-w-sm cursor-pointer touch-none select-none"
    role="img"
    aria-label="Hình vuông chia 100 ô, đã tô {count} ô"
    onpointerdown={tap}
  >
    {#each { length: CELLS } as _, i (i)}
      {@const col = Math.floor(i / SIDE)}
      {@const row = i % SIDE}
      <rect
        x={col * CELL}
        y={row * CELL}
        width={CELL}
        height={CELL}
        fill={shaded(i) ? '#f59e0b' : '#fff'}
        stroke="#94a3b8"
        stroke-width="1"
      />
    {/each}
    {#each { length: SIDE + 1 } as _, c (c)}
      <line x1={c * CELL} y1="0" x2={c * CELL} y2={SIZE} stroke="#334155" stroke-width="2" />
    {/each}
    <rect x="0" y="0" width={SIZE} height={SIZE} fill="none" stroke="#0f172a" stroke-width="3" />
  </svg>

  <div class="grid grid-cols-4 gap-2" role="group" aria-label="Tô thêm hoặc bớt">
    <button
      type="button"
      class="min-h-14 px-1 text-base whitespace-nowrap {button.quiet}"
      onclick={() => step(-10)}>− 1 cột</button
    >
    <button
      type="button"
      class="min-h-14 px-1 text-base whitespace-nowrap {button.quiet}"
      onclick={() => step(-1)}>− 1 ô</button
    >
    <button
      type="button"
      class="min-h-14 px-1 text-base whitespace-nowrap {button.secondary}"
      onclick={() => step(1)}>+ 1 ô</button
    >
    <button
      type="button"
      class="min-h-14 px-1 text-base whitespace-nowrap {button.secondary}"
      onclick={() => step(10)}>+ 1 cột</button
    >
  </div>

  <p class="text-center text-base text-slate-600">
    Mỗi cột là một phần mười, mỗi ô là một phần trăm của hình vuông.
  </p>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if found}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Phân số khác
      </button>
    </div>
  {/if}
</div>
