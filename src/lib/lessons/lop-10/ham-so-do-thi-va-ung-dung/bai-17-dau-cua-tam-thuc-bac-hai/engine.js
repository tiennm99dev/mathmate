/**
 * Logic of the sign widget for f(x) = ax² + bx + c: which case of the sign
 * theorem applies and how a test point x reads.
 */

import { formatNumber } from '#lib/core/number-format.js';
import { discriminant, exactRoots, quadAt } from '../_shared/quadratic.js';

/** The values of a on the slider (never 0). */
export const A_VALUES = [-2, -1, 1, 2];

/**
 * The case of the sign theorem, in words.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function caseSentence(a, b, c) {
  const delta = discriminant(a, b, c);
  const sa = a > 0 ? 'dương' : 'âm';
  const ds = formatNumber(delta);
  if (delta < 0) {
    return `Δ = ${ds} < 0: f(x) cùng dấu với a (${sa}) với mọi x ∈ ℝ. Parabol nằm hẳn ${a > 0 ? 'phía trên' : 'phía dưới'} trục hoành.`;
  }
  const roots = exactRoots(a, b, c);
  if (delta === 0) {
    return `Δ = 0: f(x) cùng dấu với a (${sa}) với mọi x ≠ ${roots[0].text}, và f(${roots[0].text}) = 0. Parabol tiếp xúc trục hoành tại một điểm.`;
  }
  const [x1, x2] = roots.map((r) => r.text);
  return `Δ = ${ds} > 0: f(x) có hai nghiệm x₁ = ${x1}, x₂ = ${x2}. f(x) cùng dấu với a (${sa}) khi x < x₁ hoặc x > x₂ ("ngoài khoảng hai nghiệm"), trái dấu với a khi x₁ < x < x₂ ("trong khoảng hai nghiệm").`;
}

/**
 * The sign of f at a test point, said as the table would say it.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} t
 */
export function testSentence(a, b, c, t) {
  const v = quadAt(a, b, c, t);
  const ts = formatNumber(t);
  if (v === 0) return `f(${ts}) = 0: x = ${ts} là nghiệm của tam thức.`;
  return `f(${ts}) = ${formatNumber(v)} ${v > 0 ? '> 0' : '< 0'}: tại x = ${ts}, tam thức ${v > 0 ? 'dương' : 'âm'}, ${Math.sign(v) === Math.sign(a) ? 'cùng dấu' : 'trái dấu'} với a.`;
}
