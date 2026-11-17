import { numTex } from '#lib/core/number-format.js';
import { P } from '#lib/geom-engine/space.js';

/**
 * Pouring water from a pyramid into a prism with the same base and the same
 * height. The pyramid is a cup standing on its apex: its base is a square of
 * side 6 cm on top and its height is 12 cm, so it holds
 * V = 1/3 · 36 · 12 = 144 cm³. The prism (a box on the same square, 12 cm
 * high) holds 432 cm³, so it takes exactly three pyramids of water.
 *
 * While the level in the pyramid falls from 12 cm to y cm, the water poured
 * out is a regular frustum (khối chóp cụt đều) with bases S = 36 and
 * S' = 36 (y/12)² and height 12 − y, so the frustum formula and the pyramid
 * formula can be checked against each other on the screen.
 *
 * Drawing space uses 1 unit for 2 cm; z points up.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

export const SIDE = 6;
export const HEIGHT = 12;
export const BASE = SIDE * SIDE;
export const PYRAMID = (BASE * HEIGHT) / 3;
export const PRISM = BASE * HEIGHT;
/** How many full pyramids the prism holds. */
export const POURS = PRISM / PYRAMID;

/** Centimetres per drawing unit, and where the prism stands. */
const CM = 2;
const GAP = 1.5;
const S_DRAW = SIDE / CM;
const H_DRAW = HEIGHT / CM;
const X0 = S_DRAW + GAP;

/**
 * The volume of a frustum with bases s1, s2 and height h:
 * V = 1/3 h (S + √(SS') + S').
 * @param {number} s1 @param {number} s2 @param {number} h
 */
export const frustum = (s1, s2, h) => (h * (s1 + Math.sqrt(s1 * s2) + s2)) / 3;

/**
 * The area of the water surface in the pyramid at level y (cm): a square of
 * side 6 · y / 12.
 * @param {number} y
 */
export const surface = (y) => BASE * (y / HEIGHT) ** 2;

/**
 * The water left in the pyramid at level y: a smaller pyramid, 1/3 · S' · y.
 * @param {number} y
 */
export const waterIn = (y) => (surface(y) * y) / 3;

/**
 * The water in the prism after `poured` full pyramids and the current one
 * down to level y: its volume and its height in cm.
 * @param {number} poured @param {number} y
 */
export function prismWater(poured, y) {
  const volume = poured * PYRAMID + PYRAMID - waterIn(y);
  return { volume, level: volume / BASE };
}

/** The cup: apex S at the bottom, the square ABCD on top. */
/** @type {Record<string, P3>} */
export const CUP = {
  S: P(S_DRAW / 2, S_DRAW / 2, 0),
  A: P(0, 0, H_DRAW),
  B: P(S_DRAW, 0, H_DRAW),
  C: P(S_DRAW, S_DRAW, H_DRAW),
  D: P(0, S_DRAW, H_DRAW),
};
export const CUP_FACES = [
  ['A', 'B', 'C', 'D'],
  ['S', 'A', 'B'],
  ['S', 'B', 'C'],
  ['S', 'C', 'D'],
  ['S', 'D', 'A'],
];
/** @type {[string, string][]} */
export const CUP_EDGES = [
  ['A', 'B'],
  ['B', 'C'],
  ['C', 'D'],
  ['D', 'A'],
  ['S', 'A'],
  ['S', 'B'],
  ['S', 'C'],
  ['S', 'D'],
];

/**
 * The four corners of a square level of the box at height z (drawing units).
 * @param {number} z
 */
const boxLevel = (z) => [
  P(X0, 0, z),
  P(X0 + S_DRAW, 0, z),
  P(X0 + S_DRAW, S_DRAW, z),
  P(X0, S_DRAW, z),
];

/** The box: the square EFGH on the ground and E'F'G'H' on top. */
/** @type {Record<string, P3>} */
export const BOX = Object.fromEntries([
  ...boxLevel(0).map((p, i) => ['EFGH'[i], p]),
  ...boxLevel(H_DRAW).map((p, i) => [`${'EFGH'[i]}'`, p]),
]);
export const BOX_FACES = [
  ['E', 'F', 'G', 'H'],
  ["E'", "F'", "G'", "H'"],
  ['E', 'F', "F'", "E'"],
  ['F', 'G', "G'", "F'"],
  ['G', 'H', "H'", "G'"],
  ['H', 'E', "E'", "H'"],
];
/** @type {[string, string][]} */
export const BOX_EDGES = [
  ['E', 'F'],
  ['F', 'G'],
  ['G', 'H'],
  ['H', 'E'],
  ["E'", "F'"],
  ["F'", "G'"],
  ["G'", "H'"],
  ["H'", "E'"],
  ['E', "E'"],
  ['F', "F'"],
  ['G', "G'"],
  ['H', "H'"],
];

