/**
 * Adding two fractions on strips. Each addend is a strip; the child cuts
 * every piece of a strip into k equal pieces, which multiplies its numerator
 * and denominator by k. Once the pieces of both strips are the same size,
 * they join end to end on a sum strip: the numerators add up and the
 * denominator stays. The child then reads the sum off the strip. As in the
 * grade 4 book, the denominators are equal or one divides the other. Pure
 * and DOM-free.
 */
import { fracRich, fracText, fracWords, workingTex } from '../_shared/fractions.js';

/** The most pieces a whole is cut into. */
export const MAX_PARTS = 24;

/**
 * A task: a/b + c/d.
 * @typedef {{ a: number, b: number, c: number, d: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { a: 3, b: 8, c: 2, d: 8 },
  { a: 3, b: 5, c: 1, d: 10 },
  { a: 5, b: 8, c: 6, d: 8 },
  { a: 1, b: 2, c: 1, d: 6 },
  { a: 8, b: 9, c: 2, d: 3 },
  { a: 4, b: 7, c: 3, d: 7 },
  { a: 3, b: 10, c: 1, d: 5 },
  { a: 1, b: 2, c: 5, d: 8 },
  { a: 1, b: 4, c: 5, d: 12 },
];

/**
 * The largest cut of a strip with denominator b.
 * @param {number} b
 */
export const maxCut = (b) => Math.floor(MAX_PARTS / b);

/**
 * The pieces of both strips after the cuts k1 and k2, and whether they are
 * the same size.
 * @param {Task} task
 * @param {number} k1
 * @param {number} k2
 */
export function cutState(task, k1, k2) {
  const d1 = task.b * k1;
  const d2 = task.d * k2;
  return { d1, d2, A: task.a * k1, C: task.c * k2, same: d1 === d2 };
}

/**
 * Three options for the sum read off a strip of D pieces: the sum, the slip
 * of adding the denominators too, and one piece more or less.
 * @param {Task} task
 * @param {number} A shaded pieces of the first strip, cut to D
 * @param {number} C shaded pieces of the second strip, cut to D
 * @param {number} D pieces in one whole
 * @returns {{ options: Array<{ n: number, d: number }>, answer: number }}
 */
export function sumOptions(task, A, C, D) {
  const right = { n: A + C, d: D };
  const all = [
    right,
    { n: task.a + task.c, d: task.b + task.d },
    { n: A + C + 1, d: D },
    { n: A + C - 1, d: D },
  ];
  const seen = new Set();
  const options = all
    .filter((f) => {
      const key = fracText(f.n, f.d);
      if (f.n < 1 || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3);
  // A fixed order that does not always put the answer first.
  const order = [...options].sort((x, y) => x.n / x.d - y.n / y.d);
  return { options: order, answer: order.indexOf(right) };
}

/**
 * The spoken name of an option.
 * @param {{ n: number, d: number }} f
 */
export const optionWords = (f) => fracWords(f.n, f.d);

/**
 * TeX of the whole working for cuts that made equal pieces of D.
 * @param {Task} task
 * @param {number} D
 */
export const sumTex = (task, D) =>
  workingTex({ n: task.a, d: task.b }, { n: task.c, d: task.d }, '+', D);

/**
 * The live sentence under the strips.
 * @param {Task} task
 * @param {number} k1
 * @param {number} k2
 * @param {'read' | 'wrong' | 'right'} step reading the sum, after a wrong pick, or done
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function sumNote(task, k1, k2, step) {
  const { d1, d2, A, C, same } = cutState(task, k1, k2);
  if (!same) {
    return {
      tone: 'info',
      text: `Mảnh ở băng trên là ${fracRich(1, d1)}, mảnh ở băng dưới là ${fracRich(1, d2)}. Các mảnh chưa bằng nhau nên chưa ghép được. Em chia nhỏ các mảnh nhé.`,
    };
  }
  const S = A + C;
  if (step === 'right') {
    return {
      tone: 'ok',
      text: `Đúng rồi! ${A} mảnh và ${C} mảnh ghép lại được ${S} mảnh: $${sumTex(task, d1)}$. Cộng hai tử số, giữ nguyên mẫu số.`,
    };
  }
  if (step === 'wrong') {
    return {
      tone: 'warn',
      text: `Chưa đúng. Em đếm các mảnh tô màu ở băng tổng: đó là tử số. Mỗi băng có ${d1} mảnh: đó là mẫu số. Mẫu số giữ nguyên, không cộng.`,
    };
  }
  return {
    tone: 'info',
    text: `Các mảnh đã bằng nhau! Ghép ${A} mảnh và ${C} mảnh vào băng tổng. Băng tổng chỉ phân số nào?`,
  };
}
