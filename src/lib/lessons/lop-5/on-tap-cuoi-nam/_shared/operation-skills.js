/**
 * The adaptive review of the operations at the end of grade 5: the four
 * operations with natural numbers, fractions and decimals, multiplying and
 * dividing by 10, 100, 1 000 or by 0,1, 0,01, 0,001 in one's head, the value
 * of an expression, finding the missing term, computing the convenient way
 * and the average word problem. Decimals are drawn as integers scaled by a
 * power of ten, so every stored answer is exact. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { lowestTerms } from '#lib/core/fractions.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { fmt, tidy } from '#lib/core/number-format.js';
import { num, simplest, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * A decimal with `places` places whose last digit is not 0, between lo and hi
 * once scaled.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 * @param {number} places
 */
function decimal(rand, lo, hi, places) {
  let n = int(rand, lo, hi);
  if (n % 10 === 0) n += 1;
  return n / 10 ** places;
}

/** @type {Skill} */
export const wholeAddSkill = {
  id: 'cong-tru-so-tu-nhien',
  label: 'Cộng, trừ số tự nhiên',
  make(rand) {
    const a = int(rand, 20000, 99999);
    const b = int(rand, 10000, 99999);
    const add = rand() < 0.5;
    const [x, y] = add ? [a, b] : [Math.max(a, b) + 10000, Math.min(a, b)];
    const right = add ? x + y : x - y;
    const sign = add ? '+' : '−';
    return {
      prompt: `${fmt(x)} ${sign} ${fmt(y)} = ?`,
      ...valueOptions(right, add ? [right - 1000, right - 10] : [right + 1000, right + 10], {
        near: [100, -100],
      }),
      hint: `Em đặt tính thẳng hàng rồi ${add ? 'cộng' : 'trừ'} từ phải sang trái, nhớ đừng quên phần nhớ.`,
      solution: `${fmt(x)} ${sign} ${fmt(y)} = ${fmt(right)}.`,
    };
  },
};

/** @type {Skill} */
export const wholeMultiplySkill = {
  id: 'nhan-chia-so-tu-nhien',
  label: 'Nhân, chia số tự nhiên',
  make(rand) {
    const a = int(rand, 105, 489);
    let b = int(rand, 12, 48);
    if (b % 10 === 0) b += 1;
    const product = a * b;
    if (rand() < 0.5) {
      // Forgetting to shift the second partial product one place left.
      const slip = a * (b % 10) + a * Math.floor(b / 10);
      return {
        prompt: `${a} × ${b} = ?`,
        ...valueOptions(product, [slip, product + a, product - a]),
        hint: `Em nhân ${a} với từng chữ số của ${b}. Tích riêng thứ hai viết lùi sang trái một cột.`,
        solution: `${a} × ${b} = ${a} × ${b % 10} + ${a} × ${Math.floor(b / 10) * 10} = ${fmt(a * (b % 10))} + ${fmt(a * Math.floor(b / 10) * 10)} = ${fmt(product)}.`,
      };
    }
    return {
      prompt: `${fmt(product)} : ${b} = ?`,
      ...valueOptions(a, [a + 10, a - 10, a + 1]),
      hint: 'Em chia lần lượt từ trái sang phải. Thử lại bằng phép nhân: thương nhân với số chia phải bằng số bị chia.',
      solution: `${fmt(product)} : ${b} = ${a}. Thử lại: ${a} × ${b} = ${fmt(product)}.`,
    };
  },
};

/**
 * Fraction options: the right value and the slips that differ from it in
 * value, all in lowest terms, in a seeded order.
 * @param {() => number} rand
 * @param {[number, number]} right
 * @param {[number, number][]} slips
 */
export function fractionOptions(rand, right, slips) {
  const value = right[0] / right[1];
  const wrong = slips
    .filter(([p, q]) => p > 0 && q > 0 && Math.abs(p / q - value) > 1e-9)
    .map(([p, q]) => simplest(p, q));
  return mixOptions(rand, simplest(...right), [...new Set(wrong)].slice(0, 3));
}

