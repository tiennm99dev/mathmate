/**
 * Dividing by a two-digit number with a trial step: in each round the child
 * estimates the quotient digit (cover the last digit of the number being
 * divided and of the divisor, then divide the rest), tries a digit, and sees
 * at once whether it is too big (the product passes the number) or too small
 * (what is left is still at least the divisor). The working itself is
 * `../_shared/division.js`. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { checkText, divText } from '#lib/core/kid/column-steps.js';
import { stepsOf } from '../_shared/division.js';

/** @typedef {import('../_shared/division.js').Task} Task */
/** @typedef {import('../_shared/division.js').Step} Step */
/** @typedef {'exact' | 'rest' | 'big'} Kind */

/** The first task of each kind; the first two are the book's. */
export const FIRST = /** @type {Record<Kind, Task>} */ ({
  exact: { n: 216, d: 12 },
  rest: { n: 779, d: 18 },
  big: { n: 10105, d: 43 },
});

/**
 * The estimated quotient digit: cover the ones digit of the number being
 * divided and of the divisor, and divide what is left (at most 9).
 * @param {number} partial
 * @param {number} d
 */
export function estimateOf(partial, d) {
  if (partial < d) return 0;
  return Math.min(9, Math.floor(Math.floor(partial / 10) / Math.floor(d / 10)));
}

/**
 * The estimate in words.
 * @param {number} partial
 * @param {number} d
 */
export function estimateText(partial, d) {
  if (partial < d) return `${partial} bé hơn ${d}, nên viết 0.`;
  const top = Math.floor(partial / 10);
  const tens = Math.floor(d / 10);
  const raw = Math.floor(top / tens);
  const guess = estimateOf(partial, d);
  const capped = raw > 9 ? ' Thương mỗi lượt chỉ có một chữ số, nên em thử 9.' : '';
  return `Ước lượng: ${partial} : ${d}, em che chữ số cuối, được ${top} : ${tens} = ${raw}.${capped} Em thử ${guess}.`;
}

/**
 * What a tried quotient digit gives: too big, too small or right.
 * @param {number} partial
 * @param {number} d
 * @param {number} picked
 * @returns {{ verdict: 'big' | 'small' | 'right', text: string }}
 */
export function trialOf(partial, d, picked) {
  const product = picked * d;
  if (product > partial) {
    return {
      verdict: 'big',
      text: `Thử ${picked}: ${picked} × ${d} = ${fmt(product)}, lớn hơn ${fmt(partial)}. ${picked} quá lớn, em thử số bé hơn.`,
    };
  }
  const rest = partial - product;
  if (rest >= d) {
    return {
      verdict: 'small',
      text: `Thử ${picked}: ${picked} × ${d} = ${fmt(product)}, ${fmt(partial)} − ${fmt(product)} = ${rest}, chưa bé hơn ${d}. ${picked} quá bé, em thử số lớn hơn.`,
    };
  }
  return {
    verdict: 'right',
    text: `Thử ${picked}: ${picked} × ${d} = ${fmt(product)}, ${fmt(partial)} − ${fmt(product)} = ${rest}, bé hơn ${d}. Đúng rồi, viết ${picked}.`,
  };
}

/**
 * The sentence that opens a round, or the closing one once every step is
 * done. `stage` counts the steps of `stepsOf` already done.
 * @param {Task} task
 * @param {number} stage
 */
export function promptOf(task, stage) {
  const steps = stepsOf(task);
  const { n, d } = task;
  if (stage >= steps.length) return `Vậy ${divText(n, d)}. ${checkText(n, d)}`;
  const step = steps[stage];
  if (step.kind === 'down') {
    const next = step.rest * 10 + step.answer;
    return `Em hạ ${step.answer} xuống, được ${fmt(next)}.`;
  }
  const start =
    stage === 0
      ? `${String(n).slice(0, step.end)} bé hơn ${d}, nên em lấy ${fmt(step.partial)} chia cho ${d}. `
      : '';
  return `${start}${estimateText(step.partial, d)}`;
}

/**
 * A random division of a kind: a three-digit number divided evenly, one with
 * a remainder, or a four- or five-digit number, by a divisor from 11 to 99.
 * @param {() => number} rand
 * @param {Kind} kind
 * @param {Task} [not] a task not to repeat
 * @returns {Task}
 */
export function drawTask(rand, kind, not) {
  for (let i = 0; i < 1000; i++) {
    const d = int(rand, 11, 99);
    const q = kind === 'big' ? int(rand, 100, 999) : int(rand, 10, 99);
    const rest = kind === 'exact' ? 0 : int(rand, kind === 'rest' ? 1 : 0, d - 1);
    const n = q * d + rest;
    const fits = kind === 'big' ? n >= 1000 && n <= 99999 : n >= 100 && n <= 999;
    if (fits && !(not && not.n === n && not.d === d)) return { n, d };
  }
  return FIRST[kind];
}
