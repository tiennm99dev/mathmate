/**
 * The "fastest way" game of the review of operations with natural numbers.
 * Each round shows an expression and three ways to work it out: one uses a
 * property of the operations (giao hoán, kết hợp, nhân một số với một tổng)
 * to reach a round number, the others are the long way or a slip. The child
 * first picks the convenient way, then the value. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/**
 * One way to work out an expression.
 * @typedef {{ text: string, fast: boolean, why: string }} Way
 */

/**
 * One round: the expression, its ways, the steps of the fast way, the value
 * and two wrong values a child may reach.
 * @typedef {{ expr: string, ways: Way[], steps: string[], value: number, slips: [number, number] }} Round
 */

/** @type {readonly Round[]} */
export const ROUNDS = [
  {
    expr: '25 × 99 × 4',
    ways: [
      {
        text: '(25 × 4) × 99',
        fast: true,
        why: 'Đổi chỗ và nhóm 25 với 4 được 100, nhân với 100 rất nhanh.',
      },
      {
        text: '(25 × 99) × 4',
        fast: false,
        why: 'Cách này đúng nhưng phải nhân 25 × 99 rồi lại nhân với 4, rất dài.',
      },
      {
        text: '25 × 99 + 4',
        fast: false,
        why: 'Không được đổi phép nhân thành phép cộng.',
      },
    ],
    steps: ['25 × 99 × 4 = (25 × 4) × 99', '= 100 × 99', '= 9 900'],
    value: 9900,
    slips: [9904, 990],
  },
  {
    expr: '2 025 × 17 + 83 × 2 025',
    ways: [
      {
        text: '2 025 × (17 + 83)',
        fast: true,
        why: 'Hai tích có chung thừa số 2 025, mà 17 + 83 = 100.',
      },
      {
        text: '2 025 × 17, rồi 83 × 2 025, rồi cộng',
        fast: false,
        why: 'Cách này đúng nhưng phải làm hai phép nhân lớn.',
      },
      {
        text: '2 025 × 17 + 83',
        fast: false,
        why: 'Cách này bỏ mất thừa số 2 025 của tích thứ hai.',
      },
    ],
    steps: ['2 025 × 17 + 83 × 2 025 = 2 025 × (17 + 83)', '= 2 025 × 100', '= 202 500'],
    value: 202500,
    slips: [20250, 2025100],
  },
  {
    expr: '400 + 280 + 600 + 720',
    ways: [
      {
        text: '(400 + 600) + (280 + 720)',
        fast: true,
        why: 'Ghép thành hai cặp tròn nghìn: 400 + 600 = 1 000 và 280 + 720 = 1 000.',
      },
      {
        text: 'Cộng lần lượt từ trái sang phải',
        fast: false,
        why: 'Cách này đúng nhưng các số trung gian không tròn, dễ nhầm.',
      },
      {
        text: '(400 + 280) × (600 + 720)',
        fast: false,
        why: 'Không được đổi phép cộng thành phép nhân.',
      },
    ],
    steps: ['400 + 280 + 600 + 720 = (400 + 600) + (280 + 720)', '= 1 000 + 1 000', '= 2 000'],
    value: 2000,
    slips: [1900, 2100],
  },
  {
    expr: '871 + 500 + 500',
    ways: [
      {
        text: '871 + (500 + 500)',
        fast: true,
        why: 'Nhóm 500 + 500 = 1 000 trước, rồi cộng với 871.',
      },
      {
        text: '(871 + 500) + 500',
        fast: false,
        why: 'Cách này đúng nhưng phải cộng hai lần với số không tròn.',
      },
      {
        text: '871 + 500 × 2 × 2',
        fast: false,
        why: '500 + 500 chỉ là 500 × 2, không phải 500 × 2 × 2.',
      },
    ],
    steps: ['871 + 500 + 500 = 871 + (500 + 500)', '= 871 + 1 000', '= 1 871'],
    value: 1871,
    slips: [1371, 2871],
  },
  {
    expr: '2 × 75 + 2 × 25',
    ways: [
      {
        text: '2 × (75 + 25)',
        fast: true,
        why: 'Hai tích có chung thừa số 2, mà 75 + 25 = 100.',
      },
      {
        text: '2 × 75, rồi 2 × 25, rồi cộng',
        fast: false,
        why: 'Cách này đúng nhưng dài hơn.',
      },
      {
        text: '2 × 75 + 25',
        fast: false,
        why: 'Cách này bỏ mất thừa số 2 của tích thứ hai.',
      },
    ],
    steps: ['2 × 75 + 2 × 25 = 2 × (75 + 25)', '= 2 × 100', '= 200'],
    value: 200,
    slips: [175, 400],
  },
  {
    expr: '125 × 36 × 8',
    ways: [
      {
        text: '(125 × 8) × 36',
        fast: true,
        why: 'Nhóm 125 với 8 được 1 000, nhân với 1 000 rất nhanh.',
      },
      {
        text: '(125 × 36) × 8',
        fast: false,
        why: 'Cách này đúng nhưng phải nhân 125 × 36 trước, rất dài.',
      },
      {
        text: '125 × 36 + 8',
        fast: false,
        why: 'Không được đổi phép nhân thành phép cộng.',
      },
    ],
    steps: ['125 × 36 × 8 = (125 × 8) × 36', '= 1 000 × 36', '= 36 000'],
    value: 36000,
    slips: [3600, 4508],
  },
  {
    expr: '56 × 64 + 56 × 36',
    ways: [
      {
        text: '56 × (64 + 36)',
        fast: true,
        why: 'Hai tích có chung thừa số 56, mà 64 + 36 = 100.',
      },
      {
        text: '56 × 64, rồi 56 × 36, rồi cộng',
        fast: false,
        why: 'Cách này đúng nhưng phải làm hai phép nhân.',
      },
      {
        text: '(56 + 56) × (64 + 36)',
        fast: false,
        why: 'Thừa số chung 56 chỉ viết một lần, không cộng 56 + 56.',
      },
    ],
    steps: ['56 × 64 + 56 × 36 = 56 × (64 + 36)', '= 56 × 100', '= 5 600'],
    value: 5600,
    slips: [11200, 560],
  },
  {
    expr: '5 × 37 × 20',
    ways: [
      {
        text: '(5 × 20) × 37',
        fast: true,
        why: 'Nhóm 5 với 20 được 100, nhân với 100 rất nhanh.',
      },
      {
        text: '(5 × 37) × 20',
        fast: false,
        why: 'Cách này đúng nhưng phải nhân 5 × 37 trước.',
      },
      {
        text: '5 × 37 + 20',
        fast: false,
        why: 'Không được đổi phép nhân thành phép cộng.',
      },
    ],
    steps: ['5 × 37 × 20 = (5 × 20) × 37', '= 100 × 37', '= 3 700'],
    value: 3700,
    slips: [370, 205],
  },
];

