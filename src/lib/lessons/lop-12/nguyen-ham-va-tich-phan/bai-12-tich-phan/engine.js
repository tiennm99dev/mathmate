/**
 * The integrals of the Riemann sum explorer: for each f an antiderivative F,
 * the interval [a; b], the exact value F(b) − F(a) as TeX, and the window to
 * draw them in.
 */

import { riemann } from '../_shared/riemann.js';

/**
 * @typedef {{
 *   id: string, label: string, fTex: string, FTex: string,
 *   f: (x: number) => number, F: (x: number) => number,
 *   a: number, b: number, aTex: string, bTex: string, valueTex: string,
 *   win: import('#lib/core/visuals/plot.js').Window,
 * }} Case
 */

/** @type {Case[]} */
export const CASES = [
  {
    id: 'square',
    label: 'x² trên [0; 2]',
    fTex: 'x^2',
    FTex: '\\dfrac{x^3}{3}',
    f: (x) => x * x,
    F: (x) => x ** 3 / 3,
    a: 0,
    b: 2,
    aTex: '0',
    bTex: '2',
    valueTex: '\\dfrac{8}{3}',
    win: { xMin: -0.5, xMax: 2.5, yMin: -0.5, yMax: 4.5 },
  },
  {
    id: 'sin',
    label: 'sin x trên [0; π]',
    fTex: '\\sin x',
    FTex: '-\\cos x',
    f: Math.sin,
    F: (x) => -Math.cos(x),
    a: 0,
    b: Math.PI,
    aTex: '0',
    bTex: '\\pi',
    valueTex: '2',
    win: { xMin: -0.4, xMax: 3.6, yMin: -0.3, yMax: 1.3 },
  },
  {
    id: 'inverse',
    label: '1/x trên [1; 3]',
    fTex: '\\dfrac{1}{x}',
    FTex: '\\ln x',
    f: (x) => 1 / x,
    F: Math.log,
    a: 1,
    b: 3,
    aTex: '1',
    bTex: '3',
    valueTex: '\\ln 3',
    win: { xMin: 0, xMax: 3.5, yMin: -0.2, yMax: 1.4 },
  },
  {
    id: 'signed',
    label: 'x² − 1 trên [0; 2]',
    fTex: 'x^2 - 1',
    FTex: '\\dfrac{x^3}{3} - x',
    f: (x) => x * x - 1,
    F: (x) => x ** 3 / 3 - x,
    a: 0,
    b: 2,
    aTex: '0',
    bTex: '2',
    valueTex: '\\dfrac{2}{3}',
    win: { xMin: -0.5, xMax: 2.5, yMin: -1.5, yMax: 3.5 },
  },
];

/** @typedef {import('../_shared/riemann.js').Rule} Rule */

/** The ways of choosing each rectangle's height. */
export const RULES = /** @type {const} */ ([
  { value: 'left', label: 'Đầu trái' },
  { value: 'mid', label: 'Điểm giữa' },
  { value: 'right', label: 'Đầu phải' },
]);

/**
 * The exact integral F(b) − F(a) of a case.
 * @param {Case} c
 */
export const exactOf = (c) => c.F(c.b) - c.F(c.a);

/**
 * The Riemann sum of a case with n rectangles and its gap to the integral.
 * @param {Case} c @param {number} n @param {Rule} rule
 */
export function sumOf(c, n, rule) {
  const { rects, sum } = riemann(c.f, c.a, c.b, n, rule);
  return { rects, sum, error: Math.abs(sum - exactOf(c)) };
}
