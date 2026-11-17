/**
 * The adaptive review of the operations with decimals: adding, subtracting,
 * multiplying and dividing, multiplying and dividing by 10, 100, 1 000 or by
 * 0,1, 0,01, 0,001 in one's head, adding the convenient way, using a known
 * product, and word problems. Operands are drawn as integers scaled by a
 * power of ten, so every stored answer is exact. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import { fmt, formatFixed, tidy } from '#lib/core/number-format.js';
import { num, valueOptions } from '#lib/core/kid/decimals.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * A decimal drawn as an integer `n` scaled by 10^places, its last digit not
 * 0 so it is written with all its places.
 * @param {() => number} rand
 * @param {number} lo smallest scaled value
 * @param {number} hi largest scaled value
 * @param {number} places
 */
export function decimal(rand, lo, hi, places) {
  let n = int(rand, lo, hi);
  if (places > 0 && n % 10 === 0) n += 1;
  return { n, places, value: n / 10 ** places };
}

/**
 * The slip of lining the digits up on the right instead of at the comma: the
 * two operands added or subtracted as if they had as many places as the
 * longer one.
 * @param {{ n: number, places: number }} a
 * @param {{ n: number, places: number }} b
 * @param {'+' | '-'} op
 */
export function misaligned(a, b, op) {
  const places = Math.max(a.places, b.places);
  return tidy((op === '+' ? a.n + b.n : a.n - b.n) / 10 ** places, 6);
}

