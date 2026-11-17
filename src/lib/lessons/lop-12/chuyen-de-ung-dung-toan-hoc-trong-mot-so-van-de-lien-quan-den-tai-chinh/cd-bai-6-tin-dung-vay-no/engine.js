import { formatFixed, numTex } from '#lib/core/number-format.js';
import { instalment, schedule } from '../_shared/finance.js';

/**
 * @typedef {{ V: number, rate: number, months: number }} Loan
 * `V` in triệu đồng, `rate` the yearly rate in percent, `months` the number
 * of monthly payments.
 */

/**
 * The monthly rate, payment, schedule and totals of an equal-instalment loan.
 * @param {Loan} loan
 */
export function plan(loan) {
  const i = loan.rate / 100 / 12;
  const payment = instalment(loan.V, i, loan.months);
  const rows = schedule(loan.V, i, loan.months);
  const total = payment * loan.months;
  return { i, payment, rows, total, interest: total - loan.V };
}

/**
 * The formula line with the loan's numbers put in.
 * @param {Loan} loan
 */
export function formulaText(loan) {
  const { i, payment } = plan(loan);
  return `$P = \\dfrac{V \\cdot i}{1 - (1 + i)^{-n}} \\approx \\dfrac{${numTex(loan.V)} \\cdot ${numTex(i, 6)}}{1 - (1 + ${numTex(i, 6)})^{-${loan.months}}} \\approx ${numTex(payment, 3)}$ triệu đồng mỗi tháng.`;
}

/**
 * One row of the schedule read as a sentence.
 * @param {Loan} loan
 * @param {number} k 1-based period
 */
export function rowText(loan, k) {
  const { i, rows } = plan(loan);
  const row = rows[k - 1];
  const before = row.balance + row.principal;
  return `Kì ${k}: lãi $= ${numTex(before, 3)} \\cdot ${numTex(i, 6)} \\approx ${numTex(row.interest, 3)}$, trả gốc $\\approx ${numTex(row.principal, 3)}$, còn nợ $\\approx ${numTex(row.balance, 3)}$ triệu đồng.`;
}

/**
 * The feedback line: how the split between interest and principal moves.
 * @param {Loan} loan
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function verdict(loan) {
  const { rows, interest, total } = plan(loan);
  const first = rows[0];
  const share = (first.interest / first.payment) * 100;
  return {
    tone: 'info',
    text: `Tổng tiền trả $\\approx ${numTex(total, 3)}$ triệu đồng, trong đó tiền lãi $\\approx ${numTex(interest, 3)}$ triệu đồng. Kì đầu, lãi chiếm khoảng $${numTex(share, 1)}\\%$ khoản trả; càng về sau dư nợ giảm nên phần lãi nhỏ dần, phần gốc lớn dần.`,
  };
}

/**
 * A money amount in triệu đồng for labels: three decimals, comma.
 * @param {number} v
 */
export const money = (v) => formatFixed(v, 3);
