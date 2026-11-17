import { describe, expect, it } from 'vitest';
import {
  DATASETS,
  SCALES,
  bestFit,
  decibel,
  fitError,
  fitLevel,
  growth,
  halfLifeRate,
  pH,
  rateFromTwo,
  richter,
  scientific,
  timeToReach,
} from './engine.js';

describe('growth and decay models', () => {
  it('grows the world population as in the book', () => {
    expect(growth(7795, 0.0105, 30)).toBeCloseTo(10681.17, 1);
  });

  it('dates a sample from its carbon-14 by the half-life', () => {
    const k = halfLifeRate(5730);
    expect(growth(1, k, 5730)).toBeCloseTo(0.5, 12);
    expect(timeToReach(1, k, 0.0167)).toBeCloseTo(33829.97, 1);
    expect(timeToReach(100, k, 25)).toBeCloseTo(11460, 6);
  });

  it('finds the rate through two measurements', () => {
    expect(rateFromTwo(0, 2, 6, 16.5)).toBeCloseTo(0.3517022, 6);
    expect(growth(2, rateFromTwo(0, 2, 10, 2.3), 20)).toBeCloseTo(2.645, 9);
  });

  it('fits every dataset well on the ln scale', () => {
    const fits = DATASETS.map((d) => {
      const f = bestFit(d.data);
      return { id: d.id, ok: fitLevel(fitError(d.data, f.a0, f.r)) === 'tot', r: f.r };
    });
    expect(fits.filter((f) => !f.ok)).toEqual([]);
    expect(fits.map((f) => Math.sign(f.r))).toEqual([1, -1, -1]);
  });

  it('starts every dataset inside its slider range', () => {
    const out = DATASETS.filter((d) => {
      const f = bestFit(d.data);
      return f.a0 < d.a0Range.min || f.a0 > d.a0Range.max || Math.abs(f.r) > 0.5;
    });
    expect(out).toEqual([]);
  });

  it('judges a poor model as far', () => {
    expect(fitLevel(fitError(DATASETS[0].data, 2, 0))).toBe('xa');
  });
});

describe('logarithmic scales', () => {
  it('computes the book values', () => {
    expect(pH(5e-3)).toBeCloseTo(2.301, 3);
    expect(richter(4) + 8.3).toBeCloseTo(8.902, 3);
    expect(decibel(2e-5)).toBeCloseTo(73.01, 2);
    expect(decibel(1e-12)).toBe(0);
  });

  it('moves each scale by a fixed step when the quantity is multiplied by 10', () => {
    const steps = SCALES.map((s) => s.value(s.start + 1) - s.value(s.start));
    expect(steps).toEqual(SCALES.map((s) => s.perDecade));
  });

  it('writes numbers in scientific form', () => {
    expect(scientific(Math.log10(5e-3))).toEqual({ m: 5, k: -3 });
    expect(scientific(-7)).toEqual({ m: 1, k: -7 });
    expect(scientific(Math.log10(9.99))).toEqual({ m: 1, k: 1 });
  });
});
