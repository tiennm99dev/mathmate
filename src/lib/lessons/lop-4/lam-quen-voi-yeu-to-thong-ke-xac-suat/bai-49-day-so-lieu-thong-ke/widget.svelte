<script>
  import { tick } from 'svelte';
  import ChoiceQuestion from '#lib/core/kid/choice-question.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { tapOption } from '#lib/core/kid/quiz.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { rng } from '#lib/core/drill.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    DIRECTIONS,
    SEQUENCES,
    isOrdered,
    listText,
    moveCard,
    sequenceQuestions,
    sortMessage,
    swapCards,
  } from '../_shared/sequence.js';

  /** The child's own sequence: how many numbers, and the largest one allowed. */
  const OWN = { min: 3, max: 7, top: 30 };

  /** Which sequence: an index into `SEQUENCES`, or -1 for the child's own. */
  let pick = $state(0);
  let own = $state([12, 5, 20, 8, 15]);
  let ownSize = $state(5);
  let dir = $state(/** @type {import('../_shared/sequence.js').Direction} */ ('tang'));
  /** Positions in the recorded sequence, in the order the sorting row shows them. */
  let order = $state([0, 1, 2, 3]);
  /** The card picked by a tap, waiting for a second tap to swap. */
  /** @type {number | null} */
  let chosen = $state(null);
  let moved = $state(false);
  let stage = $state(/** @type {'sort' | 'ask' | 'done'} */ ('sort'));
  let round = $state(1);
  let index = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let phase = $state(/** @type {import('#lib/core/kid/quiz.js').Phase} */ ('ask'));
  /** @type {ReturnType<typeof ChoiceQuestion> | undefined} */
  let question = $state();

  /** The card being dragged: where it started and how far it has moved. */
  /** @type {{ pos: number, x: number, y: number, dx: number, dy: number, moving: boolean } | null} */
  let drag = $state(null);
  /** Set when a drag ends, so the click that follows it is not a tap. */
  let justDragged = false;

  const seq = $derived(
    pick >= 0
      ? SEQUENCES[pick]
      : {
          id: 'cua-em',
          title: 'Dãy số liệu của em',
          unit: '',
          labels: own.map((_, i) => `Số thứ ${i + 1}`),
          values: own,
        },
  );
  const row = $derived(order.map((i) => seq.values[i]));
  const sorted = $derived(isOrdered(row, dir));
  const canAsk = $derived(new Set(seq.values).size >= 2);
  const questions = $derived(sequenceQuestions(seq, rng(round * 7 + pick + 3)));
  const message = $derived(
    !moved && sorted
      ? `Dãy này đã đứng sẵn theo thứ tự ${DIRECTIONS[dir]}. Em đổi sang thứ tự còn lại rồi sắp xếp nhé.`
      : chosen !== null
        ? `Em đã chọn số ${fmt(row[chosen])}. Chạm vào số muốn đổi chỗ với nó.`
        : sortMessage(row, dir),
  );

  /** Puts the sorting row back in the recorded order. */
  function reset() {
    order = seq.values.map((_, i) => i);
    chosen = null;
    moved = false;
    stage = 'sort';
  }

  /** @param {number} i */
  function choose(i) {
    pick = i;
    reset();
  }

  /** @param {number} n */
  function resizeOwn(n) {
    own = Array.from({ length: n }, (_, i) => own[i] ?? (i * 7 + 4) % OWN.top);
    reset();
  }

  /** @param {number} i @param {number} v */
  function setOwn(i, v) {
    own = own.map((x, j) => (j === i ? v : x));
    reset();
  }

  /** @param {number} pos */
  function tap(pos) {
    if (justDragged) {
      justDragged = false;
      return;
    }
    if (stage !== 'sort') return;
    if (chosen === null) {
      chosen = pos;
      return;
    }
    if (chosen !== pos) {
      order = swapCards(order, chosen, pos);
      moved = true;
    }
    chosen = null;
  }

  /** @param {PointerEvent} e @param {number} pos */
  function down(e, pos) {
    if (stage !== 'sort' || e.button !== 0) return;
    drag = { pos, x: e.clientX, y: e.clientY, dx: 0, dy: 0, moving: false };
    /** @type {HTMLElement} */ (e.currentTarget).setPointerCapture(e.pointerId);
  }

  /** @param {PointerEvent} e */
  function move(e) {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    drag = { ...drag, dx, dy, moving: drag.moving || Math.hypot(dx, dy) > 8 };
  }

  /** @param {PointerEvent} e */
  function up(e) {
    if (!drag) return;
    const { pos, moving } = drag;
    drag = null;
    if (!moving) return;
    justDragged = true;
    // The dragged card sits under the pointer, so look through it for the
    // card it was dropped on.
    const target = document
      .elementsFromPoint(e.clientX, e.clientY)
      .map((el) => el.closest('[data-pos]')?.getAttribute('data-pos'))
      .find((p) => p != null && Number(p) !== pos);
    const to = target == null ? pos : Number(target);
    if (to !== pos) {
      order = moveCard(order, pos, to);
      moved = true;
    }
    chosen = null;
  }

  async function startQuestions() {
    stage = 'ask';
    index = 0;
    wrong = [];
    phase = 'ask';
    await tick();
    question?.focus();
  }

  /** @param {number} option */
  function answer(option) {
    const step = tapOption({ phase, wrong }, option, questions[index].answer);
    phase = step.phase;
    wrong = step.wrong;
  }

  async function next() {
    wrong = [];
    phase = 'ask';
    if (index + 1 >= questions.length) {
      stage = 'done';
      round += 1;
      return;
    }
    index += 1;
    await tick();
    question?.focus();
  }
