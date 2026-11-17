/**
 * Time measures of two units (giờ and phút, phút and giây, ngày and giờ, năm
 * and tháng) and the column working of the book's four operations on them:
 * each unit is worked on by itself, then a small unit that reaches the base
 * is changed into the big one (60 phút = 1 giờ), or a big unit is changed
 * into the small one before a subtraction or a division. Every step is a
 * question with a few options, so a child walks through the working. Pure
 * and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * Two units of time and how many small ones make one big one.
 * @typedef {{ big: string, small: string, base: number }} Pair
 */

/** @type {Record<'gioPhut' | 'phutGiay' | 'ngayGio' | 'namThang', Pair>} */
export const PAIRS = {
  gioPhut: { big: 'giờ', small: 'phút', base: 60 },
  phutGiay: { big: 'phút', small: 'giây', base: 60 },
  ngayGio: { big: 'ngày', small: 'giờ', base: 24 },
  namThang: { big: 'năm', small: 'tháng', base: 12 },
};

/** @typedef {{ big: number, small: number }} Measure */

/**
 * A measure written the book's way: '3 giờ 15 phút', '35 phút' when there is
 * no big unit, '4 giờ' when there is no small one.
 * @param {Measure} m
 * @param {Pair} pair
 */
export function measureText(m, pair) {
  if (m.big === 0) return `${fmt(m.small)} ${pair.small}`;
  if (m.small === 0) return `${fmt(m.big)} ${pair.big}`;
  return `${fmt(m.big)} ${pair.big} ${fmt(m.small)} ${pair.small}`;
}

/**
 * The same measure with the small unit below the base: 5 giờ 80 phút gives
 * 6 giờ 20 phút.
 * @param {Measure} m
 * @param {Pair} pair
 * @returns {Measure}
 */
export function normalize(m, pair) {
  return {
    big: m.big + Math.floor(m.small / pair.base),
    small: m.small % pair.base,
  };
}

/**
 * The measure counted in the small unit only: 2 giờ 15 phút is 135 phút.
 * @param {Measure} m
 * @param {Pair} pair
 */
export const inSmall = (m, pair) => m.big * pair.base + m.small;

/** @typedef {'+' | '−' | '×' | ':'} Op */

/**
 * One question of the working. `answer` indexes `options`; `done` is the
 * sentence the work log gets once it is answered; `cells` fills the result
 * row; `top` replaces the first row after a change of units.
 * @typedef {{
 *   ask: string,
 *   options: string[],
 *   answer: number,
 *   hint: string,
 *   done: string,
 *   cells?: { big?: number, small?: number },
 *   top?: Measure,
 * }} Step
 */

/**
 * A worked operation: `a op b` with `b` a measure for + and −, a number for ×
 * and :, its steps and its result.
 * @typedef {{
 *   pair: Pair,
 *   op: Op,
 *   a: Measure,
 *   b: Measure | number,
 *   steps: Step[],
 *   result: Measure,
 * }} Working
 */

/**
 * Up to four number options in increasing order: the right one and the given
 * slips that are whole, not negative and different.
 * @param {number} right
 * @param {number[]} slips
 * @param {string} unit
 * @returns {{ options: string[], answer: number }}
 */
export function numberChoices(right, slips, unit) {
  const others = [...new Set(slips)].filter((v) => v !== right && v >= 0 && Number.isInteger(v));
  const values = [right, ...others.slice(0, 3)].sort((x, y) => x - y);
  return { options: values.map((v) => `${fmt(v)} ${unit}`), answer: values.indexOf(right) };
}

/**
 * A step that asks for one number.
 * @param {string} ask
 * @param {number} right
 * @param {number[]} slips
 * @param {string} unit
 * @param {string} hint
 * @param {string} done
 * @returns {Step}
 */
function numberStep(ask, right, slips, unit, hint, done) {
  return { ask, ...numberChoices(right, slips, unit), hint, done };
}

/**
 * The step after working each unit, when the small unit may have reached the
 * base: change it into the big unit, or keep it.
 * @param {Measure} raw
 * @param {Pair} pair
 * @returns {Step}
 */
function exchangeStep(raw, pair) {
  const { big, small, base } = pair;
  const result = normalize(raw, pair);
  const rawText = `${fmt(raw.big)} ${big} ${fmt(raw.small)} ${small}`;
  const needed = raw.small >= base;
  return {
    ask: `Được ${rawText}. Số ${small} có cần đổi ra ${big} không?`,
    options: [`Đổi ${small} ra ${big}`, `Giữ nguyên ${fmt(raw.small)} ${small}`],
    answer: needed ? 0 : 1,
    hint: `Em so sánh ${fmt(raw.small)} ${small} với ${base} ${small}: 1 ${big} = ${base} ${small}.`,
    done: needed
      ? `${fmt(raw.small)} ${small} = ${measureText({ big: result.big - raw.big, small: result.small }, pair)}. Vậy ${rawText} = ${measureText(result, pair)}.`
      : `${fmt(raw.small)} ${small} bé hơn ${base} ${small} nên giữ nguyên.`,
    cells: result,
  };
}

