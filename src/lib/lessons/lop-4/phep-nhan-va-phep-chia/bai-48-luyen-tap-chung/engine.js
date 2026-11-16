/**
 * The mixed practice of the chapter "Phép nhân và phép chia": multiplying and
 * dividing by 10, 100, 1 000 and by round tens, column multiplication by a
 * two-digit number, division, convenient products, the distributive property,
 * averages, unit problems and a division with a remainder in a real story.
 * One question of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'nham-10': 'Nhân, chia với 10, 100, 1 000',
  'tron-chuc': 'Nhân, chia số tròn chục',
  nhan: 'Nhân với số có hai chữ số',
  chia: 'Chia hết',
  'thuan-tien': 'Tính thuận tiện',
  'phan-phoi': 'Tính chất phân phối',
  'trung-binh': 'Số trung bình cộng',
  'don-vi': 'Rút về đơn vị',
  'co-du': 'Phép chia có dư',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * The quotient with every 0 digit left out: the slip of forgetting to write
 * 0 when a brought-down number is smaller than the divisor.
 * @param {number} q
 */
export const dropZeros = (q) => Number(String(q).replaceAll('0', '') || '0');

/** The largest number of grade 4. */
const TOP = 999999999;

/** Pairs whose product is a round number, for convenient products. */
const ROUND_PAIRS = /** @type {const} */ ([
  [2, 5],
  [5, 20],
  [2, 50],
  [4, 25],
  [8, 125],
  [4, 250],
]);

