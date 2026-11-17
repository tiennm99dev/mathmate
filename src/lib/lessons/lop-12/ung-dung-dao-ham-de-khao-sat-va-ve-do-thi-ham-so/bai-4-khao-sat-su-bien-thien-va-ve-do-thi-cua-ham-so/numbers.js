/**
 * Exact numbers for a function survey with integer coefficients: a value is
 * written as an integer or a fraction when it is one, else rounded with "≈";
 * the roots of a quadratic with integer coefficients are written exactly,
 * with a simplified square root, the way the book writes them.
 */

import { gcd } from '#lib/numtheory-engine/index.js';
import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
import { signedFracTex, signedFracText } from '#lib/core/algebra-text.js';

/**
 * @typedef {{ value: number, tex: string, text: string, exact: boolean }} Num
 *   `tex` and `text` write the value itself; when not `exact` they are rounded
 *   and the caller writes "≈" (`rel`) in front.
 */

/**
 * The fraction n/d (d ≤ maxDen) equal to v, or null.
 * @param {number} v @param {number} [maxDen]
 * @returns {[number, number] | null}
 */
export function asFraction(v, maxDen = 1000) {
  for (let d = 1; d <= maxDen; d++) {
    const n = Math.round(v * d);
    if (Math.abs(n / d - v) < 1e-9 * Math.max(1, Math.abs(v))) return [n, d];
  }
  return null;
}

/**
 * A computed value: exact as an integer or fraction (denominator up to
 * 1000), else rounded to two decimals.
 * @param {number} v
 * @returns {Num}
 */
export function num(v) {
  const f = asFraction(v);
  if (f)
    return {
      value: v,
      tex: signedFracTex(f[0], f[1]),
      text: signedFracText(f[0], f[1]),
      exact: true,
    };
  const r = tidy(v, 2);
  return { value: v, tex: numTex(r, 2), text: formatNumber(r, 2), exact: false };
}

/**
 * '=' for an exact value, '\approx' for a rounded one.
 * @param {Num} n
 */
export const rel = (n) => (n.exact ? '=' : '\\approx');

/**
 * The plain text of a value with '≈ ' in front when rounded.
 * @param {Num} n
 */
export const shown = (n) => (n.exact ? n.text : `≈ ${n.text}`);

/**
 * n = k²·r with r square-free.
 * @param {number} n a positive integer
 * @returns {[number, number]}
 */
export function surd(n) {
  let k = 1;
  let r = n;
  for (let p = 2; p * p <= r; p++) {
    while (r % (p * p) === 0) {
      r /= p * p;
      k *= p;
    }
  }
  return [k, r];
}

/**
 * The real roots of A·x² + B·x + C (integers, A ≠ 0), from small to large,
 * written exactly: an integer, a fraction or (−B ± k√r)/q reduced. A double
 * root is listed once.
 * @param {number} A @param {number} B @param {number} C
 * @returns {Num[]}
 */
export function quadRoots(A, B, C) {
  const disc = B * B - 4 * A * C;
  if (!Number.isFinite(disc) || disc < 0) return [];
  if (disc === 0) return [num(-B / (2 * A))];
  const [k, r] = surd(disc);
  const values = [(-B - Math.sqrt(disc)) / (2 * A), (-B + Math.sqrt(disc)) / (2 * A)].sort(
    (a, b) => a - b,
  );
  if (r === 1) return values.map((v) => num(v));
  // (−B ± k√r) / (2A), reduced by the common factor, denominator positive.
  let p = -B;
  let s = k;
  let q = 2 * A;
  const g = gcd(gcd(Math.abs(p), s), Math.abs(q)) || 1;
  p /= g;
  s /= g;
  q /= g;
  if (q < 0) {
    p = -p;
    q = -q;
  }
  // With q > 0, the minus sign gives the smaller root.
  const root = s === 1 ? `\\sqrt{${r}}` : `${s}\\sqrt{${r}}`;
  const rootText = s === 1 ? `√${r}` : `${s}√${r}`;
  return ['-', '+'].map((sign, i) => {
    const top = p === 0 ? `${sign === '-' ? '-' : ''}${root}` : `${p} ${sign} ${root}`;
    const topText =
      p === 0
        ? `${sign === '-' ? '−' : ''}${rootText}`
        : `${String(p).replace('-', '−')} ${sign === '-' ? '−' : '+'} ${rootText}`;
    return {
      value: values[i],
      tex: q === 1 ? top : `\\dfrac{${top}}{${q}}`,
      text: q === 1 ? topText : `(${topText})/${q}`,
      exact: true,
    };
  });
}

/**
 * A polynomial with integer coefficients, highest degree first, as TeX:
 * [1, -3, 0, 2] → 'x^3 - 3x^2 + 2'.
 * @param {number[]} coefs
 * @param {string} [name]
 */
export function polyTex(coefs, name = 'x') {
  const deg = coefs.length - 1;
  let out = '';
  coefs.forEach((c, i) => {
    if (c === 0) return;
    const e = deg - i;
    const mag = Math.abs(c);
    const power = e === 0 ? '' : e === 1 ? name : `${name}^${e}`;
    const body = e === 0 ? String(mag) : `${mag === 1 ? '' : mag}${power}`;
    if (out === '') out = `${c < 0 ? '-' : ''}${body}`;
    else out += ` ${c < 0 ? '-' : '+'} ${body}`;
  });
  return out || '0';
}

/**
 * The same as plain text, with the book's minus sign and superscripts:
 * 'x³ − 3x² + 2'.
 * @param {number[]} coefs
 */
export function polyText(coefs) {
  const SUP = ['', '', '²', '³', '⁴'];
  return polyTex(coefs)
    .replace(/\^(\d)/g, (_, d) => SUP[Number(d)])
    .replaceAll('-', '−');
}
