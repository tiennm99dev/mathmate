<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import { button } from '#lib/core/ui.js';
  import {
    TABLES,
    TASKS,
    cellsAt,
    givenText,
    isTaught,
    noteAt,
    slideFrom,
    startCol,
    unitsOf,
    valueIn,
  } from './engine.js';

  let index = $state(0);
  let col = $state(startCol(TASKS[0]));

  const task = $derived(TASKS[index % TASKS.length]);
  const units = $derived(unitsOf(task));
  const cells = $derived(cellsAt(task, col));
  const note = $derived(noteAt(task, col));

  const leftmost = $derived(slideFrom(task, col, -1) === col);
  const rightmost = $derived(slideFrom(task, col, 1) === col);

  /** @param {-1 | 1} step */
  function slide(step) {
    col = slideFrom(task, col, step);
    passFocus(step < 0 ? left : right, step < 0 ? right : left);
  }

  /** @type {HTMLButtonElement | undefined} */
  let left = $state();
  /** @type {HTMLButtonElement | undefined} */
  let right = $state();

  async function next() {
    index += 1;
    col = startCol(TASKS[index % TASKS.length]);
    await tick();
    left?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Viết <span class="font-bold text-slate-900">{givenText(task)}</span> theo đơn vị
    <span class="font-bold text-rose-600">{task.target}</span>
  </p>

  <div class="overflow-x-auto">
    <table
      class="mx-auto w-full max-w-lg table-fixed border-collapse text-center"
      aria-label="Bảng đơn vị đo {TABLES[task.table].name.toLowerCase()}, dấu phẩy sau cột {units[
        col
      ]}"
    >
      <thead>
        <tr>
          {#each units as u, i (u)}
            <th
              scope="col"
              class="border border-slate-300 px-0 py-2 text-base font-bold {i === col
                ? 'bg-rose-100 text-rose-700'
                : 'bg-slate-50 text-slate-700'}">{isTaught(task, i) ? u : ''}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          {#each cells as d, i (i)}
            <td
              class="relative h-16 border border-slate-300 text-3xl font-bold tabular-nums {i ===
              col
                ? 'bg-rose-50'
                : ''}"
            >
              {d}
              {#if i === col && i < units.length - 1 && cells[i + 1] !== ''}
                <span
                  class="absolute -right-1.5 bottom-1 z-10 text-4xl leading-none font-black text-rose-600"
                  aria-hidden="true">,</span
                >
              {/if}
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums" aria-hidden="true">
    {valueIn(task, col)}
    {units[col]}
  </p>

  <div class="grid grid-cols-2 gap-2" role="group" aria-label="Dời dấu phẩy">
    <button
      type="button"
      class="min-h-14 text-lg {button.secondary}"
      bind:this={left}
      disabled={leftmost}
      onclick={() => slide(-1)}>← Dời sang trái</button
    >
    <button
      type="button"
      class="min-h-14 text-lg {button.secondary}"
      bind:this={right}
      disabled={rightmost}
      onclick={() => slide(1)}>Dời sang phải →</button
    >
  </div>

  <p class="text-center text-base text-slate-600">
    Chữ số hàng đơn vị nằm ở cột đơn vị đo. Dấu phẩy đứng ngay sau cột đó.
  </p>

  <KidNote tone={note.ok ? 'ok' : 'info'} text={note.text} />

  {#if note.ok}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Số đo khác
      </button>
    </div>
  {/if}
</div>
