/**
 * The chapter review quiz: multiple-choice questions on propositions and
 * sets, each followed by a picture that shows why the answer is right, a
 * number line for intervals or a Venn diagram for sets and conditions.
 */

import { shuffled } from '#lib/core/card-sorter.js';
import { combine, interval, setTex } from '../_shared/intervals.js';

/**
 * @typedef {{ name: string, set: import('../_shared/intervals.js').RealSet }} LineRow
 * @typedef {{ kind: 'line', rows: LineRow[] }} LineVisual
 * @typedef {{
 *   kind: 'venn',
 *   shade: { a?: boolean, both?: boolean, b?: boolean, out?: boolean },
 *   names: [string, string, string],
 *   nested?: boolean,
 *   items?: { a?: string[], both?: string[], b?: string[], out?: string[] },
 *   label: string,
 * }} VennVisual
 * @typedef {{
 *   id: string,
 *   prompt: string,
 *   options: string[],
 *   answer: number,
 *   why: string,
 *   visual: LineVisual | VennVisual,
 * }} QuizQuestion
 * Prompt, options and why are rich text.
 */

const A1 = [interval(-2, 3, true, true)];
const B1 = [interval(1, 5, false, false)];
const A2 = [interval(-Infinity, 1, false, true)];
const B2 = [interval(-1, 4, false, false)];
const A3 = [interval(0, 5, true, false)];
const B3 = [interval(2, Infinity, true, false)];
const A4 = [interval(-3, 2, false, true)];

/**
 * The options of an interval question: the right set first, then the
 * slips a learner makes (wrong bracket, wrong operation).
 * @param {import('../_shared/intervals.js').RealSet[]} sets
 */
const asOptions = (sets) => sets.map((s) => `$${setTex(s)}$`);

