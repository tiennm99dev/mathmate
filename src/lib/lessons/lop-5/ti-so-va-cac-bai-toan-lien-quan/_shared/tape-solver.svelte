<script>
  import { tick } from 'svelte';
  import Frac from '#lib/core/frac.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import {
    FIRST,
    drawTask,
    solve,
    stepHint,
    stepLines,
    stepOptions,
    stepQuestion,
  } from './tape.js';

  /**
   * A segment diagram for "find two numbers from their sum (or difference)
   * and their ratio". In "Khám phá" the child sets the ratio and drags the
   * sum or difference and sees every step; in "Tự giải" the child solves a
   * fresh problem step by step by tapping the right value.
   * @type {{ kind: import('./tape.js').TapeKind }}
   */
  let { kind } = $props();

  const GIVEN = $derived(kind === 'sum' ? 'Tổng' : 'Hiệu');
  const U = 28;
  const LEFT = 76;

  let mode = $state(/** @type {string | number} */ ('explore'));
  let m = $state(3);
  let n = $state(5);
  let k = $state(12);

  /** A drawn problem; the book's example until the child asks for another. */
  let drawn = $state(/** @type {import('./tape.js').TapeTask | null} */ (null));
  const task = $derived(drawn ?? FIRST[kind]);
  let found = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLDivElement | undefined} */
  let choices = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const exploring = $derived(mode === 'explore');
  const parts = $derived(kind === 'sum' ? m + n : n - m);
  const shown = $derived(exploring ? { m, n, given: k * parts } : task);
  const sol = $derived(solve(kind, shown));
  const lines = $derived(stepLines(kind, shown));
  const known = $derived(exploring ? 4 : found);
  const done = $derived(!exploring && found === 4);
  const options = $derived(done || exploring ? null : stepOptions(kind, task, found));

  const width = $derived(LEFT + shown.n * U);

  const message = $derived.by(() => {
    if (exploring)
      return `Số bé là ${fmt(sol.small)}, số lớn là ${fmt(sol.big)}. ${GIVEN}: ${fmt(shown.given)}.`;
    if (done) return `Đúng rồi! Số bé là ${fmt(sol.small)}, số lớn là ${fmt(sol.big)}.`;
    if (slip) return slip;
    return stepQuestion(kind, found);
  });

  /** @param {number} v */
  function setM(v) {
    if (n <= v) n = v + 1;
  }

  /** @param {number} i */
  async function choose(i) {
    if (!options) return;
    if (i !== options.answer) {
      tries += 1;
      slip = tries >= 2 ? `Em xem nhé: ${lines[found]}.` : `Chưa đúng. ${stepHint(kind, found)}`;
      return;
    }
    found += 1;
    tries = 0;
    slip = '';
    await tick();
    (found === 4 ? nextButton : choices?.querySelector('button'))?.focus();
  }

  function another() {
    drawn = drawTask(Math.random, kind, task);
    found = 0;
    tries = 0;
    slip = '';
  }

  /**
   * The words a screen reader hears for one row of the diagram.
   * @param {string} name
   * @param {number} count
   * @param {number} value
   */
  const rowText = (name, count, value) =>
    `${name}: ${count} phần${known >= 2 ? `, mỗi phần ${fmt(sol.unit)}` : ''}${
      known >= (name === 'Số bé' ? 3 : 4) ? `, bằng ${fmt(value)}` : ''
    }.`;
</script>

