/**
 * The table of area units of grade 5: km², hm² (the héc-ta), dam², m², dm²,
 * cm² and mm², biggest first; each unit is 100 times the next one. A measure
 * is held exactly as a whole number times a power of ten, so converting
 * never meets binary noise. Pure and DOM-free.
 */
import { GROUP } from '#lib/core/number-format.js';

/**
 * An area unit: its symbol, its name read aloud and the side of its square.
 * @typedef {{ symbol: string, name: string, side: string }} AreaUnit
 */

/** @type {readonly AreaUnit[]} */
export const AREA_UNITS = [
  { symbol: 'km²', name: 'ki-lô-mét vuông', side: '1 km' },
  { symbol: 'hm²', name: 'héc-tô-mét vuông', side: '1 hm' },
  { symbol: 'dam²', name: 'đề-ca-mét vuông', side: '1 dam' },
  { symbol: 'm²', name: 'mét vuông', side: '1 m' },
  { symbol: 'dm²', name: 'đề-xi-mét vuông', side: '1 dm' },
  { symbol: 'cm²', name: 'xăng-ti-mét vuông', side: '1 cm' },
  { symbol: 'mm²', name: 'mi-li-mét vuông', side: '1 mm' },
];

/** The héc-ta is the héc-tô-mét vuông: 1 ha = 1 hm². */
export const HA = 'ha';

/**
 * The column of a unit in the table; 'ha' is the column of hm².
 * @param {string} symbol
 */
export function unitIndex(symbol) {
  const i = AREA_UNITS.findIndex((u) => u.symbol === (symbol === HA ? 'hm²' : symbol));
  if (i < 0) throw new Error(`unknown area unit ${symbol}`);
  return i;
}

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
 * A measure n (× 10^exp) in unit `from` written in unit `to`: each column to
 * the right multiplies by 100, each column to the left divides by 100.
 * @param {number} n
 * @param {string} from
 * @param {string} to
 * @param {number} [exp] the measure is n × 10^exp of `from`
 */
export function convertText(n, from, to, exp = 0) {
  return shiftText(n, exp + 2 * (unitIndex(to) - unitIndex(from)));
}

/**
 * The steps from one unit to another, one column at a time: each step says
 * the unit it reaches, the value there and whether it multiplied or divided
 * by 100.
 * @param {number} n
 * @param {string} from
 * @param {string} to
 * @returns {{ unit: string, value: string, op: '× 100' | ': 100' }[]}
 */
export function convertSteps(n, from, to) {
  const a = unitIndex(from);
  const b = unitIndex(to);
  const dir = Math.sign(b - a);
  /** @type {{ unit: string, value: string, op: '× 100' | ': 100' }[]} */
  const steps = [];
  for (let i = a + dir; dir !== 0 && i !== b + dir; i += dir) {
    steps.push({
      unit: AREA_UNITS[i].symbol,
      value: shiftText(n, 2 * (i - a)),
      op: dir > 0 ? '× 100' : ': 100',
    });
  }
  return steps;
}
