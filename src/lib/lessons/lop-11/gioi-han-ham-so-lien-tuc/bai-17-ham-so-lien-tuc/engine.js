/**
 * Continuity at a joining point, and the intermediate value theorem.
 *
 * Each family is a function given by two formulas (or a formula and a
 * single value) joined at x₀, with a parameter m. It is continuous at x₀
 * exactly when the limit from the left, the limit from the right and the
 * value f(x₀) agree; the pen then draws the graph without lifting.
 *
 * `bisect` halves an interval [a; b] on which f changes sign, keeping the
 * half where it still changes sign: by the intermediate value theorem a
 * root stays inside.
 */

import { numTex, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {object} Family
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {(m: number) => string} tex the function as TeX for this m
 * @property {number} x0
 * @property {(m: number) => (x: number) => number} at f for this m
 * @property {(m: number) => { left: number, right: number, value: number }} join
 * @property {number} fit the m that makes f continuous at x₀
 * @property {{ xMin: number, xMax: number, yMin: number, yMax: number }} view
 */

/** @param {number} m TeX of '+ m' after a term: ' + 2{,}5', ' - 1', or nothing for 0 */
const plusTex = (m) => (m === 0 ? '' : ` ${m < 0 ? '-' : '+'} ${numTex(Math.abs(m))}`);

/** @type {Family[]} */
export const FAMILIES = [
  {
    id: 'value',
    label: 'Gán giá trị tại x₀',
    tex: (m) =>
      `f(x) = \\begin{cases} \\dfrac{x^2 - 4}{x - 2} & \\text{nếu } x \\ne 2 \\\\ ${numTex(m)} & \\text{nếu } x = 2 \\end{cases}`,
    x0: 2,
    at: (m) => (x) => (x === 2 ? m : (x * x - 4) / (x - 2)),
    join: (m) => ({ left: 4, right: 4, value: m }),
    fit: 4,
    view: { xMin: -1, xMax: 5, yMin: -2, yMax: 8 },
  },
  {
    id: 'pieces',
    label: 'Nối hai công thức',
    tex: (m) =>
      `f(x) = \\begin{cases} x + 1 & \\text{nếu } x \\le 1 \\\\ -x^2${plusTex(m)} & \\text{nếu } x > 1 \\end{cases}`,
    x0: 1,
    at: (m) => (x) => (x <= 1 ? x + 1 : -x * x + m),
    join: (m) => ({ left: 2, right: tidy(m - 1), value: 2 }),
    fit: 3,
    view: { xMin: -2, xMax: 3, yMin: -4, yMax: 6 },
  },
];

/** The parameter values the slider offers. */
export const M_MIN = -2;
export const M_MAX = 6;
export const M_STEP = 0.5;

/**
 * Whether the family is continuous at x₀ for this m.
 * @param {Family} fam @param {number} m
 */
export function isContinuous(fam, m) {
  const { left, right, value } = fam.join(m);
  return left === right && right === value;
}

/**
 * @typedef {{ a: number, b: number, c: number, fc: number }} Halving
 */

/**
 * One halving step: c is the midpoint, and the new interval is the half on
 * which f still changes sign (or [c; c] when f(c) = 0).
 * @param {(x: number) => number} f
 * @param {number} a @param {number} b with f(a)·f(b) < 0
 * @returns {Halving & { next: [number, number] }}
 */
export function bisect(f, a, b) {
  const c = tidy((a + b) / 2, 12);
  const fc = f(c);
  /** @type {[number, number]} */
  const next = fc === 0 ? [c, c] : Math.sign(fc) === Math.sign(f(a)) ? [c, b] : [a, c];
  return { a, b, c, fc, next };
}

/** The function of the intermediate value widget, f(x) = x³ + x − 1. */
export const ivtF = (/** @type {number} */ x) => x ** 3 + x - 1;
