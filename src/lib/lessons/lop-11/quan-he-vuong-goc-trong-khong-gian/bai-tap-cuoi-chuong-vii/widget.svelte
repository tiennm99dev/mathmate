<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { button, textInput } from '#lib/core/ui.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import {
    CASES,
    EDGES,
    FACES,
    QUESTIONS,
    answerOf,
    figure,
    guideOf,
    hintOf,
    isRight,
    promptOf,
    solutionOf,
  } from './engine.js';

  /**
   * Review questions on the pyramid S.ABCD (square base, SA ⊥ base) that
   * turns on the screen: an angle, a dihedral angle, two distances and the
   * volume. A typed answer is checked; a wrong first answer gives a hint, a
   * second miss or a right answer gives the working, and "Hiện hình gợi ý"
   * draws the line, angle or face the solution uses.
   */

  const GUIDE = '#DC2626';
  const FACE = '#F59E0B';
  const INK = '#1E293B';

  let caseAt = $state(0);
  let qid = $state(/** @type {string | number} */ (QUESTIONS[0].id));
  let typed = $state('');
  let tries = $state(0);
  let solved = $state(false);
  let guide = $state(false);
  let view = $state({ yaw: -35, pitch: 22 });

  const id = $derived(/** @type {import('./engine.js').QuestionId} */ (String(qid)));
  const a = $derived(CASES[caseAt][0]);
  const h = $derived(CASES[caseAt][1]);
  const f = $derived(figure(a, h));
  const g = $derived(guideOf(id, f));
  const unit = $derived(answerOf(id, a, h).unit);
  const done = $derived(solved || tries >= 2);

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const said = $derived.by(() => {
    if (solved) return { tone: 'ok', text: `Đúng rồi! ${solutionOf(id, a, h)}` };
    if (tries >= 2) return { tone: 'warn', text: `Chưa đúng. Lời giải: ${solutionOf(id, a, h)}` };
    if (tries === 1) return { tone: 'warn', text: `Chưa đúng, thử lại. Gợi ý: ${hintOf(id)}` };
    return {
      tone: 'info',
      text: 'Nhập đáp số rồi bấm "Kiểm tra". Có thể xoay hình để nhìn rõ hơn.',
    };
  });

  let invalid = $state(false);

  function fresh() {
    typed = '';
    tries = 0;
    solved = false;
    guide = false;
    invalid = false;
  }

  function nextCase() {
    caseAt = (caseAt + 1) % CASES.length;
    fresh();
  }

  function check() {
    const x = readNumber(typed.replace(/\s*(°|cm³|cm3|cm|độ)\s*$/i, ''));
    if (x === null) {
      invalid = true;
      return;
    }
    invalid = false;
    if (isRight(id, a, h, x)) solved = true;
    else tries += 1;
    if (solved || tries >= 2) guide = true;
  }

  const segments = $derived([
    ...EDGES.map(([p, q]) => ({ key: p + q, from: p, to: q, color: INK, width: 1.8 })),
    ...(guide
      ? g.lines.map(([p, q]) => ({
          key: `g${p}${q}`,
          from: p,
          to: q,
          color: GUIDE,
          width: 3,
        }))
      : []),
  ]);

  const polygons = $derived(
    guide
      ? [
          ...(g.face.length
            ? [{ key: 'face', pts: g.face, fill: FACE, opacity: 0.3, stroke: FACE }]
            : []),
          ...(g.fan.length
            ? [{ key: 'fan', pts: g.fan, fill: GUIDE, opacity: 0.4, stroke: GUIDE }]
            : []),
        ]
      : [],
  );

  const labels = $derived([
    ...['S', 'A', 'B', 'C', 'D'].map((k) => ({ text: k, at: k })),
    ...(guide ? g.dots.map((k) => ({ text: k, at: k, color: GUIDE })) : []),
  ]);

  const dots = $derived(guide ? g.dots.map((k) => ({ at: k, color: GUIDE })) : []);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Câu hỏi"
    options={QUESTIONS.map((q) => ({ value: q.id, label: q.label }))}
    bind:value={qid}
    onchange={fresh}
  />
  <SpaceScene
    points={f}
    faces={FACES}
    {segments}
    {polygons}
    {dots}
    {labels}
    centre={{ x: 1.5, y: 1.5, z: f.S.z / 2 }}
    radius={Math.max(3, f.S.z / 2 + 1) * 1.1}
    bind:view
    label={`Hình chóp S.ABCD có đáy là hình vuông cạnh ${a} cm, SA vuông góc với đáy, SA = ${h} cm`}
  />
  <p class="text-base text-slate-800"><LiveRichText text={promptOf(id, a, h)} /></p>
  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      if (!done) check();
    }}
  >
    <label class="min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Đáp số ({unit})</span>
      <input
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typed}
        disabled={done}
        aria-invalid={invalid}
      />
    </label>
    <button type="submit" class={button.primary} disabled={done}>Kiểm tra</button>
  </form>
  {#if invalid}
    <p class="text-sm text-amber-800" role="alert">Hãy nhập một số, ví dụ 2,4 hoặc 37.</p>
  {/if}
  <FeedbackNote tone={said.tone} text={said.text} />
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      aria-pressed={guide}
      onclick={() => (guide = !guide)}
    >
      {guide ? 'Ẩn hình gợi ý' : 'Hiện hình gợi ý'}
    </button>
    <button type="button" class={button.secondary} onclick={nextCase}>Đổi số liệu</button>
    {#if done}
      <button type="button" class={button.quiet} onclick={fresh}>Làm lại câu này</button>
    {/if}
  </div>
</div>
