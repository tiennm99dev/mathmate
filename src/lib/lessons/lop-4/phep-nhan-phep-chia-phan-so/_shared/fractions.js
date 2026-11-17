/**
 * Fractions for multiplying and dividing the grade 4 way: written as a
 * stacked TeX fraction or as plain text, read aloud as "năm phần sáu" (a
 * denominator of 4 is read "tư"), reduced to lowest terms, and the working
 * of a product or a quotient written as the book does: numerator times
 * numerator over denominator times denominator, and division as
 * multiplication by the reversed fraction. Pure and DOM-free.
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
 * Whether two fractions have the same value.
 * @param {Frac} f
 * @param {Frac} g
 */
export const sameValue = (f, g) => f.n * g.d === g.n * f.d;

/**
 * The tail of a result: ' = \dfrac{1}{2}' when n/d reduces, else ''.
 * @param {number} n
 * @param {number} d
 */
export function reducedTail(n, d) {
  const r = reduce(n, d);
  return r.d === d && r.n === n ? '' : ` = ${fracTex(r.n, r.d)}`;
}

/**
 * TeX of the working of a product, the book's way: '\dfrac{4}{5} \times
 * \dfrac{2}{3} = \dfrac{4 \times 2}{5 \times 3} = \dfrac{8}{15}', reduced at
 * the end when it can be. A whole number factor is written as it is and
 * taken as having denominator 1.
 * @param {Frac} f
 * @param {Frac} g
 */
export function productTex(f, g) {
  const n = f.n * g.n;
  const d = f.d * g.d;
  return `${fracTex(f.n, f.d)} \\times ${fracTex(g.n, g.d)} = \\dfrac{${f.n} \\times ${g.n}}{${f.d} \\times ${g.d}} = ${fracTex(n, d)}${reducedTail(n, d)}`;
}

/**
 * TeX of the working of a quotient, the book's way: '\dfrac{3}{7} :
 * \dfrac{5}{8} = \dfrac{3}{7} \times \dfrac{8}{5} = \dfrac{24}{35}', reduced
 * at the end when it can be.
 * @param {Frac} f
 * @param {Frac} g the divisor, not zero
 */
export function quotientTex(f, g) {
  const n = f.n * g.d;
  const d = f.d * g.n;
  return `${fracTex(f.n, f.d)} : ${fracTex(g.n, g.d)} = ${fracTex(f.n, f.d)} \\times ${fracTex(g.d, g.n)} = ${fracTex(n, d)}${reducedTail(n, d)}`;
}
