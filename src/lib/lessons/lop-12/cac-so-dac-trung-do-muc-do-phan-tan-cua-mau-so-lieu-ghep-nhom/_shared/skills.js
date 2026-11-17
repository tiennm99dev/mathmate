/**
 * Question generators for the chapter "Các số đặc trưng đo mức độ phân tán
 * của mẫu số liệu ghép nhóm", one skill per measure of spread, for the drill
 * board of its review lesson. Each question draws a table of five groups of
 * equal length; answers are rounded to hundredths, and a draw whose exact
 * value sits on a rounding half is drawn again. Prompts, hints and steps are
 * rich text.
 */

import { int, pick, retryMake, rounded } from '#lib/core/drill.js';
import { readNumber } from '#lib/core/decimal.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import {
  cumulative,
  eqTex,
  groupedMean,
  groupTex,
  groupedIqr,
  groupedRange,
  groupedStd,
  groupedVariance,
  makeGroups,
  meanTex,
  midpoint,
  quartileTex,
  sampleSize,
  stdTex,
  varianceWorkTex,
} from './grouped.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {Omit<import('#lib/core/drill.js').Question, 'skill'>} Draft */
/** @typedef {import('./grouped.js').Group} Group */

const STARTS = [0, 10, 20, 40, 50, 100, 150];
const WIDTHS = [2, 4, 5, 10, 20];

/**
 * Five groups of equal length with frequencies from 1 to 15.
 * @param {() => number} rand
 * @returns {Group[]}
 */
export function drawTable(rand) {
  const counts = Array.from({ length: 5 }, () => int(rand, 1, 15));
  return makeGroups(pick(rand, STARTS), pick(rand, WIDTHS), counts);
}

/** The table as rich text: '$[0; 10)$: $5$; $[10; 20)$: $9$; …'. @param {readonly Group[]} groups */
export function tableText(groups) {
  return groups.map((g) => `$${groupTex(g)}$: $${g.count}$`).join('; ');
}

const ROUND = ' (làm tròn đến hàng phần trăm nếu cần)';

/**
 * Reads a typed ΔQ and takes any value within a hundredth of the answer as
 * the answer itself: a learner who rounds Q_1 and Q_3 to hundredths before
 * subtracting can land one hundredth away from the rounded exact value.
 * @param {number} answer
 * @returns {(text: string) => number | null}
 */
export function nearHundredth(answer) {
  return (text) => {
    const v = readNumber(text);
    if (v === null) return null;
    return Math.abs(v - answer) <= 0.01 + 1e-9 ? answer : v;
  };
}

/**
 * The hints of a variance question: compute the mean, then the shortcut
 * formula; when the mean is not a short decimal, keep it exact, since a
 * rounded mean squared drifts far from the answer.
 * @param {readonly Group[]} groups
 */
function varianceHints(groups) {
  const m = groupedMean(groups);
  const short = tidy(Math.round(m * 100) / 100) === m;
  return [
    'Thay mỗi nhóm bằng giá trị đại diện rồi tính số trung bình $\\overline{x}$.',
    short
      ? 'Dùng $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\cdots + m_kx_k^2\\right) - \\overline{x}^2$.'
      : 'Dùng $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\cdots + m_kx_k^2\\right) - \\overline{x}^2$, giữ $\\overline{x}$ ở dạng phân số: làm tròn $\\overline{x}$ trước khi bình phương sẽ làm sai kết quả.',
  ];
}

/**
 * The range question on a table.
 * @param {readonly Group[]} groups
 * @returns {Draft}
 */
