/**
 * Multiplying and dividing numbers of up to six digits by a digit: the board
 * size and random tasks of each case. The column working itself is
 * `column-steps.js` in the kid core and `division.js` beside this file. Pure
 * and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { carriesOf } from '#lib/core/kid/column-steps.js';

/** @typedef {import('#lib/core/kid/column-steps.js').Task} Task */

/** How many columns the multiplication board has: products stay within 999 999. */
export const COLUMNS = 6;

/** The largest product a drawn task may have. */
export const LIMIT = 999999;

/** @typedef {'plain' | 'one' | 'many'} CarryKind */

/** How many carries each kind has. */
const CARRIES = { plain: [0, 0], one: [1, 1], many: [2, 5] };

/** @type {Record<CarryKind, Task>} */
export const FIRST_MUL = {
  plain: { a: 241324, b: 2 },
  one: { a: 123214, b: 3 },
  many: { a: 136204, b: 4 },
};

/**
 * A random number of five or six digits times a digit from 2 to 9 of a kind:
 * no carry, one carry or two and more, with the product within 999 999.
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
  return FIRST_MUL[kind];
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

/** @type {Record<DivKind, { n: number, d: number }>} */
export const FIRST_DIV = {
  exact: { n: 128472, d: 6 },
  rest: { n: 230859, d: 5 },
  zero: { n: 420318, d: 6 },
};

/**
 * A six-digit division by a digit from 2 to 9, of the given case.
 * @param {() => number} rand
 * @param {DivKind} kind
 * @param {{ n: number, d: number }} [not] a task not to repeat
 * @returns {{ n: number, d: number }}
 */
export function drawDivision(rand, kind, not) {
  for (let i = 0; i < 5000; i++) {
    const d = int(rand, 2, 9);
    const n = int(rand, 100000, LIMIT);
    const same = not && not.n === n && not.d === d;
    if (isDivKind(n, d, kind) && !same) return { n, d };
  }
  return FIRST_DIV[kind];
}