/** Things shared out in the unit and remainder stories. */
const STORIES = /** @type {const} */ ([
  { box: 'hộp', thing: 'cái bút chì' },
  { box: 'túi', thing: 'quả cam' },
  { box: 'khay', thing: 'cái bánh' },
  { box: 'thùng', thing: 'quyển vở' },
]);

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  'nham-10': (rand) => {
    const zeros = int(rand, 1, 3);
    const factor = 10 ** zeros;
    const times = rand() < 0.5;
    const a = times ? int(rand, 1001, 10 ** (6 - zeros) * 9) : int(rand, 101, 9999) * factor;
    const right = times ? a * factor : a / factor;
    const sign = times ? '×' : ':';
    return {
      prompt: `Tính nhẩm: ${fmt(a)} ${sign} ${fmt(factor)} = ?`,
      ...slipOptions(right, [right * 10, right / 10, right * 100], {
        near: [1],
        min: 1,
        max: TOP,
      }),
      hint: times
        ? `Nhân với ${fmt(factor)}: em viết thêm ${zeros} chữ số 0 vào bên phải số đó.`
        : `Chia cho ${fmt(factor)}: em bỏ bớt ${zeros} chữ số 0 ở bên phải số đó.`,
      solution: `${fmt(a)} ${sign} ${fmt(factor)} = ${fmt(right)}.`,
    };
  },
  'tron-chuc': (rand) => {
    const x = int(rand, 2, 9);
    const y = int(rand, 2, 9);
    if (rand() < 0.5) {
      const i = int(rand, 1, 2);
      const a = x * 10 ** i;
      const b = y * 10;
      const right = a * b;
      return {
        prompt: `Tính nhẩm: ${fmt(a)} × ${fmt(b)} = ?`,
        ...slipOptions(right, [right / 10, right * 10, x * y * 10], { near: [100], min: 1 }),
        hint: `Em nhân ${x} × ${y} trước, rồi viết thêm các chữ số 0 của hai thừa số.`,
        solution: `${x} × ${y} = ${x * y}. Hai thừa số có ${i + 1} chữ số 0, nên ${fmt(a)} × ${fmt(b)} = ${fmt(right)}.`,
      };
    }
    const j = int(rand, 1, 2);
    const d = y * 10 ** j;
    const q = x * 10 ** int(rand, 0, 1);
    const n = d * q;
    return {
      prompt: `Tính nhẩm: ${fmt(n)} : ${fmt(d)} = ?`,
      ...slipOptions(q, [q * 10, q * 100, q / 10], { near: [1, -1], min: 1 }),
      hint: `Em xoá bớt cùng một số chữ số 0 ở tận cùng của số bị chia và số chia, rồi chia nhẩm.`,
      solution: `${fmt(n)} : ${fmt(d)} = ${fmt(n / 10 ** j)} : ${y} = ${fmt(q)}.`,
    };
  },
  nhan: (rand) => {
    const a = int(rand, 102, 2999);
    let b = int(rand, 12, 98);
    if (b % 10 === 0) b += 1;
    const ones = b % 10;
    const tens = Math.floor(b / 10);
    const right = a * b;
    const noShift = a * ones + a * tens;
    return {
      prompt: `${fmt(a)} × ${b} = ?`,
      ...slipOptions(right, [noShift, right + a, right - a], { near: [100, -10], min: 1 }),
      hint: `Em nhân ${fmt(a)} với ${ones}, rồi nhân ${fmt(a)} với ${tens}. Tích riêng thứ hai viết lùi sang trái một cột.`,
      solution: `${fmt(a)} × ${ones} = ${fmt(a * ones)}; ${fmt(a)} × ${tens} = ${fmt(a * tens)}, viết lùi sang trái một cột. Cộng hai tích riêng: ${fmt(a * ones)} + ${fmt(a * tens * 10)} = ${fmt(right)}.`,
    };
  },
  chia: (rand) => {
    const twoDigit = rand() < 0.6;
    const d = twoDigit ? int(rand, 12, 49) : int(rand, 3, 9);
    const q =
      rand() < 0.5
        ? int(rand, 11, 99) * 100 + int(rand, 1, 9)
        : Number(Array.from({ length: 3 }, () => int(rand, 1, 9)).join(''));
    const n = d * q;
    const slips = [q + 1, q - 1, q + 10];
    if (String(q).includes('0')) slips.unshift(dropZeros(q));
    return {
      prompt: `${fmt(n)} : ${d} = ?`,
      ...slipOptions(q, slips, { min: 1 }),
      hint: 'Em chia từ trái sang phải. Lần nào số hạ xuống bé hơn số chia thì viết 0 vào thương.',
      solution: `${fmt(n)} : ${d} = ${fmt(q)}. Thử lại: ${fmt(q)} × ${d} = ${fmt(n)}.`,
    };
  },
  'thuan-tien': (rand) => {
    const [p, r] = pick(rand, ROUND_PAIRS);
    let x = int(rand, 12, 999);
    if (x % 10 === 0 || x === p || x === r) x += 1;
    const round = p * r;
    const right = x * round;
    const [first, second] = rand() < 0.5 ? [p, r] : [r, p];
    return {
      prompt: `Tính bằng cách thuận tiện: ${fmt(first)} × ${fmt(x)} × ${fmt(second)} = ?`,
      ...slipOptions(right, [right / 10, right * 10, x * (p + r)], {
        near: [x, -x],
        min: 1,
      }),
      hint: `Em nhân ${fmt(first)} với ${fmt(second)} trước để được số tròn.`,
      solution: `${fmt(first)} × ${fmt(x)} × ${fmt(second)} = ${fmt(x)} × (${fmt(first)} × ${fmt(second)}) = ${fmt(x)} × ${fmt(round)} = ${fmt(right)}.`,
    };
  },
  'phan-phoi': (rand) => {
    const a = int(rand, 12, 99);
    const total = pick(rand, [10, 100, 1000]);
    const b = int(rand, 1, total - 1);
    const c = total - b;
    const right = a * total;
    return {
      prompt: `Tính bằng cách thuận tiện: ${a} × ${fmt(b)} + ${a} × ${fmt(c)} = ?`,
      ...slipOptions(right, [right * 10, right / 10, a + total], { near: [a, -a], min: 1 }),
      hint: `Hai tích có cùng thừa số ${a}. Em cộng ${fmt(b)} với ${fmt(c)} trước.`,
      solution: `${a} × ${fmt(b)} + ${a} × ${fmt(c)} = ${a} × (${fmt(b)} + ${fmt(c)}) = ${a} × ${fmt(total)} = ${fmt(right)}.`,
    };
  },
  'trung-binh': (rand) => {
    const count = int(rand, 2, 4);
    const mean = int(rand, 20, 60);
    const values = Array.from({ length: count }, () => mean);
    for (let i = 0; i < count - 1; i++) {
      const step = int(rand, 1, 9);
      values[i] += step;
      values[i + 1] -= step;
    }
    const sum = mean * count;
    const slips = [sum, mean + 1, mean - 1];
    if (sum % (count + 1) === 0) slips.unshift(sum / (count + 1));
    if (count > 2 && sum % (count - 1) === 0) slips.unshift(sum / (count - 1));
    return {
      prompt: `Số trung bình cộng của ${values.join(', ').replace(/, (\d+)$/, ' và $1')} là số nào?`,
      ...slipOptions(mean, slips, { min: 1 }),
      hint: `Em tính tổng các số, rồi chia cho số các số hạng là ${count}.`,
      solution: `(${values.join(' + ')}) : ${count} = ${sum} : ${count} = ${mean}.`,
    };
  },
  'don-vi': (rand) => {
    const { box, thing } = pick(rand, STORIES);
    const units = int(rand, 3, 9);
    const per = int(rand, 6, 25);
    let ask = int(rand, 2, 12);
    if (ask === units) ask += 1;
    const total = units * per;
    const right = per * ask;
    return {
      prompt: `${units} ${box} như nhau có ${total} ${thing}. Hỏi ${ask} ${box} như thế có bao nhiêu ${thing}?`,
      ...slipOptions(right, [total * ask, per, total + ask, right + per], { min: 1 }),
      hint: `Em tìm số ${thing} trong 1 ${box} trước: lấy ${total} chia cho ${units}.`,
      solution: `1 ${box} có: ${total} : ${units} = ${per} (${thing}). ${ask} ${box} có: ${per} × ${ask} = ${right} (${thing}).`,
    };
  },
  'co-du': (rand) => {
    const { box, thing } = pick(rand, STORIES);
    const per = int(rand, 6, 15);
    const q = int(rand, 12, 80);
    const rest = int(rand, 1, per - 1);
    const n = per * q + rest;
    /** @param {number} boxes @param {number} left */
    const say = (boxes, left) => `${boxes} ${box}, thừa ${left} ${thing}`;
    const right = say(q, rest);
    const wrong = [say(q + 1, 0), say(q - 1, rest + per)];
    if (per - rest !== rest) wrong.push(say(q, per - rest));
    return {
      prompt: `Có ${fmt(n)} ${thing}, xếp vào mỗi ${box} ${per} ${thing}. Xếp được nhiều nhất bao nhiêu ${box} và còn thừa mấy ${thing}?`,
      ...mixOptions(rand, right, wrong),
      hint: `Em làm phép chia ${fmt(n)} : ${per}. Số dư phải bé hơn số chia ${per}.`,
      solution: `${fmt(n)} : ${per} = ${q} (dư ${rest}). Xếp được nhiều nhất ${q} ${box}, còn thừa ${rest} ${thing}.`,
    };
  },
};

/**
 * A round of the practice: one question of each part in a shuffled order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
