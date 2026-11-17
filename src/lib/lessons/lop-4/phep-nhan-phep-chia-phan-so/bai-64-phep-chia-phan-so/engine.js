/**
 * Dividing fractions by measuring on a strip: a/b : c/d asks how many
 * pieces of length c/d fit in a/b. The child lays pieces of c/d one after
 * another under the strip of a/b until no more fit, then picks the reversed
 * fraction d/c, and sees a/b : c/d = a/b × d/c give the same count. Every
 * task divides exactly, so the count is a whole number. Both strips are cut
 * into L = lcm(b, d) small cells per whole, so a/b and c/d are whole
 * numbers of cells. Pure and DOM-free.
 */
import { lcm } from '#lib/numtheory-engine/index.js';
import { fracRich, fracWords, quotientTex, sameValue } from '../_shared/fractions.js';

/**
 * A task: a/b : c/d.
 * @typedef {{ a: number, b: number, c: number, d: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { a: 3, b: 4, c: 1, d: 8 },
  { a: 1, b: 2, c: 1, d: 6 },
  { a: 2, b: 1, c: 2, d: 3 },
  { a: 3, b: 2, c: 1, d: 8 },
  { a: 3, b: 4, c: 3, d: 8 },
  { a: 1, b: 1, c: 1, d: 4 },
  { a: 9, b: 10, c: 3, d: 10 },
];

/**
 * The cells of the strips: L per whole, D for the dividend, M for one
 * measuring piece, how many pieces fit (q) and how many wholes to draw.
 * @param {Task} t
 */
export function measureOf(t) {
  const L = lcm(t.b, t.d);
  const D = (t.a * L) / t.b;
  const M = (t.c * L) / t.d;
  return { L, D, M, q: D / M, wholes: Math.max(1, Math.ceil(D / L)) };
}

/**
 * Where the child is: laying pieces, picking the reversed fraction (after
 * a wrong pick: `flipWrong`), or done.
 * @typedef {'lay' | 'flip' | 'flipWrong' | 'done'} Step
 */

/**
 * Options for the reversed fraction of c/d: d/c, c/d itself, and the
 * reversed dividend b/a when it is another value. Ordered by value.
 * @param {Task} t
 * @returns {{ options: Array<{ n: number, d: number }>, answer: number }}
 */
export function flipOptions(t) {
  const right = { n: t.d, d: t.c };
  /** @type {Array<{ n: number, d: number }>} */
  const kept = [right];
  for (const s of [
    { n: t.c, d: t.d },
    { n: t.b, d: t.a },
    { n: t.d + 1, d: t.c },
  ]) {
    if (kept.length === 3) break;
    if (kept.some((k) => sameValue(k, s))) continue;
    kept.push(s);
  }
  const options = [...kept].sort((x, y) => x.n / x.d - y.n / y.d);
  return { options, answer: options.indexOf(right) };
}

/**
 * The spoken name of an option. A reciprocal is read as it is drawn, with its
 * denominator 1 (tám phần một), since the lesson swaps numerator and
 * denominator.
 * @param {{ n: number, d: number }} f
 */
export const optionWords = (f) =>
  f.d === 1 ? `${fracWords(f.n, 1)} phần một` : fracWords(f.n, f.d);

/**
 * The live sentence under the strips.
 * @param {Task} t
 * @param {number} laid pieces laid so far
 * @param {Step} step
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function divideNote(t, laid, step) {
  const { q } = measureOf(t);
  const piece = fracRich(t.c, t.d);
  if (laid < q) {
    return {
      tone: 'info',
      text:
        laid === 0
          ? `Có bao nhiêu đoạn dài ${piece} nằm vừa trong ${fracRich(t.a, t.b)}? Em bấm "Đặt thêm 1 đoạn".`
          : `Em đã đặt ${laid} đoạn ${piece}. Vẫn còn chỗ, em đặt tiếp nhé.`,
    };
  }
  const count = `Vừa đúng ${q} đoạn, đoạn tiếp theo không vừa nữa. Vậy ${fracRich(t.a, t.b)} : ${piece} = ${q}.`;
  if (step === 'done') {
    return {
      tone: 'ok',
      text: `Đúng rồi! Lấy ${fracRich(t.a, t.b)} nhân với phân số đảo ngược của ${piece}: $${quotientTex({ n: t.a, d: t.b }, { n: t.c, d: t.d })}$. Cũng là ${q} đoạn!`,
    };
  }
  if (step === 'flipWrong') {
    return {
      tone: 'warn',
      text: `Chưa đúng. Phân số đảo ngược của ${piece} có tử số là ${t.d}, mẫu số là ${t.c}: đổi chỗ tử số và mẫu số.`,
    };
  }
  return {
    tone: 'info',
    text: `${count} Em hãy chọn phân số đảo ngược của ${piece}.`,
  };
}

/**
 * The screen-reader description of the strips.
 * @param {Task} t
 * @param {number} laid
 */
export function stripLabel(t, laid) {
  const { L, D, M } = measureOf(t);
  return `Băng trên dài ${fracWords(t.a, t.b)}: tô ${D} ô nhỏ, mỗi đơn vị ${L} ô. Băng dưới: đã đặt ${laid} đoạn, mỗi đoạn ${M} ô nhỏ, dài ${fracWords(t.c, t.d)}.`;
}
