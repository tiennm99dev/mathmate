/**
 * Finding a fraction of a number with things: to find n/d of N things, the
 * child first shares the N things into d equal groups (N : d in each), then
 * taps n of the groups. The things in the tapped groups are n/d of N:
 * (N : d) × n, which is N × n/d. Every task shares evenly. Pure and
 * DOM-free.
 */
import { pictures } from '#lib/core/kid/pictures/index.js';
import { fracRich } from '../_shared/fractions.js';

/**
 * A task: n/d of N things drawn as `picture`.
 * @typedef {{
 *   N: number;
 *   n: number;
 *   d: number;
 *   picture: import('#lib/core/kid/pictures/index.js').PictureName;
 * }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { N: 12, n: 2, d: 3, picture: 'orange' },
  { N: 20, n: 3, d: 5, picture: 'butterfly' },
  { N: 16, n: 1, d: 4, picture: 'apple' },
  { N: 15, n: 2, d: 5, picture: 'flower' },
  { N: 18, n: 5, d: 6, picture: 'fish' },
  { N: 24, n: 3, d: 8, picture: 'star' },
  { N: 10, n: 4, d: 5, picture: 'balloon' },
];

/** The most groups the child may make. */
export const MAX_GROUPS = 8;

/**
 * The noun of a task's things: "quả cam".
 * @param {Task} t
 */
export const thing = (t) => pictures[t.picture];

/**
 * The answer: n/d of N.
 * @param {Task} t
 */
export const partOf = (t) => (t.N / t.d) * t.n;

/**
 * The live sentence under the things.
 * @param {Task} t
 * @param {number} groups how many groups the things are shared into
 * @param {number} picked groups tapped
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function partNote(t, groups, picked) {
  const name = thing(t);
  const frac = fracRich(t.n, t.d);
  if (groups !== t.d) {
    const even = t.N % groups === 0;
    return {
      tone: 'info',
      text: `Tìm ${frac} của ${t.N} ${name}. Mẫu số là ${t.d}: em chia ${t.N} ${name} thành ${t.d} nhóm bằng nhau. Em đang chia thành ${groups} nhóm${even ? '' : ', không đều'}.`,
    };
  }
  const each = t.N / t.d;
  if (picked < t.n) {
    return {
      tone: 'info',
      text: `Mỗi nhóm có ${t.N} : ${t.d} = ${each} ${name}. Tử số là ${t.n}: em chạm vào ${t.n} nhóm để tô màu. Em đã tô ${picked} nhóm.`,
    };
  }
  if (picked > t.n) {
    return {
      tone: 'warn',
      text: `Em đã tô ${picked} nhóm, nhiều hơn ${t.n} nhóm. Em chạm lại vào một nhóm để bỏ tô.`,
    };
  }
  return {
    tone: 'ok',
    text: `Đúng rồi! ${t.n} nhóm có ${each} × ${t.n} = ${partOf(t)} ${name}. Vậy ${frac} của ${t.N} là $${t.N} \\times \\dfrac{${t.n}}{${t.d}} = ${partOf(t)}$ ${name}.`,
  };
}

/**
 * The spoken name of group `k` (from 0).
 * @param {Task} t
 * @param {number} groups
 * @param {number} k
 * @param {boolean} on whether it is tapped
 */
export const groupLabel = (t, groups, k, on) =>
  `Nhóm ${k + 1}: ${t.N / groups} ${thing(t)}${on ? ', đã tô màu' : ''}`;
