/**
 * The functions of the one-sided limit explorer. Each one is studied near a
 * point x₀ where something happens: a hole (the function is undefined at
 * x₀ but has a limit), a jump (the one-sided limits differ) or a vertical
 * asymptote (the one-sided limits are infinite). Two points x₀ − h and
 * x₀ + h close in from the left and the right as h shrinks, and the
 * window can zoom in with them.
 */

import { zoomAround } from '../_shared/plot.js';

/**
 * @typedef {object} LimitCase
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} tex the formula, as TeX
 * @property {number} x0
 * @property {(x: number) => number} f NaN where undefined
 * @property {number} left the limit from the left (±Infinity allowed)
 * @property {number} right the limit from the right
 * @property {Array<{ x: number, y: number, hollow: boolean }>} dots holes and the value at x₀
 * @property {{ xMin: number, xMax: number, yMin: number, yMax: number }} view the window before zooming
 * @property {string} verdict rich text: what the two sides say about the limit
 */

/** @type {LimitCase[]} */
export const CASES = [
  {
    id: 'hole',
    label: '(x² − 1)/(x − 1)',
    tex: 'f(x) = \\dfrac{x^2 - 1}{x - 1}',
    x0: 1,
    f: (x) => (x === 1 ? NaN : (x * x - 1) / (x - 1)),
    left: 2,
    right: 2,
    dots: [{ x: 1, y: 2, hollow: true }],
    view: { xMin: -1, xMax: 3, yMin: -0.5, yMax: 4.5 },
    verdict:
      '$f$ không xác định tại $x = 1$, nhưng $\\lim\\limits_{x \\to 1^-} f(x) = \\lim\\limits_{x \\to 1^+} f(x) = 2$, nên $\\lim\\limits_{x \\to 1} f(x) = 2$. Thật vậy, với $x \\ne 1$ thì $f(x) = x + 1$.',
  },
  {
    id: 'root',
    label: '(√(x + 4) − 2)/x',
    tex: 'f(x) = \\dfrac{\\sqrt{x + 4} - 2}{x}',
    x0: 0,
    f: (x) => (x === 0 || x < -4 ? NaN : (Math.sqrt(x + 4) - 2) / x),
    left: 0.25,
    right: 0.25,
    dots: [{ x: 0, y: 0.25, hollow: true }],
    view: { xMin: -4, xMax: 4, yMin: 0, yMax: 0.6 },
    verdict:
      'Hai bên cùng tiến về $0{,}25$: $\\lim\\limits_{x \\to 0} f(x) = \\dfrac{1}{4}$. Nhân liên hợp: $f(x) = \\dfrac{1}{\\sqrt{x + 4} + 2} \\to \\dfrac{1}{2 + 2}$.',
  },
  {
    id: 'jump',
    label: 'Hàm số cho bởi hai công thức',
    tex: 'f(x) = \\begin{cases} x + 1 & \\text{nếu } x < 1 \\\\ 4 - x & \\text{nếu } x \\ge 1 \\end{cases}',
    x0: 1,
    f: (x) => (x < 1 ? x + 1 : 4 - x),
    left: 2,
    right: 3,
    dots: [
      { x: 1, y: 2, hollow: true },
      { x: 1, y: 3, hollow: false },
    ],
    view: { xMin: -1, xMax: 3, yMin: -0.5, yMax: 4.5 },
    verdict:
      '$\\lim\\limits_{x \\to 1^-} f(x) = 2$ nhưng $\\lim\\limits_{x \\to 1^+} f(x) = 3$. Hai giới hạn một bên khác nhau, nên không tồn tại $\\lim\\limits_{x \\to 1} f(x)$.',
  },
  {
    id: 'sign',
    label: '|x|/x',
    tex: 'f(x) = \\dfrac{|x|}{x}',
    x0: 0,
    f: (x) => (x === 0 ? NaN : Math.abs(x) / x),
    left: -1,
    right: 1,
    dots: [
      { x: 0, y: -1, hollow: true },
      { x: 0, y: 1, hollow: true },
    ],
    view: { xMin: -2, xMax: 2, yMin: -2, yMax: 2 },
    verdict:
      'Với $x < 0$ thì $f(x) = -1$, với $x > 0$ thì $f(x) = 1$: $\\lim\\limits_{x \\to 0^-} f(x) = -1 \\ne 1 = \\lim\\limits_{x \\to 0^+} f(x)$, nên không tồn tại $\\lim\\limits_{x \\to 0} f(x)$.',
  },
  {
    id: 'inverse',
    label: '1/x',
    tex: 'f(x) = \\dfrac{1}{x}',
    x0: 0,
    f: (x) => (x === 0 ? NaN : 1 / x),
    left: -Infinity,
    right: Infinity,
    dots: [],
    view: { xMin: -2, xMax: 2, yMin: -6, yMax: 6 },
    verdict:
      'Bên trái, $f(x)$ âm và có trị tuyệt đối lớn tuỳ ý: $\\lim\\limits_{x \\to 0^-} \\dfrac{1}{x} = -\\infty$. Bên phải: $\\lim\\limits_{x \\to 0^+} \\dfrac{1}{x} = +\\infty$. Đây là giới hạn vô cực (một bên).',
  },
];

/** The distances of the value table. */
export const TABLE_STEPS = [0.1, 0.01, 0.001];

/**
 * The window around x₀ when zoomed to distance h, holding the holes and
 * the value at x₀ too.
 * @param {LimitCase} c @param {number} h
 */
export function zoomWindow(c, h) {
  return zoomAround(
    c.f,
    c.x0,
    h,
    c.dots.map((d) => d.y),
  );
}
