<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import {
    OP_TEX,
    OP_TEXT,
    discriminant,
    quadAt,
    quadTex,
    quadText,
    solutionTex,
  } from '../_shared/quadratic.js';
  import SignLayer from '../_shared/sign-layer.svelte';
  import SignTable from '../_shared/sign-table.svelte';
  import { A_VALUES, caseSentence, testSentence } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -8, yMax: 8, width: 420, pad: 24 });
  const { mx, my, toX, unit } = plane;

  let ai = $state(2);
  let b = $state(-4);
  let c = $state(3);
  /** @type {import('../_shared/quadratic.js').Op} */
  let op = $state('<');
  const a = $derived(A_VALUES[ai]);

  const OPS = /** @type {const} */ (['>', '<', '>=', '<=']);

  const delta = $derived(discriminant(a, b, c));
  const answer = $derived(solutionTex(a, b, c, op));

  let handle = $state({ x: mx(2), y: my(0) });
  const t = $derived(Math.max(-6, Math.min(6, Math.round(toX(handle.x) * 2) / 2)));
  const ft = $derived(quadAt(a, b, c, t));
  const snap = (/** @type {{ x: number, y: number }} */ p) => {
    const v = Math.max(-6, Math.min(6, Math.round(toX(p.x) * 2) / 2));
    return { x: mx(v), y: my(0) };
  };
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snap,
    pad: 0,
    keyStep: unit / 2,
    keyShiftStep: unit,
  });

  const plotLabel = $derived(
    `Parabol y = ${quadText(a, b, c)}. Phần phía trên trục hoành tô xanh (f(x) > 0), phần phía dưới tô đỏ (f(x) < 0). Điểm thử x = ${formatNumber(t)}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Hệ số a"
      bind:value={ai}
      min={0}
      max={A_VALUES.length - 1}
      format={(i) => formatNumber(A_VALUES[i])}
    />
    <SliderField label="Hệ số b" bind:value={b} min={-4} max={4} />
    <SliderField label="Hệ số c" bind:value={c} min={-4} max={4} />
  </div>
  <p class="text-center text-lg">
    <Tex math={`f(x) = ${quadTex(a, b, c)}, \\quad \\Delta = ${delta}`} />
  </p>

  <CoordinatePlane bind:svgEl {plane} label={plotLabel}>
    <SignLayer {plane} {a} {b} {c} {op} />

    <line
      x1={mx(t)}
      y1={my(0)}
      x2={mx(t)}
      y2={my(Math.max(plane.yMin, Math.min(plane.yMax, ft)))}
      stroke="#0f172a"
      stroke-dasharray="4 3"
    />
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm thử x trên trục hoành, kéo hoặc dùng phím mũi tên"
      aria-valuemin={-6}
      aria-valuemax={6}
      aria-valuenow={t}
      aria-valuetext={`x = ${formatNumber(t)}`}
      style="cursor:grab; outline:none"
      use:draggable={dragOpts}
    >
      <rect
        class="drag-knob"
        x={mx(t) - 8}
        y={my(0) + 10}
        width="16"
        height="16"
        rx="4"
        fill="#f59e0b"
        stroke="#fff"
        stroke-width="2"
      />
    </g>
  </CoordinatePlane>

  <FeedbackNote tone={ft === 0 ? 'info' : ft > 0 ? 'ok' : 'warn'} text={testSentence(a, b, c, t)} />

  <SignTable {a} {b} {c} />
  <p class="text-sm text-slate-700" aria-live="polite">{caseSentence(a, b, c)}</p>

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <SegmentedControl
      label="Giải bất phương trình"
      options={OPS.map((o) => ({ value: o, label: `f(x) ${OP_TEXT[o]} 0` }))}
      value={op}
      onchange={(v) => (op = /** @type {import('../_shared/quadratic.js').Op} */ (v))}
    />
    <p class="text-center" aria-live="polite">
      <Tex math={`${quadTex(a, b, c)} ${OP_TEX[op]} 0`} />
    </p>
    <p class="text-center font-semibold text-indigo-800" aria-live="polite">
      Tập nghiệm: <Tex math={answer} />
    </p>
    <p class="text-xs text-slate-600">
      Phần tô đậm trên trục hoành là tập nghiệm: chấm đặc là đầu mút được lấy, chấm rỗng là đầu mút
      không được lấy.
    </p>
  </div>
</div>
