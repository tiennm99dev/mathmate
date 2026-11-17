<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { coordText, lineText } from '../_shared/coords.js';
  import LinePath from '../_shared/line-path.svelte';
  import PointHandle from '../_shared/point-handle.svelte';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import { BOX, lineInfo, panelTex, specialText } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const UC = '#4f46e5';
  const NC = '#e11d48';

  let A = $state({ x: -3, y: -2 });
  let B = $state({ x: 2, y: 1 });
  const info = $derived(lineInfo(A, B));
  const tex = $derived(panelTex(A, B));
  const n = $derived(info.n);
  // A normal vector is any non-zero multiple of n: draw a short one from the
  // midpoint of AB so it stays on the board.
  const nFrom = $derived({ x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 });
  const nTip = $derived.by(() => {
    const k = Math.min(1, 2 / Math.hypot(n.x, n.y));
    return { x: nFrom.x + k * n.x, y: nFrom.y + k * n.y };
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  /** A and B must stay apart, or there is no line. @param {{ x: number, y: number }} g */
  const moveA = (g) => {
    if (g.x !== B.x || g.y !== B.y) A = g;
  };
  /** @param {{ x: number, y: number }} g */
  const moveB = (g) => {
    if (g.x !== A.x || g.y !== A.y) B = g;
  };

  const label = $derived(
    `Mặt phẳng toạ độ với A${coordText(A.x, A.y)}, B${coordText(B.x, B.y)} và đường thẳng AB: ${lineText(info.line)}.`,
  );
</script>

<div class="space-y-4">
  <CoordinatePlane bind:svgEl {plane} {label}>
    <LinePath line={info.line} {plane} name="Δ" />
    <VectorArrow from={px(nFrom)} to={px(nTip)} color={NC} name="n" side={-1} />
    <VectorArrow from={px(A)} to={px(B)} color={UC} name="u" />
    <PointHandle at={A} name="A" {plane} {svg} onmove={moveA} labelDx={-10} labelDy={18} />
    <PointHandle at={B} name="B" {plane} {svg} onmove={moveB} />
  </CoordinatePlane>

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p><Tex math={tex.vectors} /></p>
    <p class="text-sm text-slate-600">
      <LiveRichText text="Phương trình tham số (qua $A$, vectơ chỉ phương $\vec u$):" />
    </p>
    <p><Tex math={tex.param} display /></p>
    <p class="text-sm text-slate-600">
      <LiveRichText text="Phương trình tổng quát (qua $A$, vectơ pháp tuyến $\vec n$):" />
    </p>
    {#each tex.general as line (line)}
      <p><Tex math={line} /></p>
    {/each}
    {#if tex.slope}
      <p><Tex math={`\\Leftrightarrow ${tex.slope}`} /></p>
    {/if}
  </div>
  <div aria-live="polite">
    <FeedbackNote tone="info" text={specialText(info.line)} />
  </div>
</div>
