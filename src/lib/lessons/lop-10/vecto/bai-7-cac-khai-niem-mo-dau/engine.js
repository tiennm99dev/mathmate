/**
 * Logic of the three draggable vectors $\vec a$, $\vec b$, $\vec c$ on a grid:
 * how each pair relates, the tasks the learner sets up by dragging, and the
 * words a screen reader hears for a vector.
 */
import { isZero, oneLine, relation } from '../_shared/vectors.js';
import { add } from '#lib/geom-engine/vec.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {{ name: 'a' | 'b' | 'c', tail: V, d: V }} Arrow */

/** The three pairs the table lists, by index. */
export const PAIRS = /** @type {const} */ ([
  [0, 1],
  [0, 2],
  [1, 2],
]);

/**
 * How a grid vector moves, in words: 'sang phải 3 ô, lên 1 ô'.
 * @param {V} d
 */
export function moveText(d) {
  if (isZero(d)) return 'vectơ-không, điểm đầu trùng điểm cuối';
  const parts = [];
  if (d.x) parts.push(`${d.x > 0 ? 'sang phải' : 'sang trái'} ${Math.abs(d.x)} ô`);
  if (d.y) parts.push(`${d.y > 0 ? 'lên' : 'xuống'} ${Math.abs(d.y)} ô`);
  return parts.join(', ');
}

/**
 * Where the supports (giá) of two vectors stand: 'trùng nhau', 'song song',
 * 'cắt nhau', or null when one vector is zero (it has no single support).
 * @param {Arrow} p @param {Arrow} q
 */
export function supports(p, q) {
  if (isZero(p.d) || isZero(q.d)) return null;
  if (!relation(p.d, q.d).parallel) return 'cắt nhau';
  return oneLine(p.tail, add(p.tail, p.d), q.tail) ? 'trùng nhau' : 'song song';
}

/**
 * @typedef {{ id: string, text: string, done: (arrows: Arrow[]) => boolean }} Task
 */

/** @type {Task[]} */
export const TASKS = [
  {
    id: 'opposite',
    text: 'Kéo để $\\vec a$ và $\\vec b$ cùng phương nhưng ngược hướng.',
    done: ([a, b]) => relation(a.d, b.d).opposite,
  },
  {
    id: 'same',
    text: 'Kéo để $\\vec b$ và $\\vec c$ cùng hướng nhưng không bằng nhau.',
    done: ([, b, c]) =>
      !isZero(b.d) && !isZero(c.d) && relation(b.d, c.d).same && !relation(b.d, c.d).equal,
  },
  {
    id: 'equal',
    text: 'Kéo để $\\vec c = \\vec a$ mà hai mũi tên không chồng lên nhau.',
    done: ([a, , c]) =>
      !isZero(a.d) && relation(a.d, c.d).equal && (a.tail.x !== c.tail.x || a.tail.y !== c.tail.y),
  },
  {
    id: 'zero',
    text: 'Biến $\\vec b$ thành vectơ-không.',
    done: ([, b]) => isZero(b.d),
  },
];

/**
 * Where a vector's tail may go so its head stays on the board.
 * @param {V} tail wanted tail @param {V} d @param {{ xMin: number, xMax: number, yMin: number, yMax: number }} box
 * @returns {V}
 */
export function keepInside(tail, d, box) {
  /** @param {number} v @param {number} step @param {number} lo @param {number} hi */
  const fit = (v, step, lo, hi) =>
    Math.min(hi - Math.max(0, step), Math.max(lo - Math.min(0, step), v));
  return { x: fit(tail.x, d.x, box.xMin, box.xMax), y: fit(tail.y, d.y, box.yMin, box.yMax) };
}
