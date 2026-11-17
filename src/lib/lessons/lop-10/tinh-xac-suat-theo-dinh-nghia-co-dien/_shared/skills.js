/**
 * Drill skills of the chapter "Tính xác suất theo định nghĩa cổ điển" for
 * the end-of-chapter review. Answers are counts n(Ω) (natural numbers) or
 * probabilities n(E)/n(Ω), read with `readProbability` and written with
 * `countOrProbabilityText` from `#lib/core/fractions.js`.
 */

import { countsAsNaturals, int, pick } from '#lib/core/drill.js';
import { numTex } from '#lib/core/number-format.js';
import { choose, probabilityTex } from './counting.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** @type {Skill} */
export const SAMPLE_SPACE_SKILL = countsAsNaturals({
  id: 'khong-gian-mau',
  label: 'Bài 26. Số phần tử của không gian mẫu',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const k = int(rand, 2, 5);
      return {
        prompt: `Tung một đồng xu $${k}$ lần liên tiếp. Không gian mẫu có bao nhiêu phần tử?`,
        answer: 2 ** k,
        hints: ['Vẽ sơ đồ hình cây: mỗi lần tung tách mỗi nhánh thành hai nhánh $S$, $N$.'],
        steps: [
          `Mỗi lần tung có $2$ kết quả; theo quy tắc nhân, $n(\\Omega) = 2^{${k}} = ${2 ** k}$.`,
        ],
      };
    }
    if (v === 1) {
      const m = int(rand, 2, 3);
      return {
        prompt: `Gieo $${m}$ con xúc xắc. Không gian mẫu có bao nhiêu phần tử?`,
        answer: 6 ** m,
        hints: ['Mỗi con xúc xắc có $6$ mặt; dùng quy tắc nhân.'],
        steps: [`$n(\\Omega) = 6^{${m}} = ${6 ** m}$.`],
      };
    }
    const n = int(rand, 6, 15);
    const k = int(rand, 2, 4);
    return {
      prompt: `Một hộp có $${n}$ viên bi khác nhau. Lấy ngẫu nhiên đồng thời $${k}$ viên bi. Không gian mẫu có bao nhiêu phần tử?`,
      answer: choose(n, k),
      hints: ['Lấy đồng thời, không xét thứ tự: mỗi kết quả là một tổ hợp.'],
      steps: [
        `Mỗi kết quả là một tổ hợp chập $${k}$ của $${n}$: $n(\\Omega) = C_{${n}}^{${k}} = ${numTex(choose(n, k))}$.`,
      ],
    };
  },
});

