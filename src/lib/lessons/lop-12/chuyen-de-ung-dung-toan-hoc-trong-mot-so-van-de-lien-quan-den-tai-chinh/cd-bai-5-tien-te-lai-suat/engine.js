import { numTex } from '#lib/core/number-format.js';
import { compoundAmount, purchasingPower, realRate, simpleAmount } from '../_shared/finance.js';

/** The compounding choices of the widget: periods a year and their name. */
export const PERIODS = /** @type {const} */ ([
  { n: 1, label: 'Năm', name: 'hằng năm' },
  { n: 4, label: 'Quý', name: 'hằng quý' },
  { n: 12, label: 'Tháng', name: 'hằng tháng' },
  { n: 365, label: 'Ngày', name: 'hằng ngày' },
]);

/**
 * @typedef {{ P: number, rate: number, years: number, n: number, inflation: number }} Deposit
 * `P` in triệu đồng, `rate` and `inflation` in percent, `years` whole years.
 */

/**
 * Both amounts year by year, for the chart (triệu đồng).
 * @param {Deposit} d
 */
export function growth(d) {
  const r = d.rate / 100;
  const years = Array.from({ length: d.years + 1 }, (_, y) => y);
  return {
    labels: years.map(String),
    simple: years.map((y) => simpleAmount(d.P, r, y)),
    compound: years.map((y) => compoundAmount(d.P, r, d.n, y)),
  };
}

/**
 * The live sentences under the chart: both formulas with the numbers put in,
 * then the real rate and what the compound amount is worth in today's money.
 * @param {Deposit} d
 */
export function readout(d) {
  const r = d.rate / 100;
  const g = d.inflation / 100;
  const A1 = simpleAmount(d.P, r, d.years);
  const A2 = compoundAmount(d.P, r, d.n, d.years);
  const rr = realRate(r, g);
  const worth = purchasingPower(A2, g, d.years);
  const R = numTex(r, 4);
  const lines = [
    `Lãi đơn: $A = P(1 + rt) = ${numTex(d.P)}\\cdot(1 + ${R}\\cdot ${d.years}) \\approx ${numTex(A1, 3)}$ triệu đồng.`,
    `Lãi kép: $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt} = ${numTex(d.P)}\\left(1 + \\dfrac{${R}}{${d.n}}\\right)^{${d.n * d.years}} \\approx ${numTex(A2, 3)}$ triệu đồng.`,
    `Lãi suất thực: $r_{\\text{thực}} = \\dfrac{r - g}{1 + g} = \\dfrac{${R} - ${numTex(g, 4)}}{1 + ${numTex(g, 4)}} \\approx ${numTex(rr * 100, 2)}\\%$; sức mua của $${numTex(A2, 3)}$ triệu đồng sau $${d.years}$ năm chỉ bằng khoảng $${numTex(worth, 3)}$ triệu đồng hôm nay.`,
  ];
  return { A1, A2, rr, worth, lines };
}

/**
 * The feedback line: which method gives more, and whether the deposit keeps
 * its value against inflation.
 * @param {Deposit} d
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function verdict(d) {
  const { A1, A2, rr } = readout(d);
  const gap = A2 - A1;
  const head =
    d.years === 1 && d.n === 1
      ? 'Sau đúng $1$ năm, ghép lãi hằng năm cho cùng số tiền với lãi đơn.'
      : `Lãi kép nhiều hơn lãi đơn $${numTex(gap, 3)}$ triệu đồng: tiền lãi của mỗi kì lại sinh lãi ở các kì sau.`;
  if (rr < 0) {
    return {
      tone: 'warn',
      text: `${head} Nhưng lạm phát cao hơn lãi suất nên lãi suất thực âm: tiền gửi mất dần sức mua.`,
    };
  }
  return { tone: rr > 0 ? 'ok' : 'info', text: head };
}
