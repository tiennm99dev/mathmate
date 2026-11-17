<script>
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { DEPTH, boxFaces, boxGrid, fillBoxes, fillWords } from './stack.js';

  /**
   * A box of length a, width b and height c (in cube edges) that the child
   * fills with 1 cm³ cubes: a row, a layer, or all of it in a short
   * animation (at once when the visitor asks for less motion). `count` is
   * the number of cubes put in; `full` starts the box filled. Re-create the
   * component (a `{#key}` block) when the size changes.
   * @type {{ a: number, b: number, c: number, count?: number, full?: boolean }}
   */
  let { a, b, c, count = $bindable(0), full = false } = $props();

  // The box starts empty or full; later sizes come through a new component.
  // svelte-ignore state_referenced_locally
  count = full ? a * b * c : 0;

  /** Rows of cubes per second in the animation. */
  const SPEED = 6;

  const total = $derived(a * b * c);
  const cell = $derived(Math.min(34, 260 / (a + DEPTH * b), 220 / (c + DEPTH * b)));
  const width = $derived((a + DEPTH * b) * cell + 4);
  const height = $derived((c + DEPTH * b) * cell + 4);

  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;
  /** @type {HTMLButtonElement | undefined} */
  let resetButton = $state();

  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({ x: p.x * cell + 2, y: p.y * cell + height - 2 });

  const outline = $derived(
    boxFaces({ x0: 0, x1: a, y0: 0, y1: b, z0: 0, z1: c }).map((f) =>
      pointsAttr(f.pts.map(toScreen)),
    ),
  );
  const boxes = $derived(
    fillBoxes(a, b, c, count).map((box) => ({
      faces: boxFaces(box).map((f) => ({ kind: f.kind, points: pointsAttr(f.pts.map(toScreen)) })),
      lines: boxGrid(box).map(([p, q]) => [toScreen(p), toScreen(q)]),
    })),
  );

  const FILL = { front: '#fcd34d', top: '#fef3c7', right: '#f59e0b' };

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }

  /**
   * @param {number} k cubes to add
   * @param {MouseEvent} event
   */
  function add(k, event) {
    halt();
    count = Math.min(total, count + k);
    if (count >= total)
      passFocus(/** @type {HTMLButtonElement} */ (event.currentTarget), resetButton);
  }

  /** @param {MouseEvent} event */
  function play(event) {
    halt();
    count = 0;
    if (reducedMotion()) {
      count = total;
      passFocus(/** @type {HTMLButtonElement} */ (event.currentTarget), resetButton);
      return;
    }
    playing = true;
    let made = 0;
    stop = frameLoop((dt) => {
      made += dt * SPEED;
      count = Math.min(total, Math.floor(made) * a);
      if (count >= total) halt();
    });
  }

  function reset() {
    halt();
    count = 0;
  }

  $effect(() => () => stop?.());
</script>

<div class="space-y-3">
  <svg
    viewBox="0 0 {width} {height}"
    class="mx-auto block h-auto w-full max-w-sm"
    role="img"
    aria-label="Hình hộp dài {fmt(a)} cm, rộng {fmt(b)} cm, cao {fmt(c)} cm. Đã xếp {fmt(
      count,
    )} hình lập phương 1 cm³: {fillWords(a, b, c, count)}."
  >
    {#each outline as points, i (i)}
      <polygon {points} fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
    {/each}
    {#each boxes as box, i (i)}
      {#each box.faces as f (f.kind)}
        <polygon points={f.points} fill={FILL[f.kind]} stroke="#b45309" stroke-width="1.2" />
      {/each}
      {#each box.lines as [p, q], j (j)}
        <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#b45309" stroke-width="0.7" />
      {/each}
    {/each}
  </svg>

  <p class="text-center text-2xl font-bold text-slate-900 tabular-nums" aria-hidden="true">
    {fmt(count)} hình lập phương 1 cm³
  </p>

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={count >= total}
      onclick={(e) => add(a, e)}>+ 1 hàng ({fmt(a)} khối)</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={count >= total}
      onclick={(e) => add(a * b - (count % (a * b)), e)}>+ 1 lớp</button
    >
  </div>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={playing}
      onclick={play}>Xếp đầy hộp</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      bind:this={resetButton}
      onclick={reset}>Làm lại</button
    >
  </div>
</div>
