import { describe, expect, it } from 'vitest';
import {
  annuityFuture,
  annuityPresent,
  compoundAmount,
  instalment,
  periodsToGrow,
  planPath,
  presentValue,
  purchasingPower,
  realRate,
  schedule,
  simpleAmount,
  yearReaching,
} from './finance.js';

describe('money formulas', () => {
  it('gives the book values for simple and compound interest', () => {
    expect(simpleAmount(500, 0.061, 0.75)).toBeCloseTo(522.875, 6);
    expect(compoundAmount(500, 0.06, 12, 0.75)).toBeCloseTo(522.955, 3);
    expect(compoundAmount(200, 0.09, 4, 5)).toBeCloseTo(312.102, 3);
    expect(presentValue(100, 0.06, 12, 10)).toBeCloseTo(54.963, 3);
  });

  it('handles inflation', () => {
    expect(purchasingPower(10, 0.035, 1)).toBeCloseTo(9.65, 9);
    expect(realRate(0.08, 0.035)).toBeCloseTo(1 / 23, 9);
    expect(realRate(0.05, 0.06)).toBeLessThan(0);
  });

  it('computes instalments and a schedule that clears the loan', () => {
    expect(instalment(500, 0.074 / 12, 60)).toBeCloseTo(9.995, 3);
    expect(instalment(2400, 0.005, 360)).toBeCloseTo(14.389, 3);
    expect(instalment(120, 0, 12)).toBe(10);
    const rows = schedule(30, 0.01, 3);
    expect(rows[0].interest).toBeCloseTo(0.3, 9);
    expect(rows[2].balance).toBe(0);
    const paid = rows.reduce((s, r) => s + r.principal, 0);
    expect(paid).toBeCloseTo(30, 9);
    const p = instalment(30, 0.01, 3);
    expect(rows.every((r) => Math.abs(r.payment - p) < 1e-9)).toBe(true);
  });

  it('computes annuities', () => {
    expect(annuityFuture(36, 0.06, 30)).toBeCloseTo(2846.095, 3);
    expect(annuityPresent(5, 0.005, 48)).toBeCloseTo(212.902, 3);
    expect(annuityPresent(500, 0.1, 10)).toBeCloseTo(3072.284, 3);
    expect(annuityFuture(2, 0, 5)).toBe(10);
    expect(annuityPresent(2, 0, 5)).toBe(10);
    expect(Math.ceil(periodsToGrow(2, 0.08 / 12))).toBe(105);
  });

  it('runs a savings plan year by year', () => {
    const path = planPath(10, 1, 0.06, 2);
    expect(path).toHaveLength(3);
    expect(path[0]).toEqual({ year: 0, value: 10, paid: 10 });
    expect(path[2].paid).toBe(34);
    expect(path[2].value).toBeCloseTo(10 * 1.005 ** 24 + annuityFuture(1, 0.005, 24), 9);
    expect(yearReaching(path, 20)).toBe(1);
    expect(yearReaching(path, 1000)).toBeNull();
  });
});
