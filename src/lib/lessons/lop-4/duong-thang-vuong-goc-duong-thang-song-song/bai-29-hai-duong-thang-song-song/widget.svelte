<script>
  import CardSorter from '#lib/core/card-sorter.svelte';
  import { shuffled } from '#lib/core/card-sorter.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import { directionTo } from '#lib/core/visuals/angle-math.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { clipLine } from '../_shared/lines.js';
  import LinePair from '../_shared/line-pair.svelte';
  import {
    BINS,
    FAR,
    GOALS,
    GOAL_TEXT,
    GRID,
    H,
    SORT_PAIRS,
    W,
    inView,
    layMessage,
    layOf,
    meetPoint,
    meetsGoal,
    snapPoint,
    sortCards,
  } from './engine.js';

  const NAMES = /** @type {const} */ (['A', 'B', 'C', 'D']);
  const COLORS = { A: '#4F46E5', B: '#4F46E5', C: '#0F766E', D: '#0F766E' };

  let mode = $state(/** @type {'keo' | 'xep'} */ ('keo'));
  const pts = $state({
    A: { x: 60, y: 80 },
    B: { x: 340, y: 80 },
    C: { x: 40, y: 220 },
    D: { x: 360, y: 180 },
  });
  let extended = $state(false);
  let far = $state(false);
  let goal = $state(0);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const cards = shuffled(sortCards(), 5);
  const pairs = Object.fromEntries(SORT_PAIRS.map((p) => [p.id, p]));

  const zoom = $derived(far ? 1 / FAR : 1);
  const want = $derived(GOALS[goal % GOALS.length]);
  const lay = $derived(layOf(pts.A, pts.B, pts.C, pts.D));
  const status = $derived(layMessage(pts.A, pts.B, pts.C, pts.D, far));
  const done = $derived(meetsGoal(lay, want));
  const meet = $derived(meetPoint(pts.A, pts.B, pts.C, pts.D));
  const showMeet = $derived(
    meet !== null && inView(meet, zoom) && (extended || far || onBothSegments(meet)),
  );

  /** @param {{ x: number, y: number }} p */
  function screen(p) {
    return { x: W / 2 + (p.x - W / 2) * zoom, y: H / 2 + (p.y - H / 2) * zoom };
  }

  /** @param {{ x: number, y: number }} p */
  function onBothSegments(p) {
    /** @param {{ x: number, y: number }} P @param {{ x: number, y: number }} Q */
    const within = (P, Q) =>
      p.x >= Math.min(P.x, Q.x) - 1e-6 &&
      p.x <= Math.max(P.x, Q.x) + 1e-6 &&
      p.y >= Math.min(P.y, Q.y) - 1e-6 &&
      p.y <= Math.max(P.y, Q.y) + 1e-6;
    return within(pts.A, pts.B) && within(pts.C, pts.D);
  }

  /** @param {{ x: number, y: number }} P @param {{ x: number, y: number }} Q */
  function fullLine(P, Q) {
    if (P.x === Q.x && P.y === Q.y) return null;
    return clipLine(screen(P), directionTo(P, Q), W, H, 2);
  }

  const lineAB = $derived(fullLine(pts.A, pts.B));
  const lineCD = $derived(fullLine(pts.C, pts.D));
  const seen = $derived(Object.fromEntries(NAMES.map((n) => [n, screen(pts[n])])));

  /** @param {'A' | 'B' | 'C' | 'D'} name */
  function dragOf(name) {
    return {
      point: pts[name],
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      keyStep: GRID,
      keyShiftStep: GRID * 2,
      projector: snapPoint,
    };
  }

  /** @param {{ x: number, y: number }} p */
  const spot = (p) => `cột ${p.x / GRID}, hàng ${p.y / GRID}`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hoạt động"
    hideLabel
    bind:value={mode}
    options={[
      { value: 'keo', label: 'Kéo hai đường thẳng' },
      { value: 'xep', label: 'Xếp hình vào nhóm' },
    ]}
  />

  {#if mode === 'keo'}
    <p class="text-center text-xl font-semibold text-slate-800">
      Em kéo các điểm để đường thẳng CD <strong class="text-indigo-700">{GOAL_TEXT[want]}</strong>.
    </p>

    <GeometryBoard
      bind:svgEl
      width={W}
      height={H}
      interactive={!far}
      maxWidth="max-w-xl"
      label="Đường thẳng AB và đường thẳng CD trên lưới ô vuông. {far
        ? 'Đang nhìn ra xa.'
        : 'Kéo các điểm A, B, C, D để đổi hai đường thẳng.'}"
    >
      {#if !far}
        {#each Array.from({ length: W / GRID - 1 }, (_, i) => (i + 1) * GRID) as x (x)}
          <line x1={x} y1="0" x2={x} y2={H} stroke="#E2E8F0" stroke-width="1" />
        {/each}
        {#each Array.from({ length: H / GRID - 1 }, (_, i) => (i + 1) * GRID) as y (y)}
          <line x1="0" y1={y} x2={W} y2={y} stroke="#E2E8F0" stroke-width="1" />
        {/each}
      {/if}
      {#if extended || far}
        {#each [lineAB, lineCD] as l, i (i)}
          {#if l}
            <line
              x1={l[0].x}
              y1={l[0].y}
              x2={l[1].x}
              y2={l[1].y}
              stroke={i === 0 ? '#818CF8' : '#5EEAD4'}
              stroke-width="2.5"
              stroke-dasharray="8 6"
            />
          {/if}
        {/each}
      {/if}
      <line
        x1={seen.A.x}
        y1={seen.A.y}
        x2={seen.B.x}
        y2={seen.B.y}
        stroke="#4F46E5"
        stroke-width="4"
      />
      <line
        x1={seen.C.x}
        y1={seen.C.y}
        x2={seen.D.x}
        y2={seen.D.y}
        stroke="#0F766E"
        stroke-width="4"
      />
      {#if showMeet && meet}
        {@const o = screen(meet)}
        <circle cx={o.x} cy={o.y} r="6" fill="#DC2626" />
        <text
          x={o.x > W - 30 ? o.x - 22 : o.x + 8}
          y={o.y > 30 ? o.y - 8 : o.y + 22}
          font-size="17"
          font-weight="700"
          fill="#DC2626">O</text
        >
      {/if}
      {#if far}
        {#each NAMES as n (n)}
          <circle cx={seen[n].x} cy={seen[n].y} r="3" fill={COLORS[n]} />
        {/each}
      {:else}
        {#each NAMES as n (n)}
          <DragPoint
            drag={dragOf(n)}
            r={9}
            color={COLORS[n]}
            name={n}
            label="Điểm {n}, ở {spot(pts[n])}. Kéo hoặc bấm phím mũi tên để dời điểm."
          />
        {/each}
      {/if}
    </GeometryBoard>

    <KidNote tone={done ? 'ok' : status.tone === 'warn' ? 'warn' : 'info'} text={status.text} />
    {#if done}
      <p class="text-center text-lg font-semibold text-emerald-800">
        Em đã làm được: CD {GOAL_TEXT[want]}!
      </p>
    {/if}

    <div class="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        aria-pressed={extended}
        onclick={() => (extended = !extended)}
        >{extended ? 'Thu ngắn hai đường thẳng' : 'Kéo dài hai đường thẳng'}</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {button.secondary}"
        aria-pressed={far}
        onclick={() => (far = !far)}>{far ? 'Nhìn gần lại' : 'Nhìn ra xa'}</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {done ? button.primary : button.secondary}"
        onclick={() => (goal += 1)}>Thử thách khác</button
      >
    </div>
  {:else}
    <p class="text-lg text-slate-700">
      Em xem hai đường thẳng song song, vuông góc hay cắt nhau, rồi xếp hình vào đúng nhóm.
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
