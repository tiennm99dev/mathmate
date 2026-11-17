/**
 * The construction puzzle of the chapter review: each round asks for a line
 * or a circle given by the chapter's conditions (a general or parametric
 * equation, parallel or perpendicular through a point, a tangent, a circle
 * in either form), and the learner builds it on the grid with two handles.
 * Rounds are drawn from a seed so they can be rebuilt and tested; every
 * target has at least two whole-number points on the board, so it can be
 * built exactly.
 */
import { int, pick, rng } from '#lib/core/drill.js';
import { numTex } from '#lib/core/number-format.js';
import {
  circleTex,
  coordTex,
  expandedTex,
  latticeOnCircle,
  lineByNormal,
  lineTex,
  lineThrough,
  paramTex,
  sameLine,
  tangentAt,
} from '../_shared/coords.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {import('../_shared/coords.js').Line} Line */
/**
 * @typedef {{
 *   kind: 'line',
 *   prompt: string,
 *   hint: string,
 *   target: Line,
 *   given: { line?: Line, point?: V, circle?: { I: V, r2: number } },
 * } | {
 *   kind: 'circle',
 *   prompt: string,
 *   hint: string,
 *   I: V,
 *   r2: number,
 * }} Round
 */

/** The board, in grid units. */
export const BOX = { xMin: -6, xMax: 6, yMin: -5, yMax: 5 };

/** @param {V} p */
export const onBoard = (p) =>
  p.x >= BOX.xMin && p.x <= BOX.xMax && p.y >= BOX.yMin && p.y <= BOX.yMax;

/** Small direction vectors, so a line through a point inside meets another grid point. */
const DIRS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: -2 },
  { x: 2, y: -1 },
];

/** Squares of radii whose circles pass through whole-number points. */
const R2 = [4, 5, 9, 10, 13];

/** @param {() => number} rand */
const inner = (rand) => ({ x: int(rand, -3, 3), y: int(rand, -2, 2) });

/** Where the two handles start each round; no round is built by them already. */
export const START = [
  { x: -4, y: -3 },
  { x: -1, y: -3 },
];

/** A point with its TeX name: A(2;\ -1). @param {string} name @param {V} p */
const pointTex = (name, p) => `${name}${coordTex(p.x, p.y)}`;

/** The number of round kinds, taken in turn. */
export const KINDS = 7;

/**
 * The round for a seed; kinds come in turn so a run of rounds covers them all.
 * @param {number} seed
 * @returns {Round}
 */
