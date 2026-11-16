/**
 * The table of area units the child taps through: a measure starts in its
 * own column, and each tap on another column rewrites it there, one column
 * at a time, × 100 to the right and : 100 to the left. A task asks for one
 * unit; the live line says whether the tapped column is that unit. Pure and
 * DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { AREA_UNITS, HA, convertSteps, convertText, unitIndex } from '../_shared/area-units.js';

/**
 * A measure to rewrite: n of unit `from`, asked in unit `to` ('ha' is the
 * column of hm²).
 * @typedef {{ n: number, from: string, to: string }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { n: 5, from: 'km²', to: HA },
  { n: 12, from: 'm²', to: 'dm²' },
  { n: 900, from: 'cm²', to: 'dm²' },
  { n: 600, from: HA, to: 'km²' },
  { n: 7, from: 'cm²', to: 'mm²' },
  { n: 2500, from: 'dm²', to: 'm²' },
  { n: 3, from: HA, to: 'm²' },
  { n: 30, from: 'dm²', to: 'm²' },
  { n: 1, from: 'km²', to: 'm²' },
  { n: 54, from: 'm²', to: HA },
];

/** The column headings: hm² is also written ha. */
export const HEADINGS = AREA_UNITS.map((u) => (u.symbol === 'hm²' ? 'hm² (ha)' : u.symbol));

/**
 * The unit a column is written in for a task: the hm² column is written
 * 'ha' when the task speaks of héc-ta.
 * @param {Task} task
 * @param {number} col
 */
export function unitAt(task, col) {
  const symbol = AREA_UNITS[col].symbol;
  return symbol === 'hm²' && (task.from === HA || task.to === HA) ? HA : symbol;
}

/**
 * The measure as given: '2 500 dm²'.
 * @param {Task} task
 */
export const givenText = (task) => `${fmt(task.n)} ${task.from}`;

/**
 * The measure written in the unit of column `col`: '25' for m² of 2 500 dm².
 * @param {Task} task
 * @param {number} col
 */
export const valueAt = (task, col) => convertText(task.n, task.from, AREA_UNITS[col].symbol);

/** The column a task starts in. @param {Task} task */
export const startCol = (task) => unitIndex(task.from);

/**
 * The steps from the given unit to column `col`, as sentences:
 * '3 ha × 100 = 300 dam²', '300 dam² × 100 = 30 000 m²'.
 * @param {Task} task
 * @param {number} col
 */
export function stepLines(task, col) {
  let before = givenText(task);
  return convertSteps(task.n, task.from, AREA_UNITS[col].symbol).map((s) => {
    const after = `${s.value} ${s.unit === 'hm²' && (task.from === HA || task.to === HA) ? HA : s.unit}`;
    const line = `${before} ${s.op} = ${after}`;
    before = after;
    return line;
  });
}

/**
 * The live line for column `col`.
 * @param {Task} task
 * @param {number} col
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function noteAt(task, col) {
  const unit = unitAt(task, col);
  const line = `${givenText(task)} = ${valueAt(task, col)} ${unit}.`;
  if (col === unitIndex(task.to)) return { tone: 'ok', text: `Đúng rồi! ${line}` };
  if (col === startCol(task)) {
    return {
      tone: 'info',
      text: `Em bấm vào cột ${task.to} để đổi ${givenText(task)} ra ${task.to}.`,
    };
  }
  const way = unitIndex(task.to) < col ? 'trái' : 'phải';
  return {
    tone: 'info',
    text: `${line} Cột ${task.to} còn ở bên ${way}.`,
  };
}
