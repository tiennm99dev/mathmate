/**
 * Review problems whose answers can be checked by simulation: each has its
 * probability counted with the chapter's tools and a random trial, so a
 * long run shows the relative frequency settling near the computed value.
 */

import { choose, drawIndices } from '../_shared/counting.js';
import { drawBalls, rollDice, tossCoins } from '../_shared/simulation.js';

const FRIENDS = ['An', 'Bình', 'Cường', 'Dũng'];

/** @type {import('../_shared/simulation.js').TrialProblem[]} */
export const REVIEW_PROBLEMS = [
  {
    id: 'tong-8',
    title: 'Tổng số chấm bằng 8',
    prompt: 'Gieo hai con xúc xắc cân đối. $E$: "Tổng số chấm xuất hiện bằng $8$".',
    favourable: 5,
    total: 36,
    method:
      '$n(\\Omega) = 36$; $E = \\{(2, 6); (3, 5); (4, 4); (5, 3); (6, 2)\\}$; $P(E) = \\dfrac{5}{36}$.',
    trial: (rand) => {
      const [a, b] = rollDice(rand, 2);
      return { hit: a + b === 8, text: `hai con xúc xắc cho (${a}, ${b}).` };
    },
  },
  {
    id: 'tong-chan',
    title: 'Tổng hai thẻ là số chẵn',
    prompt:
      'Rút ngẫu nhiên đồng thời $2$ tấm thẻ từ $9$ tấm thẻ đánh số từ $1$ đến $9$. $E$: "Tổng hai số ghi trên thẻ là số chẵn".',
    favourable: choose(5, 2) + choose(4, 2),
    total: choose(9, 2),
    method:
      '$n(\\Omega) = C_9^2 = 36$; hai thẻ cùng lẻ hoặc cùng chẵn: $n(E) = C_5^2 + C_4^2 = 16$; $P(E) = \\dfrac{16}{36} = \\dfrac{4}{9}$.',
    trial: (rand) => {
      const [a, b] = drawIndices(rand, 9, 2).map((i) => i + 1);
      return { hit: (a + b) % 2 === 0, text: `rút được thẻ ${a} và thẻ ${b}.` };
    },
  },
  {
    id: 'nam-nu',
    title: 'Có cả nam và nữ',
    prompt:
      'Một nhóm có $5$ bạn nam và $4$ bạn nữ. Chọn ngẫu nhiên $3$ bạn. $E$: "Trong $3$ bạn có cả nam và nữ".',
    favourable: choose(9, 3) - choose(5, 3) - choose(4, 3),
    total: choose(9, 3),
    method:
      '$n(\\Omega) = C_9^3 = 84$; $\\overline{E}$: "Toàn nam hoặc toàn nữ", $n(\\overline{E}) = C_5^3 + C_4^3 = 14$; $P(E) = 1 - \\dfrac{14}{84} = \\dfrac{5}{6}$.',
    trial: (rand) => {
      const group = drawBalls(
        rand,
        [
          ['nam', 5],
          ['nữ', 4],
        ],
        3,
      );
      return {
        hit: group.includes('nam') && group.includes('nữ'),
        text: `chọn được ${group.join(', ')}.`,
      };
    },
  },
  {
    id: 'canh-nhau',
    title: 'An và Bình đứng cạnh nhau',
    prompt:
      'Xếp ngẫu nhiên bốn bạn An, Bình, Cường, Dũng thành một hàng ngang. $E$: "An và Bình đứng cạnh nhau".',
    favourable: 12,
    total: 24,
    method:
      '$n(\\Omega) = 4! = 24$; coi An, Bình là một khối: $3! \\cdot 2! = 12$ cách; $P(E) = \\dfrac{12}{24} = \\dfrac{1}{2}$.',
    trial: (rand) => {
      const row = drawIndices(rand, 4, 4).map((i) => FRIENDS[i]);
      return {
        hit: Math.abs(row.indexOf('An') - row.indexOf('Bình')) === 1,
        text: `hàng là ${row.join(', ')}.`,
      };
    },
  },
  {
    id: 'bon-dong-xu',
    title: 'Đúng hai mặt ngửa',
    prompt:
      'Tung một đồng xu cân đối $4$ lần liên tiếp. $E$: "Có đúng $2$ lần xuất hiện mặt ngửa".',
    favourable: choose(4, 2),
    total: 16,
    method:
      '$n(\\Omega) = 2^4 = 16$; chọn $2$ trong $4$ lần tung là mặt ngửa: $n(E) = C_4^2 = 6$; $P(E) = \\dfrac{6}{16} = \\dfrac{3}{8}$.',
    trial: (rand) => {
      const w = tossCoins(rand, 4);
      return { hit: w.split('N').length - 1 === 2, text: `bốn lần tung cho ${w}.` };
    },
  },
];
