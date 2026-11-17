/**
 * What the spread widget shows for a grouped sample: the range R across the
 * whole table, the two quartiles found by interpolation with the share of
 * their groups that lies below them, the band of the middle half between
 * them, the formulas with their numbers, and how the two measures react when
 * one far-off value joins the sample.
 */

import { formatNumber, numTex } from '#lib/core/number-format.js';
import {
  approxText,
  cumulative,
  eqTex,
  groupTex,
  groupedIqr,
  groupedRange,
  makeGroups,
  quartileTex,
  sampleSize,
} from '../_shared/grouped.js';

/** @typedef {import('../_shared/grouped.js').Group} Group */

/**
 * @typedef {object} Preset
 * @property {string} id
 * @property {string} label short name on the switch
 * @property {string} title
 * @property {string} unit
 * @property {number} start
 * @property {number} width
 * @property {number[]} counts
 */

/** @type {Preset[]} */
export const PRESETS = [
  {
    id: 'di-hoc',
    label: 'Thời gian đến trường',
    title: 'Thời gian đi từ nhà đến trường (phút) của 40 học sinh',
    unit: 'phút',
    start: 0,
    width: 5,
    counts: [6, 14, 10, 7, 3],
  },
  {
    id: 'chieu-cao',
    label: 'Chiều cao',
    title: 'Chiều cao (cm) của 40 học sinh lớp 12',
    unit: 'cm',
    start: 150,
    width: 5,
    counts: [3, 7, 12, 10, 5, 3],
  },
];

/** Empty groups and then one value appended far to the right. */
export const OUTLIER_TAIL = [0, 0, 1];

/**
 * The groups of a preset with the learner's counts, and the far value when
 * `outlier` is on.
 * @param {Preset} preset
 * @param {readonly number[]} counts
 * @param {boolean} outlier
 * @returns {Group[]}
 */
export function groupsOf(preset, counts, outlier) {
  return makeGroups(preset.start, preset.width, outlier ? [...counts, ...OUTLIER_TAIL] : counts);
}

/**
 * @typedef {object} View
 * @property {boolean} empty
 * @property {number[]} highlight groups holding Q1 and Q3
 * @property {Array<{ index: number, fraction: number }>} shades
 * @property {Array<{ x: number, label: string, color: string }>} markers
 * @property {{ from: number, to: number, label: string, color: string } | null} band
 * @property {{ from: number, to: number, label: string } | null} span
 * @property {string[]} tex
 * @property {string} note rich text
 * @property {number} range
 * @property {number} iqr
 */

const Q_COLOR = '#7c3aed';

/**
 * @param {readonly Group[]} groups
 * @returns {View}
 */
export function spreadView(groups) {
  const n = sampleSize(groups);
  if (n === 0) {
    return {
      empty: true,
      highlight: [],
      shades: [],
      markers: [],
      band: null,
      span: null,
      tex: [],
      note: 'Mẫu chưa có số liệu nào: hãy tăng tần số của ít nhất một nhóm.',
      range: 0,
      iqr: 0,
    };
  }
  const r = groupedRange(groups);
  const { q1, q3, value } = groupedIqr(groups);
  const cum = cumulative(groups);
  /** @param {import('../_shared/grouped.js').Quantile} q */
  const shade = (q) => ({ index: q.index, fraction: (q.target - q.before) / q.count });
  return {
    empty: false,
    highlight: [...new Set([q1.index, q3.index])],
    shades: [shade(q1), shade(q3)],
    markers: [
      { x: q1.value, label: `Q₁ ${approxText(q1.value)}`, color: Q_COLOR },
      { x: q3.value, label: `Q₃ ${approxText(q3.value)}`, color: Q_COLOR },
    ],
    band: { from: q1.value, to: q3.value, label: `ΔQ ${approxText(value)}`, color: Q_COLOR },
    span: { from: r.lo, to: r.hi, label: `R = ${formatNumber(r.value)}` },
    tex: [
      `R = ${numTex(r.hi)} - ${numTex(r.lo)} = ${numTex(r.value)}`,
      quartileTex(q1, 1),
      quartileTex(q3, 3),
      `\\Delta_Q = Q_3 - Q_1 ${eqTex(value)}`,
    ],
    note: `Cỡ mẫu $n = ${n}$, nên $\\dfrac{n}{4} = ${numTex(q1.target)}$ và $\\dfrac{3n}{4} = ${numTex(q3.target)}$. Nhóm chứa $Q_1$ là $${groupTex(groups[q1.index])}$ (tần số tích luỹ đạt $${cum[q1.index]}$), nhóm chứa $Q_3$ là $${groupTex(groups[q3.index])}$ (tần số tích luỹ đạt $${cum[q3.index]}$). Dải tím từ $Q_1$ đến $Q_3$ chứa khoảng $50\\%$ số liệu ở giữa mẫu; mũi tên trên cùng là khoảng biến thiên, từ đầu mút trái của nhóm đầu đến đầu mút phải của nhóm cuối.`,
    range: r.value,
    iqr: value,
  };
}

/**
 * The sentence comparing the two measures before and after the far value
 * joins the sample.
 * @param {View} before
 * @param {View} after
 * @param {string} unit
 */
export function outlierNote(before, after, unit) {
  if (before.empty || after.empty) return '';
  const r = `$R$ tăng từ $${numTex(before.range)}$ lên $${numTex(after.range)}$ ${unit}`;
  const dq =
    approxText(before.iqr) === approxText(after.iqr)
      ? `$\\Delta_Q$ giữ nguyên $${eqTex(before.iqr).replace(/^= /, '')}$`
      : `$\\Delta_Q$ chỉ đổi từ khoảng $${numTex(Math.round(before.iqr * 100) / 100)}$ thành khoảng $${numTex(Math.round(after.iqr * 100) / 100)}$`;
  return `Chỉ thêm một giá trị rất lớn: ${r}, còn ${dq}. Khoảng biến thiên phụ thuộc vào hai đầu của mẫu nên rất nhạy với giá trị bất thường; khoảng tứ phân vị chỉ dùng $50\\%$ số liệu ở giữa nên ít bị ảnh hưởng.`;
}
