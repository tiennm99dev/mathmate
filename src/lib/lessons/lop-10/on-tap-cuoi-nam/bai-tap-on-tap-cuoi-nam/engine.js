/**
 * Question generators for the grade 10 year-end review, one skill per
 * chapter of the book in book order: sets and intervals, linear inequalities
 * in two unknowns, the triangle, vectors, the numbers that describe a sample,
 * quadratic functions, coordinates in the plane, counting and the binomial
 * theorem, and classical probability. Answers are exact values (see
 * `#lib/core/adaptive.js`); prompts, hints and steps are plain text.
 */

import { int, pick } from '#lib/core/drill.js';
import { fmt, formatNumber, intText, operand, sup } from '#lib/core/number-format.js';
import { fracText } from '#lib/core/fractions.js';
import { linText, substituteText, sumText } from '#lib/core/algebra-text.js';
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

/** A nonzero integer in [−max, −1] ∪ [1, max]. */
const nonzero = (/** @type {() => number} */ rand, /** @type {number} */ max) =>
  int(rand, 1, max) * pick(rand, [1, -1]);

/**
 * The number of k-element subsets of an n-element set.
 * @param {number} n
 * @param {number} k
 */
export function choose(n, k) {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 1; i <= k; i += 1) c = (c * (n - k + i)) / i;
  return Math.round(c);
}

/**
 * n(n − 1)…(n − k + 1), the k-arrangements of n.
 * @param {number} n
 * @param {number} k
 */
export function arrange(n, k) {
  let a = 1;
  for (let i = 0; i < k; i += 1) a *= n - i;
  return a;
}

/**
 * A polynomial in x and y from its monomials [c, ex, ey], zero terms left out:
 * '2x² − 6x + 4', '3x − 4y + 2'.
 * @param {[number, number, number][]} terms
 */
export const polyText = (terms) => sumText(terms.filter(([c]) => c !== 0));

/**
 * ax² + bx + c as plain text: '2x² − 6x + 4', '−x² + 9'.
 * @param {number} a nonzero
 * @param {number} b
 * @param {number} c
 */
export const quadText = (a, b, c) =>
  polyText([
    [a, 2, 0],
    [b, 1, 0],
    [c, 0, 0],
  ]);

/**
 * The line ax + by + c = 0 as plain text: '3x − 4y + 2 = 0'.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
export const lineText = (a, b, c) =>
  `${polyText([
    [a, 1, 0],
    [b, 0, 1],
    [c, 0, 0],
  ])} = 0`;

/** Subscript digits: 12 → '₁₂'. @param {number} n */
const subs = (n) =>
  String(n)
    .split('')
    .map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)])
    .join('');

/** The book's Cₙᵏ. @param {number} n @param {number} k */
export const C = (n, k) => `C${subs(n)}${sup(k)}`;

/** The book's Aₙᵏ. @param {number} n @param {number} k */
export const A = (n, k) => `A${subs(n)}${sup(k)}`;

/**
 * 'm/n = p/q', or just 'm/n' when that is already how `show` writes the
 * value (a fraction in lowest terms by default).
 * @param {number} m
 * @param {number} n
 * @param {(f: Fraction) => string} [show]
 */
export function ratio(m, n, show = (f) => fracText(f.n, f.d)) {
  const shown = show(frac(m, n));
  return shown === `${m}/${n}` ? shown : `${m}/${n} = ${shown}`;
}

/**
 * kv with the book's coefficient: 'a', '−a', '3a', '−2a'.
 * @param {number} k nonzero
 * @param {string} v
 */
const scaled = (k, v) => `${k === 1 ? '' : k === -1 ? '−' : intText(k)}${v}`;

/**
 * A point or a vector as plain text: '(2; −1)'.
 * @param {number} x
 * @param {number} y
 */
const pt = (x, y) => `(${intText(x)}; ${intText(y)})`;

// ---------------------------------------------------------------------------
// Mệnh đề và tập hợp

/**
 * @typedef {{ lo: number, hi: number, loIn: boolean, hiIn: boolean }} Interval
 * a bounded interval with integer ends; `loIn`/`hiIn` say whether an end belongs to it
 */

/** @param {Interval} s */
export const intervalText = (s) =>
  `${s.loIn ? '[' : '('}${intText(s.lo)}; ${intText(s.hi)}${s.hiIn ? ']' : ')'}`;

/**
 * The common part of two intervals, or null when it is empty.
 * @param {Interval} a
 * @param {Interval} b
 * @returns {Interval | null}
 */
export function meet(a, b) {
  const lo = Math.max(a.lo, b.lo);
  const hi = Math.min(a.hi, b.hi);
  const loIn = a.lo === b.lo ? a.loIn && b.loIn : a.lo > b.lo ? a.loIn : b.loIn;
  const hiIn = a.hi === b.hi ? a.hiIn && b.hiIn : a.hi < b.hi ? a.hiIn : b.hiIn;
  if (lo > hi || (lo === hi && !(loIn && hiIn))) return null;
  return { lo, hi, loIn, hiIn };
}

/**
 * The union of two overlapping intervals.
 * @param {Interval} a
 * @param {Interval} b
 * @returns {Interval}
 */
