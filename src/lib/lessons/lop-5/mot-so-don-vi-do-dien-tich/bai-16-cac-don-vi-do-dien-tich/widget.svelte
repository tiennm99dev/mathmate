<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    HEADINGS,
    TASKS,
    givenText,
    noteAt,
    startCol,
    stepLines,
    unitAt,
    valueAt,
  } from './engine.js';

  let index = $state(0);
  let col = $state(startCol(TASKS[0]));

  const task = $derived(TASKS[index % TASKS.length]);
  const note = $derived(noteAt(task, col));
  const steps = $derived(stepLines(task, col));
  const from = $derived(startCol(task));

  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();
  /** @type {HTMLElement | undefined} */
  let table = $state();

  /** @param {number} i */
  async function choose(i) {
    col = i;
    if (noteAt(task, i).tone === 'ok') {
      await tick();
      nextButton?.focus();
    }
  }

  async function next() {
    index += 1;
    col = startCol(TASKS[index % TASKS.length]);
    await tick();
    table?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Đổi <span class="font-bold text-slate-900">{givenText(task)}</span> ra
    <span class="font-bold text-rose-600">{task.to}</span>
  </p>

  <div class="overflow-x-auto pb-1">
    <div
      class="mx-auto grid min-w-[24rem] max-w-lg grid-cols-7 gap-1"
      role="group"
      aria-label="Bảng đơn vị đo diện tích, lớn ở bên trái, bé ở bên phải"
      bind:this={table}
    >
      {#each HEADINGS as h, i (h)}
        <button
          type="button"
          class="flex min-h-16 flex-col items-center justify-center rounded-xl border-2 px-0 text-sm leading-tight font-bold {focusRing} {i ===
          col
            ? 'border-rose-500 bg-rose-100 text-rose-700'
            : i === from
              ? 'border-sky-400 bg-sky-50 text-slate-800'
              : 'border-slate-300 bg-white text-slate-700'}"
          aria-pressed={i === col}
          aria-label="Đổi ra {unitAt(task, i)}"
          onclick={() => choose(i)}
        >
          {#each h.split(' ') as part (part)}<span>{part}</span>{/each}
        </button>
      {/each}
    </div>
  </div>

  <p class="text-center text-base text-slate-600">
    Sang phải một cột: nhân với 100. Sang trái một cột: chia cho 100.
  </p>

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums" aria-hidden="true">
    {valueAt(task, col)}
    {unitAt(task, col)}
  </p>

  {#if steps.length}
    <ol class="mx-auto max-w-md space-y-1 rounded-2xl bg-sky-50 px-4 py-3 text-lg text-slate-800">
      {#each steps as line, i (i)}
        <li class="tabular-nums">{line}</li>
      {/each}
    </ol>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if note.tone === 'ok'}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Số đo khác</button
      >
    </div>
  {/if}
</div>
