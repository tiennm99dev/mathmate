/**
 * What a review question of this chapter draws above its options;
 * `figure-picture.svelte` draws it. Every visual carries `alt`, the sentence a
 * screen reader hears, which states the givens but never the answer.
 *
 * - `figure`: a plane shape to name, with no lengths.
 * - `measured`: a triangle, trapezoid, rectangle, square or circle with its
 *   given lengths written beside it (`labels`, in the order of `MEASURED`).
 * - `solid`: a box (labels: length, width, height) or a cube (label: edge).
 * @typedef {'tam-giac-nhon' | 'tam-giac-vuong' | 'tam-giac-tu' | 'hinh-thang'
 *   | 'hinh-binh-hanh' | 'hinh-thoi' | 'hinh-chu-nhat' | 'hinh-vuong'} Shape
 * @typedef {'tam-giac' | 'hinh-thang' | 'hinh-chu-nhat' | 'hinh-vuong'
 *   | 'ban-kinh' | 'duong-kinh'} MeasuredShape
 * @typedef {'hop' | 'lap-phuong'} SolidShape
 * @typedef {(
 *   | { type: 'figure', shape: Shape, alt: string }
 *   | { type: 'measured', shape: MeasuredShape, labels: readonly string[], alt: string }
 *   | { type: 'solid', shape: SolidShape, labels: readonly string[], alt: string }
 * )} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} ReviewQuestion */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

export {};
