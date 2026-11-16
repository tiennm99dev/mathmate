/**
 * The place table of the review of natural numbers: one column per place,
 * grouped in the classes lớp triệu, lớp nghìn and lớp đơn vị. The child
 * hears a number read aloud and puts a digit card into every column; the
 * table then writes the number, reads it, splits it into its places, says
 * whether it is even or odd and rounds it to hàng trăm nghìn. Pure and
 * DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import {
  CLASS_NAMES,
  classOf,
  digitAt,
  digitCount,
  placeColumns,
  readWhole,
  roundWhy,
  sumText,
} from '#lib/core/kid/whole-numbers.js';

/** One digit per column, or null while the column is empty. @typedef {(number | null)[]} Slots */

/** The digit cards of the tray. */
export const DIGITS = /** @type {const} */ ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/** The numbers the child is asked to build, in order: the book's numbers first. */
export const CHALLENGES = /** @type {const} */ ([
  20112024, 1730539, 26400500, 504842, 97338579, 3045302, 12006080, 863749,
]);

/**
 * The columns of the table for a number: as many as it has digits, each
 * with its class.
 * @param {number} n
 */
export function columnsFor(n) {
  return placeColumns(digitCount(n)).map((p) => ({ ...p, cls: classOf(p.exp) }));
}

/**
 * The classes over the columns, from the left, with how many columns each
 * spans: 1730539 gives triệu 1, nghìn 3, đơn vị 3.
 * @param {number} n
 * @returns {{ cls: number, name: string, span: number }[]}
 */
export function classHeads(n) {
  /** @type {{ cls: number, name: string, span: number }[]} */
  const heads = [];
  for (const col of columnsFor(n)) {
    const last = heads.at(-1);
    if (last && last.cls === col.cls) last.span += 1;
    else heads.push({ cls: col.cls, name: `Lớp ${CLASS_NAMES[col.cls]}`, span: 1 });
  }
  return heads;
}

/** The digits of a number from the left. @param {number} n */
export const digitsFor = (n) => columnsFor(n).map((p) => digitAt(n, p.exp));

/** An empty table for a number. @param {number} n @returns {Slots} */
export const emptyFor = (n) => columnsFor(n).map(() => null);

/**
 * Puts a digit card into a column; a card already there is replaced.
 * @param {Slots} slots
 * @param {number} column
 * @param {number} digit
 * @returns {Slots}
 */
export function place(slots, column, digit) {
  if (column < 0 || column >= slots.length) return slots;
  if (!Number.isInteger(digit) || digit < 0 || digit > 9) return slots;
  return slots.map((d, i) => (i === column ? digit : d));
}

/**
 * Takes the card out of a column.
 * @param {Slots} slots
 * @param {number} column
 * @returns {Slots}
 */
export const clear = (slots, column) => slots.map((d, i) => (i === column ? null : d));

/**
 * The number the table holds, or null while a column is empty or the first
 * column holds 0.
 * @param {Slots} slots
 */
export function numberOf(slots) {
  if (slots.some((d) => d === null) || slots[0] === 0) return null;
  return slots.reduce((n, d) => /** @type {number} */ (n) * 10 + (d ?? 0), 0);
}

/**
 * How the table reads now.
 * @param {Slots} slots
 */
export function reading(slots) {
  const empty = slots.filter((d) => d === null).length;
  if (empty === slots.length) return 'Bảng chưa có thẻ nào.';
  if (empty > 0) return `Còn ${empty} cột chưa có thẻ.`;
  const n = numberOf(slots);
  if (n === null) return 'Chữ số đầu tiên bên trái phải khác 0.';
  return `${fmt(n)} đọc là: ${readWhole(n)}.`;
}

/**
 * Even or odd, from the ones digit.
 * @param {number} n
 */
export function parityText(n) {
  const ones = n % 10;
  return n % 2 === 0
    ? `Chữ số hàng đơn vị là ${ones}, nên ${fmt(n)} là số chẵn.`
    : `Chữ số hàng đơn vị là ${ones}, nên ${fmt(n)} là số lẻ.`;
}

/**
 * What the table tells about its number once it is full: the sum of
 * places, even or odd, and the rounding to hàng trăm nghìn when the number
 * reaches that place.
 * @param {Slots} slots
 * @returns {string[]}
 */
export function facts(slots) {
  const n = numberOf(slots);
  if (n === null) return [];
  const lines = [sumText(n), parityText(n)];
  if (n >= 100000) lines.push(roundWhy(n, 100000));
  return lines;
}

/**
 * The live line about the number asked for. It names the first column that
 * is off without giving its digit.
 * @param {Slots} slots
 * @param {number} target
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function challengeNote(slots, target) {
  const want = digitsFor(target);
  if (slots.length === want.length && slots.every((d, i) => d === want[i])) {
    return { tone: 'ok', text: `Đúng rồi! Số ${readWhole(target)} viết là ${fmt(target)}.` };
  }
  if (slots.every((d) => d === null)) {
    return { tone: 'info', text: 'Em chọn một thẻ chữ số rồi đặt vào một cột.' };
  }
  const off = slots.findIndex((d, i) => d !== null && d !== want[i]);
  if (off >= 0) {
    const col = columnsFor(target)[off];
    return { tone: 'info', text: `Thẻ ở cột ${col.title} chưa đúng. Em nghe lại tên số nhé.` };
  }
  return { tone: 'info', text: 'Các thẻ đã đặt đều đúng. Em đặt tiếp vào cột còn trống.' };
}
