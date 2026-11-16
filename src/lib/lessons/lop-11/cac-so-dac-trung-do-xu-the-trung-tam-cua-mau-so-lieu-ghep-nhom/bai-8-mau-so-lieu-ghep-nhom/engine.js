/**
 * Grouping a raw sample by hand: which values fall in a group, a dot plot of
 * the raw values, and what the number of groups does to the table.
 */

import { tidy } from '#lib/core/number-format.js';

/**
 * The values of a sample that belong to a group [lo; hi), or [lo; hi] when
 * the group is closed.
 * @param {readonly number[]} values
 * @param {import('../_shared/grouped.js').Group} g
 * @returns {number[]}
 */
export function valuesIn(values, g) {
  return values.filter((v) => v >= g.lo && (g.closed ? v <= g.hi : v < g.hi));
}

/**
 * Dot plot positions: each value with its height in a column of equal
 * values, 0 for the first.
 * @param {readonly number[]} values
 * @returns {Array<{ value: number, level: number }>}
 */
export function dotStack(values) {
  /** @type {Map<number, number>} */
  const seen = new Map();
  return [...values]
    .sort((a, b) => a - b)
    .map((v) => {
      const key = tidy(v);
      const level = seen.get(key) ?? 0;
      seen.set(key, level + 1);
      return { value: v, level };
    });
}

/**
 * What the number of groups does to the picture, as feedback.
 * @param {number} k number of groups
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function groupingAdvice(k) {
  if (k < 4) {
    return {
      tone: 'warn',
      text: `Chỉ có ${k} nhóm: các nhóm quá rộng, bảng gộp gần hết số liệu lại nên không còn thấy số liệu tập trung ở đâu.`,
    };
  }
  if (k > 10) {
    return {
      tone: 'warn',
      text: `Có tới ${k} nhóm: mỗi nhóm chỉ có vài số liệu, bảng dài và các cột lên xuống thất thường, khó thấy xu thế chung.`,
    };
  }
  return {
    tone: 'ok',
    text: `${k} nhóm: bảng gọn mà vẫn cho thấy số liệu tập trung nhiều ở khoảng nào và thưa ở khoảng nào.`,
  };
}