export function rangeQuestion(groups) {
  const r = groupedRange(groups);
  return {
    prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính khoảng biến thiên $R$.`,
    answer: r.value,
    hints: [
      'Khoảng biến thiên chỉ dùng hai đầu mút của bảng.',
      'Lấy đầu mút phải của nhóm cuối trừ đầu mút trái của nhóm đầu.',
    ],
    steps: [
      `Nhóm đầu là $${groupTex(groups[0])}$, nhóm cuối là $${groupTex(groups[groups.length - 1])}$.`,
      `$R = ${numTex(r.hi)} - ${numTex(r.lo)} = ${numTex(r.value)}$.`,
    ],
  };
}

/**
 * The interquartile range question on a table, or null when the answer sits
 * on a rounding half.
 * @param {readonly Group[]} groups
 * @returns {Draft | null}
 */
export function iqrQuestion(groups) {
  const { q1, q3, value } = groupedIqr(groups);
  const answer = rounded(value, 2);
  if (answer === null) return null;
  const cum = cumulative(groups)
    .map((c) => `$${c}$`)
    .join('; ');
  return {
    prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính khoảng tứ phân vị $\\Delta_Q$${ROUND}.`,
    answer,
    read: nearHundredth(answer),
    hints: [
      'Tính $\\dfrac{n}{4}$, $\\dfrac{3n}{4}$ và tần số tích luỹ để tìm nhóm chứa $Q_1$, nhóm chứa $Q_3$.',
      `Nhóm chứa $Q_1$ là $${groupTex(groups[q1.index])}$, nhóm chứa $Q_3$ là $${groupTex(groups[q3.index])}$.`,
    ],
    steps: [
      `Cỡ mẫu $n = ${sampleSize(groups)}$; tần số tích luỹ: ${cum}.`,
      `$${quartileTex(q1, 1)}$.`,
      `$${quartileTex(q3, 3)}$.`,
      `$\\Delta_Q = Q_3 - Q_1 ${eqTex(value)}$.`,
    ],
  };
}

/**
 * The worked steps of the variance of a table.
 * @param {readonly Group[]} groups
 */
function varianceSteps(groups) {
  return [
    `Giá trị đại diện: ${groups.map((g) => `$${numTex(midpoint(g))}$`).join('; ')}; cỡ mẫu $n = ${sampleSize(groups)}$.`,
    `$${meanTex(groups)}$.`,
    `$${varianceWorkTex(groups)}$.`,
  ];
}

/**
 * The variance question on a table, or null on a rounding half.
 * @param {readonly Group[]} groups
 * @returns {Draft | null}
 */
export function varianceQuestion(groups) {
  const answer = rounded(groupedVariance(groups), 2);
  if (answer === null) return null;
  return {
    prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính phương sai $s^2$${ROUND}.`,
    answer,
    hints: varianceHints(groups),
    steps: varianceSteps(groups),
  };
}

/**
 * The standard deviation question on a table, or null on a rounding half.
 * @param {readonly Group[]} groups
 * @returns {Draft | null}
 */
export function stdQuestion(groups) {
  const answer = rounded(groupedStd(groups), 2);
  if (answer === null) return null;
  return {
    prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính độ lệch chuẩn $s$${ROUND}.`,
    answer,
    hints: [
      ...varianceHints(groups),
      'Độ lệch chuẩn là căn bậc hai số học của phương sai; lấy căn của phương sai chưa làm tròn.',
    ],
    steps: [...varianceSteps(groups), `$${stdTex(groups)}$.`],
  };
}

/** @type {Skill} */
export const rangeSkill = {
  id: 'khoang-bien-thien',
  label: 'Khoảng biến thiên',
  make: (rand) => rangeQuestion(drawTable(rand)),
};

/** @type {Skill} */
export const iqrSkill = {
  id: 'khoang-tu-phan-vi',
  label: 'Khoảng tứ phân vị',
  make: (rand) => retryMake(() => iqrQuestion(drawTable(rand))),
};

/** @type {Skill} */
export const varianceSkill = {
  id: 'phuong-sai',
  label: 'Phương sai',
  make: (rand) => retryMake(() => varianceQuestion(drawTable(rand))),
};

/** @type {Skill} */
export const stdSkill = {
  id: 'do-lech-chuan',
  label: 'Độ lệch chuẩn',
  make: (rand) => retryMake(() => stdQuestion(drawTable(rand))),
};

export const CHAPTER_SKILLS = [rangeSkill, iqrSkill, varianceSkill, stdSkill];
