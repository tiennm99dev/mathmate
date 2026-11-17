/**
 * The adaptive review of statistics and chance: reading a table of data,
 * putting the data in order, reading a column chart, the average of the
 * columns, reading a tally and the events that can happen in a trial. Every
 * chart and tally is drawn above the options; a tally is read stroke by
 * stroke until the question has ended. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */
/** @typedef {{ label: string, value: number }} Row */

/** Names of the children in a table of data. */
const NAMES = /** @type {const} */ ([
  'Thắng',
  'Hùng',
  'Bình',
  'Trung',
  'Lợi',
  'Dũng',
  'Mai',
  'Lan',
  'Hà',
  'Nam',
]);

/**
 * Stories for a table of data about children: what is measured, its unit,
 * the head of its value column, the range of the values and the words for more and less.
 */
export const TABLES = /** @type {const} */ ([
  {
    title: 'Chiều cao của các bạn trong đội bóng chuyền',
    unit: 'cm',
    head: 'Chiều cao (cm)',
    lo: 160,
    hi: 190,
    more: 'cao hơn',
    less: 'thấp hơn',
    most: 'cao nhất',
    least: 'thấp nhất',
    up: 'từ thấp đến cao',
  },
  {
    title: 'Số điểm 10 mỗi bạn đạt được trong học kì',
    unit: 'điểm 10',
    head: 'Số điểm 10',
    lo: 5,
    hi: 30,
    more: 'có nhiều điểm 10 hơn',
    less: 'có ít điểm 10 hơn',
    most: 'có nhiều điểm 10 nhất',
    least: 'có ít điểm 10 nhất',
    up: 'từ ít đến nhiều điểm 10',
  },
]);

/**
 * Stories for a column chart: its title, the axis title, the noun counted,
 * what one column is (`each`), the word before a column's name (`prefix`),
 * the verb, the columns and the step between values (values run from
 * `lo` to `hi` steps).
 */
export const CHARTS = /** @type {const} */ ([
  {
    title: 'Số học sinh tham gia các câu lạc bộ',
    unit: 'Số học sinh',
    noun: 'học sinh',
    each: 'câu lạc bộ',
    prefix: 'câu lạc bộ ',
    verb: 'có',
    labels: ['Bơi', 'Võ', 'Cờ', 'Múa'],
    step: 5,
    lo: 4,
    hi: 14,
  },
  {
    title: 'Số người đồng diễn của các đội',
    unit: 'Số người',
    noun: 'người',
    each: 'đội',
    prefix: '',
    verb: 'có',
    labels: ['Đội Một', 'Đội Hai', 'Đội Ba'],
    step: 10,
    lo: 6,
    hi: 16,
  },
  {
    title: 'Số cây mỗi lớp trồng được',
    unit: 'Số cây',
    noun: 'cây',
    each: 'lớp',
    prefix: 'lớp ',
    verb: 'trồng được',
    labels: ['4A', '4B', '4C', '4D'],
    step: 4,
    lo: 5,
    hi: 20,
  },
]);

/**
 * Trials a tally records: what is done, the outcomes and the events they
 * make, as a sentence names them.
 */
export const TRIALS = /** @type {const} */ ([
  {
    act: 'lấy một quả bóng trong hộp rồi trả lại',
    labels: ['Bóng đỏ', 'Bóng vàng', 'Bóng xanh'],
    event: ['lấy được bóng đỏ', 'lấy được bóng vàng', 'lấy được bóng xanh'],
  },
  {
    act: 'tung đồng xu',
    labels: ['Mặt sấp', 'Mặt ngửa'],
    event: ['đồng xu xuất hiện mặt sấp', 'đồng xu xuất hiện mặt ngửa'],
  },
  {
    act: 'quay vòng quay',
    labels: ['Màu đỏ', 'Màu vàng', 'Màu xanh'],
    event: ['kim dừng ở màu đỏ', 'kim dừng ở màu vàng', 'kim dừng ở màu xanh'],
  },
]);

/**
 * `n` different whole numbers from `lo` to `hi`, in a random order.
 * @param {() => number} rand
 * @param {number} n
 * @param {number} lo
 * @param {number} hi
 */
export function distinctValues(rand, n, lo, hi) {
  const all = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  return shuffle(rand, all).slice(0, n);
}

/**
 * The rows of a table of data: `n` children with different values.
 * @param {() => number} rand
 * @param {(typeof TABLES)[number]} story
 * @param {number} n
 * @returns {Row[]}
 */
function tableRows(rand, story, n) {
  const names = shuffle(rand, [...NAMES]).slice(0, n);
  const values = distinctValues(rand, n, story.lo, story.hi);
  return names.map((label, i) => ({ label, value: values[i] }));
}

