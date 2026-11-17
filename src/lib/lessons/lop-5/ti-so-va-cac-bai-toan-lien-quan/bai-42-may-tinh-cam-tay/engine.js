/**
 * The guided tour of the pocket calculator: each task lists the keys to press
 * from turning the calculator on, and the guide accepts only the next key.
 * Pure and DOM-free.
 */
import { formatNumber } from '#lib/core/number-format.js';
import { KEY_WORDS, keysOf, run } from '../_shared/calc.js';

/**
 * @typedef {object} Task
 * @property {string} title what the child works out
 * @property {import('../_shared/calc.js').Key[]} keys from ON/C to the result
 * @property {number} value the result
 * @property {string} after what the result teaches
 */

/** @param {string} title @param {string} keys @param {number} value @param {string} after */
const task = (title, keys, value, after) => ({ title, keys: keysOf(keys), value, after });

/** The tasks of the lesson, in the book's order. */
export const TASKS = /** @type {Task[]} */ ([
  task('Tính 1 975 + 2 025', 'ON/C 1975+2025=', 4000, '1 975 + 2 025 = 4 000.'),
  task(
    'Tính 51 : 6',
    'ON/C 51÷6=',
    8.5,
    'Màn hình hiện 8.5. Máy dùng dấu chấm thay cho dấu phẩy, nên 51 : 6 = 8,5.',
  ),
  task(
    'Tính 4,75 × 8',
    'ON/C 4.75×8=',
    38,
    'Muốn nhập 4,75, em bấm 4, phím dấu chấm, 7, 5. Vậy 4,75 × 8 = 38.',
  ),
  task(
    'Bấm 5 + 2 × 3 =',
    'ON/C 5+2×3=',
    21,
    'Máy hiện 21 vì máy tính lần lượt từ trái sang phải: (5 + 2) × 3 = 21. Nhưng theo thứ tự thực hiện phép tính, 5 + 2 × 3 = 5 + 6 = 11. Em cần tính 2 × 3 trước rồi mới cộng với 5.',
  ),
  task(
    'Tìm 8% của 35',
    'ON/C 35×8%',
    2.8,
    'Bấm số, phím ×, số phần trăm rồi phím %. 8% của 35 là 2,8.',
  ),
  task(
    'Tìm tỉ số phần trăm của 16 và 80',
    'ON/C 16÷80%',
    20,
    'Bấm số thứ nhất, phím ÷, số thứ hai rồi phím %. Tỉ số phần trăm của 16 và 80 là 20%.',
  ),
  task('Tìm 32% của 4', 'ON/C 4×32%', 1.28, 'Màn hình hiện 1.28. Vậy 32% của 4 là 1,28.'),
  task(
    'Tìm tỉ số phần trăm của 38 và 125',
    'ON/C 38÷125%',
    30.4,
    'Màn hình hiện 30.4. Tỉ số phần trăm của 38 và 125 là 30,4%.',
  ),
]);

/**
 * The guide after the child pressed `key` with `done` keys of task `t`
 * already pressed: whether to take the key, and what to say.
 * @param {Task} t
 * @param {number} done
 * @param {import('../_shared/calc.js').Key} key
 * @returns {{ take: boolean, done: number, text: string, finished: boolean }}
 */
export function guide(t, done, key) {
  if (done >= t.keys.length) return { take: true, done, text: t.after, finished: true };
  const want = t.keys[done];
  if (key !== want)
    return {
      take: false,
      done,
      text: `Chưa đúng phím. Em tìm ${KEY_WORDS[want]} có viền vàng nhé.`,
      finished: false,
    };
  const next = done + 1;
  if (next === t.keys.length) return { take: true, done: next, text: t.after, finished: true };
  return { take: true, done: next, text: nextText(t, next), finished: false };
}

/**
 * What the guide asks for before key `done` of task `t`.
 * @param {Task} t
 * @param {number} done
 */
export function nextText(t, done) {
  return `${t.title}. Bấm ${KEY_WORDS[t.keys[done]]}.`;
}

/**
 * The keys of a task written for reading: '3 5 × 8 %'.
 * @param {Task} t
 */
export const keysText = (t) => t.keys.join(' ');

/**
 * The result the screen shows at the end of task `t`, read with a comma.
 * @param {Task} t
 */
export function resultText(t) {
  return formatNumber(Number(run(t.keys).entry));
}
