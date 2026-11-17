import { readNumber } from '#lib/core/kid/numbers.js';

/** The grid has 100 equal squares, so k squares are k%. */
export const CELLS = 100;

/** The percentages the child is asked to colour, in order. */
export const TARGETS = [25, 40, 7, 50, 64, 90, 13, 100];

/**
 * The count after a tap on square `i` (0-based, read row by row): squares
 * are coloured from the first one, so a tap colours up to that square, and a
 * tap on the last coloured square takes it back.
 * @param {number} count
 * @param {number} i
 */
export function tapCell(count, i) {
  return count === i + 1 ? i : i + 1;
}

/**
 * What the grid shows, in the book's words.
 * @param {number} count coloured squares, 0 to 100
 */
export function gridNote(count) {
  const white = CELLS - count;
  return `Tô ${count} ô trong ${CELLS} ô. Tỉ số của số ô tô màu và số ô cả lưới là ${count} : ${CELLS} = ${count}%. Tỉ số của số ô tô màu và số ô chưa tô là ${count} : ${white}.`;
}

/**
 * How the percentage is read: 25% is "hai mươi lăm phần trăm".
 * @param {number} p a whole percentage from 0 to 100
 */
export const readPercent = (p) => `${readNumber(p)} phần trăm`;

/**
 * Checks a coloured grid against the asked percentage.
 * @param {number} count
 * @param {number} target
 * @returns {{ ok: boolean, text: string }}
 */
export function checkPaint(count, target) {
  if (count === target)
    return {
      ok: true,
      text: `Đúng rồi! ${target} ô trong ${CELLS} ô là ${target} : ${CELLS} = ${target}%.`,
    };
  const more = count < target;
  return {
    ok: false,
    text: `Em đã tô ${count} ô. ${target}% là ${target} ô trong ${CELLS} ô, em cần tô ${more ? 'thêm' : 'bớt'} ${Math.abs(target - count)} ô.`,
  };
}