export function makeRound(seed) {
  const rand = rng(seed * 7919 + 13);
  const kind = ((seed % KINDS) + KINDS) % KINDS;
  if (kind === 0) {
    const P = inner(rand);
    const u = pick(rand, DIRS);
    const target = lineThrough(P, { x: P.x + u.x, y: P.y + u.y });
    return {
      kind: 'line',
      prompt: `Dựng đường thẳng $\\Delta: ${lineTex(target)}$.`,
      hint: 'Tìm hai điểm có toạ độ nguyên thoả mãn phương trình: chọn $x$ rồi tính $y$ (hoặc ngược lại).',
      target,
      given: {},
    };
  }
  if (kind === 1) {
    const P = inner(rand);
    const u = pick(rand, DIRS);
    const k = pick(rand, [1, 2]);
    const target = lineThrough(P, { x: P.x + u.x, y: P.y + u.y });
    return {
      kind: 'line',
      prompt: `Dựng đường thẳng $\\Delta: ${paramTex(P, { x: k * u.x, y: k * u.y })}$.`,
      hint: 'Với $t = 0$ ta được một điểm của $\\Delta$; với $t = 1$ (hoặc $t = -1$) ta được điểm thứ hai.',
      target,
      given: {},
    };
  }
  if (kind === 2 || kind === 3) {
    const n = pick(rand, DIRS);
    const B = inner(rand);
    const line = lineByNormal(B, n);
    let A = inner(rand);
    while (line.a * A.x + line.b * A.y + line.c === 0) A = inner(rand);
    const parallel = kind === 2;
    const target = parallel ? lineByNormal(A, n) : lineByNormal(A, { x: -n.y, y: n.x });
    return {
      kind: 'line',
      prompt: `Dựng đường thẳng đi qua $${pointTex('A', A)}$ và ${parallel ? 'song song' : 'vuông góc'} với $d: ${lineTex(line)}$.`,
      hint: parallel
        ? 'Đường cần dựng có cùng vectơ pháp tuyến (và cùng vectơ chỉ phương) với $d$: từ $A$, đi theo hướng của $d$.'
        : 'Vectơ pháp tuyến của $d$ là vectơ chỉ phương của đường cần dựng: từ $A$, đi theo hướng $\\vec n_d$.',
      target,
      given: { line, point: A },
    };
  }
  if (kind === 4) {
    for (;;) {
      const I = inner(rand);
      const r2 = pick(rand, R2);
      const M = pick(rand, latticeOnCircle(I, r2));
      const target = tangentAt(I, M);
      const u = { x: -target.b, y: target.a };
      const other = [1, -1].some((s) => onBoard({ x: M.x + s * u.x, y: M.y + s * u.y }));
      if (!onBoard(M) || !other || sameLine(target, lineThrough(START[0], START[1]))) continue;
      return {
        kind: 'line',
        prompt: `Dựng tiếp tuyến của đường tròn $(C): ${circleTex(I, r2)}$ tại điểm $${pointTex('M', M)}$.`,
        hint: 'Tiếp tuyến tại $M$ vuông góc với bán kính $IM$: nó đi qua $M$ và nhận $\\overrightarrow{IM}$ làm vectơ pháp tuyến.',
        target,
        given: { point: M, circle: { I, r2 } },
      };
    }
  }
  const I = { x: int(rand, -2, 2), y: int(rand, -1, 1) };
  const r2 = pick(rand, R2);
  if (kind === 5) {
    return {
      kind: 'circle',
      prompt: `Dựng đường tròn $(C): ${circleTex(I, r2)}$: kéo tâm $I$, rồi kéo điểm $M$ tới một điểm của đường tròn.`,
      hint: 'Tâm là $(a; b)$ trong $(x - a)^2 + (y - b)^2 = R^2$; bán kính là căn bậc hai của vế phải.',
      I,
      r2,
    };
  }
  return {
    kind: 'circle',
    prompt: `Dựng đường tròn $(C): ${expandedTex(I, r2)}$: kéo tâm $I$, rồi kéo điểm $M$ tới một điểm của đường tròn.`,
    hint: 'Từ $-2a$, $-2b$ tìm tâm $I(a; b)$, rồi $R = \\sqrt{a^2 + b^2 - c}$.',
    I,
    r2,
  };
}

/**
 * Whether the learner's two points build the round's figure: the line PQ is
 * the target, or P is the centre and Q lies on the circle.
 * @param {Round} round @param {V} P @param {V} Q
 */
export function isBuilt(round, P, Q) {
  if (P.x === Q.x && P.y === Q.y) return false;
  if (round.kind === 'line') return sameLine(lineThrough(P, Q), round.target);
  const d2 = (Q.x - P.x) ** 2 + (Q.y - P.y) ** 2;
  return P.x === round.I.x && P.y === round.I.y && d2 === round.r2;
}

/**
 * What the learner has built so far, as rich text.
 * @param {Round} round @param {V} P @param {V} Q
 */
export function builtText(round, P, Q) {
  if (P.x === Q.x && P.y === Q.y) return 'Hai điểm đang trùng nhau: kéo chúng ra xa nhau.';
  if (round.kind === 'line') return `Đường thẳng em dựng: $${lineTex(lineThrough(P, Q))}$.`;
  const d2 = (Q.x - P.x) ** 2 + (Q.y - P.y) ** 2;
  return `Đường tròn em dựng: tâm $${pointTex('I', P)}$, $R^2 = ${numTex(d2)}$, tức là $${circleTex(P, d2)}$.`;
}
