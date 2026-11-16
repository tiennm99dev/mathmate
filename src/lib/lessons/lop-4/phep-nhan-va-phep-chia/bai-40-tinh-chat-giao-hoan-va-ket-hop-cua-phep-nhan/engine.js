/**
 * A box of dots: `layers` trays side by side, each `rows` rows of `cols`
 * dots. Counted tray by tray it is (rows × cols) × layers; counted row by row
 * across the trays it is rows × (cols × layers); turning every tray a
 * quarter swaps rows and columns, rows × cols = cols × rows. The total never
 * changes. Pure and DOM-free.
 */

/** @typedef {{ rows: number, cols: number, layers: number }} Box */
/** @typedef {'tray' | 'row'} Grouping */

/** The smallest and largest size of each side. */
export const SIDE = { min: 2, max: 5 };

/**
 * How many dots the box has.
 * @param {Box} box
 */
export const totalOf = ({ rows, cols, layers }) => rows * cols * layers;

/**
 * The box with every tray turned a quarter: rows and columns swap.
 * @param {Box} box
 * @returns {Box}
 */
export const turned = ({ rows, cols, layers }) => ({ rows: cols, cols: rows, layers });

/**
 * The counting of a grouping, as the expression and its working.
 * @param {Box} box
 * @param {Grouping} grouping
 * @returns {{ expression: string, lines: string[] }}
 */
export function countOf(box, grouping) {
  const { rows, cols, layers } = box;
  const total = totalOf(box);
  if (grouping === 'tray') {
    const tray = rows * cols;
    return {
      expression: `(${rows} × ${cols}) × ${layers} = ${total}`,
      lines: [
        `Mỗi tầng có ${rows} × ${cols} = ${tray} chấm.`,
        `${layers} tầng có ${tray} × ${layers} = ${total} chấm.`,
      ],
    };
  }
  const row = cols * layers;
  return {
    expression: `${rows} × (${cols} × ${layers}) = ${total}`,
    lines: [
      `Mỗi hàng cùng màu đi qua ${layers} tầng, có ${cols} × ${layers} = ${row} chấm.`,
      `${rows} hàng như thế có ${rows} × ${row} = ${total} chấm.`,
    ],
  };
}

/**
 * The sentence after the trays are turned.
 * @param {Box} before the box before turning
 */
export function turnText(before) {
  const { rows, cols } = before;
  if (rows === cols) {
    return `Mỗi tầng có ${rows} hàng, ${cols} cột. Xoay đi vẫn thế: ${rows} × ${cols} = ${cols} × ${rows}.`;
  }
  return `Mỗi tầng xoay đi: ${rows} hàng thành ${cols} hàng. ${rows} × ${cols} = ${cols} × ${rows} = ${rows * cols}. Số chấm không đổi.`;
}

/**
 * What the box shows, for screen readers.
 * @param {Box} box
 */
export const boxLabel = ({ rows, cols, layers }) =>
  `Hộp chấm có ${layers} tầng, mỗi tầng ${rows} hàng, mỗi hàng ${cols} chấm.`;
