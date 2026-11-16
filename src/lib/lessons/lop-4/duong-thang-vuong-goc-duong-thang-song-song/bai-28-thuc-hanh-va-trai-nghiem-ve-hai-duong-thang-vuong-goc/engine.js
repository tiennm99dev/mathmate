/**
 * Drawing a line through a point M perpendicular to a line AB the book's
 * way: lay one leg of the set square on AB, slide it along AB until its
 * other leg meets M, then draw along that leg. M lies on AB or outside it,
 * and AB may lie at a slant. Pure and DOM-free.
 */
import { pointAt, slideWay } from '../_shared/lines.js';

/** Slide step of the set square, in board units. */
export const STEP = 10;

/**
 * @typedef {{
 *   base: import('../_shared/lines.js').Base;
 *   len: number;
 *   target: number;
 *   h: number;
 *   start: number;
 * }} Task where M lies: `target` along AB from A and `h` across it
 */

/** @type {Task[]} */
export const TASKS = [
  { base: { o: { x: 60, y: 200 }, deg: 0 }, len: 280, target: 160, h: 0, start: 40 },
  { base: { o: { x: 50, y: 230 }, deg: 0 }, len: 300, target: 200, h: 130, start: 50 },
  { base: { o: { x: 50, y: 250 }, deg: 20 }, len: 300, target: 120, h: 120, start: 230 },
  { base: { o: { x: 40, y: 90 }, deg: 340 }, len: 320, target: 180, h: -110, start: 40 },
];

/** Names of the base line. */
export const NAMES = /** @type {const} */ (['A', 'B']);

/** @param {Task} task */
export const pointOf = (task) => pointAt(task.base, task.target, task.h);

/**
 * The side of AB the set square stands on: the side of M, or above AB when
 * M lies on it.
 * @param {Task} task
 * @returns {1 | -1}
 */
export const sideOf = (task) => (task.h < 0 ? -1 : 1);

/** @param {Task} task */
export function caseText(task) {
  return task.h === 0 ? 'Điểm M nằm trên đường thẳng AB.' : 'Điểm M nằm ngoài đường thẳng AB.';
}

/**
 * What the child hears while sliding, before drawing.
 * @param {Task} task @param {number} s
 * @returns {{ ready: boolean, text: string }}
 */
export function slideMessage(task, s) {
  if (s === task.target)
    return {
      ready: true,
      text: 'Cạnh góc vuông thứ hai của ê ke đã gặp điểm M. Em giữ ê ke và bấm "Vẽ theo cạnh ê ke".',
    };
  return {
    ready: false,
    text: `Em trượt ê ke ${slideWay(s, task.target, NAMES)} đến khi cạnh góc vuông thứ hai của ê ke gặp điểm M.`,
  };
}

/**
 * What the child hears after drawing along the set square at `s`.
 * @param {Task} task @param {number} s
 * @returns {{ done: boolean, text: string }}
 */
export function drawMessage(task, s) {
  if (s === task.target)
    return {
      done: true,
      text: 'Đúng rồi! Đường thẳng CD đi qua điểm M và vuông góc với đường thẳng AB.',
    };
  return {
    done: false,
    text: `Đường thẳng vừa vẽ vuông góc với AB nhưng chưa đi qua M. Em trượt ê ke ${slideWay(s, task.target, NAMES)} rồi vẽ lại.`,
  };
}
