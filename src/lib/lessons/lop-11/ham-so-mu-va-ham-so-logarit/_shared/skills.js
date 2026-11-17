/**
 * Question generators for the chapter "Hàm số mũ và hàm số lôgarit", one
 * skill per lesson, for the drill board of the chapter review. Every answer
 * is an integer or a fraction p/q, read with `readNumber` and written with
 * `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are
 * rich text.
 */

import { int, nonZero, pick } from '#lib/core/drill.js';
import { exactValueTex } from './values.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * An exact rational value as TeX.
 * @param {number} v
 */
export function valueTex(v) {
  const t = exactValueTex(v);
  if (t === null) throw new Error(`not a fraction: ${v}`);
  return t;
}

/**
 * A linear expression px + q as TeX: '2x - 3', 'x + 1', '-x'.
 * @param {number} p @param {number} q
 */
export function linTex(p, q) {
  const head = p === 1 ? 'x' : p === -1 ? '-x' : `${p}x`;
  if (q === 0) return head;
  return `${head} ${q < 0 ? '-' : '+'} ${Math.abs(q)}`;
}

/** @type {Skill} */
export const luythua = {
  id: 'luy-thua',
  label: 'Bài 18. Luỹ thừa với số mũ thực',
  make(rand) {
    if (int(rand, 0, 1) === 0) {
      // (kⁿ)^(m/n) = kᵐ
      const k = pick(rand, [2, 3]);
      const n = pick(rand, [2, 3]);
      const m = pick(
        rand,
        [-2, -1, 1, 2, 3].filter((x) => x % n !== 0),
      );
      const base = k ** n;
      const sign = m < 0 ? '-' : '';
      const answer = k ** m;
      return {
        prompt: `Tính $${base}^{${sign}\\frac{${Math.abs(m)}}{${n}}}$ (nhập số nguyên hoặc phân số $p/q$).`,
        answer,
        hints: [`Viết $${base} = ${k}^{${n}}$.`],
        steps: [
          `$${base}^{${sign}\\frac{${Math.abs(m)}}{${n}}} = \\left(${k}^{${n}}\\right)^{${sign}\\frac{${Math.abs(m)}}{${n}}} = ${k}^{${m}}$.`,
          `$${k}^{${m}} = ${valueTex(answer)}$.`,
        ],
      };
    }
    // 2^p · 2^q : 2^r with the exponent sum in [−3; 5]
    const p = int(rand, -3, 6);
    const q = int(rand, -3, 6);
    const e = int(rand, -3, 5);
    const r = p + q - e;
    const answer = 2 ** e;
    return {
      prompt: `Tính $\\dfrac{2^{${p}} \\cdot 2^{${q}}}{2^{${r}}}$ (nhập số nguyên hoặc phân số $p/q$).`,
      answer,
      hints: ['Nhân thì cộng số mũ, chia thì trừ số mũ.'],
      steps: [
        `Số mũ: $${p} + ${q < 0 ? `(${q})` : q} - ${r < 0 ? `(${r})` : r} = ${e}$.`,
        `$2^{${e}} = ${valueTex(answer)}$.`,
      ],
    };
  },
};

/** Pairs of positive integers whose product is 6ᵏ. */
const SIX_PAIRS = [
  [4, 9, 2],
  [2, 18, 2],
  [3, 12, 2],
  [8, 27, 3],
  [4, 54, 3],
  [12, 18, 3],
];

