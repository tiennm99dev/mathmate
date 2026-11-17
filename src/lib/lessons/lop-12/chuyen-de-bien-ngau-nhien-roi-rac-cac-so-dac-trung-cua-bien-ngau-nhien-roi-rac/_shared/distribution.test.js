import { describe, expect, it } from 'vitest';
import { tidy } from '#lib/core/number-format.js';
import {
  binomialPmf,
  choose,
  expectation,
  stdDev,
  totalProbability,
  variance,
} from './distribution.js';

describe('numbers of a distribution table', () => {
  it('matches the worked tables', () => {
    const x = [0, 1, 2, 3, 4, 5];
    const p = [0.1, 0.2, 0.25, 0.25, 0.15, 0.05];
    expect(totalProbability(p)).toBe(1);
    expect(expectation(x, p)).toBe(2.3);
    expect(variance(x, p)).toBe(1.81);
    expect(tidy(stdDev([-2, 4, 10], [0.3, 0.5, 0.2]))).toBe(4.2);
    expect(variance([2, 4], [0.3, 0.7])).toBe(0.84);
  });

  it('gives the same variance by both formulas', () => {
    const x = [1, 2, 3, 4];
    const p = [0.1, 0.4, 0.3, 0.2];
    const e = expectation(x, p);
    const short = tidy(x.reduce((s, v, i) => s + v * v * p[i], 0) - e * e);
    expect(e).toBe(2.6);
    expect(variance(x, p)).toBe(short);
    expect(short).toBe(0.84);
  });
});

describe('binomial distribution', () => {
  it('adds up to 1 and has mean np and variance np(1 − p)', () => {
    const bad = [];
    for (let n = 1; n <= 12; n += 1) {
      for (const p of [0.1, 0.25, 0.5, 0.8]) {
        const pmf = binomialPmf(n, p);
        const ks = pmf.map((_, k) => k);
        if (Math.abs(totalProbability(pmf) - 1) > 1e-9) bad.push(`sum ${n} ${p}`);
        if (Math.abs(expectation(ks, pmf) - n * p) > 1e-9) bad.push(`E ${n} ${p}`);
        if (Math.abs(variance(ks, pmf) - n * p * (1 - p)) > 1e-9) bad.push(`V ${n} ${p}`);
      }
    }
    expect(bad).toEqual([]);
    expect(choose(10, 3)).toBe(120);
    expect(choose(4, 6)).toBe(0);
    expect(tidy(binomialPmf(10, 0.25)[3], 4)).toBe(0.2503);
    expect(tidy(binomialPmf(5, 0.8)[4] + binomialPmf(5, 0.8)[5], 5)).toBe(0.73728);
  });
});
