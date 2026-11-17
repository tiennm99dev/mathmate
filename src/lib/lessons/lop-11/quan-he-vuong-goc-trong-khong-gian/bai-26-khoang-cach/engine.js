import { numTex } from '#lib/core/number-format.js';
import { sub3 } from '#lib/geom-engine/solid.js';
import { commonPerpendicular, cube, dist3, lerp3, lineAngle } from '../_shared/space.js';

/**
 * Two skew lines through vertices of the cube ABCD.A'B'C'D' of edge a, a
 * point M sliding on the first and N on the second. The length MN is least
 * exactly when MN is perpendicular to both lines: then MN is the common
 * perpendicular segment and its length is the distance between the lines.
 * M and N move in steps of 1/24 of their segments, a grid that holds the
 * ends of every common perpendicular below.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

export const SIDE = 3;
export const STEPS = 24;
/** The slider range for M and N, in steps from the first vertex. */
export const RANGE = { min: -6, max: STEPS + 6 };

const BUILT = cube(SIDE);
export const FACES = BUILT.faces;
export const EDGES = BUILT.edges;
/** @type {Record<string, P3>} */
export const CUBE = BUILT.points;

/**
 * @typedef {{
 *   id: string, label: string, a: [string, string], b: [string, string],
 *   ends: string, value: string
 * }} Preset
 */

/** @type {Preset[]} */
export const PRESETS = [
  { id: 'ab-cc', label: "AB và CC'", a: ['A', 'B'], b: ['C', "C'"], ends: '$BC$', value: 'a' },
  {
    id: 'aa-bd',
    label: "AA' và BD",
    a: ['A', "A'"],
    b: ['B', 'D'],
    ends: '$AO$ ($O$ là tâm hình vuông $ABCD$)',
    value: '\\dfrac{a\\sqrt{2}}{2}',
  },
  {
    id: 'ac-bd',
    label: "AC và B'D'",
    a: ['A', 'C'],
    b: ["B'", "D'"],
    ends: "$OO'$ ($O$, $O'$ là tâm hai đáy)",
    value: 'a',
  },
  {
    id: 'bd-cd',
    label: "BD và CD'",
    a: ['B', 'D'],
    b: ['C', "D'"],
    ends: "$IJ$ với $BI = \\dfrac{2}{3}BD$, $CJ = \\dfrac{1}{3}CD'$",
    value: '\\dfrac{a\\sqrt{3}}{3}',
  },
];

/** @param {string} id */
export const presetOf = (id) => /** @type {Preset} */ (PRESETS.find((p) => p.id === id));

/**
 * The common perpendicular of a preset, with its ends as slider steps.
 * @param {Preset} p
 */
export function best(p) {
  const c = /** @type {NonNullable<ReturnType<typeof commonPerpendicular>>} */ (
    commonPerpendicular(CUBE[p.a[0]], CUBE[p.a[1]], CUBE[p.b[0]], CUBE[p.b[1]])
  );
  return { ...c, m: Math.round(c.s * STEPS), n: Math.round(c.t * STEPS) };
}

/**
 * M and N at slider steps m and n, the length MN in edges, and the angles MN
 * makes with the two lines, and whether MN is the shortest.
 * @param {Preset} p @param {number} m @param {number} n
 */
export function placeOf(p, m, n) {
  const M = lerp3(CUBE[p.a[0]], CUBE[p.a[1]], m / STEPS);
  const N = lerp3(CUBE[p.b[0]], CUBE[p.b[1]], n / STEPS);
  const mn = sub3(N, M);
  const length = dist3(M, N) / SIDE;
  const withA = lineAngle(mn, sub3(CUBE[p.a[1]], CUBE[p.a[0]]));
  const withB = lineAngle(mn, sub3(CUBE[p.b[1]], CUBE[p.b[0]]));
  const least = Math.abs(length - best(p).d / SIDE) < 1e-6;
  return { M, N, length, withA, withB, least };
}

/** @param {number} deg */
const texDeg = (deg) => `${numTex(Math.round(deg * 10) / 10, 1)}^\\circ`;

/**
 * What the segment MN shows.
 * @param {Preset} p @param {ReturnType<typeof placeOf>} s
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function verdict(p, s) {
  const a = `${p.a[0]}${p.a[1]}`;
  const b = `${p.b[0]}${p.b[1]}`;
  const len = `MN \\approx ${numTex(Math.round(s.length * 100) / 100, 2)}a`;
  if (s.least) {
    return {
      tone: 'ok',
      text: `$MN \\perp ${a}$ và $MN \\perp ${b}$: $MN$ là đoạn vuông góc chung, chính là ${p.ends}. Khoảng cách $d(${a}, ${b}) = ${p.value}${p.value === 'a' ? '' : ` \\approx ${numTex(Math.round(s.length * 100) / 100, 2)}a`}$.`,
    };
  }
  return {
    tone: 'info',
    text: `$${len}$, $(MN, ${a}) = ${texDeg(s.withA)}$, $(MN, ${b}) = ${texDeg(s.withB)}$. Hãy dời $M$, $N$ để $MN$ ngắn nhất.`,
  };
}
