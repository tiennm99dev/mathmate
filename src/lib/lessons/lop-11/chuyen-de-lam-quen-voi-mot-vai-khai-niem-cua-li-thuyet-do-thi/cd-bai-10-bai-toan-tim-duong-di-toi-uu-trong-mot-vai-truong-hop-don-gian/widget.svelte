<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { NAMES } from '../_shared/graph.js';
  import GraphFigure from '../_shared/graph-figure.svelte';
  import { CITY, badgeText, routeText, runFrom, stateAt, stepNote, tableRows } from './engine.js';

  const n = CITY.pos.length;
  const names = NAMES.slice(0, n);
  const vertexOptions = names.map((name, v) => ({ value: v, label: name }));

  let source = $state(0);
  let target = $state(5);
  let k = $state(0);

  const steps = $derived(runFrom(source));
  const s = $derived(stateAt(steps, k, n, source));
  const finished = $derived(k === steps.length);
  const route = $derived(routeText(s, source, target));
  /** Edges on the chosen shortest path. */
  const onPath = $derived(
    route
      ? route.path.slice(1).map((v, i) => {
          const u = route.path[i];
          return CITY.edges.findIndex((e) => (e.a === u && e.b === v) || (e.a === v && e.b === u));
        })
      : [],
  );
  /** Edges of the shortest-path tree found so far. */
  const tree = $derived(
    CITY.edges.flatMap((e, i) =>
      (s.done[e.b] && s.prev[e.b] === e.a) || (s.done[e.a] && s.prev[e.a] === e.b) ? [i] : [],
    ),
  );
  const rows = $derived(tableRows(steps, k, n, source));

  function restart() {
    k = 0;
  }

  const label = $derived(
    `Bản đồ ${n} địa điểm với các con đường: ` +
      CITY.edges.map((e) => `${NAMES[e.a]}${NAMES[e.b]} dài ${e.w} km`).join(', ') +
      '. Nhãn hiện tại: ' +
      names
        .map((name, v) => `${name} ${s.done[v] ? 'vĩnh viễn' : 'tạm thời'} ${badgeText(s, v)}`)
        .join(', ') +
      '.',
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Xuất phát"
      bind:value={source}
      options={vertexOptions}
      onchange={restart}
    />
    <SegmentedControl label="Đích" bind:value={target} options={vertexOptions} />
  </div>

  <GraphFigure
    pos={CITY.pos}
    {names}
    edges={CITY.edges}
    {label}
    weights
    edgeColor={(i) => (onPath.includes(i) ? '#4f46e5' : tree.includes(i) ? '#10b981' : null)}
    edgeBold={(i) => onPath.includes(i)}
    vertexFill={(v) => (s.done[v] ? '#bbf7d0' : s.label[v] < Infinity ? '#fef3c7' : '#ffffff')}
    vertexRing={(v) => (v === s.fixed ? '#059669' : v === target ? '#4f46e5' : null)}
    badge={(v) => badgeText(s, v)}
    badgeTone={(v) => (s.done[v] ? '#047857' : '#b45309')}
  />
  <p class="text-sm text-slate-600">
    Nền xanh: nhãn vĩnh viễn; nền vàng: nhãn tạm thời; số trên cạnh là độ dài (km).
  </p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (k += 1)} disabled={finished}>
      Bước tiếp
    </button>
    <button
      type="button"
      class={button.quiet}
      onclick={() => (k = steps.length)}
      disabled={finished}
    >
      Chạy hết
    </button>
    <button type="button" class={button.quiet} onclick={restart} disabled={k === 0}>Làm lại</button>
  </div>

  <FeedbackNote tone={finished ? 'ok' : 'info'} text={stepNote(steps, k, n, source)} />
  {#if route}
    <FeedbackNote tone="ok" text={route.text} />
  {/if}

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white">
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="sr-only">Bảng nhãn qua từng bước</caption>
      <thead class="bg-slate-50 text-slate-700">
        <tr>
          <th scope="col" class="px-1 py-1.5">Bước</th>
          {#each names as name (name)}<th scope="col" class="px-1 py-1.5">{name}</th>{/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.step)}
          <tr class="border-t border-slate-100">
            <th scope="row" class="px-1 py-1.5 font-semibold text-slate-600">{row.step}</th>
            {#each row.cells as cell, v (v)}
              <td
                class="px-1 py-1.5 {cell.fixed
                  ? 'bg-emerald-100 font-bold text-emerald-800'
                  : 'text-slate-700'}"
                >{cell.text}{#if cell.fixed}<span class="sr-only"> (chốt)</span>{/if}</td
              >
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
