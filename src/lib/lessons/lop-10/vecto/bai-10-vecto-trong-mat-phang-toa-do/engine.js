/**
 * Logic of the coordinate board: the coordinate expressions of u + v, u − v
 * and k·u worked out with the dragged numbers, and for three points A, B, C
 * the coordinates of AB, its length, the midpoint of AB and the centroid of
 * ABC, each written the book's way.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { add, coordTex, rootTex, scale, sub } from '../_shared/vectors.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {'cong' | 'tru' | 'nhan'} Op */

/** A number as a TeX operand: negatives in brackets. @param {number} n */
const op = (n) => (n < 0 ? `(${numTex(n)})` : numTex(n));

/**
 * The result vector of an operation.
 * @param {Op} kind @param {V} u @param {V} v @param {number} k
 */
export function result(kind, u, v, k) {
  if (kind === 'cong') return add(u, v);
  if (kind === 'tru') return sub(u, v);
  return scale(u, k);
}

/**
 * The coordinate expression of an operation, with substitution and result:
 * \vec u + \vec v = (2 + (-1);\ 3 + 1) = (1;\ 4).
 * @param {Op} kind @param {V} u @param {V} v @param {number} k
 */
export function opTex(kind, u, v, k) {
  const r = result(kind, u, v, k);
  if (kind === 'nhan') {
    return `${numTex(k)}\\vec u = (${numTex(k)} \\cdot ${op(u.x)};\\ ${numTex(k)} \\cdot ${op(u.y)}) = ${coordTex(r.x, r.y)}`;
  }
  const sign = kind === 'cong' ? '+' : '-';
  return `\\vec u ${sign} \\vec v = (${numTex(u.x)} ${sign} ${op(v.x)};\\ ${numTex(u.y)} ${sign} ${op(v.y)}) = ${coordTex(r.x, r.y)}`;
}

/**
 * Whether u and v are parallel, by the book's test x y' − x' y = 0, written
 * out.
 * @param {V} u @param {V} v
 */
export function parallelTex(u, v) {
  const d = u.x * v.y - v.x * u.y;
  return `x y' - x' y = ${op(u.x)} \\cdot ${op(v.y)} - ${op(v.x)} \\cdot ${op(u.y)} = ${numTex(d)}`;
}

/**
 * The lines for three points: AB, |AB|, the midpoint I of AB, the centroid G.
 * @param {V} A @param {V} B @param {V} C
 */
export function pointLines(A, B, C) {
  const ab = sub(B, A);
  const I = scale(add(A, B), 1 / 2);
  const G = scale(add(add(A, B), C), 1 / 3);
  const third = (/** @type {number} */ s) =>
    Number.isInteger(tidy(s / 3, 9))
      ? numTex(tidy(s / 3, 9))
      : `${s < 0 ? '-' : ''}\\dfrac{${numTex(Math.abs(s))}}{3}`;
  return {
    ab,
    I,
    G,
    lines: [
      `\\overrightarrow{AB} = (${numTex(B.x)} - ${op(A.x)};\\ ${numTex(B.y)} - ${op(A.y)}) = ${coordTex(ab.x, ab.y)}`,
      `AB = \\sqrt{${op(ab.x)}^2 + ${op(ab.y)}^2} = ${rootTex(ab)}`,
      `I\\left(\\dfrac{${numTex(A.x)} + ${op(B.x)}}{2};\\ \\dfrac{${numTex(A.y)} + ${op(B.y)}}{2}\\right) = I${coordTex(I.x, I.y)}`,
      `G\\left(\\dfrac{${numTex(A.x)} + ${op(B.x)} + ${op(C.x)}}{3};\\ \\dfrac{${numTex(A.y)} + ${op(B.y)} + ${op(C.y)}}{3}\\right) = G\\left(${third(A.x + B.x + C.x)};\\ ${third(A.y + B.y + C.y)}\\right)`,
    ],
  };
}

/** The coordinate board, in grid units; it is symmetric about O. */
export const BOX = { xMin: -6, xMax: 6, yMin: -5, yMax: 5 };

/** @param {V} p */
export const onBoard = (p) =>
  p.x >= BOX.xMin && p.x <= BOX.xMax && p.y >= BOX.yMin && p.y <= BOX.yMax;

/**
 * Whether the result of an operation stays on the board.
 * @param {Op} kind @param {V} u @param {V} v @param {number} k
 */
export const fits = (kind, u, v, k) => onBoard(result(kind, u, v, k));

/**
 * The largest whole k from 1 to 3 for which k·u (and so −k·u, the board being
 * symmetric) stays on the board; u itself always does.
 * @param {V} u
 */
export function kLimit(u) {
  let m = 3;
  while (m > 1 && !onBoard(scale(u, m))) m -= 1;
  return m;
}
