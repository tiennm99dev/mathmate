import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { CHANNELS, paths, summary } from './engine.js';

describe('savings planner', () => {
  it('keeps the bad-years path under the expected one', () => {
    const { expected, low } = paths({
      start: 20,
      monthly: 2,
      years: 10,
      goal: 400,
      channel: 'co-phieu',
    });
    expect(low[10].value).toBeLessThan(expected[10].value);
    expect(expected[10].paid).toBe(260);
  });

  it('reports when the goal is reached or missed', () => {
    expect(
      summary({ start: 20, monthly: 2, years: 10, goal: 3000, channel: 'tiet-kiem' }).tone,
    ).toBe('warn');
    expect(
      summary({ start: 20, monthly: 2, years: 10, goal: 100, channel: 'tiet-kiem' }).text,
    ).toContain('Đạt mục tiêu');
    expect(
      summary({ start: 300, monthly: 0, years: 5, goal: 100, channel: 'tiet-kiem' }).text,
    ).toContain('đã đủ');
  });

  it('writes valid TeX for every channel', () => {
    const texts = [];
    for (const c of CHANNELS) {
      for (const goal of [100, 400, 3000]) {
        const s = summary({ start: 15, monthly: 1.5, years: 12, goal, channel: c.id });
        texts.push(s.formula, s.paid, s.text);
      }
    }
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
