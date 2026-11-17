/**
 * Question generators for the chapter "Đạo hàm", one skill per lesson plus
 * one for tangent lines, for the drill board of the chapter review. Every
 * answer is an integer or a fraction p/q, read with `readNumber` and written
 * with `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps
 * are rich text.
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

/**
 * The value of a polynomial (coefficients highest power first) at x.
 * @param {number[]} coeffs @param {number} x
 */
export const polyAt = (coeffs, x) => coeffs.reduce((acc, c) => acc * x + c, 0);

/**
 * The coefficients of the derivative of a polynomial.
 * @param {number[]} coeffs
 */
export function polyDerive(coeffs) {
  const deg = coeffs.length - 1;
  const out = coeffs.slice(0, -1).map((c, i) => c * (deg - i));
  return out.length === 0 ? [0] : out;
}

/** @param {number} n a number inside TeX, in brackets when negative */
const op = (n) => (n < 0 ? `(${n})` : `${n}`);

/** @param {number} k a coefficient written before a bracket: '', '-', '3' */
const coef = (k) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);

/** @param {string} base @param {number} n base^n, with no exponent 1 */
const powTex = (base, n) => (n === 1 ? base : `${base}^${n}`);

/** @type {Skill} */
export const dinhNghia = {
  id: 'dinh-nghia-dao-ham',
  label: 'Bài 31. Định nghĩa và ý nghĩa của đạo hàm',
  make(rand) {
    if (int(rand, 0, 1) === 0) {
      const f = [nonZero(rand, -3, 3), int(rand, -6, 6), int(rand, -5, 5)];
      const x0 = int(rand, -3, 3);
      const df = polyDerive(f);
      const k = polyAt(df, x0);
      return {
        prompt: `Tính hệ số góc của tiếp tuyến của đồ thị hàm số $f(x) = ${polyTex(f)}$ tại điểm có hoành độ $x_0 = ${x0}$.`,
        answer: k,
        hints: ["Hệ số góc của tiếp tuyến tại $x_0$ là $f'(x_0)$."],
        steps: [`$f'(x) = ${polyTex(df)}$.`, `$k = f'(${x0}) = ${k}$.`],
      };
    }
    const a = int(rand, 1, 5);
    const b = int(rand, 0, 8);
    const t0 = int(rand, 1, 5);
    const s = [a, b, 0];
    const v = polyAt(polyDerive(s), t0);
    return {
      prompt: `Một vật chuyển động có phương trình $s(t) = ${polyTex(s, 't')}$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính vận tốc tức thời của vật tại thời điểm $t = ${t0}$.`,
      answer: v,
      unit: 'm/s',
      hints: ["Vận tốc tức thời là $v(t) = s'(t)$."],
      steps: [`$v(t) = s'(t) = ${polyTex(polyDerive(s), 't')}$.`, `$v(${t0}) = ${v}$ m/s.`],
    };
  },
};

