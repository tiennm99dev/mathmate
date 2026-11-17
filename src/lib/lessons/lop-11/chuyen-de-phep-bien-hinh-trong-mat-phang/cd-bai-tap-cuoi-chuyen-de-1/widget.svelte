<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { moveText } from '../_shared/moves.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { ptText } from '../_shared/transform.js';
  import { FIGURE, NAMES, PUZZLES, fits, imageOf, verdict } from './engine.js';

  const plane = planeScale({ xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const BLUE = '#4f46e5';
  const GREEN = '#059669';
  const RED = '#e11d48';

  let index = $state(0);
  /** @type {number | null} */
  let picked = $state(null);
  /** @type {boolean[]} */
  let solved = $state(PUZZLES.map(() => false));

  const puzzle = $derived(PUZZLES[index]);
  const choice = $derived(picked === null ? null : puzzle.options[picked]);
  const right = $derived(choice !== null && fits(puzzle, choice));
  const score = $derived(solved.filter(Boolean).length);

  /** @param {number} i */
  function pick(i) {
    picked = i;
    if (fits(puzzle, puzzle.options[i])) solved[index] = true;
  }
  /** @param {number} next */
  function go(next) {
    index = next;
    picked = null;
  }

  const label = $derived(
    `Câu đố ${index + 1}. Hình H: ${FIGURE.map((p, i) => `${NAMES[i]}${ptText(p)}`).join(', ')}. ` +
      `Hình H': ${puzzle.target.map(ptText).join(', ')}.` +
      (choice ? ` Ảnh qua phép đã chọn: ${imageOf(choice).map(ptText).join(', ')}.` : ''),
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <p class="font-semibold text-slate-800">
      Câu đố {index + 1} / {PUZZLES.length} · đã giải {score}
    </p>
    <div class="flex gap-2">
      <button
        type="button"
        class={button.quiet}
        disabled={index === 0}
        onclick={() => go(index - 1)}>Câu trước</button
      >
      <button
        type="button"
        class={right ? button.primary : button.quiet}
        disabled={index === PUZZLES.length - 1}
        onclick={() => go(index + 1)}>Câu sau</button
      >
    </div>
  </div>

  <CoordinatePlane {plane} {label} interactive={false}>
    <PlaneFigure {plane} points={puzzle.target} color={GREEN} dashed fill={0.15} />
    <PlaneFigure {plane} points={FIGURE} names={NAMES} color={BLUE} />
    {#if choice && !right}
      <PlaneFigure {plane} points={imageOf(choice)} color={RED} dashed fill={0.05} />
    {/if}
    <text
      x={plane.mx(FIGURE[2].x) + 10}
      y={plane.my(FIGURE[2].y) - 8}
      font-size="14"
      font-weight="700"
      fill={BLUE}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke">H</text
    >
    <text
      x={plane.mx(puzzle.target[2].x) + 10}
      y={plane.my(puzzle.target[2].y) - 8}
      font-size="14"
      font-weight="700"
      fill={GREEN}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke">H'</text
    >
  </CoordinatePlane>

  <fieldset class="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
    <legend class="px-1 text-sm font-semibold text-slate-700"
      >Phép biến hình nào biến hình H (xanh) thành hình H' (nét đứt xanh lá)?</legend
    >
    <div class="flex flex-wrap gap-2">
      {#each puzzle.options as m, i (i)}
        <button
          type="button"
          class={picked === i ? button.primary : button.secondary}
          aria-pressed={picked === i}
          onclick={() => pick(i)}>{moveText(m)}</button
        >
      {/each}
    </div>
  </fieldset>

  <FeedbackNote
    tone={choice ? (right ? 'ok' : 'warn') : 'info'}
    text={choice
      ? verdict(puzzle, choice)
      : 'So sánh hướng và kích thước của hai hình: cùng hướng hay bị lật, bị quay; bằng nhau hay được phóng to, thu nhỏ? Rồi chọn một phép biến hình.'}
  />
</div>
