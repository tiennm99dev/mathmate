import { describe, it, expect } from 'vitest';
import katex from 'katex';
import {
  cumulative,
  eqTex,
  groupTex,
  groupText,
  groupValues,
  groupedMean,
  groupedMedian,
  groupedModes,
  groupedQuartile,
  makeGroups,
  meanTex,
  midpoint,
  modeTex,
  quartileTex,
  sampleSize,
} from './grouped.js';
import { HEIGHTS, SAMPLES, SCORES } from './datasets.js';

// Self-study time (minutes) of 40 students, worked by hand in the lesson.
const STUDY = makeGroups(0, 20, [5, 9, 12, 10, 4]);
// Weight (kg) of 50 students, the lesson's exercises.
const WEIGHT = makeGroups(40, 5, [4, 10, 16, 12, 8]);

describe('grouping a raw sample', () => {
  it('counts every value once, in half-open groups', () => {
    const g = groupValues(
      [7, 9, 6, 8, 12, 11, 14, 13, 10, 15, 18, 16, 19, 17, 15, 22, 20, 23, 25, 27],
      5,
      5,
    );
    expect(g.map((x) => x.count)).toEqual([4, 5, 6, 3, 2]);
    expect(g.map((x) => [x.lo, x.hi])).toEqual([
      [5, 10],
      [10, 15],
      [15, 20],
      [20, 25],
      [25, 30],
    ]);
  });

  it('closes the last group when the largest value is a group end', () => {
    const g = groupValues(SCORES.values, 3, 1);
    expect(g).toHaveLength(7);
    expect(g[6]).toMatchObject({ lo: 9, hi: 10, closed: true });
    expect(groupTex(g[6])).toBe('[9; 10]');
    expect(groupText(g[0])).toBe('[3; 4)');
    expect(sampleSize(g)).toBe(40);
  });

  it('keeps every value for every width the widgets offer', () => {
    const bad = [];
    for (const s of SAMPLES) {
      for (const w of s.widths) {
        for (let start = s.starts.min; start <= s.starts.max; start += s.starts.step) {
          const g = groupValues(s.values, start, w);
          if (sampleSize(g) !== s.values.length) bad.push([s.id, w, start]);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('rejects a start above the smallest value', () => {
    expect(() => groupValues(HEIGHTS.values, 153, 5)).toThrow();
  });
});

describe('the grouped statistics', () => {
  it('works the study-time table', () => {
    expect(cumulative(STUDY)).toEqual([5, 14, 26, 36, 40]);
    expect(midpoint(STUDY[2])).toBe(50);
    expect(groupedMean(STUDY)).toBe(49.5);
    expect(groupedMedian(STUDY)).toMatchObject({ index: 2, before: 14, count: 12, value: 50 });
    expect(groupedQuartile(STUDY, 1).value).toBeCloseTo(20 + 100 / 9, 9);
    expect(groupedQuartile(STUDY, 3).value).toBe(68);
    expect(groupedModes(STUDY)).toEqual([
      { index: 2, count: 12, prev: 9, next: 10, lo: 40, width: 20, value: 52 },
    ]);
  });

  it('works the weight table', () => {
    expect(groupedMean(WEIGHT)).toBe(53.5);
    expect(groupedMedian(WEIGHT).value).toBe(53.4375);
    expect(groupedQuartile(WEIGHT, 1).value).toBe(49.25);
    expect(groupedQuartile(WEIGHT, 3).value).toBe(58.125);
    expect(groupedModes(WEIGHT)[0].value).toBe(53);
  });

  it('takes m_{j-1} = 0 for a first modal group', () => {
    const g = makeGroups(0, 10, [15, 10, 5]);
    expect(groupedModes(g)[0]).toMatchObject({ prev: 0, next: 10, value: 7.5 });
  });

  it('gives the boundary when n/2 ends a group', () => {
    const g = makeGroups(0, 10, [3, 2, 5]);
    expect(groupedMedian(g)).toMatchObject({ index: 1, value: 20 });
  });

  it('reports every modal group and a flat top', () => {
    expect(groupedModes(makeGroups(0, 1, [2, 6, 3, 6, 1])).map((m) => m.index)).toEqual([1, 3]);
    expect(groupedModes(makeGroups(0, 1, [4, 4, 4])).map((m) => m.value)).toEqual([1, null, 2]);
    expect(groupedModes(makeGroups(0, 1, [0, 0]))).toEqual([]);
  });
});

describe('the formulas as TeX', () => {
  it('writes the numbers the book way', () => {
    expect(eqTex(49.5)).toBe('= 49{,}5');
    expect(eqTex(20 + 100 / 9)).toBe('\\approx 31{,}11');
    expect(quartileTex(groupedQuartile(WEIGHT, 1), 1)).toBe(
      'Q_1 = 45 + \\dfrac{12{,}5 - 4}{10} \\cdot 5 = 49{,}25',
    );
    expect(modeTex(groupedModes(STUDY)[0])).toBe(
      'M_O = 40 + \\dfrac{12 - 9}{(12 - 9) + (12 - 10)} \\cdot 20 = 52',
    );
  });

  it('renders in KaTeX strict mode', () => {
    const all = [
      meanTex(STUDY),
      quartileTex(groupedMedian(STUDY), 2),
      modeTex(groupedModes(WEIGHT)[0]),
      groupTex(STUDY[0]),
    ];
    const bad = all.filter((t) => {
      try {
        katex.renderToString(t, { strict: 'error', throwOnError: true });
        return false;
      } catch {
        return true;
      }
    });
    expect(bad).toEqual([]);
  });
});
