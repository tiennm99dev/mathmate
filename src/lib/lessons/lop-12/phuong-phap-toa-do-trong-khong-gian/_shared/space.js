import { add3, cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { formatNumber, numTex } from '#lib/core/number-format.js';

/**
 * Coordinates in space for the chapter "Phương pháp toạ độ trong không
 * gian": points and vectors written the book's way (`(1; −2; 3)`), exact
 * square roots and quotients such as $\dfrac{\sqrt{3}}{3}$, and the
 * equations of planes, lines and spheres with whole coefficients, written as
 * the book prints them (`2x - y + 3z - 5 = 0`).
 *
 * Model space as in `#lib/geom-engine/solid.js`: z points up, so the model's
 * x, y, z are the axes Ox, Oy, Oz of the book.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

/** @param {number} x @param {number} y @param {number} z @returns {P3} */
export const P = (x = 0, y = 0, z = 0) => ({ x, y, z });

/** @param {P3} a */
export const len3 = (a) => Math.hypot(a.x, a.y, a.z);

/** @param {P3} a */
export const isZero3 = (a) => a.x === 0 && a.y === 0 && a.z === 0;

/**
 * The three coordinates, with −0 written as 0.
 * @param {P3} a @returns {[number, number, number]}
 */
export const coords = (a) => [a.x + 0, a.y + 0, a.z + 0];

/**
 * Coordinates as TeX, the book's way: `(1; -2; 0{,}5)`.
 * @param {P3} a
 */
export const coordTex = (a) =>
  `(${coords(a)
    .map((v) => numTex(v))
    .join('; ')})`;

/**
 * Coordinates as plain text for screen readers and labels: `(1; −2; 0,5)`.
 * @param {P3} a
 */
export const coordText = (a) =>
  `(${coords(a)
    .map((v) => formatNumber(v))
    .join('; ')})`;

/**
 * A number as a TeX operand, bracketed when negative: `3`, `(-2)`.
 * @param {number} n
 */
export const opTex = (n) => (n < 0 ? `(${numTex(n)})` : numTex(n));

/** True when u and v are parallel (the zero vector counts as parallel). @param {P3} u @param {P3} v */
export const parallel3 = (u, v) => isZero3(cross3(u, v));

/**
 * √n = out·√rest with rest free of square factors, for a whole n > 0.
 * @param {number} n
 */
export function splitSquare(n) {
  let out = 1;
  let rest = n;
  for (let k = 2; k * k <= rest; k++) {
    while (rest % (k * k) === 0) {
      out *= k;
      rest /= k * k;
    }
  }
  return { out, rest };
}

/**
 * Exact √n for a whole n ≥ 0, simplified: 12 → '2\\sqrt{3}', 9 → '3'.
 * @param {number} n
 */
export function sqrtTex(n) {
  if (n === 0) return '0';
  const { out, rest } = splitSquare(n);
  if (rest === 1) return `${out}`;
  return out === 1 ? `\\sqrt{${rest}}` : `${out}\\sqrt{${rest}}`;
}

/**
 * The exact value of d / √m for whole d and m > 0, as TeX with a rational
 * denominator: (1, 3) → '\\dfrac{\\sqrt{3}}{3}', (−1, 4) → '-\\dfrac{1}{2}',
 * (6, 9) → '2', (0, 6) → '0'.
 * @param {number} d @param {number} m
 */
export function overSqrtTex(d, m) {
  if (d === 0) return '0';
  const { out, rest } = splitSquare(m);
  let p = Math.abs(d);
  let q = out * rest;
  const g = gcd(p, q);
  p /= g;
  q /= g;
  const sign = d < 0 ? '-' : '';
  const root = `\\sqrt{${rest}}`;
  const top = rest === 1 ? `${p}` : p === 1 ? root : `${p}${root}`;
  return q === 1 ? `${sign}${top}` : `${sign}\\dfrac{${top}}{${q}}`;
}

/**
 * "= 45^\\circ" for a whole angle, "\\approx 54{,}7^\\circ" otherwise.
 * @param {number} deg
 */
export function degreeTex(deg) {
  const exact = Math.abs(deg - Math.round(deg)) < 1e-6;
  return `${exact ? '=' : '\\approx'} ${numTex(exact ? Math.round(deg) : deg, 1)}^\\circ`;
}

/**
 * The degrees of an angle rounded to tenths with a decimal comma: '54,7°'.
 * @param {number} deg
 */
export const degreeText = (deg) => `${formatNumber(deg, 1)}°`;

/**
 * The angle between two non-zero vectors in degrees (0° to 180°), or null
 * when one of them is the zero vector.
 * @param {P3} u @param {P3} v
 */
export function angleDeg(u, v) {
  const l = Math.sqrt(dot3(u, u) * dot3(v, v));
  if (l === 0) return null;
  const cos = Math.max(-1, Math.min(1, dot3(u, v) / l));
  return (Math.acos(cos) * 180) / Math.PI;
}

/**
 * One term `k·name` of a sum, with its sign: first term '2x', '-x'; later
 * terms ' + 2x', ' - x'; '' for k = 0. A constant term has name ''.
 * @param {number} k @param {string} name @param {boolean} first
 */
function term(k, name, first) {
  if (k === 0) return '';
  const mag = Math.abs(k) === 1 && name ? '' : numTex(Math.abs(k));
  const sign = k < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ';
  return `${sign}${mag}${name}`;
}

/**
 * A linear sum written the book's way: ([2, -1, 0], 3) → '2x - y + 3'.
 * @param {number[]} ks coefficients of x, y, z
 * @param {number} [c] the constant term
 * @param {string[]} [names]
 */
export function sumTex(ks, c = 0, names = ['x', 'y', 'z']) {
  let out = '';
  [...ks, c].forEach((k, i) => {
    out += term(k, names[i] ?? '', out === '');
  });
  return out || '0';
}

/**
 * The general equation of the plane Ax + By + Cz + D = 0 in TeX:
 * ((2; -1; 0), 3) → '2x - y + 3 = 0'.
 * @param {P3} n the normal vector (A; B; C)
 * @param {number} D
 */
export const planeTex = (n, D) => `${sumTex(coords(n), D)} = 0`;

/**
 * D of the plane through M0 with normal n: A(x − x0) + B(y − y0) + C(z − z0) = 0
 * gives D = −(Ax0 + By0 + Cz0).
 * @param {P3} n @param {P3} m0
 */
export const planeD = (n, m0) => -dot3(n, m0) + 0;

/**
 * A(x − x0) + B(y − y0) + C(z − z0) = 0 in TeX, terms with A = 0 left out:
 * '2(x - 1) - (y + 2) + 3z = 0'.
 * @param {P3} n @param {P3} m0
 */
export function pointNormalTex(n, m0) {
  /** @type {string[]} */
  const parts = [];
  const names = ['x', 'y', 'z'];
  const ns = coords(n);
  const ms = coords(m0);
  for (let i = 0; i < 3; i++) {
    const k = ns[i];
    if (k === 0) continue;
    const inner =
      ms[i] === 0 ? names[i] : `(${names[i]} ${ms[i] < 0 ? '+' : '-'} ${numTex(Math.abs(ms[i]))})`;
    const first = parts.length === 0;
    const mag = Math.abs(k) === 1 ? '' : numTex(Math.abs(k));
    const sign = k < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ';
    parts.push(`${sign}${mag}${inner}`);
  }
  return `${parts.join('') || '0'} = 0`;
}

/**
 * The value of Ax + By + Cz + D at a point.
 * @param {P3} n @param {number} D @param {P3} p
 */
export const planeValue = (n, D, p) => dot3(n, p) + D;

/**
 * x − x0 written in TeX: 'x', 'x - 2', 'x + 3'.
 * @param {string} name @param {number} x0
 */
const shiftTex = (name, x0) =>
  x0 === 0 ? name : `${name} ${x0 < 0 ? '+' : '-'} ${numTex(Math.abs(x0))}`;

/**
 * The parametric equations of the line through M with direction u, as a
 * TeX `cases`: x = x0 + at, y = y0 + bt, z = z0 + ct.
 * @param {P3} m @param {P3} u @param {string} [t] the parameter's name
 */
export function paramTex(m, u, t = 't') {
  const ms = coords(m);
  const us = coords(u);
  const rows = ['x', 'y', 'z'].map((name, i) => `${name} = ${affineTex(ms[i], us[i], t)}`);
  return `\\begin{cases} ${rows.join(' \\\\ ')} \\end{cases}`;
}

/**
 * x0 + a·t written the book's way, the constant first: '1 + 2t', '-t',
 * '3', '2 - t'.
 * @param {number} x0 @param {number} a @param {string} [t]
 */
export function affineTex(x0, a, t = 't') {
  if (x0 === 0) return sumTex([a], 0, [t]);
  return `${numTex(x0)}${term(a, t, false)}`;
}

/**
 * The canonical equations of the line through M with direction u (every
 * coordinate of u non-zero), or null when one coordinate of u is 0:
 * '\\dfrac{x - 1}{2} = \\dfrac{y + 2}{-1} = \\dfrac{z}{3}'.
 * @param {P3} m @param {P3} u
 */
export function canonTex(m, u) {
  const us = coords(u);
  if (us.some((v) => v === 0)) return null;
  const ms = coords(m);
  return ['x', 'y', 'z']
    .map((name, i) => `\\dfrac{${shiftTex(name, ms[i])}}{${numTex(us[i])}}`)
    .join(' = ');
}

/**
 * (x − a)² + (y − b)² + (z − c)² = R² in TeX, with R² given.
 * @param {P3} centre @param {number} r2
 */
export function sphereTex(centre, r2) {
  const cs = coords(centre);
  const parts = ['x', 'y', 'z'].map((name, i) =>
    cs[i] === 0 ? `${name}^2` : `(${shiftTex(name, cs[i])})^2`,
  );
  return `${parts.join(' + ')} = ${numTex(r2)}`;
}

/**
 * The expanded form x² + y² + z² − 2ax − 2by − 2cz + d = 0 in TeX, with
 * d = a² + b² + c² − R².
 * @param {P3} centre @param {number} r2
 */
export function sphereExpandedTex(centre, r2) {
  const d = dot3(centre, centre) - r2;
  const lin = coords(centre).map((v) => -2 * v);
  const rest = sumTex(lin, d);
  return `x^2 + y^2 + z^2${rest === '0' ? '' : rest.startsWith('-') ? ` - ${rest.slice(1)}` : ` + ${rest}`} = 0`;
}

/**
 * Two unit vectors that, with n, make a right-handed orthonormal frame: a
 * basis of the plane with normal n, used to draw a square patch of it.
 * @param {P3} n a non-zero vector
 * @returns {[P3, P3]}
 */
export function planeBasis(n) {
  const k = mul3(n, 1 / len3(n));
  const helper = Math.abs(k.z) < 0.9 ? P(0, 0, 1) : P(1, 0, 0);
  let a = cross3(helper, k);
  a = mul3(a, 1 / len3(a));
  const b = cross3(k, a);
  return [a, b];
}

/**
 * The corners of a square patch of the plane with normal n through c, of
 * half side h.
 * @param {P3} n @param {P3} c @param {number} h
 */
export function planePatch(n, c, h) {
  const [a, b] = planeBasis(n);
  return [
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],
  ].map(([s, t]) => add3(c, add3(mul3(a, s * h), mul3(b, t * h))));
}

