/**
 * The three conics of the chapter in their canonical position, written the
 * book's way: the ellipse x²/a² + y²/b² = 1 (a > b > 0), the hyperbola
 * x²/a² − y²/b² = 1 and the parabola y² = 2px (p > 0). Each comes with its
 * foci, eccentricity e, directrices and focal radii, sampled into points a
 * handle can slide along; a conic given by a focus, a directrix and e is
 * sampled in polar form around its focus.
 */
import { numTex, tidy } from '#lib/core/number-format.js';
import { dist } from '#lib/geom-engine/plane.js';

/** @typedef {{ x: number, y: number }} V */
/** @typedef {'elip' | 'parabol' | 'hypebol' | 'duong-tron'} Kind */

/**
 * The ellipse x²/a² + y²/b² = 1 with a ≥ b > 0: c² = a² − b², e = c/a and the
 * directrices x = ±a/e (none for a circle, where c = 0).
 * @param {number} a @param {number} b
 */
export function ellipse(a, b) {
  const c = Math.sqrt(Math.max(0, a * a - b * b));
  const e = c / a;
  return {
    a,
    b,
    c,
    e,
    foci: /** @type {V[]} */ ([
      { x: -c, y: 0 },
      { x: c, y: 0 },
    ]),
    directrix: e === 0 ? Infinity : a / e,
  };
}

/**
 * The hyperbola x²/a² − y²/b² = 1: c² = a² + b², e = c/a > 1, the directrices
 * x = ±a/e and the asymptotes y = ±(b/a)x.
 * @param {number} a @param {number} b
 */
export function hyperbola(a, b) {
  const c = Math.sqrt(a * a + b * b);
  const e = c / a;
  return {
    a,
    b,
    c,
    e,
    foci: /** @type {V[]} */ ([
      { x: -c, y: 0 },
      { x: c, y: 0 },
    ]),
    directrix: a / e,
    slope: b / a,
  };
}

/**
 * The parabola y² = 2px: focus F(p/2; 0), directrix x = −p/2, e = 1.
 * @param {number} p
 */
export function parabola(p) {
  return { p, e: 1, focus: { x: p / 2, y: 0 }, directrix: -p / 2 };
}

/**
 * The focal radii of the point of abscissa x: on the ellipse MF₁ = a + ex and
 * MF₂ = a − ex; on the hyperbola MF₁ = |a + ex| and MF₂ = |a − ex|.
 * @param {{ a: number, e: number }} conic @param {number} x
 * @param {boolean} [absolute] true for the hyperbola
 * @returns {[number, number]}
 */
export function focalRadii({ a, e }, x, absolute = false) {
  const r1 = a + e * x;
  const r2 = a - e * x;
  return absolute ? [Math.abs(r1), Math.abs(r2)] : [r1, r2];
}

/**
 * The focal radius MF = x + p/2 of a point of abscissa x on y² = 2px.
 * @param {number} p @param {number} x
 */
export const parabolaRadius = (p, x) => x + p / 2;

/**
 * The kind of conic of eccentricity e: elip below 1, parabol at 1, hypebol
 * above (a circle has e = 0).
 * @param {number} e
 * @returns {Kind}
 */
export function kindOf(e) {
  const t = tidy(e, 6);
  if (t === 0) return 'duong-tron';
  if (t < 1) return 'elip';
  return t === 1 ? 'parabol' : 'hypebol';
}

/** Vietnamese names of the kinds. */
export const KIND_NAMES = /** @type {const} */ ({
  'duong-tron': 'đường tròn',
  elip: 'elip',
  parabol: 'parabol',
  hypebol: 'hypebol',
});

/**
 * n points of the ellipse, counterclockwise from (a; 0).
 * @param {number} a @param {number} b @param {number} [n]
 * @returns {V[]}
 */
export function sampleEllipse(a, b, n = 120) {
  return Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return { x: tidy(a * Math.cos(t), 9), y: tidy(b * Math.sin(t), 9) };
  });
}

/**
 * One branch of the hyperbola (sign 1 right, −1 left) from bottom to top,
 * cut where |x| reaches xMax or |y| reaches yMax.
 * @param {number} a @param {number} b @param {1 | -1} sign
 * @param {number} xMax @param {number} yMax @param {number} [n]
 * @returns {V[]}
 */
