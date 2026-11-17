/**
 * Logic of the Galton board. A ball meets n rows of pegs; at each peg it goes
 * right with probability p, independently, so each peg is a Bernoulli trial
 * and the bin it lands in is the number X of right turns: X ~ B(n; p). The
 * widget drops balls and compares the share of balls in each bin with
 * P(X = k) = C(n, k) p^k (1 − p)^(n − k).
 */

import { numTex, tidy } from '#lib/core/number-format.js';
import { binomialPmf, choose } from '../_shared/distribution.js';

/** Most rows of pegs the board draws. */
export const MAX_ROWS = 10;

/**
 * The turns of one ball: true for right.
 * @param {number} n @param {number} p @param {() => number} rand
 */
export function dropPath(n, p, rand) {
  return Array.from({ length: n }, () => rand() < p);
}

/**
 * The bin a path ends in: its number of right turns.
 * @param {boolean[]} path
 */
export function binOf(path) {
  return path.filter(Boolean).length;
}

/**
 * Drops `count` balls and returns the new bin counts; the last path is kept
 * for drawing.
 * @param {number[]} counts @param {number} n @param {number} p
 * @param {number} count @param {() => number} rand
 */
export function dropMany(counts, n, p, count, rand) {
  const next = [...counts];
  /** @type {boolean[]} */
  let last = [];
  for (let i = 0; i < count; i += 1) {
    last = dropPath(n, p, rand);
    next[binOf(last)] += 1;
  }
  return { counts: next, last };
}

/**
 * Mean number of right turns of the dropped balls, null before any.
 * @param {number[]} counts
 */
export function observedMean(counts) {
  const total = counts.reduce((s, c) => s + c, 0);
  if (total === 0) return null;
  return counts.reduce((s, c, k) => s + c * k, 0) / total;
}

/**
 * P(X = k) written out on two lines, so it fits a phone:
 * 'P(X = 3) &= C_{6}^{3} \cdot 0{,}5^{3} \cdot 0{,}5^{3} \\ &= 20 \cdot … = 0{,}3125' in `aligned`.
 * @param {number} n @param {number} p @param {number} k
 */
export function pmfTex(n, p, k) {
  const q = tidy(1 - p);
  const value = binomialPmf(n, p)[k];
  const r = tidy(value, 4);
  const sign = tidy(value, 9) === r ? '=' : '\\approx';
  const powers = `${numTex(p)}^{${k}} \\cdot ${numTex(q)}^{${n - k}}`;
  return `\\begin{aligned} P(X = ${k}) &= C_{${n}}^{${k}} \\cdot ${powers} \\\\ &= ${choose(n, k)} \\cdot ${powers} ${sign} ${numTex(r)} \\end{aligned}`;
}

/**
 * E(X) = np and V(X) = np(1 − p) for the board, one per line.
 * @param {number} n @param {number} p
 */
export function momentsTex(n, p) {
  const q = tidy(1 - p);
  return `\\begin{aligned} E(X) &= np = ${n} \\cdot ${numTex(p)} = ${numTex(tidy(n * p))} \\\\ V(X) &= np(1 - p) = ${numTex(tidy(n * p * q))} \\end{aligned}`;
}

/**
 * The live feedback line.
 * @param {number[]} counts @param {number} n @param {number} p
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function feedback(counts, n, p) {
  const total = counts.reduce((s, c) => s + c, 0);
  const mean = observedMean(counts);
  const e = tidy(n * p);
  if (mean === null) {
    return {
      tone: 'info',
      text: `Mỗi viên bi gặp $${n}$ hàng đinh, mỗi lần rẽ phải với xác suất $${numTex(p)}$. Thả bi để xem số lần rẽ phải $X$ phân bố thế nào.`,
    };
  }
  const meanText = numTex(tidy(mean, 2));
  if (total < 100) {
    return {
      tone: 'info',
      text: `Đã thả $${total}$ viên bi, trung bình mỗi viên rẽ phải $${meanText}$ lần. Thả thêm để các cột tần suất tiến gần các điểm xác suất $P(X = k)$.`,
    };
  }
  return {
    tone: 'ok',
    text: `Đã thả $${total}$ viên bi: trung bình số lần rẽ phải là $${meanText}$, rất gần $E(X) = np = ${numTex(e)}$, và các cột tần suất bám sát phân bố nhị thức $B(${n}; ${numTex(p)})$.`,
  };
}
