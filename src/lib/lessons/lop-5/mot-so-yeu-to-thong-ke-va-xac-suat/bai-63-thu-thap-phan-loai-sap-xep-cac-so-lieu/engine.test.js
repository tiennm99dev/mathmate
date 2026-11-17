import { describe, expect, it } from 'vitest';
import {
  DATASETS,
  doneMessage,
  groupCounts,
  groupOf,
  nextToPlace,
  orderOf,
  placeMessage,
} from './engine.js';

const all = (/** @type {import('./engine.js').Dataset} */ ds) => ds.values.map((_, i) => i);

describe('the data sequences', () => {
  it('puts every value in exactly one group', () => {
    const bad = [];
    for (const ds of DATASETS) {
      for (const v of ds.values) {
        const hits = ds.groups.filter((g) => g.holds(v)).length;
        if (hits !== 1) bad.push([ds.id, v, hits]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives the book counts of each table', () => {
    const counts = Object.fromEntries(DATASETS.map((ds) => [ds.id, groupCounts(ds, all(ds))]));
    expect(counts['hai-long']).toEqual([5, 7, 5, 0, 0]);
    expect(counts['nhay-xa']).toEqual([3, 3, 4]);
    expect(counts['ban-chan']).toEqual([2, 3, 2, 1]);
  });

  it('names the largest group when done', () => {
    expect(doneMessage(DATASETS[0])).toContain('4 điểm có nhiều nhất: 7 bạn');
    expect(doneMessage(DATASETS[1])).toContain('Từ 2,8 m trở lên có nhiều nhất: 4 học viên');
  });
});

describe('sorting and placing', () => {
  it('sorts both ways and keeps equal values in recorded order', () => {
    const ds = DATASETS[1];
    const up = orderOf(ds.values, 'tang').map((i) => ds.values[i]);
    expect(up).toEqual([2.05, 2.2, 2.3, 2.45, 2.5, 2.75, 2.8, 3, 3, 3.05]);
    const down = orderOf(ds.values, 'giam');
    expect(down.map((i) => ds.values[i])).toEqual([...up].reverse());
    expect(down.slice(1, 3)).toEqual([1, 8]);
    expect(orderOf(ds.values, 'ghi')).toEqual(all(ds));
  });

  it('walks the shown order and checks each group', () => {
    const ds = DATASETS[1];
    const shown = orderOf(ds.values, 'tang');
    expect(nextToPlace(shown, [])).toBe(6);
    expect(nextToPlace(shown, [6, 7])).toBe(3);
    expect(nextToPlace(shown, all(ds))).toBeNull();
    expect(groupOf(ds, 2.4)).toBe(1);
    expect(placeMessage(ds, 2.45, 1).ok).toBe(true);
    const miss = placeMessage(ds, 2.45, 0);
    expect(miss.ok).toBe(false);
    expect(miss.text).toContain('nhỏ hơn 2,4 m');
  });
});
