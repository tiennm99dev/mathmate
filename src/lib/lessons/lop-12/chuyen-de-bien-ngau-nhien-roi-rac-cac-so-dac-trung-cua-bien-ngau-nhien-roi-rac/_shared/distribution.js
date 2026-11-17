/**
 * The numbers of a discrete random variable X given by its probability
 * distribution table (values x_k with probabilities p_k): the expectation
 * E(X) = Σ x_k p_k, the variance V(X) = Σ x_k² p_k − E(X)² and the standard
 * deviation σ(X) = √V(X), plus the binomial distribution B(n; p).
 */

import { tidy } from '#lib/core/number-format.js';

/**
 * C(n, k), exact for the small n of the chapter.
 * @param {number} n @param {number} k
 */
export function choose(n, k) {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 1; i <= Math.min(k, n - k); i += 1) c = (c * (n - i + 1)) / i;
  return Math.round(c);
}

/**
 * Sum of the probabilities, rounded away from binary noise.
 * @param {number[]} probs
 */
export function totalProbability(probs) {
  return tidy(probs.reduce((s, p) => s + p, 0));
}

/**
 * E(X) = x_1 p_1 + … + x_n p_n.
 * @param {number[]} values @param {number[]} probs
 */
export function expectation(values, probs) {
  return tidy(values.reduce((s, x, i) => s + x * probs[i], 0));
}

/**
 * V(X) = Σ (x_k − E(X))² p_k, equal to Σ x_k² p_k − E(X)².
 * @param {number[]} values @param {number[]} probs
 */
export function variance(values, probs) {
  const e = expectation(values, probs);
  return tidy(values.reduce((s, x, i) => s + (x - e) ** 2 * probs[i], 0));
}

/**
 * σ(X) = √V(X).
 * @param {number[]} values @param {number[]} probs
 */
export function stdDev(values, probs) {
  return Math.sqrt(variance(values, probs));
}

/**
 * P(X = k) = C(n, k) p^k (1 − p)^(n − k) for k = 0 … n, X ~ B(n; p).
 * @param {number} n @param {number} p
 */
export function binomialPmf(n, p) {
  return Array.from({ length: n + 1 }, (_, k) => choose(n, k) * p ** k * (1 - p) ** (n - k));
}
