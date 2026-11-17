/**
 * Question generators for the chapter "Ứng dụng đạo hàm để khảo sát và vẽ đồ
 * thị hàm số", one skill per lesson, for the drill board of the chapter
 * review. Every answer is an integer or a fraction p/q, read with
 * `readNumber` and written with `numberText` from `#lib/core/decimal.js`.
 * Prompts, hints and steps are rich text.
 */

import { int, nonZero, pick } from '#lib/core/drill.js';
import { evaluate, polyTex, substituteTex } from '#lib/algebra-engine/polynomial.js';
import { factorTex, linTex, signedFracTex } from '#lib/core/algebra-text.js';
import { numTex } from '#lib/core/number-format.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/**
 * A cubic y = a·x³ + … with y′ = 3a(x − p)(x − q), p < q, and whole
 * coefficients: p + q is even, so the x² coefficient −3a(p + q)/2 is whole.
 * @param {() => number} rand
 * @param {{ a?: number }} [opts]
 */
export function cubicWithCriticalPoints(rand, opts = {}) {
  const a = opts.a ?? pick(rand, [1, -1]);
  const p = int(rand, -3, 1);
  const q = p + 2 * int(rand, 1, 2);
  const d = int(rand, -5, 5);
  // Ascending coefficients: d + 3apq·x − 3a(p + q)/2·x² + a·x³.
  const coefs = [d, 3 * a * p * q, (-3 * a * (p + q)) / 2, a];
  const f = (/** @type {number} */ x) => evaluate(coefs, x);
  const xMax = a > 0 ? p : q;
  const xMin = a > 0 ? q : p;
  return { a, p, q, coefs, f, xMax, xMin, yMax: f(xMax), yMin: f(xMin) };
}

/** @param {number} r the factor x − r, in brackets unless it is just x */
const factor = (r) => (r === 0 ? 'x' : `(${factorTex(r)})`);

/** @param {number} v a number written as a TeX operand: '3', '(-2)' */
const operand = (v) => (v < 0 ? `(${v})` : `${v}`);

/**
 * The derivative of a cubic from `cubicWithCriticalPoints`, expanded and
 * factored: "y' = 3x^2 - 6x = 3x(x - 2)".
 * @param {ReturnType<typeof cubicWithCriticalPoints>} c
 */
function derivativeTex(c) {
  const [, c1, c2, c3] = c.coefs;
  const lead = c.a > 0 ? '3' : '-3';
  // The book writes a bare x first: 3x(x − 2), not 3(x − 2)x.
  const roots = c.q === 0 ? [c.q, c.p] : [c.p, c.q];
  return `y' = ${polyTex([c1, 2 * c2, 3 * c3])} = ${lead}${roots.map(factor).join('')}`;
}

/**
 * Where y′ is positive and negative, in words.
 * @param {ReturnType<typeof cubicWithCriticalPoints>} c
 */
function signStep(c) {
  const out = `$(-\\infty; ${c.p})$ và $(${c.q}; +\\infty)$`;
  const mid = `$(${c.p}; ${c.q})$`;
  return c.a > 0
    ? `$y' > 0$ trên ${out}, $y' < 0$ trên ${mid}: hàm số đạt cực đại tại $x = ${c.p}$ và cực tiểu tại $x = ${c.q}$.`
    : `$y' < 0$ trên ${out}, $y' > 0$ trên ${mid}: hàm số đạt cực tiểu tại $x = ${c.p}$ và cực đại tại $x = ${c.q}$.`;
}

/** @type {Skill} */
export const cucTri = {
  id: 'cuc-tri',
  label: 'Bài 1. Tính đơn điệu và cực trị',
  make(rand) {
    const c = cubicWithCriticalPoints(rand);
    const tex = polyTex(c.coefs);
    const ask = pick(rand, ['yMax', 'yMin', 'xMax']);
    const common = [
      `$${derivativeTex(c)}$; $y' = 0 \\iff x = ${c.p}$ hoặc $x = ${c.q}$.`,
      signStep(c),
    ];
    if (ask === 'xMax') {
      return {
        prompt: `Tìm điểm cực đại $x_{\\text{CĐ}}$ của hàm số $y = ${tex}$.`,
        answer: c.xMax,
        hints: [
          "Tính $y'$, tìm các nghiệm của $y' = 0$ rồi xét dấu $y'$.",
          "Điểm cực đại là nơi $y'$ đổi dấu từ dương sang âm.",
        ],
        steps: [...common, `Vậy $x_{\\text{CĐ}} = ${c.xMax}$.`],
      };
    }
    const x = ask === 'yMax' ? c.xMax : c.xMin;
    const name = ask === 'yMax' ? 'y_{\\text{CĐ}}' : 'y_{\\text{CT}}';
    return {
      prompt: `Tìm giá trị ${ask === 'yMax' ? 'cực đại' : 'cực tiểu'} $${name}$ của hàm số $y = ${tex}$.`,
      answer: c.f(x),
      hints: [
        "Tính $y'$ và giải $y' = 0$.",
        `Xét dấu $y'$ để biết điểm nào là điểm cực ${ask === 'yMax' ? 'đại' : 'tiểu'}, rồi thay vào $y$.`,
      ],
      steps: [...common, `$${name} = y(${x}) = ${substituteTex(c.coefs, x)} = ${c.f(x)}$.`],
    };
  },
};

