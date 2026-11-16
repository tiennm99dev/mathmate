/**
 * The spread of a typed sample: range, interquartile range, variance and
 * standard deviation written step by step, the outlier fences, and the
 * table of squared deviations behind the variance.
 */

import { rel, summarize, tex } from '../_shared/sample.js';

/** @typedef {import('../_shared/sample.js').Summary} Summary */

/** @typedef {{ id: string, label: string, title: string, unit: string, values: number[] }} Preset */

/** Samples to start from. @type {readonly Preset[]} */
export const PRESETS = [
  {
    id: 'can-nang',
    label: 'Cân nặng trẻ sơ sinh',
    title: 'Cân nặng (kg) của 10 trẻ sơ sinh',
    unit: 'kg',
    values: [2.8, 2.5, 3.1, 3.3, 2.9, 3.5, 4.1, 2.8, 3.0, 3.3],
  },
  {
    id: 'canxi',
    label: 'Hàm lượng canxi',
    title: 'Hàm lượng canxi (mg) trong 20 mẫu thực phẩm',
    unit: 'mg',
    values: [0, 4, 8, 10, 13, 14, 15, 16, 16, 18, 18, 18, 19, 20, 20, 20, 21, 22, 29, 34],
  },
  {
    id: 'ghe',
    label: 'Ghế trống',
    title: 'Số ghế trống của một rạp phim trong 9 ngày',
    unit: 'ghế',
    values: [7, 9, 16, 0, 11, 19, 3, 20, 5],
  },
];

const P = 4;

/**
 * The spread measures as TeX lines.
 * @param {Summary} s
 */
export function spreadLines(s) {
  const ss = s.variance * s.n;
  return [
    `R = ${tex(s.max, P)} - ${tex(s.min, P)} = ${tex(s.range, P)}`,
    `\\Delta_Q = Q_3 - Q_1 = ${tex(s.q3, P)} - ${tex(s.q1, P)} = ${tex(s.iqr, P)}`,
    `\\overline{x} ${rel(s.mean, P)} ${tex(s.mean, P)}`,
    `s^2 = \\dfrac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n} ${rel(ss, P)} \\dfrac{${tex(ss, P)}}{${s.n}} ${rel(s.variance, P)} ${tex(s.variance, P)}`,
    `s = \\sqrt{s^2} ${rel(s.sd, P)} ${tex(s.sd, P)}`,
  ];
}

/**
 * The fences and what lies outside them, as TeX and a rich-text sentence.
 * @param {Summary} s
 * @returns {{ lines: string[], tone: 'ok' | 'warn', text: string }}
 */
export function fenceReport(s) {
  const lines = [
    `Q_1 - 1{,}5\\Delta_Q = ${tex(s.q1, P)} - 1{,}5 \\cdot ${tex(s.iqr, P)} = ${tex(s.low, P)}`,
    `Q_3 + 1{,}5\\Delta_Q = ${tex(s.q3, P)} + 1{,}5 \\cdot ${tex(s.iqr, P)} = ${tex(s.high, P)}`,
  ];
  if (s.outliers.length === 0) {
    return {
      lines,
      tone: 'ok',
      text: `Mọi giá trị đều nằm trong đoạn $[${tex(s.low, P)}; ${tex(s.high, P)}]$: mẫu không có giá trị bất thường.`,
    };
  }
  const list = [...new Set(s.outliers)].map((v) => `$${tex(v, P)}$`).join(', ');
  return {
    lines,
    tone: 'warn',
    text: `Giá trị bất thường: ${list} (nằm ngoài đoạn $[${tex(s.low, P)}; ${tex(s.high, P)}]$). Hãy kiểm tra lại xem có nhầm lẫn khi đo hay ghi chép không; khi đó nên dùng $\\Delta_Q$ thay cho $R$ để đo độ phân tán.`,
  };
}

/**
 * The rows of the squared-deviation table: value, deviation from the mean,
 * squared deviation, as TeX.
 * @param {Summary} s
 */
export function deviationRows(s) {
  return s.sorted.map((x) => {
    const dev = x - s.mean;
    return [tex(x, P), tex(dev, P), tex(dev * dev, P)];
  });
}

/**
 * Everything the widget shows for a sample.
 * @param {readonly number[]} values
 */
export function spreadOf(values) {
  const s = summarize(values);
  return { s, lines: spreadLines(s), fences: fenceReport(s) };
}
