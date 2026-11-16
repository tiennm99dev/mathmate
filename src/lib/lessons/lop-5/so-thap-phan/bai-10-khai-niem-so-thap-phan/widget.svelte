<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { partsOf } from '../_shared/decimals.js';
  import {
    GAPS,
    TARGETS,
    checkTap,
    choicesOf,
    digitsOf,
    isLast,
    levelsOf,
    marksOf,
    promptOf,
  } from './engine.js';

  const W = 360;
  const PAD = 20;
  const ROW = 84;
  const LINE_Y = 26;

  let index = $state(0);
  let level = $state(0);
  let done = $state(false);
  let note = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const target = $derived(TARGETS[index % TARGETS.length]);
  const digits = $derived(digitsOf(target));
  const parts = $derived(partsOf(target));
  const choices = $derived(choicesOf(target, level));
  /** Rulers on screen: every level reached so far. */
  const rulers = $derived(Array.from({ length: level + 1 }, (_, l) => l));
  const height = $derived(ROW * (level + 1));

  /** @param {number} i */
  const xAt = (i) => PAD + (i * (W - 2 * PAD)) / GAPS;

  /**
   * Whether a level's digit has been found.
   * @param {number} l
   */
  const found = (l) => l < level || done;

  /** @type {HTMLDivElement | undefined} */
  let pad = $state();
  /** @type {HTMLButtonElement | undefined} */
  let again = $state();

  /** @param {number} digit */
  async function tap(digit) {
    if (done) return;
    const result = checkTap(target, level, digit);
    note = result;
    if (!result.ok) return;
    if (isLast(target, level)) {
      done = true;
      await tick();
      again?.focus();
      return;
    }
    level += 1;
    await tick();
    pad?.querySelector('button')?.focus();
  }

  async function next() {
    index += 1;
    level = 0;
    done = false;
    note = null;
    await tick();
    pad?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <div class="flex items-end justify-center gap-2 text-5xl font-bold tabular-nums">
    <span class="flex flex-col items-center">
      <span class={found(0) ? 'text-rose-600' : 'text-slate-900'}>{parts.whole}</span>
      <span class="text-sm font-semibold text-slate-500">{found(0) ? 'phần nguyên' : ''}</span>
    </span>
    <span class="flex flex-col items-center">
      <span class="text-slate-900">,</span><span class="text-sm">&nbsp;</span>
    </span>
    {#each parts.frac.split('') as d, k (k)}
      <span class="flex flex-col items-center">
        <span class={found(k + 1) ? 'text-sky-600' : 'text-slate-900'}>{d}</span>
        <span class="text-sm font-semibold text-slate-500"
          >{found(k + 1) ? (k === 0 ? 'phần mười' : 'phần trăm') : ''}</span
        >
      </span>
    {/each}
  </div>

  <svg
    viewBox="0 0 {W} {height}"
    class="mx-auto block w-full max-w-xl select-none"
    role="img"
    aria-label="Thước phóng to, {level + 1} tầng. {promptOf(target, level)}"
  >
    {#each rulers as l (l)}
      {@const y = l * ROW + LINE_Y}
      {@const marks = marksOf(target, l)}
      {#if found(l) && !isLast(target, l)}
        <rect
          x={xAt(digits[l])}
          y={y - 12}
          width={xAt(1) - xAt(0)}
          height="24"
          fill="#fde68a"
          stroke="#d97706"
        />
        <line
          x1={xAt(digits[l])}
          y1={y + 12}
          x2={xAt(0)}
          y2={y + ROW - 12}
          stroke="#d97706"
          stroke-dasharray="4 3"
        />
        <line
          x1={xAt(digits[l] + 1)}
          y1={y + 12}
          x2={xAt(GAPS)}
          y2={y + ROW - 12}
          stroke="#d97706"
          stroke-dasharray="4 3"
        />
      {/if}
      <line x1={xAt(0)} y1={y} x2={xAt(GAPS)} y2={y} stroke="#0f172a" stroke-width="2" />
      {#each marks as m, i (i)}
        <line
          x1={xAt(i)}
          y1={y - (i === 0 || i === GAPS || i === 5 ? 9 : 6)}
          x2={xAt(i)}
          y2={y + (i === 0 || i === GAPS || i === 5 ? 9 : 6)}
          stroke="#0f172a"
          stroke-width={i === 0 || i === GAPS ? 2 : 1}
        />
        <text
          x={xAt(i)}
          y={y + 26}
          text-anchor="middle"
          font-size={l === 0 ? 13 : 11.5}
          fill="#334155"
          font-weight={i === 0 || i === GAPS ? 700 : 400}>{m}</text
        >
      {/each}
      {#if done && isLast(target, l)}
        <circle cx={xAt(digits[l])} cy={y} r="7" fill="#e11d48" />
      {/if}
    {/each}
  </svg>

  <p class="text-center text-lg text-slate-700">{promptOf(target, level)}</p>

  <div
    class="grid grid-cols-5 gap-2"
    role="group"
    aria-label={isLast(target, level) ? 'Các vạch' : 'Các khoảng'}
    bind:this={pad}
  >
    {#each choices as c (c.label)}
      <button
        type="button"
        class="min-h-12 px-1 text-sm whitespace-nowrap tabular-nums {button.quiet}"
        aria-label={c.aria}
        disabled={done}
        onclick={() => tap(c.digit)}>{c.label}</button
      >
    {/each}
  </div>

  <KidNote
    tone={note === null ? 'info' : note.ok ? 'ok' : 'warn'}
    text={note?.text ?? `Tìm số ${target} trên thước: ${levelsOf(target)} lần chạm.`}
  />

  {#if done}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={again}
        onclick={next}
      >
        Số khác
      </button>
    </div>
  {/if}
</div>