/**
 * Picking a way: the fast one moves the round on; any other way keeps it
 * and says why it is not the best.
 * @param {Round} round
 * @param {number} index
 * @returns {{ ok: boolean, tone: 'ok' | 'warn', text: string }}
 */
export function pickWay(round, index) {
  const way = round.ways[index];
  if (!way) return { ok: false, tone: 'warn', text: 'Em chọn một cách tính.' };
  if (way.fast) return { ok: true, tone: 'ok', text: `Đúng rồi! ${way.why} Em chọn kết quả nhé.` };
  return { ok: false, tone: 'warn', text: `${way.why} Em thử cách khác.` };
}

/**
 * The three values offered once the way is found, smallest first.
 * @param {Round} round
 */
export const valueOptions = (round) => [round.value, ...round.slips].sort((a, b) => a - b);

/**
 * Picking a value.
 * @param {Round} round
 * @param {number} value
 * @returns {{ ok: boolean, tone: 'ok' | 'warn', text: string }}
 */
export function pickValue(round, value) {
  if (value === round.value) {
    return { ok: true, tone: 'ok', text: `Giỏi lắm! ${round.expr} = ${fmt(round.value)}.` };
  }
  return { ok: false, tone: 'warn', text: 'Chưa đúng. Em làm lại từng bước của cách tính nhanh.' };
}

/**
 * The value an expression of these rounds really has, worked the long way,
 * so the tests can check every round. Only ×, + and grouping spaces occur
 * (`\s` also matches the narrow group space).
 * @param {string} expr
 */
export function evaluate(expr) {
  return expr
    .replace(/\s/g, '')
    .split('+')
    .map((term) =>
      term
        .split('×')
        .map((f) => Number(f.replace(/\s/g, '')))
        .reduce((p, f) => p * f, 1),
    )
    .reduce((s, t) => s + t, 0);
}
