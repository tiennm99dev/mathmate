/**
 * Subtracting two fractions on strips. The top strip is the first fraction,
 * the bottom strip the one taken away. The child cuts the pieces of each
 * strip until they are the same size, then strikes out (gạch bớt) as many
 * shaded pieces of the top strip as the bottom strip has: what is left is
 * the difference, the numerators subtracted and the denominator kept. As in
 * the grade 4 book, the denominators are equal or one divides the other.
 * Pure and DOM-free.
 */
import { fracRich, workingTex } from '../_shared/fractions.js';

/** The most pieces a whole is cut into. */
export const MAX_PARTS = 24;

/**
 * A task: a/b − c/d, with a/b greater than c/d.
 * @typedef {{ a: number, b: number, c: number, d: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { a: 4, b: 5, c: 1, d: 5 },
  { a: 3, b: 4, c: 1, d: 8 },
  { a: 9, b: 11, c: 3, d: 11 },
  { a: 1, b: 2, c: 1, d: 6 },
  { a: 3, b: 8, c: 1, d: 4 },
  { a: 10, b: 4, c: 5, d: 4 },
  { a: 7, b: 12, c: 1, d: 3 },
  { a: 2, b: 5, c: 3, d: 20 },
  { a: 7, b: 10, c: 2, d: 5 },
];

/**
 * The largest cut of a strip with denominator b.
 * @param {number} b
 */
export const maxCut = (b) => Math.floor(MAX_PARTS / b);

/**
 * The pieces of both strips after the cuts k1 and k2, and whether they are
 * the same size.
 * @param {Task} task
 * @param {number} k1
 * @param {number} k2
 */
export function cutState(task, k1, k2) {
  const d1 = task.b * k1;
  const d2 = task.d * k2;
  return { d1, d2, A: task.a * k1, C: task.c * k2, same: d1 === d2 };
}

/**
 * TeX of the whole working with equal pieces of D.
 * @param {Task} task
 * @param {number} D
 */
export const diffTex = (task, D) =>
  workingTex({ n: task.a, d: task.b }, { n: task.c, d: task.d }, '-', D);

/**
 * The live sentence under the strips once `crossed` pieces of the top strip
 * are struck out.
 * @param {Task} task
 * @param {number} k1
 * @param {number} k2
 * @param {number} crossed
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function diffNote(task, k1, k2, crossed) {
  const { d1, d2, A, C, same } = cutState(task, k1, k2);
  if (!same) {
    return {
      tone: 'info',
      text: `Mảnh ở băng trên là ${fracRich(1, d1)}, mảnh ở băng dưới là ${fracRich(1, d2)}. Các mảnh chưa bằng nhau nên chưa gạch bớt được. Em chia nhỏ các mảnh nhé.`,
    };
  }
  if (crossed === 0) {
    return {
      tone: 'info',
      text: 'Các mảnh đã bằng nhau! Em gạch bớt ở băng trên số mảnh bằng số mảnh tô màu ở băng dưới.',
    };
  }
  if (crossed < C) {
    return {
      tone: 'info',
      text: `Em đã gạch ${crossed} mảnh. Băng dưới có nhiều mảnh tô màu hơn, em gạch tiếp nhé.`,
    };
  }
  if (crossed > C) {
    return {
      tone: 'warn',
      text: `Gạch thừa rồi! Băng dưới chỉ có ${C} mảnh tô màu. Em bớt gạch nhé.`,
    };
  }
  return {
    tone: 'ok',
    text: `Đúng rồi! Có ${A} mảnh, gạch bớt ${C} mảnh, còn lại ${A - C} mảnh: $${diffTex(task, d1)}$. Trừ hai tử số, giữ nguyên mẫu số.`,
  };
}
