/**
 * Logic of the draggable triangle: its measures in the book's notation
 * (a = BC, b = CA, c = AB, angles A, B, C, R, r, p, S) and the live check of
 * the law of cosines, the law of sines and the area formulas.
 */
import { MINUS, formatFixed, formatNumber, texNumber, tidy } from '#lib/core/number-format.js';
import { circumcircle, incircle } from '#lib/geom-engine/centers.js';
import { angleAt, cross, dist } from '#lib/geom-engine/plane.js';
import { cosDeg, sinDeg } from '../_shared/trig.js';

/** Pixels per centimetre on the board. */
export const UNIT = 40;

/** Smallest area, in cm², a dragged triangle may keep. */
export const MIN_AREA = 1;

/** @typedef {{ x: number, y: number }} Pt */
/**
 * @typedef {{
 *   a: number, b: number, c: number,
 *   A: number, B: number, C: number,
 *   R: number, r: number, p: number, S: number,
 * }} Measures
 */

/**
 * The measures of triangle ABC drawn in pixels, in centimetres and degrees.
 * @param {Pt} A @param {Pt} B @param {Pt} C
 * @returns {Measures}
 */
export function measure(A, B, C) {
  const a = dist(B, C) / UNIT;
  const b = dist(C, A) / UNIT;
  const c = dist(A, B) / UNIT;
  const S = Math.abs(cross(A, B, C)) / 2 / UNIT ** 2;
  return {
    a,
    b,
    c,
    A: angleAt(A, B, C),
    B: angleAt(B, C, A),
    C: angleAt(C, A, B),
    R: (circumcircle(A, B, C)?.radius ?? 0) / UNIT,
    r: (incircle(A, B, C)?.radius ?? 0) / UNIT,
    p: (a + b + c) / 2,
    S,
  };
}

/**
 * Whether a vertex may move to a new place: the triangle must keep an area of
 * at least MIN_AREA cm².
 * @param {Pt} A @param {Pt} B @param {Pt} C
 */
export const isFat = (A, B, C) => Math.abs(cross(A, B, C)) / 2 / UNIT ** 2 >= MIN_AREA;

/** A measure rounded to `places` decimals, kept, as TeX. @param {number} v @param {number} [places] */
// Rounding noise first, so 16,624999… and 16,625 both show 16,63.
const n = (v, places = 2) => texNumber(formatFixed(tidy(v, 6), places)).replace(MINUS, '-');
/** An angle to one decimal, as TeX. @param {number} deg */
const d = (deg) => `${n(deg, 1)}^\\circ`;

/** @typedef {'A' | 'B' | 'C'} Vertex */

/**
 * The law of cosines for the side opposite `v`, with this triangle's numbers.
 * @param {Measures} m @param {Vertex} v
 * @returns {{ left: string, right: string, note: string }}
 */
export function cosineCheck(m, v) {
  const [side, s1, s2, n1, n2] =
    v === 'A'
      ? /** @type {const} */ (['a', 'b', 'c', m.b, m.c])
      : v === 'B'
        ? /** @type {const} */ (['b', 'c', 'a', m.c, m.a])
        : /** @type {const} */ (['c', 'a', 'b', m.a, m.b]);
  const angle = m[v];
  const own = m[side];
  const rhs = n1 ** 2 + n2 ** 2 - 2 * n1 * n2 * cosDeg(angle);
  const sum = n1 ** 2 + n2 ** 2;
  const kind = Math.abs(angle - 90) < 0.05 ? 'vuông' : angle < 90 ? 'nhọn' : 'tù';
  const compare =
    kind === 'vuông'
      ? `$\\cos ${v} = 0$ nên $${side}^2 = ${s1}^2 + ${s2}^2$: đó là định lí Pythagore`
      : kind === 'nhọn'
        ? `$\\cos ${v} > 0$ nên $${side}^2 < ${s1}^2 + ${s2}^2$ (${formatNumber(own ** 2, 2)} < ${formatNumber(sum, 2)})`
        : `$\\cos ${v} < 0$ nên $${side}^2 > ${s1}^2 + ${s2}^2$ (${formatNumber(own ** 2, 2)} > ${formatNumber(sum, 2)})`;
  return {
    left: `${side}^2 \\approx ${n(own ** 2)}`,
    right: `${s1}^2 + ${s2}^2 - 2${s1}${s2}\\cos ${v} = ${n(n1)}^2 + ${n(n2)}^2 - 2 \\cdot ${n(n1)} \\cdot ${n(n2)} \\cdot \\cos ${d(angle)} \\approx ${n(rhs)}`,
    note: `Góc $${v}$ ${kind}: ${compare}. Hai vế luôn bằng nhau, dù kéo đỉnh đến đâu.`,
  };
}

