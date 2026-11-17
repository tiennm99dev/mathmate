/**
 * The sum of three vectors in space, built the two ways the lesson draws in
 * GeoGebra 3D: one after another (quy tắc ba điểm twice) and as the diagonal
 * of the parallelepiped (hình hộp) on the three vectors from one point.
 * Vectors are { x, y, z } with whole coordinates; z points up, as in
 * `#lib/geom-engine/solid.js`.
 */

import { add3, cross3, dot3 } from '#lib/geom-engine/solid.js';
import { intText } from '#lib/core/number-format.js';

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

/** @param {number} x @param {number} y @param {number} z @returns {P3} */
export const P = (x, y, z) => ({ x, y, z });

export const ORIGIN = P(0, 0, 0);

/** u + v + w. @param {P3} u @param {P3} v @param {P3} w */
export const sum3 = (u, v, w) => add3(add3(u, v), w);

/** @param {P3} a @param {P3} b */
export const same3 = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z;

/**
 * The mixed product u · (v × w): 0 exactly when the three vectors are
 * coplanar (đồng phẳng), so the parallelepiped on them is flat.
 * @param {P3} u @param {P3} v @param {P3} w
 */
export const mixed = (u, v, w) => dot3(u, cross3(v, w));

/**
 * The eight vertices of the parallelepiped with vertex O and edges u, v, w
 * from O, named as the box ABCD.A'B'C'D' with A = O, B = O + u, D = O + v
 * and A' = O + w; C' = O + u + v + w is the far end of the diagonal AC'.
 * @param {P3} u @param {P3} v @param {P3} w @param {P3} [o]
 * @returns {Record<string, P3>}
 */
export function boxCorners(u, v, w, o = ORIGIN) {
  const A = o;
  const B = add3(o, u);
  const D = add3(o, v);
  const C = add3(B, v);
  return {
    A,
    B,
    C,
    D,
    "A'": add3(A, w),
    "B'": add3(B, w),
    "C'": add3(C, w),
    "D'": add3(D, w),
  };
}

/** The twelve edges of the box by vertex names. */
export const BOX_EDGES = /** @type {[string, string][]} */ ([
  ['A', 'B'],
  ['B', 'C'],
  ['C', 'D'],
  ['D', 'A'],
  ["A'", "B'"],
  ["B'", "C'"],
  ["C'", "D'"],
  ["D'", "A'"],
  ['A', "A'"],
  ['B', "B'"],
  ['C', "C'"],
  ['D', "D'"],
]);

/**
 * The chain O → O + u → O + u + v → O + u + v + w of the head-to-tail
 * construction: each next vector starts where the previous one ends.
 * @param {P3} u @param {P3} v @param {P3} w
 */
export function chain(u, v, w) {
  const p1 = u;
  const p2 = add3(u, v);
  const p3 = add3(p2, w);
  return [ORIGIN, p1, p2, p3];
}

/** Coordinates the book's way: (1; −2; 3). @param {P3} a */
export const coordText = (a) => `(${intText(a.x)}; ${intText(a.y)}; ${intText(a.z)})`;

/** Coordinates as TeX: (1; -2; 3). @param {P3} a */
export const coordTex = (a) => `(${a.x}; ${a.y}; ${a.z})`;

/**
 * The GeoGebra input line that makes a vector from its coordinates; the
 * software separates coordinates by commas: u = Vector((1, -2, 3)).
 * @param {string} name @param {P3} a
 */
export const ggbVector = (name, a) => `${name} = Vector((${a.x}, ${a.y}, ${a.z}))`;

/**
 * √n for a whole n ≥ 0, simplified, as plain text: 29 → '√29', 24 → '2√6',
 * 9 → '3'.
 * @param {number} n
 */
export function rootText(n) {
  let out = 1;
  let rest = n;
  for (let k = 2; k * k <= rest; k++) {
    while (rest % (k * k) === 0) {
      out *= k;
      rest /= k * k;
    }
  }
  if (n === 0) return '0';
  if (rest === 1) return String(out);
  return out === 1 ? `√${rest}` : `${out}√${rest}`;
}

/** The length |a| as plain text, exact: '√29'. @param {P3} a */
export const lengthText = (a) => rootText(dot3(a, a));

/**
 * Vectors w a challenge asks for; the target point is u + v + w for the
 * current u and v, so it can always be reached with w in −3..3.
 */
export const CHALLENGE_W = [P(1, -1, 3), P(-2, 2, 1), P(3, 0, -2), P(-1, -3, 2), P(2, 3, 1)];

/**
 * The challenge feedback: how far the sum still is from the target, by
 * coordinates, in words.
 * @param {P3} s the current sum @param {P3} target
 */
export function challengeText(s, target) {
  if (same3(s, target)) {
    return `Đúng rồi! Vectơ tổng đi từ O đến đúng điểm T${coordText(target)}.`;
  }
  const gap = P(target.x - s.x, target.y - s.y, target.z - s.z);
  return `Vectơ tổng đang chỉ tới ${coordText(s)}. Còn thiếu ${coordText(gap)}: hãy cộng thêm từng toạ độ này vào toạ độ của w.`;
}

/**
 * The part of space a scene keeps in view: the centre of the box around the
 * points (and the origin) and the radius of the sphere through its corners,
 * so the drawing fits however it is turned; at least 2.
 * @param {P3[]} points
 * @returns {{ centre: P3, radius: number }}
 */
export function sceneFrame(points) {
  const all = [ORIGIN, ...points];
  /** @param {'x' | 'y' | 'z'} k */
  const span = (k) => {
    const vs = all.map((p) => p[k]);
    return [Math.min(...vs), Math.max(...vs)];
  };
  const [x0, x1] = span('x');
  const [y0, y1] = span('y');
  const [z0, z1] = span('z');
  return {
    centre: P((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2),
    radius: Math.max(2, Math.hypot(x1 - x0, y1 - y0, z1 - z0) / 2 + 0.4),
  };
}
