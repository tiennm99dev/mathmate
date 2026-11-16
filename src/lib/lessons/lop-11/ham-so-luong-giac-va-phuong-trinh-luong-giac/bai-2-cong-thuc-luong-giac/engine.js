/**
 * The formulas the widget checks on the unit circle. Each one has a left
 * side, read straight off the point C at angle a ± b (or 2a), and a right
 * side, computed only from the coordinates of A (angle a) and B (angle b).
 */

import { formatFixed, texNumber, tidy } from '#lib/core/number-format.js';

const RAD = Math.PI / 180;

/**
 * cos and sin of `deg`, binary noise rounded away.
 * @param {number} deg
 */
export function coords(deg) {
  return { cos: tidy(Math.cos(deg * RAD), 12), sin: tidy(Math.sin(deg * RAD), 12) };
}

/**
 * A value as TeX with exactly four decimals: '0{,}9659', '-0{,}2588'.
 * @param {number} v
 */
export function fourTex(v) {
  return texNumber(formatFixed(tidy(v, 9), 4)).replace('−', '-');
}

/** @param {number} v */
function operandTex(v) {
  const t = fourTex(v);
  return t.startsWith('-') ? `(${t})` : t;
}

/**
 * @typedef {{
 *   id: string;
 *   label: string;
 *   two: boolean;
 *   axis: 'cos' | 'sin';
 *   angle: (a: number, b: number) => number;
 *   lhsTex: string;
 *   rhsTex: string;
 *   rhs: (a: number, b: number) => number;
 *   rhsNumbers: (a: number, b: number) => string;
 * }} Formula
 */

/** @type {Formula[]} */
export const FORMULAS = [
  {
    id: 'cos-minus',
    label: 'cos(a − b)',
    two: true,
    axis: 'cos',
    angle: (a, b) => a - b,
    lhsTex: '\\cos(a - b)',
    rhsTex: '\\cos a\\cos b + \\sin a\\sin b',
    rhs: (a, b) => coords(a).cos * coords(b).cos + coords(a).sin * coords(b).sin,
    rhsNumbers: (a, b) =>
      `${operandTex(coords(a).cos)} \\cdot ${operandTex(coords(b).cos)} + ${operandTex(coords(a).sin)} \\cdot ${operandTex(coords(b).sin)}`,
  },
  {
    id: 'cos-plus',
    label: 'cos(a + b)',
    two: true,
    axis: 'cos',
    angle: (a, b) => a + b,
    lhsTex: '\\cos(a + b)',
    rhsTex: '\\cos a\\cos b - \\sin a\\sin b',
    rhs: (a, b) => coords(a).cos * coords(b).cos - coords(a).sin * coords(b).sin,
    rhsNumbers: (a, b) =>
      `${operandTex(coords(a).cos)} \\cdot ${operandTex(coords(b).cos)} - ${operandTex(coords(a).sin)} \\cdot ${operandTex(coords(b).sin)}`,
  },
  {
    id: 'sin-minus',
    label: 'sin(a − b)',
    two: true,
    axis: 'sin',
    angle: (a, b) => a - b,
    lhsTex: '\\sin(a - b)',
    rhsTex: '\\sin a\\cos b - \\cos a\\sin b',
    rhs: (a, b) => coords(a).sin * coords(b).cos - coords(a).cos * coords(b).sin,
    rhsNumbers: (a, b) =>
      `${operandTex(coords(a).sin)} \\cdot ${operandTex(coords(b).cos)} - ${operandTex(coords(a).cos)} \\cdot ${operandTex(coords(b).sin)}`,
  },
  {
    id: 'sin-plus',
    label: 'sin(a + b)',
    two: true,
    axis: 'sin',
    angle: (a, b) => a + b,
    lhsTex: '\\sin(a + b)',
    rhsTex: '\\sin a\\cos b + \\cos a\\sin b',
    rhs: (a, b) => coords(a).sin * coords(b).cos + coords(a).cos * coords(b).sin,
    rhsNumbers: (a, b) =>
      `${operandTex(coords(a).sin)} \\cdot ${operandTex(coords(b).cos)} + ${operandTex(coords(a).cos)} \\cdot ${operandTex(coords(b).sin)}`,
  },
  {
    id: 'sin-double',
    label: 'sin 2a',
    two: false,
    axis: 'sin',
    angle: (a) => 2 * a,
    lhsTex: '\\sin 2a',
    rhsTex: '2\\sin a\\cos a',
    rhs: (a) => 2 * coords(a).sin * coords(a).cos,
    rhsNumbers: (a) => `2 \\cdot ${operandTex(coords(a).sin)} \\cdot ${operandTex(coords(a).cos)}`,
  },
  {
    id: 'cos-double',
    label: 'cos 2a',
    two: false,
    axis: 'cos',
    angle: (a) => 2 * a,
    lhsTex: '\\cos 2a',
    rhsTex: '\\cos^2 a - \\sin^2 a',
    rhs: (a) => coords(a).cos ** 2 - coords(a).sin ** 2,
    rhsNumbers: (a) => `${operandTex(coords(a).cos)}^2 - ${operandTex(coords(a).sin)}^2`,
  },
];

/**
 * The left side of `f` at (a, b): the coordinate of the point C on its axis.
 * @param {Formula} f @param {number} a @param {number} b
 */
export function lhs(f, a, b) {
  return coords(f.angle(a, b))[f.axis];
}
