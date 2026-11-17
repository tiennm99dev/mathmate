import { add3 } from '#lib/geom-engine/solid.js';
import { centroid3, dist3, lerp3 } from '#lib/geom-engine/space.js';

/**
 * A slanted box (hình hộp) ABCD.A'B'C'D' and a plane (α) parallel to its
 * bases that slides up the lateral edges: it cuts AA', BB', CC', DD' at M, N,
 * P, Q and the diagonal AC' at K. The section MNPQ is a parallelogram equal
 * to the base, and the three parallel planes (ABCD), (α), (A'B'C'D') cut AA'
 * and AC' in proportional pieces (định lí Thalès).
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

const A = { x: -2.2, y: -1.6, z: 0 };
const B = { x: 1.8, y: -1.6, z: 0 };
const D = { x: -1.4, y: 1.6, z: 0 };
const C = { x: B.x + D.x - A.x, y: B.y + D.y - A.y, z: 0 };
/** The lateral edge AA' as a vector. */
export const LIFT = { x: 0.8, y: 0.6, z: 3.6 };

/** @type {Record<string, P3>} */
export const SOLID = {
  A,
  B,
  C,
  D,
  "A'": add3(A, LIFT),
  "B'": add3(B, LIFT),
  "C'": add3(C, LIFT),
  "D'": add3(D, LIFT),
};

export const FACES = [
  ['A', 'B', 'C', 'D'],
  ["A'", "B'", "C'", "D'"],
  ['A', 'B', "B'", "A'"],
  ['B', 'C', "C'", "B'"],
  ['C', 'D', "D'", "C'"],
  ['D', 'A', "A'", "D'"],
];

/**
 * The section at height fraction t (0 at the bottom base, 1 at the top).
 * @param {number} t
 */
export function sectionAt(t) {
  return {
    M: lerp3(SOLID.A, SOLID["A'"], t),
    N: lerp3(SOLID.B, SOLID["B'"], t),
    P: lerp3(SOLID.C, SOLID["C'"], t),
    Q: lerp3(SOLID.D, SOLID["D'"], t),
    K: lerp3(SOLID.A, SOLID["C'"], t),
  };
}

/**
 * The drawn part of (α): the section enlarged about its centre.
 * @param {number} t
 * @param {number} [grow]
 */
export function planePatch(t, grow = 1.45) {
  const s = sectionAt(t);
  const pts = [s.M, s.N, s.P, s.Q];
  const c = centroid3(pts);
  return pts.map((p) => lerp3(c, p, grow));
}

/**
 * The pieces the three planes cut on AA' and on AC'.
 * @param {number} t
 */
export function pieces(t) {
  const s = sectionAt(t);
  return {
    AM: dist3(SOLID.A, s.M),
    MA: dist3(s.M, SOLID["A'"]),
    AK: dist3(SOLID.A, s.K),
    KC: dist3(s.K, SOLID["C'"]),
  };
}
