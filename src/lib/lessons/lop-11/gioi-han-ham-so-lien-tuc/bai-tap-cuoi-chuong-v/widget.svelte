<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { textInput } from '#lib/core/ui.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { ZOOM_STEPS, zoomAround } from '../_shared/plot.js';
  import { PROBLEMS, isRight, miss } from './engine.js';

  const CURVE = '#334155';
  const GUESS = '#059669';
  const LEFT = '#2563eb';
  const RIGHT = '#ea580c';
  const DEEP = ZOOM_STEPS.length - 1;

  let id = $state('cube');
  let typed = $state('');
  let step = $state(0);

  const p = $derived(PROBLEMS.find((x) => x.id === id) ?? PROBLEMS[0]);
  const guess = $derived(typed.trim() === '' ? null : readNumber(typed));
  const h = $derived(ZOOM_STEPS[step]);
  const win = $derived(zoomAround(p.f, p.x0, h));
  const xl = $derived(tidy(p.x0 - h, 12));
  const xr = $derived(tidy(p.x0 + h, 12));

  /** @param {number} v the dashed line y = v */
  const level = (v) => ({ f: () => v, color: GUESS, width: 2, dashed: true });
  const curves = $derived([
    { f: p.f, color: CURVE, breaks: [p.x0] },
    ...(guess === null ? [] : [level(guess)]),
  ]);
  const points = $derived([
    { x: xl, y: p.f(xl), color: LEFT, r: 6 },
    { x: xr, y: p.f(xr), color: RIGHT, r: 6 },
  ]);
  const visible = $derived(guess !== null && guess >= win.yMin && guess <= win.yMax);

  const values = $derived(
    `$h = ${numTex(h)}$: $f(${numTex(xl)}) \\approx ${numTex(p.f(xl), 5)}$ và $f(${numTex(xr)}) \\approx ${numTex(p.f(xr), 5)}$.`,
  );
  const verdict = $derived.by(() => {
    if (typed.trim() === '')
      return 'Tính giới hạn trên giấy, nhập kết quả $L$ rồi phóng to để kiểm chứng.';
    if (guess === null)
      return 'Hãy nhập một số nguyên, phân số $p/q$ hoặc số thập phân (ví dụ $-1/2$ hay $0{,}5$).';
    const gap = miss(p, guess, h);
    const line = `Đường $y = ${numTex(guess, 6)}$ ${visible ? 'còn trong khung' : 'đã ra khỏi khung'}; đồ thị còn cách nó khoảng $${numTex(gap, 4)}$.`;
    if (step < DEEP) return `${line} Tiếp tục phóng to.`;
    return isRight(p, guess)
      ? `${line} Phóng to đến $h = 0{,}001$ mà hai bên vẫn bám sát đường của em: $L = ${numTex(guess, 6)}$ đúng.`
      : `${line} Hai bên không tiến về đường $y = ${numTex(guess, 6)}$: hãy kiểm tra lại cách rút gọn.`;
  });
  const tone = $derived(
    step === DEEP && guess !== null ? (isRight(p, guess) ? 'ok' : 'warn') : 'info',
  );
  const label = $derived(
    `Đồ thị hàm số dưới dấu giới hạn gần x₀ = ${formatNumber(p.x0)}, khoảng cách h = ${formatNumber(h)}${
      guess === null ? '' : `, cùng đường thẳng y = ${formatNumber(guess, 6)}`
    }.`,
  );

  function choose() {
    typed = '';
    step = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bài tập"
    options={PROBLEMS.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
    onchange={choose}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={`L = ${p.tex}`} />
  </div>

  <label class="block">
    <span class="mb-1 block text-sm font-semibold text-slate-700">Kết quả của em, L =</span>
    <input class={textInput} inputmode="text" autocomplete="off" bind:value={typed} />
  </label>

  <GraphBox {win} {label} {curves} {points} marks={[p.x0]} />

  <SliderField
    label="Phóng to quanh x₀"
    bind:value={step}
    min={0}
    max={DEEP}
    format={(i) => `h = ${formatNumber(ZOOM_STEPS[i])}`}
  />

  <FeedbackNote tone="info" text={values} />
  <FeedbackNote {tone} text={verdict} />
</div>
