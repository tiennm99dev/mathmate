import { describe, it, expect } from 'vitest';
import { PROBLEMS, interceptOf, judge } from './engine.js';

/** @param {(x: number) => number} f @param {number} x */
const slope = (f, x) => (f(x + 1e-6) - f(x - 1e-6)) / 2e-6;

describe('tangent problems', () => {
  it('store the right point of contact and slope', () => {
    const bad = PROBLEMS.filter(
      (p) => Math.abs(p.f(p.x0) - p.y0) > 1e-12 || Math.abs(slope(p.f, p.x0) - p.k) > 1e-6,
    );
    expect(bad.map((p) => p.id)).toEqual([]);
  });

  it('show the point of contact inside the window', () => {
    const bad = PROBLEMS.filter(
      (p) =>
        !(p.x0 > p.view.xMin && p.x0 < p.view.xMax && p.y0 > p.view.yMin && p.y0 < p.view.yMax),
    );
    expect(bad.map((p) => p.id)).toEqual([]);
  });

  it('judge typed lines', () => {
    const [cubic, , , root] = PROBLEMS;
    expect(interceptOf(cubic)).toBe(3);
    expect(judge(cubic, -3, 3)).toBe('tangent');
    expect(judge(cubic, 2, -2)).toBe('through');
    expect(judge(cubic, -3, 0)).toBe('parallel');
    expect(judge(cubic, 1, 1)).toBe('other');
    expect(interceptOf(root)).toBe(1);
    expect(judge(root, 0.25, 1)).toBe('tangent');
  });
});
