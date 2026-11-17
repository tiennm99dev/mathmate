/**
 * The mixed practice of the chapter "Thể tích. Đơn vị đo thể tích": the
 * volume of a box of 1 cm³ cubes, comparing two shapes of cubes, dm³ and cm³,
 * m³ and dm³, decimal measures, m³ and cm³, choosing a unit and a word
 * problem. One question of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt, formatNumber, tidy } from '#lib/core/number-format.js';
import { mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { allShow, cubesOf } from '../_shared/cubes.js';

/**
 * What the widget draws above a question: one or two shapes of cubes.
 * @typedef {{ shapes: { name: string, cubes: import('../_shared/cubes.js').Cube[] }[] }} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'dem-khoi': 'Thể tích hình xếp từ khối 1 cm³',
  'so-sanh-hinh': 'So sánh thể tích hai hình',
  'dm3-cm3': 'Đổi giữa dm³ và cm³',
  'm3-dm3': 'Đổi giữa m³ và dm³',
  'thap-phan': 'Số đo thể tích viết dưới dạng số thập phân',
  'm3-cm3': 'Đổi giữa m³ và cm³',
  'chon-don-vi': 'Chọn đơn vị phù hợp',
  'bai-toan': 'Bài toán thực tế',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** The volume units, biggest first. */
export const UNITS = ['m³', 'dm³', 'cm³'];

/** Things with the unit their volume is measured in. */
export const UNIT_BANK = [
  { prompt: 'Một khối băng hình lập phương cạnh 1 m có thể tích 1 …', unit: 'm³' },
  { prompt: 'Một bể bơi chứa khoảng 300 … nước', unit: 'm³' },
  { prompt: 'Một hộp sữa 1 l có thể tích 1 …', unit: 'dm³' },
  { prompt: 'Một thùng nước 20 l có thể tích 20 …', unit: 'dm³' },
  { prompt: 'Một con xúc xắc nhỏ có thể tích khoảng 1 …', unit: 'cm³' },
  { prompt: 'Một quả trứng gà có thể tích khoảng 50 …', unit: 'cm³' },
];

/**
 * A measure written the book's way: 2,65; 1 900; 0,005.
 * @param {number} v
 */
const num = (v) => formatNumber(tidy(v));

/**
 * The right measure among three of the slips, as texts in increasing order.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} slips
 * @param {string} unit
 */
function measureOptions(rand, right, slips, unit) {
  const wrong = [...new Set(slips.map((v) => tidy(v)).filter((v) => v !== tidy(right) && v > 0))];
  const values = [right, ...shuffle(rand, wrong).slice(0, 3)].sort((a, b) => a - b);
  return {
    options: values.map((v) => `${num(v)} ${unit}`),
    answer: values.findIndex((v) => tidy(v) === tidy(right)),
  };
}

/**
 * A conversion question: value v in unit `from` asked in unit `to`, with the
 * slips of a factor 10, 100 or 1 000 too many or too few.
 * @param {() => number} rand
 * @param {number} v
 * @param {string} from
 * @param {string} to
 */
function convert(rand, v, from, to) {
  const steps = UNITS.indexOf(to) - UNITS.indexOf(from);
  const factor = 1000 ** Math.abs(steps);
  const right = steps > 0 ? v * factor : v / factor;
  const big = steps > 0 ? from : to;
  const small = steps > 0 ? to : from;
  const rule =
    Math.abs(steps) === 1 ? `1 ${big} = 1 000 ${small}.` : `1 ${big} = 1 000 000 ${small}.`;
  const how = steps > 0 ? `nhân với ${fmt(factor)}` : `chia cho ${fmt(factor)}`;
  return {
    prompt: `${num(v)} ${from} = ? ${to}`,
    ...measureOptions(
      rand,
      right,
      [right * 10, right / 10, right * 1000, right / 1000, right * 100],
      to,
    ),
    hint: `${rule} Đổi ${from} ra ${to} thì em ${how}.`,
    solution: `${num(v)} ${steps > 0 ? '×' : ':'} ${fmt(factor)} = ${num(right)}. Vậy ${num(v)} ${from} = ${num(right)} ${to}.`,
  };
}

/**
 * A shape of cubes as column heights with every cube in sight: two rows of
 * three columns, 0 to 3 cubes each, and at least one cube.
 * @param {() => number} rand
 * @returns {number[][]}
 */
