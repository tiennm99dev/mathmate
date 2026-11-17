/**
 * Question generators for the grade 12 year-end review, in book order:
 * monotonicity and extrema, extreme values and asymptotes, vectors and
 * coordinates in space, the spread of a grouped sample, antiderivatives and
 * integrals, planes and lines in space, spheres and angles, and conditional
 * probability. Answers are exact values (see `#lib/core/adaptive.js`);
 * prompts, hints and steps are plain text.
 */

import { int, nonZero, pick, partition, shuffle } from '#lib/core/drill.js';
import { MINUS, fmt, formatNumber, intText, operand, sup } from '#lib/core/number-format.js';
import { fracText } from '#lib/core/fractions.js';
import { factorText, linText, sumText } from '#lib/core/algebra-text.js';
import { fraction, simplify } from '#lib/fraction-engine/index.js';
import { cross3, sub3 } from '#lib/geom-engine/solid.js';

/** @typedef {import('#lib/core/adaptive.js').ReviewSkill} ReviewSkill */
/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */
/** @typedef {[number, number, number]} V3 */

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
 * '−0,25', '0,046'), otherwise a fraction in lowest terms ('13/6').
 * @param {Fraction} f
 */
export function valueShow(f) {
  let d = f.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? formatNumber(f.n / f.d, 8) : fracText(f.n, f.d);
}

/**
 * A point or vector in space: (1; −2; 3).
 * @param {readonly number[]} v
 */
export const pt3 = (v) => `(${v.map(intText).join('; ')})`;

/** @param {readonly number[]} u @param {readonly number[]} v */
export const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

/** @param {readonly number[]} u */
const len2 = (u) => dot(u, u);

/**
 * A polynomial in x from its coefficients, highest power first:
 * [2, 0, −3, 1] → '2x³ − 3x + 1'.
 * @param {number[]} coeffs
 */
export function polyText(coeffs) {
  const top = coeffs.length - 1;
  /** @type {[number, number, number][]} */
  const terms = [];
  coeffs.forEach((c, i) => {
    if (c !== 0) terms.push([c, top - i, 0]);
  });
  return terms.length ? sumText(terms) : '0';
}

/**
 * The value of a polynomial (highest power first) at x.
 * @param {number[]} coeffs
 * @param {number} x
 */
export const polyAt = (coeffs, x) => coeffs.reduce((acc, c) => acc * x + c, 0);

/**
 * A linear form in x, y, z with a constant term: ([2, 0, −1], 3) →
 * '2x − z + 3'.
 * @param {readonly number[]} n coefficients of x, y, z
 * @param {number} d constant term
 */
export function formText(n, d) {
  let out = '';
  ['x', 'y', 'z', ''].forEach((name, i) => {
    const c = i < 3 ? n[i] : d;
    if (c === 0) return;
    const mag = Math.abs(c);
    const body = name === '' ? fmt(mag) : `${mag === 1 ? '' : fmt(mag)}${name}`;
    if (out === '') out = `${c < 0 ? MINUS : ''}${body}`;
    else out += ` ${c < 0 ? MINUS : '+'} ${body}`;
  });
  return out === '' ? '0' : out;
}

/**
 * One equation of a line in parametric form: (1, 2) → '1 + 2t', (0, −1) →
 * '−t', (3, 0) → '3'.
 * @param {number} a0
 * @param {number} u
 */
export function paramText(a0, u) {
  if (u === 0 || a0 === 0) return linText(u, a0, 't');
  return `${intText(a0)} ${u < 0 ? MINUS : '+'} ${Math.abs(u) === 1 ? '' : fmt(Math.abs(u))}t`;
}

/**
 * The rest of a sum after a first term: '−2x + 3' → '− 2x + 3', '2x' → '+ 2x'.
 * @param {string} text
 */
const tail = (text) => (text.startsWith(MINUS) ? `${MINUS} ${text.slice(1)}` : `+ ${text}`);

/**
 * A line through A with direction u: 'x = 1 + 2t, y = −t, z = 3'.
 * @param {readonly number[]} a
 * @param {readonly number[]} u
 */
export function lineText(a, u) {
  return ['x', 'y', 'z'].map((name, i) => `${name} = ${paramText(a[i], u[i])}`).join(', ');
}

/**
 * The scalar product written out term by term: '1 · 2 + (−3) · 4 + 0 · 1'.
 * @param {readonly number[]} u
 * @param {readonly number[]} v
 */
export const dotText = (u, v) =>
  [0, 1, 2].map((i) => `${operand(u[i])} · ${operand(v[i])}`).join(' + ');

/**
 * A sum of squares written out: '1² + (−2)² + 2²'.
 * @param {readonly number[]} u
 */
const squaresText = (u) => u.map((c) => `${operand(c)}²`).join(' + ');

/** @param {() => number} rand @param {number} [lo] @param {number} [hi] */
const point = (rand, lo = -3, hi = 3) => /** @type {V3} */ ([0, 1, 2].map(() => int(rand, lo, hi)));

/** @param {() => number} rand a vector that is not the zero vector */
function vector(rand, lo = -3, hi = 3) {
  for (;;) {
    const v = point(rand, lo, hi);
    if (v.some((c) => c !== 0)) return v;
  }
}

/** Whole vectors with whole lengths: a² + b² + c² = d². */
export const QUADRUPLES = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [1, 4, 8, 9],
  [4, 4, 7, 9],
  [2, 6, 9, 11],
];

/**
 * A vector of whole length: a quadruple's first three numbers, shuffled
 * and with random signs, and that length.
 * @param {() => number} rand
 */
function wholeVector(rand) {
  const [a, b, c, d] = pick(rand, QUADRUPLES);
  const v = /** @type {V3} */ (shuffle(rand, [a, b, c]).map((t) => (rand() < 0.5 ? -t : t)));
  return { v, len: d };
}

const COORD_NAMES = ['hoành độ', 'tung độ', 'cao độ'];

/** @param {readonly number[]} v */
const xyz = (v) => ({ x: v[0], y: v[1], z: v[2] });

