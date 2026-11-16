<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { ROUNDS, pickValue, pickWay, valueOptions } from './engine.js';

  let index = $state(0);
  /** 'way' while the child looks for the fast way, 'value' while picking the value, 'done' after. */
  let stage = $state(/** @type {'way' | 'value' | 'done'} */ ('way'));
  /** Ways and values already tried and wrong in this round. */
  let tried = $state(/** @type {number[]} */ ([]));
  let note = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: 'Em chọn cách tính nhanh nhất.',
    }),
  );
  let firstTry = $state(0);
  let played = $state(0);
  let missed = false;
  /** @type {HTMLDivElement | undefined} */
  let choices = $state();

  const round = $derived(ROUNDS[index % ROUNDS.length]);
  /** The ways in a turning order, so the fast way is not always in the same place. */
  const order = $derived([0, 1, 2].map((i) => (i + index * 2 + 1) % 3));

  async function focusChoices() {
    await tick();
    /** @type {HTMLButtonElement | null | undefined} */ (
      choices?.querySelector('button:not(:disabled)')
    )?.focus();
  }

  /** @param {number} i */
  function chooseWay(i) {
    const result = pickWay(round, i);
    note = { tone: result.tone, text: result.text };
    if (result.ok) {
      stage = 'value';
      tried = [];
      focusChoices();
    } else {
      tried = [...tried, i];
      missed = true;
      focusChoices();
    }
  }

  /** @param {number} value */
  function chooseValue(value) {
    const result = pickValue(round, value);
    note = { tone: result.tone, text: result.text };
    if (result.ok) {
      stage = 'done';
      played += 1;
      if (!missed) firstTry += 1;
      focusChoices();
    } else {
      tried = [...tried, value];
      missed = true;
      focusChoices();
    }
  }

  function next() {
    index += 1;
    stage = 'way';
    tried = [];
    missed = false;
    note = { tone: 'info', text: 'Em chọn cách tính nhanh nhất.' };
    focusChoices();
  }
</script>

<div class="space-y-4">
  <div class="rounded-2xl bg-indigo-50 px-4 py-4 text-center">
    <p class="text-base font-semibold text-indigo-900">Tính bằng cách thuận tiện</p>
    <p class="mt-1 text-3xl font-bold text-slate-900 tabular-nums">{round.expr}</p>
  </div>

  <div bind:this={choices} class="space-y-3">
    {#if stage === 'way'}
      <div class="grid gap-2" role="group" aria-label="Các cách tính">
        {#each order as i (i)}
          <button
            type="button"
            class="min-h-14 justify-start text-left text-xl tabular-nums {button.quiet}"
            disabled={tried.includes(i)}
            onclick={() => chooseWay(i)}>{round.ways[i].text}</button
          >
        {/each}
      </div>
    {:else}
      <ol class="space-y-1 rounded-2xl bg-slate-50 px-4 py-3 text-xl text-slate-800 tabular-nums">
        {#each round.steps as line, i (i)}
          <li>{line}</li>
        {/each}
      </ol>
      {#if stage === 'value'}
        <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn kết quả">
          {#each valueOptions(round) as value (value)}
            <button
              type="button"
              class="min-h-14 px-1 text-xl tabular-nums {button.quiet}"
              disabled={tried.includes(value)}
              onclick={() => chooseValue(value)}>{fmt(value)}</button
            >
          {/each}
        </div>
      {:else}
        <div class="flex justify-center">
          <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
            Biểu thức khác
          </button>
        </div>
      {/if}
    {/if}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <p class="text-center text-base text-slate-600" aria-live="polite">
    Đã làm {played} biểu thức, {firstTry} biểu thức đúng ngay lần đầu.
  </p>
</div>