{#snippet row(
  /** @type {string} */ name,
  /** @type {number} */ count,
  /** @type {number} */ y,
  /** @type {number} */ value,
  /** @type {boolean} */ shownValue,
  /** @type {string} */ fill,
)}
  <text x="0" y={y + 13} class="fill-slate-800 text-[14px] font-semibold">{name}</text>
  <text x="0" y={y + 29} class="fill-indigo-700 text-[13px] font-bold"
    >{shownValue ? fmt(value) : '?'}</text
  >
  {#each { length: count } as _, j (j)}
    <rect
      x={LEFT + j * U}
      {y}
      width={U}
      height="30"
      class="{fill} stroke-slate-700"
      stroke-width="1.5"
    />
    {#if known >= 2}
      <text
        x={LEFT + j * U + U / 2}
        y={y + 20}
        text-anchor="middle"
        class="fill-slate-800 text-[11px] font-semibold">{fmt(sol.unit)}</text
      >
    {/if}
  {/each}
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'explore', label: 'Khám phá' },
      { value: 'solve', label: 'Tự giải' },
    ]}
    bind:value={mode}
  />

  {#if exploring}
    <div class="flex flex-wrap gap-4">
      <Stepper label="Số phần của số bé" bind:value={m} min={1} max={8} onchange={setM} />
      <Stepper label="Số phần của số lớn" bind:value={n} min={m + 1} max={9} />
    </div>
    <SliderField
      label="{GIVEN} hai số"
      bind:value={k}
      min={1}
      max={30}
      format={(v) => fmt(v * parts)}
    />
  {/if}

  <p class="text-xl font-semibold text-slate-900">
    {GIVEN} của hai số là {fmt(shown.given)}. Số bé bằng
    <Frac n={shown.m} d={shown.n} size="lg" /> số lớn.
  </p>

  <svg
    viewBox="0 0 {Math.max(width + 70, 300)} {kind === 'sum' ? 100 : 128}"
    class="w-full max-w-xl"
    role="img"
    aria-label="Sơ đồ đoạn thẳng. {rowText('Số bé', shown.m, sol.small)} {rowText(
      'Số lớn',
      shown.n,
      sol.big,
    )} {GIVEN} hai số là {fmt(shown.given)}."
  >
    {@render row('Số bé', shown.m, 8, sol.small, known >= 3, 'fill-sky-200')}
    {@render row('Số lớn', shown.n, 58, sol.big, known >= 4, 'fill-amber-200')}
    {#if kind === 'sum'}
      <path d="M {width + 6} 8 h 8 V 88 h -8" class="fill-none stroke-rose-600" stroke-width="2" />
      <text x={width + 20} y="44" class="fill-rose-700 text-[13px] font-bold">{GIVEN}</text>
      <text x={width + 20} y="60" class="fill-rose-700 text-[13px] font-bold"
        >{fmt(shown.given)}</text
      >
    {:else}
      <path
        d="M {LEFT + shown.m * U} 92 v 8 H {width} v -8"
        class="fill-none stroke-rose-600"
        stroke-width="2"
      />
      <line
        x1={LEFT + shown.m * U}
        y1="2"
        x2={LEFT + shown.m * U}
        y2="92"
        class="stroke-rose-400"
        stroke-dasharray="4 3"
        stroke-width="1.5"
      />
      <text
        x={(LEFT + shown.m * U + width) / 2}
        y="120"
        text-anchor="middle"
        class="fill-rose-700 text-[13px] font-bold">{GIVEN} {fmt(shown.given)}</text
      >
    {/if}
  </svg>

  <ol class="space-y-1 text-lg text-slate-800" aria-label="Bài giải">
    {#each lines.slice(0, known) as line, i (i)}
      <li>{line}</li>
    {/each}
  </ol>

  {#if !exploring}
    {#if options}
      <p class="text-lg font-semibold text-slate-900">{stepQuestion(kind, found)}</p>
      <div
        class="grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="group"
        aria-label="Chọn số đúng"
        bind:this={choices}
      >
        {#each options.options as opt, i (opt)}
          <button
            type="button"
            class="min-h-14 text-xl tabular-nums {button.quiet}"
            onclick={() => choose(i)}>{opt}</button
          >
        {/each}
      </div>
    {/if}
  {/if}

  <KidNote tone={done ? 'ok' : slip ? 'warn' : 'info'} text={message} />

  {#if !exploring}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {done ? button.primary : button.quiet}"
        bind:this={nextButton}
        onclick={another}>Bài khác</button
      >
    </div>
  {/if}
</div>
