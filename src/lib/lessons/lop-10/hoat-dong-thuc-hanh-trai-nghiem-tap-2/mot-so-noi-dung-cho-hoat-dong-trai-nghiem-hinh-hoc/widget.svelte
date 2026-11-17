<script>
  import { onDestroy } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { frameLoop } from '#lib/core/motion.js';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { dist } from '#lib/geom-engine/plane.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    R,
    angleOf,
    branch,
    cm,
    conicOf,
    kindOf,
    locusNote,
    locusPoint,
    onCircle,
    ripples,
  } from './engine.js';

  const W = 400;
  const H = 300;
  /** Pixels per centimetre. */
  const UNIT = 30;
  const O = { x: W / 2, y: H / 2 };
  /** Most trace dots kept. */
  const MAX_TRACE = 720;

  /** @param {{ x: number, y: number }} p math point in cm */
  const px = (p) => ({ x: O.x + p.x * UNIT, y: O.y - p.y * UNIT });
  /** @param {{ x: number, y: number }} p board point */
  const math = (p) => ({ x: (p.x - O.x) / UNIT, y: (O.y - p.y) / UNIT });

  let mode = $state('locus');

  // The circle (A; R) and the free point B, in cm.
  const A = { x: -1, y: 0 };
  let B = $state({ x: 1, y: 0 });
  let deg = $state(60);
  /** @type {{ x: number, y: number }[]} */
  let trace = $state([]);
  let running = $state(false);
  /** @type {null | (() => void)} */
  let stop = null;

  const step = $derived(locusPoint(A, B, R, deg));
  const kind = $derived(kindOf(A, B, R));
  const conic = $derived(conicOf(dist(A, B), R));
  const note = $derived(locusNote(A, B, R, kind === 'on' ? null : step.M));

  // Board copies of the handles, moved by `use:draggable`.
  let bHandle = $state(px({ x: 1, y: 0 }));
  let cHandle = $state(px(onCircle(A, R, 60)));

  /** Records M for the trace at the current angle. */
  function record() {
    const M = step.M;
    if (!M || kind === 'on') return;
    const p = px(M);
    if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) return;
    trace = [...trace.slice(-(MAX_TRACE - 1)), p];
  }

  /** @param {number} next */
  function setAngle(next) {
    deg = ((next % 360) + 360) % 360;
    const c = px(onCircle(A, R, deg));
    cHandle.x = c.x;
    cHandle.y = c.y;
    record();
  }

  /** @param {{ x: number, y: number }} p cm */
  function placeB(p) {
    B = p;
    const b = px(p);
    bHandle.x = b.x;
    bHandle.y = b.y;
    trace = [];
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const snapHalf = (/** @type {number} */ v) => Math.round(v * 2) / 2;
  const bDrag = $derived({
    point: bHandle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 12,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const m = math(p);
      return px({ x: snapHalf(m.x), y: snapHalf(m.y) });
    },
    keyStep: UNIT / 2,
    keyShiftStep: UNIT * 2,
    onChange: () => {
      const m = math(bHandle);
      if (m.x !== B.x || m.y !== B.y) {
        B = m;
        trace = [];
      }
    },
  });

  const cDrag = $derived({
    point: cHandle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => px(onCircle(A, R, angleOf(A, math(p)))),
    onChange: () => setAngle(angleOf(A, math(cHandle))),
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setAngle(deg + (dx > 0 || dy < 0 ? 1 : -1) * (big ? 30 : 5)),
  });

  function toggleRun() {
    if (running) {
      stop?.();
      stop = null;
      running = false;
      return;
    }
    running = true;
    let turned = 0;
    stop = frameLoop((dt) => {
      const by = 90 * dt;
      turned += by;
      setAngle(deg + by);
      if (turned >= 360) {
        stop?.();
        stop = null;
        running = false;
      }
    });
  }

  onDestroy(() => stop?.());

  /**
   * A long piece of the line through P and Q (cm), drawn on the board and
   * clipped by it.
   * @param {{ x: number, y: number }} P @param {{ x: number, y: number }} Q
   */
  function longLine(P, Q) {
    const d = dist(P, Q) || 1;
    const u = { x: (Q.x - P.x) / d, y: (Q.y - P.y) / d };
    return [
      px({ x: P.x - 30 * u.x, y: P.y - 30 * u.y }),
      px({ x: P.x + 30 * u.x, y: P.y + 30 * u.y }),
    ];
  }

  const C = $derived(step.C);
  const lineAC = $derived(longLine(A, C));
  const mid = $derived({ x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 });
  const bisector = $derived(longLine(mid, { x: mid.x - (C.y - B.y), y: mid.y + (C.x - B.x) }));
  const Mpx = $derived(step.M && kind !== 'on' ? px(step.M) : null);
  const Apx = px(A);
  const Bpx = $derived(px(B));
  const Cpx = $derived(px(C));

  const KIND_TEXT = {
    ellipse: 'elip',
    hyperbola: 'hypebol',
    on: 'không có đường cong',
  };

  // Two pebbles: centres O₁, O₂ 5 cm apart, first rings R₁ = 3, R₂ = 4.
  const O1 = { x: -2.5, y: 0 };
  const O2 = { x: 2.5, y: 0 };
  const R1 = 3;
  const R2 = 4;
  let gap = $state(1);
  let count = $state(4);
  let showBranch = $state(true);
  const rings = $derived(ripples(O1, O2, R1, R2, gap, count));
  const branchPts = $derived(branch(O1, O2, R2 - R1, 6).map(px));
  const dots = $derived(rings.flatMap((ring) => ring.points.map((P) => ({ k: ring.k, P }))));
  const shown = $derived(
    rings.filter((ring) => ring.points.length > 0 && Math.abs(ring.points[0].y) <= 5),
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn cách dựng"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'locus', label: 'Điểm M' },
      { value: 'ripples', label: 'Hai viên sỏi' },
    ]}
  />

  {#if mode === 'locus'}
    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-xl"
      label="Đường tròn tâm A bán kính 3 cm, điểm B, điểm C trên đường tròn, đường thẳng AC, đường trung trực của BC và giao điểm M. Vết của M là một {KIND_TEXT[
        kind
      ]}."
    >
      {#each { length: W / UNIT + 1 } as _, i (i)}
        <line x1={O.x + (i - 7) * UNIT} y1="0" x2={O.x + (i - 7) * UNIT} y2={H} stroke="#f1f5f9" />
      {/each}
      {#each { length: H / UNIT + 1 } as _, i (i)}
        <line x1="0" y1={O.y + (i - 5) * UNIT} x2={W} y2={O.y + (i - 5) * UNIT} stroke="#f1f5f9" />
      {/each}

      <circle cx={Apx.x} cy={Apx.y} r={R * UNIT} fill="none" stroke="#0f766e" stroke-width="2" />
      {#each trace as p, i (i)}
        <circle cx={p.x} cy={p.y} r="1.6" fill="#e11d48" />
      {/each}

      <line
        x1={lineAC[0].x}
        y1={lineAC[0].y}
        x2={lineAC[1].x}
        y2={lineAC[1].y}
        stroke="#64748b"
        stroke-width="1.2"
      />
      <line
        x1={bisector[0].x}
        y1={bisector[0].y}
        x2={bisector[1].x}
        y2={bisector[1].y}
        stroke="#d97706"
        stroke-width="1.4"
        stroke-dasharray="6 4"
      />
      <line x1={Bpx.x} y1={Bpx.y} x2={Cpx.x} y2={Cpx.y} stroke="#4f46e5" stroke-width="1.4" />

      {#if Mpx}
        <line
          x1={Mpx.x}
          y1={Mpx.y}
          x2={Bpx.x}
          y2={Bpx.y}
          stroke="#e11d48"
          stroke-width="1"
          stroke-dasharray="3 3"
        />
        <circle cx={Mpx.x} cy={Mpx.y} r="5" fill="#e11d48" />
        <text x={Mpx.x + 8} y={Mpx.y - 8} font-size="14" font-weight="700" fill="#9f1239">M</text>
      {/if}

      <circle cx={Apx.x} cy={Apx.y} r="4" fill="#0f766e" />
      <text x={Apx.x - 16} y={Apx.y - 8} font-size="14" font-weight="700" fill="#134e4a">A</text>

      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm B; kéo hoặc dùng phím mũi tên để di chuyển"
        style="cursor:grab; outline:none"
        use:draggable={bDrag}
      >
        <circle
          class="drag-knob"
          cx={Bpx.x}
          cy={Bpx.y}
          r="8"
          fill="#4f46e5"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={Bpx.x + 10}
        y={Bpx.y + 18}
        font-size="14"
        font-weight="700"
        fill="#312e81"
        style="pointer-events:none">B</text
      >

      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm C trên đường tròn; kéo hoặc dùng phím mũi tên để di chuyển"
        aria-valuemin="0"
        aria-valuemax="360"
        aria-valuenow={Math.round(deg)}
        aria-valuetext="{Math.round(deg)} độ"
        style="cursor:grab; outline:none"
        use:draggable={cDrag}
      >
        <circle
          class="drag-knob"
          cx={Cpx.x}
          cy={Cpx.y}
          r="8"
          fill="#0f766e"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={Cpx.x + 10}
        y={Cpx.y - 10}
        font-size="14"
        font-weight="700"
        fill="#134e4a"
        style="pointer-events:none">C</text
      >
    </GeometryBoard>

    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={toggleRun} disabled={kind === 'on'}>
        {running ? 'Dừng' : 'Cho C chạy một vòng'}
      </button>
      <button type="button" class={button.quiet} onclick={() => (trace = [])}>Xoá vết</button>
      <button type="button" class={button.quiet} onclick={() => placeB({ x: 1, y: 0 })}
        >B trong đường tròn</button
      >
      <button type="button" class={button.quiet} onclick={() => placeB({ x: 3, y: 0 })}
        >B ngoài đường tròn</button
      >
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-1 text-left text-slate-600">Số đo (1 ô lưới = 1 cm, R = 3 cm)</caption>
        <tbody>
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 pr-2 text-left">Tiêu cự</th>
            <td class="py-1 pr-2">AB ≈ {cm(dist(A, B))}</td>
            <td class="py-1">Vết của M: {KIND_TEXT[kind]}</td>
          </tr>
          {#if step.M && kind !== 'on'}
            <tr class="border-b border-slate-100">
              <th scope="row" class="py-1 pr-2 text-left">Điểm M</th>
              <td class="py-1 pr-2">MA ≈ {cm(dist(step.M, A))}</td>
              <td class="py-1">MB = MC ≈ {cm(dist(step.M, B))}</td>
            </tr>
          {/if}
          {#if kind !== 'on'}
            <tr>
              <th scope="row" class="py-1 pr-2 text-left">Đường conic</th>
              <td class="py-1 pr-2">a = {cm(conic.a)}; c ≈ {cm(conic.c)}</td>
              <td class="py-1">b ≈ {cm(conic.b)}</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>

    <FeedbackNote tone={kind === 'on' || !step.M ? 'warn' : 'ok'} text={note} />
  {:else}
    <GeometryBoard
      width={W}
      height={H}
      maxWidth="max-w-xl"
      label="Hai họ đường tròn tâm O1 và O2 cách nhau 5 cm, bán kính bắt đầu từ 3 cm và 4 cm, tăng mỗi lần {formatNumber(
        gap,
      )} cm. Giao điểm của hai đường tròn cùng thứ tự nằm trên một nhánh hypebol."
    >
      {#each rings as ring (ring.k)}
        <circle
          cx={px(O1).x}
          cy={px(O1).y}
          r={ring.r1 * UNIT}
          fill="none"
          stroke="#0ea5e9"
          stroke-width="1.2"
        />
        <circle
          cx={px(O2).x}
          cy={px(O2).y}
          r={ring.r2 * UNIT}
          fill="none"
          stroke="#a855f7"
          stroke-width="1.2"
        />
      {/each}
      {#if showBranch}
        <polyline
          points={pointsAttr(branchPts)}
          fill="none"
          stroke="#e11d48"
          stroke-width="1.6"
          stroke-dasharray="6 4"
        />
      {/if}
      {#each dots as d, i (i)}
        <circle
          cx={px(d.P).x}
          cy={px(d.P).y}
          r="4.5"
          fill="#e11d48"
          stroke="#fff"
          stroke-width="1.5"
        />
      {/each}
      <circle cx={px(O1).x} cy={px(O1).y} r="4" fill="#0369a1" />
      <text x={px(O1).x - 8} y={px(O1).y + 20} font-size="13" font-weight="700" fill="#075985"
        >O₁</text
      >
      <circle cx={px(O2).x} cy={px(O2).y} r="4" fill="#7e22ce" />
      <text x={px(O2).x - 8} y={px(O2).y + 20} font-size="13" font-weight="700" fill="#6b21a8"
        >O₂</text
      >
    </GeometryBoard>

    <div class="grid gap-4 sm:grid-cols-2">
      <SliderField
        label="Khoảng cách giữa hai vòng sóng a"
        bind:value={gap}
        min={0.5}
        max={2}
        step={0.5}
        unit="cm"
      />
      <SliderField label="Số vòng sóng mỗi họ" bind:value={count} min={1} max={8} />
    </div>
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="size-5" bind:checked={showBranch} />
      Hiện nhánh hypebol PO₂ − PO₁ = 1 cm
    </label>

    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-1 text-left text-slate-600"
          >Giao điểm P của hai vòng cùng thứ tự (thấy trên bảng)</caption
        >
        <thead>
          <tr class="border-b border-slate-200 text-left">
            <th scope="col" class="py-1 pr-2">Vòng</th>
            <th scope="col" class="py-1 pr-2">PO₁</th>
            <th scope="col" class="py-1 pr-2">PO₂</th>
            <th scope="col" class="py-1">PO₂ − PO₁</th>
          </tr>
        </thead>
        <tbody>
          {#each shown as ring (ring.k)}
            <tr class="border-b border-slate-100">
              <td class="py-1 pr-2">{ring.k + 1}</td>
              <td class="py-1 pr-2">{formatNumber(ring.r1)} cm</td>
              <td class="py-1 pr-2">{formatNumber(ring.r2)} cm</td>
              <td class="py-1">{formatNumber(ring.r2 - ring.r1)} cm</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <FeedbackNote
      tone="ok"
      text="Mỗi giao điểm $P$ có $PO_2 - PO_1 = (4 + ka) - (3 + ka) = 1$ không đổi, nên mọi giao điểm nằm trên cùng một nhánh hypebol (gần $O_1$) có hai tiêu điểm $O_1$, $O_2$ và tiêu cự $O_1O_2 = 5$ cm."
    />
  {/if}
</div>
