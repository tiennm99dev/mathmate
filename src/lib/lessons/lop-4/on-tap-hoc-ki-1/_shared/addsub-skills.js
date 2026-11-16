/**
 * The adaptive review of addition and subtraction: mental sums of round
 * numbers, column addition and subtraction with carrying, adding in a
 * convenient order, an expression with letters, comparing two calculations,
 * two numbers from their sum and difference, and giving change. Pure and
 * DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { carriesOf, columnWords, noCarry } from '#lib/core/kid/column-steps.js';
import { compareSign } from '#lib/core/kid/numbers.js';
import { PLACE_NAMES } from '#lib/core/kid/whole-numbers.js';
import { mixOptions, signOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** @type {Skill} */
export const mental = {
  id: 'tinh-nham',
  label: 'Tính nhẩm',
  make(rand) {
    const unit = pick(rand, [10000, 100000, 1000000]);
    const add = rand() < 0.5;
    const a = int(rand, add ? 2 : 10, add ? 9 : 19) * unit;
    const b = int(rand, 2, 9) * unit;
    const right = add ? a + b : a - b;
    const sign = add ? '+' : '−';
    const name = PLACE_NAMES[Math.round(Math.log10(unit))];
    const count = (/** @type {number} */ v) => v / unit;
    return {
      prompt: `Tính nhẩm: ${fmt(a)} ${sign} ${fmt(b)} = ?`,
      ...slipOptions(right, [right * 10, right / 10], { near: [unit, -unit, 2 * unit] }),
      hint: `Em đếm theo ${name}: coi mỗi ${name} là một đơn vị rồi tính nhẩm như với các số nhỏ.`,
      solution: `${count(a)} ${name} ${sign} ${count(b)} ${name} = ${count(right)} ${name}. Vậy ${fmt(a)} ${sign} ${fmt(b)} = ${fmt(right)}.`,
    };
  },
};

/** @type {Skill} */
export const columnAdd = {
  id: 'cong',
  label: 'Phép cộng',
  make(rand) {
    /** @type {number} */
    let a;
    /** @type {number} */
    let b;
    do {
      a = int(rand, 100000, 599999);
      b = int(rand, 10000, 399999);
    } while (a + b > 999999 || carriesOf(a, b, '+') < 2);
    const right = a + b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} + ${fmt(b)} = ?`,
      ...slipOptions(right, [noCarry(a, b, '+'), right - 1000, right + 100], { near: [10, -10] }),
      hint: 'Em viết các chữ số cùng hàng thẳng cột, cộng từ hàng đơn vị. Đừng quên số nhớ.',
      solution: columnWords(a, b, '+'),
      visual: { type: 'column', a, b, op: '+' },
    };
  },
};

/** @type {Skill} */
export const columnSub = {
  id: 'tru',
  label: 'Phép trừ',
  make(rand) {
    /** @type {number} */
    let a;
    /** @type {number} */
    let b;
    do {
      a = int(rand, 200000, 999999);
      b = int(rand, 10000, a - 10000);
    } while (carriesOf(a, b, '-') < 2);
    const right = a - b;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} − ${fmt(b)} = ?`,
      ...slipOptions(right, [noCarry(a, b, '-'), right + 1000, right - 100], { near: [10, -10] }),
      hint: 'Em trừ từ hàng đơn vị. Chữ số trên bé hơn chữ số dưới thì lấy thêm 10 để trừ, rồi nhớ 1 sang hàng bên trái.',
      solution: columnWords(a, b, '-'),
      visual: { type: 'column', a, b, op: '-' },
    };
  },
};

/**
 * Three numbers whose first and last add up to a round 10 000: the book's
 * "tính bằng cách thuận tiện".
 * @param {() => number} rand
 */
export function convenientTriple(rand) {
  const a = int(rand, 1, 8) * 1000 + int(rand, 11, 99) * 10;
  const c = 10000 - a;
  const b = int(rand, 1, 9) * 1000 + int(rand, 1, 9) * 100;
  return { a, b, c };
}

