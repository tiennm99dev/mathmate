/**
 * The book's division of decimals, worked by the child: when the divisor is
 * a decimal, first move the commas so it becomes a natural number; then the
 * long division, writing each quotient digit and the comma in the quotient
 * at the right moment (before the first digit after the dividend's comma,
 * or when a remainder is left and a 0 is written after it).
 * Pure and DOM-free.
 */
import {
  fracLength,
  longDivision,
  shiftDivision,
  stripOf,
  trimZeros,
} from '../_shared/decimal-ops.js';

/** The four kinds of division of the lesson, in the book's order. */
export const TASKS = /** @type {const} */ ([
  ['8,4', '4'],
  ['0,85', '5'],
  ['23', '4'],
  ['7', '3,5'],
  ['48,3', '3,5'],
  ['33,332', '0,52'],
  ['9,6', '4'],
  ['5,2', '0,4'],
]);

/** How the book names each kind. */
export function kindOf(/** @type {string} */ a, /** @type {string} */ b) {
  const da = fracLength(a) > 0;
  const db = fracLength(b) > 0;
  if (!db)
    return da
      ? 'Chia số thập phân cho số tự nhiên'
      : 'Chia số tự nhiên cho số tự nhiên, thương là số thập phân';
  return da ? 'Chia số thập phân cho số thập phân' : 'Chia số tự nhiên cho số thập phân';
}

/**
 * Everything the board needs for a task.
 * @param {string} a
 * @param {string} b
 */
export function planOf(a, b) {
  const shift = shiftDivision(a, b);
  const division = longDivision(shift.dividend, shift.divisor);
  return { a, b, shift, division, quotient: trimZeros(division.quotient) };
}

/**
 * The strip of digits the dividend's comma slides on, and where its comma
 * is before and after the move.
 * @param {string} a
 * @param {number} k
 */
export function shiftStrip(a, k) {
  const { digits, comma } = stripOf(a, k);
  const from = comma - k;
  return { digits: digits.slice(k), from, to: from + k };
}

/** The answers offered for "move the comma how many places?". */
export const SHIFT_CHOICES = /** @type {const} */ ([1, 2, 3]);

/**
 * Checks how many places the child wants to move the commas.
 * @param {string} b
 * @param {number} pick
 * @returns {{ ok: boolean, text: string }}
 */
export function checkShift(b, pick) {
  const k = fracLength(b);
  if (pick === k) return { ok: true, text: `Đúng rồi! ${b} có ${k} chữ số ở phần thập phân.` };
  return {
    ok: false,
    text: `Chưa đúng. Em đếm các chữ số ở phần thập phân của số chia ${b}.`,
  };
}

/**
 * Checks the child's next move in the long division: a digit, or 'comma'.
 * @param {import('../_shared/decimal-ops.js').DivAction} action
 * @param {number | 'comma'} input
 * @param {number} divisor
 * @param {number} misses
 * @param {boolean} [commaWritten] the quotient already has its comma
 * @returns {{ ok: boolean, text: string }}
 */
export function checkMove(action, input, divisor, misses, commaWritten = false) {
  if (action.kind === 'comma') {
    if (input === 'comma') return { ok: true, text: action.say };
    return {
      ok: false,
      text: 'Chưa đúng. Đã chia xong phần nguyên. Trước khi chia tiếp, em viết gì vào thương?',
    };
  }
  if (input === action.digit) return { ok: true, text: action.say };
  if (input === 'comma') {
    return {
      ok: false,
      text: commaWritten
        ? 'Thương đã có dấu phẩy rồi. Em chọn chữ số tiếp theo của thương.'
        : 'Chưa đến lúc viết dấu phẩy. Em còn chia phần nguyên.',
    };
  }
  if (misses > 0) return { ok: false, text: `Chưa đúng. ${action.say}` };
  const lead = action.zero ? 'Em đã viết thêm chữ số 0 vào số dư. ' : '';
  return {
    ok: false,
    text: `Chưa đúng. ${lead}${action.cur} chia ${divisor} được mấy? Thử nhân lại xem có vượt quá ${action.cur} không.`,
  };
}
