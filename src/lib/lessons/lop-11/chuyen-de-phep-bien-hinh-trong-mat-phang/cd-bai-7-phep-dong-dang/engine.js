/**
 * The similarity puzzle: chain homotheties about O with isometries
 * (reflections in Ox and Oy, quarter turns about O, translations) until a
 * triangle lands exactly on a similar target triangle. The chain is a
 * similarity whose ratio is the product of |k| over its homotheties.
 */
import { dist } from '#lib/geom-engine/plane.js';
import { tidy } from '#lib/core/number-format.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */
/** @typedef {import('../_shared/moves.js').Move} Move */

/** The moves with no parameter, one button each. @type {Move[]} */
export const MOVES = [
  { kind: 'axis', axis: 'Ox' },
  { kind: 'axis', axis: 'Oy' },
  { kind: 'rot', deg: 90 },
  { kind: 'rot', deg: -90 },
  { kind: 'hom', k: 2 },
  { kind: 'hom', k: 0.5 },
  { kind: 'hom', k: -0.5 },
];

/** The triangle every puzzle starts from: AB = 4, AC = 2, right-angled at A. @type {Pt[]} */
export const START = [
  { x: 2, y: 2 },
  { x: 6, y: 2 },
  { x: 2, y: 4 },
];

/** @typedef {{ target: Pt[], hint: string }} Puzzle */

/** @type {Puzzle[]} */
export const PUZZLES = [
  {
    target: [
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
    ],
    hint: 'Tam giác đích cùng hướng, nhỏ bằng một nửa, và các đường nối đỉnh tương ứng cùng đi qua $O$: một phép vị tự tâm $O$ là đủ.',
  },
  {
    target: [
      { x: -4, y: -3 },
      { x: -2, y: -3 },
      { x: -4, y: -2 },
    ],
    hint: 'Cạnh tương ứng của tam giác đích dài $2$, bằng một nửa $AB = 4$: thu nhỏ bằng $V_{(O,\\ \\frac{1}{2})}$, rồi tịnh tiến.',
  },
  {
    target: [
      { x: -1, y: -1 },
      { x: -3, y: -1 },
      { x: -1, y: -2 },
    ],
    hint: 'Tam giác đích nhỏ bằng một nửa và nằm ở phía bên kia của $O$: thử một phép vị tự tỉ số âm.',
  },
  {
    target: [
      { x: 4, y: -1 },
      { x: 6, y: -1 },
      { x: 4, y: -2 },
    ],
    hint: 'Tam giác đích bị "lật" trên dưới và nhỏ bằng một nửa: đối xứng trục $Ox$, thu nhỏ, rồi tịnh tiến.',
  },
  {
    target: [
      { x: -4, y: 3 },
      { x: -4, y: 5 },
      { x: -5, y: 3 },
    ],
    hint: 'Cạnh $AB$ nằm ngang, cạnh tương ứng của tam giác đích thẳng đứng: quay $90^\\circ$ quanh $O$, thu nhỏ, rồi tịnh tiến.',
  },
  {
    target: [
      { x: -4, y: -2 },
      { x: 4, y: -2 },
      { x: -4, y: 2 },
    ],
    hint: 'Tam giác đích lớn gấp đôi. Tịnh tiến trước để không bị tràn bảng (chẳng hạn đưa $A$ tới $(-2;\\ -1)$), rồi phóng to bằng $V_{(O,\\ 2)}$.',
  },
];

/**
 * The similarity ratio between the start triangle and a target: the ratio of
 * the matching longest sides.
 * @param {Pt[]} target
 */
export function targetRatio(target) {
  /** @param {Pt[]} t */
  const longest = (t) => Math.max(dist(t[0], t[1]), dist(t[1], t[2]), dist(t[2], t[0]));
  return tidy(longest(target) / longest(START), 6);
}