/**
 * Whether three points lie on one line (two of them equal included).
 * @param {readonly number[]} a
 * @param {readonly number[]} b
 * @param {readonly number[]} c
 */
export function collinear(a, b, c) {
  const n = cross3(sub3(xyz(b), xyz(a)), sub3(xyz(c), xyz(a)));
  return n.x === 0 && n.y === 0 && n.z === 0;
}

/**
 * The length √n of a vector from its squared length, whole when it is one:
 * 4 → '2', 2 → '√2'.
 * @param {number} n
 */
const rootText = (n) => {
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? fmt(r) : `√${fmt(n)}`;
};

// ---------------------------------------------------------------------------
// Ứng dụng đạo hàm

/**
 * A cubic a·x³ + … whose derivative 3a(x − p)(x − q) has whole roots p < q
 * of the same parity, so every coefficient is whole.
 * @param {() => number} rand
 */
export function cubic(rand) {
  const a = pick(rand, [1, -1]);
  const p = int(rand, -3, 2);
  const q = p + 2 * int(rand, 1, 2);
  const s = p + q;
  const c = int(rand, -4, 4);
  const coeffs = [a, (-3 * a * s) / 2, 3 * a * p * q, c];
  const dText = polyText([3 * a, -3 * a * s, 3 * a * p * q]);
  const factored = `${a === 1 ? '3' : `${MINUS}3`}${(q === 0 ? [q, p] : [p, q])
    .map((r) => (r === 0 ? 'x' : `(${factorText(r)})`))
    .join('')}`;
  return { a, p, q, coeffs, dText, factored };
}

/**
 * The sign of f′ around its roots, as the variation table reads it.
 * @param {ReturnType<typeof cubic>} f
 */
function signLine(f) {
  const { a, p, q } = f;
  const out = a === 1 ? '+' : MINUS;
  const mid = a === 1 ? MINUS : '+';
  return `f′(x) mang dấu ${out} trên (${MINUS}∞; ${intText(p)}) và (${intText(q)}; +∞), mang dấu ${mid} trên (${intText(p)}; ${intText(q)}).`;
}

/** @type {ReviewSkill} */
export const cucTri = {
  id: 'cuc-tri',
  label: 'Tính đơn điệu và cực trị của hàm số',
  make(rand) {
    const f = cubic(rand);
    const { a, p, q, coeffs } = f;
    const fx = polyText(coeffs);
    const xCD = a === 1 ? p : q;
    const xCT = a === 1 ? q : p;
    const first = [
      `f′(x) = ${f.dText} = ${f.factored}; f′(x) = 0 ⇔ x = ${intText(p)} hoặc x = ${intText(q)}.`,
      signLine(f),
    ];
    const v = int(rand, 0, 2);
    if (v === 0) {
      const y = polyAt(coeffs, xCD);
      return {
        prompt: `Tìm giá trị cực đại của hàm số y = ${fx}.`,
        answer: whole(y),
        display: intText(y),
        hints: [
          'Tính f′(x), tìm các nghiệm của f′(x) = 0 rồi xét dấu f′(x).',
          'Hàm số đạt cực đại tại điểm mà f′(x) đổi dấu từ + sang −.',
        ],
        steps: [
          ...first,
          `f′(x) đổi dấu từ + sang ${MINUS} khi x qua ${intText(xCD)}, nên hàm số đạt cực đại tại x = ${intText(xCD)}.`,
          `Giá trị cực đại y_CĐ = f(${intText(xCD)}) = ${intText(y)}.`,
        ],
      };
    }
    if (v === 1) {
      return {
        prompt: `Tìm điểm cực tiểu của hàm số y = ${fx}.`,
        answer: whole(xCT),
        display: intText(xCT),
        hints: [
          'Tính f′(x), giải phương trình f′(x) = 0 rồi xét dấu f′(x).',
          'Điểm cực tiểu là điểm mà f′(x) đổi dấu từ − sang +.',
        ],
        steps: [
          ...first,
          `f′(x) đổi dấu từ ${MINUS} sang + khi x qua ${intText(xCT)}.`,
          `Hàm số đạt cực tiểu tại x = ${intText(xCT)}: điểm cực tiểu là x_CT = ${intText(xCT)}.`,
        ],
      };
    }
    const word = a === 1 ? 'nghịch biến' : 'đồng biến';
    const count = q - p - 1;
    return {
      prompt: `Hàm số y = ${fx} ${word} trên một khoảng bị chặn. Khoảng đó chứa bao nhiêu số nguyên?`,
      answer: whole(count),
      display: fmt(count),
      hints: [
        'Tính f′(x) và xét dấu f′(x).',
        `Hàm số ${word} trên khoảng mà f′(x) ${a === 1 ? 'âm' : 'dương'}.`,
      ],
      steps: [
        ...first,
        `Hàm số ${word} trên khoảng (${intText(p)}; ${intText(q)}).`,
        `Các số nguyên thuộc khoảng này là ${Array.from({ length: count }, (_, i) => intText(p + 1 + i)).join('; ')}: có ${fmt(count)} số.`,
      ],
    };
  },
};

