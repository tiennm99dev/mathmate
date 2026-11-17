import { describe, expect, it } from 'vitest';
import { BOX, clampC, conicOf, nearest, relationTex } from './engine.js';

/** @param {{ x: number, y: number }} p @param {{ x: number, y: number }} q */
const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);

describe('the three conics', () => {
  it('keeps the ellipse property MF1 + MF2 = 2a at every sample', () => {
    const e = conicOf('elip', { a: 5, c: 3, p: 1 });
    expect(e.equation).toBe('\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1');
    const bad = e.samples.filter(
      (M) => Math.abs(dist(M, e.foci[0]) + dist(M, e.foci[1]) - 10) > 1e-9,
    );
    expect(bad).toEqual([]);
  });

  it('keeps the hyperbola property |MF1 − MF2| = 2a on both branches, inside the board', () => {
    const h = conicOf('hypebol', { a: 4, c: 5, p: 1 });
    expect(h.equation).toBe('\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1');
    const bad = h.samples.filter(
      (M) =>
        Math.abs(Math.abs(dist(M, h.foci[0]) - dist(M, h.foci[1])) - 8) > 1e-9 ||
        Math.abs(M.x) > BOX.xMax + 1e-9 ||
        Math.abs(M.y) > BOX.yMax + 1e-9,
    );
    expect(bad).toEqual([]);
  });

  it('keeps the parabola property MF = d(M, Δ)', () => {
    const q = conicOf('parabol', { a: 1, c: 1, p: 3 });
    expect(q.equation).toBe('y^2 = 6x');
    expect(q.facts[1]).toContain('F\\left(\\dfrac{3}{2};\\ 0\\right)');
    const bad = q.samples.filter((M) => Math.abs(dist(M, q.foci[0]) - (M.x + 1.5)) > 1e-9);
    expect(bad).toEqual([]);
  });

  it('writes the relation at a point and keeps c in range', () => {
    const e = conicOf('elip', { a: 5, c: 3, p: 1 });
    expect(relationTex('elip', e, { x: 0, y: 4 }, 5)).toBe(
      'MF_1 = 5,\\ MF_2 = 5\\quad \\Rightarrow\\ MF_1 + MF_2 = 10 = 2a',
    );
    expect(clampC('elip', 3, 5)).toBe(2);
    expect(clampC('hypebol', 3, 2)).toBe(4);
    expect(nearest(e.samples, { x: 5.2, y: 0.1 })).toBe(0);
  });
});
