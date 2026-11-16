import { lerp3 } from '../_shared/space.js';

/**
 * A line a = AB above the ground plane (P): z = 0, given by the heights of A
 * and B and the turn of its shadow. It lies in (P), is parallel to (P) or
 * cuts (P) at M. When a ∥ (P), a plane (Q) turning about a cuts (P) along a
 * line b that stays parallel to a.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {'nam-trong' | 'song-song' | 'cat'} LinePlace */

/** Half the sides of the drawn part of (P). */
export const HALF = { x: 4.2, y: 3.2 };
const HALF_LENGTH = 2.2;

/**
 * The line and where it stands against (P).
 * @param {number} hA height of A
 * @param {number} hB height of B
 * @param {number} turn direction of the shadow, degrees from the x axis
 * @returns {{ A: P3, B: P3, place: LinePlace, t: number | null, M: P3 | null, seen: boolean }}
 *   `t` is the parameter of M on A + t(B − A); `seen` whether M is in the drawn part of (P)
 */
export function lineOf(hA, hB, turn) {
  const r = (turn * Math.PI) / 180;
  const u = { x: Math.cos(r) * HALF_LENGTH, y: Math.sin(r) * HALF_LENGTH };
  const A = { x: -u.x, y: -u.y, z: hA };
  const B = { x: u.x, y: u.y, z: hB };
  if (hA === hB) {
    return { A, B, place: hA === 0 ? 'nam-trong' : 'song-song', t: null, M: null, seen: false };
  }
  const t = hA / (hA - hB);
  const M = lerp3(A, B, t);
  M.z = 0;
  const seen = Math.abs(M.x) <= HALF.x && Math.abs(M.y) <= HALF.y;
  return { A, B, place: 'cat', t, M, seen };
}

/**
 * The plane (Q) through a line parallel to (P), turned by `tilt` degrees from
 * the upright plane through a, and its line b of intersection with (P).
 * @param {P3} A @param {P3} B two points of a, at one height h ≠ 0
 * @param {number} tilt from −60° to 60°
 * @returns {{ b1: P3, b2: P3, shift: number }} b1, b2 under A and B on b; `shift` how far b is from a's shadow
 */
export function cutBy(A, B, tilt) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const l = Math.hypot(dx, dy);
  const perp = { x: -dy / l, y: dx / l };
  const shift = A.z * Math.tan((tilt * Math.PI) / 180);
  return {
    b1: { x: A.x + perp.x * shift, y: A.y + perp.y * shift, z: 0 },
    b2: { x: B.x + perp.x * shift, y: B.y + perp.y * shift, z: 0 },
    shift,
  };
}
