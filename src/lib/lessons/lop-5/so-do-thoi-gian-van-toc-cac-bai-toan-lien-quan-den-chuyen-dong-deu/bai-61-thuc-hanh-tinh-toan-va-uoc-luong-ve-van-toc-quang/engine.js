/**
 * A pretend stopwatch for the practice lesson on steady motion. A child runs
 * or walks a stretch at a speed the learner does not see; the learner starts
 * the stopwatch, stops it when the child crosses the line, then works out a
 * result from the time read: the speed v = s : t when the stretch is known,
 * or the length of a lap s = v × t when the speed is known. Times are read to
 * a tenth of a second and speeds rounded to a tenth, as in the book. Pure and
 * DOM-free.
 */
import { formatFixed, formatNumber, tidy } from '#lib/core/number-format.js';

/** @typedef {'van-toc' | 'quang-duong'} Mode */

/**
 * One run: who, what they do, the stretch `s` in metres and the true speed
 * `v` in m/giây. In 'van-toc' mode the learner knows `s` and finds `v`; in
 * 'quang-duong' mode the learner knows `v` and finds `s`, the lap.
 * @typedef {{ who: string, doing: string, s: number, v: number }} Run
 */

/** @type {Record<Mode, readonly Run[]>} */
export const RUNS = {
  'van-toc': [
    { who: 'An', doing: 'chạy 50 m', s: 50, v: 5 },
    { who: 'Bình', doing: 'chạy 60 m', s: 60, v: 4.8 },
    { who: 'Dũng', doing: 'đi bộ 14 m', s: 14, v: 1.4 },
    { who: 'Chi', doing: 'chạy 100 m', s: 100, v: 8 },
  ],
  'quang-duong': [
    { who: 'Lan', doing: 'chạy một vòng sân trường', s: 84, v: 6 },
    { who: 'Minh', doing: 'chạy một vòng sân bóng', s: 90, v: 7.5 },
    { who: 'Hà', doing: 'đi bộ một vòng vườn trường', s: 18, v: 1.5 },
  ],
};

/** After this many seconds past the line the stopwatch stops by itself. */
export const LATE_STOP = 3;

/**
 * The time the run really takes, in seconds.
 * @param {Run} run
 */
export const trueTime = (run) => tidy(run.s / run.v);

/**
 * A stopwatch time read to a tenth of a second.
 * @param {number} seconds
 */
export const readTime = (seconds) => tidy(Math.round(seconds * 10) / 10);

/**
 * A value rounded to a tenth.
 * @param {number} x
 */
const tenth = (x) => tidy(Math.round(x * 10) / 10);

/**
 * The result the learner works out from the time read: the speed, rounded to
 * a tenth of a metre per second, or the lap in metres.
 * @param {Mode} mode
 * @param {Run} run
 * @param {number} t the time read, in seconds
 */
export function resultFrom(mode, run, t) {
  return mode === 'van-toc' ? tenth(run.s / t) : tidy(run.v * t, 2);
}

/** @param {Mode} mode */
export const unitOf = (mode) => (mode === 'van-toc' ? 'm/giây' : 'm');

/**
 * The working of the result: 'v = s : t = 50 : 10,2 ≈ 4,9 (m/giây)'.
 * @param {Mode} mode
 * @param {Run} run
 * @param {number} t
 */
export function workText(mode, run, t) {
  const r = formatNumber(resultFrom(mode, run, t));
  if (mode === 'van-toc') {
    const exact = tidy(run.s / t, 6) === resultFrom(mode, run, t);
    return `v = s : t = ${formatNumber(run.s)} : ${formatNumber(t)} ${exact ? '=' : '≈'} ${r} (m/giây)`;
  }
  return `s = v × t = ${formatNumber(run.v)} × ${formatNumber(t)} = ${r} (m)`;
}

/**
 * Four options for the result, in increasing order: the right one and the
 * slips a child makes (the wrong rule, a slip of one place).
 * @param {Mode} mode
 * @param {Run} run
 * @param {number} t
 * @returns {{ options: string[], answer: number }}
 */
export function resultOptions(mode, run, t) {
  const right = resultFrom(mode, run, t);
  const slips =
    mode === 'van-toc'
      ? [tenth(t / run.s), tidy(right * 10), tenth(right + 1), tenth(right - 1), tenth(right + 2)]
      : [tidy(run.v + t, 2), tenth(t / run.v), tidy(right * 10, 2), tidy(right + 10, 2)];
  const values = [right];
  for (const x of slips) {
    if (values.length < 4 && x > 0 && !values.includes(x)) values.push(x);
  }
  values.sort((a, b) => a - b);
  const unit = unitOf(mode);
  return {
    options: values.map((x) => `${formatNumber(x)} ${unit}`),
    answer: values.indexOf(right),
  };
}

/**
 * How well the stopwatch was stopped.
 * @param {Run} run
 * @param {number} t the time read
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function timingNote(run, t) {
  const real = trueTime(run);
  const off = tidy(t - real, 1);
  const read = `Đồng hồ chỉ ${formatFixed(t, 1)} giây.`;
  if (Math.abs(off) <= 0.2) {
    return { tone: 'ok', text: `${read} Em bấm dừng rất đúng lúc!` };
  }
  const when = off < 0 ? 'sớm' : 'muộn';
  const advice =
    Math.abs(off) > 1
      ? 'Lệch nhiều quá, em nên bấm lại để đo chuẩn hơn.'
      : 'Kết quả vẫn dùng được, nhưng sẽ là số gần đúng.';
  return {
    tone: 'warn',
    text: `${read} Em bấm dừng ${when}, lệch khoảng ${formatNumber(Math.abs(off))} giây. ${advice}`,
  };
}

/**
 * The line after the learner picks the result: compares it with the truth.
 * @param {Mode} mode
 * @param {Run} run
 * @param {number} t
 */
export function compareText(mode, run, t) {
  const got = resultFrom(mode, run, t);
  const truth = mode === 'van-toc' ? run.v : run.s;
  const unit = unitOf(mode);
  const what = mode === 'van-toc' ? `Vận tốc thật của ${run.who}` : 'Một vòng thật dài';
  const close = Math.abs(got - truth) <= truth * 0.05;
  return `${what}${mode === 'van-toc' ? ' là' : ''} ${formatNumber(truth)} ${unit}. Em tính được khoảng ${formatNumber(got)} ${unit}${close ? ': rất gần!' : '. Bấm giờ chuẩn hơn thì kết quả sẽ gần hơn.'}`;
}

/**
 * The task line above the track.
 * @param {Mode} mode
 * @param {Run} run
 */
export function taskText(mode, run) {
  return mode === 'van-toc'
    ? `${run.who} ${run.doing}. Em bấm giờ rồi tính vận tốc của ${run.who}.`
    : `${run.who} ${run.doing} với vận tốc ${formatNumber(run.v)} m/giây. Em bấm giờ rồi ước lượng độ dài một vòng.`;
}