/** @type {QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: 'giao',
    prompt: 'Cho $A = [-2; 3]$ và $B = (1; 5)$. Tập $A \\cap B$ là',
    options: asOptions([
      combine(A1, B1, 'cap'),
      [interval(1, 3, true, true)],
      [interval(1, 3, false, false)],
      combine(A1, B1, 'cup'),
    ]),
    answer: 0,
    why: 'Phần chung gồm các số lớn hơn $1$ và không vượt quá $3$: $1 \\notin B$, $3 \\in A$ và $3 \\in B$.',
    visual: {
      kind: 'line',
      rows: [
        { name: 'A', set: A1 },
        { name: 'B', set: B1 },
        { name: 'A∩B', set: combine(A1, B1, 'cap') },
      ],
    },
  },
  {
    id: 'hop',
    prompt: 'Cho $A = (-\\infty; 1]$ và $B = (-1; 4)$. Tập $A \\cup B$ là',
    options: asOptions([
      combine(A2, B2, 'cup'),
      [interval(-Infinity, 4, false, true)],
      combine(A2, B2, 'cap'),
      [interval(-1, 4, false, false)],
    ]),
    answer: 0,
    why: 'Mọi số $\\le 1$ thuộc $A$, các số từ $1$ đến dưới $4$ thuộc $B$, còn $4$ không thuộc tập nào.',
    visual: {
      kind: 'line',
      rows: [
        { name: 'A', set: A2 },
        { name: 'B', set: B2 },
        { name: 'A∪B', set: combine(A2, B2, 'cup') },
      ],
    },
  },
  {
    id: 'hieu',
    prompt: 'Cho $A = [0; 5)$ và $B = [2; +\\infty)$. Tập $A \\setminus B$ là',
    options: asOptions([
      combine(A3, B3, 'diff'),
      [interval(0, 2, true, true)],
      combine(A3, B3, 'cap'),
      combine(A3, B3, 'rdiff'),
    ]),
    answer: 0,
    why: 'Bỏ khỏi $A$ các số $\\ge 2$; vì $2 \\in B$ nên $2$ cũng bị bỏ.',
    visual: {
      kind: 'line',
      rows: [
        { name: 'A', set: A3 },
        { name: 'B', set: B3 },
        { name: 'A\\B', set: combine(A3, B3, 'diff') },
      ],
    },
  },
  {
    id: 'phan-bu',
    prompt: 'Phần bù của $A = (-3; 2]$ trong $\\mathbb{R}$ là',
    options: asOptions([
      combine(A4, [], 'comp'),
      [interval(-Infinity, -3, false, false), interval(2, Infinity, true, false)],
      [interval(-Infinity, -3, false, false), interval(2, Infinity, false, false)],
      [interval(-3, 2, true, false)],
    ]),
    answer: 0,
    why: '$-3 \\notin A$ nên $-3$ thuộc phần bù; $2 \\in A$ nên $2$ không thuộc phần bù.',
    visual: {
      kind: 'line',
      rows: [
        { name: 'A', set: A4 },
        { name: 'CℝA', set: combine(A4, [], 'comp') },
      ],
    },
  },
  {
    id: 'dieu-kien',
    prompt:
      'Với số tự nhiên $n$, "$n$ chia hết cho $6$" là điều kiện gì để có "$n$ chia hết cho $3$"?',
    options: [
      'Điều kiện đủ',
      'Điều kiện cần',
      'Điều kiện cần và đủ',
      'Không là điều kiện cần, cũng không là điều kiện đủ',
    ],
    answer: 0,
    why: 'Mệnh đề "Nếu $n$ chia hết cho $6$ thì $n$ chia hết cho $3$" đúng, còn mệnh đề đảo sai ($n = 9$). Tập các số chia hết cho $6$ nằm trong tập các số chia hết cho $3$.',
    visual: {
      kind: 'venn',
      shade: { a: true },
      names: ['B(6)', 'B(3)', 'ℕ'],
      nested: true,
      items: { a: ['0; 6; 12; …'], b: ['3; 9; 15; …'] },
      label:
        'Biểu đồ Ven: tập các số chia hết cho 6 nằm trong tập các số chia hết cho 3; chẳng hạn 9 thuộc tập lớn mà không thuộc tập nhỏ.',
    },
  },
  {
    id: 'huu-han',
    prompt:
      'Cho $A = \\{1; 2; 3; 4\\}$ và $B = \\{3; 4; 5\\}$. Tập $A \\cup B$ có bao nhiêu phần tử?',
    options: ['$5$', '$7$', '$2$', '$6$'],
    answer: 0,
    why: '$A \\cup B = \\{1; 2; 3; 4; 5\\}$; hai phần tử chung $3$, $4$ chỉ được đếm một lần: $4 + 3 - 2 = 5$.',
    visual: {
      kind: 'venn',
      shade: { a: true, both: true, b: true },
      names: ['A', 'B', 'E'],
      items: { a: ['1; 2'], both: ['3; 4'], b: ['5'] },
      label:
        'Biểu đồ Ven: A riêng có 1 và 2, phần chung có 3 và 4, B riêng có 5; cả ba vùng được tô.',
    },
  },
  {
    id: 'vung-hieu',
    prompt:
      'Cho $A = \\{1; 2; 3; 4\\}$ và $B = \\{3; 4; 5\\}$. Tập hợp nào gồm các phần tử thuộc $B$ nhưng không thuộc $A$?',
    options: [
      '$B \\setminus A = \\{5\\}$',
      '$A \\setminus B = \\{1; 2\\}$',
      '$A \\cap B = \\{3; 4\\}$',
      '$A \\cup B = \\{1; 2; 3; 4; 5\\}$',
    ],
    answer: 0,
    why: 'Theo định nghĩa, $B \\setminus A$ gồm các phần tử thuộc $B$ mà không thuộc $A$: chỉ có $5$.',
    visual: {
      kind: 'venn',
      shade: { b: true },
      names: ['A', 'B', 'E'],
      items: { a: ['1; 2'], both: ['3; 4'], b: ['5'] },
      label: 'Biểu đồ Ven: chỉ tô phần của B nằm ngoài A, chứa phần tử 5.',
    },
  },
  {
    id: 'tap-con',
    prompt: 'Cho $A = [1; 4]$ và $B = (0; +\\infty)$. Khẳng định nào sau đây đúng?',
    options: ['$A \\subset B$', '$B \\subset A$', '$A = B$', '$A \\cap B = \\varnothing$'],
    answer: 0,
    why: 'Mọi $x$ với $1 \\le x \\le 4$ đều thoả mãn $x > 0$, nên $A \\subset B$; ngược lại $5 \\in B$ mà $5 \\notin A$.',
    visual: {
      kind: 'line',
      rows: [
        { name: 'A', set: [interval(1, 4, true, true)] },
        { name: 'B', set: [interval(0, Infinity, false, false)] },
      ],
    },
  },
];

/**
 * The order the options of question `index` are shown in: the same for
 * every visitor, so the prerendered page and the browser agree.
 * @param {QuizQuestion} q @param {number} index
 */
export function optionOrder(q, index) {
  return shuffled(
    q.options.map((_, i) => i),
    17 + 31 * index,
  );
}
