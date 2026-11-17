/**
 * The open box folded from a square sheet of side a: cut a square of side x
 * from each corner and fold up the sides. The box has a square base of side
 * a − 2x and height x, so V(x) = x(a − 2x)² for 0 < x < a/2, with
 * V′(x) = (a − 2x)(a − 6x). V grows while x < a/6 and shrinks after, so the
 * largest volume is V(a/6) = 2a³/27.
 */

/** The sheet sizes (cm) to choose from. */
export const SHEETS = [12, 18, 24, 30];

/**
 * @param {number} a side of the sheet
 * @param {number} x side of the cut squares
 */
export const volume = (a, x) => x * (a - 2 * x) ** 2;

/**
 * V′(x).
 * @param {number} a @param {number} x
 */
export const slope = (a, x) => (a - 2 * x) * (a - 6 * x);

/**
 * The best cut and the largest volume.
 * @param {number} a
 */
export const best = (a) => ({ x: a / 6, v: (2 * a ** 3) / 27 });

/**
 * The corners of an open box drawn in oblique projection, base side `s`,
 * height `h`, front-bottom-left corner at `origin`; the depth goes up and to
 * the right at half scale.
 * @param {number} s @param {number} h
 * @param {{ x: number, y: number }} origin
 */
export function boxFaces(s, h, origin) {
  const d = { x: 0.45 * s, y: -0.3 * s };
  /** @param {number} dx @param {number} dy */
  const p = (dx, dy) => ({ x: origin.x + dx, y: origin.y + dy });
  const f0 = p(0, 0);
  const f1 = p(s, 0);
  const b0 = p(d.x, d.y);
  const b1 = p(s + d.x, d.y);
  /** @param {{ x: number, y: number }} q */
  const up = (q) => ({ x: q.x, y: q.y - h });
  return {
    bottom: [f0, f1, b1, b0],
    back: [b0, b1, up(b1), up(b0)],
    left: [f0, b0, up(b0), up(f0)],
    right: [f1, b1, up(b1), up(f1)],
    front: [f0, f1, up(f1), up(f0)],
  };
}
