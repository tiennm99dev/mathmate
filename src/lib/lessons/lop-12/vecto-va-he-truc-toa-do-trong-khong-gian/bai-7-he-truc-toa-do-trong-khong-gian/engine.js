import { int } from '#lib/core/drill.js';
import { P, same3 } from '#lib/geom-engine/space.js';

/**
 * The coordinates of a point in the system Oxyz: its projections on the
 * three coordinate planes and the three axes, the box of dashed lines that
 * shows them, and points to locate in the challenge.
 */

/** @typedef {import('#lib/geom-engine/space.js').P3} P3 */

/** Coordinates of the points in the widget go from −LIMIT to LIMIT. */
export const LIMIT = 3;

/**
 * The coordinate planes, each with the projection of a point onto it (hình
 * chiếu vuông góc) and the axes it keeps.
 */
export const PLANES = /** @type {const} */ ([
  { id: 'Oxy', name: '(Oxy)', keep: ['x', 'y'] },
  { id: 'Oyz', name: '(Oyz)', keep: ['y', 'z'] },
  { id: 'Ozx', name: '(Ozx)', keep: ['x', 'z'] },
]);

/** @typedef {(typeof PLANES)[number]['id']} PlaneId */

/**
 * The projection of M onto a coordinate plane: the coordinate off the plane
 * becomes 0.
 * @param {P3} m @param {PlaneId} id
 * @returns {P3}
 */
export function project(m, id) {
  const plane = /** @type {(typeof PLANES)[number]} */ (PLANES.find((p) => p.id === id));
  const keep = /** @type {readonly string[]} */ (plane.keep);
  return P(
    keep.includes('x') ? m.x : 0,
    keep.includes('y') ? m.y : 0,
    keep.includes('z') ? m.z : 0,
  );
}

/**
 * A square of a coordinate plane around O with half-side `half`, for
 * shading the plane.
 * @param {PlaneId} id @param {number} half
 * @returns {P3[]}
 */
export function planeSquare(id, half) {
  /** @type {[number, number][]} */
  const signs = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  return signs.map(([a, b]) => {
    if (id === 'Oxy') return P(a * half, b * half, 0);
    if (id === 'Oyz') return P(0, a * half, b * half);
    return P(a * half, 0, b * half);
  });
}

/**
 * The corner of the box with opposite corners O and M picked by a bit mask
 * (1 keeps x, 2 keeps y, 4 keeps z).
 * @param {P3} m @param {number} mask
 */
export const corner = (m, mask) => P(mask & 1 ? m.x : 0, mask & 2 ? m.y : 0, mask & 4 ? m.z : 0);

/**
 * The edges of the box with opposite corners O and M that have a length,
 * except those on the axes, as pairs of points: the dashed lines that show
 * the coordinates of M.
 * @param {P3} m
 * @returns {{ key: string, from: P3, to: P3 }[]}
 */
export function boxEdges(m) {
  /** @type {{ key: string, from: P3, to: P3 }[]} */
  const out = [];
  const seen = new Set();
  const O = P();
  for (let mask = 1; mask < 8; mask++) {
    for (const bit of [1, 2, 4]) {
      if (mask & bit) continue;
      const from = corner(m, mask);
      const to = corner(m, mask | bit);
      // A zero coordinate flattens the box: skip edges of no length, edges
      // from O (on the axes) and edges already drawn.
      if (same3(from, to) || same3(from, O)) continue;
      const id = [from, to].map((p) => `${p.x},${p.y},${p.z}`).join('|');
      if (seen.has(id)) continue;
      seen.add(id);
      out.push({ key: `${mask}-${bit}`, from, to });
    }
  }
  return out;
}

/**
 * A point to locate: whole coordinates from −LIMIT to LIMIT, at least two of
 * them not zero, different from `not`.
 * @param {() => number} rand @param {P3} [not]
 * @returns {P3}
 */
export function makeTarget(rand, not) {
  for (;;) {
    const p = P(int(rand, -LIMIT, LIMIT), int(rand, -LIMIT, LIMIT), int(rand, 1 - LIMIT, LIMIT));
    const zeros = [p.x, p.y, p.z].filter((v) => v === 0).length;
    if (zeros <= 1 && !(not && same3(p, not))) return p;
  }
}

/**
 * What differs between the placed point and the target, for the feedback:
 * the names of the wrong coordinates.
 * @param {P3} m @param {P3} t
 */
export function wrongCoords(m, t) {
  /** @type {string[]} */
  const out = [];
  if (m.x !== t.x) out.push('hoành độ');
  if (m.y !== t.y) out.push('tung độ');
  if (m.z !== t.z) out.push('cao độ');
  return out;
}
