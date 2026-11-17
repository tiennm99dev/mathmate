/**
 * Drawing functions for graphs on a GeoGebra-like board: a window in math
 * coordinates mapped to an SVG box (x and y scaled separately), round tick
 * values, and the path of a graph that lifts the pen where the function
 * jumps or is undefined.
 */

import { niceStep } from '#lib/stats-engine/ticks.js';
import { formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Window
 * @typedef {{
 *   width: number, height: number, left: number, right: number, top: number, bottom: number,
 *   sx: (x: number) => number, sy: (y: number) => number, ix: (px: number) => number,
 * }} Frame
 */

/**
 * The SVG frame of a window: `sx` and `sy` map math values to page
 * coordinates inside a box of `width` × `height` with the given margins, and
 * `ix` maps a page x back to a math x.
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
    ix: (px) => win.xMin + (px - left) / kx,
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
 * SVG path of y = f(x) for x in [win.xMin, win.xMax], or in [from, to]. The
 * pen lifts where f is undefined (NaN or ±Infinity), outside the window
 * widened by half its height, and across every x listed in `breaks` (an
 * asymptote or a hole), so a vertical asymptote is never drawn as a line.
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
  const span = to - from;
  const eps = span * 1e-6;
  /** @type {number[]} */
  const xs = [];
  for (let i = 0; i <= samples; i++) xs.push(from + (span * i) / samples);
  // Near a break the curve may shoot off steeply: add samples closing in on
  // it geometrically, so a branch is drawn right up to its asymptote.
  for (const b of breaks) {
    if (!(b > from && b < to)) continue;
    for (let h = span / 64; h > eps; h /= 2) xs.push(b - h, b + h);
    xs.push(b - eps, b + eps);
  }
  xs.sort((a, b) => a - b);
  let d = '';
  const inRange = (/** @type {number} */ x) => x >= from && x <= to;
  let pen = false;
  let prev = -Infinity;
  for (const x of xs.filter(inRange)) {
    const crossed = breaks.some((b) => prev < b && x > b);
    const y = breaks.includes(x) ? NaN : f(x);
    prev = x;
    if (!Number.isFinite(y) || y < lo || y > hi) {
      pen = false;
      continue;
    }
    const cmd = pen && !crossed ? 'L' : 'M';
    d += `${cmd} ${frame.sx(x).toFixed(2)} ${frame.sy(y).toFixed(2)} `;
    pen = true;
  }
  return d.trim();
}
