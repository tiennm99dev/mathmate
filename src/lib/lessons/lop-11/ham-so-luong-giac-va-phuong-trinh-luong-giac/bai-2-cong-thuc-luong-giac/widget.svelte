<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { angleAt, circlePoint, degTex, mod } from '../_shared/trig.js';
  import { FORMULAS, fourTex, lhs } from './engine.js';

  const W = 340;
  const C = { x: 170, y: 170 };
  const R = 120;
  const STEP = 5;
  const COLORS = { a: '#2563eb', b: '#d97706', c: '#7c3aed' };

  let formulaId = $state('cos-minus');
  let a = $state(45);
  let b = $state(30);
  let pa = $state(circlePoint(C, R, 45));
  let pb = $state(circlePoint(C, R, 30));
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const f = $derived(FORMULAS.find((x) => x.id === formulaId) ?? FORMULAS[0]);

  /** @param {number} deg */
  const snapDeg = (deg) => mod(Math.round(deg / STEP) * STEP, 360);

  /**
   * @param {'a' | 'b'} which
   * @param {number} deg
   */
  function setAngle(which, deg) {
    const d = snapDeg(deg);
    if (which === 'a') {
      a = d;
      pa = circlePoint(C, R, d);
    } else {
      b = d;
      pb = circlePoint(C, R, d);
    }
  }

  /**
   * Drag options for the point of angle a or b.
   * @param {'a' | 'b'} which
   */
  function dragFor(which) {
    return {
      point: which === 'a' ? pa : pb,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: W },
      pad: 0,
      projector: (/** @type {{ x: number, y: number }} */ p) =>
        circlePoint(C, R, snapDeg(angleAt(C, p))),
      onChange: () => {
        if (which === 'a') a = snapDeg(angleAt(C, pa));
        else b = snapDeg(angleAt(C, pb));
      },
      onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ dy, big = false) => {
        const dir = dx || -dy;
        const cur = which === 'a' ? a : b;
        setAngle(which, cur + dir * STEP * (big ? 6 : 1));
      },
    };
  }
  const dragA = $derived(dragFor('a'));
  const dragB = $derived(dragFor('b'));

  const cAngle = $derived(f.angle(a, b));
  const pc = $derived(circlePoint(C, R, cAngle));
  const left = $derived(lhs(f, a, b));
  const right = $derived(f.rhs(a, b));
  // The projection of C on the axis of the left side.
  const foot = $derived(f.axis === 'cos' ? { x: pc.x, y: C.y } : { x: C.x, y: pc.y });

  const argTex = $derived(
    f.two
      ? `(${degTex(a)} ${f.id.endsWith('plus') ? '+' : '-'} ${degTex(b)})`
      : `(2 \\cdot ${degTex(a)})`,
  );
  const leftTex = $derived(
    `${f.lhsTex} = \\${f.axis}${argTex} = \\${f.axis}\\left(${degTex(cAngle)}\\right) \\approx ${fourTex(left)}`,
  );
  const rightTex = $derived(
    `${f.rhsTex} \\approx ${f.rhsNumbers(a, b)} \\approx ${fourTex(right)}`,
  );
  const note = $derived(
    `Hai vế cùng bằng $${fourTex(left)}$ (làm tròn đến hàng phần mười nghìn). Vế trái là ${
      f.axis === 'cos' ? 'hoành độ' : 'tung độ'
    } của điểm C ứng với góc $${degTex(cAngle)}$; vế phải chỉ dùng toạ độ của ${f.two ? 'A và B' : 'A'}.`,
  );

  const presets = [
    { a: 45, b: 30, label: 'a = 45°, b = 30°' },
    { a: 60, b: 45, label: 'a = 60°, b = 45°' },
    { a: 120, b: 90, label: 'a = 120°, b = 90°' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Công thức cần kiểm chứng"
    options={FORMULAS.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={formulaId}
  />

  <div class="grid gap-4 md:grid-cols-[3fr_2fr]">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {W}"
      class="mx-auto block w-full max-w-sm touch-none select-none rounded-lg border border-slate-200 bg-white"
      role="group"
      aria-label="Đường tròn lượng giác với điểm A ứng với góc a, điểm B ứng với góc b và điểm C ứng với góc của vế trái."
    >
      <line x1="10" y1={C.y} x2={W - 10} y2={C.y} stroke="#94a3b8" stroke-width="1.5" />
      <line x1={C.x} y1={W - 10} x2={C.x} y2="10" stroke="#94a3b8" stroke-width="1.5" />
      <circle cx={C.x} cy={C.y} r={R} fill="none" stroke="#334155" stroke-width="2" />
      <text x={W - 22} y={C.y - 6} font-size="12" fill="#64748b">x</text>
      <text x={C.x + 6} y="22" font-size="12" fill="#64748b">y</text>

      <!-- C and its coordinate on the axis of the left side -->
      <line x1={C.x} y1={C.y} x2={pc.x} y2={pc.y} stroke={COLORS.c} stroke-width="2.5" />
      <line x1={pc.x} y1={pc.y} x2={foot.x} y2={foot.y} stroke={COLORS.c} stroke-dasharray="4 3" />
      <line
        x1={C.x}
        y1={C.y}
        x2={foot.x}
        y2={foot.y}
        stroke={COLORS.c}
        stroke-width="6"
        stroke-linecap="round"
        opacity="0.6"
      />
      <circle cx={pc.x} cy={pc.y} r="7" fill={COLORS.c} />
      <text
        x={circlePoint(C, R + 18, cAngle).x - 5}
        y={circlePoint(C, R + 18, cAngle).y + 5}
        font-size="14"
        font-weight="700"
        fill={COLORS.c}>C</text
      >

      <line x1={C.x} y1={C.y} x2={pa.x} y2={pa.y} stroke={COLORS.a} stroke-width="2" />
      {#if f.two}
        <line x1={C.x} y1={C.y} x2={pb.x} y2={pb.y} stroke={COLORS.b} stroke-width="2" />
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Điểm B, góc b; kéo hoặc dùng phím mũi tên"
          aria-valuemin={0}
          aria-valuemax={355}
          aria-valuenow={b}
          aria-valuetext={`b = ${b} độ`}
          style="cursor:grab; outline:none"
          use:draggable={dragB}
        >
          <circle
            class="drag-knob"
            cx={pb.x}
            cy={pb.y}
            r="10"
            fill={COLORS.b}
            stroke="#fff"
            stroke-width="2"
          />
        </g>
        <text
          x={circlePoint(C, R + 20, b).x - 5}
          y={circlePoint(C, R + 20, b).y + 5}
          font-size="14"
          font-weight="700"
          fill={COLORS.b}
          pointer-events="none">B</text
        >
      {/if}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm A, góc a; kéo hoặc dùng phím mũi tên"
        aria-valuemin={0}
        aria-valuemax={355}
        aria-valuenow={a}
        aria-valuetext={`a = ${a} độ`}
        style="cursor:grab; outline:none"
        use:draggable={dragA}
      >
        <circle
          class="drag-knob"
          cx={pa.x}
          cy={pa.y}
          r="10"
          fill={COLORS.a}
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={circlePoint(C, R + 20, a).x - 5}
        y={circlePoint(C, R + 20, a).y + 5}
        font-size="14"
        font-weight="700"
        fill={COLORS.a}
        pointer-events="none">A</text
      >
    </svg>

    <div class="min-w-0 space-y-3 text-sm">
      <p>
        <span class="font-semibold" style="color:{COLORS.a}"
          >A: <Tex math={`a = ${degTex(a)}`} /></span
        >
        {#if f.two}
          <span class="ml-3 font-semibold" style="color:{COLORS.b}"
            >B: <Tex math={`b = ${degTex(b)}`} /></span
          >
        {/if}
      </p>
      <div class="overflow-x-auto rounded-lg bg-violet-50 p-3">
        <p class="font-semibold text-violet-800">Vế trái (đọc trên điểm C)</p>
        <Tex math={leftTex} />
      </div>
      <div class="overflow-x-auto rounded-lg bg-slate-50 p-3">
        <p class="font-semibold text-slate-700">Vế phải (tính từ toạ độ)</p>
        <Tex math={rightTex} />
      </div>
    </div>
  </div>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn nhanh hai góc">
    {#each presets as p (p.label)}
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          setAngle('a', p.a);
          setAngle('b', p.b);
        }}>{p.label}</button
      >
    {/each}
  </div>

  <FeedbackNote tone="ok" text={note} />
</div>
