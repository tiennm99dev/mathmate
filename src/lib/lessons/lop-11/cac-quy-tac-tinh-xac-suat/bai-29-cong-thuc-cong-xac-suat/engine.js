/**
 * Logic of the addition-rule widget: 100 equally likely outcomes (100 families,
 * one chosen at random), two events A and B given by how many outcomes they
 * hold and how many they share, the cells of the 10 × 10 picture, and the
 * addition formula written with those numbers.
 */

import { readProbability } from '#lib/core/fractions.js';
import { clamp } from '#lib/core/visuals/svg-math.js';
import { numTex } from '#lib/core/number-format.js';

export const N = 100;

/**
 * The allowed range of n(AB) for given n(A), n(B) out of `N` outcomes: at
 * least n(A) + n(B) − N (the two events cannot both fit otherwise) and at
 * most the smaller of the two.
 * @param {number} nA
 * @param {number} nB
 */
export function overlapRange(nA, nB) {
  return { min: Math.max(0, nA + nB - N), max: Math.min(nA, nB) };
}

/**
 * n(AB) moved into its allowed range.
 * @param {number} nA
 * @param {number} nB
 * @param {number} nAB
 */
export function fitOverlap(nA, nB, nAB) {
  const r = overlapRange(nA, nB);
  return clamp(nAB, r.min, r.max);
}

/** @typedef {'onlyA' | 'both' | 'onlyB' | 'neither'} Region */

/**
 * The region of each of the `N` cells, A-only first, then the shared cells,
 * then B-only, then the rest, so each region is one block of the picture.
 * @param {number} nA
 * @param {number} nB
 * @param {number} nAB
 * @returns {Region[]}
 */
export function cells(nA, nB, nAB) {
  /** @type {Region[]} */
  const out = [];
  const push = (/** @type {Region} */ r, /** @type {number} */ k) => {
    for (let i = 0; i < k; i++) out.push(r);
  };
  push('onlyA', nA - nAB);
  push('both', nAB);
  push('onlyB', nB - nAB);
  push('neither', N - nA - nB + nAB);
  return out;
}

/** @param {number} k */
const p = (k) => numTex(k / N);

/**
 * The addition formula with the numbers filled in, as rich text.
 * @param {number} nA
 * @param {number} nB
 * @param {number} nAB
 */
export function formulaText(nA, nB, nAB) {
  const union = nA + nB - nAB;
  if (nAB === 0) {
    return `$A$ và $B$ xung khắc ($AB = \\varnothing$), nên $P(A \\cup B) = P(A) + P(B) = ${p(nA)} + ${p(nB)} = ${p(union)}$.`;
  }
  return `$P(A \\cup B) = P(A) + P(B) - P(AB) = ${p(nA)} + ${p(nB)} - ${p(nAB)} = ${p(union)}$. Cộng $P(A) + P(B) = ${p(nA + nB)}$ thì $${nAB}$ ô tím được đếm hai lần, nên phải trừ đi $P(AB)$ một lần.`;
}

/**
 * Checks a typed P(A ∪ B).
 * @param {string} text
 * @param {number} nA
 * @param {number} nB
 * @param {number} nAB
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function checkUnion(text, nA, nB, nAB) {
  if (!text.trim()) {
    return { tone: 'info', text: 'Nhập $P(A \\cup B)$ dưới dạng số thập phân hoặc phân số.' };
  }
  const v = readProbability(text);
  if (v === null) {
    return { tone: 'warn', text: 'Không đọc được số này. Viết như $0{,}75$ hoặc $3/4$.' };
  }
  const right = (nA + nB - nAB) / N;
  if (Math.abs(v - right) < 1e-9) {
    return { tone: 'ok', text: `Đúng! ${formulaText(nA, nB, nAB)}` };
  }
  if (Math.abs(v - (nA + nB) / N) < 1e-9 && nAB > 0) {
    return {
      tone: 'warn',
      text: 'Đó là $P(A) + P(B)$: các kết quả thuộc cả $A$ và $B$ đã bị đếm hai lần. Hãy trừ đi $P(AB)$.',
    };
  }
  return {
    tone: 'warn',
    text: 'Chưa đúng. Đếm các ô thuộc $A$ hoặc $B$ (xanh, tím, vàng), mỗi ô một lần, rồi chia cho $100$.',
  };
}
