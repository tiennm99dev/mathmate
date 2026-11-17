/**
 * Decimals the grade 5 way, kept exact as digit strings and scaled integers:
 * reading ("hai phẩy bốn mươi bảy"), the places after the comma (phần mười,
 * phần trăm, phần nghìn), comparing two decimals lined up at the comma and
 * rounding to a whole number, tenths or hundredths. Numbers are written with
 * a decimal comma, as the book prints them ('2,47'). Pure and DOM-free.
 */
import { DIGIT_WORDS, SIGN_WORDS, compareSign } from '#lib/core/kid/numbers.js';
import { readWhole } from '#lib/core/kid/whole-numbers.js';
import { DECIMAL_PLACES, decText, partsOf, toScaled, trimZeros } from '#lib/core/kid/decimals.js';

export { DECIMAL_PLACES, decText, partsOf, toScaled, trimZeros };

/**
 * The decimal part read the book's way: each leading zero is "không", the
 * rest is read as a natural number ('05' → "không năm", '47' → "bốn mươi
 * bảy", '001' → "không không một").
 * @param {string} frac
 */
export function readFraction(frac) {
  const lead = /^0*/.exec(frac)?.[0].length ?? 0;
  const zeros = Array.from({ length: lead }, () => DIGIT_WORDS[0]);
  const rest = frac.slice(lead);
  return [...zeros, ...(rest === '' ? [] : [readWhole(Number(rest))])].join(' ');
}

/**
 * How the book reads a decimal: the whole part, "phẩy", then the decimal
 * part: '2,47' is "hai phẩy bốn mươi bảy", '0,05' is "không phẩy không năm".
 * @param {string} text
 */
export function readDecimal(text) {
  const { whole, frac } = partsOf(text);
  const head = readWhole(Number(whole));
  return frac === '' ? head : `${head} phẩy ${readFraction(frac)}`;
}

/**
 * A reading with a capital first letter, to start a sentence.
 * @param {string} text
 */
export function capitalDecimal(text) {
  const words = readDecimal(text);
  return words[0].toUpperCase() + words.slice(1);
}

/**
 * The digit of a decimal in a place after the comma (1 for tenths), 0 when
 * the decimal has no digit there.
 * @param {string} text
 * @param {number} place 1, 2 or 3
 */
export function fracDigit(text, place) {
  return Number(partsOf(text).frac[place - 1] ?? '0');
}

/**
 * Where two decimals first differ when lined up at the comma: 0 for the whole
 * part, 1 for tenths, 2 for hundredths, ...; null when they are equal.
 * @param {string} a
 * @param {string} b
 * @returns {number | null}
 */
export function firstDiffPlace(a, b) {
  const x = partsOf(a);
  const y = partsOf(b);
  if (Number(x.whole) !== Number(y.whole)) return 0;
  const n = Math.max(x.frac.length, y.frac.length);
  for (let i = 1; i <= n; i++) if (fracDigit(a, i) !== fracDigit(b, i)) return i;
  return null;
}

/**
 * The sign between two decimals: '>', '<' or '='.
 * @param {string} a
 * @param {string} b
 */
export function decimalSign(a, b) {
  const place = firstDiffPlace(a, b);
  if (place === null) return compareSign(0, 0);
  if (place === 0) return compareSign(Number(partsOf(a).whole), Number(partsOf(b).whole));
  return compareSign(fracDigit(a, place), fracDigit(b, place));
}

/**
 * Why `a ? b` holds, the book's way: the whole parts first, then the tenths,
 * the hundredths, ... ; zeros at the end change nothing.
 * @param {string} a
 * @param {string} b
 */
export function decimalWhy(a, b) {
  const sign = decimalSign(a, b);
  const result = `Vậy ${a} ${sign} ${b}.`;
  const place = firstDiffPlace(a, b);
  const wa = partsOf(a).whole;
  const wb = partsOf(b).whole;
  if (place === null) {
    return `Hai số có phần nguyên bằng nhau và các chữ số ở phần thập phân như nhau (thêm hay bớt chữ số 0 ở cuối không làm số thay đổi). ${result}`;
  }
  if (place === 0) {
    return `Phần nguyên: ${wa} ${SIGN_WORDS[sign]} ${wb}. ${result}`;
  }
  const same =
    place === 1
      ? 'Phần nguyên bằng nhau.'
      : 'Phần nguyên bằng nhau, các hàng trước đó cũng bằng nhau.';
  const da = fracDigit(a, place);
  const db = fracDigit(b, place);
  return `${same} Hàng ${DECIMAL_PLACES[place - 1]}: ${da} ${SIGN_WORDS[sign]} ${db}. ${result}`;
}

/**
 * The decimals sorted from the smallest, compared exactly.
 * @param {string[]} list
 */
export function ascending(list) {
  return [...list].sort((a, b) => {
    const s = decimalSign(a, b);
    return s === '<' ? -1 : s === '>' ? 1 : 0;
  });
}

/** What rounding to each count of places is called in the book. */
export const ROUND_TARGETS = /** @type {const} */ ([
  'số tự nhiên gần nhất',
  'hàng phần mười',
  'hàng phần trăm',
]);

/**
 * Rounds a decimal to `places` digits after the comma by the book's rule:
 * the next digit decides; below 5 keeps the digit, 5 or more adds 1.
 * Returns the result written with exactly `places` digits after the comma
 * ('3,47' to tenths gives '3,5'; '2,96' to tenths gives '3,0').
 * @param {string} text
 * @param {number} places 0, 1 or 2
 */
export function roundDecimal(text, places) {
  const { scaled, places: have } = toScaled(text);
  if (have <= places) return decText(scaled * 10 ** (places - have), places);
  const factor = 10 ** (have - places);
  const next = Math.floor((scaled % factor) / (factor / 10));
  const kept = Math.floor(scaled / factor) + (next >= 5 ? 1 : 0);
  return decText(kept, places);
}

/**
 * The digit a rounding looks at: the tenths digit when rounding to a whole
 * number, the hundredths digit when rounding to tenths, ...
 * @param {string} text
 * @param {number} places
 */
export const deciderOf = (text, places) => fracDigit(text, places + 1);

/** @param {number} places */
const deciderPlace = (places) => `hàng ${DECIMAL_PLACES[places]}`;

/**
 * Why a decimal rounds the way it does: "Chữ số hàng phần trăm của 3,47 là
 * 7, 7 > 5 nên làm tròn lên. Làm tròn 3,47 đến hàng phần mười được 3,5."
 * @param {string} text
 * @param {number} places
 */
export function roundWhy(text, places) {
  const target = ROUND_TARGETS[places];
  const result = roundDecimal(text, places);
  if (partsOf(text).frac.length <= places) {
    return `${text} không có chữ số nào sau ${places === 0 ? 'phần nguyên' : `hàng ${DECIMAL_PLACES[places - 1]}`}, làm tròn vẫn được ${result}.`;
  }
  const digit = deciderOf(text, places);
  const sign = compareSign(digit, 5);
  const way = digit < 5 ? 'làm tròn xuống' : 'làm tròn lên';
  return `Chữ số ${deciderPlace(places)} của ${text} là ${digit}, ${digit} ${sign} 5 nên ${way}. Làm tròn ${text} đến ${target} được ${result}.`;
}