/**
 * The label of the row with the largest (or smallest) value.
 * @param {Row[]} rows
 * @param {boolean} largest
 */
function extremeLabel(rows, largest) {
  const sorted = [...rows].sort((a, b) => (largest ? b.value - a.value : a.value - b.value));
  return sorted[0].label;
}

/** @param {Row[]} rows */
const rowsText = (rows) => rows.map((r) => `${r.label} ${fmt(r.value)}`).join(', ');

/** @type {Skill} */
export const readTable = {
  id: 'doc-bang',
  label: 'Đọc bảng số liệu',
  make(rand) {
    const story = pick(rand, TABLES);
    const rows = tableRows(rand, story, 6);
    const visual = /** @type {const} */ ({
      type: 'table',
      title: story.title,
      head: story.head,
      rows,
    });
    const r = rand();
    if (r < 0.4) {
      const largest = rand() < 0.5;
      const right = extremeLabel(rows, largest);
      const word = largest ? story.most : story.least;
      const wrong = rows.map((x) => x.label).filter((l) => l !== right);
      return {
        prompt: `Bạn nào ${word}?`,
        ...mixOptions(rand, right, shuffle(rand, wrong).slice(0, 3)),
        hint: `Em so sánh các số trong bảng, tìm số ${largest ? 'lớn nhất' : 'bé nhất'}.`,
        solution: `${rowsText(rows)}. Số ${largest ? 'lớn nhất' : 'bé nhất'} là ${fmt(rows.find((x) => x.label === right)?.value ?? 0)}, của ${right}. Vậy ${right} ${word}.`,
        visual,
      };
    }
    // How many children are above (or below) one of them, never the first or last.
    const sorted = [...rows].sort((a, b) => a.value - b.value);
    const ref = sorted[int(rand, 1, rows.length - 2)];
    const more = rand() < 0.5;
    const hits = rows.filter((x) => (more ? x.value > ref.value : x.value < ref.value));
    const word = more ? story.more : story.less;
    return {
      prompt: `Có bao nhiêu bạn ${word} bạn ${ref.label}?`,
      ...slipOptions(hits.length, [hits.length + 1, rows.length - 1 - hits.length], {
        near: [-1, 1, 2],
        min: 0,
        max: rows.length,
        unit: 'bạn',
      }),
      hint: `Bạn ${ref.label}: ${fmt(ref.value)} ${story.unit}. Em so sánh từng bạn khác với ${fmt(ref.value)}.`,
      solution: `Các bạn ${word} bạn ${ref.label} (${fmt(ref.value)} ${story.unit}): ${hits.map((x) => `${x.label} (${fmt(x.value)})`).join(', ')}. Có ${hits.length} bạn.`,
      visual,
    };
  },
};

/**
 * Names in order: the right order, the reverse and two orders with one
 * pair swapped.
 * @param {() => number} rand
 * @param {string[]} order
 */
export function orderOptions(rand, order) {
  const swap = (/** @type {number} */ i) => {
    const o = [...order];
    [o[i], o[i + 1]] = [o[i + 1], o[i]];
    return o.join(', ');
  };
  const i = int(rand, 0, order.length - 2);
  const j = (i + int(rand, 1, order.length - 2)) % (order.length - 1);
  return mixOptions(rand, order.join(', '), [[...order].reverse().join(', '), swap(i), swap(j)]);
}

/** @type {Skill} */
export const sortTable = {
  id: 'sap-xep',
  label: 'Sắp xếp số liệu',
  make(rand) {
    const story = pick(rand, TABLES);
    const rows = tableRows(rand, story, 4);
    const order = [...rows].sort((a, b) => a.value - b.value).map((x) => x.label);
    return {
      prompt: `Sắp xếp tên các bạn theo thứ tự ${story.up}.`,
      ...orderOptions(rand, order),
      hint: 'Em tìm bạn có số bé nhất để xếp đầu tiên, rồi bạn có số bé thứ hai…',
      solution: `Xếp các số từ bé đến lớn: ${[...rows]
        .sort((a, b) => a.value - b.value)
        .map((x) => fmt(x.value))
        .join(' < ')}. Vậy thứ tự là: ${order.join(', ')}.`,
      visual: { type: 'table', title: story.title, head: story.head, rows },
    };
  },
};

/**
 * The columns of a chart story with different values, so the highest and
 * the lowest column are clear.
 * @param {() => number} rand
 * @param {(typeof CHARTS)[number]} story
 * @returns {Row[]}
 */
function chartRows(rand, story) {
  const values = distinctValues(rand, story.labels.length, story.lo, story.hi);
  return story.labels.map((label, i) => ({ label, value: values[i] * story.step }));
}

