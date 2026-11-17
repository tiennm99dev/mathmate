/**
 * Drill skills of the chapter "Hàm số, đồ thị và ứng dụng" for the
 * end-of-chapter review: the domain of a square-root function, the vertex
 * and the extreme value of a quadratic function, counting the integer
 * solutions of a quadratic inequality, and the two kinds of equation with a
 * square root (with one extraneous candidate to throw out).
 */

import { linTex } from '#lib/core/algebra-text.js';
import { int, nonZero, pick, retryMake } from '#lib/core/drill.js';
import { quadAt, quadTex } from './quadratic.js';

/**
 * A number in TeX with brackets when negative, for substitutions.
 * @param {number} v
 */
const op = (v) => (v < 0 ? `(${v})` : `${v}`);

/** @type {import('#lib/core/drill.js').Skill} */
export const DOMAIN_SKILL = {
  id: 'tap-xac-dinh',
  label: 'Bài 15. Tập xác định',
  make(rand) {
    const k = pick(rand, [1, 2, 3, 4]);
    const p = nonZero(rand, -6, 6);
    const tex = linTex(k, -k * p);
    return {
      prompt: `Tập xác định của hàm số $y = \\sqrt{${tex}}$ có dạng $[p; +\\infty)$. Tìm $p$.`,
      answer: p,
      steps: [
        `Hàm số xác định khi $${tex} \\ge 0$.`,
        `$${k === 1 ? '' : k}x \\ge ${k * p}$${k === 1 ? '' : `, tức là $x \\ge ${p}$`}.`,
        `Vậy $D = [${p}; +\\infty)$ và $p = ${p}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const VERTEX_SKILL = {
  id: 'dinh-parabol',
  label: 'Bài 16. Đỉnh của parabol',
  make(rand) {
    const a = nonZero(rand, -3, 3);
    const h = nonZero(rand, -4, 4);
    const b = -2 * a * h;
    const c = int(rand, -9, 9);
    return {
      prompt: `Tìm hoành độ đỉnh của parabol $y = ${quadTex(a, b, c)}$.`,
      answer: h,
      steps: [
        'Hoành độ đỉnh là $x_S = -\\dfrac{b}{2a}$.',
        `$x_S = -\\dfrac{${b}}{2 \\cdot ${op(a)}} = ${h}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const EXTREME_SKILL = {
  id: 'gia-tri-lon-nhat-nho-nhat',
  label: 'Bài 16. Giá trị lớn nhất, nhỏ nhất',
  make(rand) {
    const a = pick(rand, [-2, -1, 1, 2]);
    const h = int(rand, -3, 3);
    const k = int(rand, -9, 9);
    const b = -2 * a * h;
    const c = a * h * h + k;
    const word = a > 0 ? 'nhỏ nhất' : 'lớn nhất';
    return {
      prompt: `Tìm giá trị ${word} của hàm số $y = ${quadTex(a, b, c)}$.`,
      answer: k,
      steps: [
        `$a = ${a} ${a > 0 ? '> 0' : '< 0'}$ nên hàm số đạt giá trị ${word} tại đỉnh.`,
        `Hoành độ đỉnh $x_S = -\\dfrac{${b}}{2 \\cdot ${op(a)}} = ${h}$.`,
        `Giá trị ${word} là $y(${h}) = ${k}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const INEQUALITY_SKILL = {
  id: 'bat-phuong-trinh-bac-hai',
  label: 'Bài 17. Bất phương trình bậc hai',
  make(rand) {
    const r1 = int(rand, -5, 3);
    const r2 = r1 + int(rand, 2, 6);
    const a = pick(rand, [-1, 1]);
    const strict = rand() < 0.5;
    // a > 0: f ≤ 0 (or < 0) between the roots; a < 0: f ≥ 0 (or > 0) there.
    const rel = a > 0 ? (strict ? '<' : '\\le') : strict ? '>' : '\\ge';
    const b = -a * (r1 + r2);
    const c = a * r1 * r2;
    const count = strict ? r2 - r1 - 1 : r2 - r1 + 1;
    const set = strict ? `(${r1}; ${r2})` : `[${r1}; ${r2}]`;
    return {
      prompt: `Bất phương trình $${quadTex(a, b, c)} ${rel} 0$ có bao nhiêu nghiệm nguyên?`,
      answer: count,
      steps: [
        `Tam thức có hai nghiệm $x_1 = ${r1}$, $x_2 = ${r2}$ và $a = ${a}$.`,
        `Trong khoảng hai nghiệm tam thức trái dấu với $a$, nên tập nghiệm là $${set}$.`,
        `Các số nguyên trong đó: từ $${strict ? r1 + 1 : r1}$ đến $${strict ? r2 - 1 : r2}$, có $${count}$ số.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const ROOT_LINE_SKILL = {
  id: 'can-bang-bac-nhat',
  label: 'Bài 18. Dạng √(ax² + bx + c) = dx + e',
  make(rand) {
    return retryMake(() => {
      const e = int(rand, -4, 4);
      const r1 = int(rand, -e, -e + 5);
      const r2 = int(rand, -e - 6, -e - 1);
      // Radicand (x + e)² + (x − r1)(x − r2): it equals (x + e)² at both roots.
      const A = 2;
      const B = 2 * e - r1 - r2;
      const C = e * e + r1 * r2;
      if (quadAt(A, B, C, r1) < 0 || r1 === r2) return null;
      const right = linTex(1, e);
      return {
        prompt: `Giải phương trình $\\sqrt{${quadTex(A, B, C)}} = ${right}$.`,
        answer: r1,
        hints: [
          'Bình phương hai vế rồi giải phương trình bậc hai nhận được.',
          'Thử lại từng giá trị: vế phải phải không âm.',
        ],
        steps: [
          `Bình phương hai vế: $${quadTex(A, B, C)} = (${right})^2$, tức là $${quadTex(1, -(r1 + r2), r1 * r2)} = 0$.`,
          `Phương trình này có nghiệm $x = ${r1}$ và $x = ${r2}$.`,
          `Thử lại: $x = ${r2}$ làm vế phải bằng $${r2 + e} < 0$, loại; $x = ${r1}$ làm hai vế cùng bằng $${r1 + e}$, nhận.`,
        ],
      };
    });
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const ROOT_ROOT_SKILL = {
  id: 'can-bang-can',
  label: 'Bài 18. Dạng √(ax² + bx + c) = √(dx² + ex + f)',
  make(rand) {
    return retryMake(() => {
      const r1 = int(rand, -4, 4);
      const r2 = int(rand, -4, 4);
      const m = int(rand, -4, 4);
      const n = int(rand, -8, 4);
      if (r1 === r2) return null;
      const f = /** @type {[number, number, number]} */ ([1, m, n]);
      // f(r1) ≥ 0 keeps r1; f(r2) < 0 makes r2 extraneous.
      if (quadAt(1, m, n, r1) < 0 || quadAt(1, m, n, r2) >= 0) return null;
      const g = /** @type {[number, number, number]} */ ([2, m - r1 - r2, n + r1 * r2]);
      return {
        prompt: `Giải phương trình $\\sqrt{${quadTex(...f)}} = \\sqrt{${quadTex(...g)}}$.`,
        answer: r1,
        hints: [
          'Bình phương hai vế rồi giải phương trình bậc hai nhận được.',
          'Thử lại: biểu thức dưới dấu căn phải không âm.',
        ],
        steps: [
          `Bình phương hai vế và thu gọn: $${quadTex(1, -(r1 + r2), r1 * r2)} = 0$, nên $x = ${r1}$ hoặc $x = ${r2}$.`,
          `Thử lại $x = ${r2}$: $${quadTex(...f)}$ bằng $${quadAt(1, m, n, r2)} < 0$, căn không xác định, loại.`,
          `Thử lại $x = ${r1}$: hai vế cùng bằng $\\sqrt{${quadAt(1, m, n, r1)}}$, nhận.`,
        ],
      };
    });
  },
};

/** Every skill of the chapter, in lesson order. */
export const CHAPTER_SKILLS = [
  DOMAIN_SKILL,
  VERTEX_SKILL,
  EXTREME_SKILL,
  INEQUALITY_SKILL,
  ROOT_LINE_SKILL,
  ROOT_ROOT_SKILL,
];
