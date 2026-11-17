/**
 * Collecting, classifying and sorting data (grade 5): the book's data
 * sequences, the groups each value falls into, sorting a sequence and the
 * live sentences of the classifying board. Pure and DOM-free.
 */
import { formatNumber } from '#lib/core/number-format.js';
import { andList } from '../_shared/stats.js';

/**
 * One group of a data table.
 * @typedef {object} Group
 * @property {string} label the row of the table ("Dưới 2,4 m")
 * @property {string} rule what the group holds, said to the child ("nhỏ hơn 2,4 m")
 * @property {(v: number) => boolean} holds
 */

/**
 * A recorded data sequence and the groups of its table.
 * @typedef {object} Dataset
 * @property {string} id
 * @property {string} title
 * @property {string} short the name on the picker
 * @property {string} unit
 * @property {number[]} values in the order they were recorded
 * @property {Group[]} groups every value is in exactly one
 * @property {string} noun what one value stands for ("bạn", "học viên")
 */

/** @type {readonly Dataset[]} */
export const DATASETS = [
  {
    id: 'hai-long',
    title: 'Mức độ hài lòng của các bạn nữ với chuyến đi cắm trại',
    short: 'Mức độ hài lòng',
    unit: 'điểm',
    noun: 'bạn',
    values: [3, 5, 5, 4, 4, 3, 5, 4, 3, 5, 5, 4, 3, 3, 4, 4, 4],
    groups: [5, 4, 3, 2, 1].map((p) => ({
      label: `${p} điểm`,
      rule: `bằng ${p} điểm`,
      holds: (/** @type {number} */ v) => v === p,
    })),
  },
  {
    id: 'nhay-xa',
    title: 'Thành tích của nhóm học viên lớp nhảy xa',
    short: 'Nhảy xa',
    unit: 'm',
    noun: 'học viên',
    values: [2.45, 3, 3.05, 2.3, 2.75, 2.5, 2.05, 2.2, 3, 2.8],
    groups: [
      { label: 'Dưới 2,4 m', rule: 'nhỏ hơn 2,4 m', holds: (v) => v < 2.4 },
      {
        label: 'Từ 2,4 m đến dưới 2,8 m',
        rule: 'từ 2,4 m trở lên nhưng nhỏ hơn 2,8 m',
        holds: (v) => v >= 2.4 && v < 2.8,
      },
      { label: 'Từ 2,8 m trở lên', rule: 'từ 2,8 m trở lên', holds: (v) => v >= 2.8 },
    ],
  },
  {
    id: 'ban-chan',
    title: 'Độ dài bàn chân các bạn tổ 1',
    short: 'Bàn chân',
    unit: 'cm',
    noun: 'bạn',
    values: [21, 20, 21, 22, 21, 21.5, 20, 21.5],
    groups: [20, 21, 21.5, 22].map((c) => ({
      label: `${formatNumber(c)} cm`,
      rule: `bằng ${formatNumber(c)} cm`,
      holds: (/** @type {number} */ v) => v === c,
    })),
  },
];

/** The three orders the board can show a sequence in. */
export const ORDERS = /** @type {const} */ ({
  ghi: 'Như lúc ghi',
  tang: 'Từ bé đến lớn',
  giam: 'Từ lớn đến bé',
});

/** @typedef {keyof typeof ORDERS} Order */

/**
 * A value with its unit: "2,45 m", "4 điểm".
 * @param {Dataset} ds
 * @param {number} v
 */
export function valueText(ds, v) {
  return `${formatNumber(v)} ${ds.unit}`;
}

/**
 * The index of the group a value falls into.
 * @param {Dataset} ds
 * @param {number} v
 */
export function groupOf(ds, v) {
  return ds.groups.findIndex((g) => g.holds(v));
}

/**
 * Positions of the recorded values in the given order; equal values keep
 * the order they were recorded in.
 * @param {readonly number[]} values
 * @param {Order} order
 * @returns {number[]}
 */
export function orderOf(values, order) {
  const idx = values.map((_, i) => i);
  if (order === 'ghi') return idx;
  const sign = order === 'tang' ? 1 : -1;
  return idx.sort((a, b) => sign * (values[a] - values[b]) || a - b);
}

/**
 * How many values of each group the child has placed.
 * @param {Dataset} ds
 * @param {readonly number[]} placed positions of the placed values
 */
export function groupCounts(ds, placed) {
  const counts = ds.groups.map(() => 0);
  for (const i of placed) counts[groupOf(ds, ds.values[i])] += 1;
  return counts;
}

/**
 * The next value to place: the first one in the shown order not yet placed.
 * @param {readonly number[]} shown positions in the shown order
 * @param {readonly number[]} placed
 * @returns {number | null}
 */
export function nextToPlace(shown, placed) {
  return shown.find((i) => !placed.includes(i)) ?? null;
}

/**
 * What the board says after the child puts value `v` in group `g`.
 * @param {Dataset} ds
 * @param {number} v
 * @param {number} g
 * @returns {{ ok: boolean, text: string }}
 */
export function placeMessage(ds, v, g) {
  const right = groupOf(ds, v);
  if (right === g) {
    return { ok: true, text: `Đúng rồi! ${valueText(ds, v)} thuộc nhóm ${ds.groups[g].label}.` };
  }
  return {
    ok: false,
    text: `Chưa đúng. ${valueText(ds, v)} không thuộc nhóm ${ds.groups[g].label}: nhóm này gồm các số ${ds.groups[g].rule}. Em thử nhóm khác nhé.`,
  };
}

/**
 * The sentence once every value is placed: the total and the largest group.
 * @param {Dataset} ds
 */
export function doneMessage(ds) {
  const counts = groupCounts(
    ds,
    ds.values.map((_, i) => i),
  );
  const max = Math.max(...counts);
  const most = ds.groups.filter((_, i) => counts[i] === max).map((g) => g.label);
  return `Xong! ${ds.values.length} số liệu đã vào bảng. Nhóm ${andList(most)} có nhiều nhất: ${max} ${ds.noun}.`;
}
