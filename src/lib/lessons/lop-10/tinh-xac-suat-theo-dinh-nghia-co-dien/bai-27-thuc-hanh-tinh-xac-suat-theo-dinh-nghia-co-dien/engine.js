/**
 * The experiments of the practice lesson, each with its probability counted
 * by combinations, a tree or the complement, and a random trial so the
 * relative frequency over thousands of trials can be compared with it.
 */

import { choose, drawIndices } from '../_shared/counting.js';
import { drawBalls, rollDice, tossCoins } from '../_shared/simulation.js';

const TICKET = [5, 12, 19, 23, 34, 41];
const FRIENDS = ['An', 'Bình', 'Cường'];

/** @param {string[]} balls */
const ballsText = (balls) => `lấy được bi ${balls.join(', ')}.`;

/** @type {import('../_shared/simulation.js').TrialProblem[]} */
export const PROBLEMS = [
  {
    id: 'bi-trang-den',
    title: 'Đúng một viên bi trắng',
    prompt:
      'Một túi có $6$ viên bi trắng và $3$ viên bi đen. Lấy ngẫu nhiên đồng thời $2$ viên bi. $E$: "Lấy được đúng $1$ viên bi trắng".',
    favourable: choose(6, 1) * choose(3, 1),
    total: choose(9, 2),
    method:
      '$n(\\Omega) = C_9^2 = 36$; $n(E) = C_6^1 \\cdot C_3^1 = 18$; $P(E) = \\dfrac{18}{36} = \\dfrac{1}{2}$.',
    trial: (rand) => {
      const balls = drawBalls(
        rand,
        [
          ['trắng', 6],
          ['đen', 3],
        ],
        2,
      );
      return { hit: balls.filter((b) => b === 'trắng').length === 1, text: ballsText(balls) };
    },
  },
  {
    id: 'ba-dong-xu',
    title: 'Ít nhất một mặt ngửa',
    prompt:
      'Tung ba đồng xu cân đối. $E$: "Có ít nhất một đồng xu xuất hiện mặt ngửa" ($S$: sấp, $N$: ngửa).',
    favourable: 7,
    total: 8,
    method:
      'Sơ đồ cây cho $n(\\Omega) = 2 \\cdot 2 \\cdot 2 = 8$; $\\overline{E} = \\{SSS\\}$ nên $P(E) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}$.',
    trial: (rand) => {
      const w = tossCoins(rand, 3);
      return { hit: w.includes('N'), text: `ba đồng xu cho ${w}.` };
    },
  },
  {
    id: 'bi-xanh',
    title: 'Ít nhất một viên bi xanh',
    prompt:
      'Một hộp có $4$ viên bi xanh, $3$ viên bi đỏ và $5$ viên bi vàng. Lấy ngẫu nhiên đồng thời $3$ viên bi. $E$: "Có ít nhất $1$ viên bi xanh".',
    favourable: choose(12, 3) - choose(8, 3),
    total: choose(12, 3),
    method:
      '$n(\\Omega) = C_{12}^3 = 220$; $\\overline{E}$: "Không có bi xanh", $n(\\overline{E}) = C_8^3 = 56$; $P(E) = 1 - \\dfrac{56}{220} = \\dfrac{41}{55}$.',
    trial: (rand) => {
      const balls = drawBalls(
        rand,
        [
          ['xanh', 4],
          ['đỏ', 3],
          ['vàng', 5],
        ],
        3,
      );
      return { hit: balls.includes('xanh'), text: ballsText(balls) };
    },
  },
  {
    id: 'xep-hang',
    title: 'Bình đứng giữa',
    prompt: 'Xếp ngẫu nhiên ba bạn An, Bình, Cường đứng thành một hàng dọc. $E$: "Bình đứng giữa".',
    favourable: 2,
    total: 6,
    method:
      '$n(\\Omega) = P_3 = 3! = 6$; Bình ở giữa, An và Cường đổi chỗ được $2! = 2$ cách: $P(E) = \\dfrac{2}{6} = \\dfrac{1}{3}$.',
    trial: (rand) => {
      const row = drawIndices(rand, 3, 3).map((i) => FRIENDS[i]);
      return { hit: row[1] === 'Bình', text: `hàng là ${row.join(', ')}.` };
    },
  },
  {
    id: 'hai-mat-sau',
    title: 'Hai mặt sáu chấm',
    prompt: 'Gieo hai con xúc xắc cân đối. $E$: "Cả hai con xúc xắc đều xuất hiện mặt $6$ chấm".',
    favourable: 1,
    total: 36,
    method:
      'Bảng hai chiều $6 \\times 6$ cho $n(\\Omega) = 36$; chỉ có $(6, 6)$ thuận lợi: $P(E) = \\dfrac{1}{36}$.',
    trial: (rand) => {
      const [a, b] = rollDice(rand, 2);
      return { hit: a === 6 && b === 6, text: `hai con xúc xắc cho (${a}, ${b}).` };
    },
  },
  {
    id: 'xo-so',
    title: 'Trúng cả 6 số',
    prompt:
      'Chọn ngẫu nhiên $6$ số khác nhau trong các số từ $1$ đến $45$. $E$: "Sáu số chọn được đúng là $5, 12, 19, 23, 34, 41$".',
    favourable: 1,
    total: choose(45, 6),
    method:
      '$n(\\Omega) = C_{45}^6 = 8\\,145\\,060$; $n(E) = 1$; $P(E) = \\dfrac{1}{8\\,145\\,060} \\approx 0{,}000000123$.',
    trial: (rand) => {
      const picked = drawIndices(rand, 45, 6)
        .map((i) => i + 1)
        .sort((a, b) => a - b);
      return {
        hit: picked.every((x, i) => x === TICKET[i]),
        text: `chọn được ${picked.join(', ')}.`,
      };
    },
  },
];
