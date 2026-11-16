/**
 * Column charts (biểu đồ cột) of grade 4: the book's charts with their data
 * tables, drawing the missing columns from the table, and the questions a
 * child answers by reading a chart. Pure and DOM-free.
 */
import { int } from '#lib/core/drill.js';
import { mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/**
 * @typedef {object} Chart
 * @property {string} id
 * @property {string} title the chart's name
 * @property {string} head the header of the name row of its table ("Ngày")
 * @property {string} unit the value axis title ("Số học sinh")
 * @property {string} noun what one unit is ("học sinh")
 * @property {string[]} labels the columns' names
 * @property {number[]} values the columns' values
 * @property {number} step how far one key press moves a column
 * @property {number} max the top of the value axis
 * @property {number[]} given the columns already drawn when the task starts
 * @property {string} [per] what one column stands for in "trung bình mỗi …"
 *   ("ngày"); without it the chart gets no average question
 */

/** @type {readonly Chart[]} */
export const CHARTS = [
  {
    id: 'the-thao',
    title: 'Môn thể thao yêu thích của nhóm Mai',
    head: 'Môn thể thao',
    unit: 'Số bạn',
    noun: 'bạn',
    labels: ['Bóng đá', 'Bóng rổ', 'Bơi'],
    values: [4, 6, 2],
    step: 1,
    max: 8,
    given: [0],
  },
  {
    id: 'muon-sach',
    title: 'Số học sinh đến thư viện mượn sách',
    head: 'Ngày',
    unit: 'Số học sinh',
    noun: 'học sinh',
    labels: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
    values: [35, 50, 50, 70, 115],
    step: 5,
    max: 120,
    given: [0, 1],
    per: 'ngày',
  },
  {
    id: 'ngay-mua',
    title: 'Số ngày có mưa trong ba tháng đầu năm',
    head: 'Tháng',
    unit: 'Số ngày',
    noun: 'ngày mưa',
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    values: [20, 25, 15],
    step: 5,
    max: 30,
    given: [],
    per: 'tháng',
  },
  {
    id: 'gop-sach',
    title: 'Số cuốn sách khối Bốn góp cho thư viện',
    head: 'Lớp',
    unit: 'Số cuốn sách',
    noun: 'cuốn sách',
    labels: ['4A', '4B', '4C', '4D', '4E'],
    values: [60, 52, 80, 68, 40],
    step: 4,
    max: 100,
    given: [0, 2],
    per: 'lớp',
  },
];

/**
 * The columns at the start of the drawing task: the given ones at their
 * values, the others at 0.
 * @param {Chart} chart
 * @returns {Array<{ label: string, value: number }>}
 */
export function startBars(chart) {
  return chart.labels.map((label, i) => ({
    label,
    value: chart.given.includes(i) ? chart.values[i] : 0,
  }));
}

/**
 * Which columns match the table.
 * @param {Chart} chart
 * @param {ReadonlyArray<{ value: number }>} bars
 */
export function rightBars(chart, bars) {
  return chart.values.map((v, i) => bars[i]?.value === v);
}

/**
 * The live sentence while the child draws the columns.
 * @param {Chart} chart
 * @param {ReadonlyArray<{ value: number }>} bars
 */
export function drawMessage(chart, bars) {
  const right = rightBars(chart, bars);
  const left = right.filter((r) => !r).length;
  if (left === 0) {
    return 'Đúng rồi! Biểu đồ đã đủ các cột. Mỗi cột cao đúng bằng số trong bảng.';
  }
  const i = right.indexOf(false);
  const now = bars[i]?.value ?? 0;
  const want = chart.values[i];
  const way = now < want ? 'kéo cột cao lên' : 'kéo cột thấp xuống';
  return `Còn ${left} cột chưa đúng. Cột ${chart.labels[i]} đang ở ${fmt(now)}, cần ${fmt(want)}: em ${way}.`;
}

/**
 * The labels with the largest and with the smallest value.
 * @param {Chart} chart
 */
export function chartExtremes(chart) {
  const max = Math.max(...chart.values);
  const min = Math.min(...chart.values);
  return {
    max,
    min,
    most: chart.labels.filter((_, i) => chart.values[i] === max),
    least: chart.labels.filter((_, i) => chart.values[i] === min),
  };
}

/**
 * The sum and, when it is a whole number, the average of the columns.
 * @param {Chart} chart
 */
export function chartTotals(chart) {
  const total = chart.values.reduce((s, v) => s + v, 0);
  const n = chart.values.length;
  return { total, n, average: total % n === 0 ? total / n : null };
}

/**
 * Number options around `right`, at the chart's own step.
 * @param {number} right
 * @param {number[]} slips
 * @param {number} step
 */
function valueOptions(right, slips, step) {
  return slipOptions(right, slips, { near: [step, -step, 2 * step, -2 * step], min: 0 });
}

/**
 * The questions on a finished chart: one column's value, the largest and the
 * smallest column, the difference between them, and the average.
 * @param {Chart} chart
 * @param {() => number} rand
 * @returns {import('#lib/core/kid/quiz.js').KidQuestion[]}
 */
export function chartQuestions(chart, rand) {
  const { labels, values, noun, step } = chart;
  const i = int(rand, 0, labels.length - 1);
  const { max, min, most, least } = chartExtremes(chart);
  const { total, n, average } = chartTotals(chart);
  const sum = values.map(fmt).join(' + ');
  /** @type {import('#lib/core/kid/quiz.js').KidQuestion[]} */
  const questions = [
    {
      prompt: `Cột ${labels[i]} biểu diễn bao nhiêu ${noun}?`,
      ...valueOptions(values[i], [], step),
      hint: `Em nhìn số ghi ở đỉnh cột ${labels[i]}, hoặc dóng đỉnh cột sang trục bên trái.`,
      solution: `Đỉnh cột ${labels[i]} ghi ${fmt(values[i])}. Cột đó biểu diễn ${fmt(values[i])} ${noun}.`,
    },
    {
      prompt: 'Cột nào cao nhất?',
      ...mixOptions(
        rand,
        most[0],
        labels.filter((l) => !most.includes(l)),
      ),
      hint: 'Cột cao hơn biểu diễn số lớn hơn. Em tìm cột cao nhất.',
      solution: `Cột ${most[0]} cao nhất, biểu diễn ${fmt(max)} ${noun}.`,
    },
    {
      prompt: 'Cột nào thấp nhất?',
      ...mixOptions(
        rand,
        least[0],
        labels.filter((l) => !least.includes(l)),
      ),
      hint: 'Cột thấp hơn biểu diễn số bé hơn. Em tìm cột thấp nhất.',
      solution: `Cột ${least[0]} thấp nhất, biểu diễn ${fmt(min)} ${noun}.`,
    },
    {
      prompt: `Cột cao nhất biểu diễn nhiều hơn cột thấp nhất bao nhiêu ${noun}?`,
      ...valueOptions(max - min, [max + min, max, min], step),
      hint: 'Muốn biết nhiều hơn bao nhiêu, em lấy số lớn trừ số bé.',
      solution: `${fmt(max)} − ${fmt(min)} = ${fmt(max - min)} (${noun}).`,
    },
  ];
  if (average !== null && chart.per) {
    questions.push({
      prompt: `Trung bình mỗi ${chart.per} có bao nhiêu ${noun}?`,
      ...valueOptions(average, [total, average + 1, average - 1], step),
      hint: `Em cộng các số trên ${n} cột rồi chia cho ${n}.`,
      solution: `(${sum}) : ${n} = ${fmt(total)} : ${n} = ${fmt(average)} (${noun}).`,
    });
  }
  return questions;
}
