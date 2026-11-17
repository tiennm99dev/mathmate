<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import CurveHandle from '../_shared/curve-handle.svelte';
  import { snapX } from '../_shared/plot.js';
  import { SHEETS, best, boxFaces, slope, volume } from './engine.js';

  const STEP = 0.1;
  const NET = 260;
  const PAD = 20;
  const SIDE = NET - 2 * PAD;

  let a = $state(12);
  let x = $state(1);
  /** @type {SVGSVGElement | undefined} */
  let netEl = $state();
  /** @type {SVGSVGElement | undefined} */
  let graphEl = $state();

  const top = $derived(best(a));
  const lo = STEP;
  const hi = $derived(tidy(a / 2 - STEP));
  const k = $derived(SIDE / a);
  const v = $derived(volume(a, x));
  const dv = $derived(slope(a, x));
  const s = $derived(tidy(a - 2 * x));
  const atBest = $derived(Math.abs(x - top.x) < 1e-9);

  /** @param {string | number} next */
  function choose(next) {
    const size = Number(next);
    x = tidy(size / 12);
  }

  /** @param {number} t */
  const place = (t) => snapX(t, { lo, hi, step: STEP, snaps: [top.x], radius: STEP * 1.5 });
  const netDrag = $derived({
    point: { x: PAD + x * k, y: PAD + x * k },
    svg: () => netEl ?? null,
    viewBox: { w: NET, h: NET },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const t = place((p.x - PAD + (p.y - PAD)) / 2 / k);
      return { x: PAD + t * k, y: PAD + t * k };
    },
    onChange: () => {
      x = place((netDrag.point.x - PAD) / k);
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const dir = dx || dy;
      x = snapX(x + dir * STEP * (big ? 5 : 1), { lo, hi, step: STEP });
    },
  });

  const cut = $derived(x * k);
  const corners = $derived([
    { x: PAD, y: PAD },
    { x: PAD + SIDE - cut, y: PAD },
    { x: PAD, y: PAD + SIDE - cut },
    { x: PAD + SIDE - cut, y: PAD + SIDE - cut },
  ]);

  const kb = $derived(150 / a);
  const faces = $derived(boxFaces(s * kb, x * kb, { x: 24, y: 176 }));

  const win = $derived({ xMin: 0, xMax: a / 2, yMin: 0, yMax: top.v * 1.2 });
  const unitV = '\\text{ cm}^3';
  const note = $derived.by(() => {
    const head = `$x = ${numTex(x)}$ cm: đáy là hình vuông cạnh $${a} - 2x = ${numTex(s)}$ cm, chiều cao $${numTex(x)}$ cm, $V = x(${a} - 2x)^2 = ${numTex(tidy(v, 3), 3)}${unitV}$.`;
    if (atBest) {
      return `${head} $V'(${numTex(x)}) = 0$ và $V'$ đổi dấu từ dương sang âm: thể tích đạt giá trị lớn nhất $V = \\dfrac{2a^3}{27} = ${numTex(top.v)}${unitV}$.`;
    }
    const up = dv > 0;
    return `${head} $V'(x) = (${a} - 2x)(${a} - 6x) ${up ? '> 0' : '< 0'}$: cắt ${up ? 'rộng thêm' : 'hẹp lại'} một chút thì thể tích còn tăng.`;
  });
  const netLabel = $derived(
    `Tấm bìa hình vuông cạnh ${a} cm, cắt ở bốn góc bốn hình vuông cạnh ${formatNumber(x)} cm.`,
  );
  const boxLabel = $derived(
    `Chiếc hộp không nắp: đáy hình vuông cạnh ${formatNumber(s)} cm, cao ${formatNumber(x)} cm.`,
  );
  const graphLabel = $derived(
    `Đồ thị thể tích V(x) = x(${a} − 2x)² với x từ 0 đến ${formatNumber(a / 2)}. Hiện tại V = ${formatNumber(tidy(v, 3), 3)} cm³.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cạnh tấm bìa"
    options={SHEETS.map((n) => ({ value: n, label: `${n} cm` }))}
    bind:value={a}
    onchange={choose}
  />

  <div class="grid gap-3 sm:grid-cols-2">
    <figure>
      <svg
        bind:this={netEl}
        viewBox="0 0 {NET} {NET}"
        class="block w-full touch-none select-none rounded-lg border border-slate-200 bg-white"
        role="group"
        aria-label={netLabel}
      >
        <rect x={PAD} y={PAD} width={SIDE} height={SIDE} fill="#fef3c7" stroke="#92400e" />
        {#each corners as c, i (i)}
          <rect
            x={c.x}
            y={c.y}
            width={cut}
            height={cut}
            fill="#fecaca"
            stroke="#dc2626"
            stroke-dasharray="4 3"
          />
        {/each}
        <rect
          x={PAD + cut}
          y={PAD + cut}
          width={Math.max(0, SIDE - 2 * cut)}
          height={Math.max(0, SIDE - 2 * cut)}
          fill="none"
          stroke="#92400e"
          stroke-dasharray="6 4"
        />
        <text
          x={PAD + cut / 2}
          y={PAD + cut + 14}
          font-size="12"
          text-anchor="middle"
          fill="#b91c1c">x</text
        >
        <text x={NET / 2} y={NET - 4} font-size="12" text-anchor="middle" fill="#475569"
          >{a} cm</text
        >
        <DragPoint
          drag={netDrag}
          r={9}
          color="#dc2626"
          label="Góc của hình vuông bị cắt; kéo hoặc dùng phím mũi tên để đổi x"
        />
      </svg>
      <figcaption class="mt-1 text-xs text-slate-500">
        Kéo chấm đỏ để đổi cạnh x của bốn hình vuông bị cắt; nét đứt là đường gấp.
      </figcaption>
    </figure>
    <figure>
      <svg
        viewBox="0 0 260 200"
        class="block w-full rounded-lg border border-slate-200 bg-white"
        role="img"
        aria-label={boxLabel}
      >
        <polygon points={pointsAttr(faces.bottom)} fill="#fde68a" stroke="#92400e" />
        <polygon points={pointsAttr(faces.back)} fill="#fef3c7" stroke="#92400e" />
        <polygon points={pointsAttr(faces.left)} fill="#fcd34d" stroke="#92400e" opacity="0.9" />
        <polygon points={pointsAttr(faces.right)} fill="#fcd34d" stroke="#92400e" opacity="0.9" />
        <polygon points={pointsAttr(faces.front)} fill="#fbbf24" stroke="#92400e" opacity="0.85" />
      </svg>
      <figcaption class="mt-1 text-xs text-slate-500">
        Hộp sau khi gấp: đáy {formatNumber(s)} cm × {formatNumber(s)} cm, cao {formatNumber(x)} cm.
      </figcaption>
    </figure>
  </div>

  <GraphBox
    {win}
    label={graphLabel}
    curves={[{ f: (t) => volume(a, t), color: '#4f46e5' }]}
    lines={[{ c: top.x, vertical: true, color: '#94a3b8' }]}
    interactive
    bind:svgEl={graphEl}
  >
    {#snippet children(frame)}
      <CurveHandle
        {frame}
        svg={() => graphEl ?? null}
        f={(t) => volume(a, t)}
        bind:x
        {lo}
        {hi}
        step={STEP}
        snaps={[top.x]}
        color="#dc2626"
        label="Điểm trên đồ thị V(x); kéo hoặc dùng phím mũi tên để đổi x"
      />
    {/snippet}
  </GraphBox>

  <FeedbackNote tone={atBest ? 'ok' : 'info'} text={note} />
</div>
