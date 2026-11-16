/**
 * Simple and compound interest side by side. With simple interest (lãi đơn)
 * only the deposit earns interest, so the balance after n years,
 * A_n = P(1 + n·r), is an arithmetic sequence with common difference P·r.
 * With compound interest (lãi kép) the interest joins the deposit each
 * year, so B_n = P(1 + r)^n is a geometric sequence with ratio 1 + r.
 */

/**
 * The balances from year 0 to year `years`, in the deposit's unit.
 * @param {number} deposit P
 * @param {number} percent yearly rate in percent, such as 6 or 7,5
 * @param {number} years
 * @returns {{ simple: number[], compound: number[] }}
 */
export function balances(deposit, percent, years) {
  const r = percent / 100;
  const simple = [];
  const compound = [];
  for (let n = 0; n <= years; n++) {
    simple.push(deposit * (1 + n * r));
    compound.push(deposit * (1 + r) ** n);
  }
  return { simple, compound };
}

/**
 * The first whole number of years after which the balance has at least
 * doubled, for each way of paying interest.
 * @param {number} percent
 * @returns {{ simple: number, compound: number }}
 */
export function doublingYears(percent) {
  const r = percent / 100;
  let compound = 1;
  while ((1 + r) ** compound < 2 - 1e-12) compound++;
  return { simple: Math.ceil(1 / r - 1e-12), compound };
}
