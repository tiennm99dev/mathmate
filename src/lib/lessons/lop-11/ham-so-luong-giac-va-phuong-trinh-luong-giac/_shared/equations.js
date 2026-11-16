/**
 * The basic trigonometric equations sin x = m, cos x = m, tan x = m and
 * cot x = m: the angle α the book starts from, the families of solutions
 * x = α + k·T, the solutions inside an interval and the formula of the
 * solutions as TeX. Angles are in degrees; TeX writes them in radians.
 */

import { numTex, tidy } from '#lib/core/number-format.js';
import { degToPi, isNiceAngle, mod, piTex } from './trig.js';

/** @typedef {import('./trig.js').TrigName} TrigName */
/** @typedef {{ start: number, period: number }} Family */
/** @typedef {{ x: number, family: number, k: number }} Solution */

/**
 * The special values of m whose α is a special angle, with their TeX, for the
 * preset buttons and the generated questions.
 * @type {Record<TrigName, Array<{ value: number, tex: string }>>}
 */
export const SPECIAL_VALUES = {
  sin: sinCosValues(),
  cos: sinCosValues(),
  tan: tanCotValues(),
  cot: tanCotValues(),
};

function sinCosValues() {
  const base = [
    { value: 1 / 2, tex: '\\dfrac{1}{2}' },
    { value: Math.SQRT2 / 2, tex: '\\dfrac{\\sqrt{2}}{2}' },
    { value: Math.sqrt(3) / 2, tex: '\\dfrac{\\sqrt{3}}{2}' },
    { value: 1, tex: '1' },
  ];
  return [
    ...base.map((v) => ({ value: -v.value, tex: `-${v.tex}` })).reverse(),
    { value: 0, tex: '0' },
    ...base,
  ];
}

function tanCotValues() {
  const base = [
    { value: Math.sqrt(3) / 3, tex: '\\dfrac{\\sqrt{3}}{3}' },
    { value: 1, tex: '1' },
    { value: Math.sqrt(3), tex: '\\sqrt{3}' },
  ];
  return [
    ...base.map((v) => ({ value: -v.value, tex: `-${v.tex}` })).reverse(),
    { value: 0, tex: '0' },
    ...base,
  ];
}

/**
 * The angle α (degrees) the book picks for `name`(x) = m: sin α = m with
 * α in [−90°; 90°], cos α = m with α in [0°; 180°], tan α = m with α in
 * (−90°; 90°), cot α = m with α in (0°; 180°). Null when sin or cos has
 * |m| > 1.
 * @param {TrigName} name @param {number} m
 * @returns {number | null}
 */
export function baseAngle(name, m) {
  const deg = (/** @type {number} */ r) => tidy((r * 180) / Math.PI, 6);
  if (name === 'sin' || name === 'cos') {
    if (Math.abs(m) > 1 + 1e-12) return null;
    const v = Math.max(-1, Math.min(1, m));
    return deg(name === 'sin' ? Math.asin(v) : Math.acos(v));
  }
  if (name === 'tan') return deg(Math.atan(m));
  return tidy(90 - deg(Math.atan(m)), 6);
}

/**
 * The families x = start + k·period of the solutions of `name`(x) = m;
 * empty when there is none. sin and cos have two families, merged into one
 * when they coincide (m = ±1).
 * @param {TrigName} name @param {number} m
 * @returns {Family[]}
 */
export function families(name, m) {
  const a = baseAngle(name, m);
  if (a === null) return [];
  if (name === 'tan' || name === 'cot') return [{ start: a, period: 180 }];
  const other = name === 'sin' ? 180 - a : -a;
  const gap = mod(other - a, 360);
  if (gap < 1e-9 || 360 - gap < 1e-9) {
    return [{ start: a, period: 360 }];
  }
  return [
    { start: a, period: 360 },
    { start: other, period: 360 },
  ];
}

/**
 * Every solution of `name`(x) = m with lo ≤ x ≤ hi (degrees), sorted, each
 * tagged with its family and its k.
 * @param {TrigName} name @param {number} m @param {number} lo @param {number} hi
 * @returns {Solution[]}
 */
export function solutionsIn(name, m, lo, hi) {
  /** @type {Solution[]} */
  const out = [];
  families(name, m).forEach((f, family) => {
    const kLo = Math.ceil((lo - f.start) / f.period - 1e-9);
    const kHi = Math.floor((hi - f.start) / f.period + 1e-9);
    for (let k = kLo; k <= kHi; k++) {
      const x = tidy(f.start + k * f.period, 6);
      if (!out.some((s) => Math.abs(s.x - x) < 1e-6)) out.push({ x, family, k });
    }
  });
  return out.sort((p, q) => p.x - q.x);
}

/**
 * TeX of an angle in radians for a solution formula: exact for multiples of
 * 15°, otherwise the symbol α.
 * @param {number} deg
 */
function angle(deg) {
  return piTex(...degToPi(Math.round(deg)));
}

/**
 * The solution formula of `name`(x) = m as a list of TeX lines (one per
 * family), the book's way: 'x = \dfrac{\pi}{6} + k2\pi'. With an α that is
 * not a special angle, the lines use α ('x = \pi - \alpha + k2\pi'). Empty
 * when there is no solution.
 * @param {TrigName} name @param {number} m
 * @returns {string[]}
 */
export function solutionTex(name, m) {
  const a = baseAngle(name, m);
  if (a === null) return [];
  const nice = isNiceAngle(a);
  const al = nice ? angle(a) : '\\alpha';
  /** @param {string} start @param {string} period */
  const line = (start, period) => (start === '0' ? `x = ${period}` : `x = ${start} + ${period}`);
  if (name === 'tan' || name === 'cot') return [line(al, 'k\\pi')];
  if (name === 'sin') {
    if (nice && a === 0) return ['x = k\\pi'];
    if (nice && Math.abs(a) === 90) return [line(al, 'k2\\pi')];
    const other = nice ? angle(180 - a) : '\\pi - \\alpha';
    return [line(al, 'k2\\pi'), line(other, 'k2\\pi')];
  }
  if (nice && a === 0) return ['x = k2\\pi'];
  if (nice && a === 180) return ['x = \\pi + k2\\pi'];
  if (nice && a === 90) return ['x = \\dfrac{\\pi}{2} + k\\pi'];
  return [`x = \\pm ${al} + k2\\pi`];
}

/**
 * TeX of α in degrees and radians when it is not a special angle:
 * '\alpha \approx 19{,}47^\circ \approx 0{,}340'.
 * @param {number} deg
 */
export function alphaTex(deg) {
  return `\\alpha \\approx ${numTex(deg, 2)}^\\circ \\approx ${numTex((deg * Math.PI) / 180, 3)}`;
}
