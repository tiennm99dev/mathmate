/**
 * The ellipse board: a is chosen, the focus F₂(c; 0) is dragged along Ox
 * (F₁ follows symmetrically) and M slides on the ellipse. The readout gives
 * the canonical equation, the eccentricity, the focal radii MF₁ = a + ex,
 * MF₂ = a − ex with their constant sum 2a, and the directrix ratio.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { ellipse, focalRadii, valueTex } from '../_shared/conic.js';

/** The board, in grid units. */
export const BOX = { xMin: -10, xMax: 10, yMin: -7, yMax: 7 };

/** Whole values of a, and the step of the focus. */
export const A_RANGE = /** @type {const} */ ([3, 6]);
export const C_STEP = 0.5;

/**
 * The largest c for a given a: the ellipse must stay an ellipse (c < a).
 * @param {number} a
 */
export const cMax = (a) => a - C_STEP;

/**
 * The ellipse with semi-major axis a and focal half-distance c.
 * @param {number} a @param {number} c
 */
export function ellipseAC(a, c) {
  return ellipse(a, Math.sqrt(a * a - c * c));
}

/**
 * The canonical equation in TeX, b² = a² − c² written as a decimal when needed.
 * @param {number} a @param {number} c
 */
export function equationTex(a, c) {
  const b2 = tidy(a * a - c * c, 6);
  if (c === 0) return `x^2 + y^2 = ${a * a}`;
  return `\\dfrac{x^2}{${a * a}} + \\dfrac{y^2}{${numTex(b2)}} = 1`;
}

/**
 * The readout lines at M(x; y).
 * @param {number} a @param {number} c @param {{ x: number, y: number }} M
 * @param {boolean} withDirectrix
 */
export function readout(a, c, M, withDirectrix) {
  const E = ellipseAC(a, c);
  const [r1, r2] = focalRadii(E, M.x);
  const lines = [
    `a = ${a},\\ c = ${numTex(c)},\\ b = \\sqrt{a^2 - c^2} ${valueTex(E.b)}`,
    `e = \\dfrac{c}{a} ${valueTex(E.e, 3)}`,
    `MF_1 = a + ex ${valueTex(r1)},\\ MF_2 = a - ex ${valueTex(r2)}`,
    `MF_1 + MF_2 = ${2 * a} = 2a`,
  ];
  if (withDirectrix && c > 0) {
    const d2 = E.directrix - M.x;
    lines.push(
      `\\Delta_2: x = \\dfrac{a}{e} ${valueTex(E.directrix)},\\ d(M, \\Delta_2) ${valueTex(d2)}`,
      `\\dfrac{MF_2}{d(M, \\Delta_2)} = e ${valueTex(r2 / d2, 3)}`,
    );
  }
  return lines;
}

/**
 * What the eccentricity says about the shape.
 * @param {number} a @param {number} c
 */
export function shapeNote(a, c) {
  const e = c / a;
  if (c === 0)
    return 'Hai tiêu điểm trùng nhau ở $O$: $e = 0$ và elip trở thành đường tròn bán kính $a$.';
  if (e < 0.4)
    return `Tâm sai $e ${valueTex(e, 3)}$ nhỏ: hai tiêu điểm gần tâm, elip gần giống đường tròn.`;
  if (e < 0.8)
    return `Tâm sai $e ${valueTex(e, 3)}$: kéo $F_2$ ra xa tâm thì $e$ tăng và elip dẹt dần, nhưng tổng $MF_1 + MF_2$ vẫn bằng $2a = ${2 * a}$.`;
  return `Tâm sai $e ${valueTex(e, 3)}$ gần $1$: elip rất dẹt, trục nhỏ chỉ còn $2b ${valueTex(2 * Math.sqrt(a * a - c * c))}$.`;
}
