/**
 * The rotation board: a triangle turned about a movable centre O by an
 * angle α, positive counterclockwise; at α = ±180° it is the central
 * symmetry about O.
 */
import { numTex } from '#lib/core/number-format.js';
import { isLattice, ptTex, rotate } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */

/** The triangle ABC on the board. @type {Pt[]} */
export const TRIANGLE = [
  { x: 1, y: 1 },
  { x: 4, y: 1 },
  { x: 1, y: 3 },
];

export const NAMES = ['A', 'B', 'C'];

/**
 * The images of the triangle's vertices.
 * @param {Pt} o @param {number} deg
 */
export function turned(o, deg) {
  return TRIANGLE.map((p) => rotate(p, o, deg));
}

/**
 * An angle in degrees as TeX: '-90^\circ'.
 * @param {number} deg
 */
export function degTex(deg) {
  return `${numTex(deg)}^\\circ`;
}

/**
 * The point written with '=' when its coordinates are whole and '≈' with two
 * decimals otherwise.
 * @param {string} name @param {Pt} p
 */
export function imageTex(name, p) {
  return isLattice(p) ? `${name}${ptTex(p)}` : `${name} \\approx ${ptTex(p)}`;
}

/**
 * The SVG path of the arc from P to its image about O, drawn the way the
 * rotation turns (counterclockwise for a positive angle).
 * @param {import('#lib/core/visuals/svg-math.js').PlaneScale} plane
 * @param {Pt} o @param {Pt} p @param {number} deg
 */
export function arcPath(plane, o, p, deg) {
  const q = rotate(p, o, deg);
  const r = Math.hypot(p.x - o.x, p.y - o.y) * plane.unit;
  if (r < 0.5 || deg === 0) return '';
  // Screen y points down, so a counterclockwise turn on screen is sweep-flag 0.
  const sweep = deg > 0 ? 0 : 1;
  const large = Math.abs(deg) > 180 ? 1 : 0;
  const f = (/** @type {number} */ v) => v.toFixed(1);
  return `M ${f(plane.mx(p.x))} ${f(plane.my(p.y))} A ${f(r)} ${f(r)} 0 ${large} ${sweep} ${f(plane.mx(q.x))} ${f(plane.my(q.y))}`;
}

/**
 * The live sentence under the board.
 * @param {Pt} o @param {number} deg
 */
export function rotationNote(o, deg) {
  const a = rotate(TRIANGLE[0], o, deg);
  const q = `$Q_{(O,\\ ${degTex(deg)})}$`;
  if (deg === 0)
    return `${q} biến mỗi điểm thành chính nó: phép quay góc $0^\\circ$ là phép đồng nhất.`;
  if (Math.abs(deg) === 180)
    return `${q} là phép đối xứng tâm $O$: $O$ là trung điểm của $AA'$, $BB'$, $CC'$. Ở đây $${imageTex("A'", a)}$.`;
  const way =
    deg > 0 ? 'ngược chiều kim đồng hồ (chiều dương)' : 'cùng chiều kim đồng hồ (chiều âm)';
  return `Tam giác quay ${way}. $OA' = OA$ và góc lượng giác $(OA,\\ OA') = ${degTex(deg)}$; ảnh $${imageTex("A'", a)}$. Tam giác $A'B'C'$ bằng tam giác $ABC$.`;
}
