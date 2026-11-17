/**
 * The adaptive review of plane shapes: naming a shape, the kinds of
 * triangle, a base and its height, the bases and legs of a trapezoid, the
 * radius and diameter of a circle, whether a point lies inside a circle, and
 * the facts of each shape. Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { num, valueOptions } from './decimals.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */
/** @typedef {import('./visual.js').Shape} Shape */

/**
 * The shapes to name, with the sentence a screen reader hears: what the
 * picture shows, never the name.
 * @type {{ shape: Shape, name: string, alt: string, near: string[] }[]}
 */
export const NAMED_SHAPES = [
  {
    shape: 'tam-giac-nhon',
    name: 'Hình tam giác',
    alt: 'Một hình có ba đỉnh A, B, C và ba cạnh.',
    near: ['Hình thang', 'Hình thoi'],
  },
  {
    shape: 'hinh-thang',
    name: 'Hình thang',
    alt: 'Hình tứ giác ABCD có cạnh AB song song với cạnh DC; hai cạnh AD và BC không song song.',
    near: ['Hình bình hành', 'Hình chữ nhật'],
  },
  {
    shape: 'hinh-binh-hanh',
    name: 'Hình bình hành',
    alt: 'Hình tứ giác ABCD có AB song song và bằng DC, AD song song và bằng BC; không có góc vuông, cạnh AB dài hơn cạnh AD.',
    near: ['Hình thang', 'Hình thoi'],
  },
  {
    shape: 'hinh-thoi',
    name: 'Hình thoi',
    alt: 'Hình tứ giác ABCD có bốn cạnh bằng nhau, hai cặp cạnh đối diện song song, không có góc vuông.',
    near: ['Hình vuông', 'Hình bình hành'],
  },
  {
    shape: 'hinh-chu-nhat',
    name: 'Hình chữ nhật',
    alt: 'Hình tứ giác ABCD có bốn góc vuông, cạnh AB dài hơn cạnh AD.',
    near: ['Hình vuông', 'Hình bình hành'],
  },
  {
    shape: 'hinh-vuong',
    name: 'Hình vuông',
    alt: 'Hình tứ giác ABCD có bốn góc vuông và bốn cạnh bằng nhau.',
    near: ['Hình chữ nhật', 'Hình thoi'],
  },
  {
    shape: 'hinh-tron',
    name: 'Hình tròn',
    alt: 'Một hình có đường bao cong khép kín, mọi điểm trên đó cách đều điểm O ở giữa.',
    near: ['Hình thoi', 'Hình vuông'],
  },
];

const ALL_NAMES = [...new Set(NAMED_SHAPES.map((s) => s.name))];

/** @type {Skill} */
export const nameSkill = {
  id: 'ten-hinh',
  label: 'Nhận biết hình',
  make(rand) {
    const s = pick(rand, NAMED_SHAPES);
    const others = shuffle(
      rand,
      ALL_NAMES.filter((n) => n !== s.name && !s.near.includes(n)),
    );
    const names =
      s.shape === 'hinh-tron'
        ? ['O']
        : s.shape === 'tam-giac-nhon'
          ? ['A', 'B', 'C']
          : ['A', 'B', 'C', 'D'];
    return {
      prompt: 'Hình dưới đây là hình gì?',
      ...mixOptions(rand, s.name, [...s.near, others[0]]),
      hint: 'Em đếm số cạnh, xem các cạnh nào song song, các cạnh có bằng nhau không và có góc vuông không.',
      solution: `${s.alt} Đó là ${s.name.toLowerCase()}.`,
      visual: { type: 'figure', shape: s.shape, names, alt: s.alt },
    };
  },
};

