/**
 * The mixed practice of the chapter "Làm quen với yếu tố thống kê, xác suất":
 * reading and sorting a data sequence, counting the numbers above a value,
 * the average of a sequence, reading a column chart, reading a tally and the
 * events that can happen. One question of each part in a shuffled order.
 * Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions, numberOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { tallyWords } from '#lib/core/kid/tally.js';
import { fmt } from '#lib/core/number-format.js';
import { listText, sortedValues, swapCards } from '../_shared/sequence.js';

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'doc-day': 'Đọc dãy số liệu',
  'sap-xep': 'Sắp xếp dãy số liệu',
  'nhieu-hon': 'Đếm số liệu lớn hơn một số',
  'trung-binh': 'Số trung bình cộng của dãy',
  'bieu-do': 'Đọc biểu đồ cột',
  'cot-cao': 'So sánh các cột',
  'kiem-dem': 'Đọc bảng kiểm đếm',
  'su-kien': 'Sự kiện có thể xảy ra',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * What a question shows above its options.
 * @typedef {{ type: 'seq', title: string, values: number[], unit: string }
 *   | { type: 'chart', title: string, unit: string, data: Array<{ label: string, value: number }> }
 *   | { type: 'tally', title: string, rows: Array<{ label: string, count: number }> }} Visual
 */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** Stories for a sequence of small counts. */
const SMALL = /** @type {const} */ ([
  { title: 'Số chậu cây Mai và Mi làm mỗi ngày', unit: 'chậu cây', per: 'ngày' },
  { title: 'Số câu đố mỗi bạn giải được', unit: 'câu đố', per: 'bạn' },
  { title: 'Số quả dâu tây Việt hái mỗi ngày', unit: 'quả', per: 'ngày' },
  { title: 'Số cuốn sách mỗi bạn đọc trong tháng', unit: 'cuốn sách', per: 'bạn' },
]);

/** Stories for a column chart: the columns and what one unit is. */
const CHARTS = /** @type {const} */ ([
  {
    title: 'Số câu đố mỗi bạn giải được',
    unit: 'Số câu đố',
    noun: 'câu đố',
    labels: ['Nam', 'Việt', 'Mai', 'Hà', 'Lan', 'Rô-bốt'],
    step: 1,
    top: 12,
  },
  {
    title: 'Số học sinh mượn sách mỗi ngày',
    unit: 'Số học sinh',
    noun: 'học sinh',
    labels: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
    step: 5,
    top: 120,
  },
  {
    title: 'Số cây mỗi lớp trồng được',
    unit: 'Số cây',
    noun: 'cây',
    labels: ['4A', '4B', '4C', '4D'],
    step: 4,
    top: 80,
  },
]);

/** Experiments whose tally a question reads. */
const TALLIES = /** @type {const} */ ([
  { title: 'Tung đồng xu', labels: ['Mặt sấp', 'Mặt ngửa'], act: 'tung' },
  { title: 'Lấy bóng trong hộp', labels: ['Bóng xanh', 'Bóng vàng'], act: 'lấy' },
  {
    title: 'Quay vòng quay',
    labels: ['Dừng ở màu đỏ', 'Dừng ở màu vàng', 'Dừng ở màu xanh'],
    act: 'quay',
  },
]);

/** Colours of the things in a box, for the events question. */
const COLORS = /** @type {const} */ (['đỏ', 'xanh', 'vàng', 'tím', 'trắng']);
const THINGS = /** @type {const} */ ([
  { box: 'Hộp', thing: 'quả bóng', verb: 'Lấy' },
  { box: 'Túi', thing: 'viên bi', verb: 'Lấy' },
  { box: 'Hộp', thing: 'chiếc bút', verb: 'Lấy' },
]);

/**
 * `n` different whole numbers from `lo` to `hi`, in a random order.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} lo
 * @param {number} hi
 */
