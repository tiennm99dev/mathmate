/**
 * The growth stories of the geometric-sequence explorer: folding a sheet of
 * paper (the number of layers doubles) and a colony of bacteria (500 at the
 * start, the count doubles every 20 minutes), plus a free choice of u_1 and
 * q. Each story says what its n-th term means in words.
 */

import { formatNumber, numTex } from '#lib/core/number-format.js';
import { geometricTerm } from '../_shared/sequence.js';

/** Thickness of one sheet of paper, in millimetres. */
export const SHEET_MM = 0.1;

/** Ratios offered for the free choice, as [p, q] fractions. */
export const RATIOS = /** @type {Array<[number, number]>} */ ([
  [3, 1],
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
]);

/**
 * A length in millimetres in the handiest unit: '0,4 mm', '25,6 cm', '1,64 m'.
 * @param {number} mm
 */
export function lengthText(mm) {
  if (mm < 10) return `${formatNumber(mm, 2)} mm`;
  if (mm < 1000) return `${formatNumber(mm / 10, 2)} cm`;
  return `${formatNumber(mm / 1000, 2)} m`;
}

/**
 * What u_n means in the paper story: layers after n folds, and how thick.
 * @param {number} n
 */
export function paperText(n) {
  const layers = geometricTerm(2, 2, n);
  return `Sau $${n}$ lần gấp, tờ giấy có $u_{${n}} = 2^{${n}} = ${numTex(layers)}$ lớp, dày khoảng ${lengthText(layers * SHEET_MM)}.`;
}

/**
 * A number of minutes the way it is said: '40 phút', '1 giờ', '1 giờ 20 phút'.
 * @param {number} minutes
 */
export function minutesText(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  return m === 0 ? `${h} giờ` : `${h} giờ ${m} phút`;
}

/**
 * What u_n means in the bacteria story: the count after n doublings.
 * @param {number} n
 */
export function bacteriaText(n) {
  const count = geometricTerm(1000, 2, n);
  return `Sau ${minutesText(20 * n)} ($${n}$ lần nhân đôi) có $u_{${n}} = 1\\,000 \\cdot 2^{${n - 1}} = ${numTex(count)}$ con vi khuẩn.`;
}
