/**
 * Drawing and numeric helpers for the chapter "Nguyên hàm và tích phân": a
 * window in math coordinates mapped to an SVG box (x and y scaled
 * separately), round ticks, the path of a graph, the closed path of a region
 * between two graphs, Riemann rectangles, a numeric integral to check exact
 * answers against, and numbers written the book's way with "≈" when rounded.
 */

import { niceStep } from '#lib/stats-engine/ticks.js';
import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Window
 * @typedef {{
 *   width: number, height: number, left: number, right: number, top: number, bottom: number,
 *   sx: (x: number) => number, sy: (y: number) => number, ix: (px: number) => number,
 * }} Frame
 * @typedef {(x: number) => number} Fn
 */

/**
 * The SVG frame of a window: `sx` and `sy` map math values to page
 * coordinates inside a box of `width` × `height`, and `ix` maps a page x back
 * to a math x.
 * @param {Window} win
 * @param {{ width?: number, height?: number, pad?: number, left?: number }} [opts]
 * @returns {Frame}
 */
export function frameOf(win, opts = {}) {
  const { width = 420, height = 280, pad = 14, left = 40 } = opts;
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
 * Sample points of y = f(x) on [from, to], `samples` + 1 of them.
 * @param {Fn} f @param {number} from @param {number} to @param {number} [samples]
 */
export function sample(f, from, to, samples = 160) {
  const out = [];
  for (let i = 0; i <= samples; i++) {
    const x = from + ((to - from) * i) / samples;
    out.push({ x, y: f(x) });
  }
  return out;
}

/**
 * SVG path of y = f(x) for x in [from, to] (the window by default). The pen
 * lifts where f is undefined or leaves the window widened by half its height.
 * @param {Fn} f
 * @param {Window} win
 * @param {Frame} frame
 * @param {{ from?: number, to?: number, samples?: number }} [opts]
 */
export function graphPath(f, win, frame, opts = {}) {
  const from = Math.max(win.xMin, opts.from ?? win.xMin);
  const to = Math.min(win.xMax, opts.to ?? win.xMax);
  if (!(to > from)) return '';
  const margin = (win.yMax - win.yMin) / 2;
  let d = '';
  let pen = false;
  for (const p of sample(f, from, to, opts.samples ?? 240)) {
    if (!Number.isFinite(p.y) || p.y < win.yMin - margin || p.y > win.yMax + margin) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'} ${frame.sx(p.x).toFixed(2)} ${frame.sy(p.y).toFixed(2)} `;
    pen = true;
  }
  return d.trim();
}

/**
 * Closed SVG path of the region between y = f(x) and y = g(x) (the x-axis
 * when g is left out) for x in [from, to]: along f to the right, back along
 * g to the left.
 * @param {Fn} f
 * @param {Fn | undefined} g
 * @param {number} from @param {number} to
 * @param {Frame} frame
 */
export function regionPath(f, g, from, to, frame) {
  if (!(to > from)) return '';
  const lower = g ?? (() => 0);
  const top = sample(f, from, to, 120);
  const bottom = sample(lower, from, to, 120).reverse();
  const pts = [...top, ...bottom].map(
    (p) => `${frame.sx(p.x).toFixed(2)} ${frame.sy(p.y).toFixed(2)}`,
  );
  return `M ${pts.join(' L ')} Z`;
}

/** @typedef {'left' | 'mid' | 'right'} Rule */

/**
 * The n rectangles of a Riemann sum of f on [a, b]: each has width
 * (b − a)/n and height f at the left end, the midpoint or the right end of
 * its piece. Returns the rectangles and their signed sum.
 * @param {Fn} f @param {number} a @param {number} b @param {number} n
 * @param {Rule} [rule]
 */
export function riemann(f, a, b, n, rule = 'left') {
  const h = (b - a) / n;
  const shift = rule === 'left' ? 0 : rule === 'mid' ? 0.5 : 1;
  const rects = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const x0 = a + i * h;
    const y = f(x0 + shift * h);
    rects.push({ x0, x1: x0 + h, y });
    sum += y * h;
  }
  return { rects, sum };
}

/**
 * A numeric integral of f on [a, b] by Simpson's rule, to check exact
 * values against.
 * @param {Fn} f @param {number} a @param {number} b @param {number} [n] even
 */
export function simpson(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}

/**
 * A computed value written to at most `places` decimals, with "≈ " in
 * front when rounding changed it: 2.5 → '2,5', 1/3 → '≈ 0,33'.
 * @param {number} v @param {number} [places]
 */
export function approxText(v, places = 2) {
  const r = tidy(v, places);
  return `${tidy(v, 9) === r ? '' : '≈ '}${formatNumber(r, places)}`;
}

/**
 * The same as TeX: the relation sign ('=' or '\approx') and the number.
 * @param {number} v @param {number} [places]
 */
export function approxTex(v, places = 2) {
  const r = tidy(v, places);
  return `${tidy(v, 9) === r ? '=' : '\\approx'} ${numTex(r, places)}`;
}
