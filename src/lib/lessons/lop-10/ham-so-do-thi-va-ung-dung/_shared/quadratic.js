/**
 * Quadratic helpers shared by the lessons of the chapter "Hàm số, đồ thị và
 * ứng dụng": the trinomial f(x) = ax² + bx + c written the book's way, its
 * vertex, its roots in exact form (with square roots), the sign of f(x) on
 * each interval, the solution set of a quadratic inequality, and the SVG path
 * of a curve drawn on a coordinate plane.
 */

import { numTex, polyTex, polyText } from '#lib/algebra-engine/polynomial.js';
import { signedFracTex, signedFracText } from '#lib/core/algebra-text.js';
import { formatFixed, formatNumber, tidy } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';

export { curvePath } from '#lib/core/visuals/svg-math.js';

/** Rounds away floating-point noise (`tidy` in `number-format.js`). */
export const clean = tidy;

/**
 * f(x) = ax² + bx + c at x, free of rounding noise.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} x
 */
export function quadAt(a, b, c, x) {
  return clean(a * x * x + b * x + c);
}

/**
 * The trinomial as TeX: '2x^{2} - 5x + 3'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function quadTex(a, b, c) {
  return polyTex([c, b, a]);
}

/**
 * The trinomial as plain text: '2x² − 5x + 3'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function quadText(a, b, c) {
  return polyText([c, b, a]);
}

/**
 * The discriminant Δ = b² − 4ac.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export function discriminant(a, b, c) {
  return clean(b * b - 4 * a * c);
}

/**
 * The vertex S(−b/(2a); −Δ/(4a)) of the parabola y = ax² + bx + c.
 * @param {number} a non-zero
 * @param {number} b
 * @param {number} c
 */
export function vertexOf(a, b, c) {
  return { x: clean(-b / (2 * a)), y: clean(-discriminant(a, b, c) / (4 * a)) };
}

/**
 * The real roots of ax² + bx + c = 0 (a ≠ 0) in increasing order, x₁ < x₂ as
 * in the book; a double root is listed once.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {number[]}
 */
export function rootsOf(a, b, c) {
  if (a === 0) throw new RangeError('a must not be 0');
  const delta = discriminant(a, b, c);
  if (delta < 0) return [];
  if (delta === 0) return [clean(-b / (2 * a))];
  const s = Math.sqrt(delta);
  return [clean((-b - s) / (2 * a)), clean((-b + s) / (2 * a))].sort((p, q) => p - q);
}

/**
 * A number for plain text: exact when it has at most three decimals
 * ('−2,5', '0,125'), otherwise rounded to two with '≈' in front.
 * @param {number} v
 */
export function valText(v) {
  const t = clean(v);
  if (Math.abs(t * 1000 - Math.round(t * 1000)) < 1e-6) return formatNumber(t, 3);
  return `≈ ${formatFixed(t, 2)}`;
}

/**
 * Whether v is a whole number.
 * @param {number} v
 */
const whole = (v) => Math.abs(v - Math.round(v)) < 1e-9;

/**
 * Writes √n as k√m with m square-free.
 * @param {number} n a positive whole number
 */
export function simplifySqrt(n) {
  let k = 1;
  let m = n;
  for (let f = 2; f * f <= m; f++) {
    while (m % (f * f) === 0) {
      m /= f * f;
      k *= f;
    }
  }
  return { k, m };
}

/**
 * The roots of ax² + bx + c = 0 in exact form, x₁ < x₂, for whole
 * coefficients, as TeX and plain text: '2', '-\frac{1}{2}',
 * '\frac{3 - \sqrt{5}}{2}', '1 + \sqrt{2}'. Coefficients that are not whole
 * fall back to decimals.
 * @param {number} a non-zero
 * @param {number} b
 * @param {number} c
 * @returns {Array<{ value: number, tex: string, text: string }>}
 */
