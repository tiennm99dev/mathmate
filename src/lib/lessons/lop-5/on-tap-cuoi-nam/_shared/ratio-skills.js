/**
 * The adaptive review of ratios and percentages at the end of grade 5: the
 * ratio of two numbers, map scales, finding two numbers from their sum or
 * difference and their ratio, writing a fraction or a decimal as a
 * percentage, the percentage of one number to another, and a percentage of a
 * number, plain and in a discount. Every answer is a whole number or an exact
 * decimal. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { fractionOptions } from './operation-skills.js';
import { num, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** Things counted in two groups, for ratio stories. */
const GROUPS = /** @type {const} */ ([
  ['bạn nam', 'bạn nữ', 'Lớp 5A có'],
  ['quả cam', 'quả quýt', 'Trong giỏ có'],
  ['cây bàng', 'cây phượng', 'Sân trường có'],
  ['con gà', 'con vịt', 'Nhà bác Ba nuôi'],
]);

/** @type {Skill} */
export const ratioSkill = {
  id: 'ti-so',
  label: 'Tỉ số của hai số',
  make(rand) {
    const [one, two, start] = pick(rand, GROUPS);
    let p = int(rand, 1, 9);
    let q = int(rand, 2, 7);
    const g = gcd(p, q);
    p /= g;
    q /= g;
    if (q === 1 || p === q) q = p + 1;
    const k = int(rand, 2, 5);
    const a = p * k;
    const b = q * k;
    return {
      prompt: `${start} ${a} ${one} và ${b} ${two}. Tỉ số của số ${one} và số ${two} là bao nhiêu?`,
      ...fractionOptions(
        rand,
        [a, b],
        [
          [b, a],
          [a, a + b],
          [b, a + b],
        ],
      ),
      hint: `Tỉ số của số ${one} và số ${two} là số ${one} chia cho số ${two}, viết dưới dạng phân số rồi rút gọn.`,
      solution: `Tỉ số của số ${one} và số ${two} là ${a} : ${b} = ${a}/${b} = ${p}/${q}.`,
    };
  },
};

/** @type {Skill} */
export const scaleSkill = {
  id: 'ti-le-ban-do',
  label: 'Tỉ lệ bản đồ',
  make(rand) {
    const scale = pick(rand, [500, 1000, 2000, 5000, 10000]);
    const cm = int(rand, 2, 9);
    const real = cm * scale;
    const metres = real / 100;
    return {
      prompt: `Trên bản đồ tỉ lệ 1 : ${fmt(scale)}, quãng đường từ nhà Mai đến trường dài ${cm} cm. Quãng đường thật dài bao nhiêu mét?`,
      ...valueOptions(metres, [real, metres * 10, metres / 10], { unit: 'm' }),
      hint: `Tỉ lệ 1 : ${fmt(scale)} cho biết 1 cm trên bản đồ ứng với ${fmt(scale)} cm ngoài thực tế. Nhớ đổi xăng-ti-mét ra mét.`,
      solution: `Quãng đường thật dài: ${cm} × ${fmt(scale)} = ${fmt(real)} (cm). ${fmt(real)} cm = ${fmt(metres)} m.`,
    };
  },
};

/**
 * Two numbers in the ratio p/q (p < q) with the size of one part.
 * @param {() => number} rand
 */
function parts(rand) {
  const q = int(rand, 3, 7);
  let p = int(rand, 1, q - 1);
  if (gcd(p, q) !== 1) p = 1;
  const unit = int(rand, 4, 30);
  return { p, q, unit, small: p * unit, big: q * unit };
}

/** @type {Skill} */
export const sumRatioSkill = {
  id: 'tong-va-ti-so',
  label: 'Tìm hai số khi biết tổng và tỉ số',
  make(rand) {
    const { p, q, unit, small, big } = parts(rand);
    const sum = small + big;
    const askBig = rand() < 0.5;
    const right = askBig ? big : small;
    return {
      prompt: `Tổng của hai số là ${fmt(sum)}. Tỉ số của số bé và số lớn là ${p}/${q}. Tìm số ${askBig ? 'lớn' : 'bé'}.`,
      ...valueOptions(right, [askBig ? small : big, unit, Math.round(sum / q)], {
        near: [unit, -unit],
      }),
      hint: `Em vẽ sơ đồ: số bé ${p} phần, số lớn ${q} phần bằng nhau. Tìm tổng số phần rồi tìm giá trị một phần.`,
      solution: `Tổng số phần bằng nhau: ${p} + ${q} = ${p + q} (phần). Một phần: ${fmt(sum)} : ${p + q} = ${unit}. Số ${askBig ? 'lớn' : 'bé'}: ${unit} × ${askBig ? q : p} = ${fmt(right)}.`,
    };
  },
};

/** @type {Skill} */
export const differenceRatioSkill = {
  id: 'hieu-va-ti-so',
  label: 'Tìm hai số khi biết hiệu và tỉ số',
  make(rand) {
    const { p, q, unit, small, big } = parts(rand);
    const diff = big - small;
    const askBig = rand() < 0.5;
    const right = askBig ? big : small;
    return {
      prompt: `Hiệu của hai số là ${fmt(diff)}. Tỉ số của số bé và số lớn là ${p}/${q}. Tìm số ${askBig ? 'lớn' : 'bé'}.`,
      ...valueOptions(right, [askBig ? small : big, unit, Math.round(diff / (p + q)) * q], {
        near: [unit, -unit],
      }),
      hint: `Em vẽ sơ đồ: số bé ${p} phần, số lớn ${q} phần bằng nhau. Tìm hiệu số phần rồi tìm giá trị một phần.`,
      solution: `Hiệu số phần bằng nhau: ${q} − ${p} = ${q - p} (phần). Một phần: ${fmt(diff)} : ${q - p} = ${unit}. Số ${askBig ? 'lớn' : 'bé'}: ${unit} × ${askBig ? q : p} = ${fmt(right)}.`,
    };
  },
};

