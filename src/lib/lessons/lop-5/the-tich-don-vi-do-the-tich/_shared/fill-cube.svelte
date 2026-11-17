<script>
  import KidFigure from '#lib/core/kid/kid-figure.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { DEPTH, SIDE, boxFaces, boxGrid, fillBoxes, fillNote, project } from './cubes.js';

  /**
   * A big cube of edge 10 small edges that the child fills with small cubes:
   * one cube, a row of 10 or a layer of 100 at a time, or all of it in a
   * short animation (at once when the visitor asks for less motion). The live
   * line counts the cubes put in and, once full, says 1 big unit = 1 000
   * small units. `person` stands a child of that height (in small edges)
   * beside the cube, to feel how big the cube is.
   * @type {{
   *   small: string;
   *   big: string;
   *   person?: { height: number, label: string };
   * }}
   */
  let { small, big, person } = $props();

  const CELL = 20;
  const FULL = SIDE ** 3;
  /** Small cubes per second in the animation. */
  const SPEED = 250;

  let count = $state(0);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  /** @type {HTMLButtonElement | undefined} */
  let resetButton = $state();

  const note = $derived(
    playing
      ? { tone: /** @type {const} */ ('info'), text: `Các khối 1 ${small} đang được xếp vào…` }
      : fillNote(count, small, big),
  );
  const left = $derived(person ? 8 : 0);
  const width = $derived((SIDE + DEPTH * SIDE + left) * CELL + 4);
  const tall = $derived(Math.max(SIDE + DEPTH * SIDE, person?.height ?? 0));
  const height = $derived(tall * CELL + 4);

  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({ x: (p.x + left) * CELL + 2, y: p.y * CELL + height - 2 });

  const whole = $derived(
    boxFaces({ x0: 0, x1: SIDE, y0: 0, y1: SIDE, z0: 0, z1: SIDE }).map((f) =>
      pointsAttr(f.pts.map(toScreen)),
    ),
  );
  const boxes = $derived(
    fillBoxes(count).map((b) => ({
      faces: boxFaces(b).map((f) => ({ kind: f.kind, points: pointsAttr(f.pts.map(toScreen)) })),
      lines: boxGrid(b).map(([a, c]) => [toScreen(a), toScreen(c)]),
    })),
  );
  const ground = $derived(toScreen(project(0, 0, 0)));

  const FILL = { front: '#fcd34d', top: '#fef3c7', right: '#f59e0b' };

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }

  /**
   * @param {number} k
   * @param {MouseEvent} event
   */
  function add(k, event) {
    halt();
    count = Math.min(FULL, count + k);
    passFocus(/** @type {HTMLButtonElement} */ (event.currentTarget), resetButton);
  }

  /** @param {MouseEvent} event */
  function play(event) {
    halt();
    count = 0;
    if (reducedMotion()) {
      count = FULL;
      passFocus(/** @type {HTMLButtonElement} */ (event.currentTarget), resetButton);
      return;
    }
    playing = true;
    let made = 0;
    stop = frameLoop((dt) => {
      made += dt * SPEED;
      count = Math.min(FULL, Math.floor(made / SIDE) * SIDE);
      if (count >= FULL) halt();
    });
  }

  function reset() {
    halt();
    count = 0;
  }

  $effect(() => () => stop?.());
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 {width} {height}"
    class="mx-auto block h-auto w-full max-w-md"
    role="img"
    aria-label="Khối 1 {big} có cạnh dài bằng 10 cạnh khối 1 {small}. Đã xếp {fmt(
      count,
    )} khối 1 {small}.{person ? ` ${person.label}` : ''}"
  >
    {#if person}
      <KidFigure
        x={ground.x - 4 * CELL}
        y={ground.y}
        height={person.height * CELL}
        color="#0ea5e9"
      />
    {/if}
    {#each whole as points, i (i)}
      <polygon {points} fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
    {/each}
    {#each boxes as box, i (i)}
      {#each box.faces as f (f.kind)}
        <polygon points={f.points} fill={FILL[f.kind]} stroke="#b45309" stroke-width="1.2" />
      {/each}
      {#each box.lines as [a, c], j (j)}
        <line x1={a.x} y1={a.y} x2={c.x} y2={c.y} stroke="#b45309" stroke-width="0.6" />
      {/each}
    {/each}
  </svg>

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums" aria-hidden="true">
    {fmt(count)}
    {small}
  </p>

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={count >= FULL}
      onclick={(e) => add(1, e)}>+ 1 khối</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={count >= FULL}
      onclick={(e) => add(SIDE, e)}>+ 1 hàng (10 khối)</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={count >= FULL}
      onclick={(e) => add(SIDE * SIDE, e)}>+ 1 lớp (100 khối)</button
    >
  </div>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={playing}
      onclick={play}>Xem xếp đầy khối</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.quiet}"
      bind:this={resetButton}
      onclick={reset}>Làm lại</button
    >
  </div>

  <KidNote tone={note.tone} text={note.text} />
</div>