/**
 * The foot of the perpendicular from p to the plane n·X + D = 0.
 * @param {P3} n @param {number} D @param {P3} p
 */
export function footOnPlane(n, D, p) {
  const k = planeValue(n, D, p) / dot3(n, n);
  return sub3(p, mul3(n, k));
}

/**
 * A fan marking the angle from direction u to direction v at the point o, as
 * a polygon of radius r; empty when the angle is next to 0°.
 * @param {P3} o @param {P3} u @param {P3} v @param {number} r
 * @returns {P3[]}
 */
export function angleFan(o, u, v, r, steps = 18) {
  const a = mul3(u, 1 / len3(u));
  const b = mul3(v, 1 / len3(v));
  const cos = Math.max(-1, Math.min(1, dot3(a, b)));
  const theta = Math.acos(cos);
  if (theta < 1e-3) return [];
  const side = sub3(b, mul3(a, cos));
  if (len3(side) < 1e-9) return [];
  const w = mul3(side, 1 / len3(side));
  const out = [o];
  for (let i = 0; i <= steps; i++) {
    const k = (theta * i) / steps;
    out.push(add3(o, mul3(add3(mul3(a, Math.cos(k)), mul3(w, Math.sin(k))), r)));
  }
  return out;
}

/**
 * The circle of centre c and radius r in the plane with normal n, as a
 * closed list of points (a sphere's equator, a cut of a sphere).
 * @param {P3} c @param {number} r @param {P3} [n]
 */
export function circle3(c, r, n = P(0, 0, 1), steps = 48) {
  const [a, b] = planeBasis(n);
  return Array.from({ length: steps }, (_, i) => {
    const t = (2 * Math.PI * i) / steps;
    return add3(c, add3(mul3(a, r * Math.cos(t)), mul3(b, r * Math.sin(t))));
  });
}

export { add3, cross3, dot3, mul3, sub3 };
