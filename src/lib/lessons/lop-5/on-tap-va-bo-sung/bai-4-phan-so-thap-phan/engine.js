/**
 * The 10 × 10 grid of decimal fractions. The square is one whole; a column
 * is one tenth and a cell is one hundredth. The child shades whole columns
 * or single cells (filled column by column) to show a fraction asked for,
 * and sees the shading written as a decimal fraction over 100 and, for whole
 * columns, over 10. Pure and DOM-free.
 */

/** Cells along one side of the grid. */
export const SIDE = 10;

/** Cells in the whole grid. */
export const CELLS = SIDE * SIDE;

/**
 * A fraction to shade.
 * @typedef {{ n: number, d: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { n: 3, d: 10 },
  { n: 45, d: 100 },
  { n: 3, d: 5 },
  { n: 7, d: 100 },
  { n: 1, d: 4 },
  { n: 7, d: 20 },
  { n: 1, d: 2 },
  { n: 11, d: 25 },
];

/**
 * How many cells a task asks for: n/d of 100.
 * @param {Task} task
 */
export const cellsFor = (task) => (CELLS * task.n) / task.d;

/** @param {number} n @param {number} d */
const tex = (n, d) => `$\\dfrac{${n}}{${d}}$`;

/**
 * The shading written as decimal fractions: over 100, and over 10 too when
 * whole columns are shaded.
 * @param {number} count shaded cells, 0 to 100
 */
export function shadedText(count) {
  const over100 = tex(count, CELLS);
  return count % SIDE === 0 ? `${tex(count / SIDE, SIDE)} = ${over100}` : over100;
}

/**
 * The count after a tap. In columns mode a tap on column c shades the
 * first c + 1 columns; in cells mode a tap on cell i (counted down each
 * column, then across) shades the first i + 1 cells. Tapping the last
 * shaded column or cell again takes it away.
 * @param {number} count
 * @param {'columns' | 'cells'} mode
 * @param {number} col 0 to 9
 * @param {number} row 0 to 9
 */
export function tapAt(count, mode, col, row) {
  const next = mode === 'columns' ? (col + 1) * SIDE : col * SIDE + row + 1;
  const back = mode === 'columns' ? col * SIDE : col * SIDE + row;
  return next === count ? back : next;
}

/**
 * Moves the count by a step, kept within the grid.
 * @param {number} count
 * @param {number} step
 */
export const nudge = (count, step) => Math.min(CELLS, Math.max(0, count + step));

/**
 * The live line under the grid.
 * @param {number} count
 * @param {Task} task
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function gridNote(count, task) {
  const want = cellsFor(task);
  const asked = tex(task.n, task.d);
  if (count === want) {
    const chain = [
      asked,
      want % SIDE === 0 && task.d !== SIDE ? tex(want / SIDE, SIDE) : '',
      task.d === CELLS ? '' : tex(want, CELLS),
    ]
      .filter((t) => t !== '')
      .join(' = ');
    return { tone: 'ok', text: `Đúng rồi! ${chain}.` };
  }
  const now = count === 0 ? 'Em chưa tô ô nào.' : `Em đã tô ${count} ô: ${shadedText(count)}.`;
  const more = count < want ? 'Em tô thêm.' : 'Em tô nhiều quá, bớt đi nhé.';
  return { tone: 'info', text: `${now} ${more}` };
}
