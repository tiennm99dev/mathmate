/**
 * Drawing functions and sequences for the limit and continuity lessons: a
 * window in math coordinates mapped to an SVG box (x and y scaled
 * separately, so a zoomed-in window keeps its shape), round tick values, the
 * path of a graph that breaks where the function jumps or is undefined, and
 * the values of f on both sides of a point, for tables of x → x₀.
 */

import { niceStep } from '#lib/stats-engine/ticks.js';
import { formatNumber, tidy } from '#lib/core/number-format.js';

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
 * Values of f at x₀ − h and x₀ + h for each h: the two rows of a table of
 * x → x₀⁻ and x → x₀⁺. A value is null where f is undefined.
 * @param {(x: number) => number} f
 * @param {number} x0
 * @param {number[]} hs
 * @returns {Array<{ h: number, left: number | null, right: number | null }>}
 */
export function approach(f, x0, hs) {
  /** @param {number} x */
  const at = (x) => {
    const y = f(x);
    return Number.isFinite(y) ? y : null;
  };
  return hs.map((h) => ({ h, left: at(tidy(x0 - h, 12)), right: at(tidy(x0 + h, 12)) }));
}

/**
 * A computed value written for a table, to `places` decimals with trailing
 * zeros dropped and the book's minus sign; 'không xác định' when null.
 * @param {number | null} v @param {number} [places]
 */
export function valueCell(v, places = 4) {
  if (v === null) return 'không xác định';
  return formatNumber(tidy(v, places), places);
}

/** The distances h of a zoom slider, from far to very close. */
export const ZOOM_STEPS = [1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001];

/**
 * The window around x₀ zoomed to distance h: x within 2,5h of x₀, y
 * covering the values of f there (skipping |x − x₀| < h/2, so an asymptote
 * at x₀ does not stretch it without bound) and the extra heights `ys`, with
 * a little room.
 * @param {(x: number) => number} f
 * @param {number} x0 @param {number} h
 * @param {number[]} [ys]
 * @returns {Window}
 */
export function zoomAround(f, x0, h, ys = []) {
  const xMin = x0 - 2.5 * h;
  const xMax = x0 + 2.5 * h;
  const all = [...ys];
  for (let i = 0; i <= 50; i++) {
    const x = xMin + ((xMax - xMin) * i) / 50;
    if (Math.abs(x - x0) < h / 2) continue;
    const y = f(x);
    if (Number.isFinite(y)) all.push(y);
  }
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const room = Math.max((hi - lo) * 0.15, h * 0.5);
  return { xMin, xMax, yMin: lo - room, yMax: hi + room };
}
