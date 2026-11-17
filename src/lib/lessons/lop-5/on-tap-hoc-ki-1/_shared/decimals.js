/**
 * Decimals for the term 1 review of grade 5, the book's way: written with a
 * decimal comma and grouped thousands ('12 345,5'), read with "phẩy", and
 * kept exact as integers scaled by a power of ten wherever digits matter.
 * Pure and DOM-free.
 */
import { DIGIT_WORDS } from '#lib/core/kid/numbers.js';
import { readWhole } from '#lib/core/kid/whole-numbers.js';
import { fmt, formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * A computed value as the book writes it: binary noise rounded away, zeros at
 * the end of the decimal part dropped: 5.36 → '5,36', 12000 → '12 000'.
 * @param {number} value
 */
export const num = (value) => formatNumber(tidy(value, 6), 6);

/**
 * An integer scaled by 10^places written as a decimal, every place kept:
 * (12053, 3) → '12,053', (50, 2) → '0,50', (123450, 1) → '12 345,0'.
 * @param {number} scaled
 * @param {number} places
 */
export function placesText(scaled, places) {
  const digits = String(scaled).padStart(places + 1, '0');
  const whole = fmt(Number(digits.slice(0, digits.length - places)));
  return places === 0 ? whole : `${whole},${digits.slice(-places)}`;
}

/**
 * How the book reads a decimal written with every place kept: the whole
 * part, "phẩy", then the decimal part with each leading zero read "không"
 * on its own: (247, 2) is "hai phẩy bốn mươi bảy", (5, 2) is "không phẩy
 * không năm", (12053, 3) is "mười hai phẩy không năm mươi ba".
 * @param {number} scaled
 * @param {number} places
 */
export function readDecimal(scaled, places) {
  const whole = readWhole(Math.floor(scaled / 10 ** places));
  if (places === 0) return whole;
  const frac = String(scaled % 10 ** places).padStart(places, '0');
  const lead = /^0*/.exec(frac)?.[0].length ?? 0;
  const zeros = Array.from({ length: lead }, () => DIGIT_WORDS[0]);
  const rest = frac.slice(lead);
  return [whole, 'phẩy', ...zeros, ...(rest ? [readWhole(Number(rest))] : [])].join(' ');
}

/**
 * The names of the places after the comma, from the tenths.
 */
export const DECIMAL_PLACES = /** @type {const} */ (['phần mười', 'phần trăm', 'phần nghìn']);

/**
 * Up to four number options in increasing order: the right value and the
 * slips a child makes, then the `near` steps added to it, so a question has
 * four different choices. Only positive values other than the right one are
 * kept, each written the book's way and followed by `unit` when one is given.
 * @param {number} right
 * @param {number[]} slips
 * @param {{ near?: number[], unit?: string }} [options]
 * @returns {{ options: string[], answer: number }}
 */
export function valueOptions(right, slips, { near = [], unit } = {}) {
  const r = tidy(right, 6);
  const seen = new Set([num(r)]);
  /** @type {number[]} */
  const others = [];
  for (const v of [...slips, ...near.map((d) => r + d)].map((x) => tidy(x, 6))) {
    if (v > 0 && !seen.has(num(v)) && others.length < 3) {
      seen.add(num(v));
      others.push(v);
    }
  }
  const values = [r, ...others].sort((x, y) => x - y);
  return {
    options: values.map((v) => (unit ? `${num(v)} ${unit}` : num(v))),
    answer: values.indexOf(r),
  };
}
