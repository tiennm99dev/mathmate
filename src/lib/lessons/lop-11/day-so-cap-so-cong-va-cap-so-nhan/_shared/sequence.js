/**
 * Sequences for the chapter "Dãy số. Cấp số cộng và cấp số nhân": the first
 * terms of a sequence given by a general term or by a recurrence, what those
 * terms show (increasing, decreasing, bounds), arithmetic and geometric
 * terms and sums, and the way a term is written (an integer, a fraction or a
 * rounded decimal with a comma).
 */

import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/**
 * A term as a number, or null where it is not defined (a division by 0).
 * @typedef {number | null} Term
 */

/** Terms larger than this are treated as undefined, so charts stay drawable. */
export const TERM_LIMIT = 1e12;

/**
 * A value rounded to 12 significant digits, which removes binary noise
 * (0.1 + 0.2) and keeps small terms such as 1/2¹⁵ exact.
 * @param {number} v
 */
export function settle(v) {
  return v === 0 ? 0 : Number(v.toPrecision(12));
}

/** @param {number} v @returns {Term} */
function clean(v) {
  return Number.isFinite(v) && Math.abs(v) <= TERM_LIMIT ? settle(v) : null;
}

/**
 * u_1, …, u_count of the sequence u_n = f(n).
 * @param {(n: number) => number} f
 * @param {number} count
 * @returns {Term[]}
 */
export function generalTerms(f, count) {
  return Array.from({ length: count }, (_, i) => clean(f(i + 1)));
}

/**
 * u_1, …, u_count of the sequence with u_1 = first and u_n = step(u_{n−1}, n)
 * for n ≥ 2. Once a term is undefined, every later one is too.
 * @param {number} first
 * @param {(prev: number, n: number) => number} step
 * @param {number} count
 * @returns {Term[]}
 */
export function recursiveTerms(first, step, count) {
  /** @type {Term[]} */
  const out = [clean(first)];
  for (let n = 2; n <= count; n++) {
    const prev = out[n - 2];
    out.push(prev === null ? null : clean(step(prev, n)));
  }
  return out;
}

/**
 * What the listed terms do from one to the next: 'increasing' when every
 * term is larger than the one before, 'decreasing', 'constant', 'mixed', or
 * 'undefined' when a term is missing.
 * @param {Term[]} terms
 * @returns {'increasing' | 'decreasing' | 'constant' | 'mixed' | 'undefined'}
 */
export function trend(terms) {
  if (terms.some((t) => t === null)) return 'undefined';
  const t = /** @type {number[]} */ (terms);
  let up = 0;
  let down = 0;
  for (let i = 1; i < t.length; i++) {
    const d = settle(t[i] - t[i - 1]);
    if (d > 0) up++;
    else if (d < 0) down++;
  }
  if (up && !down && up === t.length - 1) return 'increasing';
  if (down && !up && down === t.length - 1) return 'decreasing';
  if (!up && !down) return 'constant';
  return 'mixed';
}

/**
 * u_n of the arithmetic sequence with first term u1 and common difference d.
 * @param {number} u1 @param {number} d @param {number} n
 */
export function arithmeticTerm(u1, d, n) {
  return tidy(u1 + (n - 1) * d);
}

/**
 * S_n = n(u_1 + u_n)/2 of an arithmetic sequence.
 * @param {number} u1 @param {number} d @param {number} n
 */
export function arithmeticSum(u1, d, n) {
  return tidy((n * (2 * u1 + (n - 1) * d)) / 2);
}

/**
 * u_n = u_1·q^(n−1) of a geometric sequence.
 * @param {number} u1 @param {number} q @param {number} n
 */
export function geometricTerm(u1, q, n) {
  return settle(u1 * q ** (n - 1));
}

/**
 * S_n of a geometric sequence, equal to u_1(1 − q^n)/(1 − q), or n·u_1 when q = 1.
 * @param {number} u1 @param {number} q @param {number} n
 */
export function geometricSum(u1, q, n) {
  if (q === 1) return n * u1;
  // Adding the terms one by one keeps sums with q = −1/2 exact, where the
  // closed form divides by 1,5.
  let s = 0;
  for (let k = 0; k < n; k++) s += u1 * q ** k;
  return settle(s);
}

/**
 * The fraction p/q (q > 0, lowest terms) equal to v, up to binary noise,
 * with q at most maxDen; null when there is none.
 * @param {number} v @param {number} [maxDen]
 * @returns {[number, number] | null}
 */
export function rationalOf(v, maxDen = 5000) {
  if (!Number.isFinite(v)) return null;
  for (let q = 1; q <= maxDen; q++) {
    const p = Math.round(v * q);
    if (Math.abs(p - v * q) < 1e-9 * Math.max(1, Math.abs(v * q))) {
      const g = gcd(Math.abs(p), q) || 1;
      return [p / g, q / g];
    }
  }
  return null;
}

/**
 * A term as TeX: '5', '-\dfrac{2}{3}', '\approx 1{,}414', or '\text{không xác định}'.
 * @param {Term} v
 */
export function termTex(v) {
  if (v === null) return '\\text{không xác định}';
  const r = Number.isInteger(v) ? [v, 1] : Math.abs(v) < 1e6 ? rationalOf(v) : null;
  if (r && r[1] === 1) return numTex(r[0]);
  if (r) return `${r[0] < 0 ? '-' : ''}\\dfrac{${Math.abs(r[0])}}{${r[1]}}`;
  return `\\approx ${numTex(v, 3)}`;
}

/**
 * A term as plain text for labels and screen readers: '5', '−2/3', '≈ 1,414',
 * 'không xác định'.
 * @param {Term} v
 */
export function termText(v) {
  if (v === null) return 'không xác định';
  const r = Number.isInteger(v) ? [v, 1] : Math.abs(v) < 1e6 ? rationalOf(v) : null;
  if (r && r[1] === 1) return formatNumber(r[0]);
  if (r) return `${r[0] < 0 ? '−' : ''}${Math.abs(r[0])}/${r[1]}`;
  return `≈ ${formatNumber(v, 3)}`;
}
