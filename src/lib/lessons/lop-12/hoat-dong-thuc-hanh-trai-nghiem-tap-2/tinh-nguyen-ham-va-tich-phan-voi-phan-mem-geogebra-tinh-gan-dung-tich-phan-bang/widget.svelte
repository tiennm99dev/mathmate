<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import GraphBox from '#lib/core/visuals/graph-box.svelte';
  import { approxTex } from '#lib/core/visuals/plot.js';
  import { TASKS, errorBound, leastN, trapezoid } from './engine.js';

  /**
   * The trapezoid rule next to the exact integral: the learner picks a
   * function and moves n; the graph shows the n trapezoids over the shaded
   * area, the Algebra panel shows what GeoGebra's Integral and
   * TrapezoidalSum would give, and the feedback compares the real error
   * with the book's bound (b − a)³M/(12n²). Choosing an accuracy ε gives
   * the least n the bound guarantees, which the learner can try at once.
   */

  const MAX_N = 60;
  const EPS = [0.1, 0.01, 0.001];

  let id = $state(TASKS[0].id);
  let n = $state(2);
  let eps = $state(0.01);

  const t = $derived(TASKS.find((x) => x.id === id) ?? TASKS[0]);
  const tr = $derived(trapezoid(t.f, t.a, t.b, n));
  const err = $derived(Math.abs(tr.sum - t.exact));
  const bound = $derived(errorBound(t.a, t.b, t.m, n));
  const need = $derived(leastN(t.a, t.b, t.m, eps));
  const fits = $derived(bound < eps);

  const range = $derived(`\\int_{${t.aTex}}^{${t.bTex}} ${t.tex}\\,\\mathrm{d}x`);
  const hTex = $derived(
    t.bTex === '\\pi'
      ? `h = \\dfrac{\\pi}{${n}}`
      : `h = \\dfrac{${t.bTex} - ${t.aTex}}{${n}} ${approxTex((t.b - t.a) / n, 4)}`,
  );

  // The bracket of the rule written out in full for small n, with dots from n = 4 on.
  const bracket = $derived(
    n === 1
      ? 'f(x_0) + f(x_1)'
      : n <= 3
        ? `f(x_0) + ${Array.from({ length: n - 1 }, (_, i) => `2f(x_${i + 1})`).join(' + ')} + f(x_${n})`
        : `f(x_0) + 2f(x_1) + \\dots + 2f(x_{${n - 1}}) + f(x_{${n}})`,
  );

  const lines = $derived([
    `$${hTex}$, $T_{${n}} = \\dfrac{h}{2}[${bracket}] ${approxTex(tr.sum, 4)}$.`,
    `Giá trị của tích phân: $${range} ${t.exactTex ? `= ${t.exactTex} ` : ''}${approxTex(t.exact, 4)}$.`,
    `Sai số thực sự: $|I - T_{${n}}| ${approxTex(err, 4)}$; ước lượng của sách: $\\dfrac{(b - a)^3 M}{12n^2} ${approxTex(bound, 4)}$ với $M = ${t.mTex}$.`,
  ]);

  const verdict = $derived(
    fits
      ? `Với $n = ${n}$, sai số không vượt quá $${numTex(bound, 4)} < ${numTex(eps)}$: $T_{${n}}$ đạt độ chính xác $${numTex(eps)}$.`
      : `Với $n = ${n}$, ước lượng sai số còn lớn hơn $${numTex(eps)}$. Cần chia ít nhất $n = ${need}$ đoạn.`,
  );

  const graphLabel = $derived(
    `Đồ thị y = ${t.label} trên đoạn từ ${formatNumber(t.a, 3)} đến ${formatNumber(t.b, 3)}, chia thành ${n} hình thang. Tổng diện tích hình thang ${formatNumber(tr.sum, 4)}, tích phân ${formatNumber(t.exact, 4)}.`,
  );

  /** @param {string | number} v */
  function choose(v) {
    id = String(v);
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số f(x)"
    options={TASKS.map((x) => ({ value: x.id, label: x.label }))}
    value={id}
    onchange={choose}
  />

  <SliderField label="Số đoạn chia n" bind:value={n} min={1} max={MAX_N} />

  <GraphBox
    labelPoints
    left={40}
    xTicks={6}
    win={t.win}
    label={graphLabel}
    regions={[{ f: t.f, from: t.a, to: t.b, color: '#a5b4fc', opacity: 0.35 }]}
    traps={tr.traps}
    curves={[{ f: t.f, color: '#4f46e5' }]}
    lines={[
      { c: t.a, vertical: true, color: '#94a3b8' },
      { c: t.b, vertical: true, color: '#94a3b8' },
    ]}
    points={n <= 20 ? tr.xs.map((x, i) => ({ x, y: tr.ys[i], color: '#0369a1', r: 3.5 })) : []}
    height={290}
  />

  <div
    class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-800"
    role="group"
    aria-label="Cửa sổ Đại số"
  >
    <p class="font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">
      Cửa sổ Đại số
    </p>
    <p>f(x) = {t.ggb}</p>
    <p>
      <span class="text-slate-500"
        >Integral(f, {t.bTex === '\\pi' ? '0, pi' : `${t.a}, ${t.b}`}):</span
      >
      {formatNumber(t.exact, 4)}
    </p>
    <p>
      <span class="text-slate-500"
        >TrapezoidalSum(f, {t.bTex === '\\pi' ? '0, pi' : `${t.a}, ${t.b}`}, {n}):</span
      >
      {formatNumber(tr.sum, 4)}
    </p>
  </div>

  <ul
    class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base"
    aria-live="polite"
  >
    {#each lines as line, i (i)}
      <li><LiveRichText text={line} /></li>
    {/each}
  </ul>

  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Độ chính xác ε"
      options={EPS.map((e) => ({ value: e, label: formatNumber(e, 3) }))}
      bind:value={eps}
    />
    <button
      type="button"
      class={button.secondary}
      disabled={n === need || need > MAX_N}
      onclick={() => (n = need)}
    >
      Chọn n nhỏ nhất ({need})
    </button>
  </div>

  <FeedbackNote tone={fits ? 'ok' : 'warn'} text={verdict} />

  {#if n <= 10}
    <div class="overflow-x-auto">
      <table class="w-full min-w-max text-center text-sm tabular-nums">
        <caption class="pb-1 text-left text-sm font-semibold text-slate-700"
          >Các điểm chia và giá trị của hàm số</caption
        >
        <tbody>
          <tr class="bg-slate-100">
            <th scope="row" class="px-2 py-1 text-left">x</th>
            {#each tr.xs as x, i (i)}
              <td class="px-2 py-1">{formatNumber(x, 4)}</td>
            {/each}
          </tr>
          <tr>
            <th scope="row" class="px-2 py-1 text-left">f(x)</th>
            {#each tr.ys as y, i (i)}
              <td class="px-2 py-1">{formatNumber(y, 4)}</td>
            {/each}
          </tr>
          <tr class="bg-slate-50">
            <th scope="row" class="px-2 py-1 text-left">Hệ số</th>
            {#each tr.xs as _x, i (i)}
              <td class="px-2 py-1">{i === 0 || i === n ? 1 : 2}</td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>
  {/if}
</div>
