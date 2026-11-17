/**
 * The sample-space board of the lesson: three random experiments with
 * equally likely outcomes, events written in words, and the checks for the
 * outcomes a learner marks as favourable to E or to its complement Ē.
 */

import { probabilityTex } from '../_shared/counting.js';

/**
 * @typedef {object} Outcome
 * @property {string} key
 * @property {string} label how the outcome is written, '(3, 4)', '12', 'SNS'
 * @property {number[]} faces dice faces or the card number
 * @property {string} coins coin sides, 'S' or 'N' each
 */

/**
 * @typedef {object} GameEvent
 * @property {string} id
 * @property {string} text E in words
 * @property {string} opposite Ē in words
 * @property {(o: Outcome) => boolean} holds
 */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} title
 * @property {string} prompt the experiment, rich text
 * @property {string} omega Ω written out or described, rich text
 * @property {number} columns columns of the board
 * @property {string} [rowLabel] what the rows stand for, when they mean something
 * @property {string} [colLabel]
 * @property {Outcome[]} outcomes
 * @property {GameEvent[]} events
 */

const FACES = [1, 2, 3, 4, 5, 6];
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19];

/** @type {Outcome[]} */
const DICE = FACES.flatMap((i) =>
  FACES.map((j) => ({ key: `${i},${j}`, label: `(${i}, ${j})`, faces: [i, j], coins: '' })),
);

/** @type {Outcome[]} */
const CARDS = Array.from({ length: 20 }, (_, i) => ({
  key: String(i + 1),
  label: String(i + 1),
  faces: [i + 1],
  coins: '',
}));

/** @type {Outcome[]} */
const COINS = ['SSS', 'SSN', 'SNS', 'SNN', 'NSS', 'NSN', 'NNS', 'NNN'].map((w) => ({
  key: w,
  label: w,
  faces: [],
  coins: w,
}));

/** @param {Outcome} o */
const sum = (o) => o.faces[0] + o.faces[1];
/** @param {Outcome} o */
const heads = (o) => [...o.coins].filter((c) => c === 'N').length;

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'xuc-xac',
    title: 'Hai con xúc xắc',
    prompt:
      'Gieo hai con xúc xắc cân đối. Kết quả $(i, j)$: $i$ là số chấm của con thứ nhất, $j$ là số chấm của con thứ hai.',
    omega: '$\\Omega = \\{(i, j) \\mid 1 \\le i, j \\le 6\\}$, $n(\\Omega) = 36$.',
    columns: 6,
    rowLabel: 'Con thứ nhất',
    colLabel: 'Con thứ hai',
    outcomes: DICE,
    events: [
      {
        id: 'tong-7',
        text: 'Tổng số chấm bằng $7$',
        opposite: 'Tổng số chấm khác $7$',
        holds: (o) => sum(o) === 7,
      },
      {
        id: 'bang-nhau',
        text: 'Hai con xúc xắc xuất hiện cùng số chấm',
        opposite: 'Hai con xúc xắc xuất hiện số chấm khác nhau',
        holds: (o) => o.faces[0] === o.faces[1],
      },
      {
        id: 'co-mat-6',
        text: 'Có ít nhất một con xúc xắc xuất hiện mặt $6$ chấm',
        opposite: 'Không con nào xuất hiện mặt $6$ chấm',
        holds: (o) => o.faces.includes(6),
      },
      {
        id: 'tich-chan',
        text: 'Tích hai số chấm là số chẵn',
        opposite: 'Tích hai số chấm là số lẻ',
        holds: (o) => (o.faces[0] * o.faces[1]) % 2 === 0,
      },
      {
        id: 'tong-nho-13',
        text: 'Tổng số chấm nhỏ hơn $13$',
        opposite: 'Tổng số chấm không nhỏ hơn $13$',
        holds: (o) => sum(o) < 13,
      },
      {
        id: 'tong-13',
        text: 'Tổng số chấm bằng $13$',
        opposite: 'Tổng số chấm khác $13$',
        holds: (o) => sum(o) === 13,
      },
    ],
  },
  {
    id: 'the-so',
    title: 'Rút một tấm thẻ',
    prompt: 'Một hộp có $20$ tấm thẻ đánh số từ $1$ đến $20$. Rút ngẫu nhiên một tấm thẻ.',
    omega: '$\\Omega = \\{1; 2; 3; \\ldots; 20\\}$, $n(\\Omega) = 20$.',
    columns: 5,
    outcomes: CARDS,
    events: [
      {
        id: 'chia-het-3',
        text: 'Số ghi trên thẻ chia hết cho $3$',
        opposite: 'Số ghi trên thẻ không chia hết cho $3$',
        holds: (o) => o.faces[0] % 3 === 0,
      },
      {
        id: 'nguyen-to',
        text: 'Số ghi trên thẻ là số nguyên tố',
        opposite: 'Số ghi trên thẻ không phải là số nguyên tố',
        holds: (o) => PRIMES.includes(o.faces[0]),
      },
      {
        id: 'chinh-phuong',
        text: 'Số ghi trên thẻ là số chính phương',
        opposite: 'Số ghi trên thẻ không phải là số chính phương',
        holds: (o) => Number.isInteger(Math.sqrt(o.faces[0])),
      },
      {
        id: 'lon-hon-14',
        text: 'Số ghi trên thẻ lớn hơn $14$',
        opposite: 'Số ghi trên thẻ không lớn hơn $14$',
        holds: (o) => o.faces[0] > 14,
      },
    ],
  },
  {
    id: 'dong-xu',
    title: 'Ba đồng xu',
    prompt:
      'Tung một đồng xu cân đối ba lần liên tiếp. Kết quả ghi theo thứ tự ba lần tung, $S$ là mặt sấp, $N$ là mặt ngửa.',
    omega: '$\\Omega = \\{SSS; SSN; SNS; SNN; NSS; NSN; NNS; NNN\\}$, $n(\\Omega) = 8$.',
    columns: 4,
    outcomes: COINS,
    events: [
      {
        id: 'dung-hai-ngua',
        text: 'Có đúng hai lần xuất hiện mặt ngửa',
        opposite: 'Số lần xuất hiện mặt ngửa khác $2$',
        holds: (o) => heads(o) === 2,
      },
      {
        id: 'it-nhat-mot-ngua',
        text: 'Có ít nhất một lần xuất hiện mặt ngửa',
        opposite: 'Cả ba lần đều xuất hiện mặt sấp',
        holds: (o) => heads(o) >= 1,
      },
      {
        id: 'cung-mat',
        text: 'Ba lần tung xuất hiện cùng một mặt',
        opposite: 'Ba lần tung không xuất hiện cùng một mặt',
        holds: (o) => o.coins === 'SSS' || o.coins === 'NNN',
      },
    ],
  },
];

