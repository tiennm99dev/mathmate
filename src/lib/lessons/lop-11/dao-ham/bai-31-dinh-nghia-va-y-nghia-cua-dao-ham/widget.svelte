<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import GraphBox from '#lib/core/visuals/graph-box.svelte';
  import { lineTex, lineThrough } from '../_shared/lines.js';
  import { CASES, H_SIZES, TABLE_H, firstStart, secantSlope } from './engine.js';

  const CURVE = '#334155';
  const SECANT = '#ea580c';
  const TANGENT = '#059669';
  const BASE = '#2563eb';
  const CLOSE = 5;

  let id = $state('square');
  let start = $state(firstStart(CASES[0]));
  let size = $state(0);
  let left = $state(false);
  let showTangent = $state(false);

  const c = $derived(CASES.find((x) => x.id === id) ?? CASES[0]);
  const x0 = $derived(c.starts[Math.min(start, c.starts.length - 1)]);
  const h = $derived(left ? -H_SIZES[size] : H_SIZES[size]);
  const x1 = $derived(tidy(x0 + h, 12));
  const y0 = $derived(c.f(x0));
  const y1 = $derived(c.f(x1));
  const m = $derived(secantSlope(c.f, x0, h));
  const k = $derived(c.df(x0));
  const near = $derived(size >= CLOSE);

  const curves = $derived([
    { f: c.f, color: CURVE, breaks: c.id === 'inverse' ? [0] : [] },
    { f: lineThrough(x0, y0, m), color: SECANT, width: 2 },
    ...(showTangent || near
      ? [{ f: lineThrough(x0, y0, k), color: TANGENT, width: 2, dashed: true }]
      : []),
  ]);
  const points = $derived([
    { x: x0, y: y0, color: BASE, r: 6 },
    { x: x1, y: y1, color: SECANT, r: 6 },
  ]);

  const tVar = $derived(c.motion ? 't' : 'x');
  /** @param {number} v */
  const approx = (v) => (tidy(v, 4) === tidy(v, 12) ? '=' : '\\approx');

  const quotient = $derived(
    c.motion
      ? `Vận tốc trung bình trên đoạn thời gian từ $t_0 = ${numTex(x0)}$ đến $t_0 + h = ${numTex(x1)}$ (giây): $\\dfrac{s(t_0 + h) - s(t_0)}{h} ${approx(m)} ${numTex(m, 4)}$ m/s.`
      : `Cát tuyến $M_0M$ với $h = ${numTex(h)}$: hệ số góc $\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{f(x_0 + h) - f(x_0)}{h} ${approx(m)} ${numTex(m, 4)}$.`,
  );
  const verdict = $derived.by(() => {
    if (!near)
      return `Giảm $|h|$ để điểm $M$ trượt dần về $M_0$. Hiệu giữa hệ số góc cát tuyến và $f'(${numTex(x0)})$ còn khoảng $${numTex(Math.abs(m - k), 4)}$.`;
    return c.motion
      ? `Khi $h \\to 0$, vận tốc trung bình dần tới vận tốc tức thời $v(${numTex(x0)}) = s'(${numTex(x0)}) = 9{,}8 \\cdot ${numTex(x0)} = ${numTex(k, 4)}$ m/s. Đó cũng là hệ số góc của tiếp tuyến (nét đứt xanh lá).`
      : `Cát tuyến gần như trùng tiếp tuyến tại $M_0$ (nét đứt xanh lá). Hệ số góc của tiếp tuyến là $f'(${numTex(x0)}) = ${numTex(k, 4)}$; phương trình tiếp tuyến $y - y_0 = f'(x_0)(x - x_0)$ là $${lineTex(k, y0 - k * x0)}$.`;
  });

  const label = $derived(
    `Đồ thị ${c.motion ? 'quãng đường rơi s theo thời gian t' : `hàm số ${c.label}`}, điểm M₀ tại ${tVar} = ${formatNumber(x0)} và điểm M tại ${tVar} = ${formatNumber(x1)}; cát tuyến M₀M có hệ số góc ${formatNumber(m, 4)}${showTangent || near ? `, tiếp tuyến tại M₀ có hệ số góc ${formatNumber(k, 4)}` : ''}.`,
  );
  const rows = $derived(TABLE_H.map((t) => ({ h: t, q: secantSlope(c.f, x0, t) })));

  function choose() {
    start = firstStart(c);
    size = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số"
    options={CASES.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
    onchange={choose}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={`${c.tex}, \\quad ${c.dtex}`} />
  </div>

  <GraphBox wide win={c.view} {label} {curves} {points} marks={[x0]} />

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label={c.motion ? 'Thời điểm t₀ (giây)' : 'Hoành độ x₀ của M₀'}
      bind:value={start}
      min={0}
      max={c.starts.length - 1}
      format={(i) => `${tVar}₀ = ${formatNumber(c.starts[i])}`}
    />
    <SliderField
      label="Độ lớn của h"
      bind:value={size}
      min={0}
      max={H_SIZES.length - 1}
      format={(i) => `|h| = ${formatNumber(H_SIZES[i])}`}
    />
  </div>
  <div class="flex flex-wrap gap-x-6 gap-y-2">
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={left} />
      h âm (M nằm bên trái M₀)
    </label>
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={showTangent} />
      Hiện tiếp tuyến tại M₀
    </label>
  </div>

  <p class="text-sm text-slate-700">
    <span class="font-semibold text-blue-700">Điểm xanh</span> là M₀, điểm
    <span class="font-semibold text-orange-700">cam</span> là M; đường cam là cát tuyến M₀M, nét đứt
    <span class="font-semibold text-emerald-700">xanh lá</span> là tiếp tuyến.
  </p>
  <FeedbackNote tone="info" text={quotient} />
  <FeedbackNote tone={near ? 'ok' : 'info'} text={verdict} />

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">Tỉ số Δy/Δx khi h dần tới 0 từ hai phía</caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">h</th>
          <th scope="col" class="py-1.5">
            {c.motion ? 'Vận tốc trung bình (m/s)' : 'Δy/Δx'}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.h)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 pr-2 text-left font-semibold">{formatNumber(row.h)}</th>
            <td class="py-1.5 text-orange-700">{formatNumber(tidy(row.q, 5), 5)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
