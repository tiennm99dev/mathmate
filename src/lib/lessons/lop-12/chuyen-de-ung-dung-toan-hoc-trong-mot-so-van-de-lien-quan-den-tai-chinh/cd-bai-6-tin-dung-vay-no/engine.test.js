import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { formulaText, money, plan, rowText, verdict } from './engine.js';

describe('repayment schedule', () => {
  it('matches the book example', () => {
    const p = plan({ V: 500, rate: 7.4, months: 60 });
    expect(p.payment).toBeCloseTo(9.995, 3);
    expect(p.interest).toBeCloseTo(99.714, 3);
    expect(p.rows).toHaveLength(60);
    expect(money(p.rows[59].balance)).toBe('0,000');
  });

  it('shows interest falling and principal rising', () => {
    const { rows } = plan({ V: 300, rate: 12, months: 24 });
    const bad = rows
      .slice(1)
      .filter((r, k) => r.interest >= rows[k].interest || r.principal <= rows[k].principal);
    expect(bad).toEqual([]);
  });

  it('writes valid TeX', () => {
    const loan = { V: 120, rate: 9.6, months: 36 };
    const texts = [formulaText(loan), rowText(loan, 1), rowText(loan, 36), verdict(loan).text];
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
