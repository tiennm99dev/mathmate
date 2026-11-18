/**
 * Snapping a handle that slides along the x-axis of a graph: to the grid,
 * to special values and to the ends of the domain.
 */

import { tidy } from '#lib/core/number-format.js';

/**
 * Where a handle that slides along the x-axis lands: x kept in [lo, hi],
 * rounded to the grid `step`, and pulled onto a special value within
 * `radius` (a critical point, a domain end).
 * @param {number} x
 * @param {{ lo: number, hi: number, step: number, snaps?: number[], radius?: number }} opts
 */
export function snapX(x, { lo, hi, step, snaps = [], radius = step }) {
  let best = null;
  let gap = Infinity;
  for (const s of snaps) {
    const d = Math.abs(s - x);
    if (d <= radius && d < gap && s >= lo && s <= hi) {
      best = s;
      gap = d;
    }
  }
  if (best !== null) return best;
  const grid = tidy(Math.round(x / step) * step, 9);
  return Math.min(hi, Math.max(lo, grid));
}
