/**
 * Fractions for the year-end review the grade 4 way: written as plain text
 * ('3/4', a whole number when the denominator is 1) and read aloud as "ba
 * phần tư", reduced, compared, and offered as answer options among the slips
 * a child makes. Pure and DOM-free.
 */
import { int, shuffle } from '#lib/core/drill.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import * as kid from '#lib/core/kid/fractions.js';
import { sameValue } from '#lib/core/kid/fractions.js';

export { add, div, mul, reduce, sub } from '#lib/core/kid/fractions.js';
export { sameValue };

/**
 * Plain text of a fraction: '3/4', or '2' when the denominator is 1.
 * @param {Frac} f
 */
export const fracText = (f) => kid.fracText(f.n, f.d);

/**
 * How the book reads a fraction: 5/6 is "năm phần sáu", 3/4 "ba phần tư".
 * @param {Frac} f
 */
export const fracWords = (f) => kid.fracWords(f.n, f.d);

/** @typedef {import('./visual.js').Frac} Frac */

/**
 * The sign between two fractions.
 * @param {Frac} f
 * @param {Frac} g
 * @returns {'<' | '=' | '>'}
 */
export function fracSign(f, g) {
  const l = f.n * g.d;
  const r = g.n * f.d;
  return l < r ? '<' : l > r ? '>' : '=';
}

/**
 * A fraction in lowest terms below 1, with a denominator from lo to hi.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 * @returns {Frac}
 */
export function simplest(rand, lo, hi) {
  for (;;) {
    const d = int(rand, lo, hi);
    const n = int(rand, 1, d - 1);
    if (gcd(n, d) === 1) return { n, d };
  }
}

/**
 * The fraction `f` written with denominator `d` (a multiple of its own):
 * '3/4 = (3 × 5)/(4 × 5) = 15/20'.
 * @param {Frac} f
 * @param {number} d
 */
export function raiseText(f, d) {
  const k = d / f.d;
  return k === 1 ? fracText(f) : `${fracText(f)} = ${f.n * k}/${d}`;
}

/**
 * The right fraction among the slips a child makes, as options with their
 * spoken names: only positive whole terms, and no two options of the same
 * value; a whole number is offered only when the answer is one. Filled up
 * from numerators one to three above the answer.
 * @param {() => number} rand
 * @param {Frac} right
 * @param {Frac[]} slips
 */
export function fracOptions(rand, right, slips) {
  /** @type {Frac[]} */
  const kept = [right];
  const fill = [1, 2, 3].map((k) => ({ n: right.n + k, d: right.d }));
  for (const s of [...slips, ...fill]) {
    if (kept.length === 4) break;
    if (!Number.isInteger(s.n) || !Number.isInteger(s.d) || s.n < 1 || s.d < 1) continue;
    if (s.d === 1 && right.d !== 1) continue;
    if (kept.some((k) => sameValue(k, s))) continue;
    kept.push(s);
  }
  const options = shuffle(rand, kept).map((f) => ({ label: fracText(f), fracs: [f] }));
  return {
    options,
    answer: options.findIndex((o) => o.fracs[0] === right),
    optionLabels: options.map((o) => fracWords(o.fracs[0])),
  };
}
