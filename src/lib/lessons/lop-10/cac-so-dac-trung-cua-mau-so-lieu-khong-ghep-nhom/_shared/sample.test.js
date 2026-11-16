import { describe, expect, it } from 'vitest';
import {
  hasMode,
  modesText,
  num,
  readSample,
  rel,
  sampleText,
  summarize,
  tex,
  valueAxis,
} from './sample.js';

describe('summarize', () => {
  it('matches the calcium sample worked in the book', () => {
    const s = summarize([
      0, 4, 8, 10, 13, 14, 15, 16, 16, 18, 18, 18, 19, 20, 20, 20, 21, 22, 29, 34,
    ]);
    expect([s.q1, s.median, s.q3, s.iqr]).toEqual([13.5, 18, 20, 6.5]);
    expect([s.low, s.high]).toEqual([3.75, 29.75]);
    expect(s.outliers).toEqual([0, 34]);
    expect(s.modes).toEqual([18, 20]);
  });

  it('matches the newborn weights', () => {
    const s = summarize([2.8, 2.5, 3.1, 3.3, 2.9, 3.5, 4.1, 2.8, 3.0, 3.3]);
    expect(s.range).toBe(1.6);
    expect([s.q1, s.q3, s.iqr]).toEqual([2.8, 3.3, 0.5]);
    expect(s.mean).toBe(3.13);
    expect(s.variance).toBeCloseTo(0.1821, 4);
    expect(s.sd).toBeCloseTo(0.4267, 4);
  });

  it('leaves the median out of both halves when n is odd', () => {
    const s = summarize([20, 0, 3, 5, 7, 9, 11, 16, 19]);
    expect([s.q1, s.median, s.q3, s.iqr]).toEqual([4, 9, 17.5, 13.5]);
  });

  it('tells a sample with a mode from one where every value is equally frequent', () => {
    expect(hasMode(summarize([1, 2, 3]))).toBe(false);
    expect(hasMode(summarize([1, 2, 2, 3]))).toBe(true);
    expect(hasMode(summarize([1, 1, 2, 2]))).toBe(false);
  });
});

describe('readSample', () => {
  it('reads semicolons, spaces and the decimal comma', () => {
    expect(readSample('7; 8,5  9;10.25')).toEqual({ values: [7, 8.5, 9, 10.25] });
    expect(readSample('−2; 3')).toEqual({ values: [-2, 3] });
  });

  it('refuses text, a single value and too many values', () => {
    expect(readSample('7; a')).toHaveProperty('error');
    expect(readSample('7')).toHaveProperty('error');
    expect(readSample('')).toHaveProperty('error');
    expect(readSample('1 2 3 4', { max: 3 })).toHaveProperty('error');
  });

  it('writes a sample back so it reads the same', () => {
    const values = [7, 8.5, 12.25];
    expect(readSample(sampleText(values))).toEqual({ values });
  });
});

describe('number writing', () => {
  it('writes the decimal comma in text and TeX', () => {
    expect(num(7.256)).toBe('7,26');
    expect(tex(1234.5)).toBe('1\\,234{,}5');
    expect(rel(7.25)).toBe('=');
    expect(rel(7.256)).toBe('\\approx');
    expect(modesText([7])).toBe('7');
    expect(modesText([7, 8, 9.5])).toBe('7, 8 và 9,5');
  });
});

describe('valueAxis', () => {
  it('maps the axis ends to the drawing ends', () => {
    const a = valueAxis(3, 17, 20, 380);
    expect(a.min).toBeLessThanOrEqual(3);
    expect(a.max).toBeGreaterThanOrEqual(17);
    expect(a.x(a.min)).toBe(20);
    expect(a.x(a.max)).toBe(380);
  });
});
