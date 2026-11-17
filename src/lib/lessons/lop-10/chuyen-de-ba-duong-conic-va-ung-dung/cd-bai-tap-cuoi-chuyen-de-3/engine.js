/**
 * Two applications of the conics:
 * - an orbit is an ellipse with the Sun at the focus F₁(−c; 0); the distance
 *   to the Sun is the focal radius r = a + ex, from a − c to a + c;
 * - a dish antenna of diameter D and depth h is cut from y² = 2px with its
 *   rim at (h; D/2), so p = D²/(8h) and the receiver sits at the focus, p/2
 *   from the vertex.
 */
import { formatNumber, numTex } from '#lib/core/number-format.js';
import { ellipse, focalRadii, valueTex } from '../_shared/conic.js';

/**
 * Orbits with their semi-major axis a (million km) and eccentricity e.
 * @type {{ id: string, name: string, a: number, e: number }[]}
 */
export const ORBITS = [
  { id: 'trai-dat', name: 'Trái Đất', a: 149.6, e: 0.0167 },
  { id: 'diem-vuong', name: 'Sao Diêm Vương', a: 5906, e: 0.244 },
  { id: 'halley', name: 'Sao chổi Halley', a: 2667, e: 0.967 },
];

/**
 * The ellipse of an orbit and its nearest and farthest distances to the Sun.
 * @param {number} a @param {number} e
 */
export function orbitOf(a, e) {
  const E = ellipse(a, a * Math.sqrt(1 - e * e));
  return { ...E, nearest: a - E.c, farthest: a + E.c };
}

/**
 * The distance to the Sun at F₁ from the point of abscissa x on the orbit.
 * @param {number} a @param {number} e @param {number} x
 */
export const sunDistance = (a, e, x) => focalRadii({ a, e }, x)[0];

/** A distance in million km, the book's way: '147,1 triệu km'. @param {number} v */
export const millionKm = (v) => `${formatNumber(v, v < 1000 ? 1 : 0)} triệu km`;

/**
 * The readout of an orbit at the point of abscissa x.
 * @param {number} a @param {number} e @param {number} x
 */
export function orbitLines(a, e, x) {
  const o = orbitOf(a, e);
  return [
    `Tâm sai $e = ${numTex(e, 4)}$, bán trục lớn $a \\approx$ ${millionKm(a)}, $b \\approx$ ${millionKm(o.b)}.`,
    `Gần Mặt Trời nhất: $a - c \\approx$ ${millionKm(o.nearest)}; xa nhất: $a + c \\approx$ ${millionKm(o.farthest)}.`,
    `Tại vị trí đang chọn: $r = a + ex \\approx$ ${millionKm(sunDistance(a, e, x))}.`,
  ];
}

/** Dish sizes the widget allows, in cm. */
export const DISH = { D: [60, 240], h: [15, 60] };

/**
 * The parabola of a dish of diameter D and depth h.
 * @param {number} D @param {number} h
 */
export function dishOf(D, h) {
  const p = (D * D) / (8 * h);
  return { p, f: p / 2, inside: p / 2 <= h };
}

/**
 * The readout of a dish.
 * @param {number} D @param {number} h
 */
export function dishLines(D, h) {
  const { p, f, inside } = dishOf(D, h);
  return [
    `Mép chảo $\\left(${h}; ${numTex(D / 2)}\\right)$ thuộc $y^2 = 2px$: $${numTex(D / 2)}^2 = 2p \\cdot ${h}$, nên $p ${valueTex(p)}$.`,
    `Đầu thu đặt ở tiêu điểm, cách đỉnh chảo $\\dfrac{p}{2} = \\dfrac{D^2}{16h} ${valueTex(f)}$ cm${inside ? ', nằm trong lòng chảo' : ', nằm ngoài miệng chảo'}.`,
  ];
}