export function exactRoots(a, b, c) {
  const values = rootsOf(a, b, c);
  const delta = discriminant(a, b, c);
  if (![a, b, c].every(whole) || values.length === 0) {
    return values.map((v) => ({ value: v, tex: numTex(v), text: valText(v) }));
  }
  const { k, m } = simplifySqrt(delta);
  if (m === 1 || delta === 0) {
    // Rational roots: (−b ± k) / (2a).
    return values.map((v) => {
      const p = Math.round(v * 2 * a);
      return { value: v, tex: signedFracTex(p, 2 * a), text: signedFracText(p, 2 * a) };
    });
  }
  // Irrational roots: (−b ± k√m) / (2a), reduced by the common factor.
  let p = -b;
  let q = k;
  let d = 2 * a;
  const g = gcd(gcd(Math.abs(p), q), Math.abs(d)) || 1;
  p /= g;
  q /= g;
  d /= g;
  if (d < 0) {
    p = -p;
    d = -d;
  }
  const surdTex = `${q === 1 ? '' : q}\\sqrt{${m}}`;
  const surdText = `${q === 1 ? '' : q}√${m}`;
  // With d > 0, p − q√m is the smaller root whatever the sign of a.
  return [-1, 1].map((sign, i) => {
    const op = sign < 0 ? '-' : '+';
    const opText = sign < 0 ? '−' : '+';
    let tex;
    let text;
    if (p === 0) {
      tex = `${sign < 0 ? '-' : ''}${surdTex}`;
      text = `${sign < 0 ? '−' : ''}${surdText}`;
    } else {
      tex = `${numTex(p)} ${op} ${surdTex}`;
      text = `${formatNumber(p)} ${opText} ${surdText}`;
    }
    if (d !== 1) {
      tex = `\\frac{${tex}}{${d}}`;
      text = `(${text})/${d}`;
    }
    return { value: values[i], tex, text };
  });
}

/**
 * @typedef {{ kind: 'interval', from: number, to: number, sign: 1 | -1 } | { kind: 'zero', at: number }} SignPart
 */

/**
 * The sign of f(x) = ax² + bx + c along the real line, from −∞ to +∞: open
 * intervals with their sign, separated by the roots where f(x) = 0. The ends
 * of the line are ±Infinity.
 * @param {number} a non-zero
 * @param {number} b
 * @param {number} c
 * @returns {SignPart[]}
 */
export function signParts(a, b, c) {
  const roots = rootsOf(a, b, c);
  const s = /** @type {1 | -1} */ (Math.sign(a));
  if (roots.length === 0) return [{ kind: 'interval', from: -Infinity, to: Infinity, sign: s }];
  if (roots.length === 1) {
    return [
      { kind: 'interval', from: -Infinity, to: roots[0], sign: s },
      { kind: 'zero', at: roots[0] },
      { kind: 'interval', from: roots[0], to: Infinity, sign: s },
    ];
  }
  const [x1, x2] = roots;
  const t = /** @type {1 | -1} */ (-s);
  return [
    { kind: 'interval', from: -Infinity, to: x1, sign: s },
    { kind: 'zero', at: x1 },
    { kind: 'interval', from: x1, to: x2, sign: t },
    { kind: 'zero', at: x2 },
    { kind: 'interval', from: x2, to: Infinity, sign: s },
  ];
}

/** @typedef {'>' | '<' | '>=' | '<='} Op */

/** TeX of each relation. */
export const OP_TEX = { '>': '>', '<': '<', '>=': '\\ge', '<=': '\\le' };

/** Plain text of each relation. */
export const OP_TEXT = { '>': '>', '<': '<', '>=': '≥', '<=': '≤' };

/**
 * The solution set of ax² + bx + c op 0 as a list of pieces, each a closed or
 * open interval (a single point is from = to, both closed). Returns [] when
 * there is no solution.
 * @param {number} a non-zero
 * @param {number} b
 * @param {number} c
 * @param {Op} op
 * @returns {Array<{ from: number, to: number, closedFrom: boolean, closedTo: boolean }>}
 */
export function solveInequality(a, b, c, op) {
  const want = op === '>' || op === '>=' ? 1 : -1;
  const withZero = op === '>=' || op === '<=';
  /** @type {Array<{ from: number, to: number, closedFrom: boolean, closedTo: boolean }>} */
  const out = [];
  for (const part of signParts(a, b, c)) {
    if (part.kind === 'zero') {
      if (!withZero) continue;
      const last = out[out.length - 1];
      if (last && last.to === part.at) last.closedTo = true;
      else out.push({ from: part.at, to: part.at, closedFrom: true, closedTo: true });
    } else if (part.sign === want) {
      const last = out[out.length - 1];
      if (last && last.to === part.from && last.closedTo) {
        last.to = part.to;
        last.closedTo = false;
      } else {
        out.push({ from: part.from, to: part.to, closedFrom: false, closedTo: false });
      }
    }
  }
  return out;
}

