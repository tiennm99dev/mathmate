/**
 * The class survey sheet (grade 5 practice lesson): the survey questions,
 * the answers tapped in one sheet at a time, and what the table, the column
 * chart and the pie chart then say. Pure and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';
import { andList, mostAndLeast, percentOf, percentWorking, ratioText } from '../_shared/stats.js';

/**
 * A survey question and its answers.
 * @typedef {object} Survey
 * @property {string} id
 * @property {string} title
 * @property {string} short the name on the picker
 * @property {string} head the first column of the table
 * @property {string[]} labels the answers
 * @property {number[]} sample answers already collected, so the charts show something
 * @property {number[]} [points] the score of each answer, when the survey has an average
 */

/** The most sheets one answer can get. */
export const MAX_PER_ANSWER = 40;

/** @type {readonly Survey[]} */
export const SURVEYS = [
  {
    id: 'nho-nhat',
    title: 'Điều em nhớ nhất ở trường tiểu học',
    short: 'Điều em nhớ nhất',
    head: 'Điều nhớ nhất',
    labels: ['Thầy cô', 'Bạn bè', 'Sân trường', 'Thư viện', 'Các buổi dã ngoại'],
    sample: [9, 7, 3, 2, 4],
  },
  {
    id: 'hai-long',
    title: 'Mức độ hài lòng với trường của em',
    short: 'Mức độ hài lòng',
    head: 'Số điểm',
    labels: ['1 điểm', '2 điểm', '3 điểm', '4 điểm', '5 điểm'],
    sample: [0, 1, 2, 8, 5],
    points: [1, 2, 3, 4, 5],
  },
  {
    id: 'chia-nhom',
    title: 'Gieo xúc xắc chia nhóm dọn lớp',
    short: 'Gieo xúc xắc chia nhóm',
    head: 'Mặt xúc xắc',
    labels: ['1 chấm', '2 chấm', '3 chấm', '4 chấm', '5 chấm', '6 chấm'],
    sample: [3, 5, 4, 6, 2, 4],
  },
];

/**
 * Adds or takes back one sheet for answer `i`, within 0..MAX_PER_ANSWER.
 * @param {readonly number[]} counts
 * @param {number} i
 * @param {1 | -1} delta
 */
export function tapAnswer(counts, i, delta) {
  return counts.map((c, j) => (j === i ? Math.max(0, Math.min(MAX_PER_ANSWER, c + delta)) : c));
}

/**
 * The average score: (score × count summed) : number of sheets, or null.
 * It is exact up to four decimal places, else rounded to two (`exact` false).
 * @param {Survey} s
 * @param {readonly number[]} counts
 */
export function averageScore(s, counts) {
  const total = counts.reduce((a, c) => a + c, 0);
  if (!s.points || total === 0) return null;
  const sum = s.points.reduce((a, p, i) => a + p * counts[i], 0);
  const exact = Number.isInteger(tidy((sum / total) * 10000, 6));
  return { sum, total, exact, average: exact ? tidy(sum / total, 4) : tidy(sum / total, 2) };
}

/**
 * The share of the most chosen answer: exact when it has at most one
 * decimal place ("9 : 25 = 0,36 = 36%"), else rounded to one place.
 * @param {number} count
 * @param {number} total
 */
export function shareText(count, total) {
  const p = percentOf(count, total);
  return Number.isInteger(tidy(p * 10, 6))
    ? `Tỉ số phần trăm: ${percentWorking(count, total)}.`
    : `Tỉ số phần trăm: khoảng ${formatNumber(p, 1)}%.`;
}

/**
 * What the survey shows: the total, the most chosen answer with its ratio
 * and percentage, and the average score when there is one.
 * @param {Survey} s
 * @param {readonly number[]} counts
 * @returns {string[]}
 */
export function findings(s, counts) {
  const total = counts.reduce((a, c) => a + c, 0);
  if (total === 0) return ['Chưa có phiếu nào. Em hỏi các bạn rồi bấm nút + của câu trả lời.'];
  const rows = s.labels.map((label, i) => ({ label, count: counts[i] }));
  const { max, most } = mostAndLeast(rows);
  const lines = [
    `Có ${total} phiếu.`,
    `${andList(most)} được chọn nhiều nhất: ${max} phiếu.`,
    `Tỉ số của số phiếu chọn ${most[0]} so với tổng số phiếu là ${ratioText(max, total)}. ${shareText(max, total)}`,
  ];
  const avg = averageScore(s, counts);
  if (avg) {
    lines.push(
      `Điểm trung bình: ${formatNumber(avg.sum)} : ${formatNumber(avg.total)} ${avg.exact ? '=' : '≈'} ${formatNumber(avg.average, 4)} (điểm).`,
    );
  }
  return lines;
}
