<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '#lib/core/visuals/graph-box.svelte';
  import { BASES, logBase, powerBase } from '../_shared/bases.js';
  import { RELATIONS, SETUP, sideTex, solve, valueAt, windowFor } from './engine.js';

  const CURVE = '#4f46e5';
  const LINE = '#059669';
  const SET = '#e11d48';
  const CHOICES = [BASES[2], BASES[3], BASES.half, BASES.third];
  const REL_LABELS = { '=': '=', '>': '>', '>=': '≥', '<': '<', '<=': '≤' };

  let kindId = $state('exp');
  let baseId = $state('2');
  let relId = $state('>');
  let b = $state(4);

  /** @type {import('./engine.js').Kind} */
  const kind = $derived(kindId === 'log' ? 'log' : 'exp');
  const relation = $derived(RELATIONS.find((r) => r.id === relId) ?? RELATIONS[1]);
  const rel = $derived(relation.id);

  const base = $derived(CHOICES.find((x) => x.id === baseId) ?? CHOICES[0]);
  const setup = $derived(SETUP[kind]);
  const sol = $derived(solve(kind, base, b, rel));
  const relTex = $derived(relation.tex);
  const problem = $derived(`${sideTex(kind, base)} ${relTex} ${numTex(b)}`);

  const curves = $derived([
    { f: (/** @type {number} */ x) => valueAt(kind, base.value, x), color: CURVE },
    { f: () => b, color: LINE, width: 2, dashed: true },
  ]);
  const spans = $derived(
    rel === '=' ? [] : sol.parts.map((p) => ({ from: p.lo, to: p.hi, color: SET, axis: true })),
  );
  const points = $derived(
    sol.x0 === null
      ? []
      : [
          { x: sol.x0, y: b, color: LINE, r: 5 },
          {
            x: sol.x0,
            y: 0,
            color: SET,
            r: 6,
            hollow: rel === '>' || rel === '<',
          },
        ],
  );
  const guides = $derived(sol.x0 === null ? [] : [{ x1: sol.x0, y1: 0, x2: sol.x0, y2: b }]);

  /** @param {string | number} next */
  function switchKind(next) {
    const range = SETUP[next === 'log' ? 'log' : 'exp'];
    b = Math.min(range.bMax, Math.max(range.bMin, b));
  }

  const meet = $derived.by(() => {
    if (sol.x0 === null)
      return `Đường thẳng $y = ${numTex(b)}$ không cắt đồ thị: $${sideTex(kind, base)} > 0 \\ge ${numTex(b)}$ với mọi $x$.`;
    const where =
      kind === 'exp'
        ? `$x_0 = \\log_{${logBase(base)}} ${numTex(b)}$`
        : `$x_0 = ${powerBase(base)}^{${numTex(b)}}$`;
    return `Đường thẳng $y = ${numTex(b)}$ cắt đồ thị tại đúng một điểm có hoành độ ${where}${
      sol.x0Tex.includes('\\log') || sol.x0Tex.includes('^')
        ? ` $\\approx ${numTex(sol.x0, 3)}$`
        : ` $= ${sol.x0Tex}$`
    }.`;
  });
  const why = $derived.by(() => {
    if (rel === '=') return 'Phương trình: chỉ lấy hoành độ giao điểm.';
    const up = base.value > 1;
    const above = rel === '>' || rel === '>=';
    return `Cơ số ${up ? 'lớn hơn $1$' : 'nằm giữa $0$ và $1$'}: hàm số ${up ? 'đồng biến' : 'nghịch biến'}, đồ thị nằm ${above ? 'phía trên' : 'phía dưới'} đường ngang ở phần được tô${
      kind === 'log' ? ' (chỉ xét $x > 0$)' : ''
    }.`;
  });
  const label = $derived(
    `Đồ thị y = ${kind === 'exp' ? `${base.text} mũ x` : `lôgarit cơ số ${base.text} của x`} và đường thẳng y = ${formatNumber(b)}; ${
      sol.x0 === null
        ? 'không có giao điểm'
        : `giao điểm có hoành độ khoảng ${formatNumber(sol.x0, 3)}`
    }.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Loại"
      options={[
        { value: 'exp', label: 'Mũ aˣ' },
        { value: 'log', label: 'Lôgarit' },
      ]}
      bind:value={kindId}
      onchange={switchKind}
    />
    <SegmentedControl
      label="Cơ số a"
      options={CHOICES.map((x) => ({ value: x.id, label: x.text }))}
      bind:value={baseId}
    />
  </div>
  <SegmentedControl
    label="Dấu"
    options={RELATIONS.map((r) => ({ value: r.id, label: REL_LABELS[r.id] }))}
    bind:value={relId}
  />
  <SliderField label="Vế phải b" bind:value={b} min={setup.bMin} max={setup.bMax} step={0.5} />

  <div class="overflow-x-auto text-center">
    <Tex display math={problem} />
  </div>

  <GraphBox
    wide
    win={windowFor(kind, sol.x0)}
    {label}
    {curves}
    {points}
    {spans}
    {guides}
    xTicks={6}
    yTicks={6}
  />

  <FeedbackNote tone="info" text={meet} />
  <FeedbackNote tone="info" text={why} />
  <FeedbackNote tone="ok" text={`Tập nghiệm: $${sol.setTex}$.`} />
</div>
