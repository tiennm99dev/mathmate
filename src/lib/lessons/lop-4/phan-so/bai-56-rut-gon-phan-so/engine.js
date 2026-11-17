/**
 * Reducing a fraction step by step. The child picks a number from 2 to 9;
 * when the numerator and the denominator both divide by it, both are divided
 * and the chain of equal fractions grows, otherwise the number is marked as
 * not a common divisor. The task ends at the fraction in lowest terms (phân
 * số tối giản). Pure and DOM-free.
 */
import { commonDivisors, fracRich, fracTex, isSimplest, stepTex } from '../_shared/fractions.js';

/**
 * A fraction to reduce.
 * @typedef {{ n: number, d: number }} Task
 */

/**
 * The fractions to reduce. Every denominator stays at most 24, so the strip
 * parts stay visible.
 * @type {readonly Task[]}
 */
export const TASKS = [
  { n: 12, d: 18 },
  { n: 10, d: 15 },
  { n: 6, d: 24 },
  { n: 9, d: 21 },
  { n: 16, d: 24 },
  { n: 14, d: 20 },
  { n: 8, d: 12 },
  { n: 15, d: 18 },
];

/**
 * Where the child is: the chain of fractions so far (the first is the task)
 * and the numbers tried that were not common divisors.
 * @typedef {{ chain: Array<{ n: number, d: number }>, misses: number[], last: Try | null }} State
 */

/**
 * What the last tap did.
 * @typedef {{ k: number, ok: boolean }} Try
 */

/**
 * A fresh state for a task.
 * @param {Task} task
 * @returns {State}
 */
export const startState = (task) => ({ chain: [{ n: task.n, d: task.d }], misses: [], last: null });

/**
 * The fraction the chain has reached.
 * @param {State} state
 */
export const current = (state) => state.chain[state.chain.length - 1];

/**
 * Whether the chain has reached lowest terms.
 * @param {State} state
 */
export const isDone = (state) => {
  const f = current(state);
  return isSimplest(f.n, f.d);
};

/**
 * Try dividing both terms of the current fraction by k.
 * @param {State} state
 * @param {number} k
 * @returns {State}
 */
export function tryDivide(state, k) {
  if (isDone(state)) return state;
  const f = current(state);
  if (f.n % k === 0 && f.d % k === 0) {
    return {
      chain: [...state.chain, { n: f.n / k, d: f.d / k }],
      misses: [],
      last: { k, ok: true },
    };
  }
  const misses = state.misses.includes(k) ? state.misses : [...state.misses, k];
  return { ...state, misses, last: { k, ok: false } };
}

/**
 * The numbers from 2 to 9 that still divide both terms of the current
 * fraction: the hint the widget colours.
 * @param {State} state
 * @returns {number[]}
 */
export const hintDivisors = (state) => {
  const f = current(state);
  return [...commonDivisors(f.n, f.d)];
};

/**
 * TeX of the chain: '\dfrac{12}{18} = \dfrac{6}{9} = \dfrac{2}{3}'.
 * @param {State} state
 */
export const chainTex = (state) => state.chain.map((f) => fracTex(f.n, f.d)).join(' = ');

/**
 * Why k does not divide both terms: names the term (or terms) that do not
 * divide by k.
 * @param {{ n: number, d: number }} f
 * @param {number} k
 */
export function missWhy(f, k) {
  const bad = [];
  if (f.n % k !== 0) bad.push(`tử số ${f.n}`);
  if (f.d % k !== 0) bad.push(`mẫu số ${f.d}`);
  return `${bad.join(' và ')} không chia hết cho ${k}`;
}

/**
 * The live sentence under the strips.
 * @param {State} state
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function reduceNote(state) {
  const f = current(state);
  const start = state.chain[0];
  if (isDone(state)) {
    if (state.chain.length === 1) {
      return { tone: 'ok', text: `${fracRich(f.n, f.d)} đã là phân số tối giản.` };
    }
    return {
      tone: 'ok',
      text: `Đúng rồi! $${chainTex(state)}$. ${f.n} và ${f.d} không cùng chia hết cho số nào lớn hơn 1, nên ${fracRich(f.n, f.d)} là phân số tối giản.`,
    };
  }
  const last = state.last;
  if (last && !last.ok) {
    return {
      tone: 'warn',
      text: `Không chia được: ${missWhy(f, last.k)}. Em chọn số khác nhé.`,
    };
  }
  if (last && last.ok) {
    const prev = state.chain[state.chain.length - 2];
    return {
      tone: 'info',
      text: `$${stepTex(prev.n, prev.d, last.k, ':')}$. ${fracRich(f.n, f.d)} chưa tối giản, em rút gọn tiếp nhé.`,
    };
  }
  return {
    tone: 'info',
    text: `Tử số ${start.n} và mẫu số ${start.d} cùng chia hết cho số nào? Em chọn một số bên dưới.`,
  };
}
