/**
 * The three objects of a GeoGebra 3D scene, all with whole coefficients:
 * the plane (P): Ax + By + Cz + D = 0, the line d through M with direction
 * u, and the sphere (S) of centre I and radius R. It finds how they meet
 * (the line and the plane, the plane and the sphere, the line and the
 * sphere) with exact integer tests, and writes each object as the input
 * line one types in GeoGebra.
 */

import {
  add3,
  dot3,
  mul3,
  sub3,
  cross3,
  isZero3,
  footOnPlane,
  planeValue,
} from '../_shared/space.js';

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

/**
 * @typedef {{ kind: 'cut', t: number, point: P3 }
 *   | { kind: 'parallel' }
 *   | { kind: 'inside' }
 *   | { kind: 'none' }} LinePlane
 */

/**
 * Where the line X = M + t·u meets the plane n·X + D = 0. `none` when the
 * plane or the line is undefined (n or u is the zero vector).
 * @param {P3} n @param {number} D @param {P3} m @param {P3} u
 * @returns {LinePlane}
 */
export function linePlane(n, D, m, u) {
  if (isZero3(n) || isZero3(u)) return { kind: 'none' };
  const nu = dot3(n, u);
  const value = planeValue(n, D, m);
  if (nu === 0) return value === 0 ? { kind: 'inside' } : { kind: 'parallel' };
  const t = -value / nu;
  return { kind: 'cut', t, point: add3(m, mul3(u, t)) };
}

/**
 * How the plane n·X + D = 0 meets the sphere of centre I and radius R:
 * compares d(I, (P))² · |n|² = (n·I + D)² with R²·|n|². For a cut, `r` is
 * the radius of the circle and `centre` its centre (the foot of the
 * perpendicular from I); for a tangent plane `centre` is the point of contact.
 * @param {P3} n @param {number} D @param {P3} c @param {number} r
 * @returns {{ kind: 'circle' | 'tangent' | 'apart' | 'none', top: number, nn: number, d: number, r: number, centre: P3 | null }}
 */
export function planeSphere(n, D, c, r) {
  const nn = dot3(n, n);
  if (nn === 0) return { kind: 'none', top: 0, nn, d: 0, r: 0, centre: null };
  const top = planeValue(n, D, c);
  const d = Math.abs(top) / Math.sqrt(nn);
  const lhs = top * top;
  const rhs = r * r * nn;
  const centre = footOnPlane(n, D, c);
  if (lhs < rhs) return { kind: 'circle', top, nn, d, r: Math.sqrt(r * r - d * d), centre };
  if (lhs === rhs) return { kind: 'tangent', top, nn, d, r: 0, centre };
  return { kind: 'apart', top, nn, d, r: 0, centre: null };
}

/**
 * The points where the line X = M + t·u meets the sphere |X − I| = R, from
 * |u|²t² + 2u·(M − I)t + |M − I|² − R² = 0: two, one (tangent) or none.
 * @param {P3} m @param {P3} u @param {P3} c @param {number} r
 * @returns {{ kind: 'two' | 'tangent' | 'apart' | 'none', points: P3[], dist: number }}
 */
export function lineSphere(m, u, c, r) {
  if (isZero3(u)) return { kind: 'none', points: [], dist: 0 };
  const w = sub3(m, c);
  const a = dot3(u, u);
  const b = 2 * dot3(u, w);
  const k = dot3(w, w) - r * r;
  const disc = b * b - 4 * a * k;
  const cr = cross3(w, u);
  const dist = Math.sqrt(dot3(cr, cr) / a);
  if (disc < 0) return { kind: 'apart', points: [], dist };
  if (disc === 0) return { kind: 'tangent', points: [add3(m, mul3(u, -b / (2 * a)))], dist };
  const s = Math.sqrt(disc);
  return {
    kind: 'two',
    points: [(-b - s) / (2 * a), (-b + s) / (2 * a)].map((t) => add3(m, mul3(u, t))),
    dist,
  };
}

/**
 * A whole number for a GeoGebra input line: plain digits and an ASCII minus,
 * with −0 written as 0.
 * @param {number} v
 */
const g = (v) => String(v + 0);

/**
 * One term of a linear sum typed in GeoGebra: '2x', ' - y', ' + 3'.
 * @param {number} k @param {string} name @param {boolean} first
 */
function term(k, name, first) {
  if (k === 0) return '';
  const mag = Math.abs(k) === 1 && name ? '' : String(Math.abs(k));
  const sign = k < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ';
  return `${sign}${mag}${name}`;
}

/**
 * The plane as typed in GeoGebra: '2x - y + 3z - 5 = 0'.
 * @param {P3} n @param {number} D
 */
export function planeInput(n, D) {
  let out = '';
  [n.x, n.y, n.z, D].forEach((k, i) => {
    out += term(k, ['x', 'y', 'z', ''][i], out === '');
  });
  return `${out || '0'} = 0`;
}

/**
 * A point as typed in GeoGebra: '(1, -2, 3)'.
 * @param {P3} p
 */
export const pointInput = (p) => `(${g(p.x)}, ${g(p.y)}, ${g(p.z)})`;

/**
 * The line through M with direction u as typed in GeoGebra:
 * 'Line((1, -2, 3), Vector((2, 1, -1)))'.
 * @param {P3} m @param {P3} u
 */
export const lineInput = (m, u) => `Line(${pointInput(m)}, Vector(${pointInput(u)}))`;

/**
 * The sphere as typed in GeoGebra: 'Sphere((1, -2, 3), 3)'.
 * @param {P3} c @param {number} r
 */
export const sphereInput = (c, r) => `Sphere(${pointInput(c)}, ${g(r)})`;
