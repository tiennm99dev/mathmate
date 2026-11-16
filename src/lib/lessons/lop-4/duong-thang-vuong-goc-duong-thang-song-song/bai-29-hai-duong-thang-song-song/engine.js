/**
 * The lesson on parallel lines: two lines AB and CD through grid points the
 * child drags. Extended without end, two lines either cross at one point or
 * never meet: then they are parallel. Grid points keep every test exact.
 * Also the far view that shows a crossing outside the board, and the line
 * pairs to sort. Pure and DOM-free.
 *
 * @typedef {import('../_shared/lines.js').Pt} Pt
 * @typedef {'diem' | 'trung' | 'song-song' | 'vuong-goc' | 'cat'} Lay
 */
import { cross } from '#lib/geom-engine/plane.js';
import { lineAngle, snapToGrid } from '../_shared/lines.js';

/** Grid step and board size. */
export const GRID = 20;
export const W = 400;
export const H = 300;

/** How much the far view shrinks the board. */
export const FAR = 5;

/**
 * A point moved to the nearest grid point inside the board.
 * @param {Pt} p
 * @returns {Pt}
 */
export const snapPoint = (p) => snapToGrid(p, GRID, W, H);

/**
 * How line AB and line CD lie: a pair of points that coincide (`diem`), the
 * same line (`trung`), parallel, perpendicular, or crossing.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} D
 * @returns {Lay}
 */
export function layOf(A, B, C, D) {
  if ((A.x === B.x && A.y === B.y) || (C.x === D.x && C.y === D.y)) return 'diem';
  const den = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
  if (den === 0) return cross(A, B, C) === 0 ? 'trung' : 'song-song';
  const dot = (B.x - A.x) * (D.x - C.x) + (B.y - A.y) * (D.y - C.y);
  return dot === 0 ? 'vuong-goc' : 'cat';
}

/**
 * Where line AB meets line CD; null when they never meet.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} D
 * @returns {Pt | null}
 */
export function meetPoint(A, B, C, D) {
  const den = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
  if (den === 0) return null;
  const t = ((C.x - A.x) * (D.y - C.y) - (C.y - A.y) * (D.x - C.x)) / den;
  return { x: A.x + t * (B.x - A.x), y: A.y + t * (B.y - A.y) };
}

/**
 * Whether a point shows on the board seen at `zoom` (1 near, 1/FAR far).
 * @param {Pt} p @param {number} zoom
 */
export function inView(p, zoom) {
  const halfW = W / 2 / zoom;
  const halfH = H / 2 / zoom;
  return Math.abs(p.x - W / 2) <= halfW && Math.abs(p.y - H / 2) <= halfH;
}

/**
 * What the child hears about the two lines.
 * @param {Pt} A @param {Pt} B @param {Pt} C @param {Pt} D
 * @param {boolean} far whether the far view is on
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function layMessage(A, B, C, D, far) {
  const lay = layOf(A, B, C, D);
  if (lay === 'diem')
    return {
      tone: 'warn',
      text: 'Hai điểm của một đường thẳng đang trùng nhau. Em kéo chúng ra xa nhau.',
    };
  if (lay === 'trung')
    return { tone: 'warn', text: 'Hai đường thẳng đang trùng nhau. Em kéo C hoặc D ra chỗ khác.' };
  if (lay === 'song-song')
    return {
      tone: 'ok',
      text: 'Hai đường thẳng AB và CD song song với nhau. Kéo dài mãi về hai phía, chúng cũng không cắt nhau.',
    };
  const at = /** @type {Pt} */ (meetPoint(A, B, C, D));
  const right = lay === 'vuong-goc' ? ' Chúng còn vuông góc với nhau.' : '';
  if (inView(at, 1))
    return { tone: 'info', text: `Hai đường thẳng AB và CD cắt nhau tại điểm O.${right}` };
  if (inView(at, 1 / FAR))
    return far
      ? { tone: 'info', text: `Nhìn ra xa: hai đường thẳng AB và CD cắt nhau tại điểm O.${right}` }
      : {
          tone: 'info',
          text: 'Trong bảng chưa thấy chỗ cắt nhau. Em bấm "Nhìn ra xa": kéo dài ra, hai đường thẳng sẽ cắt nhau.',
        };
  return {
    tone: 'info',
    text: 'Hai đường thẳng cắt nhau ở rất xa, ngoài cả khung nhìn xa. Chúng chưa song song đâu!',
  };
}

/** The lays the child is asked to make, in turn. */
export const GOALS = /** @type {const} */ (['song-song', 'cat', 'song-song', 'vuong-goc']);

/** @type {Record<(typeof GOALS)[number], string>} */
export const GOAL_TEXT = {
  'song-song': 'song song với AB',
  cat: 'cắt AB',
  'vuong-goc': 'vuông góc với AB',
};

/**
 * Whether the lay meets the goal; crossing at a right angle still counts as
 * crossing.
 * @param {Lay} lay @param {(typeof GOALS)[number]} goal
 */
export function meetsGoal(lay, goal) {
  if (goal === 'cat') return lay === 'cat' || lay === 'vuong-goc';
  return lay === goal;
}

/** Line pairs to sort: the directions of the two lines. */
export const SORT_PAIRS = [
  { id: 'p1', a: 0, b: 0 },
  { id: 'p2', a: 0, b: 90 },
  { id: 'p3', a: 30, b: 80 },
  { id: 'p4', a: 60, b: 60 },
  { id: 'p5', a: 135, b: 45 },
  { id: 'p6', a: 90, b: 90 },
  { id: 'p7', a: 10, b: 140 },
  { id: 'p8', a: 150, b: 150 },
  { id: 'p9', a: 20, b: 110 },
];

/** The three bins. */
export const BINS = /** @type {const} */ ([
  { id: 'song-song', label: 'Song song' },
  { id: 'vuong-goc', label: 'Vuông góc' },
  { id: 'cat', label: 'Cắt nhau, không vuông góc' },
]);

/**
 * The sorter cards; the label is what a screen reader hears in place of the
 * picture.
 * @returns {import('#lib/core/card-sorter.js').SortCard[]}
 */
export function sortCards() {
  return SORT_PAIRS.map((p, i) => {
    const m = lineAngle(p.a, p.b);
    const bin = m === 0 ? 'song-song' : m === 90 ? 'vuong-goc' : 'cat';
    const what =
      m === 0
        ? 'hai đường thẳng cùng hướng, cách đều nhau'
        : `hai đường thẳng cắt nhau, một góc tạo thành là ${m}°`;
    const why = {
      'song-song': 'Kéo dài mãi, hai đường thẳng này cũng không cắt nhau: chúng song song.',
      'vuong-goc': 'Hai đường thẳng cắt nhau và tạo thành góc vuông: chúng vuông góc.',
      cat: `Hai đường thẳng cắt nhau, góc ${m}° không phải góc vuông.`,
    }[bin];
    return { id: p.id, label: `Hình ${i + 1}: ${what}`, bin, why };
  });
}