/** @param {(typeof CHARTS)[number]} story @param {Row[]} data */
const chartVisual = (story, data) =>
  /** @type {const} */ ({ type: 'chart', title: story.title, unit: story.unit, data });

/** @type {Skill} */
export const readChart = {
  id: 'bieu-do',
  label: 'Đọc biểu đồ cột',
  make(rand) {
    const story = pick(rand, CHARTS);
    const data = chartRows(rand, story);
    const visual = chartVisual(story, data);
    if (rand() < 0.5) {
      const largest = rand() < 0.5;
      const right = extremeLabel(data, largest);
      return {
        prompt: `${capitalize(story.each)} nào ${story.verb} ${largest ? 'nhiều' : 'ít'} ${story.noun} nhất?`,
        ...mixOptions(
          rand,
          right,
          data.map((x) => x.label).filter((l) => l !== right),
        ),
        hint: `Cột ${largest ? 'cao' : 'thấp'} nhất biểu diễn số ${largest ? 'lớn' : 'bé'} nhất.`,
        solution: `${rowsText(data)}. Cột ${right} ${largest ? 'cao' : 'thấp'} nhất (${fmt(data.find((x) => x.label === right)?.value ?? 0)} ${story.noun}).`,
        visual,
      };
    }
    const [a, b] = shuffle(rand, [...data])
      .slice(0, 2)
      .sort((x, y) => y.value - x.value);
    const right = a.value - b.value;
    return {
      prompt: `${capitalize(story.prefix + a.label)} ${story.verb} nhiều hơn ${story.prefix}${b.label} bao nhiêu ${story.noun}?`,
      ...slipOptions(right, [a.value + b.value, right + story.step, right - story.step], {
        near: [story.step * 2, -story.step * 2],
        min: 1,
        unit: story.noun,
      }),
      hint: `Em đọc số ở đầu cột ${a.label} và cột ${b.label}, rồi lấy số lớn trừ số bé.`,
      solution: `${a.label}: ${fmt(a.value)}, ${b.label}: ${fmt(b.value)}. ${fmt(a.value)} − ${fmt(b.value)} = ${fmt(right)} (${story.noun}).`,
      visual,
    };
  },
};

/**
 * Columns of a chart whose average is a whole multiple of the step, with
 * different values.
 * @param {() => number} rand
 * @param {(typeof CHARTS)[number]} story
 * @returns {Row[]}
 */
export function averageRows(rand, story) {
  const n = story.labels.length;
  for (;;) {
    const values = distinctValues(rand, n - 1, story.lo, story.hi);
    const sum = values.reduce((s, v) => s + v, 0);
    const mean = Math.round(sum / (n - 1)) + int(rand, -1, 1);
    const last = mean * n - sum;
    if (last < story.lo || last > story.hi || values.includes(last)) continue;
    return story.labels.map((label, i) => ({
      label,
      value: (i < n - 1 ? values[i] : last) * story.step,
    }));
  }
}

/** @type {Skill} */
export const chartAverage = {
  id: 'trung-binh',
  label: 'Số trung bình cộng',
  make(rand) {
    const story = pick(rand, CHARTS);
    const data = averageRows(rand, story);
    const n = data.length;
    const sum = data.reduce((s, x) => s + x.value, 0);
    const right = sum / n;
    return {
      prompt: `Trung bình mỗi ${story.each} ${story.verb} bao nhiêu ${story.noun}?`,
      ...slipOptions(right, [sum, right + story.step, right - story.step], {
        near: [story.step * 2, -story.step * 2],
        min: 1,
        unit: story.noun,
      }),
      hint: `Em cộng số ${story.noun} của ${n} cột, rồi chia cho ${n}.`,
      solution: `(${data.map((x) => fmt(x.value)).join(' + ')}) : ${n} = ${fmt(sum)} : ${n} = ${fmt(right)} (${story.noun}).`,
      visual: chartVisual(story, data),
    };
  },
};

/**
 * The counts of a tally, all different, from 3 to 15.
 * @param {() => number} rand
 * @param {(typeof TRIALS)[number]} trial
 */
function tallyRows(rand, trial) {
  const counts = distinctValues(rand, trial.labels.length, 3, 15);
  return trial.labels.map((label, i) => ({ label, count: counts[i] }));
}

/** The text with its first letter in lower case. */
const lower = (/** @type {string} */ s) => s.charAt(0).toLowerCase() + s.slice(1);

/** The third option when a trial has only two outcomes. */
const SAME = 'Hai kết quả xuất hiện số lần bằng nhau';

