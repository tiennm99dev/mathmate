<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { lineThrough } from '../_shared/coords.js';
  import LinePath from '../_shared/line-path.svelte';
  import PointHandle from '../_shared/point-handle.svelte';
  import { BOX, START, builtText, isBuilt, makeRound } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const BUILD = '#4f46e5';
  const GIVEN = '#94a3b8';

  let seed = $state(0);
  const round = $derived(makeRound(seed));
  let P = $state(START[0]);
  let Q = $state(START[1]);
  let showHint = $state(false);
  let solved = $state(0);
  let counted = $state(false);

  const done = $derived(isBuilt(round, P, Q));
  /** Count a round once, the first time the figure is built. */
  function settle() {
    if (!counted && isBuilt(round, P, Q)) {
      counted = true;
      solved += 1;
    }
  }

  function next() {
    seed += 1;
    showHint = false;
    counted = false;
    P = START[0];
    Q = START[1];
  }

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  /** @param {{ x: number, y: number }} g */
  const moveP = (g) => {
    P = g;
    settle();
  };
  /** @param {{ x: number, y: number }} g */
  const moveQ = (g) => {
    Q = g;
    settle();
  };

  const names = $derived(round.kind === 'line' ? ['P', 'Q'] : ['I', 'M']);
  const built = $derived(P.x === Q.x && P.y === Q.y ? null : lineThrough(P, Q));
  const r = $derived(Math.hypot(Q.x - P.x, Q.y - P.y));
  const feedback = $derived(
    done
      ? `Đúng rồi! ${builtText(round, P, Q)} Nhấn "Câu khác" để làm tiếp.`
      : builtText(round, P, Q),
  );
</script>

<div class="space-y-4">
  <p class="font-semibold text-slate-800"><LiveRichText text={round.prompt} /></p>

  <CoordinatePlane
    bind:svgEl
    {plane}
    label="Lưới toạ độ để dựng hình theo đề bài; hai điểm kéo được {names[0]} và {names[1]}."
  >
    {#if round.kind === 'line'}
      {#if round.given.circle}
        <circle
          cx={mx(round.given.circle.I.x)}
          cy={my(round.given.circle.I.y)}
          r={Math.sqrt(round.given.circle.r2) * plane.unit}
          fill="none"
          stroke={GIVEN}
          stroke-width="2"
          style="pointer-events:none"
        />
        <circle
          cx={mx(round.given.circle.I.x)}
          cy={my(round.given.circle.I.y)}
          r="3.5"
          fill={GIVEN}
          style="pointer-events:none"
        />
      {/if}
      {#if round.given.line}
        <LinePath line={round.given.line} {plane} color={GIVEN} dashed name="d" />
      {/if}
      {#if round.given.point}
        <circle
          cx={mx(round.given.point.x)}
          cy={my(round.given.point.y)}
          r="5"
          fill="#0f172a"
          style="pointer-events:none"
        />
        <text
          x={mx(round.given.point.x) - 8}
          y={my(round.given.point.y) + 18}
          font-size="13"
          font-weight="700"
          text-anchor="end"
          fill="#0f172a"
          stroke="#fff"
          stroke-width="3"
          paint-order="stroke"
          style="pointer-events:none">{round.given.circle ? 'M' : 'A'}</text
        >
      {/if}
      {#if built}
        <LinePath line={built} {plane} color={done ? '#059669' : BUILD} width={3} />
      {/if}
    {:else}
      <circle
        cx={mx(P.x)}
        cy={my(P.y)}
        r={r * plane.unit}
        fill={done ? '#059669' : BUILD}
        fill-opacity="0.06"
        stroke={done ? '#059669' : BUILD}
        stroke-width="3"
        style="pointer-events:none"
      />
    {/if}
    <PointHandle at={P} name={names[0]} {plane} {svg} onmove={moveP} color={BUILD} labelDy={18} />
    <PointHandle at={Q} name={names[1]} {plane} {svg} onmove={moveQ} color={BUILD} />
  </CoordinatePlane>

  <div aria-live="polite">
    <FeedbackNote tone={done ? 'ok' : 'info'} text={feedback} />
  </div>
  {#if showHint}
    <FeedbackNote tone="warn" text={round.hint} />
  {/if}
  <div class="flex flex-wrap items-center gap-3">
    <button
      type="button"
      class={button.quiet}
      onclick={() => (showHint = true)}
      disabled={showHint}
    >
      Gợi ý
    </button>
    <button type="button" class={button.primary} onclick={next}>Câu khác</button>
    <span class="text-sm text-slate-600">Đã dựng đúng: {solved}</span>
  </div>
</div>
