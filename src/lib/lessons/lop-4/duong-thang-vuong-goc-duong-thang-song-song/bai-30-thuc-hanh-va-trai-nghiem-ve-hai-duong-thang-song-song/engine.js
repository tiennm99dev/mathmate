/**
 * Drawing a line through a point H parallel to a line AB the book's way, in
 * two set-square steps: first the line MN through H perpendicular to AB
 * (slide the set square along AB until its other leg meets H), then the line
 * CD through H perpendicular to MN (slide the set square along MN until its
 * corner reaches H). Two lines perpendicular to the same line MN are
 * parallel, so CD is parallel to AB. Pure and DOM-free.
 *
 * @typedef {import('../_shared/lines.js').Pt} Pt
 * @typedef {import('../_shared/lines.js').Base} Base
 */
import { norm } from '#lib/core/visuals/angle-math.js';
import { pointAt, setSquare, slideWay } from '../_shared/lines.js';

/** Slide step of the set square, in board units. */
export const STEP = 10;

/** How far line MN reaches past AB on the far side from H. */
const BACK = 40;

/**
 * @typedef {{
 *   base: Base;
 *   len: number;
 *   target: number;
 *   h: number;
 *   start1: number;
 *   start2: number;
 * }} Task where H lies: `target` along AB from A and `h` across it
 */

/** @type {Task[]} */
export const TASKS = [
  { base: { o: { x: 50, y: 220 }, deg: 0 }, len: 300, target: 180, h: 120, start1: 60, start2: 40 },
  {
    base: { o: { x: 40, y: 230 }, deg: 15 },
    len: 320,
    target: 160,
    h: 110,
    start1: 260,
    start2: 60,
  },
  {
    base: { o: { x: 40, y: 70 }, deg: 345 },
    len: 320,
    target: 150,
    h: -120,
    start1: 40,
    start2: 60,
  },
];

/** @param {Task} task */
export const pointOf = (task) => pointAt(task.base, task.target, task.h);

/**
 * @typedef {{
 *   base: Base;
 *   names: readonly [string, string];
 *   len: number;
 *   target: number;
 *   side: 1 | -1;
 *   start: number;
 * }} Stage what one step slides along
 */

/**
 * The line the set square slides along in step 1 (AB) or step 2 (MN).
 * @param {Task} task @param {1 | 2} step
 * @returns {Stage}
 */
export function stageOf(task, step) {
  /** @type {1 | -1} */
  const side = task.h < 0 ? -1 : 1;
  if (step === 1)
    return {
      base: task.base,
      names: ['A', 'B'],
      len: task.len,
      target: task.target,
      side,
      start: task.start1,
    };
  const deg = norm(task.base.deg + side * 90);
  const foot = pointAt(task.base, task.target);
  const reach = Math.abs(task.h);
  return {
    base: { o: pointAt({ o: foot, deg }, -BACK), deg },
    names: ['M', 'N'],
    len: reach + 2 * BACK,
    target: reach + BACK,
    side: 1,
    start: task.start2,
  };
}

/**
 * The line drawn along the set square at slide position `s` of a stage.
 * @param {Stage} stage @param {number} s
 */
export function drawnLine(stage, s) {
  const sq = setSquare(stage.base, s, stage.side);
  return { p: sq.corner, deg: sq.legDeg };
}

/**
 * What the child hears while sliding in a step.
 * @param {1 | 2} step @param {Stage} stage @param {number} s
 */
export function slideMessage(step, stage, s) {
  const way = slideWay(s, stage.target, stage.names);
  if (step === 1)
    return way
      ? `Bước 1: Em trượt ê ke dọc AB ${way} đến khi cạnh góc vuông thứ hai gặp điểm H.`
      : 'Bước 1: Cạnh góc vuông thứ hai đã gặp điểm H. Em bấm "Vẽ theo cạnh ê ke" để vẽ đường thẳng MN.';
  return way
    ? `Bước 2: Ê ke nằm trên MN. Em trượt ê ke ${way} đến khi đỉnh góc vuông trùng với điểm H.`
    : 'Bước 2: Đỉnh góc vuông đã trùng với H. Em bấm "Vẽ theo cạnh ê ke" để vẽ đường thẳng CD.';
}

/**
 * What the child hears after drawing in a step.
 * @param {1 | 2} step @param {Stage} stage @param {number} s
 * @returns {{ done: boolean, text: string }}
 */
export function drawMessage(step, stage, s) {
  const way = slideWay(s, stage.target, stage.names);
  if (step === 1)
    return way
      ? {
          done: false,
          text: `Đường thẳng vừa vẽ vuông góc với AB nhưng chưa đi qua H. Em trượt ê ke ${way} rồi vẽ lại.`,
        }
      : {
          done: true,
          text: 'Bước 1 xong: đường thẳng MN đi qua H và vuông góc với AB. Bây giờ ê ke nằm trên MN.',
        };
  return way
    ? {
        done: false,
        text: `Đường thẳng vừa vẽ vuông góc với MN nhưng chưa đi qua H. Em trượt ê ke ${way} rồi vẽ lại.`,
      }
    : {
        done: true,
        text: 'Đúng rồi! CD đi qua H và vuông góc với MN. AB cũng vuông góc với MN, nên CD song song với AB.',
      };
}