/**
 * The keys of the outcomes favourable to E, or to Ē when `opposite`.
 * @param {Experiment} exp
 * @param {GameEvent} event
 * @param {boolean} opposite
 */
export function favourableKeys(exp, event, opposite) {
  return exp.outcomes.filter((o) => event.holds(o) !== opposite).map((o) => o.key);
}

/**
 * The event's letter in TeX.
 * @param {boolean} opposite
 */
export const letterTex = (opposite) => (opposite ? '\\overline{E}' : 'E');

/**
 * Judges the marked outcomes against the event.
 * @param {Experiment} exp
 * @param {GameEvent} event
 * @param {boolean} opposite
 * @param {string[]} marked
 * @returns {{ ok: boolean, text: string }}
 */
export function checkMarks(exp, event, opposite, marked) {
  const want = new Set(favourableKeys(exp, event, opposite));
  const missing = [...want].filter((k) => !marked.includes(k)).length;
  const extra = marked.filter((k) => !want.has(k)).length;
  const name = letterTex(opposite);
  if (missing === 0 && extra === 0) {
    return { ok: true, text: `Đúng! ${summaryText(exp, event, opposite)}` };
  }
  const parts = [];
  if (extra > 0) parts.push(`có ${extra} kết quả đã tô không thuận lợi cho $${name}$`);
  if (missing > 0) parts.push(`còn thiếu ${missing} kết quả thuận lợi cho $${name}$`);
  return { ok: false, text: `Chưa đúng: ${parts.join(', ')}. Hãy xem lại từng ô.` };
}

/**
 * n(E), n(Ω) and P(E) once the marks are right, with the special cases of
 * the certain and the impossible event.
 * @param {Experiment} exp
 * @param {GameEvent} event
 * @param {boolean} opposite
 */
export function summaryText(exp, event, opposite) {
  const k = favourableKeys(exp, event, opposite).length;
  const n = exp.outcomes.length;
  const name = letterTex(opposite);
  const base = `$n(${name}) = ${k}$, $n(\\Omega) = ${n}$, nên $${probabilityTex(k, n, name)}$.`;
  if (k === 0) return `${base} $${name} = \\varnothing$ là biến cố không thể.`;
  if (k === n) return `${base} $${name} = \\Omega$ là biến cố chắc chắn.`;
  return base;
}

/**
 * What one random trial gave and whether E (or Ē) happened.
 * @param {GameEvent} event
 * @param {boolean} opposite
 * @param {Outcome} o
 */
export function trialText(event, opposite, o) {
  const happened = event.holds(o) !== opposite;
  const name = letterTex(opposite);
  return `Kết quả ${o.label}: biến cố $${name}$ ${happened ? 'xảy ra' : 'không xảy ra'}, vì ${o.label} ${happened ? 'là' : 'không phải là'} kết quả thuận lợi cho $${name}$.`;
}
