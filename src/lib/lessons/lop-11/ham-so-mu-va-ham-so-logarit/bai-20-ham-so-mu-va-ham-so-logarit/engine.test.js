import { describe, it, expect } from 'vitest';
import { A_MAX, A_MIN, A_STEP, formulas, logOf, mirror, trend } from './engine.js';

describe('exponential and logarithmic functions', () => {
  it('increase above base 1 and decrease below it', () => {
    expect(trend(2)).toBe('up');
    expect(trend(0.5)).toBe('down');
    expect(trend(0.1 * 10)).toBe('none');
    const bad = [];
    for (let a = A_MIN; a <= A_MAX + 1e-9; a += A_STEP) {
      const t = trend(a);
      if (t === 'none') continue;
      const up = a ** 1 > a ** 0 && logOf(a, 3) > logOf(a, 2);
      if ((t === 'up') !== up) bad.push(a);
    }
    expect(bad).toEqual([]);
  });

  it('swap the coordinates of mirrored points', () => {
    const bad = [];
    for (const a of [0.3, 0.5, 2, 3.5]) {
      for (const t of [-2, -0.5, 0, 1, 1.7]) {
        const { m, image } = mirror(a, t);
        if (Math.abs(logOf(a, image.x) - image.y) > 1e-9) bad.push(`${a} ${t}`);
        if (m.x !== image.y || m.y !== image.x) bad.push(`swap ${a} ${t}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('write the formulas with a decimal comma', () => {
    expect(formulas(2.5)).toEqual({ exp: 'y = (2{,}5)^x', log: 'y = \\log_{2{,}5} x' });
    expect(formulas(3).exp).toBe('y = 3^x');
    expect(logOf(2, -1)).toBeNaN();
  });
});
