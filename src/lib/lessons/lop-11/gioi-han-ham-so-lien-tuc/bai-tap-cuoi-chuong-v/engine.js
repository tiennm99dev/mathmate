/**
 * Limits of the form 0/0 for the zoom check of the chapter review: the
 * learner works out the limit by hand, types it, and zooms in on the graph
 * near x₀ to see whether the curve closes in on the line y = L they typed.
 */

/**
 * @typedef {object} ZoomProblem
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the limit to find, as TeX
 * @property {number} x0
 * @property {(x: number) => number} f NaN at x₀
 * @property {number} limit
 */

/** @type {ZoomProblem[]} */
export const PROBLEMS = [
  {
    id: 'cube',
    label: 'Câu a',
    tex: '\\lim\\limits_{x \\to 2} \\dfrac{x^3 - 8}{x - 2}',
    x0: 2,
    f: (x) => (x === 2 ? NaN : (x ** 3 - 8) / (x - 2)),
    limit: 12,
  },
  {
    id: 'root',
    label: 'Câu b',
    tex: '\\lim\\limits_{x \\to 0} \\dfrac{\\sqrt{1 + x} - 1}{x}',
    x0: 0,
    f: (x) => (x === 0 || x < -1 ? NaN : (Math.sqrt(1 + x) - 1) / x),
    limit: 0.5,
  },
  {
    id: 'factor',
    label: 'Câu c',
    tex: '\\lim\\limits_{x \\to -1} \\dfrac{x^2 + 3x + 2}{x^2 - 1}',
    x0: -1,
    f: (x) => (x === -1 || x === 1 ? NaN : (x * x + 3 * x + 2) / (x * x - 1)),
    limit: -0.5,
  },
  {
    id: 'conjugate',
    label: 'Câu d',
    tex: '\\lim\\limits_{x \\to 3} \\dfrac{x - 3}{\\sqrt{x + 1} - 2}',
    x0: 3,
    f: (x) => (x === 3 || x < -1 ? NaN : (x - 3) / (Math.sqrt(x + 1) - 2)),
    limit: 4,
  },
];

/**
 * How far the typed value L is from f at x₀ ± h, the larger of the two
 * sides: it shrinks towards 0 as h shrinks exactly when L is the limit.
 * @param {ZoomProblem} p @param {number} guess @param {number} h
 */
export function miss(p, guess, h) {
  return Math.max(Math.abs(p.f(p.x0 - h) - guess), Math.abs(p.f(p.x0 + h) - guess));
}

/**
 * Whether the typed value is the limit (values are exact fractions here, so
 * a tiny tolerance only absorbs a typed decimal such as 0,5).
 * @param {ZoomProblem} p @param {number} guess
 */
export function isRight(p, guess) {
  return Math.abs(guess - p.limit) < 1e-9;
}