/** @type {Skill} */
export const logarit = {
  id: 'logarit',
  label: 'Bài 19. Lôgarit',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = pick(rand, [2, 3, 5]);
      const k = nonZero(rand, -3, 4);
      const b = valueTex(a ** k);
      return {
        prompt: `Tính $\\log_{${a}} ${b}$.`,
        answer: k,
        hints: [`Tìm số mũ $\\alpha$ để $${a}^\\alpha = ${b}$.`],
        steps: [`$${a}^{${k}} = ${b}$ nên $\\log_{${a}} ${b} = ${k}$.`],
      };
    }
    if (variant === 1) {
      const [m, n, k] = pick(rand, SIX_PAIRS);
      return {
        prompt: `Tính $\\log_6 ${m} + \\log_6 ${n}$.`,
        answer: k,
        hints: ['Tổng hai lôgarit cùng cơ số bằng lôgarit của tích.'],
        steps: [
          `$\\log_6 ${m} + \\log_6 ${n} = \\log_6 (${m} \\cdot ${n}) = \\log_6 ${m * n}$.`,
          `$6^{${k}} = ${m * n}$ nên kết quả là $${k}$.`,
        ],
      };
    }
    const a = pick(rand, [2, 3]);
    const p = pick(rand, [2, 3]);
    const q = pick(
      rand,
      [1, 2, 4, 5].filter((x) => x % p !== 0),
    );
    return {
      prompt: `Tính $\\log_{${a ** p}} ${a ** q}$ (nhập phân số $p/q$).`,
      answer: q / p,
      hints: [`Đổi sang cơ số $${a}$.`],
      steps: [
        `$\\log_{${a ** p}} ${a ** q} = \\dfrac{\\log_{${a}} ${a ** q}}{\\log_{${a}} ${a ** p}} = \\dfrac{${q}}{${p}}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const hamso = {
  id: 'ham-so-mu-logarit',
  label: 'Bài 20. Hàm số mũ và hàm số lôgarit',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = pick(rand, [2, 3, 4, 5]);
      const k = pick(rand, [2, 3]);
      return {
        prompt: `Đồ thị hàm số $y = a^x$ ($a > 0$, $a \\ne 1$) đi qua điểm $(${k}; ${a ** k})$. Tìm $a$.`,
        answer: a,
        hints: [`Thay toạ độ điểm: $a^{${k}} = ${a ** k}$.`],
        steps: [`$a^{${k}} = ${a ** k}$ và $a > 0$ nên $a = ${a}$.`],
      };
    }
    if (variant === 1) {
      const a = pick(rand, [2, 3, 4, 5]);
      const k = pick(rand, [2, 3]);
      return {
        prompt: `Đồ thị hàm số $y = \\log_a x$ ($a > 0$, $a \\ne 1$) đi qua điểm $(${a ** k}; ${k})$. Tìm $a$.`,
        answer: a,
        hints: [`$\\log_a ${a ** k} = ${k} \\iff a^{${k}} = ${a ** k}$.`],
        steps: [`$\\log_a ${a ** k} = ${k} \\iff a^{${k}} = ${a ** k} \\iff a = ${a}$.`],
      };
    }
    const p = int(rand, 1, 4);
    const q = nonZero(rand, -8, 8);
    return {
      prompt: `Tập xác định của hàm số $y = \\log_2 (${linTex(p, -q)})$ là $(m; +\\infty)$. Tìm $m$ (nhập số nguyên hoặc phân số $p/q$).`,
      answer: q / p,
      hints: ['Biểu thức dưới dấu lôgarit phải dương.'],
      steps: [
        `$${linTex(p, -q)} > 0 \\iff x > ${valueTex(q / p)}$.`,
        `Vậy $m = ${valueTex(q / p)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const phuongtrinh = {
  id: 'phuong-trinh-mu-logarit',
  label: 'Bài 21. Phương trình, bất phương trình mũ và lôgarit',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = pick(rand, [2, 3]);
      const p = pick(rand, [1, 2, 3]);
      const q = int(rand, -3, 3);
      const r = int(rand, -2, 4);
      const right = valueTex(a ** r);
      const answer = (r - q) / p;
      return {
        prompt: `Giải phương trình $${a}^{${linTex(p, q)}} = ${right}$ (nhập nghiệm dạng số nguyên hoặc phân số $p/q$).`,
        answer,
        hints: [`Viết $${right} = ${a}^{${r}}$.`],
        steps: [
          `$${a}^{${linTex(p, q)}} = ${a}^{${r}} \\iff ${linTex(p, q)} = ${r}$.`,
          `$x = ${valueTex(answer)}$.`,
        ],
      };
    }
    if (variant === 1) {
      const a = pick(rand, [2, 3]);
      const k = int(rand, 1, a === 2 ? 4 : 3);
      const p = pick(rand, [1, 2]);
      const q = int(rand, -5, 5);
      const answer = (a ** k - q) / p;
      return {
        prompt: `Giải phương trình $\\log_{${a}} (${linTex(p, q)}) = ${k}$ (nhập nghiệm dạng số nguyên hoặc phân số $p/q$).`,
        answer,
        hints: [`$\\log_a u = b \\iff u = a^b$, với $u > 0$.`],
        steps: [
          `Điều kiện $${linTex(p, q)} > 0$.`,
          `$${linTex(p, q)} = ${a}^{${k}} = ${a ** k} \\iff x = ${valueTex(answer)}$, thoả mãn điều kiện.`,
        ],
      };
    }
    const k = int(rand, 1, 4);
    return {
      prompt: `Tìm số nguyên $x$ lớn nhất thoả mãn $\\left(\\dfrac{1}{2}\\right)^x > ${2 ** k}$.`,
      answer: -k - 1,
      hints: [
        'Cơ số nhỏ hơn $1$: bỏ cơ số thì đổi chiều.',
        `$${2 ** k} = \\left(\\dfrac{1}{2}\\right)^{-${k}}$.`,
      ],
      steps: [
        `$\\left(\\dfrac{1}{2}\\right)^x > \\left(\\dfrac{1}{2}\\right)^{-${k}} \\iff x < -${k}$ vì $0 < \\dfrac{1}{2} < 1$.`,
        `Số nguyên lớn nhất nhỏ hơn $-${k}$ là $${-k - 1}$.`,
      ],
    };
  },
};

/** The four skills of the chapter, in lesson order. */
export const CHAPTER_SKILLS = [luythua, logarit, hamso, phuongtrinh];
