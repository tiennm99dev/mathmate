/**
 * A box filled with unit cubes, drawn the way the book draws a box: seen
 * from the front, a little from the right and from above, so the front, top
 * and right faces show. Model space counts in cube edges: x along the
 * length (to the right), y along the width (away from the viewer), z up.
 * Cubes go in a row along the length, rows from the back to the front of
 * a layer, then layers from the bottom up. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** How far one step away from the viewer shifts a point right and up. */
export const DEPTH = 0.5;

/** @typedef {{ x0: number, x1: number, y0: number, y1: number, z0: number, z1: number }} Box */
/** @typedef {{ x: number, y: number }} Point screen point in edge units, y down */
/** @typedef {{ kind: 'front' | 'top' | 'right', pts: Point[] }} Face */

/**
 * The screen point of a model point, in edge units (y down).
 * @param {number} x @param {number} y @param {number} z
 * @returns {Point}
 */
export const project = (x, y, z) => ({ x: x + DEPTH * y, y: -(z + DEPTH * y) });

/**
 * The three faces that show of a box: front (y = y0), top (z = z1) and
 * right (x = x1).
 * @param {Box} b
 * @returns {Face[]}
 */
export function boxFaces(b) {
  return [
    {
      kind: 'front',
      pts: [
        project(b.x0, b.y0, b.z0),
        project(b.x1, b.y0, b.z0),
        project(b.x1, b.y0, b.z1),
        project(b.x0, b.y0, b.z1),
      ],
    },
    {
      kind: 'top',
      pts: [
        project(b.x0, b.y0, b.z1),
        project(b.x1, b.y0, b.z1),
        project(b.x1, b.y1, b.z1),
        project(b.x0, b.y1, b.z1),
      ],
    },
    {
      kind: 'right',
      pts: [
        project(b.x1, b.y0, b.z0),
        project(b.x1, b.y1, b.z0),
        project(b.x1, b.y1, b.z1),
        project(b.x1, b.y0, b.z1),
      ],
    },
  ];
}

/**
 * The cube edges on the shown faces of a box, so a box of many cubes still
 * shows each cube.
 * @param {Box} b
 * @returns {[Point, Point][]}
 */
export function boxGrid(b) {
  /** @type {[Point, Point][]} */
  const lines = [];
  for (let x = b.x0 + 1; x < b.x1; x++) {
    lines.push([project(x, b.y0, b.z0), project(x, b.y0, b.z1)]);
    lines.push([project(x, b.y0, b.z1), project(x, b.y1, b.z1)]);
  }
  for (let z = b.z0 + 1; z < b.z1; z++) {
    lines.push([project(b.x0, b.y0, z), project(b.x1, b.y0, z)]);
    lines.push([project(b.x1, b.y0, z), project(b.x1, b.y1, z)]);
  }
  for (let y = b.y0 + 1; y < b.y1; y++) {
    lines.push([project(b.x0, y, b.z1), project(b.x1, y, b.z1)]);
    lines.push([project(b.x1, y, b.z0), project(b.x1, y, b.z1)]);
  }
  return lines;
}

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
