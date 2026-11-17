/**
 * Drill skills of the chapter "Đại số tổ hợp" for the end-of-chapter
 * review: the addition and multiplication rules, permutations, arrangements,
 * combinations and one coefficient of $(px + q)^n$ for n = 4 or 5. Every
 * answer is an integer (a coefficient may be negative).
 */
import { int, nonZero, pick } from '#lib/core/drill.js';
import {
  arrangeCount,
  chooseCount,
  expandCoefficients,
  factorial,
  fallingTex,
} from './counting.js';

/** @type {import('#lib/core/drill.js').Skill} */
export const RULE_SKILL = {
  id: 'quy-tac-dem',
  label: 'Bài 23. Quy tắc cộng, quy tắc nhân',
  make: (rand) => {
    const a = int(rand, 2, 9);
    const b = int(rand, 2, 9);
    if (rand() < 0.5) {
      return {
        prompt: `Thực đơn có $${a}$ món chính và $${b}$ món tráng miệng. Mỗi suất ăn gồm một món chính và một món tráng miệng. Có bao nhiêu suất ăn khác nhau?`,
        answer: a * b,
        hints: ['Chọn món chính rồi chọn món tráng miệng: hai công đoạn liên tiếp.'],
        steps: [
          `Chọn món chính có $${a}$ cách; ứng với mỗi cách có $${b}$ cách chọn món tráng miệng.`,
          `Theo quy tắc nhân có $${a} \\cdot ${b} = ${a * b}$ suất ăn.`,
        ],
      };
    }
    return {
      prompt: `Một hộp có $${a}$ quả cầu đỏ và $${b}$ quả cầu xanh (đôi một khác nhau). Có bao nhiêu cách lấy ra một quả cầu?`,
      answer: a + b,
      hints: ['Lấy một quả đỏ hoặc một quả xanh: hai phương án không trùng nhau.'],
      steps: [
        `Lấy quả đỏ có $${a}$ cách, lấy quả xanh có $${b}$ cách.`,
        `Theo quy tắc cộng có $${a} + ${b} = ${a + b}$ cách.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const PERMUTATION_SKILL = {
  id: 'hoan-vi',
  label: 'Bài 24. Hoán vị',
  make: (rand) => {
    const n = int(rand, 3, 7);
    return {
      prompt: `Có bao nhiêu cách xếp $${n}$ bạn học sinh đứng thành một hàng dọc?`,
      answer: factorial(n),
      hints: ['Mỗi cách xếp là một hoán vị của các bạn.'],
      steps: [
        `Mỗi cách xếp là một hoán vị của $${n}$ phần tử.`,
        `$P_{${n}} = ${n}! = ${fallingTex(n, n)} = ${factorial(n)}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const ARRANGEMENT_SKILL = {
  id: 'chinh-hop',
  label: 'Bài 24. Chỉnh hợp',
  make: (rand) => {
    const n = int(rand, 5, 12);
    const k = int(rand, 2, 3);
    const roles =
      k === 2 ? 'một bí thư và một phó bí thư' : 'một bí thư, một phó bí thư và một uỷ viên';
    return {
      prompt: `Từ $${n}$ đoàn viên, có bao nhiêu cách bầu ${roles} (mỗi người giữ nhiều nhất một chức)?`,
      answer: arrangeCount(n, k),
      hints: ['Các chức vụ khác nhau, nên đổi người giữa hai chức là một cách khác.'],
      steps: [
        `Mỗi cách bầu là một chỉnh hợp chập $${k}$ của $${n}$.`,
        `$A_{${n}}^{${k}} = ${fallingTex(n, k)} = ${arrangeCount(n, k)}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const COMBINATION_SKILL = {
  id: 'to-hop',
  label: 'Bài 24. Tổ hợp',
  make: (rand) => {
    const n = int(rand, 5, 12);
    const k = int(rand, 2, 4);
    return {
      prompt: `Có bao nhiêu cách chọn $${k}$ bạn trong $${n}$ bạn để cùng tham gia một đội tình nguyện?`,
      answer: chooseCount(n, k),
      hints: ['Các bạn trong đội có vai trò như nhau: không xét thứ tự.'],
      steps: [
        `Mỗi cách chọn là một tổ hợp chập $${k}$ của $${n}$.`,
        `$C_{${n}}^{${k}} = \\dfrac{${fallingTex(n, k)}}{${k}!} = \\dfrac{${arrangeCount(n, k)}}{${factorial(k)}} = ${chooseCount(n, k)}$.`,
      ],
    };
  },
};

/**
 * `x`, `2x` for the first term of the binomial.
 * @param {number} p
 */
const xTex = (p) => (p === 1 ? 'x' : `${p}x`);

/** @type {import('#lib/core/drill.js').Skill} */
export const COEFFICIENT_SKILL = {
  id: 'he-so-nhi-thuc',
  label: 'Bài 25. Hệ số trong khai triển',
  make: (rand) => {
    const n = pick(rand, [4, 5]);
    const p = int(rand, 1, 3);
    const q = nonZero(rand, -3, 3);
    const k = int(rand, 1, n - 1);
    const power = n - k;
    const coef = expandCoefficients(n, p, q)[k];
    const qTex = q < 0 ? `(${q})` : String(q);
    const pPart = p === 1 ? '' : ` \\cdot ${p}^{${power}}`;
    return {
      prompt: `Tìm hệ số của $x^{${power}}$ trong khai triển $(${xTex(p)} ${q < 0 ? '-' : '+'} ${Math.abs(q)})^{${n}}$.`,
      answer: coef,
      hints: [
        `Số hạng chứa $x^{${n}-k}$ là $C_{${n}}^{k}(${xTex(p)})^{${n}-k} \\cdot ${qTex}^k$.`,
        `$x^{${power}}$ ứng với $k = ${k}$.`,
      ],
      steps: [
        `Số hạng chứa $x^{${power}}$ ứng với $k = ${k}$: $C_{${n}}^{${k}}(${xTex(p)})^{${power}} \\cdot ${qTex}^{${k}}$.`,
        `Hệ số là $${chooseCount(n, k)}${pPart} \\cdot ${qTex}^{${k}} = ${coef}$.`,
      ],
    };
  },
};

export const CHAPTER_SKILLS = [
  RULE_SKILL,
  PERMUTATION_SKILL,
  ARRANGEMENT_SKILL,
  COMBINATION_SKILL,
  COEFFICIENT_SKILL,
];
