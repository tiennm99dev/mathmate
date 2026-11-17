/**
 * The mark and recapture method on a virtual pond: mark M fish and put them
 * back, catch a sample of n fish and count the k marked ones, then estimate
 * the population by M/N ≈ k/n, that is N̂ = M·n/k rounded to a whole number.
 * The absolute error is ΔN = |N̂ − N| and the relative error δ = ΔN/N̂, as in
 * the book's table.
 */
import { int } from '#lib/core/drill.js';
import { formatFixed, numTex, tidy } from '#lib/core/number-format.js';

/** @typedef {{ x: number, y: number, marked: boolean }} Fish */

/**
 * The estimate N̂ = M·n/k rounded to the nearest whole number; null when no
 * marked fish was caught (k = 0), since the ratio says nothing then.
 * @param {number} M @param {number} n @param {number} k
 * @returns {number | null}
 */
export function estimate(M, n, k) {
  if (k <= 0) return null;
  return Math.round(tidy((M * n) / k));
}

/**
 * Absolute and relative error of an estimate of the true size N.
 * @param {number} est N̂ @param {number} N
 * @returns {{ abs: number, rel: number }}
 */
export function errors(est, N) {
  const abs = Math.abs(est - N);
  return { abs, rel: abs / est };
}

/** A relative error as a percentage to two decimals: 0.2157 → '21,57%'. @param {number} rel */
export const percent = (rel) => `${formatFixed(tidy(rel * 100, 6), 2)}%`;

/**
 * A pond of N fish at random places in a w × h field, none marked yet.
 * @param {() => number} rand @param {number} N @param {number} w @param {number} h
 * @returns {Fish[]}
 */
export function makePond(rand, N, w, h) {
  return Array.from({ length: N }, () => ({ x: rand() * w, y: rand() * h, marked: false }));
}

/**
 * `count` different indices from 0 to size − 1, every set equally likely
 * (a partial Fisher–Yates shuffle).
 * @param {() => number} rand @param {number} size @param {number} count
 * @returns {number[]}
 */
export function drawIndices(rand, size, count) {
  const idx = Array.from({ length: size }, (_, i) => i);
  const take = Math.min(count, size);
  for (let i = 0; i < take; i++) {
    const j = int(rand, i, size - 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, take);
}

/**
 * The pond after catching M fish at random, marking them and letting them go.
 * @param {() => number} rand @param {Fish[]} pond @param {number} M
 * @returns {Fish[]}
 */
export function markFish(rand, pond, M) {
  const chosen = new Set(drawIndices(rand, pond.length, M));
  return pond.map((f, i) => ({ ...f, marked: chosen.has(i) }));
}

/**
 * A second catch of n fish: which fish were caught and how many were marked.
 * @param {() => number} rand @param {Fish[]} pond @param {number} n
 * @returns {{ caught: number[], k: number }}
 */
export function recapture(rand, pond, n) {
  const caught = drawIndices(rand, pond.length, n);
  return { caught, k: caught.filter((i) => pond[i].marked).length };
}

/**
 * The working of one estimate as rich text.
 * @param {number} M @param {number} n @param {number} k
 */
export function estimateText(M, n, k) {
  const est = estimate(M, n, k);
  if (est === null) {
    return `Mẫu $${n}$ con không có con nào được đánh dấu ($k = 0$), nên chưa ước lượng được $N$. Hãy bắt mẫu lớn hơn.`;
  }
  const sign = Number.isInteger(tidy((M * n) / k)) ? '=' : '\\approx';
  return `Tỉ lệ cá có dấu trong mẫu $\\dfrac{k}{n} = \\dfrac{${k}}{${n}}$ xấp xỉ tỉ lệ trong hồ $\\dfrac{M}{N}$, nên $N \\approx \\dfrac{M \\cdot n}{k} = \\dfrac{${M} \\cdot ${n}}{${k}} ${sign} ${numTex(est)}$.`;
}

/**
 * Mean of the estimates made so far, null when there is none.
 * @param {Array<number | null>} ests
 */
export function meanEstimate(ests) {
  const ok = /** @type {number[]} */ (ests.filter((e) => e !== null));
  if (ok.length === 0) return null;
  return ok.reduce((s, e) => s + e, 0) / ok.length;
}
