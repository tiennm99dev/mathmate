/**
 * Coordinate geometry of the chapter, written the book's way: lines as
 * general equations ax + by + c = 0 and parametric systems, how two lines
 * lie, the angle between them, the distance from a point to a line, circles
 * (x − a)² + (y − b)² = R² with their expanded form and tangents. Lines with
 * whole coefficients are kept in lowest terms with a positive leading
 * coefficient, so equal lines have equal coefficients.
 */
import {
  MINUS,
  formatFixed,
  formatNumber,
  numTex,
  texNumber,
  tidy,
} from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {{ a: number, b: number, c: number }} Line the line ax + by + c = 0 */

const EPS = 1e-9;

/**
 * A line in lowest whole terms: the coefficients divided by their greatest
 * common divisor, and the first non-zero of a, b made positive.
 * @param {number} a @param {number} b @param {number} c
 * @returns {Line}
 */
export function normLine(a, b, c) {
  const g = gcd(gcd(a, b), c) || 1;
  const s = a < 0 || (a === 0 && b < 0) ? -1 : 1;
  return { a: (s * a) / g + 0, b: (s * b) / g + 0, c: (s * c) / g + 0 };
}

/**
 * The line through two distinct points: its direction vector is AB, so
 * n = (y_B − y_A; x_A − x_B) is a normal vector.
 * @param {V} A @param {V} B
 * @returns {Line}
 */
export function lineThrough(A, B) {
  const a = B.y - A.y;
  const b = A.x - B.x;
  return normLine(a, b, -(a * A.x + b * A.y));
}

/**
 * The line through a point with a given normal vector n = (a; b).
 * @param {V} P @param {V} n
 * @returns {Line}
 */
export const lineByNormal = (P, n) => normLine(n.x, n.y, -(n.x * P.x + n.y * P.y));

/** @param {Line} l @param {Line} m */
export const sameLine = (l, m) => l.a === m.a && l.b === m.b && l.c === m.c;

/**
 * A sum of terms in TeX with the signs joined: [[2, 'x'], [-3, 'y'], [5, '']]
 * gives '2x - 3y + 5'. A coefficient ±1 before a letter is left out, zero
 * terms are dropped, and an empty sum is '0'.
 * @param {[number, string][]} terms
 */
export function termsTex(terms) {
  let out = '';
  for (const [coef, name] of terms) {
    const k = tidy(coef, 9);
    if (k === 0) continue;
    const mag = Math.abs(k);
    const body = name && mag === 1 ? name : `${numTex(mag)}${name}`;
    if (out === '') out = k < 0 ? `-${body}` : body;
    else out += ` ${k < 0 ? '-' : '+'} ${body}`;
  }
  return out === '' ? '0' : out;
}

/** The general equation in TeX: '2x - 3y + 5 = 0'. @param {Line} l */
export const lineTex = (l) =>
  `${termsTex([
    [l.a, 'x'],
    [l.b, 'y'],
    [l.c, ''],
  ])} = 0`;

/** The same equation as plain text for screen readers: '2x − 3y + 5 = 0'. @param {Line} l */
export const lineText = (l) => lineTex(l).replaceAll('-', MINUS);

/**
 * A parametric system in TeX through P with direction vector u.
 * @param {V} P @param {V} u @param {string} [t]
 */
export function paramTex(P, u, t = 't') {
  const x = termsTex([
    [P.x, ''],
    [u.x, t],
  ]);
  const y = termsTex([
    [P.y, ''],
    [u.y, t],
  ]);
  return `\\begin{cases} x = ${x} \\\\ y = ${y} \\end{cases}`;
}

/**
 * Coordinates as TeX: (2;\ -1{,}5).
 * @param {number} x @param {number} y
 */
export const coordTex = (x, y) => `(${numTex(tidy(x, 6), 2)};\\ ${numTex(tidy(y, 6), 2)})`;

/**
 * Coordinates as plain text: (2; −1,5).
 * @param {number} x @param {number} y
 */
