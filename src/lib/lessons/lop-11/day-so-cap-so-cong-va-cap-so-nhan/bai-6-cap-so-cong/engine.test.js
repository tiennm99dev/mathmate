import { describe, it, expect } from 'vitest';
import { staircase } from './engine.js';

describe('block staircase', () => {
  it('pairs every column up to u1 + un and fills twice the sum', () => {
    const fails = [];
    for (let u1 = 1; u1 <= 6; u1++) {
      for (let d = 0; d <= 3; d++) {
        for (let n = 2; n <= 9; n++) {
          const { columns, height, sum } = staircase(u1, d, n);
          const own = columns.reduce((s, c) => s + c.own, 0);
          if (columns.some((c) => c.own + c.copy !== height)) fails.push(`height ${u1} ${d} ${n}`);
          if (own !== sum || 2 * sum !== n * height) fails.push(`sum ${u1} ${d} ${n}`);
        }
      }
    }
    expect(fails).toEqual([]);
  });

  it('builds the staircase 2, 5, 8, 11', () => {
    const s = staircase(2, 3, 4);
    expect(s.columns.map((c) => c.own)).toEqual([2, 5, 8, 11]);
    expect(s.columns.map((c) => c.copy)).toEqual([11, 8, 5, 2]);
    expect(s.sum).toBe(26);
  });
});
