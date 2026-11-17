/**
 * Counting problems of the chapter that can be checked by listing: each
 * problem knows its answer by formula and can also list every way it
 * counts, so the learner sees the two agree.
 */

import { arrangements, combinations } from '../_shared/counting.js';

/**
 * @typedef {object} Problem
 * @property {string} id
 * @property {string} title short name for the picker
 * @property {string} prompt rich text
 * @property {number} answer
 * @property {string} unit what is counted, 'số', 'cách', 'ước'
 * @property {string} method how the formula gives the answer, rich text
 * @property {() => string[]} list every way, written out
 */

const DIGITS = [0, 1, 2, 3, 4, 5];
const FIVE = ['An', 'Bình', 'Chi', 'Dũng', 'Hà'];
const BOYS = ['Bảo', 'Cường', 'Đức', 'Khoa'];
const GIRLS = ['Hoa', 'Lan', 'Mai'];

/** @param {number[]} d */
const numberOf = (d) => d.join('');

/**
 * All strings of length n over the letters.
 * @param {string[]} letters @param {number} n
 * @returns {string[]}
 */
function words(letters, n) {
  if (n === 0) return [''];
  return words(letters, n - 1).flatMap((w) => letters.map((l) => w + l));
}

/** @type {Problem[]} */
export const PROBLEMS = [
  {
    id: 'so-ba-chu-so',
    title: 'Số có ba chữ số khác nhau',
    prompt: 'Từ các chữ số $1, 2, 3, 4$ lập được bao nhiêu số tự nhiên có ba chữ số khác nhau?',
    answer: 24,
    unit: 'số',
    method: 'Mỗi số là một chỉnh hợp chập $3$ của $4$: $A_4^3 = 4 \\cdot 3 \\cdot 2 = 24$.',
    list: () => arrangements([1, 2, 3, 4], 3).map(numberOf),
  },
  {
    id: 'so-chan',
    title: 'Số chẵn có chữ số 0',
    prompt:
      'Từ các chữ số $0, 1, 2, 3, 4, 5$ lập được bao nhiêu số tự nhiên chẵn có ba chữ số khác nhau?',
    answer: 52,
    unit: 'số',
    method:
      'Chữ số hàng đơn vị là $0$: $5 \\cdot 4 = 20$ số. Chữ số hàng đơn vị là $2$ hoặc $4$: $2 \\cdot 4 \\cdot 4 = 32$ số. Cộng lại: $20 + 32 = 52$.',
    list: () =>
      arrangements(DIGITS, 3)
        .filter((d) => d[0] !== 0 && d[2] % 2 === 0)
        .map(numberOf),
  },
  {
    id: 'lop-truong-lop-pho',
    title: 'Lớp trưởng và lớp phó',
    prompt:
      'Có bao nhiêu cách chọn một lớp trưởng và một lớp phó trong $5$ bạn An, Bình, Chi, Dũng, Hà?',
    answer: 20,
    unit: 'cách',
    method: 'Hai chức vụ khác nhau nên có xét thứ tự: $A_5^2 = 5 \\cdot 4 = 20$.',
    list: () => arrangements(FIVE, 2).map(([a, b]) => `LT ${a}, LP ${b}`),
  },
  {
    id: 'nhom-truc',
    title: 'Nhóm trực nhật',
    prompt: 'Có bao nhiêu cách chọn $3$ bạn trong $5$ bạn An, Bình, Chi, Dũng, Hà để trực nhật?',
    answer: 10,
    unit: 'cách',
    method:
      'Nhóm không phân biệt vai trò nên không xét thứ tự: $C_5^3 = \\dfrac{5 \\cdot 4 \\cdot 3}{3!} = 10$.',
    list: () => combinations(FIVE, 3).map((g) => `{${g.join(', ')}}`),
  },
  {
    id: 'co-nam-va-nu',
    title: 'Có cả nam và nữ',
    prompt:
      'Một tổ có $4$ bạn nam và $3$ bạn nữ. Có bao nhiêu cách chọn $3$ bạn sao cho có cả nam và nữ?',
    answer: 30,
    unit: 'cách',
    method:
      'Đếm phần bù: chọn tuỳ ý $C_7^3 = 35$ cách, bỏ đi $C_4^3 = 4$ cách toàn nam và $C_3^3 = 1$ cách toàn nữ: $35 - 4 - 1 = 30$.',
    list: () =>
      combinations([...BOYS, ...GIRLS], 3)
        .filter((g) => g.some((x) => BOYS.includes(x)) && g.some((x) => GIRLS.includes(x)))
        .map((g) => `{${g.join(', ')}}`),
  },
  {
    id: 'dong-xu',
    title: 'Hai lần ngửa',
    prompt:
      'Tung một đồng xu $4$ lần liên tiếp. Có bao nhiêu kết quả có đúng $2$ lần xuất hiện mặt ngửa (N)?',
    answer: 6,
    unit: 'kết quả',
    method: 'Chọn $2$ trong $4$ lần tung để là mặt ngửa: $C_4^2 = 6$.',
    list: () => words(['S', 'N'], 4).filter((w) => [...w].filter((c) => c === 'N').length === 2),
  },
  {
    id: 'uoc-72',
    title: 'Ước của 72',
    prompt: 'Số $72$ có bao nhiêu ước nguyên dương?',
    answer: 12,
    unit: 'ước',
    method: '$72 = 2^3 \\cdot 3^2$, ước có dạng $2^a \\cdot 3^b$: $(3 + 1)(2 + 1) = 12$.',
    list: () =>
      Array.from({ length: 72 }, (_, i) => i + 1)
        .filter((d) => 72 % d === 0)
        .map(String),
  },
  {
    id: 'hai-nu-canh-nhau',
    title: 'Hai bạn nữ đứng cạnh nhau',
    prompt:
      'Xếp $3$ bạn nam Bảo, Cường, Đức và $2$ bạn nữ Hoa, Lan thành một hàng ngang. Có bao nhiêu cách xếp để hai bạn nữ đứng cạnh nhau?',
    answer: 48,
    unit: 'cách',
    method:
      'Coi hai bạn nữ là một "khối": xếp khối và $3$ bạn nam có $4! = 24$ cách; trong khối, hai bạn nữ đổi chỗ được $2! = 2$ cách. Có $24 \\cdot 2 = 48$ cách.',
    list: () =>
      arrangements(['Bảo', 'Cường', 'Đức', 'Hoa', 'Lan'], 5)
        .filter((row) => Math.abs(row.indexOf('Hoa') - row.indexOf('Lan')) === 1)
        .map((row) => row.join(' ')),
  },
];

/**
 * What to say about a typed answer.
 * @param {Problem} problem @param {number | null} typed
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function judge(problem, typed) {
  if (typed === null) return { tone: 'warn', text: 'Hãy nhập một số tự nhiên.' };
  if (typed === problem.answer) {
    return { tone: 'ok', text: `Đúng rồi! ${problem.method} Bấm "Liệt kê" để kiểm tra lại.` };
  }
  return {
    tone: 'warn',
    text: `Chưa đúng: ${typed} ${problem.unit}. Thử xem bài toán có xét thứ tự không, có cần chia trường hợp không, rồi bấm "Liệt kê" để đếm trực tiếp.`,
  };
}

/**
 * The sentence after listing.
 * @param {Problem} problem
 */
export function listText(problem) {
  const count = problem.list().length;
  const verdict =
    count === problem.answer ? 'khớp với công thức' : `công thức cho ${problem.answer}`;
  return `Liệt kê được ${count} ${problem.unit}, ${verdict}: ${problem.method}`;
}
