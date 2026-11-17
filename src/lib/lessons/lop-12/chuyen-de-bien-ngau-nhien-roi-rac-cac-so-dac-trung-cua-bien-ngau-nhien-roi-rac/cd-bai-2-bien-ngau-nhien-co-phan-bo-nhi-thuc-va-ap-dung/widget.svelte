<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, tidy } from '#lib/core/number-format.js';
  import { binomialPmf } from '../_shared/distribution.js';
  import { MAX_ROWS, dropMany, feedback, momentsTex, pmfTex } from './engine.js';

  const W = 480;
  const H = 420;
  const PEG_TOP = 34;
  const BIN_BASE = H - 34;
  const BIN_TOP = 250;

  let n = $state(6);
  let pRaw = $state(0.5);
  let k = $state(3);
  const p = $derived(tidy(pRaw, 2));
  let counts = $state(Array(7).fill(0));
  /** @type {boolean[]} */
  let last = $state([]);

  function reset() {
    counts = Array(n + 1).fill(0);
    last = [];
  }

  /** @param {number} count */
  function drop(count) {
    const r = dropMany(counts, n, p, count, Math.random);
    counts = r.counts;
    last = r.last;
  }

  const total = $derived(counts.reduce((s, c) => s + c, 0));
  const pmf = $derived(binomialPmf(n, p));
  const freq = $derived(counts.map((c) => (total ? c / total : 0)));
  const top = $derived(Math.max(0.25, ...pmf.map((v) => v * 1.15), ...freq.map((v) => v * 1.05)));
  const dx = $derived(Math.min(56, (W - 32) / (n + 1)));
  let shownWidth = $state(0);
  /** Font size in viewBox units that renders at least 12 CSS px. */
  const labelFont = $derived(shownWidth > 0 ? Math.max(14, (12 * W) / shownWidth) : 14);
  const rowH = $derived((BIN_TOP - 30 - PEG_TOP) / Math.max(1, n));
  const note = $derived(feedback(counts, n, p));

  /** @param {number} j index from the left, among `count` places */
  const xAt = (j, /** @type {number} */ count) => W / 2 + (j - (count - 1) / 2) * dx;
  /** @param {number} v */
  const yOf = (v) => BIN_BASE - (v / top) * (BIN_BASE - BIN_TOP);

  /** The last ball's way down: the pegs it hit, then its bin. */
  const pathPoints = $derived.by(() => {
    if (last.length !== n) return '';
    const pts = [`${W / 2},${PEG_TOP - 18}`];
    let j = 0;
    for (let r = 0; r < n; r += 1) {
      pts.push(`${xAt(j, r + 1)},${PEG_TOP + r * rowH - 8}`);
      if (last[r]) j += 1;
    }
    pts.push(`${xAt(j, n + 1)},${BIN_TOP - 12}`);
    return pts.join(' ');
  });

  const fmt = (/** @type {number} */ v) => formatNumber(v, 3);
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <Stepper
      label="Số hàng đinh n"
      bind:value={n}
      min={1}
      max={MAX_ROWS}
      onchange={(v) => {
        if (k > v) k = v;
        reset();
      }}
    />
    <SliderField
      label="Xác suất rẽ phải p"
      bind:value={pRaw}
      min={0.1}
      max={0.9}
      step={0.05}
      format={(v) => formatNumber(tidy(v, 2))}
      oninput={reset}
    />
  </div>

  <svg
    bind:clientWidth={shownWidth}
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label="Bảng Galton {n} hàng đinh, xác suất rẽ phải {formatNumber(
      p,
    )}. Số bi ở các ô từ 0 đến {n}: {counts.join(', ')}"
  >
    {#each { length: n } as _, r (r)}
      {#each { length: r + 1 } as _, j (j)}
        <circle cx={xAt(j, r + 1)} cy={PEG_TOP + r * rowH} r="4" fill="#475569" />
      {/each}
    {/each}
    {#if pathPoints}
      <polyline
        points={pathPoints}
        fill="none"
        stroke="#f59e0b"
        stroke-width="3"
        stroke-linejoin="round"
      />
    {/if}

    {#each pmf as prob, b (b)}
      {@const x = xAt(b, n + 1)}
      <rect
        x={x - dx / 2 + 1}
        y={BIN_TOP - 8}
        width={dx - 2}
        height={BIN_BASE - BIN_TOP + 8}
        fill={b === k ? '#e0e7ff' : '#f8fafc'}
        stroke="#cbd5e1"
      />
      <rect
        x={x - dx * 0.3}
        y={yOf(freq[b])}
        width={dx * 0.6}
        height={BIN_BASE - yOf(freq[b])}
        fill="#0d9488"
      />
      <line
        x1={x - dx * 0.42}
        y1={yOf(prob)}
        x2={x + dx * 0.42}
        y2={yOf(prob)}
        stroke="#4338ca"
        stroke-width="3"
      />
      <circle cx={x} cy={yOf(prob)} r="3.5" fill="#4338ca" />
      <text
        {x}
        y={BIN_BASE + labelFont + 4}
        text-anchor="middle"
        font-size={labelFont}
        fill="#334155">{b}</text
      >
    {/each}
    <line x1="16" y1={BIN_BASE} x2={W - 16} y2={BIN_BASE} stroke="#334155" stroke-width="1.5" />
  </svg>

  <div class="flex flex-wrap gap-3 text-xs text-slate-600">
    <span class="flex items-center gap-1"
      ><span class="inline-block h-3 w-3 bg-teal-600"></span> Tần suất bi rơi vào ô k</span
    >
    <span class="flex items-center gap-1"
      ><span class="inline-block h-1 w-4 bg-indigo-700"></span> Xác suất P(X = k)</span
    >
    <span class="flex items-center gap-1"
      ><span class="inline-block h-1 w-4 bg-amber-500"></span> Đường đi của viên bi cuối</span
    >
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => drop(1)}>Thả 1 viên</button>
    <button type="button" class={button.secondary} onclick={() => drop(10)}>Thả 10 viên</button>
    <button type="button" class={button.secondary} onclick={() => drop(100)}>Thả 100 viên</button>
    <button type="button" class={button.quiet} onclick={reset} disabled={total === 0}
      >Làm lại</button
    >
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="space-y-2 rounded-xl border border-indigo-200 bg-white p-3">
    <Stepper label="Ô k (số lần rẽ phải)" bind:value={k} min={0} max={n} />
    <div class="overflow-x-auto">
      <Tex math={pmfTex(n, p, k)} display />
    </div>
    <p class="text-sm text-slate-700">
      Ô {k}: {counts[k] ?? 0} / {total} viên bi, tần suất {fmt(freq[k] ?? 0)}.
    </p>
    <div class="overflow-x-auto">
      <Tex math={momentsTex(n, p)} display />
    </div>
  </div>
</div>
