/**
 * The shopping challenge: everyday buying and selling worked out on the
 * pocket calculator, one step at a time. The child hands in what the screen
 * shows, and the step is checked against the exact answer. Pure and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {object} Step
 * @property {string} ask what to find
 * @property {number} value the answer, in đồng
 * @property {string} keys a way to press it, for the hint
 */

/**
 * @typedef {object} Challenge
 * @property {string} title
 * @property {string} story
 * @property {Step[]} steps
 */

/** The class's bracelet stall at the school fair, then a fan on sale. */
export const CHALLENGES = /** @type {Challenge[]} */ ([
  {
    title: 'Cô Hường mua vòng tay',
    story: 'Mỗi chiếc vòng tay giá 25 000 đồng. Cô Hường mua 7 chiếc.',
    steps: [{ ask: 'Cô Hường phải trả bao nhiêu tiền?', value: 175000, keys: '25000 × 7 =' }],
  },
  {
    title: 'Chú Hải được giảm giá',
    story:
      'Ai mua nhiều hơn 10 chiếc vòng tay thì được giảm 20%. Chú Hải mua 18 chiếc, mỗi chiếc 25 000 đồng.',
    steps: [
      { ask: 'Giá 18 chiếc vòng khi chưa giảm là bao nhiêu?', value: 450000, keys: '25000 × 18 =' },
      { ask: 'Chú Hải được giảm bao nhiêu tiền?', value: 90000, keys: '450000 × 20 %' },
      { ask: 'Chú Hải phải trả bao nhiêu tiền?', value: 360000, keys: '450000 − 90000 =' },
    ],
  },
  {
    title: 'Công ty mua số vòng còn lại',
    story:
      'Lớp làm 100 chiếc vòng. Cô Hường mua 7 chiếc, chú Hải mua 18 chiếc. Một công ty mua hết số vòng còn lại với giá 3 000 000 đồng.',
    steps: [
      { ask: 'Công ty trả mỗi chiếc vòng bao nhiêu tiền?', value: 40000, keys: '3000000 ÷ 75 =' },
    ],
  },
  {
    title: 'Quỹ từ thiện của lớp',
    story:
      'Lớp bán vòng được 175 000 đồng, 360 000 đồng và 3 000 000 đồng. Nhà trường ủng hộ thêm 20% số tiền lớp bán được.',
    steps: [
      {
        ask: 'Lớp bán vòng được tất cả bao nhiêu tiền?',
        value: 3535000,
        keys: '175000 + 360000 + 3000000 =',
      },
      { ask: 'Nhà trường ủng hộ bao nhiêu tiền?', value: 707000, keys: '3535000 × 20 %' },
      { ask: 'Quỹ từ thiện có tất cả bao nhiêu tiền?', value: 4242000, keys: '3535000 + 707000 =' },
    ],
  },
  {
    title: 'Mẹ mua quạt điện',
    story: 'Chiếc quạt điện giá 650 000 đồng, được giảm giá 12%.',
    steps: [
      { ask: 'Chiếc quạt được giảm bao nhiêu tiền?', value: 78000, keys: '650000 × 12 %' },
      { ask: 'Mẹ phải trả bao nhiêu tiền?', value: 572000, keys: '650000 − 78000 =' },
    ],
  },
]);

/**
 * Whether the number on the screen answers the step.
 * @param {Step} step
 * @param {number | null} shown
 */
export const isRight = (step, shown) => shown !== null && tidy(shown) === tidy(step.value);

/** @param {number} v */
export const moneyText = (v) => `${formatNumber(v)} đồng`;

/**
 * What the challenge says after a hand-in.
 * @param {Step} step
 * @param {number | null} shown
 * @param {number} misses misses on this step before this hand-in
 */
export function handInText(step, shown, misses) {
  if (shown === null) return 'Màn hình chưa có số. Em bấm ON/C rồi tính nhé.';
  if (isRight(step, shown)) return `Đúng rồi! Đáp số: ${moneyText(step.value)}.`;
  if (misses >= 1) return `Chưa đúng. Em thử bấm: ${step.keys}`;
  return `Màn hình hiện ${formatNumber(shown)}, chưa đúng. Em đọc lại đề và bấm lại nhé.`;
}