/** @type {Skill} */
export const fractionAddSkill = {
  id: 'cong-tru-phan-so',
  label: 'Cộng, trừ phân số',
  make(rand) {
    const q1 = int(rand, 2, 6);
    const m = int(rand, 2, 3);
    const q = q1 * m;
    let p1 = int(rand, 1, q1 + 2);
    if (p1 === q1 || gcd(p1, q1) !== 1) p1 = 1;
    let p2 = int(rand, 1, q - 1);
    if (gcd(p2, q) !== 1) p2 = q - 1;
    let first = { text: `${p1}/${q1}`, over: p1 * m, p: p1, q: q1 };
    let second = { text: `${p2}/${q}`, over: p2, p: p2, q };
    const add = rand() < 0.5;
    if (!add && first.over < second.over) [first, second] = [second, first];
    const top = add ? first.over + second.over : first.over - second.over;
    const right = simplest(top, q);
    const sign = add ? '+' : '−';
    // Adding or subtracting the numerators and the denominators straight across.
    const across = add
      ? [first.p + second.p, first.q + second.q]
      : [first.p - second.p, Math.abs(first.q - second.q)];
    return {
      prompt: `${first.text} ${sign} ${second.text} = ?`,
      ...fractionOptions(
        rand,
        [top, q],
        [
          /** @type {[number, number]} */ (across),
          [add ? p1 + p2 : Math.abs(p1 - p2), q],
          [top + 1, q],
          [top, q1],
          [top, q * 2],
          [top + q, q],
        ],
      ),
      hint: `Hai mẫu số khác nhau. Em quy đồng mẫu số (mẫu số chung là ${q}) rồi ${add ? 'cộng' : 'trừ'} hai tử số.`,
      solution: `${first.text} ${sign} ${second.text} = ${first.over}/${q} ${sign} ${second.over}/${q} = ${top}/${q}${right === `${top}/${q}` ? '' : ` = ${right}`}.`,
    };
  },
};

/** @type {Skill} */
export const fractionMultiplySkill = {
  id: 'nhan-chia-phan-so',
  label: 'Nhân, chia phân số',
  make(rand) {
    const [a, b] = lowestTerms(int(rand, 1, 7), int(rand, 8, 9));
    let [c, d] = lowestTerms(int(rand, 1, 8), int(rand, 2, 9));
    if (d === 1) d = c + 1;
    const times = rand() < 0.5;
    /** @type {[number, number]} */
    const right = times ? [a * c, b * d] : [a * d, b * c];
    const text = simplest(...right);
    const raw = `${right[0]}/${right[1]}`;
    /** @type {[number, number][]} */
    const slips = times
      ? [
          [a * d, b * c],
          [a + c, b + d],
          [a * c, b + d],
        ]
      : [
          [a * c, b * d],
          [b * c, a * d],
          [a * d, b + c],
        ];
    return {
      prompt: `${a}/${b} ${times ? '×' : ':'} ${c}/${d} = ?`,
      ...fractionOptions(rand, right, slips),
      hint: times
        ? 'Muốn nhân hai phân số, em lấy tử số nhân với tử số, mẫu số nhân với mẫu số.'
        : 'Muốn chia hai phân số, em lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
      solution: `${times ? '' : `${a}/${b} : ${c}/${d} = `}${a}/${b} × ${times ? `${c}/${d}` : `${d}/${c}`} = ${raw}${text === raw ? '' : ` = ${text}`}.`,
    };
  },
};

