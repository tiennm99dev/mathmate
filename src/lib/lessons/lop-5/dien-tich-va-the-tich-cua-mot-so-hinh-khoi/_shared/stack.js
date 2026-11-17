/**
 * A box filled with unit cubes, drawn the way the book draws a box: seen
 * from the front, a little from the right and from above, so the front, top
 * and right faces show. Model space counts in cube edges: x along the
 * length (to the right), y along the width (away from the viewer), z up.
 * Cubes go in a row along the length, rows from the back to the front of
 * a layer, then layers from the bottom up. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { cabinet } from '#lib/core/kid/cabinet-view.js';

/** How far one step away from the viewer shifts a point right and up. */
export const DEPTH = 0.5;

/** @typedef {import('#lib/core/kid/cabinet-view.js').Box} Box */
/** @typedef {import('#lib/core/kid/cabinet-view.js').Point} Point */
/** @typedef {import('#lib/core/kid/cabinet-view.js').Face} Face */

export const { project, boxFaces, boxGrid } = cabinet(DEPTH);

/**
 * How `count` unit cubes stand in a box of length a, width b and height c:
 * whole layers, whole rows on the next layer and loose cubes of the next row.
 * @param {number} a @param {number} b @param {number} c
 * @param {number} count
 */
export function fillOf(a, b, c, count) {
  const n = Math.max(0, Math.min(a * b * c, Math.floor(count)));
  return {
    count: n,
    layers: Math.floor(n / (a * b)),
    rows: Math.floor((n % (a * b)) / a),
    loose: n % a,
  };
}

/**
 * The boxes the cubes make, back to front so nearer ones are drawn last:
 * the whole layers, the whole rows on top of them (filled from the back),
 * then the loose cubes of the next row.
 * @param {number} a @param {number} b @param {number} c
 * @param {number} count
 * @returns {Box[]}
 */
export function fillBoxes(a, b, c, count) {
  const { layers, rows, loose } = fillOf(a, b, c, count);
  /** @type {Box[]} */
  const boxes = [];
  if (layers > 0) boxes.push({ x0: 0, x1: a, y0: 0, y1: b, z0: 0, z1: layers });
  if (rows > 0) boxes.push({ x0: 0, x1: a, y0: b - rows, y1: b, z0: layers, z1: layers + 1 });
  if (loose > 0) {
    const y = b - rows - 1;
    boxes.push({ x0: 0, x1: loose, y0: y, y1: y + 1, z0: layers, z1: layers + 1 });
  }
  return boxes;
}

/**
 * How the cubes stand, in words: '2 lớp, 3 hàng và 1 khối', '1 lớp', '0 khối'.
 * @param {number} a @param {number} b @param {number} c
 * @param {number} count
 */
export function fillWords(a, b, c, count) {
  const { layers, rows, loose } = fillOf(a, b, c, count);
  const parts = [];
  if (layers) parts.push(`${fmt(layers)} lớp`);
  if (rows) parts.push(`${fmt(rows)} hàng`);
  if (loose) parts.push(`${fmt(loose)} khối`);
  if (parts.length === 0) return '0 khối';
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(', ')} và ${parts[parts.length - 1]}`;
}
