import { describe, expect, it } from 'vitest';
import { STRIPS, boxPieces, cylinderPieces, foldsToCube, overlapsOf, placePieces } from './fold.js';
import { CUBE_NETS } from './cube-nets.js';

/** @param {import('./fold.js').Placed} p */
const centre = (p) => {
  const n = p.pts.length;
  const s = p.pts.reduce((a, q) => ({ x: a.x + q.x, y: a.y + q.y, z: a.z + q.z }), {
    x: 0,
    y: 0,
    z: 0,
  });
  return { x: s.x / n, y: s.y / n, z: s.z / n };
};

/** @param {{ x: number, y: number, z: number }} p */
const round = (p) => [p.x, p.y, p.z].map((v) => Math.round(v * 1000) / 1000 + 0);

describe('folding nets', () => {
  it('keeps the flat net on the table', () => {
    const placed = placePieces(boxPieces(5, 3, 4), 0);
    expect(placed.every((p) => p.pts.every((q) => Math.abs(q.z) < 1e-9))).toBe(true);
  });

  it('folds the box net into a closed box', () => {
    const [a, b, c] = [5, 3, 4];
    const centres = placePieces(boxPieces(a, b, c, true), 1).map((p) => round(centre(p)));
    const expected = [
      [a / 2, -b / 2, 0],
      [a / 2, -b / 2, c],
      [a / 2, 0, c / 2],
      [a / 2, -b, c / 2],
      [0, -b / 2, c / 2],
      [a, -b / 2, c / 2],
    ];
    const missing = expected.filter((e) => !centres.some((g) => g.every((v, i) => v === e[i])));
    expect(missing).toEqual([]);
  });

  it('moves the grid lines with their face', () => {
    const placed = placePieces(boxPieces(2, 2, 2, true), 1);
    const top = placed.find((p) => p.id === 'day-tren');
    expect(top?.lines).toHaveLength(2);
    expect(top?.lines.every(([p, q]) => Math.abs(p.z - 2) < 1e-9 && Math.abs(q.z - 2) < 1e-9)).toBe(
      true,
    );
  });

  it('rolls the cylinder net into a cylinder on its side', () => {
    const r = 2;
    const h = 5;
    const placed = placePieces(cylinderPieces(r, h), 1);
    expect(placed).toHaveLength(STRIPS + 2);
    const bottom = placed.find((p) => p.id === 'day-duoi');
    const top = placed.find((p) => p.id === 'day-tren');
    const mid = Math.PI * r;
    expect(round(centre(/** @type {*} */ (bottom)))).toEqual(round({ x: mid, y: 0, z: r }));
    expect(round(centre(/** @type {*} */ (top)))).toEqual(round({ x: mid, y: h, z: r }));
    // Every strip ends up about r from the axis.
    const far = placed
      .filter((p) => p.role === 'xung-quanh')
      .map((p) => Math.hypot(centre(p).x - mid, centre(p).z - r))
      .filter((d) => Math.abs(d - r) > 0.02 * r);
    expect(far).toEqual([]);
    // Only the outline of the rolled rectangle is drawn, not the seams between strips.
    const strip = placed.find((p) => p.id === 'dai-0');
    expect(strip?.edges).toHaveLength(3);
  });

  it('tells nets of a cube from six squares that do not fold into one', () => {
    const wrong = CUBE_NETS.filter((n) => foldsToCube(n.cells) !== n.folds).map((n) => n.id);
    expect(wrong).toEqual([]);
    expect(
      foldsToCube([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
      ]),
    ).toBe(false);
    expect(overlapsOf(CUBE_NETS.find((n) => !n.folds)?.cells ?? [])).toBeGreaterThan(0);
  });
});
