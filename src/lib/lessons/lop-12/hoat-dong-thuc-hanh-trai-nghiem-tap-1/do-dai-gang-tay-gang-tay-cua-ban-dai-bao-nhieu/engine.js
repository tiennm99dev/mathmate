/**
 * Hand spans (độ dài gang tay) of a class: read the measured lengths as
 * typed, group them into half-open groups [a; a + h) of equal length shared
 * by the boys' and the girls' samples, and compute the measures of the KNTT
 * grade 11 and 12 books for grouped samples: the mean from the group
 * midpoints, the range from the first to the last non-empty group, the
 * quartiles by interpolation inside their group, the interquartile range,
 * the variance s² = (1/n)·Σ m_i (x_i − x̄)², the standard deviation s and
 * the coefficient of variation CV = s / x̄ that the activity asks for to
 * compare the spread of two samples with different means.
 */

import { readNumber } from '#lib/core/decimal.js';
import { formatFixed, formatNumber, tidy } from '#lib/core/number-format.js';

/** @typedef {{ lo: number, hi: number, count: number }} Group */

/** Hand spans outside this range (cm) are taken as typing mistakes. */
export const SPAN_MIN = 10;
export const SPAN_MAX = 30;

/** Group lengths the learner may pick, in cm. */
export const WIDTHS = [0.5, 1, 2];

/**
 * A sample class: the hand spans (cm) of 25 boys and 20 girls, measured to
 * the millimetre.
 */
export const BOYS_SAMPLE =
  '18,6 19,2 19,5 19,8 19,0 19,6 19,9 20,0 20,3 20,5 20,8 20,2 20,6 20,9 20,4 21,0 21,3 21,5 21,8 21,2 21,6 21,4 22,1 22,7 23,2';
export const GIRLS_SAMPLE =
  '16,2 16,8 16,5 17,3 17,9 18,0 18,2 18,4 18,5 18,6 18,7 18,9 18,3 19,1 19,4 19,6 19,8 20,2 20,7 21,1';

/**
 * The lengths in a typed list: numbers separated by spaces, line breaks or
 * semicolons, with a decimal comma or point. Words that are not a number,
 * or a length outside [SPAN_MIN; SPAN_MAX], go to `bad`.
 * @param {string} text
 * @returns {{ values: number[], bad: string[] }}
 */
export function parseSpans(text) {
  /** @type {number[]} */
  const values = [];
  /** @type {string[]} */
  const bad = [];
  for (const token of text.split(/[\s;]+/).filter(Boolean)) {
    const v = readNumber(token);
    if (v === null || v < SPAN_MIN || v > SPAN_MAX) bad.push(token);
    else values.push(v);
  }
  return { values, bad };
}

/**
 * Groups several samples into the same groups [a; a + h): a is the largest
 * multiple of h not above the smallest value of all samples, and the last
 * group holds the largest value. Returns one list of groups per sample.
 * @param {number[][]} samples at least one value in all
 * @param {number} width h
 * @returns {Group[][]}
 */
export function groupSamples(samples, width) {
  const all = samples.flat();
  if (!all.length) return samples.map(() => []);
  const start = tidy(Math.floor(tidy(Math.min(...all) / width)) * width);
  const k = Math.floor(tidy((Math.max(...all) - start) / width)) + 1;
  return samples.map((values) => {
    const groups = Array.from({ length: k }, (_, i) => ({
      lo: tidy(start + i * width),
      hi: tidy(start + (i + 1) * width),
      count: 0,
    }));
    for (const v of values) groups[Math.floor(tidy((v - start) / width))].count++;
    return groups;
  });
}

/** The midpoint (a_i + a_{i+1})/2. @param {Group} g */
export const midpoint = (g) => tidy((g.lo + g.hi) / 2);

/**
 * The quartile Q_k (k = 1, 2, 3): the first group whose cumulative frequency
 * reaches k·n/4 holds it, and Q_k = a_p + (k·n/4 − C)/m_p · h.
 * @param {Group[]} groups @param {1 | 2 | 3} k
 */
export function quartile(groups, k) {
  const n = groups.reduce((s, g) => s + g.count, 0);
  const target = (k * n) / 4;
  let before = 0;
  for (const g of groups) {
    if (before + g.count >= target && g.count > 0) {
      return tidy(g.lo + ((target - before) / g.count) * (g.hi - g.lo));
    }
    before += g.count;
  }
  return NaN;
}

