/**
 * Powers a^x with an integer, a rational and a real exponent, the way the
 * book builds them: a^n as a product (and a^(−n) = 1/aⁿ), a^(m/n) as the
 * n-th root of a^m, and a^α for an irrational α as the limit of a^(r_k) where
 * r_k are the decimal truncations of α.
 */

import { numTex, tidy } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { powerBase } from '../_shared/bases.js';
import { exactValueTex } from '../_shared/values.js';

/** @typedef {import('../_shared/bases.js').Base} Base */

/** Integer exponents the slider offers, and rational ones m/n. */
export const N_MIN = -3;
export const N_MAX = 3;
export const M_MIN = -6;
export const M_MAX = 6;
export const DENOMINATORS = [2, 3, 4];
/** Digits after the comma for the truncations of α. */
export const DIGITS_MAX = 6;

/** The irrational exponents of the real mode. */
export const IRRATIONALS = [
  { id: 'sqrt2', value: Math.SQRT2, tex: '\\sqrt{2}', text: 'căn 2' },
  { id: 'pi', value: Math.PI, tex: '\\pi', text: 'pi' },
];

/**
 * A rational value as TeX: '8', '-2', '\\dfrac{1}{8}'; a value that is no
 * small fraction is rounded.
 * @param {number} v
 */
export const exactTex = (v) => exactValueTex(v) ?? numTex(v, 4);

/**
 * The integer power aⁿ written out: '2^3 = 2 \\cdot 2 \\cdot 2 = 8',
 * '2^0 = 1', '2^{-2} = \\dfrac{1}{2^2} = \\dfrac{1}{4}'.
 * @param {Base} base @param {number} n
 */
export function integerTex(base, n) {
  const b = powerBase(base);
  const value = exactTex(base.value ** n);
  if (n === 0) return `${b}^0 = 1`;
  if (n === 1) return `${b}^1 = ${value}`;
  if (n > 0) return `${b}^{${n}} = ${Array(n).fill(b).join(' \\cdot ')} = ${value}`;
  return `${b}^{${n}} = \\dfrac{1}{${b}^{${-n}}} = ${value}`;
}

/**
 * The rational power a^(m/n) written the book's way, the fraction first in
 * lowest terms: '2^{\\frac{3}{2}} = \\sqrt{2^3} \\approx 2{,}8284'. A whole
 * exponent (m a multiple of n) reduces to an integer power.
 * @param {Base} base @param {number} m @param {number} n
 */
export function rationalTex(base, m, n) {
  const b = powerBase(base);
  const g = gcd(Math.abs(m), n);
  const p = m / g;
  const q = n / g;
  const value = base.value ** (m / n);
  if (q === 1) {
    const head = g === 1 ? '' : `${b}^{\\frac{${m}}{${n}}} = `;
    return `${head}${b}^{${p}} = ${exactTex(value)}`;
  }
  const sign = p < 0 ? '-' : '';
  const reduced = g === 1 ? '' : ` = ${b}^{${sign}\\frac{${Math.abs(p)}}{${q}}}`;
  const root = q === 2 ? `\\sqrt{${b}^{${p}}}` : `\\sqrt[${q}]{${b}^{${p}}}`;
  return `${b}^{${sign}\\frac{${Math.abs(m)}}{${n}}}${reduced} = ${root} \\approx ${numTex(value, 4)}`;
}

/**
 * α cut after k digits: truncate(√2, 3) = 1.414.
 * @param {number} alpha @param {number} k
 */
export function truncate(alpha, k) {
  const scale = 10 ** k;
  return tidy(Math.floor(alpha * scale + 1e-9) / scale, k);
}

/**
 * The approximations r₀, r₁, …, r_k of α and the powers a^(r_i).
 * @param {Base} base @param {number} alpha @param {number} k
 * @returns {Array<{ r: number, value: number }>}
 */
export function approximations(base, alpha, k) {
  return Array.from({ length: k + 1 }, (_, i) => {
    const r = truncate(alpha, i);
    return { r, value: base.value ** r };
  });
}

/**
 * The window of the graph for a base: x from −3,3 to 3,6 and y high enough
 * for every power shown, a^π included.
 * @param {Base} base
 */
export function windowFor(base) {
  const top = Math.max(base.value ** Math.PI, base.value ** N_MAX, base.value ** N_MIN);
  return { xMin: -3.3, xMax: 3.6, yMin: -top * 0.08, yMax: top * 1.08 };
}
