<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { intText } from '#lib/core/number-format.js';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import PlaneFigure from '../_shared/plane-figure.svelte';
  import { ptText } from '../_shared/transform.js';
  import { MOVES, PUZZLES, START, applyChain, chainTex, sideTexts, solved } from './engine.js';

  const plane = planeScale({ xMin: -8, xMax: 8, yMin: -8, yMax: 8 });
  const BLUE = '#4f46e5';
  const GREEN = '#059669';
  const NAMES = ['A', 'B', 'C'];

  let index = $state(0);
  /** @type {import('./engine.js').Step[]} */
  let steps = $state([]);
  let a = $state(0);
  let b = $state(0);
  let showHint = $state(false);

  const puzzle = $derived(PUZZLES[index]);
  const current = $derived(applyChain(START, steps));
  const done = $derived(solved(current, puzzle));
  const sides = $derived(sideTexts(current));
  const offBoard = $derived(current.some((p) => Math.abs(p.x) > 8 || Math.abs(p.y) > 8));

  /** @param {import('./engine.js').Step} step */
  function add(step) {
    if (done) return;
    steps.push(step);
  }
  function undo() {
    steps.pop();
  }
  function reset() {
    steps.length = 0;
  }
  /** @param {number} next */
  function go(next) {
    index = next;
    steps.length = 0;
    a = 0;
    b = 0;
    showHint = false;
  }

  const note = $derived(
    done
      ? `Chồng khít! Phép dời hình $${chainTex(steps)}$ biến tam giác $ABC$ thành tam giác đích, nên hai tam giác bằng nhau.`
      : offBoard
        ? 'Tam giác đã ra ngoài bảng. Bấm "Quay lại một bước" hoặc tịnh tiến nó về.'
        : `Các cạnh vẫn là $${sides.join(',\\ ')}$: mỗi bước là một phép dời hình nên không làm thay đổi khoảng cách. Tiếp tục ghép để tam giác xanh chồng khít lên tam giác đích.`,
  );
  const label = $derived(
    `Câu đố ${index + 1}. Tam giác đang di chuyển: ${current.map((p, i) => `${NAMES[i]}${ptText(p)}`).join(', ')}. ` +
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
      {#each MOVES as m (m.kind)}
        <button
          type="button"
          class={button.secondary}
          disabled={done}
          onclick={() => add({ kind: m.kind })}>{m.label}</button
        >
      {/each}
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <Stepper label="a" bind:value={a} min={-8} max={8} format={intText} />
      <Stepper label="b" bind:value={b} min={-8} max={8} format={intText} />
      <button
        type="button"
        class={button.secondary}
        disabled={done || (a === 0 && b === 0)}
        onclick={() => add({ kind: 't', u: { x: a, y: b } })}
        >Tịnh tiến theo u = {ptText({ x: a, y: b })}</button
      >
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.quiet} disabled={!steps.length} onclick={undo}
        >Quay lại một bước</button
      >
      <button type="button" class={button.quiet} disabled={!steps.length} onclick={reset}
        >Làm lại</button
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
    <Tex math={chainTex(steps)} />
  </div>
  {#if showHint}
    <FeedbackNote tone="info" text={puzzle.hint} />
  {/if}
  <FeedbackNote tone={done ? 'ok' : offBoard ? 'warn' : 'info'} text={note} />
</div>