</script>

<div class="space-y-5">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn dãy số liệu">
    {#each SEQUENCES as s, i (s.id)}
      <button
        type="button"
        class="min-h-12 text-base {pick === i ? button.primary : button.quiet}"
        aria-pressed={pick === i}
        onclick={() => choose(i)}>{s.title}</button
      >
    {/each}
    <button
      type="button"
      class="min-h-12 text-base {pick === -1 ? button.primary : button.quiet}"
      aria-pressed={pick === -1}
      onclick={() => choose(-1)}>Dãy của em</button
    >
  </div>

  <div class="space-y-3 rounded-2xl bg-amber-50 p-4">
    <p class="text-xl font-bold text-slate-800">{seq.title}</p>
    {#if pick === -1}
      <Stepper
        label="Số các số"
        bind:value={ownSize}
        min={OWN.min}
        max={OWN.max}
        onchange={resizeOwn}
      />
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {#each own as v, i (i)}
          <Stepper
            label="Số thứ {i + 1}"
            value={v}
            min={0}
            max={OWN.top}
            onchange={(x) => setOwn(i, x)}
          />
        {/each}
      </div>
    {:else}
      <ul class="flex flex-wrap gap-2" aria-label="Ghi chép theo thứ tự">
        {#each seq.values as v, i (i)}
          <li class="flex min-w-16 flex-col items-center rounded-xl bg-white px-2 py-1">
            <span class="text-sm text-slate-600">{seq.labels[i]}</span>
            <span class="text-2xl font-bold tabular-nums text-slate-800">{fmt(v)}</span>
          </li>
        {/each}
      </ul>
    {/if}
    <p class="text-lg font-semibold text-slate-800">
      Dãy số liệu: {listText(seq.values)}{seq.unit ? ` (${seq.unit})` : ''}.
    </p>
  </div>

  <SegmentedControl
    label="Sắp xếp dãy theo thứ tự"
    bind:value={dir}
    options={[
      { value: 'tang', label: 'Từ bé đến lớn' },
      { value: 'giam', label: 'Từ lớn đến bé' },
    ]}
    onchange={() => {
      chosen = null;
      stage = 'sort';
    }}
  />

  <div>
    <p class="mb-2 text-base font-semibold text-slate-600">
      Kéo một số sang chỗ mới, hoặc chạm hai số để đổi chỗ chúng.
    </p>
    <ol class="flex flex-wrap gap-2" aria-label="Hàng số đang sắp xếp">
      {#each order as item, pos (item)}
        <li data-pos={pos}>
          <button
            type="button"
            class="flex h-16 min-w-16 touch-none items-center justify-center rounded-2xl border-4 px-2 text-2xl font-bold tabular-nums transition-colors {focusRing} {chosen ===
            pos
              ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
              : sorted && moved
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-slate-300 bg-white text-slate-800'} {drag?.pos === pos && drag.moving
              ? 'relative z-10 shadow-lg'
              : ''}"
            style:transform={drag?.pos === pos && drag.moving
              ? `translate(${drag.dx}px, ${drag.dy}px)`
              : null}
            aria-pressed={chosen === pos}
            aria-label="Vị trí {pos + 1}: số {fmt(seq.values[item])}{chosen === pos
              ? ', đang chọn'
              : ''}"
            onpointerdown={(e) => down(e, pos)}
            onpointermove={move}
            onpointerup={up}
            onpointercancel={() => (drag = null)}
            onclick={() => tap(pos)}>{fmt(seq.values[item])}</button
          >
        </li>
      {/each}
    </ol>
  </div>

  {#if stage === 'ask'}
    <ChoiceQuestion
      bind:this={question}
      q={questions[index]}
      {phase}
      {wrong}
      onchoose={answer}
      onnext={next}
      nextLabel={index + 1 < questions.length ? 'Câu tiếp' : 'Xong'}
    />
  {:else}
    <KidNote
      tone={stage === 'done' || (sorted && moved) ? 'ok' : 'info'}
      text={stage === 'done' ? 'Giỏi lắm! Em đã sắp xếp và đọc được dãy số liệu.' : message}
    />
  {/if}

  <div class="flex flex-wrap gap-3">
    {#if stage !== 'ask' && canAsk}
      <button
        type="button"
        class="min-h-12 text-lg {sorted && moved ? button.primary : button.secondary}"
        onclick={startQuestions}>Trả lời câu hỏi về dãy</button
      >
    {/if}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={reset}
      >Xếp lại từ đầu</button
    >
  </div>
</div>
