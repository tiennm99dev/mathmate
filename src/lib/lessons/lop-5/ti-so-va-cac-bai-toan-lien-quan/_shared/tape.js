import { gcd } from '#lib/numtheory-engine/index.js';
import { int } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { slipOptions } from '#lib/core/kid/quiz.js';

/**
 * The two problems of the chapter solved with a segment diagram (sơ đồ đoạn
 * thẳng): two numbers whose ratio is `m/n` (the smaller one has `m` equal
 * parts, the bigger one `n`) and whose sum, or difference, is `given`.
 * @typedef {'sum' | 'diff'} TapeKind
 * @typedef {{ m: number, n: number, given: number }} TapeTask
 * @typedef {{ parts: number, unit: number, small: number, big: number }} TapeSolution
 */

/**
 * @param {TapeKind} kind
 * @param {TapeTask} task
 * @returns {TapeSolution}
 */
export function solve(kind, { m, n, given }) {
  const parts = kind === 'sum' ? m + n : n - m;
  const unit = given / parts;
  const small = unit * m;
  const big = kind === 'sum' ? given - small : small + given;
  return { parts, unit, small, big };
}

/**
 * The book's examples, solved first in "Tự giải".
 * @type {Record<TapeKind, TapeTask>}
 */
export const FIRST = { sum: { m: 3, n: 5, given: 96 }, diff: { m: 3, n: 5, given: 24 } };

/** What a step finds, in the book's order. */
export const STEP_NAMES = /** @type {const} */ (['parts', 'unit', 'small', 'big']);

/**
 * The question asked at step `i`.
 * @param {TapeKind} kind
 * @param {number} i
 */
export function stepQuestion(kind, i) {
  return [
    kind === 'sum'
      ? 'Tổng số phần bằng nhau là bao nhiêu?'
      : 'Hiệu số phần bằng nhau là bao nhiêu?',
    'Giá trị của một phần là bao nhiêu?',
    'Số bé là bao nhiêu?',
    'Số lớn là bao nhiêu?',
  ][i];
}

/**
 * The solution lines the book writes, one per step: "Theo sơ đồ, tổng số phần
 * bằng nhau là: 3 + 5 = 8 (phần)".
 * @param {TapeKind} kind
 * @param {TapeTask} task
 */
export function stepLines(kind, task) {
  const { m, n, given } = task;
  const s = solve(kind, task);
  return [
    kind === 'sum'
      ? `Theo sơ đồ, tổng số phần bằng nhau là: ${m} + ${n} = ${s.parts} (phần)`
      : `Theo sơ đồ, hiệu số phần bằng nhau là: ${n} − ${m} = ${s.parts} (phần)`,
    `Giá trị của một phần là: ${fmt(given)} : ${s.parts} = ${fmt(s.unit)}`,
    `Số bé là: ${fmt(s.unit)} × ${m} = ${fmt(s.small)}`,
    kind === 'sum'
      ? `Số lớn là: ${fmt(given)} − ${fmt(s.small)} = ${fmt(s.big)}`
      : `Số lớn là: ${fmt(s.small)} + ${fmt(given)} = ${fmt(s.big)}`,
  ];
}

/**
 * A nudge for a wrong pick at step `i`, never the answer.
 * @param {TapeKind} kind
 * @param {number} i
 */
export function stepHint(kind, i) {
  return [
    kind === 'sum'
      ? 'Em đếm tất cả các phần của cả hai số trên sơ đồ.'
      : 'Em đếm số phần số lớn hơn số bé trên sơ đồ.',
    kind === 'sum'
      ? 'Lấy tổng chia cho tổng số phần bằng nhau.'
      : 'Lấy hiệu chia cho hiệu số phần bằng nhau.',
    'Lấy giá trị một phần nhân với số phần của số bé.',
    kind === 'sum' ? 'Lấy tổng trừ đi số bé.' : 'Lấy số bé cộng với hiệu.',
  ][i];
}

/**
 * The right value at step `i` among the slips a child makes there: adding
 * the parts when the difference is asked (and the other way), dividing by the
 * wrong count, multiplying by the other number's parts, using the given
 * number for the sum when it is the difference.
 * @param {TapeKind} kind
 * @param {TapeTask} task
 * @param {number} i
 */
export function stepOptions(kind, task, i) {
  const { m, n, given } = task;
  const s = solve(kind, task);
  const other = kind === 'sum' ? n - m : m + n;
  const right = s[STEP_NAMES[i]];
  /** @type {number[]} */
  const slips = [
    [other, n, m],
    [given / other, given / n, given / m],
    [s.unit * n, s.unit * (m + 1), given - s.unit],
    [s.unit * m, kind === 'sum' ? given + s.small : given - s.small, s.unit * (n + 1)],
  ][i];
  return slipOptions(right, slips, { near: [1, -1, 2, s.unit], min: 1 });
}

/**
 * A fresh task: a ratio in lowest terms with the smaller number first, one
 * part worth 2 to 30, never the same as `previous`.
 * @param {() => number} rand
 * @param {TapeKind} kind
 * @param {TapeTask} [previous]
 * @returns {TapeTask}
 */
export function drawTask(rand, kind, previous) {
  for (;;) {
    const m = int(rand, 1, 6);
    const n = int(rand, m + 1, 9);
    if (gcd(m, n) !== 1) continue;
    const unit = int(rand, 2, 30);
    const given = unit * (kind === 'sum' ? m + n : n - m);
    if (given < 6) continue;
    const task = { m, n, given };
    if (previous && previous.m === m && previous.n === n && previous.given === given) continue;
    return task;
  }
}
