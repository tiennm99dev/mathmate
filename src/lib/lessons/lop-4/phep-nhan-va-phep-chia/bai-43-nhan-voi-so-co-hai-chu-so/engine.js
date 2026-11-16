/**
 * Multiplying by a two-digit number with an area model. The rectangle for
 * a × b is cut into four cells: the tens and ones of `a` across, the ones and
 * tens of `b` down. The row of the ones of `b` adds up to the first partial
 * product (tích riêng thứ nhất), the row of its tens to the second, which the
 * column sheet writes one place to the left. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {{ a: number, b: number }} Task */

/**
 * One cell of the area model.
 * @typedef {object} Cell
 * @property {number} row 0 for the ones of `b`, 1 for its tens
 * @property {number} col 0 for the tens of `a`, 1 for its ones
 * @property {number} left the part of `a`
 * @property {number} right the part of `b`
 * @property {number} value left × right
 */

/** The book's first example. */
export const FIRST = { a: 36, b: 23 };

/**
 * The tens and ones of a two-digit number, as values: 36 → [30, 6].
 * @param {number} n
 */
export const partsOf = (n) => [n - (n % 10), n % 10];

/**
 * A random two-digit by two-digit task, both ones digits above 0, so every
 * cell of the model has something in it.
 * @param {() => number} rand
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawTask(rand, not) {
  for (let i = 0; i < 100; i++) {
    const a = int(rand, 1, 9) * 10 + int(rand, 1, 9);
    const b = int(rand, 1, 9) * 10 + int(rand, 1, 9);
    if (a >= 12 && b >= 12 && !(not && not.a === a && not.b === b)) return { a, b };
  }
  return FIRST;
}

/**
 * The four cells, row by row: the ones of `b` first, then its tens.
 * @param {Task} task
 * @returns {Cell[]}
 */
export function cellsOf({ a, b }) {
  const across = partsOf(a);
  const down = [b % 10, b - (b % 10)];
  return down.flatMap((right, row) =>
    across.map((left, col) => ({ row, col, left, right, value: left * right })),
  );
}

/**
 * How wide the two columns (or how tall the two rows) are drawn: true to
 * size, except that the ones part keeps at least 30% so its label fits.
 * @param {number} n the factor
 * @returns {[number, number]} the share of the tens part, then of the ones part
 */
export function sharesOf(n) {
  const ones = Math.max((n % 10) / n, 0.3);
  return [1 - ones, ones];
}

/**
 * The two partial products and the product.
 * @param {Task} task
 */
export function partialsOf({ a, b }) {
  const first = a * (b % 10);
  const second = a * Math.floor(b / 10);
  return { first, second, product: a * b };
}

/**
 * What a row of the model adds up to, written out.
 * @param {Task} task
 * @param {number} row
 */
export function rowText(task, row) {
  const cells = cellsOf(task).filter((c) => c.row === row);
  const [l, r] = cells;
  const sum = l.value + r.value;
  return `${l.left} × ${l.right} + ${r.left} × ${r.right} = ${fmt(l.value)} + ${fmt(r.value)} = ${fmt(sum)}`;
}

/**
 * What a cell says once it is opened.
 * @param {Cell} cell
 */
export const cellText = (cell) => `${cell.left} × ${cell.right} = ${fmt(cell.value)}`;

/**
 * The sentence after a row is complete: which partial product it is.
 * @param {Task} task
 * @param {number} row
 */
export function rowMessage(task, row) {
  const { a, b } = task;
  const { first, second } = partialsOf(task);
  if (row === 0) {
    return `Hàng trên: ${rowText(task, 0)}. Đó là ${a} × ${b % 10} = ${fmt(first)}, tích riêng thứ nhất.`;
  }
  return `Hàng dưới: ${rowText(task, 1)}. Đó là ${a} × ${Math.floor(b / 10)} chục = ${fmt(second)} chục, tích riêng thứ hai.`;
}

/**
 * The closing sentence once all four cells are open.
 * @param {Task} task
 */
export function doneMessage(task) {
  const { a, b } = task;
  const { first, second, product } = partialsOf(task);
  return `Cộng hai tích riêng: ${fmt(first)} + ${fmt(second * 10)} = ${fmt(product)}. Vậy ${a} × ${b} = ${fmt(product)}.`;
}

/**
 * One line of the column sheet: its sign and its digits, right-aligned in
 * `width` columns, with an optional rule under it.
 * @typedef {{ sign: string, cells: string[], line?: boolean, tone?: 'first' | 'second' | 'product' }} SheetRow
 */

/**
 * The digits of `value` ending `shift` columns from the right.
 * @param {number} value
 * @param {number} width
 * @param {number} [shift]
 */
function cellsOfNumber(value, width, shift = 0) {
  const cells = Array.from({ length: width }, () => '');
  String(value)
    .split('')
    .reverse()
    .forEach((digit, i) => {
      cells[width - 1 - shift - i] = digit;
    });
  return cells;
}

/**
 * The column sheet the book writes: the factors, the first partial product,
 * the second one shifted one place to the left, and the product.
 * @param {Task} task
 * @returns {SheetRow[]}
 */
export function sheetOf(task) {
  const { first, second, product } = partialsOf(task);
  const width = Math.max(String(product).length, String(second).length + 1);
  return [
    { sign: '', cells: cellsOfNumber(task.a, width) },
    { sign: '×', cells: cellsOfNumber(task.b, width), line: true },
    { sign: '', cells: cellsOfNumber(first, width), tone: 'first' },
    { sign: '+', cells: cellsOfNumber(second, width, 1), line: true, tone: 'second' },
    { sign: '', cells: cellsOfNumber(product, width), tone: 'product' },
  ];
}

/**
 * The sheet read aloud.
 * @param {Task} task
 */
export function sheetLabel(task) {
  const { first, second, product } = partialsOf(task);
  return `Đặt tính ${task.a} nhân ${task.b}. Tích riêng thứ nhất ${fmt(first)}. Tích riêng thứ hai ${fmt(second)}, viết lùi sang trái một cột. Tích ${fmt(product)}.`;
}