/**
 * @typedef {object} Measures
 * @property {number} n
 * @property {number} mean x̄
 * @property {number} range R = a_{k+1} − a_1 over the non-empty groups
 * @property {number} q1
 * @property {number} q2 the median
 * @property {number} q3
 * @property {number} iqr ΔQ = Q_3 − Q_1
 * @property {number} variance s²
 * @property {number} std s
 * @property {number} cv the coefficient of variation s / x̄
 */

/**
 * The measures of a grouped sample, or null when it is empty.
 * @param {Group[]} groups
 * @returns {Measures | null}
 */
export function measures(groups) {
  const n = groups.reduce((s, g) => s + g.count, 0);
  if (n === 0) return null;
  const mean = tidy(groups.reduce((s, g) => s + g.count * midpoint(g), 0) / n);
  const variance = tidy(groups.reduce((s, g) => s + g.count * (midpoint(g) - mean) ** 2, 0) / n);
  const full = groups.filter((g) => g.count > 0);
  const q1 = quartile(groups, 1);
  const q3 = quartile(groups, 3);
  const std = Math.sqrt(variance);
  return {
    n,
    mean,
    range: tidy(full[full.length - 1].hi - full[0].lo),
    q1,
    q2: quartile(groups, 2),
    q3,
    iqr: tidy(q3 - q1),
    variance,
    std,
    cv: std / mean,
  };
}

/** A group as text: [18; 19). @param {Group} g */
export const groupText = (g) => `[${formatNumber(g.lo)}; ${formatNumber(g.hi)})`;

/**
 * A measure written to two decimals with ≈ when rounded: '20,74', '≈ 1,14'.
 * @param {number} v
 */
export function valueText(v) {
  const r = tidy(v, 2);
  return `${tidy(v) === r ? '' : '≈ '}${formatNumber(r, 2)}`;
}

/** A coefficient of variation as a percentage: 0.05503 → '≈ 5,5%'. @param {number} cv */
export function percentText(cv) {
  const p = tidy(cv * 100, 9);
  const r = tidy(p, 1);
  return `${p === r ? '' : '≈ '}${formatFixed(r, 1)}%`;
}

/**
 * The comparison of the two samples, the way the activity asks: who has the
 * longer hand span on average, and which sample is more spread out by the
 * coefficient of variation, noting when the standard deviation or the
 * interquartile range says otherwise.
 * @param {Measures} boys @param {Measures} girls
 */
export function compareText(boys, girls) {
  const longer =
    boys.mean === girls.mean
      ? 'Gang tay trung bình của nam và nữ bằng nhau'
      : `Gang tay trung bình của ${boys.mean > girls.mean ? 'nam' : 'nữ'} dài hơn ${valueText(Math.abs(boys.mean - girls.mean))} cm`;
  const cvBoys = tidy(boys.cv, 6);
  const cvGirls = tidy(girls.cv, 6);
  if (cvBoys === cvGirls) {
    return `${longer}. Hai mẫu có hệ số biến thiên bằng nhau, nên mức độ phân tán như nhau.`;
  }
  const wider = cvBoys > cvGirls ? 'nam' : 'nữ';
  const other = wider === 'nam' ? 'nữ' : 'nam';
  /** @param {number} a @param {number} b */
  const larger = (a, b) => (a === b ? null : a > b ? 'nam' : 'nữ');
  const stdWider = larger(tidy(boys.std, 6), tidy(girls.std, 6));
  const iqrWider = larger(boys.iqr, girls.iqr);
  const stdNote =
    stdWider && stdWider !== wider
      ? ` Độ lệch chuẩn lại lớn hơn ở nhóm ${stdWider}: hệ số biến thiên so độ lệch chuẩn với số trung bình của từng nhóm.`
      : '';
  const iqrNote =
    iqrWider && iqrWider !== wider
      ? ` Khoảng tứ phân vị lại lớn hơn ở nhóm ${iqrWider}: khoảng tứ phân vị chỉ đo độ phân tán của nửa giữa mẫu, còn độ lệch chuẩn tính đến mọi giá trị.`
      : '';
  return `${longer}. Hệ số biến thiên của nhóm ${wider} lớn hơn (${percentText(wider === 'nam' ? boys.cv : girls.cv)} so với ${percentText(wider === 'nam' ? girls.cv : boys.cv)}), nên độ dài gang tay của nhóm ${wider} phân tán hơn, của nhóm ${other} đồng đều hơn.${stdNote}${iqrNote}`;
}
