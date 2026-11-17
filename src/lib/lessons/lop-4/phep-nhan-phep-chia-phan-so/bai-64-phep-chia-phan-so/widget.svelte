<script>
  import Frac from '#lib/core/frac.svelte';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '../_shared/fraction-note.svelte';
  import { TASKS, divideNote, flipOptions, measureOf, optionWords, stripLabel } from './engine.js';

  const W = 400;
  const LEFT = 10;
  const RIGHT = 10;
  const ROW = 44;
  const TOP_Y = 6;
  const LOW_Y = 66;
  const HEIGHT = 140;
  const COLORS = ['#f59e0b', '#22c55e'];

  let index = $state(0);
  let laid = $state(0);
  let step = $state(/** @type {import('./engine.js').Step} */ ('lay'));
  /** @type {number[]} */
  let tried = $state([]);
  /** @type {HTMLButtonElement | undefined} */
  let layButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let unlayButton = $state();

  const task = $derived(TASKS[index % TASKS.length]);
  const m = $derived(measureOf(task));
  const cell = $derived((W - LEFT - RIGHT) / (m.wholes * m.L));
  const choice = $derived(flipOptions(task));
  const note = $derived(divideNote(task, laid, step));

  function lay() {
    if (laid < m.q) laid += 1;
    if (laid === m.q && step === 'lay') step = 'flip';
    passFocus(layButton, unlayButton);
  }

  function unlay() {
    if (laid > 0) laid -= 1;
    step = 'lay';
    tried = [];
    passFocus(unlayButton, layButton);
  }

  /** @param {number} i */
  function pick(i) {
    if (step === 'done') return;
    if (i === choice.answer) step = 'done';
    else {
      step = 'flipWrong';
      tried = [...tried, i];
    }
  }

  function next() {
    index += 1;
    laid = 0;
    step = 'lay';
    tried = [];
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-2xl font-semibold text-slate-800">
    Tính <Frac n={task.a} d={task.b} size="lg" /> : <Frac n={task.c} d={task.d} size="lg" />
  </p>

  <svg
    viewBox="0 0 {W} {HEIGHT}"
    class="mx-auto block w-full max-w-md"
    role="img"
    aria-label={stripLabel(task, laid)}
  >
    {#each { length: m.wholes * m.L } as _, k (k)}
      <rect
        x={LEFT + k * cell}
        y={TOP_Y}
        width={cell}
        height={ROW}
        fill={k < m.D ? '#6366f1' : '#ffffff'}
        fill-opacity={k < m.D ? 0.8 : 1}
        stroke="#334155"
        stroke-width="1"
      />
    {/each}
    {#each { length: laid } as _, p (p)}
      <rect
        x={LEFT + p * m.M * cell}
        y={LOW_Y}
        width={m.M * cell}
        height={ROW}
        fill={COLORS[p % 2]}
        stroke="#0f172a"
        stroke-width="2"
      />
      <text
        x={LEFT + (p + 0.5) * m.M * cell}
        y={LOW_Y + ROW / 2 + 7}
        font-size="20"
        font-weight="700"
        text-anchor="middle"
        fill="#0f172a">{p + 1}</text
      >
    {/each}
    {#each { length: m.wholes + 1 } as _, w (w)}
      {@const x = LEFT + w * m.L * cell}
      <line
        x1={x}
        x2={x}
        y1="0"
        y2={HEIGHT - 22}
        stroke="#dc2626"
        stroke-width="2"
        stroke-dasharray="5 4"
      />
      <text {x} y={HEIGHT - 4} font-size="18" font-weight="700" text-anchor="middle" fill="#dc2626"
        >{w}</text
      >
    {/each}
  </svg>

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      bind:this={unlayButton}
      disabled={laid === 0}
      onclick={unlay}>Bỏ bớt 1 đoạn</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {laid < m.q ? button.primary : button.quiet}"
      bind:this={layButton}
      disabled={laid >= m.q}
      onclick={lay}>Đặt thêm 1 đoạn</button
    >
  </div>

  {#if step !== 'lay'}
    <div
      class="flex flex-wrap justify-center gap-3"
      role="group"
      aria-label="Phân số đảo ngược của {optionWords({ n: task.c, d: task.d })}"
    >
      {#each choice.options as f, i (`${f.n}/${f.d}`)}
        <button
          type="button"
          class="min-h-16 min-w-20 text-xl {step === 'done' && i === choice.answer
            ? button.primary
            : button.quiet} {tried.includes(i) ? 'opacity-50' : ''}"
          aria-label={tried.includes(i) ? `${optionWords(f)}, chưa đúng` : optionWords(f)}
          onclick={() => pick(i)}><Frac n={f.n} d={f.d} size="lg" keepOne /></button
        >
      {/each}
    </div>
  {/if}

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {step === 'done' ? button.primary : button.secondary}"
      onclick={next}>Phép chia khác</button
    >
  </div>
</div>
