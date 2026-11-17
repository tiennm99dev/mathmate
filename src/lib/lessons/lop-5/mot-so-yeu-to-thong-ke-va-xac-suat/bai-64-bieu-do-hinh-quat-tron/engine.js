/**
 * Pie charts (biểu đồ hình quạt tròn) of grade 5: the survey tables a child
 * turns into a pie chart by dragging the boundaries, the percentage each
 * part should have, and the live sentence that checks the chart. Pure and
 * DOM-free.
 */
import { formatNumber } from '#lib/core/number-format.js';
import { percentages } from '#lib/stats-engine/frequency.js';
import { percentOf, percentWorking } from '../_shared/stats.js';

/**
 * A survey table: the parts and how many chose each.
 * @typedef {object} Survey
 * @property {string} id
 * @property {string} title
 * @property {string} short the name on the picker
 * @property {string} noun what one item is ("học sinh")
 * @property {string[]} labels
 * @property {number[]} counts
 */

/** @type {readonly Survey[]} */
export const SURVEYS = [
  {
    id: 'do-vat',
    title: 'Đồ vật 20 học sinh mang theo khi đến vườn quốc gia',
    short: 'Đồ vật mang theo',
    noun: 'học sinh',
    labels: ['Kính lúp', 'Đèn pin', 'Thuốc xịt côn trùng'],
    counts: [13, 2, 5],
  },
  {
    id: 'cuoi-tuan',
    title: 'Hoạt động cuối tuần yêu thích của 30 học sinh',
    short: 'Hoạt động cuối tuần',
    noun: 'học sinh',
    labels: ['Đọc sách', 'Chơi thể thao', 'Giải câu đố', 'Chăm sóc cây'],
    counts: [12, 9, 6, 3],
  },
  {
    id: 'the-thao',
    title: 'Môn thể thao yêu thích của 40 học sinh lớp 5A',
    short: 'Môn thể thao',
    noun: 'học sinh',
    labels: ['Bóng đá', 'Cầu lông', 'Bơi', 'Cờ vua'],
    counts: [20, 10, 6, 4],
  },
];

/**
 * The total of a survey.
 * @param {Survey} s
 */
export function totalOf(s) {
  return s.counts.reduce((a, c) => a + c, 0);
}

/**
 * The percentage each part should have on the chart.
 * @param {Survey} s
 */
export function targetPercents(s) {
  const total = totalOf(s);
  return s.counts.map((c) => percentOf(c, total));
}

/**
 * How far one key press or snap moves a boundary, as a percentage: the
 * share of a single item, so every slice stays a whole number of items.
 * @param {Survey} s
 */
export function stepPercent(s) {
  return 100 / totalOf(s);
}

/**
 * The slices when the task starts: the items shared out as evenly as they
 * go, the first parts taking one more.
 * @param {Survey} s
 * @returns {number[]}
 */
export function startCounts(s) {
  const total = totalOf(s);
  const n = s.counts.length;
  return s.counts.map((_, i) => Math.floor(total / n) + (i < total % n ? 1 : 0));
}

/**
 * The sentence under the chart: which part is still off, how to work out
 * its percentage, and which way to move it; or that the chart is right.
 * @param {Survey} s
 * @param {readonly number[]} values the slices on the chart, in items
 * @returns {{ done: boolean, text: string }}
 */
export function checkMessage(s, values) {
  const want = targetPercents(s);
  const have = percentages(values, 1);
  const total = totalOf(s);
  const off = want.findIndex((w, i) => Math.abs(w - have[i]) > 1e-6);
  if (off < 0) {
    return {
      done: true,
      text: `Đúng rồi! Biểu đồ khớp với bảng: ${s.labels
        .map((l, i) => `${l} ${formatNumber(want[i])}%`)
        .join(', ')}. Cả hình tròn là 100%.`,
    };
  }
  const way = have[off] < want[off] ? 'rộng ra' : 'hẹp lại';
  return {
    done: false,
    text: `Phần ${s.labels[off]} cần ${percentWorking(s.counts[off], total)}. Bây giờ là ${formatNumber(have[off])}%: em kéo cho phần đó ${way}.`,
  };
}
