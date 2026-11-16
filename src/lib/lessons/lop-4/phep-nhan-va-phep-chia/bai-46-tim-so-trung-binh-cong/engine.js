/**
 * Levelling columns of blocks to find their average: blocks move one at a
 * time from a column to another, the total never changes, and once every
 * column is the same height that height is the average, total : count. Pure
 * and DOM-free.
 */
import { int } from '#lib/core/drill.js';

/** The tallest a column may grow. */
export const MAX = 10;

/** The first sets of columns: the book's two cans, then three and four columns. */
export const FIRST = [
  [6, 4],
  [3, 8, 4],
  [5, 2, 7, 6],
];

/** @param {number[]} cols */
export const totalOf = (cols) => cols.reduce((s, c) => s + c, 0);

/** @param {number[]} cols */
export const averageOf = (cols) => totalOf(cols) / cols.length;

/** @param {number[]} cols */
export const isLevel = (cols) => cols.every((c) => c === cols[0]);

/**
 * Whether a block may move from one column to another.
 * @param {number[]} cols
 * @param {number} from
 * @param {number} to
 */
export const canMove = (cols, from, to) => from !== to && cols[from] > 0 && cols[to] < MAX;

/**
 * The columns after one block moves; unchanged when it may not.
 * @param {number[]} cols
 * @param {number} from
 * @param {number} to
 */
export function move(cols, from, to) {
  if (!canMove(cols, from, to)) return cols;
  return cols.map((c, i) => (i === from ? c - 1 : i === to ? c + 1 : c));
}

/**
 * The average written the book's way: (6 + 4) : 2 = 5.
 * @param {number[]} cols
 */
export const averageText = (cols) => `(${cols.join(' + ')}) : ${cols.length} = ${averageOf(cols)}`;

/**
 * How many blocks still have to move: those above the average.
 * @param {number[]} cols
 */
export function movesLeft(cols) {
  const avg = averageOf(cols);
  return cols.reduce((s, c) => s + Math.max(0, c - avg), 0);
}

/**
 * A random set of 2 to 5 columns of 1 to 9 blocks, not all equal, whose
 * total divides evenly by their count.
 * @param {() => number} rand
 * @param {number[]} [not] a set not to repeat
 * @returns {number[]}
 */
export function drawColumns(rand, not) {
  for (let i = 0; i < 1000; i++) {
    const count = int(rand, 2, 5);
    const cols = Array.from({ length: count }, () => int(rand, 1, 9));
    const same = not && not.join() === cols.join();
    if (totalOf(cols) % count === 0 && !isLevel(cols) && !same) return cols;
  }
  return FIRST[0];
}

/**
 * Numbers listed the Vietnamese way: "3, 8 và 4".
 * @param {number[]} values
 */
export const listText = (values) =>
  `${values.slice(0, -1).join(', ')} và ${values[values.length - 1]}`;

/**
 * What the board says: the total stays, and the average once level.
 * @param {number[]} start the columns before any move
 * @param {number[]} cols the columns now
 */
export function messageOf(start, cols) {
  const total = totalOf(cols);
  if (isLevel(cols)) {
    return `Các cột đều có ${cols[0]} khối. Tổng ${total} khối, ${cols.length} cột: ${total} : ${cols.length} = ${cols[0]}. Số trung bình cộng của ${listText(start)} là ${cols[0]}.`;
  }
  const left = movesLeft(cols);
  return `Tổng vẫn là ${total} khối. Em lấy khối ở cột cao đặt sang cột thấp. Còn ${left} khối cần chuyển.`;
}

/**
 * A column read aloud.
 * @param {number} i
 * @param {number} height
 */
export const columnLabel = (i, height) => `Cột ${i + 1}: ${height} khối`;
