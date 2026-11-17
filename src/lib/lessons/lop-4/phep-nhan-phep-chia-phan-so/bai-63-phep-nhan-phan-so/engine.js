/**
 * Multiplying two fractions on the unit square. The square is cut into b
 * equal columns and d equal rows. The child shades a columns (a/b of the
 * width) in blue and c rows (c/d of the height) in yellow; the cells shaded
 * twice make the rectangle a/b by c/d. There are a × c such cells among the
 * b × d cells of the square, so a/b × c/d = (a × c)/(b × d). Pure and
 * DOM-free.
 */
import { fracRich, fracWords, productTex, sameValue } from '../_shared/fractions.js';

/**
 * A task: a/b × c/d.
 * @typedef {{ a: number, b: number, c: number, d: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { a: 4, b: 5, c: 2, d: 3 },
  { a: 1, b: 2, c: 1, d: 3 },
  { a: 2, b: 3, c: 3, d: 4 },
  { a: 3, b: 4, c: 1, d: 2 },
  { a: 2, b: 5, c: 1, d: 2 },
  { a: 3, b: 5, c: 3, d: 4 },
  { a: 5, b: 6, c: 2, d: 3 },
];

/**
 * Where the child is: shading, reading the product, after a slip, or done.
 * @typedef {'read' | 'wrong' | 'miscount' | 'right'} Step
 */

/**
 * Whether a cell is shaded blue (its column), yellow (its row) or both.
 * Columns are shaded from the left and rows from the top.
 * @param {number} col column index from 0
 * @param {number} row row index from 0
 * @param {number} cols shaded columns
 * @param {number} rows shaded rows
 * @returns {'both' | 'col' | 'row' | 'none'}
 */
export function cellKind(col, row, cols, rows) {
  const inCol = col < cols;
  const inRow = row < rows;
  if (inCol && inRow) return 'both';
  if (inCol) return 'col';
  if (inRow) return 'row';
  return 'none';
}

/**
 * Three options for the product: the cells counted, the slip of adding the
 * denominators, the slip of adding the numerators, and a miscount by one;
 * none other has the product's value. Ordered by value, so the product is
 * not always on the same button.
 * @param {Task} t
 * @returns {{ options: Array<{ n: number, d: number }>, answer: number }}
 */
export function productOptions(t) {
  const right = { n: t.a * t.c, d: t.b * t.d };
  const slips = [
    { n: t.a * t.c, d: t.b + t.d },
    { n: t.a + t.c, d: t.b * t.d },
    { n: t.a * t.c + 1, d: t.b * t.d },
    { n: t.a * t.c - 1, d: t.b * t.d },
  ];
  /** @type {Array<{ n: number, d: number }>} */
  const kept = [right];
  for (const s of slips) {
    if (kept.length === 3) break;
    if (s.n < 1 || kept.some((k) => sameValue(k, s))) continue;
    kept.push(s);
  }
  const options = [...kept].sort((x, y) => x.n / x.d - y.n / y.d);
  return { options, answer: options.indexOf(right) };
}

/**
 * The spoken name of an option.
 * @param {{ n: number, d: number }} f
 */
export const optionWords = (f) => fracWords(f.n, f.d);

/**
 * The live sentence under the square.
 * @param {Task} t
 * @param {number} cols shaded columns
 * @param {number} rows shaded rows
 * @param {Step} step
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function productNote(t, cols, rows, step) {
  if (cols !== t.a) {
    return {
      tone: 'info',
      text: `Hình vuông có ${t.b} cột bằng nhau. Em tô màu xanh ${fracRich(t.a, t.b)} hình vuông: tô ${t.a} cột. Em đang tô ${cols} cột.`,
    };
  }
  if (rows !== t.c) {
    return {
      tone: 'info',
      text: `Tốt lắm! Hình vuông có ${t.d} hàng bằng nhau. Em tô màu vàng ${fracRich(t.c, t.d)} hình vuông: tô ${t.c} hàng. Em đang tô ${rows} hàng.`,
    };
  }
  const n = t.a * t.c;
  const d = t.b * t.d;
  if (step === 'right') {
    return {
      tone: 'ok',
      text: `Đúng rồi! Có ${t.a} × ${t.c} = ${n} ô tô cả hai màu, trong ${t.b} × ${t.d} = ${d} ô của hình vuông: $${productTex({ n: t.a, d: t.b }, { n: t.c, d: t.d })}$. Tử số nhân tử số, mẫu số nhân mẫu số.`,
    };
  }
  if (step === 'miscount') {
    return {
      tone: 'warn',
      text: `Chưa đúng. Em đếm lại các ô màu xanh lá: ${t.c} hàng, mỗi hàng ${t.a} ô.`,
    };
  }
  if (step === 'wrong') {
    return {
      tone: 'warn',
      text: `Chưa đúng. Mẫu số là số ô của cả hình vuông: ${t.b} cột, mỗi cột ${t.d} ô, không phải ${t.b} + ${t.d}.`,
    };
  }
  return {
    tone: 'info',
    text: `Phần tô cả hai màu (xanh lá) là kết quả của ${fracRich(t.a, t.b)} × ${fracRich(t.c, t.d)}. Phần đó là mấy phần hình vuông?`,
  };
}

/**
 * The screen-reader description of the square.
 * @param {Task} t
 * @param {number} cols
 * @param {number} rows
 * @param {boolean} settled whether the product may be told
 */
export function squareLabel(t, cols, rows, settled) {
  const base = `Hình vuông chia thành ${t.b} cột và ${t.d} hàng, tất cả ${t.b * t.d} ô. Tô xanh ${cols} cột, tô vàng ${rows} hàng.`;
  return settled
    ? `${base} Có ${cols * rows} ô tô cả hai màu, đó là ${fracWords(cols * rows, t.b * t.d)} hình vuông.`
    : base;
}
