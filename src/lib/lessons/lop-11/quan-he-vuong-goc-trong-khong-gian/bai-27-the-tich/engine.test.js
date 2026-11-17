import { describe, expect, it } from 'vitest';
import {
  BASE,
  HEIGHT,
  POURS,
  PRISM,
  PYRAMID,
  boxWater,
  cupWater,
  frustum,
  is,
  prismWater,
  surface,
  verdict,
  waterIn,
} from './engine.js';

describe('pouring a pyramid into a prism with the same base and height', () => {
  it('needs three pyramids to fill the prism', () => {
    expect(PYRAMID).toBe(144);
    expect(PRISM).toBe(432);
    expect(POURS).toBe(3);
    expect(prismWater(POURS - 1, 0).level).toBeCloseTo(HEIGHT);
    expect(prismWater(0, 0).level).toBeCloseTo(HEIGHT / 3);
  });

  it('pours out a frustum at every level', () => {
    const wrong = [];
    for (let y = 0; y <= HEIGHT; y++) {
      const out = frustum(BASE, surface(y), HEIGHT - y);
      if (Math.abs(out - (PYRAMID - waterIn(y))) > 1e-9) wrong.push(y);
    }
    expect(wrong).toEqual([]);
  });

  it('works out the book frustum', () => {
    expect(frustum(9, 36, 2)).toBeCloseTo(42);
    expect(frustum(36, 9, 4)).toBeCloseTo(84);
  });

  it('draws the water only when there is some', () => {
    expect(cupWater(0)).toEqual([]);
    expect(cupWater(6)).toHaveLength(5);
    expect(boxWater(0)).toEqual([]);
    expect(boxWater(4)).toHaveLength(5);
  });

  it('writes exact and rounded values', () => {
    expect(is(3.5)).toBe('= 3{,}5');
    expect(is(143.9166666)).toBe('\\approx 143{,}92');
  });

  it('reads the pouring', () => {
    expect(verdict(0, HEIGHT).text).toContain('= 144$');
    expect(verdict(0, 6).text).toContain("S' = 9");
    expect(verdict(0, 6).text).toContain('= 126$');
    expect(verdict(1, 0).tone).toBe('ok');
    expect(verdict(POURS - 1, 0).text).toContain('432 = 3 \\cdot 144');
  });
});