/** @type {Skill} */
export const gtlnGtnn = {
  id: 'gtln-gtnn',
  label: 'Bài 2. Giá trị lớn nhất và giá trị nhỏ nhất',
  make(rand) {
    const c = cubicWithCriticalPoints(rand);
    const both = rand() < 0.6;
    const lo = both ? c.p - int(rand, 0, 2) : c.p + 1;
    const hi = c.q + int(rand, both ? 0 : 1, 2);
    const inside = [c.p, c.q].filter((x) => x > lo && x < hi);
    const xs = [lo, ...inside, hi];
    const ys = xs.map(c.f);
    const max = rand() < 0.5;
    const answer = max ? Math.max(...ys) : Math.min(...ys);
    const word = max ? 'lớn nhất' : 'nhỏ nhất';
    const values = xs.map((x, i) => `$y(${x}) = ${ys[i]}$`).join(', ');
    return {
      prompt: `Tìm giá trị ${word} của hàm số $y = ${polyTex(c.coefs)}$ trên đoạn $[${lo}; ${hi}]$.`,
      answer,
      hints: [
        "Tìm các nghiệm của $y' = 0$ thuộc đoạn đã cho.",
        'So sánh giá trị của hàm số tại các nghiệm đó và tại hai đầu mút.',
      ],
      steps: [
        `$${derivativeTex(c)}$; $y' = 0 \\iff x = ${c.p}$ hoặc $x = ${c.q}$.`,
        inside.length === 2
          ? `Cả hai nghiệm đều thuộc khoảng $(${lo}; ${hi})$.`
          : `Trong khoảng $(${lo}; ${hi})$ chỉ có nghiệm $x = ${inside[0]}$.`,
        `${values}.`,
        `Giá trị ${word} là $${answer}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const tiemCan = {
  id: 'tiem-can',
  label: 'Bài 3. Đường tiệm cận',
  make(rand) {
    if (rand() < 0.6) {
      const c = nonZero(rand, -3, 3);
      const d = int(rand, -5, 5);
      const a = nonZero(rand, -4, 4);
      let b = int(rand, -5, 5);
      while (a * d - b * c === 0) b = int(rand, -5, 5);
      const fn = `y = \\dfrac{${linTex(a, b)}}{${linTex(c, d)}}`;
      if (rand() < 0.5) {
        return {
          prompt: `Đồ thị hàm số $${fn}$ có tiệm cận ngang $y = m$. Tìm $m$ (nhập số nguyên hoặc phân số $p/q$).`,
          answer: a / c,
          hints: ['Tính giới hạn của $y$ khi $x \\to +\\infty$: chia cả tử và mẫu cho $x$.'],
          steps: [
            `$\\lim\\limits_{x \\to \\pm\\infty} y = \\dfrac{${a}}{${c}} = ${signedFracTex(a, c)}$.`,
            `Tiệm cận ngang là $y = ${signedFracTex(a, c)}$.`,
          ],
        };
      }
      return {
        prompt: `Đồ thị hàm số $${fn}$ có tiệm cận đứng $x = m$. Tìm $m$ (nhập số nguyên hoặc phân số $p/q$).`,
        answer: -d / c,
        hints: ['Tìm giá trị của $x$ làm mẫu bằng $0$ mà tử khác $0$.'],
        steps: [
          `Mẫu bằng $0$ khi $${linTex(c, d)} = 0 \\iff x = ${signedFracTex(-d, c)}$; tại đó tử khác $0$ vì $${operand(a)} \\cdot ${operand(d)} - ${operand(b)} \\cdot ${operand(c)} \\ne 0$.`,
          `Khi $x$ dần tới $${signedFracTex(-d, c)}$ từ hai phía, $y$ dần tới vô cực, nên tiệm cận đứng là $x = ${signedFracTex(-d, c)}$.`,
        ],
      };
    }
    const n = int(rand, -4, 4);
    const b = int(rand, -5, 5);
    let c = int(rand, -6, 6);
    while (n * n + b * n + c === 0) c = int(rand, -6, 6);
    const r = n * n + b * n + c;
    const m = b + n;
    const quotient = linTex(1, m);
    return {
      prompt: `Đồ thị hàm số $y = \\dfrac{${polyTex([c, b, 1])}}{${factorTex(n)}}$ có tiệm cận xiên $y = x + m$. Tìm $m$.`,
      answer: m,
      hints: ['Chia tử cho mẫu để viết $y = x + m + \\dfrac{r}{x - x_0}$.'],
      steps: [
        `$${polyTex([c, b, 1])} = ${factor(n)}(${quotient}) ${r < 0 ? '-' : '+'} ${Math.abs(r)}$.`,
        `Do đó $y = ${quotient} ${r < 0 ? '-' : '+'} \\dfrac{${Math.abs(r)}}{${factorTex(n)}}$, và $\\dfrac{${Math.abs(r)}}{${factorTex(n)}} \\to 0$ khi $x \\to \\pm\\infty$.`,
        `Tiệm cận xiên là $y = ${quotient}$, nên $m = ${m}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const khaoSat = {
  id: 'khao-sat',
  label: 'Bài 4. Khảo sát và vẽ đồ thị',
  make(rand) {
    if (rand() < 0.7) {
      const c = cubicWithCriticalPoints(rand);
      const kind = pick(rand, ['between', 'max', 'min', 'above', 'below']);
      const m =
        kind === 'between'
          ? int(rand, c.yMin + 1, c.yMax - 1)
          : kind === 'max'
            ? c.yMax
            : kind === 'min'
              ? c.yMin
              : kind === 'above'
                ? c.yMax + int(rand, 1, 3)
                : c.yMin - int(rand, 1, 3);
      const count = m > c.yMin && m < c.yMax ? 3 : m === c.yMin || m === c.yMax ? 2 : 1;
      const why =
        count === 3
          ? `$y_{\\text{CT}} < ${m} < y_{\\text{CĐ}}$ nên đường thẳng $y = ${m}$ cắt đồ thị tại ba điểm.`
          : count === 2
            ? `Đường thẳng $y = ${m}$ đi qua một điểm cực trị: nó tiếp xúc với đồ thị tại đó và cắt đồ thị tại một điểm nữa.`
            : `$${m}$ nằm ngoài đoạn $[${c.yMin}; ${c.yMax}]$ nên đường thẳng $y = ${m}$ cắt đồ thị tại đúng một điểm.`;
      return {
        prompt: `Phương trình $${polyTex(c.coefs)} = ${m}$ có bao nhiêu nghiệm thực?`,
        answer: count,
        hints: [
          `Số nghiệm bằng số giao điểm của đồ thị $y = ${polyTex(c.coefs)}$ với đường thẳng $y = ${m}$.`,
          'Tìm giá trị cực đại và cực tiểu rồi so sánh với vế phải.',
        ],
        steps: [
          `$${derivativeTex(c)}$; ${signStep(c)}`,
          `$y_{\\text{CĐ}} = ${c.yMax}$, $y_{\\text{CT}} = ${c.yMin}$.`,
          why,
          `Phương trình có $${count}$ nghiệm.`,
        ],
      };
    }
    const a = nonZero(rand, -4, 4);
    const d = int(rand, -5, 5);
    let b = int(rand, -5, 5);
    while (a * d - b === 0) b = int(rand, -5, 5);
    return {
      prompt: `Đồ thị hàm số $y = \\dfrac{${linTex(a, b)}}{${linTex(1, d)}}$ có tâm đối xứng $I(x_0; y_0)$. Tính $x_0 + y_0$.`,
      answer: -d + a,
      hints: ['Tâm đối xứng là giao điểm của hai đường tiệm cận.'],
      steps: [
        `Tiệm cận đứng $x = ${-d}$ (mẫu bằng $0$), tiệm cận ngang $y = ${a}$ (tỉ số hai hệ số của $x$).`,
        `Tâm đối xứng $I(${-d}; ${a})$, nên $x_0 + y_0 = ${-d + a}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const thucTien = {
  id: 'thuc-tien',
  label: 'Bài 5. Bài toán thực tiễn',
  make(rand) {
    const kind = pick(rand, ['box', 'speed', 'cost']);
    if (kind === 'box') {
      const k = int(rand, 1, 5);
      const side = 6 * k;
      const askVolume = rand() < 0.5;
      const intro = `Từ một tấm bìa hình vuông cạnh $${side}$ cm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh $x$ cm rồi gấp lại thành một chiếc hộp không nắp.`;
      return {
        prompt: askVolume
          ? `${intro} Thể tích lớn nhất của chiếc hộp là bao nhiêu xăng-ti-mét khối?`
          : `${intro} Tìm $x$ để thể tích chiếc hộp lớn nhất.`,
        answer: askVolume ? 16 * k ** 3 : k,
        unit: askVolume ? 'cm³' : 'cm',
        hints: [
          `Thể tích $V(x) = x(${side} - 2x)^2$ với $0 < x < ${side / 2}$.`,
          `$V'(x) = (${side} - 2x)(${side} - 6x)$.`,
        ],
        steps: [
          `$V(x) = x(${side} - 2x)^2$, $0 < x < ${side / 2}$.`,
          `$V'(x) = (${side} - 2x)^2 - 4x(${side} - 2x) = (${side} - 2x)(${side} - 6x)$; trên $(0; ${side / 2})$, $V'(x) = 0 \\iff x = ${k}$.`,
          `$V'$ đổi dấu từ dương sang âm tại $x = ${k}$, nên $V$ lớn nhất tại $x = ${k}$: $V(${k}) = ${k} \\cdot ${side - 2 * k}^2 = ${numTex(16 * k ** 3)}$ (cm³).`,
        ],
      };
    }
    if (kind === 'speed') {
      const k = int(rand, 1, 4);
      const c = int(rand, 0, 9);
      const s = polyTex([0, c, 3 * k, -1], 't');
      return {
        prompt: `Một chất điểm chuyển động theo phương trình $s(t) = ${s}$, trong đó $t$ tính bằng giây và $s$ tính bằng mét. Trong $${2 * k}$ giây đầu tiên, vận tốc lớn nhất của chất điểm là bao nhiêu mét trên giây?`,
        answer: 3 * k * k + c,
        unit: 'm/s',
        hints: [
          "Vận tốc là $v(t) = s'(t)$.",
          `Tìm giá trị lớn nhất của $v(t)$ trên đoạn $[0; ${2 * k}]$.`,
        ],
        steps: [
          `$v(t) = s'(t) = ${polyTex([c, 6 * k, -3], 't')}$, $v'(t) = ${polyTex([6 * k, -6], 't')} = 0 \\iff t = ${k}$.`,
          `$v(0) = ${c}$, $v(${k}) = ${3 * k * k + c}$, $v(${2 * k}) = ${c}$.`,
          `Vận tốc lớn nhất là $${3 * k * k + c}$ m/s, tại $t = ${k}$ s.`,
        ],
      };
    }
    const n = 10 * int(rand, 1, 5);
    const b = 10 * int(rand, 2, 9);
    const askCount = rand() < 0.5;
    const n2 = numTex(n * n);
    return {
      prompt: `Chi phí sản xuất $x$ sản phẩm là $C(x) = x^2 + ${b}x + ${n2}$ (nghìn đồng). ${
        askCount
          ? 'Cần sản xuất bao nhiêu sản phẩm để chi phí trung bình cho mỗi sản phẩm là nhỏ nhất?'
          : 'Chi phí trung bình nhỏ nhất cho mỗi sản phẩm là bao nhiêu nghìn đồng?'
      }`,
      answer: askCount ? n : 2 * n + b,
      hints: [
        `Chi phí trung bình là $\\overline{C}(x) = \\dfrac{C(x)}{x} = x + ${b} + \\dfrac{${n2}}{x}$ với $x > 0$.`,
        "Tìm nghiệm dương của $\\overline{C}'(x) = 0$.",
      ],
      steps: [
        `$\\overline{C}(x) = x + ${b} + \\dfrac{${n2}}{x}$, $\\overline{C}'(x) = 1 - \\dfrac{${n2}}{x^2}$.`,
        `$\\overline{C}'(x) = 0 \\iff x = ${n}$ (vì $x > 0$); $\\overline{C}'$ đổi dấu từ âm sang dương tại đó.`,
        `$\\overline{C}(${n}) = ${n} + ${b} + ${n} = ${2 * n + b}$ (nghìn đồng), đạt được khi sản xuất $${n}$ sản phẩm.`,
      ],
    };
  },
};

export const CHAPTER_SKILLS = [cucTri, gtlnGtnn, tiemCan, khaoSat, thucTien];
