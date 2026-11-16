/**
 * Question generators for the chapter "Hàm số lượng giác và phương trình
 * lượng giác", one skill per lesson, for the drill board of its review
 * lesson. Every answer is a rational number (an integer, a short decimal or a
 * fraction p/q), read with `readNumber` and written with `numberText` from
 * `#lib/core/decimal.js`. Prompts, hints and steps are rich text.
 */

import { int, pick } from '#lib/core/drill.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { degToPi, piTex } from './trig.js';
import { SPECIAL_VALUES, solutionsIn } from './equations.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('./trig.js').TrigName} TrigName */

/** Pythagorean triples (leg, leg, hypotenuse) for exact sin and cos. */
export const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];

/**
 * TeX of p/q in lowest terms, with the sign in front: '-\dfrac{4}{5}', '3'.
 * @param {number} p @param {number} q
 */
export function fracTex(p, q) {
  const g = gcd(Math.abs(p), Math.abs(q)) || 1;
  const n = p / g;
  const d = q / g;
  const sign = n * d < 0 ? '-' : '';
  return Math.abs(d) === 1
    ? `${sign}${Math.abs(n)}`
    : `${sign}\\dfrac{${Math.abs(n)}}{${Math.abs(d)}}`;
}

/** @param {number} p @param {number} q */
function value(p, q) {
  const g = gcd(Math.abs(p), Math.abs(q)) || 1;
  return p / g / (q / g);
}

/** Quadrant intervals, as TeX. */
const QUADRANT_TEX = [
  '',
  '0 < \\alpha < \\dfrac{\\pi}{2}',
  '\\dfrac{\\pi}{2} < \\alpha < \\pi',
  '\\pi < \\alpha < \\dfrac{3\\pi}{2}',
  '\\dfrac{3\\pi}{2} < \\alpha < 2\\pi',
];
const SIN_SIGN = [0, 1, 1, -1, -1];
const COS_SIGN = [0, 1, -1, -1, 1];

/** @type {Skill} */
export const goc = {
  id: 'goc-luong-giac',
  label: 'Bài 1. Giá trị lượng giác của góc lượng giác',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const deg = pick(rand, [15, 20, 36, 40, 75, 105, 135, 150, 210, 225, 240, 270, 300, 330]);
      const [p, q] = degToPi(deg);
      return {
        prompt: `Số đo theo radian của góc $${deg}^\\circ$ là $k\\pi$. Tìm $k$.`,
        answer: value(p, q),
        steps: [
          `$${deg}^\\circ = ${deg} \\cdot \\dfrac{\\pi}{180} = \\dfrac{${deg}\\pi}{180}$.`,
          `Rút gọn: $\\dfrac{${deg}}{180} = ${fracTex(p, q)}$, nên $k = ${fracTex(p, q)}$.`,
        ],
        hints: ['$1^\\circ = \\dfrac{\\pi}{180}$ rad.', 'Rút gọn phân số rồi nhập dạng $p/q$.'],
      };
    }
    if (variant === 1) {
      const [p, q] = pick(rand, [
        [1, 6],
        [1, 4],
        [1, 3],
        [2, 3],
        [3, 4],
        [5, 6],
        [7, 6],
        [5, 4],
        [4, 3],
        [5, 3],
        [7, 4],
        [11, 6],
        [5, 12],
        [7, 12],
        [3, 10],
      ]);
      const deg = (180 * p) / q;
      return {
        prompt: `Đổi $${piTex(p, q)}$ rad sang độ.`,
        answer: deg,
        unit: '°',
        steps: [
          `$\\pi$ rad $= 180^\\circ$.`,
          `$${piTex(p, q)} = ${fracTex(p, q)} \\cdot 180^\\circ = ${deg}^\\circ$.`,
        ],
      };
    }
    if (variant === 2) {
      const [a, b, c] = pick(rand, TRIPLES);
      const quad = int(rand, 1, 4);
      const givenSin = rand() < 0.5;
      const s = SIN_SIGN[quad] * (givenSin ? a : b);
      const co = COS_SIGN[quad] * (givenSin ? b : a);
      const askTan = rand() < 0.5;
      const givenTex = givenSin
        ? `\\sin\\alpha = ${fracTex(s, c)}`
        : `\\cos\\alpha = ${fracTex(co, c)}`;
      const otherName = givenSin ? '\\cos' : '\\sin';
      const other = givenSin ? co : s;
      const otherSign = other > 0 ? 'dương' : 'âm';
      const steps = [
        `$${otherName}^2\\alpha = 1 - \\left(${fracTex(givenSin ? s : co, c)}\\right)^2 = \\dfrac{${c * c - (givenSin ? a : b) ** 2}}{${c * c}}$.`,
        `Với $${QUADRANT_TEX[quad]}$, $${otherName}\\alpha$ ${otherSign}, nên $${otherName}\\alpha = ${fracTex(other, c)}$.`,
      ];
      if (askTan) {
        steps.push(`$\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = ${fracTex(s, co)}$.`);
      }
      return {
        prompt: `Cho $${givenTex}$ với $${QUADRANT_TEX[quad]}$. Tính $${askTan ? '\\tan' : otherName}\\alpha$.`,
        answer: askTan ? value(s, co) : value(other, c),
        steps,
        hints: [
          'Dùng $\\sin^2\\alpha + \\cos^2\\alpha = 1$.',
          'Xác định dấu nhờ góc phần tư chứa điểm biểu diễn của $\\alpha$.',
        ],
      };
    }
    const r = int(rand, 2, 20);
    const alpha = pick(rand, [0.5, 1.2, 1.5, 2, 2.5]);
    const l = tidy(r * alpha);
    return {
      prompt: `Một cung tròn của đường tròn bán kính $${r}$ cm có số đo $${numTex(alpha)}$ rad. Tính độ dài cung đó (theo cm).`,
      answer: l,
      unit: 'cm',
      steps: [`$l = R\\alpha = ${r} \\cdot ${numTex(alpha)} = ${numTex(l)}$ (cm).`],
      hints: ['Độ dài cung $l = R\\alpha$, với $\\alpha$ tính bằng radian.'],
    };
  },
};

