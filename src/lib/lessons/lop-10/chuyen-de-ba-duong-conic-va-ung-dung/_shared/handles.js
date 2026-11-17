/**
 * Drag options for `use:draggable` on the conic boards: a point that slides
 * along a sampled curve, and a point that slides along the axis Ox in fixed
 * steps (a focus). Both work with the arrow keys too.
 */
import { clamp, snap } from '#lib/core/visuals/svg-math.js';
import { nearestIndex } from './conic.js';

/** @typedef {import('#lib/core/visuals/svg-math.js').PlaneScale} PlaneScale */
/** @typedef {import('#lib/actions/draggable.svelte.js').DraggableParams} DraggableParams */

/**
 * A handle on sample `index` of a curve. Dragging picks the nearest sample;
 * the arrow keys step to the next one (five with Shift), round a closed curve
 * or stopping at the ends of an open one.
 * @param {{
 *   samples: { x: number, y: number }[],
 *   index: number,
 *   plane: PlaneScale,
 *   svg: () => SVGSVGElement | null,
 *   onindex: (i: number) => void,
 *   closed?: boolean,
 * }} options
 * @returns {DraggableParams}
 */
export function slideHandle({ samples, index, plane, svg, onindex, closed = true }) {
  const n = samples.length;
  const at = samples[clamp(index, 0, n - 1)];
  const point = { x: plane.mx(at.x), y: plane.my(at.y) };
  /** @param {{ x: number, y: number }} q */
  const pick = (q) => nearestIndex(samples, { x: plane.toX(q.x), y: plane.toY(q.y) });
  return {
    point,
    svg,
    viewBox: { w: plane.width, h: plane.height },
    pad: 0,
    projector: (q) => {
      const s = samples[pick(q)];
      return { x: plane.mx(s.x), y: plane.my(s.y) };
    },
    onChange: () => onindex(pick(point)),
    onKeyMove: (dx, dy, big) => {
      const step = (dx || -dy) * (big ? 5 : 1);
      onindex(closed ? (((index + step) % n) + n) % n : clamp(index + step, 0, n - 1));
    },
  };
}

/**
 * A handle on the axis Ox at abscissa x, kept within min..max on a grid of
 * `step`.
 * @param {{
 *   x: number,
 *   min: number,
 *   max: number,
 *   step: number,
 *   plane: PlaneScale,
 *   svg: () => SVGSVGElement | null,
 *   onmove: (x: number) => void,
 * }} options
 * @returns {DraggableParams}
 */
export function axisHandle({ x, min, max, step, plane, svg, onmove }) {
  const point = { x: plane.mx(x), y: plane.my(0) };
  /** @param {number} px */
  const value = (px) => clamp(snap(plane.toX(px), step), min, max);
  return {
    point,
    svg,
    viewBox: { w: plane.width, h: plane.height },
    pad: 0,
    projector: (q) => ({ x: plane.mx(value(q.x)), y: plane.my(0) }),
    onChange: () => onmove(value(point.x)),
    onKeyMove: (dx, dy, big) => {
      const d = (dx || -dy) * step * (big ? 5 : 1);
      onmove(clamp(snap(x + d, step), min, max));
    },
  };
}
