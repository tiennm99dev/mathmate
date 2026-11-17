<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { squareHeight } from '../_shared/plot.js';
  import { A_MAX, A_MIN, A_STEP, WINDOW, formulas, logOf, mirror, trend } from './engine.js';

  const EXP = '#4f46e5';
  const LOG = '#ea580c';
  const LINE = '#94a3b8';
  const HEIGHT = squareHeight(WINDOW);

  let a = $state(2);
  let t = $state(1.5);

  const kind = $derived(trend(a));
  const f = $derived(formulas(a));
  const pair = $derived(mirror(a, t));
  const base = $derived(numTex(tidy(a, 9)));

  const curves = $derived([
    { f: (/** @type {number} */ x) => x, color: LINE, width: 1.5, dashed: true },
    ...(kind === 'none'
      ? [{ f: () => 1, color: EXP }]
      : [
          { f: (/** @type {number} */ x) => a ** x, color: EXP },
          { f: (/** @type {number} */ x) => logOf(a, x), color: LOG },
        ]),
  ]);
  const points = $derived(
    kind === 'none'
      ? []
      : [
          { x: 0, y: 1, color: EXP, r: 4 },
          { x: 1, y: a, color: EXP, r: 4 },
          { x: 1, y: 0, color: LOG, r: 4 },
          { x: a, y: 1, color: LOG, r: 4 },
          { x: pair.m.x, y: pair.m.y, color: EXP, r: 7 },
          { x: pair.image.x, y: pair.image.y, color: LOG, r: 7 },
        ],
  );
  const guides = $derived(
    kind === 'none'
      ? []
      : [{ x1: pair.m.x, y1: pair.m.y, x2: pair.image.x, y2: pair.image.y, color: '#e11d48' }],
  );

  const verdict = $derived(
    kind === 'none'
      ? 'Với $a = 1$ thì $1^x = 1$ với mọi $x$: đây không phải hàm số mũ, và không có lôgarit cơ số $1$. Hãy kéo $a$ khỏi $1$.'
      : kind === 'up'
        ? `$a = ${base} > 1$: cả hai hàm số đồng biến (đồ thị đi lên từ trái sang phải).`
        : `$0 < a = ${base} < 1$: cả hai hàm số nghịch biến (đồ thị đi xuống từ trái sang phải).`,
  );
  const facts = $derived(
    kind === 'none'
      ? ''
      : `$${f.exp}$ đi qua $(0; 1)$ và $(1; ${base})$, nằm phía trên trục hoành; $${f.log}$ đi qua $(1; 0)$ và $(${base}; 1)$, nằm bên phải trục tung.`,
  );
  const reflect = $derived(
    kind === 'none'
      ? ''
      : `$M(${numTex(t)}; ${numTex(pair.m.y, 3)})$ trên đồ thị hàm số mũ đối xứng với $M'(${numTex(pair.image.x, 3)}; ${numTex(t)})$ qua đường thẳng $y = x$, và $M'$ nằm trên đồ thị hàm số lôgarit: $\\log_{${base}} ${numTex(pair.image.x, 3)} \\approx ${numTex(t)}$.`,
  );
  const label = $derived(
    kind === 'none'
      ? 'Đồ thị đường thẳng y = 1 khi a = 1, cùng đường thẳng y = x.'
      : `Đồ thị hàm số mũ và hàm số lôgarit cơ số ${formatNumber(a)}, đối xứng nhau qua đường thẳng y = x; cả hai ${kind === 'up' ? 'đi lên' : 'đi xuống'}.`,
  );
</script>

<div class="space-y-4">
  <SliderField label="Cơ số a" bind:value={a} min={A_MIN} max={A_MAX} step={A_STEP} />

  {#if kind !== 'none'}
    <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-semibold">
      <span style:color={EXP}><Tex math={f.exp} /></span>
      <span style:color={LOG}><Tex math={f.log} /></span>
      <span class="text-slate-500"><Tex math="y = x" /></span>
    </div>
  {/if}

  <div class="mx-auto max-w-md">
    <GraphBox win={WINDOW} {label} {curves} {points} {guides} height={HEIGHT} />
  </div>

  <SliderField
    label="Hoành độ t của điểm M trên đồ thị hàm số mũ"
    bind:value={t}
    min={-2}
    max={2}
    step={0.1}
  />

  <FeedbackNote tone={kind === 'none' ? 'warn' : 'ok'} text={verdict} />
  {#if kind !== 'none'}
    <FeedbackNote tone="info" text={facts} />
    <FeedbackNote tone="info" text={reflect} />
  {/if}
</div>
