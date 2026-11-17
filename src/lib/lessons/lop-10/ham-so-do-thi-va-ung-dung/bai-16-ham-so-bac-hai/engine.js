/**
 * Logic of the parabola explorer for y = ax² + bx + c: the key points of the
 * graph (vertex, axis, intercepts), the variation table, the "make this
 * parabola" challenges and the thrown ball h(t) = −4,9t² + v₀t + h₀.
 */

import { formatNumber } from '#lib/core/number-format.js';
import {
  clean,
  pointText,
  quadAt,
  quadText,
  rootsOf,
  valText,
  vertexOf,
} from '../_shared/quadratic.js';

/** The values of a on the slider: never 0, so it is always a quadratic. */
export const A_VALUES = [-2, -1, -0.5, 0.5, 1, 2];

/**
 * The points the book draws a parabola with: the vertex S, the axis
 * x = −b/(2a), the y-intercept (0; c) and its mirror image across the axis,
 * and the x-intercepts when there are any.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function keyPoints(a, b, c) {
  const s = vertexOf(a, b, c);
  const yCut = { x: 0, y: c };
  const mirror = { x: clean(2 * s.x), y: c };
  const roots = rootsOf(a, b, c).map((x) => ({ x, y: 0 }));
  return { s, yCut, mirror, roots };
}

/**
 * The sentences that describe the parabola: which way it opens, its least
 * or greatest value, where the function increases and decreases.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function describe(a, b, c) {
  const s = vertexOf(a, b, c);
  const xs = valText(s.x);
  const ys = valText(s.y);
  const up = a > 0;
  return {
    shape: up
      ? `a = ${formatNumber(a)} > 0: bề lõm quay lên trên, đỉnh S là điểm thấp nhất.`
      : `a = ${formatNumber(a)} < 0: bề lõm quay xuống dưới, đỉnh S là điểm cao nhất.`,
    extreme: `${up ? 'Giá trị nhỏ nhất' : 'Giá trị lớn nhất'} của hàm số là ${ys}, đạt tại x = ${xs}.`,
    variation: up
      ? `Hàm số nghịch biến trên (−∞; ${xs}) và đồng biến trên (${xs}; +∞).`
      : `Hàm số đồng biến trên (−∞; ${xs}) và nghịch biến trên (${xs}; +∞).`,
  };
}

/**
 * Parabolas to build, each given by its vertex and one more point; that
 * fixes a, b and c, all reachable on the sliders.
 */
export const CHALLENGES = [
  { vertex: { x: 1, y: -4 }, point: { x: 0, y: -3 }, a: 1, b: -2, c: -3 },
  { vertex: { x: -1, y: 3 }, point: { x: 0, y: 2 }, a: -1, b: -2, c: 2 },
  { vertex: { x: 0.5, y: 0.5 }, point: { x: 0, y: 1 }, a: 2, b: -2, c: 1 },
  { vertex: { x: 2, y: 1 }, point: { x: 0, y: -1 }, a: -0.5, b: 2, c: -1 },
];

/**
 * How far the parabola is from the challenge, as feedback.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {(typeof CHALLENGES)[number]} goal
 * @returns {{ done: boolean, text: string }}
 */
export function challengeFeedback(a, b, c, goal) {
  const s = vertexOf(a, b, c);
  const atPoint = quadAt(a, b, c, goal.point.x);
  const vertexOk = s.x === goal.vertex.x && s.y === goal.vertex.y;
  const pointOk = atPoint === goal.point.y;
  if (vertexOk && pointOk) {
    return { done: true, text: `Đúng rồi! Parabol cần tìm là y = ${quadText(a, b, c)}.` };
  }
  const parts = [];
  parts.push(vertexOk ? 'Đỉnh đã đúng.' : `Đỉnh hiện tại là S${pointText(s)}.`);
  parts.push(
    pointOk
      ? 'Đã đi qua điểm cần qua.'
      : `Tại x = ${formatNumber(goal.point.x)} parabol có y = ${valText(atPoint)}.`,
  );
  return { done: false, text: parts.join(' ') };
}

/** Gravity in h(t) = −4,9t² + v₀t + h₀ (half of g = 9,8 m/s²). */
export const HALF_G = 4.9;

/**
 * The flight of a ball thrown straight up from height h₀ (m) at speed v₀
 * (m/s): h(t) = −4,9t² + v₀t + h₀, its highest point (the vertex) and the
 * moment it lands (the positive root).
 * @param {number} v0
 * @param {number} h0
 */
export function flight(v0, h0) {
  const peakT = clean(v0 / (2 * HALF_G), 6);
  const peakH = clean(h0 + (v0 * v0) / (4 * HALF_G), 6);
  const land = Math.max(...rootsOf(-HALF_G, v0, h0));
  return { peakT, peakH, land, at: (/** @type {number} */ t) => quadAt(-HALF_G, v0, h0, t) };
}
