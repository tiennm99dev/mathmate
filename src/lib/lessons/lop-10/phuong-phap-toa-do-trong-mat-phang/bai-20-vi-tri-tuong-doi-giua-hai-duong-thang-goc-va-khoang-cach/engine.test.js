import { describe, expect, it } from 'vitest';
import { anglePath, angleTex, distanceTex, relationText } from './engine.js';

describe('two lines', () => {
  it('says how they lie, with the common point as exact fractions', () => {
    expect(relationText({ a: 1, b: -1, c: 0 }, { a: 1, b: 1, c: -1 })).toContain(
      'I\\left(\\frac{1}{2};\\ \\frac{1}{2}\\right)',
    );
    expect(relationText({ a: 1, b: -1, c: 0 }, { a: 1, b: 1, c: -1 })).toContain('\\perp');
    expect(relationText({ a: 1, b: 2, c: 0 }, { a: 1, b: 2, c: 3 })).toContain('\\parallel');
    expect(relationText({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toContain('trùng nhau');
  });

  it('works out the angle from the normal vectors', () => {
    // n1 = (1; 0), n2 = (1; -1): cos = 1 / √2, 45°.
    const t = angleTex({ a: 1, b: 0, c: 0 }, { a: 1, b: -1, c: 0 });
    expect(t.deg).toBeCloseTo(45, 9);
    expect(t.value).toBe('\\cos\\varphi = \\dfrac{1}{1 \\cdot \\sqrt{2}} \\approx 0{,}71');
    expect(t.angle).toBe('\\varphi = 45^\\circ');
  });

  it('draws the angle mark only for crossing lines', () => {
    const px = (/** @type {{ x: number, y: number }} */ p) => ({ x: p.x * 10, y: -p.y * 10 });
    expect(anglePath({ a: 1, b: 0, c: 0 }, { a: 1, b: 0, c: -2 }, px, 1)).toBeNull();
    expect(anglePath({ a: 0, b: 1, c: 0 }, { a: 1, b: -1, c: 0 }, px, 1)).toMatch(
      /^M 0 0 L -10 0 A /,
    );
  });
});

describe('distance from a point to a line', () => {
  it('substitutes the point and simplifies the root', () => {
    // M(1; 2), 3x + 4y - 1 = 0: |3 + 8 - 1| / 5 = 2.
    expect(distanceTex({ x: 1, y: 2 }, { a: 3, b: 4, c: -1 })).toBe(
      'd(M, \\Delta) = \\dfrac{|3 \\cdot 1 + 4 \\cdot 2 + (-1)|}{\\sqrt{3^2 + 4^2}} = 2',
    );
    expect(distanceTex({ x: 0, y: 0 }, { a: 1, b: 1, c: -2 })).toContain(
      '= \\dfrac{2}{\\sqrt{2}} \\approx 1{,}41',
    );
  });
});