/** @type {{ shape: Shape, name: string, alt: string, why: string }[]} */
const TRIANGLES = [
  {
    shape: 'tam-giac-nhon',
    name: 'Tam giác nhọn',
    alt: 'Tam giác ABC có ba góc đều hẹp hơn góc vuông.',
    why: 'Tam giác có ba góc nhọn là tam giác nhọn.',
  },
  {
    shape: 'tam-giac-vuong',
    name: 'Tam giác vuông',
    alt: 'Tam giác ABC có kí hiệu góc vuông ở đỉnh B.',
    why: 'Tam giác có một góc vuông là tam giác vuông.',
  },
  {
    shape: 'tam-giac-tu',
    name: 'Tam giác tù',
    alt: 'Tam giác ABC có góc ở đỉnh C mở rộng hơn góc vuông.',
    why: 'Tam giác có một góc tù là tam giác tù.',
  },
];

/** @type {Skill} */
export const triangleKindSkill = {
  id: 'loai-tam-giac',
  label: 'Tam giác nhọn, vuông, tù',
  make(rand) {
    const t = pick(rand, TRIANGLES);
    return {
      prompt: 'Tam giác ABC là tam giác gì?',
      ...mixOptions(
        rand,
        t.name,
        TRIANGLES.filter((x) => x !== t).map((x) => x.name),
      ),
      hint: 'Em nhìn ba góc của tam giác: có góc nào vuông hay rộng hơn góc vuông không?',
      solution: `${t.alt} ${t.why}`,
      visual: { type: 'figure', shape: t.shape, names: ['A', 'B', 'C'], alt: t.alt },
    };
  },
};

const NAME_SETS = /** @type {const} */ ([
  ['A', 'B', 'C', 'H'],
  ['M', 'N', 'P', 'Q'],
  ['D', 'E', 'G', 'K'],
]);

/** @type {Skill} */
export const heightSkill = {
  id: 'day-chieu-cao',
  label: 'Đáy và chiều cao của tam giác',
  make(rand) {
    const [a, b, c, h] = pick(rand, NAME_SETS);
    if (rand() < 0.6) {
      const right = `${b}${c}`;
      return {
        prompt: `${a}${h} là chiều cao của tam giác ${a}${b}${c}. Chiều cao ${a}${h} ứng với đáy nào?`,
        ...mixOptions(rand, right, [`${a}${b}`, `${a}${c}`, `${b}${h}`]),
        hint: `Chiều cao đi từ một đỉnh và vuông góc với cạnh đối diện đỉnh đó.`,
        solution: `${a}${h} đi từ đỉnh ${a} và vuông góc với cạnh ${right}. Vậy ${a}${h} là chiều cao ứng với đáy ${right}.`,
        visual: {
          type: 'height',
          variant: 'nhon',
          names: [a, b, c, h],
          alt: `Tam giác ${a}${b}${c}, đoạn nét đứt ${a}${h} đi từ đỉnh ${a} xuống cạnh ${b}${c}, có kí hiệu góc vuông ở ${h}.`,
        },
      };
    }
    const right = `${a}${b}`;
    return {
      prompt: `Tam giác ${a}${b}${c} vuông tại ${b}. Chiều cao ứng với đáy ${b}${c} là đoạn nào?`,
      ...mixOptions(rand, right, [`${a}${c}`, `${b}${c}`]),
      hint: `Chiều cao ứng với đáy ${b}${c} đi từ đỉnh ${a} và vuông góc với ${b}${c}.`,
      solution: `Cạnh ${a}${b} đi từ đỉnh ${a} và vuông góc với ${b}${c} tại ${b}. Vậy chiều cao ứng với đáy ${b}${c} là ${right}.`,
      visual: {
        type: 'height',
        variant: 'vuong',
        names: [a, b, c],
        alt: `Tam giác ${a}${b}${c} có kí hiệu góc vuông ở đỉnh ${b}.`,
      },
    };
  },
};

const QUAD_NAMES = /** @type {const} */ ([
  ['A', 'B', 'C', 'D'],
  ['M', 'N', 'P', 'Q'],
  ['E', 'G', 'H', 'K'],
]);

