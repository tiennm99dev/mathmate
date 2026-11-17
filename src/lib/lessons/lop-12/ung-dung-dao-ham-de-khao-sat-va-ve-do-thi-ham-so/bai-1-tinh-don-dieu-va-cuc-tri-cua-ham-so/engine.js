/**
 * The functions of the monotonicity explorer: each comes with its
 * derivative, the zeros of the derivative in order, the bảng biến thiên and
 * the windows for the graphs of f and f′. A point slides along the graph of
 * f; the sign of f′ under it says whether f goes up or down there, and a
 * zero of f′ is an extremum only when f′ changes sign.
 */

import { variationOf } from '../_shared/variation.js';

/**
 * @typedef {object} MonoCase
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex f(x) and f′(x), as TeX
 * @property {(x: number) => number} f
 * @property {(x: number) => number} df
 * @property {number[]} crit the zeros of f′, from left to right
 * @property {string[]} critTex the same, as TeX
 * @property {string[]} intervals TeX of the intervals between them, from −∞ to +∞
 * @property {import('../_shared/variation.js').Variation} table
 * @property {{ lo: number, hi: number }} range where the point may go
 * @property {import('../_shared/plot.js').Window} win the window of f
 * @property {import('../_shared/plot.js').Window} dwin the window of f′
 * @property {string} why rich text: why f′ keeps or changes its sign
 */

/** @type {MonoCase[]} */
export const CASES = [
  {
    id: 'cubic',
    label: 'x³ − 3x',
    tex: "f(x) = x^3 - 3x, \\quad f'(x) = 3x^2 - 3",
    f: (x) => x ** 3 - 3 * x,
    df: (x) => 3 * x * x - 3,
    crit: [-1, 1],
    critTex: ['-1', '1'],
    intervals: ['(-\\infty; -1)', '(-1; 1)', '(1; +\\infty)'],
    table: variationOf(
      [
        { x: '−∞', kind: 'end', y: '−∞' },
        { x: '−1', kind: 'zero', y: '2' },
        { x: '1', kind: 'zero', y: '−2' },
        { x: '+∞', kind: 'end', y: '+∞' },
      ],
      ['+', '-', '+'],
    ),
    range: { lo: -2.2, hi: 2.2 },
    win: { xMin: -2.5, xMax: 2.5, yMin: -4.5, yMax: 4.5 },
    dwin: { xMin: -2.5, xMax: 2.5, yMin: -4, yMax: 12 },
    why: "$f'(x) = 3(x - 1)(x + 1)$",
  },
  {
    id: 'quartic',
    label: 'x⁴ − 2x²',
    tex: "f(x) = x^4 - 2x^2, \\quad f'(x) = 4x^3 - 4x",
    f: (x) => x ** 4 - 2 * x * x,
    df: (x) => 4 * x ** 3 - 4 * x,
    crit: [-1, 0, 1],
    critTex: ['-1', '0', '1'],
    intervals: ['(-\\infty; -1)', '(-1; 0)', '(0; 1)', '(1; +\\infty)'],
    table: variationOf(
      [
        { x: '−∞', kind: 'end', y: '+∞' },
        { x: '−1', kind: 'zero', y: '−1' },
        { x: '0', kind: 'zero', y: '0' },
        { x: '1', kind: 'zero', y: '−1' },
        { x: '+∞', kind: 'end', y: '+∞' },
      ],
      ['-', '+', '-', '+'],
    ),
    range: { lo: -1.6, hi: 1.6 },
    win: { xMin: -1.8, xMax: 1.8, yMin: -1.5, yMax: 2 },
    dwin: { xMin: -1.8, xMax: 1.8, yMin: -10, yMax: 10 },
    why: "$f'(x) = 4x(x - 1)(x + 1)$",
  },
  {
    id: 'cube',
    label: 'x³',
    tex: "f(x) = x^3, \\quad f'(x) = 3x^2",
    f: (x) => x ** 3,
    df: (x) => 3 * x * x,
    crit: [0],
    critTex: ['0'],
    intervals: ['(-\\infty; 0)', '(0; +\\infty)'],
    table: variationOf(
      [
        { x: '−∞', kind: 'end', y: '−∞' },
        { x: '0', kind: 'zero', y: '0' },
        { x: '+∞', kind: 'end', y: '+∞' },
      ],
      ['+', '+'],
    ),
    range: { lo: -1.6, hi: 1.6 },
    win: { xMin: -1.8, xMax: 1.8, yMin: -4.5, yMax: 4.5 },
    dwin: { xMin: -1.8, xMax: 1.8, yMin: -1, yMax: 9 },
    why: "$f'(x) = 3x^2 \\ge 0$",
  },
];

/**
 * Where x sits among the zeros of f′: the index of the open interval that
 * holds it, or of the zero it is on.
 * @param {MonoCase} c
 * @param {number} x
 * @returns {{ interval: number } | { zero: number }}
 */
export function locate(c, x) {
  const at = c.crit.findIndex((z) => Math.abs(z - x) < 1e-9);
  if (at !== -1) return { zero: at };
  return { interval: c.crit.filter((z) => z < x).length };
}

/**
 * What the zero of f′ with index `i` is: a cực đại (f′ goes from + to −),
 * a cực tiểu (− to +) or no extremum (no sign change).
 * @param {MonoCase} c
 * @param {number} i
 * @returns {'max' | 'min' | 'none'}
 */
export function zeroKind(c, i) {
  const left = c.table.signs[i];
  const right = c.table.signs[i + 1];
  if (left === right) return 'none';
  return left === '+' ? 'max' : 'min';
}

/**
 * The parts of the x-range where f goes up and where it goes down, for
 * colouring the graph: consecutive zeros of f′ cut [lo, hi] into pieces.
 * @param {MonoCase} c
 * @param {number} lo @param {number} hi
 * @returns {Array<{ from: number, to: number, up: boolean }>}
 */
export function pieces(c, lo, hi) {
  const cuts = [lo, ...c.crit.filter((z) => z > lo && z < hi), hi];
  return cuts.slice(1).map((to, i) => ({
    from: cuts[i],
    to,
    up: c.table.signs[c.crit.filter((z) => z <= cuts[i]).length] === '+',
  }));
}
