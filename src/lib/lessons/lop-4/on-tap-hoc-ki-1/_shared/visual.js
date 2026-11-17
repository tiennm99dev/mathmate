/**
 * What a review question of this chapter draws above its options.
 * `quiz-visual.svelte` draws it; nothing here gives the answer away before the
 * question has ended.
 *
 * - `column`: an addition or subtraction set out in columns.
 * - `angle`: an angle with vertex `names[0]` and sides through `names[1]`
 *   and `names[2]`; the first side points right (`phai`) or left (`trai`),
 *   with a protractor laid on it when `protractor` is set.
 * - `clock`: a clock at a whole hour.
 * - `quad`: a rectangle, parallelogram or rhombus with its vertex names.
 * @typedef {(
 *   | { type: 'column', a: number, b: number, op: '+' | '-' }
 *   | { type: 'angle', m: number, side: 'phai' | 'trai', protractor: boolean, names: readonly string[] }
 *   | { type: 'clock', minutes: number }
 *   | { type: 'quad', shape: import('#lib/core/kid/pictures/quad-shapes.js').QuadShape, names: readonly string[] }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
