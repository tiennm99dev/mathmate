/**
 * Statistical data sequences (dãy số liệu thống kê) of grade 4: reading a
 * sequence (how many numbers, the k-th number, the largest and the smallest,
 * how many are above a value), putting it in order, and the questions a
 * child answers about one. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/**
 * @typedef {object} Sequence
 * @property {string} id
 * @property {string} title what the numbers are about
 * @property {string} unit what each number counts ("bàn thắng", "km"), may be ''
 * @property {string[]} labels who or when each number belongs to
 * @property {number[]} values the numbers in the order they were written down
 */

/** @typedef {'tang' | 'giam'} Direction */

/** Sentences for the two orders. */
export const DIRECTIONS = /** @type {const} */ ({
  tang: 'từ bé đến lớn',
  giam: 'từ lớn đến bé',
});

/**
 * The book's sequences, kept in the order they were written down.
 * @type {readonly Sequence[]}
 */
export const SEQUENCES = [
  {
    id: 'ban-thang',
    title: 'Số bàn thắng của Nam, Việt, Rô-bốt và Dũng',
    unit: 'bàn thắng',
    labels: ['Nam', 'Việt', 'Rô-bốt', 'Dũng'],
    values: [7, 6, 2, 4],
  },
  {
    id: 'doc-sach',
    title: 'Số cuốn sách năm bạn đọc trong tháng',
    unit: 'cuốn sách',
    labels: ['Mai', 'Nam', 'Hà', 'Việt', 'Lan'],
    values: [5, 13, 1, 8, 4],
  },
  {
    id: 'dap-xe',
    title: 'Quãng đường Rô-bốt đạp xe từ thứ Hai đến thứ Sáu',
    unit: 'km',
    labels: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
    values: [1, 2, 2, 2, 3],
  },
  {
    id: 'chu-cai',
    title: 'Số chữ cái trong tên các bạn tổ 1',
    unit: 'chữ cái',
    labels: ['Minh', 'Lan', 'An', 'Mai', 'Hùng', 'Khánh', 'Nam', 'Trang'],
    values: [4, 3, 2, 3, 4, 5, 3, 5],
  },
];

/**
 * The numbers written the way the book lists a sequence: '7, 6, 2, 4'.
 * @param {readonly number[]} values
 */
export function listText(values) {
  return values.map(fmt).join(', ');
}

/**
 * Whether the numbers already stand in the order `dir` (equal neighbours are
 * allowed, as in 1, 2, 2, 2, 3).
 * @param {readonly number[]} values
 * @param {Direction} dir
 */
export function isOrdered(values, dir) {
  for (let i = 1; i < values.length; i++) {
    if (dir === 'tang' ? values[i] < values[i - 1] : values[i] > values[i - 1]) return false;
  }
  return true;
}

/**
 * The numbers sorted in the order `dir`.
 * @param {readonly number[]} values
 * @param {Direction} dir
 */
export function sortedValues(values, dir) {
  return [...values].sort((a, b) => (dir === 'tang' ? a - b : b - a));
}

/**
 * The order with the card at `from` taken out and put in at `to`, the others
 * sliding over, as when a card is dragged along a row.
 * @param {readonly number[]} order
 * @param {number} from
 * @param {number} to
 */
export function moveCard(order, from, to) {
  if (from === to || from < 0 || to < 0 || from >= order.length || to >= order.length) {
    return [...order];
  }
  const next = [...order];
  const [card] = next.splice(from, 1);
  next.splice(to, 0, card);
  return next;
}

/**
 * The order with the cards at `a` and `b` swapped, for tap-and-tap sorting.
 * @param {readonly number[]} order
 * @param {number} a
 * @param {number} b
 */
