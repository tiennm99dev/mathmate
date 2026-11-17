import { numTex } from '#lib/core/number-format.js';
import { P, angle3 } from '#lib/geom-engine/space.js';

/**
 * An open book (opened 10° to 170°): the spine is the edge a (the x axis), one page (P) lies on
 * the table and the other page (Q) is opened by `open` degrees. From a point
 * O of the spine two rays Ox ⊂ (P) and Oy ⊂ (Q) leave at `slant` degrees from
 * the spine. Only when both rays are perpendicular to the spine is xOy a
 * plane angle of the dihedral angle [P, a, Q], equal to `open`.
 */

export const LENGTH = 4;
export const WIDTH = 3;

const RAD = Math.PI / 180;

/**
 * The corners of the two pages.
 * @param {number} open
 */
export function pages(open) {
  const c = Math.cos(open * RAD);
  const s = Math.sin(open * RAD);
  return {
    P: [P(0, 0, 0), P(LENGTH, 0, 0), P(LENGTH, WIDTH, 0), P(0, WIDTH, 0)],
    Q: [P(0, 0, 0), P(LENGTH, 0, 0), P(LENGTH, WIDTH * c, WIDTH * s), P(0, WIDTH * c, WIDTH * s)],
  };
}

/**
 * The rays Ox and Oy from O on the spine, of length r.
 * @param {number} open @param {number} slant @param {number} at @param {number} r
 */
export function rays(open, slant, at, r) {
  const ca = Math.cos(slant * RAD);
  const sa = Math.sin(slant * RAD);
  const O = P(at, 0, 0);
  return {
    O,
    x: P(at + r * ca, r * sa, 0),
    y: P(at + r * ca, r * sa * Math.cos(open * RAD), r * sa * Math.sin(open * RAD)),
  };
}

/**
 * The angle xOy, in degrees.
 * @param {number} open @param {number} slant
 */
export function rayAngle(open, slant) {
  const { O, x, y } = rays(open, slant, 0, 1);
  return angle3(x, O, y);
}

/** @param {number} deg */
const texDeg = (deg) => `${numTex(Math.round(deg * 10) / 10, 1)}^\\circ`;

/** @param {number} open */
function kind(open) {
  if (open === 90) return 'góc nhị diện vuông: hai trang sách nằm trên hai mặt phẳng vuông góc';
  if (open < 90) return 'góc nhị diện nhọn';
  return 'góc nhị diện tù';
}

/**
 * What the rays show.
 * @param {number} open @param {number} slant
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function verdict(open, slant) {
  const between = Math.min(open, 180 - open);
  const planes = `Góc giữa hai mặt phẳng $(P)$, $(Q)$ là $${texDeg(between)}$.`;
  if (slant === 90) {
    return {
      tone: open === 90 ? 'ok' : 'info',
      text: `$Ox \\perp a$, $Oy \\perp a$ nên $\\widehat{xOy}$ là góc phẳng nhị diện: $[P, a, Q] = ${texDeg(open)}$, ${kind(open)}. ${planes}`,
    };
  }
  const xoy = rayAngle(open, slant);
  const sign = Math.abs(xoy - Math.round(xoy * 10) / 10) < 1e-9 ? '=' : '\\approx';
  return {
    tone: 'warn',
    text: `$Ox$, $Oy$ tạo với gáy $a$ góc $${slant}^\\circ$, không vuông góc với $a$, nên $\\widehat{xOy} ${sign} ${texDeg(xoy)}$ không phải góc phẳng nhị diện. Số đo góc nhị diện vẫn là $${texDeg(open)}$.`,
  };
}
