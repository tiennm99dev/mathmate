<script>
  import Frac from '#lib/core/frac.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { SIGNS, SIGN_WORDS } from '#lib/core/kid/numbers.js';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '#lib/core/kid/fraction-note.svelte';
  import FractionStrips from '../_shared/fraction-strips.svelte';
  import { KIND_TITLES, TASKS, compareNote, regroupTex, signOf, stripsOf } from './engine.js';

  let index = $state(0);
  let together = $state(false);
  /** @type {'>' | '<' | '=' | null} */
  let picked = $state(null);
  /** @type {string[]} */
  let tried = $state([]);

  const task = $derived(TASKS[index % TASKS.length]);
  const solved = $derived(picked === signOf(task));
  const strips = $derived(stripsOf(task, together));
  const note = $derived(compareNote(task, picked, together));
  const stripLabel = $derived(
    strips
      .map(
        (s, i) =>
          `Băng ${i === 0 ? 'trên' : 'dưới'}: ${s.text}, tô ${s.n} phần, mỗi đơn vị chia ${s.d} phần`,
      )
      .join('. '),
  );

  /** @param {'>' | '<' | '='} s */
  function choose(s) {
    if (solved) return;
    picked = s;
    if (s !== signOf(task) && !tried.includes(s)) tried = [...tried, s];
  }

  function next() {
    index += 1;
    together = false;
    picked = null;
    tried = [];
  }
</script>

<div class="space-y-4">
  <p class="text-center text-lg font-semibold text-indigo-700">{KIND_TITLES[task.kind]}</p>

  <p
    class="flex flex-wrap items-center justify-center gap-3 text-3xl font-bold text-slate-800"
    aria-live="polite"
  >
    <Frac n={task.a} d={task.b} size="lg" />
    <span
      class="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border-2 {solved
        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
        : 'border-dashed border-slate-400 text-slate-400'}"
      >{#if solved}<span class="sr-only">{SIGN_WORDS[signOf(task)]}</span><span aria-hidden="true"
          >{signOf(task)}</span
        >{:else}<span class="sr-only">dấu gì?</span><span aria-hidden="true">?</span>{/if}</span
    >
    {#if task.kind === 'voi-1'}
      <span class="text-3xl">1</span>
    {:else}
      <Frac n={task.c} d={task.d} size="lg" />
    {/if}
  </p>

  <FractionStrips rows={strips} label={stripLabel} />

  {#if task.kind === 'khac-mau'}
    <div class="flex flex-col items-center gap-2">
      <button
        type="button"
        class="min-h-12 text-lg {together ? button.quiet : button.secondary}"
        aria-pressed={together}
        onclick={() => (together = !together)}
        >{together ? 'Xem lại hai phân số ban đầu' : 'Quy đồng mẫu số'}</button
      >
      {#if together}
        <div class="overflow-x-auto text-xl"><Tex math={regroupTex(task)} /></div>
      {/if}
    </div>
  {/if}

  <div class="flex justify-center gap-3" role="group" aria-label="Chọn dấu">
    {#each SIGNS as s (s)}
      <button
        type="button"
        class="min-h-14 min-w-16 rounded-2xl border-2 text-3xl font-bold {solved && s === picked
          ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
          : tried.includes(s)
            ? 'border-amber-400 bg-amber-50 text-amber-700 line-through'
            : 'border-slate-300 bg-white text-slate-800'}"
        aria-label="Dấu {SIGN_WORDS[s]}"
        aria-disabled={solved}
        onclick={() => choose(s)}>{s}</button
      >
    {/each}
  </div>

  <FractionNote tone={note.tone} text={note.text} />

  <div class="flex justify-center">
    <button
      type="button"
      class="min-h-12 text-lg {solved ? button.primary : button.secondary}"
      onclick={next}>Hai phân số khác</button
    >
  </div>
</div>
