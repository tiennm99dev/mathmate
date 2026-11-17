/**
 * Probability helpers shared by the lessons of the chapter "Các quy tắc tính
 * xác suất": writing a probability the book's way and running seeded trials
 * for the simulations that check a computed probability.
 */

import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
import { ratioTex, valueText } from '#lib/core/fractions.js';

/**
 * Whether a probability is a short decimal (at most three places), which the
 * book writes as a decimal (0,56) rather than a fraction.
 * @param {number} p
 */
export const isShortDecimal = (p) => Number.isInteger(tidy(p * 1000, 6));

/**
 * A probability as plain text: a short decimal with a comma ('0,56', '1'),
 * otherwise its simplest fraction ('5/18').
 * @param {number} p
 */
export function probText(p) {
  return isShortDecimal(p) ? formatNumber(tidy(p, 6)) : valueText(p);
}

/**
 * A probability as TeX: a short decimal ('0{,}56'), otherwise its simplest
 * fraction ('\dfrac{5}{18}').
 * @param {number} p
 */
export function probTex(p) {
  if (isShortDecimal(p)) return numTex(tidy(p, 6));
  const text = valueText(p);
  const [n, d] = text.split('/');
  return d ? `\\dfrac{${n}}{${d}}` : n;
}

/**
 * A classical probability k/n in TeX with its lowest terms: '\dfrac{6}{36} =
 * \dfrac{1}{6}', '\dfrac{0}{36} = 0'.
 * @param {number} k
 * @param {number} n
 */
export const countTex = (k, n) => (k === 0 ? `\\dfrac{0}{${n}} = 0` : ratioTex(k, n));

/**
 * Runs `trials` independent trials and counts the results per key.
 * @template {string} K
 * @param {() => number} rand random numbers in [0, 1)
 * @param {number} trials
 * @param {(rand: () => number) => K} trial one trial, returning its result
 * @returns {Map<K, number>}
 */
export function runTrials(rand, trials, trial) {
  /** @type {Map<K, number>} */
  const counts = new Map();
  for (let i = 0; i < trials; i++) {
    const k = trial(rand);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return counts;
}

/**
 * A relative frequency as a percentage text with one decimal: '56,3%'.
 * @param {number} hits
 * @param {number} trials
 */
export const percentText = (hits, trials) =>
  trials ? `${formatNumber((hits / trials) * 100, 1)}%` : '—';
