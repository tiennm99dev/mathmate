/**
 * The survey of the activity: answers of a class about social media (sex,
 * minutes a day, main benefit, main harm), and the characteristic numbers of
 * the times the way the KNTT grade 10 book computes them.
 */

import { tidy } from '#lib/core/number-format.js';
import { mean, modes, quartiles, stdDev, variance } from '#lib/stats-engine/index.js';

/** The answers of question 3 of the survey form: the main benefit. */
export const BENEFITS = [
  'Kết nối, trò chuyện với bạn bè',
  'Giải trí',
  'Tìm kiếm, cập nhật thông tin',
  'Hỗ trợ học tập',
];

/** The answers of question 4 of the survey form: the main harm. */
export const HARMS = [
  'Tốn nhiều thời gian',
  'Ảnh hưởng sức khoẻ, giấc ngủ',
  'Ảnh hưởng kết quả học tập',
  'Gặp thông tin sai lệch, lừa đảo',
];

/** Short names of the benefits, for chart labels. */
export const BENEFIT_SHORT = ['Kết nối', 'Giải trí', 'Thông tin', 'Học tập'];

/** Short names of the harms, for chart labels. */
export const HARM_SHORT = ['Tốn thời gian', 'Sức khoẻ', 'Học tập', 'Tin sai'];

/** @typedef {'nam' | 'nu'} Sex */
/** @typedef {{ sex: Sex, minutes: number, benefit: number, harm: number }} Answer */

/** @type {Array<[Sex, number, number, number]>} */
const ROWS = [
  ['nam', 30, 2, 3],
  ['nam', 60, 3, 0],
  ['nam', 90, 1, 0],
  ['nam', 90, 0, 1],
  ['nam', 120, 1, 0],
  ['nam', 120, 0, 0],
  ['nam', 120, 1, 2],
  ['nam', 150, 1, 0],
  ['nam', 180, 1, 1],
  ['nam', 240, 1, 0],
  ['nam', 240, 0, 2],
  ['nam', 300, 1, 0],
  ['nam', 360, 1, 2],
  ['nam', 420, 1, 1],
  ['nu', 30, 3, 3],
  ['nu', 40, 2, 3],
  ['nu', 60, 0, 1],
  ['nu', 60, 2, 3],
  ['nu', 60, 0, 0],
  ['nu', 90, 3, 1],
  ['nu', 90, 0, 0],
  ['nu', 90, 2, 1],
  ['nu', 120, 0, 0],
  ['nu', 120, 0, 1],
  ['nu', 120, 2, 0],
  ['nu', 120, 3, 2],
  ['nu', 150, 0, 0],
  ['nu', 150, 0, 1],
  ['nu', 180, 2, 0],
  ['nu', 240, 0, 2],
];

/** The 30 answers collected in class 10A: 14 boys and 16 girls. @type {Answer[]} */
export const SURVEY = ROWS.map(([sex, minutes, benefit, harm]) => ({
  sex,
  minutes,
  benefit,
  harm,
}));

/** Longest time a day a learner may type, in minutes. */
export const MAX_MINUTES = 1440;

/**
 * Minutes typed by a learner: a whole number from 0 to a day, else null.
 * @param {string} text
 */
export function readMinutes(text) {
  const t = text.trim();
  if (!/^\d+$/.test(t)) return null;
  const v = Number(t);
  return v <= MAX_MINUTES ? v : null;
}

/**
 * @typedef {{
 *   n: number; min: number; max: number; mean: number; median: number;
 *   q1: number; q3: number; modes: number[]; range: number; iqr: number;
 *   variance: number; sd: number; low: number; high: number; outliers: number[];
 * }} Summary
 */

/**
 * Every characteristic number of the times. `low` and `high` are the fences
 * $Q_1 - 1{,}5\Delta_Q$ and $Q_3 + 1{,}5\Delta_Q$; `outliers` are the values
 * outside them, in ascending order.
 * @param {readonly number[]} values at least one value
 * @returns {Summary}
 */
export function summarize(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const [q1, q2, q3] = quartiles(sorted);
  const iqr = tidy(q3 - q1);
  const low = tidy(q1 - 1.5 * iqr);
  const high = tidy(q3 + 1.5 * iqr);
  return {
    n: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: tidy(mean(sorted)),
    median: tidy(q2),
    q1,
    q3,
    modes: modes(sorted),
    range: sorted[sorted.length - 1] - sorted[0],
    iqr,
    variance: tidy(variance(sorted)),
    sd: tidy(stdDev(sorted)),
    low,
    high,
    outliers: sorted.filter((v) => v < low || v > high),
  };
}

/**
 * The minutes of the answers of one group.
 * @param {readonly Answer[]} answers
 * @param {'all' | Sex} group
 */
export function minutesOf(answers, group) {
  return answers.filter((a) => group === 'all' || a.sex === group).map((a) => a.minutes);
}

/**
 * How many answers chose each option of a question.
 * @param {readonly Answer[]} answers
 * @param {'benefit' | 'harm'} key
 * @param {number} options
 */
export function countAnswers(answers, key, options) {
  const counts = Array(options).fill(0);
  for (const a of answers) counts[a[key]] += 1;
  return counts;
}

/**
 * The time table of the answers: each distinct time with its frequency.
 * @param {readonly number[]} values
 */
export function frequencies(values) {
  /** @type {Map<number, number>} */
  const m = new Map();
  for (const v of values) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m].sort((a, b) => a[0] - b[0]).map(([value, count]) => ({ value, count }));
}

/**
 * A conclusion comparing two groups the way the activity asks: by the mean
 * (who uses more) and by the standard deviation (whose times are more
 * spread out). Null when a group is empty.
 * @param {readonly number[]} boys
 * @param {readonly number[]} girls
 */
export function compareGroups(boys, girls) {
  if (boys.length === 0 || girls.length === 0) return null;
  const b = summarize(boys);
  const g = summarize(girls);
  const more = b.mean === g.mean ? 'equal' : b.mean > g.mean ? 'nam' : 'nu';
  const spread = b.sd === g.sd ? 'equal' : b.sd > g.sd ? 'nam' : 'nu';
  return { boys: b, girls: g, more, spread };
}
