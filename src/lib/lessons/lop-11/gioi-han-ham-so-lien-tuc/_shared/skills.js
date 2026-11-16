/**
 * Question generators for the chapter "Giới hạn. Hàm số liên tục", one
 * skill per lesson, for the drill board of the chapter review. Every answer
 * is an integer or a fraction p/q, read with `readNumber` and written with
 * `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are
 * rich text.
 */

import { int, nonZero, pick } from '#lib/core/drill.js';
import { toFraction } from '#lib/core/fractions.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A rational value as TeX: '3', '-2', '\\dfrac{3}{2}', '-\\dfrac{1}{4}'.
 * @param {number} v
 */
export function valueTex(v) {
  const f = toFraction(v);
  if (!f) throw new Error(`not a fraction: ${v}`);
  const sign = f.n < 0 ? '-' : '';
  return f.d === 1 ? `${f.n}` : `${sign}\\dfrac{${Math.abs(f.n)}}{${f.d}}`;
}

/**
 * TeX of a polynomial from its coefficients, highest power first, with the
 * book's signs: [2, -1, 0] in x gives '2x^2 - x'.
 * @param {number[]} coeffs
 * @param {string} [v]
 */
export function polyTex(coeffs, v = 'x') {
  const deg = coeffs.length - 1;
  let out = '';
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const p = deg - i;
    const power = p === 0 ? '' : p === 1 ? v : `${v}^${p}`;
    const size = Math.abs(c);
    const body = p > 0 && size === 1 ? power : `${size}${power}`;
    if (out === '') out = c < 0 ? `-${body}` : body;
    else out += ` ${c < 0 ? '-' : '+'} ${body}`;
  });
  return out === '' ? '0' : out;
}

/** @param {number} r 'x - 2', 'x + 3', 'x' */
const minusTex = (r) => polyTex([1, -r]);