function distinctValues(rand, n, lo, hi) {
  const all = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  return shuffle(rand, all).slice(0, n);
}

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  'doc-day': (rand) => {
    const story = pick(rand, SMALL);
    const n = int(rand, 5, 8);
    const values = Array.from({ length: n }, () => int(rand, 2, 15));
    const k = int(rand, 2, n);
    const right = values[k - 1];
    const wrong = [...new Set([...values, right + 1, right - 1])].filter(
      (v) => v !== right && v >= 0,
    );
    return {
      kind: 'doc-day',
      prompt: `Số thứ ${k} trong dãy số liệu là số nào?`,
      ...mixOptions(rand, fmt(right), shuffle(rand, wrong).slice(0, 3).map(fmt)),
      hint: `Em đếm từ trái sang phải đến số thứ ${k}.`,
      solution: `Dãy ${listText(values)} có số thứ ${k} là ${fmt(right)}.`,
      visual: { type: 'seq', title: story.title, values, unit: story.unit },
    };
  },
  'sap-xep': (rand) => {
    const story = pick(rand, SMALL);
    const values = distinctValues(rand, 5, 1, 20);
    const dir = rand() < 0.5 ? 'tang' : 'giam';
    const right = sortedValues(values, dir);
    const reverse = sortedValues(values, dir === 'tang' ? 'giam' : 'tang');
    const slip = swapCards(right, 1, 2);
    const words = dir === 'tang' ? 'từ bé đến lớn' : 'từ lớn đến bé';
    return {
      kind: 'sap-xep',
      prompt: `Dãy nào là dãy số liệu trên xếp theo thứ tự ${words}?`,
      ...mixOptions(rand, listText(right), [listText(reverse), listText(slip), listText(values)]),
      hint:
        dir === 'tang'
          ? 'Số bé nhất đứng đầu, rồi đến số lớn hơn, số lớn nhất đứng cuối.'
          : 'Số lớn nhất đứng đầu, rồi đến số bé hơn, số bé nhất đứng cuối.',
      solution: `Xếp ${words}: ${listText(right)}.`,
      visual: { type: 'seq', title: story.title, values, unit: story.unit },
    };
  },
  'nhieu-hon': (rand) => {
    const n = int(rand, 5, 7);
    const values = Array.from({ length: n }, () => int(rand, 6, 40) * 5000);
    const t = 100000;
    if (!values.some((v) => v > t)) values[int(rand, 0, n - 1)] = 180000;
    if (values.every((v) => v > t)) values[int(rand, 0, n - 1)] = 70000;
    const above = values.filter((v) => v > t);
    return {
      kind: 'nhieu-hon',
      prompt: `Có bao nhiêu ngày nhóm bạn thu được nhiều hơn ${fmt(t)} đồng?`,
      ...slipOptions(
        above.length,
        [values.filter((v) => v >= t).length, above.length + 1, n - above.length],
        {
          min: 0,
          max: n,
        },
      ),
      hint: `Em so sánh từng số với ${fmt(t)}. Số bằng ${fmt(t)} không tính.`,
      solution: `Các số lớn hơn ${fmt(t)} là ${listText(above)}. Có ${above.length} ngày.`,
      visual: {
        type: 'seq',
        title: 'Số tiền bán đồ chơi tái chế mỗi ngày',
        values,
        unit: 'đồng',
      },
    };
  },
  'trung-binh': (rand) => {
    const story = pick(rand, SMALL);
    const n = int(rand, 3, 6);
    const mean = int(rand, 5, 12);
    const values = Array.from({ length: n }, () => mean);
    for (let k = 0; k < n; k++) {
      const a = int(rand, 0, n - 1);
      const b = int(rand, 0, n - 1);
      const d = int(rand, 1, 3);
      if (a !== b && values[b] - d >= 1) {
        values[a] += d;
        values[b] -= d;
      }
    }
    const total = values.reduce((s, v) => s + v, 0);
    return {
      kind: 'trung-binh',
      prompt: `Trung bình mỗi ${story.per} có bao nhiêu ${story.unit}?`,
      ...slipOptions(mean, [total, mean + 1, mean - 1], { min: 0 }),
      hint: `Em cộng ${n} số của dãy rồi chia cho ${n}.`,
      solution: `(${values.map(fmt).join(' + ')}) : ${n} = ${fmt(total)} : ${n} = ${fmt(mean)}.`,
      visual: { type: 'seq', title: story.title, values, unit: story.unit },
    };
  },
  'bieu-do': (rand) => {
    const chart = pick(rand, CHARTS);
    const max = chart.top / chart.step;
    const units = distinctValues(rand, chart.labels.length, 1, max);
    const data = chart.labels.map((label, i) => ({ label, value: units[i] * chart.step }));
    const [a, b] = shuffle(
      rand,
      data.map((_, i) => i),
    );
    const hi = data[a].value > data[b].value ? a : b;
    const lo = hi === a ? b : a;
    const diff = data[hi].value - data[lo].value;
    return {
      kind: 'bieu-do',
      prompt: `Cột ${data[hi].label} biểu diễn nhiều hơn cột ${data[lo].label} bao nhiêu ${chart.noun}?`,
      ...slipOptions(diff, [data[hi].value + data[lo].value, data[hi].value], {
        near: [chart.step, -chart.step, 2 * chart.step],
        min: 0,
      }),
      hint: `Em đọc số ở đỉnh hai cột ${data[hi].label} và ${data[lo].label}, rồi lấy số lớn trừ số bé.`,
      solution: `${fmt(data[hi].value)} − ${fmt(data[lo].value)} = ${fmt(diff)} (${chart.noun}).`,
      visual: { type: 'chart', title: chart.title, unit: chart.unit, data },
    };
  },
  'cot-cao': (rand) => {
    const chart = pick(rand, CHARTS);
    const units = distinctValues(rand, chart.labels.length, 1, chart.top / chart.step);
    const data = chart.labels.map((label, i) => ({ label, value: units[i] * chart.step }));
    const most = rand() < 0.5;
    const target = most ? Math.max(...units) : Math.min(...units);
    const right = data[units.indexOf(target)].label;
    return {
      kind: 'cot-cao',
      prompt: most
        ? `Theo biểu đồ, cột nào biểu diễn nhiều ${chart.noun} nhất?`
        : `Theo biểu đồ, cột nào biểu diễn ít ${chart.noun} nhất?`,
      ...mixOptions(
        rand,
        right,
        shuffle(
          rand,
          data.map((d) => d.label).filter((l) => l !== right),
        ).slice(0, 3),
      ),
      hint: most
        ? 'Cột cao hơn biểu diễn số lớn hơn. Em tìm cột cao nhất.'
        : 'Cột thấp hơn biểu diễn số bé hơn. Em tìm cột thấp nhất.',
      solution: `Cột ${right} ${most ? 'cao' : 'thấp'} nhất, biểu diễn ${fmt(target * chart.step)} ${chart.noun}.`,
      visual: { type: 'chart', title: chart.title, unit: chart.unit, data },
    };
  },
  'kiem-dem': (rand) => {
    const tally = pick(rand, TALLIES);
    const rows = tally.labels.map((label) => ({ label, count: int(rand, 3, 14) }));
    const i = int(rand, 0, rows.length - 1);
    const right = rows[i].count;
    return {
      kind: 'kiem-dem',
      prompt: `Sự kiện "${rows[i].label}" xuất hiện bao nhiêu lần?`,
      ...numberOptions(rand, right, 0, 20),
      hint: 'Mỗi bó có 5 vạch. Em đếm số bó, rồi đếm thêm các vạch lẻ.',
      solution: `Hàng ${rows[i].label} có ${tallyWords(right)}. Sự kiện đó xuất hiện ${right} lần.`,
      visual: { type: 'tally', title: `Bảng kiểm đếm: ${tally.title}`, rows },
    };
  },
  'su-kien': (rand) => {
    const { box, thing, verb } = pick(rand, THINGS);
    const [c1, c2, c3, c4] = shuffle(rand, [...COLORS]);
    const a = int(rand, 1, 5);
    const b = int(rand, 1, 5);
    return {
      kind: 'su-kien',
      prompt: `${box} có ${a} ${thing} ${c1} và ${b} ${thing} ${c2}. ${verb} ra 1 ${thing}. Sự kiện nào có thể xảy ra?`,
      ...mixOptions(rand, `${verb} được ${thing} ${c2}`, [
        `${verb} được ${thing} ${c3}`,
        `${verb} được ${thing} ${c4}`,
      ]),
      hint: `Trong ${box.toLowerCase()} chỉ có ${thing} màu ${c1} và màu ${c2}.`,
      solution: `Có thể ${verb.toLowerCase()} được ${thing} ${c1} hoặc ${thing} ${c2}. Trong ${box.toLowerCase()} không có ${thing} ${c3} hay ${c4}.`,
    };
  },
};

/**
 * One question of each part, in a shuffled order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((k) => MAKERS[k](rand));
}
