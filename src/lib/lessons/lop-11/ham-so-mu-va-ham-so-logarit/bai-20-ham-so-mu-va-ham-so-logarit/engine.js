/**
 * The exponential function y = aˣ and the logarithmic function y = log_a x
 * for a base a > 0, a ≠ 1: whether they increase or decrease, and the
 * reflection in the line y = x that swaps the two graphs.
 */

import { numTex, tidy } from '#lib/core/number-format.js';

/** The base slider. */
export const A_MIN = 0.2;
export const A_MAX = 4;
export const A_STEP = 0.1;

/** The square window: equal scales, so the reflection in y = x shows true. */
export const WINDOW = { xMin: -3, xMax: 5, yMin: -3, yMax: 5 };

/**
 * 'up' when a > 1 (both functions increase), 'down' when 0 < a < 1,
 * 'none' when a = 1 (no exponential or logarithmic function).
 * @param {number} a
 * @returns {'up' | 'down' | 'none'}
 */
export function trend(a) {
  const t = tidy(a, 9);
  if (t === 1) return 'none';
  return t > 1 ? 'up' : 'down';
}

/**
 * M(t; aᵗ) on the exponential graph and its image M′(aᵗ; t) in the line
 * y = x, which lies on the logarithmic graph.
 * @param {number} a @param {number} t
 */
export function mirror(a, t) {
  const y = a ** t;
  return { m: { x: t, y }, image: { x: y, y: t } };
}

/**
 * The two functions as TeX for this base.
 * @param {number} a
 */
export function formulas(a) {
  const v = tidy(a, 9);
  const base = numTex(v);
  const power = Number.isInteger(v) ? base : `(${base})`;
  return { exp: `y = ${power}^x`, log: `y = \\log_{${base}} x` };
}

/**
 * y = log_a x, NaN outside x > 0.
 * @param {number} a @param {number} x
 */
export const logOf = (a, x) => (x > 0 ? Math.log(x) / Math.log(a) : NaN);
