/**
 * Question generators for the chapter "Nguyên hàm và tích phân", one skill
 * per lesson, for the drill board of the chapter review. Every answer is an
 * integer or a fraction p/q, read with `readNumber` and written with
 * `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are
 * rich text.
 */

import { int, nonZero, pick } from '#lib/core/drill.js';
import { evaluate, polyTex, substituteTex } from '#lib/algebra-engine/polynomial.js';
import { texFrac } from '#lib/core/fractions.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A quadratic f(x) = 3p·x² + 2q·x + r whose antiderivative
 * G(x) = p·x³ + q·x² + r·x has whole coefficients. Coefficients ascend.
 * @param {() => number} rand
 */
export function quadraticWithWholePrimitive(rand) {
  const p = nonZero(rand, -2, 2);
  const q = int(rand, -3, 3);
  const r = int(rand, -5, 5);
  return { f: [r, 2 * q, 3 * p], G: [0, r, q, p] };
}

/**
 * A fraction n/d as TeX in lowest terms, or a whole number.
 * @param {number} n @param {number} d
 */
const valueTex = (n, d) => texFrac(n, d);

/**
 * A coefficient n/d written before a power of x: nothing when it is 1.
 * @param {number} n @param {number} d
 */
const coefTex = (n, d) => (n === d ? '' : texFrac(n, d));

