/**
 * Equal fractions on two strips. The top strip shows a given fraction; the
 * bottom strip shows the same amount as the simplest form with every part
 * cut into k smaller parts, and the child cuts finer or coarser. Cutting multiplies the
 * numerator and the denominator by k (quy đồng); k = 1 is the fraction
 * reduced to lowest terms (rút gọn). The bottom strip starts cut like the
 * top one. Each task asks for the equal fraction
 * with a given denominator. Pure and DOM-free.
 */
import { simplify } from '#lib/fraction-engine/index.js';

/** The longest strip drawn, in parts. */
export const MAX_PARTS = 48;

/**
 * A task: the given fraction n/d and the denominator wanted.
 * @typedef {{ n: number, d: number, want: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { n: 3, d: 5, want: 10 },
  { n: 12, d: 20, want: 5 },
  { n: 2, d: 3, want: 15 },
  { n: 18, d: 24, want: 4 },
  { n: 7, d: 12, want: 24 },
  { n: 6, d: 8, want: 4 },
  { n: 5, d: 6, want: 18 },
  { n: 1, d: 3, want: 12 },
];

/**
 * The simplest form of a task's fraction.
 * @param {Task} task
 */
export const baseOf = (task) => simplify({ n: task.n, d: task.d });

/**
 * The largest k the bottom strip may take.
 * @param {Task} task
 */
export const maxCut = (task) => Math.floor(MAX_PARTS / baseOf(task).d);

/**
 * The fraction the bottom strip shows when each part is cut into k.
 * @param {Task} task
 * @param {number} k
 */
export function cutFraction(task, k) {
  const base = baseOf(task);
  return { n: base.n * k, d: base.d * k };
}

/**
 * The k the bottom strip starts with: the same cut as the given fraction,
 * so both strips look alike at first.
 * @param {Task} task
 */
export const startCut = (task) => task.d / baseOf(task).d;

/**
 * The k that answers a task.
 * @param {Task} task
 */
export const answerCut = (task) => task.want / baseOf(task).d;

/**
 * The live line under the strips.
 * @param {Task} task
 * @param {number} k
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function cutNote(task, k) {
  const f = cutFraction(task, k);
  const base = baseOf(task);
  const given = `$\\dfrac{${task.n}}{${task.d}}$`;
  const shown = `$\\dfrac{${f.n}}{${f.d}}$`;
  if (f.d === task.want) {
    const how =
      f.d < task.d
        ? `Chia cả tử số và mẫu số cho ${task.d / f.d}`
        : f.d > task.d
          ? `Nhân cả tử số và mẫu số với ${f.d / task.d}`
          : 'Hai phân số giống nhau';
    return { tone: 'ok', text: `Đúng rồi! ${given} = ${shown}. ${how}.` };
  }
  const cut =
    k === 1
      ? `Băng dưới chia ${base.d} phần, tô ${base.n} phần: ${shown}. Đây là phân số tối giản.`
      : `Băng dưới chia ${f.d} phần bằng nhau, tô ${f.n} phần: ${shown}.`;
  const way = f.d < task.want ? 'Em chia nhỏ thêm.' : 'Mẫu số đang lớn hơn, em bớt chia nhỏ.';
  return { tone: 'info', text: `${cut} Hai băng tô dài bằng nhau. ${way}` };
}