/** @type {Skill} */
export const convenient = {
  id: 'thuan-tien',
  label: 'Tính thuận tiện',
  make(rand) {
    const { a, b, c } = convenientTriple(rand);
    const sum = `${fmt(a)} + ${fmt(b)} + ${fmt(c)}`;
    const why = `${sum} = (${fmt(a)} + ${fmt(c)}) + ${fmt(b)} = 10 000 + ${fmt(b)} = ${fmt(10000 + b)}.`;
    if (rand() < 0.5) {
      return {
        prompt: `Tính ${sum} bằng cách thuận tiện. Em nên cộng hai số nào trước?`,
        ...mixOptions(rand, `${fmt(a)} và ${fmt(c)}`, [
          `${fmt(a)} và ${fmt(b)}`,
          `${fmt(b)} và ${fmt(c)}`,
        ]),
        hint: 'Em tìm hai số cộng lại được số tròn chục nghìn. Đổi chỗ các số hạng, tổng không thay đổi.',
        solution: `${fmt(a)} + ${fmt(c)} = 10 000 là số tròn chục nghìn. ${why}`,
      };
    }
    const right = 10000 + b;
    return {
      prompt: `Tính bằng cách thuận tiện: ${sum} = ?`,
      ...slipOptions(right, [right - 1000, right + 1000, right + 100], { near: [10] }),
      hint: 'Em tìm hai số cộng lại được số tròn chục nghìn rồi cộng chúng trước.',
      solution: why,
    };
  },
};

/** @type {Skill} */
export const letters = {
  id: 'bieu-thuc',
  label: 'Biểu thức chứa chữ',
  make(rand) {
    const a = int(rand, 20, 90) * 1000;
    const b = int(rand, 1, 9) * 1000 + int(rand, 1, 9) * 100;
    const c = int(rand, 1, 9) * 100 + int(rand, 1, 9) * 10;
    const right = a + b - c;
    return {
      prompt: `Tính giá trị của biểu thức a + b − c với a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}.`,
      ...slipOptions(right, [a + b + c, a - b + c, a - b - c], { near: [100, -100] }),
      hint: 'Em thay chữ bằng số, rồi tính từ trái sang phải.',
      solution: `Nếu a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)} thì a + b − c = ${fmt(a)} + ${fmt(b)} − ${fmt(c)} = ${fmt(a + b)} − ${fmt(c)} = ${fmt(right)}.`,
    };
  },
};

/** @type {Skill} */
export const compareCalc = {
  id: 'so-sanh-phep-tinh',
  label: 'So sánh hai phép tính',
  make(rand) {
    const a = int(rand, 100, 600) * 100;
    const b = int(rand, 20, 300) * 100;
    const left = a + b;
    const right = left + pick(rand, [0, 0, 100, -100, 1000, -1000]);
    const d = int(rand, 20, 300) * 100;
    const c = right + d;
    const sign = compareSign(left, right);
    return {
      prompt: `Chọn dấu thích hợp: ${fmt(a)} + ${fmt(b)} ? ${fmt(c)} − ${fmt(d)}`,
      ...signOptions(sign),
      hint: 'Em tính kết quả của từng vế trước, rồi so sánh hai kết quả.',
      solution: `${fmt(a)} + ${fmt(b)} = ${fmt(left)}; ${fmt(c)} − ${fmt(d)} = ${fmt(right)}. Vì ${fmt(left)} ${sign} ${fmt(right)} nên ${fmt(a)} + ${fmt(b)} ${sign} ${fmt(c)} − ${fmt(d)}.`,
    };
  },
};

/** Sum and difference stories: the two things, their unit and their whole. */
export const SUM_STORIES = /** @type {const} */ ([
  {
    whole: (/** @type {string} */ s, /** @type {string} */ d) =>
      `Một con đường gồm hai đoạn, dài tất cả ${s} km. Đoạn thứ nhất dài hơn đoạn thứ hai ${d} km.`,
    big: 'đoạn thứ nhất',
    small: 'đoạn thứ hai',
    ask: 'dài bao nhiêu ki-lô-mét',
    unit: 'km',
    range: [200, 400],
  },
  {
    whole: (/** @type {string} */ s, /** @type {string} */ d) =>
      `Một vườn cây ăn quả có ${s} cây ổi và cây chuối. Số cây ổi nhiều hơn số cây chuối ${d} cây.`,
    big: 'số cây ổi',
    small: 'số cây chuối',
    ask: 'là bao nhiêu cây',
    unit: 'cây',
    range: [100, 500],
  },
  {
    whole: (/** @type {string} */ s, /** @type {string} */ d) =>
      `Hai kho chứa ${s} tạ thóc. Kho thứ nhất chứa nhiều hơn kho thứ hai ${d} tạ.`,
    big: 'kho thứ nhất',
    small: 'kho thứ hai',
    ask: 'chứa bao nhiêu tạ thóc',
    unit: 'tạ',
    range: [100, 900],
  },
]);

