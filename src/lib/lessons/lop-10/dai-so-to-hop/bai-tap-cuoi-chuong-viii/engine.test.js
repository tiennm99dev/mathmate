import { describe, expect, it } from 'vitest';
import { PROBLEMS, judge, listText } from './engine.js';

describe('counting problems checked by listing', () => {
  it('list exactly as many distinct ways as the formula gives', () => {
    const bad = [];
    for (const p of PROBLEMS) {
      const list = p.list();
      if (list.length !== p.answer || new Set(list).size !== list.length)
        bad.push([p.id, list.length]);
    }
    expect(bad).toEqual([]);
  });

  it('lists ways that meet the conditions', () => {
    const even = PROBLEMS.find((p) => p.id === 'so-chan');
    expect(even?.list().every((s) => s[0] !== '0' && Number(s) % 2 === 0)).toBe(true);
    const coins = PROBLEMS.find((p) => p.id === 'dong-xu');
    expect(coins?.list()).toContain('NSNS');
  });

  it('judges a typed answer', () => {
    const p = PROBLEMS[0];
    expect(judge(p, 24).tone).toBe('ok');
    expect(judge(p, 64).tone).toBe('warn');
    expect(judge(p, null).text).toContain('số tự nhiên');
    expect(listText(p)).toContain('Liệt kê được 24 cách');
  });
});
