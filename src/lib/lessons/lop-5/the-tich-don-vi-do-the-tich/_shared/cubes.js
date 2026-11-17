/**
 * Unit cubes and boxes drawn the way the book draws them: a cabinet view
 * seen from the front, a little from the right and from above, so the front,
 * top and right faces show. Model space counts in cube edges: x to the right,
 * y away from the viewer, z up. Also how a big cube fills up with small
 * cubes (ten in a row, ten rows in a layer, ten layers), used for
 * 1 dm³ = 1 000 cm³ and 1 m³ = 1 000 dm³. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { cabinet } from '#lib/core/kid/cabinet-view.js';

/** How far one step away from the viewer shifts a point right and up. */
export const DEPTH = 0.45;

/** @typedef {{ x: number, y: number, z: number }} Cube a unit cube by its corner nearest the origin */
/** @typedef {import('#lib/core/kid/cabinet-view.js').Box} Box */
/** @typedef {import('#lib/core/kid/cabinet-view.js').Point} Point */
/** @typedef {import('#lib/core/kid/cabinet-view.js').Face} Face */

export const { project, boxFaces, boxGrid } = cabinet(DEPTH);

/** The box of one unit cube. @param {Cube} c @returns {Box} */
export const cubeBox = (c) => ({
  x0: c.x,
  x1: c.x + 1,
  y0: c.y,
  y1: c.y + 1,
  z0: c.z,
  z1: c.z + 1,
});

/**
 * Cubes in drawing order, farthest first, so nearer cubes cover the ones
 * behind them: far means further along the viewing direction (−DEPTH, 1, −DEPTH).
 * @param {readonly Cube[]} cubes
 * @returns {Cube[]}
 */
export function drawOrder(cubes) {
  const far = (/** @type {Cube} */ c) => c.y - DEPTH * (c.x + c.z);
  return [...cubes].sort((a, b) => far(b) - far(a));
}

/**
 * Cubes from column heights: `rows[r][c]` cubes stand on the cell in
 * column c, row r, where row 0 is the back row (as seen from above, the
 * top of a plan) and the last row is the front.
 * @param {readonly (readonly number[])[]} rows
 * @returns {Cube[]}
 */
export function cubesOf(rows) {
  /** @type {Cube[]} */
  const cubes = [];
  rows.forEach((row, r) => {
    row.forEach((h, x) => {
      for (let z = 0; z < h; z++) cubes.push({ x, y: rows.length - 1 - r, z });
    });
  });
  return cubes;
}

/**
 * Whether a child can count every cube from the picture: the front face of
 * each cube is in sight, so no cube stands in a nearer row of the same
 * column at its height or higher (a cube there would cover it).
 * @param {readonly Cube[]} cubes
 */
export function allShow(cubes) {
  return cubes.every((c) => !cubes.some((d) => d.x === c.x && d.y < c.y && d.z >= c.z));
}

/**
 * The extent of a picture: the smallest box from the origin holding all the
 * cubes.
 * @param {readonly Cube[]} cubes
 * @returns {{ nx: number, ny: number, nz: number }}
 */
export function extentOf(cubes) {
  return {
    nx: Math.max(1, ...cubes.map((c) => c.x + 1)),
    ny: Math.max(1, ...cubes.map((c) => c.y + 1)),
    nz: Math.max(1, ...cubes.map((c) => c.z + 1)),
  };
}

/** Small cubes along one edge of the big cube. */
export const SIDE = 10;

/**
 * The boxes a big cube holds after `count` small cubes are put in, filling a
 * row from left to right, the rows of a layer from back to front, then the
 * layers from the bottom up: whole layers, then whole rows on top, then the
 * part of a row in front of them, drawn in that order.
 * @param {number} count 0 to 1 000
 * @returns {Box[]}
 */
export function fillBoxes(count) {
  const n = Math.max(0, Math.min(SIDE ** 3, Math.floor(count)));
  const layers = Math.floor(n / (SIDE * SIDE));
  const rows = Math.floor((n % (SIDE * SIDE)) / SIDE);
  const loose = n % SIDE;
  /** @type {Box[]} */
  const boxes = [];
  if (layers > 0) boxes.push({ x0: 0, x1: SIDE, y0: 0, y1: SIDE, z0: 0, z1: layers });
  if (rows > 0) {
    boxes.push({ x0: 0, x1: SIDE, y0: SIDE - rows, y1: SIDE, z0: layers, z1: layers + 1 });
  }
  if (loose > 0) {
    const y = SIDE - rows - 1;
    boxes.push({ x0: 0, x1: loose, y0: y, y1: y + 1, z0: layers, z1: layers + 1 });
  }
  return boxes;
}

/**
 * How `count` small cubes stand in the big cube, in words: '3 lớp, 4 hàng
 * và 5 khối', '1 lớp', '7 khối'.
 * @param {number} count
 */
export function fillWords(count) {
  const layers = Math.floor(count / 100);
  const rows = Math.floor((count % 100) / 10);
  const loose = count % 10;
  const parts = [];
  if (layers) parts.push(`${layers} lớp`);
  if (rows) parts.push(`${rows} hàng`);
  if (loose) parts.push(`${loose} khối`);
  if (parts.length === 0) return '0 khối';
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(', ')} và ${parts[parts.length - 1]}`;
}

/**
 * The live line of the filling cube.
 * @param {number} count small cubes put in, 0 to 1 000
 * @param {string} small the small unit, 'cm³'
 * @param {string} big the big unit, 'dm³'
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function fillNote(count, small, big) {
  if (count >= SIDE ** 3) {
    return {
      tone: 'ok',
      text: `${fmt(SIDE ** 3)} khối 1 ${small} xếp đầy khối 1 ${big}. Vậy 1 ${big} = ${fmt(SIDE ** 3)} ${small}.`,
    };
  }
  if (count === 0) {
    return { tone: 'info', text: `Khối 1 ${big} còn trống. Em bấm để xếp khối 1 ${small} vào.` };
  }
  return {
    tone: 'info',
    text: `Em đã xếp ${fmt(count)} khối 1 ${small} (${fillWords(count)}). Thể tích phần đã xếp là ${fmt(count)} ${small}.`,
  };
}
