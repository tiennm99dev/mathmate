import { fmt, formatNumber, tidy } from '#lib/core/number-format.js';
import { shuffle } from '#lib/core/drill.js';

/**
 * The wholes the child can pick. Each is made only of factors 2 and 5, so
 * every quotient a : b ends after a few decimal places.
 */
export const WHOLES = [20, 25, 40, 50, 80, 200, 400, 500];

/**
 * The quotient and the percentage of a and b.
 * @param {number} a
 * @param {number} b
 */
export function percentOf(a, b) {
  const q = tidy(a / b);
  return { q, p: tidy(q * 100) };
}

/** @param {number} p */
export const percentText = (p) => `${formatNumber(p)}%`;

/**
 * The three steps the book takes: divide, multiply the quotient by 100,
 * write the sign %.
 * @param {number} a
 * @param {number} b
 */
export function percentSteps(a, b) {
  const { q, p } = percentOf(a, b);
  return [
    `Tìm thương: ${fmt(a)} : ${fmt(b)} = ${formatNumber(q)}`,
    `Nhân thương với 100: ${formatNumber(q)} × 100 = ${formatNumber(p)}`,
    `Viết thêm kí hiệu %: ${percentText(p)}`,
  ];
}

/**
 * @typedef {{ a: number, b: number, story: string, options: string[], answer: number }} PercentQuiz
 */

/** Stories for the quiz: a part `a` of a whole `b`. */
export const STORIES = [
  { a: 19, b: 25, story: 'Lớp có 25 bạn, 19 bạn biết bơi.' },
  { a: 45, b: 60, story: 'Đội trồng 60 cây, đã trồng xong 45 cây.' },
  { a: 9, b: 40, story: 'Hộp có 40 viên bi, 9 viên màu xanh.' },
  { a: 18, b: 20, story: 'Kế hoạch trồng 20 ha ngô, đã trồng 18 ha.' },
  { a: 7, b: 8, story: 'Bạn Mai làm 8 bài toán, đúng 7 bài.' },
  { a: 2.8, b: 80, story: 'Trong 80 kg nước biển có 2,8 kg muối.' },
  { a: 315, b: 600, story: 'Trường có 600 học sinh, 315 học sinh nữ.' },
];

/**
 * The question for story `i`: the percentage of the part in the whole,
 * among the slips of forgetting to multiply by 100, multiplying by 1 000 and
 * dividing the other way.
 * @param {number} i
 * @param {() => number} rand
 * @returns {PercentQuiz}
 */
export function quizAt(i, rand) {
  const { a, b, story } = STORIES[i % STORIES.length];
  const { q, p } = percentOf(a, b);
  const right = percentText(p);
  const slips = [percentText(q), percentText(tidy(p * 10)), percentText(tidy(p / 10))];
  const options = shuffle(rand, [right, ...slips]);
  return { a, b, story, options, answer: options.indexOf(right) };
}

/**
 * The note under the bars.
 * @param {number} a
 * @param {number} b
 */
export function barNote(a, b) {
  const { p } = percentOf(a, b);
  return `${fmt(a)} là ${percentText(p)} của ${fmt(b)}. Cả thanh ${fmt(b)} là 100%.`;
}
