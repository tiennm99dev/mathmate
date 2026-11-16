/**
 * The block staircase of an arithmetic sequence: column k holds u_k unit
 * blocks, and Gauss's pairing stacks a copy turned upside down on top, so
 * column k also holds u_{n+1−k} copied blocks and every column reaches
 * u_1 + u_n. The n columns then fill a rectangle of n(u_1 + u_n) blocks, twice
 * the sum S_n.
 */

import { arithmeticSum, arithmeticTerm } from '../_shared/sequence.js';

/**
 * @param {number} u1 first term (a positive whole number)
 * @param {number} d common difference (a whole number ≥ 0)
 * @param {number} n number of columns
 * @returns {{ columns: Array<{ own: number, copy: number }>, height: number, sum: number }}
 */
export function staircase(u1, d, n) {
  const columns = Array.from({ length: n }, (_, i) => ({
    own: arithmeticTerm(u1, d, i + 1),
    copy: arithmeticTerm(u1, d, n - i),
  }));
  return { columns, height: u1 + arithmeticTerm(u1, d, n), sum: arithmeticSum(u1, d, n) };
}
