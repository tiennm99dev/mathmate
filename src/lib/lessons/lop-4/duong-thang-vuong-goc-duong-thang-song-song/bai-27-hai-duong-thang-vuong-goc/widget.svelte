<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import {
    along,
    arcPath,
    bisectorDir,
    directionTo,
    rightMarkPath,
  } from '#lib/core/visuals/angle-math.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { clipLine } from '../_shared/lines.js';
  import LinePair from '../_shared/line-pair.svelte';
  import SetSquare from '../_shared/set-square.svelte';
  import {
    BINS,
    SORT_PAIRS,
    STEP,
    clampTurn,
    fourAngles,
    sortCards,
    squareMessage,
    turnMessage,
  } from './engine.js';

  const W = 400;
  const H = 300;
  const O = { x: 200, y: 160 };
  const HANDLE = 120;
  const STARTS = [45, 130, 60, 115];

  let mode = $state(/** @type {'xoay' | 'xep'} */ ('xoay'));
  let start = $state(0);
  let m = $state(STARTS[0]);
  let showSquare = $state(false);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const status = $derived(turnMessage(m));
  const angles = $derived(fourAngles(m));
  /** Directions of OB, OD, OA, OC. */
  const rays = $derived([0, m, 180, m + 180]);
  const ab = clipLine(O, 0, W, H, 8);
  const cd = $derived(clipLine(O, m, W, H, 8));
  const aEnd = along(O, 170, 180);
  const bEnd = along(O, 170, 0);
  const cEnd = $derived(along(O, HANDLE, m + 180));
  const pa = $derived(along(O, 56, bisectorDir(0, m)));
  const pb = $derived(along(O, 48, bisectorDir(m, 180)));
  const square = { corner: O, foot: along(O, 110, 0), tip: along(O, 130, 90) };

  const cards = shuffled(sortCards(), 7);
  const pairs = Object.fromEntries(SORT_PAIRS.map((p) => [p.id, p]));

  const drag = $derived.by(() => {
    const point = along(O, HANDLE, m);
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) => along(O, HANDLE, clampTurn(foldUp(directionTo(O, p)))),
      onChange: () => (m = clampTurn(foldUp(directionTo(O, point)))),
      /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) =>
        (m = clampTurn(m + (dx < 0 || dy < 0 ? 1 : -1) * (big ? 30 : STEP))),
    };
  });

  /**
   * A direction below line AB turned to the matching one above it, since
   * the line through D and C is the same either way.
   * @param {number} d
   */
  function foldUp(d) {
    return d > 180 ? d - 180 : d;
  }

  function again() {
    start = (start + 1) % STARTS.length;
    m = STARTS[start];
    showSquare = false;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'xoay', label: 'Xoay đường thẳng CD' },
      { value: 'xep', label: 'Xếp hình vào nhóm' },
    ]}
  />

  {#if mode === 'xoay'}
    <p class="text-center text-xl font-semibold text-slate-800">
      Em xoay đường thẳng CD để CD <strong class="text-indigo-700">vuông góc</strong> với AB.
    </p>

    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive
      maxWidth="max-w-xl"
      label="Đường thẳng AB nằm ngang. Đường thẳng CD cắt AB tại O và xoay được quanh O. Góc đỉnh O; cạnh OB, OD là {m} độ."
    >
      {#if showSquare}
        <SetSquare
          corner={square.corner}
          foot={square.foot}
          tip={square.tip}
          footDeg={0}
          tipDeg={90}
        />
      {/if}
      {#if m === 90}
        {#each [0, 1, 2, 3] as i (i)}
          <path
            d={rightMarkPath(O, rays[i], rays[(i + 1) % 4], 18)}
            fill="none"
            stroke="#059669"
            stroke-width="3"
          />
        {/each}
      {:else}
        <path d={arcPath(O, 0, m, 34)} fill="none" stroke="#B45309" stroke-width="3" />
        <path d={arcPath(O, m, 180, 26)} fill="none" stroke="#7C3AED" stroke-width="2.5" />
        <text x={pa.x - 14} y={pa.y + 6} font-size="15" font-weight="700" fill="#B45309"
          >{angles[0]}°</text
        >
        <text x={pb.x - 16} y={pb.y + 6} font-size="15" font-weight="700" fill="#7C3AED"
          >{angles[1]}°</text
        >
      {/if}
      {#if ab}
        <line
          x1={ab[0].x}
          y1={ab[0].y}
          x2={ab[1].x}
          y2={ab[1].y}
          stroke="#4F46E5"
          stroke-width="4"
        />
      {/if}
      {#if cd}
        <line
          x1={cd[0].x}
          y1={cd[0].y}
          x2={cd[1].x}
          y2={cd[1].y}
          stroke="#0F766E"
          stroke-width="4"
        />
      {/if}
      <text x={aEnd.x - 6} y={aEnd.y + 26} font-size="18" font-weight="700" fill="#3730A3">A</text>
      <text x={bEnd.x - 6} y={bEnd.y + 26} font-size="18" font-weight="700" fill="#3730A3">B</text>
      <text x={cEnd.x + 10} y={cEnd.y + 6} font-size="18" font-weight="700" fill="#0F766E">C</text>
      <circle cx={O.x} cy={O.y} r="5" fill="#1F2937" />
      <text x={O.x - 22} y={O.y + 24} font-size="18" font-weight="700" fill="#1F2937">O</text>
      <DragPoint
        {drag}
        r={11}
        color="#0F766E"
        name="D"
        label="Điểm D trên đường thẳng CD. Kéo hoặc bấm phím mũi tên để xoay, mỗi bước 5 độ."
      />
    </GeometryBoard>

    <KidNote tone={status.done ? 'ok' : 'info'} text={status.text} />

    {#if showSquare}
      <p
        class="rounded-2xl bg-amber-50 px-4 py-3 text-lg font-semibold text-amber-900"
        aria-live="polite"
      >
        Ê ke: {squareMessage(m)}
      </p>
    {/if}

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        aria-pressed={showSquare}
        onclick={() => (showSquare = !showSquare)}>{showSquare ? 'Cất ê ke' : 'Đặt ê ke'}</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {status.done ? button.primary : button.secondary}"
        onclick={again}>Làm lại từ góc khác</button
      >
    </div>
  {:else}
    <p class="text-lg text-slate-700">
      Em xem hai đường thẳng có tạo thành góc vuông không, rồi xếp hình vào đúng nhóm.
    </p>
    <CardSorter {cards} bins={[...BINS]} label="Xếp các cặp đường thẳng vào nhóm" hintOnWrong>
      {#snippet face(c)}
        <span class="flex w-32 flex-col items-center gap-1">
          <LinePair a={pairs[c.id].a} b={pairs[c.id].b} />
          <span class="text-base font-semibold text-slate-700">{c.label.split(':')[0]}</span>
        </span>
      {/snippet}
    </CardSorter>
  {/if}
</div>
