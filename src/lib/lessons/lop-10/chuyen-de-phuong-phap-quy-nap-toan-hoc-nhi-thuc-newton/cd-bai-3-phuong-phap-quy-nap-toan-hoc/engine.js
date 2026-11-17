/**
 * The domino board of mathematical induction: each statement P(n) has a base
 * step (is P(n₀) true?) and an inductive step (does P(k) ⇒ P(k + 1) hold for
 * every k ≥ n₀?). Domino n stands for P(n); the first domino falls when the
 * base step holds, and each fallen domino knocks the next one over when the
 * implication holds. A statement whose inductive step cannot be proved shows
 * where the chain really stops.
 */

import { numTex } from '#lib/core/number-format.js';

/** How many dominoes the board shows at once. */
export const WINDOW = 6;

/** How far the window can slide past the first domino. */
export const MAX_SHIFT = 44;

/** @typedef {{ ok: boolean, text: string }} Check */

/**
 * @typedef {object} Statement
 * @property {string} id
 * @property {string} label short name for the switch
 * @property {string} tex P(n) as TeX
 * @property {number} start the first n of the claim (n₀)
 * @property {string} base the base step worked out, rich text
 * @property {boolean} stepOk whether P(k) ⇒ P(k + 1) can be proved for every k ≥ n₀
 * @property {string} step the inductive step, or why it cannot be proved, rich text
 * @property {(n: number) => Check} check P(n) for one concrete n, rich text
 */

/**
 * A non-negative BigInt as TeX, digits grouped in threes by a thin space.
 * @param {bigint} value
 */
export function bigTex(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
}

/**
 * The smallest prime factor of n ≥ 2.
 * @param {number} n
 */
export function smallestFactor(n) {
  for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return d;
  return n;
}

/** @type {Statement[]} */
export const STATEMENTS = [
  {
    id: 'le',
    label: 'Tổng số lẻ',
    tex: '1 + 3 + 5 + \\dots + (2n - 1) = n^2',
    start: 1,
    base: 'Với $n = 1$: vế trái bằng $1$, vế phải bằng $1^2 = 1$. Đúng.',
    stepOk: true,
    step: 'Giả sử $1 + 3 + \\dots + (2k - 1) = k^2$. Cộng thêm số lẻ tiếp theo $2k + 1$: $1 + 3 + \\dots + (2k - 1) + (2k + 1) = k^2 + 2k + 1 = (k + 1)^2$. Đúng với $n = k + 1$.',
    check: (n) => {
      const left = n === 1 ? '1' : `1 + \\dots + ${2 * n - 1}`;
      return { ok: true, text: `$${left} = ${numTex(n * n)} = ${n}^2$` };
    },
  },
  {
    id: 'tong',
    label: 'Tổng 1 đến n',
    tex: '1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}',
    start: 1,
    base: 'Với $n = 1$: vế trái bằng $1$, vế phải bằng $\\dfrac{1 \\cdot 2}{2} = 1$. Đúng.',
    stepOk: true,
    step: 'Giả sử $1 + 2 + \\dots + k = \\dfrac{k(k + 1)}{2}$. Khi đó $1 + 2 + \\dots + k + (k + 1) = \\dfrac{k(k + 1)}{2} + (k + 1) = \\dfrac{(k + 1)(k + 2)}{2}$. Đúng với $n = k + 1$.',
    check: (n) => {
      const sum = (n * (n + 1)) / 2;
      const left = n === 1 ? '1' : `1 + \\dots + ${n}`;
      return {
        ok: true,
        text: `$${left} = ${numTex(sum)}$ và $\\dfrac{${n} \\cdot ${n + 1}}{2} = ${numTex(sum)}$`,
      };
    },
  },
  {
    id: 'chia-het',
    label: 'Chia hết',
    tex: '4^n - 1 \\text{ chia hết cho } 3',
    start: 1,
    base: 'Với $n = 1$: $4^1 - 1 = 3$ chia hết cho $3$. Đúng.',
    stepOk: true,
    step: 'Giả sử $4^k - 1$ chia hết cho $3$. Ta có $4^{k + 1} - 1 = 4(4^k - 1) + 3$: cả hai số hạng đều chia hết cho $3$, nên $4^{k + 1} - 1$ chia hết cho $3$.',
    check: (n) => {
      const value = 4n ** BigInt(n) - 1n;
      const ok = value % 3n === 0n;
      const shown = n <= 12 ? ` = ${bigTex(value)}` : '';
      return {
        ok,
        text: `$4^{${n}} - 1${shown}$ chia cho $3$ dư $${(value % 3n).toString()}$`,
      };
    },
  },
  {
    id: 'bat-dang-thuc',
    label: 'Bất đẳng thức',
    tex: '2^n > 2n + 1 \\quad (n \\ge 3)',
    start: 3,
    base: 'Mệnh đề chỉ khẳng định với $n \\ge 3$, nên bước cơ sở là $n = 3$: $2^3 = 8 > 7 = 2 \\cdot 3 + 1$. Đúng.',
    stepOk: true,
    step: 'Giả sử $2^k > 2k + 1$ với $k \\ge 3$. Khi đó $2^{k + 1} = 2 \\cdot 2^k > 2(2k + 1) = 4k + 2 > 2k + 3 = 2(k + 1) + 1$ (vì $2k > 1$). Đúng với $n = k + 1$.',
    check: (n) => {
      const power = 2n ** BigInt(n);
      const right = BigInt(2 * n + 1);
      const ok = power > right;
      return {
        ok,
        text: `$2^{${n}} = ${bigTex(power)} ${ok ? '>' : '\\le'} ${bigTex(right)} = 2 \\cdot ${n} + 1$`,
      };
    },
  },
  {
    id: 'chan',
    label: 'Thiếu cơ sở',
    tex: 'n^2 + n + 1 \\text{ là số chẵn}',
    start: 1,
    base: 'Với $n = 1$: $1^2 + 1 + 1 = 3$ là số lẻ. Bước cơ sở sai!',
    stepOk: true,
    step: 'Giả sử $k^2 + k + 1$ là số chẵn. Ta có $(k + 1)^2 + (k + 1) + 1 = (k^2 + k + 1) + 2(k + 1)$ cũng là số chẵn. Bước quy nạp đúng, nhưng chỉ có bước này thì chưa đủ.',
    check: (n) => {
      const v = n * n + n + 1;
      const ok = v % 2 === 0;
      return { ok, text: `$${n}^2 + ${n} + 1 = ${numTex(v)}$ là số ${ok ? 'chẵn' : 'lẻ'}` };
    },
  },
  {
    id: 'nguyen-to',
    label: 'Thiếu bước quy nạp',
    tex: 'n^2 - n + 41 \\text{ là số nguyên tố}',
    start: 1,
    base: 'Với $n = 1$: $1 - 1 + 41 = 41$ là số nguyên tố. Đúng.',
    stepOk: false,
    step: 'Biết $k^2 - k + 41$ là số nguyên tố không giúp suy ra $(k + 1)^2 - (k + 1) + 41 = k^2 + k + 41$ là số nguyên tố: không có lập luận nào nối $P(k)$ với $P(k + 1)$. Kiểm tra nhiều giá trị $n$ thấy đúng vẫn không phải là chứng minh.',
    check: (n) => {
      const v = n * n - n + 41;
      const d = smallestFactor(v);
      if (d === v) return { ok: true, text: `$${n}^2 - ${n} + 41 = ${numTex(v)}$ là số nguyên tố` };
      return {
        ok: false,
        text: `$${n}^2 - ${n} + 41 = ${numTex(v)} = ${numTex(d)} \\cdot ${numTex(v / d)}$ không là số nguyên tố`,
      };
    },
  },
];

