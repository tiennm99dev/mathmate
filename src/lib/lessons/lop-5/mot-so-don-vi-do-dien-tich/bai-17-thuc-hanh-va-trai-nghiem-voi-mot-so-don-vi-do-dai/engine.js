/**
 * The estimating challenge of the practical lesson: the child guesses the
 * area of a thing or a place among three estimates, then checks the guess
 * with the measured length and width. The estimate nearest the real area,
 * by how many times it is off, is the good one. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * An estimate: what the button says and its value in the place's unit.
 * @typedef {{ text: string, value: number }} Estimate
 */

/**
 * A thing or place to estimate: its sides in `side` units, its area unit
 * `unit`, three estimates in that unit and a closing remark.
 * @typedef {{
 *   place: string,
 *   length: number,
 *   width: number,
 *   side: string,
 *   unit: string,
 *   estimates: Estimate[],
 *   remark: string,
 * }} Place
 */

/**
 * Three estimates of one unit: (unit, 5, 50, 500).
 * @param {string} unit
 * @param {number[]} values
 * @returns {Estimate[]}
 */
const plain = (unit, ...values) => values.map((v) => ({ text: `${fmt(v)} ${unit}`, value: v }));

/** @type {readonly Place[]} */
export const PLACES = [
  {
    place: 'Mặt bàn học',
    length: 12,
    width: 5,
    side: 'dm',
    unit: 'dm²',
    estimates: plain('dm²', 6, 60, 600),
    remark: 'Mặt bàn học chưa rộng tới 1 m² = 100 dm².',
  },
  {
    place: 'Con tem',
    length: 3,
    width: 2,
    side: 'cm',
    unit: 'cm²',
    estimates: [
      { text: '6 mm²', value: 0.06 },
      { text: '6 cm²', value: 6 },
      { text: '6 dm²', value: 600 },
    ],
    remark: 'Con tem nhỏ, đo bằng xăng-ti-mét vuông.',
  },
  {
    place: 'Quyển sách Toán 5',
    length: 26,
    width: 19,
    side: 'cm',
    unit: 'cm²',
    estimates: plain('cm²', 5, 50, 500),
    remark: 'Bìa sách rộng gần 500 cm², tức là gần 5 dm².',
  },
  {
    place: 'Cánh cửa lớp học',
    length: 2,
    width: 1,
    side: 'm',
    unit: 'm²',
    estimates: plain('m²', 2, 20, 200),
    remark: 'Cánh cửa rộng 2 m², bằng 200 dm².',
  },
  {
    place: 'Nền lớp học',
    length: 8,
    width: 6,
    side: 'm',
    unit: 'm²',
    estimates: plain('m²', 5, 50, 500),
    remark: 'Nền lớp học rộng khoảng 50 m².',
  },
  {
    place: 'Sân trường',
    length: 50,
    width: 40,
    side: 'm',
    unit: 'm²',
    estimates: plain('m²', 200, 2000, 20000),
    remark: 'Sân trường rộng 2 000 m². Phải 5 sân như thế mới được 1 ha.',
  },
  {
    place: 'Sân bóng đá',
    length: 105,
    width: 68,
    side: 'm',
    unit: 'm²',
    estimates: plain('m²', 70, 700, 7000),
    remark: 'Sân bóng đá rộng 7 140 m², chưa tới 1 ha (10 000 m²).',
  },
];

/** The real area of a place, in its unit. @param {Place} p */
export const areaOf = (p) => p.length * p.width;

/**
 * The estimate nearest the real area: the one that is off by the fewest
 * times.
 * @param {Place} p
 */
export function nearest(p) {
  const off = p.estimates.map((e) => Math.abs(Math.log(e.value / areaOf(p))));
  return off.indexOf(Math.min(...off));
}

/**
 * The measuring line: 'Dài 8 m, rộng 6 m. Diện tích: 8 × 6 = 48 (m²).'
 * @param {Place} p
 */
export const measureText = (p) =>
  `Dài ${fmt(p.length)} ${p.side}, rộng ${fmt(p.width)} ${p.side}. Diện tích: ${fmt(p.length)} × ${fmt(p.width)} = ${fmt(areaOf(p))} (${p.unit}).`;

/**
 * The verdict on the chosen estimate.
 * @param {Place} p
 * @param {number} chosen index of the estimate
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function verdict(p, chosen) {
  const best = p.estimates[nearest(p)];
  if (chosen === nearest(p)) {
    return { tone: 'ok', text: `Ước lượng rất sát! ${p.remark}` };
  }
  const real = `${fmt(areaOf(p))} ${p.unit}`;
  const how = best.value === areaOf(p) ? '' : `, gần ${best.text} nhất`;
  return { tone: 'warn', text: `Chưa sát rồi. Diện tích thật là ${real}${how}. ${p.remark}` };
}
