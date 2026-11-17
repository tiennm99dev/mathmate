/**
 * The mixed practice of the grade 5 chapter on statistics and probability:
 * sorting a data sequence, counting the values in a group, reading a pie
 * chart, the missing part of a pie chart, the number of items a percentage
 * stands for, the ratio of the times an event happened to the trials, and
 * the sock question (can two socks of one colour be sure?). One question of
 * each part in a shuffled order. Pure and DOM-free.
 */
import { int, partition, pick, rng, shuffle } from '#lib/core/drill.js';
import { CHANCES } from '#lib/core/kid/chance.js';
import { mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { formatNumber } from '#lib/core/number-format.js';
import { countFromPercent, countWorking, ratioText } from '../_shared/stats.js';

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'sap-xep': 'Sắp xếp dãy số liệu',
  'phan-loai': 'Phân loại số liệu',
  'doc-quat': 'Đọc biểu đồ hình quạt tròn',
  'phan-con-lai': 'Tỉ số phần trăm còn lại',
  'tinh-so': 'Tính số lượng từ tỉ số phần trăm',
  'ti-so': 'Tỉ số số lần lặp lại một sự kiện',
  'chac-chan': 'Chắc chắn, có thể, không thể',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * What a question shows above its options.
 * @typedef {{ type: 'seq', title: string, values: number[], unit: string }
 *   | { type: 'pie', title: string, data: Array<{ label: string, value: number }> }
 *   | { type: 'parts', title: string, rows: Array<{ label: string, text: string }> }
 *   | { type: 'table', title: string, head: string, rows: Array<{ label: string, count: number }> }} Visual
 */

/** A ratio option: its text and the fraction it draws. */
/** @typedef {{ label: string, n: number, d: number }} RatioOption */

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/**
 * Data sequences with decimals: the story and how values are drawn, as whole
 * numbers of 1/`scale` of the unit (`lo`, `hi`, `step` and `cut`).
 */
const SEQUENCES = /** @type {const} */ ([
  {
    title: 'Thành tích nhảy xa',
    unit: 'm',
    scale: 100,
    lo: 200,
    hi: 320,
    step: 5,
    cut: 250,
    group: 'dưới 2,5 m',
  },
  {
    title: 'Độ dài bàn chân',
    unit: 'cm',
    scale: 10,
    lo: 190,
    hi: 230,
    step: 5,
    cut: 210,
    group: 'dưới 21 cm',
  },
  {
    title: 'Cân nặng các bạn trong tổ',
    unit: 'kg',
    scale: 10,
    lo: 280,
    hi: 400,
    step: 5,
    cut: 330,
    group: 'dưới 33 kg',
  },
]);

/** Pie chart stories: the parts in any order. */
const PIES = /** @type {const} */ ([
  {
    title: 'Hoạt động cuối tuần yêu thích',
    noun: 'học sinh',
    labels: ['Đọc sách', 'Chơi thể thao', 'Giải câu đố', 'Chăm sóc cây'],
  },
  { title: 'Các loại xe trong bãi đỗ', noun: 'xe', labels: ['Xe máy', 'Xe đạp', 'Ô tô'] },
  {
    title: 'Môn thể thao yêu thích',
    noun: 'học sinh',
    labels: ['Bóng đá', 'Cầu lông', 'Bơi', 'Cờ vua'],
  },
  { title: 'Số áo bán được theo cỡ', noun: 'chiếc áo', labels: ['Cỡ S', 'Cỡ M', 'Cỡ L'] },
]);

/** Experiments with a tally of outcomes. */
const EXPERIMENTS = /** @type {const} */ ([
  { title: 'Tung đồng xu', act: 'tung', labels: ['Mặt sấp', 'Mặt ngửa'] },
  { title: 'Lấy 2 chiếc tất', act: 'lấy', labels: ['2 chiếc cùng màu', '2 chiếc khác màu'] },
  { title: 'Gieo xúc xắc', act: 'gieo', labels: ['Mặt chẵn', 'Mặt lẻ'] },
  { title: 'Quay vòng quay', act: 'quay', labels: ['Màu vàng', 'Màu xanh', 'Màu đỏ'] },
]);

/**
 * `k` (3 or 4) different multiples of 5 adding up to 100, so a pie has one
 * largest and one smallest part.
 * @param {() => number} rand
 * @param {number} k
 */
export function pieShares(rand, k) {
  for (let tries = 0; tries < 50; tries++) {
    const parts = partition(rand, 20, k);
    if (new Set(parts).size === k) return parts.map((p) => p * 5);
  }
  return k === 4 ? [40, 30, 20, 10] : [50, 30, 20];
}

/**
 * A pie story with its shares.
 * @param {() => number} rand
 */
function makePie(rand) {
  const story = pick(rand, PIES);
  const shares = pieShares(rand, story.labels.length);
  const data = story.labels.map((label, i) => ({ label, value: shares[i] }));
  return { story, shares, data };
}

/** @param {number} v */
const pct = (v) => `${formatNumber(v)}%`;

/**
 * A sequence of five different values of a story.
 * @param {() => number} rand
 * @param {(typeof SEQUENCES)[number]} story
 */
function makeValues(rand, story) {
  const steps = (story.hi - story.lo) / story.step;
  const picked = new Set();
  while (picked.size < 5) picked.add(story.lo + story.step * int(rand, 0, steps));
  return [...picked].map((v) => v / story.scale);
}

/** @type {Record<Kind, (rand: () => number) => Question>} */
const MAKERS = {
  'sap-xep': (rand) => {
    const story = pick(rand, SEQUENCES);
    let values = makeValues(rand, story);
    const up = rand() < 0.5;
    const sorted = [...values].sort((a, b) => (up ? a - b : b - a));
    if (values.join() === sorted.join()) values = [...values].reverse();
    const text = (/** @type {number[]} */ list) => list.map((v) => formatNumber(v)).join('; ');
    const swapped = [...sorted];
    [swapped[1], swapped[2]] = [swapped[2], swapped[1]];
    const order = up ? 'từ bé đến lớn' : 'từ lớn đến bé';
    return {
      kind: 'sap-xep',
      prompt: `Dãy nào được sắp xếp ${order}?`,
      ...mixOptions(rand, text(sorted), [text([...sorted].reverse()), text(swapped), text(values)]),
      hint: up
        ? 'Số đứng đầu là số bé nhất. Mỗi số đứng sau lớn hơn số đứng trước.'
        : 'Số đứng đầu là số lớn nhất. Mỗi số đứng sau bé hơn số đứng trước.',
      solution: `Sắp xếp ${order}: ${text(sorted)}.`,
      visual: { type: 'seq', title: story.title, values, unit: story.unit },
    };
  },

  'phan-loai': (rand) => {
    const story = pick(rand, SEQUENCES);
    const cut = story.cut / story.scale;
    let values = makeValues(rand, story);
    for (let tries = 0; tries < 20; tries++) {
      const n = values.filter((v) => v < cut).length;
      if (n > 0 && n < values.length) break;
      values = makeValues(rand, story);
    }
    const below = values.filter((v) => v < cut);
    const n = below.length;
    return {
      kind: 'phan-loai',
      prompt: `Có bao nhiêu số liệu ${story.group}?`,
      ...slipOptions(n, [values.length - n, n + 1], {
        near: [1, -1, 2],
        min: 0,
        max: values.length,
      }),
      hint: `So sánh từng số với ${formatNumber(cut)} ${story.unit}.`,
      solution: `Các số ${story.group}: ${below.map((v) => `${formatNumber(v)} ${story.unit}`).join('; ')}. Có ${n} số.`,
      visual: { type: 'seq', title: story.title, values, unit: story.unit },
    };
  },

  'doc-quat': (rand) => {
    const { story, shares, data } = makePie(rand);
    const most = rand() < 0.5;
    const target = most ? Math.max(...shares) : Math.min(...shares);
    const i = shares.indexOf(target);
    return {
      kind: 'doc-quat',
      prompt: most ? `Phần nào có nhiều ${story.noun} nhất?` : `Phần nào có ít ${story.noun} nhất?`,
      ...mixOptions(
        rand,
        story.labels[i],
        story.labels.filter((_, j) => j !== i),
      ),
      hint: most
        ? 'Hình quạt to nhất, ghi tỉ số phần trăm lớn nhất.'
        : 'Hình quạt nhỏ nhất, ghi tỉ số phần trăm bé nhất.',
      solution: `${story.labels[i]} chiếm ${pct(target)}, ${most ? 'lớn' : 'bé'} nhất trên biểu đồ.`,
      visual: { type: 'pie', title: story.title, data },
    };
  },

  'phan-con-lai': (rand) => {
    const { story, shares } = makePie(rand);
    const i = int(rand, 0, shares.length - 1);
    const others = shares.filter((_, j) => j !== i);
    return {
      kind: 'phan-con-lai',
      prompt: `${story.labels[i]} chiếm bao nhiêu phần trăm?`,
      ...percentOptions(shares[i], [100 - others[0], 100 - shares[i]]),
      hint: 'Cả hình tròn là 100%. Lấy 100% trừ đi các phần đã biết.',
      solution: `100% − ${others.map(pct).join(' − ')} = ${pct(shares[i])}.`,
      visual: {
        type: 'parts',
        title: story.title,
        rows: story.labels.map((label, j) => ({ label, text: j === i ? '?' : pct(shares[j]) })),
      },
    };
  },

  'tinh-so': (rand) => {
    const { story, shares, data } = makePie(rand);
    const total = pick(rand, [20, 40, 60, 80, 100, 200, 300, 500]);
    const i = int(rand, 0, shares.length - 1);
    const right = countFromPercent(total, shares[i]);
    return {
      kind: 'tinh-so',
      prompt: `Có tất cả ${formatNumber(total)} ${story.noun}. ${story.labels[i]} có bao nhiêu ${story.noun}?`,
      ...slipOptions(right, [shares[i], total - right, right * 10], {
        near: [total / 20, -total / 20, total / 10],
        min: 1,
        max: total,
      }),
      hint: 'Số lượng = Tổng số × Tỉ số phần trăm : 100.',
      solution: `${story.labels[i]} chiếm ${pct(shares[i])}. ${countWorking(total, shares[i])} (${story.noun}).`,
      visual: { type: 'pie', title: story.title, data },
    };
  },

  'ti-so': (rand) => {
    const exp = pick(rand, EXPERIMENTS);
    const total = int(rand, 10, 30);
    const counts = partition(rand, total, exp.labels.length);
    const i = int(rand, 0, counts.length - 1);
    const c = counts[i];
    /** @type {RatioOption[]} */
    const wrong = [
      { label: ratioText(total - c, total), n: total - c, d: total },
      { label: ratioText(c, total - c), n: c, d: total - c },
      { label: ratioText(total, c), n: total, d: c },
    ];
    const right = { label: ratioText(c, total), n: c, d: total };
    const seen = new Set([right.label]);
    const kept = wrong.filter((w) => !seen.has(w.label) && seen.add(w.label));
    const options = shuffle(rand, [right, ...kept]);
    return {
      kind: 'ti-so',
      prompt: `Tỉ số của số lần "${exp.labels[i]}" so với tổng số lần ${exp.act} là bao nhiêu?`,
      options,
      answer: options.indexOf(right),
      hint: `Tử số là số lần "${exp.labels[i]}". Mẫu số là tổng số lần ${exp.act}: cộng tất cả các hàng.`,
      solution: `Tổng số lần ${exp.act}: ${counts.join(' + ')} = ${total}. Tỉ số là ${c} : ${total} hay ${ratioText(c, total)}.`,
      visual: {
        type: 'table',
        title: exp.title,
        head: 'Khả năng',
        rows: exp.labels.map((label, j) => ({ label, count: counts[j] })),
      },
    };
  },

  'chac-chan': (rand) => {
    const cases = [
      {
        prompt:
          'Hộp có 2 chiếc tất đỏ và 2 chiếc tất vàng. Lấy ra 3 chiếc. Lấy được 2 chiếc cùng màu là:',
        word: 'Chắc chắn',
        why: 'Chỉ có 2 màu. Lấy 3 chiếc thì ít nhất 2 chiếc cùng màu.',
      },
      {
        prompt:
          'Hộp có 2 chiếc tất đỏ và 2 chiếc tất vàng. Lấy ra 2 chiếc. Lấy được 2 chiếc cùng màu là:',
        word: 'Có thể',
        why: 'Có thể lấy được 2 chiếc đỏ, nhưng cũng có thể lấy được 1 đỏ và 1 vàng.',
      },
      {
        prompt:
          'Hộp có 2 chiếc tất đỏ và 2 chiếc tất vàng. Lấy ra 2 chiếc. Lấy được 2 chiếc màu xanh là:',
        word: 'Không thể',
        why: 'Trong hộp không có chiếc tất màu xanh nào.',
      },
      {
        prompt: 'Gieo một xúc xắc. Mặt xuất hiện có số chấm bé hơn 7 là:',
        word: 'Chắc chắn',
        why: 'Mặt nào của xúc xắc cũng có từ 1 đến 6 chấm, đều bé hơn 7.',
      },
    ];
    const c = pick(rand, cases);
    return {
      kind: 'chac-chan',
      prompt: c.prompt,
      options: [...CHANCES],
      answer: CHANCES.indexOf(/** @type {(typeof CHANCES)[number]} */ (c.word)),
      hint: 'Em nghĩ đến mọi cách lấy (hoặc mọi mặt) có thể xảy ra.',
      solution: `${c.word}. ${c.why}`,
    };
  },
};

/**
 * Percentage options: the right one and the slips, as "35%".
 * @param {number} right
 * @param {number[]} slips
 */
function percentOptions(right, slips) {
  return slipOptions(right, slips, { near: [5, -5, 10, -10], min: 5, max: 95, unit: '%' });
}

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
