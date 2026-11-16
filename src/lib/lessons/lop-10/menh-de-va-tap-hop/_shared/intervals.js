/**
 * Subsets of ℝ written the KNTT way: khoảng $(a; b)$, đoạn $[a; b]$, nửa
 * khoảng $[a; b)$, $(a; b]$, rays to $\pm\infty$, single points and unions of
 * these. A set is a sorted list of disjoint intervals; the empty list is ∅.
 */

import { MINUS, numTex } from '#lib/core/number-format.js';

/**
 * @typedef {{ lo: number, hi: number, loIn: boolean, hiIn: boolean }} Interval
 * `lo` may be −Infinity and `hi` +Infinity (never included). `lo === hi`
 * with both ends included is the single point `{lo}`.
 */
/** @typedef {Interval[]} RealSet */
/** @typedef {'cap' | 'cup' | 'diff' | 'rdiff' | 'comp'} SetOp */

/**
 * One interval; an infinite end is never included.
 * @param {number} lo @param {number} hi @param {boolean} loIn @param {boolean} hiIn
 * @returns {Interval}
 */
export function interval(lo, hi, loIn, hiIn) {
  return { lo, hi, loIn: Number.isFinite(lo) && loIn, hiIn: Number.isFinite(hi) && hiIn };
}

/** @param {Interval} I @param {number} x */
function inInterval(I, x) {
  const aboveLo = x > I.lo || (x === I.lo && I.loIn);
  const belowHi = x < I.hi || (x === I.hi && I.hiIn);
  return aboveLo && belowHi;
}

/**
 * Whether `x` belongs to the set.
 * @param {RealSet} set @param {number} x
 */
export function has(set, x) {
  return set.some((I) => inInterval(I, x));
}

/** @type {Record<SetOp, (a: boolean, b: boolean) => boolean>} */
const RULES = {
  cap: (a, b) => a && b,
  cup: (a, b) => a || b,
  diff: (a, b) => a && !b,
  rdiff: (a, b) => !a && b,
  comp: (a) => !a,
};

/**
 * The set of x for which `rule(x)` holds, given the only places where its
 * truth can change. Between two such places (and beyond the outer ones) the
 * truth is tested at one inner point.
 * @param {number[]} cuts finite endpoints, any order, repeats allowed
 * @param {(x: number) => boolean} rule
 * @returns {RealSet}
 */
export function setWhere(cuts, rule) {
  const pts = [...new Set(cuts.filter(Number.isFinite))].sort((p, q) => p - q);
  /** @type {Array<{ lo: number, hi: number, point: boolean, inside: boolean }>} */
  const pieces = [];
  const gap = (/** @type {number} */ lo, /** @type {number} */ hi, /** @type {number} */ probe) =>
    pieces.push({ lo, hi, point: false, inside: rule(probe) });
  if (pts.length === 0) gap(-Infinity, Infinity, 0);
  else {
    gap(-Infinity, pts[0], pts[0] - 1);
    pts.forEach((p, i) => {
      pieces.push({ lo: p, hi: p, point: true, inside: rule(p) });
      const next = i + 1 < pts.length ? pts[i + 1] : Infinity;
      gap(p, next, Number.isFinite(next) ? (p + next) / 2 : p + 1);
    });
  }
  /** @type {RealSet} */
  const out = [];
  /** @type {Interval | null} */
  let open = null;
  for (const piece of pieces) {
    if (piece.inside) {
      if (!open) open = { lo: piece.lo, hi: piece.hi, loIn: piece.point, hiIn: piece.point };
      else {
        open.hi = piece.hi;
        open.hiIn = piece.point;
      }
    } else if (open) {
      out.push(interval(open.lo, open.hi, open.loIn, open.hiIn));
      open = null;
    }
  }
  if (open) out.push(interval(open.lo, open.hi, open.loIn, open.hiIn));
  return out;
}

/** @param {RealSet} set */
const endsOf = (set) => set.flatMap((I) => [I.lo, I.hi]);

/**
 * `A ∩ B`, `A ∪ B`, `A \ B`, `B \ A` or the complement of A in ℝ.
 * @param {RealSet} A @param {RealSet} B @param {SetOp} op
 * @returns {RealSet}
 */
export function combine(A, B, op) {
  const rule = RULES[op];
  return setWhere([...endsOf(A), ...endsOf(B)], (x) => rule(has(A, x), has(B, x)));
}

/** @param {number} v */
const endTex = (v) => (v === -Infinity ? '-\\infty' : v === Infinity ? '+\\infty' : numTex(v));
/** @param {number} v */
const endText = (v) =>
  v === -Infinity ? `${MINUS}∞` : v === Infinity ? '+∞' : String(v).replace('-', MINUS);

/**
 * One interval in the book's notation, as TeX: `[1; 3)`, `(-\infty; 2]`, `\{4\}`.
 * @param {Interval} I
 */
export function intervalTex(I) {
  if (I.lo === I.hi) return `\\{${endTex(I.lo)}\\}`;
  if (I.lo === -Infinity && I.hi === Infinity) return '\\mathbb{R}';
  return `${I.loIn ? '[' : '('}${endTex(I.lo)};\\ ${endTex(I.hi)}${I.hiIn ? ']' : ')'}`;
}

/**
 * A whole set as TeX: `\varnothing`, one interval, or a union.
 * @param {RealSet} set
 */
export function setTex(set) {
  return set.length === 0 ? '\\varnothing' : set.map(intervalTex).join(' \\cup ');
}

/**
 * A whole set as plain text for screen readers and buttons: `[1; 3) ∪ {4}`.
 * @param {RealSet} set
 */
export function setText(set) {
  if (set.length === 0) return 'tập rỗng';
  return set
    .map((I) => {
      if (I.lo === I.hi) return `{${endText(I.lo)}}`;
      if (I.lo === -Infinity && I.hi === Infinity) return 'ℝ';
      return `${I.loIn ? '[' : '('}${endText(I.lo)}; ${endText(I.hi)}${I.hiIn ? ']' : ')'}`;
    })
    .join(' ∪ ');
}

/**
 * What the book calls the interval: khoảng, đoạn, nửa khoảng or a point.
 * @param {Interval} I
 */
export function kindOf(I) {
  if (I.lo === I.hi) return 'điểm';
  if (I.loIn && I.hiIn) return 'đoạn';
  if (!I.loIn && !I.hiIn) return 'khoảng';
  return 'nửa khoảng';
}

/**
 * Whether two sets are the same subset of ℝ.
 * @param {RealSet} A @param {RealSet} B
 */
export function sameSet(A, B) {
  const tidy = (/** @type {RealSet} */ S) => setTex(setWhere(endsOf(S), (x) => has(S, x)));
  return tidy(A) === tidy(B);
}
