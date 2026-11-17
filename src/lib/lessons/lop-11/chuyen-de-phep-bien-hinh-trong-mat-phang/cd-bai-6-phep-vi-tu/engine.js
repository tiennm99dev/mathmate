/**
 * The homothety board: a triangle scaled from a movable centre I by a ratio
 * k ≠ 0, including negative ratios that throw the image to the other side of
 * I. The live sentence states what the ratio does and the length and area
 * the image has.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { homothety, ratioTex } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */

/** The triangle ABC on the board: AB = AC = 2, right-angled at A. @type {Pt[]} */
export const TRIANGLE = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 3 },
];

export const NAMES = ['A', 'B', 'C'];

/** The ratios the slider steps through; 0 is never a ratio. */
export const K_VALUES = [-3, -2, -1, -0.5, 0.5, 1, 2, 3];

/** Length of AB and area of ABC on the board. */
export const AB = 2;
export const AREA = 2;

/**
 * The images of the triangle's vertices.
 * @param {Pt} centre @param {number} k
 */
export function scaled(centre, k) {
  return TRIANGLE.map((p) => homothety(p, centre, k));
}

/**
 * The live sentence under the board.
 * @param {number} k
 */
export function homothetyNote(k) {
  const v = `$V_{(I,\\ ${ratioTex(k)})}$`;
  const len = `$A'B' = |k| \\cdot AB = ${ratioTex(Math.abs(k))} \\cdot ${AB} = ${numTex(tidy(Math.abs(k) * AB))}$`;
  const area = `diện tích gấp $k^2 = ${ratioTex(tidy(k * k))}$ lần, bằng $${numTex(tidy(k * k * AREA))}$`;
  if (k === 1) return `${v} biến mỗi điểm thành chính nó: đó là phép đồng nhất.`;
  if (k === -1)
    return `${v} là phép đối xứng tâm $I$: $I$ là trung điểm của $AA'$, $BB'$, $CC'$. Tam giác $A'B'C'$ bằng tam giác $ABC$.`;
  const size = Math.abs(k) > 1 ? 'phóng to' : 'thu nhỏ';
  const side =
    k > 0
      ? "$A'$ nằm trên tia $IA$ (cùng phía với $A$ đối với $I$)"
      : "$A'$ nằm trên tia đối của tia $IA$ ($I$ nằm giữa $A$ và $A'$)";
  return `$k = ${ratioTex(k)}$: hình được ${size}, ${side}. ${len}, $A'B' \\parallel AB$, ${area}.`;
}
