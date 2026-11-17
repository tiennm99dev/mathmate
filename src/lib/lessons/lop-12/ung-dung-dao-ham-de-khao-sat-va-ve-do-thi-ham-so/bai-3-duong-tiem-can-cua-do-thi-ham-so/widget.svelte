<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { approxTex, approxText } from '../_shared/plot.js';
  import { CASES, ZOOMS, probe, windowAt } from './engine.js';

  const CURVE = '#334155';
  const ASYM = '#dc2626';
  const PROBE = '#4f46e5';

  let id = $state('hyper');
  let mode = $state('right');
  let step = $state(0);

  const c = $derived(CASES.find((k) => k.id === id) ?? CASES[0]);
  const k = $derived(ZOOMS[step]);
  const win = $derived(windowAt(c, k));
  const p = $derived(probe(c, /** @type {import('./engine.js').ProbeMode} */ (mode), k));
  const x0 = $derived(c.poles[c.poles.length - 1]);
  const lines = $derived([
    ...c.poles.map((x) => ({ c: x, vertical: true, color: ASYM })),
    { a: c.line.a, b: c.line.b, color: ASYM },
  ]);
  const points = $derived([
    ...c.holes.map((h) => ({ ...h, color: CURVE, hollow: true, r: 4 })),
    { x: p.x, y: p.y, color: PROBE, r: 6 },
  ]);

  const asymText = $derived(
    `Tiệm cận đứng: ${c.poles.map((x) => `$x = ${numTex(x)}$`).join(' và ')}; tiệm cận ${c.line.a === 0 ? 'ngang' : 'xiên'}: $${c.lineTex}$.`,
  );
  const note = $derived.by(() => {
    const xs = numTex(p.x, 4);
    if (mode === 'pole') {
      return `Khi $x = ${xs}$, rất gần $x_0 = ${numTex(x0)}$ (bên phải): $f(x) ${approxTex(p.y, 2)}$. Phóng xa thêm, điểm tiến sát đường thẳng $x = ${numTex(x0)}$ và $f(x) \\to ${p.y > 0 ? '+' : '-'}\\infty$, nên $x = ${numTex(x0)}$ là tiệm cận đứng.`;
    }
    const lim = mode === 'right' ? '+\\infty' : '-\\infty';
    return `Khi $x = ${xs}$: $${c.gapTex} ${approxTex(p.gap, 4)}$. Khi $x \\to ${lim}$, hiệu này dần tới $0$: đồ thị bám sát đường thẳng $${c.lineTex}$.`;
  });
  const label = $derived(
    `Đồ thị f(x) = ${c.label} trong cửa sổ phóng xa ${k} lần, các đường tiệm cận vẽ nét đứt màu đỏ. Điểm theo dõi ở x = ${formatNumber(p.x, 4)}, f(x) = ${approxText(p.y, 3)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số"
    options={CASES.map((v) => ({ value: v.id, label: v.label }))}
    bind:value={id}
  />
  <div class="overflow-x-auto text-center">
    <Tex display math={c.tex} />
  </div>

  <GraphBox
    {win}
    {label}
    curves={[{ f: c.f, color: CURVE, breaks: c.poles }]}
    {lines}
    {points}
    height={300}
  >
    {#snippet children(frame)}
      {#if mode !== 'pole'}
        <line
          x1={frame.sx(p.x)}
          y1={frame.sy(p.y)}
          x2={frame.sx(p.x)}
          y2={frame.sy(p.ya)}
          stroke={PROBE}
          stroke-width="3"
        />
      {/if}
    {/snippet}
  </GraphBox>

  <div class="grid gap-3 sm:grid-cols-2 sm:items-end">
    <SliderField
      label="Phóng xa"
      bind:value={step}
      min={0}
      max={ZOOMS.length - 1}
      format={(i) => `${ZOOMS[i]} lần`}
    />
    <SegmentedControl
      label="Điểm theo dõi"
      options={[
        { value: 'right', label: 'x → +∞' },
        { value: 'left', label: 'x → −∞' },
        { value: 'pole', label: `x → ${formatNumber(x0)}⁺` },
      ]}
      bind:value={mode}
    />
  </div>

  <FeedbackNote tone="info" text={asymText} />
  <FeedbackNote tone={step >= 4 ? 'ok' : 'info'} text={note} />
  {#if c.holes.length}
    <p class="text-sm text-slate-700">
      Vòng tròn rỗng tại x = {formatNumber(c.holes[0].x)}: hàm số không xác định ở đó, nhưng f(x) có
      giới hạn hữu hạn khi x → {formatNumber(c.holes[0].x)}, nên x = {formatNumber(c.holes[0].x)} không
      phải tiệm cận đứng.
    </p>
  {/if}
</div>
