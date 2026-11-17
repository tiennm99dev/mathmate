<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { NAMES, degrees } from '../_shared/graph.js';
  import GraphFigure from '../_shared/graph-figure.svelte';
  import { BOARDS, fresh, move, status, theoryNote, undo, walkEdges } from './engine.js';

  /** @type {string} */
  let id = $state('konigsberg');
  /** @type {'euler' | 'hamilton'} */
  let mode = $state('euler');
  let trace = $state(fresh());
  let refused = $state('');
  let showTheory = $state(false);

  const board = $derived(BOARDS[id]);
  const n = $derived(board.pos.length);
  const deg = $derived(degrees(n, board.edges));
  const names = $derived(NAMES.slice(0, n));
  const note = $derived(status(board, mode, trace));
  const lit = $derived(mode === 'euler' ? trace.used : walkEdges(board.edges, trace.walk));
  const cur = $derived(trace.walk.length ? trace.walk[trace.walk.length - 1] : -1);

  function reset() {
    trace = fresh();
    refused = '';
  }

  /** @param {number} v */
  function tap(v) {
    const next = move(board, mode, trace, v);
    if (typeof next === 'string') refused = next;
    else {
      trace = next;
      refused = '';
    }
  }

  const label = $derived(
    `Đồ thị ${board.name} có ${n} đỉnh và ${board.edges.length} cạnh: ` +
      board.edges.map((e) => NAMES[e.a] + NAMES[e.b]).join(', ') +
      '.',
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Đồ thị"
      bind:value={id}
      onchange={reset}
      options={Object.entries(BOARDS).map(([value, b]) => ({ value, label: b.name }))}
    />
    <SegmentedControl
      label="Yêu cầu"
      bind:value={mode}
      onchange={reset}
      options={[
        { value: 'euler', label: 'Qua mọi cạnh (Euler)' },
        { value: 'hamilton', label: 'Qua mọi đỉnh (Hamilton)' },
      ]}
    />
  </div>

  <GraphFigure
    pos={board.pos}
    {names}
    edges={board.edges}
    {label}
    edgeColor={(i) => (lit.includes(i) ? '#4f46e5' : null)}
    edgeBold={(i) => lit.includes(i)}
    vertexFill={(v) => (trace.walk.includes(v) ? '#e0e7ff' : '#ffffff')}
    vertexRing={(v) => (v === cur ? '#4f46e5' : null)}
    badge={(v) => (showTheory ? `bậc ${deg[v]}` : null)}
    badgeTone={(v) => (deg[v] % 2 === 1 ? '#be123c' : '#475569')}
    onvertex={tap}
    vertexLabel={(v) =>
      `Đỉnh ${NAMES[v]}${v === cur ? ', đang đứng' : trace.walk.includes(v) ? ', đã đi qua' : ''}`}
  />

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      onclick={() => ((trace = undo(trace)), (refused = ''))}
      disabled={!trace.walk.length}
    >
      Lùi một bước
    </button>
    <button type="button" class={button.quiet} onclick={reset} disabled={!trace.walk.length}>
      Làm lại
    </button>
    <button
      type="button"
      class={button.secondary}
      aria-pressed={showTheory}
      onclick={() => (showTheory = !showTheory)}
    >
      {showTheory ? 'Ẩn gợi ý' : 'Gợi ý: bậc các đỉnh'}
    </button>
  </div>

  <FeedbackNote tone={refused ? 'warn' : note.tone} text={refused || note.text} />
  {#if showTheory}
    <FeedbackNote tone="info" text={theoryNote(board, mode)} />
  {/if}
</div>
