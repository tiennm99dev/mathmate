/**
 * Numbers for the year-end review of grade 5, written the book's way: a
 * decimal comma, thousands grouped by a narrow space ('12 345,5'), and the
 * options of a tap-the-answer question built from the right value and the
 * slips a child makes. Pure and DOM-free.
 */
import { DIGIT_WORDS } from '#lib/core/kid/numbers.js';
import { readWhole } from '#lib/core/kid/whole-numbers.js';
import { lowestTerms } from '#lib/core/fractions.js';
import { formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * A computed value as the book writes it: binary noise rounded away, zeros at
 * the end of the decimal part dropped: 5.36 → '5,36', 12000 → '12 000'.
 * @param {number} value
 */
export const num = (value) => formatNumber(tidy(value, 6), 6);

/**
 * How the book reads a decimal given as an integer scaled by 10^places: the
 * whole part, "phẩy", then the decimal part, each leading zero read "không":
 * (247, 2) is "hai phẩy bốn mươi bảy", (5, 2) is "không phẩy không năm".
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
 * Up to four number options in increasing order: the right value, then the
 * slips a child makes, then the `near` steps added to it. Only positive values
 * other than the right one are kept, each written the book's way and followed
 * by `unit` when one is given ('%' with no space before it, as the book
 * writes it).
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
    options: values.map((v) => (unit ? `${num(v)}${unit === '%' ? '' : ' '}${unit}` : num(v))),
    answer: values.indexOf(r),
  };
}

/**
 * A fraction in lowest terms as the book writes it: (6, 8) → '3/4', (8, 4)
 * → '2'.
 * @param {number} p
 * @param {number} q
 */
export function simplest(p, q) {
  const [a, b] = lowestTerms(p, q);
  return b === 1 ? String(a) : `${a}/${b}`;
}
