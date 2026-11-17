/**
 * Computing the measures of spread of a real sample twice: from its grouped
 * table, as the learner does by hand, and from the raw values, to see how
 * close the grouped estimates come.
 */

import { readNumber } from '#lib/core/decimal.js';
import { tidy } from '#lib/core/number-format.js';
import { interquartileRange, range, stdDev } from '#lib/stats-engine/index.js';
import { groupValues, groupedIqr, groupedRange, groupedStd } from '../_shared/grouped.js';

/** @typedef {'range' | 'iqr' | 'std'} Measure */

/**
 * @typedef {object} Comparison
 * @property {Measure} id
 * @property {string} name
 * @property {number} grouped the estimate from the grouped table
 * @property {number} exact the value from the raw sample
 */

/**
 * The grouped table of a sample and its measures of spread both ways.
 * @param {import('../_shared/datasets.js').RawSample} sample
 * @param {number} width
 */
export function compare(sample, width) {
  const groups = groupValues(sample.values, sample.start, width);
  /** @type {Comparison[]} */
  const rows = [
    {
      id: 'range',
      name: 'Khoảng biến thiên',
      grouped: groupedRange(groups).value,
      exact: tidy(range(sample.values)),
    },
    {
      id: 'iqr',
      name: 'Khoảng tứ phân vị',
      grouped: groupedIqr(groups).value,
      exact: tidy(interquartileRange(sample.values)),
    },
    {
      id: 'std',
      name: 'Độ lệch chuẩn',
      grouped: groupedStd(groups),
      exact: stdDev(sample.values),
    },
  ];
  return { groups, rows };
}

/**
 * Checks a typed estimate rounded to hundredths: right within a hundredth
 * of the value, so an answer built from rounded quartiles still counts.
 * @param {string} text
 * @param {number} value
 * @returns {'empty' | 'invalid' | 'ok' | 'wrong'}
 */
export function checkTyped(text, value) {
  if (text.trim() === '') return 'empty';
  const typed = readNumber(text);
  if (typed === null) return 'invalid';
  return Math.abs(typed - value) <= 0.01 + 1e-9 ? 'ok' : 'wrong';
}
