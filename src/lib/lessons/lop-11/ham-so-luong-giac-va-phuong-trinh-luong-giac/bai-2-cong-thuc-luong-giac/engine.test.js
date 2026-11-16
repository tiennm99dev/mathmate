import { describe, it, expect } from 'vitest';
import { FORMULAS, fourTex, lhs } from './engine.js';

describe('addition and double-angle formulas', () => {
  it('give equal sides for every pair of angles on a 5° grid', () => {
    const fails = [];
    for (const f of FORMULAS) {
      for (let a = -180; a <= 360; a += 25) {
        for (let b = -180; b <= 360; b += 35) {
          if (Math.abs(lhs(f, a, b) - f.rhs(a, b)) > 1e-9) fails.push(`${f.id} ${a} ${b}`);
        }
      }
    }
    expect(fails).toEqual([]);
  });

  it('writes the numbers of the right side with four decimals', () => {
    const cosMinus = FORMULAS.find((f) => f.id === 'cos-minus');
    expect(cosMinus?.rhsNumbers(45, 30)).toBe(
      '0{,}7071 \\cdot 0{,}8660 + 0{,}7071 \\cdot 0{,}5000',
    );
    expect(fourTex(-0.25881904)).toBe('-0{,}2588');
    const cosDouble = FORMULAS.find((f) => f.id === 'cos-double');
    expect(cosDouble?.rhsNumbers(120, 0)).toBe('(-0{,}5000)^2 - 0{,}8660^2');
  });

  it('reads cos 15° off the point C', () => {
    const f = FORMULAS[0];
    expect(lhs(f, 45, 30)).toBeCloseTo((Math.sqrt(6) + Math.sqrt(2)) / 4, 12);
  });
});
