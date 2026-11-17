/**
 * Question generators for the chapter "Các số đặc trưng đo xu thế trung tâm
 * của mẫu số liệu ghép nhóm", one skill per centre measure, for the drill
 * board of its review lesson. Each question draws a table of five groups of
 * equal length; answers are rounded to hundredths, and a draw whose exact
 * value sits on a rounding half is drawn again. Prompts, hints and steps are
 * rich text.
 */

import { int, pick, retryMake, rounded } from '#lib/core/drill.js';
import { numTex } from '#lib/core/number-format.js';
import {
  cumulative,
  groupTex,
  groupedMean,
  groupedModes,
  groupedQuartile,
  makeGroups,
  meanTex,
  midpoint,
  modeTex,
  quartileTex,
  sampleSize,
} from '#lib/stats-engine/grouped.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('#lib/stats-engine/grouped.js').Group} Group */

const STARTS = [0, 10, 20, 30, 40, 50, 100, 150];
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

/** Cumulative frequencies as rich text. @param {readonly Group[]} groups */
function cumulativeText(groups) {
  return cumulative(groups)
    .map((c) => `$${c}$`)
    .join('; ');
}

const ROUND = ' (làm tròn đến hàng phần trăm nếu cần)';

/** @type {Skill} */
export const meanSkill = {
  id: 'trung-binh',
  label: 'Số trung bình',
  make: (rand) =>
    retryMake(() => {
      const groups = drawTable(rand);
      const answer = rounded(groupedMean(groups), 2);
      if (answer === null) return null;
      return {
        prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính số trung bình $\\overline{x}$${ROUND}.`,
        answer,
        hints: [
          'Thay mỗi nhóm bằng giá trị đại diện, điểm giữa của nhóm.',
          `Giá trị đại diện: ${groups.map((g) => `$${numTex(midpoint(g))}$`).join('; ')}; cỡ mẫu $n = ${sampleSize(groups)}$.`,
        ],
        steps: [
          `Giá trị đại diện của các nhóm: ${groups.map((g) => `$${numTex(midpoint(g))}$`).join('; ')}.`,
          `Cỡ mẫu $n = ${sampleSize(groups)}$.`,
          `$${meanTex(groups)}$.`,
        ],
      };
    }),
};

/**
 * Steps and hints for a quartile Q_k of a table.
 * @param {readonly Group[]} groups
 * @param {1 | 2 | 3} k
 */
function quartileWork(groups, k) {
  const q = groupedQuartile(groups, k);
  const share = k === 2 ? '\\dfrac{n}{2}' : k === 1 ? '\\dfrac{n}{4}' : '\\dfrac{3n}{4}';
  const name = k === 2 ? 'M_e' : `Q_${k}`;
  return {
    q,
    hints: [
      `Tính $${share}$ và tần số tích luỹ, rồi tìm nhóm đầu tiên có tần số tích luỹ $\\ge ${share}$.`,
      `Nhóm chứa $${name}$ là $${groupTex(groups[q.index])}$ với $C = ${q.before}$ và tần số $${q.count}$.`,
    ],
    steps: [
      `Cỡ mẫu $n = ${sampleSize(groups)}$, nên $${share} = ${numTex(q.target)}$.`,
      `Tần số tích luỹ: ${cumulativeText(groups)}. Nhóm đầu tiên có tần số tích luỹ $\\ge ${numTex(q.target)}$ là $${groupTex(groups[q.index])}$, với $C = ${q.before}$ và tần số $${q.count}$.`,
      `$${quartileTex(q, k)}$.`,
    ],
  };
}

/** @type {Skill} */
export const medianSkill = {
  id: 'trung-vi',
  label: 'Trung vị',
  make: (rand) =>
    retryMake(() => {
      const groups = drawTable(rand);
      const { q, hints, steps } = quartileWork(groups, 2);
      const answer = rounded(q.value, 2);
      if (answer === null) return null;
      return {
        prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính trung vị $M_e$${ROUND}.`,
        answer,
        hints,
        steps,
      };
    }),
};

/** @type {Skill} */
export const quartileSkill = {
  id: 'tu-phan-vi',
  label: 'Tứ phân vị',
  make: (rand) =>
    retryMake(() => {
      const groups = drawTable(rand);
      const k = pick(rand, /** @type {const} */ ([1, 3]));
      const { q, hints, steps } = quartileWork(groups, k);
      const answer = rounded(q.value, 2);
      if (answer === null) return null;
      const name = k === 1 ? 'thứ nhất $Q_1$' : 'thứ ba $Q_3$';
      return {
        prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính tứ phân vị ${name}${ROUND}.`,
        answer,
        hints,
        steps,
      };
    }),
};

/** @type {Skill} */
export const modeSkill = {
  id: 'mot',
  label: 'Mốt',
  make: (rand) =>
    retryMake(() => {
      const groups = drawTable(rand);
      const modes = groupedModes(groups);
      if (modes.length !== 1 || modes[0].value === null) return null;
      const m = modes[0];
      const answer = rounded(/** @type {number} */ (m.value), 2);
      if (answer === null) return null;
      const g = groups[m.index];
      const edge =
        m.index === 0
          ? ' Đây là nhóm đầu tiên nên lấy $m_{j-1} = 0$.'
          : m.index === groups.length - 1
            ? ' Đây là nhóm cuối cùng nên lấy $m_{j+1} = 0$.'
            : '';
      return {
        prompt: `Cho mẫu số liệu ghép nhóm: ${tableText(groups)}. Tính mốt $M_o$${ROUND}.`,
        answer,
        hints: [
          'Nhóm chứa mốt là nhóm có tần số lớn nhất.',
          `Nhóm chứa mốt là $${groupTex(g)}$: $m_j = ${m.count}$, $m_{j-1} = ${m.prev}$, $m_{j+1} = ${m.next}$.`,
        ],
        steps: [
          `Nhóm có tần số lớn nhất là $${groupTex(g)}$ với $m_j = ${m.count}$; $m_{j-1} = ${m.prev}$, $m_{j+1} = ${m.next}$, $h = ${numTex(m.width)}$.${edge}`,
          `$${modeTex(m)}$.`,
        ],
      };
    }),
};

export const CHAPTER_SKILLS = [meanSkill, medianSkill, quartileSkill, modeSkill];
