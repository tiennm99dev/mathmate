/**
 * Fractions the grade 4 way: written as a stacked TeX fraction, read aloud as
 * "năm phần sáu" (a denominator of 4 is read "tư": "ba phần tư"), compared
 * with 1, and the common divisors a child can try from the times tables
 * (2 to 9) when reducing. Pure and DOM-free.
 */
import { gcd } from '#lib/numtheory-engine/index.js';
import * as kid from '#lib/core/kid/fractions.js';

export { denominatorWords } from '#lib/core/kid/fractions.js';

// This chapter teaches that a whole number is a fraction with denominator 1
// (5 = 5/1), so it always draws and reads that denominator.
const ONE = { keepOne: true };

/**
 * TeX of a fraction, drawn stacked even with denominator 1.
 * @param {number} n
 * @param {number} d
 */
export const fracTex = (n, d) => kid.fracTex(n, d, ONE);

/**
 * The fraction as rich text with inline TeX.
 * @param {number} n
 * @param {number} d
 */
export const fracRich = (n, d) => kid.fracRich(n, d, ONE);

/**
 * How the book reads a fraction, denominator 1 included ("năm phần một").
 * @param {number} n
 * @param {number} d
 */
export const fracWords = (n, d) => kid.fracWords(n, d, ONE);

/**
 * Where a fraction sits against 1: below, equal or above.
 * @param {number} n
 * @param {number} d
 * @returns {'<' | '=' | '>'}
 */
export const versusOne = (n, d) => (n < d ? '<' : n === d ? '=' : '>');

/**
 * Whether a fraction is in lowest terms (phân số tối giản).
 * @param {number} n
 * @param {number} d
 */
export const isSimplest = (n, d) => gcd(n, d) === 1;

/** The divisors a grade 4 child tries, from the times tables. */
export const TABLE_DIVISORS = /** @type {const} */ ([2, 3, 4, 5, 6, 7, 8, 9]);

/**
 * The numbers from 2 to 9 that divide both the numerator and the denominator.
 * @param {number} n
 * @param {number} d
 */
export const commonDivisors = (n, d) => TABLE_DIVISORS.filter((k) => n % k === 0 && d % k === 0);

/**
 * TeX of the step "multiply (or divide) both terms by k":
 * '\dfrac{3}{4} = \dfrac{3 \times 2}{4 \times 2} = \dfrac{6}{8}'.
 * @param {number} n
 * @param {number} d
 * @param {number} k
 * @param {'×' | ':'} op
 */
export function stepTex(n, d, k, op) {
  const sign = op === '×' ? '\\times' : ':';
  const n2 = op === '×' ? n * k : n / k;
  const d2 = op === '×' ? d * k : d / k;
  return `${fracTex(n, d)} = \\dfrac{${n} ${sign} ${k}}{${d} ${sign} ${k}} = ${fracTex(n2, d2)}`;
}