/** @type {Skill} */
export const decimalAddSkill = {
  id: 'cong-tru-so-thap-phan',
  label: 'Cộng, trừ số thập phân',
  make(rand) {
    const a = decimal(rand, 101, 999, 1);
    const b = decimal(rand, 101, 999, 2);
    const add = rand() < 0.5;
    const [x, y] = add ? [a, b] : [a + 10, b];
    const right = tidy(add ? x + y : x - y, 6);
    // Lining the digits up on the right instead of at the comma.
    const slip = tidy(add ? (x * 10 + y * 100) / 100 : (x * 10 - y * 100) / 100, 6);
    const sign = add ? '+' : '−';
    return {
      prompt: `${num(x)} ${sign} ${num(y)} = ?`,
      ...valueOptions(right, [slip, right + 1, right - 0.1], { near: [0.01, -1] }),
      hint: 'Em đặt tính sao cho các dấu phẩy thẳng cột, các chữ số cùng hàng thẳng cột với nhau.',
      solution: `Đặt tính với các dấu phẩy thẳng cột rồi ${add ? 'cộng' : 'trừ'} như với số tự nhiên: ${num(x)} ${sign} ${num(y)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const decimalMultiplySkill = {
  id: 'nhan-so-thap-phan',
  label: 'Nhân số thập phân',
  make(rand) {
    const a = decimal(rand, 12, 99, 1);
    const b = rand() < 0.5 ? int(rand, 3, 9) : decimal(rand, 12, 49, 1);
    const right = tidy(a * b, 6);
    const places = Number.isInteger(b) ? 1 : 2;
    return {
      prompt: `${num(a)} × ${num(b)} = ?`,
      ...valueOptions(right, [right * 10, right / 10, right + a]),
      hint: `Em nhân như nhân số tự nhiên, rồi đếm xem ${places === 1 ? 'thừa số' : 'cả hai thừa số'} có bao nhiêu chữ số ở phần thập phân để tách ở tích.`,
      solution: `Nhân như số tự nhiên rồi tách ở tích ${places} chữ số ở phần thập phân: ${num(a)} × ${num(b)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const decimalDivideSkill = {
  id: 'chia-so-thap-phan',
  label: 'Chia số thập phân',
  make(rand) {
    const q = decimal(rand, 12, 99, 1);
    const byDecimal = rand() < 0.5;
    const d = byDecimal ? pick(rand, [0.2, 0.4, 0.5, 2.5, 1.2]) : int(rand, 3, 9);
    const dividend = tidy(q * d, 6);
    return {
      prompt: `${num(dividend)} : ${num(d)} = ?`,
      ...valueOptions(q, [q * 10, q / 10, q + 1]),
      hint: byDecimal
        ? 'Số chia là số thập phân: em chuyển dấu phẩy của số chia và số bị chia sang phải cùng một số chữ số, rồi chia.'
        : 'Em chia như chia số tự nhiên. Chia đến phần thập phân thì viết dấu phẩy vào thương.',
      solution: byDecimal
        ? `Chuyển dấu phẩy của hai số sang phải cùng một số chữ số rồi chia: ${num(dividend)} : ${num(d)} = ${num(q)}. Thử lại: ${num(q)} × ${num(d)} = ${num(dividend)}.`
        : `${num(dividend)} : ${d} = ${num(q)}. Thử lại: ${num(q)} × ${d} = ${num(dividend)}.`,
    };
  },
};

/** @type {Skill} */
export const mentalSkill = {
  id: 'nhan-chia-nham',
  label: 'Nhân, chia nhẩm với 10; 100; 0,1; …',
  make(rand) {
    const a = decimal(rand, 101, 9999, 2);
    const k = int(rand, 1, 3);
    const way = pick(rand, ['× big', ': big', '× small', ': small']);
    const big = 10 ** k;
    const small = 10 ** -k;
    const right = tidy(way === '× big' || way === ': small' ? a * big : a / big, 6);
    const factor = way.endsWith('big') ? fmt(big) : num(small);
    const op = way.startsWith('×') ? '×' : ':';
    const moves = right > a ? 'phải' : 'trái';
    return {
      prompt: `${num(a)} ${op} ${factor} = ?`,
      ...valueOptions(right, [right > a ? a / big : a * big, right * 10, right / 10]),
      hint:
        op === '×'
          ? 'Nhân với 10; 100; 1 000 thì dấu phẩy chuyển sang phải. Nhân với 0,1; 0,01; 0,001 thì dấu phẩy chuyển sang trái.'
          : 'Chia cho 10; 100; 1 000 thì dấu phẩy chuyển sang trái. Chia cho 0,1; 0,01; 0,001 thì dấu phẩy chuyển sang phải.',
      solution: `Chuyển dấu phẩy của ${num(a)} sang bên ${moves} ${k} chữ số: ${num(a)} ${op} ${factor} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const expressionSkill = {
  id: 'gia-tri-bieu-thuc',
  label: 'Tính giá trị biểu thức',
  make(rand) {
    const a = decimal(rand, 11, 99, 1);
    const b = decimal(rand, 11, 49, 1);
    const c = int(rand, 2, 9);
    const minus = rand() < 0.5 && a > b * c;
    const right = tidy(minus ? a - b * c : a + b * c, 6);
    const wrong = tidy(minus ? (a - b) * c : (a + b) * c, 6);
    const sign = minus ? '−' : '+';
    return {
      prompt: `Tính giá trị biểu thức: ${num(a)} ${sign} ${num(b)} × ${c}`,
      ...valueOptions(right, [wrong, right + 1, tidy(a + b + c, 6)]),
      hint: 'Trong biểu thức có phép cộng, trừ và phép nhân: em thực hiện phép nhân trước.',
      solution: `${num(a)} ${sign} ${num(b)} × ${c} = ${num(a)} ${sign} ${num(tidy(b * c, 6))} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const missingSkill = {
  id: 'tim-thanh-phan',
  label: 'Tìm thành phần chưa biết',
  make(rand) {
    const x = decimal(rand, 12, 99, 1);
    if (rand() < 0.5) {
      const a = decimal(rand, 101, 999, 2);
      const s = tidy(x + a, 6);
      return {
        prompt: `Tìm số thích hợp thay cho ?: ? + ${num(a)} = ${num(s)}`,
        ...valueOptions(x, [tidy(s + a, 6), x + 1, tidy(x + 0.1, 6)]),
        hint: 'Muốn tìm số hạng chưa biết, em lấy tổng trừ đi số hạng đã biết.',
        solution: `? = ${num(s)} − ${num(a)} = ${num(x)}.`,
      };
    }
    const a = int(rand, 3, 9);
    const p = tidy(x * a, 6);
    return {
      prompt: `Tìm số thích hợp thay cho ?: ? × ${a} = ${num(p)}`,
      ...valueOptions(x, [tidy(p * a, 6), tidy(p - a, 6), tidy(x * 10, 6)]),
      hint: 'Muốn tìm thừa số chưa biết, em lấy tích chia cho thừa số đã biết.',
      solution: `? = ${num(p)} : ${a} = ${num(x)}.`,
    };
  },
};

/** Pairs of numbers that add up to 10 or 100, for the convenient way. */
const ROUND_PAIRS = /** @type {const} */ ([
  [37, 63],
  [45, 55],
  [28, 72],
  [6.4, 3.6],
  [7.5, 2.5],
  [81, 19],
  [1.3, 8.7],
]);

/** @type {Skill} */
export const convenientSkill = {
  id: 'tinh-thuan-tien',
  label: 'Tính bằng cách thuận tiện',
  make(rand) {
    const [b, c] = pick(rand, ROUND_PAIRS);
    const a = decimal(rand, 11, 99, 1);
    const sum = tidy(b + c, 6);
    const right = tidy(a * sum, 6);
    return {
      prompt: `Tính bằng cách thuận tiện: ${num(a)} × ${num(b)} + ${num(a)} × ${num(c)}`,
      ...valueOptions(right, [right / 10, right * 10, tidy(right + a, 6)]),
      hint: 'Hai tích có chung một thừa số. Em dùng tính chất một số nhân với một tổng.',
      solution: `${num(a)} × ${num(b)} + ${num(a)} × ${num(c)} = ${num(a)} × (${num(b)} + ${num(c)}) = ${num(a)} × ${num(sum)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const averageSkill = {
  id: 'trung-binh-cong',
  label: 'Bài toán trung bình cộng',
  make(rand) {
    const days = int(rand, 3, 4);
    const mean = int(rand, 25, 80);
    const values = Array.from({ length: days }, () => mean);
    for (let i = 0; i < days - 1; i++) {
      const d = int(rand, 1, 9);
      values[i] += d;
      values[i + 1] -= d;
    }
    const total = values.reduce((s, v) => s + v, 0);
    return {
      prompt: `Một cửa hàng bán gạo trong ${days} ngày lần lượt được ${values.join(' kg, ')} kg. Trung bình mỗi ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?`,
      ...valueOptions(mean, [total, mean + 1, Math.round(total / (days + 1))], {
        unit: 'kg',
      }),
      hint: 'Em tính tổng số gạo bán được, rồi chia cho số ngày.',
      solution: `Tổng số gạo: ${values.join(' + ')} = ${total} (kg). Trung bình mỗi ngày: ${total} : ${days} = ${mean} (kg).`,
    };
  },
};

/** @type {Skill[]} */
export const OPERATION_SKILLS = [
  wholeAddSkill,
  wholeMultiplySkill,
  fractionAddSkill,
  fractionMultiplySkill,
  decimalAddSkill,
  decimalMultiplySkill,
  decimalDivideSkill,
  mentalSkill,
  expressionSkill,
  missingSkill,
  convenientSkill,
  averageSkill,
];
