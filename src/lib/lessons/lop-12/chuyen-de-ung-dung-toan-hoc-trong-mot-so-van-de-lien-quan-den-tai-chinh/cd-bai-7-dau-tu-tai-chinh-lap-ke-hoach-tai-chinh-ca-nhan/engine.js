import { numTex } from '#lib/core/number-format.js';
import { planPath, yearReaching } from '../_shared/finance.js';

/**
 * Illustrative investment channels: an assumed expected yearly return and a
 * low return for a bad run of years, in percent. The figures are teaching
 * assumptions, not forecasts.
 */
export const CHANNELS = /** @type {const} */ ([
  {
    id: 'tiet-kiem',
    label: 'Gửi tiết kiệm',
    rate: 5,
    low: 5,
    risk: 'Rủi ro thấp: lãi suất được ghi trong hợp đồng, kết quả gần như chắc chắn.',
  },
  {
    id: 'trai-phieu',
    label: 'Trái phiếu',
    rate: 7,
    low: 4,
    risk: 'Rủi ro vừa: lợi nhuận cao hơn tiết kiệm nhưng phụ thuộc khả năng trả nợ của tổ chức phát hành.',
  },
  {
    id: 'co-phieu',
    label: 'Quỹ cổ phiếu',
    rate: 10,
    low: 1,
    risk: 'Rủi ro cao: lợi nhuận kì vọng lớn nhất nhưng giá trị có thể giảm mạnh trong những năm xấu.',
  },
]);

/**
 * @typedef {{ start: number, monthly: number, years: number, goal: number, channel: string }} Plan
 * Amounts in triệu đồng.
 */

/** @param {string} id */
export const channelOf = (id) => CHANNELS.find((c) => c.id === id) ?? CHANNELS[0];

/**
 * The expected path, the bad-years path and the money paid in, year by year.
 * @param {Plan} p
 */
export function paths(p) {
  const c = channelOf(p.channel);
  const expected = planPath(p.start, p.monthly, c.rate / 100, p.years);
  const low = planPath(p.start, p.monthly, c.low / 100, p.years);
  return { c, expected, low };
}

/**
 * The live summary: final values against the money paid in, and when the
 * goal is reached in each case.
 * @param {Plan} p
 */
export function summary(p) {
  const { c, expected, low } = paths(p);
  const end = expected[expected.length - 1];
  const endLow = low[low.length - 1];
  const i = c.rate / 100 / 12;
  const m = 12 * p.years;
  const formula = `$A = ${numTex(p.start)}\\left(1 + \\dfrac{${numTex(c.rate / 100, 3)}}{12}\\right)^{${m}} + ${numTex(p.monthly)}\\cdot\\dfrac{(1 + ${numTex(i, 6)})^{${m}} - 1}{${numTex(i, 6)}} \\approx ${numTex(end.value, 1)}$ triệu đồng.`;
  const paid = `Tiền đã góp: $${numTex(end.paid, 1)}$ triệu đồng; tiền lãi, lợi nhuận: $\\approx ${numTex(end.value - end.paid, 1)}$ triệu đồng.`;
  const hit = yearReaching(expected, p.goal);
  const hitLow = yearReaching(low, p.goal);
  /** @type {'ok' | 'warn' | 'info'} */
  let tone = 'ok';
  let text;
  if (hit === 0) {
    text = 'Số tiền ban đầu đã đủ mục tiêu; hãy đặt mục tiêu lớn hơn để lập kế hoạch.';
  } else if (hit === null) {
    tone = 'warn';
    text = `Với lợi suất kì vọng $${numTex(c.rate)}\\%$ một năm, sau $${p.years}$ năm vẫn chưa đạt mục tiêu $${numTex(p.goal)}$ triệu đồng: hãy góp nhiều hơn, kéo dài thời gian hoặc giảm mục tiêu.`;
  } else if (c.low === c.rate) {
    text = `Đạt mục tiêu $${numTex(p.goal)}$ triệu đồng sau $${hit}$ năm.`;
  } else if (hitLow === null) {
    tone = 'warn';
    text = `Theo kì vọng, đạt mục tiêu sau $${hit}$ năm; nhưng nếu gặp những năm xấu (lợi suất chỉ $${numTex(c.low)}\\%$) thì sau $${p.years}$ năm chỉ có khoảng $${numTex(endLow.value, 1)}$ triệu đồng, chưa đạt mục tiêu.`;
  } else {
    text = `Theo kì vọng, đạt mục tiêu sau $${hit}$ năm; nếu gặp những năm xấu thì sau $${hitLow}$ năm.`;
  }
  return { formula, paid, tone, text, risk: c.risk };
}
