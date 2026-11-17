<script>
  import { clipToBox } from '#lib/algebra-engine/system.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import {
    constraintTex,
    constraintText,
    levelSegment,
    levelVerdict,
    namedVertices,
    objectiveTex,
    optimum,
    pointText,
    regionPolygon,
    valueRange,
  } from './lp.js';

  /**
   * A linear programming problem solved by sweeping the level line F = k
   * across its feasible region, with the table of F at the vertices.
   *
   * - `problems`: the problems to switch between (`LpProblem` in `./lp-problems.js`).
   *
   * @type {{ problems: import('./lp-problems.js').LpProblem[] }}
   */
  let { problems } = $props();

  const COLORS = ['#0f766e', '#4f46e5', '#be123c', '#0369a1', '#7c3aed', '#a16207'];
  const LEVEL = '#ea580c';

  let index = $state(0);
  const pr = $derived(problems[index] ?? problems[0]);
  const plane = $derived(planeScale({ ...pr.box, width: 440 }));
  const poly = $derived(regionPolygon(pr.constraints, pr.box));
  const vertices = $derived(namedVertices(pr.constraints, pr.box, pr.p, pr.q));
  const range = $derived(valueRange(poly, pr.p, pr.q));
  const best = $derived(optimum(pr.constraints, pr.box, pr.p, pr.q, pr.goal));
  const lo = $derived(Math.floor(range.min / pr.kStep) * pr.kStep);
  const hi = $derived(Math.ceil(range.max / pr.kStep) * pr.kStep);
  // The slider runs past the region on both sides, so the level line can leave it.
  const margin = $derived(Math.ceil((hi - lo) / 8 / pr.kStep) * pr.kStep);
  const kMin = $derived(lo - margin);
  const kMax = $derived(hi + margin);

  /** The first level line sits on the side away from the optimum. */
  function startK() {
    const p = problems[index] ?? problems[0];
    const r = valueRange(regionPolygon(p.constraints, p.box), p.p, p.q);
    const lo = Math.floor(r.min / p.kStep) * p.kStep;
    const hi = Math.ceil(r.max / p.kStep) * p.kStep;
    const quarter = Math.round((hi - lo) / 4 / p.kStep) * p.kStep;
    return p.goal === 'max' ? lo + quarter : hi - quarter;
  }

  let k = $state(startK());
  let showTable = $state(false);

  /** @param {string | number} value */
  function choose(value) {
    index = Number(value);
    k = startK();
    showTable = false;
  }

  const borders = $derived(
    pr.constraints.map((c, i) => ({
      c,
      color: COLORS[i % COLORS.length],
      seg: clipToBox(c, pr.box.xMin, pr.box.xMax, pr.box.yMin, pr.box.yMax),
    })),
  );
  const fullLine = $derived(
    clipToBox({ a: pr.p, b: pr.q, c: k }, pr.box.xMin, pr.box.xMax, pr.box.yMin, pr.box.yMax),
  );
  const inside = $derived(levelSegment(poly, pr.p, pr.q, k));
  const verdict = $derived(levelVerdict(pr.constraints, pr.box, pr.p, pr.q, pr.goal, k));
  const points = $derived(poly.map((pt) => `${plane.mx(pt.x)},${plane.my(pt.y)}`).join(' '));
  const goalWord = $derived(pr.goal === 'max' ? 'lớn nhất' : 'nhỏ nhất');
  const plotLabel = $derived(
    `Miền chấp nhận được của ${pr.constraints.map(constraintText).join('; ')}. Các đỉnh: ${vertices.map((v) => `${v.name}${pointText(v.pt)}`).join(', ')}. Đường mức F = ${formatNumber(k)}.`,
  );
</script>

