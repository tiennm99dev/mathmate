<script>
  import { dirOf } from '#lib/core/visuals/angle-math.js';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { clipLine, paramsOf, pointAt, setSquare, snapSlide } from './lines.js';
  import SetSquare from './set-square.svelte';

  /**
   * The drawing board of the book's "vẽ bằng ê ke" steps: a base line with
   * its two names, a given point, lines already drawn, and a set square
   * whose leg lies on the base line. The learner slides the set square along
   * the base by dragging its handle, or with the arrow keys (right or up
   * slides towards the base's second name).
   *
   * - `base`, `names`, `len`: the base line, its names and where the second
   *   name sits along it.
   * - `point`, `pointName`: the given point.
   * - `side`: which side of the base the set square stands on.
   * - `s` (bindable): slide position of the set square's corner along the
   *   base, a multiple of `step` within `min`..`max`.
   * - `drawn`: lines already drawn, each through `p` with direction `deg`;
   *   its `names` sit near the board's edge, or below the points `at`.
   * - `onslide`: runs after every move the learner makes.
   * @type {{
   *   base: import('./lines.js').Base;
   *   names: readonly [string, string];
   *   len: number;
   *   point: import('./lines.js').Pt;
   *   pointName: string;
   *   side: 1 | -1;
   *   s: number;
   *   min: number;
   *   max: number;
   *   step?: number;
   *   drawn?: {
   *     p: import('./lines.js').Pt;
   *     deg: number;
   *     color: string;
   *     names?: readonly [string, string];
   *     at?: readonly [import('./lines.js').Pt, import('./lines.js').Pt];
   *   }[];
   *   label: string;
   *   onslide?: () => void;
   * }}
   */
  let {
    base,
    names,
    len,
    point,
    pointName,
    side,
    s = $bindable(),
    min,
    max,
    step = 10,
    drawn = [],
    label,
    onslide,
  } = $props();

  const W = 400;
  const H = 300;
  const GRIP = 34;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const square = $derived(setSquare(base, s, side));
  const baseEnds = $derived(clipLine(base.o, base.deg, W, H, 4));
  const nameA = $derived(pointAt(base, 0, -side * 20));
  const nameB = $derived(pointAt(base, len, -side * 20));
  /** The given point's name sits behind it and on the far side from the set square. */
  const pointLabel = $derived.by(() => {
    const q = paramsOf(base, point);
    return pointAt(base, q.s - 16, q.h - side * 16);
  });
  const markA = $derived(pointAt(base, 0));
  const markB = $derived(pointAt(base, len));
  const lines = $derived(
    drawn.map((d) => {
      const ends = clipLine(d.p, d.deg, W, H, 4);
      const u = dirOf(d.deg);
      const n = dirOf(d.deg + 90);
      const labels = d.at
        ? d.at.map((p) => ({ x: p.x - 6, y: p.y + 24 }))
        : ends
          ? [
              { x: ends[0].x + u.x * 18 + n.x * 14 - 6, y: ends[0].y + u.y * 18 + n.y * 14 + 6 },
              { x: ends[1].x - u.x * 18 + n.x * 14 - 6, y: ends[1].y - u.y * 18 + n.y * 14 + 6 },
            ]
          : [];
      return { ...d, ends, labels };
    }),
  );

  /** @param {number} next */
  function slideTo(next) {
    const snapped = snapSlide(next, step, min, max);
    if (snapped === s) return;
    s = snapped;
    onslide?.();
  }

  const drag = $derived.by(() => {
    const point = pointAt(base, s + GRIP, side * GRIP);
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      /** @param {{ x: number, y: number }} p */
      projector: (p) =>
        pointAt(base, snapSlide(paramsOf(base, p).s - GRIP, step, min, max) + GRIP, side * GRIP),
      onChange: () => slideTo(paramsOf(base, point).s - GRIP),
      /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => slideTo(s + (dx > 0 || dy < 0 ? 1 : -1) * (big ? 5 : 1) * step),
    };
  });
</script>

<GeometryBoard bind:svgEl width={W} height={H} interactive maxWidth="max-w-xl" {label}>
  {#if baseEnds}
    <line
      x1={baseEnds[0].x}
      y1={baseEnds[0].y}
      x2={baseEnds[1].x}
      y2={baseEnds[1].y}
      stroke="#4F46E5"
      stroke-width="3"
    />
  {/if}
  <circle cx={markA.x} cy={markA.y} r="3" fill="#3730A3" />
  <circle cx={markB.x} cy={markB.y} r="3" fill="#3730A3" />
  <text x={nameA.x - 6} y={nameA.y + 6} font-size="18" font-weight="700" fill="#3730A3"
    >{names[0]}</text
  >
  <text x={nameB.x - 6} y={nameB.y + 6} font-size="18" font-weight="700" fill="#3730A3"
    >{names[1]}</text
  >
  {#each lines as l, i (i)}
    {#if l.ends}
      <line
        x1={l.ends[0].x}
        y1={l.ends[0].y}
        x2={l.ends[1].x}
        y2={l.ends[1].y}
        stroke={l.color}
        stroke-width="3"
      />
      {#each l.at ?? [] as p, j (j)}
        <circle cx={p.x} cy={p.y} r="3" fill={l.color} />
      {/each}
      {#if l.names}
        <text x={l.labels[0].x} y={l.labels[0].y} font-size="17" font-weight="700" fill={l.color}
          >{l.names[0]}</text
        >
        <text x={l.labels[1].x} y={l.labels[1].y} font-size="17" font-weight="700" fill={l.color}
          >{l.names[1]}</text
        >
      {/if}
    {/if}
  {/each}
  <SetSquare
    corner={square.corner}
    foot={square.foot}
    tip={square.tip}
    footDeg={base.deg}
    tipDeg={square.legDeg}
  />
  <circle cx={point.x} cy={point.y} r="5" fill="#BE123C" />
  <text x={pointLabel.x - 6} y={pointLabel.y + 6} font-size="18" font-weight="700" fill="#BE123C"
    >{pointName}</text
  >
  <DragPoint
    {drag}
    r={10}
    color="#B45309"
    label="Ê ke. Kéo để trượt ê ke dọc đường thẳng {names[0]}{names[1]}, hoặc bấm phím mũi tên: phải hoặc lên để trượt về phía {names[1]}, trái hoặc xuống để trượt về phía {names[0]}."
  />
</GeometryBoard>
