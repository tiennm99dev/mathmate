/**
 * Drawing the exponential and logarithmic functions of this chapter: a window
 * in math coordinates mapped to an SVG box, round tick values, the path of a
 * graph that lifts the pen where the function is undefined, and the bases the
 * widgets offer, each with its TeX and plain-text name.
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

const PAD = 14;
const LEFT = 44;
const FOOT = 26;

/**
 * The SVG frame of a window: `sx` and `sy` map math values to page
 * coordinates inside a box of `width` × `height`.
 * @param {Window} win
 * @param {{ width?: number, height?: number }} [opts]
 * @returns {Frame}
 */
export function frameOf(win, opts = {}) {
  const { width = 420, height = 280 } = opts;
  const right = width - PAD;
  const top = PAD;
  const bottom = height - FOOT;
  const kx = (right - LEFT) / (win.xMax - win.xMin);
  const ky = (bottom - top) / (win.yMax - win.yMin);
  return {
    width,
    height,
    left: LEFT,
    right,
    top,
    bottom,
    sx: (x) => LEFT + (x - win.xMin) * kx,
    sy: (y) => bottom - (y - win.yMin) * ky,
  };
}

/**
 * The box height that gives x and y the same scale in a box of `width`, so a
 * reflection in the line y = x looks like one.
 * @param {Window} win @param {number} [width]
 */
export function squareHeight(win, width = 420) {
  const unit = (width - PAD - LEFT) / (win.xMax - win.xMin);
  return Math.round(unit * (win.yMax - win.yMin) + PAD + FOOT);
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
 * SVG path of y = f(x) for x in [from, to] within the window. The pen lifts
 * where f is undefined (NaN or ±Infinity) or leaves the window widened by
 * half its height, so a curve running off to infinity is cut, not joined.
 * @param {(x: number) => number} f
 * @param {Window} win
 * @param {Frame} frame
 * @param {{ samples?: number, from?: number, to?: number }} [opts]
 */
export function graphPath(f, win, frame, opts = {}) {
  const { samples = 240 } = opts;
  const from = Math.max(win.xMin, opts.from ?? win.xMin);
  const to = Math.min(win.xMax, opts.to ?? win.xMax);
  if (!(to > from)) return '';
  const margin = (win.yMax - win.yMin) / 2;
  const lo = win.yMin - margin;
  const hi = win.yMax + margin;
  let d = '';
  let pen = false;
  for (let i = 0; i <= samples; i++) {
    const x = from + ((to - from) * i) / samples;
    const y = f(x);
    if (!Number.isFinite(y) || y < lo || y > hi) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'} ${frame.sx(x).toFixed(2)} ${frame.sy(y).toFixed(2)} `;
    pen = true;
  }
  return d.trim();
}

/**
 * @typedef {{ id: string, value: number, tex: string, text: string }} Base
 */

/**
 * The bases the widgets offer: `tex` for formulas, `text` for switches and
 * screen readers.
 * @type {Record<string, Base>}
 */
export const BASES = {
  2: { id: '2', value: 2, tex: '2', text: '2' },
  3: { id: '3', value: 3, tex: '3', text: '3' },
  10: { id: '10', value: 10, tex: '10', text: '10' },
  half: { id: 'half', value: 1 / 2, tex: '\\dfrac{1}{2}', text: '1/2' },
  third: { id: 'third', value: 1 / 3, tex: '\\dfrac{1}{3}', text: '1/3' },
};

/**
 * A base inside a power, bracketed when it is a fraction: '2', '\\left(\\dfrac{1}{2}\\right)'.
 * @param {Base} b
 */
export const powerBase = (b) => (b.tex.startsWith('\\dfrac') ? `\\left(${b.tex}\\right)` : b.tex);

/**
 * A base as a subscript of log: '2', '\\frac{1}{2}' (the small fraction).
 * @param {Base} b
 */
export const logBase = (b) => b.tex.replace('\\dfrac', '\\frac');
