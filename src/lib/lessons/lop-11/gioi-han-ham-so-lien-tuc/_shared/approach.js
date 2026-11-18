/**
 * Approaching a point for the limit and continuity lessons: the values of f
 * on both sides of x₀, for tables of x → x₀, written for a table cell, and
 * the zoom steps and windows that close in on x₀.
 */

import { formatNumber, tidy } from '#lib/core/number-format.js';

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
 * @returns {import('#lib/core/visuals/plot.js').Window}
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
