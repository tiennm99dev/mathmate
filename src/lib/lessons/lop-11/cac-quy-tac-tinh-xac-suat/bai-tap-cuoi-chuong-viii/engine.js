/**
 * Logic of the review widget: chapter problems the learner solves with the
 * addition and multiplication rules, each with a random experiment that a
 * Monte Carlo run repeats to check the computed probability.
 */

import { readProbability } from '#lib/core/fractions.js';
import { isShortDecimal, runTrials } from '../_shared/probability.js';

/**
 * @typedef {object} Problem
 * @property {string} id
 * @property {string} label short name for the picker
 * @property {string} text the problem, rich text
 * @property {number} answer the exact probability
 * @property {string[]} steps the worked solution, rich text
 * @property {(rand: () => number) => boolean} trial one run of the experiment: did the event happen?
 */

/**
 * k distinct indices out of n, drawn at random.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} k
 */
function drawDistinct(rand, n, k) {
  const pool = Array.from({ length: n }, (_, i) => i);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(rand() * (n - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, k);
}

/** @param {() => number} rand */
const die = (rand) => 1 + Math.floor(rand() * 6);

/** @type {Problem[]} */
export const PROBLEMS = [
  {
    id: 'xa-thu',
    label: 'Hai xạ thủ',
    text: 'Hai xạ thủ bắn độc lập vào một bia, mỗi người một viên, xác suất bắn trúng lần lượt là $0{,}8$ và $0{,}7$. Tính xác suất bia bị trúng ít nhất một viên.',
    answer: 0.94,
    steps: [
      '$A$, $B$: xạ thủ thứ nhất, thứ hai bắn trúng; $A$, $B$ độc lập nên $\\overline{A}$, $\\overline{B}$ độc lập.',
      '$P(\\overline{A}\\,\\overline{B}) = 0{,}2 \\cdot 0{,}3 = 0{,}06$, nên $P(A \\cup B) = 1 - 0{,}06 = 0{,}94$.',
    ],
    trial: (rand) => {
      const first = rand() < 0.8;
      const second = rand() < 0.7;
      return first || second;
    },
  },
  {
    id: 'mat-sau',
    label: 'Mặt 6 chấm',
    text: 'Gieo một con xúc xắc cân đối hai lần. Tính xác suất có ít nhất một lần xuất hiện mặt $6$ chấm.',
    answer: 11 / 36,
    steps: [
      'Biến cố đối "không lần nào ra mặt $6$" có xác suất $\\dfrac{5}{6} \\cdot \\dfrac{5}{6} = \\dfrac{25}{36}$ (hai lần gieo độc lập).',
      'Xác suất cần tìm: $1 - \\dfrac{25}{36} = \\dfrac{11}{36}$.',
    ],
    trial: (rand) => {
      const a = die(rand);
      const b = die(rand);
      return a === 6 || b === 6;
    },
  },
  {
    id: 'hai-hop',
    label: 'Bi ở hai hộp',
    text: 'Hộp thứ nhất có $3$ bi đỏ, $2$ bi xanh; hộp thứ hai có $4$ bi đỏ, $6$ bi xanh. Lấy ngẫu nhiên từ mỗi hộp một viên. Tính xác suất hai viên bi cùng màu.',
    answer: 0.48,
    steps: [
      'Hai lần lấy độc lập: cùng đỏ có xác suất $0{,}6 \\cdot 0{,}4 = 0{,}24$, cùng xanh có xác suất $0{,}4 \\cdot 0{,}6 = 0{,}24$.',
      'Hai biến cố này xung khắc: $P = 0{,}24 + 0{,}24 = 0{,}48$.',
    ],
    trial: (rand) => rand() < 0.6 === rand() < 0.4,
  },
  {
    id: 'the-so',
    label: 'Thẻ chia hết',
    text: 'Rút ngẫu nhiên một tấm thẻ từ hộp có $30$ tấm thẻ đánh số từ $1$ đến $30$. Tính xác suất số trên thẻ chia hết cho $2$ hoặc chia hết cho $3$.',
    answer: 2 / 3,
    steps: [
      'Có $15$ số chia hết cho $2$, $10$ số chia hết cho $3$, $5$ số chia hết cho cả hai (chia hết cho $6$).',
      'Công thức cộng: $P = \\dfrac{15}{30} + \\dfrac{10}{30} - \\dfrac{5}{30} = \\dfrac{20}{30} = \\dfrac{2}{3}$.',
    ],
    trial: (rand) => {
      const n = 1 + Math.floor(rand() * 30);
      return n % 2 === 0 || n % 3 === 0;
    },
  },
  {
    id: 'mot-hop',
    label: 'Hai bi một hộp',
    text: 'Một hộp có $4$ bi đỏ và $5$ bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất hai viên bi cùng màu.',
    answer: 4 / 9,
    steps: [
      '$n(\\Omega) = \\mathrm{C}_9^2 = 36$; hai bi cùng đỏ: $\\mathrm{C}_4^2 = 6$ cách, cùng xanh: $\\mathrm{C}_5^2 = 10$ cách.',
      'Hai biến cố xung khắc: $P = \\dfrac{6}{36} + \\dfrac{10}{36} = \\dfrac{16}{36} = \\dfrac{4}{9}$.',
    ],
    trial: (rand) => {
      // balls 0..3 are red, 4..8 are blue
      const [x, y] = drawDistinct(rand, 9, 2);
      return x < 4 === y < 4;
    },
  },
];

/**
 * How many times the event happened in `trials` runs.
 * @param {Problem} problem
 * @param {() => number} rand
 * @param {number} trials
 */
export function runProblem(problem, rand, trials) {
  return runTrials(rand, trials, (r) => (problem.trial(r) ? 'yes' : 'no')).get('yes') ?? 0;
}

/**
 * Checks the probability the learner typed. A decimal that only rounds to an
 * answer with no short decimal form (0,31 for 11/36) is 'close': right
 * working, but the exact value needs a fraction.
 * @param {string} text
 * @param {number} answer
 * @returns {'ok' | 'close' | 'wrong' | 'empty' | 'invalid'}
 */
export function checkTyped(text, answer) {
  if (!text.trim()) return 'empty';
  const v = readProbability(text);
  if (v === null) return 'invalid';
  if (Math.abs(v - answer) < 1e-9) return 'ok';
  const rounded = !text.includes('/') && !isShortDecimal(answer);
  return rounded && Math.abs(v - answer) < 0.005 ? 'close' : 'wrong';
}
