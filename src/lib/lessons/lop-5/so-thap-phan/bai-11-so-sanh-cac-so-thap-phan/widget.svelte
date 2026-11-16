<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { SIGNS, SIGN_WORDS } from '#lib/core/kid/numbers.js';
  import { button } from '#lib/core/ui.js';
  import { PAIRS, checkColumn, checkSign, columnsOf } from './engine.js';

  let index = $state(0);
  /** The column found, or undefined while the child is still looking. */
  let column = $state(/** @type {number | null | undefined} */ (undefined));
  let sign = $state(/** @type {string | null} */ (null));
  let note = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const pair = $derived(PAIRS[index % PAIRS.length]);
  const a = $derived(pair[0]);
  const b = $derived(pair[1]);
  const cols = $derived(columnsOf(a, b));
  const placed = $derived(column !== undefined);
  const done = $derived(sign !== null);

  /** @type {HTMLDivElement | undefined} */
  let signs = $state();
  /** @type {HTMLDivElement | undefined} */
  let table = $state();
  /** @type {HTMLButtonElement | undefined} */
  let again = $state();

  /** @param {number | null} place */
  async function pickColumn(place) {
    if (placed) return;
    const result = checkColumn(a, b, place);
    note = result;
    if (!result.ok) return;
    column = place;
    await tick();
    signs?.querySelector('button')?.focus();
  }

  /** @param {import('#lib/core/kid/numbers.js').Sign} s */
  async function pickSign(s) {
    if (done) return;
    const result = checkSign(a, b, s);
    note = result;
    if (!result.ok) return;
    sign = s;
    await tick();
    again?.focus();
  }

  async function next() {
    index += 1;
    column = undefined;
    sign = null;
    note = null;
    await tick();
    table?.querySelector('button')?.focus();
  }

  /** @param {number} place */
  const lit = (place) => placed && column === place;
</script>

<div class="space-y-4">
  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">
    {a}
    <span class="inline-block min-w-10 text-rose-600">{done ? sign : '?'}</span>
    {b}
  </p>

  <div
    class="flex justify-center gap-1 overflow-x-auto"
    role="group"
    aria-label="Bảng hàng: chạm vào cột đầu tiên mà hai số khác nhau"
    bind:this={table}
  >
    {#each cols as c, i (c.place)}
      {#if i === 1}
        <div
          class="flex flex-col items-center justify-end pb-2 text-4xl font-bold"
          aria-hidden="true"
        >
          <span>,</span><span>,</span>
        </div>
      {/if}
      <button
        type="button"
        class="flex min-h-12 min-w-16 flex-col items-center gap-1 rounded-xl border-2 px-2 py-2 {lit(
          c.place,
        )
          ? 'border-rose-500 bg-rose-50'
          : 'border-slate-300 bg-white hover:bg-slate-50'}"
        aria-label="{c.title}: {c.top} và {c.bottom}{c.topAdded || c.bottomAdded
          ? ', có chữ số 0 thêm vào'
          : ''}"
        aria-pressed={lit(c.place)}
        disabled={placed}
        onclick={() => pickColumn(c.place)}
      >
        <span class="text-xs font-semibold text-slate-500">{c.title}</span>
        <span
          class="text-3xl font-bold tabular-nums {c.topAdded ? 'text-slate-300' : 'text-slate-900'}"
          >{c.top}</span
        >
        <span
          class="text-3xl font-bold tabular-nums {c.bottomAdded
            ? 'text-slate-300'
            : 'text-slate-900'}">{c.bottom}</span
        >
      </button>
    {/each}
  </div>
  <p class="text-center text-base text-slate-600">
    Chữ số 0 mờ là chữ số 0 thêm vào bên phải phần thập phân: số không thay đổi.
  </p>

  {#if !placed}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => pickColumn(null)}
      >
        Không có cột nào khác nhau
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn dấu" bind:this={signs}>
      {#each SIGNS as s (s)}
        <button
          type="button"
          class="min-h-14 text-3xl font-bold {button.secondary}"
          aria-label="Dấu {SIGN_WORDS[s]}"
          disabled={done}
          onclick={() => pickSign(s)}>{s}</button
        >
      {/each}
    </div>
  {/if}

  <KidNote
    tone={note === null ? 'info' : note.ok ? 'ok' : 'warn'}
    text={note?.text ??
      'Hai số xếp thẳng dấu phẩy. Em chạm vào cột đầu tiên, từ trái sang, mà hai chữ số khác nhau.'}
  />

  {#if done}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={again}
        onclick={next}
      >
        Cặp số khác
      </button>
    </div>
  {/if}
</div>
