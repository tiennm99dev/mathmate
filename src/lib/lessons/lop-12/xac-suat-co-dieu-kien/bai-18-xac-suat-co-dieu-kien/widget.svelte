<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { EVENTS, PRESETS, explain, inEvent, tally } from './engine.js';

  /** @type {string} */
  let presetId = $state(PRESETS[0].id);
  const preset = $derived(PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]);
  /** @type {number[][]} */
  let counts = $state(PRESETS[0].counts.map((r) => [...r]));
  /** @type {import('./engine.js').EventId} */
  let a = $state('c0');
  /** @type {import('./engine.js').ConditionId} */
  let b = $state('none');

  /** @param {string | number} id */
  function choosePreset(id) {
    const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
    counts = p.counts.map((r) => [...r]);
  }

  /** @param {import('./engine.js').EventId} e */
  const heading = (e) => (e[0] === 'r' ? preset.rows : preset.cols)[Number(e[1])];

  const eventOptions = $derived(EVENTS.map((e) => ({ value: e, label: heading(e) })));
  const conditionOptions = $derived([
    { value: 'none', label: 'Không có' },
    ...EVENTS.map((e) => ({ value: e, label: heading(e) })),
  ]);

  const t = $derived(tally(counts, a, b));
  const note = $derived(explain(counts, a, b));
  const rowSum = $derived(counts.map((r) => r[0] + r[1]));
  const colSum = $derived([counts[0][0] + counts[1][0], counts[0][1] + counts[1][1]]);

  /**
   * @param {number} i
   * @param {number} j
   */
  function cellClass(i, j) {
    if (!inEvent(b, i, j)) return 'bg-slate-100 text-slate-400 line-through';
    if (inEvent(a, i, j)) return 'bg-emerald-100 font-bold text-emerald-900';
    return 'bg-sky-50 text-sky-900';
  }

  /**
   * @param {number} i
   * @param {number} j
   */
  function cellWord(i, j) {
    if (b === 'none') return inEvent(a, i, j) ? 'thuộc A' : 'không thuộc A';
    if (!inEvent(b, i, j)) return 'bị loại khỏi không gian mẫu';
    return inEvent(a, i, j) ? 'thuộc AB' : 'thuộc B, không thuộc A';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tình huống"
    options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
    bind:value={presetId}
    onchange={choosePreset}
  />
  <p class="text-sm text-slate-600"><LiveRichText text={preset.story} /></p>

  <SegmentedControl label="Biến cố A" options={eventOptions} bind:value={a} />
  <SegmentedControl
    label="Điều kiện B (biến cố đã xảy ra)"
    options={conditionOptions}
    bind:value={b}
  />

  <p class="text-sm text-slate-700">
    <b>A</b>: "{preset.events[a]}"{#if b !== 'none'}; <b>B</b>: "{preset.events[b]}"{/if}.
  </p>

  <div class="overflow-x-auto">
    <table class="w-full border-collapse text-center text-sm tabular-nums">
      <caption class="sr-only"
        >Bảng hai chiều; các ô ngoài điều kiện B bị gạch, ô thuộc AB tô xanh lá</caption
      >
      <thead>
        <tr class="text-slate-600">
          <th class="border border-slate-200 p-2"></th>
          {#each preset.cols as c (c)}
            <th scope="col" class="border border-slate-200 p-2 font-semibold">{c}</th>
          {/each}
          <th scope="col" class="border border-slate-200 p-2 font-semibold">Tổng</th>
        </tr>
      </thead>
      <tbody>
        {#each preset.rows as r, i (r)}
          <tr>
            <th scope="row" class="border border-slate-200 p-2 text-left font-semibold">{r}</th>
            {#each [0, 1] as j (j)}
              <td class="border border-slate-200 p-2 text-base {cellClass(i, j)}"
                >{counts[i][j]}<span class="sr-only">, {cellWord(i, j)}</span></td
              >
            {/each}
            <td class="border border-slate-200 p-2">{rowSum[i]}</td>
          </tr>
        {/each}
        <tr>
          <th scope="row" class="border border-slate-200 p-2 text-left font-semibold">Tổng</th>
          <td class="border border-slate-200 p-2">{colSum[0]}</td>
          <td class="border border-slate-200 p-2">{colSum[1]}</td>
          <td class="border border-slate-200 p-2 font-bold">{t.n}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-500">n(Ω)</dt>
      <dd class="text-lg font-bold">{t.n}</dd>
    </div>
    <div class="rounded-lg bg-slate-50 p-2">
      <dt class="text-slate-500">n(A)</dt>
      <dd class="text-lg font-bold">{t.nA}</dd>
    </div>
    <div class="rounded-lg bg-sky-50 p-2">
      <dt class="text-slate-500">n(B)</dt>
      <dd class="text-lg font-bold">{b === 'none' ? '—' : t.nB}</dd>
    </div>
    <div class="rounded-lg bg-emerald-50 p-2">
      <dt class="text-slate-500">n(AB)</dt>
      <dd class="text-lg font-bold">{b === 'none' ? '—' : t.nAB}</dd>
    </div>
  </dl>

  <FeedbackNote tone={note.tone} text={note.text} />

  <details class="rounded-lg border border-slate-200 p-3">
    <summary class="cursor-pointer font-semibold text-slate-700"
      >Thay đổi số liệu trong bảng</summary
    >
    <div class="mt-3 grid gap-3 sm:grid-cols-2">
      {#each preset.rows as r, i (r)}
        {#each preset.cols as c, j (c)}
          <Stepper label="{r}, {c.toLowerCase()}" bind:value={counts[i][j]} min={0} max={80} />
        {/each}
      {/each}
    </div>
  </details>
</div>
