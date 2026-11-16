<script>
  import { fmt } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { MOVES, PUZZLES, TITLES, apply, cellsOf, goalText, moveText } from './engine.js';

  let index = $state(0);
  let value = $state(/** @type {number} */ (PUZZLES[0].start));
  /** What the last move said; empty before the first move of a puzzle. */
  let said = $state('');
  let blocked = $state(false);
  /** How far the digits just moved: positive to the left, negative to the right. */
  let shift = $state(0);
  /** Bumped on every move, so the slide plays again. */
  let version = $state(0);

  const puzzle = $derived(PUZZLES[index]);
  const cells = $derived(cellsOf(value));
  const solved = $derived(value === puzzle.goal);
  const goal = $derived(goalText(value, puzzle.goal));
  const message = $derived(said ? `${said} ${goal}` : goal);

  /** @param {import('./engine.js').Move} move */
  function play(move) {
    const result = apply(value, move);
    said = result.text;
    blocked = !result.ok;
    if (!result.ok) return;
    value = result.value;
    shift = move.op === '×' ? move.zeros : -move.zeros;
    version += 1;
  }

  /** @param {number} next */
  function open(next) {
    index = next;
    value = PUZZLES[next].start;
    said = '';
    blocked = false;
    shift = 0;
    version += 1;
  }

  /**
   * Whether a cell holds a zero just written by a multiplication.
   * @param {number} i
   */
  const isNewZero = (i) => shift > 0 && i >= cells.length - shift;
</script>

<div class="space-y-4">
  <p class="text-center text-lg font-semibold text-slate-800">
    Từ {fmt(puzzle.start)}, em làm sao để được <strong>{fmt(puzzle.goal)}</strong>?
  </p>

  <div>
    <table
      class="mx-auto w-full max-w-xl table-fixed border-collapse text-center"
      aria-label="Bảng hàng của số {fmt(value)}"
    >
      <thead>
        <tr>
          {#each TITLES as title (title)}
            <th
              scope="col"
              class="border-2 border-slate-300 bg-slate-100 px-0.5 py-1 text-xs font-semibold leading-tight text-slate-700"
              >{title}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          {#key version}
            {#each cells as digit, i (i)}
              <td
                class="h-16 border-2 border-slate-300 bg-white text-3xl font-bold tabular-nums {isNewZero(
                  i,
                )
                  ? 'text-rose-600'
                  : 'text-indigo-800'}"
              >
                {#if digit}
                  <span
                    class="block {isNewZero(i) ? 'pop' : 'slide'}"
                    style="--from: {shift * 100}%">{digit}</span
                  >
                {/if}
              </td>
            {/each}
          {/key}
        </tr>
      </tbody>
    </table>
  </div>

  <KidNote tone={solved ? 'ok' : blocked ? 'warn' : 'info'} text={message} />

  <div class="grid grid-cols-3 gap-2" role="group" aria-label="Nhân hoặc chia số trong bảng">
    {#each MOVES as move (moveText(move))}
      <button
        type="button"
        class="min-h-14 rounded-xl border-2 text-xl font-bold tabular-nums {move.op === '×'
          ? 'border-indigo-300 bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
          : 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'} {focusRing}"
        aria-label="{move.op === '×' ? 'Nhân với' : 'Chia cho'} {fmt(10 ** move.zeros)}"
        onclick={() => play(move)}>{moveText(move)}</button
      >
    {/each}
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
      onclick={() => open((index + 1) % PUZZLES.length)}>Bài khác</button
    >
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => open(index)}
      >Làm lại</button
    >
  </div>
</div>

<style>
  @media (prefers-reduced-motion: no-preference) {
    .slide {
      animation: slide 500ms ease-out both;
    }

    .pop {
      animation: pop 500ms ease-out both;
    }
  }

  /* The digit fills its cell, so a shift of k places is k digit widths. */
  @keyframes slide {
    from {
      transform: translateX(var(--from));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.4);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
