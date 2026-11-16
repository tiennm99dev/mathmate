<script>
  import { tick } from 'svelte';
  import DigitPad from '#lib/core/kid/digit-pad.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import CommaStrip from '../_shared/comma-strip.svelte';
  import { divisionRows, grouped, partsOf, writtenSpan } from '../_shared/decimal-ops.js';
  import {
    SHIFT_CHOICES,
    TASKS,
    checkMove,
    checkShift,
    kindOf,
    planOf,
    shiftStrip,
  } from './engine.js';

  let index = $state(0);
  let phase = $state(/** @type {'shift' | 'shifted' | 'divide' | 'done'} */ ('divide'));
  let done = $state(0);
  let misses = $state(0);
  let note = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: '',
    }),
  );

  const pair = $derived(TASKS[index % TASKS.length]);
  const plan = $derived(planOf(pair[0], pair[1]));
  const k = $derived(plan.shift.shift);
  const strip = $derived(shiftStrip(pair[0], k));
  const division = $derived(plan.division);
  const actions = $derived(division.actions);
  const next = $derived(actions[done] ?? null);
  const hasComma = $derived(division.fracLen > 0);
  const columns = $derived(division.digits.length + division.zeros);
  const quotientSoFar = $derived(
    actions
      .slice(0, done)
      .map((a) => (a.kind === 'comma' ? ',' : String(a.digit)))
      .join(''),
  );

  /**
   * Grid column (from 0) of the digit at index `j` of the dividend.
   * @param {number} j
   */
  const gridCol = (j) => j + (hasComma && j >= division.wholeLen ? 1 : 0);
  const total = $derived(columns + (hasComma ? 1 : 0));
  const commaCol = $derived(hasComma ? division.wholeLen : -1);

  /**
   * A row as cells: its text ends under the column of digit `col`.
   * @param {string} text
   * @param {number} col
   */
  function cellsOf(text, col) {
    /** @type {string[]} */
    const cells = Array.from({ length: total }, () => '');
    let at = gridCol(col);
    for (let i = text.length - 1; i >= 0 && at >= 0; i--) {
      if (at === commaCol) at -= 1;
      cells[at] = text[i];
      at -= 1;
    }
    return cells;
  }

  const dividendCells = $derived.by(() => {
    const { whole, frac } = partsOf(plan.shift.dividend);
    /** @type {string[]} */
    const cells = Array.from({ length: total }, () => '');
    (whole + frac).split('').forEach((d, j) => (cells[gridCol(j)] = d));
    if (hasComma) cells[commaCol] = ',';
    return cells;
  });
  const rows = $derived(divisionRows(actions, done).map((r) => cellsOf(r.text, r.col)));
  const activeCol = $derived(
    phase === 'divide' && next && next.kind === 'digit' ? gridCol(next.col) : -1,
  );
  const boardLabel = $derived(
    `Phép chia ${grouped(plan.shift.dividend)} chia ${plan.shift.divisor}. Thương đã viết: ${
      quotientSoFar || 'chưa có'
    }.`,
  );

  /** @type {HTMLDivElement | undefined} */
  let controls = $state();

  async function focusControls() {
    await tick();
    controls?.querySelector('button')?.focus();
  }

  function reset() {
    done = 0;
    misses = 0;
    if (k > 0) {
      phase = 'shift';
      note = {
        tone: 'info',
        text: `Số chia ${pair[1]} là số thập phân. Em dời dấu phẩy để số chia thành số tự nhiên.`,
      };
    } else {
      phase = 'divide';
      note = { tone: 'info', text: `Em chia từ trái sang phải. Chọn chữ số đầu tiên của thương.` };
    }
  }
  reset();

  /** @param {number} pick */
  async function pickShift(pick) {
    const result = checkShift(pair[1], pick);
    note = { tone: result.ok ? 'ok' : 'warn', text: result.ok ? plan.shift.say : result.text };
    if (!result.ok) return;
    phase = 'shifted';
    await focusControls();
  }

  async function startDivide() {
    phase = 'divide';
    note = {
      tone: 'info',
      text: `Em chia ${grouped(plan.shift.dividend)} : ${plan.shift.divisor}. Chọn chữ số đầu tiên của thương.`,
    };
    await focusControls();
  }

  /** @param {number | 'comma'} input */
  async function move(input) {
    if (phase !== 'divide' || !next) return;
    const result = checkMove(next, input, plan.shift.divisor, misses, quotientSoFar.includes(','));
    if (!result.ok) {
      misses += 1;
      note = { tone: 'warn', text: result.text };
      return;
    }
    misses = 0;
    done += 1;
    if (done === actions.length) {
      phase = 'done';
      note = {
        tone: 'ok',
        text: `${result.text} Vậy ${pair[0]} : ${pair[1]} = ${plan.quotient}.`,
      };
      await focusControls();
      return;
    }
    note = { tone: 'ok', text: result.text };
  }

  async function nextTask() {
    index += 1;
    reset();
    await focusControls();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-base font-semibold text-indigo-700">{kindOf(pair[0], pair[1])}</p>
  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">
    {pair[0]} : {pair[1]} = {phase === 'done' ? plan.quotient : '?'}
  </p>

  {#if phase === 'shift' || phase === 'shifted'}
    <div class="space-y-1">
      <p class="text-center text-base text-slate-600">Số bị chia</p>
      <CommaStrip
        digits={strip.digits}
        comma={phase === 'shifted' ? strip.to : strip.from}
        span={writtenSpan(strip.digits, phase === 'shifted' ? strip.to : strip.from)}
        label="Số bị chia {phase === 'shifted' ? grouped(plan.shift.dividend) : pair[0]}"
      />
      <p class="text-center text-base text-slate-600">Số chia</p>
      <p
        class="text-center text-3xl font-bold tabular-nums {phase === 'shifted'
          ? 'text-indigo-700'
          : 'text-slate-900'}"
      >
        {phase === 'shifted' ? plan.shift.divisor : pair[1]}
      </p>
    </div>
    {#if phase === 'shift'}
      <p class="text-center text-lg text-slate-700">Dời dấu phẩy sang bên phải mấy chữ số?</p>
      <div
        class="grid grid-cols-3 gap-2"
        role="group"
        aria-label="Số chữ số dời dấu phẩy"
        bind:this={controls}
      >
        {#each SHIFT_CHOICES as choice (choice)}
          <button
            type="button"
            class="min-h-14 text-2xl {button.quiet}"
            onclick={() => pickShift(choice)}>{choice}</button
          >
        {/each}
      </div>
    {:else}
      <div class="flex justify-center" bind:this={controls}>
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={startDivide}>
          Chia {grouped(plan.shift.dividend)} : {plan.shift.divisor}
        </button>
      </div>
    {/if}
  {:else}
    <div class="flex justify-center overflow-x-auto">
      <div
        class="inline-flex rounded-2xl border-4 border-slate-300 bg-white p-2 text-3xl font-bold tabular-nums"
        role="img"
        aria-label={boardLabel}
      >
        <div class="pr-2">
          <div class="flex">
            {#each dividendCells as c, i (i)}
              <span
                class="flex h-11 items-center justify-center {i === commaCol ? 'w-3' : 'w-7'} {i ===
                activeCol
                  ? 'rounded bg-amber-100'
                  : ''} text-slate-900">{c}</span
              >
            {/each}
          </div>
          {#each rows as row, r (r)}
            <div class="flex">
              {#each row as c, i (i)}
                <span
                  class="flex h-11 items-center justify-center {i === commaCol
                    ? 'w-3'
                    : 'w-7'} text-slate-600">{c}</span
                >
              {/each}
            </div>
          {/each}
        </div>
        <div class="min-w-20 border-l-4 border-slate-700 pl-2">
          <div class="flex h-11 items-center text-slate-900">{plan.shift.divisor}</div>
          <div class="flex h-11 items-center border-t-4 border-slate-700 text-indigo-700">
            {quotientSoFar}
          </div>
        </div>
      </div>
    </div>

    {#if phase === 'divide'}
      <div class="space-y-2" bind:this={controls}>
        <DigitPad label="Chọn chữ số của thương" onpick={(d) => move(d)} />
        <button
          type="button"
          class="min-h-14 w-full text-xl {button.secondary}"
          onclick={() => move('comma')}>Viết dấu phẩy ( , ) vào thương</button
        >
      </div>
    {:else}
      <div class="flex justify-center" bind:this={controls}>
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextTask}>
          Phép chia khác
        </button>
      </div>
    {/if}
  {/if}

  <KidNote tone={note.tone} text={note.text} />
</div>
