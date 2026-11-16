/**
 * Multiplying and dividing a decimal by 10, 100, 1 000 or 0,1, 0,01, 0,001
 * by moving its comma. The number sits on a strip of digits with three zeros
 * on each side; its digits stay put and the comma slides right or left, the
 * zeros it passes becoming written digits. Pure and DOM-free.
 */
import {
  grouped,
  readStrip,
  shiftComma,
  shiftOf,
  shiftRule,
  stripOf,
} from '../_shared/decimal-ops.js';

/** Zeros on each side of the strip: enough for a move of three places. */
export const PAD = 3;

/** Numbers to try in the explore mode, each at most three digits long. */
export const NUMBERS = /** @type {const} */ (['4,32', '57,3', '0,6', '2,5', '12,8', '6,3']);

/** Questions of the quiz: number, operation, factor. */
export const QUIZ = /** @type {const} */ ([
  ['5,73', '×', '10'],
  ['4,3', '×', '0,01'],
  ['0,94', '×', '100'],
  ['86,5', ':', '10'],
  ['6,3', ':', '0,01'],
  ['2,7', '×', '1 000'],
  ['31,4', ':', '100'],
  ['0,3', ':', '0,1'],
  ['12,56', '×', '0,1'],
]);

/**
 * The operation written the book's way: "4,3 × 0,01".
 * @param {string} text
 * @param {'×' | ':'} op
 * @param {string} factor
 */
export const opText = (text, op, factor) => `${text} ${op} ${factor}`;

/**
 * Where the comma ends up on the strip of `text` after the operation.
 * @param {string} text
 * @param {'×' | ':'} op
 * @param {string} factor
 */
export function target(text, op, factor) {
  const { comma } = stripOf(text, PAD);
  return comma + shiftOf(op, factor);
}

/**
 * The live sentence after an operation: the rule, then the result.
 * @param {string} text
 * @param {'×' | ':'} op
 * @param {string} factor
 */
export function resultNote(text, op, factor) {
  return `${shiftRule(op, factor)} ${opText(text, op, factor)} = ${grouped(shiftComma(text, shiftOf(op, factor)))}.`;
}

/**
 * Checks where the child moved the comma in the quiz.
 * @param {string} text
 * @param {'×' | ':'} op
 * @param {string} factor
 * @param {number} comma where the comma is now on the strip
 * @returns {{ ok: boolean, text: string }}
 */
export function checkComma(text, op, factor, comma) {
  const want = target(text, op, factor);
  if (comma === want) return { ok: true, text: `Đúng rồi! ${resultNote(text, op, factor)}` };
  const { digits } = stripOf(text, PAD);
  const got = grouped(readStrip(digits, comma));
  const big = shiftOf(op, factor) > 0;
  const side = big ? 'phải' : 'trái';
  const start = stripOf(text, PAD).comma;
  const hint =
    comma === start
      ? `Em chưa dời dấu phẩy.`
      : comma > start !== big
        ? `Em dời sai chiều: phải dời sang bên ${side}.`
        : `Em dời đúng chiều nhưng sai số chữ số. Đếm số chữ số 0 trong ${factor}.`;
  return { ok: false, text: `Chưa đúng, em đang có ${got}. ${hint}` };
}
