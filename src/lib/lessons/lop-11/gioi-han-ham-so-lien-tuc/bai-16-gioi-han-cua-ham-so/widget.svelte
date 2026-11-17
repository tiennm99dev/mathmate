<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { ZOOM_STEPS as STEPS, approach, valueCell } from '../_shared/plot.js';
  import { CASES, TABLE_STEPS, zoomWindow } from './engine.js';

  const LEFT = '#2563eb';
  const RIGHT = '#ea580c';
  const CURVE = '#334155';

  let id = $state('hole');
  let step = $state(0);
  let zoom = $state(false);

  const c = $derived(CASES.find((x) => x.id === id) ?? CASES[0]);
  const h = $derived(STEPS[step]);
  const xl = $derived(tidy(c.x0 - h, 12));
  const xr = $derived(tidy(c.x0 + h, 12));
  const yl = $derived(c.f(xl));
  const yr = $derived(c.f(xr));
  const win = $derived(zoom ? zoomWindow(c, h) : c.view);

  const points = $derived([
    ...c.dots.map((d) => ({ ...d, color: CURVE })),
    { x: xl, y: yl, color: LEFT, r: 6 },
    { x: xr, y: yr, color: RIGHT, r: 6 },
  ]);
  const rows = $derived(approach(c.f, c.x0, TABLE_STEPS));

  const label = $derived(
    `Đồ thị ${c.name ?? `hàm số f(x) = ${c.label}`} gần x₀ = ${formatNumber(c.x0)}${zoom ? ', đã phóng to' : ''}. Điểm xanh tại x = ${formatNumber(xl)} có giá trị ${valueCell(yl)}; điểm cam tại x = ${formatNumber(xr)} có giá trị ${valueCell(yr)}.`,
  );
  /** @param {number} y */
  const valTex = (y) => (Number.isFinite(y) ? numTex(y, 4) : '\\text{không xác định}');
  /** @param {number} y '≈' when the value has more than four decimals */
  const rel = (y) => (Number.isFinite(y) && tidy(y, 4) !== tidy(y, 12) ? '\\approx' : '=');
  const note = $derived(
    `Với $h = ${numTex(h)}$: $f(${numTex(xl)}) ${rel(yl)} ${valTex(yl)}$ (bên trái) và $f(${numTex(xr)}) ${rel(yr)} ${valTex(yr)}$ (bên phải).`,
  );
  const closing = $derived(
    step >= 6
      ? c.verdict
      : `Giảm $h$ để hai điểm tiến sát $x_0 = ${numTex(c.x0)}$ từ hai phía, rồi xem giá trị bên trái và bên phải dần tới đâu.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số"
    options={CASES.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={`${c.tex}, \\quad x_0 = ${numTex(c.x0)}`} />
  </div>

  <GraphBox
    {win}
    {label}
    curves={[{ f: c.f, color: CURVE, breaks: [c.x0] }]}
    {points}
    marks={[c.x0]}
  />

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Khoảng cách h đến x₀"
      bind:value={step}
      min={0}
      max={STEPS.length - 1}
      format={(i) => `h = ${formatNumber(STEPS[i])}`}
    />
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={zoom} />
      Phóng to quanh x₀
    </label>
  </div>

  <p class="text-sm text-slate-700">
    <span class="font-semibold text-blue-700">Điểm xanh</span> tại x₀ − h (tiến từ bên trái),
    <span class="font-semibold text-orange-700">điểm cam</span> tại x₀ + h (tiến từ bên phải). Vòng tròn
    rỗng là điểm không thuộc đồ thị.
  </p>
  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone={step >= 6 ? 'ok' : 'info'} text={closing} />

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="sr-only">Giá trị của f(x) khi x dần tới x₀ từ hai phía</caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-2">h</th>
          <th scope="col" class="py-1.5 pr-2">f(x₀ − h)</th>
          <th scope="col" class="py-1.5">f(x₀ + h)</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.h)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 pr-2 text-left font-semibold">{formatNumber(row.h)}</th>
            <td class="py-1.5 pr-2 text-blue-700">{valueCell(row.left, 5)}</td>
            <td class="py-1.5 text-orange-700">{valueCell(row.right, 5)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
