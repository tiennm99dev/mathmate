import { describe, it, expect } from 'vitest';
import { HEIGHTS, SAMPLES, SCORES } from '../_shared/datasets.js';
import { checkTyped, compare } from './engine.js';

describe('grouped against raw measures', () => {
  it('compares the heights grouped by 5 cm', () => {
    const { groups, rows } = compare(HEIGHTS, 5);
    expect(groups.map((g) => g.count)).toEqual([1, 4, 9, 12, 8, 6]);
    expect(groups.at(-1)).toMatchObject({ lo: 175, hi: 180, closed: true });
    const [m, me, mo] = rows;
    expect(m.grouped[0]).toBe(167.5);
    expect(m.exact[0]).toBeCloseTo(166.9, 9);
    expect(me.grouped).toEqual([167.5]);
    expect(me.exact).toEqual([167]);
    expect(mo.grouped[0]).toBeCloseTo(165 + (3 / 7) * 5, 9);
    expect(mo.exact).toEqual([168]);
  });

  it('keeps the estimates near the raw values for every width', () => {
    const far = [];
    for (const s of SAMPLES) {
      for (const w of s.widths) {
        for (const row of compare(s, w).rows) {
          if (row.id === 'mode' || row.grouped.length === 0) continue;
          if (Math.abs(row.grouped[0] - row.exact[0]) > w) far.push([s.id, w, row.id]);
        }
      }
    }
    expect(far).toEqual([]);
  });

  it('works the scores grouped by 1 point', () => {
    const { groups, rows } = compare(SCORES, 1);
    expect(groups.map((g) => g.count)).toEqual([1, 2, 4, 7, 10, 10, 6]);
    expect(rows[0].grouped[0]).toBe(7.425);
    expect(rows[0].exact[0]).toBeCloseTo(7.175, 9);
    expect(rows[1].grouped).toEqual([7.6]);
    // Two neighbouring modal groups give the same estimate once.
    expect(rows[2].grouped).toEqual([8]);
    expect(rows[2].exact).toEqual([8]);
  });

  it('checks typed answers to hundredths', () => {
    expect(checkTyped('', [1])).toBe('empty');
    expect(checkTyped('abc', [1])).toBe('invalid');
    expect(checkTyped('166,67', [166 + 2 / 3])).toBe('ok');
    expect(checkTyped('166.7', [166 + 2 / 3])).toBe('wrong');
    expect(checkTyped('7,5', [3, 7.5])).toBe('ok');
  });
});
