/**
 * Repeating an experiment many times (grade 5): tossing a coin, rolling a
 * dice, drawing two socks from a box and spinning a wheel, counting how many
 * times each outcome happens and writing the ratio of that count to the
 * number of trials, unsimplified as the book does. Pure and DOM-free.
 */
import { pickWeighted } from '#lib/stats-engine/probability.js';
import { ratioText } from '../_shared/stats.js';

/** The most trials one table holds. */
export const MAX_TRIALS = 1000;

/**
 * One outcome of an experiment.
 * @typedef {object} Outcome
 * @property {string} id
 * @property {string} label the row of the table ("Mặt sấp")
 * @property {string} event the outcome said as an event ("xuất hiện mặt sấp")
 * @property {string} color
 */

/**
 * An experiment: what one trial does and the outcomes it can give.
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} title
 * @property {string} setup one sentence a child hears
 * @property {string} act the verb of one trial ("tung")
 * @property {Outcome[]} outcomes
 * @property {(rand: () => number) => { outcome: number, face: number[] }} trial
 *   one trial: the outcome and what to draw (a dice face, the two socks)
 */

/** The four socks in the box: a red pair and a blue pair. */
export const SOCKS = /** @type {const} */ (['do', 'do', 'xanh', 'xanh']);

/**
 * Two different socks drawn at random from the four.
 * @param {() => number} rand
 * @returns {[number, number]}
 */
export function drawTwo(rand) {
  const a = Math.min(3, Math.floor(rand() * 4));
  let b = Math.min(2, Math.floor(rand() * 3));
  if (b >= a) b += 1;
  return [a, b];
}

/**
 * A dice roll from 1 to 6.
 * @param {() => number} rand
 */
const roll = (rand) => Math.min(6, Math.floor(rand() * 6) + 1);

/** @type {readonly Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'dong-xu',
    title: 'Tung đồng xu',
    setup: 'Tung một đồng xu và xem mặt nào ở trên.',
    act: 'tung',
    outcomes: [
      { id: 'S', label: 'Mặt sấp', event: 'xuất hiện mặt sấp', color: '#d97706' },
      { id: 'N', label: 'Mặt ngửa', event: 'xuất hiện mặt ngửa', color: '#facc15' },
    ],
    trial: (rand) => {
      const outcome = rand() < 0.5 ? 0 : 1;
      return { outcome, face: [outcome] };
    },
  },
  {
    id: 'chan-le',
    title: 'Gieo xúc xắc: chẵn hay lẻ',
    setup: 'Gieo một xúc xắc và xem số chấm là chẵn hay lẻ.',
    act: 'gieo',
    outcomes: [
      { id: 'chan', label: 'Mặt chẵn', event: 'xuất hiện mặt chẵn', color: '#2563eb' },
      { id: 'le', label: 'Mặt lẻ', event: 'xuất hiện mặt lẻ', color: '#dc2626' },
    ],
    trial: (rand) => {
      const dots = roll(rand);
      return { outcome: dots % 2 === 0 ? 0 : 1, face: [dots] };
    },
  },
  {
    id: 'xuc-xac',
    title: 'Gieo xúc xắc: số chấm',
    setup: 'Gieo một xúc xắc và xem mặt trên có mấy chấm.',
    act: 'gieo',
    outcomes: [1, 2, 3, 4, 5, 6].map((n) => ({
      id: String(n),
      label: `Mặt ${n} chấm`,
      event: `xuất hiện mặt ${n} chấm`,
      color: '#334155',
    })),
    trial: (rand) => {
      const dots = roll(rand);
      return { outcome: dots - 1, face: [dots] };
    },
  },
  {
    id: 'lay-tat',
    title: 'Lấy 2 chiếc tất',
    setup: 'Hộp có một đôi tất đỏ và một đôi tất xanh. Không nhìn, lấy ra 2 chiếc rồi trả lại.',
    act: 'lấy',
    outcomes: [
      {
        id: 'cung',
        label: '2 chiếc cùng màu',
        event: 'lấy được 2 chiếc tất cùng màu',
        color: '#16a34a',
      },
      {
        id: 'khac',
        label: '2 chiếc khác màu',
        event: 'lấy được 2 chiếc tất khác màu',
        color: '#9333ea',
      },
    ],
    trial: (rand) => {
      const [a, b] = drawTwo(rand);
      return { outcome: SOCKS[a] === SOCKS[b] ? 0 : 1, face: [a, b] };
    },
  },
  {
    id: 'vong-quay',
    title: 'Quay vòng quay',
    setup: 'Vòng quay có nửa màu xanh, một phần tư màu vàng, một phần tư màu đỏ.',
    act: 'quay',
    outcomes: [
      { id: 'xanh', label: 'Màu xanh', event: 'mũi tên chỉ vào màu xanh', color: '#2563eb' },
      { id: 'vang', label: 'Màu vàng', event: 'mũi tên chỉ vào màu vàng', color: '#eab308' },
      { id: 'do', label: 'Màu đỏ', event: 'mũi tên chỉ vào màu đỏ', color: '#dc2626' },
    ],
    trial: (rand) => {
      const r = rand();
      // The arrow's angle in degrees, clockwise from 12 o'clock: blue takes the
      // first half of the wheel, yellow the next quarter, red the last.
      const outcome = pickWeighted([2, 1, 1], r);
      return { outcome, face: [Math.floor(r * 360)] };
    },
  },
];

/**
 * Runs `times` trials (fewer when the table would pass `MAX_TRIALS`).
 * @param {Experiment} exp
 * @param {readonly number[]} counts
 * @param {number} times
 * @param {() => number} rand
 * @returns {{ counts: number[], last: { outcome: number, face: number[] } | null }}
 */
export function runTrials(exp, counts, times, rand) {
  const next = [...counts];
  const done = counts.reduce((s, c) => s + c, 0);
  const n = Math.max(0, Math.min(times, MAX_TRIALS - done));
  /** @type {{ outcome: number, face: number[] } | null} */
  let last = null;
  for (let k = 0; k < n; k++) {
    last = exp.trial(rand);
    next[last.outcome] += 1;
  }
  return { counts: next, last };
}

/**
 * The sentence after a trial: what happened last and the ratio of that
 * outcome's count to the trials, the book's way; or how to start.
 * @param {Experiment} exp
 * @param {readonly number[]} counts
 * @param {number | null} last the outcome of the last trial
 */
export function ratioMessage(exp, counts, last) {
  const total = counts.reduce((s, c) => s + c, 0);
  if (total === 0 || last === null) return `Em bấm nút để ${exp.act} lần đầu tiên.`;
  const o = exp.outcomes[last];
  const full = total >= MAX_TRIALS ? ` Bảng đã đủ ${MAX_TRIALS} lần.` : '';
  return `Lần ${total}: ${o.event}. Tỉ số của số lần ${o.event} so với tổng số lần ${exp.act} là ${ratioText(counts[last], total)}.${full}`;
}

/**
 * One sentence per outcome, for a single row: "9 lần trong 20 lần, tỉ số 9/20".
 * @param {number} times
 * @param {number} total
 */
export function rowText(times, total) {
  return total === 0
    ? 'chưa có lần nào'
    : `${times} lần trong ${total} lần, tỉ số ${ratioText(times, total)}`;
}
