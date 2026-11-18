/**
 * A division within the tables set out in two columns, tens and ones, with the
 * dividend on the left and the divisor and quotient on the right; the sentence
 * "9 : 2 = 4 (dư 1)" is `divText` in `#lib/core/kid/column-steps.js`. Pure and
 * DOM-free.
 */

/**
 * One line under the dividend. `t` and `o` are the digits in the tens and ones
 * columns, `line` rules a line under it, `active` tints what is being divided.
 * @typedef {{ t: string, o: string, line?: boolean, active?: 't' | 'both' }} SheetRow
 */

/**
 * A number as its two columns.
 * @param {number} value
 * @returns {SheetRow}
 */
export function cells(value) {
  return { t: value >= 10 ? String(Math.floor(value / 10)) : '', o: String(value % 10) };
}

/**
 * The sheet of a division done in one go, within the tables.
 * @param {number} dividend
 * @param {number} divisor
 * @returns {SheetRow[]}
 */
export function oneStepRows(dividend, divisor) {
  const rest = dividend % divisor;
  return [cells(dividend), { ...cells(dividend - rest), line: true }, cells(rest)];
}
