/**
 * Counting helpers of the chapter "Tính xác suất theo định nghĩa cổ điển":
 * factorials and combinations for n(Ω) and n(E), random draws without
 * replacement for simulated trials, and the book's way of writing a
 * classical probability n(E)/n(Ω).
 */

import { ratioTex } from '#lib/core/fractions.js';
export { choose, factorial } from '#lib/core/counting.js';

/**
 * Draws k different indices from 0..n−1 at random (a partial Fisher–Yates
 * shuffle), as when k balls are taken from a box of n at once.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} k
 * @returns {number[]}
 */
export function drawIndices(rand, n, k) {
  const pool = Array.from({ length: n }, (_, i) => i);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(rand() * (n - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, k);
}

/**
 * The TeX of P(E) = n(E)/n(Ω) with its lowest terms: 'P(E) = \dfrac{6}{36} =
 * \dfrac{1}{6}', 'P(E) = \dfrac{0}{36} = 0'.
 * @param {number} k n(E)
 * @param {number} n n(Ω)
 * @param {string} [name] the event's letter
 */
export function probabilityTex(k, n, name = 'E') {
  const value = k === 0 ? `\\dfrac{0}{${n}} = 0` : ratioTex(k, n);
  return `P(${name}) = ${value}`;
}
