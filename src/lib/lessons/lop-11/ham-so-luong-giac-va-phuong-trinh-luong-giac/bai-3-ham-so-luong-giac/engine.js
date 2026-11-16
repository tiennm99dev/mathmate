/**
 * Facts about the four trigonometric functions for the graph tracer, and the
 * partner point it shows: −x (even or odd) or x shifted by one period.
 */

import { trigValue } from '../_shared/trig.js';

/** @typedef {import('../_shared/trig.js').TrigName} TrigName */

/** The traced x runs over [−2π; 2π], in degrees. */
export const X_MIN = -360;
export const X_MAX = 360;

/**
 * @type {Record<TrigName, {
 *   period: number,
 *   odd: boolean,
 *   domainTex: string,
 *   rangeTex: string,
 *   periodTex: string,
 *   parityTex: string,
 * }>}
 */
export const FACTS = {
  sin: {
    period: 360,
    odd: true,
    domainTex: '\\mathbb{R}',
    rangeTex: '[-1; 1]',
    periodTex: '2\\pi',
    parityTex: '\\sin(-x) = -\\sin x',
  },
  cos: {
    period: 360,
    odd: false,
    domainTex: '\\mathbb{R}',
    rangeTex: '[-1; 1]',
    periodTex: '2\\pi',
    parityTex: '\\cos(-x) = \\cos x',
  },
  tan: {
    period: 180,
    odd: true,
    domainTex:
      '\\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}',
    rangeTex: '\\mathbb{R}',
    periodTex: '\\pi',
    parityTex: '\\tan(-x) = -\\tan x',
  },
  cot: {
    period: 180,
    odd: true,
    domainTex: '\\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}',
    rangeTex: '\\mathbb{R}',
    periodTex: '\\pi',
    parityTex: '\\cot(-x) = -\\cot x',
  },
};

/**
 * The partner of x: its opposite −x, or x moved by one period (forward when
 * that stays in range, else backward). Null for 'none'.
 * @param {TrigName} name
 * @param {number} x
 * @param {'none' | 'mirror' | 'period'} mode
 * @returns {number | null}
 */
export function partnerOf(name, x, mode) {
  if (mode === 'none') return null;
  if (mode === 'mirror') return -x;
  const t = FACTS[name].period;
  return x + t <= X_MAX ? x + t : x - t;
}

/**
 * Whether the function's value at the partner matches what the property
 * predicts: f(−x) = ±f(x), f(x ± T) = f(x). Undefined values count as a
 * match when both sides are undefined.
 * @param {TrigName} name @param {number} x @param {'mirror' | 'period'} mode
 */
export function propertyHolds(name, x, mode) {
  const p = /** @type {number} */ (partnerOf(name, x, mode));
  const v = trigValue(name, x);
  const w = trigValue(name, p);
  if (Number.isNaN(v) || Number.isNaN(w)) return Number.isNaN(v) && Number.isNaN(w);
  const expected = mode === 'mirror' && FACTS[name].odd ? -v : v;
  return Math.abs(w - expected) < 1e-9;
}