export function swapCards(order, a, b) {
  const next = [...order];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

/**
 * How many pairs of neighbours still stand the wrong way round.
 * @param {readonly number[]} values
 * @param {Direction} dir
 */
export function wrongPairs(values, dir) {
  let n = 0;
  for (let i = 1; i < values.length; i++) {
    if (dir === 'tang' ? values[i] < values[i - 1] : values[i] > values[i - 1]) n += 1;
  }
  return n;
}

/**
 * The live sentence under the sorting row.
 * @param {readonly number[]} values the numbers in the row's current order
 * @param {Direction} dir
 */
export function sortMessage(values, dir) {
  if (isOrdered(values, dir)) {
    const first = dir === 'tang' ? 'bé nhất' : 'lớn nhất';
    const last = dir === 'tang' ? 'lớn nhất' : 'bé nhất';
    return `Đúng rồi! Dãy ${DIRECTIONS[dir]}: ${listText(values)}. Số đầu tiên là số ${first}, số cuối cùng là số ${last}.`;
  }
  const n = wrongPairs(values, dir);
  return `Còn ${n} chỗ hai số cạnh nhau chưa đúng thứ tự ${DIRECTIONS[dir]}.`;
}

/**
 * The value above which some but not all numbers lie, for "how many are more
 * than ...": one of the numbers of the sequence other than the largest.
 * @param {() => number} rand
 * @param {readonly number[]} values
 */
export function thresholdOf(rand, values) {
  const distinct = [...new Set(values)].sort((a, b) => a - b);
  return pick(rand, distinct.slice(0, -1));
}

/**
 * Distinct wrong number options taken from the sequence and its neighbours.
 * @param {number} right
 * @param {readonly number[]} values
 */
function otherValues(right, values) {
  return [...new Set([...values, right + 1, right - 1])]
    .filter((v) => v !== right && v >= 0)
    .map(fmt);
}

/**
 * The five questions on one sequence: how many numbers, the k-th number, the
 * largest, the smallest and how many are more than a value.
 * @param {Sequence} seq
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion[]}
 */
export function sequenceQuestions(seq, rand) {
  const { values } = seq;
  const n = values.length;
  const k = int(rand, 2, n);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const t = thresholdOf(rand, values);
  const above = values.filter((v) => v > t).length;
  const three = (/** @type {number} */ right) =>
    mixOptions(rand, fmt(right), shuffle(rand, otherValues(right, values)).slice(0, 3));
  return [
    {
      prompt: 'Dãy số liệu có tất cả bao nhiêu số?',
      ...numberOptions(rand, n, 1, 12),
      hint: 'Em đếm từng số trong dãy, mỗi số một lần, kể cả các số giống nhau.',
      solution: `Dãy ${listText(values)} có ${n} số.`,
    },
    {
      prompt: `Số thứ ${k} trong dãy là số nào?`,
      ...three(values[k - 1]),
      hint: `Em đếm từ trái sang phải: số thứ nhất, số thứ hai, … đến số thứ ${k}.`,
      solution: `Số thứ ${k} trong dãy là ${fmt(values[k - 1])}.`,
    },
    {
      prompt: 'Số lớn nhất trong dãy là số nào?',
      ...three(max),
      hint: 'Em so sánh các số. Sắp xếp từ bé đến lớn thì số lớn nhất đứng cuối.',
      solution: `Số lớn nhất trong dãy là ${fmt(max)}.`,
    },
    {
      prompt: 'Số bé nhất trong dãy là số nào?',
      ...three(min),
      hint: 'Em so sánh các số. Sắp xếp từ bé đến lớn thì số bé nhất đứng đầu.',
      solution: `Số bé nhất trong dãy là ${fmt(min)}.`,
    },
    {
      prompt: `Trong dãy có bao nhiêu số lớn hơn ${fmt(t)}?`,
      ...slipOptions(above, [above + 1, above - 1, n - above], { min: 0, max: n }),
      hint: `Em đi qua từng số, số nào lớn hơn ${fmt(t)} thì đếm.`,
      solution: `Các số lớn hơn ${fmt(t)} là ${listText(values.filter((v) => v > t))}. Có ${above} số.`,
    },
  ];
}
