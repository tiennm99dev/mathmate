/**
 * Logic of the circle board: the radii offered (squares of radii whose
 * circles pass through whole-number points, so the tangent at such a point
 * has whole coefficients), where the centre may go so the circle stays on
 * the board, and the lines of the TeX panel.
 */
import { numTex } from '#lib/core/number-format.js';
import {
  circleTex,
  coordTex,
  expandedTex,
  lineTex,
  radiusTex,
  tangentAt,
  tangentSubTex,
} from '../_shared/coords.js';

/** @typedef {{ x: number, y: number }} V */

/** The board, in grid units. */
export const BOX = { xMin: -7, xMax: 7, yMin: -6, yMax: 6 };

/** Squares of the radii offered; each circle has at least four whole-number points. */
export const R2_CHOICES = [4, 5, 9, 10, 13, 25];

/**
 * Whether the circle with centre I and radius √r2 lies inside the board.
 * @param {V} I @param {number} r2
 */
export function fits(I, r2) {
  const r = Math.sqrt(r2);
  return I.x - r >= BOX.xMin && I.x + r <= BOX.xMax && I.y - r >= BOX.yMin && I.y + r <= BOX.yMax;
}

/**
 * The nearest centre to I that keeps the circle on the board.
 * @param {V} I @param {number} r2
 */
export function clampCentre(I, r2) {
  const r = Math.sqrt(r2);
  const lim = (/** @type {number} */ v, /** @type {number} */ lo, /** @type {number} */ hi) =>
    Math.min(Math.floor(hi - r), Math.max(Math.ceil(lo + r), v));
  return { x: lim(I.x, BOX.xMin, BOX.xMax), y: lim(I.y, BOX.yMin, BOX.yMax) };
}

/**
 * The panel: the equation, its expanded form with a, b, c, and the tangent at
 * M worked out.
 * @param {V} I @param {number} r2 @param {V} M
 */
export function panelTex(I, r2, M) {
  const c = I.x * I.x + I.y * I.y - r2;
  return {
    equation: `(C): ${circleTex(I, r2)}`,
    centre: `I${coordTex(I.x, I.y)},\\quad R = ${radiusTex(r2)}`,
    expanded: `\\Leftrightarrow ${expandedTex(I, r2)}`,
    coefs: `a = ${numTex(I.x)},\\ b = ${numTex(I.y)},\\ c = ${numTex(c)}`,
    tangent: [tangentSubTex(I, M), `\\Leftrightarrow ${lineTex(tangentAt(I, M))}`],
  };
}
