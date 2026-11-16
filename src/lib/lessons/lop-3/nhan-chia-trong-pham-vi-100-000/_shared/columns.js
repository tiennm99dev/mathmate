/**
 * Multiplying and dividing five-digit numbers by a digit: the board size,
 * random tasks of each case and answer options. The working itself is
 * `column-steps.js` in the kid core. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { carriesOf } from '#lib/core/kid/column-steps.js';
import { slipOptions as coreSlipOptions } from '#lib/core/kid/quiz.js';

/** @typedef {import('#lib/core/kid/column-steps.js').Task} Task */

/** How many columns the board has: the results stay within 99 999. */
export const COLUMNS = 5;

/** The largest result a drawn task may have. */
export const LIMIT = 99999;

/** The largest number an answer option may show: the top of the chapter's range. */
const MAX_OPTION = 100000;

/** @typedef {'plain' | 'one' | 'many'} CarryKind */

/** How many carries each kind has. */
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 4] };

/** @type {Record<CarryKind, Task>} */
const FALLBACK = {
  plain: { a: 12132, b: 3 },
  one: { a: 21314, b: 3 },
  many: { a: 31504, b: 3 },
};

/**
 * A random five-digit number times a digit from 2 to 9 of a kind: no carry,
 * one carry or two and more, with the product within 99 999.
 * @param {() => number} rand
 * @param {CarryKind} kind
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawMul(rand, kind, not) {
  const [lo, hi] = CARRIES[kind];
  for (let i = 0; i < 5000; i++) {
    const b = int(rand, 2, 9);
    const a = int(rand, 10000, Math.floor(LIMIT / b));
    const carries = carriesOf(a, b, '×');
    const same = not && not.a === a && not.b === b;
    if (carries >= lo && carries <= hi && !same) return { a, b };
  }
  return FALLBACK[kind];
}

/** @typedef {'exact' | 'rest' | 'zero'} DivKind */

/**
 * Whether `n : d` is the given case: dividing evenly, with a remainder (both
 * with every quotient digit above 0), or with a 0 in the quotient.
 * @param {number} n
 * @param {number} d
 * @param {DivKind} kind
 */
export function isDivKind(n, d, kind) {
  const zero = String(Math.floor(n / d)).includes('0');
  if (kind === 'zero') return zero;
  return !zero && (kind === 'exact' ? n % d === 0 : n % d > 0);
}

/**
 * A five-digit division by a digit from 2 to 9, of the given case.
 * @param {() => number} rand
 * @param {DivKind} kind
 * @param {{ n: number, d: number }} [not] a task not to repeat
 * @returns {{ n: number, d: number }}
 */
export function drawDivision(rand, kind, not) {
  for (;;) {
    const d = int(rand, 2, 9);
    const n = int(rand, 10000, LIMIT);
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
export const slipOptions = (right, slips) =>
  coreSlipOptions(right, slips, { near: [1, 10, -1, -10], max: MAX_OPTION });
