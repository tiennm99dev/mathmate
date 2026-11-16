/**
 * Column calculations within 10 000: the board size, random
 * calculations with a given number of carries, divisions of a given case and
 * answer options. The working itself is `column-steps.js` in the kid core.
 * Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { carriesOf, resultOf } from '#lib/core/kid/column-steps.js';
import { slipOptions as coreSlipOptions } from '#lib/core/kid/quiz.js';

/** @typedef {import('#lib/core/kid/column-steps.js').Op} Op */
/** @typedef {import('#lib/core/kid/column-steps.js').Task} Task */

/** How many columns the board has: the results stay within 9 999. */
export const COLUMNS = 4;

/** @typedef {'plain' | 'one' | 'many'} CarryKind */

/** How many carries each kind has. */
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 3] };

/** @type {Record<Op, Record<CarryKind, Task>>} */
const FALLBACK = {
  '+': { plain: { a: 3524, b: 2361 }, one: { a: 2435, b: 1248 }, many: { a: 3628, b: 4845 } },
  '-': { plain: { a: 5876, b: 2453 }, one: { a: 5482, b: 2357 }, many: { a: 6378, b: 2549 } },
  '×': { plain: { a: 1213, b: 3 }, one: { a: 2018, b: 4 }, many: { a: 1427, b: 3 } },
};

/**
 * Two numbers for a calculation of a kind, with every result within 9 999.
 * @param {() => number} rand
 * @param {Op} op
 */
function drawPair(rand, op) {
  if (op === '×') {
    const b = int(rand, 2, 9);
    return { a: int(rand, 1000, Math.floor(9999 / b)), b };
  }
  if (op === '+') {
    const a = int(rand, 1000, 8899);
    return { a, b: rand() < 0.3 ? int(rand, 101, 999) : int(rand, 1000, 9999 - a) };
  }
  const a = int(rand, 2000, 9999);
  return { a, b: rand() < 0.3 ? int(rand, 101, 999) : int(rand, 1000, a - 100) };
}

/**
 * A random calculation of a kind: no carry, one carry or two and more. The
 * first number has four digits, the second four or three digits (one for ×),
 * and the result stays within 9 999.
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
    if (resultOf(a, b, op) <= 9999 && carries >= lo && carries <= hi && !same) return { a, b };
  }
  return FALLBACK[op][kind];
}

/** @typedef {'exact' | 'rest' | 'zero' | 'two'} DivKind */

/**
 * Whether `n : d` is the given case: dividing evenly, with a remainder, with a
 * 0 in the quotient, or with the thousands too small to divide, so that the
 * quotient has three digits. The first three have a four-digit quotient, and
 * the first two keep every quotient digit above 0.
 * @param {number} n
 * @param {number} d
 * @param {DivKind} kind
 */
export function isDivKind(n, d, kind) {
  const q = Math.floor(n / d);
  if (kind === 'two') return q >= 100 && q < 1000;
  if (q < 1000) return false;
  const zero = String(q).includes('0');
  if (kind === 'zero') return zero;
  return !zero && (kind === 'exact' ? n % d === 0 : n % d > 0);
}

/**
 * A four-digit division by a digit from 2 to 9, of the given case.
 * @param {() => number} rand
 * @param {DivKind} kind
 * @param {{ n: number, d: number }} [not] a task not to repeat
 * @returns {{ n: number, d: number }}
 */
export function drawDivision(rand, kind, not) {
  for (;;) {
    const d = int(rand, 2, 9);
    const n = int(rand, 1000, 9999);
    const same = not && not.n === n && not.d === d;
    if (isDivKind(n, d, kind) && !same) return { n, d };
  }
}

/**
 * Up to four answer options from a child's slips, kept within the chapter's
 * numbers (`slipOptions` in the kid core).
 * @param {number} right
 * @param {number[]} slips
 */
export const slipOptions = (right, slips) => coreSlipOptions(right, slips, { near: [1, 10, 2] });
