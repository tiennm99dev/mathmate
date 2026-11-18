/**
 * "Chắc chắn, có thể, không thể" for a box of coloured balls, with the words
 * and boxes of `#lib/core/kid/chance.js`. Pure and DOM-free.
 */

import { BALL_COLORS, ballCounts, wordOf } from '#lib/core/kid/chance.js';

/** @typedef {import('#lib/core/kid/chance.js').Chance} Chance */
/** @typedef {import('#lib/core/kid/chance.js').BallColor} BallColor */

/**
 * "Trong hộp có 3 quả bóng đỏ, 2 quả bóng xanh."
 * @param {readonly BallColor[]} balls
 */
export function boxText(balls) {
  const parts = ballCounts(balls).map((b) => `${b.count} quả bóng ${BALL_COLORS[b.color].name}`);
  return `Trong hộp có ${parts.join(', ')}.`;
}

/**
 * Taking one ball out of the box: getting a ball of `color` is certain when
 * every ball has that colour, impossible when none has, possible otherwise.
 * @param {readonly BallColor[]} balls
 * @param {BallColor} color
 * @returns {Chance}
 */
export function chanceOfOne(balls, color) {
  return wordOf(balls, (b) => b === color);
}

/**
 * Taking two balls at once: whether a given pair of colours can come out.
 * @param {readonly BallColor[]} balls
 * @param {BallColor} first
 * @param {BallColor} second
 */
export function pairPossible(balls, first, second) {
  /** @param {BallColor} c */
  const have = (c) => balls.filter((b) => b === c).length;
  return first === second ? have(first) >= 2 : have(first) >= 1 && have(second) >= 1;
}
