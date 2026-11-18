/**
 * The grade 4 column sheet of "Phép cộng và phép trừ": the calculation is
 * worked one column at a time from the ones, read in the grade 4 book's words
 * by the core (`stepsOf` in `#lib/core/kid/column-steps.js` with `WORDING`),
 * with the longer number set on top. This file keeps what the sheet asks and
 * how it nudges a wrong digit. Pure and DOM-free.
 */
import { stepsOf } from '#lib/core/kid/column-steps.js';
import { PLACE_NAMES } from '#lib/core/kid/whole-numbers.js';

/** @typedef {'+' | '-'} Op */
/** @typedef {import('#lib/core/kid/column-steps.js').Step} Step */

/** The grade 4 book's way of reading a column. */
export const WORDING = /** @type {const} */ ({ grade: 4 });

/**
 * The number set on top and the one set below: the first number on top,
 * unless the second has more digits.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 * @returns {[number, number]}
 */
export function rowsOf(op, a, b) {
  return op === '+' && String(b).length > String(a).length ? [b, a] : [a, b];
}

/**
 * The columns of the calculation as the sheet sets it out, ones first.
 * @param {Op} op
 * @param {number} a
 * @param {number} b
 */
export function sheetSteps(op, a, b) {
  const [top, bottom] = rowsOf(op, a, b);
  return stepsOf(top, bottom, op, WORDING);
}

/**
 * What the child is asked for next.
 * @param {Step} step
 */
export const askFor = (step) => `Em viết chữ số hàng ${PLACE_NAMES[step.col]} của kết quả.`;

/**
 * A nudge after a wrong digit; the second slip shows the whole step.
 * @param {Op} op
 * @param {Step} step
 * @param {number} tries wrong tries so far on this step (1 or more)
 */
export function nudge(op, step, tries) {
  if (tries >= 2) return `Em làm thế này nhé: ${step.say}.`;
  if (op === '+') {
    return step.carryIn > 0
      ? 'Chưa đúng. Em cộng hai chữ số cùng hàng, rồi thêm 1 đã nhớ.'
      : 'Chưa đúng. Em cộng hai chữ số cùng hàng. Được 10 trở lên thì viết chữ số hàng đơn vị, nhớ 1.';
  }
  if (step.carryIn > 0) return 'Chưa đúng. Em thêm 1 đã nhớ vào chữ số ở dưới, rồi mới trừ.';
  return 'Chưa đúng. Nếu chữ số ở trên bé hơn chữ số ở dưới, em lấy thêm 10 rồi trừ, nhớ 1.';
}
