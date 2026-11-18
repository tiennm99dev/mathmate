/**
 * The three-digit divisions by a digit the lesson works in columns, from the left,
 * on the core division board (`#lib/core/kid/division-worker.svelte`): the
 * first task of each case and new ones drawn at random. Pure and DOM-free.
 */
import { drawDivision } from '../_shared/columns.js';

/** @typedef {import('#lib/core/kid/division-steps.js').Task} Task */
/** @typedef {import('../_shared/columns.js').DivKind} TaskKind */

/**
 * How this lesson words the division: a digit brought down is always read
 * with what it makes ("Hạ 9, được 9.").
 * @type {import('#lib/core/kid/division-steps.js').Wording}
 */
export const WORDING = { alwaysReach: true };

/** @type {Record<TaskKind, Task>} */
const FIRST = {
  exact: { n: 396, d: 3 },
  rest: { n: 538, d: 4 },
  zero: { n: 518, d: 5 },
  two: { n: 354, d: 6 },
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
