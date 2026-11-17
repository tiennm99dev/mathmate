/**
 * The translation board: a triangle, a circle or a line slid by the vector
 * u = (a; b), with the coordinate expression and the image's equation.
 */
import { numTex } from '#lib/core/number-format.js';
import { lineTex, ptTex, signedTex, translate } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */
/** @typedef {{ a: number, b: number, c: number }} Line */

/** Largest |a| and |b| of the vector on the board. */
export const U_LIMIT = 4;

/** The triangle ABC on the board. @type {Pt[]} */
export const TRIANGLE = [
  { x: -1, y: -1 },
  { x: 2, y: -1 },
  { x: -1, y: 1 },
];

/** The circle (C) on the board: centre K, radius R. */
export const CIRCLE = { centre: { x: -1, y: 0 }, r: 2 };

/** The line d: x − 2y + 2 = 0 on the board. @type {Line} */
export const LINE = { a: 1, b: -2, c: 2 };

/**
 * The image of the line a x + b y + c = 0 under the translation by u:
 * M'(x; y) is the image of M(x − u.x; y − u.y), so a(x − u.x) + b(y − u.y) + c = 0.
 * @param {Line} line @param {Pt} u @returns {Line}
 */
export function translateLine({ a, b, c }, u) {
  return { a, b, c: c - a * u.x - b * u.y };
}

/**
 * The equation of a circle as TeX: (x − 1)² + (y + 2)² = 25.
 * @param {Pt} centre @param {number} r
 */
export function circleTex(centre, r) {
  /** @param {string} v @param {number} k */
  const sq = (v, k) => (k === 0 ? `${v}^2` : `(${v}${signedTex(-k)})^2`);
  return `${sq('x', centre.x)} + ${sq('y', centre.y)} = ${numTex(r * r)}`;
}

/**
 * The coordinate expression of T_u applied to the point P, as TeX lines.
 * @param {Pt} p @param {Pt} u @param {string} name
 */
export function pointLineTex(p, u, name) {
  const q = translate(p, u);
  /** @param {number} v */
  const paren = (v) => (v < 0 ? `(${numTex(v)})` : numTex(v));
  return `${name}'\\big(${numTex(p.x)} + ${paren(u.x)};\\ ${numTex(p.y)} + ${paren(u.y)}\\big) = ${name}'${ptTex(q)}`;
}

/**
 * The TeX lines shown under the board for the chosen figure.
 * @param {'tam-giac' | 'duong-tron' | 'duong-thang'} figure
 * @param {Pt} u
 * @returns {string[]}
 */
export function workTex(figure, u) {
  const rule = `\\vec u = ${ptTex(u)}:\\quad x' = x${signedTex(u.x)},\\quad y' = y${signedTex(u.y)}`;
  if (figure === 'tam-giac') {
    return [rule, ...['A', 'B', 'C'].map((n, i) => pointLineTex(TRIANGLE[i], u, n))];
  }
  if (figure === 'duong-tron') {
    const k = translate(CIRCLE.centre, u);
    return [
      rule,
      `(C):\\ ${circleTex(CIRCLE.centre, CIRCLE.r)}`,
      `K${ptTex(CIRCLE.centre)} \\mapsto K'${ptTex(k)},\\quad R' = R = ${CIRCLE.r}`,
      `(C'):\\ ${circleTex(k, CIRCLE.r)}`,
    ];
  }
  return [rule, `d:\\ ${lineTex(LINE)}`, `d':\\ ${lineTex(translateLine(LINE, u))}`];
}

/**
 * Whether u is a direction vector of the line, so T_u maps it onto itself.
 * @param {Line} line @param {Pt} u
 */
export function alongLine(line, u) {
  return line.a * u.x + line.b * u.y === 0;
}

/**
 * The live sentence under the board.
 * @param {'tam-giac' | 'duong-tron' | 'duong-thang'} figure
 * @param {Pt} u
 */
export function translationNote(figure, u) {
  if (u.x === 0 && u.y === 0)
    return '$\\vec u = \\vec 0$: phép tịnh tiến theo vectơ-không là phép đồng nhất, mọi điểm đứng yên.';
  if (figure === 'tam-giac')
    return "Các vectơ $\\overrightarrow{AA'}$, $\\overrightarrow{BB'}$, $\\overrightarrow{CC'}$ đều bằng $\\vec u$. Tam giác $A'B'C'$ bằng tam giác $ABC$: $A'B' = AB$, $B'C' = BC$, $C'A' = CA$.";
  if (figure === 'duong-tron')
    return "Tâm $K$ trượt theo $\\vec u$ thành $K'$, bán kính giữ nguyên: ảnh của đường tròn là đường tròn cùng bán kính.";
  return alongLine(LINE, u)
    ? "$\\vec u$ là một vectơ chỉ phương của $d$, nên $d'$ trùng với $d$."
    : "$d'$ song song với $d$: hai phương trình chỉ khác nhau ở hệ số tự do.";
}
