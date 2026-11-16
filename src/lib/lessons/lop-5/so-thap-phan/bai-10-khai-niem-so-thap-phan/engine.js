/**
 * The zooming ruler of a decimal. A ruler from 0 to 10 is cut into 10 equal
 * gaps; the child taps the gap that holds the number (its whole part). That
 * gap is blown up into a new ruler cut into 10 tenths, then a tenth into 10
 * hundredths, until the child taps the very mark of the number. Each tap
 * finds one digit: the whole part, the tenths digit, the hundredths digit.
 * Values are integers scaled by 10^places of the number, so nothing drifts.
 * Pure and DOM-free.
 */
import { DECIMAL_PLACES, decText, partsOf, readDecimal, toScaled } from '../_shared/decimals.js';

/** Numbers to find, with one or two digits after the comma, the last not 0. */
export const TARGETS = /** @type {const} */ ([
  '2,7',
  '1,46',
  '0,35',
  '3,08',
  '6,5',
  '4,92',
  '0,6',
  '7,19',
]);

/** Gaps on every ruler. */
export const GAPS = 10;

/**
 * The digits found one tap at a time: the whole part, then each digit after
 * the comma. '1,46' gives [1, 4, 6].
 * @param {string} text
 */
export function digitsOf(text) {
  const { whole, frac } = partsOf(text);
  return [Number(whole), ...frac.split('').map(Number)];
}

/**
 * Taps needed to find the number: one for the whole part and one per digit
 * after the comma.
 * @param {string} text
 */
export const levelsOf = (text) => digitsOf(text).length;

/**
 * The ruler at a level: where it starts and the size of one gap, both
 * scaled by 10^places of the number, and how many places its marks show.
 * Level 0 runs from 0 to 10 by ones; level 1 is one unit cut into tenths.
 * @param {string} text
 * @param {number} level
 */
export function rulerOf(text, level) {
  const { places } = toScaled(text);
  const digits = digitsOf(text);
  const gap = 10 ** (places - Math.max(0, level - 1)) / (level === 0 ? 1 : 10);
  let start = 0;
  for (let i = 0; i < level; i++) start += digits[i] * 10 ** (places - i);
  return { start, gap, shown: Math.max(0, level), places };
}

/**
 * The text of a mark on a ruler.
 * @param {{ places: number, shown: number }} ruler
 * @param {number} value scaled by 10^places
 */
export const markText = (ruler, value) =>
  decText(value / 10 ** (ruler.places - ruler.shown), ruler.shown);

/**
 * The eleven marks of a ruler, left to right.
 * @param {string} text
 * @param {number} level
 */
export function marksOf(text, level) {
  const ruler = rulerOf(text, level);
  return Array.from({ length: GAPS + 1 }, (_, i) => markText(ruler, ruler.start + i * ruler.gap));
}

/**
 * Whether the last level asks for the number's own mark rather than a gap.
 * @param {string} text
 * @param {number} level
 */
export const isLast = (text, level) => level === levelsOf(text) - 1;

/**
 * The buttons of a level: the ten gaps (from, to), or on the last level the
 * nine marks inside the ruler.
 * @param {string} text
 * @param {number} level
 * @returns {{ label: string, aria: string, digit: number }[]}
 */
export function choicesOf(text, level) {
  const marks = marksOf(text, level);
  if (isLast(text, level)) {
    return marks.slice(1, GAPS).map((m, i) => ({ label: m, aria: `Vạch ${m}`, digit: i + 1 }));
  }
  return marks.slice(0, GAPS).map((m, i) => ({
    label: `${m} – ${marks[i + 1]}`,
    aria: `Khoảng từ ${m} đến ${marks[i + 1]}`,
    digit: i,
  }));
}

/**
 * What the child is asked on a level.
 * @param {string} text
 * @param {number} level
 */
export function promptOf(text, level) {
  if (level === 0) return `Số ${text} nằm giữa hai số tự nhiên nào? Em chạm vào khoảng đó.`;
  const marks = marksOf(text, level);
  const part = DECIMAL_PLACES[level - 1];
  const zoom = `Thước phóng to đoạn từ ${marks[0]} đến ${marks[GAPS]}, chia thành 10 phần bằng nhau, mỗi phần là 1 ${part} của đoạn trước.`;
  return isLast(text, level)
    ? `${zoom} Em chạm vào vạch ${text}.`
    : `${zoom} Em chạm vào khoảng chứa ${text}.`;
}

/**
 * The name of the digit a level finds.
 * @param {number} level
 */
export const partName = (level) =>
  level === 0 ? 'phần nguyên' : `chữ số hàng ${DECIMAL_PLACES[level - 1]}`;

/**
 * Checks a tap on a level.
 * @param {string} text
 * @param {number} level
 * @param {number} digit the digit of the tapped choice
 * @returns {{ ok: boolean, text: string }}
 */
export function checkTap(text, level, digit) {
  const right = digitsOf(text)[level];
  const marks = marksOf(text, level);
  const last = isLast(text, level);
  if (digit === right) {
    const where = last
      ? `Đây là vạch ${text}.`
      : `${text} nằm giữa ${marks[digit]} và ${marks[digit + 1]}.`;
    const found =
      level === 0
        ? `Phần nguyên của ${text} là ${right}.`
        : `Chữ số hàng ${DECIMAL_PLACES[level - 1]} là ${right}.`;
    return { ok: true, text: `Đúng rồi! ${where} ${found}${last ? ` ${doneText(text)}` : ''}` };
  }
  const picked = last
    ? `Đó là vạch ${marks[digit]}.`
    : `Đó là khoảng từ ${marks[digit]} đến ${marks[digit + 1]}.`;
  const hint =
    level === 0
      ? 'Em nhìn các chữ số đứng trước dấu phẩy.'
      : `Em nhìn chữ số thứ ${level === 1 ? 'nhất' : 'hai'} sau dấu phẩy, đó là ${partName(level)}.`;
  return { ok: false, text: `Chưa đúng. ${picked} ${hint}` };
}

/**
 * The sentence once the number is found: its two parts and its reading.
 * @param {string} text
 */
export function doneText(text) {
  const { whole, frac } = partsOf(text);
  return `${text} có phần nguyên là ${whole}, phần thập phân là ${frac}. Đọc là: ${readDecimal(text)}.`;
}
