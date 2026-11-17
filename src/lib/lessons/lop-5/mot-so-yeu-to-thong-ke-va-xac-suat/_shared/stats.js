/**
 * Small statistics helpers of the grade 5 chapter: the number of items a
 * percentage of a total stands for, the percentage a count is of a total,
 * the rows with the most and the fewest items, and the sentences the book
 * writes for them. Pure and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * How many items `percent`% of `total` is: total × percent : 100.
 * @param {number} total
 * @param {number} percent
 */
export function countFromPercent(total, percent) {
  return tidy((total * percent) / 100);
}

/**
 * The percentage `count` is of `total`: count : total × 100.
 * @param {number} count
 * @param {number} total positive
 */
export function percentOf(count, total) {
  return tidy((count / total) * 100);
}

/**
 * The working of a percentage the book's way: "13 : 20 = 0,65 = 65%".
 * @param {number} count
 * @param {number} total positive
 */
export function percentWorking(count, total) {
  const q = tidy(count / total);
  return `${formatNumber(count)} : ${formatNumber(total)} = ${formatNumber(q)} = ${formatNumber(percentOf(count, total))}%`;
}

/**
 * The working of a count from a percentage: "30 × 20 : 100 = 6".
 * @param {number} total
 * @param {number} percent
 */
export function countWorking(total, percent) {
  return `${formatNumber(total)} × ${formatNumber(percent)} : 100 = ${formatNumber(countFromPercent(total, percent))}`;
}

/**
 * The labels of the rows with the largest and with the smallest count.
 * @param {ReadonlyArray<{ label: string, count: number }>} rows not empty
 */
export function mostAndLeast(rows) {
  const counts = rows.map((r) => r.count);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  return {
    max,
    min,
    most: rows.filter((r) => r.count === max).map((r) => r.label),
    least: rows.filter((r) => r.count === min).map((r) => r.label),
  };
}

/**
 * Labels joined the Vietnamese way: "A", "A và B", "A, B và C".
 * @param {readonly string[]} labels
 */
export function andList(labels) {
  if (labels.length <= 1) return labels.join('');
  return `${labels.slice(0, -1).join(', ')} và ${labels[labels.length - 1]}`;
}

/**
 * The ratio of the times an event happened to the times the experiment was
 * done, kept unsimplified as the book writes it ("9/14").
 * @param {number} times
 * @param {number} total
 */
export function ratioText(times, total) {
  return `${times}/${total}`;
}