function randomRows(rand) {
  for (;;) {
    const rows = [0, 1].map(() => [0, 1, 2].map(() => int(rand, 0, 3)));
    const cubes = cubesOf(rows);
    if (cubes.length >= 3 && allShow(cubes)) return rows;
  }
}

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'dem-khoi'(rand) {
    const a = int(rand, 2, 4);
    const b = int(rand, 1, 3);
    const c = int(rand, 1, 3);
    const layer = a * b;
    const right = layer * c;
    const rows = Array.from({ length: b }, () => Array(a).fill(c));
    return {
      prompt: 'Hình hộp chữ nhật được xếp từ các khối 1 cm³. Thể tích hình là bao nhiêu?',
      ...slipOptions(right, [right + layer, right - layer, a + b + c, right + 1], {
        min: 1,
        unit: 'cm³',
      }),
      hint: 'Em đếm số khối ở một lớp, rồi nhân với số lớp.',
      solution: `Mỗi lớp có ${a} × ${b} = ${layer} khối. Có ${c} lớp: ${layer} × ${c} = ${right} khối. Thể tích hình là ${right} cm³.`,
      visual: { shapes: [{ name: 'Hình hộp chữ nhật', cubes: cubesOf(rows) }] },
    };
  },
  'so-sanh-hinh'(rand) {
    const target = pick(rand, /** @type {const} */ (['>', '<', '=']));
    /** @type {number[][]} */
    let a = randomRows(rand);
    /** @type {number[][]} */
    let b = randomRows(rand);
    for (let i = 0; i < 200; i++) {
      const n = cubesOf(a).length;
      const m = cubesOf(b).length;
      if ((target === '=' && n === m) || (target === '>' && n > m) || (target === '<' && n < m))
        break;
      b = randomRows(rand);
      if (i % 20 === 19) a = randomRows(rand);
    }
    const n = cubesOf(a).length;
    const m = cubesOf(b).length;
    const options = ['Hình A', 'Hình B', 'Hai hình có thể tích bằng nhau'];
    const answer = n > m ? 0 : n < m ? 1 : 2;
    const verdict =
      n === m ? 'Hai hình có thể tích bằng nhau.' : `Thể tích hình ${n > m ? 'A' : 'B'} lớn hơn.`;
    return {
      prompt: 'Các khối nhỏ đều như nhau. Hình nào có thể tích lớn hơn?',
      options,
      answer,
      hint: 'Em đếm số khối của từng hình. Hình nào nhiều khối hơn thì thể tích lớn hơn.',
      solution: `Hình A có ${n} khối, hình B có ${m} khối. ${verdict}`,
      visual: {
        shapes: [
          { name: 'Hình A', cubes: cubesOf(a) },
          { name: 'Hình B', cubes: cubesOf(b) },
        ],
      },
    };
  },
  'dm3-cm3'(rand) {
    const n = int(rand, 2, 30);
    return rand() < 0.5 ? convert(rand, n, 'dm³', 'cm³') : convert(rand, n * 1000, 'cm³', 'dm³');
  },
  'm3-dm3'(rand) {
    const n = int(rand, 2, 30);
    return rand() < 0.5 ? convert(rand, n, 'm³', 'dm³') : convert(rand, n * 1000, 'dm³', 'm³');
  },
  'thap-phan'(rand) {
    const [big, small] = pick(
      rand,
      /** @type {const} */ ([
        ['m³', 'dm³'],
        ['dm³', 'cm³'],
      ]),
    );
    const scaled = int(rand, 11, 999);
    const places = scaled < 100 ? 1 : 2;
    const v = scaled / 10 ** places;
    return rand() < 0.5 ? convert(rand, v, big, small) : convert(rand, tidy(v * 1000), small, big);
  },
  'm3-cm3'(rand) {
    if (rand() < 0.5) {
      const v = pick(rand, [0.25, 0.5, 0.75, 1.5, 2, 3]);
      return convert(rand, v, 'm³', 'cm³');
    }
    return convert(rand, int(rand, 1, 9) * 1000, 'cm³', 'm³');
  },
  'chon-don-vi'(rand) {
    const item = pick(rand, UNIT_BANK);
    return {
      prompt: `${item.prompt} Em chọn đơn vị phù hợp.`,
      ...mixOptions(
        rand,
        item.unit,
        UNITS.filter((u) => u !== item.unit),
      ),
      hint: 'Vật càng nhỏ thì đơn vị càng bé. Nhớ: 1 l = 1 dm³.',
      solution: `${item.prompt.replace(' …', ` ${item.unit}`)}.`,
    };
  },
  'bai-toan'(rand) {
    const a = int(rand, 3, 8);
    const b = int(rand, 2, 5);
    const c = int(rand, 2, 4);
    const layer = a * b;
    const right = layer * c;
    return {
      prompt: `Một thùng dạng hình hộp chữ nhật dài ${a} dm, rộng ${b} dm, cao ${c} dm. Xếp được nhiều nhất bao nhiêu hộp hình lập phương 1 dm³ vào thùng?`,
      ...slipOptions(right, [layer, right + layer, a + b + c, 2 * right], { min: 1, unit: 'hộp' }),
      hint: 'Mỗi lớp dưới đáy thùng xếp được bao nhiêu hộp? Có bao nhiêu lớp?',
      solution: `Mỗi lớp xếp được ${a} × ${b} = ${layer} hộp. Có ${c} lớp: ${layer} × ${c} = ${right} hộp.`,
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
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
