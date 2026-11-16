<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Frac from '#lib/core/frac.svelte';
  import { button } from '#lib/core/ui.js';
  import { sectorPath } from '#lib/core/visuals/svg-math.js';
  import { CIRCLES, TASKS, circleNote, nudge, partsOf, tapAt } from './engine.js';

  const R = 40;
  const GAP = 12;
  const W = CIRCLES * (2 * R + GAP);
  const H = 2 * R + 8;

  let index = $state(0);
  let count = $state(0);

  const task = $derived(TASKS[index % TASKS.length]);
  const d = $derived(task.d);
  const note = $derived(circleNote(count, task));
  const found = $derived(note.tone === 'ok');

  /** @param {number} c */
  const cx = (c) => GAP / 2 + R + c * (2 * R + GAP);

  /** @param {number} c @param {number} p */
  const shaded = (c, p) => c * d + p < count;

  /** @param {number} step */
  function step(step) {
    count = nudge(count, step, d);
  }

  function next() {
    index += 1;
    count = 0;
  }
</script>

<div class="space-y-4">
  <p class="flex flex-wrap items-center justify-center gap-2 text-xl font-semibold text-slate-800">
    Em tô
    {#if task.ask === 'mixed'}
      <Frac whole={task.whole} n={task.n} d={task.d} size="lg" />
    {:else}
      <Frac n={partsOf(task)} d={task.d} size="lg" />
    {/if}
    hình tròn
  </p>

  <!-- Tapping a part is a pointer shortcut; the buttons below are the keyboard route. -->
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-lg select-none"
    role="img"
    aria-label="{CIRCLES} hình tròn, mỗi hình chia {d} phần bằng nhau, đã tô {count} phần"
  >
    {#each { length: CIRCLES } as _, c (c)}
      {#each { length: d } as _, p (p)}
        <path
          d={sectorPath(cx(c), H / 2, R, (360 * p) / d, (360 * (p + 1)) / d)}
          fill={shaded(c, p) ? '#f59e0b' : '#fff'}
          stroke="#334155"
          stroke-width="1.5"
          class="cursor-pointer"
          role="presentation"
          onpointerdown={() => (count = tapAt(count, c, p, d))}
        />
      {/each}
      <circle cx={cx(c)} cy={H / 2} r={R} fill="none" stroke="#0f172a" stroke-width="2.5" />
    {/each}
  </svg>

  <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Tô thêm hoặc bớt">
    <button type="button" class="min-h-14 px-1 text-base {button.quiet}" onclick={() => step(-d)}
      >− 1 hình tròn</button
    >
    <button type="button" class="min-h-14 px-1 text-base {button.quiet}" onclick={() => step(-1)}
      >− 1 phần</button
    >
    <button type="button" class="min-h-14 px-1 text-base {button.secondary}" onclick={() => step(1)}
      >+ 1 phần</button
    >
    <button type="button" class="min-h-14 px-1 text-base {button.secondary}" onclick={() => step(d)}
      >+ 1 hình tròn</button
    >
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if found}
    <p class="text-center text-base text-slate-600">
      Phần phân số luôn bé hơn 1: các phần lẻ chưa đủ một hình tròn.
    </p>
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Số khác
      </button>
    </div>
  {/if}
</div>