/** @type {Skill} */
export const DICE_SKILL = {
  id: 'hai-xuc-xac',
  label: 'Bài 26. Gieo hai con xúc xắc',
  make(rand) {
    const s = int(rand, 3, 11);
    const k = 6 - Math.abs(s - 7);
    const list = [];
    for (let i = 1; i <= 6; i++) if (s - i >= 1 && s - i <= 6) list.push(`(${i}, ${s - i})`);
    return {
      prompt: `Gieo hai con xúc xắc cân đối. Tính xác suất của biến cố "Tổng số chấm xuất hiện bằng $${s}$".`,
      answer: k / 36,
      hints: ['$n(\\Omega) = 36$.', `Liệt kê các cặp $(i, j)$ có $i + j = ${s}$.`],
      steps: [
        '$n(\\Omega) = 6 \\cdot 6 = 36$.',
        `Các kết quả thuận lợi: ${list.join('; ')}, nên $n(E) = ${k}$.`,
        `$${probabilityTex(k, 36)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const CARD_SKILL = {
  id: 'rut-the',
  label: 'Bài 26. Rút thẻ số',
  make(rand) {
    const m = pick(rand, [20, 24, 25, 30, 36, 40, 50]);
    const d = int(rand, 3, 9);
    const k = Math.floor(m / d);
    return {
      prompt: `Một hộp có $${m}$ tấm thẻ đánh số từ $1$ đến $${m}$. Rút ngẫu nhiên một tấm thẻ. Tính xác suất để số ghi trên thẻ chia hết cho $${d}$.`,
      answer: k / m,
      hints: [
        `$n(\\Omega) = ${m}$.`,
        `Các bội của $${d}$ không vượt quá $${m}$ là $${d}, ${2 * d}, \\ldots$`,
      ],
      steps: [
        `$n(\\Omega) = ${m}$.`,
        `Các bội của $${d}$ từ $${d}$ đến $${k * d}$ có $${k}$ số, nên $n(E) = ${k}$.`,
        `$${probabilityTex(k, m)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const COMBINATION_SKILL = {
  id: 'to-hop',
  label: 'Bài 27. Dùng tổ hợp',
  make(rand) {
    const a = int(rand, 3, 7);
    const b = int(rand, 2, 6);
    const n = choose(a + b, 2);
    if (rand() < 0.5) {
      const k = choose(a, 2);
      return {
        prompt: `Một hộp có $${a}$ viên bi đỏ và $${b}$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất để cả hai viên bi đều màu đỏ.`,
        answer: k / n,
        hints: [`$n(\\Omega) = C_{${a + b}}^2$.`, `Chọn $2$ trong $${a}$ viên bi đỏ.`],
        steps: [
          `$n(\\Omega) = C_{${a + b}}^2 = ${n}$.`,
          `$n(E) = C_{${a}}^2 = ${k}$.`,
          `$${probabilityTex(k, n)}$.`,
        ],
      };
    }
    const k = a * b;
    return {
      prompt: `Một hộp có $${a}$ viên bi đỏ và $${b}$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất để lấy được hai viên bi khác màu.`,
      answer: k / n,
      hints: [
        `$n(\\Omega) = C_{${a + b}}^2$.`,
        'Chọn $1$ bi đỏ và $1$ bi xanh rồi dùng quy tắc nhân.',
      ],
      steps: [
        `$n(\\Omega) = C_{${a + b}}^2 = ${n}$.`,
        `$n(E) = C_{${a}}^1 \\cdot C_{${b}}^1 = ${a} \\cdot ${b} = ${k}$.`,
        `$${probabilityTex(k, n)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const COMPLEMENT_SKILL = {
  id: 'bien-co-doi',
  label: 'Bài 27. Dùng biến cố đối',
  make(rand) {
    if (rand() < 0.4) {
      const k = int(rand, 2, 5);
      const n = 2 ** k;
      return {
        prompt: `Tung một đồng xu cân đối $${k}$ lần liên tiếp. Tính xác suất của biến cố "Có ít nhất một lần xuất hiện mặt ngửa".`,
        answer: (n - 1) / n,
        hints: ['Biến cố đối là "Tất cả các lần đều xuất hiện mặt sấp".'],
        steps: [
          `$n(\\Omega) = 2^{${k}} = ${n}$.`,
          `Biến cố đối chỉ gồm một kết quả (toàn mặt sấp): $P(\\overline{E}) = \\dfrac{1}{${n}}$.`,
          `$P(E) = 1 - \\dfrac{1}{${n}} = \\dfrac{${n - 1}}{${n}}$.`,
        ],
      };
    }
    const a = int(rand, 2, 6);
    const b = int(rand, 3, 7);
    const k = int(rand, 2, 3);
    const n = choose(a + b, k);
    const none = choose(b, k);
    return {
      prompt: `Một hộp có $${a}$ viên bi đỏ và $${b}$ viên bi xanh. Lấy ngẫu nhiên đồng thời $${k}$ viên bi. Tính xác suất để có ít nhất $1$ viên bi đỏ.`,
      answer: (n - none) / n,
      hints: ['Biến cố đối là "Không có viên bi đỏ nào".', `$n(\\overline{E}) = C_{${b}}^{${k}}$.`],
      steps: [
        `$n(\\Omega) = C_{${a + b}}^{${k}} = ${n}$.`,
        `Biến cố đối "Không có bi đỏ": $n(\\overline{E}) = C_{${b}}^{${k}} = ${none}$.`,
        `$P(E) = 1 - P(\\overline{E}) = 1 - \\dfrac{${none}}{${n}}$, nên $${probabilityTex(n - none, n)}$.`,
      ],
    };
  },
};

export const CHAPTER_SKILLS = [
  SAMPLE_SPACE_SKILL,
  DICE_SKILL,
  CARD_SKILL,
  COMBINATION_SKILL,
  COMPLEMENT_SKILL,
];
