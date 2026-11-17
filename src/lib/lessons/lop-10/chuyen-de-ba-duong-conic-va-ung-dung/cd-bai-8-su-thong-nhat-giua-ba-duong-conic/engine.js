/**
 * Two views of one idea, the conic as the set of points M with
 * MF = e·d(M, Δ):
 * - the focus-directrix board: F(0; 0), Δ: x = −k and a chosen e draw an
 *   ellipse, a parabola or a hyperbola, and M slides on it;
 * - the cut cone: a double cone of half-angle α seen from the side is cut by
 *   a plane tilted φ from the horizontal; the section has eccentricity
 *   e = sin φ / cos α, so its kind follows from comparing φ with 90° − α.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { dist } from '#lib/geom-engine/plane.js';
import {
  KIND_NAMES,
  focusDirectrixConic,
  kindOf,
  sampleBranch,
  sampleEllipse,
  sampleParabola,
  valueTex,
} from '../_shared/conic.js';

/** @typedef {{ x: number, y: number }} V */

/** The focus-directrix board, in grid units. */
export const BOX = { xMin: -9, xMax: 11, yMin: -7, yMax: 7 };
export const K_RANGE = /** @type {const} */ ([2, 4]);
export const E_RANGE = /** @type {const} */ ([0.25, 2.5]);
export const E_STEP = 0.05;
/** How far from F the curve is drawn. */
export const REACH = 18;

/**
 * The branches of the conic MF = e·d(M, Δ), the one round F first.
 * @param {number} e @param {number} k
 */
export const branchesOf = (e, k) => focusDirectrixConic(tidy(e, 6), k, REACH, 720);

/**
 * The equation MF² = e²·d(M, Δ)² in TeX: x² + y² = e²(x + k)².
 * @param {number} e @param {number} k
 */
export function equationTex(e, k) {
  return `x^2 + y^2 = ${tidy(e, 6) === 1 ? '' : numTex(e * e, 4)}(x + ${k})^2`;
}

/**
 * The readout at M.
 * @param {number} e @param {number} k @param {V} M
 */
export function readout(e, k, M) {
  const mf = dist(M, { x: 0, y: 0 });
  const d = Math.abs(M.x + k);
  return [
    `MF ${valueTex(mf)},\\quad d(M, \\Delta) ${valueTex(d)}`,
    `\\dfrac{MF}{d(M, \\Delta)} ${valueTex(mf / d, 2)} = e`,
  ];
}

/**
 * The kind for the feedback line.
 * @param {number} e
 */
export function kindNote(e) {
  const kind = kindOf(e);
  const name = KIND_NAMES[kind];
  if (kind === 'parabol')
    return 'Với $e = 1$, $M$ cách đều $F$ và $\\Delta$: đường conic là một parabol.';
  if (kind === 'elip')
    return `Với $e = ${numTex(e, 2)} < 1$, đường conic là một ${name}: một đường cong kín bao quanh $F$.`;
  return `Với $e = ${numTex(e, 2)} > 1$, đường conic là một ${name} gồm hai nhánh; nhánh thứ hai nằm phía bên kia đường chuẩn.`;
}

/* ---------- the cut cone ---------- */

/** Half the apex angle of the cone, in degrees. */
export const ALPHA = 30;

/**
 * The eccentricity of the section by a plane tilted phi degrees from the
 * plane perpendicular to the axis (not through the apex).
 * @param {number} phi @param {number} [alpha]
 */
export function sectionEccentricity(phi, alpha = ALPHA) {
  const rad = Math.PI / 180;
  return tidy(Math.sin(phi * rad) / Math.cos(alpha * rad), 9);
}

/**
 * What the plane cuts out.
 * @param {number} phi @param {number} [alpha]
 */
export function sectionKind(phi, alpha = ALPHA) {
  if (phi === 0) return 'duong-tron';
  if (phi < 90 - alpha) return 'elip';
  return phi === 90 - alpha ? 'parabol' : 'hypebol';
}

/**
 * The sentence about the cut.
 * @param {number} phi @param {number} [alpha]
 */
export function sectionNote(phi, alpha = ALPHA) {
  const kind = sectionKind(phi, alpha);
  const e = numTex(sectionEccentricity(phi, alpha), 3);
  const g = 90 - alpha;
  if (kind === 'duong-tron')
    return 'Mặt phẳng vuông góc với trục của mặt nón: giao tuyến là một đường tròn ($e = 0$).';
  if (kind === 'elip')
    return `Mặt phẳng nghiêng $${phi}^\\circ < ${g}^\\circ$, cắt mọi đường sinh của một nửa mặt nón: giao tuyến là elip, $e \\approx ${e}$.`;
  if (kind === 'parabol')
    return `Mặt phẳng nghiêng đúng $${g}^\\circ$, song song với một đường sinh: giao tuyến là parabol, $e = 1$.`;
  return `Mặt phẳng nghiêng $${phi}^\\circ > ${g}^\\circ$, cắt cả hai nửa mặt nón: giao tuyến là hypebol hai nhánh, $e \\approx ${e}$.`;
}

/**
 * The side view in SVG units: apex, the two generator directions (unit, going
 * down-left and down-right), the plane line through a point of the axis below
 * the apex, and where the plane meets each generator line (as a parameter
 * along the generator from the apex; negative means the upper nappe).
 * @param {number} phi
 * @param {{ apex: V, depth: number, alpha?: number }} view
 */
export function sideView(phi, { apex, depth, alpha = ALPHA }) {
  const rad = Math.PI / 180;
  const s = Math.sin(alpha * rad);
  const c = Math.cos(alpha * rad);
  // Generators through the apex, pointing down (SVG y grows downwards).
  const gens = [
    { x: -s, y: c },
    { x: s, y: c },
  ];
  const P0 = { x: apex.x, y: apex.y + depth };
  const dir = { x: Math.cos(phi * rad), y: -Math.sin(phi * rad) };
  const hits = gens.map((g) => {
    // apex + t·g = P0 + u·dir
    const det = g.x * -dir.y - g.y * -dir.x;
    if (Math.abs(det) < 1e-9) return null;
    const rx = P0.x - apex.x;
    const ry = P0.y - apex.y;
    const t = (rx * -dir.y - ry * -dir.x) / det;
    return { t, at: { x: apex.x + t * g.x, y: apex.y + t * g.y } };
  });
  return { gens, P0, dir, hits };
}

/**
 * A curve of eccentricity e, centred and scaled to fit a small box, for the
 * picture of the section: polylines in math units.
 * @param {number} e
 * @returns {V[][]}
 */
export function sectionShape(e) {
  const t = tidy(e, 6);
  if (t < 1) return [sampleEllipse(3, 3 * Math.sqrt(1 - t * t), 96)].map((r) => [...r, r[0]]);
  if (t === 1) return [sampleParabola(1.5, 6, 4, 61).map((q) => ({ x: q.x - 3, y: q.y }))];
  const b = 1.6 * Math.sqrt(t * t - 1);
  return [sampleBranch(1.6, b, 1, 4, 4, 41), sampleBranch(1.6, b, -1, 4, 4, 41)];
}
