/**
 * Real-life situations for the chapter review. Each one fixes a two-level
 * tree (A, then B), which the learner fills in from the story before
 * computing P(B) by the total probability formula and P(A|B) by Bayes'
 * formula. Typed answers are probabilities: a decimal with a comma or a
 * fraction a/b.
 */

import { readProbability } from '#lib/core/fractions.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import { bayes, leafProbs, totalProb } from '../_shared/conditional.js';

/**
 * @typedef {object} Scenario
 * @property {string} id
 * @property {string} label
 * @property {string} story rich text
 * @property {string} a the event A, in words
 * @property {string} b the event B, in words
 * @property {string} ask the Bayes question, in words
 * @property {import('../_shared/conditional.js').Tree} tree
 */

/** @type {Scenario[]} */
export const SCENARIOS = [
  {
    id: 'mua',
    label: 'Trời mưa',
    story:
      'Xác suất một ngày trời mưa là $0{,}3$. Nếu trời mưa, xác suất bạn Minh đến lớp muộn là $0{,}4$; nếu trời không mưa, xác suất đó là $0{,}1$.',
    a: 'Trời mưa',
    b: 'Minh đến lớp muộn',
    ask: 'Biết hôm đó Minh đến lớp muộn, tính xác suất hôm đó trời mưa.',
    tree: { pA: 0.3, pBA: 0.4, pBnA: 0.1 },
  },
  {
    id: 'thu-rac',
    label: 'Thư rác',
    story:
      'Trong hộp thư của một công ty, $40\\%$ số thư là thư rác. Bộ lọc gắn nhãn "thư rác" cho $95\\%$ số thư rác và cho nhầm $2\\%$ số thư không phải thư rác.',
    a: 'Thư là thư rác',
    b: 'Thư bị gắn nhãn "thư rác"',
    ask: 'Một thư bị gắn nhãn "thư rác". Tính xác suất đó thật sự là thư rác.',
    tree: { pA: 0.4, pBA: 0.95, pBnA: 0.02 },
  },
  {
    id: 'xet-nghiem',
    label: 'Xét nghiệm',
    story:
      'Tỉ lệ mắc bệnh Y trong một vùng là $5\\%$. Một xét nghiệm cho kết quả dương tính với xác suất $0{,}98$ nếu người đó mắc bệnh, và với xác suất $0{,}04$ nếu người đó không mắc bệnh.',
    a: 'Người được xét nghiệm mắc bệnh Y',
    b: 'Kết quả xét nghiệm dương tính',
    ask: 'Một người có kết quả dương tính. Tính xác suất người đó mắc bệnh Y.',
    tree: { pA: 0.05, pBA: 0.98, pBnA: 0.04 },
  },
  {
    id: 'may',
    label: 'Hai máy',
    story:
      'Máy I sản xuất $60\\%$ và máy II sản xuất $40\\%$ số sản phẩm của một xưởng. Tỉ lệ sản phẩm lỗi của máy I là $2\\%$, của máy II là $3\\%$.',
    a: 'Sản phẩm do máy I sản xuất',
    b: 'Sản phẩm bị lỗi',
    ask: 'Lấy ngẫu nhiên một sản phẩm thì thấy nó bị lỗi. Tính xác suất sản phẩm đó do máy I sản xuất.',
    tree: { pA: 0.6, pBA: 0.02, pBnA: 0.03 },
  },
  {
    id: 'ban-sung',
    label: 'Bắn súng',
    story:
      'Một đội có $7$ xạ thủ loại I và $3$ xạ thủ loại II. Xạ thủ loại I bắn trúng đích với xác suất $0{,}9$, xạ thủ loại II với xác suất $0{,}6$. Chọn ngẫu nhiên một xạ thủ và cho bắn một viên.',
    a: 'Xạ thủ được chọn là loại I',
    b: 'Viên đạn trúng đích',
    ask: 'Biết viên đạn trúng đích, tính xác suất xạ thủ đã bắn là loại I.',
    tree: { pA: 0.7, pBA: 0.9, pBnA: 0.6 },
  },
];

/** @typedef {'pA' | 'pBA' | 'pBnA' | 'pB' | 'post'} Field */

/** The five boxes the learner fills in, in order. */
export const FIELDS = /** @type {const} */ ([
  { id: 'pA', label: 'P(A)' },
  { id: 'pBA', label: 'P(B|A)' },
  { id: 'pBnA', label: 'P(B|Ā)' },
  { id: 'pB', label: 'P(B)' },
  { id: 'post', label: 'P(A|B)' },
]);

/**
 * The exact value expected in a box.
 * @param {Scenario} s
 * @param {Field} field
 */
export function expected(s, field) {
  if (field === 'pB') return totalProb(s.tree);
  if (field === 'post') return bayes(s.tree) ?? 0;
  return s.tree[field];
}

/**
 * A typed probability: a decimal with a comma, a fraction a/b, or a
 * percentage such as '40%'.
 * @param {string} text
 */
export function readTyped(text) {
  const m = /^(.*?)\s*%\s*$/.exec(text);
  if (!m) return readProbability(text);
  const v = readProbability(m[1]);
  return v === null ? null : tidy(v / 100, 12);
}

/** @typedef {'empty' | 'invalid' | 'right' | 'wrong'} Verdict */

/**
 * Judges one typed box. P(A|B) may be typed exactly (a fraction) or rounded
 * to three decimals; every other box must be exact.
 * @param {Scenario} s
 * @param {Field} field
 * @param {string} text
 * @returns {Verdict}
 */
export function judge(s, field, text) {
  if (!text.trim()) return 'empty';
  const v = readTyped(text);
  if (v === null || v > 1) return 'invalid';
  const want = expected(s, field);
  const tol = field === 'post' ? 0.0005 + 1e-12 : 1e-9;
  return Math.abs(v - want) <= tol ? 'right' : 'wrong';
}

/**
 * The full solution of a situation, as rich text steps.
 * @param {Scenario} s
 */
export function solution(s) {
  const { pA, pBA, pBnA } = s.tree;
  const l = leafProbs(s.tree);
  const pB = totalProb(s.tree);
  const post = bayes(s.tree) ?? 0;
  const exact = Number.isInteger(tidy(post * 1000, 9));
  return [
    `$P(A) = ${numTex(pA)}$, $P(\\overline{A}) = ${numTex(tidy(1 - pA))}$, $P(B|A) = ${numTex(pBA)}$, $P(B|\\overline{A}) = ${numTex(pBnA)}$.`,
    `Công thức xác suất toàn phần: $P(B) = ${numTex(pA)} \\cdot ${numTex(pBA)} + ${numTex(tidy(1 - pA))} \\cdot ${numTex(pBnA)} = ${numTex(l.AB)} + ${numTex(l.nAB)} = ${numTex(pB)}$.`,
    `Công thức Bayes: $P(A|B) = \\dfrac{${numTex(l.AB)}}{${numTex(pB)}} ${exact ? '=' : '\\approx'} ${numTex(post, 3)}$.`,
  ];
}
