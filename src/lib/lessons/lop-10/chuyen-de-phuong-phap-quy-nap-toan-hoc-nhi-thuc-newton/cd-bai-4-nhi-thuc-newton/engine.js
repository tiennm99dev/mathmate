/**
 * Newton's binomial for any n: Pascal's triangle up to row TOP_ROW and the
 * general term $T_{k+1} = C_n^k a^{n-k} b^k$ of $(pu + qv)^n$, where u and v
 * are letters (or empty for a constant) and p, q integers.
 */

import { numTex } from '#lib/core/number-format.js';
import { choose, pascalRow } from '#lib/core/counting.js';

export { choose, pascalRow };

/** The last row the widget draws. */
export const TOP_ROW = 10;

/**
 * @typedef {object} Form
 * @property {string} id
 * @property {number} p coefficient of the first term
 * @property {string} u letter of the first term ('' for a constant)
 * @property {number} q coefficient of the second term
 * @property {string} v letter of the second term ('' for a constant)
 */

/** @type {Form[]} */
export const FORMS = [
  { id: 'ab', p: 1, u: 'a', q: 1, v: 'b' },
  { id: 'x-2y', p: 1, u: 'x', q: -2, v: 'y' },
  { id: '2x+1', p: 2, u: 'x', q: 1, v: '' },
  { id: '2-3x', p: 2, u: '', q: -3, v: 'x' },
];

/**
 * One term `c·letter` with its sign: (1, 'a') → 'a', (-2, 'y') → '-2y', (3, '') → '3'.
 * @param {number} c @param {string} letter
 */
function linearTex(c, letter) {
  if (letter === '') return numTex(c);
  if (c === 1) return letter;
  if (c === -1) return `-${letter}`;
  return `${numTex(c)}${letter}`;
}

/**
 * The binomial in brackets: `(a + b)`, `(x - 2y)`, `(2 - 3x)`.
 * @param {Form} f
 */
export function binomialTex(f) {
  const second = linearTex(Math.abs(f.q), f.v);
  return `(${linearTex(f.p, f.u)} ${f.q < 0 ? '-' : '+'} ${second})`;
}

/**
 * The coefficient of term k (0-based) of $(pu + qv)^n$: $C_n^k p^{n-k} q^k$.
 * @param {Form} f @param {number} n @param {number} k
 */
export function termCoef(f, n, k) {
  return choose(n, k) * f.p ** (n - k) * f.q ** k;
}

/**
 * A letter to a power: ('x', 3) → 'x^{3}', ('x', 1) → 'x', ('x', 0) or ('', 3) → ''.
 * @param {string} letter @param {number} power
 */
export function powerTex(letter, power) {
  if (letter === '' || power === 0) return '';
  return power === 1 ? letter : `${letter}^{${power}}`;
}

/**
 * Term k without its sign: '12x^{5}y', 'a^{4}', '64'.
 * @param {Form} f @param {number} n @param {number} k
 */
function termBody(f, n, k) {
  const c = Math.abs(termCoef(f, n, k));
  const letters = `${powerTex(f.u, n - k)}${powerTex(f.v, k)}`;
  if (letters === '') return numTex(c);
  return `${c === 1 ? '' : numTex(c)}${letters}`;
}

/**
 * Term k with its sign as a standalone expression: '-12x^{5}y'.
 * @param {Form} f @param {number} n @param {number} k
 */
export function termValueTex(f, n, k) {
  return `${termCoef(f, n, k) < 0 ? '-' : ''}${termBody(f, n, k)}`;
}

/**
 * The whole expansion as TeX, term `mark` coloured.
 * @param {Form} f @param {number} n @param {number} [mark]
 */
export function expansionTex(f, n, mark = -1) {
  const parts = Array.from({ length: n + 1 }, (_, k) => {
    const neg = termCoef(f, n, k) < 0;
    const raw = termBody(f, n, k);
    const body = k === mark ? `\\textcolor{#4338ca}{${raw}}` : raw;
    if (k === 0) return neg ? `-${body}` : body;
    return neg ? ` - ${body}` : ` + ${body}`;
  });
  return `${binomialTex(f)}^{${n}} = ${parts.join('')}`;
}

/**
 * One factor of the general term: 'x^{3}', '(-2y)^{2}', '2^{4}', '(-3x)'; '' for power 0.
 * @param {number} c @param {string} letter @param {number} power
 */
function factorTex(c, letter, power) {
  if (power === 0) return '';
  const inner = linearTex(c, letter);
  const plain = c === 1 || (letter === '' && c > 0);
  const base = plain ? inner : `(${inner})`;
  return power === 1 ? base : `${base}^{${power}}`;
}

/**
 * The general term worked out: 'T_{3} = C_{6}^{2} x^{4} (-2y)^{2} = 60x^{4}y^{2}'.
 * @param {Form} f @param {number} n @param {number} k
 */
export function generalTermTex(f, n, k) {
  const factors = [`C_{${n}}^{${k}}`, factorTex(f.p, f.u, n - k), factorTex(f.q, f.v, k)]
    .filter((x) => x !== '')
    .join(' \\cdot ');
  return `T_{${k + 1}} = ${factors} = ${termValueTex(f, n, k)}`;
}

/**
 * Where the number in the triangle comes from.
 * @param {number} n @param {number} k
 */
export function pascalText(n, k) {
  if (k === 0 || k === n) {
    return `Hai đầu mỗi hàng đều bằng $1$ vì $C_{${n}}^{0} = C_{${n}}^{${n}} = 1$.`;
  }
  const left = choose(n - 1, k - 1);
  const right = choose(n - 1, k);
  return `$C_{${n}}^{${k}} = C_{${n - 1}}^{${k - 1}} + C_{${n - 1}}^{${k}} = ${numTex(left)} + ${numTex(right)} = ${numTex(left + right)}$: số bên trong bằng tổng hai số đứng ngay trên nó.`;
}

/**
 * The sum of the coefficients, $(p + q)^n$ (put every letter equal to 1).
 * @param {Form} f @param {number} n
 */
export function coefSum(f, n) {
  return (f.p + f.q) ** n;
}

/**
 * The live sentence under the widget.
 * @param {Form} f @param {number} n @param {number} k
 */
export function feedbackText(f, n, k) {
  const sum = coefSum(f, n);
  const sumPart =
    f.id === 'ab'
      ? `Tổng các số của hàng $${n}$ là $C_{${n}}^{0} + \\dots + C_{${n}}^{${n}} = 2^{${n}} = ${numTex(sum)}$.`
      : `Tổng các hệ số của khai triển (thay các chữ bằng $1$) là $(${numTex(f.p)} ${f.q < 0 ? '-' : '+'} ${numTex(Math.abs(f.q))})^{${n}} = ${numTex(sum)}$.`;
  return `Khai triển có $${n + 1}$ số hạng. Số hạng thứ $${k + 1}$ ứng với $k = ${k}$, hệ số nhị thức $C_{${n}}^{${k}} = ${numTex(choose(n, k))}$. ${pascalText(n, k)} ${sumPart}`;
}
