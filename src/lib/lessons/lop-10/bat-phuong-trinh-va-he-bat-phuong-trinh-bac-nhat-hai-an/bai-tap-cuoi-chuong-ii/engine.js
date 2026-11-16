/**
 * Logic of the production widget: two products share two machines, the
 * learner enters the numbers, and the best vertex is checked.
 */
import { exactText, namedRegion, optimize, pointText } from '../_shared/half-plane.js';

/**
 * @typedef {import('../_shared/half-plane.js').Ineq} Ineq
 * @typedef {{ a1: number, b1: number, c1: number, a2: number, b2: number, c2: number, p: number, q: number }} Plan
 */

/**
 * The story's numbers: 2x + y ≤ 8, x + 3y ≤ 9, lãi 3x + 4y.
 * @type {Plan}
 */
export const DEFAULT_PLAN = { a1: 2, b1: 1, c1: 8, a2: 1, b2: 3, c2: 9, p: 3, q: 4 };

/**
 * The system of the production problem.
 * @param {Plan} plan
 * @returns {Ineq[]}
 */
export function systemOf(plan) {
  return [
    { a: 1, b: 0, c: 0, op: '>=' },
    { a: 0, b: 1, c: 0, op: '>=' },
    { a: plan.a1, b: plan.b1, c: plan.c1, op: '<=' },
    { a: plan.a2, b: plan.b2, c: plan.c2, op: '<=' },
  ];
}

/**
 * The square drawing range: from −1 to just past the farthest intercept.
 * @param {Plan} plan
 */
export function spanOf(plan) {
  const far = Math.max(plan.c1 / plan.a1, plan.c2 / plan.a2, plan.c1 / plan.b1, plan.c2 / plan.b2);
  return Math.ceil(far) + 1;
}

/**
 * The named vertices of the feasible polygon.
 * @param {Plan} plan
 */
export function verticesOf(plan) {
  const span = spanOf(plan);
  return namedRegion(systemOf(plan), { xMin: -1, xMax: span, yMin: -1, yMax: span });
}

/**
 * The verdict after the learner picks a vertex as the best one.
 * @param {Plan} plan @param {number} picked index into `verticesOf(plan)`
 * @returns {{ tone: 'ok' | 'warn', text: string, best: number[], values: number[] }}
 */
export function judgePick(plan, picked) {
  const vertices = verticesOf(plan);
  const result = optimize(
    vertices.map((v) => v.pt),
    plan.p,
    plan.q,
  );
  const name = (/** @type {number} */ i) => `${vertices[i].name}${pointText(vertices[i].pt)}`;
  const max = exactText(result.max);
  const right = result.argMax.includes(picked);
  const whole = result.argMax.every(
    (i) => Number.isInteger(vertices[i].pt.x) && Number.isInteger(vertices[i].pt.y),
  );
  const caution = whole
    ? ''
    : ' Đỉnh này có toạ độ không nguyên: nếu chỉ làm được số nguyên sản phẩm, cần xét thêm các điểm nguyên gần đó.';
  const text = right
    ? `Đúng! F lớn nhất bằng ${max}, đạt tại ${result.argMax.map(name).join(' và ')}.${caution}`
    : `Chưa đúng: F tại ${name(picked)} bằng ${exactText(result.values[picked])}, nhưng tại ${name(result.argMax[0])} F bằng ${max}.${caution}`;
  return { tone: right ? 'ok' : 'warn', text, best: result.argMax, values: result.values };
}
