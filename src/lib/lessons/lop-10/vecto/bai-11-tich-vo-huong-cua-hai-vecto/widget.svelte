<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { arcPath, directionTo, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { gridHandle } from '../_shared/grid-handle.js';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import { coordText, dot, len, scale } from '../_shared/vectors.js';
  import { NEWTONS, dotLines, dotNote, kindOf, projection, work } from './engine.js';

  const plane = planeScale({ xMin: -6, xMax: 6, yMin: -5, yMax: 5 });
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const O = { x: 0, y: 0 };
  const A_COLOR = '#4f46e5';
  const B_COLOR = '#e11d48';

  let mode = $state('tich');
  let a = $state({ x: 4, y: 1 });
  let b = $state({ x: 2, y: 3 });

  const forces = $derived(mode === 'cong');
  const names = $derived(forces ? ['d', 'F'] : ['a', 'b']);
  const kind = $derived(kindOf(a, b));
  const foot = $derived(projection(a, b));
  const tone = $derived(kind === 'acute' ? '#059669' : kind === 'obtuse' ? '#e11d48' : '#64748b');
  const lines = $derived(
    forces
      ? dotLines(a, scale(b, NEWTONS), ['\\vec d', '\\vec F'])
      : dotLines(a, b, ['\\vec a', '\\vec b']),
  );
  const job = $derived(work(a, b));

  // How far the support of a may run each way and stay on the grid.
  const reach = $derived(
    Math.min(
      a.x ? plane.xMax / Math.abs(a.x) : Infinity,
      a.y ? plane.yMax / Math.abs(a.y) : Infinity,
    ),
  );
  const dirA = $derived(directionTo(px(O), px(a)));
  const dirB = $derived(directionTo(px(O), px(b)));

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;
  const aOpts = $derived(gridHandle({ at: a, plane, svg, onmove: (g) => (a = g) }));
  const bOpts = $derived(gridHandle({ at: b, plane, svg, onmove: (g) => (b = g) }));

  /** Presets that show each sign of the dot product. @param {number[]} p */
  function preset([ax, ay, bx, by]) {
    a = { x: ax, y: ay };
    b = { x: bx, y: by };
  }

  const label = $derived(
    `Mặt phẳng toạ độ với vectơ ${names[0]} ${coordText(a.x, a.y)} và vectơ ${names[1]} ${coordText(b.x, b.y)} cùng gốc O; tích vô hướng bằng ${dot(a, b)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Xem"
    bind:value={mode}
    options={[
      { value: 'tich', label: 'Tích vô hướng' },
      { value: 'cong', label: 'Công của lực' },
    ]}
  />

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if foot && len(b) > 0}
      <line
        x1={mx(-a.x * reach)}
        y1={my(-a.y * reach)}
        x2={mx(a.x * reach)}
        y2={my(a.y * reach)}
        stroke={A_COLOR}
        stroke-dasharray="3 5"
        opacity="0.45"
      />
      <line
        x1={mx(b.x)}
        y1={my(b.y)}
        x2={mx(foot.x)}
        y2={my(foot.y)}
        stroke="#64748b"
        stroke-dasharray="4 3"
      />
      <line
        x1={mx(0)}
        y1={my(0)}
        x2={mx(foot.x)}
        y2={my(foot.y)}
        stroke={tone}
        stroke-width="6"
        stroke-linecap="round"
        opacity="0.55"
      />
    {/if}
    {#if kind === 'right'}
      <path
        d={rightMarkPath(px(O), dirA, dirB, 12)}
        fill="none"
        stroke="#334155"
        stroke-width="1.5"
      />
    {:else if kind !== 'zero'}
      <path d={arcPath(px(O), dirA, dirB, 26)} fill="none" stroke={tone} stroke-width="2" />
    {/if}
    <VectorArrow from={px(O)} to={px(a)} color={A_COLOR} name={names[0]} side={-1} />
    <VectorArrow from={px(O)} to={px(b)} color={B_COLOR} name={names[1]} />
    <g
      class="drag-handle"
      role="button"
      tabindex="0"
      aria-label="Ngọn vectơ {names[0]}, toạ độ {coordText(a.x, a.y)}: kéo hoặc dùng phím mũi tên"
      style="cursor:grab; outline:none"
      use:draggable={aOpts}
    >
      <circle
        class="drag-knob"
        cx={mx(a.x)}
        cy={my(a.y)}
        r="7"
        fill={A_COLOR}
        fill-opacity="0.25"
        stroke={A_COLOR}
        stroke-width="2"
      />
    </g>
    <g
      class="drag-handle"
      role="button"
      tabindex="0"
      aria-label="Ngọn vectơ {names[1]}, toạ độ {coordText(b.x, b.y)}: kéo hoặc dùng phím mũi tên"
      style="cursor:grab; outline:none"
      use:draggable={bOpts}
    >
      <circle
        class="drag-knob"
        cx={mx(b.x)}
        cy={my(b.y)}
        r="7"
        fill={B_COLOR}
        fill-opacity="0.25"
        stroke={B_COLOR}
        stroke-width="2"
      />
    </g>
  </CoordinatePlane>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => preset([4, 1, 2, 3])}>Góc nhọn</button
    >
    <button type="button" class={button.quiet} onclick={() => preset([3, 1, -1, 3])}
      >Góc vuông</button
    >
    <button type="button" class={button.quiet} onclick={() => preset([4, 1, -3, 2])}>Góc tù</button>
  </div>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    {#each lines as line, i (i)}
      <p><Tex math={line} /></p>
    {/each}
    {#if forces}
      <p><Tex math={job.tex} /></p>
    {/if}
  </div>
  <FeedbackNote
    tone={kind === 'right' ? 'ok' : 'info'}
    text={forces ? `Mỗi ô: $1$ m cho $\\vec d$, $10$ N cho $\\vec F$. ${job.note}` : dotNote(a, b)}
  />
</div>
