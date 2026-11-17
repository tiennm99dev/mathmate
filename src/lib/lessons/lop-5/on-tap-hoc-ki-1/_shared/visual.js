/**
 * What a review question of this chapter draws above its options;
 * `figure-picture.svelte` draws it. Every visual carries `alt`, the sentence a
 * screen reader hears, which states the givens but never the answer.
 *
 * - `figure`: a plane shape (`Shape`) with its vertex names, if any.
 * - `height`: triangle `names[0..2]` with the height from `names[0]` to the
 *   foot `names[3]`; in the `vuong` variant the triangle is right-angled at
 *   `names[1]` and the height is the side `names[0]names[1]`.
 * - `measured`: a triangle, trapezoid, rectangle, square, circle or half
 *   circle with its given lengths written beside it (`labels`).
 * @typedef {'tam-giac-nhon' | 'tam-giac-vuong' | 'tam-giac-tu' | 'tam-giac-deu'
 *   | 'hinh-thang' | 'hinh-thang-vuong' | 'hinh-binh-hanh' | 'hinh-thoi'
 *   | 'hinh-chu-nhat' | 'hinh-vuong' | 'hinh-tron'} Shape
 * @typedef {'tam-giac' | 'hinh-thang' | 'hinh-chu-nhat' | 'hinh-vuong'
 *   | 'ban-kinh' | 'duong-kinh' | 'nua-tron'} MeasuredShape
 * @typedef {(
 *   | { type: 'figure', shape: Shape, names: readonly string[], alt: string }
 *   | { type: 'height', variant: 'nhon' | 'vuong', names: readonly string[], alt: string }
 *   | { type: 'measured', shape: MeasuredShape, labels: readonly string[], alt: string }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
