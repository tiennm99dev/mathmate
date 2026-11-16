/**
 * "Chắc chắn, có thể, không thể" for a box of coloured balls, with the words
 * of `#lib/core/kid/chance.js`. Pure and DOM-free.
 */

import { wordOf } from '#lib/core/kid/chance.js';

/** @typedef {import('#lib/core/kid/chance.js').Chance} Chance */

/**
 * "Trong hộp có 3 quả bóng đỏ, 2 quả bóng xanh."
 * @param {import('./visual.js').Ball[]} balls
 */
export function boxText(balls) {
  return `Trong hộp có ${balls.map((b) => `${b.count} quả bóng ${b.color}`).join(', ')}.`;
}

/**
 * Taking one ball out of the box: getting a ball of `color` is certain when
 * every ball has that colour, impossible when none has, possible otherwise.
 * @param {import('./visual.js').Ball[]} balls
 * @param {import('./visual.js').BallColor} color
 * @returns {Chance}
 */
export function chanceOfOne(balls, color) {
  return wordOf(
    balls.filter((b) => b.count > 0),
    (b) => b.color === color,
  );
}

/**
 * Taking two balls at once: whether a given pair of colours can come out.
 * @param {import('./visual.js').Ball[]} balls
 * @param {import('./visual.js').BallColor} first
 * @param {import('./visual.js').BallColor} second
 */
export function pairPossible(balls, first, second) {
  /** @param {import('./visual.js').BallColor} c */
  const have = (c) => balls.filter((b) => b.color === c).reduce((s, b) => s + b.count, 0);
  return first === second ? have(first) >= 2 : have(first) >= 1 && have(second) >= 1;
}
