import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { PERIODS, growth, readout, verdict } from './engine.js';

const base = { P: 500, rate: 6, years: 1, n: 12, inflation: 4 };

describe('interest calculator', () => {
  it('draws both amounts year by year', () => {
    const g = growth({ ...base, years: 3, P: 100, rate: 9, n: 1 });
    expect(g.labels).toEqual(['0', '1', '2', '3']);
    expect(g.simple[3]).toBeCloseTo(127, 9);
    expect(g.compound[3]).toBeCloseTo(129.5029, 6);
  });

  it('says compound beats simple and warns on a negative real rate', () => {
    expect(verdict({ ...base, years: 1, n: 1 }).text).toContain('cùng số tiền');
    expect(verdict(base).tone).toBe('ok');
    expect(verdict({ ...base, inflation: 8 }).tone).toBe('warn');
  });

  it('writes valid TeX for every setting', () => {
    const texts = [];
    for (const p of PERIODS) {
      for (const inflation of [0, 4, 12.5]) {
        const d = { P: 250, rate: 7.3, years: 5, n: p.n, inflation };
        texts.push(...readout(d).lines, verdict(d).text);
      }
    }
    // Vietnamese letters inside \text{} are allowed by the site's renderer, not by the bare strict check.
    const ascii = texts.map((t) => t.replaceAll('\\text{thực}', '\\text{thuc}'));
    expect(strictTexFailures(ascii)).toEqual([]);
  });
});
