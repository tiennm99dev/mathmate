/**
 * Logic of the sum-and-difference board: three grid points read as the
 * three-point rule (A, B, C), the parallelogram rule (A, B, D), the
 * difference rule (O, A, B) or two forces on one object (O and the tips of
 * F₁, F₂). `figure` lists what to draw and the live sentence; the widget
 * only renders it.
 */
import { formatFixed, formatNumber, tidy } from '#lib/core/number-format.js';
import { add, isZero, len, lengthTex, relation, sub } from '../_shared/vectors.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {'ba-diem' | 'hbh' | 'hieu' | 'luc'} Mode */
/**
 * @typedef {{
 *   from: V, to: V, name: string, color: string,
 *   dashed?: boolean, side?: 1 | -1, bold?: boolean,
 * }} Drawn
 */
/**
 * @typedef {{
 *   vectors: Drawn[],
 *   points: { at: V, name: string }[],
 *   guides: [V, V][],
 *   handles: string[],
 *   tex: string,
 *   note: string,
 * }} Figure
 */

export const COLOR = { a: '#4f46e5', b: '#e11d48', sum: '#059669', help: '#94a3b8' };

/** Newtons per grid unit in the forces mode. */
export const NEWTONS = 10;

/** Board size in grid units. */
export const BOX = { xMin: 0, xMax: 10, yMin: 0, yMax: 7 };

/** @param {V} p */
const inside = (p) => p.x >= BOX.xMin && p.x <= BOX.xMax && p.y >= BOX.yMin && p.y <= BOX.yMax;

/**
 * The fourth vertex C of parallelogram ABCD from A, B, D.
 * @param {V} A @param {V} B @param {V} D
 */
export const fourth = (A, B, D) => sub(add(B, D), A);

/**
 * Whether the three points can stand in this mode: all on the board, and the
 * fourth vertex of the parallelogram too.
 * @param {Mode} mode @param {V[]} pts
 */
export function fits(mode, [P, Q, R]) {
  if (![P, Q, R].every(inside)) return false;
  if (mode === 'hbh' || mode === 'luc') return inside(fourth(P, Q, R));
  return true;
}

/** A length to two decimals, or exact. @param {V} u */
const L = (u) => lengthTex(len(u));

/** A force in newtons, exact or to one decimal. @param {V} u */
function newtons(u) {
  const f = tidy(len(u) * NEWTONS, 6);
  return Number.isInteger(f) ? `${formatNumber(f)} N` : `≈ ${formatFixed(f, 1)} N`;
}

/**
 * How |u + v| compares with |u| + |v|: equal only when u and v point the
 * same way.
 * @param {V} u @param {V} v
 */
function triangleNote(u, v) {
  return relation(u, v).same
    ? 'Hai vectơ cùng hướng nên độ dài vectơ tổng đúng bằng tổng hai độ dài.'
    : 'Độ dài vectơ tổng nhỏ hơn tổng hai độ dài, như cạnh $AC$ của tam giác $ABC$ ngắn hơn $AB + BC$.';
}

/**
 * What to draw for the three points in a mode, and the live sentence.
 * @param {Mode} mode @param {V[]} pts
 * @returns {Figure}
 */
export function figure(mode, [P, Q, R]) {
  if (mode === 'ba-diem') {
    const [A, B, C] = [P, Q, R];
    const a = sub(B, A);
    const b = sub(C, B);
    return {
      vectors: [
        { from: A, to: B, name: 'a', color: COLOR.a },
        { from: B, to: C, name: 'b', color: COLOR.b },
        { from: A, to: C, name: 'AC', color: COLOR.sum, bold: true, side: -1 },
      ],
      points: [
        { at: A, name: 'A' },
        { at: B, name: 'B' },
        { at: C, name: 'C' },
      ],
      guides: [],
      handles: ['A', 'B', 'C'],
      tex: `\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC},\\quad |\\overrightarrow{AC}| ${L(add(a, b))}`,
      note: isZero(add(a, b))
        ? '$C$ trùng $A$: $\\overrightarrow{AB} + \\overrightarrow{BA} = \\overrightarrow{AA} = \\vec 0$.'
        : `Kéo $B$ đi đâu thì $\\overrightarrow{AB} + \\overrightarrow{BC}$ vẫn là $\\overrightarrow{AC}$. ${triangleNote(a, b)}`,
    };
  }
  if (mode === 'hbh' || mode === 'luc') {
    const [A, B, D] = [P, Q, R];
    const C = fourth(A, B, D);
    const a = sub(B, A);
    const b = sub(D, A);
    const forces = mode === 'luc';
    const sum = add(a, b);
    return {
      vectors: [
        { from: A, to: B, name: forces ? 'F₁' : 'a', color: COLOR.a, side: -1 },
        { from: A, to: D, name: forces ? 'F₂' : 'b', color: COLOR.b },
        { from: A, to: C, name: forces ? 'F' : 'AC', color: COLOR.sum, bold: true },
      ],
      points: forces
        ? [{ at: A, name: 'O' }]
        : [
            { at: A, name: 'A' },
            { at: B, name: 'B' },
            { at: C, name: 'C' },
            { at: D, name: 'D' },
          ],
      guides: [
        [B, C],
        [D, C],
      ],
      handles: forces ? ['O', 'ngọn của lực F₁', 'ngọn của lực F₂'] : ['A', 'B', 'D'],
      tex: forces
        ? '\\vec F = \\vec F_1 + \\vec F_2'
        : `\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC},\\quad |\\overrightarrow{AC}| ${L(sum)}`,
      note: forces
        ? `$|\\vec F_1|$ ${newtons(a)}, $|\\vec F_2|$ ${newtons(b)}, hợp lực $|\\vec F|$ ${newtons(sum)}. ${
            isZero(sum)
              ? 'Hai lực ngược hướng, cùng độ lớn: hợp lực bằng $\\vec 0$, vật đứng cân bằng.'
              : 'Vật chịu tác dụng như chỉ một lực $\\vec F$ theo đường chéo hình bình hành.'
          }`
        : `$ABCD$ là hình bình hành nên $\\overrightarrow{AD} = \\overrightarrow{BC}$, và $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$. ${triangleNote(a, b)}`,
    };
  }
  const [O, A, B] = [P, Q, R];
  const a = sub(A, O);
  const b = sub(B, O);
  const tip = sub(A, b);
  return {
    vectors: [
      { from: O, to: A, name: 'a', color: COLOR.a, side: -1 },
      { from: O, to: B, name: 'b', color: COLOR.b },
      { from: A, to: tip, name: '', color: COLOR.b, dashed: true },
      { from: O, to: tip, name: '', color: COLOR.sum, dashed: true },
      { from: B, to: A, name: 'BA', color: COLOR.sum, bold: true },
    ],
    points: [
      { at: O, name: 'O' },
      { at: A, name: 'A' },
      { at: B, name: 'B' },
    ],
    guides: [],
    handles: ['O', 'A', 'B'],
    tex: `\\overrightarrow{OA} - \\overrightarrow{OB} = \\overrightarrow{BA},\\quad |\\overrightarrow{BA}| ${L(sub(a, b))}`,
    note: isZero(sub(a, b))
      ? '$A$ trùng $B$: $\\vec a - \\vec a = \\vec 0$.'
      : 'Nét đứt đỏ là vectơ đối $-\\vec b$ đặt tại $A$; nét đứt xanh $\\vec a + (-\\vec b)$ bằng $\\overrightarrow{BA}$: cùng hướng, cùng độ dài.',
  };
}
