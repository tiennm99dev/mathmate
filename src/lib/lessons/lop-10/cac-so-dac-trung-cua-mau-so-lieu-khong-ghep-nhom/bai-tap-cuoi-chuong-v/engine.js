/**
 * Two samples side by side: their characteristic numbers in one table and
 * the sentences that compare their centres and their spreads.
 */

import { num, summarize } from '../_shared/sample.js';

/** @typedef {import('../_shared/sample.js').Summary} Summary */

/**
 * @typedef {{
 *   id: string;
 *   label: string;
 *   title: string;
 *   names: [string, string];
 *   a: number[];
 *   b: number[];
 * }} Pair
 */

/** Pairs of samples to compare. @type {readonly Pair[]} */
export const PAIRS = [
  {
    id: 'diem',
    label: 'Điểm kiểm tra',
    title: 'Điểm kiểm tra Toán của 15 bạn mỗi lớp',
    names: ['10A', '10B'],
    a: [6, 7, 7, 8, 8, 8, 9, 9, 7, 8, 6, 8, 9, 7, 8],
    b: [4, 5, 10, 9, 6, 10, 8, 3, 9, 10, 7, 9, 5, 10, 8],
  },
  {
    id: 'tu-hoc',
    label: 'Giờ tự học',
    title: 'Số giờ tự học mỗi tuần của 9 bạn mỗi lớp',
    names: ['10C', '10D'],
    a: [5, 6, 6, 7, 8, 8, 9, 10, 24],
    b: [4, 7, 7, 8, 8, 9, 9, 10, 11],
  },
];

/** @typedef {{ label: string, tex: string, get: (s: Summary) => number }} Row */

/** The rows of the comparison table. @type {readonly Row[]} */
export const ROWS = [
  { label: 'Số trung bình', tex: '\\overline{x}', get: (s) => s.mean },
  { label: 'Trung vị', tex: 'M_e', get: (s) => s.median },
  { label: 'Tứ phân vị thứ nhất', tex: 'Q_1', get: (s) => s.q1 },
  { label: 'Tứ phân vị thứ ba', tex: 'Q_3', get: (s) => s.q3 },
  { label: 'Khoảng biến thiên', tex: 'R', get: (s) => s.range },
  { label: 'Khoảng tứ phân vị', tex: '\\Delta_Q', get: (s) => s.iqr },
  { label: 'Độ lệch chuẩn', tex: 's', get: (s) => s.sd },
];

/**
 * Sentences that compare two samples: which has the higher centre, which is
 * more even, and what the outliers change.
 * @param {Summary} a @param {Summary} b
 * @param {[string, string]} names
 */
export function compare(a, b, [na, nb]) {
  const lines = [];
  const outliers = a.outliers.length + b.outliers.length > 0;
  const centre = outliers ? 'trung vị' : 'số trung bình';
  const ca = outliers ? a.median : a.mean;
  const cb = outliers ? b.median : b.mean;
  if (Math.abs(ca - cb) < 1e-9) {
    lines.push(`Hai lớp có ${centre} bằng nhau (${num(ca)}): mức trung tâm như nhau.`);
  } else {
    const hi = ca > cb ? na : nb;
    lines.push(
      `Lớp ${hi} có ${centre} cao hơn (${num(Math.max(ca, cb))} so với ${num(Math.min(ca, cb))}).`,
    );
  }

  const spread = outliers ? 'khoảng tứ phân vị' : 'độ lệch chuẩn';
  const sa = outliers ? a.iqr : a.sd;
  const sb = outliers ? b.iqr : b.sd;
  if (Math.abs(sa - sb) < 1e-9) {
    lines.push(`Hai lớp có ${spread} bằng nhau: độ phân tán như nhau.`);
  } else {
    const even = sa < sb ? na : nb;
    lines.push(
      `Lớp ${even} có ${spread} nhỏ hơn (${num(Math.min(sa, sb))} so với ${num(Math.max(sa, sb))}), nên số liệu của lớp ${even} đồng đều hơn.`,
    );
  }

  for (const [name, s] of /** @type {const} */ ([
    [na, a],
    [nb, b],
  ])) {
    if (s.outliers.length > 0) {
      const list = [...new Set(s.outliers)].map((v) => num(v)).join(', ');
      lines.push(
        `Lớp ${name} có giá trị bất thường ${list}: nó làm số trung bình, khoảng biến thiên và độ lệch chuẩn của lớp này lớn lên, nên ở đây ta so sánh bằng trung vị và khoảng tứ phân vị.`,
      );
    }
  }
  return lines;
}

/**
 * Both summaries and the comparison.
 * @param {readonly number[]} a @param {readonly number[]} b @param {[string, string]} names
 */
export function comparePair(a, b, names) {
  const sa = summarize(a);
  const sb = summarize(b);
  return { a: sa, b: sb, lines: compare(sa, sb, names) };
}