export const coordText = (x, y) =>
  `(${formatNumber(tidy(x, 6), 2)}; ${formatNumber(tidy(y, 6), 2)})`;

/** A number as a TeX operand: negatives in brackets. @param {number} n */
export const op = (n) => (n < 0 ? `(${numTex(n)})` : numTex(n));

/**
 * How two lines lie: 'cat' (cắt nhau), 'song-song' or 'trung' (trùng nhau).
 * @param {Line} l @param {Line} m
 * @returns {'cat' | 'song-song' | 'trung'}
 */
export function relationOf(l, m) {
  if (Math.abs(l.a * m.b - m.a * l.b) > EPS) return 'cat';
  const same = Math.abs(l.a * m.c - m.a * l.c) < EPS && Math.abs(l.b * m.c - m.b * l.c) < EPS;
  return same ? 'trung' : 'song-song';
}

/**
 * The common point of two crossing lines, by Cramer's rule, or null.
 * @param {Line} l @param {Line} m
 * @returns {V | null}
 */
export function intersect(l, m) {
  const d = l.a * m.b - m.a * l.b;
  if (Math.abs(d) < EPS) return null;
  return { x: tidy((l.b * m.c - m.b * l.c) / d, 9), y: tidy((m.a * l.c - l.a * m.c) / d, 9) };
}

/**
 * The angle between two lines in degrees, from 0 to 90: the angle whose
 * cosine is |n₁ · n₂| / (|n₁| |n₂|).
 * @param {Line} l @param {Line} m
 */
export function angleOf(l, m) {
  const dot = Math.abs(l.a * m.a + l.b * m.b);
  const cross = Math.abs(l.a * m.b - m.a * l.b);
  return tidy((Math.atan2(cross, dot) * 180) / Math.PI, 9);
}

/**
 * The distance from P to the line l: |a x₀ + b y₀ + c| / √(a² + b²).
 * @param {V} P @param {Line} l
 */
export const distance = (P, l) => Math.abs(l.a * P.x + l.b * P.y + l.c) / Math.hypot(l.a, l.b);

/**
 * The foot of the perpendicular from P to l.
 * @param {V} P @param {Line} l
 */
export function footOn(P, l) {
  const k = (l.a * P.x + l.b * P.y + l.c) / (l.a * l.a + l.b * l.b);
  return { x: tidy(P.x - k * l.a, 9), y: tidy(P.y - k * l.b, 9) };
}

/**
 * √n for a whole n in simplest form as TeX: 8 → '2\sqrt{2}', 9 → '3', 7 →
 * '\sqrt{7}'.
 * @param {number} n
 */
export function sqrtTex(n) {
  let out = 1;
  let rest = n;
  for (let k = 2; k * k <= rest; k++) {
    while (rest % (k * k) === 0) {
      out *= k;
      rest /= k * k;
    }
  }
  if (rest === 1) return String(out);
  return `${out === 1 ? '' : out}\\sqrt{${rest}}`;
}

/**
 * A computed value written after '=' or '≈': exact when it has at most two
 * decimals, else rounded to two: 5 → '= 5', √13 → '\approx 3{,}61'.
 * @param {number} value
 */
export function valueTex(value) {
  const v = tidy(value, 9);
  if (Math.abs(v * 100 - Math.round(v * 100)) < 1e-7) return `= ${numTex(v, 2)}`;
  return `\\approx ${texNumber(formatFixed(v, 2)).replace(MINUS, '-')}`;
}

/**
 * The same value as plain text: '5' or '≈ 3,61'.
 * @param {number} value
 */
export function valueText(value) {
  const v = tidy(value, 9);
  if (Math.abs(v * 100 - Math.round(v * 100)) < 1e-7) return formatNumber(v, 2);
  return `≈ ${formatFixed(v, 2)}`;
}

/**
 * The two ends of the part of l inside a box, or null when l misses it.
 * @param {Line} l
 * @param {{ xMin: number, xMax: number, yMin: number, yMax: number }} box
 * @returns {[V, V] | null}
 */
