/**
 * Drawing the graphs of y = sin x, cos x, tan x and cot x in an SVG: x in
 * degrees on the page, y clipped to a band so tan and cot break at their
 * asymptotes instead of drawing a vertical line across them.
 */

import { MINUS } from '#lib/core/number-format.js';
import { degToPi, trigValue } from './trig.js';

/** @typedef {import('./trig.js').TrigName} TrigName */

/**
 * SVG path of y = name(x) for x from `lo` to `hi` degrees, with `toX` and
 * `toY` mapping math values to the page. Points with |y| > `limit` or where
 * the function is undefined are left out, and the line restarts after them.
 * @param {TrigName} name
 * @param {number} lo
 * @param {number} hi
 * @param {(deg: number) => number} toX
 * @param {(y: number) => number} toY
 * @param {number} [limit]
 * @param {number} [step]
 */
export function graphPath(name, lo, hi, toX, toY, limit = 2, step = 1) {
  let d = '';
  let pen = false;
  for (let x = lo; x <= hi + 1e-9; x += step) {
    const y = trigValue(name, x);
    if (Number.isNaN(y) || Math.abs(y) > limit) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'} ${toX(x).toFixed(2)} ${toY(y).toFixed(2)} `;
    pen = true;
  }
  return d.trim();
}

/**
 * Plain text of `deg` in radians as a multiple of π, for labels and sliders:
 * 150 gives '5π/6', −180 gives '−π', 0 gives '0'.
 * @param {number} deg
 */
export function piText(deg) {
  const [p, q] = degToPi(deg);
  if (p === 0) return '0';
  const n = Math.abs(p);
  const top = n === 1 ? 'π' : `${n}π`;
  return `${p < 0 ? MINUS : ''}${q === 1 ? top : `${top}/${q}`}`;
}

/**
 * The x values (degrees) in [lo, hi] where tan (or cot) is undefined, for
 * drawing the asymptotes.
 * @param {'tan' | 'cot'} name @param {number} lo @param {number} hi
 */
export function asymptotes(name, lo, hi) {
  const start = name === 'tan' ? 90 : 0;
  const out = [];
  for (let k = Math.ceil((lo - start) / 180); start + k * 180 <= hi; k++) out.push(start + k * 180);
  return out;
}
