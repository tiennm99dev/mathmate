/**
 * Question generators for the grade 11 year-end review, one skill per
 * chapter of the book in book order: trigonometric functions and equations,
 * sequences, grouped data, parallel lines and planes in space, limits and
 * continuity, exponential and logarithmic functions, perpendicularity in
 * space, the rules of probability and derivatives. Answers are exact values
 * (see `#lib/core/adaptive.js`); prompts, hints and steps are plain text.
 */

import { int, pick } from '#lib/core/drill.js';
import { MINUS, fmt, formatNumber, intText, operand, sup } from '#lib/core/number-format.js';
import { fracOperand, fracText } from '#lib/core/fractions.js';
import { factorText, linText, sumText } from '#lib/core/algebra-text.js';
import { fraction, simplify } from '#lib/fraction-engine/index.js';

/** @typedef {import('#lib/core/adaptive.js').ReviewSkill} ReviewSkill */
/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */

/** @param {number} n */
const whole = (n) => fraction(n, 1);

/**
 * The exact value n/d in lowest terms.
 * @param {number} n
 * @param {number} d
 */
export const frac = (n, d) => simplify(fraction(n, d));

/**
 * A value the way the book writes a result: a decimal when it ends ('7,5',
 * '−0,25'), otherwise a fraction in lowest terms ('13/6').
 * @param {Fraction} f
 */
export function valueShow(f) {
  let d = f.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? formatNumber(f.n / f.d) : fracText(f.n, f.d);
}

/**
 * Whether a value is a decimal with at most two digits after the comma.
 * @param {Fraction} f
 */
export const isShort = (f) => 100 % f.d === 0;

/**
 * 'm/n = shown', or just the shown value when that is already how `show`
 * writes m/n.
 * @param {number} m
 * @param {number} n positive
 * @param {(f: Fraction) => string} [show]
 */
export function ratio(m, n, show = valueShow) {
  const shown = show(frac(m, n));
  if (n === 1) return shown;
  const written = `${intText(m)}/${n}`;
  return shown === written ? shown : `${written} = ${shown}`;
}

/** Subscript digits: 12 → '₁₂'. @param {number} n */
export const subs = (n) =>
  String(n)
    .split('')
    .map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)])
    .join('');

/**
 * An exponent written in superscript: 'x − 1' → 'ˣ⁻¹'.
 * @param {string} text letters x, digits, + and −
 */
export const supText = (text) =>
  text
    .replace(/\s/g, '')
    .split('')
    .map((ch) => ({ x: 'ˣ', '+': '⁺', [MINUS]: '⁻' })[ch] ?? sup(Number(ch)))
    .join('');

/**
 * A polynomial in one variable from its coefficients, highest power first:
 * ([2, 0, −3, 1], 'x') → '2x³ − 3x + 1'.
 * @param {number[]} coeffs
 * @param {string} [v]
 */
export function polyText(coeffs, v = 'x') {
  const top = coeffs.length - 1;
  /** @type {[number, number, number][]} */
  const terms = [];
  coeffs.forEach((c, i) => {
    if (c !== 0) terms.push([c, top - i, 0]);
  });
  const text = terms.length ? sumText(terms) : '0';
  return v === 'x' ? text : text.replace(/x/g, v);
}

/**
 * The value of a polynomial (highest power first) at x.
 * @param {number[]} coeffs
 * @param {number} x
 */
export const polyAt = (coeffs, x) => coeffs.reduce((acc, c) => acc * x + c, 0);

/**
 * The derivative of a polynomial, highest power first.
 * @param {number[]} coeffs
 */
export function derive(coeffs) {
  const top = coeffs.length - 1;
  return coeffs.slice(0, -1).map((c, i) => c * (top - i));
}

/**
 * A polynomial with x replaced by a number, term by term:
 * ([6, −4, 1], −1) → '6 · (−1)² − 4 · (−1) + 1'.
 * @param {number[]} coeffs
 * @param {number} x
 */
export function substituted(coeffs, x) {
  const top = coeffs.length - 1;
  let out = '';
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const e = top - i;
    const body =
      e === 0 ? fmt(Math.abs(c)) : `${fmt(Math.abs(c))} · ${operand(x)}${e > 1 ? sup(e) : ''}`;
    if (out === '') out = `${c < 0 ? MINUS : ''}${body}`;
    else out += ` ${c < 0 ? MINUS : '+'} ${body}`;
  });
  return out === '' ? '0' : out;
}

/**
 * kv with the book's coefficient: 'sin x', '−sin x', '3sin x', '−2sin x'.
 * @param {number} k nonzero
 * @param {string} v
 */
const scaled = (k, v) => `${k === 1 ? '' : k === -1 ? MINUS : intText(k)}${v}`;

/**
 * '+ 3', '− 3' or '' for a constant term after another term.
 * @param {number} b
 */
const plusConst = (b) => (b === 0 ? '' : ` ${b < 0 ? MINUS : '+'} ${fmt(Math.abs(b))}`);

/** @param {number} a @param {number} b */
function gcd(a, b) {
  let [x, y] = [Math.abs(a), Math.abs(b)];
  while (y) [x, y] = [y, x % y];
  return x;
}

// ---------------------------------------------------------------------------
// Hàm số lượng giác và phương trình lượng giác

/** Pythagorean triples (leg, leg, hypotenuse). */
export const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];

/** The four quarters of a turn with the signs of sin and cos there. */
export const QUADRANTS = [
  { text: '0 < α < π/2', sin: 1, cos: 1 },
  { text: 'π/2 < α < π', sin: 1, cos: -1 },
  { text: 'π < α < 3π/2', sin: -1, cos: -1 },
  { text: '3π/2 < α < 2π', sin: -1, cos: 1 },
];

