/**
 * The parabola mirror: y² = 2px with focus F(p/2; 0). A ray parallel to the
 * axis at height y hits the parabola at M and reflects through F (a dish
 * antenna); run backwards, light from F leaves parallel to the axis (a
 * headlamp). The readout checks MF = x + p/2 = d(M, Δ) and the two equal
 * angles the ray and MF make with the tangent at M.
 */
import { numTex } from '#lib/core/number-format.js';
import { parabolaRadius, parallelRayHit, valueTex } from '../_shared/conic.js';

/** @typedef {{ x: number, y: number }} V */

/** The board, in grid units. */
export const BOX = { xMin: -3, xMax: 11, yMin: -7, yMax: 7 };
export const P_RANGE = /** @type {const} */ ([1, 4]);
export const Y_STEP = 0.25;

/**
 * The highest ray that still meets the parabola inside the board.
 * @param {number} p
 */
export const yLimit = (p) =>
  Math.floor(Math.min(BOX.yMax - 0.5, Math.sqrt(2 * p * (BOX.xMax - 0.5))) / Y_STEP) * Y_STEP;

/**
 * The ray at height y: where it enters the board, the point M it hits and the
 * end of the reflected ray at the board's edge, past F.
 * @param {number} p @param {number} y
 */
export function rayAt(p, y) {
  const { M, dir } = parallelRayHit(p, y);
  const start = { x: BOX.xMax, y };
  // Walk the reflected ray until it leaves the board.
  const ts = [];
  if (dir.x > 1e-9) ts.push((BOX.xMax - M.x) / dir.x);
  if (dir.x < -1e-9) ts.push((BOX.xMin - M.x) / dir.x);
  if (dir.y > 1e-9) ts.push((BOX.yMax - M.y) / dir.y);
  if (dir.y < -1e-9) ts.push((BOX.yMin - M.y) / dir.y);
  const t = Math.min(...ts);
  return { start, M, end: { x: M.x + t * dir.x, y: M.y + t * dir.y }, dir };
}

/**
 * The angles, in degrees, that the ray (back towards its source) and MF make
 * with the tangent at M, whose direction is (y; p).
 * @param {number} p @param {number} y
 * @returns {[number, number]}
 */
export function reflectionAngles(p, y) {
  const { M } = parallelRayHit(p, y);
  const t = { x: y, y: p };
  const toF = { x: p / 2 - M.x, y: -M.y };
  /** @param {V} u @param {V} v */
  const angle = (u, v) => {
    const c = Math.abs(u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y));
    return (Math.acos(Math.min(1, c)) * 180) / Math.PI;
  };
  if (Math.hypot(toF.x, toF.y) < 1e-9) return [90, 90];
  return [angle({ x: 1, y: 0 }, t), angle(toF, t)];
}

/**
 * The readout lines, as rich text, for the ray at height y.
 * @param {number} p @param {number} y
 */
export function readout(p, y) {
  const { M } = parallelRayHit(p, y);
  const mf = parabolaRadius(p, M.x);
  const [alpha, beta] = reflectionAngles(p, y);
  const half = p % 2 === 0 ? numTex(p / 2) : `\\dfrac{${p}}{2}`;
  return [
    `$y^2 = ${2 * p}x$, $F\\left(${half}; 0\\right)$, $\\Delta: x = -${half}$`,
    `$M\\left(${numTex(M.x, 2)}; ${numTex(M.y, 2)}\\right)$, $MF = x + \\dfrac{p}{2} ${valueTex(mf)} = d(M, \\Delta)$`,
    `Góc với tiếp tuyến tại $M$: tia tới $${numTex(alpha, 1)}^\\circ$, tia phản xạ $${numTex(beta, 1)}^\\circ$`,
    `Tham số tiêu: $d(F, \\Delta) = p = ${p}$`,
  ];
}

/** @typedef {'anten' | 'den-pha'} Mode */

/**
 * The feedback sentence for the mode.
 * @param {Mode} mode @param {number} p @param {number} y
 */
export function noteFor(mode, p, y) {
  const [alpha] = reflectionAngles(p, y);
  const angle = `${numTex(alpha, 1)}^\\circ`;
  if (mode === 'anten')
    return `Tia song song với trục gặp parabol tại $M$ và phản xạ (góc tới bằng góc phản xạ, $${angle}$) đi qua đúng tiêu điểm $F$: mọi tia song song đều hội tụ ở $F$, nơi đặt đầu thu của ăng-ten.`;
  return `Tia sáng phát từ bóng đèn đặt ở tiêu điểm $F$ gặp parabol tại $M$ rồi phản xạ đi ra song song với trục: chùm sáng của đèn pha không bị toả rộng.`;
}
