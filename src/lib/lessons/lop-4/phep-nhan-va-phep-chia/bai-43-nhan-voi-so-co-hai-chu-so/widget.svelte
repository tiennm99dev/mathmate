<script>
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import {
    FIRST,
    cellText,
    cellsOf,
    doneMessage,
    drawTask,
    partsOf,
    rowMessage,
    sharesOf,
    sheetLabel,
    sheetOf,
  } from './engine.js';

  let task = $state(FIRST);
  /** @type {number[]} */
  let open = $state([]);
  let last = $state(-1);

  const cells = $derived(cellsOf(task));
  const across = $derived(sharesOf(task.a));
  const down = $derived(sharesOf(task.b));
  const done = $derived(open.length === 4);
  const sheet = $derived(sheetOf(task));

  const message = $derived.by(() => {
    if (done) return doneMessage(task);
    if (last < 0) {
      return `${task.a} = ${partsOf(task.a).join(' + ')} và ${task.b} = ${partsOf(task.b).join(' + ')}. Em chạm vào từng ô để tính.`;
    }
    const cell = cells[last];
    const rowDone = [0, 1].every((col) => open.includes(cell.row * 2 + col));
    return rowDone ? rowMessage(task, cell.row) : `${cellText(cell)}. Em mở tiếp các ô còn lại.`;
  });

  /** @param {number} i */
  function reveal(i) {
    if (!open.includes(i)) open = [...open, i];
    last = i;
  }

  function another() {
    task = drawTask(Math.random, task);
    open = [];
    last = -1;
  }

  const TONES = ['bg-amber-200 text-amber-950', 'bg-sky-200 text-sky-950'];
  const SHEET_TONES = {
    first: 'text-amber-800',
    second: 'text-sky-800',
    product: 'text-emerald-800',
  };
</script>

<div class="space-y-4">
  <p class="text-center text-2xl font-bold tabular-nums">{task.a} × {task.b} = ?</p>

  <div
    class="mx-auto grid max-w-md gap-1"
    style="grid-template-columns: 2.5rem {across[0]}fr {across[1]}fr; grid-template-rows: auto {down[1]}fr {down[0]}fr; aspect-ratio: 1.15"
  >
    <span></span>
    {#each partsOf(task.a) as part (part)}
      <span class="text-center text-lg font-bold text-slate-700">{part}</span>
    {/each}
    {#each [0, 1] as row (row)}
      <span class="flex items-center justify-center text-lg font-bold text-slate-700"
        >{cells[row * 2].right}</span
      >
      {#each [0, 1] as col (col)}
        {@const i = row * 2 + col}
        {@const cell = cells[i]}
        <button
          type="button"
          class="flex min-h-14 flex-col items-center justify-center rounded-lg border-2 border-white px-1 text-base font-semibold tabular-nums shadow-sm {TONES[
            row
          ]} {last === i ? 'ring-4 ring-indigo-500' : ''}"
          aria-label={open.includes(i)
            ? cellText(cell)
            : `Ô ${cell.left} nhân ${cell.right}, chạm để tính`}
          onclick={() => reveal(i)}
        >
          <span>{cell.left} × {cell.right}</span>
          {#if open.includes(i)}<span class="text-lg font-bold">= {fmt(cell.value)}</span>{/if}
        </button>
      {/each}
    {/each}
  </div>

  <KidNote tone={done ? 'ok' : 'info'} text={message} />

  {#if done}
    <div class="flex justify-center">
      <div
        class="inline-grid rounded-2xl border-4 border-slate-300 bg-white p-3 text-3xl font-bold tabular-nums"
        style="grid-template-columns: 1.75rem repeat({sheet[0].cells.length}, 2rem)"
        role="img"
        aria-label={sheetLabel(task)}
      >
        {#each sheet as line, r (r)}
          <span class="flex h-11 items-center justify-center text-slate-500">{line.sign}</span>
          {#each line.cells as digit, c (c)}
            <span
              class="flex h-11 items-center justify-center {line.line
                ? 'border-b-4 border-slate-400'
                : ''} {line.tone ? SHEET_TONES[line.tone] : ''}">{digit}</span
            >
          {/each}
        {/each}
      </div>
    </div>
    <p class="text-center text-base text-slate-700">
      Tích riêng thứ hai viết lùi sang trái một cột, vì đó là {fmt(
        Math.floor(task.b / 10) * task.a,
      )} chục.
    </p>
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    onclick={another}>Phép nhân khác</button
  >
</div>
