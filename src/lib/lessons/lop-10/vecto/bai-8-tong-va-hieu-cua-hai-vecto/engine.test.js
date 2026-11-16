import { describe, expect, it } from 'vitest';
import { figure, fits, fourth } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('sum and difference board', () => {
  it('draws the three-point rule with the sum from A to C', () => {
    const f = figure('ba-diem', [p(1, 1), p(4, 5), p(7, 1)]);
    const sum = f.vectors.find((v) => v.name === 'AC');
    expect(sum?.from).toEqual(p(1, 1));
    expect(sum?.to).toEqual(p(7, 1));
    expect(f.tex).toContain('|\\overrightarrow{AC}| = 6');
    expect(f.note).toContain('nhỏ hơn');
    expect(figure('ba-diem', [p(1, 1), p(4, 5), p(1, 1)]).note).toContain('\\vec 0');
    expect(figure('ba-diem', [p(1, 1), p(3, 1), p(6, 1)]).note).toContain('đúng bằng');
  });

  it('completes the parallelogram and its diagonal', () => {
    expect(fourth(p(1, 1), p(6, 2), p(3, 5))).toEqual(p(8, 6));
    const f = figure('hbh', [p(1, 1), p(4, 1), p(1, 5)]);
    expect(f.tex).toContain('= 5');
    expect(f.points.map((q) => q.name)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('gives the difference from B to A and its helper a + (−b)', () => {
    const f = figure('hieu', [p(2, 1), p(7, 3), p(4, 5)]);
    const ba = f.vectors.find((v) => v.name === 'BA');
    expect(ba?.from).toEqual(p(4, 5));
    expect(ba?.to).toEqual(p(7, 3));
    // a + (−b) drawn from O ends at A − b = (5; −1).
    expect(f.vectors[3].to).toEqual(p(5, -1));
  });

  it('adds two forces in newtons', () => {
    expect(figure('luc', [p(2, 2), p(5, 2), p(2, 6)]).note).toContain('50 N');
    expect(figure('luc', [p(2, 2), p(5, 2), p(-1, 2)]).note).toContain('cân bằng');
  });

  it('refuses positions whose derived point leaves the board', () => {
    expect(fits('hbh', [p(1, 1), p(9, 1), p(1, 6)])).toBe(true);
    expect(fits('hbh', [p(1, 1), p(10, 1), p(3, 6)])).toBe(false);
    expect(fits('hieu', [p(2, 1), p(7, 3), p(4, 5)])).toBe(true);
    expect(fits('hieu', [p(2, 1), p(11, 3), p(4, 5)])).toBe(false);
    expect(fits('ba-diem', [p(0, 0), p(10, 7), p(5, 5)])).toBe(true);
  });
});