/**
 * The working of a + b.
 * @param {Measure} a
 * @param {Measure} b
 * @param {Pair} pair
 * @returns {Working}
 */
export function addWorking(a, b, pair) {
  const { big, small, base } = pair;
  const s = a.small + b.small;
  const h = a.big + b.big;
  const steps = [
    numberStep(
      `Cộng số ${small}: ${a.small} ${small} + ${b.small} ${small} = ?`,
      s,
      [s + 10, s - 10, s >= base ? s - base : s + 1],
      small,
      `Em cộng hai số ${small} như cộng hai số tự nhiên.`,
      `${a.small} ${small} + ${b.small} ${small} = ${s} ${small}.`,
    ),
    numberStep(
      `Cộng số ${big}: ${a.big} ${big} + ${b.big} ${big} = ?`,
      h,
      [h + 1, h - 1, h + 2],
      big,
      `Em cộng hai số ${big}.`,
      `${a.big} ${big} + ${b.big} ${big} = ${h} ${big}.`,
    ),
    exchangeStep({ big: h, small: s }, pair),
  ];
  steps[0].cells = { small: s };
  steps[1].cells = { big: h, small: s };
  return { pair, op: '+', a, b, steps, result: normalize({ big: h, small: s }, pair) };
}

/**
 * The working of a − b, for a not smaller than b.
 * @param {Measure} a
 * @param {Measure} b
 * @param {Pair} pair
 * @returns {Working}
 */
export function subWorking(a, b, pair) {
  const { big, small, base } = pair;
  const borrow = a.small < b.small;
  const top = borrow ? { big: a.big - 1, small: a.small + base } : a;
  const s = top.small - b.small;
  const h = top.big - b.big;
  /** @type {Step} */
  const decide = {
    ask: `Trừ số ${small}: ${a.small} ${small} có trừ được ${b.small} ${small} không?`,
    options: ['Trừ được, em trừ luôn', `Đổi 1 ${big} ra ${base} ${small} rồi mới trừ`],
    answer: borrow ? 1 : 0,
    hint: `Em so sánh ${a.small} ${small} với ${b.small} ${small}.`,
    done: borrow
      ? `${a.small} ${small} bé hơn ${b.small} ${small}. Đổi 1 ${big} = ${base} ${small}: ${measureText(a, pair)} = ${fmt(top.big)} ${big} ${fmt(top.small)} ${small}.`
      : `${a.small} ${small} không bé hơn ${b.small} ${small}, em trừ luôn.`,
  };
  if (borrow) decide.top = top;
  const steps = [
    decide,
    numberStep(
      `Trừ số ${small}: ${top.small} ${small} − ${b.small} ${small} = ?`,
      s,
      [s + 10, s - 10, Math.abs(a.small - b.small)],
      small,
      `Em trừ hai số ${small} như trừ hai số tự nhiên.`,
      `${top.small} ${small} − ${b.small} ${small} = ${s} ${small}.`,
    ),
    numberStep(
      `Trừ số ${big}: ${top.big} ${big} − ${b.big} ${big} = ?`,
      h,
      [h + 1, h - 1, h + 2],
      big,
      borrow ? `Em nhớ: số ${big} đã bớt đi 1 sau khi đổi.` : `Em trừ hai số ${big}.`,
      `${top.big} ${big} − ${b.big} ${big} = ${h} ${big}.`,
    ),
  ];
  steps[1].cells = { small: s };
  steps[2].cells = { big: h, small: s };
  return { pair, op: '−', a, b, steps, result: { big: h, small: s } };
}

/**
 * The working of a × n.
 * @param {Measure} a
 * @param {number} n
 * @param {Pair} pair
 * @returns {Working}
 */
export function mulWorking(a, n, pair) {
  const { big, small } = pair;
  const s = a.small * n;
  const h = a.big * n;
  const steps = [
    numberStep(
      `Nhân số ${small}: ${a.small} ${small} × ${n} = ?`,
      s,
      [s + n, s - n, a.small + n],
      small,
      `Em nhân ${a.small} với ${n} như nhân hai số tự nhiên.`,
      `${a.small} ${small} × ${n} = ${s} ${small}.`,
    ),
    numberStep(
      `Nhân số ${big}: ${a.big} ${big} × ${n} = ?`,
      h,
      [h + 1, h - 1, a.big + n],
      big,
      `Em nhân ${a.big} với ${n}.`,
      `${a.big} ${big} × ${n} = ${h} ${big}.`,
    ),
    exchangeStep({ big: h, small: s }, pair),
  ];
  steps[0].cells = { small: s };
  steps[1].cells = { big: h, small: s };
  return { pair, op: '×', a, b: n, steps, result: normalize({ big: h, small: s }, pair) };
}