/** @type {Skill} */
export const quyTac = {
  id: 'quy-tac-dao-ham',
  label: 'Bài 32. Các quy tắc tính đạo hàm',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      const p = nonZero(rand, -4, 4);
      const q = nonZero(rand, -5, 5);
      const x0 = int(rand, -2, 3);
      const u = x0 + p;
      const v = x0 * x0 + q;
      const ans = v + u * 2 * x0;
      return {
        prompt: `Cho $f(x) = (${polyTex([1, p])})(${polyTex([1, 0, q])})$. Tính $f'(${x0})$.`,
        answer: ans,
        hints: [
          "Quy tắc tích: $(uv)' = u'v + uv'$ với $u = " +
            polyTex([1, p]) +
            '$, $v = ' +
            polyTex([1, 0, q]) +
            '$.',
        ],
        steps: [
          `$f'(x) = 1 \\cdot (${polyTex([1, 0, q])}) + (${polyTex([1, p])}) \\cdot 2x$.`,
          `$f'(${x0}) = ${v} + ${op(u)} \\cdot ${op(2 * x0)} = ${ans}$.`,
        ],
      };
    }
    if (variant === 1) {
      const a = nonZero(rand, -3, 3);
      const c = nonZero(rand, -4, 4);
      let b = int(rand, -5, 5);
      while (a * c - b === 0) b = int(rand, -5, 5);
      let x0 = int(rand, -3, 3);
      while (x0 + c === 0) x0 = int(rand, -3, 3);
      const top = a * c - b;
      const ans = top / (x0 + c) ** 2;
      return {
        prompt: `Cho $f(x) = \\dfrac{${polyTex([a, b])}}{${polyTex([1, c])}}$. Tính $f'(${x0})$ (nhập số nguyên hoặc phân số $p/q$).`,
        answer: ans,
        hints: ["Quy tắc thương: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$."],
        steps: [
          `$f'(x) = \\dfrac{${coef(a)}(${polyTex([1, c])}) - (${polyTex([a, b])})}{(${polyTex([1, c])})^2} = \\dfrac{${top}}{(${polyTex([1, c])})^2}$.`,
          `$f'(${x0}) = \\dfrac{${top}}{${(x0 + c) ** 2}} = ${valueTex(ans)}$.`,
        ],
      };
    }
    const n = int(rand, 2, 4);
    const a = pick(rand, [1, 2, 3, -1, -2]);
    let b = int(rand, -3, 3);
    let x0 = int(rand, -2, 2);
    while (Math.abs(a * x0 + b) > 3 || a * x0 + b === 0) {
      b = int(rand, -3, 3);
      x0 = int(rand, -2, 2);
    }
    const u0 = a * x0 + b;
    const ans = n * a * u0 ** (n - 1);
    return {
      prompt: `Cho $f(x) = (${polyTex([a, b])})^${n}$. Tính $f'(${x0})$.`,
      answer: ans,
      hints: [
        `Hàm hợp: $(u^${n})' = ${n}${powTex('u', n - 1)} \\cdot u'$ với $u = ${polyTex([a, b])}$.`,
      ],
      steps: [
        `$f'(x) = ${n}${powTex(`(${polyTex([a, b])})`, n - 1)} \\cdot ${op(a)} = ${n * a}${powTex(`(${polyTex([a, b])})`, n - 1)}$.`,
        `$f'(${x0}) = ${n * a} \\cdot ${powTex(op(u0), n - 1)} = ${ans}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const capHai = {
  id: 'dao-ham-cap-hai',
  label: 'Bài 33. Đạo hàm cấp hai',
  make(rand) {
    if (int(rand, 0, 1) === 0) {
      const f = [nonZero(rand, -3, 3), int(rand, -5, 5), int(rand, -6, 6), int(rand, -5, 5)];
      const x0 = int(rand, -3, 3);
      const d1 = polyDerive(f);
      const d2 = polyDerive(d1);
      const ans = polyAt(d2, x0);
      return {
        prompt: `Cho $f(x) = ${polyTex(f)}$. Tính $f''(${x0})$.`,
        answer: ans,
        hints: ["Tính $f'(x)$, rồi lấy đạo hàm của $f'(x)$."],
        steps: [
          `$f'(x) = ${polyTex(d1)}$.`,
          `$f''(x) = ${polyTex(d2)}$, nên $f''(${x0}) = ${ans}$.`,
        ],
      };
    }
    const p = int(rand, -6, 0);
    const q = int(rand, 1, 9);
    const t0 = int(rand, 1, 5);
    const s = [1, p, q, 0];
    const v = polyDerive(s);
    const a = polyDerive(v);
    const ans = polyAt(a, t0);
    return {
      prompt: `Một vật chuyển động có phương trình $s(t) = ${polyTex(s, 't')}$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính gia tốc của vật tại thời điểm $t = ${t0}$.`,
      answer: ans,
      unit: 'm/s²',
      hints: ["Gia tốc là $a(t) = s''(t)$."],
      steps: [
        `$v(t) = s'(t) = ${polyTex(v, 't')}$.`,
        `$a(t) = s''(t) = ${polyTex(a, 't')}$, nên $a(${t0}) = ${ans}$ m/s².`,
      ],
    };
  },
};

/** @type {Skill} */
export const tiepTuyen = {
  id: 'tiep-tuyen',
  label: 'Phương trình tiếp tuyến',
  make(rand) {
    const f = [1, int(rand, -3, 3), int(rand, -4, 4), int(rand, -4, 4)];
    const x0 = int(rand, -2, 2);
    const y0 = polyAt(f, x0);
    const df = polyDerive(f);
    const k = polyAt(df, x0);
    const b = y0 - k * x0;
    const askB = int(rand, 0, 1) === 1;
    return {
      prompt: `Tiếp tuyến của đồ thị hàm số $f(x) = ${polyTex(f)}$ tại điểm có hoành độ $x_0 = ${x0}$ có phương trình $y = kx + b$. Tính $${askB ? 'b' : 'k'}$.`,
      answer: askB ? b : k,
      hints: askB
        ? [
            "Tính $y_0 = f(x_0)$ và $k = f'(x_0)$.",
            'Từ $y - y_0 = k(x - x_0)$ suy ra $b = y_0 - kx_0$.',
          ]
        : ["Hệ số góc của tiếp tuyến là $k = f'(x_0)$."],
      steps: [
        `$y_0 = f(${x0}) = ${y0}$, $f'(x) = ${polyTex(df)}$, $k = f'(${x0}) = ${k}$.`,
        `$b = y_0 - kx_0 = ${y0} - ${op(k)} \\cdot ${op(x0)} = ${b}$: tiếp tuyến là $y = ${polyTex([k, b])}$, nên $${askB ? `b = ${b}` : `k = ${k}`}$.`,
      ],
    };
  },
};

/** The skills of the chapter review, in book order. */
export const CHAPTER_SKILLS = [dinhNghia, quyTac, capHai, tiepTuyen];
