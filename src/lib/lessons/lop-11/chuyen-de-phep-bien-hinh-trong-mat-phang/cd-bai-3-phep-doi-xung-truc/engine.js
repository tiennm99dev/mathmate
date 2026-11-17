/**
 * The mirror board: a path drawn on one side of an axis and its mirror
 * image, and the axis hunt: does the reflection in a line through O map a
 * figure onto itself?
 */
import { AXIS_TEX, ptTex, reflect, sameFigure, samePoint } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */
/** @typedef {import('../_shared/transform.js').Axis} Axis */

/** @type {Axis[]} */
export const AXES = ['Ox', 'Oy', 'y=x', 'y=-x'];

/** Each axis as a x + b y + c = 0, for drawing. */
export const AXIS_LINE = /** @type {Record<Axis, { a: number, b: number, c: number }>} */ ({
  Ox: { a: 0, b: 1, c: 0 },
  Oy: { a: 1, b: 0, c: 0 },
  'y=x': { a: 1, b: -1, c: 0 },
  'y=-x': { a: 1, b: 1, c: 0 },
});

/** The half of a fir tree drawn at the start, to the right of Oy. @type {Pt[]} */
export const START_PATH = [
  { x: 0, y: 5 },
  { x: 3, y: 2 },
  { x: 1, y: 2 },
  { x: 4, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: -3 },
  { x: 0, y: -3 },
];

/**
 * The mirror image of a path in an axis.
 * @param {Pt[]} path @param {Axis} axis
 */
export function mirrorPath(path, axis) {
  return path.map((p) => reflect(p, axis));
}

/**
 * The live sentence about the pen point M and its image.
 * @param {Pt} m @param {Axis} axis
 */
export function penNote(m, axis) {
  const img = reflect(m, axis);
  const d = `$d: ${AXIS_TEX[axis]}$`;
  if (samePoint(m, img)) return `$M${ptTex(m)}$ nằm trên ${d}, nên $M$ biến thành chính nó.`;
  return `$M${ptTex(m)}$ có ảnh $M'${ptTex(img)}$: ${d} là đường trung trực của đoạn $MM'$.`;
}

/**
 * @typedef {{ id: string, name: string, points: Pt[] }} Shape
 */

/** Figures centred at O for the axis hunt. @type {Shape[]} */
export const SHAPES = [
  {
    id: 'vuong',
    name: 'Hình vuông',
    points: [
      { x: -2, y: -2 },
      { x: 2, y: -2 },
      { x: 2, y: 2 },
      { x: -2, y: 2 },
    ],
  },
  {
    id: 'chu-nhat',
    name: 'Hình chữ nhật',
    points: [
      { x: -4, y: -2 },
      { x: 4, y: -2 },
      { x: 4, y: 2 },
      { x: -4, y: 2 },
    ],
  },
  {
    id: 'thoi',
    name: 'Hình thoi',
    points: [
      { x: 0, y: -4 },
      { x: 2, y: 0 },
      { x: 0, y: 4 },
      { x: -2, y: 0 },
    ],
  },
  {
    id: 'tam-giac-can',
    name: 'Tam giác cân',
    points: [
      { x: -3, y: -2 },
      { x: 3, y: -2 },
      { x: 0, y: 4 },
    ],
  },
  {
    id: 'binh-hanh',
    name: 'Hình bình hành',
    points: [
      { x: -4, y: -2 },
      { x: 2, y: -2 },
      { x: 4, y: 2 },
      { x: -2, y: 2 },
    ],
  },
  {
    id: 'thang-can',
    name: 'Hình thang cân',
    points: [
      { x: -4, y: -2 },
      { x: 4, y: -2 },
      { x: 2, y: 2 },
      { x: -2, y: 2 },
    ],
  },
];

/**
 * Whether the reflection in `axis` maps the shape onto itself.
 * @param {Shape} shape @param {Axis} axis
 */
export function isAxisOf(shape, axis) {
  return sameFigure(shape.points, mirrorPath(shape.points, axis));
}

/**
 * The axes among the four lines through O that are axes of symmetry.
 * @param {Shape} shape
 */
export function axesOf(shape) {
  return AXES.filter((a) => isAxisOf(shape, a));
}

/**
 * The live sentence of the axis hunt.
 * @param {Shape} shape @param {Axis} axis
 */
export function huntNote(shape, axis) {
  const d = `$${AXIS_TEX[axis]}$`;
  return isAxisOf(shape, axis)
    ? `Ảnh trùng khít với hình: ${d} là một trục đối xứng của ${shape.name.toLowerCase()}.`
    : `Ảnh không trùng với hình: ${d} không phải là trục đối xứng của ${shape.name.toLowerCase()}.`;
}
