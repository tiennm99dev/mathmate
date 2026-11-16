/**
 * Chance experiments of grade 4 (tung đồng xu, lấy bóng, lấy bút, gieo xúc
 * xắc): the events that can happen, one trial drawn from a random number, the
 * tally of how many times each event occurred, and how that tally is read.
 * Pure and DOM-free.
 */
import { pickWeighted } from '#lib/stats-engine/probability.js';

/**
 * @typedef {object} Outcome
 * @property {string} id
 * @property {string} label the event's short name in the tally table ("Mặt sấp")
 * @property {string} event the event as a sentence part ("mặt sấp")
 * @property {string} color fill of its picture
 * @property {number} weight how many equally likely ways give it
 */

/**
 * @typedef {object} Experiment
 * @property {string} id
 * @property {string} title the button and heading
 * @property {string} setup what is in the hand or the box
 * @property {string} act what one trial is called, after "Đã": "tung"
 * @property {string} once the button of a single trial
 * @property {Outcome[]} outcomes
 */

/** @type {readonly Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'dong-xu',
    title: 'Tung đồng xu',
    setup: 'Tung một đồng xu và xem mặt nào ở trên: mặt sấp (S) hay mặt ngửa (N).',
    act: 'tung',
    once: 'Tung 1 lần',
    outcomes: [
      { id: 'S', label: 'Mặt sấp', event: 'mặt sấp', color: '#f59e0b', weight: 1 },
      { id: 'N', label: 'Mặt ngửa', event: 'mặt ngửa', color: '#eab308', weight: 1 },
    ],
  },
  {
    id: 'hop-bong',
    title: 'Lấy bóng trong hộp',
    setup:
      'Hộp có 3 quả bóng xanh và 1 quả bóng vàng. Lấy ra 1 quả, xem màu, rồi trả bóng lại hộp.',
    act: 'lấy',
    once: 'Lấy 1 lần',
    outcomes: [
      { id: 'xanh', label: 'Bóng xanh', event: 'lấy được bóng xanh', color: '#2563eb', weight: 3 },
      { id: 'vang', label: 'Bóng vàng', event: 'lấy được bóng vàng', color: '#eab308', weight: 1 },
    ],
  },
  {
    id: 'lay-but',
    title: 'Lấy 2 chiếc bút',
    setup:
      'Túi có 2 chiếc bút xanh và 1 chiếc bút vàng. Lấy ra 2 chiếc, xem màu, rồi trả bút lại túi.',
    act: 'lấy',
    once: 'Lấy 1 lần',
    outcomes: [
      {
        id: 'cung-mau',
        label: '2 bút xanh',
        event: 'lấy được 2 bút cùng màu xanh',
        color: '#2563eb',
        weight: 1,
      },
      {
        id: 'khac-mau',
        label: '1 xanh, 1 vàng',
        event: 'lấy được 2 bút khác màu',
        color: '#16a34a',
        weight: 2,
      },
    ],
  },
  {
    id: 'xuc-xac',
    title: 'Gieo xúc xắc',
    setup: 'Gieo một xúc xắc và xem số chấm ở mặt trên.',
    act: 'gieo',
    once: 'Gieo 1 lần',
    outcomes: [1, 2, 3, 4, 5, 6].map((n) => ({
      id: String(n),
      label: `${n} chấm`,
      event: `mặt ${n} chấm`,
      color: '#dc2626',
      weight: 1,
    })),
  },
];

/** The most trials one table holds, so the tally stays readable. */
export const MAX_TRIALS = 60;

/**
 * The outcome index of one trial for a uniform random number `r` in [0, 1).
 * @param {Experiment} exp
 * @param {number} r
 */
export function trial(exp, r) {
  return pickWeighted(
    exp.outcomes.map((o) => o.weight),
    r,
  );
}

/**
 * The counts after `times` more trials, never past `MAX_TRIALS` in all.
 * @param {Experiment} exp
 * @param {readonly number[]} counts
 * @param {number} times
 * @param {() => number} rand
 * @returns {{ counts: number[], last: number | null }}
 */
export function runTrials(exp, counts, times, rand) {
  const next = exp.outcomes.map((_, i) => counts[i] ?? 0);
  const done = next.reduce((s, c) => s + c, 0);
  const room = Math.max(0, Math.min(times, MAX_TRIALS - done));
  let last = null;
  for (let k = 0; k < room; k++) {
    last = trial(exp, rand());
    next[last] += 1;
  }
  return { counts: next, last };
}

/**
 * The events that can happen, as one sentence: 'mặt sấp hoặc mặt ngửa'.
 * @param {Experiment} exp
 */
export function eventsText(exp) {
  const names = exp.outcomes.map((o) => o.event);
  return names.length === 1
    ? names[0]
    : `${names.slice(0, -1).join(', ')} hoặc ${names[names.length - 1]}`;
}

/**
 * How the tally reads: how many trials, how many times each event occurred,
 * and which occurred most.
 * @param {Experiment} exp
 * @param {readonly number[]} counts
 */
export function tallyText(exp, counts) {
  const total = counts.reduce((s, c) => s + c, 0);
  if (total === 0) return `Chưa ${exp.act} lần nào. Có thể xảy ra: ${eventsText(exp)}.`;
  const parts = exp.outcomes.map((o, i) => `${o.event} ${counts[i]} lần`).join(', ');
  const max = Math.max(...counts);
  const top = exp.outcomes.filter((_, i) => counts[i] === max).map((o) => o.event);
  const most =
    top.length === exp.outcomes.length
      ? 'Các sự kiện xuất hiện số lần bằng nhau.'
      : top.length === 1
        ? `Sự kiện ${top[0]} xuất hiện nhiều lần ${exp.outcomes.length === 2 ? 'hơn' : 'nhất'}.`
        : `Các sự kiện ${top.join(', ')} xuất hiện nhiều lần nhất.`;
  return `Đã ${exp.act} ${total} lần. Số lần xuất hiện: ${parts}. ${most}`;
}
