<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { sampleEllipse } from '../_shared/conic.js';
  import { slideHandle } from '../_shared/handles.js';
  import { DISH, ORBITS, dishLines, dishOf, millionKm, orbitLines, sunDistance } from './engine.js';

  let mode = $state('quy-dao');

  /* ---------- orbit ---------- */
  let orbitId = $state('halley');
  let at = $state(30);
  const orbit = $derived(ORBITS.find((o) => o.id === orbitId) ?? ORBITS[0]);
  const b = $derived(Math.sqrt(1 - orbit.e ** 2));
  // The orbit drawn with a = 1, the picture as tall as the orbit needs.
  const plane = $derived(
    planeScale({ xMin: -1.15, xMax: 1.15, yMin: -b - 0.25, yMax: b + 0.25, width: 360, pad: 16 }),
  );
  /** @param {number} x */
  const mx = (x) => plane.mx(x);
  /** @param {number} y */
  const my = (y) => plane.my(y);
  const samples = $derived(sampleEllipse(1, b, 120));
  const M = $derived(samples[at]);
  const orbitPath = $derived(`M ${samples.map((q) => `${mx(q.x)},${my(q.y)}`).join(' L ')} Z`);
  const r = $derived(sunDistance(orbit.a, orbit.e, orbit.a * M.x));
  /** @type {SVGSVGElement | undefined} */
  let orbitSvg = $state();
  const mHandle = $derived(
    slideHandle({
      samples,
      index: at,
      plane,
      svg: () => orbitSvg ?? null,
      onindex: (i) => (at = i),
    }),
  );
  const orbitNote = $derived.by(() => {
    if (at === 0) return `Đây là điểm xa Mặt Trời nhất (viễn điểm), cách ${millionKm(r)}.`;
    if (at === 60) return `Đây là điểm gần Mặt Trời nhất (cận điểm), cách ${millionKm(r)}.`;
    return orbit.e > 0.5
      ? 'Quỹ đạo rất dẹt: khoảng cách đến Mặt Trời thay đổi rất nhiều. Kéo vật đến hai đầu trục lớn để thấy khoảng cách gần nhất và xa nhất.'
      : 'Quỹ đạo gần tròn: khoảng cách đến Mặt Trời gần như không đổi. Kéo vật đến hai đầu trục lớn để so sánh.';
  });

  /* ---------- dish ---------- */
  let D = $state(120);
  let h = $state(20);
  const dish = $derived(dishOf(D, h));
  const K = 1.2; // px per cm
  const DW = 330;
  const top = $derived(Math.max(dish.f, h) + 25);
  const DH = $derived(top * K + 20);
  /** Screen point of the dish point (x along the axis, y across it), in cm. @param {number} x @param {number} y */
  const sp = (x, y) => ({ X: DW / 2 + y * K, Y: 10 + (top - x) * K });
  const dishPath = $derived.by(() => {
    const pts = [];
    for (let i = 0; i <= 40; i += 1) {
      const y = -D / 2 + (D * i) / 40;
      const q = sp((y * y) / (2 * dish.p), y);
      pts.push(`${q.X},${q.Y}`);
    }
    return `M ${pts.join(' L ')}`;
  });
  const rays = $derived(
    [-0.8, -0.5, -0.2, 0.2, 0.5, 0.8].map((s) => {
      const y = (s * D) / 2;
      return { from: sp(top, y), hit: sp((y * y) / (2 * dish.p), y) };
    }),
  );
  const focus = $derived(sp(dish.f, 0));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Ứng dụng"
    bind:value={mode}
    options={[
      { value: 'quy-dao', label: 'Quỹ đạo elip' },
      { value: 'ang-ten', label: 'Ăng-ten parabol' },
    ]}
  />

  {#if mode === 'quy-dao'}
    <SegmentedControl
      label="Thiên thể"
      bind:value={orbitId}
      options={ORBITS.map((o) => ({ value: o.id, label: o.name }))}
    />
    <svg
      bind:this={orbitSvg}
      viewBox="0 0 {plane.width} {plane.height}"
      class="mx-auto block w-full max-w-md select-none rounded-lg border border-slate-200 bg-slate-900"
      style="touch-action:none"
      role="group"
      aria-label="Quỹ đạo elip của {orbit.name} quanh Mặt Trời đặt ở một tiêu điểm; vật đang cách Mặt Trời {millionKm(
        r,
      )}."
    >
      <line
        x1={mx(-1.1)}
        y1={my(0)}
        x2={mx(1.1)}
        y2={my(0)}
        stroke="#475569"
        stroke-dasharray="4 4"
      />
      <path d={orbitPath} fill="none" stroke="#a5b4fc" stroke-width="2" />
      <line
        x1={mx(-orbit.e)}
        y1={my(0)}
        x2={mx(M.x)}
        y2={my(M.y)}
        stroke="#fbbf24"
        stroke-width="2"
      />
      <circle cx={mx(-orbit.e)} cy={my(0)} r="9" fill="#f59e0b" />
      <text
        x={mx(-orbit.e)}
        y={my(0) + 24}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill="#fde68a">Mặt Trời</text
      >
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Vị trí của {orbit.name} trên quỹ đạo: kéo, hoặc dùng phím mũi tên"
        aria-valuenow={at}
        aria-valuemin={0}
        aria-valuemax={samples.length - 1}
        aria-valuetext="cách Mặt Trời {millionKm(r)}"
        style="cursor:grab; outline:none"
        use:draggable={mHandle}
      >
        <circle
          class="drag-knob"
          cx={mx(M.x)}
          cy={my(M.y)}
          r="7"
          fill="#38bdf8"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    </svg>
    <div
      class="space-y-1 rounded-lg border border-slate-200 bg-white p-3 text-sm"
      aria-live="polite"
    >
      {#each orbitLines(orbit.a, orbit.e, orbit.a * M.x) as line (line)}
        <p><LiveRichText text={line} /></p>
      {/each}
    </div>
    <FeedbackNote tone="info" text={orbitNote} />
  {:else}
    <div class="grid gap-4 sm:grid-cols-2">
      <SliderField
        label="Đường kính chảo D"
        bind:value={D}
        min={DISH.D[0]}
        max={DISH.D[1]}
        step={10}
        unit="cm"
      />
      <SliderField
        label="Độ sâu chảo h"
        bind:value={h}
        min={DISH.h[0]}
        max={DISH.h[1]}
        step={5}
        unit="cm"
      />
    </div>
    <svg
      viewBox="0 0 {DW} {DH}"
      class="mx-auto block w-full max-w-md rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Mặt cắt chảo ăng-ten đường kính {D} cm, sâu {h} cm; đầu thu ở tiêu điểm, cách đỉnh {formatNumber(
        dish.f,
        2,
      )} cm."
    >
      <line
        x1={DW / 2}
        y1={sp(top, 0).Y}
        x2={DW / 2}
        y2={sp(0, 0).Y + 6}
        stroke="#94a3b8"
        stroke-dasharray="4 4"
      />
      {#each rays as ray, i (i)}
        <polyline
          points="{ray.from.X},{ray.from.Y} {ray.hit.X},{ray.hit.Y} {focus.X},{focus.Y}"
          fill="none"
          stroke="#d97706"
          stroke-width="1.5"
        />
      {/each}
      <path d={dishPath} fill="none" stroke="#4f46e5" stroke-width="4" stroke-linecap="round" />
      <line
        x1={sp(h, -D / 2).X}
        y1={sp(h, 0).Y}
        x2={sp(h, D / 2).X}
        y2={sp(h, 0).Y}
        stroke="#4f46e5"
        stroke-width="1"
        stroke-dasharray="3 3"
      />
      <circle cx={focus.X} cy={focus.Y} r="6" fill="#e11d48" />
      <text x={focus.X + 10} y={focus.Y + 4} font-size="12" font-weight="700" fill="#e11d48"
        >đầu thu (F)</text
      >
    </svg>
    <div
      class="space-y-1 rounded-lg border border-slate-200 bg-white p-3 text-sm"
      aria-live="polite"
    >
      {#each dishLines(D, h) as line (line)}
        <p><LiveRichText text={line} /></p>
      {/each}
    </div>
    <FeedbackNote
      tone="info"
      text={dish.inside
        ? 'Chảo sâu: đầu thu nằm trong lòng chảo, được che chắn tốt nhưng chảo nặng và khó chế tạo hơn.'
        : 'Chảo nông: đầu thu nằm ngoài miệng chảo, phải đỡ bằng một cần dài. Mọi tia song song vẫn hội tụ ở tiêu điểm.'}
    />
  {/if}
</div>