/** The middle of the drawing and the room it needs. */
export const CENTRE = P((X0 + S_DRAW) / 2, S_DRAW / 2, H_DRAW / 2);
export const RADIUS = 5.6;

/**
 * The faces of the water in the cup at level y (cm): a small upside-down
 * pyramid, its top square and four sides.
 * @param {number} y
 * @returns {P3[][]}
 */
export function cupWater(y) {
  if (y <= 0) return [];
  const z = y / CM;
  const half = (S_DRAW / 2) * (y / HEIGHT);
  const c = CUP.S;
  const top = [
    P(c.x - half, c.y - half, z),
    P(c.x + half, c.y - half, z),
    P(c.x + half, c.y + half, z),
    P(c.x - half, c.y + half, z),
  ];
  return [top, ...top.map((p, i) => [c, p, top[(i + 1) % 4]])];
}

/**
 * The faces of the water in the box at height `level` (cm): its top and its
 * four sides.
 * @param {number} level
 * @returns {P3[][]}
 */
export function boxWater(level) {
  if (level <= 1e-9) return [];
  const low = boxLevel(0);
  const top = boxLevel(level / CM);
  return [top, ...low.map((p, i) => [p, low[(i + 1) % 4], top[(i + 1) % 4], top[i]])];
}

/** @param {number} v */
const t = (v) => numTex(v, 2);

/**
 * `= v` when v has at most two decimals, else `≈ v` rounded to two places,
 * as TeX.
 * @param {number} v
 */
export const is = (v) =>
  `${Math.abs(v * 100 - Math.round(v * 100)) < 1e-6 ? '=' : '\\approx'} ${t(v)}`;

/**
 * What the pouring shows: before, while and after pouring one pyramid, and
 * when the prism is full.
 * @param {number} poured full pyramids already poured (0 to POURS − 1)
 * @param {number} y the level left in the pyramid, in cm
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function verdict(poured, y) {
  const w = prismWater(poured, y);
  if (poured === POURS - 1 && y === 0) {
    return {
      tone: 'ok',
      text: `Rót đúng ${POURS} lần đầy khối chóp thì khối lăng trụ đầy nước: $${PRISM} = ${POURS} \\cdot ${PYRAMID}$, tức là $V_{\\text{chóp}} = \\dfrac{1}{3}V_{\\text{lăng trụ}} = \\dfrac{1}{3}Sh$.`,
    };
  }
  if (y === HEIGHT) {
    return {
      tone: 'info',
      text: `Khối chóp đầy nước: $V = \\dfrac{1}{3}Sh = \\dfrac{1}{3} \\cdot ${BASE} \\cdot ${HEIGHT} = ${PYRAMID}$ cm³. Nước trong lăng trụ cao $${t(w.level)}$ cm. Kéo thanh trượt để rót.`,
    };
  }
  if (y === 0) {
    const n = poured + 1;
    return {
      tone: 'ok',
      text: `Đã rót hết ${n} khối chóp: nước trong lăng trụ cao $${t(w.level)}$ cm $= \\dfrac{${n}}{3}h$, bằng $\\dfrac{${n}}{3}$ lăng trụ. Bấm "Đổ đầy khối chóp" để rót tiếp.`,
    };
  }
  const s2 = surface(y);
  const out = frustum(BASE, s2, HEIGHT - y);
  return {
    tone: 'info',
    text: `Phần nước đã rót là khối chóp cụt đều có $S = ${BASE}$, $S' = ${t(s2)}$, chiều cao $${HEIGHT - y}$ cm: $V = \\dfrac{1}{3} \\cdot ${HEIGHT - y} \\cdot (${BASE} + \\sqrt{${BASE} \\cdot ${t(s2)}} + ${t(s2)}) ${is(out)}$ cm³. Nước trong lăng trụ cao $${is(w.level).replace(/^= /, '')}$ cm.`,
  };
}
