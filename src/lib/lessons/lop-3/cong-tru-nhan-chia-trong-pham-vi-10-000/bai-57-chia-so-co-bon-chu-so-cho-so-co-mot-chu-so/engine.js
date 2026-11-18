/**
 * The four-digit divisions by a digit the lesson works in columns, from the left,
 * on the core division board (`#lib/core/kid/division-worker.svelte`): the
 * first task of each case and new ones drawn at random. Pure and DOM-free.
 */
import { drawDivision } from '../_shared/columns.js';

/** @typedef {import('#lib/core/kid/division-steps.js').Task} Task */
/** @typedef {import('../_shared/columns.js').DivKind} TaskKind */

/** @type {Record<TaskKind, Task>} */
const FIRST = {
  exact: { n: 6369, d: 3 },
  rest: { n: 2487, d: 2 },
  zero: { n: 4216, d: 4 },
  two: { n: 1276, d: 4 },
};

/**
 * The first task of a kind.
 * @param {TaskKind} kind
 * @returns {Task}
 */
export const firstTask = (kind) => FIRST[kind];

/**
 * Another task of a kind.
 * @param {() => number} rand
 * @param {TaskKind} kind
 * @param {Task} [not]
 * @returns {Task}
 */
export const makeTask = (rand, kind, not) => drawDivision(rand, kind, not);