export function sampleBranch(a, b, sign, xMax, yMax, n = 61) {
  const T = Math.min(Math.asinh(yMax / b), Math.acosh(Math.max(1, xMax / a)));
  return Array.from({ length: n }, (_, i) => {
    const t = -T + (2 * T * i) / (n - 1);
    return { x: sign * a * Math.cosh(t), y: b * Math.sinh(t) };
  });
}

/**
 * The parabola y² = 2px from bottom to top, cut at |y| = yMax and x = xMax.
 * @param {number} p @param {number} xMax @param {number} yMax @param {number} [n]
 * @returns {V[]}
 */
export function sampleParabola(p, xMax, yMax, n = 81) {
  const Y = Math.min(yMax, Math.sqrt(2 * p * xMax));
  return Array.from({ length: n }, (_, i) => {
    const y = -Y + (2 * Y * i) / (n - 1);
    return { x: (y * y) / (2 * p), y };
  });
}

/**
 * The conic with focus F(0; 0), directrix Δ: x = −k and eccentricity e, the
 * points M with MF = e·d(M, Δ), as polylines that stay within distance R of
 * F. In polar form around F, r = ek / (1 − e·cos θ); a negative r is a point
 * of the far branch of a hyperbola. The first polyline is the branch that
 * goes round F.
 * @param {number} e @param {number} k @param {number} R @param {number} [n]
 * @returns {V[][]}
 */
export function focusDirectrixConic(e, k, R, n = 360) {
  /** @type {{ sign: number, from: number, to: number, pts: V[] }[]} */
  const runs = [];
  for (let i = 0; i <= n; i += 1) {
    const t = (2 * Math.PI * i) / n;
    const den = 1 - e * Math.cos(t);
    const r = Math.abs(den) < 1e-9 ? Infinity : (e * k) / den;
    if (!Number.isFinite(r) || Math.abs(r) > R) continue;
    const sign = r > 0 ? 1 : -1;
    const last = runs[runs.length - 1];
    const point = { x: r * Math.cos(t), y: r * Math.sin(t) };
    if (last && last.sign === sign && last.to === i - 1) {
      last.pts.push(point);
      last.to = i;
    } else runs.push({ sign, from: i, to: i, pts: [point] });
  }
  // θ = 2π is θ = 0 again: a run cut there is joined back into one piece.
  const first = runs[0];
  const end = runs[runs.length - 1];
  if (runs.length > 1 && first.from === 0 && end.to === n && first.sign === end.sign) {
    runs.pop();
    first.pts = [...end.pts.slice(0, -1), ...first.pts];
  }
  return [...runs.filter((r) => r.sign > 0), ...runs.filter((r) => r.sign < 0)].map((r) => r.pts);
}

/**
 * The ratio MF / d(M, Δ) for focus F(0; 0) and directrix x = −k.
 * @param {V} M @param {number} k
 */
export const ratioToDirectrix = (M, k) => dist(M, { x: 0, y: 0 }) / Math.abs(M.x + k);

/**
 * Index of the sample nearest to q.
 * @param {V[]} samples @param {V} q
 */
export function nearestIndex(samples, q) {
  let best = 0;
  let bestD = Infinity;
  samples.forEach((s, i) => {
    const d = (s.x - q.x) ** 2 + (s.y - q.y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

/**
 * The reflection of direction d on a curve whose normal at the point is n:
 * d − 2(d·n)n/|n|².
 * @param {V} d @param {V} n
 * @returns {V}
 */
export function reflect(d, n) {
  const k = (2 * (d.x * n.x + d.y * n.y)) / (n.x * n.x + n.y * n.y);
  return { x: d.x - k * n.x, y: d.y - k * n.y };
}

/**
 * A ray travelling in the direction −Ox at height y hits y² = 2px at
 * M(y²/2p; y) and reflects off it. The normal there is (−p; y), the gradient
 * of y² − 2px. Returns M and the reflected direction, scaled to unit length.
 * @param {number} p @param {number} y
 */
export function parallelRayHit(p, y) {
  const M = { x: (y * y) / (2 * p), y };
  const r = reflect({ x: -1, y: 0 }, { x: -p, y });
  const len = Math.hypot(r.x, r.y);
  return { M, dir: { x: r.x / len, y: r.y / len } };
}

/**
 * A value in TeX after an equals or approx sign: '= 3', '= 2{,}5' or
 * '\approx 3{,}46' when more than `places` decimals would be needed.
 * @param {number} v @param {number} [places]
 */
export function valueTex(v, places = 2) {
  const exact = tidy(v, 9) === tidy(v, places);
  return `${exact ? '=' : '\\approx'} ${numTex(v, places)}`;
}
