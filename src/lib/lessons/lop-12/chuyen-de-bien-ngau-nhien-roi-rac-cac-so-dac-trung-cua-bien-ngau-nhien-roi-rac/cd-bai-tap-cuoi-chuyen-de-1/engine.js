/**
 * Games of chance for the expected gain. In each game the player's gain X
 * (in thousand đồng, a loss being negative) is a discrete random variable
 * with exact fraction probabilities. One rule of the game (a prize or the
 * ticket price) is adjustable: the learner finds the value that makes the
 * game fair, E(X) = 0, and plays many rounds to see the average gain settle
 * near E(X).
 */

import { numTex, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {object} Outcome
 * @property {string} label what happens, plain text
 * @property {number} gain the player's gain, thousand đồng
 * @property {number} num probability numerator
 * @property {number} den probability denominator
 */

/**
 * @typedef {object} Game
 * @property {string} id
 * @property {string} label the switch label
 * @property {string} story the rules, rich text
 * @property {string} knob what the slider sets
 * @property {number} min @property {number} max @property {number} step
 * @property {number} start the slider's first value
 * @property {(v: number) => Outcome[]} outcomes the gain table for a slider value
 */

/** @type {Game[]} */
export const GAMES = [
  {
    id: 'bau-cua',
    label: 'Ba con xúc xắc',
    story:
      'Người chơi đặt $10$ nghìn đồng vào một mặt (chẳng hạn mặt $6$ chấm) rồi gieo ba con xúc xắc cân đối. Mặt đó xuất hiện $1$ hoặc $2$ lần thì người chơi được thưởng $10$ hoặc $20$ nghìn đồng (và nhận lại tiền đặt); xuất hiện cả $3$ lần thì được thưởng số tiền chọn ở thanh trượt (và cũng nhận lại tiền đặt); không xuất hiện thì mất $10$ nghìn đồng.',
    knob: 'Tiền thưởng khi mặt đã đặt xuất hiện 3 lần',
    min: 30,
    max: 300,
    step: 10,
    start: 30,
    outcomes: (v) => [
      { label: 'Không xuất hiện', gain: -10, num: 125, den: 216 },
      { label: 'Xuất hiện 1 lần', gain: 10, num: 75, den: 216 },
      { label: 'Xuất hiện 2 lần', gain: 20, num: 15, den: 216 },
      { label: 'Xuất hiện 3 lần', gain: v, num: 1, den: 216 },
    ],
  },
  {
    id: 'rut-tham',
    label: 'Rút thăm',
    story:
      'Một hộp có $10$ lá thăm: $1$ lá trúng $50$ nghìn đồng, $2$ lá trúng $20$ nghìn đồng, $7$ lá không trúng. Người chơi mua một lượt rút với giá ở thanh trượt và rút ngẫu nhiên một lá.',
    knob: 'Giá một lượt rút',
    min: 5,
    max: 15,
    step: 1,
    start: 12,
    outcomes: (v) => [
      { label: 'Trúng 50 nghìn', gain: 50 - v, num: 1, den: 10 },
      { label: 'Trúng 20 nghìn', gain: 20 - v, num: 2, den: 10 },
      { label: 'Không trúng', gain: -v, num: 7, den: 10 },
    ],
  },
  {
    id: 'tong-bay',
    label: 'Tổng bằng 7',
    story:
      'Gieo hai con xúc xắc cân đối. Nếu tổng số chấm bằng $7$, người chơi được thưởng số tiền ở thanh trượt; nếu không, người chơi mất $10$ nghìn đồng.',
    knob: 'Tiền thưởng khi tổng bằng 7',
    min: 10,
    max: 80,
    step: 5,
    start: 40,
    outcomes: (v) => [
      { label: 'Tổng bằng 7', gain: v, num: 6, den: 36 },
      { label: 'Tổng khác 7', gain: -10, num: 30, den: 36 },
    ],
  },
];

/**
 * E(X) = Σ gain · probability, in thousand đồng.
 * @param {Outcome[]} outcomes
 */
export function expectedGain(outcomes) {
  return tidy(outcomes.reduce((s, o) => s + (o.gain * o.num) / o.den, 0));
}

/**
 * The slider value that makes the game fair, if the slider can reach it.
 * @param {Game} game
 */
export function fairValue(game) {
  for (let v = game.min; v <= game.max; v += game.step) {
    if (expectedGain(game.outcomes(v)) === 0) return v;
  }
  return null;
}

/**
 * E(X) written out with fraction probabilities, two terms per line so it
 * fits a phone, in an `aligned` block:
 * 'E(X) &= (-10) \cdot \dfrac{125}{216} + 10 \cdot \dfrac{75}{216} \\ &\quad + … \\ &\approx -0{,}79'.
 * @param {Outcome[]} outcomes
 */
export function expectedTex(outcomes) {
  const terms = outcomes.map(
    (o) =>
      `${o.gain < 0 ? `(${numTex(o.gain)})` : numTex(o.gain)} \\cdot \\dfrac{${o.num}}{${o.den}}`,
  );
  const lines = [];
  for (let i = 0; i < terms.length; i += 2) {
    lines.push(`${i === 0 ? 'E(X) &= ' : '&\\quad + '}${terms.slice(i, i + 2).join(' + ')}`);
  }
  const e = expectedGain(outcomes);
  const r = tidy(e, 2);
  lines.push(`&${r === e ? '=' : '\\approx'} ${numTex(r)}`);
  return `\\begin{aligned} ${lines.join(' \\\\ ')} \\end{aligned}`;
}

/**
 * Plays one round: the index of the outcome drawn.
 * @param {Outcome[]} outcomes @param {() => number} rand
 */
export function playRound(outcomes, rand) {
  const u = rand();
  let acc = 0;
  for (let i = 0; i < outcomes.length; i += 1) {
    acc += outcomes[i].num / outcomes[i].den;
    if (u < acc) return i;
  }
  return outcomes.length - 1;
}

/**
 * Who the game favours, from E(X).
 * @param {Outcome[]} outcomes
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function verdict(outcomes) {
  const e = expectedGain(outcomes);
  const r = numTex(tidy(Math.abs(e), 2));
  if (e === 0) {
    return {
      tone: 'ok',
      text: '$E(X) = 0$: trò chơi công bằng, chơi nhiều ván thì trung bình người chơi không lời, không lỗ.',
    };
  }
  if (e < 0) {
    return {
      tone: 'warn',
      text: `$E(X) < 0$: trò chơi có lợi cho nhà cái. Chơi nhiều ván, trung bình mỗi ván người chơi lỗ khoảng $${r}$ nghìn đồng.`,
    };
  }
  return {
    tone: 'info',
    text: `$E(X) > 0$: trò chơi có lợi cho người chơi. Chơi nhiều ván, trung bình mỗi ván người chơi lời khoảng $${r}$ nghìn đồng.`,
  };
}

/**
 * The line under the play buttons: rounds so far, total and mean gain,
 * compared with E(X).
 * @param {number} rounds
 * @param {number} total thousand đồng
 * @param {number} e E(X)
 * @param {string | null} lastLabel the last round's outcome
 */
export function playSummary(rounds, total, e, lastLabel) {
  if (rounds === 0) return 'Bấm chơi để thử trò chơi. Mỗi ván, tiền lời (âm là lỗ) được cộng dồn.';
  const last = lastLabel === null ? '' : `Ván cuối: ${lastLabel.toLowerCase()}. `;
  const r = tidy(e, 2);
  return `${last}Sau $${numTex(rounds)}$ ván, tổng tiền lời là $${numTex(total)}$ nghìn đồng, trung bình $${numTex(total / rounds, 2)}$ nghìn đồng mỗi ván (so với $E(X) ${r === e ? '=' : '\\approx'} ${numTex(r)}$).`;
}