/** @type {ReviewSkill} */
export const luongGiac = {
  id: 'luong-giac',
  label: 'Hàm số lượng giác và phương trình lượng giác',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const q = pick(rand, [2, 3, 4, 5, 6, 10, 12]);
      let p = int(rand, 1, 2 * q - 1);
      while (gcd(p, q) !== 1) p = int(rand, 1, 2 * q - 1);
      const sign = rand() < 0.25 ? -1 : 1;
      const deg = (sign * 180 * p) / q;
      const t = `${sign < 0 ? MINUS : ''}${p === 1 ? '' : p}π/${q}`;
      return {
        prompt: `Đổi số đo ${t} rad sang độ.`,
        answer: whole(deg),
        display: intText(deg),
        unit: '°',
        hints: ['π rad tương ứng với 180°.', 'Nhân số đo theo radian với 180°/π.'],
        steps: [
          `π rad = 180°, nên ${t} rad = ${sign < 0 ? MINUS : ''}${p === 1 ? '' : `${p} · `}180°/${q}.`,
          `Vậy ${t} rad = ${intText(deg)}°.`,
        ],
      };
    }
    if (v === 1) {
      const [a, b, c] = pick(rand, TRIPLES);
      const [s0, c0] = rand() < 0.5 ? [a, b] : [b, a];
      const Q = pick(rand, QUADRANTS);
      const sinN = Q.sin * s0;
      const cosN = Q.cos * c0;
      const givenSin = rand() < 0.5;
      const ask = pick(rand, ['tan', 'sin2', 'cos2']);
      const [given, other] = givenSin ? ['sin', 'cos'] : ['cos', 'sin'];
      const givenN = givenSin ? sinN : cosN;
      const otherN = givenSin ? cosN : sinN;
      const otherSign = givenSin ? Q.cos : Q.sin;
      const target = { tan: 'tan α', sin2: 'sin 2α', cos2: 'cos 2α' }[ask];
      let answer;
      let last;
      if (ask === 'tan') {
        answer = frac(sinN, cosN);
        last = `tan α = sin α/cos α = ${fracText(sinN, c)} : ${fracOperand(cosN, c)} = ${valueShow(answer)}.`;
      } else if (ask === 'sin2') {
        answer = frac(2 * sinN * cosN, c * c);
        last = `sin 2α = 2sin α cos α = 2 · ${fracOperand(sinN, c)} · ${fracOperand(cosN, c)} = ${valueShow(answer)}.`;
      } else {
        answer = frac(c0 * c0 - s0 * s0, c * c);
        last = `cos 2α = cos²α − sin²α = ${c0 * c0}/${c * c} − ${s0 * s0}/${c * c} = ${valueShow(answer)}.`;
      }
      return {
        prompt: `Cho ${given} α = ${fracText(givenN, c)} với ${Q.text}. Tính ${target}.`,
        answer,
        display: valueShow(answer),
        hints: [
          `Tìm ${other} α từ sin²α + cos²α = 1; dấu của ${other} α do khoảng chứa α quyết định.`,
          ask === 'tan'
            ? 'tan α = sin α/cos α.'
            : ask === 'sin2'
              ? 'Dùng công thức nhân đôi sin 2α = 2sin α cos α.'
              : 'Dùng công thức nhân đôi cos 2α = cos²α − sin²α.',
        ],
        steps: [
          `${other}²α = 1 − ${given}²α = 1 − ${givenN * givenN}/${c * c} = ${otherN * otherN}/${c * c}.`,
          `Vì ${Q.text} nên ${other} α ${otherSign > 0 ? '> 0' : '< 0'}, do đó ${other} α = ${fracText(otherN, c)}.`,
          last,
        ],
      };
    }
    const a = pick(rand, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
    const b = int(rand, -5, 5);
    const fn = pick(rand, ['sin x', 'cos x']);
    const max = rand() < 0.5;
    const value = max ? Math.abs(a) + b : b - Math.abs(a);
    return {
      prompt: `Tìm giá trị ${max ? 'lớn nhất' : 'nhỏ nhất'} của hàm số y = ${scaled(a, fn)}${plusConst(b)}.`,
      answer: whole(value),
      display: intText(value),
      hints: [
        `Với mọi x, −1 ≤ ${fn} ≤ 1.`,
        b === 0
          ? `Nhân với ${intText(a)}; nhân với số âm thì đổi chiều bất đẳng thức.`
          : `Nhân với ${intText(a)} (nhân với số âm thì đổi chiều bất đẳng thức) rồi cộng ${intText(b)}.`,
      ],
      steps: [
        `Vì −1 ≤ ${fn} ≤ 1 nên ${intText(-Math.abs(a))} ≤ ${scaled(a, fn)} ≤ ${Math.abs(a)}.`,
        `Do đó ${intText(b - Math.abs(a))} ≤ y ≤ ${intText(b + Math.abs(a))}, và cả hai giá trị đều đạt được.`,
        `Giá trị ${max ? 'lớn nhất' : 'nhỏ nhất'} của hàm số là ${intText(value)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Dãy số. Cấp số cộng và cấp số nhân

/** @type {ReviewSkill} */
export const daySo = {
  id: 'day-so',
  label: 'Dãy số, cấp số cộng và cấp số nhân',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const u1 = int(rand, -10, 20);
      const d = pick(rand, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      const n = int(rand, 10, 30);
      const un = u1 + (n - 1) * d;
      if (rand() < 0.5) {
        return {
          prompt: `Cấp số cộng (uₙ) có u₁ = ${intText(u1)} và công sai d = ${intText(d)}. Tìm u${subs(n)}.`,
          answer: whole(un),
          display: intText(un),
          hints: ['Số hạng tổng quát của cấp số cộng: uₙ = u₁ + (n − 1)d.'],
          steps: [
            'uₙ = u₁ + (n − 1)d.',
            `u${subs(n)} = ${intText(u1)} + ${n - 1} · ${operand(d)} = ${intText(un)}.`,
          ],
        };
      }
      const S = (n * (2 * u1 + (n - 1) * d)) / 2;
      return {
        prompt: `Cấp số cộng (uₙ) có u₁ = ${intText(u1)} và công sai d = ${intText(d)}. Tính tổng ${n} số hạng đầu S${subs(n)}.`,
        answer: whole(S),
        display: intText(S),
        hints: ['Sₙ = n(u₁ + uₙ)/2 = n[2u₁ + (n − 1)d]/2.'],
        steps: [
          'Sₙ = n[2u₁ + (n − 1)d]/2.',
          `S${subs(n)} = ${n} · [2 · ${operand(u1)} + ${n - 1} · ${operand(d)}]/2 = ${n} · ${operand(2 * u1 + (n - 1) * d)}/2 = ${intText(S)}.`,
        ],
      };
    }
    if (v === 1) {
      const u1 = int(rand, -10, 15);
      const d = pick(rand, [-4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const m = int(rand, 2, 6);
      const k = m + int(rand, 2, 6);
      const um = u1 + (m - 1) * d;
      const uk = u1 + (k - 1) * d;
      const askD = rand() < 0.5;
      const steps = [
        `u${subs(k)} − u${subs(m)} = (${k} − ${m})d = ${k - m}d.`,
        `${k - m}d = ${intText(uk)} − ${operand(um)} = ${intText(uk - um)}, nên d = ${intText(d)}.`,
      ];
      if (!askD)
        steps.push(
          `u₁ = u${subs(m)} − ${m - 1}d = ${intText(um)} − ${m - 1} · ${operand(d)} = ${intText(u1)}.`,
        );
      return {
        prompt: `Cấp số cộng (uₙ) có u${subs(m)} = ${intText(um)} và u${subs(k)} = ${intText(uk)}. Tìm ${askD ? 'công sai d' : 'số hạng đầu u₁'}.`,
        answer: whole(askD ? d : u1),
        display: intText(askD ? d : u1),
        hints: [
          'Viết u' +
            subs(m) +
            ' và u' +
            subs(k) +
            ' theo u₁ và d bằng công thức uₙ = u₁ + (n − 1)d.',
          'Trừ hai đẳng thức để khử u₁.',
        ],
        steps,
      };
    }
    const u1 = pick(rand, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
    const q = pick(rand, [-3, -2, 2, 3]);
    const n = int(rand, 4, 7);
    const un = u1 * q ** (n - 1);
    if (rand() < 0.5) {
      return {
        prompt: `Cấp số nhân (uₙ) có u₁ = ${intText(u1)} và công bội q = ${intText(q)}. Tìm u${subs(n)}.`,
        answer: whole(un),
        display: intText(un),
        hints: ['Số hạng tổng quát của cấp số nhân: uₙ = u₁ · qⁿ⁻¹.'],
        steps: [
          'uₙ = u₁ · qⁿ⁻¹.',
          `u${subs(n)} = ${intText(u1)} · ${operand(q)}${sup(n - 1)} = ${intText(u1)} · ${operand(q ** (n - 1))} = ${intText(un)}.`,
        ],
      };
    }
    const S = (u1 * (q ** n - 1)) / (q - 1);
    return {
      prompt: `Cấp số nhân (uₙ) có u₁ = ${intText(u1)} và công bội q = ${intText(q)}. Tính tổng ${n} số hạng đầu S${subs(n)}.`,
      answer: whole(S),
      display: intText(S),
      hints: ['Với q ≠ 1: Sₙ = u₁(1 − qⁿ)/(1 − q).'],
      steps: [
        'Sₙ = u₁(1 − qⁿ)/(1 − q).',
        `S${subs(n)} = ${intText(u1)} · (1 − ${operand(q)}${sup(n)})/(1 − ${operand(q)}) = ${intText(u1)} · ${operand(1 - q ** n)}/${operand(1 - q)} = ${intText(S)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm

/**
 * The mean, median and mode of a grouped sample with equal groups
 * [a0 + ih; a0 + (i + 1)h).
 * @param {number} a0
 * @param {number} h
 * @param {number[]} counts
 */
export function groupedStats(a0, h, counts) {
  const n = counts.reduce((s, m) => s + m, 0);
  // Mean with centres a0 + ih + h/2, kept exact over 2n.
  const twice = counts.reduce((s, m, i) => s + m * (2 * (a0 + i * h) + h), 0);
  const mean = frac(twice, 2 * n);
  let p = 0;
  let C = 0;
  while (2 * (C + counts[p]) < n) {
    C += counts[p];
    p += 1;
  }
  // Me = a_p + (n/2 − C)/m_p · h = a_p + (n − 2C)h/(2m_p)
  const median = frac(2 * counts[p] * (a0 + p * h) + (n - 2 * C) * h, 2 * counts[p]);
  const top = Math.max(...counts);
  const j = counts.indexOf(top);
  const unique = counts.filter((m) => m === top).length === 1;
  const prev = counts[j - 1] ?? 0;
  const next = counts[j + 1] ?? 0;
  const mode = frac(
    (a0 + j * h) * (2 * top - prev - next) + (top - prev) * h,
    2 * top - prev - next,
  );
  return { n, sum: twice / 2, mean, median, p, C, mode, j, prev, next, unique };
}

/** @type {ReviewSkill} */
export const ghepNhom = {
  id: 'ghep-nhom',
  label: 'Mẫu số liệu ghép nhóm',
  make(rand) {
    const ask = pick(rand, ['mean', 'median', 'mode']);
    for (;;) {
      const h = pick(rand, [2, 5, 10]);
      const a0 = h * int(rand, 0, 8);
      const counts = Array.from({ length: 5 }, () => int(rand, 2, 15));
      const s = groupedStats(a0, h, counts);
      const value = ask === 'mean' ? s.mean : ask === 'median' ? s.median : s.mode;
      if (!isShort(value)) continue;
      if (ask === 'mode' && (!s.unique || s.j === 0 || s.j === 4)) continue;
      const groups = counts.map((_, i) => `[${a0 + i * h}; ${a0 + (i + 1) * h})`);
      const shown = valueShow(value);
      const prompt = `Mẫu số liệu ghép nhóm có các nhóm ${groups.join(', ')} với tần số lần lượt là ${counts.join('; ')}. ${
        ask === 'mean'
          ? 'Tính số trung bình của mẫu số liệu.'
          : ask === 'median'
            ? 'Tìm trung vị của mẫu số liệu.'
            : 'Tìm mốt của mẫu số liệu.'
      }`;
      if (ask === 'mean') {
        const centres = counts.map((_, i) => a0 + i * h + h / 2);
        return {
          prompt,
          answer: value,
          display: shown,
          hints: [
            'Giá trị đại diện của mỗi nhóm là trung điểm của nhóm đó.',
            'Số trung bình = (tổng các tích giá trị đại diện · tần số) : cỡ mẫu.',
          ],
          steps: [
            `Giá trị đại diện các nhóm: ${centres.map((c) => formatNumber(c)).join('; ')}; cỡ mẫu n = ${s.n}.`,
            `x̄ = (${centres.map((c, i) => `${formatNumber(c)} · ${counts[i]}`).join(' + ')})/${s.n} = ${formatNumber(s.sum)}/${s.n}.`,
            `Vậy x̄ = ${shown}.`,
          ],
        };
      }
      if (ask === 'median') {
        const cum = [];
        let run = 0;
        for (const m of counts) cum.push((run += m));
        return {
          prompt,
          answer: value,
          display: shown,
          hints: [
            'Tìm nhóm chứa trung vị: nhóm đầu tiên có tần số tích luỹ không nhỏ hơn n/2.',
            'Mₑ = aₚ + (n/2 − C)/mₚ · h, với C là tần số tích luỹ của các nhóm đứng trước.',
          ],
          steps: [
            `Cỡ mẫu n = ${s.n}, n/2 = ${formatNumber(s.n / 2)}; tần số tích luỹ: ${cum.join('; ')}.`,
            `Nhóm chứa trung vị là ${groups[s.p]} với tần số ${counts[s.p]}, tần số tích luỹ của các nhóm trước là C = ${s.C}.`,
            `Mₑ = ${a0 + s.p * h} + (${formatNumber(s.n / 2)} − ${s.C})/${counts[s.p]} · ${h} = ${shown}.`,
          ],
        };
      }
      const top = counts[s.j];
      return {
        prompt,
        answer: value,
        display: shown,
        hints: [
          'Mốt nằm trong nhóm có tần số lớn nhất.',
          'Mₒ = aⱼ + (mⱼ − mⱼ₋₁)/[(mⱼ − mⱼ₋₁) + (mⱼ − mⱼ₊₁)] · h.',
        ],
        steps: [
          `Nhóm có tần số lớn nhất là ${groups[s.j]} với tần số ${top}; hai nhóm kề có tần số ${s.prev} và ${s.next}.`,
          `Mₒ = ${a0 + s.j * h} + (${top} − ${s.prev})/[(${top} − ${s.prev}) + (${top} − ${s.next})] · ${h} = ${shown}.`,
        ],
      };
    }
  },
};

// ---------------------------------------------------------------------------
// Quan hệ song song trong không gian

/** 'M là trung điểm của AB' or 'AM = 2MB'. @param {number} k */
const pointOn = (k) =>
  k === 1 ? 'M là trung điểm của cạnh AB' : `M là điểm trên cạnh AB sao cho AM = ${k}MB`;

/** @type {ReviewSkill} */
export const songSong = {
  id: 'song-song',
  label: 'Quan hệ song song trong không gian',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const k = int(rand, 1, 3);
      const x = int(rand, 6, 30);
      const value = frac(k * x, k + 1);
      return {
        prompt: `Cho tứ diện ABCD có CD = ${x} cm. Gọi ${pointOn(k)}. Mặt phẳng (α) đi qua M và song song với mặt phẳng (BCD) cắt AC, AD lần lượt tại N, P. Tính độ dài đoạn NP.`,
        answer: value,
        display: valueShow(value),
        unit: 'cm',
        hints: [
          'Hai mặt phẳng song song bị mặt phẳng thứ ba cắt theo hai giao tuyến song song: MN ∥ BC, NP ∥ CD.',
          'Áp dụng định lí Thalès trong tam giác ABC rồi tam giác ACD.',
        ],
        steps: [
          '(α) ∥ (BCD) nên MN ∥ BC và NP ∥ CD.',
          `Trong tam giác ABC: AN/AC = AM/AB = ${k}/${k + 1}. Trong tam giác ACD: NP/CD = AN/AC = ${k}/${k + 1}.`,
          `NP = ${k}/${k + 1} · ${x} = ${valueShow(value)} (cm).`,
        ],
      };
    }
    if (v === 1) {
      const k = int(rand, 1, 3);
      const a = int(rand, 3, 12);
      const b = int(rand, 3, 12);
      const value = frac(k * k * a * b, (k + 1) * (k + 1));
      const where =
        k === 1 ? 'M là trung điểm của cạnh SA' : `M là điểm trên cạnh SA sao cho SM = ${k}MA`;
      return {
        prompt: `Cho hình chóp S.ABCD có đáy là hình chữ nhật, AB = ${a} cm, AD = ${b} cm. Gọi ${where}. Mặt phẳng (α) đi qua M và song song với mặt phẳng (ABCD) cắt hình chóp theo một thiết diện. Tính diện tích thiết diện đó.`,
        answer: value,
        display: valueShow(value),
        unit: 'cm²',
        hints: [
          '(α) cắt SA, SB, SC, SD tại M, N, P, Q với MN ∥ AB, NP ∥ BC, MQ ∥ AD.',
          `Mỗi cạnh của thiết diện bằng SM/SA = ${k}/${k + 1} lần cạnh tương ứng của đáy.`,
        ],
        steps: [
          '(α) ∥ (ABCD) nên thiết diện MNPQ có MN ∥ AB, NP ∥ BC, PQ ∥ CD, QM ∥ DA; MNPQ là hình chữ nhật.',
          `Theo định lí Thalès: MN = ${k}/${k + 1} · AB và MQ = ${k}/${k + 1} · AD.`,
          `Diện tích thiết diện: (${k}/${k + 1})² · ${a} · ${b} = ${valueShow(value)} (cm²).`,
        ],
      };
    }
    const x = int(rand, 6, 30);
    const value = frac(x, 3);
    return {
      prompt: `Cho tứ diện ABCD có CD = ${x} cm. Gọi G₁, G₂ lần lượt là trọng tâm của các tam giác ABC và ABD. Tính độ dài đoạn G₁G₂.`,
      answer: value,
      display: valueShow(value),
      unit: 'cm',
      hints: [
        'Gọi I là trung điểm của AB; G₁ nằm trên CI và G₂ nằm trên DI.',
        'IG₁/IC = IG₂/ID = 1/3.',
      ],
      steps: [
        'Gọi I là trung điểm của AB. Khi đó G₁ ∈ CI, G₂ ∈ DI và IG₁/IC = IG₂/ID = 1/3.',
        'Theo định lí Thalès đảo trong tam giác ICD: G₁G₂ ∥ CD và G₁G₂ = CD/3.',
        `G₁G₂ = ${ratio(x, 3)} (cm).`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Giới hạn. Hàm số liên tục

/** Ratios q for a geometric series with |q| < 1. */
const SERIES_Q = [
  [1, 2],
  [-1, 2],
  [1, 3],
  [-1, 3],
  [2, 3],
  [-2, 3],
  [1, 4],
  [3, 4],
  [-1, 4],
  [1, 5],
];

/** @type {ReviewSkill} */
export const gioiHan = {
  id: 'gioi-han',
  label: 'Giới hạn, hàm số liên tục',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = pick(rand, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      const d = int(rand, 1, 6);
      const top = [a, int(rand, -6, 6), int(rand, -9, 9)];
      const bottom = [d, int(rand, -d, 5), int(rand, 1, 7)];
      const value = frac(a, d);
      return {
        prompt: `Tính giới hạn của dãy số uₙ = (${polyText(top, 'n')})/(${polyText(bottom, 'n')}) khi n → +∞.`,
        answer: value,
        display: valueShow(value),
        hints: [
          'Chia cả tử và mẫu cho n², luỹ thừa cao nhất của n.',
          'Khi n → +∞, các số hạng dạng c/n và c/n² có giới hạn 0.',
        ],
        steps: [
          'Chia cả tử và mẫu cho n².',
          'Khi n → +∞, các số hạng dạng c/n và c/n² dần tới 0, chỉ còn lại hệ số của n² ở tử và ở mẫu.',
          `Giới hạn bằng ${ratio(a, d)}.`,
        ],
      };
    }
    if (v === 1) {
      const r = pick(rand, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
      let s = int(rand, -5, 5);
      while (s === r) s = int(rand, -5, 5);
      const value = r - s;
      return {
        prompt: `Tính giới hạn của (${polyText([1, -(r + s), r * s])})/(${factorText(r)}) khi x → ${intText(r)}.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          `Thay x = ${intText(r)} thì cả tử và mẫu bằng 0: phân tích tử thành nhân tử.`,
          `Tử số có nhân tử ${factorText(r)}.`,
        ],
        steps: [
          `${polyText([1, -(r + s), r * s])} = (${factorText(r)})(${factorText(s)}).`,
          `Với x ≠ ${intText(r)}, phân thức bằng ${factorText(s)}.`,
          `Giới hạn bằng ${intText(r)} − ${operand(s)} = ${intText(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const [n, d] = pick(rand, SERIES_Q);
      const u1 = pick(rand, [-12, -9, -6, -4, -3, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20]);
      const value = frac(u1 * d, d - n);
      return {
        prompt: `Tính tổng của cấp số nhân lùi vô hạn có số hạng đầu u₁ = ${intText(u1)} và công bội q = ${fracText(n, d)}.`,
        answer: value,
        display: valueShow(value),
        hints: ['Cấp số nhân lùi vô hạn (|q| < 1) có tổng S = u₁/(1 − q).'],
        steps: [
          '|q| < 1 nên S = u₁/(1 − q).',
          `1 − q = ${fracText(d - n, d)}.`,
          `S = ${intText(u1)} : ${fracText(d - n, d)} = ${valueShow(value)}.`,
        ],
      };
    }
    const r = int(rand, 1, 6);
    const c = int(rand, -5, 5);
    const value = 2 * r - c;
    const at = c === 0 ? 'm' : `m${plusConst(c)}`;
    return {
      prompt: `Cho hàm số f(x) = (x² − ${r * r})/(x − ${r}) khi x ≠ ${r} và f(${r}) = ${at}. Tìm m để hàm số liên tục tại x = ${r}.`,
      answer: whole(value),
      display: intText(value),
      hints: [
        `Hàm số liên tục tại x = ${r} khi giới hạn của f(x) khi x → ${r} bằng f(${r}).`,
        `x² − ${r * r} = (x − ${r})(x + ${r}).`,
      ],
      steps: [
        `Với x ≠ ${r}: f(x) = (x − ${r})(x + ${r})/(x − ${r}) = x + ${r}, nên giới hạn của f(x) khi x → ${r} bằng ${2 * r}.`,
        `Hàm số liên tục tại x = ${r} khi ${at} = ${2 * r}, tức là m = ${intText(value)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Hàm số mũ và hàm số logarit

/** @type {ReviewSkill} */
export const muLogarit = {
  id: 'mu-logarit',
  label: 'Hàm số mũ và hàm số logarit',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const a = pick(rand, [2, 3, 5]);
      const k = int(rand, 1, a === 2 ? 5 : 3);
      const y = pick(
        rand,
        [3, 6, 7, 10, 11, 13].filter((t) => t % a !== 0),
      );
      const x = y * a ** k;
      return {
        prompt: `Tính log${subs(a)} ${fmt(x)} − log${subs(a)} ${y}.`,
        answer: whole(k),
        display: String(k),
        hints: ['logₐ b − logₐ c = logₐ (b/c).', `Viết thương thành một luỹ thừa của ${a}.`],
        steps: [
          `log${subs(a)} ${fmt(x)} − log${subs(a)} ${y} = log${subs(a)} (${fmt(x)}/${y}) = log${subs(a)} ${fmt(a ** k)}.`,
          `${fmt(a ** k)} = ${a}${sup(k)} nên kết quả bằng ${k}.`,
        ],
      };
    }
    if (v === 1) {
      const a = pick(rand, [2, 3, 5]);
      const m = a === 2 ? pick(rand, [2, 3, 4]) : pick(rand, [2, 3]);
      let n = int(rand, 1, a === 2 ? 7 : 4);
      while (n === m) n = int(rand, 1, a === 2 ? 7 : 4);
      const value = frac(n, m);
      return {
        prompt: `Tính log${subs(a ** m)} ${fmt(a ** n)}.`,
        answer: value,
        display: valueShow(value),
        hints: [
          `Viết ${fmt(a ** m)} và ${fmt(a ** n)} thành luỹ thừa của ${a}.`,
          'log_{aᵐ} aⁿ = n/m (với 0 < a ≠ 1).',
        ],
        steps: [
          `${fmt(a ** m)} = ${a}${sup(m)} và ${fmt(a ** n)} = ${a}${sup(n)}.`,
          `log${subs(a ** m)} ${fmt(a ** n)} = (${n}/${m}) · log${subs(a)} ${a} = ${ratio(n, m)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = pick(rand, [2, 3]);
      const m = pick(rand, [1, 2]);
      const b = a ** m;
      const n = int(rand, 1, a === 2 ? 7 : 4);
      const c = pick(rand, [-3, -2, -1, 0, 1, 2, 3]);
      const value = frac(n - m * c, m);
      const exp = linText(1, c);
      return {
        prompt: `Giải phương trình ${b}${supText(exp)} = ${fmt(a ** n)}.`,
        answer: value,
        display: valueShow(value),
        hints: [`Đưa hai vế về cùng cơ số ${a}.`, 'aᵘ = aᵛ (0 < a ≠ 1) khi và chỉ khi u = v.'],
        steps: [
          `${fmt(a ** n)} = ${a}${sup(n)}${m === 1 ? '' : ` và ${b} = ${a}${sup(m)}`}.`,
          m === 1
            ? `Phương trình trở thành ${exp} = ${n}.`
            : `Phương trình trở thành ${m}(${exp}) = ${n}.`,
          `Vậy x = ${valueShow(value)}.`,
        ],
      };
    }
    const a = pick(rand, [2, 3]);
    const k = int(rand, 1, a === 2 ? 4 : 2);
    const c = int(rand, -5, 5);
    const strict = rand() < 0.5;
    const top = c + a ** k;
    const value = strict ? a ** k - 1 : a ** k;
    const arg = factorText(c);
    const log = c === 0 ? `log${subs(a)} x` : `log${subs(a)}(${arg})`;
    return {
      prompt: `Bất phương trình ${log} ${strict ? '<' : '≤'} ${k} có bao nhiêu nghiệm nguyên?`,
      answer: whole(value),
      display: String(value),
      hints: [
        `Điều kiện: ${arg} > 0.`,
        `Cơ số ${a} > 1 nên bất phương trình tương đương ${arg} ${strict ? '<' : '≤'} ${a}${sup(k)}.`,
      ],
      steps: [
        c === 0
          ? `Bất phương trình tương đương 0 < x ${strict ? '<' : '≤'} ${a ** k}.`
          : `Bất phương trình tương đương 0 < ${arg} ${strict ? '<' : '≤'} ${a ** k}, tức là ${intText(c)} < x ${strict ? '<' : '≤'} ${intText(top)}.`,
        `Các nghiệm nguyên là các số nguyên từ ${intText(c + 1)} đến ${intText(strict ? top - 1 : top)}, có ${value} số.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Quan hệ vuông góc trong không gian

/**
 * Right triangles SA, AB, SB used for the distance from A to (SBC).
 * @type {[number, number, number][]}
 */
export const DISTANCE_TRIPLES = [
  [3, 4, 5],
  [4, 3, 5],
  [6, 8, 10],
  [8, 6, 10],
  [5, 12, 13],
  [12, 5, 13],
  [9, 12, 15],
];

/**
 * The three angle settings: SA in terms of a, and the angle it gives.
 * @type {Record<'SB' | 'SC' | 'BD', [string, 30 | 45 | 60][]>}
 */
export const ANGLE_CASES = {
  SB: [
    ['a√3/3', 30],
    ['a', 45],
    ['a√3', 60],
  ],
  SC: [
    ['a√6/3', 30],
    ['a√2', 45],
    ['a√6', 60],
  ],
  BD: [
    ['a√6/6', 30],
    ['a√2/2', 45],
    ['a√6/2', 60],
  ],
};

/** @type {ReviewSkill} */
export const vuongGoc = {
  id: 'vuong-goc',
  label: 'Quan hệ vuông góc trong không gian',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = int(rand, 2, 12);
      const b = int(rand, 2, 12);
      const h = int(rand, 2, 12);
      if (rand() < 0.5) {
        const value = frac(a * b * h, 3);
        return {
          prompt: `Hình chóp S.ABCD có đáy là hình chữ nhật với AB = ${a} cm, AD = ${b} cm, SA vuông góc với mặt phẳng đáy và SA = ${h} cm. Tính thể tích khối chóp S.ABCD.`,
          answer: value,
          display: valueShow(value),
          unit: 'cm³',
          hints: ['Thể tích khối chóp: V = (1/3) · S · h.', 'SA là đường cao của hình chóp.'],
          steps: [
            `Diện tích đáy S = ${a} · ${b} = ${a * b} (cm²); chiều cao h = SA = ${h} cm.`,
            `V = (1/3) · ${a * b} · ${h} = ${valueShow(value)} (cm³).`,
          ],
        };
      }
      const value = frac(a * b * h, 2);
      return {
        prompt: `Hình lăng trụ đứng ABC.A'B'C' có đáy là tam giác ABC vuông tại A với AB = ${a} cm, AC = ${b} cm và AA' = ${h} cm. Tính thể tích khối lăng trụ.`,
        answer: value,
        display: valueShow(value),
        unit: 'cm³',
        hints: [
          'Thể tích khối lăng trụ: V = S · h.',
          "Lăng trụ đứng có chiều cao bằng cạnh bên AA'.",
        ],
        steps: [
          `Diện tích đáy S = (1/2) · ${a} · ${b} = ${valueShow(frac(a * b, 2))} (cm²).`,
          `V = ${valueShow(frac(a * b, 2))} · ${h} = ${valueShow(value)} (cm³).`,
        ],
      };
    }
    if (v === 1) {
      const kind = pick(rand, /** @type {const} */ (['SB', 'SC', 'BD']));
      const [sa, deg] = pick(rand, ANGLE_CASES[kind]);
      const tan = { 30: '√3/3', 45: '1', 60: '√3' }[deg];
      const base =
        'Hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a, SA vuông góc với mặt phẳng (ABCD) và SA = ' +
        sa +
        '.';
      if (kind === 'SB') {
        return {
          prompt: `${base} Tính góc giữa đường thẳng SB và mặt phẳng (ABCD).`,
          answer: whole(deg),
          display: String(deg),
          unit: '°',
          hints: [
            'AB là hình chiếu vuông góc của SB trên mặt phẳng (ABCD).',
            'Góc cần tìm là góc SBA; tính tan của góc đó trong tam giác SAB vuông tại A.',
          ],
          steps: [
            'SA ⊥ (ABCD) nên AB là hình chiếu của SB trên (ABCD); góc cần tìm là góc SBA.',
            `Tam giác SAB vuông tại A: tan SBA = SA/AB = (${sa})/a = ${tan}.`,
            `Vậy góc giữa SB và (ABCD) bằng ${deg}°.`,
          ],
        };
      }
      if (kind === 'SC') {
        return {
          prompt: `${base} Tính góc giữa đường thẳng SC và mặt phẳng (ABCD).`,
          answer: whole(deg),
          display: String(deg),
          unit: '°',
          hints: [
            'AC là hình chiếu vuông góc của SC trên mặt phẳng (ABCD).',
            'Đường chéo hình vuông cạnh a là AC = a√2.',
          ],
          steps: [
            'SA ⊥ (ABCD) nên AC là hình chiếu của SC trên (ABCD); góc cần tìm là góc SCA.',
            `AC = a√2. Tam giác SAC vuông tại A: tan SCA = SA/AC = (${sa})/(a√2) = ${tan}.`,
            `Vậy góc giữa SC và (ABCD) bằng ${deg}°.`,
          ],
        };
      }
      return {
        prompt: `${base} Gọi O là giao điểm của AC và BD. Tính số đo của góc nhị diện [S, BD, A].`,
        answer: whole(deg),
        display: String(deg),
        unit: '°',
        hints: [
          'AO ⊥ BD (hai đường chéo của hình vuông) và SO ⊥ BD (vì BD ⊥ (SAC)).',
          'Góc phẳng nhị diện là góc SOA; AO = a√2/2.',
        ],
        steps: [
          'BD ⊥ AC và BD ⊥ SA nên BD ⊥ (SAC), suy ra BD ⊥ SO và BD ⊥ AO. Góc SOA là góc phẳng nhị diện của [S, BD, A].',
          `AO = a√2/2. Tam giác SAO vuông tại A: tan SOA = SA/AO = (${sa})/(a√2/2) = ${tan}.`,
          `Vậy số đo của góc nhị diện [S, BD, A] bằng ${deg}°.`,
        ],
      };
    }
    const [p, q, r] = pick(rand, DISTANCE_TRIPLES);
    const t = int(rand, 1, 2);
    const [sa, ab, sb] = [p * t, q * t, r * t];
    const value = frac(sa * ab, sb);
    return {
      prompt: `Hình chóp S.ABCD có đáy ABCD là hình vuông cạnh AB = ${ab} cm, SA vuông góc với mặt phẳng đáy và SA = ${sa} cm. Tính khoảng cách từ điểm A đến mặt phẳng (SBC).`,
      answer: value,
      display: valueShow(value),
      unit: 'cm',
      hints: [
        'BC ⊥ AB và BC ⊥ SA nên BC ⊥ (SAB). Kẻ AH ⊥ SB tại H.',
        'AH là đường cao của tam giác SAB vuông tại A: AH · SB = SA · AB.',
      ],
      steps: [
        'BC ⊥ AB và BC ⊥ SA nên BC ⊥ (SAB), suy ra BC ⊥ AH. Kẻ AH ⊥ SB thì AH ⊥ (SBC), nên d(A, (SBC)) = AH.',
        `SB = √(SA² + AB²) = √(${sa * sa} + ${ab * ab}) = ${sb} (cm).`,
        `AH = SA · AB/SB = ${sa} · ${ab}/${sb} = ${valueShow(value)} (cm).`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Các quy tắc tính xác suất

/** A probability in tenths or hundredths, written with a decimal comma. @param {number} hundredths */
const prob = (hundredths) => formatNumber(hundredths / 100);

/** @type {ReviewSkill} */
export const xacSuat = {
  id: 'xac-suat',
  label: 'Các quy tắc tính xác suất',
  make(rand) {
    if (rand() < 0.6) {
      const p = int(rand, 3, 9) * 10;
      const q = int(rand, 3, 9) * 10;
      const ask = pick(rand, /** @type {const} */ (['both', 'some', 'one', 'none']));
      const P = {
        both: p * q,
        some: 10000 - (100 - p) * (100 - q),
        one: p * (100 - q) + q * (100 - p),
        none: (100 - p) * (100 - q),
      }[ask];
      const value = frac(P, 10000);
      const event = {
        both: 'cả hai người đều bắn trúng',
        some: 'có ít nhất một người bắn trúng',
        one: 'có đúng một người bắn trúng',
        none: 'cả hai người đều bắn trượt',
      }[ask];
      const [pa, pb, qa, qb] = [prob(p), prob(q), prob(100 - p), prob(100 - q)];
      const work = {
        both: `P(AB) = P(A) · P(B) = ${pa} · ${pb} = ${valueShow(value)}.`,
        some: `P(A ∪ B) = 1 − P(Ā)P(B̄) = 1 − ${qa} · ${qb} = ${valueShow(value)}.`,
        one: `P = P(A)P(B̄) + P(Ā)P(B) = ${pa} · ${qb} + ${qa} · ${pb} = ${valueShow(value)}.`,
        none: `P(ĀB̄) = P(Ā) · P(B̄) = ${qa} · ${qb} = ${valueShow(value)}.`,
      }[ask];
      return {
        prompt: `Hai xạ thủ An và Bình mỗi người bắn một viên đạn vào bia, độc lập với nhau. Xác suất bắn trúng của An là ${pa}, của Bình là ${pb}. Tính xác suất để ${event}.`,
        answer: value,
        display: valueShow(value),
        hints: [
          'Gọi A: "An bắn trúng", B: "Bình bắn trúng"; A và B độc lập nên P(AB) = P(A) · P(B), và các biến cố đối của chúng cũng độc lập.',
          ask === 'one'
            ? 'Có đúng một người trúng là hợp của hai biến cố xung khắc AB̄ và ĀB.'
            : ask === 'some'
              ? 'Biến cố đối của "có ít nhất một người trúng" là "cả hai đều trượt".'
              : 'P(Ā) = 1 − P(A).',
        ],
        steps: [`P(A) = ${pa}, P(B) = ${pb}; P(Ā) = ${qa}, P(B̄) = ${qb}.`, work],
      };
    }
    for (;;) {
      const n = int(rand, 30, 45);
      const x = int(rand, 10, 25);
      const y = int(rand, 8, 22);
      const z = int(rand, 3, Math.min(x, y) - 2);
      const good = x + y - z;
      if (good >= n) continue;
      const value = frac(good, n);
      return {
        prompt: `Lớp 11A có ${n} học sinh, trong đó ${x} bạn thích bóng đá, ${y} bạn thích cầu lông và ${z} bạn thích cả hai môn. Chọn ngẫu nhiên một học sinh của lớp. Tính xác suất để học sinh đó thích ít nhất một trong hai môn (phân số tối giản).`,
        answer: value,
        display: fracText(value.n, value.d),
        simplest: true,
        hints: [
          'Gọi A: "thích bóng đá", B: "thích cầu lông". Biến cố cần tìm là A ∪ B.',
          'Công thức cộng xác suất: P(A ∪ B) = P(A) + P(B) − P(AB).',
        ],
        steps: [
          `P(A) = ${x}/${n}, P(B) = ${y}/${n}, P(AB) = ${z}/${n}.`,
          `P(A ∪ B) = (${x} + ${y} − ${z})/${n} = ${ratio(good, n, (f) => fracText(f.n, f.d))}.`,
        ],
      };
    }
  },
};

// ---------------------------------------------------------------------------
// Đạo hàm

/** @param {() => number} rand a cubic with nonzero leading coefficient, highest power first */
const cubic = (rand) => [
  pick(rand, [-3, -2, -1, 1, 2, 3]),
  int(rand, -5, 5),
  int(rand, -6, 6),
  int(rand, -6, 6),
];

/** @type {ReviewSkill} */
export const daoHam = {
  id: 'dao-ham',
  label: 'Đạo hàm',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0 || v === 1) {
      const f = cubic(rand);
      const x0 = int(rand, -3, 3);
      const d1 = derive(f);
      const second = v === 1;
      const g = second ? derive(d1) : d1;
      const value = polyAt(g, x0);
      const name = second ? "f''" : "f'";
      return {
        prompt: `Tính ${name}(${intText(x0)}), biết f(x) = ${polyText(f)}.`,
        answer: whole(value),
        display: intText(value),
        hints: second
          ? ["Tính f'(x), rồi lấy đạo hàm của f'(x) để được f''(x).", '(xⁿ)′ = nxⁿ⁻¹.']
          : ['(xⁿ)′ = nxⁿ⁻¹, đạo hàm của hằng số bằng 0.', 'Tính f′(x) rồi thay x.'],
        steps: [
          `f'(x) = ${polyText(d1)}.`,
          ...(second ? [`f''(x) = ${polyText(g)}.`] : []),
          `${name}(${intText(x0)}) = ${substituted(g, x0)} = ${intText(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const f = cubic(rand);
      const x0 = int(rand, -2, 2);
      const d1 = derive(f);
      const k = polyAt(d1, x0);
      const y0 = polyAt(f, x0);
      const m = y0 - k * x0;
      return {
        prompt: `Tiếp tuyến của đồ thị hàm số y = f(x) = ${polyText(f)} tại điểm có hoành độ x₀ = ${intText(x0)} có phương trình y = kx + m. Tìm m.`,
        answer: whole(m),
        display: intText(m),
        hints: [
          "Tiếp tuyến tại M(x₀; y₀) có phương trình y = f'(x₀)(x − x₀) + y₀.",
          'Khai triển rồi đọc hệ số tự do.',
        ],
        steps: [
          `y₀ = f(${intText(x0)}) = ${intText(y0)}; f'(x) = ${polyText(d1)}, nên k = f'(${intText(x0)}) = ${intText(k)}.`,
          `Tiếp tuyến: y = k(x − x₀) + y₀ = kx + (y₀ − kx₀), nên m = ${intText(y0)} − ${operand(k)} · ${operand(x0)} = ${intText(m)}.`,
        ],
      };
    }
    if (v === 3) {
      const b = int(rand, -6, 0);
      const c = int(rand, 1, 12);
      const s = [1, b, c, 0];
      const t0 = int(rand, 1, 5);
      const vel = derive(s);
      const acc = derive(vel);
      const askAcc = rand() < 0.4;
      const value = polyAt(askAcc ? acc : vel, t0);
      return {
        prompt: `Một chất điểm chuyển động có phương trình s(t) = ${polyText(s, 't')}, trong đó t tính bằng giây, s tính bằng mét. Tính ${askAcc ? 'gia tốc' : 'vận tốc'} của chất điểm tại thời điểm t = ${t0} s.`,
        answer: whole(value),
        display: intText(value),
        unit: askAcc ? 'm/s²' : 'm/s',
        hints: askAcc
          ? ["Gia tốc là đạo hàm cấp hai của quãng đường: a(t) = s''(t)."]
          : ["Vận tốc tức thời là đạo hàm của quãng đường: v(t) = s'(t)."],
        steps: [
          `v(t) = s'(t) = ${polyText(vel, 't')}.`,
          ...(askAcc ? [`a(t) = v'(t) = ${polyText(acc, 't')}.`] : []),
          `${askAcc ? 'a' : 'v'}(${t0}) = ${substituted(askAcc ? acc : vel, t0)} = ${intText(value)} (${askAcc ? 'm/s²' : 'm/s'}).`,
        ],
      };
    }
    const a = int(rand, 1, 6);
    const x0 = int(rand, -2, 4);
    const r = int(rand, 1, 6);
    const b = r * r - a * x0;
    const value = frac(a, 2 * r);
    const inner = linText(a, b);
    return {
      prompt: `Tính f'(${intText(x0)}), biết f(x) = √(${inner}).`,
      answer: value,
      display: valueShow(value),
      hints: ['(√u)′ = u′/(2√u).', `Với u = ${inner} thì u′ = ${a}.`],
      steps: [
        `f'(x) = ${a}/(2√(${inner})).`,
        `Tại x = ${intText(x0)}: ${inner.replace('x', ` · ${operand(x0)}`).replace(/^ · /, '')} = ${r * r}, nên f'(${intText(x0)}) = ${a}/(2 · ${r}) = ${ratio(a, 2 * r)}.`,
      ],
    };
  },
};

/** Every chapter of the year-end review, in book order. */
export const REVIEW_SKILLS = [
  luongGiac,
  daySo,
  ghepNhom,
  songSong,
  gioiHan,
  muLogarit,
  vuongGoc,
  xacSuat,
  daoHam,
];