export function clipLine(l, box) {
  /** @type {V[]} */
  const pts = [];
  const push = (/** @type {V} */ p) => {
    if (pts.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > 1e-7)) pts.push(p);
  };
  if (Math.abs(l.b) > EPS) {
    for (const x of [box.xMin, box.xMax]) {
      const y = -(l.a * x + l.c) / l.b;
      if (y >= box.yMin - EPS && y <= box.yMax + EPS) push({ x, y });
    }
  }
  if (Math.abs(l.a) > EPS) {
    for (const y of [box.yMin, box.yMax]) {
      const x = -(l.b * y + l.c) / l.a;
      if (x >= box.xMin - EPS && x <= box.xMax + EPS) push({ x, y });
    }
  }
  return pts.length >= 2 ? [pts[0], pts[1]] : null;
}

/**
 * A circle's equation in TeX: (x - 1)^2 + (y + 2)^2 = 9, with x^2 when the
 * centre's coordinate is 0.
 * @param {V} I centre @param {number} r2 the square of the radius
 */
export function circleTex(I, r2) {
  const part = (/** @type {string} */ v, /** @type {number} */ k) =>
    k === 0 ? `${v}^2` : `(${v} ${k > 0 ? '-' : '+'} ${numTex(Math.abs(k))})^2`;
  return `${part('x', I.x)} + ${part('y', I.y)} = ${numTex(r2)}`;
}

/**
 * The expanded equation x² + y² − 2ax − 2by + c = 0 with c = a² + b² − R².
 * @param {V} I @param {number} r2
 */
export const expandedTex = (I, r2) =>
  `${termsTex([
    [1, 'x^2'],
    [1, 'y^2'],
    [-2 * I.x, 'x'],
    [-2 * I.y, 'y'],
    [I.x * I.x + I.y * I.y - r2, ''],
  ])} = 0`;

/**
 * The radius from its square, in TeX: 9 → '3', 8 → '2\sqrt{2}'.
 * @param {number} r2
 */
export const radiusTex = (r2) => sqrtTex(r2);

/**
 * The whole-number points of the circle with centre I and radius √r2,
 * counter-clockwise from the right.
 * @param {V} I @param {number} r2
 * @returns {V[]}
 */
export function latticeOnCircle(I, r2) {
  /** @type {V[]} */
  const out = [];
  const r = Math.floor(Math.sqrt(r2));
  for (let dx = -r; dx <= r; dx++) {
    const dy2 = r2 - dx * dx;
    const dy = Math.round(Math.sqrt(dy2));
    if (dy * dy !== dy2) continue;
    out.push({ x: I.x + dx, y: I.y + dy });
    if (dy !== 0) out.push({ x: I.x + dx, y: I.y - dy });
  }
  const turn = (/** @type {V} */ p) => {
    const t = Math.atan2(p.y - I.y, p.x - I.x);
    return t < 0 ? t + 2 * Math.PI : t;
  };
  return out.sort((p, q) => turn(p) - turn(q));
}

/**
 * The tangent at M to the circle with centre I: the line through M with
 * normal vector MI, (a − x₀)(x − x₀) + (b − y₀)(y − y₀) = 0.
 * @param {V} I @param {V} M
 * @returns {Line}
 */
export const tangentAt = (I, M) => lineByNormal(M, { x: I.x - M.x, y: I.y - M.y });

/**
 * The tangent formula with M and I substituted, before it is expanded:
 * (1 - 4)(x - 4) + (2 - 6)(y - 6) = 0.
 * @param {V} I @param {V} M
 */
export function tangentSubTex(I, M) {
  const minus = (/** @type {number} */ a, /** @type {number} */ b) => `${numTex(a)} - ${op(b)}`;
  const shift = (/** @type {string} */ v, /** @type {number} */ k) =>
    k === 0 ? v : `${v} ${k > 0 ? '-' : '+'} ${numTex(Math.abs(k))}`;
  return `(${minus(I.x, M.x)})(${shift('x', M.x)}) + (${minus(I.y, M.y)})(${shift('y', M.y)}) = 0`;
}
