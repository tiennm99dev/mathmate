/**
 * Simulated trials for comparing the relative frequency of an event with
 * its classical probability n(E)/n(Ω). A problem knows its exact count of
 * favourable outcomes and how to play one random trial; the run keeps the
 * number of trials, the number of times E happened and a thinned trace of
 * the relative frequency for a graph.
 */

import { GROUP, formatNumber, fmt, texNumber } from '#lib/core/number-format.js';
import { drawIndices } from './counting.js';

/**
 * @typedef {object} TrialProblem
 * @property {string} id
 * @property {string} title short name for the picker
 * @property {string} prompt the experiment and the event E, rich text
 * @property {number} favourable n(E)
 * @property {number} total n(Ω)
 * @property {string} method how n(E) and n(Ω) are counted, rich text
 * @property {(rand: () => number) => { hit: boolean, text: string }} trial
 */

/**
 * @typedef {object} Run
 * @property {number} trials
 * @property {number} hits
 * @property {string} last what the latest trial gave
 * @property {Array<[number, number]>} trace (trials, relative frequency)
 */

/** Most trials one run may take, so the page stays quick. */
export const MAX_TRIALS = 100000;

/** @returns {Run} */
export const emptyRun = () => ({ trials: 0, hits: 0, last: '', trace: [] });

/**
 * A trace point is kept after each of the first 100 trials, then every
 * 100 trials, so a long run stays light.
 * @param {number} t
 */
const keepsPoint = (t) => t <= 100 || t % 100 === 0;

/**
 * Plays `count` more trials of the problem.
 * @param {TrialProblem} problem
 * @param {Run} run
 * @param {number} count
 * @param {() => number} rand
 * @returns {Run}
 */
export function playTrials(problem, run, count, rand) {
  let { trials, hits, last } = run;
  const trace = [...run.trace];
  const steps = Math.min(count, MAX_TRIALS - trials);
  for (let i = 0; i < steps; i++) {
    const out = problem.trial(rand);
    trials += 1;
    if (out.hit) hits += 1;
    last = out.text;
    if (keepsPoint(trials)) trace.push([trials, hits / trials]);
  }
  return { trials, hits, last, trace };
}

/**
 * A probability written for reading: 4 decimals, or 3 significant digits
 * when it is smaller than 0,001 (0,000000123).
 * @param {number} p
 */
export function probabilityDecimal(p) {
  if (p === 0 || p >= 0.001) return formatNumber(p, 4);
  const places = Math.ceil(-Math.log10(p)) + 2;
  return formatNumber(p, places);
}

/**
 * '= 0{,}5' when the decimal is exact, '\approx 0{,}7455' when it is rounded,
 * for writing P(E) in TeX.
 * @param {number} p
 */
export function probabilityTexValue(p) {
  const text = probabilityDecimal(p);
  const exact = Number(text.replace(',', '.').replaceAll(GROUP, '')) === p;
  return `${exact ? '=' : '\\approx'} ${texNumber(text)}`;
}

/**
 * The live sentence under the simulator.
 * @param {TrialProblem} problem
 * @param {Run} run
 */
export function runText(problem, run) {
  const p = problem.favourable / problem.total;
  if (run.trials === 0) {
    return `Xác suất tính theo định nghĩa cổ điển là $P(E) ${probabilityTexValue(p)}$. Bấm "Thử 1 lần" hoặc chạy nhiều lần thử để xem tần suất của $E$.`;
  }
  const f = run.hits / run.trials;
  const head = `Sau ${fmt(run.trials)} lần thử, $E$ xảy ra ${fmt(run.hits)} lần: tần suất ${formatNumber(f, 4)}, còn $P(E) ${probabilityTexValue(p)}$.`;
  if (p < 0.001) {
    return `${head} Xác suất rất bé: theo nguyên lí xác suất bé, khi thực hiện một lần thử ta coi như $E$ không xảy ra.`;
  }
  if (run.trials < 100) return `${head} Còn ít lần thử, tần suất có thể lệch xa xác suất.`;
  const gap = Math.abs(f - p);
  return gap < 0.02
    ? `${head} Càng nhiều lần thử, tần suất càng gần xác suất.`
    : `${head} Chạy thêm lần thử để tần suất tiến lại gần xác suất.`;
}

/**
 * Balls of named colours in one box, `[colour, how many]`.
 * @typedef {Array<[string, number]>} Box
 */

/**
 * The colours of `k` balls taken at random at once from the box.
 * @param {() => number} rand
 * @param {Box} box
 * @param {number} k
 */
export function drawBalls(rand, box, k) {
  const balls = box.flatMap(([colour, count]) => Array(count).fill(colour));
  return drawIndices(rand, balls.length, k).map((i) => balls[i]);
}

/**
 * The sides of `k` fair coins: 'S' (sấp) or 'N' (ngửa).
 * @param {() => number} rand
 * @param {number} k
 */
export const tossCoins = (rand, k) =>
  Array.from({ length: k }, () => (rand() < 0.5 ? 'S' : 'N')).join('');

/**
 * The faces of `k` fair dice.
 * @param {() => number} rand
 * @param {number} k
 */
export const rollDice = (rand, k) => Array.from({ length: k }, () => 1 + Math.floor(rand() * 6));
