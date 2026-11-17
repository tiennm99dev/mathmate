/**
 * Logic of the conic board: the ellipse, hyperbola and parabola in their
 * canonical position, sampled into points a handle can slide along, their
 * canonical equations, foci and directrix, and the defining relation
 * (MF₁ + MF₂ = 2a, |MF₁ − MF₂| = 2a, MF = d(M, Δ)) worked out at a point M.
 */
import { numTex } from '#lib/core/number-format.js';
import { sqrtTex, valueTex } from '../_shared/coords.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {'elip' | 'hypebol' | 'parabol'} Kind */

/** The board, in grid units. */
export const BOX = { xMin: -8, xMax: 8, yMin: -6, yMax: 6 };

/** Allowed whole values of a and c (or p) for each kind, so every curve fits the board. */
export const LIMITS = {
  // b = √(a² − c²) must stay within the board's half height, so a = 7 needs c ≥ 4.
  elip: {
    a: [2, 7],
    c: (/** @type {number} */ a) => [
      Math.max(1, Math.ceil(Math.sqrt(Math.max(0, a * a - BOX.yMax ** 2)))),
      a - 1,
    ],
  },
  hypebol: { a: [1, 4], c: (/** @type {number} */ a) => [a + 1, 6] },
  parabol: { p: [1, 4] },
};

/**
 * c kept inside the range allowed for a.
 * @param {'elip' | 'hypebol'} kind @param {number} a @param {number} c
 */
export function clampC(kind, a, c) {
  const [lo, hi] = LIMITS[kind].c(a);
  return Math.min(hi, Math.max(lo, c));
}

/** @param {V} p @param {V} q */
const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);

/**
 * One conic: its foci, the directrix of a parabola, sample points in order,
 * the canonical equation and facts about it.
 * @param {Kind} kind
 * @param {{ a: number, c: number, p: number }} s
 */
export function conicOf(kind, { a, c, p }) {
  if (kind === 'parabol') {
    const Y = Math.min(BOX.yMax, Math.sqrt(2 * p * BOX.xMax));
    const samples = Array.from({ length: 81 }, (_, i) => {
      const y = -Y + (2 * Y * i) / 80;
      return { x: (y * y) / (2 * p), y };
    });
    const half = p % 2 === 0 ? numTex(p / 2) : `\\dfrac{${p}}{2}`;
    return {
      foci: [{ x: p / 2, y: 0 }],
      directrix: -p / 2,
      samples,
      equation: `y^2 = ${2 * p === 1 ? '' : 2 * p}x`,
      facts: [`p = ${p}`, `F\\left(${half};\\ 0\\right),\\quad \\Delta: x = -${half}`],
      b2: 0,
    };
  }
  const b2 = kind === 'elip' ? a * a - c * c : c * c - a * a;
  const b = Math.sqrt(b2);
  const foci = [
    { x: -c, y: 0 },
    { x: c, y: 0 },
  ];
  /** @type {V[]} */
  let samples;
  if (kind === 'elip') {
    samples = Array.from({ length: 120 }, (_, i) => {
      const t = (i * Math.PI) / 60;
      return { x: a * Math.cos(t), y: b * Math.sin(t) };
    });
  } else {
    const T = Math.min(Math.asinh(BOX.yMax / b), Math.acosh(BOX.xMax / a));
    const branch = (/** @type {number} */ s) =>
      Array.from({ length: 61 }, (_, i) => {
        const t = -T + (2 * T * i) / 60;
        return { x: s * a * Math.cosh(t), y: b * Math.sinh(t) };
      });
    samples = [...branch(1), ...branch(-1)];
  }
  const sign = kind === 'elip' ? '+' : '-';
  const bText = `b = \\sqrt{${kind === 'elip' ? 'a^2 - c^2' : 'c^2 - a^2'}} = ${sqrtTex(b2)}`;
  return {
    foci,
    directrix: 0,
    samples,
    equation: `\\dfrac{x^2}{${a * a}} ${sign} \\dfrac{y^2}{${b2}} = 1`,
    facts: [
      `a = ${a},\\ c = ${c},\\ ${bText}`,
      `F_1(-${c};\\ 0),\\ F_2(${c};\\ 0),\\ F_1F_2 = 2c = ${2 * c}`,
    ],
    b2,
  };
}

/**
 * The defining relation of the conic checked at M, as TeX.
 * @param {Kind} kind @param {ReturnType<typeof conicOf>} conic @param {V} M
 * @param {number} a
 */
export function relationTex(kind, conic, M, a) {
  if (kind === 'parabol') {
    const mf = dist(M, conic.foci[0]);
    const d = M.x - conic.directrix;
    return `MF ${valueTex(mf)},\\quad d(M, \\Delta) ${valueTex(d)}\\quad \\Rightarrow\\ MF = d(M, \\Delta)`;
  }
  const m1 = dist(M, conic.foci[0]);
  const m2 = dist(M, conic.foci[1]);
  const head = `MF_1 ${valueTex(m1)},\\ MF_2 ${valueTex(m2)}`;
  if (kind === 'elip') return `${head}\\quad \\Rightarrow\\ MF_1 + MF_2 = ${2 * a} = 2a`;
  return `${head}\\quad \\Rightarrow\\ |MF_1 - MF_2| = ${2 * a} = 2a`;
}

/**
 * The index of the sample nearest to a point.
 * @param {V[]} samples @param {V} p
 */
export function nearest(samples, p) {
  let best = 0;
  let bestD = Infinity;
  samples.forEach((q, i) => {
    const d = dist(p, q);
    if (d < bestD) {
      best = i;
      bestD = d;
    }
  });
  return best;
}
