import { describe, expect, it } from 'vitest';
import { LIMITS, countsOf, partsOf, sizeOf, splitLabel } from './engine.js';

describe('the cut rectangle', () => {
  it('counts a rectangle cut between columns both ways', () => {
    expect(countsOf({ cut: 'cols', a: 4, b: 5, c: 3 })).toEqual({
      total: 32,
      whole: '4 × (5 + 3) = 4 × 8 = 32',
      parts: '4 × 5 + 4 × 3 = 20 + 12 = 32',
      rule: '4 × (5 + 3) = 4 × 5 + 4 × 3',
    });
  });

  it('counts a rectangle cut between rows as (b + c) × a', () => {
    expect(countsOf({ cut: 'rows', a: 5, b: 3, c: 2 })).toEqual({
      total: 25,
      whole: '(3 + 2) × 5 = 5 × 5 = 25',
      parts: '3 × 5 + 2 × 5 = 15 + 10 = 25',
      rule: '(3 + 2) × 5 = 3 × 5 + 2 × 5',
    });
  });

  it('draws parts that fill the rectangle', () => {
    const bad = [];
    for (const cut of /** @type {const} */ (['cols', 'rows'])) {
      for (let a = LIMITS.a.min; a <= LIMITS.a.max; a++) {
        for (let b = LIMITS.part.min; b <= LIMITS.part.max; b++) {
          for (let c = LIMITS.part.min; c <= LIMITS.part.max; c++) {
            const split = { cut, a, b, c };
            const { rows, cols } = sizeOf(split);
            const cells = partsOf(split).reduce((sum, p) => sum + p.rows * p.cols, 0);
            if (cells !== rows * cols || cells !== countsOf(split).total) bad.push(split);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('describes the picture', () => {
    expect(splitLabel({ cut: 'rows', a: 5, b: 3, c: 2 })).toBe(
      'Hình chữ nhật 5 hàng, 5 cột, gồm 3 hàng màu hồng và 2 hàng màu xanh, mỗi hàng 5 ô.',
    );
  });
});