/** Fractions for cos a whose cos 2a stays a small fraction. */
const COS_FRACTIONS = [
  [1, 3],
  [2, 3],
  [1, 4],
  [3, 4],
  [1, 5],
  [2, 5],
  [3, 5],
];

/** @type {Skill} */
export const congThuc = {
  id: 'cong-thuc-luong-giac',
  label: 'Bài 2. Công thức lượng giác',
  make(rand) {
    const variant = int(rand, 0, 3);
    if (variant === 0) {
      const [a, b, c] = pick(rand, TRIPLES);
      const sin = rand() < 0.5 ? a : b;
      const cos = sin === a ? b : a;
      const askSin = rand() < 0.5;
      const intro = `Cho $\\sin a = ${fracTex(sin, c)}$ với $0 < a < \\dfrac{\\pi}{2}$.`;
      const cosStep = `$\\cos a = \\sqrt{1 - \\sin^2 a} = ${fracTex(cos, c)}$ (vì $\\cos a > 0$).`;
      if (askSin) {
        return {
          prompt: `${intro} Tính $\\sin 2a$.`,
          answer: value(2 * sin * cos, c * c),
          steps: [
            cosStep,
            `$\\sin 2a = 2\\sin a\\cos a = 2 \\cdot ${fracTex(sin, c)} \\cdot ${fracTex(cos, c)} = ${fracTex(2 * sin * cos, c * c)}$.`,
          ],
          hints: ['Tìm $\\cos a$ trước.', '$\\sin 2a = 2\\sin a\\cos a$.'],
        };
      }
      return {
        prompt: `${intro} Tính $\\cos 2a$.`,
        answer: value(c * c - 2 * sin * sin, c * c),
        steps: [
          `$\\cos 2a = 1 - 2\\sin^2 a = 1 - 2 \\cdot \\dfrac{${sin * sin}}{${c * c}}$.`,
          `$= ${fracTex(c * c - 2 * sin * sin, c * c)}$.`,
        ],
        hints: ['Chọn dạng $\\cos 2a = 1 - 2\\sin^2 a$.'],
      };
    }
    if (variant === 1) {
      const [p, q] = pick(rand, COS_FRACTIONS);
      const sign = rand() < 0.5 ? 1 : -1;
      return {
        prompt: `Cho $\\cos a = ${fracTex(sign * p, q)}$. Tính $\\cos 2a$.`,
        answer: value(2 * p * p - q * q, q * q),
        steps: [
          `$\\cos 2a = 2\\cos^2 a - 1 = 2 \\cdot \\dfrac{${p * p}}{${q * q}} - 1$.`,
          `$= ${fracTex(2 * p * p - q * q, q * q)}$.`,
        ],
        hints: ['Chọn dạng $\\cos 2a = 2\\cos^2 a - 1$; dấu của $\\cos a$ không ảnh hưởng.'],
      };
    }
    if (variant === 2) {
      let ta = int(rand, -4, 5);
      let tb = int(rand, -4, 5);
      const plus = rand() < 0.5;
      // Keep the denominator away from 0 and both tangents nonzero.
      if (ta === 0) ta = 2;
      if (tb === 0 || tb === ta) tb = ta === 3 ? 4 : 3;
      let den = plus ? 1 - ta * tb : 1 + ta * tb;
      if (den === 0) {
        tb = tb + 1 === 0 ? 2 : tb + 1;
        den = plus ? 1 - ta * tb : 1 + ta * tb;
      }
      const num = plus ? ta + tb : ta - tb;
      const op = plus ? '+' : '-';
      const opInv = plus ? '-' : '+';
      const tbOp = tb < 0 ? `(${tb})` : `${tb}`;
      return {
        prompt: `Cho $\\tan a = ${ta}$ và $\\tan b = ${tb}$. Tính $\\tan(a ${op} b)$.`,
        answer: value(num, den),
        steps: [
          `$\\tan(a ${op} b) = \\dfrac{\\tan a ${op} \\tan b}{1 ${opInv} \\tan a\\tan b} = \\dfrac{${ta} ${op} ${tbOp}}{1 ${opInv} ${ta} \\cdot ${tbOp}}$.`,
          `$= \\dfrac{${num}}{${den}} = ${fracTex(num, den)}$.`,
        ],
        hints: [`$\\tan(a ${op} b) = \\dfrac{\\tan a ${op} \\tan b}{1 ${opInv} \\tan a\\tan b}$.`],
      };
    }
    const [a1, b1, c1] = pick(rand, TRIPLES);
    const [a2, b2, c2] = pick(rand, TRIPLES);
    const plus = rand() < 0.5;
    const op = plus ? '+' : '-';
    // sin a = a1/c1, cos a = b1/c1; cos b = a2/c2, sin b = b2/c2; both acute.
    const num = a1 * a2 + (plus ? 1 : -1) * b1 * b2;
    return {
      prompt: `Cho $\\sin a = ${fracTex(a1, c1)}$, $\\cos b = ${fracTex(a2, c2)}$ với $a$, $b$ thuộc khoảng $\\left(0; \\dfrac{\\pi}{2}\\right)$. Tính $\\sin(a ${op} b)$.`,
      answer: value(num, c1 * c2),
      steps: [
        `$\\cos a = ${fracTex(b1, c1)}$, $\\sin b = ${fracTex(b2, c2)}$ (đều dương).`,
        `$\\sin(a ${op} b) = \\sin a\\cos b ${op} \\cos a\\sin b = \\dfrac{${a1 * a2}}{${c1 * c2}} ${op} \\dfrac{${b1 * b2}}{${c1 * c2}} = ${fracTex(num, c1 * c2)}$.`,
      ],
      hints: [
        'Tìm $\\cos a$ và $\\sin b$ bằng $\\sin^2 + \\cos^2 = 1$.',
        `$\\sin(a ${op} b) = \\sin a\\cos b ${op} \\cos a\\sin b$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const hamSo = {
  id: 'ham-so-luong-giac',
  label: 'Bài 3. Hàm số lượng giác',
  make(rand) {
    const variant = int(rand, 0, 2);
    if (variant === 0) {
      /** @type {TrigName} */
      const name = pick(rand, /** @type {TrigName[]} */ (['sin', 'cos', 'tan', 'cot']));
      const a = int(rand, 2, 6);
      const full = name === 'sin' || name === 'cos';
      const p = full ? 2 : 1;
      return {
        prompt: `Chu kì của hàm số $y = \\${name} ${a}x$ là $k\\pi$. Tìm $k$.`,
        answer: value(p, a),
        steps: [
          `Hàm số $y = \\${name} x$ có chu kì $${full ? '2\\pi' : '\\pi'}$.`,
          `Chu kì của $y = \\${name} ${a}x$ là $\\dfrac{${full ? '2\\pi' : '\\pi'}}{${a}} = ${piTex(p, a)}$, nên $k = ${fracTex(p, a)}$.`,
        ],
        hints: [`$y = \\${name} ax$ có chu kì $\\dfrac{${full ? '2\\pi' : '\\pi'}}{|a|}$.`],
      };
    }
    if (variant === 1) {
      const name = pick(rand, ['sin', 'cos']);
      let A = int(rand, -4, 4);
      if (A === 0) A = 3;
      const B = int(rand, -3, 3);
      const askMax = rand() < 0.5;
      const ans = askMax ? Math.abs(A) + B : B - Math.abs(A);
      const fx = `${A === 1 ? '' : A === -1 ? '-' : A}\\${name} x${B === 0 ? '' : B > 0 ? ` + ${B}` : ` - ${-B}`}`;
      const best = askMax === A > 0 ? 1 : -1;
      return {
        prompt: `Tìm giá trị ${askMax ? 'lớn nhất' : 'nhỏ nhất'} của hàm số $y = ${fx}$.`,
        answer: ans,
        steps: [
          `$-1 \\le \\${name} x \\le 1$, nên $${B - Math.abs(A)} \\le y \\le ${Math.abs(A) + B}$.`,
          `$y = ${ans}$ khi $\\${name} x = ${best}$.`,
        ],
        hints: [
          `Bắt đầu từ $-1 \\le \\${name} x \\le 1$.`,
          A < 0 ? 'Nhân với số âm thì đổi chiều bất đẳng thức.' : 'Nhân rồi cộng từng vế.',
        ],
      };
    }
    const n = int(rand, 2, 6);
    const name = pick(rand, ['sin', 'cos']);
    // sin x = 0 at kπ: n + 1 points in [0; nπ]; cos x = 0 at π/2 + kπ: n points.
    const ans = name === 'sin' ? n + 1 : n;
    return {
      prompt: `Đồ thị hàm số $y = \\${name} x$ cắt trục hoành tại bao nhiêu điểm có hoành độ thuộc đoạn $[0; ${n}\\pi]$?`,
      answer: ans,
      steps: [
        name === 'sin'
          ? '$\\sin x = 0 \\Leftrightarrow x = k\\pi$.'
          : '$\\cos x = 0 \\Leftrightarrow x = \\dfrac{\\pi}{2} + k\\pi$.',
        name === 'sin'
          ? `$0 \\le k\\pi \\le ${n}\\pi \\Leftrightarrow k = 0, 1, \\ldots, ${n}$: có $${ans}$ điểm.`
          : `$0 \\le \\dfrac{\\pi}{2} + k\\pi \\le ${n}\\pi \\Leftrightarrow k = 0, 1, \\ldots, ${n - 1}$: có $${ans}$ điểm.`,
      ],
      hints: [`Giải phương trình $\\${name} x = 0$ rồi đếm các giá trị $k$.`],
    };
  },
};

/**
 * The solutions in [0°; 360°) of name(c·x) = m, in degrees.
 * @param {TrigName} name @param {number} c @param {number} m
 */
export function solutionsDeg(name, c, m) {
  return solutionsIn(name, m, 0, c * 360 - 1e-6).map((s) => tidy(s.x / c, 6));
}

/** @type {Skill} */
export const phuongTrinh = {
  id: 'phuong-trinh-luong-giac',
  label: 'Bài 4. Phương trình lượng giác cơ bản',
  make(rand) {
    /** @type {TrigName} */
    const name = pick(rand, /** @type {TrigName[]} */ (['sin', 'cos', 'tan', 'cot']));
    const specials = SPECIAL_VALUES[name].filter(
      (v) => Math.abs(v.value) < 1 || name === 'tan' || name === 'cot',
    );
    const m = pick(rand, specials);
    const c = pick(rand, [1, 1, 2, 3]);
    const sols = solutionsDeg(name, c, m.value);
    const arg = c === 1 ? 'x' : `${c}x`;
    const eq = `\\${name} ${arg} = ${m.tex}`;
    const kind = int(rand, 0, 2);
    const listTex = sols.map((x) => `${numTex(x)}^\\circ`).join('; ');
    const period = name === 'sin' || name === 'cos' ? 360 : 180;
    const first = [
      `Giải $${eq}$ theo độ: các họ nghiệm của $${arg}$ lặp lại sau mỗi $${period}^\\circ$${c === 1 ? '' : `, nên $x$ lặp lại sau mỗi $${numTex(period / c)}^\\circ$`}.`,
      `Các nghiệm thuộc $[0^\\circ; 360^\\circ)$: $${listTex}$.`,
    ];
    if (kind === 0) {
      return {
        prompt: `Phương trình $${eq}$ có bao nhiêu nghiệm thuộc nửa khoảng $[0^\\circ; 360^\\circ)$?`,
        answer: sols.length,
        steps: [...first, `Có $${sols.length}$ nghiệm.`],
        hints: ['Viết công thức nghiệm theo độ rồi thử các giá trị $k$.'],
      };
    }
    if (kind === 1) {
      const pos = sols.filter((x) => x > 0);
      const smallest = pos[0];
      return {
        prompt: `Tìm nghiệm dương nhỏ nhất của phương trình $${eq}$ (theo độ).`,
        answer: smallest,
        unit: '°',
        steps: [...first, `Nghiệm dương nhỏ nhất là $${numTex(smallest)}^\\circ$.`],
        hints: ['Viết công thức nghiệm theo độ rồi thử các giá trị $k$ nhỏ.'],
      };
    }
    const sum = tidy(
      sols.reduce((s, x) => s + x, 0),
      6,
    );
    return {
      prompt: `Tính tổng các nghiệm thuộc nửa khoảng $[0^\\circ; 360^\\circ)$ của phương trình $${eq}$ (theo độ).`,
      answer: sum,
      unit: '°',
      steps: [...first, `Tổng: $${numTex(sum)}^\\circ$.`],
      hints: ['Liệt kê đủ các nghiệm trong $[0^\\circ; 360^\\circ)$ trước khi cộng.'],
    };
  },
};

/** The four skills of the chapter review, in book order. */
export const CHAPTER_SKILLS = [goc, congThuc, hamSo, phuongTrinh];
