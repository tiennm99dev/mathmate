/**
 * The adaptive review of calculations with natural numbers: column addition
 * and subtraction, multiplying by a two-digit number, dividing by a
 * two-digit number, the properties of addition and multiplication, the
 * order of operations, calculating in a convenient way, two numbers from
 * their sum and difference, the average, and a fuel cost problem. Pure and
 * DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { carriesOf, columnWords, noCarry, withRest } from '#lib/core/kid/column-steps.js';
import { mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** @type {Skill} */
export const addSub = {
  id: 'cong-tru',
  label: 'Cộng, trừ các số',
  make(rand) {
    /** @type {number} */
    let a;
    /** @type {number} */
    let b;
    if (rand() < 0.5) {
      do {
        a = int(rand, 10000, 599999);
        b = int(rand, 1000, 399999);
      } while (carriesOf(a, b, '+') < 2);
      const right = a + b;
      return {
        prompt: `Đặt tính rồi tính: ${fmt(a)} + ${fmt(b)} = ?`,
        ...slipOptions(right, [noCarry(a, b, '+'), right - 1000, right + 100], {
          near: [10, -10],
        }),
        hint: 'Em viết các chữ số cùng hàng thẳng cột, cộng từ hàng đơn vị. Đừng quên số nhớ.',
        solution: columnWords(a, b, '+'),
        visual: { type: 'column', a, b, op: '+' },
      };
    }
    do {
      a = int(rand, 20000, 999999);
      b = int(rand, 1000, a - 1000);
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
 * The working of a × b, b a two-digit number, as the book sets it out: the
 * two partial products, the second written one place to the left, then
 * their sum.
 * @param {number} a
 * @param {number} b
 */
export function productWords(a, b) {
  const ones = b % 10;
  const tens = Math.floor(b / 10);
  const first = a * ones;
  const second = a * tens;
  return `${fmt(a)} × ${ones} = ${fmt(first)}. ${fmt(a)} × ${tens} = ${fmt(second)}, viết lùi sang trái một hàng (là ${fmt(second * 10)}). Cộng: ${fmt(first)} + ${fmt(second * 10)} = ${fmt(a * b)}. Vậy ${fmt(a)} × ${b} = ${fmt(a * b)}.`;
}

/** @type {Skill} */
export const multiply = {
  id: 'nhan',
  label: 'Nhân với số có hai chữ số',
  make(rand) {
    const a = int(rand, 105, 4999);
    let b = int(rand, 12, 98);
    if (b % 10 === 0) b += 3;
    const right = a * b;
    const ones = b % 10;
    const tens = Math.floor(b / 10);
    return {
      prompt: `Đặt tính rồi tính: ${fmt(a)} × ${b} = ?`,
      ...slipOptions(right, [a * ones + a * tens, right + a, right - a * 10], {
        near: [100, -100],
        min: 1,
      }),
      hint: `Em nhân ${fmt(a)} với ${ones} trước, rồi nhân với ${tens}. Tích thứ hai viết lùi sang trái một hàng, rồi cộng hai tích.`,
      solution: productWords(a, b),
      visual: { type: 'column', a, b, op: '×' },
    };
  },
};

/** @type {Skill} */
export const divide = {
  id: 'chia',
  label: 'Chia cho số có hai chữ số',
  make(rand) {
    const d = int(rand, 12, 68);
    const q = int(rand, 21, 409);
    const rest = rand() < 0.5 ? 0 : int(rand, 1, d - 1);
    const n = q * d + rest;
    const right = withRest(q, rest);
    const wrong = [withRest(q + 1, rest), withRest(q * 10, rest), withRest(q - 10, rest)];
    if (rest > 0) wrong.unshift(fmt(q));
    const back =
      rest > 0
        ? `${fmt(q)} × ${d} = ${fmt(q * d)}, ${fmt(q * d)} + ${rest} = ${fmt(n)}`
        : `${fmt(q)} × ${d} = ${fmt(n)}`;
    return {
      prompt: `Đặt tính rồi tính: ${fmt(n)} : ${d} = ?`,
      ...mixOptions(rand, right, wrong.slice(0, 3)),
      hint: `Em chia từ trái sang phải, ước lượng thương mỗi lần chia. Số dư phải bé hơn ${d}.`,
      solution: `${fmt(n)} : ${d} = ${right}. Thử lại: ${back}.`,
    };
  },
};

/** @type {Skill} */
export const properties = {
  id: 'tinh-chat',
  label: 'Tính chất của phép cộng, phép nhân',
  make(rand) {
    const a = int(rand, 101, 499);
    const b = int(rand, 11, 99);
    const c = int(rand, 2, 99);
    const way = int(rand, 0, 4);
    /** @type {[string, number, string]} */
    const [line, right, rule] = /** @type {[string, number, string][]} */ ([
      [`${a} + ${b} = ${b} + ?`, a, 'Tính chất giao hoán: a + b = b + a.'],
      [
        `(${a} + ${b}) + ${c} = ${a} + (${b} + ?)`,
        c,
        'Tính chất kết hợp: (a + b) + c = a + (b + c).',
      ],
      [`${b} × ${c} = ${c} × ?`, b, 'Tính chất giao hoán: a × b = b × a.'],
      [
        `(${a} × ${b}) × ${c} = ${a} × (${b} × ?)`,
        c,
        'Tính chất kết hợp: (a × b) × c = a × (b × c).',
      ],
      [
        `${a} × ${b} + ${a} × ${c} = ${a} × (${b} + ?)`,
        c,
        'Nhân một số với một tổng: a × b + a × c = a × (b + c).',
      ],
    ])[way];
    return {
      prompt: `Không thực hiện phép tính, tìm số thích hợp với dấu "?": ${line}`,
      ...mixOptions(
        rand,
        String(right),
        [...new Set([a, b, c, a + b, b + c])]
          .filter((v) => v !== right)
          .slice(0, 3)
          .map(String),
      ),
      hint: 'Em so sánh hai vế: số nào ở vế trái chưa có mặt ở vế phải?',
      solution: `${rule} Vậy số thích hợp là ${right}.`,
    };
  },
};

/** @type {Skill} */
export const orderOfOps = {
  id: 'bieu-thuc',
  label: 'Tính giá trị biểu thức',
  make(rand) {
    if (rand() < 0.5) {
      const a = int(rand, 1000, 9999);
      const b = int(rand, 101, 499);
      const c = int(rand, 12, 49);
      const right = a + b * c;
      return {
        prompt: `Tính giá trị của biểu thức: ${fmt(a)} + ${b} × ${c} = ?`,
        ...slipOptions(right, [(a + b) * c, a + b + c], { near: [100, -100], min: 1 }),
        hint: 'Trong biểu thức có phép cộng và phép nhân, em làm phép nhân trước.',
        solution: `${fmt(a)} + ${b} × ${c} = ${fmt(a)} + ${fmt(b * c)} = ${fmt(right)}.`,
      };
    }
    const d = int(rand, 11, 25);
    const q = int(rand, 11, 99) * 10;
    const inner = q * d;
    const c = int(rand, 1000, 5000);
    const b = c + inner;
    const a = int(rand, q + 100, q + 5000);
    const right = a - q;
    return {
      prompt: `Tính giá trị của biểu thức: ${fmt(a)} − (${fmt(b)} − ${fmt(c)}) : ${d} = ?`,
      ...slipOptions(right, [a - inner, (a - inner) / d, a - b - Math.floor(c / d)], {
        near: [10, -10],
        min: 1,
      }),
      hint: 'Em làm phép tính trong ngoặc trước, rồi đến phép chia, sau cùng là phép trừ.',
      solution: `${fmt(a)} − (${fmt(b)} − ${fmt(c)}) : ${d} = ${fmt(a)} − ${fmt(inner)} : ${d} = ${fmt(a)} − ${fmt(q)} = ${fmt(right)}.`,
    };
  },
};

/** @type {Skill} */
export const convenient = {
  id: 'thuan-tien',
  label: 'Tính thuận tiện',
  make(rand) {
    const way = int(rand, 0, 2);
    if (way === 0) {
      const a = int(rand, 101, 9999);
      const [x, y] = pick(rand, [
        [25, 4],
        [4, 25],
        [2, 50],
        [50, 2],
        [5, 20],
      ]);
      const right = a * 100;
      return {
        prompt: `Tính bằng cách thuận tiện: ${fmt(a)} × ${x} × ${y} = ?`,
        ...slipOptions(right, [a * 10, a * 1000, a * (x + y)], { near: [] }),
        hint: `Em nhân ${x} với ${y} trước.`,
        solution: `${fmt(a)} × ${x} × ${y} = ${fmt(a)} × (${x} × ${y}) = ${fmt(a)} × 100 = ${fmt(right)}.`,
      };
    }
    if (way === 1) {
      const a = int(rand, 101, 999);
      const b = int(rand, 11, 89);
      const c = 100 - b;
      const right = a * 100;
      return {
        prompt: `Tính bằng cách thuận tiện: ${a} × ${b} + ${a} × ${c} = ?`,
        ...slipOptions(right, [a * 10, a * 1000, a + 100], { near: [] }),
        hint: `Hai tích cùng có thừa số ${a}. Em đưa về ${a} × (${b} + ${c}).`,
        solution: `${a} × ${b} + ${a} × ${c} = ${a} × (${b} + ${c}) = ${a} × 100 = ${fmt(right)}.`,
      };
    }
    const a = int(rand, 11, 89) * 100 + int(rand, 1, 9) * 10;
    const c = int(rand, 11, 89) * 100 + 100 - (a % 100);
    const d = a + c;
    const b = int(rand, 1000, 9999);
    return {
      prompt: `Tính bằng cách thuận tiện: ${fmt(a)} + ${fmt(b)} + ${fmt(c)} − ${fmt(d)} = ?`,
      ...slipOptions(b, [b + d, b - 100, b + 100], { near: [], min: 1 }),
      hint: `Em cộng ${fmt(a)} với ${fmt(c)} trước, rồi so sánh với số bị trừ đi.`,
      solution: `${fmt(a)} + ${fmt(b)} + ${fmt(c)} − ${fmt(d)} = (${fmt(a)} + ${fmt(c)}) + ${fmt(b)} − ${fmt(d)} = ${fmt(d)} − ${fmt(d)} + ${fmt(b)} = ${fmt(b)}.`,
    };
  },
};

/** Sum and difference stories of the book. */
export const SUM_STORIES = /** @type {const} */ ([
  {
    whole: 'Hai xe bồn chở tất cả',
    unit: 'l nước',
    more: 'Xe thứ nhất chở nhiều hơn xe thứ hai',
    big: 'xe thứ nhất',
    small: 'xe thứ hai',
    ask: 'chở bao nhiêu lít nước',
    short: 'l',
    scale: 1000,
  },
  {
    whole: 'Hai thửa ruộng thu hoạch được tất cả',
    unit: 'kg thóc',
    more: 'Thửa thứ nhất thu hoạch được nhiều hơn thửa thứ hai',
    big: 'thửa thứ nhất',
    small: 'thửa thứ hai',
    ask: 'thu hoạch được bao nhiêu ki-lô-gam thóc',
    short: 'kg',
    scale: 100,
  },
  {
    whole: 'Hai lớp góp được tất cả',
    unit: 'quyển sách',
    more: 'Lớp 4A góp được nhiều hơn lớp 4B',
    big: 'lớp 4A',
    small: 'lớp 4B',
    ask: 'góp được bao nhiêu quyển sách',
    short: 'quyển',
    scale: 1,
  },
]);

/**
 * A sum and difference problem: the smaller part is `small`, the larger is
 * `small + diff`.
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
  return {
    prompt: `${story.whole} ${fmt(sum)} ${story.unit}. ${story.more} ${fmt(diff)} ${story.unit}. Hỏi ${name} ${story.ask}?`,
    ...slipOptions(right, [askBig ? small : big, sum - diff, (sum + diff) * 2], {
      near: [diff, -diff],
      min: 1,
      unit: story.short,
    }),
    hint: 'Số lớn = (Tổng + Hiệu) : 2. Số bé = (Tổng − Hiệu) : 2.',
    solution: `Số lớn: (${fmt(sum)} + ${fmt(diff)}) : 2 = ${fmt(big)}. Số bé: ${fmt(big)} − ${fmt(diff)} = ${fmt(small)}. Vậy ${name} ${story.ask.replace(/bao nhiêu .*/, '')}${fmt(right)} ${story.short}.`,
  };
}

/** @type {Skill} */
export const sumDiff = {
  id: 'tong-hieu',
  label: 'Tìm hai số biết tổng và hiệu',
  make(rand) {
    const story = pick(rand, SUM_STORIES);
    const small = int(rand, 11, 99) * story.scale;
    const diff = int(rand, 2, 9) * story.scale;
    return sumDiffStory(story, small, diff, rand() < 0.5);
  },
};

/**
 * A train of `n1 + n2` wagons: `n1` carry `v1` kg each and `n2` carry `v2`
 * kg each. The loads are chosen so that the average is a whole `mean`.
 * @param {number} n1
 * @param {number} n2
 * @param {number} mean
 * @param {number} t how far the loads are from the mean, per wagon of the other group
 * @returns {Question}
 */
export function trainStory(n1, n2, mean, t) {
  const v1 = mean + n2 * t;
  const v2 = mean - n1 * t;
  const total = n1 * v1 + n2 * v2;
  const n = n1 + n2;
  return {
    prompt: `Một đoàn tàu có ${n} toa. ${n1} toa, mỗi toa chở ${fmt(v1)} kg hàng; ${n2} toa, mỗi toa chở ${fmt(v2)} kg hàng. Trung bình mỗi toa chở bao nhiêu ki-lô-gam hàng?`,
    ...slipOptions(mean, [(v1 + v2) / 2, total, mean + t], {
      near: [100, -100],
      min: 1,
      unit: 'kg',
    }),
    hint: `Em tính số hàng của cả ${n} toa, rồi chia cho ${n}.`,
    solution: `${n1} toa chở: ${fmt(v1)} × ${n1} = ${fmt(n1 * v1)} (kg). ${n2} toa chở: ${fmt(v2)} × ${n2} = ${fmt(n2 * v2)} (kg). Trung bình mỗi toa: (${fmt(n1 * v1)} + ${fmt(n2 * v2)}) : ${n} = ${fmt(mean)} (kg).`,
  };
}

/** @type {Skill} */
export const average = {
  id: 'trung-binh',
  label: 'Tìm số trung bình cộng',
  make(rand) {
    const n1 = int(rand, 2, 9);
    const n2 = int(rand, 2, 9);
    return trainStory(n1, n2, int(rand, 100, 160) * 100, int(rand, 1, 2) * 100);
  },
};

/**
 * A trip of `km` km in a car that uses `litres` l of petrol each 100 km, at
 * `price` đồng a litre.
 * @param {number} km a multiple of 100
 * @param {number} litres
 * @param {number} price
 * @returns {Question}
 */
export function fuelStory(km, litres, price) {
  const used = (km / 100) * litres;
  const right = used * price;
  return {
    prompt: `Quãng đường dài ${km} km. Cứ đi 100 km thì xe ô tô dùng hết ${litres} l xăng, giá 1 l xăng là ${fmt(price)} đồng. Cần bao nhiêu tiền mua xăng để đi hết quãng đường đó?`,
    ...slipOptions(right, [litres * price, km * price, used * price * 10], {
      near: [price, -price],
      min: 1,
      unit: 'đồng',
    }),
    hint: `Em tìm số lít xăng cần dùng: ${km} km gấp 100 km mấy lần?`,
    solution: `Số lít xăng: ${litres} × (${km} : 100) = ${used} (l). Số tiền: ${fmt(price)} × ${used} = ${fmt(right)} (đồng).`,
  };
}

/** @type {Skill} */
export const fuel = {
  id: 'bai-toan',
  label: 'Giải bài toán',
  make(rand) {
    return fuelStory(
      int(rand, 2, 5) * 100,
      int(rand, 6, 10),
      int(rand, 20, 26) * 1000 + 100 * int(rand, 0, 9),
    );
  },
};

/** The parts of the review of calculations with natural numbers, in book order. */
export const OPERATION_SKILLS = [
  addSub,
  properties,
  sumDiff,
  average,
  convenient,
  multiply,
  divide,
  orderOfOps,
  fuel,
];
