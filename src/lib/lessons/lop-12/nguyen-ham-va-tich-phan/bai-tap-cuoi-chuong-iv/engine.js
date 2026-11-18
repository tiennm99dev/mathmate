/**
 * The rounds of the shaded-region quiz: a region bounded by one or two
 * graphs, the integral formulas to choose from (exactly one gives its area),
 * and the area itself, which the learner then types.
 */

import { readNumber } from '#lib/core/decimal.js';

/**
 * @typedef {{
 *   id: string,
 *   tex: string,
 *   f: (x: number) => number, g?: (x: number) => number,
 *   from: number, to: number,
 *   win: import('#lib/core/visuals/plot.js').Window,
 *   options: string[], correct: number,
 *   area: number, areaTex: string,
 *   why: string, steps: string,
 * }} Round
 */

/** @type {Round[]} */
export const ROUNDS = [
  {
    id: 'below-axis',
    tex: 'y = x^2 - 1,\\ y = 0,\\ x = 0,\\ x = 2',
    f: (x) => x * x - 1,
    from: 0,
    to: 2,
    win: { xMin: -0.5, xMax: 2.5, yMin: -1.5, yMax: 3.5 },
    options: [
      '\\int_0^2 |x^2 - 1|\\,\\mathrm{d}x',
      '\\int_0^2 (x^2 - 1)\\,\\mathrm{d}x',
      '\\int_1^2 (x^2 - 1)\\,\\mathrm{d}x',
    ],
    correct: 0,
    area: 2,
    areaTex: '2',
    why: 'Trên $[0; 1]$ đồ thị nằm dưới trục hoành, nên phải lấy giá trị tuyệt đối; bỏ dấu $|\\ |$ thì phần đó bị trừ đi và tích phân chỉ còn $\\dfrac{2}{3}$.',
    steps:
      '$S = \\displaystyle\\int_0^1 (1 - x^2)\\,\\mathrm{d}x + \\int_1^2 (x^2 - 1)\\,\\mathrm{d}x = \\dfrac{2}{3} + \\dfrac{4}{3} = 2$.',
  },
  {
    id: 'line-parabola',
    tex: 'y = x,\\ y = x^2',
    f: (x) => x,
    g: (x) => x * x,
    from: 0,
    to: 1,
    win: { xMin: -0.3, xMax: 1.5, yMin: -0.3, yMax: 1.5 },
    options: [
      '\\int_0^1 (x - x^2)\\,\\mathrm{d}x',
      '\\int_0^1 (x^2 - x)\\,\\mathrm{d}x',
      '\\pi\\int_0^1 (x - x^2)^2\\,\\mathrm{d}x',
    ],
    correct: 0,
    area: 1 / 6,
    areaTex: '\\dfrac{1}{6}',
    why: 'Hai đường cắt nhau tại $x = 0$ và $x = 1$; trên $[0; 1]$ đường thẳng $y = x$ nằm trên parabol, nên lấy $x - x^2 \\ge 0$.',
    steps:
      '$S = \\displaystyle\\int_0^1 (x - x^2)\\,\\mathrm{d}x = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$.',
  },
  {
    id: 'sine',
    tex: 'y = \\sin x,\\ y = 0,\\ x = 0,\\ x = 2\\pi',
    f: Math.sin,
    from: 0,
    to: 2 * Math.PI,
    win: { xMin: -0.5, xMax: 7, yMin: -1.5, yMax: 1.5 },
    options: [
      '\\int_0^{\\pi} \\sin x\\,\\mathrm{d}x - \\int_{\\pi}^{2\\pi} \\sin x\\,\\mathrm{d}x',
      '\\int_0^{2\\pi} \\sin x\\,\\mathrm{d}x',
      '\\pi\\int_0^{2\\pi} \\sin^2 x\\,\\mathrm{d}x',
    ],
    correct: 0,
    area: 4,
    areaTex: '4',
    why: 'Trên $[\\pi; 2\\pi]$ ta có $\\sin x \\le 0$, nên phần này phải đổi dấu. Còn $\\displaystyle\\int_0^{2\\pi} \\sin x\\,\\mathrm{d}x = 0$ vì hai phần triệt tiêu nhau.',
    steps:
      '$S = \\displaystyle\\int_0^{\\pi} \\sin x\\,\\mathrm{d}x - \\int_{\\pi}^{2\\pi} \\sin x\\,\\mathrm{d}x = 2 - (-2) = 4$.',
  },
  {
    id: 'parabola-line',
    tex: 'y = 4 - x^2,\\ y = x + 2',
    f: (x) => 4 - x * x,
    g: (x) => x + 2,
    from: -2,
    to: 1,
    win: { xMin: -3, xMax: 2, yMin: -1, yMax: 5 },
    options: [
      '\\int_{-2}^{1} (2 - x - x^2)\\,\\mathrm{d}x',
      '\\int_{-2}^{2} (4 - x^2)\\,\\mathrm{d}x',
      '\\int_{-2}^{1} (x^2 + x - 2)\\,\\mathrm{d}x',
    ],
    correct: 0,
    area: 4.5,
    areaTex: '\\dfrac{9}{2}',
    why: 'Giao điểm: $4 - x^2 = x + 2 \\iff x^2 + x - 2 = 0 \\iff x = -2$ hoặc $x = 1$. Trên $[-2; 1]$ parabol nằm trên đường thẳng: $(4 - x^2) - (x + 2) = 2 - x - x^2 \\ge 0$.',
    steps:
      '$S = \\left(2x - \\dfrac{x^2}{2} - \\dfrac{x^3}{3}\\right)\\Big|_{-2}^{1} = \\dfrac{7}{6} - \\left(-\\dfrac{10}{3}\\right) = \\dfrac{9}{2}$.',
  },
];

/**
 * Whether the typed area is right: an integer, a fraction p/q or a decimal
 * with a comma; null when it cannot be read.
 * @param {Round} round @param {string} text
 */
export function checkArea(round, text) {
  const v = readNumber(text);
  if (v === null) return null;
  return Math.abs(v - round.area) < 1e-9;
}
