/**
 * Logic of the two-line board: how two lines lie (by the system of their
 * equations and by their normal vectors), the angle between them from
 * cos φ = |n₁ · n₂| / (|n₁| |n₂|), and the distance from a point to a line,
 * each worked out with the dragged numbers and written the book's way.
 */
import { signedFracTex } from '#lib/core/algebra-text.js';
import { numTex } from '#lib/core/number-format.js';
import {
  angleOf,
  distance,
  intersect,
  op,
  relationOf,
  sqrtTex,
  valueTex,
} from '../_shared/coords.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {import('../_shared/coords.js').Line} Line */

/** The board, in grid units. */
export const BOX = { xMin: -6, xMax: 6, yMin: -5, yMax: 5 };

/**
 * The relation of Δ₁ and Δ₂ as a sentence with TeX, and the common point.
 * @param {Line} l @param {Line} m
 */
export function relationText(l, m) {
  const kind = relationOf(l, m);
  if (kind === 'trung')
    return 'Hệ hai phương trình có vô số nghiệm: $\\Delta_1$ và $\\Delta_2$ trùng nhau.';
  if (kind === 'song-song')
    return '$\\vec n_1$, $\\vec n_2$ cùng phương và hệ hai phương trình vô nghiệm: $\\Delta_1 \\parallel \\Delta_2$.';
  const d = l.a * m.b - m.a * l.b;
  const point = `I\\left(${signedFracTex(l.b * m.c - m.b * l.c, d)};\\ ${signedFracTex(m.a * l.c - l.a * m.c, d)}\\right)`;
  const perp = l.a * m.a + l.b * m.b === 0;
  return `Hệ có nghiệm duy nhất: $\\Delta_1$ cắt $\\Delta_2$ tại $${point}$${perp ? '; hơn nữa $\\vec n_1 \\cdot \\vec n_2 = 0$ nên $\\Delta_1 \\perp \\Delta_2$' : ''}.`;
}

/**
 * The angle formula with the coefficients substituted, then its value.
 * @param {Line} l @param {Line} m
 */
export function angleTex(l, m) {
  const dot = l.a * m.a + l.b * m.b;
  const s1 = l.a * l.a + l.b * l.b;
  const s2 = m.a * m.a + m.b * m.b;
  const cos = Math.abs(dot) / Math.sqrt(s1 * s2);
  const deg = angleOf(l, m);
  return {
    cos: `\\cos\\varphi = \\dfrac{|${numTex(l.a)} \\cdot ${op(m.a)} + ${op(l.b)} \\cdot ${op(m.b)}|}{\\sqrt{${op(l.a)}^2 + ${op(l.b)}^2} \\cdot \\sqrt{${op(m.a)}^2 + ${op(m.b)}^2}}`,
    value: `\\cos\\varphi = \\dfrac{${Math.abs(dot)}}{${sqrtTex(s1)} \\cdot ${sqrtTex(s2)}} ${valueTex(cos)}`,
    angle: `\\varphi ${valueTex(deg)}^\\circ`,
    deg,
  };
}

/**
 * The distance formula from M to l with the numbers substituted.
 * @param {V} M @param {Line} l
 */
export function distanceTex(M, l) {
  const num = Math.abs(l.a * M.x + l.b * M.y + l.c);
  const s = l.a * l.a + l.b * l.b;
  const d = distance(M, l);
  const root = sqrtTex(s);
  const exact = /^\d+$/.test(root) ? '' : ` = \\dfrac{${num}}{${root}}`;
  return `d(M, \\Delta) = \\dfrac{|${numTex(l.a)} \\cdot ${op(M.x)} + ${op(l.b)} \\cdot ${op(M.y)} + ${op(l.c)}|}{\\sqrt{${op(l.a)}^2 + ${op(l.b)}^2}}${exact} ${valueTex(d)}`;
}

/**
 * An SVG arc path marking the angle (at most 90°) between two crossing lines
 * at their common point, in screen coordinates, or null.
 * @param {Line} l @param {Line} m
 * @param {(p: V) => V} px math point to SVG point
 * @param {number} r radius in grid units
 */
export function anglePath(l, m, px, r) {
  const I = intersect(l, m);
  if (!I) return null;
  const unit = (/** @type {V} */ u) => {
    const k = Math.hypot(u.x, u.y);
    return { x: u.x / k, y: u.y / k };
  };
  const u = unit({ x: -l.b, y: l.a });
  let w = unit({ x: -m.b, y: m.a });
  if (u.x * w.x + u.y * w.y < 0) w = { x: -w.x, y: -w.y };
  const p = px({ x: I.x + u.x * r, y: I.y + u.y * r });
  const q = px({ x: I.x + w.x * r, y: I.y + w.y * r });
  const R = Math.hypot(p.x - px(I).x, p.y - px(I).y);
  // Counter-clockwise in math coordinates is clockwise on screen (y down).
  const sweep = u.x * w.y - u.y * w.x > 0 ? 1 : 0;
  const c = px(I);
  return `M ${c.x} ${c.y} L ${p.x} ${p.y} A ${R} ${R} 0 0 ${sweep} ${q.x} ${q.y} Z`;
}
