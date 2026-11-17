import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  drawIndices,
  errors,
  estimate,
  estimateText,
  makePond,
  markFish,
  meanEstimate,
  percent,
  recapture,
} from './engine.js';

describe('estimate', () => {
  it('gives the peanut estimate of the book', () => {
    expect(estimate(105, 54, 9)).toBe(630);
  });
  it('fills the error table of the book', () => {
    /** @type {Array<[number, number, number, number, string]>} */
    const rows = [
      [51, 4, 1275, 275, '21,57%'],
      [103, 11, 936, 64, '6,84%'],
      [155, 16, 969, 31, '3,20%'],
    ];
    for (const [n, k, est, abs, rel] of rows) {
      const e = estimate(100, n, k);
      expect(e).toBe(est);
      const err = errors(est, 1000);
      expect(err.abs).toBe(abs);
      expect(percent(err.rel)).toBe(rel);
    }
  });
  it('has no estimate without a marked fish', () => {
    expect(estimate(100, 50, 0)).toBeNull();
    expect(estimateText(100, 50, 0)).toContain('chưa ước lượng');
  });
  it('writes the working', () => {
    expect(estimateText(105, 54, 9)).toContain('= 630$');
    expect(estimateText(100, 103, 11)).toContain('\\approx 936$');
    expect(estimateText(100, 51, 4)).toContain('= 1\\,275$');
  });
  it('averages the estimates it has', () => {
    expect(meanEstimate([null])).toBeNull();
    expect(meanEstimate([900, null, 1100])).toBe(1000);
  });
});

describe('pond', () => {
  it('draws different indices', () => {
    const idx = drawIndices(rng(3), 50, 20);
    expect(new Set(idx).size).toBe(20);
    expect(Math.max(...idx)).toBeLessThan(50);
    expect(drawIndices(rng(3), 5, 9)).toHaveLength(5);
  });
  it('marks exactly M fish and counts them in a catch', () => {
    const rand = rng(7);
    const pond = markFish(rand, makePond(rand, 400, 100, 60), 40);
    expect(pond.filter((f) => f.marked)).toHaveLength(40);
    const { caught, k } = recapture(rand, pond, 80);
    expect(caught).toHaveLength(80);
    expect(k).toBe(caught.filter((i) => pond[i].marked).length);
  });
  it('estimates close to N on average', () => {
    const rand = rng(11);
    const pond = markFish(rand, makePond(rand, 1000, 100, 60), 100);
    const ests = Array.from({ length: 200 }, () => {
      const { k } = recapture(rand, pond, 300);
      return estimate(100, 300, k);
    });
    const mean = meanEstimate(ests) ?? 0;
    expect(Math.abs(mean - 1000)).toBeLessThan(100);
  });
});
