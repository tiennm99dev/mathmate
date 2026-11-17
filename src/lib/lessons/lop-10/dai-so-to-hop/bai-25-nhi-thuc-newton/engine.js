/**
 * Pascal's triangle and the binomial expansions of grade 10: pick a row n,
 * a place k and a binomial, and read the term $C_n^k a^{n-k} b^k$ of
 * $(a + b)^n$ or of $(px + q)^n$.
 */

import {
  chooseCount,
  combinationTex,
  expandCoefficients,
  pascalRow,
  polyTex,
  powerTex,
} from '../_shared/counting.js';

/** The rows the widget draws: 0 to 5, as far as the book expands. */
export const TOP_ROW = 5;

/**
 * @typedef {object} Form
 * @property {string} id
 * @property {number} p coefficient of x (0 for the letters a and b)
 * @property {number} q the constant
 */

/** @type {Form[]} */
export const FORMS = [
  { id: 'ab', p: 0, q: 0 },
  { id: 'x+1', p: 1, q: 1 },
  { id: 'x-2', p: 1, q: -2 },
  { id: '2x+1', p: 2, q: 1 },
  { id: '3x-1', p: 3, q: -1 },
];

/**
 * The binomial in brackets: `(a + b)`, `(x - 2)`, `(2x + 1)`.
 * @param {Form} form
 */
export function binomialTex(form) {
  if (form.p === 0) return '(a + b)';
  const x = form.p === 1 ? 'x' : `${form.p}x`;
  return `(${x} ${form.q < 0 ? '-' : '+'} ${Math.abs(form.q)})`;
}

/**
 * The terms of the expansion, each with its sign apart so one of them can be
 * coloured: `[{ neg: false, body: 'x^4' }, { neg: true, body: '8x^3' }, …]`.
 * @param {Form} form @param {number} n
 */
export function expansionTerms(form, n) {
  if (form.p === 0) {
    return pascalRow(n).map((c, k) => ({
      neg: false,
      body: `${c === 1 ? '' : c}${powerTex('a', n - k)}${powerTex('b', k)}` || '1',
    }));
  }
  return expandCoefficients(n, form.p, form.q).map((c, k) => ({
    neg: c < 0,
    body: polyTex([Math.abs(c), ...Array(n - k).fill(0)]),
  }));
}

/**
 * The whole expansion as TeX, with term `mark` coloured when given.
 * @param {Form} form @param {number} n @param {number} [mark]
 */
export function expansionTex(form, n, mark = -1) {
  const parts = expansionTerms(form, n).map((t, k) => {
    const body = k === mark ? `\\textcolor{#4338ca}{${t.body}}` : t.body;
    if (k === 0) return t.neg ? `-${body}` : body;
    return t.neg ? ` - ${body}` : ` + ${body}`;
  });
  return `${binomialTex(form)}^{${n}} = ${parts.join('')}`;
}

/**
 * One factor of a term: `x^3`, `(2x)^4`, `(-2)^2`, `3`; empty for power 0.
 * @param {string} base @param {number} power
 */
function factorTex(base, power) {
  if (power === 0) return '';
  return power === 1 ? base : `${base}^{${power}}`;
}

/**
 * Term k of the expansion worked out: `C_{4}^{1} \cdot x^{3} \cdot (-2) = -8x^3`.
 * @param {Form} form @param {number} n @param {number} k
 */
export function termTex(form, n, k) {
  const c = chooseCount(n, k);
  if (form.p === 0) {
    const letters = `${powerTex('a', n - k)}${powerTex('b', k)}`;
    const value = `${c === 1 ? '' : c}${letters}` || '1';
    return `C_{${n}}^{${k}}${letters} = ${value}`;
  }
  const xBase = form.p === 1 ? 'x' : `(${form.p}x)`;
  const qBase = form.q < 0 ? `(${form.q})` : String(form.q);
  const factors = [`C_{${n}}^{${k}}`, factorTex(xBase, n - k), factorTex(qBase, k)].filter(
    (f) => f !== '',
  );
  const coef = expandCoefficients(n, form.p, form.q)[k];
  return `${factors.join(' \\cdot ')} = ${polyTex([coef, ...Array(n - k).fill(0)])}`;
}

/**
 * Where the number in the triangle comes from, in words with TeX.
 * @param {number} n @param {number} k
 */
export function pascalText(n, k) {
  if (k === 0 || k === n) {
    return `Hai đầu mỗi hàng đều bằng $1$ vì $C_{${n}}^{0} = C_{${n}}^{${n}} = 1$.`;
  }
  const left = chooseCount(n - 1, k - 1);
  const right = chooseCount(n - 1, k);
  return `$C_{${n}}^{${k}} = C_{${n - 1}}^{${k - 1}} + C_{${n - 1}}^{${k}} = ${left} + ${right} = ${left + right}$: mỗi số bên trong bằng tổng hai số đứng ngay trên nó.`;
}

/**
 * The live sentence under the triangle.
 * @param {Form} form @param {number} n @param {number} k
 */
export function feedbackText(form, n, k) {
  if (n === 0) return 'Hàng $0$ chỉ có số $1$: mọi số khác $0$ luỹ thừa $0$ đều bằng $1$.';
  const sum = 2 ** n;
  return `Hàng ${n} cho các hệ số của $(a + b)^{${n}} = ${combinationTex(n)}$. Số hạng thứ ${k + 1}: $${termTex(form, n, k)}$. ${pascalText(n, k)} Tổng các số của hàng là $2^{${n}} = ${sum}$.`;
}
