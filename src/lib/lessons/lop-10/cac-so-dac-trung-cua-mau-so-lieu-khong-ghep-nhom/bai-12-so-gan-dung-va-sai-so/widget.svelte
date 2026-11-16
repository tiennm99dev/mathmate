<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { numTex, tidy } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { RULERS, THINGS, cm, measureReport, percent, snapReading } from './engine.js';

  const W = 400;
  const LEFT = 20;
  const RIGHT = 380;
  const FULL = 16; // the overview ruler, in cm
  const SPAN = 3; // the magnified window, in cm
  const OVERVIEW_H = 96;
  const ZOOM_H = 150;
  const BASE = 92; // the ruler's edge in the magnified view

  let thingId = $state(THINGS[0].id);
  let rulerId = $state('mm');
  let shown = $state(false);

  const thing = $derived(THINGS.find((t) => t.id === thingId) ?? THINGS[0]);
  const ruler = $derived(RULERS.find((r) => r.id === rulerId) ?? RULERS[0]);
  const start = $derived(Math.max(0, Math.floor(thing.length) - 1));

  const ox = (/** @type {number} */ v) => LEFT + (v / FULL) * (RIGHT - LEFT);
  const zx = (/** @type {number} */ v) => LEFT + ((v - start) / SPAN) * (RIGHT - LEFT);
  const fromZx = (/** @type {number} */ x) => start + ((x - LEFT) / (RIGHT - LEFT)) * SPAN;

  let handle = $state({ x: LEFT, y: BASE });
  const reading = $derived(snapReading(fromZx(handle.x), ruler.h));
  const report = $derived(measureReport(thing.length, reading, ruler.h));

  /** Puts the reading back on the left end of the magnified window. */
  function restart() {
    handle.x = LEFT;
    shown = false;
  }

  /** @param {number} v */
  const place = (v) => zx(Math.min(start + SPAN, Math.max(start, snapReading(v, ruler.h))));

  const ticks = $derived.by(() => {
    const out = [];
    const count = Math.round(SPAN / ruler.h);
    for (let i = 0; i <= count; i++) {
      const v = tidy(start + i * ruler.h, 6);
      const whole = Math.abs(v - Math.round(v)) < 1e-9;
      const half = !whole && Math.abs(v * 2 - Math.round(v * 2)) < 1e-9;
      out.push({ v, whole, len: whole ? 26 : half ? 18 : 11 });
    }
    return out;
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const handleOpts = $derived({
    point: handle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: ZOOM_H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => ({
      x: place(fromZx(p.x)),
      y: BASE,
    }),
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      handle.x = place(reading + (dx || -dy) * (big ? 1 : ruler.h));
    },
  });

  const resultTex = $derived(`a = ${numTex(reading)}\\ \\text{cm}`);
  const boundTex = $derived(
    `\\overline{a} = ${numTex(reading)} \\pm ${numTex(report.d)}\\ \\text{cm}`,
  );
  const errorTex = $derived(
    `\\Delta_a = |${numTex(thing.length)} - ${numTex(reading)}| = ${numTex(report.abs)}\\ \\text{cm}`,
  );
  const relTex = $derived(
    reading === 0
      ? ''
      : `\\delta_a = \\dfrac{\\Delta_a}{|a|} = \\dfrac{${numTex(report.abs)}}{${numTex(reading)}} \\approx ${numTex(tidy(report.relative * 100, 6), 2)}\\%`,
  );

  const note = $derived.by(() => {
    if (!report.nearest) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Vạch ${cm(reading)} cm chưa phải vạch gần đầu ${thing.name} nhất. Kéo vạch đọc tới vạch chia sát đầu vật.`,
      };
    }
    if (!shown) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Đọc ở vạch gần nhất thì độ dài đúng lệch khỏi $a$ không quá nửa độ chia, nên độ chính xác là $d = ${numTex(report.d)}$ cm. Bấm "Xem độ dài đúng" để kiểm tra.`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Sai số tuyệt đối ${cm(report.abs)} cm không vượt quá $d = ${numTex(report.d)}$ cm. Sai số tương đối khoảng ${percent(report.relative)}; thước chia càng nhỏ, phép đo càng chính xác.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Vật cần đo"
      bind:value={thingId}
      onchange={restart}
      options={THINGS.map((t) => ({
        value: t.id,
        label: t.name[0].toUpperCase() + t.name.slice(1),
      }))}
    />
    <SegmentedControl
      label="Độ chia của thước"
      bind:value={rulerId}
      onchange={restart}
      options={RULERS.map((r) => ({ value: r.id, label: r.label }))}
    />
  </div>

  <GeometryBoard
    width={W}
    height={OVERVIEW_H}
    maxWidth="max-w-xl"
    label="Thước 16 cm, {thing.name} đặt sát vạch 0; khung vàng là phần được phóng to bên dưới."
  >
    <rect x={ox(0)} y="20" width={ox(thing.length) - ox(0)} height="16" rx="6" fill={thing.color} />
    <rect x={ox(0)} y="40" width={RIGHT - LEFT} height="34" fill="#fef9c3" stroke="#a16207" />
    {#each { length: FULL + 1 } as _, i (i)}
      <line x1={ox(i)} y1="40" x2={ox(i)} y2={i % 5 === 0 ? 58 : 50} stroke="#713f12" />
      {#if i % 2 === 0}
        <text x={ox(i)} y="70" font-size="10" text-anchor="middle" fill="#713f12">{i}</text>
      {/if}
    {/each}
    <rect
      x={ox(start)}
      y="14"
      width={ox(start + SPAN) - ox(start)}
      height="64"
      fill="none"
      stroke="#d97706"
      stroke-width="2"
      stroke-dasharray="4 3"
    />
  </GeometryBoard>

  <GeometryBoard
    bind:svgEl
    width={W}
    height={ZOOM_H}
    interactive
    maxWidth="max-w-xl"
    label="Phóng to đoạn thước từ {start} đến {start + SPAN} cm, đầu {thing.name} và vạch đọc."
  >
    <rect
      x={zx(start) - 30}
      y="40"
      width={Math.max(0, zx(thing.length) - zx(start) + 30)}
      height="30"
      rx="10"
      fill={thing.color}
    />
    <rect x={LEFT} y={BASE} width={RIGHT - LEFT} height="50" fill="#fef9c3" stroke="#a16207" />
    {#each ticks as t (t.v)}
      <line x1={zx(t.v)} y1={BASE} x2={zx(t.v)} y2={BASE + t.len} stroke="#713f12" />
      {#if t.whole}
        <text x={zx(t.v)} y={BASE + 42} font-size="13" text-anchor="middle" fill="#713f12"
          >{t.v}</text
        >
      {/if}
    {/each}
    {#if shown}
      <line
        x1={zx(thing.length)}
        y1="30"
        x2={zx(thing.length)}
        y2={BASE + 50}
        stroke="#0f172a"
        stroke-dasharray="3 3"
      />
      <text x={zx(thing.length)} y="22" font-size="12" text-anchor="middle" fill="#0f172a"
        >ā = {cm(thing.length)}</text
      >
    {/if}
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Vạch đọc kết quả đo"
      aria-valuemin={start}
      aria-valuemax={start + SPAN}
      aria-valuenow={reading}
      aria-valuetext="{cm(reading)} xăng-ti-mét"
      style="cursor:grab; outline:none"
      use:draggable={handleOpts}
    >
      <line
        x1={handle.x}
        y1="34"
        x2={handle.x}
        y2={BASE + 30}
        stroke="#4f46e5"
        stroke-width="2.5"
      />
      <path
        class="drag-knob"
        d="M {handle.x - 9} {BASE + 30} L {handle.x + 9} {BASE + 30} L {handle.x} {BASE + 16} Z"
        fill="#4f46e5"
        stroke="#fff"
        stroke-width="1.5"
      />
    </g>
  </GeometryBoard>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p><Tex math={resultTex} /></p>
    <p>
      Độ chia {cm(ruler.h)} cm, độ chính xác <Tex math="d" /> là nửa độ chia: <Tex
        math={boundTex}
      />
    </p>
    {#if shown}
      <p><Tex math={errorTex} /></p>
      {#if relTex}<p><Tex math={relTex} /></p>{/if}
    {/if}
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} onclick={() => (shown = !shown)}>
      {shown ? 'Ẩn độ dài đúng' : 'Xem độ dài đúng'}
    </button>
    <button type="button" class={button.quiet} onclick={restart}>Đo lại</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