/** Fractions that make a whole percentage, with the factor to 100. */
const TO_HUNDRED = /** @type {const} */ ([
  [1, 2, 50],
  [1, 4, 25],
  [3, 4, 25],
  [2, 5, 20],
  [3, 5, 20],
  [7, 20, 5],
  [9, 25, 4],
  [13, 50, 2],
  [7, 10, 10],
]);

/** @type {Skill} */
export const writePercentSkill = {
  id: 'viet-ti-so-phan-tram',
  label: 'Viết thành tỉ số phần trăm',
  make(rand) {
    if (rand() < 0.5) {
      const [p, q, m] = pick(rand, TO_HUNDRED);
      const right = p * m;
      return {
        prompt: `Viết phân số ${p}/${q} dưới dạng tỉ số phần trăm.`,
        ...valueOptions(right, [p * 10 + q, right / 10, p * q], { near: [5], unit: '%' }),
        hint: 'Em viết phân số đó thành phân số có mẫu số 100. Tử số chính là số phần trăm.',
        solution: `${p}/${q} = ${right}/100 = ${right}%.`,
      };
    }
    const hundredths = int(rand, 3, 98);
    const value = hundredths / 100;
    return {
      prompt: `Viết số thập phân ${num(value)} dưới dạng tỉ số phần trăm.`,
      ...valueOptions(hundredths, [value, hundredths * 10, hundredths / 10], { unit: '%' }),
      hint: 'Em nhân số thập phân với 100 rồi viết thêm kí hiệu % vào bên phải.',
      solution: `${num(value)} = ${hundredths}/100 = ${hundredths}%.`,
    };
  },
};

/** @type {Skill} */
export const percentOfSkill = {
  id: 'tim-ti-so-phan-tram',
  label: 'Tìm tỉ số phần trăm của hai số',
  make(rand) {
    const [p, q, m] = pick(rand, TO_HUNDRED);
    // A class of 20 to 50 children.
    const k = int(rand, Math.ceil(20 / q), Math.floor(50 / q));
    const a = p * k;
    const b = q * k;
    const right = p * m;
    return {
      prompt: `Lớp 5B có ${b} học sinh, trong đó có ${a} học sinh thích bơi. Tìm tỉ số phần trăm của số học sinh thích bơi và số học sinh cả lớp.`,
      ...valueOptions(right, [100 - right, a, p * 10], { near: [10], unit: '%' }),
      hint: `Em tìm thương ${a} : ${b}, rồi nhân thương đó với 100 và viết thêm kí hiệu %.`,
      solution: `${a} : ${b} = ${num(a / b)}. ${num(a / b)} × 100 = ${right}. Tỉ số phần trăm là ${right}%.`,
    };
  },
};

/** @type {Skill} */
export const valueOfPercentSkill = {
  id: 'gia-tri-phan-tram',
  label: 'Tìm giá trị phần trăm của một số',
  make(rand) {
    const pct = pick(rand, [5, 10, 15, 20, 25, 30, 40, 60, 75]);
    let n = int(rand, 2, 30) * 20;
    // An answer of 100 would sit in the hint's "chia cho 100".
    if (n * pct === 10000) n += 20;
    const right = (n * pct) / 100;
    return {
      prompt: `Tìm ${pct}% của ${fmt(n)}.`,
      ...valueOptions(right, [n * pct, n - right, n / 10], { near: [10] }),
      hint: `Muốn tìm ${pct}% của ${fmt(n)}, em lấy ${fmt(n)} chia cho 100 rồi nhân với ${pct}.`,
      solution: `${fmt(n)} : 100 × ${pct} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const discountSkill = {
  id: 'giam-gia',
  label: 'Bài toán giảm giá',
  make(rand) {
    const pct = pick(rand, [10, 20, 25, 30, 40, 50]);
    const price = int(rand, 4, 40) * 20000;
    const off = (price * pct) / 100;
    const right = price - off;
    return {
      prompt: `Một chiếc cặp giá ${fmt(price)} đồng, nay được giảm giá ${pct}%. Giá chiếc cặp sau khi giảm là bao nhiêu?`,
      ...valueOptions(right, [off, price - pct * 1000, price + off], { unit: 'đồng' }),
      hint: `Em tìm số tiền được giảm (${pct}% của giá cũ), rồi lấy giá cũ trừ đi số tiền đó.`,
      solution: `Số tiền được giảm: ${fmt(price)} : 100 × ${pct} = ${fmt(off)} (đồng). Giá sau khi giảm: ${fmt(price)} − ${fmt(off)} = ${fmt(right)} (đồng).`,
    };
  },
};

/** @type {Skill[]} */
export const RATIO_SKILLS = [
  ratioSkill,
  scaleSkill,
  sumRatioSkill,
  differenceRatioSkill,
  writePercentSkill,
  percentOfSkill,
  valueOfPercentSkill,
  discountSkill,
];
