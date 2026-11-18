/**
 * The functions of the antiderivative explorer: for each f, one
 * antiderivative F, the windows to draw F(x) + C and f in, and a point M that
 * exactly one curve of the family passes through (at C = `target.c`).
 */

import { tidy } from '#lib/core/number-format.js';

/**
 * @typedef {{
 *   id: string, label: string, fTex: string, FTex: string, ruleTex: string,
 *   f: (x: number) => number, F: (x: number) => number,
 *   win: import('#lib/core/visuals/plot.js').Window, dwin: import('#lib/core/visuals/plot.js').Window,
 *   lo: number, hi: number,
 *   target: { x: number, xTex: string, y: number, c: number },
 * }} Case
 */

/** @type {Case[]} */
export const CASES = [
  {
    id: 'linear',
    label: 'f(x) = 2x',
    fTex: '2x',
    FTex: 'x^2',
    ruleTex: '\\int 2x\\,\\mathrm{d}x = x^2 + C',
    f: (x) => 2 * x,
    F: (x) => x * x,
    win: { xMin: -3, xMax: 3, yMin: -4, yMax: 8 },
    dwin: { xMin: -3, xMax: 3, yMin: -6, yMax: 6 },
    lo: -2.5,
    hi: 2.5,
    target: { x: 1, xTex: '1', y: 3, c: 2 },
  },
  {
    id: 'cubic',
    label: 'f(x) = 3x² − 3',
    fTex: '3x^2 - 3',
    FTex: 'x^3 - 3x',
    ruleTex: '\\int (3x^2 - 3)\\,\\mathrm{d}x = x^3 - 3x + C',
    f: (x) => 3 * x * x - 3,
    F: (x) => x ** 3 - 3 * x,
    win: { xMin: -2.5, xMax: 2.5, yMin: -6, yMax: 6 },
    dwin: { xMin: -2.5, xMax: 2.5, yMin: -4, yMax: 8 },
    lo: -2,
    hi: 2,
    target: { x: 2, xTex: '2', y: 0, c: -2 },
  },
  {
    id: 'cos',
    label: 'f(x) = cos x',
    fTex: '\\cos x',
    FTex: '\\sin x',
    ruleTex: '\\int \\cos x\\,\\mathrm{d}x = \\sin x + C',
    f: Math.cos,
    F: Math.sin,
    win: { xMin: -4, xMax: 4, yMin: -4, yMax: 4 },
    dwin: { xMin: -4, xMax: 4, yMin: -2, yMax: 2 },
    lo: -3.5,
    hi: 3.5,
    target: { x: 0, xTex: '0', y: -1, c: -1 },
  },
  {
    id: 'exp',
    label: 'f(x) = eˣ',
    fTex: 'e^x',
    FTex: 'e^x',
    ruleTex: '\\int e^x\\,\\mathrm{d}x = e^x + C',
    f: Math.exp,
    F: Math.exp,
    win: { xMin: -3, xMax: 2, yMin: -3, yMax: 8 },
    dwin: { xMin: -3, xMax: 2, yMin: -1, yMax: 8 },
    lo: -2.5,
    hi: 1.8,
    target: { x: 0, xTex: '0', y: 3, c: 2 },
  },
];

/** The constants C of the faint family curves. */
export const FAMILY = [-3, -2, -1, 0, 1, 2, 3];

/**
 * The constant C that makes F(x) + C pass through (x0; y0).
 * @param {Case} c
 */
export const constantFor = (c) => tidy(c.target.y - c.F(c.target.x), 9);

/**
 * Whether the curve y = F(x) + C passes through the target point.
 * @param {Case} c @param {number} C
 */
export const passesTarget = (c, C) => Math.abs(c.F(c.target.x) + C - c.target.y) < 1e-9;

/**
 * Slope of a central difference of F at x; equal to f(x) for every curve of
 * the family, which is what the explorer shows.
 * @param {(x: number) => number} F @param {number} x
 */
export const slopeOf = (F, x, h = 1e-5) => (F(x + h) - F(x - h)) / (2 * h);