/**
 * The last n whose domino falls when the first one is pushed: n₀ − 1 when the
 * base step fails, Infinity when both steps hold, and otherwise the last n
 * before the first false P(n).
 * @param {Statement} s
 */
export function fallsTo(s) {
  if (!s.check(s.start).ok) return s.start - 1;
  if (s.stepOk) return Infinity;
  let n = s.start;
  while (n < s.start + 500 && s.check(n + 1).ok) n += 1;
  return n;
}

/**
 * The state of domino n: 'before' when it lies before n₀ (outside the claim),
 * 'down' when it has fallen, 'up' otherwise.
 * @param {Statement} s @param {number} n @param {boolean} pushed
 * @returns {'before' | 'down' | 'up'}
 */
export function dominoState(s, n, pushed) {
  if (n < s.start) return 'before';
  return pushed && n <= fallsTo(s) ? 'down' : 'up';
}

/**
 * The live sentence under the board.
 * @param {Statement} s @param {boolean} pushed
 */
export function verdict(s, pushed) {
  if (!pushed) {
    return `Kiểm tra hai bước, rồi đẩy quân domino đầu tiên (quân số ${s.start}).`;
  }
  const last = fallsTo(s);
  if (last < s.start) {
    return `Quân số ${s.start} không đổ vì $P(${s.start})$ sai. Bước quy nạp đúng cũng vô ích: không quân nào đổ, mệnh đề không được chứng minh (và thực ra sai với mọi $n$).`;
  }
  if (last === Infinity) {
    return `Quân đầu tiên đổ (bước 1) và mỗi quân đổ đều làm quân kế tiếp đổ (bước 2), nên mọi quân đều đổ: $P(n)$ đúng với mọi $n \\ge ${s.start}$.`;
  }
  return `Bước quy nạp không chứng minh được, và quả thật dây domino dừng lại: các quân từ ${s.start} đến ${last} đổ nhưng quân số ${last + 1} vẫn đứng, vì ${s.check(last + 1).text}. Hãy dời khung đến quân ${last + 1} để xem.`;
}
