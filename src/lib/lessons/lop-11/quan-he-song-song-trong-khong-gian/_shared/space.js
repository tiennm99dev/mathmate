import { add3, cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';

/**
 * Points, lines and planes in space for the chapter on parallel relations:
 * planes through three points, where a line meets a plane, how two lines lie
 * (cắt nhau, song song, trùng nhau, chéo nhau), parallel projection onto a
 * plane and the hidden (dashed) lines of a convex solid.
 *
 * Model space as in `#lib/geom-engine/solid.js`: z points up.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {{ n: P3, d: number }} Plane the points p with n · p = d */
/** @typedef {'cat' | 'song-song' | 'trung' | 'cheo'} LineRelation */
/** @typedef {string | P3} Spot a named point of a scene, or a point */
/**
 * @typedef {{ key: string, from: Spot, to: Spot, color?: string, width?: number, dash?: 'auto' | boolean }} SceneSegment
 * @typedef {{ key: string, pts: Spot[], fill: string, opacity?: number, stroke?: string }} ScenePolygon
 * @typedef {{ text: string, at: Spot, color?: string, dx?: number, dy?: number }} SceneLabel
 */

export const EPS = 1e-7;

/** @param {P3} a */
export const len3 = (a) => Math.hypot(a.x, a.y, a.z);

/** @param {P3} a @param {P3} b */
export const dist3 = (a, b) => len3(sub3(a, b));

/** @param {P3} a @param {P3} b @param {number} t */
export const lerp3 = (a, b, t) => add3(a, mul3(sub3(b, a), t));

/** @param {P3} a @param {P3} b */
export const mid3 = (a, b) => lerp3(a, b, 0.5);

/**
 * The centroid of some points.
 * @param {P3[]} pts
 */
export function centroid3(pts) {
  const s = pts.reduce((acc, p) => add3(acc, p), { x: 0, y: 0, z: 0 });
  return mul3(s, 1 / pts.length);
}

/**
 * The plane through three points, with a unit normal, or null when they are
 * on one line.
 * @param {P3} a @param {P3} b @param {P3} c
 * @returns {Plane | null}
 */
export function planeThrough(a, b, c) {
  const n = cross3(sub3(b, a), sub3(c, a));
  const l = len3(n);
  if (l < EPS) return null;
  const u = mul3(n, 1 / l);
  return { n: u, d: dot3(u, a) };
}

/**
 * Signed distance from a plane (positive on the side its normal points to).
 * @param {P3} p @param {Plane} plane
 */
export const side = (p, plane) => dot3(plane.n, p) - plane.d;

/**
 * True when a point lies on a plane.
 * @param {P3} p @param {Plane} plane
 */
export const onPlane = (p, plane, eps = 1e-6) => Math.abs(side(p, plane)) < eps;

/**
 * Where the line through p and q meets a plane: the parameter t of
 * p + t (q − p) and the point, or null when the line is parallel to the plane
 * or lies in it.
 * @param {P3} p @param {P3} q @param {Plane} plane
 * @returns {{ t: number, point: P3 } | null}
 */
export function meetPlane(p, q, plane) {
  const dir = sub3(q, p);
  const den = dot3(plane.n, dir);
  if (Math.abs(den) < EPS * Math.max(1, len3(dir))) return null;
  const t = (plane.d - dot3(plane.n, p)) / den;
  return { t, point: lerp3(p, q, t) };
}

/**
 * How the line a1a2 lies against the line b1b2.
 * @param {P3} a1 @param {P3} a2 @param {P3} b1 @param {P3} b2
 * @returns {LineRelation}
 */
export function lineRelation(a1, a2, b1, b2) {
  const u = sub3(a2, a1);
  const v = sub3(b2, b1);
  const w = sub3(b1, a1);
  const scale = len3(u) * len3(v);
  const c = cross3(u, v);
  if (len3(c) < 1e-9 * scale) {
    return len3(cross3(u, w)) < 1e-9 * len3(u) * Math.max(1, len3(w)) ? 'trung' : 'song-song';
  }
  return Math.abs(dot3(c, w)) < 1e-9 * scale * Math.max(1, len3(w)) ? 'cat' : 'cheo';
}

/**
 * The common point of two lines that cut each other, or null otherwise.
 * @param {P3} a1 @param {P3} a2 @param {P3} b1 @param {P3} b2
 * @returns {P3 | null}
 */
export function meetLines(a1, a2, b1, b2) {
  if (lineRelation(a1, a2, b1, b2) !== 'cat') return null;
  const u = sub3(a2, a1);
  const v = sub3(b2, b1);
  const c = cross3(u, v);
  const t = dot3(cross3(sub3(b1, a1), v), c) / dot3(c, c);
  return lerp3(a1, a2, t);
}

/**
 * The parallel projection of a point onto a plane along a direction, or null
 * when the direction is parallel to the plane.
 * @param {P3} p @param {P3} dir @param {Plane} plane
 * @returns {P3 | null}
 */
export function projectAlong(p, dir, plane) {
  const hit = meetPlane(p, add3(p, dir), plane);
  return hit ? hit.point : null;
}

/**
 * The direction with turn `azimuth` (from the x axis, degrees) and rise
 * `elevation` above the ground (degrees), pointing downwards: a light ray
 * coming down at that angle.
 * @param {number} azimuth @param {number} elevation
 * @returns {P3}
 */
export function rayDirection(azimuth, elevation) {
  const a = (azimuth * Math.PI) / 180;
  const e = (elevation * Math.PI) / 180;
  return { x: Math.cos(a) * Math.cos(e), y: Math.sin(a) * Math.cos(e), z: -Math.sin(e) };
}

/**
 * The angle at `b` of the triangle abc, in degrees.
 * @param {P3} a @param {P3} b @param {P3} c
 */
export function angle3(a, b, c) {
  const u = sub3(a, b);
  const v = sub3(c, b);
  const cos = dot3(u, v) / (len3(u) * len3(v));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

/**
 * The faces of a convex solid with their corners ordered counter-clockwise
 * seen from outside, so `facesViewer` can tell front from back. Each face is
 * given by the names of its corners in order around it.
 * @param {Record<string, P3>} points
 * @param {string[][]} faces
 * @returns {{ names: string[], pts: P3[], plane: Plane }[]}
 */
export function orientFaces(points, faces) {
  const all = [...new Set(faces.flat())].map((k) => points[k]);
  const inside = centroid3(all);
  return faces.map((names) => {
    const pts = names.map((k) => points[k]);
    const plane = /** @type {Plane} */ (planeThrough(pts[0], pts[1], pts[2]));
    if (side(inside, plane) > 0) {
      return {
        names: [...names].reverse(),
        pts: [...pts].reverse(),
        plane: { n: mul3(plane.n, -1), d: -plane.d },
      };
    }
    return { names, pts, plane };
  });
}

/**
 * Whether a segment of a drawing is hidden behind a convex solid, the book's
 * rule for dashed lines: a segment lying in the faces' planes is hidden when
 * every face whose plane holds it is turned away; a segment through the inside
 * of the solid is hidden; any other segment is seen.
 * @param {P3} p @param {P3} q
 * @param {{ plane: Plane }[]} faces oriented by `orientFaces`
 * @param {boolean[]} front whether each face is turned towards the viewer
 */
export function isHidden(p, q, faces, front) {
  const holding = faces
    .map((f, i) => i)
    .filter((i) => onPlane(p, faces[i].plane, 1e-6) && onPlane(q, faces[i].plane, 1e-6));
  if (holding.length) return holding.every((i) => !front[i]);
  const m = mid3(p, q);
  return faces.length > 0 && faces.every((f) => side(m, f.plane) < -1e-6);
}
