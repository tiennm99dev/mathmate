<script>
  import { tick } from 'svelte';
  import DigitPad from '#lib/core/kid/digit-pad.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { commaOptions, digitAt, partsOf } from './decimal-ops.js';
  import {
    advance,
    checkDigit,
    layoutLines,
    layoutsDiffer,
    taskOf,
    writtenAt,
  } from './column-task.js';

  /**
   * A column addition or subtraction of decimals the child works through:
   * pick how to set the numbers out (lined up at the comma), then the board
   * lines them up, the child taps each result digit from the right on a digit
   * pad, and finally picks where the comma of the result goes. A subtraction
   * shows the zeros written to fill the minuend in blue.
   * @type {{ op: '+' | '-', tasks: ReadonlyArray<readonly [string, string]> }}
   */
  let { op, tasks } = $props();

  const SIGN = { '+': '+', '-': '−' };
  const NAME = { '+': 'tổng', '-': 'hiệu' };

  let index = $state(0);
  let phase = $state(/** @type {'align' | 'work' | 'comma' | 'done'} */ ('align'));
  let at = $state({ step: 0, entered: 0 });
  let misses = $state(0);
  let note = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: '',
    }),
  );

  const pair = $derived(tasks[index % tasks.length]);
  const a = $derived(pair[0]);
  const b = $derived(pair[1]);
  const task = $derived(taskOf(a, b, op));
  const written = $derived(writtenAt(task.steps, at));
  const active = $derived(phase === 'work' ? (task.steps[at.step]?.exp ?? null) : null);
  const resultWhole = $derived(partsOf(task.result).whole.length);
  const highExp = $derived(Math.max(task.wholeLen, resultWhole) - 1);
  /** Places from the left: highest first, down to the last decimal place. */
  const exps = $derived(Array.from({ length: highExp + task.places + 1 }, (_, i) => highExp - i));
  const layouts = $derived(
    /** @type {const} */ (['right', 'comma']).map((how) => ({
      how,
      lines: layoutLines(a, b, how),
    })),
  );
  const options = $derived.by(() => {
    const list = commaOptions(task.result);
    const turn = index % list.length;
    return [...list.slice(turn), ...list.slice(0, turn)];
  });

  /** Carries shown above a column (+) or the borrowed 1 (−), after its step. */
  const carries = $derived.by(() => {
    /** @type {Record<number, number>} */
    const out = {};
    task.steps.forEach((s, i) => {
      const done = i < at.step || phase !== 'work';
      if (done && s.carryOut > 0) out[s.exp + 1] = s.carryOut;
    });
    return out;
  });
  const borrowed = $derived(
    new Set(
      task.steps.filter((s, i) => s.borrow && (i < at.step || phase !== 'work')).map((s) => s.exp),
    ),
  );
  const resultText = $derived(
    exps
      .map((e) => written.get(e) ?? '')
      .join('')
      .trim(),
  );
  const boardLabel = $derived(
    `Đặt tính ${task.top} ${op === '+' ? 'cộng' : 'trừ'} ${b}, dấu phẩy thẳng cột. ${
      phase === 'done' ? `Kết quả ${task.result}.` : `Đã viết: ${resultText || 'chưa có'}.`
    }`,
  );

  /** @type {HTMLDivElement | undefined} */
  let area = $state();

  async function focusFirst() {
    await tick();
    area?.querySelector('button')?.focus();
  }

  function reset() {
    phase = layoutsDiffer(a, b) ? 'align' : 'work';
    at = task.start;
    misses = 0;
    note = {
      tone: 'info',
      text:
        phase === 'align'
          ? 'Em chọn cách đặt tính đúng.'
          : `Các số có cùng số chữ số ở phần thập phân. Em đặt tính thẳng cột rồi viết chữ số đầu tiên bên phải của ${NAME[op]}.`,
    };
  }

  reset();

  /** @param {'right' | 'comma'} how */
  async function pickLayout(how) {
    if (how === 'right') {
      note = {
        tone: 'warn',
        text: 'Chưa đúng. Các chữ số cùng một hàng phải thẳng cột: dấu phẩy thẳng dấu phẩy, phần mười thẳng phần mười.',
      };
      return;
    }
    phase = 'work';
    note = {
      tone: 'ok',
      text: `Đúng rồi! Dấu phẩy thẳng cột với dấu phẩy.${
        op === '-' && task.top !== a
          ? ` Em viết thêm chữ số 0 vào bên phải ${a} để được ${task.top}.`
          : ''
      } Bây giờ em ${op === '+' ? 'cộng' : 'trừ'} như số tự nhiên, từ phải sang trái.`,
    };
    await focusFirst();
  }

  /** @param {number} digit */
  async function pickDigit(digit) {
    if (phase !== 'work') return;
    const result = checkDigit(task.steps, at, digit, op, misses);
    if (!result.ok) {
      misses += 1;
      note = { tone: 'warn', text: result.text };
      return;
    }
    misses = 0;
    at = advance(task.steps, at);
    if (at.step >= task.steps.length) {
      phase = task.places > 0 ? 'comma' : 'done';
      note = {
        tone: 'ok',
        text: `${result.text} Bây giờ em đặt dấu phẩy ở ${NAME[op]}.`,
      };
      if (phase === 'done') note = { tone: 'ok', text: `${a} ${SIGN[op]} ${b} = ${task.result}` };
      await focusFirst();
      return;
    }
    note = { tone: 'ok', text: result.text };
  }

  /** @param {string} text */
  async function pickComma(text) {
    if (text !== task.result) {
      note = {
        tone: 'warn',
        text: `Chưa đúng. Dấu phẩy ở ${NAME[op]} phải thẳng cột với các dấu phẩy ở trên. Phần thập phân của ${NAME[op]} có ${task.places} chữ số.`,
      };
      return;
    }
    phase = 'done';
    note = {
      tone: 'ok',
      text: `Đúng rồi! ${a} ${SIGN[op]} ${b} = ${task.result}`,
    };
    await focusFirst();
  }

  async function next() {
    index += 1;
    reset();
    await focusFirst();
  }

  /**
   * The digit shown in a row at a place.
   * @param {string} text
   * @param {number} exp
   */
  const cellOf = (text, exp) => digitAt(text, exp) ?? '';
  /** @param {number} exp */
  const padded = (exp) => op === '-' && exp < 0 && -exp > partsOf(a).frac.length;
  const cell = 'relative flex h-12 w-10 items-center justify-center';
