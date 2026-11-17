/**
 * The money arithmetic of the activity: a monthly budget, simple and
 * compound interest, and personal income tax by the progressive table of
 * the KNTT grade 10 book. Amounts are in million đồng unless a name says
 * otherwise.
 */

import { tidy } from '#lib/core/number-format.js';

/**
 * Money left after spending: what can be saved each month and its share of
 * the income in percent (negative when spending is over the income).
 * @param {number} income monthly income
 * @param {readonly number[]} spending monthly spending per item
 */
export function budget(income, spending) {
  const spent = tidy(spending.reduce((s, v) => s + v, 0));
  const saved = tidy(income - spent);
  return { spent, saved, rate: income > 0 ? tidy((saved / income) * 100) : 0 };
}

/**
 * Amount after `n` periods at rate `r` per period, simple interest: only the
 * principal earns interest, $T = A(1 + nr)$.
 * @param {number} principal
 * @param {number} rate per period, as a fraction (6% is 0.06)
 * @param {number} periods
 */
export function simpleAmount(principal, rate, periods) {
  return tidy(principal * (1 + periods * rate));
}

/**
 * Amount after `n` periods at rate `r` per period, compound interest: each
 * period's interest joins the principal, $T = A(1 + r)^n$.
 * @param {number} principal
 * @param {number} rate per period, as a fraction
 * @param {number} periods
 */
export function compoundAmount(principal, rate, periods) {
  return tidy(principal * (1 + rate) ** periods);
}

/**
 * Both amounts for every whole year from 0 to `years`.
 * @param {number} principal
 * @param {number} rate per year, as a fraction
 * @param {number} years
 */
export function growthTable(principal, rate, years) {
  return Array.from({ length: years + 1 }, (_, n) => ({
    year: n,
    simple: simpleAmount(principal, rate, n),
    compound: compoundAmount(principal, rate, n),
  }));
}

/**
 * The progressive monthly tax table used in the book: each bracket's upper
 * bound of taxable income (million đồng per month) and its rate.
 */
export const BRACKETS = [
  { upTo: 5, rate: 0.05 },
  { upTo: 10, rate: 0.1 },
  { upTo: 18, rate: 0.15 },
  { upTo: 32, rate: 0.2 },
  { upTo: 52, rate: 0.25 },
  { upTo: 80, rate: 0.3 },
  { upTo: Infinity, rate: 0.35 },
];

/** Family deductions in the book: for the taxpayer and per dependant. */
export const DEDUCTION = { self: 11, dependant: 4.4 };

/**
 * Taxable income: income minus the family deductions, never below 0.
 * @param {number} income monthly taxable-type income
 * @param {number} dependants
 */
export function taxableIncome(income, dependants) {
  return Math.max(0, tidy(income - DEDUCTION.self - dependants * DEDUCTION.dependant));
}

/**
 * Tax on a taxable income, bracket by bracket: each bracket taxes only the
 * part of the income that falls inside it.
 * @param {number} taxable
 */
export function taxBreakdown(taxable) {
  /** @type {Array<{ level: number, from: number, to: number, part: number, rate: number, tax: number }>} */
  const rows = [];
  let from = 0;
  BRACKETS.forEach((b, i) => {
    if (taxable <= from) return;
    const part = tidy(Math.min(taxable, b.upTo) - from);
    rows.push({ level: i + 1, from, to: b.upTo, part, rate: b.rate, tax: tidy(part * b.rate) });
    from = b.upTo;
  });
  return { rows, total: tidy(rows.reduce((s, r) => s + r.tax, 0)) };
}

/**
 * The book's one-line formula $y = ax - b$ for the bracket holding `taxable`,
 * which gives the same tax as the bracket-by-bracket sum.
 * @param {number} taxable
 */
export function taxFormula(taxable) {
  let from = 0;
  let below = 0;
  for (const b of BRACKETS) {
    if (taxable <= b.upTo) return { rate: b.rate, minus: tidy(b.rate * from - below) };
    below = tidy(below + (b.upTo - from) * b.rate);
    from = b.upTo;
  }
  throw new Error('unreachable: the last bracket has no upper bound');
}