/**
 * A sum and difference problem: the larger part is `small + diff`.
 * @param {(typeof SUM_STORIES)[number]} story
 * @param {number} small
 * @param {number} diff
 * @param {boolean} askBig
 * @returns {Question}
 */
export function sumDiffStory(story, small, diff, askBig) {
  const big = small + diff;
  const sum = big + small;
  const right = askBig ? big : small;
  const name = askBig ? story.big : story.small;
  const smallWay = `Số bé = (${fmt(sum)} − ${fmt(diff)}) : 2 = ${fmt(small)} (${story.unit}).`;
  const bigWay = `Số lớn = ${fmt(small)} + ${fmt(diff)} = ${fmt(big)} (${story.unit}).`;
  return {
    prompt: `${story.whole(fmt(sum), fmt(diff))} Hỏi ${name} ${story.ask}?`,
    ...slipOptions(right, [askBig ? small : big, sum - diff, sum + diff], {
      near: [diff, -diff],
      min: 1,
      unit: story.unit,
    }),
    hint: 'Tổng và hiệu đã biết. Số bé = (Tổng − Hiệu) : 2; số lớn = số bé + hiệu.',
    solution: `Tổng là ${fmt(sum)}, hiệu là ${fmt(diff)}. ${smallWay} ${bigWay} Vậy ${name} là ${fmt(right)} ${story.unit}.`,
  };
}

/** @type {Skill} */
export const sumDiff = {
  id: 'tong-hieu',
  label: 'Tìm hai số biết tổng và hiệu',
  make(rand) {
    const story = pick(rand, SUM_STORIES);
    const small = int(rand, story.range[0], story.range[1]);
    const diff = int(rand, 2, 30) * 10;
    return sumDiffStory(story, small, diff, rand() < 0.5);
  },
};

/** Things to buy, with prices in thousands of đồng. */
const GOODS = /** @type {const} */ ([
  { name: 'một cái mũ', price: [40, 70] },
  { name: 'một đôi dép', price: [50, 90] },
  { name: 'một con gấu bông', price: [60, 95] },
  { name: 'một hộp bút màu', price: [25, 45] },
  { name: 'một quyển truyện', price: [20, 45] },
]);

/** @type {Skill} */
export const change = {
  id: 'tra-tien',
  label: 'Bài toán mua hàng',
  make(rand) {
    const i = int(rand, 0, GOODS.length - 1);
    const j = (i + int(rand, 1, GOODS.length - 1)) % GOODS.length;
    const [p, q] = [GOODS[i], GOODS[j]];
    const x = int(rand, p.price[0], p.price[1]) * 1000;
    const y = int(rand, q.price[0], q.price[1]) * 1000;
    const paid = 200000;
    const right = paid - x - y;
    return {
      prompt: `Mai đưa cô bán hàng tờ 200 000 đồng để mua ${p.name} giá ${fmt(x)} đồng và ${q.name} giá ${fmt(y)} đồng. Cô bán hàng phải trả lại Mai bao nhiêu tiền?`,
      ...slipOptions(right, [x + y, paid - x, paid - y], {
        near: [1000, -1000, 10000],
        min: 1000,
        unit: 'đồng',
      }),
      hint: 'Em tính số tiền mua cả hai thứ, rồi lấy 200 000 đồng trừ đi số tiền đó.',
      solution: `Mua hai thứ hết: ${fmt(x)} + ${fmt(y)} = ${fmt(x + y)} (đồng). Cô trả lại: ${fmt(paid)} − ${fmt(x + y)} = ${fmt(right)} (đồng).`,
    };
  },
};

/** The parts of the review of addition and subtraction, in book order. */
export const ADDSUB_SKILLS = [
  mental,
  columnAdd,
  columnSub,
  convenient,
  letters,
  compareCalc,
  sumDiff,
  change,
];
