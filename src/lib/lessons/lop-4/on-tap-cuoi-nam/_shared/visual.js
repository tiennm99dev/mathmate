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
 * - `table`: a table of data, one value per child under the column head `head`.
 * - `chart`: a column chart with its values over the columns.
 * - `tally`: a tally of a trial, one row of strokes per outcome.
 * @typedef {(
 *   | { type: 'column', a: number, b: number, op: '+' | '-' | '×' }
 *   | { type: 'fracs', items: Array<Frac | string> }
 *   | { type: 'shaded', parts: number, shaded: number, cols: number }
 *   | { type: 'angle', m: number, side: 'phai' | 'trai', protractor: boolean, names: readonly string[] }
 *   | { type: 'quad', shape: import('#lib/core/kid/pictures/quad-shapes.js').QuadShape, names: readonly string[] }
 *   | { type: 'table', title: string, head: string, rows: Row[] }
 *   | { type: 'chart', title: string, unit: string, data: Row[] }
 *   | { type: 'tally', title: string, rows: Array<{ label: string, count: number }> }
 * )} Visual
 */

/** @typedef {{ n: number, d: number }} Frac */

/** @typedef {{ label: string, value: number }} Row */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