/** @type {Skill} */
export const trapezoidSkill = {
  id: 'hinh-thang',
  label: 'Hình thang, hình thang vuông',
  make(rand) {
    const [a, b, c, d] = pick(rand, QUAD_NAMES);
    const name = `${a}${b}${c}${d}`;
    if (rand() < 0.5) {
      const right = `${a}${b} và ${d}${c}`;
      return {
        prompt: `Hình thang ${name} có hai cạnh đáy là hai cạnh nào?`,
        ...mixOptions(rand, right, [
          `${a}${d} và ${b}${c}`,
          `${a}${b} và ${a}${d}`,
          `${a}${c} và ${b}${d}`,
        ]),
        hint: 'Hai cạnh đáy của hình thang là hai cạnh đối diện song song với nhau.',
        solution: `${a}${b} song song với ${d}${c}. Hình thang ${name} có hai cạnh đáy ${right}, hai cạnh bên ${a}${d} và ${b}${c}.`,
        visual: {
          type: 'figure',
          shape: 'hinh-thang',
          names: [a, b, c, d],
          alt: `Hình thang ${name} có cạnh ${a}${b} ở trên song song với cạnh ${d}${c} ở dưới.`,
        },
      };
    }
    const right = `${a}${d}`;
    return {
      prompt: `${name} là hình thang vuông. Cạnh bên nào vuông góc với hai đáy?`,
      ...mixOptions(rand, right, [`${b}${c}`, `${a}${b}`, `${d}${c}`]),
      hint: 'Em tìm cạnh bên có kí hiệu góc vuông ở cả hai đầu.',
      solution: `Hai đáy là ${a}${b} và ${d}${c}. Cạnh bên ${right} có góc vuông ở ${a} và ở ${d}, nên ${right} vuông góc với hai đáy.`,
      visual: {
        type: 'figure',
        shape: 'hinh-thang-vuong',
        names: [a, b, c, d],
        alt: `Hình thang ${name} có hai đáy ${a}${b} và ${d}${c}, có kí hiệu góc vuông ở đỉnh ${a} và đỉnh ${d}.`,
      },
    };
  },
};

/** @type {Skill} */
export const radiusSkill = {
  id: 'ban-kinh-duong-kinh',
  label: 'Bán kính và đường kính',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const r = rand() < 0.3 ? int(rand, 11, 49) / 10 : int(rand, 2, 30);
    const fromRadius = rand() < 0.5;
    const given = fromRadius ? r : r * 2;
    const right = fromRadius ? r * 2 : r;
    const label = `${num(given)} ${unit}`;
    return {
      prompt: fromRadius
        ? `Hình tròn tâm O có bán kính ${label}. Đường kính của hình tròn dài bao nhiêu?`
        : `Hình tròn tâm O có đường kính ${label}. Bán kính của hình tròn dài bao nhiêu?`,
      ...valueOptions(right, [given, fromRadius ? r * 4 : r / 2], { near: [1, 2], unit }),
      hint: 'Trong một hình tròn, đường kính dài gấp 2 lần bán kính.',
      solution: fromRadius
        ? `Đường kính = bán kính × 2 = ${num(r)} × 2 = ${num(right)} (${unit}).`
        : `Bán kính = đường kính : 2 = ${num(given)} : 2 = ${num(right)} (${unit}).`,
      visual: {
        type: 'measured',
        shape: fromRadius ? 'ban-kinh' : 'duong-kinh',
        labels: [label],
        alt: fromRadius
          ? `Hình tròn tâm O, bán kính vẽ từ O dài ${label}.`
          : `Hình tròn tâm O, đường kính đi qua O dài ${label}.`,
      },
    };
  },
};

