/**
 * Trigonometry helpers for the chapter "Hàm số lượng giác và phương trình
 * lượng giác": angles in degrees on the unit circle (counter-clockwise from
 * A(1; 0), SVG y pointing down), radian measures written as multiples of π,
 * exact values at the special angles and the values of the four functions.
 * Pure, no DOM.
 */

import { gcd } from '#lib/numtheory-engine/index.js';
import { numTex, tidy } from '#lib/core/number-format.js';

/** @typedef {'sin' | 'cos' | 'tan' | 'cot'} TrigName */

/** The four functions in the book's order. */
export const TRIG_NAMES = /** @type {const} */ (['sin', 'cos', 'tan', 'cot']);

const RAD = Math.PI / 180;

/**
 * `a` modulo `m`, always in [0, m).
 * @param {number} a @param {number} m
 */
export function mod(a, m) {
  return ((a % m) + m) % m;
}

/**
 * The point at `deg` degrees on a circle of centre `c` and radius `r`, with the
 * y axis of the SVG pointing down: 0° is to the right, 90° straight up.
 * @param {{ x: number, y: number }} c @param {number} r @param {number} deg
 */
export function circlePoint(c, r, deg) {
  return { x: c.x + r * Math.cos(deg * RAD), y: c.y - r * Math.sin(deg * RAD) };
}

/**
 * The angle in [0, 360) of point `p` seen from `c`, counter-clockwise from the
 * right (SVG y pointing down).
 * @param {{ x: number, y: number }} c @param {{ x: number, y: number }} p
 */
export function angleAt(c, p) {
  return mod((Math.atan2(c.y - p.y, p.x - c.x) * 180) / Math.PI, 360);
}

/**
 * The turning angle closest to `previous` whose end point is at `raw` degrees,
 * so dragging round and round adds or takes away whole turns.
 * @param {number} previous @param {number} raw
 */
export function unwrap(previous, raw) {
  const delta = mod(raw - previous + 180, 360) - 180;
  return previous + delta;
}

/**
 * `deg` in radians as the lowest-terms fraction `[p, q]` of π: 150 gives
 * [5, 6], −90 gives [−1, 2], 0 gives [0, 1]. `deg` may be a half degree.
 * @param {number} deg
 * @returns {[number, number]}
 */
export function degToPi(deg) {
  const p = Math.round(deg * 2);
  const q = 360;
  const g = gcd(Math.abs(p), q) || 1;
  return [p / g, q / g];
}

/**
 * TeX of `p/q`·π: (5, 6) gives '\dfrac{5\pi}{6}', (−1, 3) '-\dfrac{\pi}{3}',
 * (2, 1) '2\pi', (1, 1) '\pi', (0, 1) '0'. The fraction is reduced first.
 * @param {number} p @param {number} q
 */
export function piTex(p, q) {
  if (p === 0) return '0';
  const g = gcd(Math.abs(p), Math.abs(q)) || 1;
  const n = Math.abs(p / g);
  const d = Math.abs(q / g);
  const sign = p * q < 0 ? '-' : '';
  const top = n === 1 ? '\\pi' : `${n}\\pi`;
  return d === 1 ? `${sign}${top}` : `${sign}\\dfrac{${top}}{${d}}`;
}

/**
 * Whether `deg` is a whole multiple of 15°, the angles whose radian measure
 * the chapter writes exactly as a multiple of π.
 * @param {number} deg
 */
export function isNiceAngle(deg) {
  return Math.abs(deg / 15 - Math.round(deg / 15)) < 1e-9;
}

/**
 * TeX of the radian measure of `deg`: exact for multiples of 15°
 * ('\dfrac{\pi}{4}'), otherwise rounded to 3 decimals ('\approx 0{,}873').
 * @param {number} deg
 */
export function radTex(deg) {
  if (isNiceAngle(deg)) return piTex(...degToPi(Math.round(deg)));
  return `\\approx ${numTex(deg * RAD, 3)}`;
}

/**
 * TeX of a measure in degrees: 30 gives '30^\circ', −7.5 gives '-7{,}5^\circ'.
 * @param {number} deg
 */
export function degTex(deg) {
  return `${numTex(deg, 2)}^\\circ`;
}