/** @type {Skill} */
export const dayso = {
  id: 'gioi-han-day-so',
  label: 'Bài 15. Giới hạn của dãy số',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const a = nonZero(rand, -5, 5);
      const b = int(rand, -6, 6);
      const c = int(rand, -6, 6);
      const d = int(rand, 1, 6);
      const f = int(rand, 1, 6);
      // Every term must exist: redraw e until dn² + en + f ≠ 0 for every
      // n ≥ 1. A whole root n has dn² = −en − f < |e|n, so n < |e| ≤ 6.
      let e = int(rand, -6, 6);
      const vanishes = () =>
        Array.from({ length: 6 }, (_, i) => i + 1).some((n) => d * n * n + e * n + f === 0);
      while (vanishes()) e = int(rand, -6, 6);
      const top = polyTex([a, b, c], 'n');
      const bottom = polyTex([d, e, f], 'n');
      return {
        prompt: `Tính $\\lim \\dfrac{${top}}{${bottom}}$ (nhập số nguyên hoặc phân số $p/q$).`,
        answer: a / d,
        hints: ['Chia cả tử và mẫu cho $n^2$.'],
        steps: [
          `Chia tử và mẫu cho $n^2$; các số hạng dạng $\\dfrac{c}{n}$, $\\dfrac{c}{n^2}$ dần tới $0$.`,
          `Giới hạn bằng tỉ số hai hệ số của $n^2$: $\\dfrac{${a}}{${d}} = ${valueTex(a / d)}$.`,
        ],
      };
    }
    if (variant === 1) {
      const u1 = int(rand, 1, 6);
      const k = int(rand, 2, 5);
      const s = pick(rand, [1, -1]);
      // 1 − q = (k − s)/k, kept as a quotient of integers so it is exact.
      const rest = (k - s) / k;
      const sum = (u1 * k) / (k - s);
      const qTex = `${s < 0 ? '-' : ''}\\dfrac{1}{${k}}`;
      return {
        prompt: `Tính tổng của cấp số nhân lùi vô hạn có $u_1 = ${u1}$ và công bội $q = ${qTex}$.`,
        answer: sum,
        hints: ['Dùng $S = \\dfrac{u_1}{1 - q}$.'],
        steps: [
          `$1 - q = 1 ${s < 0 ? '+' : '-'} \\dfrac{1}{${k}} = ${valueTex(rest)}$.`,
          `$S = \\dfrac{${u1}}{${valueTex(rest)}} = ${valueTex(sum)}$.`,
        ],
      };
    }
    let ab = int(rand, 1, 98);
    while (ab % 11 === 0) ab = int(rand, 1, 98);
    const digits = String(ab).padStart(2, '0');
    return {
      prompt: `Viết số thập phân vô hạn tuần hoàn $0{,}(${digits})$ dưới dạng phân số.`,
      answer: ab / 99,
      hints: [
        `$0{,}(${digits}) = \\dfrac{${ab}}{100} + \\dfrac{${ab}}{100^2} + \\cdots$, một cấp số nhân lùi vô hạn với $q = \\dfrac{1}{100}$.`,
      ],
      steps: [
        `$0{,}(${digits}) = \\dfrac{\\frac{${ab}}{100}}{1 - \\frac{1}{100}} = \\dfrac{${ab}}{99}$.`,
        `Rút gọn: $${valueTex(ab / 99)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const hamso = {
  id: 'gioi-han-ham-so',
  label: 'Bài 16. Giới hạn của hàm số',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const r = nonZero(rand, -4, 4);
      let s = int(rand, -5, 5);
      while (s === r) s = int(rand, -5, 5);
      const top = polyTex([1, -(r + s), r * s]);
      return {
        prompt: `Tính $\\lim\\limits_{x \\to ${r}} \\dfrac{${top}}{${minusTex(r)}}$.`,
        answer: r - s,
        hints: [
          `Thay $x = ${r}$ được dạng $\\dfrac{0}{0}$: tử có nghiệm $x = ${r}$, nên chứa thừa số $${minusTex(r)}$.`,
        ],
        steps: [
          `$${top} = (${minusTex(r)})(${minusTex(s)})$.`,
          `Với $x \\ne ${r}$: phân thức bằng $${minusTex(s)}$, nên giới hạn bằng $${r} ${s < 0 ? '+' : '-'} ${Math.abs(s)} = ${r - s}$.`,
        ],
      };
    }
    if (variant === 1) {
      const a = nonZero(rand, -6, 6);
      const b = int(rand, -5, 5);
      const c = int(rand, 1, 6);
      const d = nonZero(rand, -7, 7);
      const top = polyTex([a, b, 0]);
      const bottom = polyTex([c, 0, d]);
      return {
        prompt: `Tính $\\lim\\limits_{x \\to +\\infty} \\dfrac{${top}}{${bottom}}$.`,
        answer: a / c,
        hints: ['Chia tử và mẫu cho $x^2$.'],
        steps: [
          'Chia tử và mẫu cho $x^2$; các số hạng $\\dfrac{c}{x}$, $\\dfrac{c}{x^2}$ dần tới $0$ khi $x \\to +\\infty$.',
          `Giới hạn bằng $\\dfrac{${a}}{${c}} = ${valueTex(a / c)}$.`,
        ],
      };
    }
    const x0 = nonZero(rand, -3, 3);
    const p = nonZero(rand, -4, 4);
    const q = int(rand, -5, 5);
    const p2 = nonZero(rand, -3, 3);
    let q2 = int(rand, -5, 5);
    while (p2 * x0 + q2 === p * x0 + q) q2 += 1;
    const side = pick(rand, ['-', '+']);
    const answer = side === '-' ? p * x0 + q : p2 * x0 + q2;
    return {
      prompt: `Cho $f(x) = \\begin{cases} ${polyTex([p, q])} & \\text{nếu } x < ${x0} \\\\ ${polyTex([p2, q2])} & \\text{nếu } x \\ge ${x0} \\end{cases}$. Tính $\\lim\\limits_{x \\to ${x0}^${side}} f(x)$.`,
      answer,
      hints: [
        side === '-'
          ? `Khi $x \\to ${x0}^-$ thì $x < ${x0}$: dùng công thức thứ nhất.`
          : `Khi $x \\to ${x0}^+$ thì $x > ${x0}$: dùng công thức thứ hai.`,
      ],
      steps: [
        `Thay $x = ${x0}$ vào $${side === '-' ? polyTex([p, q]) : polyTex([p2, q2])}$: giới hạn bằng $${answer}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const lientuc = {
  id: 'ham-so-lien-tuc',
  label: 'Bài 17. Hàm số liên tục',
  make(rand) {
    if (int(rand, 0, 1) === 0) {
      const x0 = pick(rand, [-2, -1, 1, 2, 3]);
      const b = int(rand, -5, 5);
      const c = int(rand, -5, 5);
      const a = (x0 * x0 + c - b) / x0;
      const right = polyTex([1, 0, c]);
      const tail = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
      const lead = x0 === 1 ? '' : x0 === -1 ? '-' : `${x0}`;
      return {
        prompt: `Tìm $a$ để hàm số $f(x) = \\begin{cases} ax${tail} & \\text{nếu } x \\le ${x0} \\\\ ${right} & \\text{nếu } x > ${x0} \\end{cases}$ liên tục trên $\\mathbb{R}$.`,
        answer: a,
        hints: [`Hai nhánh là đa thức; chỉ cần $f(${x0}) = \\lim\\limits_{x \\to ${x0}^+} f(x)$.`],
        steps: [
          `$f(${x0}) = ${lead}a${tail}$ và $\\lim\\limits_{x \\to ${x0}^+} f(x) = ${x0 * x0 + c}$.`,
          `$${lead}a${tail} = ${x0 * x0 + c} \\Rightarrow a = ${valueTex(a)}$.`,
        ],
      };
    }
    const r = nonZero(rand, -5, 5);
    const top = polyTex([1, 0, -r * r]);
    return {
      prompt: `Tìm $m$ để hàm số $f(x) = \\begin{cases} \\dfrac{${top}}{${minusTex(r)}} & \\text{nếu } x \\ne ${r} \\\\ m & \\text{nếu } x = ${r} \\end{cases}$ liên tục tại $x = ${r}$.`,
      answer: 2 * r,
      hints: [`Tính $\\lim\\limits_{x \\to ${r}} f(x)$ rồi cho bằng $f(${r}) = m$.`],
      steps: [
        `Với $x \\ne ${r}$: $f(x) = \\dfrac{(${minusTex(r)})(${minusTex(-r)})}{${minusTex(r)}} = ${minusTex(-r)}$.`,
        `$\\lim\\limits_{x \\to ${r}} f(x) = ${2 * r}$, nên $m = ${2 * r}$.`,
      ],
    };
  },
};

/** The skills of the chapter review, in book order. */
export const CHAPTER_SKILLS = [dayso, hamso, lientuc];
