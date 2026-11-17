/**
 * Computing the centre measures of a real sample twice: from its grouped
 * table, as the learner does by hand, and from the raw values, to see how
 * close the grouped estimates come.
 */

import { readNumber } from '#lib/core/decimal.js';
import { tidy } from '#lib/core/number-format.js';
import { mean, median, modes } from '#lib/stats-engine/index.js';
import {
  groupValues,
  groupedMean,
  groupedMedian,
  groupedModes,
} from '#lib/stats-engine/grouped.js';

/** @typedef {'mean' | 'median' | 'mode'} Measure */

/**
 * @typedef {object} Comparison
 * @property {Measure} id
 * @property {string} name
 * @property {number[]} grouped the estimates from the grouped table (several
 *   only for a mode with several modal groups)
 * @property {number[]} exact the values from the raw sample
 */

/**
 * The grouped table of a sample and its measures both ways.
 * @param {import('../_shared/datasets.js').RawSample} sample
 * @param {number} width
 */
export function compare(sample, width) {
  const groups = groupValues(sample.values, sample.start, width);
  /** @type {number[]} */
  const groupModes = [];
  for (const m of groupedModes(groups)) {
    if (m.value !== null && !groupModes.includes(m.value)) groupModes.push(m.value);
  }
  /** @type {Comparison[]} */
  const rows = [
    {
      id: 'mean',
      name: 'Số trung bình',
      grouped: [groupedMean(groups)],
      exact: [mean(sample.values)],
    },
    {
      id: 'median',
      name: 'Trung vị',
      grouped: [groupedMedian(groups).value],
      exact: [median(sample.values)],
    },
    { id: 'mode', name: 'Mốt', grouped: groupModes, exact: modes(sample.values) },
  ];
  return { groups, rows };
}

/**
 * Checks a typed estimate against the grouped values: right when it equals
 * one of them rounded to hundredths (or exactly).
 * @param {string} text
 * @param {readonly number[]} values
 * @returns {'empty' | 'invalid' | 'ok' | 'wrong'}
 */
export function checkTyped(text, values) {
  if (text.trim() === '') return 'empty';
  const typed = readNumber(text);
  if (typed === null) return 'invalid';
  const ok = values.some((v) => Math.abs(typed - v) <= 0.005 + 1e-9 || tidy(typed) === tidy(v));
  return ok ? 'ok' : 'wrong';
}
