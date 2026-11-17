/**
 * The formulas of the chapter "Một số hình phẳng. Chu vi và diện tích" the
 * grade 5 book's way, with π taken as 3,14: the area of a triangle and of a
 * trapezoid, and the circumference and area of a circle, plus the sentences
 * that show the working ("6 × 4 : 2 = 12"). Pure and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/** The number the book uses for π. */
export const PI = 3.14;

/**
 * A measure written the book's way, with a decimal comma: 12.56 → '12,56'.
 * @param {number} v
 */
export const num = (v) => formatNumber(tidy(v, 6), 4);

/**
 * Area of a triangle: base times height, divided by 2.
 * @param {number} a base
 * @param {number} h height
 */
export const triangleArea = (a, h) => tidy((a * h) / 2);

/**
 * Area of a trapezoid: the sum of the two bases times the height, divided by 2.
 * @param {number} a one base
 * @param {number} b the other base
 * @param {number} h height
 */
export const trapezoidArea = (a, b, h) => tidy(((a + b) * h) / 2);

/**
 * Circumference of a circle from its diameter: d × 3,14.
 * @param {number} d
 */
export const circumference = (d) => tidy(d * PI);

/**
 * Area of a circle from its radius: r × r × 3,14.
 * @param {number} r
 */
export const circleArea = (r) => tidy(r * r * PI);

/**
 * The working of a triangle's area: (6, 4) → '6 × 4 : 2 = 12'.
 * @param {number} a
 * @param {number} h
 */
export const triangleWork = (a, h) => `${num(a)} × ${num(h)} : 2 = ${num(triangleArea(a, h))}`;

/**
 * The working of a trapezoid's area: (8, 4, 3) → '(8 + 4) × 3 : 2 = 18'.
 * @param {number} a
 * @param {number} b
 * @param {number} h
 */
export const trapezoidWork = (a, b, h) =>
  `(${num(a)} + ${num(b)}) × ${num(h)} : 2 = ${num(trapezoidArea(a, b, h))}`;

/**
 * The working of a circumference from the diameter: 4 → '4 × 3,14 = 12,56'.
 * @param {number} d
 */
export const circumferenceWork = (d) => `${num(d)} × 3,14 = ${num(circumference(d))}`;

/**
 * The working of a circle's area: 3 → '3 × 3 × 3,14 = 28,26'.
 * @param {number} r
 */
export const circleAreaWork = (r) => `${num(r)} × ${num(r)} × 3,14 = ${num(circleArea(r))}`;

/**
 * The kinds of triangle by their angles, named the book's way.
 * @typedef {'nhon' | 'vuong' | 'tu'} TriangleKind
 */

/** @type {Readonly<Record<TriangleKind, string>>} */
export const TRIANGLE_NAMES = {
  nhon: 'tam giác nhọn',
  vuong: 'tam giác vuông',
  tu: 'tam giác tù',
};

/** @typedef {{ x: number, y: number }} Pt */

/**
 * The kind of a triangle from its vertices on a grid: right when one angle
 * is a right angle, obtuse when one is obtuse, acute otherwise. Integer
 * coordinates give an exact answer. Null when the three points are in line.
 * @param {Pt} A
 * @param {Pt} B
 * @param {Pt} C
 * @returns {TriangleKind | null}
 */
export function triangleKind(A, B, C) {
  const cross = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
  if (cross === 0) return null;
  /** @param {Pt} O @param {Pt} P @param {Pt} Q */
  const dot = (O, P, Q) => (P.x - O.x) * (Q.x - O.x) + (P.y - O.y) * (Q.y - O.y);
  const dots = [dot(A, B, C), dot(B, A, C), dot(C, A, B)];
  if (dots.some((d) => d === 0)) return 'vuong';
  if (dots.some((d) => d < 0)) return 'tu';
  return 'nhon';
}
