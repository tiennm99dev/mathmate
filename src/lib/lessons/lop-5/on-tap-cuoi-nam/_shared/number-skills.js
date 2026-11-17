/**
 * The adaptive review of numbers at the end of grade 5: natural numbers
 * (writing from the places, the value of a digit, rounding), fractions
 * (simplest form, comparing, mixed numbers) and decimals (fraction to
 * decimal, reading, comparing, rounding). Decimals are drawn as integers
 * scaled by a power of ten, so every stored answer is exact. Pure and
 * DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions } from '#lib/core/kid/quiz.js';
import { PLACE_NAMES, digitAt, roundTo, roundWhy, sumParts } from '#lib/core/kid/whole-numbers.js';
import { fmt, formatFixed } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { num, readDecimal, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * A natural number of `digits` digits whose first digit is not 0 and with
 * one inner digit set to 0 half of the time.
 * @param {() => number} rand
 * @param {number} digits
 */
function natural(rand, digits) {
  const d = Array.from({ length: digits }, () => int(rand, 1, 9));
  if (rand() < 0.5) d[int(rand, 1, digits - 1)] = 0;
  return Number(d.join(''));
}

/** @type {Skill} */
export const placesSkill = {
  id: 'viet-so-tu-nhien',
  label: 'Viết số tự nhiên từ các hàng',
  make(rand) {
    const n = natural(rand, int(rand, 5, 7));
    const parts = sumParts(n);
    // Writing only the digits that are not 0, side by side.
    const squeezed = Number(parts.map((p) => String(p)[0]).join(''));
    const top = parts[0];
    return {
      prompt: `Số ${parts.map(fmt).join(' + ')} là số nào?`,
      ...valueOptions(n, [squeezed, n + top, n - parts[parts.length - 1] * 10], {
        near: [top / 10, -top / 10],
      }),
      hint: 'Em viết chữ số của từng hàng, từ hàng lớn nhất. Hàng nào không có trong tổng thì em viết chữ số 0.',
      solution: `${parts.map(fmt).join(' + ')} = ${fmt(n)}.`,
    };
  },
};

/** @type {Skill} */
export const digitValueSkill = {
  id: 'gia-tri-chu-so',
  label: 'Giá trị của chữ số theo hàng',
  make(rand) {
    const digits = int(rand, 6, 8);
    const exp = int(rand, 2, digits - 2);
    let n = natural(rand, digits);
    const digit = int(rand, 2, 9);
    n = n - digitAt(n, exp) * 10 ** exp + digit * 10 ** exp;
    // The chosen digit is the only one of its kind, so the question names one place.
    const others = String(n)
      .split('')
      .map((c, i) => (String(n).length - 1 - i === exp ? c : c === String(digit) ? '1' : c));
    n = Number(others.join(''));
    const value = digit * 10 ** exp;
    return {
      prompt: `Trong số ${fmt(n)}, chữ số ${digit} có giá trị là bao nhiêu?`,
      ...valueOptions(value, [value / 10, value * 10, digit]),
      hint: 'Em tìm xem chữ số đó ở hàng nào, rồi viết thêm các chữ số 0 cho đúng hàng.',
      solution: `Chữ số ${digit} ở hàng ${PLACE_NAMES[exp]}, nên có giá trị là ${fmt(value)}.`,
    };
  },
};

