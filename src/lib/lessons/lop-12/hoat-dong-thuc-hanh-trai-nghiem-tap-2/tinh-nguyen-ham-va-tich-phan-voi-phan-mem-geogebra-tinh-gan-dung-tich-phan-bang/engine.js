/**
 * The trapezoid rule of the book: split [a; b] into n equal pieces of width
 * h = (b − a)/n, then
 *   ∫ f ≈ (b − a)/(2n) · [f(x0) + 2f(x1) + … + 2f(x(n−1)) + f(xn)],
 * with the error bound |E| ≤ (b − a)³·M/(12n²), M = max |f''| on [a; b],
 * and the least n that makes the bound smaller than a given accuracy ε.
 */

import { simpson } from '#lib/core/visuals/plot.js';

/** @typedef {(x: number) => number} Fn */

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   tex: string,
 *   ggb: string,
 *   f: Fn,
 *   a: number,
 *   b: number,
 *   aTex: string,
 *   bTex: string,
 *   exact: number,
 *   exactTex: string | null,
 *   m: number,
 *   mTex: string,
 *   win: { xMin: number, xMax: number, yMin: number, yMax: number },
 * }} Task
 */

/**
 * The functions the explorer offers, each on its interval, with the value of
 * its integral (exact when there is an elementary antiderivative, otherwise
 * computed numerically as GeoGebra's NIntegral does) and M = max |f''|.
 * @type {Task[]}
 */
export const TASKS = [
  {
    id: 'exp-over-x',
    label: 'eˣ/x',
    tex: '\\dfrac{e^x}{x}',
    ggb: 'exp(x)/x',
    f: (x) => Math.exp(x) / x,
    a: 1,
    b: 2,
    aTex: '1',
    bTex: '2',
    exact: simpson((x) => Math.exp(x) / x, 1, 2, 4000),
    exactTex: null,
    // f''(x) = eˣ(x² − 2x + 2)/x³ is positive on [1; 2] and largest at x = 1.
    m: Math.E,
    mTex: 'e',
    win: { xMin: 0, xMax: 2.5, yMin: 0, yMax: 4 },
  },
  {
    id: 'gauss',
    label: 'e^(−x²)',
    tex: 'e^{-x^2}',
    ggb: 'exp(-x^2)',
    f: (x) => Math.exp(-x * x),
    a: 0,
    b: 1,
    aTex: '0',
    bTex: '1',
    exact: simpson((x) => Math.exp(-x * x), 0, 1, 4000),
    exactTex: null,
    // f''(x) = (4x² − 2)e^(−x²); on [0; 1] its largest size is 2, at x = 0.
    m: 2,
    mTex: '2',
    win: { xMin: -0.25, xMax: 1.5, yMin: 0, yMax: 1.25 },
  },
  {
    id: 'inverse',
    label: '1/x',
    tex: '\\dfrac{1}{x}',
    ggb: '1/x',
    f: (x) => 1 / x,
    a: 1,
    b: 2,
    aTex: '1',
    bTex: '2',
    exact: Math.LN2,
    exactTex: '\\ln 2',
    // f''(x) = 2/x³, largest at x = 1.
    m: 2,
    mTex: '2',
    win: { xMin: 0, xMax: 2.5, yMin: 0, yMax: 1.5 },
  },
  {
    id: 'square',
    label: 'x²',
    tex: 'x^2',
    ggb: 'x^2',
    f: (x) => x * x,
    a: 0,
    b: 2,
    aTex: '0',
    bTex: '2',
    exact: 8 / 3,
    exactTex: '\\dfrac{8}{3}',
    m: 2,
    mTex: '2',
    win: { xMin: -0.5, xMax: 2.5, yMin: 0, yMax: 5 },
  },
  {
    id: 'sine',
    label: 'sin x',
    tex: '\\sin x',
    ggb: 'sin(x)',
    f: Math.sin,
    a: 0,
    b: Math.PI,
    aTex: '0',
    bTex: '\\pi',
    exact: 2,
    exactTex: '2',
    m: 1,
    mTex: '1',
    win: { xMin: -0.4, xMax: 3.6, yMin: -0.2, yMax: 1.3 },
  },
];

/**
 * The nodes x0 = a, x1, …, xn = b of n equal pieces of [a; b].
 * @param {number} a @param {number} b @param {number} n
 */
export function nodes(a, b, n) {
  const h = (b - a) / n;
  return Array.from({ length: n + 1 }, (_, i) => (i === n ? b : a + i * h));
}

/**
 * The trapezoid sum T_n of f on [a; b] and its n trapezoids.
 * @param {Fn} f @param {number} a @param {number} b @param {number} n
 */
export function trapezoid(f, a, b, n) {
  const xs = nodes(a, b, n);
  const ys = xs.map(f);
  let inner = 0;
  for (let i = 1; i < n; i++) inner += ys[i];
  const sum = ((b - a) / (2 * n)) * (ys[0] + 2 * inner + ys[n]);
  const traps = xs.slice(0, n).map((x0, i) => ({ x0, x1: xs[i + 1], y0: ys[i], y1: ys[i + 1] }));
  return { sum, xs, ys, traps };
}

/**
 * The trapezoid sum from values y0, …, yn measured at equal steps of width
 * h, as in a table of measurements.
 * @param {number[]} ys @param {number} h
 */
export function trapezoidFromValues(ys, h) {
  const n = ys.length - 1;
  let inner = 0;
  for (let i = 1; i < n; i++) inner += ys[i];
  return (h / 2) * (ys[0] + 2 * inner + ys[n]);
}

/**
 * The book's bound on the error: (b − a)³·M/(12n²).
 * @param {number} a @param {number} b @param {number} m @param {number} n
 */
export const errorBound = (a, b, m, n) => ((b - a) ** 3 * m) / (12 * n * n);

/**
 * The least natural number n with (b − a)³·M/(12n²) < ε.
 * @param {number} a @param {number} b @param {number} m @param {number} eps
 */
export function leastN(a, b, m, eps) {
  const bound = Math.sqrt(((b - a) ** 3 * m) / (12 * eps));
  let n = Math.max(1, Math.floor(bound));
  while (errorBound(a, b, m, n) >= eps) n++;
  return n;
}
