import { add3 } from '#lib/geom-engine/solid.js';
import { P, same3 } from '#lib/geom-engine/space.js';
import { arrowTex, CUBE, cubeDot, cubeVector } from '../_shared/cube.js';

/**
 * The parallelepiped (hình hộp) ABCD.A'B'C'D' built on three edge vectors
 * from A, and the sums of those vectors: a choice of edges is a bit mask
 * (1 for AB, 2 for AD, 4 for AA'), and the sum of the chosen vectors is the
 * vector from A to the vertex named by the mask. Also the dot products of
 * vectors of the cube of edge a.
 */

/** @typedef {import('#lib/geom-engine/space.js').P3} P3 */

/** The vertex reached from A by the sum of the chosen edge vectors. */
export const VERTEX = ['A', 'B', 'D', 'C', "A'", "B'", "D'", "C'"];

/** The three edge vectors from A, by bit. */
export const EDGES = /** @type {const} */ ([
  { bit: 1, to: 'B' },
  { bit: 2, to: 'D' },
  { bit: 4, to: "A'" },
]);

/**
 * The corners of a parallelepiped with AB = 3 along Ox, AD = 2 making the
 * angle `base` (degrees) with AB in the floor, and AA' of height 2 leaning
 * by `lean` along Ox.
 * @param {number} base @param {number} lean
 * @returns {Record<string, P3>}
 */
export function boxPoints(base, lean) {
  const r = (base * Math.PI) / 180;
  const a = P(3, 0, 0);
  const b = P(2 * Math.cos(r), 2 * Math.sin(r), 0);
  const c = P(lean, 0, 2);
  /** @type {Record<string, P3>} */
  const out = {};
  VERTEX.forEach((name, mask) => {
    let p = P();
    if (mask & 1) p = add3(p, a);
    if (mask & 2) p = add3(p, b);
    if (mask & 4) p = add3(p, c);
    out[name] = p;
  });
  return out;
}

/** The twelve edges of the parallelepiped as pairs of masks. */
export const BOX_EDGES = /** @type {[number, number][]} */ (
  [0, 1, 2, 3, 4, 5, 6, 7].flatMap((m) =>
    [1, 2, 4].filter((bit) => !(m & bit)).map((bit) => [m, m | bit]),
  )
);

/**
 * The head-to-tail path of a sum: from A along each chosen edge vector in
 * turn, as pairs of masks; each step is a vector equal to its edge from A.
 * @param {number} mask
 * @returns {{ from: number, to: number, bit: number }[]}
 */
export function chain(mask) {
  /** @type {{ from: number, to: number, bit: number }[]} */
  const out = [];
  let at = 0;
  for (const { bit } of EDGES) {
    if (mask & bit) {
      out.push({ from: at, to: at | bit, bit });
      at |= bit;
    }
  }
  return out;
}

/**
 * `\overrightarrow{AB}` of the edge with this bit.
 * @param {number} bit
 */
const edgeTex = (bit) =>
  arrowTex('A', /** @type {string} */ (EDGES.find((e) => e.bit === bit)?.to));

/**
 * The sum of the chosen edge vectors as TeX: "\overrightarrow{AB} +
 * \overrightarrow{AD} = \overrightarrow{AC}"; null for no choice.
 * @param {number} mask
 */
export function sumTex(mask) {
  if (!mask) return null;
  const terms = EDGES.filter((e) => mask & e.bit).map((e) => edgeTex(e.bit));
  return `${terms.join(' + ')} = ${arrowTex('A', VERTEX[mask])}`;
}

/**
 * Why the sum lands on its vertex: the head-to-tail sum along the path and
 * the edges it uses that equal the vectors from A, in rich text.
 * @param {number} mask
 */
export function why(mask) {
  const steps = chain(mask);
  if (steps.length < 2) return '';
  const path = steps.map((s) => arrowTex(VERTEX[s.from], VERTEX[s.to])).join(' + ');
  const equal = steps
    .filter((s) => s.from !== 0)
    .map((s) => `$${arrowTex(VERTEX[s.from], VERTEX[s.to])} = ${edgeTex(s.bit)}$`);
  return `Vì ${equal.join(', ')} nên tổng bằng $${path} = ${arrowTex('A', VERTEX[mask])}$ (quy tắc ba điểm).`;
}

/** Sums to look for in the challenge: two or three edge vectors. */
export const TARGETS = [3, 5, 6, 7];

/** Vectors of the cube for the dot product, by their two vertices. */
export const U_CHOICES = /** @type {[string, string][]} */ ([
  ['A', 'B'],
  ['A', 'C'],
  ['A', "C'"],
  ['A', "D'"],
]);

export const V_CHOICES = /** @type {[string, string][]} */ ([
  ['A', 'D'],
  ['A', "B'"],
  ["B'", "D'"],
  ["A'", 'C'],
  ['C', 'A'],
]);

/**
 * The name of the point A + v: a vertex of the cube when it is one, else E.
 * @param {P3} v
 */
export function endName(v) {
  return Object.keys(CUBE).find((k) => same3(CUBE[k], v)) ?? 'E';
}

/**
 * The dot product of two vectors of the cube of edge a, both named by their
 * ends: lengths, cosine, angle and the product, with the vector moved to A
 * when it does not start there.
 * @param {[string, string]} u @param {[string, string]} v
 */
export function dotOf(u, v) {
  const uv = cubeVector(u[0], u[1]);
  const vv = cubeVector(v[0], v[1]);
  const d = cubeDot(uv, vv);
  const moved = v[0] === 'A' ? null : endName(vv);
  return { ...d, u: uv, v: vv, moved };
}
