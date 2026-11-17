/**
 * The drop-counting experiment and its grouped sample. Each trial counts the
 * drops a coin holds before the water spills; the class's counts are grouped
 * into [a; a + h) of equal length h and summarised with the grade 11 KNTT
 * formulas for grouped samples (midpoints, interpolated median, quartiles and
 * mode). Counts are whole numbers.
 */

import { int, rng } from '#lib/core/drill.js';

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

export {
  sampleSize,
  midpoint,
  cumulative,
  groupedMean,
  groupedQuartile,
  groupedModes,
  groupText,
  groupTex,
  eqTex,
  approxText,
  quartileName,
  quartileTex,
  modeTex,
  meanTex,
} from '#lib/stats-engine/grouped.js';

/**
 * The first group start the widget offers: the smallest value rounded down
 * to a multiple of the group length.
 * @param {number} smallest @param {number} width
 */
export function defaultStart(smallest, width) {
  return Math.floor(smallest / width) * width;
}