/** @type {Skill} */
export const addSkill = {
  id: 'cong',
  label: 'Cộng số thập phân',
  make(rand) {
    const a = decimal(rand, 11, 999, int(rand, 1, 2));
    const b = decimal(rand, 11, 999, a.places === 1 ? 2 : int(rand, 1, 2));
    const right = tidy(a.value + b.value, 6);
    const step = 10 ** -Math.max(a.places, b.places);
    return {
      prompt: `${num(a.value)} + ${num(b.value)} = ?`,
      ...valueOptions(right, [misaligned(a, b, '+')], { near: [step, -1, 1, -step] }),
      hint: 'Em đặt tính sao cho các dấu phẩy thẳng cột, các chữ số cùng hàng thẳng cột với nhau.',
      solution: `Đặt tính với các dấu phẩy thẳng cột rồi cộng như cộng số tự nhiên, đặt dấu phẩy ở tổng thẳng cột với các dấu phẩy: ${num(a.value)} + ${num(b.value)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const subtractSkill = {
  id: 'tru',
  label: 'Trừ số thập phân',
  make(rand) {
    const whole = rand() < 0.3;
    const b = decimal(rand, 11, 299, int(rand, 1, 3));
    const a = whole
      ? { n: int(rand, Math.ceil(b.value) + 1, 60), places: 0, value: 0 }
      : decimal(rand, Math.ceil(b.value * 10) + 11, 999, 1);
    a.value = a.n / 10 ** a.places;
    const right = tidy(a.value - b.value, 6);
    const slip = misaligned(a, b, '-');
    const step = 10 ** -b.places;
    return {
      prompt: `${num(a.value)} − ${num(b.value)} = ?`,
      ...valueOptions(right, [slip, right + 1, right - step], { near: [step, -1] }),
      hint: `Em đặt tính với các dấu phẩy thẳng cột. Số bị trừ có ít chữ số ở phần thập phân hơn thì em viết thêm chữ số 0 cho đủ.`,
      solution: `${a.places < b.places ? `Viết ${num(a.value)} thành ${formatFixed(a.value, b.places)} rồi trừ` : 'Trừ'} như trừ số tự nhiên, đặt dấu phẩy ở hiệu thẳng cột với các dấu phẩy: ${num(a.value)} − ${num(b.value)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const multiplySkill = {
  id: 'nhan',
  label: 'Nhân số thập phân',
  make(rand) {
    const a = decimal(rand, 11, 99, int(rand, 1, 2));
    const b = rand() < 0.4 ? { n: int(rand, 2, 9), places: 0, value: 0 } : decimal(rand, 11, 79, 1);
    b.value = b.n / 10 ** b.places;
    const places = a.places + b.places;
    const right = (a.n * b.n) / 10 ** places;
    return {
      prompt: `${num(a.value)} × ${num(b.value)} = ?`,
      ...valueOptions(right, [right * 10, right / 10, right * 100]),
      hint: 'Em nhân như nhân số tự nhiên. Rồi đếm xem cả hai thừa số có bao nhiêu chữ số ở phần thập phân.',
      solution: `${a.n} × ${b.n} = ${fmt(a.n * b.n)}. Hai thừa số có tất cả ${places} chữ số ở phần thập phân, nên em tách ra ${places} chữ số kể từ phải sang trái: ${num(a.value)} × ${num(b.value)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const divideSkill = {
  id: 'chia',
  label: 'Chia số thập phân',
  make(rand) {
    const q = decimal(rand, 11, 99, int(rand, 1, 2));
    const byDecimal = rand() < 0.5;
    const d = byDecimal ? decimal(rand, 11, 29, 1) : { n: int(rand, 2, 9), places: 0, value: 0 };
    d.value = d.n / 10 ** d.places;
    const dividend = tidy(q.value * d.value, 6);
    return {
      prompt: `${num(dividend)} : ${num(d.value)} = ?`,
      ...valueOptions(q.value, [q.value * 10, q.value / 10, q.value * 100]),
      hint: byDecimal
        ? 'Số chia có một chữ số ở phần thập phân: em chuyển dấu phẩy của số bị chia và số chia sang phải một chữ số rồi chia.'
        : 'Em chia như chia số tự nhiên. Chia đến phần thập phân của số bị chia thì viết dấu phẩy vào thương.',
      solution: byDecimal
        ? `${num(dividend)} : ${num(d.value)} = ${num(dividend * 10)} : ${d.n} = ${num(q.value)}. Thử lại: ${num(q.value)} × ${num(d.value)} = ${num(dividend)}.`
        : `${num(dividend)} : ${d.n} = ${num(q.value)}. Thử lại: ${num(q.value)} × ${d.n} = ${num(dividend)}.`,
    };
  },
};

const FACTORS = /** @type {const} */ ([
  { text: '10', shift: 1 },
  { text: '100', shift: 2 },
  { text: fmt(1000), shift: 3 },
  { text: '0,1', shift: -1 },
  { text: '0,01', shift: -2 },
  { text: '0,001', shift: -3 },
]);

/** @type {Skill} */
export const mentalSkill = {
  id: 'nhan-chia-nham',
  label: 'Nhân, chia nhẩm với 10; 100; 0,1; ...',
  make(rand) {
    const x = decimal(rand, 101, 9999, int(rand, 1, 2));
    const f = pick(rand, FACTORS);
    const times = rand() < 0.5;
    // Multiplying by 10 moves the comma right; by 0,1 left; dividing the other way.
    const shift = times ? f.shift : -f.shift;
    const right = tidy(x.value * 10 ** shift, 6);
    const n = Math.abs(f.shift);
    const way = shift > 0 ? 'sang phải' : 'sang trái';
    return {
      prompt: `${num(x.value)} ${times ? '×' : ':'} ${f.text} = ?`,
      ...valueOptions(right, [x.value * 10 ** -shift, right * 10, right / 10]),
      hint: `Nhân với 10; 100; ${fmt(1000)} hoặc chia cho 0,1; 0,01; 0,001 thì chuyển dấu phẩy sang phải. Chia cho 10; 100; ${fmt(1000)} hoặc nhân với 0,1; 0,01; 0,001 thì chuyển dấu phẩy sang trái.`,
      solution: `Em chuyển dấu phẩy của ${num(x.value)} ${way} ${n} chữ số: ${num(x.value)} ${times ? '×' : ':'} ${f.text} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const convenientSkill = {
  id: 'thuan-tien',
  label: 'Tính bằng cách thuận tiện',
  make(rand) {
    const t = int(rand, 1, 9);
    const a = int(rand, 1, 30) + t / 10;
    const c = int(rand, 0, 9) + (10 - t) / 10;
    const b = decimal(rand, 101, 4999, 2).value;
    const pair = tidy(a + c, 6);
    const right = tidy(pair + b, 6);
    return {
      prompt: `Tính bằng cách thuận tiện: ${num(a)} + ${num(b)} + ${num(c)} = ?`,
      ...valueOptions(right, [right - 1, right + 1, right - 0.1], { near: [0.1, 10] }),
      hint: 'Em tìm hai số có tổng là số tự nhiên, rồi cộng hai số đó trước.',
      solution: `${num(a)} + ${num(b)} + ${num(c)} = (${num(a)} + ${num(c)}) + ${num(b)} = ${num(pair)} + ${num(b)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const knownProductSkill = {
  id: 'tich-biet-truoc',
  label: 'Dựa vào phép nhân đã biết',
  make(rand) {
    let p = int(rand, 12, 49);
    if (p % 10 === 0) p += 1;
    let q = int(rand, 12, 49);
    if (q % 10 === 0) q += 1;
    const product = p * q;
    const [pp, qp] = pick(rand, [
      [1, 0],
      [0, 2],
      [1, 1],
      [2, 1],
    ]);
    const places = pp + qp;
    const right = product / 10 ** places;
    const others = [0, 1, 2, 3, 4].filter((k) => k !== places).map((k) => product / 10 ** k);
    return {
      prompt: `Biết ${p} × ${q} = ${fmt(product)}. Vậy ${num(p / 10 ** pp)} × ${num(q / 10 ** qp)} = ?`,
      ...valueOptions(
        right,
        others.sort((x, y) => Math.abs(x - right) - Math.abs(y - right)),
      ),
      hint: 'Tích có số chữ số ở phần thập phân bằng tổng số chữ số ở phần thập phân của hai thừa số.',
      solution: `Hai thừa số có tất cả ${places} chữ số ở phần thập phân, nên em tách ${places} chữ số ở tích ${fmt(product)}: ${num(p / 10 ** pp)} × ${num(q / 10 ** qp)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const storySkill = {
  id: 'giai-toan',
  label: 'Giải toán với số thập phân',
  make(rand) {
    const kind = pick(rand, ['chia-deu', 'cat-day', 'nhieu-hon']);
    if (kind === 'chia-deu') {
      const boxes = int(rand, 3, 9);
      const each = decimal(rand, 11, 99, 2).value;
      const total = tidy(each * boxes, 6);
      return {
        prompt: `Bác Bình có ${num(total)} kg nấm, chia đều vào ${boxes} hộp. Mỗi hộp có bao nhiêu ki-lô-gam nấm?`,
        ...valueOptions(each, [each * 10, each / 10], { near: [0.1, -0.1, 1], unit: 'kg' }),
        hint: 'Chia đều vào các hộp thì em làm phép chia.',
        solution: `Mỗi hộp có: ${num(total)} : ${boxes} = ${num(each)} (kg).`,
      };
    }
    if (kind === 'cat-day') {
      const piece = int(rand, 11, 25);
      const count = int(rand, 5, 12);
      const left = int(rand, 1, piece - 1);
      const total = piece * count + left;
      return {
        prompt: `Một cuộn dây dài ${num(total / 10)} m. Cắt thành các đoạn dài ${num(piece / 10)} m. Cắt được nhiều nhất bao nhiêu đoạn như thế?`,
        ...slipOptions(count, [count + 1, count - 1], { min: 1, unit: 'đoạn' }),
        hint: `Em tìm xem ${num(total / 10)} m chứa được bao nhiêu lần ${num(piece / 10)} m. Phần dây thừa không đủ một đoạn thì không tính.`,
        solution: `${count} đoạn dây dài: ${num(piece / 10)} × ${count} = ${num((piece * count) / 10)} (m), còn thừa ${num(left / 10)} m, không đủ cắt thêm một đoạn. Vậy cắt được nhiều nhất ${count} đoạn.`,
      };
    }
    const mai = decimal(rand, 11, 49, 1).value;
    const more = decimal(rand, 11, 99, 2).value;
    const nam = tidy(mai + more, 6);
    return {
      prompt: `Mai góp ${num(mai)} kg giấy vụn. Nam góp nhiều hơn Mai ${num(more)} kg. Nam góp bao nhiêu ki-lô-gam giấy vụn?`,
      ...valueOptions(
        nam,
        [
          tidy(mai - more, 6),
          misaligned(
            { n: Math.round(mai * 10), places: 1 },
            { n: Math.round(more * 100), places: 2 },
            '+',
          ),
        ],
        {
          near: [1, 0.1],
          unit: 'kg',
        },
      ),
      hint: '"Nhiều hơn" thì em làm phép cộng.',
      solution: `Nam góp: ${num(mai)} + ${num(more)} = ${num(nam)} (kg).`,
    };
  },
};

/** The parts of the operations review, in book order. */
export const OPERATION_SKILLS = [
  addSkill,
  subtractSkill,
  multiplySkill,
  divideSkill,
  mentalSkill,
  convenientSkill,
  knownProductSkill,
  storySkill,
];
