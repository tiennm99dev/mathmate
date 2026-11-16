<script>
  import { button } from '#lib/core/ui.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import {
    FIRST,
    MAX,
    averageText,
    canMove,
    columnLabel,
    drawColumns,
    isLevel,
    messageOf,
    move,
    totalOf,
  } from './engine.js';

  let set = $state(0);
  let start = $state(FIRST[0]);
  let cols = $state(FIRST[0]);
  /** The column a block is taken from, or -1. */
  let from = $state(-1);
  let slip = $state('');

  const level = $derived(isLevel(cols));
  const message = $derived(
    slip ||
      (from >= 0 && !level
        ? `Em lấy khối ở cột ${from + 1}. Chạm vào cột muốn đặt khối.`
        : messageOf(start, cols)),
  );

  /** @param {number[]} next */
  function load(next) {
    start = next;
    cols = next;
    from = -1;
    slip = '';
  }

  /** @param {number} i */
  function tap(i) {
    slip = '';
    if (level) return;
    if (from < 0 || from === i) {
      if (from === i) {
        from = -1;
      } else if (cols[i] === 0) {
        slip = `Cột ${i + 1} không còn khối nào.`;
      } else {
        from = i;
      }
      return;
    }
    if (!canMove(cols, from, i)) {
      slip = `Cột ${i + 1} đã đầy.`;
      return;
    }
    cols = move(cols, from, i);
    if (cols[from] === 0 || isLevel(cols)) from = -1;
  }

  function another() {
    set += 1;
    load(set < FIRST.length ? FIRST[set] : drawColumns(Math.random, start));
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    Tổng: {totalOf(cols)} khối · Số cột: {cols.length}
  </p>

  <div class="flex items-end justify-center gap-2 sm:gap-4" role="group" aria-label="Các cột khối">
    {#each cols as height, i (i)}
      <button
        type="button"
        class="flex min-h-12 w-14 flex-col-reverse items-center gap-0.5 rounded-xl border-2 p-1 sm:w-16 {from ===
        i
          ? 'border-indigo-600 bg-indigo-50'
          : 'border-slate-200 bg-white'}"
        style="height: {MAX * 1.75 + 2.5}rem"
        aria-pressed={from === i}
        aria-label="{columnLabel(i, height)}{from === i ? ', đang chọn để lấy khối' : ''}"
        onclick={() => tap(i)}
      >
        <span class="text-sm font-bold text-slate-700">{height}</span>
        {#each { length: height } as _, k (k)}
          <span
            class="block h-6 w-full rounded {level ? 'bg-emerald-400' : 'bg-amber-400'}"
            aria-hidden="true"
          ></span>
        {/each}
      </button>
    {/each}
  </div>

  <KidNote tone={level ? 'ok' : slip ? 'warn' : 'info'} text={message} />

  {#if level}
    <p class="rounded-xl bg-emerald-50 px-3 py-2 text-center text-xl font-bold text-emerald-900">
      {averageText(start)}
    </p>
  {/if}

  <div class="flex flex-wrap gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={() => load(start)}
      >Làm lại</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {level ? button.primary : button.secondary}"
      onclick={another}>Bộ cột khác</button
    >
  </div>
</div>
