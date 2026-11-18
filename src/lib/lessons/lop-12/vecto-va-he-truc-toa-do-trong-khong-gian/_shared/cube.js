import { dot3, sub3 } from '#lib/geom-engine/solid.js';
import { angleDeg, cube } from '#lib/geom-engine/space.js';
import { overSqrtTex, sqrtTex } from '#lib/geom-engine/space-tex.js';

/**
 * The cube ABCD.A'B'C'D' of edge 1 the lessons of the chapter "Vectơ và hệ
 * trục toạ độ trong không gian" compute in: A at the origin, AB along Ox, AD
 * along Oy and AA' along Oz, with its vectors and their dot products written
 * the book's way.
 */

/** @typedef {import('#lib/geom-engine/space.js').P3} P3 */

const UNIT = cube(1);

/**
 * The corners of the cube of edge 1.
 * @type {Record<string, P3>}
 */
export const CUBE = UNIT.points;

/** The twelve edges of the cube by vertex names. */
export const CUBE_EDGES = UNIT.edges;

/**
 * The vector between two named vertices of the cube.
 * @param {string} from @param {string} to
 */
export const cubeVector = (from, to) => sub3(CUBE[to], CUBE[from]);

/**
 * `\overrightarrow{AB}` for a vector named by its two ends.
 * @param {string} from @param {string} to
 */
export const arrowTex = (from, to) => `\\overrightarrow{${from}${to}}`;

/**
 * The dot product of two vectors of the cube of edge a, the book's way:
 * |u|·|v|·cos(u, v) with exact lengths a√n and the result as a multiple of
 * a². Returns the TeX of the lengths, the cosine and the product, the angle
 * in degrees and the whole number k with u·v = k·a².
 * @param {P3} u @param {P3} v
 */
export function cubeDot(u, v) {
  const nu = dot3(u, u);
  const nv = dot3(v, v);
  const k = dot3(u, v);
  /** @param {number} n */
  const lenTex = (n) => (n === 1 ? 'a' : `a${sqrtTex(n)}`);
  const kTex = k === 0 ? '0' : k === 1 ? 'a^2' : k === -1 ? '-a^2' : `${k}a^2`;
  return {
    k,
    lenU: lenTex(nu),
    lenV: lenTex(nv),
    cos: overSqrtTex(k, nu * nv),
    angle: /** @type {number} */ (angleDeg(u, v)),
    product: kTex,
  };
}
