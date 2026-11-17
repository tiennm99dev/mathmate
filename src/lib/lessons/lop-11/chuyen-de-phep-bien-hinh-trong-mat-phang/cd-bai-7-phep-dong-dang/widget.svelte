<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { intText } from '#lib/core/number-format.js';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { applyChain, chainRatio, chainTex, moveText } from '../_shared/moves.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { ptText, ratioTex, sameFigure } from '../_shared/transform.js';
  import { MOVES, PUZZLES, START, targetRatio } from './engine.js';

  const plane = planeScale({ xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const BLUE = '#4f46e5';
  const GREEN = '#059669';
  const NAMES = ['A', 'B', 'C'];

  let index = $state(0);
  /** @type {import('../_shared/moves.js').Move[]} */
  let moves = $state([]);
  let a = $state(0);
  let b = $state(0);
  let showHint = $state(false);

  const puzzle = $derived(PUZZLES[index]);
  const current = $derived(applyChain(START, moves));
  const done = $derived(sameFigure(current, puzzle.target));
  const ratio = $derived(chainRatio(moves));
  const goal = $derived(targetRatio(puzzle.target));
  const offBoard = $derived(current.some((p) => Math.abs(p.x) > 9 || Math.abs(p.y) > 9));

  /** @param {import('../_shared/moves.js').Move} m */
  function add(m) {
    if (done) return;
    moves.push(m);
  }
  /** @param {number} next */
  function go(next) {
    index = next;
    moves.length = 0;
    a = 0;
    b = 0;
    showHint = false;
  }

  const note = $derived(
    done
      ? `Chồng khít! Thực hiện liên tiếp $${chainTex(moves)}$ là một phép đồng dạng tỉ số $${ratioTex(ratio)}$ biến tam giác $ABC$ thành tam giác đích, nên hai tam giác đồng dạng.`
      : offBoard
        ? 'Tam giác đã ra ngoài bảng. Bấm "Quay lại một bước", hoặc tịnh tiến nó về.'
        : ratio === goal
          ? `Tỉ số đã đúng: $k = ${ratioTex(ratio)}$, $A'B' = ${ratioTex(ratio)} \\cdot AB$. Bây giờ chỉ cần các phép dời hình (đối xứng, quay, tịnh tiến) để đặt tam giác vào đúng chỗ.`
          : `Tỉ số đồng dạng hiện tại $k = ${ratioTex(ratio)}$, tỉ số cần đạt $k = ${ratioTex(goal)}$. Chỉ phép vị tự làm thay đổi tỉ số; các phép dời hình giữ nguyên nó.`,
  );
  const label = $derived(
    `Câu đố ${index + 1}. Tam giác đang biến đổi: ${current.map((p, i) => `${NAMES[i]}${ptText(p)}`).join(', ')}. ` +
      `Tam giác đích: ${puzzle.target.map(ptText).join(', ')}.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-center justify-between gap-2">
    <p class="font-semibold text-slate-800">Câu đố {index + 1} / {PUZZLES.length}</p>
    <div class="flex gap-2">
      <button
        type="button"
        class={button.quiet}
        disabled={index === 0}
        onclick={() => go(index - 1)}>Câu trước</button
      >
      <button
        type="button"
        class={done ? button.primary : button.quiet}
        disabled={index === PUZZLES.length - 1}
        onclick={() => go(index + 1)}>Câu sau</button
      >
    </div>
  </div>

  <CoordinatePlane {plane} {label} interactive={false}>
    <PlaneFigure
      {plane}
      points={puzzle.target}
      names={done ? [] : ["A'", "B'", "C'"]}
      color={GREEN}
      dashed
      fill={0.12}
    />
    <PlaneFigure {plane} points={current} names={NAMES} color={BLUE} fill={done ? 0.35 : 0.2} />
  </CoordinatePlane>

  <div class="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-700">Thêm một phép biến hình</p>
    <div class="flex flex-wrap gap-2">
      {#each MOVES as m, i (i)}
        <button type="button" class={button.secondary} disabled={done} onclick={() => add(m)}
          >{moveText(m)}</button
        >
      {/each}
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <Stepper label="a" bind:value={a} min={-9} max={9} format={intText} />
      <Stepper label="b" bind:value={b} min={-9} max={9} format={intText} />
      <button
        type="button"
        class={button.secondary}
        disabled={done || (a === 0 && b === 0)}
        onclick={() => add({ kind: 't', u: { x: a, y: b } })}
        >{moveText({ kind: 't', u: { x: a, y: b } })}</button
      >
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.quiet}
        disabled={!moves.length}
        onclick={() => moves.pop()}>Quay lại một bước</button
      >
      <button
        type="button"
        class={button.quiet}
        disabled={!moves.length}
        onclick={() => (moves.length = 0)}>Làm lại</button
      >
      <button
        type="button"
        class={button.quiet}
        aria-expanded={showHint}
        onclick={() => (showHint = !showHint)}>Gợi ý</button
      >
    </div>
  </div>

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <Tex math={chainTex(moves)} />
  </div>
  {#if showHint}
    <FeedbackNote tone="info" text={puzzle.hint} />
  {/if}
  <FeedbackNote tone={done ? 'ok' : offBoard ? 'warn' : 'info'} text={note} />
</div>
