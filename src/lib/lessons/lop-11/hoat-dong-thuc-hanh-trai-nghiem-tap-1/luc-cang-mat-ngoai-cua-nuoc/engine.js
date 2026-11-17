/**
 * The drop-counting experiment and its grouped sample. Each trial counts the
 * drops a coin holds before the water spills; the class's counts are grouped
 * into [a; a + h) of equal length h and summarised with the grade 11 KNTT
 * formulas for grouped samples (midpoints, interpolated median, quartiles and
 * mode). Counts are whole numbers.
 */

import { int, rng } from '#lib/core/drill.js';
import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/**
 * The two liquids of the experiment.
 * @typedef {'nuoc' | 'xa-phong'} Liquid
 */

export const LIQUIDS = /** @type {const} */ ([
  { value: 'nuoc', label: 'Nước sạch' },
  { value: 'xa-phong', label: 'Nước xà phòng' },
]);

/**
 * How many drops a coin holds in one trial: clean water 28 to 46 drops,
 * soapy water, whose surface tension is lower, 14 to 26. A sum of three
 * draws keeps the counts heaped in the middle, as real measurements are.
 * @param {Liquid} liquid
 * @param {() => number} rand
 */
export function capacity(liquid, rand) {
  return liquid === 'nuoc'
    ? 28 + int(rand, 0, 6) + int(rand, 0, 6) + int(rand, 0, 6)
    : 14 + int(rand, 0, 4) + int(rand, 0, 4) + int(rand, 0, 4);
}

/** A fixed random source per liquid and trial number. @param {Liquid} liquid @param {number} trial */
export function trialRandom(liquid, trial) {
  return rng((liquid === 'nuoc' ? 1000 : 2000) + trial);
}

/** The class data of the worked example: 40 trials with clean water. */
export const CLASS_SAMPLE = Object.freeze([
  27, 28, 29, 30, 31, 32, 32, 33, 33, 34, 34, 34, 35, 35, 36, 36, 36, 37, 37, 37, 38, 38, 38, 38,
  39, 39, 39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 44, 45, 46, 48,
]);

/**
 * @typedef {object} Parsed
 * @property {number[]} values the whole numbers read
 * @property {string[]} bad the pieces that are not whole numbers
 */

/**
 * Reads counts typed as whole numbers separated by spaces, commas,
 * semicolons or new lines.
 * @param {string} text
 * @returns {Parsed}
 */
export function parseCounts(text) {
  /** @type {number[]} */
  const values = [];
  /** @type {string[]} */
  const bad = [];
  for (const piece of text.split(/[\s,;]+/)) {
    if (piece === '') continue;
    if (/^\d{1,4}$/.test(piece)) values.push(Number(piece));
    else bad.push(piece);
  }
  return { values, bad };
}

/** @typedef {{ lo: number, hi: number, count: number }} Group */

/**
 * Groups whole-number counts into [start + i·h; start + (i + 1)·h), from the
 * group holding `start` to the group holding the largest count.
 * @param {readonly number[]} values
 * @param {number} start at most the smallest value
 * @param {number} width h
 * @returns {Group[]}
 */
export function groupCounts(values, start, width) {
  const top = Math.max(...values);
  if (Math.min(...values) < start) throw new Error('start must not exceed the smallest value');
  const k = Math.floor((top - start) / width) + 1;
  /** @type {Group[]} */
  const groups = Array.from({ length: k }, (_, i) => ({
    lo: start + i * width,
    hi: start + (i + 1) * width,
    count: 0,
  }));
  for (const v of values) groups[Math.floor((v - start) / width)].count++;
  return groups;
}

/** @param {readonly Group[]} groups */
export function sampleSize(groups) {
  return groups.reduce((s, g) => s + g.count, 0);
}

/** The midpoint (giá trị đại diện) of a group. @param {Group} g */
export function midpoint(g) {
  return tidy((g.lo + g.hi) / 2);
}

/** Cumulative frequencies. @param {readonly Group[]} groups */
export function cumulative(groups) {
  let run = 0;
  return groups.map((g) => (run += g.count));
}

/** x̄ = (m_1 x_1 + … + m_k x_k)/n. @param {readonly Group[]} groups */
export function groupedMean(groups) {
  return groups.reduce((s, g) => s + g.count * midpoint(g), 0) / sampleSize(groups);
}

