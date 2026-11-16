<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import TallyMarks from '#lib/core/kid/tally-marks.svelte';
  import { button } from '#lib/core/ui.js';
  import { EXPERIMENTS, MAX_TRIALS, runTrials, tallyText } from '../_shared/experiments.js';

  /** Pip positions of a die face, on a 0..60 square. */
  const PIPS = /** @type {Record<string, Array<[number, number]>>} */ ({
    1: [[30, 30]],
    2: [
      [16, 16],
      [44, 44],
    ],
    3: [
      [16, 16],
      [30, 30],
      [44, 44],
    ],
    4: [
      [16, 16],
      [44, 16],
      [16, 44],
      [44, 44],
    ],
    5: [
      [16, 16],
      [44, 16],
      [30, 30],
      [16, 44],
      [44, 44],
    ],
    6: [
      [16, 14],
      [44, 14],
      [16, 30],
      [44, 30],
      [16, 46],
      [44, 46],
    ],
  });

  let pick = $state(0);
  /** @type {number[]} */
  let counts = $state([0, 0]);
  /** @type {number | null} */
  let last = $state(null);

  const exp = $derived(EXPERIMENTS[pick]);
  const total = $derived(counts.reduce((s, c) => s + c, 0));
  const full = $derived(total >= MAX_TRIALS);
  const outcome = $derived(last === null ? null : exp.outcomes[last]);

  /** @param {number} i */
  function choose(i) {
    pick = i;
    counts = EXPERIMENTS[i].outcomes.map(() => 0);
    last = null;
  }

  /** @param {number} times */
  function run(times) {
    const step = runTrials(exp, counts, times, Math.random);
    counts = step.counts;
    if (step.last !== null) last = step.last;
  }
</script>

<div class="space-y-5">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn trò chơi">
    {#each EXPERIMENTS as e, i (e.id)}
      <button
        type="button"
        class="min-h-12 text-base {pick === i ? button.primary : button.quiet}"
        aria-pressed={pick === i}
        onclick={() => choose(i)}>{e.title}</button
      >
    {/each}
  </div>

  <div class="flex items-center gap-4 rounded-2xl bg-amber-50 p-4">
    <svg viewBox="0 0 80 80" class="h-24 w-24 shrink-0" aria-hidden="true">
      {#if !outcome}
        <circle cx="40" cy="40" r="32" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" />
        <text x="40" y="52" text-anchor="middle" font-size="34" font-weight="700" fill="#64748b"
          >?</text
        >
      {:else if exp.id === 'dong-xu'}
        <circle cx="40" cy="40" r="32" fill={outcome.color} stroke="#92400e" stroke-width="4" />
        <circle cx="40" cy="40" r="24" fill="none" stroke="#92400e" stroke-width="2" />
        <text x="40" y="52" text-anchor="middle" font-size="32" font-weight="800" fill="#78350f"
          >{outcome.id}</text
        >
      {:else if exp.id === 'hop-bong'}
        <circle cx="40" cy="40" r="30" fill={outcome.color} stroke="#1e293b" stroke-width="3" />
        <circle cx="30" cy="30" r="7" fill="#ffffff" opacity="0.6" />
      {:else if exp.id === 'lay-but'}
        <rect x="18" y="8" width="16" height="56" rx="4" fill="#2563eb" stroke="#1e293b" />
        <polygon points="18,64 34,64 26,76" fill="#fde68a" stroke="#1e293b" />
        <rect
          x="46"
          y="8"
          width="16"
          height="56"
          rx="4"
          fill={outcome.id === 'cung-mau' ? '#2563eb' : '#eab308'}
          stroke="#1e293b"
        />
        <polygon points="46,64 62,64 54,76" fill="#fde68a" stroke="#1e293b" />
      {:else}
        <rect
          x="10"
          y="10"
          width="60"
          height="60"
          rx="10"
          fill="#ffffff"
          stroke="#1e293b"
          stroke-width="3"
        />
        {#each PIPS[outcome.id] ?? [] as [px, py], k (k)}
          <circle cx={px + 10} cy={py + 10} r="5.5" fill={outcome.color} />
        {/each}
      {/if}
    </svg>
    <div class="space-y-1">
      <p class="text-lg font-semibold text-slate-800">{exp.setup}</p>
      <p class="text-xl font-bold text-indigo-800" aria-live="polite">
        {outcome ? `Lần ${total}: ${outcome.event}.` : 'Em bấm nút để bắt đầu.'}
      </p>
    </div>
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={full}
      onclick={() => run(1)}>{exp.once}</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={full}
      onclick={() => run(10)}>Thêm 10 lần</button
    >
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={() => choose(pick)}
      >Làm lại</button
    >
  </div>

  <div class="overflow-x-auto rounded-2xl bg-white">
    <table class="w-full border-collapse text-lg text-slate-800">
      <caption class="pb-2 text-left text-base font-semibold text-slate-600"
        >Bảng kiểm đếm: {exp.title}</caption
      >
      <thead>
        <tr>
          <th scope="col" class="border-2 border-slate-300 bg-sky-100 px-2 py-2 text-left">
            Sự kiện
          </th>
          <th scope="col" class="border-2 border-slate-300 bg-sky-100 px-2 py-2 text-left">
            Kiểm đếm
          </th>
          <th scope="col" class="border-2 border-slate-300 bg-sky-100 px-2 py-2">Số lần</th>
        </tr>
      </thead>
      <tbody>
        {#each exp.outcomes as o, i (o.id)}
          <tr class={last === i ? 'bg-amber-50' : ''}>
            <th scope="row" class="border-2 border-slate-300 px-2 py-2 text-left font-semibold">
              {o.label}
            </th>
            <td class="border-2 border-slate-300 px-2 py-2"
              ><TallyMarks count={counts[i] ?? 0} settled /></td
            >
            <td
              class="border-2 border-slate-300 px-2 py-2 text-center text-2xl font-bold tabular-nums"
              >{counts[i] ?? 0}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <KidNote
    tone={full ? 'ok' : 'info'}
    text={full ? `${tallyText(exp, counts)} Bảng đã đủ ${MAX_TRIALS} lần.` : tallyText(exp, counts)}
  />
</div>
