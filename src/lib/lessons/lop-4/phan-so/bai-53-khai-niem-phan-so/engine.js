/**
 * Colouring parts of a shape cut into equal parts to make a fraction. Each
 * task names a fraction, in digits or in words, and the child taps parts on
 * and off until the shaded parts show it: the denominator is how many equal
 * parts the shape has, the numerator how many are shaded. Pure and DOM-free.
 */
import { fracRich, fracWords } from '../_shared/fractions.js';

/**
 * A task: colour `want` of the `parts` equal parts of a shape. `ask` says
 * whether the fraction is shown in digits or read in words.
 * @typedef {{
 *   shape: 'circle' | 'bar' | 'grid',
 *   parts: number,
 *   cols?: number,
 *   want: number,
 *   ask: 'digits' | 'words',
 * }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { shape: 'circle', parts: 6, want: 5, ask: 'digits' },
  { shape: 'bar', parts: 4, want: 3, ask: 'words' },
  { shape: 'grid', parts: 8, cols: 4, want: 3, ask: 'digits' },
  { shape: 'circle', parts: 3, want: 2, ask: 'words' },
  { shape: 'bar', parts: 5, want: 2, ask: 'digits' },
  { shape: 'grid', parts: 9, cols: 3, want: 7, ask: 'words' },
  { shape: 'circle', parts: 8, want: 5, ask: 'digits' },
  { shape: 'grid', parts: 10, cols: 5, want: 7, ask: 'words' },
];

/** What each shape is called in a sentence. */
export const SHAPE_NAMES = { circle: 'hình tròn', bar: 'băng giấy', grid: 'hình chữ nhật' };

/**
 * The instruction of a task: "Tô màu 5/6 hình tròn." or "Tô màu ba phần tư
 * băng giấy."
 * @param {Task} task
 */
export function askText(task) {
  const what =
    task.ask === 'digits' ? fracRich(task.want, task.parts) : fracWords(task.want, task.parts);
  return `Tô màu ${what} ${SHAPE_NAMES[task.shape]}.`;
}

/**
 * Turn part i on or off.
 * @param {boolean[]} shaded
 * @param {number} i
 */
export const toggle = (shaded, i) => shaded.map((on, j) => (j === i ? !on : on));

/**
 * How many parts are shaded.
 * @param {boolean[]} shaded
 */
export const countOn = (shaded) => shaded.filter(Boolean).length;

/**
 * The live sentence under the shape for `count` shaded parts.
 * @param {Task} task
 * @param {number} count
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function shadeNote(task, count) {
  const whole = `${SHAPE_NAMES[task.shape]} được chia thành ${task.parts} phần bằng nhau`;
  if (count === 0) {
    return {
      tone: 'info',
      text: `${whole[0].toUpperCase()}${whole.slice(1)}. Em chạm vào từng phần để tô màu.`,
    };
  }
  const made = `${fracRich(count, task.parts)}, đọc là ${fracWords(count, task.parts)}`;
  if (count === task.want) {
    return {
      tone: 'ok',
      text: `Đúng rồi! Em đã tô màu ${count} phần trong ${task.parts} phần bằng nhau: ${made}.`,
    };
  }
  if (count > task.want) {
    return {
      tone: 'warn',
      text: `Em đã tô ${count} phần: ${made}. Nhiều hơn ${task.want} phần rồi, em bỏ bớt nhé.`,
    };
  }
  return { tone: 'info', text: `Em đã tô ${count} phần: ${made}. Em tô tiếp nhé.` };
}
