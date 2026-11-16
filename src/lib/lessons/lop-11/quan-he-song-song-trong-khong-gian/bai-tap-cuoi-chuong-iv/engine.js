import { cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';
import { centroid3, dist3, len3, lerp3, side } from '../_shared/space.js';

/**
 * Cross-sections (thiết diện) of the pyramid S.ABCD with a parallelogram base
 * cut by a plane (α): through three points on its edges, or through one point
 * and parallel to two of its edges. The section is the polygon whose vertices
 * are where (α) meets the edges and whose sides lie in the faces.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {import('../_shared/space.js').Plane} Plane */
/** @typedef {'cut' | 'vertex' | 'none'} EdgeHit */
/**
 * @typedef {{ name: string, edge: string, t: number }} GivenPoint
 *   a point on the edge XY with XM : XY = t
 * @typedef {{ id: string, label: string, given: GivenPoint[], parallel?: [string, string], text: string }} Preset
 */

/** The pyramid: A + C = B + D, so ABCD is a parallelogram. */
export const PYRAMID = /** @type {Record<string, P3>} */ ({
  S: { x: -0.3, y: 0.2, z: 3.4 },
  A: { x: -2.4, y: -1.5, z: 0 },
  B: { x: 1.6, y: -1.5, z: 0 },
  C: { x: 2.4, y: 1.5, z: 0 },
  D: { x: -1.6, y: 1.5, z: 0 },
});

/** Edges, named by their two ends. */
export const EDGES = ['SA', 'SB', 'SC', 'SD', 'AB', 'BC', 'CD', 'AD'];

/** Faces, by their corners in order around them. */
export const FACES = [
  ['S', 'A', 'B'],
  ['S', 'B', 'C'],
  ['S', 'C', 'D'],
  ['S', 'D', 'A'],
  ['A', 'B', 'C', 'D'],
];

/** The planes the learner can cut the pyramid with. */
export const PRESETS = /** @type {Preset[]} */ ([
  {
    id: 'ba-diem-canh-ben',
    label: 'Qua M, N, P trên cạnh bên',
    given: [
      { name: 'M', edge: 'SA', t: 0.5 },
      { name: 'N', edge: 'SB', t: 0.7 },
      { name: 'P', edge: 'SC', t: 0.4 },
    ],
    text: '$(\\alpha) = (MNP)$ với $M \\in SA$, $N \\in SB$, $P \\in SC$.',
  },
  {
    id: 'song-song-day',
    label: 'Qua M, song song với đáy',
    given: [{ name: 'M', edge: 'SA', t: 0.4 }],
    parallel: ['AB', 'BC'],
    text: '$(\\alpha)$ qua $M \\in SA$ và song song với $(ABCD)$.',
  },
  {
    id: 'song-song-sa-bc',
    label: 'Qua M, song song với SA và BC',
    given: [{ name: 'M', edge: 'AB', t: 0.4 }],
    parallel: ['SA', 'BC'],
    text: '$(\\alpha)$ qua $M \\in AB$, song song với $SA$ và $BC$.',
  },
  {
    id: 'hai-diem-tren-day',
    label: 'Qua M trên SC, N, P trên đáy',
    given: [
      { name: 'M', edge: 'SC', t: 0.4 },
      { name: 'N', edge: 'AB', t: 0.5 },
      { name: 'P', edge: 'AD', t: 0.5 },
    ],
    text: '$(\\alpha) = (MNP)$ với $M \\in SC$, $N \\in AB$, $P \\in AD$.',
  },
]);

/** Names for the new vertices of a section, in turn. */
const FRESH = ['Q', 'R', 'T', 'U', 'V', 'E', 'F'];
const TOL = 1e-6;

/** @param {string} edge @returns {[P3, P3]} */
export const endsOf = (edge) => [PYRAMID[edge[0]], PYRAMID[edge[1]]];

/** @param {string} edge */
const directionOf = (edge) => {
  const [p, q] = endsOf(edge);
  return sub3(q, p);
};

/** @param {GivenPoint} g */
export const pointOf = (g) => {
  const [p, q] = endsOf(g.edge);
  return lerp3(p, q, g.t);
};

/**
 * The plane of a preset with the given points moved to `ts`.
 * @param {Preset} preset
 * @param {number[]} ts one ratio per given point
 * @returns {{ plane: Plane, given: (GivenPoint & { point: P3 })[] }}
 */
export function planeOf(preset, ts) {
  const given = preset.given.map((g, i) => {
    const moved = { ...g, t: ts[i] ?? g.t };
    return { ...moved, point: pointOf(moved) };
  });
  const p0 = given[0].point;
  const n = preset.parallel
    ? cross3(directionOf(preset.parallel[0]), directionOf(preset.parallel[1]))
    : cross3(sub3(given[1].point, p0), sub3(given[2].point, p0));
  const u = mul3(n, 1 / len3(n));
  return { plane: { n: u, d: dot3(u, p0) }, given };
}

/**
 * How (α) meets one edge: inside it (`cut`), only at an end (`vertex`), or
 * not at all (`none`).
 * @param {string} edge @param {Plane} plane
 * @returns {{ edge: string, hit: EdgeHit, point: P3 | null, t: number | null }}
 */
export function meetEdge(edge, plane) {
  const [p, q] = endsOf(edge);
  const a = side(p, plane);
  const b = side(q, plane);
  if (Math.abs(a) < TOL && Math.abs(b) < TOL) return { edge, hit: 'vertex', point: null, t: null };
  if (Math.abs(a) < TOL) return { edge, hit: 'vertex', point: p, t: 0 };
  if (Math.abs(b) < TOL) return { edge, hit: 'vertex', point: q, t: 1 };
  if (a * b > 0) return { edge, hit: 'none', point: null, t: null };
  const t = a / (a - b);
  return { edge, hit: 'cut', point: lerp3(p, q, t), t };
}

/** @param {P3} a @param {P3} b */
const parallel = (a, b) => len3(cross3(a, b)) < 1e-6 * len3(a) * len3(b);

/**
 * The shape of a section from its vertices in order.
 * @param {P3[]} pts
 * @returns {'tam-giac' | 'hinh-binh-hanh' | 'hinh-thang' | 'tu-giac' | 'ngu-giac' | 'khac'}
 */
export function shapeOf(pts) {
  if (pts.length === 3) return 'tam-giac';
  if (pts.length === 5) return 'ngu-giac';
  if (pts.length !== 4) return 'khac';
  const s = pts.map((p, i) => sub3(pts[(i + 1) % 4], p));
  const one = parallel(s[0], s[2]);
  const two = parallel(s[1], s[3]);
  if (one && two) return 'hinh-binh-hanh';
  return one || two ? 'hinh-thang' : 'tu-giac';
}

export const SHAPE_NAME = {
  'tam-giac': 'tam giác',
  'hinh-binh-hanh': 'hình bình hành',
  'hinh-thang': 'hình thang',
  'tu-giac': 'tứ giác',
  'ngu-giac': 'ngũ giác',
  khac: 'đa giác',
};

/**
 * The section of the pyramid by a preset plane: how (α) meets every edge,
 * the named vertices in order around the polygon, the face holding each side
 * and the shape.
 * @param {Preset} preset @param {number[]} ts
 */
export function sectionOf(preset, ts) {
  const { plane, given } = planeOf(preset, ts);
  const hits = EDGES.map((e) => meetEdge(e, plane));
  /** @type {{ name: string, point: P3, edges: string[] }[]} */
  const vertices = [];
  const fresh = FRESH.filter((n) => !given.some((g) => g.name === n));
  for (const h of hits) {
    if (!h.point) continue;
    const same = vertices.find((v) => dist3(v.point, /** @type {P3} */ (h.point)) < 1e-6);
    if (same) {
      same.edges.push(h.edge);
      continue;
    }
    const mine = given.find((g) => g.edge === h.edge);
    const name =
      h.hit === 'vertex'
        ? h.t === 0
          ? h.edge[0]
          : h.edge[1]
        : mine
          ? mine.name
          : /** @type {string} */ (fresh.shift());
    vertices.push({ name, point: h.point, edges: [h.edge] });
  }
  const c = centroid3(vertices.map((v) => v.point));
  const first = vertices.length ? sub3(vertices[0].point, c) : { x: 1, y: 0, z: 0 };
  const u = mul3(first, 1 / (len3(first) || 1));
  const w = cross3(plane.n, u);
  const angle = (/** @type {P3} */ p) => {
    const r = sub3(p, c);
    return Math.atan2(dot3(r, w), dot3(r, u));
  };
  vertices.sort((a, b) => angle(a.point) - angle(b.point));
  const start = Math.max(
    0,
    vertices.findIndex((v) => v.name === given[0].name),
  );
  vertices.push(...vertices.splice(0, start));
  const sides = vertices.map((v, i) => {
    const next = vertices[(i + 1) % vertices.length];
    const face = FACES.find((f) => {
      const letters = f.join('');
      const inFace = (/** @type {{ edges: string[] }} */ x) =>
        x.edges.some((e) => letters.includes(e[0]) && letters.includes(e[1]));
      return inFace(v) && inFace(next);
    });
    return { from: v.name, to: next.name, face: face ? face.join('') : '' };
  });
  return {
    plane,
    given,
    hits,
    vertices,
    sides,
    shape: shapeOf(vertices.map((v) => v.point)),
    centre: c,
  };
}

/**
 * Checks the edges a learner picked as the ones (α) cuts. An edge (α) meets
 * only at an end may be picked or not.
 * @param {Set<string>} picked
 * @param {{ edge: string, hit: EdgeHit }[]} hits
 */
export function judge(picked, hits) {
  const missing = hits.filter((h) => h.hit === 'cut' && !picked.has(h.edge)).map((h) => h.edge);
  const extra = hits.filter((h) => h.hit === 'none' && picked.has(h.edge)).map((h) => h.edge);
  return { ok: missing.length === 0 && extra.length === 0, missing, extra };
}
