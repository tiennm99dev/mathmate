/**
 * The formula triangle of steady motion: s on top, v and t below. Covering
 * the quantity a problem asks for leaves the way to compute it: s = v × t,
 * v = s : t, t = s : v. A task tells a story with two known quantities; the
 * child covers the unknown one, then picks its value. Pure and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/** @typedef {'s' | 'v' | 't'} Quantity */

/** The name of each quantity. */
export const NAMES = /** @type {const} */ ({ s: 'quãng đường', v: 'vận tốc', t: 'thời gian' });

/** The rule left visible when a quantity is covered. */
export const FORMULAS = /** @type {const} */ ({ s: 's = v × t', v: 'v = s : t', t: 't = s : v' });

/**
 * The value of the covered quantity from the two others.
 * @param {Quantity} unknown
 * @param {{ s?: number, v?: number, t?: number }} known
 */
export function solve(unknown, known) {
  const { s = 0, v = 0, t = 0 } = known;
  if (unknown === 's') return tidy(v * t);
  if (unknown === 'v') return tidy(s / t);
  return tidy(s / v);
}

/**
 * A problem: its story, the two known values, the unknown and its units,
 * and the options for the answer with the right one at `answer`.
 * @typedef {{
 *   story: string,
 *   unknown: Quantity,
 *   known: { s?: number, v?: number, t?: number },
 *   units: { s: string, v: string, t: string },
 *   options: string[],
 *   answer: number,
 *   result: string,
 * }} Task
 */

const KM_H = { s: 'km', v: 'km/giờ', t: 'giờ' };
const M_S = { s: 'm', v: 'm/giây', t: 'giây' };

/** @type {readonly Task[]} */
export const TASKS = [
  {
    story: 'Một ô tô đi với vận tốc 42,5 km/giờ trong 4 giờ. Tính quãng đường ô tô đi được.',
    unknown: 's',
    known: { v: 42.5, t: 4 },
    units: KM_H,
    options: ['10,625 km', '46,5 km', '170 km', '180 km'],
    answer: 2,
    result: '170 km',
  },
  {
    story:
      'Một người đi bộ với vận tốc 5 km/giờ trên quãng đường 10 km. Tính thời gian người đó đi.',
    unknown: 't',
    known: { s: 10, v: 5 },
    units: KM_H,
    options: ['0,5 giờ', '2 giờ', '15 giờ', '50 giờ'],
    answer: 1,
    result: '2 giờ',
  },
  {
    story: 'Một người đi xe đạp được 24 km trong 2 giờ. Tính vận tốc của người đó.',
    unknown: 'v',
    known: { s: 24, t: 2 },
    units: KM_H,
    options: ['12 km/giờ', '22 km/giờ', '26 km/giờ', '48 km/giờ'],
    answer: 0,
    result: '12 km/giờ',
  },
  {
    story: 'Một xe máy đi với vận tốc 36 km/giờ trong 2,5 giờ. Tính quãng đường xe máy đi được.',
    unknown: 's',
    known: { v: 36, t: 2.5 },
    units: KM_H,
    options: ['14,4 km', '38,5 km', '72 km', '90 km'],
    answer: 3,
    result: '90 km',
  },
  {
    story: 'Một máy bay bay với vận tốc 800 km/giờ trên quãng đường 2 000 km. Tính thời gian bay.',
    unknown: 't',
    known: { s: 2000, v: 800 },
    units: KM_H,
    options: ['0,4 giờ', '2 giờ', '2,5 giờ', '3 giờ'],
    answer: 2,
    result: '2,5 giờ',
  },
  {
    story:
      'Một vận động viên chạy với vận tốc 6 m/giây trong 15 giây. Tính quãng đường người đó chạy được.',
    unknown: 's',
    known: { v: 6, t: 15 },
    units: M_S,
    options: ['2,5 m', '21 m', '90 m', '96 m'],
    answer: 2,
    result: '90 m',
  },
];

/**
 * The working shown once the right quantity is covered: 's = v × t = 42,5 × 4'.
 * @param {Task} task
 */
export function workText(task) {
  const { s, v, t } = task.known;
  const n = (/** @type {number | undefined} */ x) => formatNumber(x ?? 0);
  if (task.unknown === 's') return `s = v × t = ${n(v)} × ${n(t)}`;
  if (task.unknown === 'v') return `v = s : t = ${n(s)} : ${n(t)}`;
  return `t = s : v = ${n(s)} : ${n(v)}`;
}

/**
 * The line after covering a quantity the story already gives.
 * @param {Quantity} q
 */
export function coverSlip(q) {
  return `Đề bài đã cho biết ${NAMES[q]}. Em che đại lượng cần tìm: đề bài hỏi gì?`;
}

/**
 * The quantity, its value and unit as words: 'quãng đường 170 km'.
 * @param {Task} task
 */
export function answerText(task) {
  return `${NAMES[task.unknown]} ${formatNumber(solve(task.unknown, task.known))} ${task.units[task.unknown]}`;
}
