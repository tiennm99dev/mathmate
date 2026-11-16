import { describe, it, expect } from 'vitest';
import {
  arithmeticSum,
  arithmeticTerm,
  generalTerms,
  geometricSum,
  geometricTerm,
  rationalOf,
  recursiveTerms,
  eqTex,
  termTex,
  termText,
  trend,
} from './sequence.js';

describe('sequence terms', () => {
  it('lists general and recursive terms', () => {
    expect(generalTerms((n) => 2 * n - 1, 5)).toEqual([1, 3, 5, 7, 9]);
    expect(generalTerms((n) => 1 / (n - 2), 3)).toEqual([-1, null, 1]);
    expect(recursiveTerms(1, (u) => 2 * u + 1, 5)).toEqual([1, 3, 7, 15, 31]);
    expect(recursiveTerms(1, (u) => 1 / (u - 1), 3)).toEqual([1, null, null]);
  });

  it('tells what the listed terms do', () => {
    expect(trend([1, 2, 3])).toBe('increasing');
    expect(trend([3, 2, 1])).toBe('decreasing');
    expect(trend([2, 2, 2])).toBe('constant');
    expect(trend([-1, 1, -1])).toBe('mixed');
    expect(trend([1, 1, 2])).toBe('mixed');
    expect(trend([1, null, 2])).toBe('undefined');
  });

  it('matches the closed forms with term-by-term sums', () => {
    const fails = [];
    for (let u1 = -5; u1 <= 5; u1++) {
      for (const d of [-3, -1, 0, 2, 0.5]) {
        let u = u1;
        let s = 0;
        for (let n = 1; n <= 12; n++) {
          s += u;
          if (arithmeticTerm(u1, d, n) !== u || arithmeticSum(u1, d, n) !== s)
            fails.push(`a ${u1} ${d} ${n}`);
          u += d;
        }
      }
      for (const q of [-2, -0.5, 0.5, 1, 2, 3]) {
        let u = u1;
        let s = 0;
        for (let n = 1; n <= 12; n++) {
          s += u;
          if (geometricTerm(u1, q, n) !== u || Math.abs(geometricSum(u1, q, n) - s) > 1e-9)
            fails.push(`g ${u1} ${q} ${n}`);
          u *= q;
        }
      }
    }
    expect(fails).toEqual([]);
  });

  it('writes terms as integers, fractions or rounded decimals', () => {
    expect(rationalOf(2 / 3)).toEqual([2, 3]);
    expect(rationalOf(Math.SQRT2)).toBeNull();
    expect(termTex(5)).toBe('5');
    expect(termTex(-2 / 3)).toBe('-\\dfrac{2}{3}');
    expect(termTex(2048000)).toBe('2\\,048\\,000');
    expect(termTex(3 / 1024)).toBe('\\dfrac{3}{1024}');
    expect(termTex(Math.SQRT2)).toBe('\\approx 1{,}414');
    expect(eqTex(-2 / 3)).toBe('= -\\dfrac{2}{3}');
    expect(eqTex(Math.SQRT2)).toBe('\\approx 1{,}414');
    expect(termTex(null)).toBe('\\text{không xác định}');
    expect(termText(-0.75)).toBe('−3/4');
    expect(termText(Math.SQRT2)).toBe('≈ 1,414');
  });
});
