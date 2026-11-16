/**
 * Logic of the "line y = m" widget: the slider range of m for each
 * function, the end points on the unit circle and the readable list of
 * solutions on [−2π; 2π].
 */

import { formatNumber } from '#lib/core/number-format.js';
import { isNiceAngle } from '../_shared/trig.js';
import { piText } from '../_shared/graph.js';
import { solutionsIn } from '../_shared/equations.js';

/** @typedef {import('../_shared/trig.js').TrigName} TrigName */

/** The graph shows x in [−2π; 2π], in degrees. */
export const X_MIN = -360;
export const X_MAX = 360;

/**
 * Slider range of m: wider than [−1; 1] for sin and cos, so the learner
 * meets the case with no solution.
 * @param {TrigName} name
 */
export function mRange(name) {
  return name === 'sin' || name === 'cos'
    ? { min: -1.5, max: 1.5, step: 0.05 }
    : { min: -3, max: 3, step: 0.1 };
}

/**
 * The points of the unit circle that solve the equation, as angles in
 * [0°; 360°) tagged with their family.
 * @param {TrigName} name @param {number} m
 */
export function circleHits(name, m) {
  return solutionsIn(name, m, 0, 359.999999);
}

/**
 * A solution written for a chip: exact as a multiple of π when it is a
 * multiple of 15°, otherwise rounded in radians ('≈ 0,41').
 * @param {number} deg
 */
export function solutionText(deg) {
  if (isNiceAngle(deg)) return piText(Math.round(deg));
  return `≈ ${formatNumber((deg * Math.PI) / 180, 2)}`;
}

/**
 * The solutions in [−2π; 2π] with their chip text, sorted.
 * @param {TrigName} name @param {number} m
 */
export function solutionChips(name, m) {
  return solutionsIn(name, m, X_MIN, X_MAX).map((s) => ({ ...s, text: solutionText(s.x) }));
}
