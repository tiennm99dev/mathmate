/**
 * Fractions for adding and subtracting the grade 4 way: written as a
 * stacked TeX fraction, read aloud as "năm phần sáu" (a denominator of 4 is
 * read "tư"), reduced to lowest terms, and brought to the larger
 * denominator when it is a multiple of the other one, as the book does.
 * Pure and DOM-free.
 */
import { readWhole } from '#lib/core/kid/whole-numbers.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {{ n: number, d: number }} Frac */

/**
 * TeX of a fraction, without dollars: '\dfrac{3}{4}'; a whole number when
 * the denominator is 1.
 * @param {number} n
 * @param {number} d
 */
export const fracTex = (n, d) => (d === 1 ? `${n}` : `\\dfrac{${n}}{${d}}`);

/**
 * Inline rich text of a fraction: '$\dfrac{3}{4}$'.
 * @param {number} n
 * @param {number} d
 */
export const fracRich = (n, d) => `$${fracTex(n, d)}$`;

/**
 * Plain text of a fraction, for kid prompts and feedback: '3/4', or '2'.
 * @param {number} n
 * @param {number} d
 */
export const fracText = (n, d) => (d === 1 ? `${n}` : `${n}/${d}`);

/**
 * How the book reads a fraction: 5/6 is "năm phần sáu", 3/4 "ba phần tư".
 * @param {number} n
 * @param {number} d
 */
export const fracWords = (n, d) =>
  d === 1 ? readWhole(n) : `${readWhole(n)} phần ${d === 4 ? 'tư' : readWhole(d)}`;

/**
 * The fraction in lowest terms.
 * @param {number} n
 * @param {number} d
 * @returns {Frac}
 */
export function reduce(n, d) {
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}

/**
 * The common denominator the grade 4 book uses for two denominators: the
 * larger one, when it is a multiple of the smaller; null otherwise.
 * @param {number} b
 * @param {number} d
 */
export function commonOf(b, d) {
  const big = Math.max(b, d);
  return big % b === 0 && big % d === 0 ? big : null;
}

/**
 * TeX of the step "multiply both terms by k":
 * '\dfrac{3}{4} = \dfrac{3 \times 2}{4 \times 2} = \dfrac{6}{8}', or the
 * fraction alone when k is 1.
 * @param {number} n
 * @param {number} d
 * @param {number} k
 */
export const scaleTex = (n, d, k) =>
  k === 1
    ? fracTex(n, d)
    : `${fracTex(n, d)} = \\dfrac{${n} \\times ${k}}{${d} \\times ${k}} = ${fracTex(n * k, d * k)}`;

/**
 * The tail of a result: ' = \dfrac{1}{2}' when n/d reduces, else ''.
 * @param {number} n
 * @param {number} d
 */
export function reducedTail(n, d) {
  const r = reduce(n, d);
  return r.d === d ? '' : ` = ${fracTex(r.n, r.d)}`;
}

/**
 * The working of a/b ± c/d the book's way: '\dfrac{3}{5} + \dfrac{1}{10} =
 * \dfrac{6}{10} + \dfrac{1}{10} = \dfrac{7}{10}', each fraction first
 * written with `denominator`, and the result reduced at the end when it
 * can be.
 * @param {Frac} f
 * @param {Frac} g
 * @param {'+' | '-'} op
 * @param {number} denominator a common multiple of both denominators
 */
export function workingTex(f, g, op, denominator) {
  const A = (f.n * denominator) / f.d;
  const C = (g.n * denominator) / g.d;
  const R = op === '+' ? A + C : A - C;
  const head = `${fracTex(f.n, f.d)} ${op} ${fracTex(g.n, g.d)}`;
  const same = f.d === denominator && g.d === denominator;
  const middle = same ? '' : ` = ${fracTex(A, denominator)} ${op} ${fracTex(C, denominator)}`;
  return `${head}${middle} = ${fracTex(R, denominator)}${reducedTail(R, denominator)}`;
}
