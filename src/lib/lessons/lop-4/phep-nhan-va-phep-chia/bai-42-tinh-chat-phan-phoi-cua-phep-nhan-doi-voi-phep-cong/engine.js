/**
 * A rectangle of squares cut in two parts. Cut between columns, it has `a`
 * rows of `b + c` squares: a × (b + c) = a × b + a × c. Cut between rows, it
 * has `b + c` rows of `a` squares: (b + c) × a = b × a + c × a. Either way the
 * whole is the sum of the parts. Pure and DOM-free.
 */

/** @typedef {'cols' | 'rows'} Cut */
/** @typedef {{ cut: Cut, a: number, b: number, c: number }} Split */

/** The sizes the widget allows. */
export const LIMITS = { a: { min: 2, max: 8 }, part: { min: 1, max: 6 } };

/**
 * How many rows and columns the rectangle has.
 * @param {Split} split
 */
export function sizeOf({ cut, a, b, c }) {
  return cut === 'cols' ? { rows: a, cols: b + c } : { rows: b + c, cols: a };
}

/**
 * The two parts, pink then blue, each as rows and columns of squares.
 * @param {Split} split
 */
export function partsOf({ cut, a, b, c }) {
  const shape = (/** @type {number} */ n) =>
    cut === 'cols' ? { rows: a, cols: n } : { rows: n, cols: a };
  return [
    { tone: 'bg-rose-400', ...shape(b) },
    { tone: 'bg-sky-400', ...shape(c) },
  ];
}

/**
 * The two ways to count, each as the expression and its working.
 * @param {Split} split
 */
export function countsOf({ cut, a, b, c }) {
  const total = a * (b + c);
  if (cut === 'cols') {
    return {
      total,
      whole: `${a} × (${b} + ${c}) = ${a} × ${b + c} = ${total}`,
      parts: `${a} × ${b} + ${a} × ${c} = ${a * b} + ${a * c} = ${total}`,
      rule: `${a} × (${b} + ${c}) = ${a} × ${b} + ${a} × ${c}`,
    };
  }
  return {
    total,
    whole: `(${b} + ${c}) × ${a} = ${b + c} × ${a} = ${total}`,
    parts: `${b} × ${a} + ${c} × ${a} = ${a * b} + ${a * c} = ${total}`,
    rule: `(${b} + ${c}) × ${a} = ${b} × ${a} + ${c} × ${a}`,
  };
}

/**
 * What the rectangle shows, for screen readers.
 * @param {Split} split
 */
export function splitLabel(split) {
  const { cut, a, b, c } = split;
  const { rows, cols } = sizeOf(split);
  const parts =
    cut === 'cols'
      ? `${b} cột màu hồng và ${c} cột màu xanh`
      : `${b} hàng màu hồng và ${c} hàng màu xanh`;
  return `Hình chữ nhật ${rows} hàng, ${cols} cột, gồm ${parts}, mỗi ${cut === 'cols' ? 'cột' : 'hàng'} ${a} ô.`;
}
