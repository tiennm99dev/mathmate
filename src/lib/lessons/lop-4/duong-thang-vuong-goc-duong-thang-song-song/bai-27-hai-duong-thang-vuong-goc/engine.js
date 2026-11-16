/**
 * The lesson on perpendicular lines: line AB lies across the board and line
 * CD turns about their crossing point O. The angle BOD tells whether the two
 * lines are perpendicular (90°: four right angles at O), and a set square
 * laid on OB checks it the book's way. Also the line pairs to sort.
 * Pure and DOM-free.
 */
import { lineAngle } from '../_shared/lines.js';

/** Turning step of line CD, in degrees. */
export const STEP = 5;

/** Smallest and largest angle BOD the board allows. */
export const MIN = 15;
export const MAX = 165;

/**
 * An angle BOD moved to a whole step and kept on the board.
 * @param {number} m
 */
export function clampTurn(m) {
  return Math.min(MAX, Math.max(MIN, Math.round(m / STEP) * STEP));
}

/**
 * The four angles at O, going round from OB: BOD, DOA, AOC and COB.
 * @param {number} m angle BOD
 */
export function fourAngles(m) {
  return [m, 180 - m, m, 180 - m];
}

/**
 * What the child hears while turning line CD.
 * @param {number} m angle BOD
 * @returns {{ done: boolean, text: string }}
 */
export function turnMessage(m) {
  if (m === 90)
    return {
      done: true,
      text: 'Đúng rồi! Đường thẳng AB vuông góc với đường thẳng CD. Chúng tạo thành 4 góc vuông chung đỉnh O.',
    };
  const way =
    m < 90 ? 'Em xoay đường thẳng CD ra xa OB thêm.' : 'Em xoay đường thẳng CD lại gần OB.';
  return {
    done: false,
    text: `Góc đỉnh O; cạnh OB, OD là ${m}°, chưa phải góc vuông. Hai đường thẳng cắt nhau nhưng không vuông góc. ${way}`,
  };
}

/**
 * What the set square shows when its right angle sits at O with one side on
 * OB.
 * @param {number} m angle BOD
 */
export function squareMessage(m) {
  if (m === 90) return 'Cạnh OD trùng với cạnh ê ke: góc đỉnh O là góc vuông.';
  if (m < 90) return 'Cạnh OD nằm trong góc vuông của ê ke: góc nhọn, chưa phải góc vuông.';
  return 'Cạnh OD nằm ngoài góc vuông của ê ke: góc tù, chưa phải góc vuông.';
}

/** Line pairs to sort: the directions of the two lines. */
export const SORT_PAIRS = [
  { id: 'p1', a: 0, b: 90 },
  { id: 'p2', a: 20, b: 80 },
  { id: 'p3', a: 30, b: 120 },
  { id: 'p4', a: 160, b: 100 },
  { id: 'p5', a: 45, b: 135 },
  { id: 'p6', a: 0, b: 125 },
  { id: 'p7', a: 70, b: 160 },
  { id: 'p8', a: 15, b: 60 },
];

/** The two bins. */
export const BINS = /** @type {const} */ ([
  { id: 'vuong', label: 'Vuông góc' },
  { id: 'khong', label: 'Không vuông góc' },
]);

/**
 * The sorter cards of the line pairs; the label is what a screen reader
 * hears in place of the picture.
 * @returns {import('#lib/core/card-sorter.js').SortCard[]}
 */
export function sortCards() {
  return SORT_PAIRS.map((p, i) => {
    const m = lineAngle(p.a, p.b);
    const right = m === 90;
    return {
      id: p.id,
      label: `Hình ${i + 1}: hai đường thẳng cắt nhau, một góc tạo thành là ${m}°`,
      bin: right ? 'vuong' : 'khong',
      why: right
        ? 'Hai đường thẳng tạo thành góc vuông, nên chúng vuông góc với nhau.'
        : `Góc tạo thành là ${m}°, không phải góc vuông, nên hai đường thẳng không vuông góc.`,
    };
  });
}