</script>

<div class="space-y-4">
  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">
    {a}
    {SIGN[op]}
    {b} = {phase === 'done' ? task.result : '?'}
  </p>

  {#if phase === 'align'}
    <div
      class="grid grid-cols-2 gap-3"
      role="group"
      aria-label="Chọn cách đặt tính"
      bind:this={area}
    >
      {#each layouts as layout (layout.how)}
        <button
          type="button"
          class="flex min-h-24 flex-col items-center justify-center gap-0 py-3 font-mono text-2xl whitespace-pre {button.quiet}"
          aria-label="Cách đặt tính: {layout.lines[0].trim()} ở trên, {layout.lines[1].trim()} ở dưới, thẳng {layout.how ===
          'comma'
            ? 'dấu phẩy'
            : 'lề phải'}"
          onclick={() => pickLayout(layout.how)}
        >
          <span>&nbsp;{layout.lines[0]}</span>
          <span class="border-b-2 border-slate-700">{SIGN[op]}{layout.lines[1]}</span>
        </button>
      {/each}
    </div>
  {:else}
    <div class="flex justify-center overflow-x-auto">
      <div
        class="inline-flex flex-col rounded-2xl border-4 border-slate-300 bg-white px-2 py-1 text-3xl font-bold tabular-nums"
        role="img"
        aria-label={boardLabel}
      >
        <div class="flex">
          <span class="{cell} w-8"></span>
          {#each exps as e (e)}
            {#if e === -1}<span class="{cell} w-4 text-slate-900">,</span>{/if}
            <span
              class="{cell} {active === e ? 'bg-amber-100' : ''} {padded(e)
                ? 'text-sky-600 underline'
                : 'text-slate-800'}"
            >
              {#if carries[e] && op === '+'}
                <span class="absolute top-0 right-0.5 text-base leading-5 text-rose-600"
                  >{carries[e]}</span
                >
              {/if}
              {#if borrowed.has(e)}
                <span class="absolute top-0 left-0 text-base leading-5 text-rose-600">1</span>
              {/if}
              {cellOf(task.top, e)}
            </span>
          {/each}
        </div>
        <div class="flex">
          <span class="{cell} w-8 text-2xl text-slate-600">{SIGN[op]}</span>
          {#each exps as e (e)}
            {#if e === -1}<span class="{cell} w-4 text-slate-900">,</span>{/if}
            <span class="{cell} text-slate-800 {active === e ? 'bg-amber-100' : ''}">
              {#if carries[e] && op === '-'}
                <span class="absolute top-0 left-0 text-sm leading-5 text-rose-600">+1</span>
              {/if}
              {cellOf(b, e)}
            </span>
          {/each}
        </div>
        <div class="mx-1 h-1 rounded bg-slate-700"></div>
        <div class="flex">
          <span class="{cell} w-8"></span>
          {#each exps as e (e)}
            {#if e === -1}<span class="{cell} w-4 text-indigo-700"
                >{phase === 'done' ? ',' : ''}</span
              >{/if}
            <span class="{cell} text-indigo-700 {active === e ? 'bg-amber-100' : ''}"
              >{written.get(e) ?? ''}</span
            >
          {/each}
        </div>
      </div>
    </div>
    {#if op === '-' && task.top !== a}
      <p class="text-center text-base text-slate-600">
        <span class="font-bold text-sky-600 underline">0</span> là chữ số 0 em viết thêm vào số bị trừ.
      </p>
    {/if}

    {#if phase === 'work'}
      <div bind:this={area}>
        <DigitPad label="Chọn chữ số để viết" onpick={pickDigit} />
      </div>
    {:else if phase === 'comma'}
      <p class="text-center text-lg text-slate-700">Dấu phẩy ở {NAME[op]} đặt ở đâu?</p>
      <div
        class="grid grid-cols-3 gap-2"
        role="group"
        aria-label="Chọn {NAME[op]}"
        bind:this={area}
      >
        {#each options as option (option)}
          <button
            type="button"
            class="min-h-14 px-1 text-2xl tabular-nums {button.quiet}"
            onclick={() => pickComma(option)}>{option}</button
          >
        {/each}
      </div>
    {:else}
      <div class="flex justify-center" bind:this={area}>
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
          Phép tính khác
        </button>
      </div>
    {/if}
  {/if}

  <KidNote tone={note.tone} text={note.text} />
</div>