export function join(a, b) {
  const lo = Math.min(a.lo, b.lo);
  const hi = Math.max(a.hi, b.hi);
  const loIn = a.lo === b.lo ? a.loIn || b.loIn : a.lo < b.lo ? a.loIn : b.loIn;
  const hiIn = a.hi === b.hi ? a.hiIn || b.hiIn : a.hi > b.hi ? a.hiIn : b.hiIn;
  return { lo, hi, loIn, hiIn };
}

/** The integers in an interval. @param {Interval} s */
export const integersIn = (s) => s.hi - s.lo - 1 + (s.loIn ? 1 : 0) + (s.hiIn ? 1 : 0);

/** @param {() => number} rand @param {number} lo @param {number} hi @returns {Interval} */
const interval = (rand, lo, hi) => ({ lo, hi, loIn: rand() < 0.5, hiIn: rand() < 0.5 });

/** @type {ReviewSkill} */
export const tapHop = {
  id: 'tap-hop',
  label: 'Mệnh đề và tập hợp',
  make(rand) {
    if (rand() < 0.3) {
      const n = int(rand, 5, 7);
      const k = int(rand, 1, 2);
      const fixed = k === 1 ? '{1}' : '{1; 2}';
      const value = 2 ** (n - k);
      return {
        prompt: `Cho X = {1; 2; …; ${n}}. Có bao nhiêu tập hợp A thoả mãn ${fixed} ⊂ A ⊂ X?`,
        answer: whole(value),
        display: fmt(value),
        hints: [
          `Mỗi tập A như vậy gồm ${fixed} cùng với một tập con tuỳ ý của phần còn lại của X.`,
          `Phần còn lại có ${n - k} phần tử; một tập có m phần tử có 2ᵐ tập con.`,
        ],
        steps: [
          `A phải chứa ${fixed}; các phần tử khác của A lấy tuỳ ý trong ${n - k} phần tử còn lại của X.`,
          `Số tập con của một tập ${n - k} phần tử là 2${sup(n - k)} = ${fmt(value)}.`,
          `Vậy có ${fmt(value)} tập hợp A.`,
        ],
      };
    }
    for (;;) {
      const a1 = int(rand, -6, 2);
      const a2 = a1 + int(rand, 3, 7);
      const b1 = int(rand, a1, a2 - 1);
      const b2 = b1 + int(rand, 2, 7);
      const A = interval(rand, a1, a2);
      const B = interval(rand, b1, b2);
      const both = meet(A, B);
      if (!both || both.hi === both.lo) continue;
      const cap = rand() < 0.5;
      const S = cap ? both : join(A, B);
      const value = integersIn(S);
      if (value === 0) continue;
      const op = cap ? 'A ∩ B' : 'A ∪ B';
      return {
        prompt: `Cho A = ${intervalText(A)} và B = ${intervalText(B)}. Tập ${op} có bao nhiêu số nguyên?`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Biểu diễn A và B trên trục số rồi tìm phần ' +
            (cap ? 'chung của hai khoảng.' : 'gộp của hai khoảng.'),
          'Đầu mút có dấu ngoặc vuông thì thuộc tập hợp, ngoặc tròn thì không.',
        ],
        steps: [
          `${op} = ${intervalText(S)}.`,
          `Các số nguyên thuộc ${intervalText(S)} là các số từ ${intText(S.loIn ? S.lo : S.lo + 1)} đến ${intText(S.hiIn ? S.hi : S.hi - 1)}.`,
          `Vậy ${op} có ${value} số nguyên.`,
        ],
      };
    }
  },
};

// ---------------------------------------------------------------------------
// Bất phương trình và hệ bất phương trình bậc nhất hai ẩn

