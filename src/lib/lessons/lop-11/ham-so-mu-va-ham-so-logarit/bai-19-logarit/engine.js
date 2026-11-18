/**
 * The logarithm as the inverse of a power: a^α = b ⇔ log_a b = α, a
 * question maker for reading logarithms off powers, and the positions on a
 * slide rule, where lengths are decimal logarithms so that sliding one scale
 * along the other adds log a and log b and reads off log(ab).
 */

import { numTex, tidy } from '#lib/core/number-format.js';
import { int, pick } from '#lib/core/drill.js';
import { exactValueTex } from '../_shared/values.js';
import { logBase, powerBase } from '../_shared/bases.js';

/** @typedef {import('../_shared/bases.js').Base} Base */

/** The exponents of the converter, in halves. */
export const ALPHA_MIN = -3;
export const ALPHA_MAX = 4;
export const ALPHA_STEP = 0.5;

/**
 * An exponent as TeX: '3', '-2', '\\dfrac{1}{2}', '-\\dfrac{3}{2}'.
 * @param {number} alpha a whole number or a half
 */
export function exponentTex(alpha) {
  if (Number.isInteger(alpha)) return `${alpha}`;
  const top = Math.round(Math.abs(alpha) * 2);
  return `${alpha < 0 ? '-' : ''}\\dfrac{${top}}{2}`;
}

/**
 * The value a^α as TeX: exact when it is a fraction ('8', '\\dfrac{1}{4}'),
 * as a root when α is a half ('\\sqrt{8}'), else rounded.
 * @param {Base} base @param {number} alpha
 */
export function powerValueTex(base, alpha) {
  const v = base.value ** alpha;
  const exact = exactValueTex(v);
  if (exact !== null) return exact;
  if (!Number.isInteger(alpha)) {
    const whole = exactValueTex(base.value ** (2 * alpha));
    if (whole !== null) return `\\sqrt{${whole}}`;
  }
  return numTex(v, 4);
}

/**
 * Both sides of the converter: 'a^α = b' and 'log_a b = α'.
 * @param {Base} base @param {number} alpha
 */
export function convertTex(base, alpha) {
  const b = powerValueTex(base, alpha);
  const e = exponentTex(alpha);
  const pow = `${powerBase(base)}^{${e.replace('\\dfrac', '\\frac')}} = ${b}`;
  const name = base.id === '10' ? '\\log' : `\\log_{${logBase(base)}}`;
  return { pow, log: `${name} ${b} = ${e}` };
}

/**
 * A question "log_a b = ?" whose answer is a whole number or a half, with b
 * written exactly.
 * @param {() => number} rand
 * @param {Base[]} bases
 */
export function challenge(rand, bases) {
  const base = pick(rand, bases);
  const alpha = int(rand, -6, 8) / 2;
  return { base, alpha, ...convertTex(base, alpha) };
}

/**
 * Whether a typed answer is the logarithm.
 * @param {number | null} typed @param {number} alpha
 */
export const isLog = (typed, alpha) => typed !== null && tidy(typed, 9) === alpha;

/** Slide rule: length of one decade, in SVG units. */
export const DECADE = 170;

/**
 * The position of v on a slide-rule scale that starts at 1: DECADE · log v.
 * @param {number} v
 */
export const ruleX = (v) => DECADE * Math.log10(v);

/**
 * Where the moving scale is read: with its 1 set over a on the fixed scale,
 * the mark b of the moving scale stands over a·b, because
 * log a + log b = log(ab).
 * @param {number} a @param {number} b
 */
export function slide(a, b) {
  return { start: ruleX(a), at: ruleX(a) + ruleX(b), product: tidy(a * b, 9) };
}

/**
 * The marks of a scale from 1 to 10^decades: 1; 1,5; 2; …; 9,5 in each
 * decade (times its power of ten) and the end mark, the whole ones major.
 * @param {number} decades
 * @returns {Array<{ v: number, major: boolean }>}
 */
export function scaleMarks(decades) {
  const out = [];
  for (let d = 0; d < decades; d++) {
    for (let i = 2; i < 20; i++) out.push({ v: (i / 2) * 10 ** d, major: i % 2 === 0 });
  }
  out.push({ v: 10 ** decades, major: true });
  return out;
}
