<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import { eqText, pairText } from '#lib/core/algebra-text.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import RegionLayer from '../_shared/region-layer.svelte';
  import {
    OPS,
    OP_TEXT,
    checkText,
    ineqTex,
    ineqText,
    isLinear,
    isStrict,
    onBorder,
    testPoint,
  } from '../_shared/half-plane.js';
  import { decides, record, verdict } from './engine.js';

  const SPAN = 6;
  const plane = planeScale({ xMin: -SPAN, xMax: SPAN, yMin: -SPAN, yMax: SPAN });
  const { mx, my, toX, toY, unit } = plane;
  const LINE = '#4f46e5';
  const OK = '#059669';
  const BAD = '#e11d48';

  let a = $state(2);
  let b = $state(-1);
  let c = $state(4);
  let op = $state(/** @type {import('../_shared/half-plane.js').Op} */ ('<'));
  const ineq = $derived({ a, b, c, op });
  const linear = $derived(isLinear(ineq));

  let handle = $state({ x: mx(3), y: my(3) });
  const point = $derived({ x: Math.round(toX(handle.x)), y: Math.round(toY(handle.y)) });

  /** @type {import('./engine.js').Tried[]} */
  let tried = $state([]);
  /**
   * The last test that decided the side, or null before one.
   * @type {{ x: number, y: number } | null}
   */
  let decided = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);

  const live = $derived(
    linear
      ? `Tại M${pairText(point.x, point.y)}: ${checkText(ineq, point)}${onBorder(ineq, point) ? ', M nằm trên d' : ''}.`
      : 'Hãy chọn a ≠ 0 hoặc b ≠ 0.',
  );

  function reset() {
    tried = [];
    decided = null;
    note = null;
  }

  function test() {
    if (!linear) return;
    note = verdict(ineq, point);
    if (decides(ineq, point)) {
      tried = record(tried, ineq, point);
      decided = { ...point };
    }
  }

  function moveToSuggested() {
    const p = testPoint(ineq);
    handle = { x: mx(p.x), y: my(p.y) };
  }

  /** @param {number} na @param {number} nb @param {number} nc @param {import('../_shared/half-plane.js').Op} nop */
  function preset(na, nb, nc, nop) {
    a = na;
    b = nb;
    c = nc;
    op = nop;
    reset();
  }

  const snap = (/** @type {{ x: number, y: number }} */ p) => ({
    x: mx(Math.max(-SPAN, Math.min(SPAN, Math.round(toX(p.x))))),
    y: my(Math.max(-SPAN, Math.min(SPAN, Math.round(toY(p.y))))),
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const dragOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    projector: snap,
    pad: 0,
    keyStep: unit,
  });

  const items = $derived([{ ineq, color: LINE, hatch: decided !== null }]);
  const plotLabel = $derived(
    `Mặt phẳng toạ độ với đường thẳng d: ${linear ? eqText(a, b, c) : 'chưa có'} và điểm M${pairText(point.x, point.y)}${decided ? `. Nửa mặt phẳng không là miền nghiệm đã bị gạch, ${isStrict(op) ? 'đường thẳng d vẽ nét đứt' : 'đường thẳng d vẽ nét liền'}` : ''}.`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <fieldset class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
      <legend class="px-1 text-sm font-semibold text-indigo-700">Bất phương trình</legend>
      <div class="text-center text-lg">
        <Tex math={ineqTex(ineq)} ariaLabel={ineqText(ineq)} />
      </div>
      <Stepper label="a" bind:value={a} min={-5} max={5} format={intText} onchange={reset} />
      <Stepper label="b" bind:value={b} min={-5} max={5} format={intText} onchange={reset} />
      <Stepper label="c" bind:value={c} min={-10} max={10} format={intText} onchange={reset} />
      <SegmentedControl
        label="Dấu"
        bind:value={op}
        onchange={reset}
        options={OPS.map((o) => ({ value: o, label: OP_TEXT[o] }))}
      />
    </fieldset>
    <div class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <p class="font-semibold text-slate-700">Ba bước của sách</p>
      <ol class="list-decimal space-y-1 pl-5 text-slate-700">
        <li>Vẽ đường thẳng d: nét đứt với dấu &lt;, &gt;; nét liền với dấu ≤, ≥.</li>
        <li>Kéo điểm M ra ngoài d rồi bấm “Thử điểm M”.</li>
        <li>M thoả mãn: giữ nửa mặt phẳng chứa M; không thoả mãn: giữ nửa còn lại.</li>
      </ol>
      <p class="font-semibold text-slate-700">Bất phương trình mẫu</p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.quiet} onclick={() => preset(2, -1, 4, '<')}
          >2x − y &lt; 4</button
        >
        <button type="button" class={button.quiet} onclick={() => preset(3, 1, 6, '<=')}
          >3x + y ≤ 6</button
        >
        <button type="button" class={button.quiet} onclick={() => preset(1, -2, 0, '>')}
          >x − 2y &gt; 0</button
        >
        <button type="button" class={button.quiet} onclick={() => preset(0, 1, 2, '>=')}
          >y ≥ 2</button
        >
      </div>
    </div>
  </div>

  <CoordinatePlane bind:svgEl {plane} label={plotLabel}>
    {#snippet children(p)}
      <RegionLayer plane={p} {items} />
      {#each tried as t (`${t.x};${t.y}`)}
        {#if t.ok}
          <circle cx={mx(t.x)} cy={my(t.y)} r="5" fill={OK} />
        {:else}
          <path
            d="M {mx(t.x) - 4} {my(t.y) - 4} L {mx(t.x) + 4} {my(t.y) + 4} M {mx(t.x) + 4} {my(
              t.y,
            ) - 4} L {mx(t.x) - 4} {my(t.y) + 4}"
            stroke={BAD}
            stroke-width="2.2"
          />
        {/if}
      {/each}
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm thử M{pairText(point.x, point.y)}, kéo hoặc dùng phím mũi tên để di chuyển"
        style="cursor:grab; outline:none"
        use:draggable={dragOpts}
      >
        <circle
          class="drag-knob"
          cx={handle.x}
          cy={handle.y}
          r="8"
          fill="#f59e0b"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={point.x > 2 ? handle.x - 11 : handle.x + 11}
        y={point.y > 4 ? handle.y + 22 : handle.y - 10}
        text-anchor={point.x > 2 ? 'end' : 'start'}
        font-size="12"
        font-weight="700"
        fill="#92400e"
        style="pointer-events:none">M{pairText(point.x, point.y)}</text
      >
    {/snippet}
  </CoordinatePlane>

  <p class="text-sm text-slate-700" aria-live="polite">{live}</p>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={test} disabled={!linear}>
      Thử điểm M
    </button>
    <button type="button" class={button.quiet} onclick={moveToSuggested} disabled={!linear}>
      Đưa M về điểm thử gợi ý
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Xoá kết quả</button>
  </div>
  {#if note}
    <FeedbackNote tone={note.tone} text={note.text} />
  {:else}
    <FeedbackNote
      tone="info"
      text="Chưa thử điểm nào: cả mặt phẳng còn để trắng. Thử một điểm để biết phải gạch bỏ nửa mặt phẳng nào."
    />
  {/if}
  {#if decided}
    <p class="text-sm text-slate-600">
      Phần bị gạch không là miền nghiệm. Thử thêm vài điểm ở hai phía của d: các chấm xanh (nghiệm)
      luôn cùng một phía, các dấu nhân đỏ ở phía còn lại.
    </p>
  {/if}
</div>
