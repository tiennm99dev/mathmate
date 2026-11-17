/**
 * The money formulas of the chapter, written with the book's letters. Rates
 * are decimals (6 % is 0.06), times are in years unless a name says periods.
 *
 * - Simple interest: `simpleAmount` A = P(1 + rt).
 * - Compound interest with `n` periods a year: `compoundAmount`
 *   A = P(1 + r/n)^{nt}, and its inverse `presentValue`.
 * - Inflation: `purchasingPower` P(1 − g)^t and `realRate` (r − g)/(1 + g).
 * - Equal instalments on a loan V at rate `i` per period over `n` periods:
 *   `instalment` V·i/(1 − (1 + i)^{−n}) and the period-by-period `schedule`.
 * - Annuities of `P` paid at the end of each period: `annuityFuture`
 *   P((1 + i)^n − 1)/i and `annuityPresent` P(1 − (1 + i)^{−n})/i.
 * - `planPath`: a lump sum plus a monthly deposit, year by year.
 */

/**
 * @param {number} P principal
 * @param {number} r yearly rate
 * @param {number} t years
 */
export const simpleAmount = (P, r, t) => P * (1 + r * t);

/**
 * @param {number} P principal
 * @param {number} r yearly rate
 * @param {number} n compounding periods a year
 * @param {number} t years
 */
export const compoundAmount = (P, r, n, t) => P * (1 + r / n) ** (n * t);

/**
 * The deposit needed today to have `A` after `t` years.
 * @param {number} A
 * @param {number} r
 * @param {number} n
 * @param {number} t
 */
export const presentValue = (A, r, n, t) => A * (1 + r / n) ** (-n * t);

/**
 * What `P` buys after `t` years when money loses `g` of its value a year.
 * @param {number} P
 * @param {number} g
 * @param {number} t
 */
export const purchasingPower = (P, g, t) => P * (1 - g) ** t;

/**
 * Real rate from the nominal rate `r` and the inflation rate `g`.
 * @param {number} r
 * @param {number} g
 */
export const realRate = (r, g) => (r - g) / (1 + g);

/**
 * The equal payment per period that clears a loan `V` in `n` periods.
 * @param {number} V
 * @param {number} i rate per period
 * @param {number} n
 */
export function instalment(V, i, n) {
  if (i === 0) return V / n;
  return (V * i) / (1 - (1 + i) ** -n);
}

/**
 * @typedef {{ k: number, payment: number, interest: number, principal: number, balance: number }} ScheduleRow
 */

/**
 * The repayment schedule of an equal-instalment loan: each payment first
 * pays the interest on the balance, the rest pays off principal.
 * @param {number} V
 * @param {number} i
 * @param {number} n
 * @returns {ScheduleRow[]}
 */
export function schedule(V, i, n) {
  const payment = instalment(V, i, n);
  /** @type {ScheduleRow[]} */
  const rows = [];
  let balance = V;
  for (let k = 1; k <= n; k++) {
    const interest = balance * i;
    const principal = k === n ? balance : payment - interest;
    balance = k === n ? 0 : balance - principal;
    rows.push({ k, payment: principal + interest, interest, principal, balance });
  }
  return rows;
}

/**
 * Value right after the `n`-th of equal deposits `P` made at the end of
 * each period.
 * @param {number} P
 * @param {number} i
 * @param {number} n
 */
export function annuityFuture(P, i, n) {
  if (i === 0) return P * n;
  return (P * ((1 + i) ** n - 1)) / i;
}

/**
 * Value today of `n` equal amounts `P` received at the end of each period.
 * @param {number} P
 * @param {number} i
 * @param {number} n
 */
export function annuityPresent(P, i, n) {
  if (i === 0) return P * n;
  return (P * (1 - (1 + i) ** -n)) / i;
}

/**
 * Periods needed for a sum to grow by the factor `ratio` at rate `i` a
 * period: log base (1 + i) of `ratio` (not rounded).
 * @param {number} ratio
 * @param {number} i
 */
export const periodsToGrow = (ratio, i) => Math.log(ratio) / Math.log(1 + i);

/**
 * @typedef {{ year: number, value: number, paid: number }} PlanPoint
 */

/**
 * A savings plan: `start` deposited now, `monthly` added at the end of every
 * month, interest compounded monthly at the yearly rate `r`. One point per
 * year from year 0 to `years`: the account value and the money paid in.
 * @param {number} start
 * @param {number} monthly
 * @param {number} r
 * @param {number} years
 * @returns {PlanPoint[]}
 */
export function planPath(start, monthly, r, years) {
  const i = r / 12;
  /** @type {PlanPoint[]} */
  const out = [];
  for (let y = 0; y <= years; y++) {
    const m = 12 * y;
    out.push({
      year: y,
      value: start * (1 + i) ** m + annuityFuture(monthly, i, m),
      paid: start + monthly * m,
    });
  }
  return out;
}

/**
 * First whole year in which a plan reaches `goal`, or null.
 * @param {PlanPoint[]} path
 * @param {number} goal
 */
export function yearReaching(path, goal) {
  const hit = path.find((p) => p.value >= goal);
  return hit ? hit.year : null;
}
