import { coords, dot3, opTex, sqrtTex, sub3 } from '../_shared/space.js';

/** @typedef {import('../_shared/space.js').P3} P3 */

/** The houses of the village to be covered, on the ground z = 0 (unit: km). */
export const HOUSES = /** @type {P3[]} */ ([
  { x: 2, y: 1, z: 0 },
  { x: -1, y: 2, z: 0 },
  { x: 0, y: -2, z: 0 },
  { x: 3, y: -1, z: 0 },
  { x: -2, y: -1, z: 0 },
  { x: 1, y: 3, z: 0 },
]);

/** Range of the centre's x and y on the steppers; the height c runs 0..HIGH. */
export const LIMIT = 3;
export const HIGH = 3;

/**
 * Where M lies with respect to the sphere of centre I and radius R, from
 * IM² against R² (whole numbers, so the test is exact): 'trong' inside,
 * 'tren' on the sphere, 'ngoai' outside.
 * @param {P3} centre @param {number} r @param {P3} m
 */
export function placeOf(centre, r, m) {
  const d = sub3(m, centre);
  const d2 = dot3(d, d);
  return { d2, where: d2 < r * r ? 'trong' : d2 === r * r ? 'tren' : 'ngoai' };
}

/**
 * IM² worked out in TeX: 'IM^2 = (2 - 0)^2 + (1 - 1)^2 + (0 - 2)^2 = 8'.
 * @param {P3} centre @param {P3} m
 */
export function distanceTex(centre, m) {
  const c = coords(centre);
  const p = coords(m);
  const d = sub3(m, centre);
  const parts = p.map((v, i) => `(${v} - ${opTex(c[i])})^2`).join(' + ');
  return `IM^2 = ${parts} = ${dot3(d, d)}`;
}

/**
 * The houses a station covers: those inside or on the sphere.
 * @param {P3} centre @param {number} r
 */
export const covered = (centre, r) =>
  HOUSES.filter((h) => placeOf(centre, r, h).where !== 'ngoai').length;

/**
 * The smallest whole radius with which a station at a whole point of the
 * widget's range covers every house.
 */
export function bestRadius() {
  let best = Infinity;
  for (let x = -LIMIT; x <= LIMIT; x++)
    for (let y = -LIMIT; y <= LIMIT; y++)
      for (let z = 0; z <= HIGH; z++) {
        const far = Math.max(...HOUSES.map((h) => placeOf({ x, y, z }, 0, h).d2));
        best = Math.min(best, Math.ceil(Math.sqrt(far) - 1e-9));
      }
  return best;
}

/**
 * The radius of the circle the sphere cuts on the ground z = 0, in TeX:
 * √(R² − c²), or null when the sphere does not reach the ground.
 * @param {P3} centre @param {number} r
 */
export function groundRadius(centre, r) {
  const s = r * r - centre.z * centre.z;
  if (s < 0) return null;
  return { value: Math.sqrt(s), tex: `\\sqrt{${r}^2 - ${opTex(centre.z)}^2} = ${sqrtTex(s)}` };
}
