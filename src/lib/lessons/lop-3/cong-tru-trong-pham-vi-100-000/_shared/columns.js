/**
 * Column calculations within 100 000: the board size, random
 * additions and subtractions with a given number of carries and answer
 * options. The working itself is `column-steps.js` in the kid core.
 * Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { carriesOf, resultOf } from '#lib/core/kid/column-steps.js';
import { slipOptions as coreSlipOptions } from '#lib/core/kid/quiz.js';

/** @typedef {'+' | '-'} Op */
/** @typedef {import('#lib/core/kid/column-steps.js').Task} Task */

/** How many columns the board has: the results stay within 99 999. */
export const COLUMNS = 5;

/** The largest number an answer option may show: the top of the chapter's range. */
const MAX_OPTION = 100000;

/** The largest result a drawn task may have. */
export const LIMIT = 99999;

/** @typedef {'plain' | 'one' | 'many'} CarryKind */

/** How many carries each kind has. */
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 4] };

/** @type {Record<Op, Record<CarryKind, Task>>} */
const FALLBACK = {
  '+': {
    plain: { a: 23415, b: 51362 },
    one: { a: 34528, b: 21345 },
    many: { a: 45637, b: 28485 },
  },
  '-': {
    plain: { a: 68795, b: 25432 },
    one: { a: 57482, b: 23157 },
    many: { a: 23285, b: 12967 },
  },
};

/**
 * Two numbers for a calculation: the first has five digits, the second five
 * or (sometimes) four.
 * @param {() => number} rand
 * @param {Op} op
 */
function drawPair(rand, op) {
  if (op === '+') {
    const a = int(rand, 10000, 88999);
    return { a, b: rand() < 0.3 ? int(rand, 1001, 9999) : int(rand, 10000, LIMIT - a) };
  }
  const a = int(rand, 20000, LIMIT);
  return { a, b: rand() < 0.3 ? int(rand, 1001, 9999) : int(rand, 10000, a - 1000) };
}

/**
 * A random calculation of a kind: no carry, one carry or two and more. The
 * first number has five digits, the second five or four, and the result
 * stays within 99 999.
 * @param {() => number} rand
 * @param {Op} op
 * @param {CarryKind} kind
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawColumn(rand, op, kind, not) {
  const [lo, hi] = CARRIES[kind];
  for (let i = 0; i < 5000; i++) {
    const { a, b } = drawPair(rand, op);
    const carries = carriesOf(a, b, op);
    const same = not && not.a === a && not.b === b;
    const r = resultOf(a, b, op);
    if (r <= LIMIT && r > 0 && carries >= lo && carries <= hi && !same) return { a, b };
  }
  return FALLBACK[op][kind];
}

/**
 * Up to four answer options from a child's slips, kept within the chapter's
 * numbers (`slipOptions` in the kid core).
 * @param {number} right
 * @param {number[]} slips
 */
export const slipOptions = (right, slips) =>
  coreSlipOptions(right, slips, {
    near: [1, 10, 2, -1, -10, -2],
    min: 1,
    max: MAX_OPTION,
  });
