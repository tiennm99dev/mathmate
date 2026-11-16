/**
 * Multiplying by 10, 100, 1 000 moves every digit one, two or three places to
 * the left and writes that many zeros on the right; dividing a round number
 * by them moves the digits right and drops the zeros. The place table runs
 * from hàng triệu to hàng đơn vị. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { placeTitle } from '#lib/core/kid/whole-numbers.js';

/** How many columns the place table has: hàng triệu to hàng đơn vị. */
export const PLACES = 7;

/** The largest number the table holds. */
export const TOP = 10 ** PLACES - 1;

/** The column titles, from the left. */
export const TITLES = Array.from({ length: PLACES }, (_, i) => placeTitle(PLACES - 1 - i));

/** The words for one, two and three zeros, the book's way. */
const COUNT_WORDS = ['', 'một', 'hai', 'ba'];

/** @typedef {'×' | ':'} Op */
/** @typedef {{ op: Op, zeros: 1 | 2 | 3 }} Move */

/** The six moves, multiplications first. */
export const MOVES = /** @type {Move[]} */ ([
  { op: '×', zeros: 1 },
  { op: '×', zeros: 2 },
  { op: '×', zeros: 3 },
  { op: ':', zeros: 1 },
  { op: ':', zeros: 2 },
  { op: ':', zeros: 3 },
]);

/**
 * The 10, 100 or 1 000 of a move.
 * @param {Move} move
 */
export const factorOf = ({ zeros }) => 10 ** zeros;

/**
 * A move written out: "× 100", ": 1 000".
 * @param {Move} move
 */
export const moveText = (move) => `${move.op} ${fmt(factorOf(move))}`;

/**
 * The digits of `n` in the table's columns, from the left; '' before the
 * first digit.
 * @param {number} n
 */
export function cellsOf(n) {
  const digits = String(n);
  return Array.from({ length: PLACES }, (_, i) => {
    const at = i - (PLACES - digits.length);
    return at >= 0 ? digits[at] : '';
  });
}

/**
 * What a move does to `n`: the new number and the sentence, or why it cannot
 * be done here.
 * @param {number} n
 * @param {Move} move
 * @returns {{ ok: true, value: number, text: string } | { ok: false, text: string }}
 */
export function apply(n, move) {
  const factor = factorOf(move);
  const count = COUNT_WORDS[move.zeros];
  if (move.op === '×') {
    const value = n * factor;
    if (value > TOP) {
      return {
        ok: false,
        text: `${fmt(n)} × ${fmt(factor)} = ${fmt(value)}, quá hàng triệu. Bảng không đủ chỗ.`,
      };
    }
    return {
      ok: true,
      value,
      text: `${fmt(n)} × ${fmt(factor)} = ${fmt(value)}. Mỗi chữ số dịch sang trái ${move.zeros} hàng: em viết thêm ${count} chữ số 0 vào bên phải.`,
    };
  }
  if (n % factor !== 0) {
    const round = ['', 'tròn chục', 'tròn trăm', 'tròn nghìn'][move.zeros];
    return {
      ok: false,
      text: `${fmt(n)} không phải số ${round}, em chưa chia nhẩm cho ${fmt(factor)} được.`,
    };
  }
  const value = n / factor;
  return {
    ok: true,
    value,
    text: `${fmt(n)} : ${fmt(factor)} = ${fmt(value)}. Mỗi chữ số dịch sang phải ${move.zeros} hàng: em bớt đi ${count} chữ số 0 ở bên phải.`,
  };
}

/** The puzzles: reach `goal` from `start` with the moves. */
export const PUZZLES = /** @type {const} */ ([
  { start: 36, goal: 360 },
  { start: 36, goal: 36000 },
  { start: 4500, goal: 45 },
  { start: 270000, goal: 27 },
  { start: 81, goal: 810000 },
  { start: 52000, goal: 520 },
]);

/**
 * The fewest moves from `start` to `goal`, or 0 when it cannot be reached.
 * @param {number} start
 * @param {number} goal
 */
export function fewestMoves(start, goal) {
  if (start === goal) return 0;
  /** @type {Map<number, number>} */
  const seen = new Map([[start, 0]]);
  let frontier = [start];
  for (let depth = 1; depth <= 6 && frontier.length > 0; depth++) {
    const next = [];
    for (const n of frontier) {
      for (const move of MOVES) {
        const result = apply(n, move);
        if (!result.ok || seen.has(result.value)) continue;
        if (result.value === goal) return depth;
        seen.set(result.value, depth);
        next.push(result.value);
      }
    }
    frontier = next;
  }
  return 0;
}

/**
 * The goal line of a puzzle while it is open.
 * @param {number} value the number now in the table
 * @param {number} goal
 */
export function goalText(value, goal) {
  if (value === goal) return `Đúng rồi! Em đã được ${fmt(goal)}.`;
  const way = value < goal ? 'nhân' : 'chia';
  return `Em cần được ${fmt(goal)}. Bây giờ là ${fmt(value)}: em thử ${way} nhé.`;
}
