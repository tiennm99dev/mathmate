/**
 * The quick estimating game: round the numbers, work out the estimate, then
 * compare it with the exact result, which the solution always gives. One
 * question of each part in a shuffled order: estimating a sum, a difference, a
 * product and a quotient, picking the reasonable result of a multiplication,
 * and judging a statement true or false by rounding up or down. Pure and
 * DOM-free.
 */
import { int, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { mixOptions, slipOptions } from '#lib/core/kid/quiz.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the game practises. */
export const KIND_LABELS = /** @type {const} */ ({
  cong: 'Ước lượng tổng',
  tru: 'Ước lượng hiệu',
  nhan: 'Ước lượng tích',
  chia: 'Ước lượng thương',
  'hop-li': 'Chọn kết quả hợp lí',
  'dung-sai': 'Đúng hay sai',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * A number close to a round one: `round` plus or minus a small step that
 * never changes how it rounds, never exactly `round`.
 * @param {() => number} rand
 * @param {number} round
 * @param {number} reach the largest step, below half the rounding unit
 */
function near(rand, round, reach) {
  const step = int(rand, 1, reach);
  return rand() < 0.5 ? round - step : round + step;
}

/**
 * Estimating a sum or a difference of numbers close to whole thousands.
 * @param {() => number} rand
 * @param {'cong' | 'tru'} kind
 * @returns {Question}
 */
export function sumQuestion(rand, kind) {
  const big = int(rand, 3, 9) * 1000;
  const small = int(rand, 1, big / 1000 - 1) * 1000;
  const first = kind === 'cong' ? int(rand, 1, 9) * 1000 : big;
  const second = kind === 'cong' ? int(rand, 1, 9) * 1000 : small;
  const a = near(rand, first, 90);
  const b = near(rand, second, 90);
  const sign = kind === 'cong' ? '+' : '−';
  const estimate = kind === 'cong' ? first + second : first - second;
  const exact = kind === 'cong' ? a + b : a - b;
  return {
    prompt: `${fmt(a)} ${sign} ${fmt(b)} được khoảng bao nhiêu?`,
    ...slipOptions(estimate, [], { near: [1000, -1000, 2000, -2000], min: 1000 }),
    hint: `Em làm tròn mỗi số đến hàng nghìn: ${fmt(a)} được khoảng ${fmt(first)}.`,
    solution: `${fmt(a)} làm tròn thành ${fmt(first)}, ${fmt(b)} làm tròn thành ${fmt(second)}. ${fmt(first)} ${sign} ${fmt(second)} = ${fmt(estimate)}. Kết quả đúng: ${fmt(a)} ${sign} ${fmt(b)} = ${fmt(exact)}, gần ${fmt(estimate)}.`,
    kind,
  };
}

/**
 * Estimating a product of two numbers close to whole tens.
 * @param {() => number} rand
 * @returns {Question}
 */
export function productQuestion(rand) {
  const x = int(rand, 2, 9) * 10;
  const y = int(rand, 2, 9) * 10;
  const a = near(rand, x, 2);
  const b = near(rand, y, 2);
  const estimate = x * y;
  return {
    prompt: `${a} × ${b} được khoảng bao nhiêu?`,
    ...slipOptions(estimate, [estimate / 10, estimate * 10], { near: [-100, 100] }),
    hint: `Em làm tròn mỗi thừa số đến hàng chục: ${a} được khoảng ${x}.`,
    solution: `${a} làm tròn thành ${x}, ${b} làm tròn thành ${y}. ${x} × ${y} = ${fmt(estimate)}. Kết quả đúng: ${a} × ${b} = ${fmt(a * b)}, gần ${fmt(estimate)}.`,
    kind: 'nhan',
  };
}

/**
 * Estimating a quotient: the divisor close to whole tens, the dividend close
 * to a whole number of tens of it, so the quotient is about a whole number of
 * tens.
 * @param {() => number} rand
 * @returns {Question}
 */
export function quotientQuestion(rand) {
  const tens = int(rand, 2, 9);
  const round = tens * 10;
  const q = int(rand, 2, 9) * 10;
  const n = near(rand, q * round, 9);
  const d = near(rand, round, 1);
  const estimate = q;
  const exact = Math.floor(n / d);
  const rest = n % d;
  const exactText = rest > 0 ? `${exact} (dư ${rest})` : String(exact);
  return {
    prompt: `${fmt(n)} : ${d} được khoảng bao nhiêu?`,
    ...mixOptions(rand, String(estimate), [String(estimate / 10), fmt(estimate * 10)]),
    hint: `Em làm tròn số chia ${d} thành ${round}, rồi tìm xem ${round} nhân với mấy chục thì gần ${fmt(n)}.`,
    solution: `${d} làm tròn thành ${round}, ${fmt(n)} gần ${fmt(q * round)}. ${fmt(q * round)} : ${round} = ${estimate}. Kết quả đúng: ${fmt(n)} : ${d} = ${exactText}, gần ${estimate}.`,
    kind: 'chia',
  };
}

/**
 * Picking the reasonable result of a two-digit multiplication. The slips are
 * the partial products added without the shift and the product with an extra
 * zero.
 * @param {() => number} rand
 * @returns {Question}
 */
export function reasonableQuestion(rand) {
  const a = int(rand, 2, 9) * 10 + int(rand, 1, 9);
  const b = int(rand, 1, 9) * 10 + int(rand, 1, 9);
  const product = a * b;
  const unshifted = a * (b % 10) + a * Math.floor(b / 10);
  const x = Math.round(a / 10) * 10;
  const y = Math.round(b / 10) * 10;
  return {
    prompt: `Kết quả nào của ${a} × ${b} là hợp lí?`,
    ...mixOptions(rand, fmt(product), [fmt(unshifted), fmt(product * 10)]),
    hint: `Em ước lượng: ${a} làm tròn thành ${x}, ${b} làm tròn thành ${y}, rồi tính ${x} × ${y}.`,
    solution: `${x} × ${y} = ${fmt(x * y)}, nên tích phải gần ${fmt(x * y)}. ${a} × ${b} = ${fmt(product)}.`,
    kind: 'hop-li',
  };
}

/**
 * Judging "a × b > R" or "a × b < R", where R is the product of the factors
 * rounded to tens, all up or all down.
 * @param {() => number} rand
 * @returns {Question}
 */
export function judgeQuestion(rand) {
  const up = rand() < 0.5;
  const x = int(rand, 2, 9) * 10;
  const y = int(rand, 2, 9) * 10;
  const a = up ? x - int(rand, 1, 4) : x + int(rand, 1, 4);
  const b = up ? y - int(rand, 1, 4) : y + int(rand, 1, 4);
  const bound = x * y;
  const more = rand() < 0.5;
  const holds = more ? a * b > bound : a * b < bound;
  const sign = more ? '>' : '<';
  const way = up ? 'lên' : 'xuống';
  const side = up ? 'bé hơn' : 'lớn hơn';
  return {
    prompt: `${a} × ${b} ${sign} ${fmt(bound)}. Đúng hay sai?`,
    options: ['Đúng', 'Sai'],
    answer: holds ? 0 : 1,
    hint: `Em làm tròn ${a} và ${b} ${way} đến hàng chục, rồi nhân.`,
    solution: `Làm tròn ${way}: ${x} × ${y} = ${fmt(bound)}. Cả hai thừa số đều được làm tròn ${way}, nên ${a} × ${b} ${side} ${fmt(bound)}. Thật vậy, ${a} × ${b} = ${fmt(a * b)}. Câu này ${holds ? 'đúng' : 'sai'}.`,
    kind: 'dung-sai',
  };
}

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  cong: (rand) => sumQuestion(rand, 'cong'),
  tru: (rand) => sumQuestion(rand, 'tru'),
  nhan: productQuestion,
  chia: quotientQuestion,
  'hop-li': reasonableQuestion,
  'dung-sai': judgeQuestion,
};

/**
 * One round: a question of each part, in a shuffled order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => MAKERS[kind](rand));
}
