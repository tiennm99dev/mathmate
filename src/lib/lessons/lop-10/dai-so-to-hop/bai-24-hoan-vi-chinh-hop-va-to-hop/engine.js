/**
 * Student cards placed on chairs. In "xếp" mode the chairs are numbered, so
 * the order of the students counts (arrangements $A_n^k$, permutations $P_n$
 * when every student sits); in "chọn" mode the places only form a group, so
 * swapping students inside it gives nothing new (combinations $C_n^k$).
 */

import {
  arrangeCount,
  arrangements,
  chooseCount,
  combinations,
  factorial,
  fallingTex,
} from '../_shared/counting.js';

export const STUDENTS = ['An', 'Bình', 'Chi', 'Dũng', 'Hà'];

/** @typedef {'xep' | 'chon'} Mode */

/**
 * The key of a filled set of chairs: the seat order itself, or the sorted
 * group when order does not count.
 * @param {number[]} seats student indices in chair order @param {Mode} mode
 */
export function keyOf(seats, mode) {
  return (mode === 'xep' ? seats : [...seats].sort((a, b) => a - b)).join(',');
}

/**
 * How a key is written: 'An – Bình – Chi' in order, '{An, Bình, Chi}' as a group.
 * @param {string} key @param {Mode} mode
 */
export function labelOf(key, mode) {
  const names = key.split(',').map((i) => STUDENTS[Number(i)]);
  return mode === 'xep' ? names.join(' – ') : `{${names.join(', ')}}`;
}

/**
 * How many different ways there are in all.
 * @param {number} n @param {number} k @param {Mode} mode
 */
export function totalOf(n, k, mode) {
  return mode === 'xep' ? arrangeCount(n, k) : chooseCount(n, k);
}

/**
 * The count as the book writes it, with its numbers worked out.
 * @param {number} n @param {number} k @param {Mode} mode
 */
export function formulaTex(n, k, mode) {
  const A = arrangeCount(n, k);
  if (mode === 'xep') {
    if (k === n) return `P_{${n}} = ${n}! = ${fallingTex(n, n)} = ${A}`;
    return `A_{${n}}^{${k}} = ${fallingTex(n, k)} = ${A}`;
  }
  return `C_{${n}}^{${k}} = \\dfrac{A_{${n}}^{${k}}}{${k}!} = \\dfrac{${A}}{${factorial(k)}} = ${chooseCount(n, k)}`;
}

/**
 * Every way, as keys in the order they are listed.
 * @param {number} n @param {number} k @param {Mode} mode
 */
export function allKeys(n, k, mode) {
  const idx = Array.from({ length: n }, (_, i) => i);
  const list = mode === 'xep' ? arrangements(idx, k) : combinations(idx, k);
  return list.map((seats) => seats.join(','));
}

/**
 * Records a full set of chairs and says what it was.
 * @param {string[]} found keys found so far
 * @param {number[]} seats @param {Mode} mode @param {number} total
 * @returns {{ found: string[], fresh: boolean, text: string }}
 */
export function record(found, seats, mode, total) {
  const key = keyOf(seats, mode);
  const label = labelOf(key, mode);
  if (found.includes(key)) {
    const asSeated = seats.map((i) => STUDENTS[i]).join(', ');
    const text =
      mode === 'xep'
        ? `Cách xếp ${label} đã có rồi. Hãy đổi chỗ hoặc đổi bạn.`
        : `Nhóm ${label} đã có rồi: xếp ${asSeated} theo thứ tự khác vẫn là cùng một nhóm, vì khi chọn nhóm không xét thứ tự.`;
    return { found, fresh: false, text };
  }
  const next = [...found, key];
  const what = mode === 'xep' ? 'Cách xếp mới' : 'Nhóm mới';
  const tail =
    next.length === total
      ? ` Đã tìm đủ cả ${total} cách!`
      : ` Đã tìm ${next.length} trên ${total} cách.`;
  return { found: next, fresh: true, text: `${what}: ${label}.${tail}` };
}

/**
 * Why the total is what it is, in words.
 * @param {number} n @param {number} k @param {Mode} mode
 */
export function reasonText(n, k, mode) {
  const chairs = Array.from({ length: k }, (_, i) => n - i).join(', ');
  if (mode === 'xep') {
    const name = k === n ? `hoán vị của ${n} bạn` : `chỉnh hợp chập ${k} của ${n}`;
    return `Ghế 1 đến ghế ${k} lần lượt có ${chairs} cách chọn bạn ngồi, nên theo quy tắc nhân số cách xếp là tích của chúng. Mỗi cách xếp là một ${name}.`;
  }
  return `Mỗi nhóm ${k} bạn xếp vào ${k} ghế được ${k}! = ${factorial(k)} cách, nên số nhóm bằng số cách xếp có thứ tự chia cho ${factorial(k)}. Mỗi nhóm là một tổ hợp chập ${k} của ${n}.`;
}
