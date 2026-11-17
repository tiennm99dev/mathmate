/**
 * Drawing graphs for the derivative lessons: a window in math coordinates
 * mapped to an SVG box (x and y scaled separately), round tick values, the
 * path of a graph that breaks where the function is undefined, and the
 * straight lines of secants and tangents.
 */

import { niceStep } from '#lib/stats-engine/ticks.js';
import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Window
 * @typedef {{
 *   width: number, height: number, left: number, right: number, top: number, bottom: number,
 *   sx: (x: number) => number, sy: (y: number) => number,
 * }} Frame
 */

/**
 * The SVG frame of a window: `sx` and `sy` map math values to page
 * coordinates inside a box of `width` × `height` with the given margins.
 * @param {Window} win
 * @param {{ width?: number, height?: number, pad?: number, left?: number }} [opts]
 * @returns {Frame}
 */
export function frameOf(win, opts = {}) {
  const { width = 420, height = 280, pad = 14, left = 44 } = opts;
  const right = width - pad;
  const top = pad;
  const bottom = height - 26;
  const kx = (right - left) / (win.xMax - win.xMin);
  const ky = (bottom - top) / (win.yMax - win.yMin);
  return {
    width,
    height,
    left,
    right,
    top,
    bottom,
    sx: (x) => left + (x - win.xMin) * kx,
    sy: (y) => bottom - (y - win.yMin) * ky,
  };
}

/**
 * Round tick values inside [lo, hi], about `count` of them.
 * @param {number} lo @param {number} hi @param {number} [count]
 */
export function ticksIn(lo, hi, count = 5) {
  const step = niceStep(hi - lo, count);
  const places = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  const out = [];
  for (let v = Math.ceil(lo / step - 1e-9) * step; v <= hi + step * 1e-9; v += step) {
    out.push(tidy(v, places + 2));
  }
  return out;
}

/**
 * Tick label in the book's notation: comma decimals, true minus sign.
 * @param {number} v
 */
export const tickText = (v) => formatNumber(v, 6);

/**
 * SVG path of y = f(x) for x in [win.xMin, win.xMax]. The pen lifts where f
 * is undefined (NaN or ±Infinity), outside the band `win` widened by half
 * its height, and across every x listed in `breaks` (a jump, a hole or an
 * asymptote), so a jump is never drawn as a steep segment.
 * @param {(x: number) => number} f
 * @param {Window} win
 * @param {Frame} frame
 * @param {{ breaks?: number[], samples?: number, from?: number, to?: number }} [opts]
 */
export function graphPath(f, win, frame, opts = {}) {
  const { breaks = [], samples = 240 } = opts;
  const from = Math.max(win.xMin, opts.from ?? win.xMin);
  const to = Math.min(win.xMax, opts.to ?? win.xMax);
  if (!(to > from)) return '';
  const margin = (win.yMax - win.yMin) / 2;
  const lo = win.yMin - margin;
  const hi = win.yMax + margin;
  // Sample points, plus each break approached from both sides.
  const span = to - from;
  const eps = span * 1e-6;
  /** @type {number[]} */
  const xs = [];
  for (let i = 0; i <= samples; i++) xs.push(from + (span * i) / samples);
  for (const b of breaks) {
    if (b > from && b < to) xs.push(b - eps, b + eps);
  }
  xs.sort((a, b) => a - b);
  let d = '';
  let pen = false;
  let prev = -Infinity;
  for (const x of xs) {
    const crossed = breaks.some((b) => prev < b && x > b);
    if (breaks.includes(x)) {
      pen = false;
      prev = x;
      continue;
    }
    const y = f(x);
    if (!Number.isFinite(y) || y < lo || y > hi) {
      pen = false;
      prev = x;
      continue;
    }
    const cmd = pen && !crossed ? 'L' : 'M';
    d += `${cmd} ${frame.sx(x).toFixed(2)} ${frame.sy(y).toFixed(2)} `;
    pen = true;
    prev = x;
  }
  return d.trim();
}

/**
 * The line through (x0; y0) with slope k, as a function of x.
 * @param {number} x0 @param {number} y0 @param {number} k
 * @returns {(x: number) => number}
 */
export const lineThrough = (x0, y0, k) => (x) => y0 + k * (x - x0);

/**
 * The line y = kx + b as TeX in the book's form: 'y = 2x - 1', 'y = -x',
 * 'y = 3', with comma decimals rounded to `places`.
 * @param {number} k @param {number} b @param {number} [places]
 */
export function lineTex(k, b, places = 4) {
  const kk = tidy(k, places);
  const bb = tidy(b, places);
  let out = '';
  if (kk !== 0) {
    const size = Math.abs(kk);
    out = `${kk < 0 ? '-' : ''}${size === 1 ? '' : numTex(size, places)}x`;
  }
  if (bb !== 0 || out === '') {
    const size = numTex(Math.abs(bb), places);
    if (out === '') out = bb < 0 ? `-${size}` : size;
    else out += ` ${bb < 0 ? '-' : '+'} ${size}`;
  }
  return `y = ${out}`;
}