<div class="space-y-4">
  {#if problems.length > 1}
    <SegmentedControl
      label="Bài toán"
      bind:value={index}
      onchange={choose}
      options={problems.map((p, i) => ({ value: i, label: p.label }))}
    />
  {/if}
  <p class="text-sm text-slate-700"><LiveRichText text={pr.story} /></p>

  <div class="flex flex-wrap gap-2 text-sm">
    {#each borders as b (constraintText(b.c))}
      <span class="rounded-lg border-2 bg-white px-2 py-1" style:border-color={b.color}>
        <Tex math={constraintTex(b.c)} ariaLabel={constraintText(b.c)} />
      </span>
    {/each}
  </div>

  <CoordinatePlane {plane} label={plotLabel} interactive={false} labelEvery={pr.labelEvery}>
    {#snippet children(pl)}
      {#if poly.length}
        <polygon {points} fill="#10b981" fill-opacity="0.18" stroke="none" />
      {/if}
      {#each borders as b (constraintText(b.c))}
        {#if b.seg}
          <line
            x1={pl.mx(b.seg[0].x)}
            y1={pl.my(b.seg[0].y)}
            x2={pl.mx(b.seg[1].x)}
            y2={pl.my(b.seg[1].y)}
            stroke={b.color}
            stroke-width="1.5"
          />
        {/if}
      {/each}
      {#if fullLine}
        <line
          x1={pl.mx(fullLine[0].x)}
          y1={pl.my(fullLine[0].y)}
          x2={pl.mx(fullLine[1].x)}
          y2={pl.my(fullLine[1].y)}
          stroke={LEVEL}
          stroke-width="1.5"
          stroke-dasharray="6 4"
        />
      {/if}
      {#if inside}
        <line
          x1={pl.mx(inside[0].x)}
          y1={pl.my(inside[0].y)}
          x2={pl.mx(inside[1].x)}
          y2={pl.my(inside[1].y)}
          stroke={LEVEL}
          stroke-width="4"
          stroke-linecap="round"
        />
      {/if}
      {#each vertices as v (v.name)}
        {@const top = showTable && best?.at.some((w) => w.name === v.name)}
        <circle
          cx={pl.mx(v.pt.x)}
          cy={pl.my(v.pt.y)}
          r={top ? 6 : 4}
          fill={top ? LEVEL : '#0f172a'}
        />
        <text
          x={pl.mx(v.pt.x) + 6}
          y={pl.my(v.pt.y) - 6}
          font-size="13"
          font-weight="700"
          fill="#0f172a"
          style="pointer-events:none">{v.name}</text
        >
      {/each}
    {/snippet}
  </CoordinatePlane>

  <div class="space-y-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
    <p class="text-center">
      <Tex math={`${objectiveTex(pr.p, pr.q)} \\to \\text{${goalWord}}`} />
    </p>
    <SliderField
      label="Đường mức F = k, kéo k"
      bind:value={k}
      min={kMin}
      max={kMax}
      step={pr.kStep}
      oninput={() => (showTable = false)}
    />
  </div>

  <FeedbackNote tone={verdict.tone} text={verdict.text} />

  <button type="button" class={button.secondary} onclick={() => (showTable = !showTable)}>
    {showTable ? 'Ẩn bảng giá trị' : 'Tính F tại các đỉnh'}
  </button>
  {#if showTable}
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <caption class="mb-1 text-left text-slate-600"
          >Giá trị của F tại các đỉnh của miền chấp nhận được</caption
        >
        <thead>
          <tr class="border-b border-slate-300 text-left">
            <th scope="col" class="py-1 pr-3">Đỉnh</th>
            <th scope="col" class="py-1 pr-3">F</th>
            <th scope="col" class="py-1">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {#each vertices as v (v.name)}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1 pr-3 text-left font-normal">{v.name}{pointText(v.pt)}</th>
              <td class="py-1 pr-3 tabular-nums">{formatNumber(v.value)}</td>
              <td class="py-1 font-semibold text-orange-700">
                {best?.at.some((w) => w.name === v.name) ? goalWord : ''}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <FeedbackNote
      tone={best ? 'ok' : 'warn'}
      text={best
        ? `Giá trị ${goalWord} của $F$ là $${numTex(best.value)}$ ${pr.unit}, đạt tại ${best.at.map((v) => `${v.name}${pointText(v.pt)}`).join(' và ')}. ${pr.meaning}`
        : `Miền chấp nhận được không bị chặn theo hướng làm $F$ ${pr.goal === 'max' ? 'tăng' : 'giảm'} mãi, nên $F$ không có giá trị ${goalWord}.`}
    />
  {/if}
</div>
