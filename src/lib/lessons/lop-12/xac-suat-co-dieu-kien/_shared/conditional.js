/**
 * Probability helpers shared by the lessons of the chapter "Xác suất có điều
 * kiện": writing a probability the book's way, and the two-level tree of a
 * hypothesis A and an observation B, with the total probability formula and
 * Bayes' formula read off it.
 */

import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
import { valueText } from '#lib/core/fractions.js';

/**
 * Whether a probability is a short decimal (at most four places), which the
 * book writes as a decimal (0,0095) rather than a fraction.
 * @param {number} p
 */
export const isShortDecimal = (p) => Number.isInteger(tidy(p * 10000, 6));

/**
 * A probability as plain text: a short decimal with a comma ('0,56', '1'),
 * otherwise its simplest fraction ('12/19').
 * @param {number} p
 */
export function probText(p) {
  return isShortDecimal(p) ? formatNumber(tidy(p, 6)) : valueText(p);
}

/**
 * A probability as TeX: a short decimal ('0{,}56'), otherwise its simplest
 * fraction ('\dfrac{12}{19}').
 * @param {number} p
 */
export function probTex(p) {
  if (isShortDecimal(p)) return numTex(tidy(p, 6));
  const [n, d] = valueText(p).split('/');
  return d ? `\\dfrac{${n}}{${d}}` : n;
}

/** @typedef {'AB' | 'AnB' | 'nAB' | 'nAnB'} Leaf A or Ā, then B or B̄ */

/** @type {Array<{ id: Leaf, tex: string, text: string, a: boolean, b: boolean }>} */
export const LEAVES = [
  { id: 'AB', tex: 'AB', text: 'AB', a: true, b: true },
  { id: 'AnB', tex: 'A\\overline{B}', text: 'AB̄', a: true, b: false },
  { id: 'nAB', tex: '\\overline{A}B', text: 'ĀB', a: false, b: true },
  { id: 'nAnB', tex: '\\overline{A}\\,\\overline{B}', text: 'ĀB̄', a: false, b: false },
];

/**
 * The three branch probabilities that fix a two-level tree.
 * @typedef {object} Tree
 * @property {number} pA P(A)
 * @property {number} pBA P(B|A)
 * @property {number} pBnA P(B|Ā)
 */

/**
 * The probability of each leaf by the multiplication rule: the product of
 * the two branches on its path, P(AB) = P(A)·P(B|A) and so on.
 * @param {Tree} t
 * @returns {Record<Leaf, number>}
 */
export function leafProbs({ pA, pBA, pBnA }) {
  return {
    AB: tidy(pA * pBA, 12),
    AnB: tidy(pA * (1 - pBA), 12),
    nAB: tidy((1 - pA) * pBnA, 12),
    nAnB: tidy((1 - pA) * (1 - pBnA), 12),
  };
}

/**
 * P(B) by the total probability formula, P(A)·P(B|A) + P(Ā)·P(B|Ā).
 * @param {Tree} t
 */
export function totalProb(t) {
  const l = leafProbs(t);
  return tidy(l.AB + l.nAB, 12);
}

/**
 * P(A|B) by Bayes' formula, P(A)·P(B|A) / P(B); null when P(B) = 0.
 * @param {Tree} t
 */
export function bayes(t) {
  const pB = totalProb(t);
  return pB > 0 ? leafProbs(t).AB / pB : null;
}

/**
 * P(A|B̄), the chance of A once B is known not to have happened:
 * P(A)·P(B̄|A) / P(B̄); null when P(B̄) = 0.
 * @param {Tree} t
 */
export function bayesNot(t) {
  const pnB = tidy(1 - totalProb(t), 12);
  return pnB > 0 ? leafProbs(t).AnB / pnB : null;
}
