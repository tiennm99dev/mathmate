<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import BoxPlot from '../_shared/box-plot.svelte';
  import { num, readSample, sampleText, tex, valueAxis } from '../_shared/sample.js';
  import { PRESETS, deviationRows, spreadOf } from './engine.js';

  const W = 400;
  const H = 160;
  const LEFT = 24;
  const RIGHT = 376;
  const BOX_Y = 92;
  const AXIS = 124;

  let presetId = $state(PRESETS[0].id);
  let text = $state(sampleText(PRESETS[0].values));

  const preset = $derived(PRESETS.find((p) => p.id === presetId));
  const read = $derived(readSample(text));
  const result = $derived('values' in read ? spreadOf(read.values) : null);
  const axis = $derived(
    result ? valueAxis(result.s.min, result.s.max, LEFT, RIGHT) : valueAxis(0, 1, LEFT, RIGHT),
  );
  const inAxis = (/** @type {number} */ v) => v >= axis.min && v <= axis.max;
  const rows = $derived(result && result.s.n <= 12 ? deviationRows(result.s) : []);

  /** @param {string | number} id */
  function choose(id) {
    const p = PRESETS.find((x) => x.id === id);
    if (p) text = sampleText(p.values);
  }

  const label = $derived(
    result
      ? `Biểu đồ hộp: nhỏ nhất ${num(result.s.min, 4)}, Q1 ${num(result.s.q1, 4)}, trung vị ${num(result.s.median, 4)}, Q3 ${num(result.s.q3, 4)}, lớn nhất ${num(result.s.max, 4)}; số trung bình ${num(result.s.mean, 4)}, độ lệch chuẩn ${num(result.s.sd, 4)}.`
      : 'Chưa có số liệu hợp lệ.',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mẫu số liệu có sẵn"
    bind:value={presetId}
    onchange={choose}
    options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
  />

  <label class="block">
    <span class="mb-1 block text-sm font-semibold text-slate-700">
      {preset?.title ?? 'Số liệu'} — sửa hoặc nhập mẫu của em, các số cách nhau bởi dấu chấm phẩy
    </span>
    <textarea
      class="min-h-20 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 tabular-nums {focusRing}"
      spellcheck="false"
      bind:value={text}></textarea>
  </label>

  {#if 'error' in read}
    <FeedbackNote tone="warn" text={read.error} />
  {:else if result}
    {@const s = result.s}
    <GeometryBoard width={W} height={H} maxWidth="max-w-xl" {label}>
      <rect
        x={axis.x(Math.max(axis.min, s.mean - s.sd))}
        y="14"
        width={Math.max(
          0,
          axis.x(Math.min(axis.max, s.mean + s.sd)) - axis.x(Math.max(axis.min, s.mean - s.sd)),
        )}
        height="40"
        fill="#fef3c7"
        stroke="#d97706"
      />
      <line
        x1={axis.x(s.mean)}
        y1="10"
        x2={axis.x(s.mean)}
        y2="58"
        stroke="#d97706"
        stroke-width="2.5"
      />
      <text x={axis.x(s.mean)} y="40" dx="5" font-size="11" fill="#92400e"
        ><tspan text-decoration="overline">x</tspan> ± s</text
      >
      {#each s.sorted as v, i (i)}
        <circle cx={axis.x(v)} cy="62" r="3" fill="#475569" opacity="0.7" />
      {/each}

      {#each [s.low, s.high] as f, i (i)}
        {#if inAxis(f)}
          <line
            x1={axis.x(f)}
            y1="66"
            x2={axis.x(f)}
            y2={AXIS}
            stroke="#e11d48"
            stroke-dasharray="4 3"
          />
        {/if}
      {/each}

      <BoxPlot summary={s} x={axis.x} y={BOX_Y} />

      <line x1={LEFT} y1={AXIS} x2={RIGHT} y2={AXIS} stroke="#64748b" />
      {#each axis.ticks as t (t)}
        <line x1={axis.x(t)} y1={AXIS} x2={axis.x(t)} y2={AXIS + 5} stroke="#64748b" />
        <text x={axis.x(t)} y={AXIS + 20} font-size="11" text-anchor="middle" fill="#475569"
          >{num(t, 4)}</text
        >
      {/each}
    </GeometryBoard>
    <p class="text-sm text-slate-600">
      Dải vàng: từ <Tex math={'\\overline{x} - s'} /> đến <Tex math={'\\overline{x} + s'} />. Hộp:
      từ
      <Tex math="Q_1" /> đến <Tex math="Q_3" />, vạch đen là trung vị; chấm đỏ là giá trị bất
      thường, vạch đỏ đứt là hai giới hạn <Tex math={'Q_1 - 1{,}5\\Delta_Q'} /> và
      <Tex math={'Q_3 + 1{,}5\\Delta_Q'} />.
    </p>

    <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-sm">
      <p>
        <Tex
          math={`n = ${s.n},\\quad Q_1 = ${tex(s.q1, 4)},\\quad M_e = ${tex(s.median, 4)},\\quad Q_3 = ${tex(s.q3, 4)}`}
        />
      </p>
      {#each result.lines as line, i (i)}
        <p><Tex math={line} /></p>
      {/each}
      {#each result.fences.lines as line, i (i)}
        <p><Tex math={line} /></p>
      {/each}
    </div>

    {#if rows.length > 0}
      <details class="rounded-lg border border-slate-200 bg-white p-3 text-sm">
        <summary class="cursor-pointer font-semibold text-slate-700 {focusRing}"
          >Bảng tính phương sai</summary
        >
        <div class="mt-2 overflow-x-auto">
          <table class="w-full text-center tabular-nums">
            <thead>
              <tr class="border-b border-slate-200">
                <th class="py-1"><Tex math="x_i" /></th>
                <th class="py-1"><Tex math={'x_i - \\overline{x}'} /></th>
                <th class="py-1"><Tex math={'(x_i - \\overline{x})^2'} /></th>
              </tr>
            </thead>
            <tbody>
              {#each rows as row, i (i)}
                <tr class="border-b border-slate-100">
                  {#each row as cell, j (j)}<td class="py-1"><Tex math={cell} /></td>{/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </details>
    {/if}

    <FeedbackNote tone={result.fences.tone} text={result.fences.text} />
  {/if}
</div>
