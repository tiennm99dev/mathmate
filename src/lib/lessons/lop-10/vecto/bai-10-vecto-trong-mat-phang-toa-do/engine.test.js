import { describe, expect, it } from 'vitest';
import { fits, kLimit, opTex, parallelTex, pointLines, result } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('coordinate expressions', () => {
  it('works out u + v, u − v and k u', () => {
    expect(result('cong', p(3, 1), p(-1, 3), 2)).toEqual(p(2, 4));
    expect(result('tru', p(3, 1), p(-1, 3), 2)).toEqual(p(4, -2));
    expect(result('nhan', p(3, -1), p(0, 0), -2)).toEqual(p(-6, 2));
    expect(opTex('cong', p(3, 1), p(-1, 3), 2)).toBe(
      '\\vec u + \\vec v = (3 + (-1);\\ 1 + 3) = (2;\\ 4)',
    );
    expect(opTex('nhan', p(3, -1), p(0, 0), -2)).toBe(
      '-2\\vec u = (-2 \\cdot 3;\\ -2 \\cdot (-1)) = (-6;\\ 2)',
    );
  });

  it('tests parallel vectors by x y′ − x′ y', () => {
    expect(parallelTex(p(2, 3), p(4, 6))).toMatch(/= 0$/);
    expect(parallelTex(p(2, 3), p(4, 5))).toMatch(/= -2$/);
  });

  it('gives AB, its length, the midpoint and the centroid', () => {
    const r = pointLines(p(1, 2), p(4, -2), p(1, 3));
    expect(r.ab).toEqual(p(3, -4));
    expect(r.lines[1]).toMatch(/= 5$/);
    expect(r.I).toEqual(p(2.5, 0));
    expect(r.lines[2]).toContain('I(2{,}5;\\ 0)');
    expect(r.lines[3]).toContain('G\\left(2;\\ 1\\right)');
    expect(pointLines(p(0, 0), p(1, 1), p(-2, 0)).lines[3]).toContain('-\\dfrac{1}{3}');
    expect(pointLines(p(0, 0), p(1, 2), p(0, 0)).lines[1]).toContain('\\sqrt{5}');
  });
});

describe('keeping the result on the grid', () => {
  it('takes a drag only when the result stays on the board', () => {
    expect(fits('cong', p(3, 1), p(1, 3), 2)).toBe(true);
    expect(fits('cong', p(5, 1), p(2, 0), 2)).toBe(false);
    expect(fits('tru', p(5, 1), p(-2, 0), 2)).toBe(false);
    expect(fits('nhan', p(3, 1), p(0, 0), -2)).toBe(true);
    expect(fits('nhan', p(3, 1), p(0, 0), 3)).toBe(false);
  });

  it('limits k so k·u stays on the board', () => {
    expect(kLimit(p(3, 1))).toBe(2);
    expect(kLimit(p(1, 1))).toBe(3);
    expect(kLimit(p(0, 0))).toBe(3);
    expect(kLimit(p(6, 5))).toBe(1);
  });
});
