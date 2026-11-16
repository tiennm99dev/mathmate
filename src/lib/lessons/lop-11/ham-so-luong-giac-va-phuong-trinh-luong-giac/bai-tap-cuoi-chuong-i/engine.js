/**
 * The "mark the solutions on the circle" task of the chapter review: an
 * equation, the 24 points of the unit circle at multiples of 15°, and the
 * check of the points the learner marked.
 */

import { mod, trigValue } from '../_shared/trig.js';

/** @typedef {import('../_shared/trig.js').TrigName} TrigName */

/** The candidate points, every 15°. */
export const POINTS = Array.from({ length: 24 }, (_, i) => i * 15);

/**
 * @typedef {{
 *   id: string;
 *   label: string;
 *   name: TrigName;
 *   c: number;
 *   m: number;
 *   tex: string;
 *   formula: string;
 * }} CircleEquation
 */

/** @type {CircleEquation[]} */
export const EQUATIONS = [
  {
    id: 'sin-half',
    label: 'sin x = 1/2',
    name: 'sin',
    c: 1,
    m: 0.5,
    tex: '\\sin x = \\dfrac{1}{2}',
    formula: 'x = \\dfrac{\\pi}{6} + k2\\pi,\\ x = \\dfrac{5\\pi}{6} + k2\\pi',
  },
  {
    id: 'cos-root2',
    label: 'cos x = −√2/2',
    name: 'cos',
    c: 1,
    m: -Math.SQRT2 / 2,
    tex: '\\cos x = -\\dfrac{\\sqrt{2}}{2}',
    formula: 'x = \\pm\\dfrac{3\\pi}{4} + k2\\pi',
  },
  {
    id: 'tan-root3',
    label: 'tan x = √3',
    name: 'tan',
    c: 1,
    m: Math.sqrt(3),
    tex: '\\tan x = \\sqrt{3}',
    formula: 'x = \\dfrac{\\pi}{3} + k\\pi',
  },
  {
    id: 'cot-minus1',
    label: 'cot x = −1',
    name: 'cot',
    c: 1,
    m: -1,
    tex: '\\cot x = -1',
    formula: 'x = \\dfrac{3\\pi}{4} + k\\pi',
  },
  {
    id: 'sin-minus1',
    label: 'sin x = −1',
    name: 'sin',
    c: 1,
    m: -1,
    tex: '\\sin x = -1',
    formula: 'x = -\\dfrac{\\pi}{2} + k2\\pi',
  },
  {
    id: 'cos2x-half',
    label: 'cos 2x = 1/2',
    name: 'cos',
    c: 2,
    m: 0.5,
    tex: '\\cos 2x = \\dfrac{1}{2}',
    formula: 'x = \\pm\\dfrac{\\pi}{6} + k\\pi',
  },
  {
    id: 'sin2x-zero',
    label: 'sin 2x = 0',
    name: 'sin',
    c: 2,
    m: 0,
    tex: '\\sin 2x = 0',
    formula: 'x = \\dfrac{k\\pi}{2}',
  },
  {
    id: 'tan3x-one',
    label: 'tan 3x = 1',
    name: 'tan',
    c: 3,
    m: 1,
    tex: '\\tan 3x = 1',
    formula: 'x = \\dfrac{\\pi}{12} + \\dfrac{k\\pi}{3}',
  },
];

/**
 * The candidate points (degrees in [0°; 360°)) whose angle solves `eq`.
 * @param {CircleEquation} eq
 */
export function solutionPoints(eq) {
  return POINTS.filter((d) => {
    const v = trigValue(eq.name, eq.c * d);
    return !Number.isNaN(v) && Math.abs(v - eq.m) < 1e-9;
  });
}

/**
 * Compares the marked points with the solution points.
 * @param {CircleEquation} eq
 * @param {number[]} marked
 */
export function checkMarks(eq, marked) {
  const want = solutionPoints(eq);
  const set = new Set(marked.map((d) => mod(d, 360)));
  const missing = want.filter((d) => !set.has(d));
  const extra = [...set].filter((d) => !want.includes(d)).sort((a, b) => a - b);
  return { ok: missing.length === 0 && extra.length === 0, missing, extra, want };
}