/** @type {Skill} */
export const readTally = {
  id: 'kiem-dem',
  label: 'Đọc bảng kiểm đếm',
  make(rand) {
    const trial = pick(rand, TRIALS);
    const rows = tallyRows(rand, trial);
    const total = rows.reduce((s, x) => s + x.count, 0);
    const visual = /** @type {const} */ ({
      type: 'tally',
      title: `Kết quả ${total} lần ${trial.act}`,
      rows,
    });
    const listed = rows.map((x) => `${lower(x.label)} ${x.count} lần`).join(', ');
    if (rand() < 0.5) {
      const i = int(rand, 0, rows.length - 1);
      const right = rows[i].count;
      return {
        prompt: `Rô-bốt ${trial.act} ${total} lần. Sự kiện “${trial.event[i]}” xảy ra bao nhiêu lần?`,
        ...slipOptions(right, [right + 5, right - 5, right + 1], { min: 0, unit: 'lần' }),
        hint: `Em đếm số vạch ở hàng ${lower(rows[i].label)}: mỗi bó có 5 vạch.`,
        solution: `Hàng ${lower(rows[i].label)} có ${right} vạch. Sự kiện “${trial.event[i]}” xảy ra ${right} lần.`,
        visual,
      };
    }
    const most = rand() < 0.5;
    const pickRow = [...rows].sort((a, b) => (most ? b.count - a.count : a.count - b.count))[0];
    return {
      prompt: `Rô-bốt ${trial.act} ${total} lần. Kết quả nào xuất hiện ${most ? 'nhiều' : 'ít'} lần nhất?`,
      ...mixOptions(rand, pickRow.label, [
        ...rows.map((x) => x.label).filter((l) => l !== pickRow.label),
        ...(rows.length < 3 ? [SAME] : []),
      ]),
      hint: `Em đếm số vạch ở mỗi hàng rồi so sánh. Hàng ${most ? 'nhiều' : 'ít'} vạch nhất là kết quả cần tìm.`,
      solution: `Số lần: ${listed}. ${pickRow.label} xuất hiện ${most ? 'nhiều' : 'ít'} lần nhất (${pickRow.count} lần).`,
      visual,
    };
  },
};

/** Colours of the balls a box may hold. */
const COLORS = /** @type {const} */ (['đỏ', 'vàng', 'xanh', 'tím', 'trắng', 'đen']);

/**
 * How many times the last outcome came up, from the number of trials and
 * the other counts.
 * @param {(typeof TRIALS)[number]} trial
 * @param {number[]} counts every count, the last one asked
 * @returns {Question}
 */
export function missingCount(trial, counts) {
  const total = counts.reduce((s, c) => s + c, 0);
  const known = counts.slice(0, -1);
  const right = counts.at(-1) ?? 0;
  const k = counts.length - 1;
  const told = known.map((c, i) => `${lower(trial.labels[i])} ${c} lần`).join(', ');
  return {
    prompt: `Rô-bốt ${trial.act} ${total} lần: ${told}. ${trial.labels[k]} xuất hiện bao nhiêu lần?`,
    ...slipOptions(right, [total, known[0], right + 10], { min: 0, unit: 'lần' }),
    hint: `Tổng số lần của các kết quả bằng số lần ${trial.act.split(' ')[0]}: ${total} lần.`,
    solution: `${total} − ${known.join(' − ')} = ${right}. ${trial.labels[k]} xuất hiện ${right} lần.`,
  };
}

/** @type {Skill} */
export const events = {
  id: 'su-kien',
  label: 'Sự kiện có thể xảy ra',
  make(rand) {
    if (rand() < 0.5) {
      const trial = pick(rand, TRIALS);
      const counts = distinctValues(rand, trial.labels.length, 3, 15);
      return missingCount(trial, counts);
    }
    const colors = shuffle(rand, [...COLORS]);
    const inside = colors.slice(0, int(rand, 2, 3));
    const outside = colors[inside.length];
    const right = `Lấy được quả bóng ${outside}`;
    return {
      prompt: `Trong hộp có các quả bóng màu ${inside.join(', ')}. Rô-bốt lấy ra một quả bóng. Sự kiện nào không thể xảy ra?`,
      ...mixOptions(
        rand,
        right,
        inside.map((c) => `Lấy được quả bóng ${c}`),
      ),
      hint: 'Em xem trong hộp có những màu nào. Màu không có trong hộp thì không thể lấy được.',
      solution: `Trong hộp chỉ có bóng màu ${inside.join(', ')}, không có bóng ${outside}. Vậy sự kiện “${lower(right)}” không thể xảy ra; lấy được bóng ${inside.join(' hoặc ')} đều có thể xảy ra.`,
    };
  },
};

/** The parts of the review of statistics and chance, in book order. */
export const STATS_SKILLS = [readTable, sortTable, readChart, chartAverage, readTally, events];
