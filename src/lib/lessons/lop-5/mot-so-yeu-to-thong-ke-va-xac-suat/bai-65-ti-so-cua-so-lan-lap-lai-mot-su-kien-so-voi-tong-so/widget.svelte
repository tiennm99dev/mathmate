<script>
  import Frac from '#lib/core/frac.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { polar, sectorPath } from '#lib/core/visuals/svg-math.js';
  import { EXPERIMENTS, MAX_TRIALS, SOCKS, ratioMessage, rowText, runTrials } from './engine.js';

  /** Pip spots of a dice face on a 60 × 60 square. */
  /** @type {Record<number, Array<[number, number]>>} */
  const PIPS = {
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
  };
  const SOCK_COLOR = { do: '#dc2626', xanh: '#2563eb' };

  let pick = $state(0);
  let counts = $state(EXPERIMENTS[0].outcomes.map(() => 0));
  /** @type {{ outcome: number, face: number[] } | null} */
  let last = $state(null);
  /** @type {HTMLButtonElement | undefined} */
  let again = $state();

  const exp = $derived(EXPERIMENTS[pick]);
  const total = $derived(counts.reduce((s, c) => s + c, 0));
  const full = $derived(total >= MAX_TRIALS);

  /** @param {string | number} v */
  function choose(v) {
    pick = Number(v);
    reset();
  }

  function reset() {
    counts = EXPERIMENTS[pick].outcomes.map(() => 0);
    last = null;
  }

  /** @param {MouseEvent} e @param {number} times */
  function run(e, times) {
    const from = /** @type {HTMLButtonElement} */ (e.currentTarget);
    const step = runTrials(exp, counts, times, Math.random);
    counts = step.counts;
    if (step.last) last = step.last;
    passFocus(from, again);
  }

  const cell = 'border-2 border-slate-300 px-2 py-2';
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn thí nghiệm"
    options={EXPERIMENTS.map((x, i) => ({ value: i, label: x.title }))}
    value={pick}
    onchange={choose}
  />

  <div class="flex items-center gap-4 rounded-2xl bg-amber-50 p-4">
    <svg viewBox="0 0 80 80" class="h-24 w-24 shrink-0" aria-hidden="true">
      {#if exp.id === 'vong-quay'}
        <path d={sectorPath(40, 40, 34, 0, 180)} fill="#2563eb" />
        <path d={sectorPath(40, 40, 34, 180, 270)} fill="#eab308" />
        <path d={sectorPath(40, 40, 34, 270, 360)} fill="#dc2626" />
        <circle cx="40" cy="40" r="34" fill="none" stroke="#1e293b" stroke-width="2" />
        {#if last}
          {@const tip = polar(40, 40, 28, last.face[0])}
          <line
            x1="40"
            y1="40"
            x2={tip.x}
            y2={tip.y}
            stroke="#0f172a"
            stroke-width="4"
            stroke-linecap="round"
          />
        {/if}
        <circle cx="40" cy="40" r="5" fill="#0f172a" />
      {:else if !last}
        <circle cx="40" cy="40" r="32" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" />
        <text x="40" y="52" text-anchor="middle" font-size="34" font-weight="700" fill="#64748b"
          >?</text
        >
      {:else if exp.id === 'dong-xu'}
        <circle
          cx="40"
          cy="40"
          r="32"
          fill={exp.outcomes[last.outcome].color}
          stroke="#92400e"
          stroke-width="4"
        />
        <circle cx="40" cy="40" r="24" fill="none" stroke="#92400e" stroke-width="2" />
        <text x="40" y="52" text-anchor="middle" font-size="32" font-weight="800" fill="#78350f"
          >{exp.outcomes[last.outcome].id}</text
        >
      {:else if exp.id === 'lay-tat'}
        {#each last.face as sock, k (k)}
          <path
            d="M{12 + k * 34} 8 h16 v36 q0 6 6 10 l8 6 q4 6 -2 10 h-18 q-10 0 -10 -10 z"
            fill={SOCK_COLOR[SOCKS[sock]]}
            stroke="#1e293b"
            stroke-width="2"
          />
        {/each}
      {:else}
        <rect
          x="10"
          y="10"
          width="60"
          height="60"
          rx="10"
          fill="#fff"
          stroke="#1e293b"
          stroke-width="3"
        />
        {#each PIPS[last.face[0]] ?? [] as [px, py], k (k)}
          <circle cx={px + 10} cy={py + 10} r="5.5" fill="#1e293b" />
        {/each}
      {/if}
    </svg>
    <p class="text-lg font-semibold text-slate-800">{exp.setup}</p>
  </div>

  <div class="flex flex-wrap gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={full}
      onclick={(e) => run(e, 1)}>Thử 1 lần</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={full}
      onclick={(e) => run(e, 10)}>Thêm 10 lần</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={full}
      onclick={(e) => run(e, 100)}>Thêm 100 lần</button
    >
    <button bind:this={again} type="button" class="min-h-12 text-lg {button.quiet}" onclick={reset}
      >Làm lại</button
    >
  </div>

  <div class="overflow-x-auto rounded-2xl bg-white">
    <table class="w-full border-collapse text-lg text-slate-800">
      <caption class="pb-2 text-left text-base font-semibold text-slate-600">
        {exp.title}: {total} lần
      </caption>
      <thead>
        <tr>
          <th scope="col" class="{cell} bg-sky-100 text-left">Khả năng</th>
          <th scope="col" class="{cell} bg-sky-100">Số lần</th>
          <th scope="col" class="{cell} bg-sky-100">Tỉ số</th>
        </tr>
      </thead>
      <tbody>
        {#each exp.outcomes as o, i (o.id)}
          <tr class={last?.outcome === i ? 'bg-amber-50' : ''}>
            <th scope="row" class="{cell} text-left font-semibold">
              {o.label}
              <span class="sr-only">: {rowText(counts[i] ?? 0, total)}</span>
              <span class="mt-1 block h-2 rounded bg-slate-100" aria-hidden="true">
                <span
                  class="block h-2 rounded"
                  style:width="{total ? ((counts[i] ?? 0) / total) * 100 : 0}%"
                  style:background-color={o.color}
                ></span>
              </span>
            </th>
            <td class="{cell} text-center text-2xl font-bold tabular-nums" aria-hidden="true"
              >{counts[i] ?? 0}</td
            >
            <td class="{cell} text-center" aria-hidden="true">
              {#if total > 0}<Frac n={counts[i] ?? 0} d={total} />{:else}–{/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <KidNote tone={full ? 'ok' : 'info'} text={ratioMessage(exp, counts, last?.outcome ?? null)} />
</div>
