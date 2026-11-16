/**
 * Question generators for the chapter "Dãy số. Cấp số cộng và cấp số nhân",
 * one skill per lesson, for the drill board of its review lesson. Every
 * answer is an integer or a fraction p/q, read with `readNumber` and written
 * with `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are
 * rich text.
 */

import { int, nonZero, pick } from '#lib/core/drill.js';
import { arithmeticSum, arithmeticTerm, geometricSum, geometricTerm, termTex } from './sequence.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * TeX of a·n + b with the book's signs: '3n - 2', '-n + 5', '2n'.
 * @param {number} a @param {number} b @param {string} [v]
 */
export function linearTex(a, b, v = 'n') {
  const lead = a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`;
  if (b === 0) return lead;
  return `${lead} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
}

/**
 * TeX of a·k + b worked out at a number k: '3 \\cdot 4 - 2', '-4 + 5'.
 * @param {number} a @param {number} b @param {number} k
 */
function atTex(a, b, k) {
  const lead = a === 1 ? `${k}` : a === -1 ? `-${k}` : `${a} \\cdot ${k}`;
  return b === 0 ? lead : `${lead} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
}

/**
 * ' + 3' or ' - \\dfrac{1}{4}': a signed term to append, as TeX.
 * @param {number} x
 */
const signed = (x) => ` ${x < 0 ? '-' : '+'} ${termTex(Math.abs(x))}`;

/** @param {number} x a number in brackets when negative, as TeX */
const op = (x) => (x < 0 ? `(${termTex(x)})` : termTex(x));

/** @type {Skill} */
export const daySo = {
  id: 'day-so',
  label: 'Bài 5. Dãy số',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = nonZero(rand, -4, 5);
      const b = int(rand, -5, 5);
      const c = int(rand, 1, 3);
      const d = int(rand, 1, 5);
      const k = int(rand, 2, 9);
      const top = a * k + b;
      const bottom = c * k + d;
      return {
        prompt: `Cho dãy số $(u_n)$ với $u_n = \\dfrac{${linearTex(a, b)}}{${linearTex(c, d)}}$. Tính $u_{${k}}$ (nhập số nguyên hoặc phân số $p/q$).`,
        answer: top / bottom,
        steps: [
          `Thay $n = ${k}$: $u_{${k}} = \\dfrac{${atTex(a, b, k)}}{${atTex(c, d, k)}} = \\dfrac{${top}}{${bottom}}$.`,
          `Rút gọn: $u_{${k}} = ${termTex(top / bottom)}$.`,
        ],
        hints: [`Thay $n = ${k}$ vào công thức số hạng tổng quát.`],
      };
    }
    if (variant === 1) {
      const u1 = int(rand, -3, 4);
      const p = pick(rand, [2, 3, -2]);
      const c = nonZero(rand, -3, 3);
      const k = 4;
      const terms = [u1];
      for (let i = 1; i < k; i++) terms.push(p * terms[i - 1] + c);
      return {
        prompt: `Cho dãy số $(u_n)$ xác định bởi $u_1 = ${u1}$ và $u_n = ${linearTex(p, c, 'u_{n-1}')}$ với $n \\ge 2$. Tính $u_{${k}}$.`,
        answer: terms[k - 1],
        steps: terms
          .slice(1)
          .map(
            (t, i) =>
              `$u_{${i + 2}} = ${p} \\cdot ${op(terms[i])} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${t}$.`,
          ),
        hints: ['Tính lần lượt $u_2$, $u_3$ rồi $u_4$ từ số hạng đứng ngay trước.'],
      };
    }
    // the smallest term of u_n = n^2 + b n + c
    const m = int(rand, 2, 6);
    const half = pick(rand, [0, 0.5]);
    const b = -2 * m - 2 * half; // vertex at n = m + half
    const c = nonZero(rand, -10, 10);
    const value = m * m + b * m + c;
    return {
      prompt: `Dãy số $(u_n)$ với $u_n = n^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}n ${c < 0 ? '-' : '+'} ${Math.abs(c)}$ bị chặn dưới. Tìm số hạng nhỏ nhất của dãy.`,
      answer: value,
      steps: half
        ? [
            `$u_n = \\left(n - ${termTex(m + half)}\\right)^2${signed(c - (m + half) ** 2)}$, nhỏ nhất khi $n$ là số nguyên dương gần $${termTex(m + half)}$ nhất: $n = ${m}$ hoặc $n = ${m + 1}$.`,
            `$u_{${m}} = u_{${m + 1}} = ${value}$.`,
          ]
        : [
            `$u_n = (n - ${m})^2${signed(c - m * m)} \\ge ${c - m * m}$, dấu bằng khi $n = ${m}$.`,
            `Số hạng nhỏ nhất là $u_{${m}} = ${value}$.`,
          ],
      hints: ['Viết $n^2 + bn$ thành bình phương của một hiệu cộng một hằng số.'],
    };
  },
};

/** @type {Skill} */
export const capSoCong = {
  id: 'cap-so-cong',
  label: 'Bài 6. Cấp số cộng',
  make(rand) {
    const variant = int(rand, 0, 3);
    const u1 = int(rand, -9, 12);
    const d = nonZero(rand, -5, 6);
    if (variant === 0) {
      const k = int(rand, 8, 30);
      const v = arithmeticTerm(u1, d, k);
      return {
        prompt: `Cho cấp số cộng $(u_n)$ có $u_1 = ${u1}$ và công sai $d = ${d}$. Tính $u_{${k}}$.`,
        answer: v,
        steps: [`$u_{${k}} = u_1 + ${k - 1}d = ${u1} + ${k - 1} \\cdot ${op(d)} = ${v}$.`],
        hints: ['Dùng $u_n = u_1 + (n - 1)d$.'],
      };
    }
    if (variant === 1) {
      const i = int(rand, 2, 5);
      const j = i + int(rand, 2, 6);
      const a = arithmeticTerm(u1, d, i);
      const b = arithmeticTerm(u1, d, j);
      return {
        prompt: `Cấp số cộng $(u_n)$ có $u_{${i}} = ${a}$ và $u_{${j}} = ${b}$. Tìm số hạng đầu $u_1$.`,
        answer: u1,
        steps: [
          `$u_{${j}} - u_{${i}} = ${j - i}d$, nên $${j - i}d = ${b} - ${op(a)} = ${b - a}$ và $d = ${d}$.`,
          `$u_1 = u_{${i}} - ${i - 1}d = ${a} - ${i - 1} \\cdot ${op(d)} = ${u1}$.`,
        ],
        hints: [`Từ $u_{${i}}$ đến $u_{${j}}$ phải cộng công sai $${j - i}$ lần.`],
      };
    }
    if (variant === 2) {
      const n = int(rand, 6, 25);
      const un = arithmeticTerm(u1, d, n);
      const s = arithmeticSum(u1, d, n);
      return {
        prompt: `Tính tổng $${n}$ số hạng đầu của cấp số cộng có $u_1 = ${u1}$ và $d = ${d}$.`,
        answer: s,
        steps: [
          `$u_{${n}} = ${u1} + ${n - 1} \\cdot ${op(d)} = ${un}$.`,
          `$S_{${n}} = \\dfrac{${n}(u_1 + u_{${n}})}{2} = \\dfrac{${n} \\cdot ${op(u1 + un)}}{2} = ${s}$.`,
        ],
        hints: ['Dùng $S_n = \\dfrac{n(u_1 + u_n)}{2}$; tính $u_n$ trước.'],
      };
    }
    const left = int(rand, -10, 10);
    const gap = nonZero(rand, -6, 6);
    const mid = left + gap;
    const right = mid + gap;
    return {
      prompt: `Ba số $x$, $${mid}$, $${right}$ theo thứ tự đó lập thành một cấp số cộng. Tìm $x$.`,
      answer: left,
      steps: [
        `Số hạng giữa là trung bình cộng của hai số hạng kề nó: $${mid} = \\dfrac{x + ${op(right)}}{2}$.`,
        `$x = 2 \\cdot ${op(mid)} - ${op(right)} = ${left}$.`,
      ],
      hints: ['$u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}$.'],
    };
  },
};

/** @type {Skill} */
export const capSoNhan = {
  id: 'cap-so-nhan',
  label: 'Bài 7. Cấp số nhân',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const u1 = nonZero(rand, -5, 6);
      const q = pick(rand, [2, 3, -2, -3, 0.5, -0.5]);
      const k = Math.abs(q) === 3 ? int(rand, 3, 6) : int(rand, 3, 8);
      const v = geometricTerm(u1, q, k);
      return {
        prompt: `Cho cấp số nhân $(u_n)$ có $u_1 = ${u1}$ và công bội $q = ${termTex(q)}$. Tính $u_{${k}}$ (nhập số nguyên hoặc phân số $p/q$).`,
        answer: v,
        steps: [
          `$u_{${k}} = u_1 q^{${k - 1}} = ${u1} \\cdot \\left(${termTex(q)}\\right)^{${k - 1}} = ${termTex(v)}$.`,
        ],
        hints: ['Dùng $u_n = u_1 q^{n-1}$.'],
      };
    }
    if (variant === 1) {
      const u1 = int(rand, 1, 5);
      const q = pick(rand, [2, 3, -2]);
      const n = q === 3 ? int(rand, 3, 6) : int(rand, 4, 8);
      const s = geometricSum(u1, q, n);
      return {
        prompt: `Tính tổng $${n}$ số hạng đầu của cấp số nhân có $u_1 = ${u1}$ và $q = ${q}$.`,
        answer: s,
        steps: [
          `$q^{${n}} = ${op(q)}^{${n}} = ${q ** n}$.`,
          `$S_{${n}} = \\dfrac{u_1(1 - q^{${n}})}{1 - q} = \\dfrac{${u1}(1 - ${op(q ** n)})}{1 - ${op(q)}} = ${s}$.`,
        ],
        hints: ['Dùng $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$.'],
      };
    }
    if (variant === 2) {
      const u1 = nonZero(rand, -4, 4);
      const q = pick(rand, [2, 3, -2, -3]);
      const i = int(rand, 1, 3);
      const j = i + pick(rand, [1, 3]); // an odd gap fixes the sign of q
      const a = geometricTerm(u1, q, i);
      const b = geometricTerm(u1, q, j);
      return {
        prompt: `Cấp số nhân $(u_n)$ có $u_{${i}} = ${a}$ và $u_{${j}} = ${b}$. Tìm công bội $q$.`,
        answer: q,
        steps: [
          `$\\dfrac{u_{${j}}}{u_{${i}}} = q^{${j - i}}$, nên $q^{${j - i}} = \\dfrac{${b}}{${a}} = ${q ** (j - i)}$.`,
          `Vậy $q = ${q}$.`,
        ],
        hints: [`Chia $u_{${j}}$ cho $u_{${i}}$.`],
      };
    }
    const a = pick(rand, [1, 2, 3, 4]);
    const q = pick(rand, [2, 3, 4]);
    const sign = pick(rand, [1, -1]);
    const mid = a * q * sign;
    const right = a * q * q;
    return {
      prompt: `Ba số $x$, $${mid}$, $${right}$ theo thứ tự đó lập thành một cấp số nhân. Tìm $x$.`,
      answer: a,
      steps: [
        `Theo tính chất cấp số nhân: $${op(mid)}^2 = x \\cdot ${right}$.`,
        `$x = \\dfrac{${mid * mid}}{${right}} = ${a}$.`,
      ],
      hints: ['$u_k^2 = u_{k-1} \\cdot u_{k+1}$.'],
    };
  },
};

/** The chapter's three skills, in book order. */
export const CHAPTER_SKILLS = [daySo, capSoCong, capSoNhan];
