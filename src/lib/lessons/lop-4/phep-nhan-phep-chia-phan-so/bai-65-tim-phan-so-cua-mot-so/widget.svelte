<script>
  import Frac from '#lib/core/frac.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import Picture from '#lib/core/kid/picture.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '#lib/core/kid/fraction-note.svelte';
  import { MAX_GROUPS, TASKS, groupLabel, partNote, thing } from './engine.js';

  let index = $state(0);
  let groups = $state(1);
  /** @type {number[]} */
  let picked = $state([]);

  const task = $derived(TASKS[index % TASKS.length]);
  const even = $derived(task.N % groups === 0);
  const shared = $derived(groups === task.d);
  const note = $derived(partNote(task, groups, picked.length));

  /** @param {number} v */
  function setGroups(v) {
    groups = v;
    picked = [];
  }

  /** @param {number} k */
  function toggle(k) {
    picked = picked.includes(k) ? picked.filter((p) => p !== k) : [...picked, k];
  }

  function next() {
    index += 1;
    groups = 1;
    picked = [];
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-2xl font-semibold text-slate-800">
    Tìm <Frac n={task.n} d={task.d} size="lg" /> của {task.N}
    {thing(task)}
  </p>

  {#if even && groups > 1}
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Các nhóm">
      {#each { length: groups } as _, k (k)}
        {@const on = picked.includes(k)}
        {#if shared}
          <button
            type="button"
            class="flex min-h-16 flex-wrap content-center justify-center gap-1 rounded-2xl border-4 p-2 {on
              ? 'border-emerald-600 bg-emerald-100'
              : 'border-slate-300 bg-white'}"
            aria-pressed={on}
            aria-label={groupLabel(task, groups, k, on)}
            onclick={() => toggle(k)}
          >
            {#each { length: task.N / groups } as _, j (j)}
              <Picture name={task.picture} size={30} decorative />
            {/each}
          </button>
        {:else}
          <div
            class="flex min-h-16 flex-wrap content-center justify-center gap-1 rounded-2xl border-4 border-dashed border-slate-300 p-2"
            role="img"
            aria-label={groupLabel(task, groups, k, false)}
          >
            {#each { length: task.N / groups } as _, j (j)}
              <Picture name={task.picture} size={30} decorative />
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <div
      class="flex flex-wrap justify-center gap-1 rounded-2xl bg-slate-50 p-3"
      role="img"
      aria-label="{task.N} {thing(task)} chưa chia đều thành {groups} nhóm"
    >
      {#each { length: task.N } as _, j (j)}
        <Picture name={task.picture} size={30} decorative />
      {/each}
    </div>
  {/if}

  <div class="rounded-2xl bg-sky-50 p-3 text-center">
    <p class="text-lg text-slate-800">
      Chia thành <strong class="text-2xl">{groups}</strong> nhóm
    </p>
    <CountStepper name="nhóm" value={groups} min={1} max={MAX_GROUPS} onchange={setGroups} />
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {note.tone === 'ok' ? button.primary : button.secondary}"
      onclick={next}>Bài khác</button
    >
  </div>
</div>
