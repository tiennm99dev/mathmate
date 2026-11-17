<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button } from '#lib/core/ui.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import VariationTable from '../_shared/variation-table.svelte';
  import {
    LETTERS,
    ROMANS,
    ROUNDS,
    check,
    extremaOf,
    graphText,
    summaryText,
    tableOf,
  } from './engine.js';

  const COLORS = { max: '#dc2626', min: '#2563eb' };

  let index = $state(0);
  /** @type {import('./engine.js').Pick[]} */
  let picks = $state(fresh());
  /** @type {Array<{ formula: boolean, table: boolean }> | null} */
  let result = $state(null);

  const round = $derived(ROUNDS[index]);
  const tables = $derived(round.tables.map((i) => tableOf(round.items[i])));
  const ready = $derived(picks.every((p) => p.formula >= 0 && p.table >= 0));

  function fresh() {
    return [0, 1, 2].map(() => ({ formula: -1, table: -1 }));
  }
  function reset() {
    picks = fresh();
    result = null;
  }
  function changed() {
    result = null;
  }
  function submit() {
    result = check(round, picks);
  }
  function next() {
    index = (index + 1) % ROUNDS.length;
    reset();
  }

  /** @param {import('./engine.js').Item} item */
  function pointsOf(item) {
    return extremaOf(item).map((e) => ({ x: e.x, y: e.y, color: COLORS[e.kind] }));
  }
  /** @param {import('./engine.js').Item} item */
  function linesOf(item) {
    return item.asymptotes.map((l) => ({ ...l, color: '#dc2626' }));
  }
  /** @param {import('./engine.js').Item} item */
  function breaksOf(item) {
    return item.nodes.filter((n) => n[0] === 'pole').map((n) => n[1]);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bộ đồ thị"
    options={ROUNDS.map((r, i) => ({ value: i, label: r.label }))}
    bind:value={index}
    onchange={reset}
  />

  <div class="space-y-4">
    <section class="rounded-xl border border-slate-200 bg-white p-3">
      <h3 class="text-sm font-semibold text-slate-700">Ba công thức</h3>
      <ul class="mt-2 grid gap-2 sm:grid-cols-3">
        {#each round.formulas as item, j (j)}
          <li class="flex items-center gap-3">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-800"
              >{LETTERS[j]}</span
            >
            <span class="min-w-0 overflow-x-auto"><Tex math={round.items[item].tex} /></span>
          </li>
        {/each}
      </ul>
    </section>
    <section class="min-w-0 space-y-3 rounded-xl border border-slate-200 bg-white p-3">
      <h3 class="text-sm font-semibold text-slate-700">Ba bảng biến thiên</h3>
      {#each tables as table, j (j)}
        <VariationTable {table} caption="Bảng {ROMANS[j]}" />
      {/each}
    </section>
  </div>

  <div class="space-y-4">
    {#each round.items as item, i (item.tex)}
      {@const r = result?.[i]}
      <section
        class="grid min-w-0 gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      >
        <h3 class="text-sm font-semibold text-slate-700 sm:col-span-2">Đồ thị {i + 1}</h3>
        <GraphBox
          win={round.win}
          label={graphText(item, i + 1)}
          curves={[{ f: item.f, color: '#4f46e5', breaks: breaksOf(item) }]}
          lines={linesOf(item)}
          points={pointsOf(item)}
          height={260}
        />
        <div class="min-w-0 space-y-3">
          <SegmentedControl
            label="Công thức của đồ thị {i + 1}"
            options={LETTERS.map((l, j) => ({ value: j, label: l }))}
            bind:value={picks[i].formula}
            onchange={changed}
          />
          <SegmentedControl
            label="Bảng biến thiên của đồ thị {i + 1}"
            options={ROMANS.map((l, j) => ({ value: j, label: l }))}
            bind:value={picks[i].table}
            onchange={changed}
          />
          {#if r}
            <p
              class="text-sm font-semibold {r.formula && r.table
                ? 'text-emerald-700'
                : 'text-amber-800'}"
            >
              Công thức: {r.formula ? 'đúng' : 'chưa đúng'}; bảng: {r.table ? 'đúng' : 'chưa đúng'}.
            </p>
            {#if !(r.formula && r.table)}
              <p class="text-sm text-slate-700"><LiveRichText text={item.clue} /></p>
            {/if}
          {/if}
        </div>
      </section>
    {/each}
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={submit} disabled={!ready}>Kiểm tra</button
    >
    <button type="button" class={button.quiet} onclick={reset}>Chọn lại</button>
    <button type="button" class={button.quiet} onclick={next}>Bộ tiếp theo</button>
  </div>
  <FeedbackNote
    tone={result ? (result.every((r) => r.formula && r.table) ? 'ok' : 'warn') : 'info'}
    text={result
      ? summaryText(result)
      : ready
        ? 'Đã chọn đủ cho cả ba đồ thị. Bấm “Kiểm tra”.'
        : 'Chọn cho mỗi đồ thị một công thức (A, B, C) và một bảng biến thiên (I, II, III). Điểm đỏ là cực đại, điểm xanh là cực tiểu, nét đứt đỏ là tiệm cận.'}
  />
</div>