/**
 * The solution set of ax² + bx + c op 0 as TeX in the book's notation:
 * 'S = (-\infty; 1) \cup (3; +\infty)', 'S = [1; 3]', 'S = \mathbb{R}',
 * 'S = \mathbb{R} \setminus \{2\}', 'S = \{2\}', 'S = \varnothing'.
 * Endpoints come from `exactRoots`.
 * @param {number} a non-zero
 * @param {number} b
 * @param {number} c
 * @param {Op} op
 */
export function solutionTex(a, b, c, op) {
  const pieces = solveInequality(a, b, c, op);
  const roots = exactRoots(a, b, c);
  /** @param {number} v */
  const end = (v) =>
    v === -Infinity
      ? '-\\infty'
      : v === Infinity
        ? '+\\infty'
        : (roots.find((r) => Math.abs(r.value - v) < 1e-9)?.tex ?? numTex(v));
  if (pieces.length === 0) return 'S = \\varnothing';
  if (pieces.length === 1 && pieces[0].from === -Infinity && pieces[0].to === Infinity) {
    return 'S = \\mathbb{R}';
  }
  // ℝ without the double root.
  if (
    pieces.length === 2 &&
    pieces[0].from === -Infinity &&
    pieces[1].to === Infinity &&
    pieces[0].to === pieces[1].from
  ) {
    return `S = \\mathbb{R} \\setminus \\{${end(pieces[0].to)}\\}`;
  }
  const parts = pieces.map((p) =>
    p.from === p.to
      ? `\\{${end(p.from)}\\}`
      : `${p.closedFrom ? '[' : '('}${end(p.from)}; ${end(p.to)}${p.closedTo ? ']' : ')'}`,
  );
  return `S = ${parts.join(' \\cup ')}`;
}

/**
 * A point as plain text, coordinates to at most three decimals: '(0,5; −4)'.
 * @param {{ x: number, y: number }} p
 */
export function pointText(p) {
  return `(${formatNumber(clean(p.x), 3)}; ${formatNumber(clean(p.y), 3)})`;
}

/**
 * The region between y = f(x) and the x-axis over the plane's x range, as a
 * closed SVG path; values are held just outside the plane so the shape stays
 * whole. Clip it to the half above or below the axis to colour where f(x) is
 * positive or negative.
 * @param {(x: number) => number} f
 * @param {{ mx: (x: number) => number, my: (y: number) => number, xMin: number, xMax: number, yMin: number, yMax: number }} plane
 * @param {number} [steps]
 */
export function areaPath(f, plane, steps = 200) {
  const lo = plane.yMin - 1;
  const hi = plane.yMax + 1;
  let d = `M${plane.mx(plane.xMin).toFixed(1)} ${plane.my(0).toFixed(1)} `;
  for (let i = 0; i <= steps; i++) {
    const x = plane.xMin + ((plane.xMax - plane.xMin) * i) / steps;
    const y = Math.min(hi, Math.max(lo, f(x)));
    d += `L${plane.mx(x).toFixed(1)} ${plane.my(y).toFixed(1)} `;
  }
  return `${d}L${plane.mx(plane.xMax).toFixed(1)} ${plane.my(0).toFixed(1)} Z`;
}

/**
 * The two rows of the sign table: the x row (−∞, the roots, +∞) and the
 * f(x) row (a sign under each interval, 0 under each root). Cells alternate
 * between ends or roots and the gaps between them, as in the book.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {{ x: string[], f: string[] }} TeX of each cell
 */
export function signTable(a, b, c) {
  const roots = exactRoots(a, b, c);
  /** @type {string[]} */
  const x = ['-\\infty'];
  /** @type {string[]} */
  const f = [''];
  for (const part of signParts(a, b, c)) {
    if (part.kind === 'interval') {
      x.push('');
      f.push(part.sign > 0 ? '+' : '-');
    } else {
      const r = roots.find((q) => Math.abs(q.value - part.at) < 1e-9);
      x.push(r ? r.tex : '');
      f.push('0');
    }
  }
  x.push('+\\infty');
  f.push('');
  return { x, f };
}