/** sin of the reference angles 0°, 30°, 45°, 60°, 90°, as TeX. */
const SIN_REF = /** @type {Record<number, string>} */ ({
  0: '0',
  30: '\\dfrac{1}{2}',
  45: '\\dfrac{\\sqrt{2}}{2}',
  60: '\\dfrac{\\sqrt{3}}{2}',
  90: '1',
});
/** tan of the reference angles, as TeX (90° has none). */
const TAN_REF = /** @type {Record<number, string>} */ ({
  0: '0',
  30: '\\dfrac{\\sqrt{3}}{3}',
  45: '1',
  60: '\\sqrt{3}',
});

/**
 * The value of `name` at `deg` degrees with binary noise rounded away; NaN
 * where it is not defined (tan where cos = 0, cot where sin = 0).
 * @param {TrigName} name @param {number} deg
 */
export function trigValue(name, deg) {
  const s = tidy(Math.sin(deg * RAD), 12);
  const c = tidy(Math.cos(deg * RAD), 12);
  if (name === 'sin') return tidy(s);
  if (name === 'cos') return tidy(c);
  if (name === 'tan') return c === 0 ? NaN : tidy(s / c);
  return s === 0 ? NaN : tidy(c / s);
}

/**
 * The reference angle of `deg` in [0°, 90°]: the acute angle between OM and
 * the x axis.
 * @param {number} deg
 */
export function referenceAngle(deg) {
  const d = mod(deg, 360);
  if (d <= 90) return d;
  if (d <= 180) return 180 - d;
  if (d <= 270) return d - 180;
  return 360 - d;
}

/**
 * The exact value of `name` at `deg` as TeX when `deg` has a special
 * reference angle (0°, 30°, 45°, 60° or 90°): sin 150° is '\dfrac{1}{2}',
 * cos 135° is '-\dfrac{\sqrt{2}}{2}'. Null for any other angle, and for an
 * angle where the function is not defined.
 * @param {TrigName} name @param {number} deg
 * @returns {string | null}
 */
export function exactTex(name, deg) {
  const v = trigValue(name, deg);
  if (Number.isNaN(v)) return null;
  const r = Math.round(referenceAngle(deg) * 1e6) / 1e6;
  if (!(r in SIN_REF)) return null;
  let mag;
  if (name === 'sin') mag = SIN_REF[r];
  else if (name === 'cos') mag = SIN_REF[90 - r];
  else if (name === 'tan') mag = TAN_REF[r];
  else mag = TAN_REF[90 - r];
  if (mag === '0') return '0';
  return v < 0 ? `-${mag}` : mag;
}

/**
 * Rich text of the value of `name` at `deg`: exact at special angles
 * ('$\dfrac{1}{2}$'), else rounded to 4 decimals ('$\approx 0{,}3420$'),
 * and 'không xác định' where it is undefined.
 * @param {TrigName} name @param {number} deg
 */
export function valueText(name, deg) {
  const v = trigValue(name, deg);
  if (Number.isNaN(v)) return 'không xác định';
  const ex = exactTex(name, deg);
  if (ex !== null) return `$${ex}$`;
  return `$\\approx ${numTex(v, 4)}$`;
}

/**
 * The quadrant (1 to 4) the end point of `deg` lies in, or 0 on an axis.
 * @param {number} deg
 */
export function quadrantOf(deg) {
  const d = mod(deg, 360);
  if (d % 90 === 0) return 0;
  return Math.floor(d / 90) + 1;
}

/** Roman numerals of the quadrants, the book's names I, II, III, IV. */
export const QUADRANT_NAMES = ['', 'I', 'II', 'III', 'IV'];

/**
 * TeX of `k` whole turns added to an angle, the book's way: 0 gives '',
 * 1 gives ' + 2\pi', −2 gives ' - 4\pi'. With `degrees`, ' + 360^\circ'.
 * @param {number} k @param {boolean} [degrees]
 */
export function turnsTex(k, degrees = false) {
  if (k === 0) return '';
  const sign = k < 0 ? ' - ' : ' + ';
  const n = Math.abs(k);
  if (degrees) return `${sign}${n === 1 ? '' : `${n} \\cdot `}360^\\circ`;
  return `${sign}${2 * n}\\pi`;
}
