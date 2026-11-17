import { numTex } from '#lib/core/number-format.js';
import { annuityPresent, compoundAmount, instalment } from '../_shared/finance.js';

/**
 * @typedef {{ value: number, tex: string }} Outcome
 * @typedef {{
 *   id: string,
 *   label: string,
 *   story: string,
 *   options: [string, string],
 *   measure: string,
 *   better: 'less' | 'more',
 *   param: { label: string, min: number, max: number, step: number, start: number, unit: string },
 *   compute: (x: number) => [Outcome, Outcome],
 * }} Scenario
 * Each scenario compares two options A and B by one measure (interest paid,
 * money at the end, value today); `param` is the number the learner may
 * change after choosing, to see when the better option switches.
 */

const t3 = (/** @type {number} */ v) => numTex(v, 3);
const pct = (/** @type {number} */ x) => numTex(x / 100, 4);

/** @type {Scenario[]} */
export const SCENARIOS = [
  {
    id: 'vay-ngan-han',
    label: 'Vay ngắn hạn',
    story: 'Anh Nam cần vay $50$ triệu đồng và sẽ trả sau $6$ tháng.',
    options: [
      'A: lãi kép kì hạn $3$ tháng, lãi suất năm $9\\%$.',
      'B: lãi đơn, lãi suất năm theo thanh trượt (ban đầu $10\\%$).',
    ],
    measure: 'tiền lãi phải trả',
    better: 'less',
    param: { label: 'Lãi suất năm của B', min: 8, max: 11, step: 0.1, start: 10, unit: '%' },
    compute: (x) => {
      const a = compoundAmount(50, 0.09, 4, 0.5) - 50;
      const b = 50 * (x / 100) * 0.5;
      return [
        {
          value: a,
          tex: `$I_A = 50\\left[\\left(1 + \\dfrac{0{,}09}{4}\\right)^{2} - 1\\right] \\approx ${t3(a)}$`,
        },
        { value: b, tex: `$I_B = 50 \\cdot ${pct(x)} \\cdot 0{,}5 = ${t3(b)}$` },
      ];
    },
  },
  {
    id: 'gui-tiet-kiem',
    label: 'Gửi tiết kiệm',
    story: 'Bạn gửi $100$ triệu đồng trong $1$ năm và đang chọn giữa hai ngân hàng.',
    options: [
      'A: lãi suất năm $6\\%$, lãi kép hằng ngày.',
      'B: lãi suất năm theo thanh trượt (ban đầu $6{,}02\\%$), lãi kép hằng quý.',
    ],
    measure: 'số tiền nhận được sau $1$ năm',
    better: 'more',
    param: { label: 'Lãi suất năm của B', min: 5.9, max: 6.2, step: 0.01, start: 6.02, unit: '%' },
    compute: (x) => {
      const a = compoundAmount(100, 0.06, 365, 1);
      const b = compoundAmount(100, x / 100, 4, 1);
      return [
        {
          value: a,
          tex: `$A_A = 100\\left(1 + \\dfrac{0{,}06}{365}\\right)^{365} \\approx ${t3(a)}$`,
        },
        {
          value: b,
          tex: `$A_B = 100\\left(1 + \\dfrac{${pct(x)}}{4}\\right)^{4} \\approx ${t3(b)}$`,
        },
      ];
    },
  },
  {
    id: 'tra-gop',
    label: 'Trả góp',
    story: 'Chị Mai vay $300$ triệu đồng, trả góp đều hằng tháng.',
    options: [
      'A: trả trong $36$ tháng, lãi suất năm $9\\%$.',
      'B: trả trong $60$ tháng, lãi suất năm theo thanh trượt (ban đầu $8\\%$).',
    ],
    measure: 'tổng tiền lãi phải trả',
    better: 'less',
    param: { label: 'Lãi suất năm của B', min: 4, max: 10, step: 0.1, start: 8, unit: '%' },
    compute: (x) => {
      const pa = instalment(300, 0.09 / 12, 36);
      const pb = instalment(300, x / 100 / 12, 60);
      return [
        {
          value: 36 * pa - 300,
          tex: `$P_A \\approx ${t3(pa)}$, tiền lãi $36P_A - 300 \\approx ${t3(36 * pa - 300)}$`,
        },
        {
          value: 60 * pb - 300,
          tex: `$P_B \\approx ${t3(pb)}$, tiền lãi $60P_B - 300 \\approx ${t3(60 * pb - 300)}$`,
        },
      ];
    },
  },
  {
    id: 'nhan-thuong',
    label: 'Nhận thưởng',
    story:
      'Một giải thưởng cho hai cách nhận. Người nhận có thể đầu tư tiền với lãi kép theo năm, lãi suất theo thanh trượt (ban đầu $6\\%$).',
    options: [
      'A: nhận $500$ triệu đồng ngay hôm nay.',
      'B: nhận $60$ triệu đồng vào cuối mỗi năm trong $10$ năm.',
    ],
    measure: 'giá trị hiện tại',
    better: 'more',
    param: { label: 'Lãi suất đầu tư', min: 2, max: 10, step: 0.1, start: 6, unit: '%' },
    compute: (x) => {
      const b = annuityPresent(60, x / 100, 10);
      return [
        { value: 500, tex: '$V_A = 500$' },
        {
          value: b,
          tex: `$V_B = 60 \\cdot \\dfrac{1 - (1 + ${pct(x)})^{-10}}{${pct(x)}} \\approx ${t3(b)}$`,
        },
      ];
    },
  },
];

/**
 * Which option wins at `x`: 0 for A, 1 for B, null on a tie (to the
 * thousandth of a million đồng).
 * @param {Scenario} s
 * @param {number} x
 * @returns {0 | 1 | null}
 */
export function winner(s, x) {
  const [a, b] = s.compute(x);
  const d = Math.round((a.value - b.value) * 1000);
  if (d === 0) return null;
  const aBetter = s.better === 'less' ? d < 0 : d > 0;
  return aBetter ? 0 : 1;
}

/**
 * The feedback after the learner picks option `pick` at the scenario's
 * starting value.
 * @param {Scenario} s
 * @param {0 | 1} pick
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function judge(s, pick) {
  const w = winner(s, s.param.start);
  const name = w === 0 ? 'A' : 'B';
  const word = s.better === 'less' ? 'nhỏ hơn' : 'lớn hơn';
  if (w === pick) {
    return { tone: 'ok', text: `Đúng: phương án ${name} có ${s.measure} ${word}.` };
  }
  return {
    tone: 'warn',
    text: `Chưa đúng: tính ra thì phương án ${name} có ${s.measure} ${word}. Xem lời giải bên dưới.`,
  };
}

/**
 * The live comparison line at `x`, after the learner has chosen.
 * @param {Scenario} s
 * @param {number} x
 */
export function compareText(s, x) {
  const w = winner(s, x);
  if (w === null) return `Hai phương án có ${s.measure} như nhau.`;
  return `Với giá trị này, phương án ${w === 0 ? 'A' : 'B'} có lợi hơn.`;
}
