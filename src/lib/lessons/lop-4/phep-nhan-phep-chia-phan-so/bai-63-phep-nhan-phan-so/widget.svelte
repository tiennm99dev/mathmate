<script>
  import Frac from '#lib/core/frac.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '../_shared/fraction-note.svelte';
  import {
    TASKS,
    cellKind,
    optionWords,
    productNote,
    productOptions,
    squareLabel,
  } from './engine.js';

  const SIZE = 260;
  const PAD = 6;
  const FILL = { both: '#22c55e', col: '#93c5fd', row: '#fde68a', none: '#ffffff' };

  let index = $state(0);
  let cols = $state(0);
  let rows = $state(0);
  let step = $state(/** @type {import('./engine.js').Step} */ ('read'));
  /** @type {number[]} */
  let tried = $state([]);

  const task = $derived(TASKS[index % TASKS.length]);
  const shaded = $derived(cols === task.a && rows === task.c);
  const choice = $derived(productOptions(task));
  const note = $derived(productNote(task, cols, rows, step));
  const cellW = $derived(SIZE / task.b);
  const cellH = $derived(SIZE / task.d);

  /** @param {number} v */
  function setCols(v) {
    cols = v;
    step = 'read';
    tried = [];
  }

  /** @param {number} v */
  function setRows(v) {
    rows = v;
    step = 'read';
    tried = [];
  }

  /** @param {number} i */
  function pick(i) {
    if (step === 'right') return;
    if (i === choice.answer) step = 'right';
    else {
      step = choice.options[i].d === task.b * task.d ? 'miscount' : 'wrong';
      tried = [...tried, i];
    }
  }

  function next() {
    index += 1;
    cols = 0;
    rows = 0;
    step = 'read';
    tried = [];
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-2xl font-semibold text-slate-800">
    Tính <Frac n={task.a} d={task.b} size="lg" /> × <Frac n={task.c} d={task.d} size="lg" />
  </p>

  <svg
    viewBox="0 0 {SIZE + 2 * PAD} {SIZE + 2 * PAD}"
    class="mx-auto block w-full max-w-xs"
    role="img"
    aria-label={squareLabel(task, cols, rows, step === 'right')}
  >
    {#each { length: task.b } as _, c (c)}
      {#each { length: task.d } as _, r (r)}
        <rect
          x={PAD + c * cellW}
          y={PAD + r * cellH}
          width={cellW}
          height={cellH}
          fill={FILL[cellKind(c, r, cols, rows)]}
          stroke="#475569"
          stroke-width="1.5"
        />
      {/each}
    {/each}
    <rect
      x={PAD}
      y={PAD}
      width={SIZE}
      height={SIZE}
      fill="none"
      stroke="#0f172a"
      stroke-width="4"
    />
  </svg>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="rounded-2xl bg-sky-50 p-3 text-center">
      <p class="text-lg text-slate-800">
        Tô xanh <strong class="text-2xl">{cols}</strong> cột trong {task.b} cột
      </p>
      <CountStepper name="cột tô xanh" value={cols} min={0} max={task.b} onchange={setCols} />
    </div>
    <div class="rounded-2xl bg-amber-50 p-3 text-center">
      <p class="text-lg text-slate-800">
        Tô vàng <strong class="text-2xl">{rows}</strong> hàng trong {task.d} hàng
      </p>
      <CountStepper name="hàng tô vàng" value={rows} min={0} max={task.d} onchange={setRows} />
    </div>
  </div>

  {#if shaded}
    <div class="flex flex-wrap justify-center gap-3" role="group" aria-label="Phần tô cả hai màu">
      {#each choice.options as f, i (`${f.n}/${f.d}`)}
        <button
          type="button"
          class="min-h-16 min-w-20 text-xl {step === 'right' && i === choice.answer
            ? button.primary
            : button.quiet} {tried.includes(i) ? 'opacity-50' : ''}"
          aria-label={tried.includes(i) ? `${optionWords(f)}, chưa đúng` : optionWords(f)}
          onclick={() => pick(i)}><Frac n={f.n} d={f.d} size="lg" /></button
        >
      {/each}
    </div>
  {/if}

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {step === 'right' ? button.primary : button.secondary}"
      onclick={next}>Phép nhân khác</button
    >
  </div>
</div>
