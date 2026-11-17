<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { CELLS, TARGETS, checkPaint, gridNote, readPercent, tapCell } from './engine.js';

  const SIZE = 32;
  const GAP = 2;
  const SIDE = 10 * SIZE + 9 * GAP;

  let mode = $state(/** @type {string | number} */ ('paint'));
  let count = $state(25);
  let quizIndex = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const quiz = $derived(mode === 'quiz');
  const target = $derived(TARGETS[quizIndex % TARGETS.length]);
  const note = $derived(
    quiz
      ? (result ?? {
          ok: false,
          text: `Em tô ${target}% lưới ô vuông rồi bấm "Kiểm tra".`,
        })
      : { ok: false, text: gridNote(count) },
  );

  /** @param {number} next */
  function set(next) {
    count = Math.min(CELLS, Math.max(0, next));
    if (quiz && !result?.ok) result = null;
  }

  /** @param {PointerEvent} e */
  function tap(e) {
    if (quiz && result?.ok) return;
    const box = /** @type {SVGSVGElement} */ (e.currentTarget).getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * SIDE;
    const y = ((e.clientY - box.top) / box.height) * SIDE;
    const col = Math.min(9, Math.max(0, Math.floor(x / (SIZE + GAP))));
    const row = Math.min(9, Math.max(0, Math.floor(y / (SIZE + GAP))));
    set(tapCell(count, row * 10 + col));
  }

  /** @param {KeyboardEvent} e */
  function key(e) {
    if (quiz && result?.ok) return;
    /** @type {Record<string, number>} */
    const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowUp: 10, ArrowDown: -10 };
    if (e.key in moves) set(count + moves[e.key]);
    else if (e.key === 'Home') set(0);
    else if (e.key === 'End') set(CELLS);
    else return;
    e.preventDefault();
  }

  function check() {
    result = checkPaint(count, target);
  }

  function nextQuiz() {
    quizIndex += 1;
    count = 0;
    result = null;
  }

  /** @param {string | number} v */
  function switchMode(v) {
    result = null;
    count = v === 'quiz' ? 0 : 25;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'paint', label: 'Tô màu' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
    onchange={switchMode}
  />

  <p class="text-center text-4xl font-bold text-indigo-700 tabular-nums" aria-hidden="true">
    {count}%
  </p>

  <svg
    viewBox="0 0 {SIDE} {SIDE}"
    class="mx-auto block w-full max-w-sm cursor-pointer touch-none rounded {focusRing}"
    role="slider"
    tabindex="0"
    aria-label="Lưới 100 ô vuông. Chạm vào ô để tô màu đến ô đó. Phím mũi tên trái phải tô bớt hoặc thêm 1 ô, lên xuống thêm hoặc bớt 10 ô."
    aria-valuemin={0}
    aria-valuemax={CELLS}
    aria-valuenow={count}
    aria-valuetext="Đã tô {count} ô, {readPercent(count)}"
    onpointerdown={tap}
    onkeydown={key}
  >
    {#each { length: CELLS } as _, i (i)}
      <rect
        x={(i % 10) * (SIZE + GAP)}
        y={Math.floor(i / 10) * (SIZE + GAP)}
        width={SIZE}
        height={SIZE}
        rx="3"
        class={i < count ? 'fill-rose-400' : 'fill-slate-100 stroke-slate-300'}
      />
    {/each}
  </svg>

  <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Tô thêm hoặc bớt">
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => set(count - 10)}
      disabled={count === 0 || (quiz && result?.ok)}>− 10 ô</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => set(count - 1)}
      disabled={count === 0 || (quiz && result?.ok)}>− 1 ô</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => set(count + 1)}
      disabled={count === CELLS || (quiz && result?.ok)}>+ 1 ô</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      onclick={() => set(count + 10)}
      disabled={count === CELLS || (quiz && result?.ok)}>+ 10 ô</button
    >
  </div>

  <KidNote tone={note.ok ? 'ok' : result ? 'warn' : 'info'} text={note.text} />

  {#if quiz}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        onclick={() => (result?.ok ? nextQuiz() : check())}
      >
        {result?.ok ? 'Câu khác' : 'Kiểm tra'}
      </button>
    </div>
  {/if}
</div>
