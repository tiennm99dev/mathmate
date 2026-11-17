<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { rng } from '#lib/core/drill.js';
  import { button } from '#lib/core/ui.js';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import { add3, mul3 } from '#lib/geom-engine/solid.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { angleFan, lerp3, unit3 } from '#lib/geom-engine/space.js';
  import {
    ANGLES,
    CUBE,
    EDGES,
    FACES,
    SIDE,
    angleOf,
    explain,
    makePair,
    segName,
    translation,
  } from './engine.js';

  /**
   * Two lines through vertices of a cube, a red one and a blue one, often
   * skew. "Tịnh tiến" moves one of them, parallel to itself, onto a line of
   * the cube that cuts the other, and the angle appears at the common point.
   * The learner then says how big the angle between the two lines is.
   */

  const RED = '#DC2626';
  const BLUE = '#2563EB';
  const MOVED = '#059669';
  const rand = rng(20231122);

  let pair = $state(makePair(rand, { parallel: false }));
  let moved = $state(false);
  /** @type {number | null} */
  let chosen = $state(null);
  let right = $state(0);
  let asked = $state(0);
  let view = $state({ yaw: -32, pitch: 22 });

  const truth = $derived(angleOf(pair[0], pair[1]));
  const move = $derived(translation(pair[0], pair[1]));
  const names = $derived(pair.map(segName));
  const shown = $derived(moved || chosen !== null);

  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let moveButton = $state();

  /** @param {number} a @param {EventTarget | null} from */
  function answer(a, from) {
    if (chosen !== null) return;
    passFocus(/** @type {HTMLButtonElement} */ (from), nextButton);
    chosen = a;
    asked += 1;
    if (a === truth) right += 1;
  }

  function next() {
    passFocus(nextButton, moveButton);
    pair = makePair(rand);
    chosen = null;
    moved = false;
  }

  /**
   * A line drawn a little past both of its vertices; the part on the cube is
   * dashed where the cube hides it.
   * @param {[string, string]} s @param {string} color @param {string} key
   */
  function long(s, color, key, width = 3) {
    const a = CUBE[s[0]];
    const b = CUBE[s[1]];
    const line = { color, width };
    return [
      { key: `${key}-0`, from: lerp3(a, b, -0.25), to: s[0], ...line, dash: false },
      { key: `${key}-1`, from: s[0], to: s[1], ...line, dash: /** @type {const} */ ('auto') },
      { key: `${key}-2`, from: s[1], to: lerp3(a, b, 1.25), ...line, dash: false },
    ];
  }

  const isMovedLine = $derived(
    move !== null && segName(move.onto) !== segName(move.moved) ? move.onto : null,
  );

  const segments = $derived([
    ...EDGES.map((e) => ({ key: segName(e), from: e[0], to: e[1], color: '#94A3B8', width: 1.4 })),
    ...long(pair[0], RED, 'red'),
    ...long(pair[1], BLUE, 'blue'),
    ...(shown && isMovedLine ? long(isMovedLine, MOVED, 'moved', 2.6) : []),
  ]);

  const polygons = $derived.by(() => {
    if (!shown || !move) return [];
    const fan = angleFan(move.at, move.rays[0], move.rays[1], SIDE * 0.32);
    return fan.length
      ? [{ key: 'fan', pts: fan, fill: '#F59E0B', opacity: 0.45, stroke: '#D97706' }]
      : [];
  });

  const labels = $derived.by(() => {
    /** @type {import('#lib/geom-engine/space.js').SceneLabel[]} */
    const list = Object.keys(CUBE).map((k) => ({ text: k, at: k }));
    if (shown && move && move.name === 'O') list.push({ text: 'O', at: move.at, dx: 0, dy: 18 });
    if (chosen !== null && move) {
      const tip = add3(
        move.at,
        mul3(unit3(add3(unit3(move.rays[0]), unit3(move.rays[1]))), SIDE * 0.45),
      );
      list.push({ text: `${truth}°`, at: tip, color: '#B45309', dx: 0, dy: 0 });
    }
    return list;
  });

  const dots = $derived(shown && move ? [{ at: move.at, color: '#B45309' }] : []);

  const prompt = $derived(
    `Góc giữa đường thẳng $${names[0]}$ (đỏ) và đường thẳng $${names[1]}$ (xanh) bằng bao nhiêu?`,
  );

  const hint = $derived.by(() => {
    if (!moved || chosen !== null) return null;
    if (!move) return `Hai đường thẳng $${names[0]}$ và $${names[1]}$ song song.`;
    if (!isMovedLine) {
      return `Hai đường thẳng cắt nhau tại $${move.name}$: góc giữa chúng là góc được tô màu.`;
    }
    return `Tịnh tiến $${segName(move.moved)}$ thành $${segName(move.onto)}$ (xanh lá), song song với nó và cắt $${segName(move.fixed)}$ tại $${move.name}$. Góc cần tìm là góc được tô màu.`;
  });

  const feedback = $derived(
    chosen === null
      ? null
      : {
          tone: /** @type {'ok' | 'warn'} */ (chosen === truth ? 'ok' : 'warn'),
          text: `${chosen === truth ? 'Đúng.' : `Chưa đúng: góc đó bằng $${truth}^\\circ$.`} ${explain(pair[0], pair[1])}`,
        },
  );
</script>

<div class="space-y-4">
  <p class="text-base"><LiveRichText text={prompt} /></p>
  <SpaceScene
    points={CUBE}
    faces={FACES}
    {segments}
    {polygons}
    {dots}
    {labels}
    centre={{ x: SIDE / 2, y: SIDE / 2, z: SIDE / 2 }}
    radius={SIDE * 1.15}
    bind:view
    label={`Hình lập phương ABCD.A'B'C'D' với đường thẳng ${names[0]} màu đỏ và đường thẳng ${names[1]} màu xanh${shown && isMovedLine ? `, đường thẳng ${segName(isMovedLine)} màu xanh lá` : ''}`}
  />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.secondary}
      bind:this={moveButton}
      aria-pressed={moved}
      disabled={chosen !== null}
      onclick={() => (moved = !moved)}
      >{moved ? 'Ẩn phép tịnh tiến' : 'Tịnh tiến về chung điểm'}</button
    >
  </div>
  {#if hint}
    <FeedbackNote tone="info" text={hint} />
  {/if}
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn số đo góc">
    {#each ANGLES as a (a)}
      <button
        type="button"
        class={chosen === a ? button.primary : button.secondary}
        aria-pressed={chosen === a}
        disabled={chosen !== null}
        onclick={(e) => answer(a, e.currentTarget)}>{a}°</button
      >
    {/each}
    <button
      type="button"
      class={button.quiet}
      bind:this={nextButton}
      disabled={chosen === null}
      onclick={next}>Cặp khác</button
    >
  </div>
  {#if feedback}
    <FeedbackNote tone={feedback.tone} text={feedback.text} />
  {/if}
  <p class="text-sm text-slate-600" aria-live="polite">Đúng {right} trên {asked} câu.</p>
</div>
