/**
 * Exact values of powers and logarithms: a power such as (1/3)³ misses 1/27
 * by one unit in the last place, so values are matched to a fraction within
 * rounding noise before they are written.
 */

import { toFraction } from '#lib/core/fractions.js';

/**
 * The fraction with denominator up to 10 000 within rounding noise of v, or
 * null.
 * @param {number} v
 * @returns {{ n: number, d: number } | null}
 */
export function nearFraction(v) {
  if (!Number.isFinite(v)) return null;
  for (let d = 1; d <= 10000; d++) {
    const n = Math.round(v * d);
    if (Math.abs(n / d - v) <= 1e-12 * Math.max(1, Math.abs(v))) return toFraction(n / d);
  }
  return null;
}

/**
 * A rational value as TeX ('8', '-2', '\\dfrac{1}{8}', '-\\dfrac{3}{2}'), or
 * null when it is not a fraction with a small denominator.
 * @param {number} v
 */
export function exactValueTex(v) {
  const f = nearFraction(v);
  if (!f) return null;
  const sign = f.n < 0 ? '-' : '';
  return f.d === 1 ? `${f.n}` : `${sign}\\dfrac{${Math.abs(f.n)}}{${f.d}}`;
}
