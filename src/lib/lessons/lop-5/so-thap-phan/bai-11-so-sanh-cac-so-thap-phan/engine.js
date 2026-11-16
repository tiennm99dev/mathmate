/**
 * Two decimals lined up at the comma in a table of places. Zeros added at
 * the end of the shorter decimal part are shown faded: they change nothing.
 * The child taps the first column, from the left, where the two numbers
 * differ, then picks the sign. Pure and DOM-free.
 */
import { SIGN_WORDS } from '#lib/core/kid/numbers.js';
import {
  DECIMAL_PLACES,
  decimalSign,
  decimalWhy,
  firstDiffPlace,
  partsOf,
} from '../_shared/decimals.js';

/** Pairs to compare, as the book writes them. */
export const PAIRS = /** @type {const} */ ([
  ['8,7', '8,65'],
  ['2001,2', '1999,7'],
  ['78,469', '78,5'],
  ['0,5', '0,50'],
  ['630,72', '630,70'],
  ['5,07', '5,7'],
  ['12,304', '12,31'],
  ['9,8', '9,80'],
  ['0,7', '0,65'],
]);

/**
 * One column of the table: the whole part (place 0) or a place after the
 * comma, with the digit of each number and whether it is an added zero.
 * @typedef {{ place: number, title: string, top: string, bottom: string, topAdded: boolean, bottomAdded: boolean }} Column
 */

/**
 * The columns of two decimals lined up at the comma.
 * @param {string} a
 * @param {string} b
 * @returns {Column[]}
 */
export function columnsOf(a, b) {
  const x = partsOf(a);
  const y = partsOf(b);
  const n = Math.max(x.frac.length, y.frac.length);
  /** @type {Column[]} */
  const cols = [
    {
      place: 0,
      title: 'Phần nguyên',
      top: x.whole,
      bottom: y.whole,
      topAdded: false,
      bottomAdded: false,
    },
  ];
  for (let i = 1; i <= n; i++) {
    cols.push({
      place: i,
      title: `P${DECIMAL_PLACES[i - 1].slice(1)}`,
      top: x.frac[i - 1] ?? '0',
      bottom: y.frac[i - 1] ?? '0',
      topAdded: i > x.frac.length,
      bottomAdded: i > y.frac.length,
    });
  }
  return cols;
}

/** @param {number} place */
const placeName = (place) => (place === 0 ? 'phần nguyên' : `hàng ${DECIMAL_PLACES[place - 1]}`);

/**
 * Checks the column the child says the numbers first differ in; null means
 * "they differ nowhere".
 * @param {string} a
 * @param {string} b
 * @param {number | null} place
 * @returns {{ ok: boolean, text: string }}
 */
export function checkColumn(a, b, place) {
  const right = firstDiffPlace(a, b);
  if (place === right) {
    if (right === null) {
      return {
        ok: true,
        text: 'Đúng rồi! Hai số giống nhau ở mọi hàng, kể cả chữ số 0 thêm vào. Em chọn dấu.',
      };
    }
    const col = columnsOf(a, b)[right];
    return {
      ok: true,
      text: `Đúng rồi! Hai số khác nhau đầu tiên ở ${placeName(right)}: ${col.top} và ${col.bottom}. Em chọn dấu.`,
    };
  }
  if (right === null) {
    return {
      ok: false,
      text: `Ở ${placeName(/** @type {number} */ (place))} hai số như nhau. Em xem lại từng hàng.`,
    };
  }
  if (place === null || place > right) {
    return {
      ok: false,
      text: 'Chưa đúng. Em so sánh từ trái sang phải: phần nguyên trước, rồi hàng phần mười, hàng phần trăm, ...',
    };
  }
  return { ok: false, text: `Ở ${placeName(place)} hai số như nhau. Em nhìn sang hàng bên phải.` };
}

/**
 * Checks the sign the child picked.
 * @param {string} a
 * @param {string} b
 * @param {import('#lib/core/kid/numbers.js').Sign} sign
 * @returns {{ ok: boolean, text: string }}
 */
export function checkSign(a, b, sign) {
  const right = decimalSign(a, b);
  if (sign === right) return { ok: true, text: `Đúng rồi! ${decimalWhy(a, b)}` };
  return {
    ok: false,
    text: `Chưa đúng: ${a} không ${SIGN_WORDS[sign]} ${b}. Em so sánh hai chữ số ở cột đã tô.`,
  };
}
