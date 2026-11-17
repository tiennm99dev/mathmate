/**
 * Equal fractions on two strips. The top strip shows a given fraction. The
 * bottom strip shows the same amount, its parts cut finer or joined back:
 * it is always the given fraction in lowest terms with every part cut into
 * k equal parts. Cutting finer multiplies the numerator and the denominator
 * by the same number; joining divides both by the same number; the shaded
 * length never changes. Each task asks for the equal fraction with a given
 * denominator. Pure and DOM-free.
 */
import { gcd } from '#lib/numtheory-engine/index.js';
import { fracTex, stepTex } from '../_shared/fractions.js';

/** The most parts the bottom strip is cut into. */
export const MAX_PARTS = 24;

/**
 * A task: the given fraction n/d and the denominator wanted.
 * @typedef {{ n: number, d: number, want: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { n: 3, d: 4, want: 8 },
  { n: 2, d: 3, want: 12 },
  { n: 6, d: 8, want: 4 },
  { n: 1, d: 2, want: 10 },
  { n: 10, d: 15, want: 3 },
  { n: 4, d: 5, want: 15 },
  { n: 8, d: 12, want: 6 },
  { n: 5, d: 6, want: 18 },
];

/**
 * A task's fraction in lowest terms.
 * @param {Task} task
 */
export function baseOf(task) {
  const g = gcd(task.n, task.d);
  return { n: task.n / g, d: task.d / g };
}

/**
 * The bottom strip's fraction when each part of the lowest-terms strip is cut
 * into k.
 * @param {Task} task
 * @param {number} k
 */
export function cutFraction(task, k) {
  const base = baseOf(task);
  return { n: base.n * k, d: base.d * k };
}

/**
 * The cut the bottom strip starts with: the same as the top strip.
 * @param {Task} task
 */
export const startCut = (task) => task.d / baseOf(task).d;

/**
 * The finest cut the bottom strip allows.
 * @param {Task} task
 */
export const maxCut = (task) => Math.floor(MAX_PARTS / baseOf(task).d);

/**
 * The cut that answers a task.
 * @param {Task} task
 */
export const answerCut = (task) => task.want / baseOf(task).d;

/**
 * TeX linking the given fraction to the bottom strip's: by multiplying or
 * dividing both terms by one number, or through the lowest terms.
 * @param {Task} task
 * @param {number} k
 */
export function relationTex(task, k) {
  const f = cutFraction(task, k);
  if (f.d === task.d) return `${fracTex(task.n, task.d)} = ${fracTex(f.n, f.d)}`;
  if (f.d % task.d === 0) return stepTex(task.n, task.d, f.d / task.d, '×');
  if (task.d % f.d === 0) return stepTex(task.n, task.d, task.d / f.d, ':');
  const base = baseOf(task);
  return `${fracTex(task.n, task.d)} = ${fracTex(base.n, base.d)} = ${fracTex(f.n, f.d)}`;
}

/**
 * The live sentence under the strips.
 * @param {Task} task
 * @param {number} k
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function cutNote(task, k) {
  const f = cutFraction(task, k);
  const rel = `$${relationTex(task, k)}$`;
  if (f.d === task.want) {
    return {
      tone: 'ok',
      text: `Đúng rồi! ${rel}. Phần tô màu của hai băng dài bằng nhau.`,
    };
  }
  if (k === startCut(task)) {
    return {
      tone: 'info',
      text: `Hai băng giống nhau: ${rel}. Em chia nhỏ thêm hoặc gộp bớt để băng dưới có ${task.want} phần.`,
    };
  }
  return {
    tone: 'info',
    text: `${rel}. Phần tô màu vẫn dài bằng nhau. Băng dưới cần có ${task.want} phần, bây giờ có ${f.d} phần.`,
  };
}
