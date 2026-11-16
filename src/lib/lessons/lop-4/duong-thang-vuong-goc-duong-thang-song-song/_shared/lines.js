/**
 * Straight lines for the grade 4 chapter on perpendicular and parallel
 * lines: a line is a point and a direction in degrees (0° points right,
 * angles grow counter-clockwise, as in `angle-math.js`), drawn across a
 * board by clipping it to the board's rectangle. Also the sliding set
 * square (ê ke) the book draws perpendicular and parallel lines with: one
 * leg lies on a base line, the set square slides along it, and the other
 * leg is perpendicular to the base. Pure and DOM-free.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {'vuong-goc' | 'song-song' | 'cat'} Relation
 * @typedef {{ o: Pt, deg: number }} Base a base line: a point and a direction
 */
import { dirOf, measure, norm } from '#lib/core/visuals/angle-math.js';

/**
 * The part of the line through `p` with direction `deg` that lies inside the
 * rectangle from (`pad`, `pad`) to (`w − pad`, `h − pad`); null when the line
 * misses it.
 * @param {Pt} p @param {number} deg @param {number} w @param {number} h @param {number} [pad]
 * @returns {[Pt, Pt] | null}
 */
export function clipLine(p, deg, w, h, pad = 0) {
  const u = dirOf(deg);
  let lo = -Infinity;
  let hi = Infinity;
  for (const [start, step, min, max] of [
    [p.x, u.x, pad, w - pad],
    [p.y, u.y, pad, h - pad],
  ]) {
    if (Math.abs(step) < 1e-9) {
      if (start < min || start > max) return null;
      continue;
    }
    const t1 = (min - start) / step;
    const t2 = (max - start) / step;
    lo = Math.max(lo, Math.min(t1, t2));
    hi = Math.min(hi, Math.max(t1, t2));
  }
  if (lo > hi) return null;
  return [
    { x: p.x + lo * u.x, y: p.y + lo * u.y },
    { x: p.x + hi * u.x, y: p.y + hi * u.y },
  ];
}

/**
 * The angle two lines make where they meet, from 0° (same direction) to 90°.
 * @param {number} a @param {number} b directions in degrees
 */
export function lineAngle(a, b) {
  const m = measure(norm(a), norm(b));
  return Math.round(m > 90 ? 180 - m : m);
}

/**
 * How two different lines with directions `a` and `b` lie: perpendicular,
 * parallel, or crossing without a right angle.
 * @param {number} a @param {number} b
 * @returns {Relation}
 */
export function relationOf(a, b) {
  const m = lineAngle(a, b);
  if (m === 0) return 'song-song';
  return m === 90 ? 'vuong-goc' : 'cat';
}

/** The words for each relation, as the book says them. */
export const RELATION_WORDS = /** @type {const} */ ({
  'vuong-goc': 'vuông góc với nhau',
  'song-song': 'song song với nhau',
  cat: 'cắt nhau nhưng không vuông góc',
});

/**
 * Where a point lies seen from a base line: `s` along it from the base point
 * and `h` across it, positive on the left of its direction.
 * @param {Base} base @param {Pt} p
 */
export function paramsOf(base, p) {
  const u = dirOf(base.deg);
  const n = dirOf(base.deg + 90);
  const dx = p.x - base.o.x;
  const dy = p.y - base.o.y;
  return { s: dx * u.x + dy * u.y, h: dx * n.x + dy * n.y };
}

/**
 * The point `s` along the base line and `h` across it.
 * @param {Base} base @param {number} s @param {number} [h]
 * @returns {Pt}
 */
export function pointAt(base, s, h = 0) {
  const u = dirOf(base.deg);
  const n = dirOf(base.deg + 90);
  return { x: base.o.x + s * u.x + h * n.x, y: base.o.y + s * u.y + h * n.y };
}

/**
 * A slide position moved to the nearest step and kept within `min`..`max`.
 * @param {number} s @param {number} step @param {number} min @param {number} max
 */
export function snapSlide(s, step, min, max) {
  return Math.min(max, Math.max(min, Math.round(s / step) * step));
}

/**
 * The set square at slide position `s`: its right-angle corner on the base
 * line, one leg along the base and the other leg across it, on the side
 * `side` (1 left of the base direction, −1 right).
 * @param {Base} base @param {number} s @param {1 | -1} side
 * @param {number} [along] length of the leg on the base
 * @param {number} [across] length of the leg across the base
 */
export function setSquare(base, s, side, along = 80, across = 150) {
  const corner = pointAt(base, s);
  return {
    corner,
    foot: pointAt(base, s + along),
    tip: pointAt(base, s, side * across),
    /** Direction of the leg across the base, the line it draws. */
    legDeg: norm(base.deg + side * 90),
  };
}

/**
 * Which way the set square still has to slide so its leg across the base
 * passes through the point at slide position `target`, named by the base's
 * two end points: "về phía B". Empty once it is there.
 * @param {number} s @param {number} target @param {readonly [string, string]} names
 */
export function slideWay(s, target, names) {
  if (s === target) return '';
  return `về phía ${s < target ? names[1] : names[0]}`;
}

/**
 * A point moved to the nearest grid point at least one step inside the
 * board.
 * @param {Pt} p @param {number} grid @param {number} w @param {number} h
 * @returns {Pt}
 */
export function snapToGrid(p, grid, w, h) {
  /** @param {number} v @param {number} max */
  const snap = (v, max) => Math.min(max - grid, Math.max(grid, Math.round(v / grid) * grid));
  return { x: snap(p.x, w), y: snap(p.y, h) };
}
