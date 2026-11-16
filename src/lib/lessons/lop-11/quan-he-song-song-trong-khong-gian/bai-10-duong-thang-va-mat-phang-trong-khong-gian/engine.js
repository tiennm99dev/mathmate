import { centroid3, meetLines, mid3, onPlane, planeThrough } from '../_shared/space.js';

/**
 * The pyramid S.ABCD of the "tìm giao tuyến" widget and its tasks. The base
 * has no parallel sides, so AB meets CD at E and AD meets BC at F; O is where
 * the diagonals AC and BD cross, and M is the midpoint of SA.
 *
 * A point lies on a plane named by three of its points, such as (SAC), when it
 * is one of them or lies on a line through two of them (O ∈ AC ⊂ (SAC)): the
 * reason the widget gives is the one a learner writes.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

const P = (x = 0, y = 0, z = 0) => ({ x, y, z });

/** @param {P3} a @param {P3} b @param {P3} c @param {P3} d */
const cross = (a, b, c, d) => /** @type {P3} */ (meetLines(a, b, c, d));

function build() {
  const A = P(-2.5, -2.5);
  const E0 = P(5.5, -0.5);
  const F0 = P(-0.5, 5);
  const B = P(-2.5 + 0.55 * 8, -2.5 + 0.55 * 2);
  const D = P(-2.5 + 0.6 * 2, -2.5 + 0.6 * 7.5);
  const C = cross(E0, D, F0, B);
  const base = centroid3([A, B, C, D]);
  /** @param {P3} p */
  const shift = (p) => P(p.x - base.x, p.y - base.y, p.z);
  const pts = { A: shift(A), B: shift(B), C: shift(C), D: shift(D) };
  const S = P(0, 0, 4.5);
  return {
    S,
    ...pts,
    O: cross(pts.A, pts.C, pts.B, pts.D),
    E: cross(pts.A, pts.B, pts.C, pts.D),
    F: cross(pts.A, pts.D, pts.B, pts.C),
    M: mid3(S, pts.A),
  };
}

/** @type {Record<string, P3>} */
export const POINTS = build();

/** The candidate common points, in the order of the buttons. */
export const CANDIDATES = ['S', 'A', 'B', 'C', 'D', 'M', 'O', 'E', 'F'];

/** How each constructed point is defined: the lines it lies on. */
export const DEFINED = /** @type {Record<string, string[]>} */ ({
  O: ['AC', 'BD'],
  E: ['AB', 'CD'],
  F: ['AD', 'BC'],
  M: ['SA'],
});

/** The tasks: the two planes, each named by three points, and their common line. */
export const TASKS = [
  { planes: ['SAB', 'SAD'], line: 'SA' },
  { planes: ['SAC', 'SBD'], line: 'SO' },
  { planes: ['SAB', 'SCD'], line: 'SE' },
  { planes: ['SAD', 'SBC'], line: 'SF' },
  { planes: ['MBD', 'SAC'], line: 'MO' },
];

/**
 * Why a point lies on a plane, as a sentence with TeX, or null when it does
 * not lie on it.
 * @param {string} point
 * @param {string} plane three point names
 */
export function reasonOn(point, plane) {
  if (plane.includes(point)) return `$${point}$ là một trong ba điểm xác định $(${plane})$`;
  const line = (DEFINED[point] ?? []).find((l) => plane.includes(l[0]) && plane.includes(l[1]));
  return line ? `$${point} \\in ${line}$ mà $${line} \\subset (${plane})$` : null;
}

/**
 * Whether a point lies on a plane, measured on the figure.
 * @param {string} point
 * @param {string} plane
 */
export function liesOn(point, plane) {
  const [a, b, c] = [...plane].map((k) => POINTS[k]);
  const pl = planeThrough(a, b, c);
  return pl !== null && onPlane(POINTS[point], pl, 1e-6);
}

/**
 * The verdict on a tapped point for a pair of planes.
 * @param {string} point
 * @param {string[]} planes
 * @returns {{ common: boolean, text: string }}
 */
export function judge(point, planes) {
  const [p, q] = planes;
  const rp = reasonOn(point, p);
  const rq = reasonOn(point, q);
  if (rp && rq) return { common: true, text: `Đúng: ${rp}; ${rq}. Vậy $${point}$ là điểm chung.` };
  const missing = rp ? q : p;
  return {
    common: false,
    text: `$${point} \\notin (${missing})$, nên $${point}$ không là điểm chung của hai mặt phẳng.`,
  };
}

/**
 * The line of intersection written the book's way.
 * @param {{ planes: string[], line: string }} task
 */
export function answerText(task) {
  return `$(${task.planes[0]}) \\cap (${task.planes[1]}) = ${task.line}$`;
}
