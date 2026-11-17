/**
 * Bringing two fractions to a common denominator on two strips. Each strip
 * starts as its fraction; the child cuts every part of a strip into k equal
 * parts, which multiplies its numerator and denominator by k. Once both
 * strips have the same number of parts, the two fractions have a common
 * denominator. As in the grade 4 book, one denominator divides the other or
 * the common denominator is given. Pure and DOM-free.
 */
import { fracRich, fracTex, stepTex } from '../_shared/fractions.js';

/** The most parts a strip is cut into. */
export const MAX_PARTS = 24;

/**
 * A task: the fractions a/b and c/d and the common denominator to reach.
 * @typedef {{ a: number, b: number, c: number, d: number, common: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { a: 3, b: 4, c: 5, d: 8, common: 8 },
  { a: 1, b: 3, c: 5, d: 6, common: 6 },
  { a: 5, b: 9, c: 11, d: 18, common: 18 },
  { a: 2, b: 3, c: 3, d: 4, common: 12 },
  { a: 1, b: 2, c: 3, d: 10, common: 10 },
  { a: 3, b: 5, c: 4, d: 15, common: 15 },
  { a: 1, b: 4, c: 5, d: 6, common: 12 },
  { a: 7, b: 12, c: 5, d: 24, common: 24 },
];

/**
 * The largest cut of a strip with denominator b.
 * @param {number} b
 */
export const maxCut = (b) => Math.floor(MAX_PARTS / b);

/**
 * The cut each strip needs to reach the common denominator.
 * @param {Task} task
 */
export const neededCuts = (task) => ({ first: task.common / task.b, second: task.common / task.d });

/**
 * TeX of a strip after cutting each part into k: '\dfrac{3}{4} = \dfrac{3
 * \times 2}{4 \times 2} = \dfrac{6}{8}', or the fraction alone when k is 1.
 * @param {number} n
 * @param {number} d
 * @param {number} k
 */
export const cutTex = (n, d, k) => (k === 1 ? fracTex(n, d) : stepTex(n, d, k, '×'));

/**
 * The live sentence under the strips for cuts k1 and k2.
 * @param {Task} task
 * @param {number} k1
 * @param {number} k2
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function commonNote(task, k1, k2) {
  const d1 = task.b * k1;
  const d2 = task.d * k2;
  const f1 = fracRich(task.a * k1, d1);
  const f2 = fracRich(task.c * k2, d2);
  if (d1 === d2) {
    const extra =
      d1 === task.common
        ? ''
        : ` Mẫu số chung bé hơn là ${task.common} cũng được: em thử chia ít phần hơn.`;
    return {
      tone: 'ok',
      text: `Hai băng cùng có ${d1} phần. Quy đồng mẫu số được ${f1} và ${f2}, mẫu số chung là ${d1}.${extra}`,
    };
  }
  return {
    tone: 'info',
    text: `Băng trên có ${d1} phần, băng dưới có ${d2} phần. Em chia lại để hai băng có cùng số phần nhé.`,
  };
}

/**
 * Whether the task gives the common denominator: when it is neither of the
 * two denominators, as for 2/3 and 3/4 with 12.
 * @param {Task} task
 */
export const isGivenCommon = (task) => task.common !== task.b && task.common !== task.d;
