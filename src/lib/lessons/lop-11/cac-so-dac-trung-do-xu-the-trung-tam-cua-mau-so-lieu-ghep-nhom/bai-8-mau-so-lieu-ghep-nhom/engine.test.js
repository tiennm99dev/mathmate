import { describe, it, expect } from 'vitest';
import { groupValues } from '../_shared/grouped.js';
import { HEIGHTS, SCORES } from '../_shared/datasets.js';
import { dotStack, groupingAdvice, valuesIn } from './engine.js';

describe('grouping by hand', () => {
  it('lists the values of a group, the last one closed', () => {
    const g = groupValues(SCORES.values, 3, 2);
    expect(g.at(-1)).toMatchObject({ lo: 9, hi: 11 });
    const h = groupValues(SCORES.values, 2, 2);
    expect(h.at(-1)).toMatchObject({ lo: 8, hi: 10, closed: true });
    expect(valuesIn(SCORES.values, h[h.length - 1])).toHaveLength(16);
    const bad = h.filter((x) => valuesIn(SCORES.values, x).length !== x.count);
    expect(bad).toEqual([]);
  });

  it('agrees with the counts for every width', () => {
    const bad = [];
    for (const w of HEIGHTS.widths) {
      for (const x of groupValues(HEIGHTS.values, 150, w)) {
        if (valuesIn(HEIGHTS.values, x).length !== x.count) bad.push([w, x.lo]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stacks equal values', () => {
    expect(dotStack([3, 1, 3, 3]).map((d) => d.level)).toEqual([0, 0, 1, 2]);
  });

  it('judges the number of groups', () => {
    expect(groupingAdvice(3).tone).toBe('warn');
    expect(groupingAdvice(6).tone).toBe('ok');
    expect(groupingAdvice(16).tone).toBe('warn');
  });
});
