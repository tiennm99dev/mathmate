<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import { NAMES, components, degrees } from '../_shared/graph.js';
  import GraphFigure from '../_shared/graph-figure.svelte';
  import { ringLayout } from '../_shared/layout.js';
  import {
    MAX_N,
    MIN_N,
    START,
    boardNote,
    completeEdges,
    handshakeTex,
    keepVertices,
    toggleEdge,
  } from './engine.js';

  const W = 360;
  const H = 270;
  const COMP = ['#e0e7ff', '#fef3c7', '#dcfce7', '#fce7f3', '#e0f2fe', '#ede9fe', '#ffedd5'];

  let n = $state(6);
  let edges = $state(START);
  /** @type {number | null} */
  let picked = $state(null);
  let said = $state('');

  const pos = $derived(ringLayout(n, W, H));
  const deg = $derived(degrees(n, edges));
  const comp = $derived(components(n, edges));
  const note = $derived(boardNote(n, edges));

  /** @param {number} v */
  function tap(v) {
    if (picked === null) {
      picked = v;
      said = `Đã chọn đỉnh ${NAMES[v]}. Chọn đỉnh thứ hai để thêm hoặc bỏ cạnh.`;
    } else if (picked === v) {
      picked = null;
      said = `Bỏ chọn đỉnh ${NAMES[v]}.`;
    } else {
      const before = edges.length;
      edges = toggleEdge(edges, picked, v);
      said = `${edges.length > before ? 'Thêm' : 'Bỏ'} cạnh ${NAMES[picked]}${NAMES[v]}.`;
      picked = null;
    }
  }

  /** @param {number} v */
  function resize(v) {
    edges = keepVertices(edges, v);
    picked = null;
  }

  const label = $derived(
    `Đồ thị có ${n} đỉnh và ${edges.length} cạnh: ` +
      (edges.length ? edges.map((e) => NAMES[e.a] + NAMES[e.b]).join(', ') : 'chưa có cạnh') +
      '. ' +
      deg.map((d, v) => `bậc của ${NAMES[v]} là ${d}`).join(', ') +
      '.',
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-3">
    <Stepper label="Số đỉnh" bind:value={n} min={MIN_N} max={MAX_N} onchange={resize} />
    <button type="button" class={button.quiet} onclick={() => ((edges = []), (picked = null))}>
      Xoá mọi cạnh
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => ((edges = completeEdges(n)), (picked = null))}
    >
      Nối mọi cặp đỉnh
    </button>
  </div>

  <GraphFigure
    {pos}
    names={NAMES.slice(0, n)}
    {edges}
    {label}
    width={W}
    height={H}
    vertexFill={(v) => COMP[comp[v] % COMP.length]}
    vertexRing={(v) => (v === picked ? '#4f46e5' : null)}
    badge={(v) => `bậc ${deg[v]}`}
    badgeTone={(v) => (deg[v] % 2 === 1 ? '#be123c' : '#475569')}
    onvertex={tap}
    vertexLabel={(v) =>
      `Đỉnh ${NAMES[v]}, bậc ${deg[v]}${v === picked ? ', đang chọn' : ''}: chọn để nối hoặc bỏ nối`}
  />
  <p class="sr-only" aria-live="polite">{said}</p>
  <p class="text-sm text-slate-600">
    Chạm một đỉnh rồi chạm đỉnh khác để thêm cạnh (chạm lại hai đỉnh đó để bỏ cạnh). Mỗi màu nền là
    một thành phần liên thông; bậc lẻ ghi màu đỏ.
  </p>

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <Tex math={handshakeTex(n, edges)} />
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
