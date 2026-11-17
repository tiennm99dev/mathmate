import {
  coordTex,
  coords,
  dot3,
  footOnPlane,
  isZero3,
  opTex,
  overSqrtTex,
  planeD,
  planeTex,
  planeValue,
  pointNormalTex,
  sqrtTex,
} from '../_shared/space.js';

/** @typedef {import('../_shared/space.js').P3} P3 */

/** Largest coordinate a stepper of the widget reaches. */
export const LIMIT = 3;

/**
 * Everything the widget writes about the plane (P) through M0 with normal
 * vector n and a point Q: the equation in point-normal and general form, the
 * value of Ax + By + Cz + D at Q and the distance d(Q, (P)), exact and
 * approximate. Null when n is the zero vector (no plane).
 * @param {P3} n @param {P3} m0 @param {P3} q
 */
export function planeWork(n, m0, q) {
  if (isZero3(n)) return null;
  const D = planeD(n, m0);
  const nn = dot3(n, n);
  const value = planeValue(n, D, q);
  const [A, B, C] = coords(n);
  const [x, y, z] = coords(q);
  const exact = overSqrtTex(Math.abs(value), nn);
  const distance = Math.abs(value) / Math.sqrt(nn);
  return {
    D,
    value,
    distance,
    foot: footOnPlane(n, D, q),
    pointNormalTex: pointNormalTex(n, m0),
    generalTex: planeTex(n, D),
    normalTex: `\\vec{n} = ${coordTex(n)}`,
    distanceTex: `d(Q, (P)) = \\dfrac{|${opTex(A)} \\cdot ${opTex(x)} + ${opTex(B)} \\cdot ${opTex(y)} + ${opTex(C)} \\cdot ${opTex(z)} + ${opTex(D)}|}{\\sqrt{${opTex(A)}^2 + ${opTex(B)}^2 + ${opTex(C)}^2}} = \\dfrac{${Math.abs(value)}}{${sqrtTex(nn)}} = ${exact}`,
  };
}
