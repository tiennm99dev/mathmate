/**
 * Finding a percentage of a number the book's way: multiply the number by a
 * and divide by 100. The pretend shop takes a% off a price; the quiz asks
 * a% of a number in everyday stories. Pure and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';
import { shuffle } from '#lib/core/drill.js';

/**
 * @typedef {object} Item
 * @property {import('#lib/core/kid/pictures/index.js').PictureName} picture
 * @property {string} name
 * @property {number} price in đồng
 */

/** The shop's shelf. Every price is a multiple of 20 000, so 5% steps stay whole. */
export const ITEMS = /** @type {Item[]} */ ([
  { picture: 'ball', name: 'Quả bóng', price: 120000 },
  { picture: 'pencil', name: 'Hộp bút chì', price: 60000 },
  { picture: 'cube', name: 'Khối ru-bích', price: 80000 },
  { picture: 'balloon', name: 'Chùm bóng bay', price: 40000 },
]);

/** The discount slider: 0% to 50% in steps of 5%. */
export const MAX_OFF = 50;
export const STEP_OFF = 5;

/**
 * a% of b: b × a : 100.
 * @param {number} b
 * @param {number} a
 */
export const percentValue = (b, a) => tidy((b * a) / 100);

/**
 * The money taken off and the new price.
 * @param {number} price
 * @param {number} a
 */
export function discount(price, a) {
  const off = percentValue(price, a);
  return { off, pay: tidy(price - off) };
}

/**
 * The two lines the book writes for a discount.
 * @param {number} price
 * @param {number} a
 */
export function discountLines(price, a) {
  const { off, pay } = discount(price, a);
  return [
    `Số tiền được giảm: ${formatNumber(price)} × ${formatNumber(a)} : 100 = ${formatNumber(off)} (đồng)`,
    `Giá sau khi giảm: ${formatNumber(price)} − ${formatNumber(off)} = ${formatNumber(pay)} (đồng)`,
  ];
}

/**
 * The sentence under the price tag.
 * @param {Item} item
 * @param {number} a
 */
export function shopNote(item, a) {
  if (a === 0) return `${item.name} chưa được giảm giá. Em kéo thanh để giảm giá nhé.`;
  const { off, pay } = discount(item.price, a);
  return `Giảm ${formatNumber(a)}%: bớt ${formatNumber(off)} đồng, còn ${formatNumber(pay)} đồng.`;
}

/**
 * @typedef {object} Story
 * @property {number} b the number
 * @property {number} a the percentage
 * @property {string} unit
 * @property {string} story
 * @property {string} ask
 */

/** Everyday stories from the book: a% of b. */
export const STORIES = /** @type {Story[]} */ ([
  {
    b: 800,
    a: 52.5,
    unit: 'học sinh',
    story: 'Trường có 800 học sinh. Số học sinh nữ chiếm 52,5%.',
    ask: 'Trường có bao nhiêu học sinh nữ?',
  },
  {
    b: 250000,
    a: 15,
    unit: 'đồng',
    story: 'Chiếc ba lô giá 250 000 đồng, được giảm giá 15%.',
    ask: 'Ba lô được giảm bao nhiêu tiền?',
  },
  {
    b: 250,
    a: 18,
    unit: 'g',
    story: 'Thịt bò có 18% là chất đạm.',
    ask: '250 g thịt bò có bao nhiêu gam chất đạm?',
  },
  {
    b: 35000000,
    a: 7.4,
    unit: 'đồng',
    story: 'Bác gửi tiết kiệm 35 000 000 đồng, lãi suất 7,4% một năm.',
    ask: 'Sau một năm, bác được bao nhiêu tiền lãi?',
  },
  {
    b: 120,
    a: 70,
    unit: 'm²',
    story: 'Mảnh vườn rộng 120 m². Người ta trồng rau trên 70% diện tích.',
    ask: 'Diện tích trồng rau là bao nhiêu?',
  },
  {
    b: 300,
    a: 35,
    unit: 'bạn',
    story: 'Đội đồng diễn có 300 bạn, 35% số bạn mặc áo xanh.',
    ask: 'Có bao nhiêu bạn mặc áo xanh?',
  },
  {
    b: 5000000,
    a: 0.5,
    unit: 'đồng',
    story: 'Cô gửi tiết kiệm 5 000 000 đồng, lãi suất 0,5% một tháng.',
    ask: 'Sau một tháng, cô được bao nhiêu tiền lãi?',
  },
]);

/** @param {number} v @param {string} unit */
export const amountText = (v, unit) => `${formatNumber(v)} ${unit}`;

/**
 * @typedef {Story & { options: string[], answer: number, value: number }} PercentQuiz
 */

/**
 * The question for story `i`: a% of b among the slips of dividing by 10 or
 * by 1 000 instead of 100, and of taking the part away from b.
 * @param {number} i
 * @param {() => number} rand
 * @returns {PercentQuiz}
 */
export function quizAt(i, rand) {
  const s = STORIES[i % STORIES.length];
  const value = percentValue(s.b, s.a);
  const right = amountText(value, s.unit);
  const slips = [tidy(value * 10), tidy(value / 10), tidy(s.b - value)].map((v) =>
    amountText(v, s.unit),
  );
  const options = shuffle(rand, [right, ...slips]);
  return { ...s, value, options, answer: options.indexOf(right) };
}

/**
 * How the book works story `s`: b × a : 100.
 * @param {Story} s
 */
export function storyLine(s) {
  return `${formatNumber(s.b)} × ${formatNumber(s.a)} : 100 = ${amountText(percentValue(s.b, s.a), s.unit)}`;
}
