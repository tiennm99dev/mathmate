/**
 * Grouped samples (mẫu số liệu ghép nhóm) with the conventions of the KNTT
 * grade 11 book: groups [a_i; a_{i+1}) of equal length h, each represented
 * by its midpoint (giá trị đại diện), and the interpolation formulas for the
 * median, the quartiles and the mode, which assume the values of a group are
 * spread evenly over it.
 */

import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/**
 * A group [lo; hi) with its frequency; `closed` marks a last group [lo; hi]
 * that also holds its right end.
 * @typedef {{ lo: number, hi: number, count: number, closed?: boolean }} Group
 */

/**
 * Groups a raw sample into `[start + i·width; start + (i + 1)·width)`, from
 * the group holding `start` up to the group that holds the largest value.
 * When the largest value is exactly a group end, as the book allows, the
 * last group is closed, [a_k; a_{k+1}], instead of adding a group for that
 * one value. Every value must be at least `start`.
 * @param {readonly number[]} values
 * @param {number} start left end of the first group
 * @param {number} width the group length h
 * @returns {Group[]}
 */
export function groupValues(values, start, width) {
  const top = Math.max(...values);
  if (Math.min(...values) < start) throw new Error('start must not exceed the smallest value');
  const steps = tidy((top - start) / width);
  const closed = Number.isInteger(steps) && steps > 0;
  const k = closed ? steps : Math.floor(steps) + 1;
  /** @type {Group[]} */
  const groups = Array.from({ length: k }, (_, i) => ({
    lo: tidy(start + i * width),
    hi: tidy(start + (i + 1) * width),
    count: 0,
  }));
  if (closed) groups[k - 1].closed = true;
  for (const v of values) groups[Math.min(k - 1, Math.floor(tidy((v - start) / width)))].count++;
  return groups;
}

/**
 * Groups of equal length h from the left ends `start`, `start + h`, … and
 * the frequencies m_1, m_2, …
 * @param {number} start
 * @param {number} width
 * @param {readonly number[]} counts
 * @returns {Group[]}
 */
export function makeGroups(start, width, counts) {
  return counts.map((count, i) => ({
    lo: tidy(start + i * width),
    hi: tidy(start + (i + 1) * width),
    count,
  }));
}

/** The sample size n = m_1 + … + m_k. @param {readonly Group[]} groups */
export function sampleSize(groups) {
  return groups.reduce((s, g) => s + g.count, 0);
}

/** The midpoint (a_i + a_{i+1})/2 of a group. @param {Group} g */
export function midpoint(g) {
  return tidy((g.lo + g.hi) / 2);
}

/**
 * Cumulative frequencies m_1, m_1 + m_2, …
 * @param {readonly Group[]} groups
 * @returns {number[]}
 */
export function cumulative(groups) {
  let run = 0;
  return groups.map((g) => (run += g.count));
}

/**
 * The mean x̄ = (m_1 x_1 + … + m_k x_k)/n with x_i the group midpoints.
 * @param {readonly Group[]} groups
 */
export function groupedMean(groups) {
  const n = sampleSize(groups);
  if (n === 0) throw new Error('empty sample');
  return groups.reduce((s, g) => s + g.count * midpoint(g), 0) / n;
}

/**
 * @typedef {object} Quantile
 * @property {number} index p, from 0: the group [a_p; a_{p+1}) that holds it
 * @property {number} target n/4, n/2 or 3n/4
 * @property {number} before C = m_1 + … + m_{p−1}
 * @property {number} count m_p
 * @property {number} lo a_p
 * @property {number} width a_{p+1} − a_p
 * @property {number} value a_p + (target − C)/m_p · (a_{p+1} − a_p)
 */

/**
 * The quartile Q_k (k = 1, 2, 3; Q_2 is the median M_e): the first group
 * whose cumulative frequency reaches k·n/4 holds it, and
 * Q_k = a_p + (k·n/4 − C)/m_p · (a_{p+1} − a_p).
 * @param {readonly Group[]} groups
 * @param {1 | 2 | 3} k
 * @returns {Quantile}
 */
export function groupedQuartile(groups, k) {
  const n = sampleSize(groups);
  if (n === 0) throw new Error('empty sample');
  const target = (k * n) / 4;
  const cum = cumulative(groups);
  const index = cum.findIndex((c) => c >= target);
  const g = groups[index];
  const before = cum[index] - g.count;
  const width = tidy(g.hi - g.lo);
  return {
    index,
    target,
    before,
    count: g.count,
    lo: g.lo,
    width,
    value: tidy(g.lo + ((target - before) / g.count) * width),
  };
}

