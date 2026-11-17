<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { CUBE_NETS } from '../_shared/cube-nets.js';
  import FoldButtons from '../_shared/fold-buttons.svelte';
  import FoldView from '../_shared/fold-view.svelte';
  import { gridPieces } from '../_shared/fold.js';

  /**
   * Six drawings of six squares. The child picks one, says whether it folds
   * into a cube, then folds it to check: a net that does not fold shows two
   * faces landing on each other.
   */

  const CELL = 12;

  let chosen = $state(CUBE_NETS[0].id);
  /** @type {Record<string, boolean>} the child's guess for each drawing */
  let guesses = $state({});
  let t = $state(0);

  const net = $derived(
    /** @type {import('../_shared/cube-nets.js').CubeNet} */ (
      CUBE_NETS.find((n) => n.id === chosen)
    ),
  );
  const pieces = $derived(gridPieces(net.cells));
  const right = $derived(CUBE_NETS.filter((n) => guesses[n.id] === n.folds).length);
  const guessed = $derived(Object.keys(guesses).length);

  const note = $derived.by(() => {
    const guess = guesses[net.id];
    if (guess === undefined) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `${net.name} có gấp được thành hình lập phương không? Em chọn câu trả lời.`,
      };
    }
    const verdict = net.folds
      ? 'gấp được thành hình lập phương'
      : 'không gấp được thành hình lập phương';
    if (guess === net.folds) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng rồi! ${net.name} ${verdict}. ${net.why} Em bấm "Gấp lại" để xem.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Chưa đúng. ${net.name} ${verdict}. ${net.why} Em bấm "Gấp lại" để xem.`,
    };
  });

  /** @param {string} id */
  function choose(id) {
    chosen = id;
    t = 0;
  }

  /** @param {boolean} folds */
  function guess(folds) {
    if (guesses[net.id] !== undefined) return;
    guesses = { ...guesses, [net.id]: folds };
  }

  /** @param {import('../_shared/fold.js').Cell[]} cells */
  function thumb(cells) {
    const cols = Math.max(...cells.map((c) => c[0])) + 1;
    const rows = Math.max(...cells.map((c) => c[1])) + 1;
    return { w: cols * CELL + 2, h: rows * CELL + 2 };
  }
</script>

<div class="space-y-4">
  <fieldset>
    <legend class="mb-2 text-base font-semibold text-slate-700">Chọn một hình</legend>
    <div class="grid grid-cols-3 gap-2">
      {#each CUBE_NETS as n (n.id)}
        {@const size = thumb(n.cells)}
        <button
          type="button"
          class="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border-2 p-2 {focusRing} {chosen ===
          n.id
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-slate-200 bg-white'}"
          aria-pressed={chosen === n.id}
          onclick={() => choose(n.id)}
        >
          <svg width={size.w} height={size.h} viewBox="0 0 {size.w} {size.h}" aria-hidden="true">
            {#each n.cells as [c, r], i (i)}
              <rect
                x={1 + c * CELL}
                y={1 + r * CELL}
                width={CELL}
                height={CELL}
                fill="#bae6fd"
                stroke="#0369a1"
              />
            {/each}
          </svg>
          <span class="text-base font-semibold text-slate-800"
            >{n.name}{#if guesses[n.id] !== undefined}<span class="sr-only"
                >, {guesses[n.id] === n.folds ? 'đã đoán đúng' : 'đã đoán sai'}</span
              ><span class="ml-1" aria-hidden="true">{guesses[n.id] === n.folds ? '✓' : '✗'}</span
              >{/if}</span
          >
        </button>
      {/each}
    </div>
  </fieldset>

  <FoldView {pieces} {t} label="{net.name}, sáu hình vuông" />

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      aria-pressed={guesses[net.id] === true}
      onclick={() => guess(true)}>Gấp được</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      aria-pressed={guesses[net.id] === false}
      onclick={() => guess(false)}>Không gấp được</button
    >
  </div>

  {#key chosen}
    <FoldButtons bind:t />
  {/key}

  <KidNote tone={note.tone} text={note.text} />

  <p class="text-center text-lg font-semibold text-slate-700" aria-live="polite">
    Em đã đoán đúng {right} trên {guessed} hình đã chọn (có {CUBE_NETS.length} hình).
  </p>
</div>
