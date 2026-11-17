<script>
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import {
    OP_TEX,
    OP_TEXT,
    exactRoots,
    pointText,
    quadTex,
    quadText,
    solutionTex,
    vertexOf,
  } from '../_shared/quadratic.js';
  import SignLayer from '../_shared/sign-layer.svelte';
  import SignTable from '../_shared/sign-table.svelte';
  import VariationTable from '../_shared/variation-table.svelte';

  const A_VALUES = [-2, -1, 1, 2];
  const OPS = /** @type {const} */ (['>', '<', '>=', '<=']);
  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -8, yMax: 8, width: 420, pad: 24 });

  let ai = $state(0);
  let b = $state(4);
  let c = $state(-1);
  /** @type {import('../_shared/quadratic.js').Op} */
  let op = $state('>=');
  const a = $derived(A_VALUES[ai]);

  const s = $derived(vertexOf(a, b, c));
  const roots = $derived(exactRoots(a, b, c));
  const rootsTex = $derived(
    roots.length === 0
      ? '\\text{không có}'
      : roots.length === 1
        ? `x_0 = ${roots[0].tex}`
        : `x_1 = ${roots[0].tex};\\ x_2 = ${roots[1].tex}`,
  );
  const plotLabel = $derived(
    `Parabol y = ${quadText(a, b, c)}, đỉnh S${pointText(s)}; ${roots.length === 0 ? 'không cắt trục hoành' : `cắt trục hoành tại x = ${roots.map((r) => r.text).join(' và x = ')}`}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <Stepper
      label="Hệ số a"
      bind:value={ai}
      min={0}
      max={A_VALUES.length - 1}
      format={(i) => formatNumber(A_VALUES[i])}
    />
    <Stepper label="Hệ số b" bind:value={b} min={-4} max={4} format={(v) => formatNumber(v)} />
    <Stepper label="Hệ số c" bind:value={c} min={-4} max={4} format={(v) => formatNumber(v)} />
  </div>
  <p class="text-center text-lg"><Tex math={`f(x) = ${quadTex(a, b, c)}`} /></p>

  <CoordinatePlane {plane} label={plotLabel} interactive={false}>
    <line
      x1={plane.mx(s.x)}
      y1={plane.my(plane.yMax)}
      x2={plane.mx(s.x)}
      y2={plane.my(plane.yMin)}
      stroke="#0f766e"
      stroke-dasharray="6 4"
    />
    <SignLayer {plane} {a} {b} {c} {op} />
    {#if s.y >= plane.yMin && s.y <= plane.yMax}
      <circle
        cx={plane.mx(s.x)}
        cy={plane.my(s.y)}
        r="6"
        fill="#be123c"
        stroke="#fff"
        stroke-width="2"
      />
    {/if}
  </CoordinatePlane>

  <dl
    class="grid gap-x-4 gap-y-1 text-sm text-slate-700 sm:grid-cols-[auto_1fr]"
    aria-live="polite"
  >
    <dt class="font-semibold">Đỉnh, trục đối xứng</dt>
    <dd>S{pointText(s)}, x = {formatNumber(s.x, 3)}</dd>
    <dt class="font-semibold">Nghiệm của f(x)</dt>
    <dd><Tex math={rootsTex} /></dd>
    <dt class="font-semibold">{a > 0 ? 'Giá trị nhỏ nhất' : 'Giá trị lớn nhất'}</dt>
    <dd>{formatNumber(s.y, 3)} tại x = {formatNumber(s.x, 3)}</dd>
  </dl>

  <VariationTable {a} {b} {c} />
  <SignTable {a} {b} {c} />

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <SegmentedControl
      label="Bất phương trình"
      options={OPS.map((o) => ({ value: o, label: `f(x) ${OP_TEXT[o]} 0` }))}
      value={op}
      onchange={(v) => (op = /** @type {import('../_shared/quadratic.js').Op} */ (v))}
    />
    <p class="text-center"><Tex math={`${quadTex(a, b, c)} ${OP_TEX[op]} 0`} /></p>
    <p class="text-center font-semibold text-indigo-800" aria-live="polite">
      Tập nghiệm: <Tex math={solutionTex(a, b, c, op)} />
    </p>
  </div>
</div>