/** The median M_e = Q_2. @param {readonly Group[]} groups */
export function groupedMedian(groups) {
  return groupedQuartile(groups, 2);
}

/**
 * @typedef {object} Mode
 * @property {number} index j, from 0: a group of largest frequency
 * @property {number} count m_j
 * @property {number} prev m_{j−1}, 0 when there is no group before it
 * @property {number} next m_{j+1}, 0 when there is no group after it
 * @property {number} lo a_j
 * @property {number} width h
 * @property {number | null} value
 *   a_j + (m_j − m_{j−1}) / ((m_j − m_{j−1}) + (m_j − m_{j+1})) · h, or null
 *   when both neighbours are as large as the group and the formula breaks
 */

/**
 * The modal estimate for every group of largest frequency (one in most
 * samples).
 * @param {readonly Group[]} groups
 * @returns {Mode[]}
 */
export function groupedModes(groups) {
  const top = Math.max(...groups.map((g) => g.count));
  if (top === 0) return [];
  /** @type {Mode[]} */
  const out = [];
  groups.forEach((g, index) => {
    if (g.count !== top) return;
    const prev = groups[index - 1]?.count ?? 0;
    const next = groups[index + 1]?.count ?? 0;
    const width = tidy(g.hi - g.lo);
    const left = g.count - prev;
    const right = g.count - next;
    out.push({
      index,
      count: g.count,
      prev,
      next,
      lo: g.lo,
      width,
      value: left + right === 0 ? null : tidy(g.lo + (left / (left + right)) * width),
    });
  });
  return out;
}

/** A group as TeX: '[40; 45)', or '[9; 10]' when closed. @param {Group} g */
export function groupTex(g) {
  return `[${numTex(g.lo)}; ${numTex(g.hi)}${g.closed ? ']' : ')'}`;
}

/** A group as plain text: '[40; 45)'. @param {Group} g */
export function groupText(g) {
  return `[${formatNumber(g.lo)}; ${formatNumber(g.hi)}${g.closed ? ']' : ')'}`;
}

/**
 * '= 49{,}5' when `v` has at most two decimals, else '\approx 31{,}11'.
 * @param {number} v
 */
export function eqTex(v) {
  const r = tidy(Math.round(v * 100) / 100);
  return r === tidy(v) ? `= ${numTex(v)}` : `\\approx ${numTex(r)}`;
}

/** '= 49,5' or '≈ 31,11', for plain-text captions. @param {number} v */
export function approxText(v) {
  const r = tidy(Math.round(v * 100) / 100);
  return r === tidy(v) ? `= ${formatNumber(v)}` : `≈ ${formatNumber(r)}`;
}

/** Subscript name of a quartile in TeX. @param {1 | 2 | 3} k */
export function quartileName(k) {
  return k === 2 ? 'M_e' : `Q_${k}`;
}

/**
 * The quartile formula with the numbers put in, as TeX:
 * 'Q_1 = 20 + \dfrac{10 - 5}{9} \cdot 20 \approx 31{,}11'.
 * @param {Quantile} q
 * @param {1 | 2 | 3} k
 */
export function quartileTex(q, k) {
  return `${quartileName(k)} = ${numTex(q.lo)} + \\dfrac{${numTex(q.target)} - ${q.before}}{${q.count}} \\cdot ${numTex(q.width)} ${eqTex(q.value)}`;
}

/**
 * The mode formula with the numbers put in, as TeX.
 * @param {Mode} m
 */
export function modeTex(m) {
  const tail = m.value === null ? '' : ` ${eqTex(m.value)}`;
  return `M_o = ${numTex(m.lo)} + \\dfrac{${m.count} - ${m.prev}}{(${m.count} - ${m.prev}) + (${m.count} - ${m.next})} \\cdot ${numTex(m.width)}${tail}`;
}

/**
 * The mean formula with the numbers put in, as TeX.
 * @param {readonly Group[]} groups
 */
export function meanTex(groups) {
  const n = sampleSize(groups);
  const terms = groups
    .filter((g) => g.count > 0)
    .map((g) => `${g.count} \\cdot ${numTex(midpoint(g))}`)
    .join(' + ');
  return `\\overline{x} = \\dfrac{${terms}}{${n}} ${eqTex(groupedMean(groups))}`;
}
