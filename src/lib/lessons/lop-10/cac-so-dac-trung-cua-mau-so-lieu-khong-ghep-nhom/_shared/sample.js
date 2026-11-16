/**
 * The characteristic numbers of an ungrouped sample the way the KNTT grade 10
 * book computes them (variance divides by n, quartiles are medians of the two
 * halves that leave out the median when n is odd), plus reading a sample
 * typed by a learner and writing numbers in Vietnamese.
 */

import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
import {
  interquartileRange,
  mean,
  median,
  modes,
  quartiles,
  range,
  stdDev,
  variance,
  niceAxis,
} from '#lib/stats-engine/index.js';

/**
 * @typedef {{
 *   n: number;
 *   sorted: number[];
 *   min: number;
 *   max: number;
 *   mean: number;
 *   median: number;
 *   q1: number;
 *   q3: number;
 *   modes: number[];
 *   range: number;
 *   iqr: number;
 *   variance: number;
 *   sd: number;
 *   low: number;
 *   high: number;
 *   outliers: number[];
 * }} Summary
 */

/**
 * Every characteristic number of a sample, binary noise rounded away.
 * `low` and `high` are the fences $Q_1 - 1{,}5\Delta_Q$ and $Q_3 + 1{,}5\Delta_Q$;
 * `outliers` are the values outside them, in ascending order.
 * @param {readonly number[]} values at least one value
 * @returns {Summary}
 */
export function summarize(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const [q1, , q3] = quartiles(sorted);
  const iqr = tidy(interquartileRange(sorted));
  const low = tidy(q1 - 1.5 * iqr);
  const high = tidy(q3 + 1.5 * iqr);
  return {
    n: sorted.length,
    sorted,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: tidy(mean(sorted)),
    median: tidy(median(sorted)),
    q1: tidy(q1),
    q3: tidy(q3),
    modes: modes(sorted),
    range: tidy(range(sorted)),
    iqr,
    variance: tidy(variance(sorted)),
    sd: tidy(stdDev(sorted)),
    low,
    high,
    outliers: sorted.filter((v) => v < low || v > high),
  };
}

/**
 * Whether the sample has a mode in the book's sense: some value occurs more
 * often than another one.
 * @param {Summary} s
 */
export function hasMode(s) {
  return s.modes.length < new Set(s.sorted).size;
}

/**
 * Reads a sample typed by a learner: numbers separated by semicolons or
 * spaces, with a decimal comma (a dot works too). Returns the values, or an
 * error message in Vietnamese.
 * @param {string} text
 * @param {{ max?: number }} [options] most values accepted
 * @returns {{ values: number[] } | { error: string }}
 */
export function readSample(text, { max = 40 } = {}) {
  const parts = text
    .replace(/[−–—]/g, '-')
    .split(/[;\s]+/)
    .filter((p) => p !== '');
  if (parts.length === 0) return { error: 'Hãy nhập ít nhất hai số liệu.' };
  /** @type {number[]} */
  const values = [];
  for (const p of parts) {
    if (!/^-?\d+(?:[,.]\d+)?$/.test(p)) {
      return { error: `"${p}" không phải là một số. Ngăn cách các số bằng dấu chấm phẩy.` };
    }
    values.push(Number(p.replace(',', '.')));
  }
  if (values.length < 2) return { error: 'Hãy nhập ít nhất hai số liệu.' };
  if (values.length > max) return { error: `Hãy nhập không quá ${max} số liệu.` };
  return { values };
}

/** A sample written back for the input box: '7; 8,5; 9'. @param {readonly number[]} values */
export function sampleText(values) {
  return values.map((v) => formatNumber(v)).join('; ');
}

/**
 * A number for live text, at most `places` decimals: 7.25 → '7,25'.
 * @param {number} v @param {number} [places]
 */
export function num(v, places = 2) {
  return formatNumber(tidy(v), places);
}

/**
 * A number for TeX, at most `places` decimals: 7.25 → '7{,}25'.
 * @param {number} v @param {number} [places]
 */
export function tex(v, places = 2) {
  return numTex(tidy(v), places);
}

/**
 * Whether `v` written with `places` decimals is exact or rounded, as the TeX
 * relation to put before it: '=' or '\approx'.
 * @param {number} v @param {number} [places]
 */
export function rel(v, places = 2) {
  return tidy(v, places) === tidy(v) ? '=' : '\\approx';
}

/** The modes as a list for live text: '7 và 8'. @param {readonly number[]} list */
export function modesText(list) {
  if (list.length === 1) return num(list[0]);
  return `${list
    .slice(0, -1)
    .map((v) => num(v))
    .join(', ')} và ${num(list[list.length - 1])}`;
}

/**
 * A value axis with round ticks between `lo` and `hi`, drawn from `left` to
 * `right` in SVG units, and the map from a value to its x.
 * @param {number} lo @param {number} hi @param {number} left @param {number} right
 * @param {number} [count] about how many intervals
 */
export function valueAxis(lo, hi, left, right, count = 6) {
  const a = niceAxis(lo, hi, count);
  return {
    ...a,
    x: (/** @type {number} */ v) => left + ((v - a.min) / (a.max - a.min)) * (right - left),
  };
}
