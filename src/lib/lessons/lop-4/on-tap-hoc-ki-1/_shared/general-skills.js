/**
 * The adaptive review of the whole first term: a part from each of the other
 * reviews, and the parts only this review asks: even and odd numbers,
 * multiplying and dividing by one digit, the fence round a rectangle and a
 * sum and difference problem in tấn and tạ. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { columnWords, divWords, noCarry } from '#lib/core/kid/column-steps.js';
import { numberOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { columnAdd, columnSub } from './addsub-skills.js';
import { perpendicular, shapeName } from './geometry-skills.js';
import { measureCompare } from './measure-skills.js';
import { digitValue, ordering, writeNumber } from './number-skills.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** @type {Skill} */
export const evenCount = {
  id: 'chan-le',
  label: 'Số chẵn, số lẻ',
  make(rand) {
    const numbers = Array.from({ length: 5 }, () =>
      pick(rand, [int(rand, 10, 99), int(rand, 100, 999), int(rand, 1000, 9999)]),
    );
    const even = numbers.filter((n) => n % 2 === 0);
    const ask = rand() < 0.5 ? 'chẵn' : 'lẻ';
    const count = ask === 'chẵn' ? even.length : 5 - even.length;
    const list = ask === 'chẵn' ? even : numbers.filter((n) => n % 2 === 1);
    return {
      prompt: `Trong các số ${numbers.map(fmt).join('; ')}, có bao nhiêu số ${ask}?`,
      ...numberOptions(rand, count, 0, 5),
      hint: 'Số chẵn có chữ số hàng đơn vị là 0, 2, 4, 6, 8. Số lẻ có chữ số hàng đơn vị là 1, 3, 5, 7, 9.',
      solution:
        count === 0
          ? `Không có số ${ask} nào.`
          : `Các số ${ask} là ${list.map(fmt).join('; ')}. Có ${count} số ${ask}.`,
    };
  },
};

/** @type {Skill} */
export const mulDiv = {
  id: 'nhan-chia',
  label: 'Nhân, chia với số có một chữ số',
  make(rand) {
    const d = int(rand, 2, 9);
    if (rand() < 0.5) {
      const a = int(rand, 1000, Math.floor(99999 / d));
      const right = a * d;
      return {
        prompt: `Đặt tính rồi tính: ${fmt(a)} × ${d} = ?`,
        ...slipOptions(right, [noCarry(a, d, '×'), right - d, right + 10], { near: [100, -100] }),
        hint: 'Em nhân từ hàng đơn vị, sang trái. Nhớ cộng thêm số nhớ vào tích của hàng tiếp theo.',
        solution: columnWords(a, d, '×'),
      };
    }
    const q = int(rand, 1001, Math.floor(99999 / d));
    const n = q * d;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(n)} : ${d} = ?`,
      ...slipOptions(q, [q + 10, q - 100, Math.floor(q / 10)], { near: [1, -1] }),
      hint: 'Em chia từ trái sang phải. Mỗi lần chia, số dư phải bé hơn số chia.',
      solution: divWords(n, d),
    };
  },
};

/**
 * A fence round a rectangular garden `width` m wide and twice as long, with a
 * gate of `gate` m left open.
 * @param {number} width
 * @param {number} gate
 * @returns {Question}
 */
export function fenceStory(width, gate) {
  const length = width * 2;
  const round = (length + width) * 2;
  const right = round - gate;
  return {
    prompt: `Một khu vườn hình chữ nhật có chiều rộng ${width} m, chiều dài gấp đôi chiều rộng. Người ta rào xung quanh vườn và để một cổng rộng ${gate} m. Hàng rào dài bao nhiêu mét?`,
    ...slipOptions(right, [round, round + gate, length + width - gate], {
      near: [width, -width],
      min: 1,
      unit: 'm',
    }),
    hint: 'Em tìm chiều dài, rồi tính chu vi khu vườn. Phần làm cổng không rào.',
    solution: `Chiều dài: ${width} × 2 = ${length} (m). Chu vi: (${length} + ${width}) × 2 = ${round} (m). Hàng rào dài: ${round} − ${gate} = ${right} (m).`,
  };
}

/** @type {Skill} */
export const fence = {
  id: 'chu-vi',
  label: 'Chu vi hình chữ nhật',
  make(rand) {
    return fenceStory(int(rand, 3, 9) * 5, int(rand, 2, 5));
  },
};

/**
 * Two trucks carrying `tons` tấn of salt, the first `more` tạ more than the
 * second. `more` is even, so both loads are whole tạ.
 * @param {number} tons
 * @param {number} more
 * @param {boolean} askFirst
 * @returns {Question}
 */
export function saltStory(tons, more, askFirst) {
  const total = tons * 10;
  const second = (total - more) / 2;
  const first = second + more;
  const right = askFirst ? first : second;
  const name = askFirst ? 'xe thứ nhất' : 'xe thứ hai';
  return {
    prompt: `Hai xe chở tất cả ${tons} tấn muối. Xe thứ nhất chở nhiều hơn xe thứ hai ${more} tạ muối. Hỏi ${name} chở bao nhiêu tạ muối?`,
    ...slipOptions(right, [askFirst ? second : first, (tons - more) / 2, total - more], {
      near: [more, -more],
      min: 1,
      unit: 'tạ',
    }),
    hint: 'Em đổi tổng ra tạ trước, để tổng và hiệu cùng đơn vị. Số bé = (Tổng − Hiệu) : 2.',
    solution: `${tons} tấn = ${total} tạ. Xe thứ hai chở: (${total} − ${more}) : 2 = ${second} (tạ). Xe thứ nhất chở: ${second} + ${more} = ${first} (tạ).`,
  };
}

/** @type {Skill} */
export const saltTrucks = {
  id: 'tong-hieu-don-vi',
  label: 'Tổng và hiệu với đơn vị đo',
  make(rand) {
    return saltStory(int(rand, 3, 9), int(rand, 1, 4) * 2, rand() < 0.5);
  },
};

/** The parts of the review of the whole term. */
export const GENERAL_SKILLS = [
  writeNumber,
  digitValue,
  ordering,
  evenCount,
  columnAdd,
  columnSub,
  mulDiv,
  measureCompare,
  perpendicular,
  shapeName,
  fence,
  saltTrucks,
];
