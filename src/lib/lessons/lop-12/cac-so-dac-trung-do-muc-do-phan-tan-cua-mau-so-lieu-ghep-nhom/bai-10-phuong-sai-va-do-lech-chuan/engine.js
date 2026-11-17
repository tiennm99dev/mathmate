/**
 * What the risk widget shows for two grouped samples of yearly profit: the
 * mean of each, its variance and standard deviation with the numbers put in,
 * the strip from x̄ − s to x̄ + s on its chart, each group's share
 * m_i(x_i − x̄)² of the variance, and which investment is the riskier one.
 */

import { formatNumber, tidy } from '#lib/core/number-format.js';
import {
  approxText,
  eqTex,
  groupedMean,
  groupedStd,
  groupedVariance,
  makeGroups,
  meanTex,
  midpoint,
  sampleSize,
  stdTex,
  varianceWorkTex,
} from '#lib/stats-engine/grouped.js';

/** @typedef {import('#lib/stats-engine/grouped.js').Group} Group */

/** Profit per year, in percent of the money put in: groups [−2; 0), …, [6; 8). */
export const START = -2;
export const WIDTH = 2;
export const UNIT = '%';

/**
 * @typedef {object} Field
 * @property {'A' | 'B'} id
 * @property {string} title
 * @property {number[]} counts
 */

/** @type {Field[]} */
export const FIELDS = [
  {
    id: 'A',
    title: 'Lợi nhuận một năm (%) của 20 khoản đầu tư vào lĩnh vực A',
    counts: [3, 4, 6, 4, 3],
  },
  {
    id: 'B',
    title: 'Lợi nhuận một năm (%) của 20 khoản đầu tư vào lĩnh vực B',
    counts: [1, 3, 12, 3, 1],
  },
];

/** @param {readonly number[]} counts */
export function groupsOf(counts) {
  return makeGroups(START, WIDTH, counts);
}

/**
 * @typedef {object} View
 * @property {boolean} empty
 * @property {number} mean
 * @property {number} variance
 * @property {number} std
 * @property {Array<{ x: number, label: string, color: string }>} markers
 * @property {{ from: number, to: number, label: string, color: string } | null} band
 * @property {string[]} tex
 * @property {number[]} shares m_i(x_i − x̄)² per group
 */

const MEAN_COLOR = '#0f766e';
const BAND_COLOR = '#be123c';

/**
 * @param {readonly Group[]} groups
 * @returns {View}
 */
export function riskView(groups) {
  if (sampleSize(groups) === 0) {
    return {
      empty: true,
      mean: 0,
      variance: 0,
      std: 0,
      markers: [],
      band: null,
      tex: [],
      shares: groups.map(() => 0),
    };
  }
  const mean = groupedMean(groups);
  const variance = groupedVariance(groups);
  const std = groupedStd(groups);
  const lo = groups[0].lo;
  const hi = groups[groups.length - 1].hi;
  return {
    empty: false,
    mean,
    variance,
    std,
    markers: [{ x: mean, label: `x̄ ${approxText(mean)}`, color: MEAN_COLOR }],
    band:
      std > 0
        ? {
            from: Math.max(lo, mean - std),
            to: Math.min(hi, mean + std),
            label: `x̄ ± s, s ${approxText(std)}`,
            color: BAND_COLOR,
          }
        : null,
    tex: [meanTex(groups), varianceWorkTex(groups), stdTex(groups)],
    shares: groups.map((g) => tidy(g.count * (midpoint(g) - mean) ** 2)),
  };
}

/**
 * The verdict on the two fields: which one is riskier and why.
 * @param {View} a
 * @param {View} b
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function verdict(a, b) {
  if (a.empty || b.empty) {
    return {
      tone: 'warn',
      text: 'Mỗi lĩnh vực cần có ít nhất một khoản đầu tư: hãy tăng tần số của một nhóm.',
    };
  }
  const means =
    Math.abs(a.mean - b.mean) < 1e-9
      ? `Hai lĩnh vực có cùng lợi nhuận trung bình $\\overline{x} ${eqTex(a.mean)}\\%$.`
      : `Lợi nhuận trung bình: $\\overline{x}_A ${eqTex(a.mean)}\\%$, $\\overline{x}_B ${eqTex(b.mean)}\\%$.`;
  const sA = `s_A ${eqTex(a.std)}`;
  const sB = `s_B ${eqTex(b.std)}`;
  if (Math.abs(a.std - b.std) < 1e-9) {
    return {
      tone: 'info',
      text: `${means} Hai độ lệch chuẩn bằng nhau ($${sA}$, $${sB}$): mức độ rủi ro như nhau.`,
    };
  }
  if (Math.round(a.std * 100) === Math.round(b.std * 100)) {
    return {
      tone: 'info',
      text: `${means} Hai độ lệch chuẩn gần như bằng nhau ($${sA}$, $${sB}$): mức độ rủi ro gần như nhau.`,
    };
  }
  const [risky, safe] = a.std > b.std ? ['A', 'B'] : ['B', 'A'];
  return {
    tone: 'ok',
    text: `${means} Độ lệch chuẩn $${sA}$ và $${sB}$, nên $s_${risky} > s_${safe}$: lợi nhuận ở lĩnh vực ${risky} phân tán hơn quanh số trung bình, nên đầu tư vào lĩnh vực ${risky} rủi ro hơn; lĩnh vực ${safe} cho lợi nhuận ổn định hơn.`,
  };
}

/** A group's share m_i(x_i − x̄)² written for the table. @param {number} v */
export function shareText(v) {
  return formatNumber(v, 2);
}