/** @type {ReviewSkill} */
export const gtlnTiemCan = {
  id: 'gtln-tiem-can',
  label: 'Giá trị lớn nhất, giá trị nhỏ nhất và đường tiệm cận',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const f = cubic(rand);
      const { p, q, coeffs } = f;
      const lo = p + int(rand, -2, 1);
      const hi = Math.max(q + int(rand, -1, 2), lo + 1);
      const inside = [p, q].filter((x) => x > lo && x < hi);
      const xs = [lo, ...inside, hi];
      const ys = xs.map((x) => polyAt(coeffs, x));
      const askMax = rand() < 0.5;
      const best = askMax ? Math.max(...ys) : Math.min(...ys);
      const word = askMax ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      return {
        prompt: `Tìm ${word} của hàm số y = ${polyText(coeffs)} trên đoạn [${intText(lo)}; ${intText(hi)}].`,
        answer: whole(best),
        display: intText(best),
        hints: [
          'Tìm các nghiệm của f′(x) = 0 thuộc khoảng giữa hai đầu đoạn.',
          `So sánh giá trị của hàm số tại các nghiệm đó và tại hai đầu đoạn.`,
        ],
        steps: [
          `f′(x) = ${f.dText} = ${f.factored}; f′(x) = 0 ⇔ x = ${intText(p)} hoặc x = ${intText(q)}.`,
          inside.length
            ? `Trên khoảng (${intText(lo)}; ${intText(hi)}), f′(x) = 0 tại x = ${inside.map(intText).join(' và x = ')}.`
            : `Khoảng (${intText(lo)}; ${intText(hi)}) không chứa nghiệm nào của f′(x).`,
          `${xs.map((x, i) => `f(${intText(x)}) = ${intText(ys[i])}`).join('; ')}.`,
          `Vậy ${word} của hàm số trên đoạn là ${intText(best)}.`,
        ],
      };
    }
    if (v === 1) {
      const c = pick(rand, [1, 2, 3]);
      const d = nonZero(rand, -5, 5);
      const a = nonZero(rand, -4, 4);
      let b = int(rand, -5, 5);
      while (a * d - b * c === 0) b += 1;
      const fx = `y = (${linText(a, b)})/(${linText(c, d)})`;
      if (rand() < 0.5) {
        const x0 = frac(-d, c);
        const shown = valueShow(x0);
        return {
          prompt: `Đồ thị hàm số ${fx} có tiệm cận đứng x = x₀. Tìm x₀.`,
          answer: x0,
          display: shown,
          hints: [
            'Tiệm cận đứng đi qua điểm làm mẫu số bằng 0 (tử số khác 0 tại đó).',
            `Giải ${linText(c, d)} = 0.`,
          ],
          steps: [
            `${linText(c, d)} = 0 ⇔ x = ${shown}; tại đó tử số ${linText(a, b)} bằng ${valueShow(frac(b * c - a * d, c))} ≠ 0.`,
            `Khi x dần tới nghiệm đó, |y| tăng vô hạn, nên tiệm cận đứng là x = ${shown}.`,
          ],
        };
      }
      const y0 = frac(a, c);
      const shown = valueShow(y0);
      return {
        prompt: `Đồ thị hàm số ${fx} có tiệm cận ngang y = y₀. Tìm y₀.`,
        answer: y0,
        display: shown,
        hints: ['Tìm giới hạn của y khi x → +∞.', 'Chia cả tử và mẫu cho x.'],
        steps: [
          `lim y (x → ±∞) = ${intText(a)}/${c}, vì sau khi chia cả tử và mẫu cho x, các số hạng chứa 1/x dần tới 0.`,
          `Tiệm cận ngang là y = ${shown}.`,
        ],
      };
    }
    const m = nonZero(rand, -3, 3);
    const b = int(rand, -4, 4);
    let e = int(rand, -5, 5);
    while (e + m * (b + m) === 0) e += 1;
    const k = b + m;
    const r = e + m * k;
    const num = polyText([1, b, e]);
    return {
      prompt: `Đồ thị hàm số y = (${num})/(${factorText(m)}) có tiệm cận xiên y = x + k. Tìm k.`,
      answer: whole(k),
      display: intText(k),
      hints: [
        `Chia ${num} cho ${factorText(m)}.`,
        'Viết y = x + k + r/(x − m): phần r/(x − m) dần tới 0 khi x → ±∞.',
      ],
      steps: [
        `${num} = (${factorText(m)})(${linText(1, k)}) ${r < 0 ? MINUS : '+'} ${fmt(Math.abs(r))}.`,
        `y = ${linText(1, k)} ${r < 0 ? MINUS : '+'} ${fmt(Math.abs(r))}/(${factorText(m)}), và ${fmt(Math.abs(r))}/(${factorText(m)}) → 0 khi x → ±∞.`,
        `Tiệm cận xiên là y = ${linText(1, k)}, nên k = ${intText(k)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Vectơ và hệ trục toạ độ trong không gian

/** @type {ReviewSkill} */
export const vecto = {
  id: 'vecto',
  label: 'Vectơ và hệ trục toạ độ trong không gian',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const u = vector(rand, -4, 4);
      const w = vector(rand, -4, 4);
      const s = dot(u, w);
      return {
        prompt: `Trong không gian Oxyz, cho vectơ a = ${pt3(u)} và vectơ b = ${pt3(w)}. Tính tích vô hướng a · b.`,
        answer: whole(s),
        display: intText(s),
        hints: ['a · b = x·x′ + y·y′ + z·z′.'],
        steps: [`a · b = ${dotText(u, w)}.`, `a · b = ${intText(s)}.`],
      };
    }
    if (v === 1) {
      const A = point(rand);
      const { v: d, len } = wholeVector(rand);
      const B = A.map((c, i) => c + d[i]);
      return {
        prompt: `Trong không gian Oxyz, cho hai điểm A${pt3(A)} và B${pt3(B)}. Tính độ dài đoạn thẳng AB.`,
        answer: whole(len),
        display: fmt(len),
        hints: [
          'Tính toạ độ vectơ AB = (x_B − x_A; y_B − y_A; z_B − z_A).',
          'AB = √(x² + y² + z²).',
        ],
        steps: [
          `Vectơ AB = ${pt3(d)}.`,
          `AB = √(${squaresText(d)}) = √${fmt(len * len)} = ${fmt(len)}.`,
        ],
      };
    }
    if (v === 2) {
      const G = point(rand);
      let A = point(rand);
      let B = point(rand);
      let C = G.map((g, i) => 3 * g - A[i] - B[i]);
      while (collinear(A, B, C)) {
        A = point(rand);
        B = point(rand);
        C = G.map((g, i) => 3 * g - A[i] - B[i]);
      }
      const i = int(rand, 0, 2);
      return {
        prompt: `Trong không gian Oxyz, cho tam giác ABC với A${pt3(A)}, B${pt3(B)}, C${pt3(C)}. Tìm ${COORD_NAMES[i]} của trọng tâm G của tam giác ABC.`,
        answer: whole(G[i]),
        display: intText(G[i]),
        hints: ['Toạ độ trọng tâm bằng trung bình cộng toạ độ của ba đỉnh.'],
        steps: [
          `${COORD_NAMES[i][0].toUpperCase()}${COORD_NAMES[i].slice(1)} của G là (${intText(A[i])} + ${operand(B[i])} + ${operand(C[i])})/3 = ${intText(3 * G[i])}/3.`,
          `Vậy ${COORD_NAMES[i]} của G bằng ${intText(G[i])}.`,
        ],
      };
    }
    if (v === 3) {
      const A = point(rand);
      let B = point(rand);
      let C = point(rand);
      while (collinear(A, B, C)) {
        B = point(rand);
        C = point(rand);
      }
      const D = A.map((a, i) => a + C[i] - B[i]);
      const i = int(rand, 0, 2);
      return {
        prompt: `Trong không gian Oxyz, cho A${pt3(A)}, B${pt3(B)}, C${pt3(C)}. Tìm ${COORD_NAMES[i]} của điểm D sao cho ABCD là hình bình hành.`,
        answer: whole(D[i]),
        display: intText(D[i]),
        hints: ['ABCD là hình bình hành khi vectơ AD = vectơ BC.'],
        steps: [
          `Vectơ BC = ${pt3(C.map((c, k) => c - B[k]))}; vectơ AD = vectơ BC nên D = A + vectơ BC.`,
          `D = ${pt3(D)}, nên ${COORD_NAMES[i]} của D bằng ${intText(D[i])}.`,
        ],
      };
    }
    const a = nonZero(rand, -3, 3);
    const b = int(rand, -3, 3);
    const c = pick(rand, [1, 2, -1, -2, 3]);
    const d = int(rand, -3, 3);
    const e = nonZero(rand, -3, 3);
    const m = frac(-(a * d + b * e), c);
    const shown = valueShow(m);
    return {
      prompt: `Trong không gian Oxyz, cho vectơ a = ${pt3([a, b, c])} và vectơ b = (${intText(d)}; ${intText(e)}; m). Tìm m để hai vectơ a và b vuông góc với nhau.`,
      answer: m,
      display: shown,
      hints: ['Hai vectơ vuông góc khi và chỉ khi tích vô hướng của chúng bằng 0.'],
      steps: [
        `a · b = ${operand(a)} · ${operand(d)} + ${operand(b)} · ${operand(e)} + ${operand(c)} · m = ${intText(a * d + b * e)} ${c < 0 ? MINUS : '+'} ${Math.abs(c) === 1 ? '' : fmt(Math.abs(c))}m.`,
        `a · b = 0 ⇔ m = ${shown}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm

/**
 * A grouped sample: groups [start + i·h; start + (i + 1)·h) and their
 * frequencies, all positive.
 * @param {() => number} rand
 */
export function groupedSample(rand) {
  const { start, h } = pick(rand, [
    { start: 0, h: 10 },
    { start: 10, h: 5 },
    { start: 20, h: 10 },
    { start: 40, h: 5 },
    { start: 150, h: 5 },
    { start: 6, h: 2 },
  ]);
  const k = pick(rand, [4, 5]);
  const n = pick(rand, [20, 40, 50]);
  const counts = partition(rand, n, k);
  return { start, h, k, n, counts };
}

/**
 * The quartile Q_k (k = 1 or 3) of a grouped sample as an exact value: the
 * first group whose cumulative frequency reaches k·n/4 holds it.
 * @param {ReturnType<typeof groupedSample>} s
 * @param {1 | 3} which
 */
export function quartile(s, which) {
  const target = (which * s.n) / 4;
  let before = 0;
  let p = 0;
  while (before + s.counts[p] < target) before += s.counts[p++];
  const lo = s.start + p * s.h;
  const m = s.counts[p];
  // Q = lo + (k·n/4 − C)/m · h, written over 4m.
  const value = frac(4 * m * lo + (which * s.n - 4 * before) * s.h, 4 * m);
  return { p, lo, hi: lo + s.h, m, before, target, value };
}

/**
 * The mean, the mean of the squares and the variance of a grouped sample,
 * exact; twice the midpoints keep every sum whole.
 * @param {ReturnType<typeof groupedSample>} s
 */
function moments(s) {
  const twice = s.counts.map((_, i) => 2 * s.start + (2 * i + 1) * s.h);
  const sum2 = s.counts.reduce((acc, m, i) => acc + m * twice[i], 0);
  const sumSq4 = s.counts.reduce((acc, m, i) => acc + m * twice[i] * twice[i], 0);
  return {
    twice,
    mean: frac(sum2, 2 * s.n),
    meanSq: frac(sumSq4, 4 * s.n),
    value: frac(s.n * sumSq4 - sum2 * sum2, 4 * s.n * s.n),
  };
}

/** @param {ReturnType<typeof groupedSample>} s */
const variance = (s) => moments(s).value;

/** @param {ReturnType<typeof groupedSample>} s */
const groupsText = (s) =>
  `Mẫu số liệu ghép nhóm có các nhóm ${s.counts
    .map((_, i) => `[${fmt(s.start + i * s.h)}; ${fmt(s.start + (i + 1) * s.h)})`)
    .join(', ')} với tần số lần lượt là ${s.counts.map(fmt).join('; ')}.`;

/** @type {ReviewSkill} */
export const phanTan = {
  id: 'phan-tan',
  label: 'Các số đặc trưng đo mức độ phân tán',
  make(rand) {
    const v = int(rand, 0, 2);
    let s = groupedSample(rand);
    // A variance asked for has at most two decimals.
    while (v === 2 && 100 % variance(s).d !== 0) s = groupedSample(rand);
    if (v === 0) {
      const R = s.k * s.h;
      const end = s.start + R;
      return {
        prompt: `${groupsText(s)} Tính khoảng biến thiên của mẫu số liệu.`,
        answer: whole(R),
        display: fmt(R),
        hints: ['Khoảng biến thiên bằng đầu mút phải của nhóm cuối trừ đầu mút trái của nhóm đầu.'],
        steps: [
          `Nhóm đầu bắt đầu từ ${fmt(s.start)}, nhóm cuối kết thúc ở ${fmt(end)}.`,
          `R = ${fmt(end)} ${MINUS} ${fmt(s.start)} = ${fmt(R)}.`,
        ],
      };
    }
    if (v === 1) {
      const q1 = quartile(s, 1);
      const q3 = quartile(s, 3);
      const dq = frac(q3.value.n * q1.value.d - q1.value.n * q3.value.d, q1.value.d * q3.value.d);
      const shown = valueShow(dq);
      /** @param {ReturnType<typeof quartile>} q @param {string} name */
      const line = (q, name) =>
        `${name}: nhóm [${fmt(q.lo)}; ${fmt(q.hi)}) chứa ${name} (vị trí ${formatNumber(q.target)}, C = ${fmt(q.before)}, m = ${fmt(q.m)}), ${name} = ${fmt(q.lo)} + (${formatNumber(q.target)} ${MINUS} ${fmt(q.before)})/${fmt(q.m)} · ${fmt(s.h)} = ${valueShow(q.value)}.`;
      let cum = 0;
      const cumText = s.counts.map((c) => fmt((cum += c))).join('; ');
      return {
        prompt: `${groupsText(s)} Tính khoảng tứ phân vị ΔQ của mẫu số liệu.`,
        answer: dq,
        display: shown,
        hints: [
          `Lập dãy tần số tích luỹ; Q₁ nằm ở nhóm đầu tiên có tần số tích luỹ không nhỏ hơn n/4, Q₃ ứng với 3n/4.`,
          'Q = a_p + (vị trí − C)/m_p · h, rồi ΔQ = Q₃ − Q₁.',
        ],
        steps: [
          `n = ${fmt(s.n)}; tần số tích luỹ: ${cumText}.`,
          line(q1, 'Q₁'),
          line(q3, 'Q₃'),
          `ΔQ = Q₃ ${MINUS} Q₁ = ${shown}.`,
        ],
      };
    }
    const { twice, mean, meanSq, value } = moments(s);
    const shown = valueShow(value);
    const mids = twice.map((t) => formatNumber(t / 2));
    return {
      prompt: `${groupsText(s)} Tính phương sai của mẫu số liệu.`,
      answer: value,
      display: shown,
      hints: [
        'Dùng giá trị đại diện của mỗi nhóm là trung điểm của nhóm.',
        's² = (m₁x₁² + … + m_kx_k²)/n − x̄².',
      ],
      steps: [
        `Giá trị đại diện: ${mids.join('; ')}.`,
        `x̄ = (${s.counts.map((m, i) => `${fmt(m)} · ${mids[i]}`).join(' + ')})/${fmt(s.n)} = ${valueShow(mean)}.`,
        `(m₁x₁² + … + m_kx_k²)/n = ${valueShow(meanSq)}.`,
        `s² = ${valueShow(meanSq)} ${MINUS} ${valueShow(mean)}² = ${shown}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Nguyên hàm và tích phân

/**
 * f(x) = 3αx² + 2βx + γ, whose antiderivative αx³ + βx² + γx has whole
 * coefficients.
 * @param {() => number} rand
 */
function quadratic(rand) {
  const al = int(rand, -2, 2);
  const be = int(rand, -3, 3);
  let ga = int(rand, -5, 5);
  if (al === 0 && be === 0 && ga === 0) ga = 2;
  return { f: [3 * al, 2 * be, ga], F: [al, be, ga, 0] };
}

/** @type {ReviewSkill} */
export const tichPhan = {
  id: 'tich-phan',
  label: 'Nguyên hàm và tích phân',
  make(rand) {
    const v = int(rand, 0, 4);
    if (v === 0) {
      const { f, F } = quadratic(rand);
      const a = int(rand, -2, 2);
      const b = a + int(rand, 1, 3);
      const Fa = polyAt(F, a);
      const Fb = polyAt(F, b);
      const I = Fb - Fa;
      return {
        prompt: `Tính tích phân ∫ từ ${intText(a)} đến ${intText(b)} của (${polyText(f)}) dx.`,
        answer: whole(I),
        display: intText(I),
        hints: [
          'Tìm một nguyên hàm F(x) của hàm số dưới dấu tích phân.',
          'Dùng công thức Newton – Leibniz: tích phân bằng F(b) − F(a).',
        ],
        steps: [
          `Một nguyên hàm là F(x) = ${polyText(F)}.`,
          `F(${intText(b)}) = ${intText(Fb)}, F(${intText(a)}) = ${intText(Fa)}.`,
          `Tích phân bằng ${intText(Fb)} ${MINUS} ${operand(Fa)} = ${intText(I)}.`,
        ],
      };
    }
    if (v === 1) {
      const { f, F } = quadratic(rand);
      const x0 = pick(rand, [0, 1]);
      const k = int(rand, -5, 5);
      const C = k - polyAt(F, x0);
      const b = pick(rand, [x0 === 0 ? 1 : 0, 2, -1]);
      const full = [...F.slice(0, 3), C];
      const value = polyAt(full, b);
      return {
        prompt: `Hàm số F(x) là một nguyên hàm của f(x) = ${polyText(f)} và F(${x0}) = ${intText(k)}. Giá trị của F(${intText(b)}) bằng bao nhiêu?`,
        answer: whole(value),
        display: intText(value),
        hints: [
          'Mọi nguyên hàm của f(x) có dạng F(x) = G(x) + C, với G(x) là một nguyên hàm cụ thể.',
          `Dùng điều kiện F(${x0}) = ${intText(k)} để tìm C.`,
        ],
        steps: [
          `F(x) = ${polyText(F)} + C.`,
          `F(${x0}) = ${intText(polyAt(F, x0))} + C = ${intText(k)}, nên C = ${intText(C)} và F(x) = ${polyText(full)}.`,
          `F(${intText(b)}) = ${intText(value)}.`,
        ],
      };
    }
    if (v === 2) {
      const a = pick(rand, [1, -1, 2, -2, 3]);
      const p = int(rand, -3, 2);
      const q = p + int(rand, 1, 3);
      const coeffs = [a, -a * (p + q), a * p * q];
      const S = frac(Math.abs(a) * (q - p) ** 3, 6);
      const shown = valueShow(S);
      const I = frac(-a * (q - p) ** 3, 6);
      return {
        prompt: `Tính diện tích hình phẳng giới hạn bởi parabol y = ${polyText(coeffs)} và trục hoành.`,
        answer: S,
        display: shown,
        hints: [
          'Tìm hoành độ giao điểm của parabol với trục hoành.',
          'S = ∫ từ a đến b của |f(x)| dx; trên đoạn giữa hai nghiệm f(x) không đổi dấu.',
        ],
        steps: [
          `${polyText(coeffs)} = 0 ⇔ x = ${intText(p)} hoặc x = ${intText(q)}.`,
          `∫ từ ${intText(p)} đến ${intText(q)} của (${polyText(coeffs)}) dx = ${valueShow(I)}.`,
          `S = |${valueShow(I)}| = ${shown}.`,
        ],
      };
    }
    if (v === 3) {
      const b = int(rand, 1, 4);
      if (rand() < 0.5) {
        const k = frac(b * b, 2);
        const shown = valueShow(k);
        return {
          prompt: `Cho hình phẳng giới hạn bởi đồ thị y = √x, trục hoành và đường thẳng x = ${b}. Quay hình phẳng này quanh trục Ox, thể tích khối tròn xoay tạo thành là V = kπ. Tìm k.`,
          answer: k,
          display: shown,
          hints: ['V = π · ∫ từ a đến b của f²(x) dx.', 'Ở đây f²(x) = x.'],
          steps: [`V = π · ∫ từ 0 đến ${b} của x dx = π · ${fmt(b * b)}/2.`, `Vậy k = ${shown}.`],
        };
      }
      const m = int(rand, 1, 3);
      const k = frac(m * m * b ** 3, 3);
      const shown = valueShow(k);
      return {
        prompt: `Cho hình phẳng giới hạn bởi đường thẳng y = ${m === 1 ? '' : m}x, trục hoành và đường thẳng x = ${b}. Quay hình phẳng này quanh trục Ox, thể tích khối tròn xoay tạo thành là V = kπ. Tìm k.`,
        answer: k,
        display: shown,
        hints: [
          'V = π · ∫ từ a đến b của f²(x) dx.',
          `Ở đây f²(x) = ${m === 1 ? '' : fmt(m * m)}x².`,
        ],
        steps: [
          `V = π · ∫ từ 0 đến ${b} của ${m === 1 ? '' : fmt(m * m)}x² dx = π · ${m === 1 ? '' : `${fmt(m * m)} · `}${fmt(b ** 3)}/3.`,
          `Vậy k = ${shown}.`,
        ],
      };
    }
    const c = int(rand, 2, 6);
    const k = int(rand, 1, 4);
    return {
      prompt: `Tính tích phân ∫ từ 1 đến e${k === 1 ? '' : sup(k)} của ${c}/x dx.`,
      answer: whole(c * k),
      display: fmt(c * k),
      hints: ['Một nguyên hàm của 1/x trên (0; +∞) là ln x.', 'ln 1 = 0 và ln eᵏ = k.'],
      steps: [
        `Tích phân bằng ${c}(ln e${k === 1 ? '' : sup(k)} ${MINUS} ln 1) = ${c} · (${k} ${MINUS} 0).`,
        `Tích phân bằng ${fmt(c * k)}.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Phương pháp toạ độ trong không gian

/** @type {ReviewSkill} */
export const matPhang = {
  id: 'mat-phang-duong-thang',
  label: 'Phương trình mặt phẳng và đường thẳng',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const n = vector(rand);
      const M = point(rand);
      const D = -dot(n, M);
      return {
        prompt: `Mặt phẳng (P) đi qua điểm M${pt3(M)} và có vectơ pháp tuyến n = ${pt3(n)} có phương trình ${formText(n, 0)} + D = 0. Tìm D.`,
        answer: whole(D),
        display: intText(D),
        hints: ['Toạ độ của M thoả mãn phương trình của (P).'],
        steps: [
          `${dotText(n, M)} + D = 0, tức là ${intText(dot(n, M))} + D = 0.`,
          `D = ${intText(D)}, (P): ${formText(n, D)} = 0.`,
        ],
      };
    }
    if (v === 1) {
      const { v: n, len } = wholeVector(rand);
      const M = point(rand);
      let D = nonZero(rand, -9, 9);
      while (dot(n, M) + D === 0) D += 1;
      const top = Math.abs(dot(n, M) + D);
      const d = frac(top, len);
      const shown = valueShow(d);
      return {
        prompt: `Tính khoảng cách từ điểm M${pt3(M)} đến mặt phẳng (P): ${formText(n, D)} = 0.`,
        answer: d,
        display: shown,
        hints: ['d(M, (P)) = |ax₀ + by₀ + cz₀ + d|/√(a² + b² + c²).'],
        steps: [
          `|${dotText(n, M)} + ${operand(D)}| = ${fmt(top)}.`,
          `√(${squaresText(n)}) = ${fmt(len)}.`,
          shown === `${fmt(top)}/${fmt(len)}`
            ? `d(M, (P)) = ${shown}.`
            : `d(M, (P)) = ${fmt(top)}/${fmt(len)} = ${shown}.`,
        ],
      };
    }
    if (v === 2) {
      const n = vector(rand, -2, 2);
      let u = vector(rand, -2, 2);
      while (dot(n, u) === 0) u = vector(rand, -2, 2);
      const A = point(rand);
      const t = int(rand, -2, 2);
      const D = -dot(n, A) - t * dot(n, u);
      const H = A.map((a, i) => a + t * u[i]);
      const i = int(rand, 0, 2);
      return {
        prompt: `Đường thẳng d: ${lineText(A, u)} cắt mặt phẳng (P): ${formText(n, D)} = 0 tại điểm H. Tìm ${COORD_NAMES[i]} của H.`,
        answer: whole(H[i]),
        display: intText(H[i]),
        hints: [
          'Thay x, y, z theo t của đường thẳng vào phương trình mặt phẳng.',
          'Giải phương trình bậc nhất ẩn t rồi thay t trở lại.',
        ],
        steps: [
          `Thay vào (P): ${linText(dot(n, u), dot(n, A) + D, 't')} = 0, nên t = ${intText(t)}.`,
          `H = ${pt3(H)}, nên ${COORD_NAMES[i]} của H bằng ${intText(H[i])}.`,
        ],
      };
    }
    const a = nonZero(rand, -3, 3);
    const b = int(rand, -3, 3);
    const d = int(rand, -3, 3);
    const e = nonZero(rand, -3, 3);
    const f = pick(rand, [1, 2, -1, -2]);
    const c0 = int(rand, -5, 5);
    const c1 = int(rand, -5, 5);
    const m = frac(-(a * d + b * e), f);
    const shown = valueShow(m);
    return {
      prompt: `Tìm m để hai mặt phẳng (P): ${formText([a, b, 0], 0)} + mz${c0 === 0 ? '' : ` ${tail(intText(c0))}`} = 0 và (Q): ${formText([d, e, f], c1)} = 0 vuông góc với nhau.`,
      answer: m,
      display: shown,
      hints: [
        'Hai mặt phẳng vuông góc khi và chỉ khi hai vectơ pháp tuyến của chúng vuông góc.',
        `n_P = (${intText(a)}; ${intText(b)}; m), n_Q = ${pt3([d, e, f])}.`,
      ],
      steps: [
        `n_P · n_Q = ${operand(a)} · ${operand(d)} + ${operand(b)} · ${operand(e)} + m · ${operand(f)} = ${intText(a * d + b * e)} ${f < 0 ? MINUS : '+'} ${Math.abs(f) === 1 ? '' : fmt(Math.abs(f))}m.`,
        `n_P · n_Q = 0 ⇔ m = ${shown}.`,
      ],
    };
  },
};

/**
 * Pairs of whole vectors with a known angle between them.
 * @type {{ u: V3, v: V3, deg: number, cos: string }[]}
 */
export const ANGLE_PAIRS = [
  { u: [1, 1, 0], v: [1, 0, 0], deg: 45, cos: '√2/2' },
  { u: [1, 1, 0], v: [1, 0, 1], deg: 60, cos: '1/2' },
  { u: [1, 1, 0], v: [0, 1, -1], deg: 60, cos: '1/2' },
  { u: [1, 2, 2], v: [2, 1, -2], deg: 90, cos: '0' },
  { u: [1, -1, 0], v: [1, 1, 0], deg: 90, cos: '0' },
  { u: [0, 1, 1], v: [1, 1, 0], deg: 60, cos: '1/2' },
];

/**
 * A pair from `ANGLE_PAIRS` with the axes permuted, the signs of the axes
 * flipped (the same way for both vectors) and each vector scaled, which
 * keeps the angle.
 * @param {() => number} rand
 * @param {(pair: (typeof ANGLE_PAIRS)[number]) => boolean} keep
 */
function anglePair(rand, keep) {
  const pair = pick(
    rand,
    ANGLE_PAIRS.filter((p) => keep(p)),
  );
  const axes = shuffle(rand, [0, 1, 2]);
  const signs = axes.map(() => (rand() < 0.5 ? -1 : 1));
  const k1 = pick(rand, [1, 1, 2]);
  const k2 = pick(rand, [1, 1, 2, -1]);
  /** @param {V3} w @param {number} k */
  const move = (w, k) => /** @type {V3} */ (axes.map((ax, i) => k * signs[i] * w[ax]));
  return { u: move(pair.u, k1), v: move(pair.v, k2), deg: pair.deg, cos: pair.cos };
}

/** @type {ReviewSkill} */
export const matCauGoc = {
  id: 'mat-cau-goc',
  label: 'Mặt cầu và góc trong không gian',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const I = point(rand);
      const R = int(rand, 1, 5);
      const d = len2(I) - R * R;
      return {
        prompt: `Tìm bán kính của mặt cầu (S): x² + y² + z² ${tail(
          formText(
            I.map((c) => -2 * c),
            d,
          ),
        )} = 0.`,
        answer: whole(R),
        display: fmt(R),
        hints: [
          'Mặt cầu x² + y² + z² − 2ax − 2by − 2cz + d = 0 có tâm I(a; b; c).',
          'R = √(a² + b² + c² − d).',
        ],
        steps: [
          `Tâm I${pt3(I)}, d = ${intText(d)}.`,
          `R = √(${squaresText(I)} ${MINUS} ${operand(d)}) = √${fmt(R * R)} = ${fmt(R)}.`,
        ],
      };
    }
    if (v === 1) {
      const I = point(rand);
      const { v: w, len } = wholeVector(rand);
      const A = I.map((c, i) => c + w[i]);
      return {
        prompt: `Mặt cầu (S) có tâm I${pt3(I)} và đi qua điểm A${pt3(A)}. Tính bán kính của mặt cầu.`,
        answer: whole(len),
        display: fmt(len),
        hints: ['Bán kính mặt cầu bằng độ dài IA.'],
        steps: [`Vectơ IA = ${pt3(w)}.`, `R = IA = √(${squaresText(w)}) = ${fmt(len)}.`],
      };
    }
    if (v === 2) {
      const { u, v: w, deg, cos } = anglePair(rand, () => true);
      const D1 = int(rand, -4, 4);
      const D2 = int(rand, -4, 4);
      return {
        prompt: `Tính góc giữa hai mặt phẳng (P): ${formText(u, D1)} = 0 và (Q): ${formText(w, D2)} = 0 (theo độ).`,
        answer: whole(deg),
        display: fmt(deg),
        unit: '°',
        hints: [
          'cos((P), (Q)) = |n_P · n_Q|/(|n_P| · |n_Q|).',
          'Góc giữa hai mặt phẳng nằm trong đoạn từ 0° đến 90°.',
        ],
        steps: [
          `n_P = ${pt3(u)}, n_Q = ${pt3(w)}, n_P · n_Q = ${intText(dot(u, w))}.`,
          `cos((P), (Q)) = ${fmt(Math.abs(dot(u, w)))}/(${rootText(len2(u))} · ${rootText(len2(w))}) = ${cos}.`,
          `Góc giữa (P) và (Q) bằng ${fmt(deg)}°.`,
        ],
      };
    }
    const { u, v: w, deg } = anglePair(rand, (p) => p.deg !== 90);
    const phi = 90 - deg;
    const A = point(rand);
    const D = int(rand, -4, 4);
    const sin = deg === 45 ? '√2/2' : '1/2';
    return {
      prompt: `Tính góc giữa đường thẳng d: ${lineText(A, u)} và mặt phẳng (P): ${formText(w, D)} = 0 (theo độ).`,
      answer: whole(phi),
      display: fmt(phi),
      unit: '°',
      hints: [
        'sin(d, (P)) = |u · n|/(|u| · |n|), với u là vectơ chỉ phương của d và n là vectơ pháp tuyến của (P).',
      ],
      steps: [
        `u = ${pt3(u)}, n = ${pt3(w)}, u · n = ${intText(dot(u, w))}.`,
        `sin(d, (P)) = ${fmt(Math.abs(dot(u, w)))}/(${rootText(len2(u))} · ${rootText(len2(w))}) = ${sin}.`,
        `Góc giữa d và (P) bằng ${fmt(phi)}°.`,
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// Xác suất có điều kiện

/** @param {number} tenths @param {number} [places] */
const dec = (tenths, places = 1) => formatNumber(tenths / 10 ** places);

/** @type {ReviewSkill} */
export const xacSuat = {
  id: 'xac-suat-co-dieu-kien',
  label: 'Xác suất có điều kiện',
  make(rand) {
    const v = int(rand, 0, 3);
    if (v === 0) {
      const pb = int(rand, 3, 9);
      const pab = int(rand, 1, pb - 1);
      const ans = frac(pab, pb);
      const shown = valueShow(ans);
      return {
        prompt: `Cho hai biến cố A và B với P(B) = ${dec(pb)} và P(AB) = ${dec(pab)}. Tính P(A | B).`,
        answer: ans,
        display: shown,
        hints: ['P(A | B) = P(AB)/P(B).'],
        steps: [`P(A | B) = P(AB)/P(B) = ${dec(pab)}/${dec(pb)}.`, `P(A | B) = ${shown}.`],
      };
    }
    if (v === 1) {
      const pb = int(rand, 2, 9);
      const pa = int(rand, 1, 9);
      const ans = frac(pb * pa, 100);
      const shown = valueShow(ans);
      return {
        prompt: `Cho hai biến cố A và B với P(B) = ${dec(pb)} và P(A | B) = ${dec(pa)}. Tính xác suất của biến cố AB.`,
        answer: ans,
        display: shown,
        hints: ['Công thức nhân xác suất: P(AB) = P(B) · P(A | B).'],
        steps: [`P(AB) = ${dec(pb)} · ${dec(pa)}.`, `P(AB) = ${shown}.`],
      };
    }
    const h1 = pick(rand, [30, 40, 60, 70, 75, 25]);
    const h2 = 100 - h1;
    const r1 = int(rand, 1, 8);
    let r2 = int(rand, 1, 8);
    if (r2 === r1) r2 = r1 === 8 ? 2 : r1 + 1;
    const story = `Hai nhà máy I và II sản xuất cùng một loại sản phẩm, lần lượt chiếm ${h1}% và ${h2}% số sản phẩm trên thị trường. Tỉ lệ phế phẩm của nhà máy I là ${r1}%, của nhà máy II là ${r2}%. Chọn ngẫu nhiên một sản phẩm trên thị trường.`;
    const total = frac(h1 * r1 + h2 * r2, 10000);
    const totalText = valueShow(total);
    const totalLine = `P(A) = ${dec(h1, 2)} · ${dec(r1, 2)} + ${dec(h2, 2)} · ${dec(r2, 2)} = ${totalText}.`;
    if (v === 2) {
      return {
        prompt: `${story} Tính xác suất sản phẩm được chọn là phế phẩm.`,
        answer: total,
        display: totalText,
        hints: [
          'Gọi A là biến cố "sản phẩm là phế phẩm", H là biến cố "sản phẩm do nhà máy I sản xuất".',
          'Công thức xác suất toàn phần: P(A) = P(H) · P(A | H) + P(H̄) · P(A | H̄).',
        ],
        steps: [
          `P(H) = ${dec(h1, 2)}, P(H̄) = ${dec(h2, 2)}, P(A | H) = ${dec(r1, 2)}, P(A | H̄) = ${dec(r2, 2)}.`,
          totalLine,
        ],
      };
    }
    const ans = frac(h1 * r1, h1 * r1 + h2 * r2);
    const shown = valueShow(ans);
    return {
      prompt: `${story} Biết sản phẩm được chọn là phế phẩm, tính xác suất sản phẩm đó do nhà máy I sản xuất.`,
      answer: ans,
      display: shown,
      hints: [
        'Tính trước xác suất P(A) để sản phẩm là phế phẩm bằng công thức xác suất toàn phần.',
        'Công thức Bayes: P(H | A) = P(H) · P(A | H)/P(A).',
      ],
      steps: [
        totalLine,
        `P(H | A) = ${dec(h1, 2)} · ${dec(r1, 2)}/${totalText} = ${fmt(h1 * r1)}/${fmt(h1 * r1 + h2 * r2)}.`,
        `P(H | A) = ${shown}.`,
      ],
    };
  },
};

/** Every skill of the review, in book order. */
export const REVIEW_SKILLS = [
  cucTri,
  gtlnTiemCan,
  vecto,
  phanTan,
  tichPhan,
  matPhang,
  matCauGoc,
  xacSuat,
];
