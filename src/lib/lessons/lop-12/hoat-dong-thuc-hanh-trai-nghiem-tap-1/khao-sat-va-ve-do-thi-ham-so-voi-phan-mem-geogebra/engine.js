/**
 * Families of functions with a parameter m, surveyed the way GeoGebra shows
 * them: the function with m put in, its derivative, the extremum points
 * (rounded to two decimals, as GeoGebra prints them) and the asymptotes.
 *
 * - cubic: y = x³ − 3mx + 1, two extrema when m > 0;
 * - quartic: y = x⁴ − 2mx² + 1, three extrema when m > 0, one otherwise;
 * - rational: y = (mx + 1)/(x − 1), asymptotes x = 1 and y = m, except for
 *   m = −1 where the function is the constant −1 (x ≠ 1).
 */

import { formatNumber, tidy } from '#lib/core/number-format.js';

/** @typedef {'cubic' | 'quartic' | 'rational'} FamilyId */
/** @typedef {{ x: number, y: number, kind: 'max' | 'min' }} Extremum */

/**
 * @typedef {object} Family
 * @property {FamilyId} id
 * @property {string} label
 * @property {string} formula the family with the letter m, as plain text
 * @property {{ min: number, max: number, step: number }} range of m
 * @property {number} start
 * @property {import('../_shared/plot.js').Window} win
 * @property {string} locus the curve the extremum points trace, as plain text
 * @property {(x: number) => number} [locusF]
 */

/** @type {Family[]} */
export const FAMILIES = [
  {
    id: 'cubic',
    label: 'Bậc ba',
    formula: 'y = x³ − 3mx + 1',
    range: { min: -1, max: 2, step: 0.25 },
    start: 1,
    win: { xMin: -3, xMax: 3, yMin: -7, yMax: 9 },
    locus: 'y = 1 − 2x³',
    locusF: (x) => 1 - 2 * x ** 3,
  },
  {
    id: 'quartic',
    label: 'Trùng phương',
    formula: 'y = x⁴ − 2mx² + 1',
    range: { min: -1, max: 2, step: 0.25 },
    start: 1,
    win: { xMin: -2.5, xMax: 2.5, yMin: -4, yMax: 6 },
    locus: 'y = 1 − x⁴ (hai điểm cực tiểu)',
    locusF: (x) => 1 - x ** 4,
  },
  {
    id: 'rational',
    label: 'Phân thức',
    formula: 'y = (mx + 1)/(x − 1)',
    range: { min: -3, max: 3, step: 0.5 },
    start: 2,
    win: { xMin: -4, xMax: 6, yMin: -6, yMax: 6 },
    locus: '',
  },
];

/** @param {string} id */
export const familyOf = (id) => FAMILIES.find((f) => f.id === id) ?? FAMILIES[0];

const SUP = ['', '', '²', '³', '⁴'];

/**
 * A polynomial as plain text the book's way, from [coefficient, power]
 * terms: [[1, 3], [-4.5, 1], [1, 0]] → 'x³ − 4,5x + 1'; zero terms are
 * dropped and a coefficient ±1 is not written before x.
 * @param {Array<[number, number]>} terms
 */
export function polyText(terms) {
  const kept = terms.filter(([c]) => tidy(c) !== 0);
  if (!kept.length) return '0';
  return kept
    .map(([c, p], i) => {
      const a = Math.abs(tidy(c));
      const body = p === 0 ? formatNumber(a) : `${a === 1 ? '' : formatNumber(a)}x${SUP[p]}`;
      const sign = c < 0 ? (i ? ' − ' : '−') : i ? ' + ' : '';
      return sign + body;
    })
    .join('');
}

/**
 * A point rounded to two decimals the way GeoGebra prints it, written with
 * the book's separators: (−1,22; 4,67).
 * @param {number} x @param {number} y
 */
export const pointText = (x, y) =>
  `(${formatNumber(tidy(x, 2), 2)}; ${formatNumber(tidy(y, 2), 2)})`;

/**
 * @typedef {object} Survey
 * @property {(x: number) => number} f
 * @property {string} input f(x) with m put in
 * @property {string} derivative f'(x) with m put in
 * @property {Extremum[]} extrema from left to right
 * @property {{ vertical: number, horizontal: number } | null} asymptotes
 * @property {number[]} breaks x where the graph is cut
 * @property {{ x: number, y: number } | null} hole a point missing from the graph
 * @property {string} verdict why there are that many extrema (or asymptotes)
 */

