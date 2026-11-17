/**
 * Building a shape of small cubes to compare its volume with a model shape:
 * the child stacks cubes on a 3 × 3 plan, each tap on a cell adds one cube
 * there (a full column of 3 empties again), and the live line compares the
 * number of cubes of the two shapes. A task asks for a shape whose volume is
 * equal to, greater than or less than the model's. Pure and DOM-free.
 */
import { cubesOf } from '../_shared/cubes.js';

/** Cells of the plan along each side, and the tallest column. */
export const PLAN = 3;
export const TALLEST = 3;

/** @typedef {'bang' | 'lon-hon' | 'be-hon'} Goal */

/**
 * A model shape, as column heights with the back row first, and what the
 * child's shape must be beside it.
 * @typedef {{ name: string, rows: number[][], goal: Goal }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { name: 'A', rows: [[3, 2, 1]], goal: 'bang' },
  {
    name: 'B',
    rows: [
      [0, 0, 2],
      [2, 2, 0],
    ],
    goal: 'lon-hon',
  },
  {
    name: 'C',
    rows: [
      [0, 1, 1, 1],
      [2, 0, 0, 0],
    ],
    goal: 'be-hon',
  },
  {
    name: 'D',
    rows: [
      [0, 2],
      [3, 0],
    ],
    goal: 'bang',
  },
  {
    name: 'E',
    rows: [
      [0, 0, 3],
      [3, 3, 0],
    ],
    goal: 'bang',
  },
];

/** What a task asks for, after "Em xếp một hình có thể tích …". */
export const GOAL_WORDS = /** @type {const} */ ({
  bang: 'bằng',
  'lon-hon': 'lớn hơn',
  'be-hon': 'bé hơn',
});

/** An empty plan. @returns {number[][]} */
export const emptyPlan = () => Array.from({ length: PLAN }, () => Array(PLAN).fill(0));

/**
 * The plan after a tap on row `r`, column `c`: one more cube there, or none
 * once the column was full.
 * @param {readonly (readonly number[])[]} plan
 * @param {number} r
 * @param {number} c
 * @returns {number[][]}
 */
export function bump(plan, r, c) {
  return plan.map((row, i) =>
    row.map((h, j) => (i === r && j === c ? (h + 1) % (TALLEST + 1) : h)),
  );
}

/**
 * The number of cubes of a shape given by column heights.
 * @param {readonly (readonly number[])[]} rows
 */
export const countOf = (rows) => rows.flat().reduce((s, h) => s + h, 0);

/**
 * Whether two plans stack the same cubes in the same places.
 * @param {readonly (readonly number[])[]} a
 * @param {readonly (readonly number[])[]} b
 */
function sameShape(a, b) {
  const key = (/** @type {readonly (readonly number[])[]} */ rows) =>
    cubesOf(rows)
      .map((q) => `${q.x},${q.y},${q.z}`)
      .sort()
      .join(';');
  return key(a) === key(b);
}

/**
 * The relation of n cubes to m cubes in words.
 * @param {number} n
 * @param {number} m
 */
export const relation = (n, m) => (n === m ? 'bằng' : n > m ? 'lớn hơn' : 'bé hơn');

/**
 * Whether n cubes meet the task beside a model of m cubes.
 * @param {Goal} goal
 * @param {number} n
 * @param {number} m
 */
export function meets(goal, n, m) {
  if (n === 0) return false;
  if (goal === 'bang') return n === m;
  return goal === 'lon-hon' ? n > m : n < m;
}

/**
 * The live line under the two shapes.
 * @param {Task} task
 * @param {readonly (readonly number[])[]} plan
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function noteFor(task, plan) {
  const n = countOf(plan);
  const m = countOf(task.rows);
  if (n === 0) {
    return { tone: 'info', text: 'Em chạm vào các ô của mặt bằng để xếp khối lập phương.' };
  }
  const compare = `Hình của em có ${n} khối, hình ${task.name} có ${m} khối. Thể tích hình của em ${relation(n, m)} thể tích hình ${task.name}.`;
  if (!meets(task.goal, n, m)) {
    return {
      tone: 'info',
      text: `${compare} Em cần hình có thể tích ${GOAL_WORDS[task.goal]} thể tích hình ${task.name}.`,
    };
  }
  const shapes =
    task.goal === 'bang' && !sameShape(plan, task.rows)
      ? ' Hai hình khác dạng nhưng có cùng số khối nên thể tích bằng nhau.'
      : '';
  return { tone: 'ok', text: `Đúng rồi! ${compare}${shapes}` };
}

/** Row names of the plan, back row first. */
export const ROW_NAMES = ['Hàng sau', 'Hàng giữa', 'Hàng trước'];

/**
 * What a screen reader hears for a cell of the plan.
 * @param {number} r
 * @param {number} c
 * @param {number} h
 */
export function cellLabel(r, c, h) {
  const what = h === TALLEST ? 'Chạm để bỏ hết khối ở ô này.' : 'Chạm để thêm một khối.';
  return `${ROW_NAMES[r]}, cột ${c + 1}: ${h} khối. ${what}`;
}
