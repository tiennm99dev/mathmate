import { numTex } from '#lib/core/number-format.js';
import { P, lineAngle } from '../_shared/space.js';

/**
 * An oblique line a = SA with its foot A on the plane (P) (z = 0) and the
 * foot H of the perpendicular from S: AH is the projection a' of a. Turning
 * the oblique line around its foot (the direction `turn`), raising S
 * (`height` = SH) and moving it away (`reach` = AH) shows the angle between a
 * and (P), the angle SAH with tan SAH = SH / AH. A line d of (P) through A,
 * turned `dTurn` from the x axis, shows the theorem of the three
 * perpendiculars: d ⊥ a exactly when d ⊥ a'.
 */

/** @param {number} deg */
const flat = (deg) => P(Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180), 0);

/**
 * The points of the figure.
 * @param {number} height @param {number} reach @param {number} turn
 */
export function figure(height, reach, turn) {
  const u = flat(turn);
  const h = P(u.x * reach, u.y * reach, 0);
  return { A: P(), H: h, S: P(h.x, h.y, height) };
}

/** @param {number} deg */
const isRight = (deg) => Math.abs(deg - 90) < 0.05;

/**
 * The angles of the figure: a with (P), d with a' (null when a ⊥ (P)) and d
 * with a.
 * @param {number} height @param {number} reach @param {number} turn @param {number} dTurn
 */
export function measure(height, reach, turn, dTurn) {
  const { H, S } = figure(height, reach, turn);
  const d = flat(dTurn);
  const withPlane = reach === 0 ? 90 : (Math.atan2(height, reach) * 180) / Math.PI;
  return {
    withPlane,
    dProj: reach === 0 ? null : lineAngle(d, H),
    dLine: lineAngle(d, S),
  };
}

/** @param {number} deg */
export const angleTex = (deg) => `${numTex(Math.round(deg * 10) / 10, 1)}^\\circ`;

/**
 * How the angle between a and (P) is read: tan SAH = SH / AH.
 * @param {number} height @param {number} reach
 */
export function planeText(height, reach) {
  const m = measure(height, reach, 0, 0);
  if (reach === 0) {
    return `$H$ trùng $A$: $SA \\perp (P)$, hình chiếu của $SA$ chỉ là điểm $A$ và $(SA, (P)) = 90^\\circ$.`;
  }
  const exact = Math.abs(m.withPlane - Math.round(m.withPlane)) < 1e-9;
  return `$AH$ là hình chiếu của $SA$ trên $(P)$, nên $(SA, (P)) = \\widehat{SAH}$ với $\\tan\\widehat{SAH} = \\dfrac{SH}{AH} = \\dfrac{${numTex(height)}}{${numTex(reach)}}$, $\\widehat{SAH} ${exact ? '=' : '\\approx'} ${angleTex(m.withPlane)}$.`;
}

/**
 * What the line d shows: the theorem of the three perpendiculars.
 * @param {ReturnType<typeof measure>} m
 * @returns {{ tone: 'ok' | 'info' | 'warn', text: string }}
 */
export function threeText(m) {
  if (m.dProj === null) {
    return {
      tone: 'warn',
      text: `$SA \\perp (P)$ nên $d \\perp SA$ với mọi $d$; định lí ba đường vuông góc chỉ áp dụng khi $SA$ không vuông góc với $(P)$.`,
    };
  }
  const read = `$(d, AH) = ${angleTex(m.dProj)}$, $(d, SA) = ${angleTex(m.dLine)}$.`;
  if (isRight(m.dProj)) {
    return {
      tone: 'ok',
      text: `${read} $d \\perp AH$ nên $d \\perp SA$: đó là định lí ba đường vuông góc.`,
    };
  }
  return {
    tone: 'info',
    text: `${read} $d$ chưa vuông góc với $AH$ nên cũng chưa vuông góc với $SA$.`,
  };
}
