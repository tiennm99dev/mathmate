import { describe, expect, it } from 'vitest';
import {
  annuityPayment,
  balanceAfter,
  compound,
  decliningInterest,
  monthlyRate,
  savings,
  schedule,
  totals,
} from './engine.js';

describe('savings and compound interest', () => {
  it('grows by the factor 1 + r each period', () => {
    expect(compound(100, 0.06, 5)).toBeCloseTo(133.8225578, 6);
    expect(compound(50, 0.08, 3)).toBeCloseTo(62.9856, 9);
  });

  it('sums the geometric sequence of a savings plan', () => {
    expect(savings(2, 0.005, 12)).toBeCloseTo(24.79448, 4);
    expect(savings(1, 0.005, 6)).toBeCloseTo(6.10588, 4);
    expect(savings(3, 0, 4)).toBe(12);
  });

  it('turns a yearly percent into a monthly rate', () => {
    expect(monthlyRate(9)).toBeCloseTo(0.0075, 12);
  });
});

describe('instalment loans', () => {
  it('finds the equal payment that clears the loan', () => {
    expect(annuityPayment(1000, 0.0075, 120)).toBeCloseTo(12.66758, 4);
    expect(annuityPayment(60, 0.01, 12)).toBeCloseTo(5.33093, 4);
    expect(annuityPayment(12, 0, 12)).toBe(1);
  });

  it('leaves no debt after the last equal payment', () => {
    const x = annuityPayment(300, 0.008, 36);
    expect(balanceAfter(300, 0.008, x, 36)).toBeCloseTo(0, 9);
    expect(balanceAfter(100, 0.01, 10, 2)).toBeCloseTo(81.91, 9);
  });

  it('matches the closed form in the equal-payment schedule', () => {
    const rows = schedule(500, 0.007, 48, 'deu');
    const x = annuityPayment(500, 0.007, 48);
    const bad = rows.filter(
      (row) =>
        Math.abs(row.payment - x) > 1e-9 ||
        (row.k < 48 && Math.abs(row.balance - balanceAfter(500, 0.007, x, row.k)) > 1e-6),
    );
    expect(bad).toEqual([]);
    expect(rows[47].balance).toBe(0);
  });

  it('pays falling interest as an arithmetic sequence on the declining balance', () => {
    const rows = schedule(120, 0.01, 12, 'goc');
    expect(rows.map((row) => Math.round(row.interest * 10) / 10)).toEqual([
      1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1,
    ]);
    expect(totals(rows).interest).toBeCloseTo(7.8, 9);
    expect(decliningInterest(120, 0.01, 12)).toBeCloseTo(7.8, 9);
    expect(rows[0].payment).toBeCloseTo(11.2, 9);
  });

  it('charges less interest when the principal is paid off evenly', () => {
    const even = totals(schedule(120, 0.01, 12, 'deu')).interest;
    const declining = totals(schedule(120, 0.01, 12, 'goc')).interest;
    expect(even).toBeCloseTo(7.94226, 4);
    expect(declining).toBeLessThan(even);
  });
});
