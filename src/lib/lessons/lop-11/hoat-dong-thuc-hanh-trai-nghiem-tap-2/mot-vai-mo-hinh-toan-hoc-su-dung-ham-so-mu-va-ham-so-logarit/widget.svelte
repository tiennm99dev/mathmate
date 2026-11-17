<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { niceAxis } from '#lib/stats-engine/index.js';
  import { DATASETS, bestFit, fitError, fitLevel, growth } from './engine.js';

  /**
   * Fit the model A(t) = A₀·e^(rt) to measured data by choosing A₀ and r.
   * On the ln A view the data lie close to a line whose slope is r, which
   * is how the best model is found.
   */

  const W = 440;
  const H = 260;
  const L = 48;
  const R = 14;
  const T = 16;
  const B = 34;
  const R_STEP = 0.005;

  let setId = $state('vi-khuan');
  let lnView = $state('a');
  let a0 = $state(3);
  let r = $state(0);

  const set = $derived(DATASETS.find((d) => d.id === setId) ?? DATASETS[0]);
  const tMax = $derived(set.data[set.data.length - 1].t);
  const err = $derived(fitError(set.data, a0, r));
  const level = $derived(fitLevel(err));
  const best = $derived(bestFit(set.data));
  const isLn = $derived(lnView === 'ln');

  const yAxis = $derived.by(() => {
    const values = set.data.map((p) => p.a);
    if (isLn) {
      const lns = values.map(Math.log);
      return niceAxis(Math.min(...lns, 0), Math.max(...lns), 5);
    }
    return niceAxis(0, Math.max(...values) * 1.1, 5);
  });
  const xAxis = $derived(niceAxis(0, tMax, 6));

  /** @param {number} t */
  const px = (t) => L + (t / xAxis.max) * (W - L - R);
  /** @param {number} v */
  const py = (v) => H - B - ((v - yAxis.min) / (yAxis.max - yAxis.min)) * (H - T - B);
  /** The plotted value of A: A itself or ln A. @param {number} a */
  const yOf = (a) => (isLn ? Math.log(a) : a);
  /** @param {number} v */
  const clampY = (v) => Math.max(T - 20, Math.min(H - B + 20, v));

  const curve = $derived.by(() => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const t = (xAxis.max * i) / 80;
      pts.push(`${px(t).toFixed(1)},${clampY(py(yOf(growth(a0, r, t)))).toFixed(1)}`);
    }
    return pts.join(' ');
  });

  /** @param {string | number} v */
  function pickSet(v) {
    setId = String(v);
    const d = DATASETS.find((x) => x.id === setId) ?? DATASETS[0];
    a0 = tidy(Math.round((d.a0Range.min + d.a0Range.max) / 2 / d.a0Range.step) * d.a0Range.step);
    r = 0;
  }

  function showBest() {
    const s = set.a0Range.step;
    a0 = tidy(Math.round(best.a0 / s) * s);
    r = tidy(Math.round(best.r / R_STEP) * R_STEP);
  }

  const modelTex = $derived(
    `A(t) = ${numTex(a0, 2)} \\cdot e^{${numTex(r, 3)}t}` +
      (isLn
        ? `\\quad \\Leftrightarrow \\quad \\ln A = ${numTex(Math.log(a0), 3)} ${r < 0 ? '-' : '+'} ${numTex(Math.abs(r), 3)}t`
        : ''),
  );

  const verdict = $derived.by(() => {
    const e = formatNumber(err, 1);
    const kind = best.r > 0 ? 'tăng trưởng' : 'suy giảm';
    if (level === 'tot')
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Khớp tốt: mô hình lệch trung bình ${e}% so với số liệu. Đây là mô hình ${kind} với $r ${r > 0 ? '>' : '<'} 0$.`,
      };
    if (r === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Với $r = 0$, $A(t)$ không đổi. Số liệu đang ${best.r > 0 ? 'tăng' : 'giảm'}, hãy chọn $r$ ${best.r > 0 ? 'dương' : 'âm'}.`,
      };
    if (Math.sign(r) !== Math.sign(best.r))
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Số liệu đang ${best.r > 0 ? 'tăng' : 'giảm'} nhưng $r$ ${r > 0 ? 'dương' : 'âm'}: đổi dấu của $r$.`,
      };
    return {
      tone: level === 'gan' ? /** @type {const} */ ('info') : /** @type {const} */ ('warn'),
      text: `Mô hình lệch trung bình ${e}% so với số liệu. ${level === 'gan' ? 'Đã gần khớp, chỉnh thêm một chút.' : 'Còn xa.'} Gợi ý: $A_0$ là giá trị tại $t = 0$; chuyển sang xem $\\ln A$ thì số liệu gần thẳng hàng và $r$ là hệ số góc.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Số liệu"
    options={DATASETS.map((d) => ({ value: d.id, label: d.label }))}
    value={setId}
    onchange={pickSet}
  />
  <p class="text-sm text-slate-600">
    {set.title} ({set.aName}) sau t {set.tName}:
    {set.data.map((p) => `t = ${formatNumber(p.t)}: ${formatNumber(p.a)}`).join('; ')}.
  </p>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Giá trị ban đầu A₀"
      bind:value={a0}
      min={set.a0Range.min}
      max={set.a0Range.max}
      step={set.a0Range.step}
      unit={set.aName}
    />
    <SliderField
      label="Tỉ lệ r"
      bind:value={r}
      min={-0.5}
      max={0.5}
      step={R_STEP}
      format={(v) => formatNumber(v, 3)}
    />
  </div>
  <SegmentedControl
    label="Trục tung"
    options={[
      { value: 'a', label: 'Giá trị A' },
      { value: 'ln', label: 'ln A' },
    ]}
    bind:value={lnView}
  />

  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label="Số liệu {set.title.charAt(0).toLowerCase() +
      set.title.slice(1)} và đồ thị mô hình A(t) = {formatNumber(a0, 2)} nhân e mũ {formatNumber(
      r,
      3,
    )} t{isLn ? ', trục tung là ln A' : ''}. Mô hình lệch trung bình {formatNumber(
      err,
      1,
    )} phần trăm."
  >
    <defs>
      <clipPath id="fit-plot-area">
        <rect x={L} y={T} width={W - L - R} height={H - T - B} />
      </clipPath>
    </defs>
    {#each yAxis.ticks as t (t)}
      <line x1={L} x2={W - R} y1={py(t)} y2={py(t)} stroke="#E2E8F0" />
      <text x={L - 6} y={py(t) + 4} font-size="13" text-anchor="end" fill="#475569"
        >{formatNumber(t, 2)}</text
      >
    {/each}
    {#each xAxis.ticks as t (t)}
      <text x={px(t)} y={H - B + 16} font-size="13" text-anchor="middle" fill="#475569"
        >{formatNumber(t)}</text
      >
    {/each}
    <line x1={L} x2={W - R} y1={H - B} y2={H - B} stroke="#64748B" />
    <line x1={L} x2={L} y1={T} y2={H - B} stroke="#64748B" />
    <text x={W - R} y={H - 4} font-size="13" text-anchor="end" fill="#475569">t ({set.tName})</text>
    <text x={L + 4} y={T + 10} font-size="13" fill="#475569">{isLn ? 'ln A' : 'A'}</text>
    <polyline
      points={curve}
      fill="none"
      stroke="#7C3AED"
      stroke-width="2.5"
      clip-path="url(#fit-plot-area)"
    />
    {#each set.data as p (p.t)}
      <circle
        cx={px(p.t)}
        cy={py(yOf(p.a))}
        r="5"
        fill="#F59E0B"
        stroke="#FFFFFF"
        stroke-width="1.5"
      />
    {/each}
  </svg>

  <div class="overflow-x-auto rounded-lg border border-slate-200 p-3 text-sm">
    <p>Mô hình: <Tex math={modelTex} /></p>
    <p class="mt-1 text-slate-600">
      Sai lệch trung bình so với số liệu: <span class="font-semibold tabular-nums"
        >{formatNumber(err, 1)}%</span
      >
    </p>
  </div>

  <button type="button" class={button.secondary} onclick={showBest}>Xem mô hình khớp nhất</button>
  <FeedbackNote tone={verdict.tone} text={verdict.text} />
</div>
