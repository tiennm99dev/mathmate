<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { FORMULAS, NAMES, TASKS, answerText, coverSlip, workText } from './engine.js';

  /** @typedef {import('./engine.js').Quantity} Quantity */

  /** The three parts of the triangle: s on top, v and t below. */
  const PARTS = /** @type {const} */ ([
    { q: 's', points: '100,8 49.4,100 150.6,100', x: 100, y: 78 },
    { q: 'v', points: '49.4,100 100,100 100,172 9,172', x: 64, y: 146 },
    { q: 't', points: '100,100 150.6,100 191,172 100,172', x: 136, y: 146 },
  ]);

  let index = $state(0);
  /** @type {Quantity | null} */
  let covered = $state(null);
  /** @type {string | null} */
  let slip = $state(null);
  /** @type {number | null} */
  let wrong = $state(null);
  let solved = $state(false);

  const task = $derived(TASKS[index % TASKS.length]);
  const found = $derived(covered === task.unknown);

  const note = $derived.by(() => {
    if (solved) {
      return /** @type {const} */ ({
        tone: 'ok',
        text: `Đúng rồi! ${workText(task)} = ${task.result}. Vậy ${answerText(task)}.`,
      });
    }
    if (slip) return /** @type {const} */ ({ tone: 'warn', text: slip });
    if (found) {
      return /** @type {const} */ ({
        tone: wrong === null ? 'info' : 'warn',
        text:
          wrong === null
            ? `Che ${task.unknown} thì còn lại ${FORMULAS[task.unknown]}. Em tính ${workText(task)}.`
            : `Chưa đúng. Em tính lại ${workText(task)}.`,
      });
    }
    return /** @type {const} */ ({
      tone: 'info',
      text: 'Em chạm vào đại lượng đề bài hỏi để che nó trong tam giác.',
    });
  });

  /** @type {HTMLElement | undefined} */
  let choices = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  /** @param {Quantity} q */
  async function cover(q) {
    if (solved) return;
    covered = q;
    wrong = null;
    slip = q === task.unknown ? null : coverSlip(q);
    if (q === task.unknown) {
      await tick();
      choices?.querySelector('button')?.focus();
    }
  }

  /** @param {KeyboardEvent} e @param {Quantity} q */
  function onkey(e, q) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cover(q);
    }
  }

  /** @param {number} i */
  async function pick(i) {
    if (i !== task.answer) {
      wrong = i;
      return;
    }
    solved = true;
    await tick();
    nextButton?.focus();
  }

  /** @type {SVGSVGElement | undefined} */
  let board = $state();

  async function next() {
    index += 1;
    covered = null;
    slip = null;
    wrong = null;
    solved = false;
    await tick();
    /** @type {SVGGElement | null | undefined} */ (
      board?.querySelector('g[role="button"]')
    )?.focus();
  }
</script>

<div class="space-y-4">
  <p class="rounded-2xl bg-indigo-50 p-3 text-xl font-semibold text-indigo-950">{task.story}</p>

  <div class="flex flex-wrap items-center justify-center gap-4">
    <svg
      bind:this={board}
      viewBox="0 0 200 180"
      class="w-56"
      role="group"
      aria-label="Tam giác công thức s, v, t"
    >
      {#each PARTS as part (part.q)}
        {@const hidden = covered === part.q}
        <g
          role="button"
          tabindex="0"
          class="cursor-pointer outline-none {focusRing} [&:focus-visible>polygon]:stroke-indigo-600 [&:focus-visible>polygon]:stroke-[4]"
          aria-label="Che {part.q}, {NAMES[part.q]}"
          aria-pressed={hidden}
          onclick={() => cover(part.q)}
          onkeydown={(e) => onkey(e, part.q)}
        >
          <polygon
            points={part.points}
            fill={hidden ? '#fde68a' : '#ffffff'}
            stroke="#334155"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <text
            x={part.x}
            y={part.y}
            font-size="34"
            font-weight="700"
            text-anchor="middle"
            fill={hidden ? '#92400e' : '#1e293b'}>{hidden ? '?' : part.q}</text
          >
        </g>
      {/each}
      <circle cx="100" cy="136" r="12" fill="#ffffff" stroke="#334155" />
      <text x="100" y="142" font-size="18" text-anchor="middle" fill="#334155">×</text>
    </svg>

    <div class="text-center">
      <p class="text-lg text-slate-600">s: quãng đường · v: vận tốc · t: thời gian</p>
      {#if covered}
        <p class="mt-2 text-3xl font-bold text-slate-900" aria-live="polite">{FORMULAS[covered]}</p>
      {/if}
    </div>
  </div>

  <KidNote tone={note.tone} text={note.text} />

  {#if found && !solved}
    <div
      class="grid grid-cols-2 gap-2"
      role="group"
      aria-label="Chọn {NAMES[task.unknown]}"
      bind:this={choices}
    >
      {#each task.options as label, i (label)}
        <button
          type="button"
          class="min-h-14 rounded-xl border-2 text-xl font-semibold {focusRing} {wrong === i
            ? 'border-amber-500 bg-amber-50 text-amber-900'
            : 'border-indigo-300 bg-white text-indigo-900 hover:bg-indigo-50'}"
          onclick={() => pick(i)}>{label}</button
        >
      {/each}
    </div>
  {/if}

  {#if solved}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Bài khác</button
      >
    </div>
  {/if}
</div>