/**
 * The four ratios of the law of sines, with this triangle's numbers.
 * @param {Measures} m
 * @returns {{ lines: string[], note: string }}
 */
export function sineCheck(m) {
  /** @param {string} side @param {Vertex} v @param {number} len */
  const ratio = (side, v, len) =>
    `\\dfrac{${side}}{\\sin ${v}} = \\dfrac{${n(len)}}{\\sin ${d(m[v])}} \\approx ${n(len / sinDeg(m[v]))}`;
  return {
    lines: [
      ratio('a', 'A', m.a),
      ratio('b', 'B', m.b),
      ratio('c', 'C', m.c),
      `2R = 2 \\cdot ${n(m.R)} \\approx ${n(2 * m.R)}`,
    ],
    note: `Ba tỉ số bằng nhau và bằng đường kính $2R \\approx ${n(2 * m.R)}$ cm của đường tròn ngoại tiếp. Góc nào lớn hơn thì cạnh đối diện dài hơn.`,
  };
}

/**
 * The area of this triangle by the book's four formulas.
 * @param {Measures} m
 * @returns {{ lines: string[], note: string }}
 */
export function areaCheck(m) {
  const heron = Math.sqrt(Math.max(0, m.p * (m.p - m.a) * (m.p - m.b) * (m.p - m.c)));
  return {
    lines: [
      `\\tfrac{1}{2}bc\\sin A = \\tfrac{1}{2} \\cdot ${n(m.b)} \\cdot ${n(m.c)} \\cdot \\sin ${d(m.A)} \\approx ${n(0.5 * m.b * m.c * sinDeg(m.A))}`,
      `\\sqrt{p(p-a)(p-b)(p-c)} \\approx ${n(heron)} \\quad (p \\approx ${n(m.p)})`,
      `\\dfrac{abc}{4R} = \\dfrac{${n(m.a)} \\cdot ${n(m.b)} \\cdot ${n(m.c)}}{4 \\cdot ${n(m.R)}} \\approx ${n((m.a * m.b * m.c) / (4 * m.R))}`,
      `pr = ${n(m.p)} \\cdot ${n(m.r)} \\approx ${n(m.p * m.r)}`,
    ],
    note: `Bốn công thức cho cùng một diện tích $S \\approx ${n(m.S)}$ cm². Chọn công thức theo dữ kiện: hai cạnh và góc xen giữa, ba cạnh, hay bán kính $R$, $r$.`,
  };
}

/**
 * A short description of the triangle for screen readers.
 * @param {Measures} m
 */
export function describe(m) {
  /** @param {number} v */
  const f = (v) => formatNumber(v, 2);
  const g = (/** @type {number} */ v) => formatNumber(v, 1);
  return `Tam giác ABC có a ≈ ${f(m.a)} cm, b ≈ ${f(m.b)} cm, c ≈ ${f(m.c)} cm, góc A ≈ ${g(m.A)} độ, góc B ≈ ${g(m.B)} độ, góc C ≈ ${g(m.C)} độ.`;
}
