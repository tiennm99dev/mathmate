/**
 * The mixed practice of the chapter "Một số đơn vị đo diện tích": km² and ha,
 * ha and m², two units to one, a measure written as a decimal, comparing
 * two measures, choosing a unit and a field's area in héc-ta. One question
 * of each part in a shuffled order. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { mixOptions, signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { shiftText } from '../_shared/area-units.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'km2-ha': 'Đổi giữa km² và ha',
  'ha-m2': 'Đổi giữa ha và m²',
  'hai-don-vi': 'Đổi số đo có hai đơn vị',
  'thap-phan': 'Viết số đo dưới dạng số thập phân',
  'so-sanh': 'So sánh hai số đo diện tích',
  'chon-don-vi': 'Chọn đơn vị phù hợp',
  'bai-toan': 'Bài toán thực tế',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** Two neighbouring units of the table, the big one first. */
const PAIRS = /** @type {const} */ ([
  ['km²', 'ha'],
  ['m²', 'dm²'],
  ['dm²', 'cm²'],
  ['cm²', 'mm²'],
]);

/** Things and places with the unit their area is measured in. */
export const UNIT_BANK = [
  { prompt: 'Diện tích nước Việt Nam khoảng 331 000 …', unit: 'km²' },
  { prompt: 'Diện tích Hồ Tây khoảng 500 …', unit: 'ha' },
  { prompt: 'Diện tích một phòng ngủ khoảng 15 …', unit: 'm²' },
  { prompt: 'Diện tích một trang vở khoảng 5 …', unit: 'dm²' },
  { prompt: 'Diện tích móng tay cái khoảng 1 …', unit: 'cm²' },
  { prompt: 'Diện tích mặt một hạt đỗ khoảng 30 …', unit: 'mm²' },
];

const UNITS = ['km²', 'ha', 'm²', 'dm²', 'cm²', 'mm²'];

/**
 * The right text among distinct wrong ones, shuffled; at most four options.
 * @param {() => number} rand
 * @param {string} right
 * @param {string[]} wrong
 */
