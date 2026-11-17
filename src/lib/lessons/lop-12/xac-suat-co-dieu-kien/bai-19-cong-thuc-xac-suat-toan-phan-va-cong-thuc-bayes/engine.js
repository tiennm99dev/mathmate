/**
 * Logic of the medical-test tree. A = "the person has disease X", B = "the
 * test is positive". The prevalence P(A), the sensitivity P(B|A) and the
 * false-positive rate P(B|Ā) fix the tree; the total probability formula
 * gives P(B) and Bayes' formula turns a test result back into the chance of
 * being ill. The same numbers are also told as counts out of a large group.
 */

import { formatNumber, fmt, numTex, tidy } from '#lib/core/number-format.js';
import { bayes, bayesNot, leafProbs, totalProb } from '../_shared/conditional.js';

/** Prevalences the slider steps through, as probabilities. */
export const PREVALENCES = [0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.3, 0.5];

/** The size of the imagined group for the count view. */
export const GROUP_SIZE = 100000;

/**
 * A probability for the widget: up to six decimals, the comma the book's way.
 * @param {number} p
 */
export const pText = (p) => formatNumber(tidy(p, 9), 6);

/**
 * A probability as TeX with up to six decimals.
 * @param {number} p
 */
const pTex = (p) => numTex(tidy(p, 9), 6);

/**
 * A percentage with up to two decimals: 0.15993 → '15,99%'.
 * @param {number} p
 */
export const percent = (p) => `${formatNumber(p * 100, 2)}%`;

/** @typedef {'pos' | 'neg'} Result */

/**
 * The leaf counts out of `GROUP_SIZE` people, rounded to whole people.
 * @param {import('../_shared/conditional.js').Tree} t
 */
export function groupCounts(t) {
  const l = leafProbs(t);
  return {
    AB: Math.round(l.AB * GROUP_SIZE),
    AnB: Math.round(l.AnB * GROUP_SIZE),
    nAB: Math.round(l.nAB * GROUP_SIZE),
    nAnB: Math.round(l.nAnB * GROUP_SIZE),
  };
}

/**
 * The total probability and Bayes steps for one test result, as rich text.
 * @param {import('../_shared/conditional.js').Tree} t
 * @param {Result} result
 */
export function explain(t, result) {
  const { pA, pBA, pBnA } = t;
  const nA = tidy(1 - pA, 12);
  const l = leafProbs(t);
  const pB = totalProb(t);
  if (result === 'pos') {
    const total = `$P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A}) = ${pTex(pA)} \\cdot ${pTex(pBA)} + ${pTex(nA)} \\cdot ${pTex(pBnA)} = ${pTex(pB)}$`;
    const post = bayes(t);
    if (post === null)
      return `${total}. Không ai có kết quả dương tính, nên không tính được $P(A|B)$.`;
    return `Công thức xác suất toàn phần: ${total}. Công thức Bayes: $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)} = \\dfrac{${pTex(l.AB)}}{${pTex(pB)}} \\approx ${numTex(post, 4)}$. Người có kết quả dương tính mắc bệnh với xác suất khoảng ${percent(post)}, còn trước khi xét nghiệm, xác suất đó là ${percent(pA)}.`;
  }
  const pnB = tidy(1 - pB, 12);
  const total = `$P(\\overline{B}) = P(A) \\cdot P(\\overline{B}|A) + P(\\overline{A}) \\cdot P(\\overline{B}|\\overline{A}) = ${pTex(pA)} \\cdot ${pTex(tidy(1 - pBA, 12))} + ${pTex(nA)} \\cdot ${pTex(tidy(1 - pBnA, 12))} = ${pTex(pnB)}$`;
  const post = bayesNot(t);
  if (post === null)
    return `${total}. Không ai có kết quả âm tính, nên không tính được $P(A|\\overline{B})$.`;
  return `Công thức xác suất toàn phần: ${total}. Công thức Bayes: $P(A|\\overline{B}) = \\dfrac{P(A) \\cdot P(\\overline{B}|A)}{P(\\overline{B})} = \\dfrac{${pTex(l.AnB)}}{${pTex(pnB)}} \\approx ${numTex(post, 4)}$. Người có kết quả âm tính vẫn có thể mắc bệnh với xác suất khoảng ${percent(post)}.`;
}

/**
 * The same result told as counts of people, as plain text.
 * @param {import('../_shared/conditional.js').Tree} t
 * @param {Result} result
 */
export function countStory(t, result) {
  const c = groupCounts(t);
  const intro = `Hình dung ${fmt(GROUP_SIZE)} người được xét nghiệm: khoảng ${fmt(c.AB + c.AnB)} người mắc bệnh.`;
  if (result === 'pos') {
    return `${intro} Có ${fmt(c.AB)} người bệnh và ${fmt(c.nAB)} người không bệnh cho kết quả dương tính; trong ${fmt(c.AB + c.nAB)} người dương tính, tỉ lệ người thật sự mắc bệnh là ${fmt(c.AB)}/${fmt(c.AB + c.nAB)}.`;
  }
  return `${intro} Có ${fmt(c.AnB)} người bệnh và ${fmt(c.nAnB)} người không bệnh cho kết quả âm tính; trong ${fmt(c.AnB + c.nAnB)} người âm tính, có ${fmt(c.AnB)} người vẫn mắc bệnh.`;
}