/** @type {Skill} */
export const nguyenHam = {
  id: 'nguyen-ham',
  label: 'Bài 11. Nguyên hàm',
  make(rand) {
    const { f, G } = quadraticWithWholePrimitive(rand);
    const d = int(rand, -5, 5);
    const t = pick(rand, [-1, 1, 2]);
    const F = [d, ...G.slice(1)];
    const answer = evaluate(F, t);
    return {
      prompt: `Biết $F(x)$ là một nguyên hàm của $f(x) = ${polyTex(f)}$ và $F(0) = ${d}$. Tính $F(${t})$.`,
      answer,
      hints: [
        'Tìm họ nguyên hàm của từng số hạng: $\\int x^{\\alpha}\\,\\mathrm{d}x = \\dfrac{x^{\\alpha+1}}{\\alpha+1} + C$.',
        'Thay $x = 0$ để tìm hằng số $C$.',
      ],
      steps: [
        `$F(x) = ${polyTex(G)} + C$.`,
        `$F(0) = C = ${d}$, nên $F(x) = ${polyTex(F)}$.`,
        `$F(${t}) = ${substituteTex(F, t)} = ${answer}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const tichPhan = {
  id: 'tich-phan',
  label: 'Bài 12. Tích phân',
  make(rand) {
    const { f, G } = quadraticWithWholePrimitive(rand);
    const a = int(rand, -1, 1);
    const b = a + int(rand, 1, 2);
    const answer = evaluate(G, b) - evaluate(G, a);
    return {
      prompt: `Tính $\\displaystyle\\int_{${a}}^{${b}} (${polyTex(f)})\\,\\mathrm{d}x$.`,
      answer,
      hints: [
        'Tìm một nguyên hàm $F(x)$ của hàm số dưới dấu tích phân.',
        'Dùng công thức Newton – Leibniz: tích phân bằng $F(b) - F(a)$.',
      ],
      steps: [
        `Một nguyên hàm là $F(x) = ${polyTex(G)}$.`,
        `$F(${b}) = ${evaluate(G, b)}$, $F(${a}) = ${evaluate(G, a)}$.`,
        `Tích phân bằng $${evaluate(G, b)} - (${evaluate(G, a)}) = ${answer}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const dienTich = {
  id: 'dien-tich',
  label: 'Bài 13. Diện tích hình phẳng',
  make(rand) {
    const k = int(rand, 1, 4);
    if (rand() < 0.5) {
      // Between y = x² and y = kx: S = ∫₀ᵏ (kx − x²) dx = k³/6.
      const line = k === 1 ? 'x' : `${k}x`;
      return {
        prompt: `Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2$ và đường thẳng $y = ${line}$ (nhập số nguyên hoặc phân số).`,
        answer: k ** 3 / 6,
        hints: [
          `Hoành độ giao điểm: $x^2 = ${line} \\iff x = 0$ hoặc $x = ${k}$.`,
          `Trên $[0; ${k}]$ đường thẳng nằm trên parabol: $S = \\displaystyle\\int_0^{${k}} (${line} - x^2)\\,\\mathrm{d}x$.`,
        ],
        steps: [
          `Hai đường cắt nhau tại $x = 0$ và $x = ${k}$.`,
          `$S = \\displaystyle\\int_0^{${k}} (${line} - x^2)\\,\\mathrm{d}x = \\left(${coefTex(k, 2)}x^2 - \\dfrac{x^3}{3}\\right)\\Big|_0^{${k}}$.`,
          `$S = ${texFrac(k ** 3, 2)} - ${texFrac(k ** 3, 3)} = ${valueTex(k ** 3, 6)}$.`,
        ],
      };
    }
    // Between y = x² − k² and the x-axis: S = ∫ (k² − x²) dx on [−k; k] = 4k³/3.
    const k2 = k * k;
    return {
      prompt: `Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2 - ${k2}$ và trục hoành (nhập số nguyên hoặc phân số).`,
      answer: (4 * k ** 3) / 3,
      hints: [
        `Parabol cắt trục hoành tại $x = -${k}$ và $x = ${k}$.`,
        `Trên $[-${k}; ${k}]$ parabol nằm dưới trục hoành: $S = \\displaystyle\\int_{-${k}}^{${k}} (${k2} - x^2)\\,\\mathrm{d}x$.`,
      ],
      steps: [
        `$x^2 - ${k2} = 0 \\iff x = \\pm ${k}$.`,
        `$S = \\displaystyle\\int_{-${k}}^{${k}} (${k2} - x^2)\\,\\mathrm{d}x = \\left(${k2}x - \\dfrac{x^3}{3}\\right)\\Big|_{-${k}}^{${k}}$.`,
        `$S = 2\\left(${k ** 3} - ${texFrac(k ** 3, 3)}\\right) = ${valueTex(4 * k ** 3, 3)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const theTich = {
  id: 'the-tich',
  label: 'Bài 13. Thể tích khối tròn xoay',
  make(rand) {
    const h = int(rand, 1, 3);
    if (rand() < 0.5) {
      // y = mx on [0; h]: V = π m² h³ / 3.
      const m = int(rand, 1, 2);
      const line = m === 1 ? 'x' : `${m}x`;
      const m2 = m * m;
      return {
        prompt: `Quay hình phẳng giới hạn bởi đường thẳng $y = ${line}$, trục hoành và đường thẳng $x = ${h}$ quanh trục $Ox$. Thể tích khối tròn xoay là $V = k\\pi$. Tìm $k$.`,
        answer: (m2 * h ** 3) / 3,
        hints: [
          'Dùng $V = \\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$.',
          `Ở đây $f^2(x) = ${m2 === 1 ? '' : m2}x^2$, cận từ $0$ đến $${h}$.`,
        ],
        steps: [
          `$V = \\pi\\displaystyle\\int_0^{${h}} ${m2 === 1 ? '' : m2}x^2\\,\\mathrm{d}x = \\pi \\cdot ${texFrac(m2, 3)}x^3\\Big|_0^{${h}}$.`,
          `$V = ${valueTex(m2 * h ** 3, 3)}\\pi$, nên $k = ${valueTex(m2 * h ** 3, 3)}$.`,
        ],
      };
    }
    // y = √x on [0; h]: V = π h² / 2.
    return {
      prompt: `Quay hình phẳng giới hạn bởi đồ thị $y = \\sqrt{x}$, trục hoành và đường thẳng $x = ${h}$ quanh trục $Ox$. Thể tích khối tròn xoay là $V = k\\pi$. Tìm $k$.`,
      answer: h ** 2 / 2,
      hints: [
        'Dùng $V = \\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$.',
        '$(\\sqrt{x})^2 = x$.',
      ],
      steps: [
        `$V = \\pi\\displaystyle\\int_0^{${h}} x\\,\\mathrm{d}x = \\pi \\cdot \\dfrac{x^2}{2}\\Big|_0^{${h}}$.`,
        `$V = ${valueTex(h ** 2, 2)}\\pi$, nên $k = ${valueTex(h ** 2, 2)}$.`,
      ],
    };
  },
};

/** The four skills of the chapter review, in book order. */
export const CHAPTER_SKILLS = [nguyenHam, tichPhan, dienTich, theTich];