const choices = (rand, right, wrong) =>
  mixOptions(rand, right, [...new Set(wrong.filter((w) => w !== right))].slice(0, 3));

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'km2-ha'(rand) {
    const n = int(rand, 2, 60);
    if (rand() < 0.5) {
      return {
        prompt: `${n} km² = ? ha`,
        ...slipOptions(n * 100, [n * 10, n * 1000, n * 10000], { unit: 'ha' }),
        hint: '1 km² = 100 ha.',
        solution: `${n} km² = ${n} × 100 ha = ${fmt(n * 100)} ha.`,
      };
    }
    return {
      prompt: `${fmt(n * 100)} ha = ? km²`,
      ...slipOptions(n, [n * 10, n * 1000, n * 100], { unit: 'km²' }),
      hint: 'Cứ 100 ha là 1 km².',
      solution: `${fmt(n * 100)} : 100 = ${n}. Vậy ${fmt(n * 100)} ha = ${n} km².`,
    };
  },
  'ha-m2'(rand) {
    const n = int(rand, 2, 30);
    if (rand() < 0.5) {
      return {
        prompt: `${n} ha = ? m²`,
        ...slipOptions(n * 10000, [n * 100, n * 1000, n * 100000], { unit: 'm²' }),
        hint: '1 ha = 10 000 m².',
        solution: `${n} ha = ${n} × 10 000 m² = ${fmt(n * 10000)} m².`,
      };
    }
    return {
      prompt: `${fmt(n * 10000)} m² = ? ha`,
      ...slipOptions(n, [n * 10, n * 100, n * 1000], { unit: 'ha' }),
      hint: 'Cứ 10 000 m² là 1 ha.',
      solution: `${fmt(n * 10000)} : 10 000 = ${n}. Vậy ${fmt(n * 10000)} m² = ${n} ha.`,
    };
  },
  'hai-don-vi'(rand) {
    const [big, small] = pick(rand, PAIRS);
    const a = int(rand, 2, 9);
    const b = int(rand, 1, 99);
    const right = a * 100 + b;
    return {
      prompt: `${a} ${big} ${b} ${small} = ? ${small}`,
      ...slipOptions(right, [a * 10 + b, a * 1000 + b, a + b], { unit: small }),
      hint: `1 ${big} = 100 ${small}. Em đổi ${a} ${big} ra ${small} trước.`,
      solution: `${a} ${big} = ${a * 100} ${small}. ${a * 100} ${small} + ${b} ${small} = ${fmt(right)} ${small}.`,
    };
  },
  'thap-phan'(rand) {
    const [big, small] = pick(rand, PAIRS);
    const a = int(rand, 1, 9);
    const drawn = int(rand, 1, 98);
    // A part such as 30 dm² gives 3,3 m², a short form the slips would match.
    const b = drawn % 10 === 0 ? drawn + 1 : drawn;
    const scaled = a * 100 + b;
    const right = `${shiftText(scaled, -2)} ${big}`;
    const wrong = [
      `${a},${b} ${big}`,
      `${shiftText(scaled, -3)} ${big}`,
      `${shiftText(scaled, -1)} ${big}`,
      `${fmt(scaled)} ${big}`,
    ];
    return {
      prompt: `${a} ${big} ${b} ${small} = ? ${big}`,
      ...choices(rand, right, wrong),
      hint: `1 ${small} = 1/100 ${big}, nên ${b} ${small} là ${b} phần trăm của ${big}.`,
      solution: `${b} ${small} = ${b}/100 ${big} = ${shiftText(b, -2)} ${big}. Vậy ${a} ${big} ${b} ${small} = ${right}.`,
    };
  },
  'so-sanh'(rand) {
    const a = int(rand, 2, 9);
    const sign = pick(rand, /** @type {const} */ (['>', '<', '=']));
    const step = int(rand, 1, 9) * 1000;
    const b = sign === '=' ? a * 10000 : sign === '>' ? a * 10000 - step : a * 10000 + step;
    const s = compareSign(a * 10000, b);
    return {
      prompt: `${a} ha ? ${fmt(b)} m²`,
      ...signOptions(s),
      hint: 'Em đổi số đo héc-ta ra mét vuông rồi so sánh.',
      solution:
        s === '='
          ? `${a} ha = ${fmt(a * 10000)} m². Vậy ${a} ha = ${fmt(b)} m².`
          : `${a} ha = ${fmt(a * 10000)} m². Mà ${fmt(a * 10000)} m² ${s} ${fmt(b)} m². Vậy ${a} ha ${s} ${fmt(b)} m².`,
    };
  },
  'chon-don-vi'(rand) {
    const item = pick(rand, UNIT_BANK);
    const others = shuffle(
      rand,
      UNITS.filter((u) => u !== item.unit),
    );
    return {
      prompt: `${item.prompt} Em chọn đơn vị phù hợp.`,
      ...mixOptions(rand, item.unit, others.slice(0, 3)),
      hint: 'Vật càng nhỏ thì đơn vị càng bé, nơi càng rộng thì đơn vị càng lớn.',
      solution: `${item.prompt.replace(' …', ` ${item.unit}`)}.`,
    };
  },
  'bai-toan'(rand) {
    const k = int(rand, 3, 8);
    const j = int(rand, 1, k - 1);
    const right = k * j;
    return {
      prompt: `Cánh đồng hình chữ nhật dài ${k * 100} m, rộng ${j * 100} m. Cánh đồng rộng bao nhiêu héc-ta?`,
      ...slipOptions(right, [right * 10, right * 100, 2 * (k + j)], { unit: 'ha' }),
      hint: 'Tính diện tích theo m² trước, rồi đổi: 10 000 m² = 1 ha.',
      solution: `${k * 100} × ${j * 100} = ${fmt(right * 10000)} (m²). ${fmt(right * 10000)} m² = ${right} ha.`,
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
