import { describe, expect, it } from 'vitest';
import {
  arrangeCount,
  arrangements,
  chooseCount,
  combinationTex,
  combinations,
  expandCoefficients,
  factorial,
  fallingTex,
  pascalRow,
  polyTex,
  symbolicTex,
} from './counting.js';

describe('counting numbers', () => {
  it('computes n!, A and C as the book does', () => {
    expect([0, 1, 3, 5, 6].map(factorial)).toEqual([1, 1, 6, 120, 720]);
    expect(arrangeCount(5, 3)).toBe(60);
    expect(arrangeCount(4, 4)).toBe(24);
    expect(chooseCount(5, 2)).toBe(10);
    expect(chooseCount(7, 3)).toBe(35);
    expect(chooseCount(6, 0)).toBe(1);
    expect(chooseCount(3, 4)).toBe(0);
  });

  it('lists exactly as many picks as it counts', () => {
    const items = ['A', 'B', 'C', 'D', 'E'];
    const bad = [];
    for (let k = 0; k <= 5; k++) {
      const ordered = arrangements(items, k);
      const groups = combinations(items, k);
      if (ordered.length !== arrangeCount(5, k)) bad.push(['A', k]);
      if (groups.length !== chooseCount(5, k)) bad.push(['C', k]);
      if (new Set(ordered.map((o) => o.join())).size !== ordered.length) bad.push(['dupA', k]);
    }
    expect(bad).toEqual([]);
    expect(combinations(['A', 'B', 'C'], 2)).toEqual([
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'C'],
    ]);
  });

  it('builds the rows of Pascal triangle', () => {
    expect(pascalRow(4)).toEqual([1, 4, 6, 4, 1]);
    expect(pascalRow(5)).toEqual([1, 5, 10, 10, 5, 1]);
    expect(fallingTex(5, 3)).toBe('5 \\cdot 4 \\cdot 3');
  });
});

describe('binomial expansion', () => {
  it('writes (a + b)^4 and (a + b)^5', () => {
    expect(symbolicTex(4)).toBe('a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4');
    expect(symbolicTex(5)).toBe('a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5');
    expect(symbolicTex(0)).toBe('1');
    expect(combinationTex(2)).toBe('C_{2}^{0}a^2 + C_{2}^{1}ab + C_{2}^{2}b^2');
  });

  it('expands (px + q)^n with signs', () => {
    expect(polyTex(expandCoefficients(4, 1, -2))).toBe('x^4 - 8x^3 + 24x^2 - 32x + 16');
    expect(polyTex(expandCoefficients(5, 2, 1))).toBe('32x^5 + 80x^4 + 80x^3 + 40x^2 + 10x + 1');
    expect(polyTex([0, -1, 0])).toBe('-x');
    expect(polyTex([0, 0])).toBe('0');
  });
});
