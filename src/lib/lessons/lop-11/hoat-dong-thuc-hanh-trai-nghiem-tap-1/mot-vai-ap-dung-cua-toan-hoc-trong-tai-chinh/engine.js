/**
 * Savings and instalment loans with interest added once a month, as in the
 * grade 11 KNTT activity: compound interest is a geometric sequence, the
 * savings plan and the equal-payment loan sum a geometric sequence, and the
 * equal-principal loan ("dư nợ giảm dần") pays interest that falls as an
 * arithmetic sequence. Amounts are in million đồng; `r` is the monthly rate
 * as a decimal (0,75% = 0.0075).
 */

/**
 * The two ways a bank splits the repayments of a loan.
 * `deu`: the same payment x every month (gốc và lãi chia đều).
 * `goc`: the same part of the principal A/N every month plus the interest on
 * the balance still owed (dư nợ giảm dần).
 * @typedef {'deu' | 'goc'} Method
 */

export const METHODS = /** @type {const} */ ([
  { value: 'deu', label: 'Trả đều hằng tháng' },
  { value: 'goc', label: 'Gốc đều, lãi trên dư nợ' },
]);

/** The monthly rate of a yearly rate in percent: 9 %/năm gives 0.0075. @param {number} yearPct */
export function monthlyRate(yearPct) {
  return yearPct / 100 / 12;
}

/**
 * Compound interest: P(1 + r)^n after n periods.
 * @param {number} p @param {number} r @param {number} n
 */
export function compound(p, r, n) {
  return p * (1 + r) ** n;
}

/**
 * Savings plan: a đồng paid in at the start of every month for n months,
 * interest added at the end of each month. The total is the sum of the
 * geometric sequence a(1 + r), a(1 + r)², …, a(1 + r)ⁿ:
 * a(1 + r)·((1 + r)ⁿ − 1)/r.
 * @param {number} a @param {number} r @param {number} n
 */
export function savings(a, r, n) {
  if (r === 0) return a * n;
  return (a * (1 + r) * ((1 + r) ** n - 1)) / r;
}

/**
 * The equal monthly payment that clears a loan A in N months, paid at the
 * end of each month: x = A·r(1 + r)^N / ((1 + r)^N − 1).
 * @param {number} a @param {number} r @param {number} n
 */
export function annuityPayment(a, r, n) {
  if (r === 0) return a / n;
  const g = (1 + r) ** n;
  return (a * r * g) / (g - 1);
}

/**
 * The balance after k payments of x: A(1 + r)^k − x((1 + r)^k − 1)/r.
 * @param {number} a @param {number} r @param {number} x @param {number} k
 */
export function balanceAfter(a, r, x, k) {
  if (r === 0) return a - x * k;
  const g = (1 + r) ** k;
  return a * g - (x * (g - 1)) / r;
}

/**
 * @typedef {object} Row
 * @property {number} k the month, from 1
 * @property {number} interest r times the balance at the start of the month
 * @property {number} principal the part of the payment that lowers the debt
 * @property {number} payment interest + principal
 * @property {number} balance what is still owed after this payment
 */

/**
 * The repayment schedule month by month. The last balance is set to 0 so
 * float noise never shows as a tiny debt.
 * @param {number} a the loan, million đồng
 * @param {number} r the monthly rate
 * @param {number} n the number of months
 * @param {Method} method
 * @returns {Row[]}
 */
export function schedule(a, r, n, method) {
  const x = annuityPayment(a, r, n);
  /** @type {Row[]} */
  const rows = [];
  let owed = a;
  for (let k = 1; k <= n; k++) {
    const interest = owed * r;
    const principal = method === 'deu' ? x - interest : a / n;
    owed = k === n ? 0 : owed - principal;
    rows.push({ k, interest, principal, payment: interest + principal, balance: owed });
  }
  return rows;
}

/**
 * Totals of a schedule: everything paid and the interest part of it.
 * @param {readonly Row[]} rows
 */
export function totals(rows) {
  const paid = rows.reduce((s, row) => s + row.payment, 0);
  const interest = rows.reduce((s, row) => s + row.interest, 0);
  return { paid, interest };
}

/**
 * Total interest of an equal-principal loan in closed form: the monthly
 * interest rA, rA(N − 1)/N, …, rA/N is an arithmetic sequence, so the sum
 * is rA(N + 1)/2.
 * @param {number} a @param {number} r @param {number} n
 */
export function decliningInterest(a, r, n) {
  return (r * a * (n + 1)) / 2;
}
