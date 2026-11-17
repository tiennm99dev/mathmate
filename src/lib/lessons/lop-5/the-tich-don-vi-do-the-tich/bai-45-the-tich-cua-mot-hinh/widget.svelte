<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import CubePile from '../_shared/cube-pile.svelte';
  import { cubesOf } from '../_shared/cubes.js';
  import { GOAL_WORDS, TASKS, bump, cellLabel, emptyPlan, noteFor } from './engine.js';

  /** One frame for both shapes, so they are drawn to the same scale. */
  const EXTENT = { nx: 4, ny: 3, nz: 3 };

  let index = $state(0);
  let plan = $state(emptyPlan());

  const task = $derived(TASKS[index % TASKS.length]);
  const note = $derived(noteFor(task, plan));
  const mine = $derived(cubesOf(plan));

  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();
  /** @type {HTMLElement | undefined} */
  let grid = $state();

  /**
   * @param {number} r
   * @param {number} c
   */
  async function tap(r, c) {
    const wasDone = note.tone === 'ok';
    plan = bump(plan, r, c);
    if (!wasDone && noteFor(task, plan).tone === 'ok') {
      await tick();
      nextButton?.focus();
    }
  }

  async function next() {
    index += 1;
    plan = emptyPlan();
    await tick();
    grid?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Em xếp một hình có thể tích <span class="font-bold text-rose-600">{GOAL_WORDS[task.goal]}</span>
    thể tích hình {task.name}.
  </p>

  <div class="flex flex-wrap items-end justify-center gap-6">
    <figure class="flex flex-col items-center gap-1">
      <CubePile
        cubes={cubesOf(task.rows)}
        extent={EXTENT}
        cell={24}
        color="rose"
        label="Hình {task.name} xếp từ các khối lập phương nhỏ"
      />
      <figcaption class="text-lg font-bold text-rose-700">Hình {task.name}</figcaption>
    </figure>
    <figure class="flex flex-col items-center gap-1">
      <CubePile
        cubes={mine}
        extent={EXTENT}
        cell={24}
        color="sky"
        label="Hình của em xếp từ các khối lập phương nhỏ"
      />
      <figcaption class="text-lg font-bold text-sky-700">Hình của em</figcaption>
    </figure>
  </div>

  <div class="mx-auto max-w-xs">
    <p class="mb-2 text-center text-base text-slate-600">
      Mặt bằng nhìn từ trên xuống. Mỗi lần chạm vào một ô, em đặt thêm một khối lên ô đó.
    </p>
    <div
      class="grid grid-cols-3 gap-2"
      role="group"
      aria-label="Mặt bằng xếp hình, hàng trên cùng là hàng phía sau"
      bind:this={grid}
    >
      {#each plan as row, r (r)}
        {#each row as h, c (c)}
          <button
            type="button"
            class="min-h-16 rounded-xl border-2 text-2xl font-bold tabular-nums {focusRing} {h > 0
              ? 'border-sky-500 bg-sky-100 text-sky-800'
              : 'border-slate-300 bg-white text-slate-400'}"
            aria-label={cellLabel(r, c, h)}
            onclick={() => tap(r, c)}>{h}</button
          >
        {/each}
      {/each}
    </div>
    <p class="mt-1 text-center text-sm text-slate-500">Hàng dưới cùng là hàng phía trước.</p>
  </div>

  <KidNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => (plan = emptyPlan())}>Xếp lại</button
    >
    {#if note.tone === 'ok'}
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Hình khác</button
      >
    {/if}
  </div>
</div>
