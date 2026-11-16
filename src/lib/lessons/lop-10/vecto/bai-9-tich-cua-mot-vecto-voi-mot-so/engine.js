/**
 * Logic of the scaling board: the vector k·a against a, in direction and
 * length, with the three collinear points A, B, C where AC = k·AB; and the
 * centroid identity MA + MB + MC = 3MG, drawn as the chain of the three
 * vectors ending where 3MG ends.
 */
import { numTex } from '#lib/core/number-format.js';
import { add, isZero, len, lengthTex, scale, sub } from '../_shared/vectors.js';

/** @typedef {{ x: number, y: number }} V */

/** k as TeX: 2, -1{,}5. @param {number} k */
export const kTex = (k) => numTex(k, 2);

/**
 * What k does to a: the sentence under the board.
 * @param {V} a @param {number} k
 */
export function scaleNote(a, k) {
  if (isZero(a)) return '$\\vec a = \\vec 0$ nên $k\\vec a = \\vec 0$ với mọi $k$.';
  if (k === 0) return '$k = 0$: $0 \\cdot \\vec a = \\vec 0$, điểm $C$ trùng $A$.';
  const way = k > 0 ? 'cùng hướng với' : 'ngược hướng với';
  const size =
    Math.abs(k) === 1
      ? 'có cùng độ dài với'
      : Math.abs(k) > 1
        ? `dài gấp $${numTex(Math.abs(k), 2)}$ lần`
        : `có độ dài bằng $${numTex(Math.abs(k), 2)}$ lần độ dài`;
  return `$k = ${kTex(k)} ${k > 0 ? '> 0' : '< 0'}$: vectơ $${kTex(k)}\\vec a$ ${way} $\\vec a$ và ${size} $\\vec a$. Ba điểm $A$, $B$, $C$ thẳng hàng vì $\\overrightarrow{AC} = ${kTex(k)}\\overrightarrow{AB}$.`;
}

/**
 * The live length line: |k a| = |k| · |a|.
 * @param {V} a @param {number} k
 */
export function lengthLine(a, k) {
  return `|${kTex(k)}\\vec a| = |${kTex(k)}| \\cdot |\\vec a| ${lengthTex(Math.abs(k) * len(a))}`;
}

/**
 * The centroid G of ABC and the chain M → M + MA → M + MA + MB → M + MA + MB + MC,
 * whose end is also M + 3MG.
 * @param {V} A @param {V} B @param {V} C @param {V} M
 */
export function centroidChain(A, B, C, M) {
  const G = scale(add(add(A, B), C), 1 / 3);
  const one = add(M, sub(A, M));
  const two = add(one, sub(B, M));
  const end = add(two, sub(C, M));
  return { G, chain: [M, one, two, end], end, triple: add(M, scale(sub(G, M), 3)) };
}