/**
 * The survey of one member of a family.
 * @param {FamilyId} id @param {number} m
 * @returns {Survey}
 */
export function survey(id, m) {
  const mt = formatNumber(m);
  if (id === 'cubic') {
    const f = (/** @type {number} */ x) => x ** 3 - 3 * m * x + 1;
    /** @type {Extremum[]} */
    const extrema = [];
    let verdict;
    if (m > 0) {
      const s = Math.sqrt(m);
      extrema.push({ x: -s, y: f(-s), kind: 'max' }, { x: s, y: f(s), kind: 'min' });
      verdict = `Với m = ${mt} > 0, phương trình y' = 3x² − 3m = 0 có hai nghiệm phân biệt x = ±√m và y' đổi dấu khi qua mỗi nghiệm, nên hàm số có một điểm cực đại và một điểm cực tiểu.`;
    } else if (m === 0) {
      verdict =
        "Với m = 0, y' = 3x² ≥ 0 và chỉ bằng 0 tại x = 0: y' không đổi dấu, hàm số đồng biến trên ℝ và không có cực trị.";
    } else {
      verdict = `Với m = ${mt} < 0, y' = 3x² − 3m > 0 với mọi x: hàm số đồng biến trên ℝ và không có cực trị.`;
    }
    return {
      f,
      input: polyText([
        [1, 3],
        [-3 * m, 1],
        [1, 0],
      ]),
      derivative: polyText([
        [3, 2],
        [-3 * m, 0],
      ]),
      extrema,
      asymptotes: null,
      breaks: [],
      hole: null,
      verdict,
    };
  }
  if (id === 'quartic') {
    const f = (/** @type {number} */ x) => x ** 4 - 2 * m * x ** 2 + 1;
    /** @type {Extremum[]} */
    const extrema = [];
    let verdict;
    if (m > 0) {
      const s = Math.sqrt(m);
      extrema.push(
        { x: -s, y: f(-s), kind: 'min' },
        { x: 0, y: 1, kind: 'max' },
        { x: s, y: f(s), kind: 'min' },
      );
      verdict = `Với m = ${mt} > 0, y' = 4x(x² − m) = 0 có ba nghiệm x = 0, x = ±√m nên hàm số có ba điểm cực trị: cực đại tại x = 0, cực tiểu tại x = ±√m.`;
    } else {
      extrema.push({ x: 0, y: 1, kind: 'min' });
      verdict = `Với m = ${mt} ≤ 0, x² − m ≥ 0 nên y' = 4x(x² − m) chỉ đổi dấu tại x = 0: hàm số có một điểm cực tiểu duy nhất (0; 1).`;
    }
    return {
      f,
      input: polyText([
        [1, 4],
        [-2 * m, 2],
        [1, 0],
      ]),
      derivative: polyText([
        [4, 3],
        [-4 * m, 1],
      ]),
      extrema,
      asymptotes: null,
      breaks: [],
      hole: null,
      verdict,
    };
  }
  const f = (/** @type {number} */ x) => (x === 1 ? NaN : (m * x + 1) / (x - 1));
  const top = -m - 1;
  const num = polyText([
    [m, 1],
    [1, 0],
  ]);
  const input = `${m === 0 ? num : `(${num})`}/(x − 1)`;
  const derivative = top === 0 ? '0 (x ≠ 1)' : `${formatNumber(top)}/(x − 1)²`;
  if (m === -1) {
    return {
      f,
      input,
      derivative,
      extrema: [],
      asymptotes: null,
      breaks: [1],
      hole: { x: 1, y: -1 },
      verdict:
        'Với m = −1, tử số −x + 1 = −(x − 1) nên y = −1 với mọi x ≠ 1: đồ thị là đường thẳng y = −1 bỏ đi điểm (1; −1), không có tiệm cận.',
    };
  }
  const way = top < 0 ? 'nghịch biến' : 'đồng biến';
  return {
    f,
    input,
    derivative,
    extrema: [],
    asymptotes: { vertical: 1, horizontal: m },
    breaks: [1],
    hole: null,
    verdict: `Với m = ${mt}, y' = ${formatNumber(top)}/(x − 1)² ${top < 0 ? '< 0' : '> 0'}: hàm số ${way} trên từng khoảng (−∞; 1) và (1; +∞), không có cực trị. Tiệm cận đứng x = 1, tiệm cận ngang y = ${mt}.`,
  };
}
