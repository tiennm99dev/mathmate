import { describe, it, expect } from 'vitest';
import {
  BOYS_SAMPLE,
  GIRLS_SAMPLE,
  compareText,
  groupSamples,
  groupText,
  measures,
  parseSpans,
  valueText,
} from './engine.js';

const boys = parseSpans(BOYS_SAMPLE).values;
const girls = parseSpans(GIRLS_SAMPLE).values;
const [gb, gg] = groupSamples([boys, girls], 1);

describe('reading the measured hand spans', () => {
  it('reads commas, points and separators and flags the rest', () => {
    expect(parseSpans('18,5 19.2;20\n 21,0')).toEqual({ values: [18.5, 19.2, 20, 21], bad: [] });
    expect(parseSpans('18,5 abc 185 9').bad).toEqual(['abc', '185', '9']);
    expect(boys).toHaveLength(25);
    expect(girls).toHaveLength(20);
  });
});

describe('grouping both samples the same way', () => {
  it('builds the groups [16; 17) to [23; 24)', () => {
    expect(gb.map(groupText)).toEqual([
      '[16; 17)',
      '[17; 18)',
      '[18; 19)',
      '[19; 20)',
      '[20; 21)',
      '[21; 22)',
      '[22; 23)',
      '[23; 24)',
    ]);
    expect(gb.map((g) => g.count)).toEqual([0, 0, 1, 6, 8, 7, 2, 1]);
    expect(gg.map((g) => g.count)).toEqual([3, 2, 8, 4, 2, 1, 0, 0]);
  });

  it('puts a value on a group end into the group it starts', () => {
    const [g] = groupSamples([[18, 19, 19.5]], 0.5);
    expect(g.map((x) => [x.lo, x.count])).toEqual([
      [18, 1],
      [18.5, 0],
      [19, 1],
      [19.5, 1],
    ]);
  });
});

describe('measures of the sample class', () => {
  it('boys', () => {
    const m = measures(gb);
    expect(m).not.toBeNull();
    if (!m) return;
    expect([m.n, m.mean, m.range, m.variance, m.q1]).toEqual([25, 20.74, 6, 1.3024, 19.875]);
    expect(m.q3).toBeCloseTo(21.535714, 5);
    expect(m.std).toBeCloseTo(1.14123, 4);
    expect(valueText(m.iqr)).toBe('≈ 1,66');
  });

  it('girls', () => {
    const m = measures(gg);
    if (!m) throw new Error('empty');
    expect([m.n, m.mean, m.range, m.variance, m.q1, m.q3, m.iqr]).toEqual([
      20, 18.65, 6, 1.7275, 18, 19.5, 1.5,
    ]);
    expect(valueText(m.std)).toBe('≈ 1,31');
  });

  it('compares the spread by the standard deviation and notes the quartiles', () => {
    const b = measures(gb);
    const g = measures(gg);
    if (!b || !g) throw new Error('empty');
    const t = compareText(b, g);
    expect(t).toContain('nam dài hơn 2,09 cm');
    expect(t).toContain('nhóm nữ phân tán hơn');
    expect(t).toContain('Khoảng tứ phân vị lại lớn hơn ở nhóm nam');
    expect(measures([])).toBeNull();
  });
});
