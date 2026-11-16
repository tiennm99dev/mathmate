/**
 * Multiplying decimals two ways. On the area model a square of side 1 m is
 * cut into 10 × 10 small squares of 0,01 m²: a rectangle 0,a m by 0,b m
 * covers a × b of them, so 0,a × 0,b is that many hundredths. On the comma
 * board the child multiplies as natural numbers and puts the comma so that
 * the product has as many decimal digits as both factors together.
 * Pure and DOM-free.
 */
import { decText, fracLength, productPlan, productWhy, trimZeros } from '../_shared/decimal-ops.js';

/**
 * A side of the area model, `tenths` tenths of a metre, written as a decimal.
 * @param {number} tenths 1 to 10
 */
export const sideText = (tenths) => trimZeros(decText(tenths, 1));

/**
 * What the area model shows for a rectangle of `cols` by `rows` tenths.
 * @param {number} cols
 * @param {number} rows
 */
export function areaNote(cols, rows) {
  const a = sideText(cols);
  const b = sideText(rows);
  const squares = cols * rows;
  const area = trimZeros(decText(squares, 2));
  return `Hình chữ nhật có ${cols} × ${rows} = ${squares} ô nhỏ. Mỗi ô nhỏ là 0,01 m², nên diện tích là ${area} m². Vậy ${a} × ${b} = ${area}.`;
}

/** Rectangles the child is asked to build, in tenths of a metre. */
export const AREA_QUIZ = /** @type {const} */ ([
  [4, 6],
  [3, 7],
  [8, 5],
  [2, 9],
  [10, 6],
]);

/**
 * The answers offered for a rectangle: the product and the two slips of a
 * comma put wrong (or left out).
 * @param {number} cols
 * @param {number} rows
 */
export function areaOptions(cols, rows) {
  const n = cols * rows;
  const right = trimZeros(decText(n, 2));
  const slips = [trimZeros(decText(n, 1)), String(n)];
  return [right, ...slips.filter((s) => s !== right)];
}

/** Products for the comma board: the natural product is longer than its decimal part. */
export const COMMA_TASKS = /** @type {const} */ ([
  ['2,5', '1,3'],
  ['12,6', '3'],
  ['1,24', '2,3'],
  ['0,36', '4'],
  ['6,8', '0,7'],
  ['3,05', '2,1'],
]);

/**
 * The comma board of a product: the natural product's digits and the gap
 * (digits on the left) where the comma goes.
 * @param {string} a
 * @param {string} b
 */
export function commaTask(a, b) {
  const plan = productPlan(a, b);
  const digits = String(plan.natural);
  return { ...plan, digits, gap: digits.length - plan.places };
}

/**
 * Checks where the child put the comma.
 * @param {string} a
 * @param {string} b
 * @param {number} gap
 * @returns {{ ok: boolean, text: string }}
 */
export function checkComma(a, b, gap) {
  const task = commaTask(a, b);
  if (gap === task.gap) return { ok: true, text: `Đúng rồi! ${productWhy(a, b)}` };
  const fa = fracLength(a);
  const fb = fracLength(b);
  return {
    ok: false,
    text: `Chưa đúng. Em đếm chữ số ở phần thập phân: ${a} có ${fa}, ${b} có ${fb}. Tích phải có bấy nhiêu chữ số ở phần thập phân, đếm từ phải sang trái.`,
  };
}