/**
 * @typedef {object} Quantile
 * @property {number} index the group that holds it, from 0
 * @property {number} target k·n/4
 * @property {number} before C, the frequencies of the groups before it
 * @property {number} count m_p
 * @property {number} lo a_p
 * @property {number} width h
 * @property {number} value a_p + (k·n/4 − C)/m_p · h
 */

/**
 * Q_k of the grouped sample (Q_2 is the median M_e).
 * @param {readonly Group[]} groups
 * @param {1 | 2 | 3} k
 * @returns {Quantile}
 */
export function groupedQuartile(groups, k) {
  const target = (k * sampleSize(groups)) / 4;
  const cum = cumulative(groups);
  const index = cum.findIndex((c) => c >= target);
  const g = groups[index];
  const before = cum[index] - g.count;
  const width = g.hi - g.lo;
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

/**
 * @typedef {object} Mode
 * @property {number} index the modal group, from 0
 * @property {number} count m_j
 * @property {number} prev m_{j−1} (0 before the first group)
 * @property {number} next m_{j+1} (0 after the last group)
 * @property {number} lo a_j
 * @property {number} width h
 * @property {number | null} value the mode, or null when both neighbours are
 *   as large as the group and the formula has no answer
 */

/**
 * The mode of every group of largest frequency.
 * @param {readonly Group[]} groups
 * @returns {Mode[]}
 */
export function groupedModes(groups) {
  const top = Math.max(...groups.map((g) => g.count));
  /** @type {Mode[]} */
  const out = [];
  groups.forEach((g, index) => {
    if (g.count !== top || top === 0) return;
    const prev = groups[index - 1]?.count ?? 0;
    const next = groups[index + 1]?.count ?? 0;
    const width = g.hi - g.lo;
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

/** '[35; 40)' as plain text. @param {Group} g */
export function groupText(g) {
  return `[${g.lo}; ${g.hi})`;
}

/** '[35; 40)' as TeX. @param {Group} g */
export function groupTex(g) {
  return `[${g.lo}; ${g.hi})`;
}

/** '= 41{,}5' when exact to two decimals, else '\approx 37{,}67'. @param {number} v */
export function eqTex(v) {
  const r = tidy(Math.round(v * 100) / 100);
  return r === tidy(v) ? `= ${numTex(v)}` : `\\approx ${numTex(r)}`;
}

/** '41,5' or '≈ 37,67' for captions. @param {number} v */
export function approxText(v) {
  const r = tidy(Math.round(v * 100) / 100);
  return r === tidy(v) ? formatNumber(v) : `≈ ${formatNumber(r)}`;
}

/** @param {1 | 2 | 3} k */
export function quartileName(k) {
  return k === 2 ? 'M_e' : `Q_${k}`;
}

/** The quartile formula with its numbers, as TeX. @param {Quantile} q @param {1 | 2 | 3} k */
export function quartileTex(q, k) {
  return `${quartileName(k)} = ${q.lo} + \\dfrac{${numTex(q.target)} - ${q.before}}{${q.count}} \\cdot ${q.width} ${eqTex(q.value)}`;
}

/** The mode formula with its numbers, as TeX. @param {Mode} m */
export function modeTex(m) {
  const tail = m.value === null ? '' : ` ${eqTex(m.value)}`;
  return `M_o = ${m.lo} + \\dfrac{${m.count} - ${m.prev}}{(${m.count} - ${m.prev}) + (${m.count} - ${m.next})} \\cdot ${m.width}${tail}`;
}

/** The mean formula with its numbers, as TeX. @param {readonly Group[]} groups */
export function meanTex(groups) {
  const terms = groups
    .filter((g) => g.count > 0)
    .map((g) => `${g.count} \\cdot ${numTex(midpoint(g))}`)
    .join(' + ');
  return `\\overline{x} = \\dfrac{${terms}}{${sampleSize(groups)}} ${eqTex(groupedMean(groups))}`;
}

/**
 * The first group start the widget offers: the smallest value rounded down
 * to a multiple of the group length.
 * @param {number} smallest @param {number} width
 */
export function defaultStart(smallest, width) {
  return Math.floor(smallest / width) * width;
}
