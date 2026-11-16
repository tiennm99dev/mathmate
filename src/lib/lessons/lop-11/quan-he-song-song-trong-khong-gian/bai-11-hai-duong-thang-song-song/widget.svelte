<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { rng } from '#lib/core/drill.js';
  import { button } from '#lib/core/ui.js';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { lerp3 } from '../_shared/space.js';
  import {
    BOX,
    EDGES,
    FACES,
    RELATIONS,
    classify,
    commonPlane,
    explain,
    makePair,
    meetPoint,
    segName,
  } from './engine.js';

  /**
   * Two lines through vertices of a box, one red and one blue: the learner
   * turns the box to see them from every side and says whether they cut each
   * other, are parallel or are skew. The answer shows the plane holding both
   * lines, or the reason no plane holds them.
   */

  const RED = '#DC2626';
  const BLUE = '#2563EB';
  const rand = rng(20231011);

  let pair = $state(makePair(rand));
  /** @type {string | null} */
  let chosen = $state(null);
  let right = $state(0);
  let asked = $state(0);
  let view = $state({ yaw: -35, pitch: 22 });

  const truth = $derived(classify(pair[0], pair[1]));
  const plane = $derived(chosen ? commonPlane(pair[0], pair[1]) : null);
  const meet = $derived(chosen && truth === 'cat' ? meetPoint(pair[0], pair[1]) : null);
  const names = $derived(pair.map(segName));

  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();
  /** @type {HTMLButtonElement[]} */
  let choices = $state([]);

  /** @param {string} id @param {EventTarget | null} from */
  function answer(id, from) {
    if (chosen) return;
    passFocus(/** @type {HTMLButtonElement} */ (from), nextButton);
    chosen = id;
    asked += 1;
    if (id === truth) right += 1;
  }

  function next() {
    passFocus(nextButton, choices[0]);
    pair = makePair(rand);
    chosen = null;
  }

  /** @param {[string, string]} s @param {string} color @param {string} key */
  function long(s, color, key) {
    const a = BOX[s[0]];
    const b = BOX[s[1]];
    return { key, from: lerp3(a, b, -0.35), to: lerp3(a, b, 1.35), color, width: 3, dash: false };
  }

  const segments = $derived([
    ...EDGES.map((e) => ({ key: segName(e), from: e[0], to: e[1], color: '#64748B', width: 1.6 })),
    long(pair[0], RED, 'red'),
    long(pair[1], BLUE, 'blue'),
  ]);
  const polygons = $derived(
    plane ? [{ key: plane.join(''), pts: plane, fill: '#10B981', opacity: 0.25 }] : [],
  );
  const dots = $derived(meet ? [{ at: meet, color: '#059669' }] : []);
  const feedback = $derived(
    chosen === null
      ? null
      : {
          tone: /** @type {'ok' | 'warn'} */ (chosen === truth ? 'ok' : 'warn'),
          text: `${chosen === truth ? 'Đúng.' : `Chưa đúng: đó là hai đường thẳng ${RELATIONS.find((r) => r.id === truth)?.label.toLowerCase()}.`} ${explain(pair[0], pair[1])}`,
        },
  );
</script>

<div class="space-y-4">
  <p class="text-base">
    <LiveRichText
      text={`Đường thẳng $${names[0]}$ (đỏ) và đường thẳng $${names[1]}$ (xanh) có vị trí tương đối thế nào? Xoay hình hộp chữ nhật để nhìn từ nhiều phía.`}
    />
  </p>
  <SpaceScene
    points={BOX}
    faces={FACES}
    {segments}
    {polygons}
    {dots}
    centre={{ x: 2, y: 1.5, z: 1.25 }}
    radius={4.6}
    bind:view
    label={`Hình hộp chữ nhật ABCD.A'B'C'D' với đường thẳng ${names[0]} màu đỏ và đường thẳng ${names[1]} màu xanh`}
  />
  <div class="flex flex-wrap gap-2" role="group" aria-label="Vị trí tương đối của hai đường thẳng">
    {#each RELATIONS as r, i (r.id)}
      <button
        type="button"
        bind:this={choices[i]}
        class={chosen === r.id ? button.primary : button.secondary}
        aria-pressed={chosen === r.id}
        disabled={chosen !== null}
        onclick={(e) => answer(r.id, e.currentTarget)}>{r.label}</button
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
