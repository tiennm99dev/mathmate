import { describe, it, expect } from 'vitest';
import {
  BENEFITS,
  HARMS,
  SURVEY,
  compareGroups,
  countAnswers,
  frequencies,
  minutesOf,
  readMinutes,
  summarize,
} from './engine.js';

describe('survey data', () => {
  it('has 30 answers, 14 boys and 16 girls', () => {
    expect(SURVEY).toHaveLength(30);
    expect(minutesOf(SURVEY, 'nam')).toHaveLength(14);
    expect(minutesOf(SURVEY, 'nu')).toHaveLength(16);
  });
  it('gives the time table of the class', () => {
    expect(frequencies(minutesOf(SURVEY, 'all'))).toEqual(
      [
        [30, 2],
        [40, 1],
        [60, 4],
        [90, 5],
        [120, 7],
        [150, 3],
        [180, 2],
        [240, 3],
        [300, 1],
        [360, 1],
        [420, 1],
      ].map(([value, count]) => ({ value, count })),
    );
  });
  it('counts the benefits and harms', () => {
    expect(countAnswers(SURVEY, 'benefit', BENEFITS.length)).toEqual([11, 9, 6, 4]);
    expect(countAnswers(SURVEY, 'harm', HARMS.length)).toEqual([13, 8, 5, 4]);
  });
});

describe('characteristic numbers', () => {
  it('summarizes the whole class', () => {
    const s = summarize(minutesOf(SURVEY, 'all'));
    expect(s.mean).toBeCloseTo(141.333, 3);
    expect([s.q1, s.median, s.q3]).toEqual([90, 120, 180]);
    expect(s.modes).toEqual([120]);
    expect([s.range, s.iqr, s.high]).toEqual([390, 90, 315]);
    expect(s.outliers).toEqual([360, 420]);
    expect(s.sd).toBeCloseTo(93.26, 2);
  });
  it('compares boys and girls by mean and spread', () => {
    const c = compareGroups(minutesOf(SURVEY, 'nam'), minutesOf(SURVEY, 'nu'));
    expect(c).not.toBeNull();
    if (!c) return;
    expect([c.boys.mean, c.boys.median, c.boys.q1, c.boys.q3]).toEqual([180, 135, 90, 240]);
    expect([c.girls.mean, c.girls.median, c.girls.q1, c.girls.q3]).toEqual([107.5, 105, 60, 135]);
    expect(c.boys.variance).toBe(12600);
    expect(c.girls.variance).toBe(2831.25);
    expect([c.more, c.spread]).toEqual(['nam', 'nam']);
    expect(c.girls.outliers).toEqual([]);
  });
  it('has no comparison for an empty group', () => {
    expect(compareGroups([], [60])).toBeNull();
  });
});

describe('typed minutes', () => {
  it('reads whole minutes within a day', () => {
    expect(readMinutes(' 90 ')).toBe(90);
    expect(readMinutes('1440')).toBe(1440);
    expect(readMinutes('1441')).toBeNull();
    expect(readMinutes('1,5')).toBeNull();
    expect(readMinutes('')).toBeNull();
  });
});
