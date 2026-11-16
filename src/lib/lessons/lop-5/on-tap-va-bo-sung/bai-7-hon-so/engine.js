/**
 * Mixed numbers on circles. Every circle is one whole cut into `d` equal
 * parts; the child shades parts one at a time or a whole circle at once.
 * Full circles are the whole part, the parts of the last circle the
 * fraction part, and the same shading counted in parts is a fraction
 * greater than 1: 2 and 3/4 circles are 11/4 circles. A task asks for a
 * mixed number or for a fraction, and the line under the circles writes
 * the shading both ways. Pure and DOM-free.
 */
import { readNumber } from '#lib/core/kid/numbers.js';

/** Circles drawn. */
export const CIRCLES = 4;

/**
 * A number to shade: `whole` and `n`/`d`, shown as a mixed number or as the
 * fraction (whole × d + n)/d.
 * @typedef {{ whole: number, n: number, d: number, ask: 'mixed' | 'fraction' }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { whole: 2, n: 3, d: 4, ask: 'mixed' },
  { whole: 2, n: 1, d: 3, ask: 'fraction' },
  { whole: 1, n: 5, d: 8, ask: 'mixed' },
  { whole: 1, n: 5, d: 6, ask: 'fraction' },
  { whole: 3, n: 1, d: 2, ask: 'mixed' },
  { whole: 1, n: 4, d: 5, ask: 'fraction' },
  { whole: 2, n: 2, d: 3, ask: 'mixed' },
  { whole: 3, n: 1, d: 4, ask: 'fraction' },
];

/** Parts a task asks for. @param {Task} t */
export const partsOf = (t) => t.whole * t.d + t.n;

/** @param {number} n @param {number} d */
const tex = (n, d) => `$\\dfrac{${n}}{${d}}$`;

/** A mixed number in TeX. @param {number} whole @param {number} n @param {number} d */
export const mixedTex = (whole, n, d) => `$${whole}\\dfrac{${n}}{${d}}$`;

/**
 * How the book reads a fraction: 3/4 is "ba phần tư", 7/10 "bảy phần mười".
 * @param {number} n
 * @param {number} d
 */
export function fractionWords(n, d) {
  return `${readNumber(n)} phần ${d === 4 ? 'tư' : readNumber(d)}`;
}

/** How the book reads a mixed number: "hai và ba phần tư". @param {number} whole @param {number} n @param {number} d */
export const mixedWords = (whole, n, d) => `${readNumber(whole)} và ${fractionWords(n, d)}`;

/** The task as rich text, the way it is asked. @param {Task} t */
export const askedText = (t) =>
  t.ask === 'mixed' ? mixedTex(t.whole, t.n, t.d) : tex(partsOf(t), t.d);

/**
 * The working that turns a mixed number into a fraction: the whole part
 * times the denominator, plus the numerator, over the same denominator.
 * @param {number} whole
 * @param {number} n
 * @param {number} d
 */
export function toFractionText(whole, n, d) {
  return `${mixedTex(whole, n, d)} = $\\dfrac{${whole} \\times ${d} + ${n}}{${d}}$ = ${tex(whole * d + n, d)}`;
}

/**
 * The shading written out: as parts, and as a mixed number when it is one.
 * @param {number} count shaded parts
 * @param {number} d parts in a circle
 */
export function shadedText(count, d) {
  if (count === 0) return 'Em chưa tô phần nào.';
  const whole = Math.floor(count / d);
  const rest = count % d;
  const parts = `Em đã tô ${count} phần, tức là ${tex(count, d)} hình tròn`;
  if (whole === 0) return `${parts}, chưa đủ một hình tròn.`;
  if (rest === 0) return `${parts}, đúng ${whole} hình tròn.`;
  return `${parts}, bằng ${mixedTex(whole, rest, d)} hình tròn (phần nguyên ${whole}, phần phân số ${tex(rest, d)}).`;
}

/**
 * The line under the circles.
 * @param {number} count
 * @param {Task} t
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function circleNote(count, t) {
  const want = partsOf(t);
  if (count === want) {
    return {
      tone: 'ok',
      text: `Đúng rồi! ${toFractionText(t.whole, t.n, t.d)}. Đọc là: ${mixedWords(t.whole, t.n, t.d)}.`,
    };
  }
  const more = count < want ? 'Em tô thêm.' : 'Em tô nhiều quá, bớt đi nhé.';
  return { tone: 'info', text: `${shadedText(count, t.d)} ${more}` };
}

/**
 * The count after tapping part `part` of circle `circle`: it shades every
 * part up to that one; tapping the last shaded part again takes it away.
 * @param {number} count
 * @param {number} circle 0 to CIRCLES − 1
 * @param {number} part 0 to d − 1
 * @param {number} d
 */
export function tapAt(count, circle, part, d) {
  const next = circle * d + part + 1;
  return next === count ? next - 1 : next;
}

/**
 * The count moved by a step, kept within the circles.
 * @param {number} count
 * @param {number} step
 * @param {number} d
 */
export const nudge = (count, step, d) => Math.min(CIRCLES * d, Math.max(0, count + step));
