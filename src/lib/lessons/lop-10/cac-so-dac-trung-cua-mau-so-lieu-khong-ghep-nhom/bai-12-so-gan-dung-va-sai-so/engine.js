/**
 * Measuring with a ruler and rounding an approximate number, the way the
 * KNTT grade 10 book sets them out: a reading `a` of a true length `ā`
 * taken at the nearest division `h` has accuracy `d = h / 2`; the absolute
 * error is `|ā − a|`, the relative error `|ā − a| / |a|`; and a number given
 * with accuracy `d` is rounded to the lowest place whose unit is larger
 * than `d`.
 */

import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/** @typedef {{ id: string, h: number, label: string }} Ruler */

/** @type {readonly Ruler[]} */
export const RULERS = [
  { id: 'cm', h: 1, label: 'Chia 1 cm' },
  { id: 'nua', h: 0.5, label: 'Chia 0,5 cm' },
  { id: 'mm', h: 0.1, label: 'Chia 1 mm' },
];

/** @typedef {{ id: string, name: string, length: number, color: string }} Thing */

/** Things to measure, with their true lengths in cm. @type {readonly Thing[]} */
export const THINGS = [
  { id: 'but', name: 'bút chì', length: 13.72, color: '#f59e0b' },
  { id: 'tay', name: 'cục tẩy', length: 4.36, color: '#ec4899' },
  { id: 'la', name: 'chiếc lá', length: 9.18, color: '#16a34a' },
];

/**
 * A position snapped to the ruler's divisions.
 * @param {number} v in cm @param {number} h division in cm
 */
export function snapReading(v, h) {
  return tidy(Math.round(tidy(v / h, 6)) * h, 6);
}

/**
 * What a reading `a` of the true length `L` on a ruler of division `h` says.
 * @param {number} L true length @param {number} a reading @param {number} h
 */
export function measureReport(L, a, h) {
  const d = tidy(h / 2, 6);
  const best = snapReading(L, h);
  const abs = tidy(Math.abs(L - a), 6);
  const relative = a === 0 ? Infinity : abs / Math.abs(a);
  return { d, best, nearest: a === best, abs, relative, within: abs <= d + 1e-9 };
}

/** A length in cm for text: 13.7 → '13,7'. @param {number} v */
export const cm = (v) => formatNumber(tidy(v, 6), 3);

/**
 * A ratio as a percentage for text, two decimals at most: 0.00365 → '0,37%'.
 * @param {number} r
 */
export function percent(r) {
  return `${formatNumber(tidy(r * 100, 6), 2)}%`;
}

const PLACES = new Map([
  [3, 'hàng nghìn'],
  [2, 'hàng trăm'],
  [1, 'hàng chục'],
  [0, 'hàng đơn vị'],
  [-1, 'hàng phần mười'],
  [-2, 'hàng phần trăm'],
  [-3, 'hàng phần nghìn'],
  [-4, 'hàng phần chục nghìn'],
]);

/**
 * The name of the place 10^k: 2 → 'hàng trăm', −1 → 'hàng phần mười'.
 * @param {number} k from −4 to 3
 */
export function placeName(k) {
  const name = PLACES.get(k);
  if (!name) throw new Error(`no place name for 10^${k}`);
  return name;
}

/**
 * The exponent k of the place a number with accuracy `d` is rounded to: the
 * lowest place whose unit 10^k is larger than d. 300 → 3, 0.001 → −2,
 * 0.2 → 0.
 * @param {number} d positive
 */
export function placeFor(d) {
  let k = -6;
  while (10 ** k <= d * (1 + 1e-12)) k++;
  return k;
}

/**
 * The exponent of the highest place of `d`: its first non-zero digit.
 * 300 → 2, 0.001 → −3, 0.25 → −1.
 * @param {number} d positive
 */
export function leadingPlace(d) {
  return placeFor(d) - 1;
}

/**
 * `a` rounded to the place 10^k, half up: a digit 5 or more after that place
 * adds 1 to it.
 * @param {number} a @param {number} k
 */
export function roundAt(a, k) {
  const scaled = tidy(Math.abs(a) / 10 ** k, 6);
  const r = Math.floor(scaled + 0.5) * 10 ** k;
  return tidy(a < 0 ? -r : r, Math.max(0, -k));
}

/**
 * The digit of `a` at the place 10^k.
 * @param {number} a @param {number} k
 */
export function digitAt(a, k) {
  return Math.floor(tidy(Math.abs(a) / 10 ** k, 6)) % 10;
}

/**
 * The rounding of `a` with accuracy `d`, step by step, as rich text lines.
 * @param {number} a @param {number} d
 */
export function roundingSteps(a, d) {
  const k = placeFor(d);
  const lead = leadingPlace(d);
  const r = roundAt(a, k);
  const next = digitAt(a, k - 1);
  const half = tidy(10 ** k / 2, 6);
  return {
    k,
    rounded: r,
    next,
    lines: [
      `Độ chính xác $d = ${numTex(d)}$ có chữ số khác $0$ đầu tiên ở ${placeName(lead)}.`,
      `Ta quy tròn $a$ đến hàng ngay trên nó, ${placeName(k)} (đơn vị $${numTex(10 ** k)}$ lớn hơn $d$).`,
      `Chữ số ngay sau ${placeName(k)} là $${next}$ ${next >= 5 ? '$\\ge 5$: cộng thêm $1$ vào chữ số hàng quy tròn' : '$< 5$: giữ nguyên chữ số hàng quy tròn'}, bỏ các chữ số phía sau.`,
      `Số quy tròn là $${numTex(r)}$; nó lệch khỏi $a$ không quá $${numTex(half)}$, nửa đơn vị của ${placeName(k)}.`,
    ],
  };
}

/**
 * The characters of a written number, each digit marked by its role when
 * rounding to the place 10^k: 'place' for the digit kept and maybe raised,
 * 'next' for the digit right after it that decides, 'drop' for the digits
 * after that, '' for the rest and for separators.
 * @param {string} text a number written by `formatNumber`
 * @param {number} k
 * @returns {{ ch: string, role: '' | 'place' | 'next' | 'drop' }[]}
 */
export function digitCells(text, k) {
  const [whole, frac = ''] = text.split(',');
  const intDigits = whole.replace(/\D/g, '').length;
  let exp = intDigits - 1;
  /** @type {{ ch: string, role: '' | 'place' | 'next' | 'drop' }[]} */
  const out = [];
  for (const ch of frac ? `${whole},${frac}` : whole) {
    if (!/\d/.test(ch)) {
      out.push({ ch, role: '' });
      continue;
    }
    out.push({
      ch,
      role: exp === k ? 'place' : exp === k - 1 ? 'next' : exp < k - 1 ? 'drop' : '',
    });
    exp--;
  }
  return out;
}
