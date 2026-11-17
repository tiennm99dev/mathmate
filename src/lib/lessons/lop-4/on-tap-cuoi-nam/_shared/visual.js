/**
 * What a year-end review question draws above its options.
 * `quiz-visual.svelte` draws it; nothing here gives the answer away before the
 * question has ended.
 *
 * - `column`: an addition, subtraction or multiplication set out in columns.
 * - `fracs`: a line of fractions, whole numbers, words and signs; a `'?'`
 *   item is what is asked.
 * - `shaded`: a rectangle cut into `parts` equal pieces in rows of `cols`,
 *   `shaded` of them coloured.
 * - `angle`: an angle with vertex `names[0]` and sides through `names[1]`
 *   and `names[2]`, the first side pointing right (`phai`) or left (`trai`),
 *   with a protractor laid on it when `protractor` is set.
 * - `quad`: a rectangle, parallelogram or rhombus with its vertex names.
 * @typedef {(
 *   | { type: 'column', a: number, b: number, op: '+' | '-' | '×' }
 *   | { type: 'fracs', items: Array<Frac | string> }
 *   | { type: 'shaded', parts: number, shaded: number, cols: number }
 *   | { type: 'angle', m: number, side: 'phai' | 'trai', protractor: boolean, names: readonly string[] }
 *   | { type: 'quad', shape: import('./shapes.js').QuadShape, names: readonly string[] }
 * )} Visual
 */

/** @typedef {{ n: number, d: number }} Frac */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
