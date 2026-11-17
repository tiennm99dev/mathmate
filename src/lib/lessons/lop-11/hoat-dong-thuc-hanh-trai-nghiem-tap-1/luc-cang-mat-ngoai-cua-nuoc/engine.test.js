import { describe, expect, it } from 'vitest';
import { mean, median, quartiles } from '#lib/stats-engine/index.js';
import {
  CLASS_SAMPLE,
  capacity,
  cumulative,
  defaultStart,
  groupCounts,
  groupedMean,
  groupedModes,
  groupedQuartile,
  meanTex,
  modeTex,
  parseCounts,
  quartileTex,
  trialRandom,
} from './engine.js';

describe('the class sample', () => {
  const groups = groupCounts(CLASS_SAMPLE, 25, 5);

  it('groups into the table of the worked example', () => {
    expect(CLASS_SAMPLE).toHaveLength(40);
    expect(groups.map((g) => g.count)).toEqual([3, 9, 15, 10, 3]);
    expect(cumulative(groups)).toEqual([3, 12, 27, 37, 40]);
  });

  it('gives the estimates worked out in the lesson', () => {
    expect(groupedMean(groups)).toBeCloseTo(37.625, 9);
    expect(groupedQuartile(groups, 2).value).toBeCloseTo(37.6667, 4);
    expect(groupedQuartile(groups, 1).value).toBeCloseTo(33.8889, 4);
    expect(groupedQuartile(groups, 3).value).toBe(41.5);
    expect(groupedModes(groups).map((m) => m.value)).toEqual([37.727272727]);
  });

  it('stays close to the values of the raw data', () => {
    expect(mean(CLASS_SAMPLE)).toBeCloseTo(37.35, 9);
    expect(median(CLASS_SAMPLE)).toBe(37.5);
    expect(quartiles(CLASS_SAMPLE)).toEqual([34, 37.5, 41]);
  });

  it('writes the formulas with the numbers put in', () => {
    expect(quartileTex(groupedQuartile(groups, 3), 3)).toBe(
      'Q_3 = 40 + \\dfrac{30 - 27}{10} \\cdot 5 = 41{,}5',
    );
    expect(modeTex(groupedModes(groups)[0])).toContain('\\approx 37{,}73');
    expect(meanTex(groups)).toContain('3 \\cdot 27{,}5');
  });
});

describe('the soapy-water exercise table', () => {
  const groups = [
    { lo: 14, hi: 17, count: 4 },
    { lo: 17, hi: 20, count: 9 },
    { lo: 20, hi: 23, count: 11 },
    { lo: 23, hi: 26, count: 6 },
  ];

  it('matches the stored answers', () => {
    expect(groupedMean(groups)).toBeCloseTo(20.4, 9);
    expect(groupedQuartile(groups, 2).value).toBeCloseTo(20.5455, 4);
    expect(groupedQuartile(groups, 1).value).toBeCloseTo(18.1667, 4);
    expect(groupedQuartile(groups, 3).value).toBeCloseTo(22.5909, 4);
    expect(groupedModes(groups)[0].value).toBeCloseTo(20.8571, 4);
  });
});

describe('grouping and reading', () => {
  it('reads whole numbers and reports the rest', () => {
    expect(parseCounts('35, 36;40\n 41  x 3,5')).toEqual({
      values: [35, 36, 40, 41, 3, 5],
      bad: ['x'],
    });
    expect(parseCounts('35 3.5 -2')).toEqual({ values: [35], bad: ['3.5', '-2'] });
  });

  it('puts a value on a group end into the group that starts there', () => {
    const groups = groupCounts([20, 25, 29, 30], 20, 5);
    expect(groups.map((g) => [g.lo, g.hi, g.count])).toEqual([
      [20, 25, 1],
      [25, 30, 2],
      [30, 35, 1],
    ]);
    expect(() => groupCounts([19], 20, 5)).toThrow();
    expect(defaultStart(27, 5)).toBe(25);
  });

  it('draws trial counts inside the range of each liquid', () => {
    const out = [];
    for (let t = 0; t < 200; t++) {
      const clean = capacity('nuoc', trialRandom('nuoc', t));
      const soap = capacity('xa-phong', trialRandom('xa-phong', t));
      if (clean < 28 || clean > 46 || soap < 14 || soap > 26) out.push([t, clean, soap]);
    }
    expect(out).toEqual([]);
  });

  it('finds every modal group and leaves a flat one without a value', () => {
    const modes = groupedModes([
      { lo: 0, hi: 2, count: 4 },
      { lo: 2, hi: 4, count: 4 },
    ]);
    expect(modes.map((m) => m.value)).toEqual([2, 2]);
    const flat = groupedModes([
      { lo: 0, hi: 2, count: 3 },
      { lo: 2, hi: 4, count: 3 },
      { lo: 4, hi: 6, count: 3 },
    ]);
    expect(flat[1].value).toBeNull();
  });
});
