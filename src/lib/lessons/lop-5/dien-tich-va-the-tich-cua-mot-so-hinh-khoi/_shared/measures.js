/**
 * The areas and volumes of the chapter, worked the grade 5 book's way: each
 * step a short sentence with × and the result. Lengths are in one unit.
 * Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * The surface of a box of length a, width b and height c.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function boxAreas(a, b, c) {
  const perimeter = (a + b) * 2;
  const lateral = perimeter * c;
  const base = a * b;
  const total = lateral + base * 2;
  return {
    perimeter,
    lateral,
    base,
    total,
    steps: {
      perimeter: `(${fmt(a)} + ${fmt(b)}) × 2 = ${fmt(perimeter)}`,
      lateral: `${fmt(perimeter)} × ${fmt(c)} = ${fmt(lateral)}`,
      base: `${fmt(a)} × ${fmt(b)} = ${fmt(base)}`,
      total: `${fmt(lateral)} + ${fmt(base)} × 2 = ${fmt(total)}`,
    },
  };
}

/**
 * The surface of a cube of edge a.
 * @param {number} a
 */
export function cubeAreas(a) {
  const face = a * a;
  const lateral = face * 4;
  const total = face * 6;
  return {
    face,
    lateral,
    total,
    steps: {
      face: `${fmt(a)} × ${fmt(a)} = ${fmt(face)}`,
      lateral: `${fmt(face)} × 4 = ${fmt(lateral)}`,
      total: `${fmt(face)} × 6 = ${fmt(total)}`,
    },
  };
}

/**
 * The volume of a box of length a, width b and height c, as layers of unit
 * cubes: a × b cubes in a layer, c layers.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function boxVolume(a, b, c) {
  const layer = a * b;
  const volume = layer * c;
  return {
    layer,
    volume,
    steps: {
      layer: `${fmt(a)} × ${fmt(b)} = ${fmt(layer)}`,
      volume: `${fmt(a)} × ${fmt(b)} × ${fmt(c)} = ${fmt(volume)}`,
    },
  };
}
