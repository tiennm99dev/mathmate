/**
 * Boxes of coloured balls and every way of taking balls from them without
 * looking; `#lib/core/kid/chance.js` gives the word for what can happen. Pure
 * and DOM-free.
 */

export const BALL_COLORS = /** @type {const} */ ({
  xanh: { name: 'xanh', fill: '#2563eb', mark: 'X', ink: '#ffffff' },
  do: { name: 'đỏ', fill: '#dc2626', mark: 'Đ', ink: '#ffffff' },
  vang: { name: 'vàng', fill: '#facc15', mark: 'V', ink: '#334155' },
});

/** @typedef {keyof typeof BALL_COLORS} BallColor */

export const COLOR_IDS = /** @type {BallColor[]} */ (Object.keys(BALL_COLORS));

/**
 * Every way of taking one or two balls from a box.
 * @param {readonly BallColor[]} balls
 * @param {1 | 2} taken
 * @returns {BallColor[][]}
 */
export function waysToTake(balls, taken) {
  if (taken === 1) return balls.map((b) => [b]);
  return balls.flatMap((a, i) => balls.slice(i + 1).map((b) => [a, b]));
}

/**
 * A box of balls: 'hộp có 2 bóng xanh, 1 bóng đỏ'.
 * @param {readonly BallColor[]} balls
 */
export function boxText(balls) {
  const parts = COLOR_IDS.filter((c) => balls.includes(c)).map(
    (c) => `${balls.filter((b) => b === c).length} bóng ${BALL_COLORS[c].name}`,
  );
  return `Hộp có ${parts.join(', ')}`;
}
