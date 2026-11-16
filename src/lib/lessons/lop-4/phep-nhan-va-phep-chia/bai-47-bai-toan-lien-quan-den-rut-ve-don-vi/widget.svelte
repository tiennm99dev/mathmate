<script>
  import { tick } from 'svelte';
  import { button } from '#lib/core/ui.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import {
    FIRST,
    doneText,
    drawTask,
    problemText,
    stepHint,
    stepQuestion,
    tableRows,
    totalOf,
  } from './engine.js';

  let task = $state(FIRST);
  /** How many steps are done: 0, 1 or 2. */
  let found = $state(0);
  let tries = $state(0);
  let slip = $state('');
  /** @type {HTMLDivElement | undefined} */
  let controls = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const done = $derived(found === 2);
  const question = $derived(done ? null : stepQuestion(task, /** @type {0 | 1} */ (found)));
  const message = $derived.by(() => {
    if (done) return doneText(task);
    if (slip) return slip;
    if (found === 1) return `Đúng rồi: ${stepQuestion(task, 0).sentence}. Đó là rút về đơn vị.`;
    return problemText(task);
  });

  /** @param {number} i */
  async function choose(i) {
    if (!question) return;
    if (i !== question.answer) {
      tries += 1;
      const step = /** @type {0 | 1} */ (found);
      slip =
        tries >= 2 ? `Em xem nhé: ${question.sentence}.` : `Chưa đúng. ${stepHint(task, step)}`;
      return;
    }
    found += 1;
    tries = 0;
    slip = '';
    await tick();
    (done ? nextButton : controls?.querySelector('button'))?.focus();
  }

  function another() {
    task = drawTask(Math.random, task);
    found = 0;
    tries = 0;
    slip = '';
  }
</script>

{#snippet group(
  /** @type {number} */ count,
  /** @type {boolean} */ filled,
  /** @type {string} */ tone,
)}
  <div
    class="flex min-h-16 w-full max-w-36 flex-wrap content-start items-start justify-center gap-0.5 rounded-xl border-2 p-1 {tone}"
  >
    {#if filled}
      {#each { length: count } as _, k (k)}
        <Picture name={task.story.picture} size={22} decorative />
      {/each}
    {:else}
      <span class="self-center text-2xl font-bold text-slate-500">?</span>
    {/if}
  </div>
{/snippet}

<div class="space-y-4">
  <p class="text-xl font-semibold text-slate-900">{problemText(task)}</p>

  <div
    role="img"
    aria-label={found === 0
      ? `${task.units} ${task.story.group}, tất cả có ${totalOf(task)} ${task.story.thing}.`
      : `${task.units} ${task.story.group}, mỗi ${task.story.group} ${task.per} ${task.story.thing}.`}
  >
    <p class="mb-1 text-base font-semibold text-slate-700">
      {task.units}
      {task.story.group} có {totalOf(task)}
      {task.story.thing}
    </p>
    {#if found === 0}
      <div class="flex flex-wrap gap-0.5 rounded-xl border-2 border-amber-300 bg-amber-50 p-2">
        {#each { length: totalOf(task) } as _, k (k)}
          <Picture name={task.story.picture} size={22} decorative />
        {/each}
      </div>
    {:else}
      <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {#each { length: task.units } as _, k (k)}
          {@render group(
            task.per,
            true,
            k === 0 ? 'border-indigo-500 bg-indigo-50' : 'border-amber-300 bg-amber-50',
          )}
        {/each}
      </div>
    {/if}
  </div>

  {#if found >= 1}
    <div
      role="img"
      aria-label={done
        ? `${task.ask} ${task.story.group}, mỗi ${task.story.group} ${task.per} ${task.story.thing}.`
        : `${task.ask} ${task.story.group} chưa biết có bao nhiêu ${task.story.thing}.`}
    >
      <p class="mb-1 text-base font-semibold text-slate-700">
        {task.ask}
        {task.story.group} có bao nhiêu {task.story.thing}?
      </p>
      <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {#each { length: task.ask } as _, k (k)}
          {@render group(task.per, done, 'border-emerald-400 bg-emerald-50')}
        {/each}
      </div>
    </div>
  {/if}

  <table class="w-full border-collapse text-center text-lg tabular-nums">
    <thead>
      <tr class="bg-slate-100">
        <th class="border border-slate-300 px-2 py-1">Số {task.story.group}</th>
        <th class="border border-slate-300 px-2 py-1">Số {task.story.thing}</th>
        <th class="border border-slate-300 px-2 py-1">Cách tìm</th>
      </tr>
    </thead>
    <tbody>
      {#each tableRows(task, found) as row, r (r)}
        <tr class={r === found + 1 && !done ? 'bg-amber-50' : ''}>
          {#each row as cell, c (c)}
            <td class="border border-slate-300 px-2 py-1 {c === 1 ? 'font-bold' : ''}">{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <KidNote tone={done ? 'ok' : slip ? 'warn' : 'info'} text={message} />

  {#if question}
    <p class="text-xl font-semibold text-slate-900">{question.prompt}</p>
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" bind:this={controls}>
      {#each question.options as option, i (i)}
        <button
          type="button"
          class="min-h-14 text-2xl tabular-nums {button.quiet}"
          onclick={() => choose(i)}>{option}</button
        >
      {/each}
    </div>
  {/if}

  <button
    type="button"
    class="min-h-12 text-lg {done ? button.primary : button.secondary}"
    bind:this={nextButton}
    onclick={another}>Bài toán khác</button
  >
</div>