/** @type {ReviewSkill} */
export const heBatPhuongTrinh = {
  id: 'he-bat-phuong-trinh',
  label: 'Hệ bất phương trình bậc nhất hai ẩn',
  make(rand) {
    const s = int(rand, 4, 9);
    const t = int(rand, 2, s - 1);
    const a = int(rand, 1, 6);
    const b = nonzero(rand, 5);
    const corners = [
      [0, 0],
      [t, 0],
      [t, s - t],
      [0, s],
    ];
    const values = corners.map(([x, y]) => a * x + b * y);
    const askMax = rand() < 0.6;
    const value = askMax ? Math.max(...values) : Math.min(...values);
    const F = `F(x; y) = ${polyText([
      [a, 1, 0],
      [b, 0, 1],
    ])}`;
    const word = askMax ? 'lớn nhất' : 'nhỏ nhất';
    return {
      prompt: `Tìm giá trị ${word} của ${F} trên miền nghiệm của hệ gồm x ≥ 0, y ≥ 0, x + y ≤ ${s}, x ≤ ${t}.`,
      answer: whole(value),
      display: intText(value),
      hints: [
        'Miền nghiệm của hệ là một đa giác; giá trị lớn nhất, nhỏ nhất của F đạt tại một đỉnh của đa giác đó.',
        `Mỗi đỉnh là giao của hai đường thẳng bờ, chẳng hạn giao của đường thẳng x = ${t} với đường thẳng x + y = ${s} là một đỉnh.`,
      ],
      steps: [
        `Miền nghiệm là tứ giác với các đỉnh O(0; 0), ${pt(t, 0)}, ${pt(t, s - t)}, ${pt(0, s)}.`,
        `Giá trị của F tại các đỉnh lần lượt là ${values.map(intText).join('; ')}.`,
        `Vậy giá trị ${word} của F là ${intText(value)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Hệ thức lượng trong tam giác

/** Sides b, c with angle A = 60° between them and the opposite side a, all whole. */
/** @type {readonly (readonly [number, number, number])[]} */
export const COS60 = /** @type {const} */ ([
  [3, 8, 7],
  [5, 8, 7],
  [8, 15, 13],
  [7, 15, 13],
  [5, 21, 19],
  [16, 21, 19],
]);

/** The same for A = 120°. */
/** @type {readonly (readonly [number, number, number])[]} */
export const COS120 = /** @type {const} */ ([
  [3, 5, 7],
  [7, 8, 13],
  [5, 16, 19],
  [11, 24, 31],
]);

/** Triangles with whole sides and whole area (Heron). */
export const HERON = /** @type {const} */ ([
  [13, 14, 15, 84],
  [5, 5, 6, 12],
  [5, 5, 8, 12],
  [10, 13, 13, 60],
  [9, 10, 17, 36],
  [7, 15, 20, 42],
  [6, 25, 29, 60],
]);

/** @type {ReviewSkill} */
export const heThucLuong = {
  id: 'he-thuc-luong',
  label: 'Hệ thức lượng trong tam giác',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const wide = rand() < 0.4;
      const [b, c, a] = pick(rand, wide ? COS120 : COS60);
      const angle = wide ? 120 : 60;
      const twice = wide ? b * c : -b * c;
      return {
        prompt: `Tam giác ABC có AB = ${c}, AC = ${b} và góc A bằng ${angle}°. Tính BC.`,
        answer: whole(a),
        display: String(a),
        hints: [
          'Biết hai cạnh và góc xen giữa, dùng định lí côsin.',
          `BC² = AB² + AC² − 2 · AB · AC · cos A, với cos ${angle}° = ${wide ? '−1/2' : '1/2'}.`,
        ],
        steps: [
          `BC² = ${c}² + ${b}² − 2 · ${c} · ${b} · cos ${angle}° = ${c * c} + ${b * b} ${twice < 0 ? '−' : '+'} ${Math.abs(twice)} = ${a * a}.`,
          `BC = √${a * a} = ${a}.`,
        ],
      };
    }
    if (v === 1) {
      const b = int(rand, 3, 12);
      const c = int(rand, 3, 12);
      const angle = pick(rand, [30, 150]);
      const S = frac(b * c, 4);
      return {
        prompt: `Tam giác ABC có AB = ${c} cm, AC = ${b} cm và góc A bằng ${angle}°. Tính diện tích tam giác ABC (theo cm²).`,
        answer: S,
        display: valueShow(S),
        hints: [
          'Diện tích tam giác bằng nửa tích hai cạnh nhân sin góc xen giữa: S = (1/2) · AB · AC · sin A.',
          `sin ${angle}° = 1/2.`,
        ],
        steps: [
          `S = (1/2) · ${c} · ${b} · sin ${angle}° = (1/2) · ${b * c} · (1/2) = ${b * c}/4.`,
          `S = ${valueShow(S)} (cm²).`,
        ],
      };
    }
    const [a, b, c, S] = pick(rand, HERON);
    const p = (a + b + c) / 2;
    const ask = pick(rand, ['S', 'R', 'r']);
    const heron = `S = √(p(p − a)(p − b)(p − c)) = √(${p} · ${p - a} · ${p - b} · ${p - c}) = √${S * S} = ${S}.`;
    if (ask === 'S') {
      return {
        prompt: `Tính diện tích tam giác có ba cạnh ${a}, ${b}, ${c}.`,
        answer: whole(S),
        display: String(S),
        hints: ['Biết ba cạnh, dùng công thức Heron.', `Nửa chu vi p = (${a} + ${b} + ${c}) : 2.`],
        steps: [`p = (${a} + ${b} + ${c}) : 2 = ${p}.`, heron, `Diện tích là ${S}.`],
      };
    }
    if (ask === 'R') {
      const R = frac(a * b * c, 4 * S);
      return {
        prompt: `Tam giác có ba cạnh ${a}, ${b}, ${c}. Tính bán kính R của đường tròn ngoại tiếp tam giác.`,
        answer: R,
        display: valueShow(R),
        hints: [
          'Tính diện tích S bằng công thức Heron trước.',
          'Dùng S = abc/(4R), tức là R = abc/(4S).',
        ],
        steps: [`p = ${p}; ${heron}`, `R = abc/(4S) = ${a * b * c}/(4 · ${S}) = ${valueShow(R)}.`],
      };
    }
    const r = frac(S, p);
    return {
      prompt: `Tam giác có ba cạnh ${a}, ${b}, ${c}. Tính bán kính r của đường tròn nội tiếp tam giác.`,
      answer: r,
      display: valueShow(r),
      hints: ['Tính diện tích S bằng công thức Heron trước.', 'Dùng S = pr, với p là nửa chu vi.'],
      steps: [`p = ${p}; ${heron}`, `r = S/p = ${ratio(S, p, valueShow)}.`],
    };
  },
};

// ---------------------------------------------------------------------------
// Vectơ

/** Whole-length vectors (x, y, length). */
export const LONG = /** @type {const} */ ([
  [3, 4, 5],
  [4, 3, 5],
  [5, 0, 5],
  [0, 5, 5],
  [6, 8, 10],
  [8, 6, 10],
  [5, 12, 13],
  [12, 5, 13],
  [1, 0, 1],
  [0, 2, 2],
]);

/** A whole-length vector with random signs. @param {() => number} rand */
function longVector(rand) {
  const [x, y, len] = pick(rand, LONG);
  return { x: x * pick(rand, [1, -1]), y: y * pick(rand, [1, -1]), len };
}

/** @type {ReviewSkill} */
export const vecto = {
  id: 'vecto',
  label: 'Vectơ và tích vô hướng',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const [a1, a2, b1, b2] = [
        nonzero(rand, 6),
        nonzero(rand, 6),
        nonzero(rand, 6),
        nonzero(rand, 6),
      ];
      const dot = a1 * b1 + a2 * b2;
      return {
        prompt: `Cho vectơ a = ${pt(a1, a2)} và vectơ b = ${pt(b1, b2)}. Tính tích vô hướng a · b.`,
        answer: whole(dot),
        display: intText(dot),
        hints: [
          'Với a = (x; y), b = (x′; y′) thì a · b = xx′ + yy′.',
          'Nhân hoành độ với hoành độ, tung độ với tung độ rồi cộng lại.',
        ],
        steps: [
          `a · b = ${intText(a1)} · ${operand(b1)} + ${operand(a2)} · ${operand(b2)} = ${intText(a1 * b1)} + ${operand(a2 * b2)} = ${intText(dot)}.`,
        ],
      };
    }
    if (v === 1) {
      const [a1, a2, b1, b2] = [
        nonzero(rand, 5),
        nonzero(rand, 5),
        nonzero(rand, 5),
        nonzero(rand, 5),
      ];
      const m = nonzero(rand, 3);
      const n = nonzero(rand, 3);
      const askX = rand() < 0.5;
      const ux = m * a1 + n * b1;
      const uy = m * a2 + n * b2;
      const value = askX ? ux : uy;
      const u = `${scaled(m, 'a')} ${n < 0 ? '−' : '+'} ${scaled(Math.abs(n), 'b')}`;
      return {
        prompt: `Cho vectơ a = ${pt(a1, a2)}, vectơ b = ${pt(b1, b2)} và vectơ u = ${u}. Tìm ${askX ? 'hoành độ' : 'tung độ'} của vectơ u.`,
        answer: whole(value),
        display: intText(value),
        hints: [
          'Toạ độ của ka là (kx; ky); toạ độ của tổng hai vectơ là tổng các toạ độ tương ứng.',
          `Tính ${scaled(m, 'a')} và ${scaled(n, 'b')} theo toạ độ rồi cộng.`,
        ],
        steps: [
          `${scaled(m, 'a')} = ${pt(m * a1, m * a2)}, ${scaled(n, 'b')} = ${pt(n * b1, n * b2)}.`,
          `u = ${pt(ux, uy)}.`,
          `${askX ? 'Hoành độ' : 'Tung độ'} của u là ${intText(value)}.`,
        ],
      };
    }
    for (;;) {
      const a = longVector(rand);
      const b = longVector(rand);
      const dot = a.x * b.x + a.y * b.y;
      const cos = frac(dot, a.len * b.len);
      if (cos.n === 0 && rand() < 0.7) continue;
      return {
        prompt: `Cho vectơ a = ${pt(a.x, a.y)} và vectơ b = ${pt(b.x, b.y)}. Tính cos(a, b), viết dưới dạng phân số tối giản.`,
        answer: cos,
        display: fracText(cos.n, cos.d),
        simplest: true,
        hints: ['cos(a, b) = (a · b) / (|a| · |b|).', '|a| = √(x² + y²); tính độ dài từng vectơ.'],
        steps: [
          `a · b = ${intText(a.x)} · ${operand(b.x)} + ${operand(a.y)} · ${operand(b.y)} = ${intText(dot)}.`,
          `|a| = ${a.len}, |b| = ${b.len}.`,
          `cos(a, b) = ${intText(dot)}/(${a.len} · ${b.len}) = ${fracText(cos.n, cos.d)}.`,
        ],
      };
    }
  },
};

// ---------------------------------------------------------------------------
// Các số đặc trưng của mẫu số liệu không ghép nhóm

/** @type {ReviewSkill} */
export const soDacTrung = {
  id: 'so-dac-trung',
  label: 'Các số đặc trưng của mẫu số liệu',
  make(rand) {
    const v = int(rand, 0, 2);
    const n = int(rand, 5, 8);
    const data = Array.from({ length: n }, () => int(rand, 2, 15));
    const listed = data.join('; ');
    const sorted = [...data].sort((x, y) => x - y);
    const total = data.reduce((s, x) => s + x, 0);
    if (v === 0) {
      const mean = frac(total, n);
      if (valueShow(mean).includes('/')) return soDacTrung.make(rand);
      return {
        prompt: `Điểm kiểm tra của một nhóm học sinh là: ${listed}. Tính số trung bình của mẫu số liệu.`,
        answer: mean,
        display: valueShow(mean),
        hints: ['Số trung bình bằng tổng các giá trị chia cho số giá trị.', `Mẫu có ${n} giá trị.`],
        steps: [
          `Tổng các giá trị: ${data.join(' + ')} = ${total}.`,
          `Số trung bình: ${total} : ${n} = ${valueShow(mean)}.`,
        ],
      };
    }
    if (v === 1) {
      const mid = n % 2 ? frac(sorted[(n - 1) / 2], 1) : frac(sorted[n / 2 - 1] + sorted[n / 2], 2);
      return {
        prompt: `Thời gian (phút) đi từ nhà đến trường của một nhóm học sinh là: ${listed}. Tìm trung vị của mẫu số liệu.`,
        answer: mid,
        display: valueShow(mid),
        hints: [
          'Sắp xếp các giá trị theo thứ tự không giảm trước.',
          n % 2
            ? 'Số giá trị lẻ: trung vị là giá trị đứng chính giữa.'
            : 'Số giá trị chẵn: trung vị là trung bình cộng của hai giá trị đứng giữa.',
        ],
        steps: [
          `Sắp xếp: ${sorted.join('; ')}.`,
          n % 2
            ? `Có ${n} giá trị, giá trị thứ ${(n + 1) / 2} là ${sorted[(n - 1) / 2]}.`
            : `Có ${n} giá trị, hai giá trị đứng giữa là ${sorted[n / 2 - 1]} và ${sorted[n / 2]}; (${sorted[n / 2 - 1]} + ${sorted[n / 2]}) : 2 = ${valueShow(mid)}.`,
          `Trung vị là ${valueShow(mid)}.`,
        ],
      };
    }
    // Variance with a whole mean (the last value is shifted so the total
    // divides by n) and 5 or 8 values, so that s² is a finished decimal.
    const size = pick(rand, [5, 8]);
    const small = Array.from({ length: size }, () => int(rand, 2, 12));
    const extra = (size - (small.reduce((s, x) => s + x, 0) % size)) % size;
    small[size - 1] += extra;
    const sum = small.reduce((s, x) => s + x, 0);
    const mean = sum / size;
    const squares = small.map((x) => (x - mean) ** 2);
    const sq = squares.reduce((s, x) => s + x, 0);
    const s2 = frac(sq, size);
    return {
      prompt: `Cho mẫu số liệu: ${small.join('; ')}. Tính phương sai của mẫu số liệu.`,
      answer: s2,
      display: valueShow(s2),
      hints: [
        'Tính số trung bình trước.',
        'Phương sai s² bằng trung bình cộng của bình phương độ lệch của mỗi giá trị so với số trung bình.',
      ],
      steps: [
        `Số trung bình: ${sum} : ${size} = ${mean}.`,
        `Bình phương các độ lệch: ${squares.join('; ')}; tổng bằng ${sq}.`,
        `s² = ${sq} : ${size} = ${valueShow(s2)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Hàm số, đồ thị và ứng dụng

/** @type {ReviewSkill} */
export const hamSoBacHai = {
  id: 'ham-so-bac-hai',
  label: 'Hàm số bậc hai và tam thức bậc hai',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const a = nonzero(rand, 3);
      const h = int(rand, -4, 4);
      const k = int(rand, -9, 9);
      const b = -2 * a * h;
      const c = a * h * h + k;
      const word = a > 0 ? 'nhỏ nhất' : 'lớn nhất';
      return {
        prompt: `Tìm giá trị ${word} của hàm số y = ${quadText(a, b, c)}.`,
        answer: whole(k),
        display: intText(k),
        hints: [
          `Hệ số a = ${intText(a)} ${a > 0 ? '> 0 nên parabol quay bề lõm lên trên' : '< 0 nên parabol quay bề lõm xuống dưới'}; giá trị cần tìm đạt tại đỉnh.`,
          'Đỉnh có hoành độ x = −b/(2a).',
        ],
        steps: [
          `Hoành độ đỉnh: x = −b/(2a) = ${intText(h)}.`,
          `Tung độ đỉnh: y(${intText(h)}) = ${intText(k)}.`,
          `Giá trị ${word} của hàm số là ${intText(k)}, đạt tại x = ${intText(h)}.`,
        ],
      };
    }
    if (v === 1) {
      const p = int(rand, -5, 3);
      const q = p + int(rand, 2, 7);
      const up = rand() < 0.6;
      const strict = rand() < 0.5;
      const a = up ? 1 : -1;
      const sign = up ? (strict ? '<' : '≤') : strict ? '>' : '≥';
      const value = strict ? q - p - 1 : q - p + 1;
      return {
        prompt: `Bất phương trình ${quadText(a, -a * (p + q), a * p * q)} ${sign} 0 có bao nhiêu nghiệm nguyên?`,
        answer: whole(value),
        display: String(value),
        hints: [
          'Tìm hai nghiệm của tam thức bậc hai ở vế trái.',
          'Trong khoảng giữa hai nghiệm, tam thức trái dấu với hệ số a; ngoài khoảng đó, cùng dấu với a.',
        ],
        steps: [
          `Tam thức có hai nghiệm x = ${intText(p)} và x = ${intText(q)}, hệ số a = ${intText(a)}.`,
          `Tập nghiệm là ${strict ? `(${intText(p)}; ${intText(q)})` : `[${intText(p)}; ${intText(q)}]`}.`,
          `Các nghiệm nguyên là các số từ ${intText(strict ? p + 1 : p)} đến ${intText(strict ? q - 1 : q)}, có ${value} số.`,
        ],
      };
    }
    // √(2x² + bx + c) = x + d: squaring gives x² + (b − 2d)x + c − d² = 0 with
    // roots r1, r2, where only r1 keeps x + d ≥ 0.
    for (;;) {
      const d = int(rand, -3, 4);
      const r1 = int(rand, -d, -d + 5);
      const r2 = int(rand, -d - 6, -d - 1);
      const b = 2 * d - (r1 + r2);
      const c = d * d + r1 * r2;
      if (b === 0 && c === 0) continue;
      const right = linText(1, d);
      return {
        prompt: `Giải phương trình √(${quadText(2, b, c)}) = ${right}. Nhập nghiệm của phương trình.`,
        answer: whole(r1),
        display: intText(r1),
        hints: [
          `Điều kiện: ${right} ≥ 0. Bình phương hai vế để được một phương trình bậc hai.`,
          'Giải phương trình bậc hai rồi thử lại từng nghiệm với điều kiện.',
        ],
        steps: [
          `Bình phương hai vế: ${quadText(2, b, c)} = (${right})², tức là ${quadText(1, b - 2 * d, c - d * d)} = 0.`,
          `Phương trình này có hai nghiệm x = ${intText(r1)} và x = ${intText(r2)}.`,
          `Với x = ${intText(r2)} thì ${right} = ${intText(r2 + d)} < 0, loại. Với x = ${intText(r1)} thì ${right} = ${intText(r1 + d)} ≥ 0, thoả mãn.`,
          `Vậy phương trình có nghiệm x = ${intText(r1)}.`,
        ],
      };
    }
  },
};

// ---------------------------------------------------------------------------
// Phương pháp toạ độ trong mặt phẳng

/** Normal vectors (a, b) with a whole length. */
const NORMALS = /** @type {const} */ ([
  [3, 4, 5],
  [4, 3, 5],
  [3, -4, 5],
  [4, -3, 5],
  [5, 12, 13],
  [12, -5, 13],
  [1, 0, 1],
  [0, 1, 1],
]);

/** @type {ReviewSkill} */
export const toaDo = {
  id: 'toa-do',
  label: 'Đường thẳng và đường tròn trong mặt phẳng toạ độ',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      for (;;) {
        const [a, b, len] = pick(rand, NORMALS);
        const c = int(rand, -12, 12);
        const x0 = int(rand, -5, 5);
        const y0 = int(rand, -5, 5);
        const top = a * x0 + b * y0 + c;
        if (top === 0) continue;
        const dist = frac(Math.abs(top), len);
        const sub = substituteText(a, b, x0, y0).replace(/ = .*$/, '');
        return {
          prompt: `Tính khoảng cách từ điểm M${pt(x0, y0)} đến đường thẳng Δ: ${lineText(a, b, c)}.`,
          answer: dist,
          display: valueShow(dist),
          hints: [
            'd(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²).',
            `Đường thẳng Δ có vectơ pháp tuyến ${pt(a, b)}.`,
          ],
          steps: [
            `ax₀ + by₀ + c = ${sub}${c ? ` ${c < 0 ? '−' : '+'} ${Math.abs(c)}` : ''} = ${intText(top)}.`,
            `√(${operand(a)}² + ${operand(b)}²) = ${len}.`,
            `d(M, Δ) = |${intText(top)}| / ${len} = ${valueShow(dist)}.`,
          ],
        };
      }
    }
    if (v === 1) {
      const a = int(rand, -5, 5);
      const b = int(rand, -5, 5);
      const R = int(rand, 1, 7);
      const c = a * a + b * b - R * R;
      const circle = polyText([
        [1, 2, 0],
        [1, 0, 2],
        [-2 * a, 1, 0],
        [-2 * b, 0, 1],
        [c, 0, 0],
      ]);
      return {
        prompt: `Tính bán kính của đường tròn ${circle} = 0.`,
        answer: whole(R),
        display: String(R),
        hints: [
          'Phương trình x² + y² − 2ax − 2by + c = 0 (với a² + b² − c > 0) là đường tròn tâm I(a; b), bán kính R = √(a² + b² − c).',
          'Đọc a, b từ hệ số của x và y: hệ số của x bằng −2a.',
        ],
        steps: [
          `Tâm I${pt(a, b)}, c = ${intText(c)}.`,
          `R² = ${operand(a)}² + ${operand(b)}² − ${operand(c)} = ${R * R}.`,
          `R = ${R}.`,
        ],
      };
    }
    const p = nonzero(rand, 3);
    const q = nonzero(rand, 3);
    const right = rand() < 0.5;
    const [a2, b2] = right ? [-q, p] : [p - q, p + q];
    const c1 = int(rand, -6, 6);
    const c2 = int(rand, -6, 6);
    const dot = p * a2 + q * b2;
    const angle = right ? 90 : 45;
    return {
      prompt: `Tính góc giữa hai đường thẳng ${lineText(p, q, c1)} và ${lineText(a2, b2, c2)} (độ).`,
      answer: whole(angle),
      display: String(angle),
      unit: '°',
      hints: [
        'Góc giữa hai đường thẳng tính qua hai vectơ pháp tuyến n₁, n₂: cos φ = |n₁ · n₂| / (|n₁| · |n₂|).',
        `n₁ = ${pt(p, q)}, n₂ = ${pt(a2, b2)}.`,
      ],
      steps: [
        `n₁ · n₂ = ${intText(p)} · ${operand(a2)} + ${operand(q)} · ${operand(b2)} = ${intText(dot)}.`,
        right
          ? 'Tích vô hướng bằng 0 nên hai vectơ pháp tuyến vuông góc, cos φ = 0.'
          : `|n₁| = √${p * p + q * q}, |n₂| = √${a2 * a2 + b2 * b2}; cos φ = ${dot}/(√${p * p + q * q} · √${a2 * a2 + b2 * b2}) = 1/√2.`,
        `Vậy φ = ${angle}°.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Đại số tổ hợp

/** @type {ReviewSkill} */
export const toHop = {
  id: 'to-hop',
  label: 'Quy tắc đếm, hoán vị, chỉnh hợp, tổ hợp, nhị thức Newton',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const n = int(rand, 6, 12);
      const k = int(rand, 2, 3);
      const value = choose(n, k);
      return {
        prompt: `Lớp có ${n} bạn xung phong. Có bao nhiêu cách chọn ${k} bạn đi trực nhật?`,
        answer: whole(value),
        display: fmt(value),
        hints: [
          'Các bạn được chọn không có thứ tự, không phân biệt vai trò.',
          `Mỗi cách chọn là một tổ hợp chập ${k} của ${n}, số cách là ${C(n, k)} = n!/(k!(n − k)!).`,
        ],
        steps: [
          `Số cách chọn là ${C(n, k)} = ${fmt(arrange(n, k))} : ${arrange(k, k)} = ${fmt(value)}.`,
        ],
      };
    }
    if (v === 1) {
      const n = int(rand, 5, 10);
      const k = int(rand, 2, 3);
      const value = arrange(n, k);
      const roles =
        k === 2 ? 'một lớp trưởng và một lớp phó' : 'một lớp trưởng, một lớp phó và một bí thư';
      return {
        prompt: `Từ ${n} ứng viên, cần chọn ${roles} (mỗi người giữ nhiều nhất một chức). Có bao nhiêu cách chọn?`,
        answer: whole(value),
        display: fmt(value),
        hints: [
          'Các chức vụ khác nhau nên thứ tự chọn có ý nghĩa.',
          `Mỗi cách chọn là một chỉnh hợp chập ${k} của ${n}, số cách là ${A(n, k)} = n!/(n − k)!.`,
        ],
        steps: [
          `Số cách chọn là ${A(n, k)} = ${Array.from({ length: k }, (_, i) => n - i).join(' · ')} = ${fmt(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const boys = int(rand, 3, 7);
      const girls = int(rand, 3, 7);
      const all = choose(boys + girls, 3);
      const value = all - choose(boys, 3) - choose(girls, 3);
      return {
        prompt: `Một nhóm có ${boys} nam và ${girls} nữ. Có bao nhiêu cách chọn 3 người có cả nam và nữ?`,
        answer: whole(value),
        display: fmt(value),
        hints: [
          'Đếm phần bù: lấy tất cả cách chọn 3 người trừ đi các cách chọn chỉ toàn nam hoặc chỉ toàn nữ.',
          `Tất cả có ${C(boys + girls, 3)} cách.`,
        ],
        steps: [
          `Chọn 3 người bất kì: ${C(boys + girls, 3)} = ${fmt(all)}.`,
          `Toàn nam: ${C(boys, 3)} = ${choose(boys, 3)}; toàn nữ: ${C(girls, 3)} = ${choose(girls, 3)}.`,
          `Số cách cần tìm: ${fmt(all)} − ${choose(boys, 3)} − ${choose(girls, 3)} = ${fmt(value)}.`,
        ],
      };
    }
    const n = pick(rand, [4, 5]);
    const a = pick(rand, [1, 2, 3]);
    const b = nonzero(rand, 3);
    const k = int(rand, 1, n - 1);
    const value = choose(n, k) * a ** k * b ** (n - k);
    const inner = `${a === 1 ? '' : a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}`;
    return {
      prompt: `Tìm hệ số của x${sup(k)} trong khai triển (${inner})${sup(n)}.`,
      answer: whole(value),
      display: intText(value),
      hints: [
        `Số hạng tổng quát của (${inner})${sup(n)} là ${C(n, 0).slice(0, -1)}ᵏ · (${a === 1 ? '' : a}x)ᵏ · ${operand(b)}${sup(n)}⁻ᵏ.`,
        `Số hạng chứa x${sup(k)} ứng với k = ${k}.`,
      ],
      steps: [
        `Số hạng chứa x${sup(k)}: ${C(n, k)} · (${a === 1 ? '' : a}x)${sup(k)} · ${operand(b)}${sup(n - k)}.`,
        `Hệ số: ${choose(n, k)} · ${a ** k} · ${operand(b ** (n - k))} = ${intText(value)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Tính xác suất theo định nghĩa cổ điển

/** @type {ReviewSkill} */
export const xacSuat = {
  id: 'xac-suat',
  label: 'Xác suất theo định nghĩa cổ điển',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const red = int(rand, 2, 7);
      const blue = int(rand, 2, 7);
      const n = red + blue;
      const omega = choose(n, 2);
      const mixed = rand() < 0.5;
      const good = mixed ? red * blue : choose(red, 2);
      const P = frac(good, omega);
      return {
        prompt: `Một hộp có ${red} quả bóng đỏ và ${blue} quả bóng xanh. Lấy ngẫu nhiên đồng thời 2 quả. Tính xác suất để ${mixed ? 'hai quả khác màu' : 'cả hai quả đều màu đỏ'} (phân số tối giản).`,
        answer: P,
        display: fracText(P.n, P.d),
        simplest: true,
        hints: [
          `Không gian mẫu gồm các tổ hợp chập 2 của ${n} quả bóng.`,
          mixed
            ? 'Chọn 1 quả đỏ và 1 quả xanh, dùng quy tắc nhân.'
            : 'Chọn 2 quả trong số các quả đỏ.',
        ],
        steps: [
          `n(Ω) = ${C(n, 2)} = ${omega}.`,
          mixed
            ? `Số kết quả thuận lợi: ${red} · ${blue} = ${good}.`
            : `Số kết quả thuận lợi: ${C(red, 2)} = ${good}.`,
          `P = ${ratio(good, omega)}.`,
        ],
      };
    }
    if (v === 1) {
      const kind = pick(rand, ['eq', 'le', 'ge']);
      const s = kind === 'eq' ? int(rand, 3, 11) : int(rand, 4, 10);
      const good = [];
      for (let a = 1; a <= 6; a += 1)
        for (let b = 1; b <= 6; b += 1) {
          const t = a + b;
          if (kind === 'eq' ? t === s : kind === 'le' ? t <= s : t >= s) good.push([a, b]);
        }
      const P = frac(good.length, 36);
      const word =
        kind === 'eq' ? `bằng ${s}` : kind === 'le' ? `không vượt quá ${s}` : `ít nhất bằng ${s}`;
      return {
        prompt: `Gieo hai con xúc xắc cân đối. Tính xác suất để tổng số chấm xuất hiện ${word} (phân số tối giản).`,
        answer: P,
        display: fracText(P.n, P.d),
        simplest: true,
        hints: [
          'Không gian mẫu gồm 36 cặp (a; b) đồng khả năng.',
          'Lập bảng 6 × 6 các tổng rồi đếm các ô thoả mãn.',
        ],
        steps: [
          'n(Ω) = 6 · 6 = 36.',
          `Có ${good.length} cặp (a; b) có tổng ${word}.`,
          `P = ${ratio(good.length, 36)}.`,
        ],
      };
    }
    const red = int(rand, 3, 7);
    const blue = int(rand, 2, 5);
    const n = red + blue;
    const omega = choose(n, 3);
    const none = choose(red, 3);
    const P = frac(omega - none, omega);
    return {
      prompt: `Một hộp có ${red} viên bi đỏ và ${blue} viên bi xanh. Lấy ngẫu nhiên đồng thời 3 viên. Tính xác suất để có ít nhất một viên bi xanh (phân số tối giản).`,
      answer: P,
      display: fracText(P.n, P.d),
      simplest: true,
      hints: [
        'Dùng biến cố đối: "không có viên bi xanh nào", tức là cả 3 viên đều đỏ.',
        'P(E) = 1 − P(biến cố đối).',
      ],
      steps: [
        `n(Ω) = ${C(n, 3)} = ${omega}.`,
        `Biến cố đối "cả 3 viên đều đỏ" có ${C(red, 3)} = ${none} kết quả.`,
        `P = 1 − ${none}/${omega} = ${ratio(omega - none, omega)}.`,
      ],
    };
  },
};

/** Every chapter of the year-end review, in book order. */
export const REVIEW_SKILLS = [
  tapHop,
  heBatPhuongTrinh,
  heThucLuong,
  vecto,
  soDacTrung,
  hamSoBacHai,
  toaDo,
  toHop,
  xacSuat,
];
