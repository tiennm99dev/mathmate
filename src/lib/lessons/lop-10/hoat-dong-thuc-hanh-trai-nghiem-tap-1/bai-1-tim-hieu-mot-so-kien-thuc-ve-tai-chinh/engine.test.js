import { describe, it, expect } from 'vitest';
import {
  BRACKETS,
  budget,
  compoundAmount,
  growthTable,
  simpleAmount,
  taxBreakdown,
  taxFormula,
  taxableIncome,
} from './engine.js';

describe('budget', () => {
  it('saves what is left of the income', () => {
    expect(budget(12, [5, 2.5, 1, 1])).toEqual({ spent: 9.5, saved: 2.5, rate: 20.833333333 });
  });
  it('shows a deficit as a negative saving', () => {
    expect(budget(8, [6, 3]).saved).toBe(-1);
  });
});

describe('interest', () => {
  it('compounds a 36-month deposit at 7% a year into 80 m² of flat', () => {
    const t = compoundAmount(2_000_000_000, 0.07, 3);
    expect(t).toBe(2_450_086_000);
    expect(t / 30_626_075).toBe(80);
  });
  it('gives 15,9 million for 15 million over a year at 6%', () => {
    expect(simpleAmount(15, 0.06, 1)).toBe(15.9);
  });
  it('compounds 511 million monthly at 0,5% for 11 months', () => {
    expect(compoundAmount(511_000_000, 0.005, 11)).toBeCloseTo(539_818_270.51, 2);
  });
  it('lets compound interest overtake simple interest after the first year', () => {
    const rows = growthTable(100, 0.06, 5);
    expect(rows[1].simple).toBe(rows[1].compound);
    expect(rows[5].simple).toBe(130);
    expect(rows[5].compound).toBeCloseTo(133.8226, 4);
    expect(rows.slice(2).every((r) => r.compound > r.simple)).toBe(true);
  });
});

describe('income tax', () => {
  it('taxes the worked case of the book: 28 million, one dependant', () => {
    const x = taxableIncome(28, 1);
    expect(x).toBe(12.6);
    const t = taxBreakdown(x);
    expect(t.rows.map((r) => r.tax)).toEqual([0.25, 0.5, 0.39]);
    expect(t.total).toBe(1.14);
  });
  it('never taxes income under the deductions', () => {
    expect(taxableIncome(10, 0)).toBe(0);
    expect(taxBreakdown(0).total).toBe(0);
  });
  it('matches the one-line formula in every bracket', () => {
    const bad = [];
    for (let x = 0.5; x <= 120; x += 0.5) {
      const f = taxFormula(x);
      const y = Math.round((f.rate * x - f.minus) * 1e6) / 1e6;
      if (Math.abs(y - taxBreakdown(x).total) > 1e-6) bad.push(x);
    }
    expect(bad).toEqual([]);
    expect(BRACKETS.map((_, i) => taxFormula([3, 7, 12, 20, 40, 60, 90][i]).minus)).toEqual([
      0, 0.25, 0.75, 1.65, 3.25, 5.85, 9.85,
    ]);
  });
});
