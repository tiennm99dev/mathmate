<script>
  import { tick } from 'svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import PlotClip from '../_shared/plot-clip.svelte';
  import { curvePath, rootsOf } from '../_shared/quadratic.js';
  import {
    EQUATIONS,
    at,
    candidates,
    check,
    conclusion,
    equationTex,
    leftAt,
    rightAt,
    squared,
  } from './engine.js';

  const LEFT = '#4f46e5';
  const RIGHT = '#0f766e';
  const CAND = '#ea580c';
  const OK = '#059669';
  const BAD = '#e11d48';
  const STEPS = ['Vẽ hai vế', 'Bình phương hai vế', 'Thử lại'];

  let eqId = $state('ss-1');
  let step = $state(0);
  const eq = $derived(EQUATIONS.find((e) => e.id === eqId) ?? EQUATIONS[0]);
  const plane = $derived(planeScale({ ...eq.view, width: 420, pad: 24 }));
  const sq = $derived(squared(eq));
  const xs = $derived(candidates(eq));
  const checks = $derived(xs.map((x) => ({ x, ...check(eq, x) })));

  // Where a candidate sits on the picture: on the radicand parabolas for
  // √f = √g, on the curve y = √f for √f = dx + e.
  const marks = $derived(
    checks.map((c) => ({
      ...c,
      y: eq.kind === 'sqrt-sqrt' ? at(eq.f, c.x) : leftAt(eq, c.x),
    })),
  );

  // Sample the ends of each square root's domain too, so its curve starts on the axis.
  const leftEdges = $derived([...xs, ...rootsOf(...eq.f)]);
  const rightEdges = $derived(
    eq.kind === 'sqrt-sqrt'
      ? [...xs, ...rootsOf(.../** @type {[number, number, number]} */ (eq.g))]
      : xs,
  );
  const leftPath = $derived(curvePath((x) => leftAt(eq, x), plane, { extra: leftEdges }));
  const rightPath = $derived(curvePath((x) => rightAt(eq, x), plane, { extra: rightEdges }));
  const fPath = $derived(curvePath((x) => at(eq.f, x), plane));
  const gPath = $derived(
    eq.kind === 'sqrt-sqrt'
      ? curvePath((x) => at(/** @type {[number, number, number]} */ (eq.g), x), plane)
      : '',
  );
  const mirrorPath = $derived(
    eq.kind === 'sqrt-line' ? curvePath((x) => -rightAt(eq, x), plane) : '',
  );

  /** @param {string | number} id */
  function choose(id) {
    eqId = String(id);
    step = 0;
  }

  const FIRST_NOTE =
    'Nghiệm của phương trình là hoành độ giao điểm của hai đồ thị. Bấm "Bước tiếp" để giải bằng cách bình phương.';

  /** @type {HTMLButtonElement | undefined} */
  let resetButton = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  async function reset() {
    step = 0;
    await tick();
    nextButton?.focus();
  }

  async function next() {
    step += 1;
    if (step === 2) {
      await tick();
      resetButton?.focus();
    }
  }
  const stepNote = $derived(
    step === 0
      ? FIRST_NOTE
      : step === 1
        ? eq.kind === 'sqrt-sqrt'
          ? `Bình phương hai vế được phương trình bậc hai với các nghiệm ${xs.map((x) => formatNumber(x)).join('; ')} (giao điểm của hai parabol nét đứt). Phương trình mới không đòi hỏi biểu thức dưới dấu căn không âm, nên có thể có nghiệm ngoại lai.`
          : `Bình phương hai vế được phương trình bậc hai với các nghiệm ${xs.map((x) => formatNumber(x)).join('; ')}. Bình phương làm mất dấu: chỗ √f(x) gặp đường nét đứt y = −(vế phải) cũng thành nghiệm, đó là nghiệm ngoại lai.`
        : conclusion(eq),
  );

  const plotLabel = $derived(
    `Đồ thị vế trái và vế phải của phương trình${step >= 1 ? `; các giá trị thử: ${xs.map((x) => formatNumber(x)).join(', ')}` : ''}${step === 2 ? `; ${conclusion(eq)}` : ''}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn phương trình"
    options={EQUATIONS.map((e, i) => ({ value: e.id, label: `Phương trình ${i + 1}` }))}
    value={eqId}
    onchange={choose}
  />
  <p class="text-center text-lg"><Tex math={equationTex(eq)} /></p>

  <ol class="flex flex-wrap gap-2 text-sm" aria-label="Các bước giải">
    {#each STEPS as s, i (s)}
      <li
        class="rounded-full px-3 py-1 font-semibold {i === step
          ? 'bg-indigo-600 text-white'
          : i < step
            ? 'bg-indigo-100 text-indigo-800'
            : 'bg-slate-100 text-slate-500'}"
        aria-current={i === step ? 'step' : undefined}
      >
        {i + 1}. {s}
      </li>
    {/each}
  </ol>

  <CoordinatePlane {plane} label={plotLabel} interactive={false}>
    {#if step >= 1 && eq.kind === 'sqrt-sqrt'}
      <rect
        x={plane.mx(plane.xMin)}
        y={plane.my(0)}
        width={plane.mx(plane.xMax) - plane.mx(plane.xMin)}
        height={plane.my(plane.yMin) - plane.my(0)}
        fill={BAD}
        opacity="0.07"
      />
      <text x={plane.mx(plane.xMin) + 6} y={plane.my(plane.yMin) - 8} font-size="11" fill={BAD}
        >biểu thức dưới căn âm</text
      >
    {/if}
    <PlotClip {plane}>
      {#if step >= 1}
        {#if eq.kind === 'sqrt-sqrt'}
          <path d={fPath} fill="none" stroke={LEFT} stroke-width="1.5" stroke-dasharray="6 4" />
          <path d={gPath} fill="none" stroke={RIGHT} stroke-width="1.5" stroke-dasharray="6 4" />
        {:else}
          <path
            d={mirrorPath}
            fill="none"
            stroke={RIGHT}
            stroke-width="1.5"
            stroke-dasharray="6 4"
          />
        {/if}
      {/if}
      <path d={leftPath} fill="none" stroke={LEFT} stroke-width="2.5" />
      <path d={rightPath} fill="none" stroke={RIGHT} stroke-width="2.5" />
    </PlotClip>

    {#if step >= 1}
      {#each marks as m (m.x)}
        {@const color = step === 2 ? (m.ok ? OK : BAD) : CAND}
        <line
          x1={plane.mx(m.x)}
          y1={plane.my(0)}
          x2={plane.mx(m.x)}
          y2={plane.my(m.y)}
          stroke={color}
          stroke-dasharray="3 3"
        />
        <circle
          cx={plane.mx(m.x)}
          cy={plane.my(m.y)}
          r="6.5"
          fill={color}
          stroke="#fff"
          stroke-width="2"
        />
        <text
          x={plane.mx(m.x) + 9}
          y={plane.my(m.y) - 8}
          font-size="12"
          font-weight="700"
          fill={color}>{step === 2 ? (m.ok ? '✓' : '✗') : ''} x = {formatNumber(m.x)}</text
        >
      {/each}
    {/if}
  </CoordinatePlane>

  <p class="flex flex-wrap justify-center gap-x-4 text-xs text-slate-600">
    <span style="color: {LEFT}">— vế trái</span>
    <span style="color: {RIGHT}">— vế phải</span>
    {#if step >= 1}
      <span style="color: {RIGHT}"
        >- - {eq.kind === 'sqrt-sqrt' ? 'biểu thức dưới căn' : 'y = −(vế phải)'}</span
      >
    {/if}
  </p>

  {#if step >= 1}
    <div class="space-y-1 rounded-xl bg-slate-50 p-3 text-center">
      <p><Tex math={sq.raw} /></p>
      <p><Tex math={`\\Rightarrow ${sq.tex}`} /></p>
    </div>
  {/if}
  {#if step === 2}
    <ul class="space-y-1 text-sm" aria-live="polite">
      {#each checks as c (c.x)}
        <li class="font-semibold" style="color: {c.ok ? OK : BAD}">{c.text}</li>
      {/each}
    </ul>
  {/if}
  <FeedbackNote tone={step === 2 ? 'ok' : 'info'} text={stepNote} />

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.primary}
      bind:this={nextButton}
      disabled={step === 2}
      onclick={next}
    >
      Bước tiếp
    </button>
    <button
      type="button"
      class={button.quiet}
      bind:this={resetButton}
      disabled={step === 0}
      onclick={reset}
    >
      Làm lại
    </button>
  </div>
</div>