/**
 * The words of a division of the big unit: '1 giờ, dư 3 giờ'.
 * @param {number} q
 * @param {number} r
 * @param {string} unit
 */
const quotientText = (q, r, unit) =>
  r === 0 ? `${q} ${unit}, không dư` : `${q} ${unit}, dư ${r} ${unit}`;

/**
 * The working of a : n, when n divides the whole measure exactly.
 * @param {Measure} a
 * @param {number} n
 * @param {Pair} pair
 * @returns {Working}
 */
export function divWorking(a, n, pair) {
  const { big, small, base } = pair;
  if (inSmall(a, pair) % n !== 0) throw new Error('the division must come out exactly');
  const q = Math.floor(a.big / n);
  const r = a.big % n;
  /** @type {[number, number][]} */
  const wrong = [
    [q, 0],
    [q - 1, r + n],
    [q + 1, 0],
  ];
  const labels = [
    quotientText(q, r, big),
    ...wrong.filter(([x]) => x >= 0).map(([x, y]) => quotientText(x, y, big)),
  ];
  const options = [...new Set(labels)].slice(0, 3);
  /** @type {Step[]} */
  const steps = [
    {
      ask: `Chia số ${big}: ${a.big} ${big} : ${n} = ?`,
      options,
      answer: 0,
      hint: `Em tìm số lớn nhất nhân với ${n} mà không vượt quá ${a.big}; số dư phải bé hơn ${n}.`,
      done: `${a.big} ${big} : ${n} = ${quotientText(q, r, big)}.`,
      cells: { big: q },
    },
  ];
  const carried = r * base;
  const total = carried + a.small;
  if (r > 0) {
    steps.push(
      numberStep(
        `Đổi ${r} ${big} ra ${small}: ${r} ${big} = ?`,
        carried,
        [r * 10, r * 100, carried + base],
        small,
        `1 ${big} = ${base} ${small}, em tính ${r} × ${base}.`,
        `${r} ${big} = ${carried} ${small}.`,
      ),
    );
    if (a.small > 0) {
      steps.push(
        numberStep(
          `Cộng thêm ${a.small} ${small}: ${carried} ${small} + ${a.small} ${small} = ?`,
          total,
          [total + 10, total - 10, carried],
          small,
          `Em cộng ${carried} với ${a.small}.`,
          `${carried} ${small} + ${a.small} ${small} = ${total} ${small}.`,
        ),
      );
    }
  }
  const s = total / n;
  steps.push(
    numberStep(
      `Chia số ${small}: ${total} ${small} : ${n} = ?`,
      s,
      [s + 1, s - 1, s + 10, Math.floor(a.small / n)],
      small,
      `Em chia ${total} cho ${n}.`,
      `${total} ${small} : ${n} = ${s} ${small}.`,
    ),
  );
  steps[steps.length - 1].cells = { big: q, small: s };
  // The options were listed with the right one first; show them in a fixed
  // increasing order instead, so the place does not give it away.
  const first = steps[0];
  const order = first.options
    .map((_, i) => i)
    .sort((x, y) => {
      const nx = Number(first.options[x].split(' ')[0]);
      const ny = Number(first.options[y].split(' ')[0]);
      return nx - ny || first.options[x].localeCompare(first.options[y]);
    });
  steps[0] = {
    ...first,
    options: order.map((i) => first.options[i]),
    answer: order.indexOf(0),
  };
  return { pair, op: ':', a, b: n, steps, result: { big: q, small: s } };
}

/**
 * The whole operation as a sentence: '3 giờ 15 phút × 5 = 16 giờ 15 phút'.
 * @param {Working} w
 */
export function workingText(w) {
  const b = typeof w.b === 'number' ? fmt(w.b) : measureText(w.b, w.pair);
  return `${measureText(w.a, w.pair)} ${w.op} ${b} = ${measureText(w.result, w.pair)}`;
}

/**
 * What a screen reader hears for the operation while it is being worked.
 * @param {Working} w
 */
export function questionText(w) {
  const b = typeof w.b === 'number' ? fmt(w.b) : measureText(w.b, w.pair);
  const words = { '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' };
  return `Phép tính ${measureText(w.a, w.pair)} ${words[w.op]} ${b}`;
}
