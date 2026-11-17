/**
 * Logic of the draggable probability distribution chart. Each value x_k of X
 * has a bar of height p_k, kept in steps of 0,05 as a whole number of
 * twentieths so the sum is exact. When the bars add up to 1 the table is a
 * probability distribution, and E(X) is the point where the bars balance.
 */

import { numTex, tidy } from '#lib/core/number-format.js';
import { expectation, stdDev, variance } from '../_shared/distribution.js';

/** Twentieths in a probability of 1: bars move in steps of 1/STEPS = 0,05. */
export const STEPS = 20;

/**
 * @typedef {object} Preset
 * @property {string} id
 * @property {string} label the switch label
 * @property {string} story what X counts, rich text
 * @property {number[]} values the values x_k of X
 * @property {number[]} units each p_k in twentieths
 */

/** @type {Preset[]} */
export const PRESETS = [
  {
    id: 'vi-pham',
    label: 'Vi phạm giao thông',
    story:
      '$X$ là số vụ vi phạm luật giao thông tại một nút giao thông vào một tối thứ Bảy, theo số liệu nhiều tuần.',
    values: [0, 1, 2, 3, 4, 5],
    units: [2, 4, 5, 5, 3, 1],
  },
  {
    id: 'dong-xu',
    label: 'Hai đồng xu',
    story: 'Gieo hai đồng xu cân đối; $X$ là số đồng xu xuất hiện mặt sấp.',
    values: [0, 1, 2],
    units: [5, 10, 5],
  },
  {
    id: 'tu-lap',
    label: 'Tự lập bảng',
    story:
      '$X$ nhận các giá trị $0, 1, \\dots, 5$. Kéo các cột để tự lập một bảng phân bố xác suất.',
    values: [0, 1, 2, 3, 4, 5],
    units: [4, 3, 3, 3, 3, 4],
  },
];

/**
 * The probabilities p_k from twentieths.
 * @param {number[]} units
 */
export function probsOf(units) {
  return units.map((u) => u / STEPS);
}

/**
 * The sum of the probabilities, E(X), V(X) and σ(X); the last three only
 * when the bars add up to 1.
 * @param {number[]} values @param {number[]} units
 */
export function summary(values, units) {
  const total = units.reduce((s, u) => s + u, 0);
  const valid = total === STEPS;
  const p = probsOf(units);
  return {
    total: total / STEPS,
    valid,
    e: valid ? expectation(values, p) : null,
    v: valid ? variance(values, p) : null,
    sigma: valid ? stdDev(values, p) : null,
  };
}

/**
 * A number for TeX, with `=` when it is exact to `places` decimals and
 * `\approx` otherwise: (1.345, 2) → '\approx 1{,}35'.
 * @param {number} value @param {number} places
 */
export function eqTex(value, places) {
  const r = tidy(value, places);
  return `${tidy(value, 9) === r ? '=' : '\\approx'} ${numTex(r)}`;
}

/**
 * E(X) written out term by term, two terms per line so it fits a phone,
 * in an `aligned` block: 'E(X) &= 0 \cdot 0{,}1 + 1 \cdot 0{,}2 \\ &\quad + … \\ &= 2{,}3'.
 * @param {number[]} values @param {number[]} units
 */
export function expectationTex(values, units) {
  const p = probsOf(units);
  const terms = values.map((x, i) => `${numTex(x)} \\cdot ${numTex(p[i])}`);
  const lines = [];
  for (let i = 0; i < terms.length; i += 2) {
    lines.push(`${i === 0 ? 'E(X) &= ' : '&\\quad + '}${terms.slice(i, i + 2).join(' + ')}`);
  }
  lines.push(`&= ${numTex(expectation(values, p))}`);
  return `\\begin{aligned} ${lines.join(' \\\\ ')} \\end{aligned}`;
}

/**
 * V(X) by the short formula and σ(X), one per line:
 * 'V(X) &= 7{,}1 - 2{,}3^2 = 1{,}81 \\ \sigma(X) &= \sqrt{1{,}81} \approx 1{,}35'.
 * @param {number[]} values @param {number[]} units
 */
