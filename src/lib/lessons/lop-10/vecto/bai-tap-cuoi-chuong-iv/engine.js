/**
 * Logic of the point-hunting game on the coordinate grid: from a start point
 * A, walk m steps of the vector a, then n steps of the vector b (a and b not
 * cùng phương), and land on the target T. Because a and b are not parallel,
 * the pair (m; n) with AT = m·a + n·b is unique; the hint solves for it from
 * the coordinate system m·a₁ + n·b₁ = t₁, m·a₂ + n·b₂ = t₂.
 */
import { numTex } from '#lib/core/number-format.js';
import { int, nonZero, pick, rng } from '#lib/core/drill.js';
import { add, coordTex, crossV, scale, sub } from '../_shared/vectors.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {{ A: V, a: V, b: V, m: number, n: number, T: V }} Round */

/** The board, in grid units. */
export const BOX = { xMin: -6, xMax: 6, yMin: -5, yMax: 5 };

/** The largest number of steps of one vector. */
export const MAX_STEPS = 4;

/** @param {V} p */
export const onBoard = (p) =>
  p.x >= BOX.xMin && p.x <= BOX.xMax && p.y >= BOX.yMin && p.y <= BOX.yMax;

/** Short vectors the rounds are built from: no zero vector, at most 2 per side. */
/** @type {V[]} */
const SMALL = [];
for (let x = -2; x <= 2; x += 1) {
  for (let y = -2; y <= 2; y += 1) if (x !== 0 || y !== 0) SMALL.push({ x, y });
}

/**
 * Where the walk lands: A + m·a, then + n·b.
 * @param {V} A @param {V} a @param {V} b @param {number} m @param {number} n
 */
export function walk(A, a, b, m, n) {
  const P = add(A, scale(a, m));
  return { P, M: add(P, scale(b, n)) };
}

/**
 * One round from a seed: a and b not cùng phương, both m and n non-zero, and
 * A, the turning point A + m·a and T on the board.
 * @param {number} seed
 * @returns {Round}
 */
export function makeRound(seed) {
  const rand = rng(seed);
  for (;;) {
    const a = pick(rand, SMALL);
    const b = pick(rand, SMALL);
    if (crossV(a, b) === 0) continue;
    const m = nonZero(rand, -3, 3);
    const n = nonZero(rand, -3, 3);
    const A = { x: int(rand, BOX.xMin, BOX.xMax), y: int(rand, BOX.yMin, BOX.yMax) };
    const { P, M } = walk(A, a, b, m, n);
    if (!onBoard(P) || !onBoard(M)) continue;
    if (M.x === A.x && M.y === A.y) continue;
    return { A, a, b, m, n, T: M };
  }
}

/**
 * The step counts allowed for a: every point A + i·a with i from 0 to m stays
 * on the board, which holds exactly when A + m·a does.
 * @param {V} A @param {V} a
 */
export function mRange(A, a) {
  let lo = 0;
  let hi = 0;
  while (hi < MAX_STEPS && onBoard(add(A, scale(a, hi + 1)))) hi += 1;
  while (lo > -MAX_STEPS && onBoard(add(A, scale(a, lo - 1)))) lo -= 1;
  return { lo, hi };
}

/** @param {V} p @param {V} q */
export const same = (p, q) => p.x === q.x && p.y === q.y;

/** A coefficient before a vector name: 1 → '', −1 → '-', 3 → '3'. @param {number} k */
const coef = (k) => (k === 1 ? '' : k === -1 ? '-' : numTex(k));

/**
 * The combination m·a + n·b in TeX, written the book's way:
 * 2\vec a - 3\vec b, -\vec a + \vec b, \vec 0 for 0 and 0.
 * @param {number} m @param {number} n
 */
export function comboTex(m, n) {
  if (m === 0 && n === 0) return '\\vec 0';
  if (m === 0) return `${coef(n)}\\vec b`;
  const first = `${coef(m)}\\vec a`;
  if (n === 0) return first;
  return `${first} ${n < 0 ? '-' : '+'} ${coef(Math.abs(n))}\\vec b`;
}

/**
 * The line under the board: AM = m·a + n·b = (x; y).
 * @param {V} A @param {V} M @param {number} m @param {number} n
 */
export function landTex(A, M, m, n) {
  const d = sub(M, A);
  return `\\overrightarrow{AM} = ${comboTex(m, n)} = ${coordTex(d.x, d.y)}`;
}

/** A term k·x for a linear equation: '2m', '-n', '+ 3n'. @param {number} k @param {string} name @param {boolean} first */
function term(k, name, first) {
  if (k === 0) return '';
  const body = `${Math.abs(k) === 1 ? '' : numTex(Math.abs(k))}${name}`;
  if (first) return k < 0 ? `-${body}` : body;
  return k < 0 ? ` - ${body}` : ` + ${body}`;
}

/** One equation k1·m + k2·n = t. @param {number} k1 @param {number} k2 @param {number} t */
function equation(k1, k2, t) {
  const left = k1 === 0 ? term(k2, 'n', true) : `${term(k1, 'm', true)}${term(k2, 'n', false)}`;
  return `${left} = ${numTex(t)}`;
}

/**
 * The hint: the coordinates of AT and the system of two equations in m, n.
 * @param {Round} r
 */
export function systemTex(r) {
  const t = sub(r.T, r.A);
  return `\\overrightarrow{AT} = ${coordTex(t.x, t.y)} = m\\vec a + n\\vec b \\iff \\begin{cases} ${equation(r.a.x, r.b.x, t.x)} \\\\ ${equation(r.a.y, r.b.y, t.y)} \\end{cases}`;
}
