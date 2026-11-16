/**
 * The area units of grade 5, biggest first: km², ha, m², dm², cm² and mm².
 * 1 km² = 100 ha and 1 ha = 10 000 m²; from m² down, each unit is 100 times
 * the next one. A measure is held exactly as a whole number times a power of
 * ten, so converting never meets binary noise. Pure and DOM-free.
 */
import { GROUP } from '#lib/core/number-format.js';

/**
 * An area unit: its symbol, its name read aloud and its size in m² as a
 * power of ten (km² is 10^6 m², mm² is 10^-6 m²).
 * @typedef {{ symbol: string, name: string, exp: number }} AreaUnit
 */

/** @type {readonly AreaUnit[]} */
export const AREA_UNITS = [
  { symbol: 'km²', name: 'ki-lô-mét vuông', exp: 6 },
  { symbol: 'ha', name: 'héc-ta', exp: 4 },
  { symbol: 'm²', name: 'mét vuông', exp: 0 },
  { symbol: 'dm²', name: 'đề-xi-mét vuông', exp: -2 },
  { symbol: 'cm²', name: 'xăng-ti-mét vuông', exp: -4 },
  { symbol: 'mm²', name: 'mi-li-mét vuông', exp: -6 },
];

/**
 * The column of a unit in the table.
 * @param {string} symbol
 */
export function unitIndex(symbol) {
  const i = AREA_UNITS.findIndex((u) => u.symbol === symbol);
  if (i < 0) throw new Error(`unknown area unit ${symbol}`);
  return i;
}

/** The power of ten in m² of a unit. @param {string} symbol */
const expOf = (symbol) => AREA_UNITS[unitIndex(symbol)].exp;

/**
 * Digits grouped by threes with the book's narrow space: '1234567' →
 * '1 234 567'.
 * @param {string} digits
 */
const group = (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);

/**
 * The number n × 10^exp written the book's way, exactly: (54, -4) →
 * '0,0054', (6, 6) → '6 000 000', (2500, -2) → '25'. Zeros at the end of
 * the decimal part are dropped.
 * @param {number} n a whole number, 0 or more
 * @param {number} exp
 */
export function shiftText(n, exp) {
  const s = String(n);
  if (exp >= 0) return group(n === 0 ? '0' : s + '0'.repeat(exp));
  const padded = s.padStart(-exp + 1, '0');
  const whole = padded.slice(0, exp).replace(/^0+(?=\d)/, '');
  const frac = padded.slice(exp).replace(/0+$/, '');
  return frac ? `${group(whole)},${frac}` : group(whole);
}

/**
 * A measure n (× 10^exp) in unit `from` written in unit `to`.
 * @param {number} n
 * @param {string} from
 * @param {string} to
 * @param {number} [exp] the measure is n × 10^exp of `from`
 */
export function convertText(n, from, to, exp = 0) {
  return shiftText(n, exp + expOf(from) - expOf(to));
}

/**
 * The steps from one unit to another, one column at a time: each step says
 * the unit it reaches, the value there and the multiplication or division
 * that got there (× 100 for most columns, × 10 000 between ha and m²).
 * @param {number} n
 * @param {string} from
 * @param {string} to
 * @returns {{ unit: string, value: string, op: string }[]}
 */
export function convertSteps(n, from, to) {
  const a = unitIndex(from);
  const b = unitIndex(to);
  const dir = Math.sign(b - a);
  /** @type {{ unit: string, value: string, op: string }[]} */
  const steps = [];
  for (let i = a + dir; dir !== 0 && i !== b + dir; i += dir) {
    const factor = shiftText(1, Math.abs(AREA_UNITS[i - dir].exp - AREA_UNITS[i].exp));
    steps.push({
      unit: AREA_UNITS[i].symbol,
      value: shiftText(n, expOf(from) - AREA_UNITS[i].exp),
      op: `${dir > 0 ? '×' : ':'} ${factor}`,
    });
  }
  return steps;
}
