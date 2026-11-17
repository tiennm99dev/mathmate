<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { FAMILIES, familyOf, pointText, survey } from './engine.js';

  /** @typedef {import('./engine.js').FamilyId} FamilyId */

  const CURVE = '#2563eb';
  const TRACE = '#93c5fd';
  const MAX = '#dc2626';
  const MIN = '#059669';
  const ASYM = '#d97706';
  const LOCUS = '#7c3aed';
  const MAX_TRACES = 40;

  let id = $state(/** @type {FamilyId} */ ('cubic'));
  /** @type {Record<FamilyId, number>} */
  let mBy = $state({ cubic: 1, quartic: 1, rational: 2 });
  let tracing = $state(false);
  /** @type {number[]} */
  let traced = $state([]);
  let showLocus = $state(false);

  const fam = $derived(familyOf(id));
  const m = $derived(mBy[id]);
  const s = $derived(survey(id, m));
  const past = $derived(traced.filter((v) => v !== m).map((v) => survey(id, v)));
  const tracedPoints = $derived(past.flatMap((p) => p.extrema));
  const canGuess = $derived(
    fam.locus !== '' && new Set(traced.filter((v) => survey(id, v).extrema.length > 1)).size >= 3,
  );

  const NAMES = ['A', 'B', 'C'];

  /** @param {string | number} next */
  function choose(next) {
    id = familyOf(String(next)).id;
    clearTrace();
  }

  function clearTrace() {
    traced = tracing ? [mBy[id]] : [];
    showLocus = false;
  }

  /** @param {number} v */
  function moved(v) {
    if (!tracing || traced.includes(v)) return;
    traced = [...traced, v].slice(-MAX_TRACES);
  }

  function toggleTrace() {
    tracing = !tracing;
    clearTrace();
  }

  const curves = $derived([
    ...(tracing ? past.map((p) => ({ f: p.f, color: TRACE, breaks: p.breaks, width: 1.5 })) : []),
    ...(showLocus && fam.locusF ? [{ f: fam.locusF, color: LOCUS, width: 2, dashed: true }] : []),
    { f: s.f, color: CURVE, breaks: s.breaks },
  ]);

  const lines = $derived(
    s.asymptotes
      ? [
          { vertical: true, c: s.asymptotes.vertical, color: ASYM },
          { a: 0, b: s.asymptotes.horizontal, color: ASYM },
        ]
      : [],
  );

  const points = $derived([
    ...(tracing
      ? tracedPoints.map((e) => ({ x: e.x, y: e.y, color: e.kind === 'max' ? MAX : MIN, r: 3 }))
      : []),
    ...s.extrema.map((e) => ({ x: e.x, y: e.y, color: e.kind === 'max' ? MAX : MIN })),
    ...(s.hole ? [{ x: s.hole.x, y: s.hole.y, color: CURVE, hollow: true }] : []),
  ]);

  const extremaText = $derived(
    s.extrema.length
      ? s.extrema
          .map(
            (e, i) =>
              `${NAMES[i]}${pointText(e.x, e.y)} (${e.kind === 'max' ? 'cực đại' : 'cực tiểu'})`,
          )
          .join(', ')
      : 'không có điểm cực trị',
  );

  const asymText = $derived(
    s.asymptotes
      ? `x = ${formatNumber(s.asymptotes.vertical)}, y = ${formatNumber(s.asymptotes.horizontal)}`
      : 'không có',
  );

  const graphLabel = $derived(
    `Đồ thị y = ${s.input} với m = ${formatNumber(m)}: ${extremaText}${s.asymptotes ? `; tiệm cận ${asymText}` : ''}.${tracing ? ` Đang hiện vết của ${past.length} đồ thị trước.` : ''}`,
  );

  const traceNote = $derived(
    showLocus
      ? `Đường nét đứt màu tím là ${fam.locus}: mọi điểm cực trị để lại vết đều nằm trên nó. Thử chứng minh bằng cách thay x = ±√m vào công thức của hàm số.`
      : tracing && fam.locus && canGuess
        ? 'Các điểm cực trị để lại vết xếp thành một đường cong. Hãy đoán phương trình đường cong đó rồi bấm "Kiểm tra dự đoán".'
        : tracing && id === 'rational'
          ? 'Khi m thay đổi, tiệm cận đứng luôn là x = 1, còn tiệm cận ngang y = m dịch lên xuống theo m.'
          : tracing
            ? 'Kéo thanh trượt m qua nhiều giá trị (m > 0) để các điểm cực trị để lại vết.'
            : '',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Họ hàm số"
    options={FAMILIES.map((f) => ({ value: f.id, label: `${f.label}: ${f.formula}` }))}
    value={id}
    onchange={choose}
  />

  <SliderField
    label="Thanh trượt m"
    bind:value={mBy[id]}
    min={fam.range.min}
    max={fam.range.max}
    step={fam.range.step}
    oninput={moved}
  />

  <GraphBox win={fam.win} label={graphLabel} {curves} {lines} {points} height={300} />

  <div
    class="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-800"
    role="group"
    aria-label="Cửa sổ Đại số"
  >
    <p class="font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">
      Cửa sổ Đại số
    </p>
    <p>m = {formatNumber(m)}</p>
    <p>f(x) = {s.input}</p>
    <p><span class="text-slate-500">Derivative(f):</span> f'(x) = {s.derivative}</p>
    {#if id === 'rational'}
      <p><span class="text-slate-500">Asymptote(f):</span> {asymText}</p>
    {:else}
      <p><span class="text-slate-500">Extremum(f):</span> {extremaText}</p>
    {/if}
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} aria-pressed={tracing} onclick={toggleTrace}>
      {tracing ? 'Tắt vết' : 'Hiện vết'}
    </button>
    {#if tracing}
      <button type="button" class={button.quiet} onclick={clearTrace}>Xoá vết</button>
    {/if}
    {#if fam.locus}
      <button
        type="button"
        class={button.secondary}
        disabled={!canGuess}
        aria-pressed={showLocus}
        onclick={() => (showLocus = !showLocus)}
      >
        Kiểm tra dự đoán
      </button>
    {/if}
  </div>

  <FeedbackNote tone="info" text={s.verdict} />
  {#if traceNote}
    <FeedbackNote tone={showLocus ? 'ok' : 'info'} text={traceNote} />
  {/if}
</div>
