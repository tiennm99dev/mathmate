<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import BoxPlot from '../_shared/box-plot.svelte';
  import { num, readSample, sampleText, valueAxis } from '../_shared/sample.js';
  import { PAIRS, ROWS, comparePair } from './engine.js';

  const W = 400;
  const H = 190;
  const LEFT = 24;
  const RIGHT = 376;
  const AXIS = 160;
  const ROW_Y = [56, 118];
  const COLORS = [
    { stroke: '#4f46e5', fill: '#e0e7ff' },
    { stroke: '#0f766e', fill: '#ccfbf1' },
  ];

  let pairId = $state(PAIRS[0].id);
  let textA = $state(sampleText(PAIRS[0].a));
  let textB = $state(sampleText(PAIRS[0].b));

  const pair = $derived(PAIRS.find((p) => p.id === pairId) ?? PAIRS[0]);
  const readA = $derived(readSample(textA));
  const readB = $derived(readSample(textB));
  const result = $derived(
    'values' in readA && 'values' in readB
      ? comparePair(readA.values, readB.values, pair.names)
      : null,
  );
  const axis = $derived(
    result
      ? valueAxis(
          Math.min(result.a.min, result.b.min),
          Math.max(result.a.max, result.b.max),
          LEFT,
          RIGHT,
        )
      : valueAxis(0, 1, LEFT, RIGHT),
  );

  /** @param {string | number} id */
  function choose(id) {
    const p = PAIRS.find((x) => x.id === id);
    if (!p) return;
    textA = sampleText(p.a);
    textB = sampleText(p.b);
  }

  const error = $derived(
    'error' in readA
      ? `Lớp ${pair.names[0]}: ${readA.error}`
      : 'error' in readB
        ? `Lớp ${pair.names[1]}: ${readB.error}`
        : '',
  );

  /** @param {import('../_shared/sample.js').Summary} s @param {string} name */
  const describe = (s, name) =>
    `lớp ${name}: nhỏ nhất ${num(s.min)}, Q1 ${num(s.q1)}, trung vị ${num(s.median)}, Q3 ${num(s.q3)}, lớn nhất ${num(s.max)}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cặp mẫu số liệu"
    bind:value={pairId}
    onchange={choose}
    options={PAIRS.map((p) => ({ value: p.id, label: p.label }))}
  />
  <p class="text-sm text-slate-600">{pair.title}. Em có thể sửa số liệu của từng lớp.</p>

  <div class="grid gap-3 sm:grid-cols-2">
    {#each [0, 1] as i (i)}
      <label class="block">
        <span class="mb-1 block text-sm font-semibold" style:color={COLORS[i].stroke}
          >Lớp {pair.names[i]}</span
        >
        {#if i === 0}
          <textarea
            class="min-h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 tabular-nums {focusRing}"
            spellcheck="false"
            bind:value={textA}></textarea>
        {:else}
          <textarea
            class="min-h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 tabular-nums {focusRing}"
            spellcheck="false"
            bind:value={textB}></textarea>
        {/if}
      </label>
    {/each}
  </div>

  {#if error}
    <FeedbackNote tone="warn" text={error} />
  {:else if result}
    {@const both = [result.a, result.b]}
    <GeometryBoard
      width={W}
      height={H}
      maxWidth="max-w-xl"
      label="Hai biểu đồ hộp trên cùng một trục: {describe(result.a, pair.names[0])}; {describe(
        result.b,
        pair.names[1],
      )}."
    >
      {#each axis.ticks as t (t)}
        <line x1={axis.x(t)} y1="18" x2={axis.x(t)} y2={AXIS} stroke="#f1f5f9" />
      {/each}
      {#each both as s, i (i)}
        <text x={LEFT} y={ROW_Y[i] - 24} font-size="12" font-weight="700" fill={COLORS[i].stroke}
          >Lớp {pair.names[i]}</text
        >
        <BoxPlot
          summary={s}
          x={axis.x}
          y={ROW_Y[i]}
          color={COLORS[i].stroke}
          fill={COLORS[i].fill}
          mean
        />
      {/each}
      <line x1={LEFT} y1={AXIS} x2={RIGHT} y2={AXIS} stroke="#64748b" />
      {#each axis.ticks as t (t)}
        <line x1={axis.x(t)} y1={AXIS} x2={axis.x(t)} y2={AXIS + 5} stroke="#64748b" />
        <text x={axis.x(t)} y={AXIS + 20} font-size="11" text-anchor="middle" fill="#475569"
          >{num(t)}</text
        >
      {/each}
    </GeometryBoard>
    <p class="text-sm text-slate-600">
      Hình thoi cam là số trung bình, vạch đen là trung vị, chấm đỏ là giá trị bất thường.
    </p>

    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <thead>
          <tr class="border-b border-slate-200 text-left">
            <th class="py-1 pr-2">Số đặc trưng</th>
            <th class="py-1 pr-2" style:color={COLORS[0].stroke}>{pair.names[0]}</th>
            <th class="py-1" style:color={COLORS[1].stroke}>{pair.names[1]}</th>
          </tr>
        </thead>
        <tbody>
          {#each ROWS as row (row.tex)}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1 pr-2 text-left font-normal"
                >{row.label} <Tex math={row.tex} /></th
              >
              <td class="py-1 pr-2">{num(row.get(result.a))}</td>
              <td class="py-1">{num(row.get(result.b))}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div
      class="space-y-1 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-800"
      aria-live="polite"
    >
      {#each result.lines as line, i (i)}
        <p><LiveRichText text={line} /></p>
      {/each}
    </div>
  {/if}
</div>