export function varianceTex(values, units) {
  const p = probsOf(units);
  const e = expectation(values, p);
  const square = tidy(values.reduce((s, x, i) => s + x * x * p[i], 0));
  const v = variance(values, p);
  const eTerm = e < 0 ? `(${numTex(e)})^2` : `${numTex(e)}^2`;
  return `\\begin{aligned} V(X) &= ${numTex(square)} - ${eTerm} = ${numTex(v)} \\\\ \\sigma(X) &= \\sqrt{${numTex(v)}} ${eqTex(Math.sqrt(v), 2)} \\end{aligned}`;
}

/**
 * The live feedback line under the chart.
 * @param {number[]} values @param {number[]} units
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function feedback(values, units) {
  const s = summary(values, units);
  if (!s.valid) {
    const gap = tidy(1 - s.total);
    const move = gap > 0 ? `tăng thêm $${numTex(gap)}$` : `giảm bớt $${numTex(-gap)}$`;
    return {
      tone: 'warn',
      text: `Tổng các xác suất đang là $${numTex(s.total)}$, chưa bằng $1$, nên đây chưa phải bảng phân bố xác suất. Hãy ${move} ở các cột.`,
    };
  }
  const e = /** @type {number} */ (s.e);
  const v = /** @type {number} */ (s.v);
  if (v === 0) {
    return {
      tone: 'info',
      text: `$X$ chỉ nhận một giá trị $${numTex(e)}$: $E(X) = ${numTex(e)}$, $V(X) = 0$, không có sự phân tán.`,
    };
  }
  const sigma = /** @type {number} */ (s.sigma);
  const isValue = values.includes(e);
  return {
    tone: 'ok',
    text: `Tổng các xác suất bằng $1$. Biểu đồ cân bằng tại $E(X) = ${numTex(e)}$${isValue ? '' : ' (kì vọng không nhất thiết là một giá trị của $X$)'}; độ lệch chuẩn $\\sigma(X) ${eqTex(sigma, 2)}$ đo độ phân tán của $X$ quanh $E(X)$.`,
  };
}

/** Largest tilt of the seesaw, in degrees. */
export const MAX_TILT = 12;

/**
 * The turning effect Σ (x_k − g) p_k of the weights p_k at x_k about a pivot
 * at g. For a distribution table it equals E(X) − g, so it vanishes exactly
 * when the pivot sits at E(X).
 * @param {number[]} values @param {number[]} units @param {number} g
 */
export function torque(values, units, g) {
  const p = probsOf(units);
  return tidy(values.reduce((s, x, i) => s + (x - g) * p[i], 0));
}

/**
 * The seesaw's angle in degrees, clockwise (right side down) when the right
 * side is heavier.
 * @param {number[]} values @param {number[]} units @param {number} g
 */
export function tiltOf(values, units, g) {
  return Math.max(-MAX_TILT, Math.min(MAX_TILT, torque(values, units, g) * 10));
}

/**
 * What the seesaw shows for a pivot at g.
 * @param {number[]} values @param {number[]} units @param {number} g
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function balanceText(values, units, g) {
  const s = summary(values, units);
  if (!s.valid) {
    return {
      tone: 'info',
      text: 'Cán cân chỉ cho kì vọng khi tổng các xác suất bằng $1$: hãy sửa các cột trước.',
    };
  }
  const t = torque(values, units, g);
  if (t === 0) {
    return {
      tone: 'ok',
      text: `Cán cân thăng bằng: điểm tựa ở đúng $E(X) = ${numTex(g)}$, vì $\\sum (x_k - ${numTex(g)})p_k = 0$.`,
    };
  }
  const side = t > 0 ? 'phải' : 'trái';
  return {
    tone: 'info',
    text: `Điểm tựa ở $${numTex(g)}$: cán cân nghiêng về bên ${side}, vì $\\sum (x_k - ${numTex(g)})p_k = ${numTex(t)}$. Hãy dịch điểm tựa sang ${side}.`,
  };
}