/** @type {Skill} */
export const roundWholeSkill = {
  id: 'lam-tron-so-tu-nhien',
  label: 'Làm tròn số tự nhiên',
  make(rand) {
    const unit = pick(rand, [1000, 10000, 100000]);
    let n = int(rand, unit * 2, unit * 99);
    if (n % (unit / 10) === 0) n += int(rand, 1, unit / 10 - 1);
    const right = roundTo(n, unit);
    const low = Math.floor(n / unit) * unit;
    const exp = Math.round(Math.log10(unit));
    return {
      prompt: `Làm tròn số ${fmt(n)} đến hàng ${PLACE_NAMES[exp]}.`,
      ...valueOptions(right, [low, low + unit, roundTo(n, unit / 10), roundTo(n, unit * 10)], {
        near: [unit * 2, -unit * 2],
      }),
      hint: `Em nhìn chữ số hàng ${PLACE_NAMES[exp - 1]}. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,
      solution: roundWhy(n, unit),
    };
  },
};

/** @type {Skill} */
export const simplifySkill = {
  id: 'rut-gon-phan-so',
  label: 'Rút gọn phân số',
  make(rand) {
    let a = int(rand, 1, 8);
    let b = int(rand, a + 1, 12);
    const g = gcd(a, b);
    a /= g;
    b /= g;
    const k = pick(rand, [2, 3, 4, 5, 6, 8, 9]);
    const p = a * k;
    const q = b * k;
    // Dividing by a common factor that is not the greatest leaves a fraction not yet simplest.
    const half = k % 2 === 0 && k > 2 ? `${p / 2}/${q / 2}` : `${a + 1}/${b + 1}`;
    return {
      prompt: `Rút gọn phân số ${p}/${q} được phân số tối giản nào?`,
      ...mixOptions(
        rand,
        `${a}/${b}`,
        [half, `${b}/${a}`, `${a}/${b + 1}`, `${a + 1}/${b}`].slice(0, 3),
      ),
      hint: 'Em chia cả tử số và mẫu số cho cùng một số lớn hơn 1, đến khi không chia tiếp được nữa.',
      solution: `${p}/${q} = (${p} : ${k})/(${q} : ${k}) = ${a}/${b}. Phân số ${a}/${b} là phân số tối giản.`,
    };
  },
};

/**
 * Two different fractions to compare: same denominator, same numerator, or
 * different denominators where one is a multiple of the other.
 * @param {() => number} rand
 * @returns {{ a: [number, number], b: [number, number], why: string }}
 */
export function fractionPair(rand) {
  const way = int(rand, 0, 2);
  if (way === 0) {
    const q = int(rand, 5, 15);
    const p1 = int(rand, 1, q + 4);
    let p2 = int(rand, 1, q + 4);
    if (p2 === p1) p2 = p1 + 1;
    return {
      a: [p1, q],
      b: [p2, q],
      why: `Hai phân số cùng mẫu số ${q}: phân số nào có tử số lớn hơn thì lớn hơn.`,
    };
  }
  if (way === 1) {
    const p = int(rand, 2, 9);
    const q1 = int(rand, p + 1, 15);
    let q2 = int(rand, p + 1, 15);
    if (q2 === q1) q2 = q1 + 1;
    return {
      a: [p, q1],
      b: [p, q2],
      why: `Hai phân số cùng tử số ${p}: phân số nào có mẫu số bé hơn thì lớn hơn.`,
    };
  }
  const q1 = int(rand, 2, 6);
  const m = int(rand, 2, 4);
  const q2 = q1 * m;
  const p1 = int(rand, 1, q1 - 1 || 1);
  let p2 = int(rand, 1, q2 - 1);
  if (p2 === p1 * m) p2 += 1;
  return {
    a: [p1, q1],
    b: [p2, q2],
    why: `Quy đồng mẫu số: ${p1}/${q1} = ${p1 * m}/${q2}, rồi so sánh hai phân số cùng mẫu số ${q2}.`,
  };
}

/** @type {Skill} */
export const compareFractionSkill = {
  id: 'so-sanh-phan-so',
  label: 'So sánh phân số',
  make(rand) {
    const { a, b, why } = fractionPair(rand);
    const sign = compareSign(a[0] * b[1], b[0] * a[1]);
    return {
      prompt: `Chọn dấu thích hợp: ${a[0]}/${a[1]} ? ${b[0]}/${b[1]}`,
      ...signOptions(sign),
      hint: why.split(':')[0] + '. Em nhớ lại quy tắc so sánh.',
      solution: `${why} Vậy ${a[0]}/${a[1]} ${sign} ${b[0]}/${b[1]}.`,
    };
  },
};

/** @type {Skill} */
export const mixedSkill = {
  id: 'hon-so',
  label: 'Hỗn số và phân số',
  make(rand) {
    const b = int(rand, 3, 9);
    const a = int(rand, 1, b - 1);
    const w = int(rand, 2, 9);
    const top = w * b + a;
    return {
      prompt: `Hỗn số ${w} ${a}/${b} viết thành phân số nào?`,
      ...mixOptions(rand, `${top}/${b}`, [`${w + a}/${b}`, `${w * a + b}/${b}`, `${w}${a}/${b}`]),
      hint: 'Em lấy phần nguyên nhân với mẫu số, rồi cộng với tử số. Mẫu số giữ nguyên.',
      solution: `${w} ${a}/${b} = (${w} × ${b} + ${a})/${b} = ${top}/${b}.`,
    };
  },
};

/**
 * Denominators that make a decimal fraction, with the factor that turns each
 * into 10, 100 or 1 000 and the number of zeros that gives.
 */
const TO_DECIMAL = /** @type {const} */ ([
  { q: 2, m: 5, k: 1 },
  { q: 5, m: 2, k: 1 },
  { q: 4, m: 25, k: 2 },
  { q: 20, m: 5, k: 2 },
  { q: 25, m: 4, k: 2 },
  { q: 50, m: 2, k: 2 },
  { q: 8, m: 125, k: 3 },
  { q: 125, m: 8, k: 3 },
]);

/** @type {Skill} */
export const fractionDecimalSkill = {
  id: 'phan-so-thanh-so-thap-phan',
  label: 'Phân số viết thành số thập phân',
  make(rand) {
    const { q, m, k } = pick(rand, TO_DECIMAL);
    let p = int(rand, 1, Math.min(3 * q, Math.floor(999 / m)));
    if (p % q === 0) p += 1;
    const den = 10 ** k;
    const right = (p * m) / den;
    return {
      prompt: `Phân số ${p}/${q} viết thành số thập phân là số nào?`,
      ...valueOptions(right, [right / 10, right * 10, p / den]),
      hint: 'Em nhân cả tử số và mẫu số với cùng một số để được mẫu số 10; 100 hoặc 1 000.',
      solution: `${p}/${q} = (${p} × ${m})/(${q} × ${m}) = ${p * m}/${fmt(den)} = ${num(right)}.`,
    };
  },
};

/** @type {Skill} */
export const readDecimalSkill = {
  id: 'doc-so-thap-phan',
  label: 'Đọc số thập phân',
  make(rand) {
    const places = int(rand, 2, 3);
    const whole = int(rand, 1, 99);
    let frac = int(rand, 1, 10 ** (places - 1) - 1);
    if (frac % 10 === 0) frac += 1;
    const scaled = whole * 10 ** places + frac;
    const shown = `${whole},${String(frac).padStart(places, '0')}`;
    const right = readDecimal(scaled, places);
    // The zero right after the comma dropped, or the number read as a whole.
    const noZero = readDecimal(whole * 10 ** (places - 1) + frac, places - 1);
    const wrong = [noZero, readDecimal(scaled * 10, places + 1)];
    const cap = (/** @type {string} */ t) => t[0].toUpperCase() + t.slice(1);
    return {
      prompt: `Số ${shown} đọc là gì?`,
      ...mixOptions(rand, cap(right), wrong.map(cap)),
      hint: 'Em đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân. Chữ số 0 ngay sau dấu phẩy đọc là "không".',
      solution: `Số ${shown} đọc là: ${right}.`,
    };
  },
};

/**
 * Two different decimals with the same whole part, as integers scaled by 100
 * with their written forms.
 * @param {() => number} rand
 */
export function decimalPair(rand) {
  const whole = int(rand, 1, 60);
  const t = int(rand, 1, 8);
  const x = { text: `${whole},${t}`, value: whole * 100 + t * 10 };
  const shape = int(rand, 0, 2);
  const h = int(rand, 1, 9);
  const y =
    shape === 0
      ? { text: `${whole},${t}${h}`, value: whole * 100 + t * 10 + h }
      : shape === 1
        ? { text: `${whole},${t - 1}${h}`, value: whole * 100 + (t - 1) * 10 + h }
        : { text: `${whole},${t}0`, value: whole * 100 + t * 10 };
  return rand() < 0.5 ? [x, y] : [y, x];
}

/** @type {Skill} */
export const compareDecimalSkill = {
  id: 'so-sanh-so-thap-phan',
  label: 'So sánh số thập phân',
  make(rand) {
    const [x, y] = decimalPair(rand);
    const sign = compareSign(x.value, y.value);
    const why =
      sign === '='
        ? 'Viết thêm chữ số 0 ở tận cùng bên phải phần thập phân, số không đổi.'
        : 'Phần nguyên bằng nhau, em so sánh lần lượt hàng phần mười, hàng phần trăm.';
    return {
      prompt: `Chọn dấu thích hợp: ${x.text} ? ${y.text}`,
      ...signOptions(sign),
      hint: 'Em so sánh phần nguyên trước, rồi lần lượt từng hàng sau dấu phẩy.',
      solution: `${why} Vậy ${x.text} ${sign} ${y.text}.`,
    };
  },
};

/** The places a decimal is rounded to, with how many digits each keeps. */
const ROUND_PLACES = /** @type {const} */ ([
  { places: 0, name: 'số tự nhiên gần nhất', look: 'hàng phần mười' },
  { places: 1, name: 'hàng phần mười', look: 'hàng phần trăm' },
  { places: 2, name: 'hàng phần trăm', look: 'hàng phần nghìn' },
]);

/** @type {Skill} */
export const roundDecimalSkill = {
  id: 'lam-tron-so-thap-phan',
  label: 'Làm tròn số thập phân',
  make(rand) {
    const target = pick(rand, ROUND_PLACES);
    const places = target.places + 1 + int(rand, 0, 1);
    let scaled = int(rand, 10 ** places + 1, 50 * 10 ** places);
    if (scaled % 10 === 0) scaled += int(rand, 1, 9);
    const step = 10 ** (places - target.places);
    /** @param {number} n the first digit dropped */
    const dropped = (n) => Math.floor((n % step) / (step / 10));
    // The deciding digit is never 0, and the rounded number keeps its last place.
    if (dropped(scaled) === 0) scaled += step / 10;
    const d = dropped(scaled);
    if (target.places > 0 && (Math.floor(scaled / step) + (d >= 5 ? 1 : 0)) % 10 === 0) {
      scaled += step;
    }
    const down = Math.floor(scaled / step);
    const up = down + 1;
    const right = d >= 5 ? up : down;
    const value = scaled / 10 ** places;
    const shown = formatFixed(value, places);
    const as = (/** @type {number} */ n) => n / 10 ** target.places;
    return {
      prompt: `Làm tròn số ${shown} đến ${target.name}.`,
      ...valueOptions(as(right), [as(d >= 5 ? down : up), Math.floor(value), value], {
        near: [10 ** -target.places],
      }),
      hint: `Em nhìn chữ số ở ${target.look}. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,
      solution: `Chữ số ở ${target.look} của ${shown} là ${d}, ${d} ${compareSign(d, 5)} 5 nên làm tròn ${d >= 5 ? 'lên' : 'xuống'}. Làm tròn ${shown} đến ${target.name} được ${formatFixed(as(right), target.places)}.`,
    };
  },
};

/** @type {Skill[]} */
export const NUMBER_SKILLS = [
  placesSkill,
  digitValueSkill,
  roundWholeSkill,
  simplifySkill,
  compareFractionSkill,
  mixedSkill,
  fractionDecimalSkill,
  readDecimalSkill,
  compareDecimalSkill,
  roundDecimalSkill,
];
