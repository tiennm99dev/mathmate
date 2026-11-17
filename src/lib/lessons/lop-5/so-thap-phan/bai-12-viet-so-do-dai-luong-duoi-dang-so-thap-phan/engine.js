/**
 * The table of units with a sliding comma. A measure such as 3 m 5 cm is put
 * in the table, its last digit in the column of its smallest unit. The comma
 * goes right after the column of the unit the measure is written in, so
 * sliding it one column turns 305 cm into 30,5 dm and 3,05 m. Zeros fill the
 * columns between the digits and the comma. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { decText, trimZeros } from '../_shared/decimals.js';

/**
 * The two tables, biggest unit first; each column is 10 of the next, so the
 * comma slides one column per step. The 2018 programme no longer teaches hm,
 * dam, hg and dag: their columns stay so the arithmetic holds, but they are
 * drawn as unnamed spacers and the comma steps over them (`slideFrom`).
 */
export const TABLES = /** @type {const} */ ({
  length: { name: 'Độ dài', units: ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'] },
  mass: { name: 'Khối lượng', units: ['tấn', 'tạ', 'yến', 'kg', 'hg', 'dag', 'g'] },
});

/** Units kept only as spacer columns, never named or written. */
const UNTAUGHT = new Set(['hm', 'dam', 'hg', 'dag']);

/** @typedef {keyof typeof TABLES} TableKey */

/**
 * A measure to rewrite: its parts and the unit to write it in.
 * @typedef {{ table: TableKey, parts: [number, string][], target: string }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  {
    table: 'length',
    parts: [
      [3, 'm'],
      [5, 'cm'],
    ],
    target: 'm',
  },
  {
    table: 'length',
    parts: [
      [6, 'm'],
      [4, 'dm'],
    ],
    target: 'm',
  },
  { table: 'length', parts: [[508, 'cm']], target: 'm' },
  {
    table: 'length',
    parts: [
      [15, 'cm'],
      [9, 'mm'],
    ],
    target: 'cm',
  },
  {
    table: 'length',
    parts: [
      [2, 'km'],
      [75, 'm'],
    ],
    target: 'km',
  },
  { table: 'length', parts: [[7, 'mm']], target: 'cm' },
  {
    table: 'mass',
    parts: [
      [5, 'kg'],
      [950, 'g'],
    ],
    target: 'kg',
  },
  {
    table: 'mass',
    parts: [
      [3, 'tấn'],
      [2, 'tạ'],
    ],
    target: 'tấn',
  },
  { table: 'mass', parts: [[450, 'g']], target: 'kg' },
  {
    table: 'mass',
    parts: [
      [2, 'tạ'],
      [5, 'yến'],
    ],
    target: 'tạ',
  },
  {
    table: 'mass',
    parts: [
      [6, 'kg'],
      [195, 'g'],
    ],
    target: 'kg',
  },
];

/**
 * The units of a task's table.
 * @param {Task} task
 * @returns {readonly string[]}
 */
export const unitsOf = (task) => TABLES[task.table].units;

/**
 * The measure as a whole number of its smallest unit: 3 m 5 cm is 305 of
 * column 'cm' (index 5).
 * @param {Task} task
 */
export function amountOf(task) {
  const units = unitsOf(task);
  const base = Math.max(...task.parts.map(([, u]) => units.indexOf(u)));
  const amount = task.parts.reduce((s, [v, u]) => s + v * 10 ** (base - units.indexOf(u)), 0);
  return { amount, base };
}

/**
 * The measure as given: '3 m 5 cm'.
 * @param {Task} task
 */
export const givenText = (task) => task.parts.map(([v, u]) => `${fmt(v)} ${u}`).join(' ');

/**
 * The measure written in the unit of column `col`: '3,05' for metres,
 * '305' for centimetres; zeros at the end of the decimal part dropped.
 * @param {Task} task
 * @param {number} col
 */
export function valueIn(task, col) {
  const { amount, base } = amountOf(task);
  if (col >= base) return fmt(amount * 10 ** (col - base));
  return trimZeros(decText(amount, base - col));
}

/**
 * The digits in the table when the comma sits after column `col`: one
 * string per column ('' when empty).
 * @param {Task} task
 * @param {number} col
 */
export function cellsAt(task, col) {
  const { amount, base } = amountOf(task);
  const last = Math.max(col, base);
  const digits = String(amount * 10 ** (last - base)).padStart(last - col + 1, '0');
  const first = last - digits.length + 1;
  return unitsOf(task).map((_, i) => (i >= first && i <= last ? digits[i - first] : ''));
}

/**
 * The live line: the measure in the chosen unit, and whether it is the unit
 * asked for.
 * @param {Task} task
 * @param {number} col
 * @returns {{ ok: boolean, text: string }}
 */
export function noteAt(task, col) {
  const unit = unitsOf(task)[col];
  const line = `${givenText(task)} = ${valueIn(task, col)} ${unit}.`;
  if (unit === task.target) return { ok: true, text: `Đúng rồi! ${line}` };
  const way = unitsOf(task).indexOf(task.target) < col ? 'trái' : 'phải';
  return { ok: false, text: `${line} Em cần viết theo ${task.target}: dời dấu phẩy sang ${way}.` };
}

/**
 * The column the comma starts after: the smallest unit of the measure.
 * @param {Task} task
 */
export const startCol = (task) => amountOf(task).base;

/**
 * Whether column `col` is a unit the child knows (not a spacer).
 * @param {Task} task
 * @param {number} col
 */
export const isTaught = (task, col) => !UNTAUGHT.has(unitsOf(task)[col]);

/**
 * The column the comma moves to from `col` one step left (-1) or right (1),
 * stepping over spacer columns; `col` itself when there is none that way.
 * @param {Task} task
 * @param {number} col
 * @param {-1 | 1} step
 */
export function slideFrom(task, col, step) {
  for (let c = col + step; c >= 0 && c < unitsOf(task).length; c += step) {
    if (isTaught(task, c)) return c;
  }
  return col;
}
