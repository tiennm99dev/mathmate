import { describe, expect, it } from 'vitest';
import { pointText } from '../_shared/half-plane.js';
import { DEFAULT_PLAN, judgePick, spanOf, verticesOf } from './engine.js';

describe('production widget', () => {
  it('finds the feasible polygon of the story', () => {
    const names = verticesOf(DEFAULT_PLAN).map((v) => `${v.name}${pointText(v.pt)}`);
    expect(names).toEqual(['O(0; 0)', 'A(4; 0)', 'B(3; 2)', 'C(0; 3)']);
    expect(spanOf(DEFAULT_PLAN)).toBe(10);
  });

  it('judges the picked vertex', () => {
    expect(judgePick(DEFAULT_PLAN, 2)).toMatchObject({
      tone: 'ok',
      best: [2],
      values: [0, 12, 17, 12],
    });
    expect(judgePick(DEFAULT_PLAN, 1).text).toBe(
      'Chưa đúng: F tại A(4; 0) bằng 12, nhưng tại B(3; 2) F bằng 17.',
    );
  });

  it('warns when the best vertex is not a whole-number point', () => {
    const plan = { ...DEFAULT_PLAN, c1: 7 };
    // 2x + y = 7 and x + 3y = 9 meet at (2,4; 2,2).
    const verdict = judgePick(
      plan,
      verticesOf(plan).findIndex((v) => v.pt.x === 2.4),
    );
    expect(verdict.text).toContain('(2,4; 2,2)');
    expect(verdict.text).toContain('không nguyên');
  });

  it('writes vertices that are not short decimals as fractions', () => {
    const plan = { ...DEFAULT_PLAN, a1: 3 };
    // 3x + y = 8 meets the x-axis at 8/3 and x + 3y = 9 at (15/8; 19/8).
    const names = verticesOf(plan).map((v) => `${v.name}${pointText(v.pt)}`);
    expect(names).toEqual(['O(0; 0)', 'A(8/3; 0)', 'B(15/8; 19/8)', 'C(0; 3)']);
    expect(judgePick(plan, 2).text).toContain('F lớn nhất bằng 121/8');
  });
});
