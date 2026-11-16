/**
 * Logic of the half-plane widget: testing points against one inequality
 * and the verdict the learner reads after each test.
 */
import { pairText } from '#lib/core/algebra-text.js';
import {
  checkText,
  conclusion,
  holds,
  isLinear,
  isStrict,
  onBorder,
} from '../_shared/half-plane.js';

/**
 * @typedef {import('../_shared/half-plane.js').Ineq} Ineq
 * @typedef {import('../_shared/half-plane.js').Pt} Pt
 * @typedef {{ x: number, y: number, ok: boolean }} Tried
 */

/**
 * Adds a tested point, replacing an earlier test of the same point.
 * @param {Tried[]} tried @param {Ineq} q @param {Pt} p
 * @returns {Tried[]}
 */
export function record(tried, q, p) {
  const rest = tried.filter((t) => t.x !== p.x || t.y !== p.y);
  return [...rest, { x: p.x, y: p.y, ok: holds(q, p) }];
}

/**
 * Whether a test at `p` decides the side: it must lie off the border line.
 * @param {Ineq} q @param {Pt} p
 */
export const decides = (q, p) => isLinear(q) && !onBorder(q, p);

/**
 * The feedback after testing M, the book's three steps in one sentence.
 * @param {Ineq} q @param {Pt} p
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function verdict(q, p) {
  if (!isLinear(q)) {
    return { tone: 'warn', text: 'Khi a = b = 0 đây không là bất phương trình bậc nhất hai ẩn.' };
  }
  const name = `M${pairText(p.x, p.y)}`;
  if (onBorder(q, p)) {
    const on = isStrict(q.op) ? 'không là nghiệm' : 'là một nghiệm';
    return {
      tone: 'warn',
      text: `${name} nằm trên đường thẳng d nên ${on}, nhưng không cho biết nửa mặt phẳng nào. Hãy chọn điểm không thuộc d.`,
    };
  }
  const ok = holds(q, p);
  return {
    tone: ok ? 'ok' : 'info',
    text: `Thay ${name}: ${checkText(q, p)}. ${conclusion(q, p)}`,
  };
}
