<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    LADDERS,
    TASKS,
    amount,
    linkKey,
    linkLabel,
    linkOf,
    moveText,
    movesFor,
    slipText,
    stepText,
    taskText,
    valuesOf,
  } from './engine.js';

  let index = $state(0);
  let rung = $state(0);
  /** @type {string | null} */
  let slip = $state(null);
  let found = $state(new Set(/** @type {string[]} */ ([])));

  const task = $derived(TASKS[index % TASKS.length]);
  const values = $derived(valuesOf(task));
  const done = $derived(rung >= task.path.length - 1);
  const here = $derived(task.path[rung]);
  const there = $derived(done ? null : task.path[rung + 1]);
  const moves = $derived(there ? movesFor(here, there) : []);
  const log = $derived(task.path.slice(1, rung + 1).map((_, i) => stepText(task, i + 1)));

  const note = $derived.by(() => {
    if (done) {
      const answer = amount(values.at(-1) ?? 0, task.path.at(-1) ?? '');
      return /** @type {const} */ ({
        tone: 'ok',
        text: `Đúng rồi! ${amount(task.value, task.path[0])} = ${answer}.`,
      });
    }
    if (slip) return /** @type {const} */ ({ tone: 'warn', text: slip });
    const way = there && linkOf(here, there).down ? 'bé hơn' : 'lớn hơn';
    return /** @type {const} */ ({
      tone: 'info',
      text: `Từ ${here} sang ${there} (đơn vị ${way}): em nhân hay chia với số nào?`,
    });
  });

  /** @type {HTMLElement | undefined} */
  let choices = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  /** @param {import('./engine.js').Move} move */
  async function choose(move) {
    if (!there) return;
    const right = linkOf(here, there);
    if (move.down !== right.down || move.factor !== right.factor) {
      slip = slipText(here, there, move);
      return;
    }
    slip = null;
    found = new Set([...found, linkKey(here, there)]);
    rung += 1;
    await tick();
    if (rung >= task.path.length - 1) nextButton?.focus();
    else choices?.querySelector('button')?.focus();
  }

  async function next() {
    index += 1;
    rung = 0;
    slip = null;
    await tick();
    choices?.querySelector('button')?.focus();
  }

  /** @param {string} unit */
  function chipClass(unit) {
    if (unit === here) return 'border-rose-500 bg-rose-100 text-rose-900';
    if (task.path.includes(unit)) return 'border-indigo-400 bg-indigo-50 text-indigo-900';
    return 'border-slate-200 bg-white text-slate-500';
  }
</script>

<div class="space-y-4">
  <p class="text-center text-2xl font-bold text-slate-800">
    Đổi: <span class="text-rose-600">{taskText(task)}</span>
  </p>

  <div class="space-y-3" role="group" aria-label="Thang đơn vị đo thời gian">
    {#each LADDERS as ladder (ladder[0])}
      <div class="flex flex-wrap items-center justify-center gap-1">
        {#each ladder as unit, i (unit)}
          {#if i > 0}
            <span
              class="rounded-lg px-1 text-sm font-semibold {found.has(`${ladder[i - 1]}-${unit}`)
                ? 'text-emerald-700'
                : 'text-slate-400'}">← {linkLabel(ladder[i - 1], unit, found)} →</span
            >
          {/if}
          <span
            class="rounded-xl border-2 px-3 py-2 text-lg font-bold {chipClass(unit)}"
            aria-current={unit === here ? 'step' : undefined}>{unit}</span
          >
        {/each}
      </div>
    {/each}
  </div>

  <p class="text-center text-3xl font-bold tabular-nums text-slate-900" aria-live="polite">
    {amount(values[rung], here)}
  </p>

  {#if log.length > 0}
    <ol class="mx-auto max-w-md list-decimal space-y-1 pl-6 text-lg text-slate-700">
      {#each log as line, i (i)}
        <li>{line}</li>
      {/each}
    </ol>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if !done}
    <div
      class="grid grid-cols-2 gap-2"
      role="group"
      aria-label="Chọn phép tính để đổi từ {here} sang {there}"
      bind:this={choices}
    >
      {#each moves as move (moveText(move))}
        <button
          type="button"
          class="min-h-14 rounded-xl border-2 border-indigo-300 bg-white text-2xl font-bold text-indigo-900 hover:bg-indigo-50 {focusRing}"
          aria-label="{move.down ? 'Nhân với' : 'Chia cho'} {move.factor}"
          onclick={() => choose(move)}>{moveText(move)}</button
        >
      {/each}
    </div>
  {:else}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Bài đổi khác</button
      >
    </div>
  {/if}
</div>
