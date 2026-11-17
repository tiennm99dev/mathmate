/**
 * Estimate, then measure: familiar things shaped like a box, each with its
 * real size, three estimates of its volume ten times apart, and the words
 * the widget says while the child measures each edge and compares the
 * volume with the estimate. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { boxVolume } from '../_shared/measures.js';

/**
 * @typedef {object} Thing
 * @property {string} id
 * @property {string} name what it is, at the start of a sentence
 * @property {string} short its name on the picker
 * @property {'cm' | 'dm' | 'm'} unit what its edges are measured in
 * @property {[number, number, number]} size length, width, height
 * @property {number[]} estimates three volumes to pick from, ten times apart
 */

/** @type {Thing[]} */
export const THINGS = [
  {
    id: 'hop-but',
    name: 'Hộp bút',
    short: 'Hộp bút',
    unit: 'cm',
    size: [20, 8, 4],
    estimates: [60, 600, 6000],
  },
  {
    id: 'hop-sua',
    name: 'Hộp sữa 1 l',
    short: 'Hộp sữa',
    unit: 'cm',
    size: [10, 6, 17],
    estimates: [100, 1000, 10000],
  },
  {
    id: 'hop-giay',
    name: 'Hộp giày',
    short: 'Hộp giày',
    unit: 'cm',
    size: [30, 18, 10],
    estimates: [500, 5000, 50000],
  },
  {
    id: 'be-ca',
    name: 'Bể cá',
    short: 'Bể cá',
    unit: 'cm',
    size: [60, 30, 40],
    estimates: [700, 7000, 70000],
  },
  {
    id: 'thung',
    name: 'Thùng các-tông',
    short: 'Thùng',
    unit: 'dm',
    size: [6, 4, 4],
    estimates: [10, 100, 1000],
  },
  {
    id: 'phong-hoc',
    name: 'Phòng học',
    short: 'Phòng học',
    unit: 'm',
    size: [8, 6, 4],
    estimates: [20, 200, 2000],
  },
];

/**
 * The volume unit that goes with a length unit.
 * @param {Thing} thing
 */
export const cubed = (thing) => `${thing.unit}³`;

/**
 * The volume of a thing and how it is worked out: '20 × 8 × 4 = 640'.
 * @param {Thing} thing
 */
export function volumeOf(thing) {
  const [a, b, c] = thing.size;
  const v = boxVolume(a, b, c);
  return { volume: v.volume, step: v.steps.volume };
}

/**
 * The index of the value closest to `v`, measured by how many times bigger
 * or smaller it is, since the estimates are ten times apart.
 * @param {number[]} values
 * @param {number} v
 */
export function closestIndex(values, v) {
  let best = 0;
  values.forEach((x, i) => {
    if (Math.abs(Math.log(x / v)) < Math.abs(Math.log(values[best] / v))) best = i;
  });
  return best;
}

/**
 * The largest a ruler goes for a thing: a little past its longest edge.
 * @param {Thing} thing
 */
export function rulerMax(thing) {
  const longest = Math.max(...thing.size);
  const step = longest <= 12 ? 2 : longest <= 40 ? 5 : 10;
  return Math.ceil((longest * 1.3) / step) * step;
}

/**
 * What the child sees about one ruler: right at the end of the edge, short
 * of it or past it.
 * @param {number} measured
 * @param {number} want
 * @returns {'fit' | 'short' | 'long' | 'none'}
 */
export function rulerState(measured, want) {
  if (measured <= 0) return 'none';
  if (measured === want) return 'fit';
  return measured < want ? 'short' : 'long';
}

/**
 * The live line under the widget.
 * @param {Thing} thing
 * @param {number | null} estimate index of the estimate picked, or null
 * @param {number[]} measured the three rulers' lengths
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function noteFor(thing, estimate, measured) {
  const unit = thing.unit;
  if (estimate === null) {
    return {
      tone: 'info',
      text: `Em nhìn ${thing.name.toLowerCase()} và chọn thể tích em đoán trước nhé.`,
    };
  }
  const states = thing.size.map((want, i) => rulerState(measured[i], want));
  const names = ['chiều dài', 'chiều rộng', 'chiều cao'];
  const todo = states.findIndex((s) => s !== 'fit');
  if (todo >= 0) {
    const s = states[todo];
    const name = names[todo];
    if (s === 'none') {
      return { tone: 'info', text: `Em kéo thước để đo ${name} của ${thing.name.toLowerCase()}.` };
    }
    return {
      tone: 'warn',
      text:
        s === 'short'
          ? `Thước ${fmt(measured[todo])} ${unit} còn ngắn hơn ${name}. Em kéo dài thêm.`
          : `Thước ${fmt(measured[todo])} ${unit} dài quá ${name} rồi. Em kéo ngắn lại.`,
    };
  }
  const { volume, step } = volumeOf(thing);
  const best = closestIndex(thing.estimates, volume);
  const real = `Thể tích ${thing.name.toLowerCase()} là ${step} (${cubed(thing)}).`;
  if (estimate === best) {
    return {
      tone: 'ok',
      text: `${real} Em ước lượng ${fmt(thing.estimates[estimate])} ${cubed(thing)} là rất gần. Giỏi lắm!`,
    };
  }
  const way = estimate < best ? 'nhỏ' : 'lớn';
  return {
    tone: 'warn',
    text: `${real} Em ước lượng ${fmt(thing.estimates[estimate])} ${cubed(thing)} là ${way} quá. Gần nhất là ${fmt(thing.estimates[best])} ${cubed(thing)}.`,
  };
}
