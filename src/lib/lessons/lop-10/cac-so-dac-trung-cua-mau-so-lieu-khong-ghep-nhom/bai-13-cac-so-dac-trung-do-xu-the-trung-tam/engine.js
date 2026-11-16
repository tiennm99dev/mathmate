/**
 * The dot plot of the centre measures: a sample of whole minutes whose dots
 * are dragged along an axis, and the sentences that compare the mean with
 * the median when one value runs far from the rest.
 */

import { sum } from '#lib/stats-engine/index.js';
import { hasMode, modesText, num, rel, summarize, tex } from '../_shared/sample.js';

/** The axis of the dot plot, in minutes. */
export const LO = 0;
export const HI = 60;
export const MIN_N = 4;
export const MAX_N = 16;

/** Minutes from home to school of eleven pupils. */
export const START = [10, 12, 15, 15, 18, 20, 20, 20, 22, 25, 28];

/**
 * The height of each dot in its stack: the dots of equal value pile up in
 * the order they are listed.
 * @param {readonly number[]} values
 */
export function stackRanks(values) {
  /** @type {Map<number, number>} */
  const seen = new Map();
  return values.map((v) => {
    const r = seen.get(v) ?? 0;
    seen.set(v, r + 1);
    return r;
  });
}

/**
 * A value moved by a drag or a key, kept a whole number on the axis.
 * @param {number} v
 */
export function clampValue(v) {
  return Math.max(LO, Math.min(HI, Math.round(v)));
}

/**
 * The formulas of the centre measures, as TeX lines.
 * @param {readonly number[]} values
 */
export function centreLines(values) {
  const s = summarize(values);
  const total = sum(values);
  const lines = [
    `\\overline{x} = \\dfrac{${tex(total)}}{${s.n}} ${rel(s.mean)} ${tex(s.mean)}`,
    s.n % 2 === 1
      ? `M_e = x_{${(s.n + 1) / 2}} = ${tex(s.median)}`
      : `M_e = \\dfrac{x_{${s.n / 2}} + x_{${s.n / 2 + 1}}}{2} = ${tex(s.median)}`,
    `Q_1 = ${tex(s.q1)},\\quad Q_2 = M_e = ${tex(s.median)},\\quad Q_3 = ${tex(s.q3)}`,
  ];
  return { s, lines };
}

/**
 * What the mode says, as rich text.
 * @param {import('../_shared/sample.js').Summary} s
 */
export function modeText(s) {
  if (!hasMode(s)) return 'Mọi giá trị có tần số như nhau: mẫu này không có mốt.';
  return s.modes.length === 1
    ? `Mốt $M_o = ${tex(s.modes[0])}$ (giá trị xuất hiện nhiều lần nhất).`
    : `Mẫu có ${s.modes.length} mốt: ${modesText(s.modes)} (cùng xuất hiện nhiều lần nhất).`;
}

/**
 * The note under the plot: whether a value far from the others pulls the
 * mean away from the median.
 * @param {import('../_shared/sample.js').Summary} s
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function centreNote(s) {
  const gap = s.mean - s.median;
  const far = s.outliers.length > 0;
  if (far) {
    const side = gap > 0 ? 'lớn' : 'nhỏ';
    return {
      tone: 'warn',
      text: `Có giá trị ${side} hơn hẳn các giá trị khác. Số trung bình $\\overline{x} ${rel(s.mean)} ${tex(s.mean)}$ bị kéo về phía nó, còn trung vị $M_e = ${tex(s.median)}$ hầu như không đổi: lúc này trung vị đại diện cho mẫu tốt hơn.`,
    };
  }
  if (Math.abs(gap) < 1) {
    return {
      tone: 'ok',
      text: `Số trung bình (${num(s.mean)}) và trung vị (${num(s.median)}) gần nhau: số liệu khá cân đối, cả hai đều đại diện tốt cho mẫu.`,
    };
  }
  return {
    tone: 'info',
    text: `Số trung bình (${num(s.mean)}) ${gap > 0 ? 'lớn' : 'nhỏ'} hơn trung vị (${num(s.median)}): số liệu dồn về một phía. Thử kéo một chấm thật xa để xem số nào thay đổi nhiều hơn.`,
  };
}
