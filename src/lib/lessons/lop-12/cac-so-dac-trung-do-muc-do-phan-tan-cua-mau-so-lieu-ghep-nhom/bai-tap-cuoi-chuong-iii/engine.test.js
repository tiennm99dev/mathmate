import { describe, it, expect } from 'vitest';
import { HEIGHTS, SAMPLES, SPRINT } from '../_shared/datasets.js';
import { checkTyped, compare } from './engine.js';

describe('grouped against raw measures of spread', () => {
  it('groups every sample with data in the first and last group', () => {
    const empty = [];
    for (const s of SAMPLES) {
      for (const w of s.widths) {
        const { groups } = compare(s, w);
        if (groups[0].count === 0 || groups.at(-1)?.count === 0) empty.push(`${s.id} ${w}`);
        if (groups.reduce((t, g) => t + g.count, 0) !== s.values.length) empty.push(s.id);
      }
    }
    expect(empty).toEqual([]);
  });

  it('compares the heights grouped by 5 cm', () => {
    const { groups, rows } = compare(HEIGHTS, 5);
    expect(groups.map((g) => g.count)).toEqual([1, 2, 6, 11, 9, 6, 3, 2]);
    expect(rows[0]).toMatchObject({ grouped: 40, exact: 35 });
    expect(rows[1].exact).toBe(10);
    expect(rows[1].grouped).toBeCloseTo(10.38, 2);
    expect(rows[2].grouped).toBeCloseTo(7.88, 2);
  });

  it('never gives a grouped range below the raw one', () => {
    const below = [];
    for (const s of [HEIGHTS, SPRINT]) {
      for (const w of s.widths) {
        const r = compare(s, w).rows[0];
        if (r.grouped < r.exact) below.push(`${s.id} ${w}`);
      }
    }
    expect(below).toEqual([]);
  });

  it('checks typed answers within a hundredth', () => {
    expect(checkTyped('', 1)).toBe('empty');
    expect(checkTyped('abc', 1)).toBe('invalid');
    expect(checkTyped('10,38', 10.379)).toBe('ok');
    expect(checkTyped('10,37', 10.379)).toBe('ok');
    expect(checkTyped('10,4', 10.379)).toBe('wrong');
  });
});