/** @type {Skill} */
export const insideSkill = {
  id: 'trong-hinh-tron',
  label: 'Điểm ở trong hình tròn',
  make(rand) {
    const r = pick(rand, [20, 25, 30, 40, 50]);
    const d = r + pick(rand, [-10, -5, -3, 3, 5, 10]);
    const inside = d < r;
    return {
      prompt: `Một trạm phát sóng đặt ở điểm O, phủ sóng một hình tròn tâm O bán kính ${r} m. Bạn Rô-bốt đứng ở điểm E cách O ${d} m. Rô-bốt có nhận được sóng không?`,
      options: ['Có', 'Không'],
      answer: inside ? 0 : 1,
      hint: 'Điểm nằm trong hình tròn khi khoảng cách từ điểm đó đến tâm bé hơn bán kính.',
      solution: inside
        ? `OE = ${d} m < ${r} m, nên E nằm trong hình tròn. Rô-bốt nhận được sóng.`
        : `OE = ${d} m > ${r} m, nên E nằm ngoài hình tròn. Rô-bốt không nhận được sóng.`,
    };
  },
};

/** Facts of the shapes, each with its answer and wrong answers. */
const FACTS = [
  {
    prompt: 'Hình tam giác có ba cạnh bằng nhau gọi là hình gì?',
    right: 'Tam giác đều',
    wrong: ['Tam giác vuông', 'Tam giác tù'],
    solution: 'Tam giác có ba cạnh bằng nhau là tam giác đều.',
  },
  {
    prompt: 'Hình tứ giác có đúng một cặp cạnh đối diện song song là hình gì?',
    right: 'Hình thang',
    wrong: ['Hình bình hành', 'Hình thoi', 'Hình chữ nhật'],
    solution: 'Hình thang có một cặp cạnh đối diện song song, đó là hai đáy.',
  },
  {
    prompt: 'Hình thang có một cạnh bên vuông góc với hai đáy gọi là hình gì?',
    right: 'Hình thang vuông',
    wrong: ['Hình chữ nhật', 'Hình vuông', 'Tam giác vuông'],
    solution: 'Hình thang có một cạnh bên vuông góc với hai đáy gọi là hình thang vuông.',
  },
  {
    prompt: 'Đường kính của một hình tròn dài gấp mấy lần bán kính?',
    right: '2 lần',
    wrong: ['3 lần', '4 lần', 'Bằng nhau'],
    solution: 'Đường kính dài gấp 2 lần bán kính.',
  },
  {
    prompt: 'Hình bình hành có mấy cặp cạnh đối diện song song?',
    right: '2 cặp',
    wrong: ['1 cặp', '3 cặp', '4 cặp'],
    solution: 'Hình bình hành có 2 cặp cạnh đối diện song song và bằng nhau.',
  },
  {
    prompt: 'Hình thoi có bốn cạnh như thế nào?',
    right: 'Bốn cạnh bằng nhau',
    wrong: ['Chỉ hai cạnh bằng nhau', 'Bốn cạnh khác nhau'],
    solution: 'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
  },
  {
    prompt: 'Trong một hình tròn, các bán kính có độ dài như thế nào?',
    right: 'Bằng nhau',
    wrong: ['Khác nhau', 'Bằng đường kính'],
    solution: 'Tất cả các bán kính của một hình tròn đều bằng nhau.',
  },
];

/** @type {Skill} */
export const factSkill = {
  id: 'dac-diem',
  label: 'Đặc điểm của các hình',
  make(rand) {
    const f = pick(rand, FACTS);
    return {
      prompt: f.prompt,
      ...mixOptions(rand, f.right, f.wrong),
      hint: 'Em nhớ lại cạnh, góc và các cạnh song song của từng hình.',
      solution: f.solution,
    };
  },
};

/** The parts of the plane shapes review, in book order. */
export const SHAPE_SKILLS = [
  nameSkill,
  triangleKindSkill,
  heightSkill,
  trapezoidSkill,
  radiusSkill,
  insideSkill,
  factSkill,
];
