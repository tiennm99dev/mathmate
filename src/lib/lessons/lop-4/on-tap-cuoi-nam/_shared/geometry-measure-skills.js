/**
 * The adaptive review of geometry and measures: the kinds of angles,
 * measuring an angle with a protractor, the sides of a parallelogram and a
 * rhombus, mass in yến, tạ and tấn, time in giờ, phút, giây and centuries,
 * the century of a year, area units, a rice problem with a fraction and
 * tiling a floor. Every amount is held as a whole number of the smaller
 * unit. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { capitalize, mixOptions, slipOptions } from '#lib/core/kid/quiz.js';
import { toRoman } from '#lib/core/kid/whole-numbers.js';
import { fmt } from '#lib/core/number-format.js';
import { KINDS, KIND_NAME, kindOf } from '#lib/core/visuals/protractor.js';
import { fracText, simplest } from './fractions.js';
import { SHAPE_NAME, VERTEX_SETS, oppositeSide, sideName } from './shapes.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** Names of an angle: the vertex, then a point on each side. */
const ANGLE_NAMES = /** @type {const} */ ([
  ['O', 'A', 'B'],
  ['O', 'M', 'N'],
  ['B', 'A', 'C'],
  ['M', 'B', 'C'],
]);

/** What tells each kind of angle apart, as the book says it. */
const KIND_WHY =
  /** @type {Record<import('#lib/core/visuals/protractor.js').AngleKind, string>} */ ({
    nhon: 'bé hơn góc vuông',
    vuong: 'đúng bằng góc vuông của ê ke',
    tu: 'lớn hơn góc vuông nhưng bé hơn góc bẹt',
    bet: 'hai cạnh nằm trên cùng một đường thẳng',
  });

/**
 * A measure for a kind question: often 90° or 180°, else a multiple of 5°
 * well away from 90°, so the picture can be judged by eye or with a set
 * square.
 * @param {() => number} rand
 */
export function kindMeasure(rand) {
  const r = rand();
  if (r < 0.2) return 90;
  if (r < 0.3) return 180;
  return r < 0.65 ? int(rand, 4, 14) * 5 : int(rand, 22, 33) * 5;
}

/** @type {Skill} */
export const angleKind = {
  id: 'loai-goc',
  label: 'Góc nhọn, góc vuông, góc tù, góc bẹt',
  make(rand) {
    const m = kindMeasure(rand);
    const names = pick(rand, ANGLE_NAMES);
    const [o, a, b] = names;
    const kind = kindOf(m);
    return {
      prompt: `Góc đỉnh ${o}; cạnh ${o}${a}, ${o}${b} là góc gì?`,
      options: KINDS.map((k) => capitalize(KIND_NAME[k])),
      answer: KINDS.indexOf(kind),
      hint: 'Em dùng ê ke để kiểm tra: góc vuông khớp với góc của ê ke. Góc bé hơn là góc nhọn, góc lớn hơn là góc tù. Hai cạnh thẳng hàng là góc bẹt.',
      solution: `Góc này bằng ${m}°, ${KIND_WHY[kind]}. Đó là ${KIND_NAME[kind]}.`,
      visual: { type: 'angle', m, side: rand() < 0.5 ? 'phai' : 'trai', protractor: false, names },
    };
  },
};

/**
 * Options for a measure read on a protractor: the right one, the one on the
 * other scale and two near ones, in increasing order.
 * @param {number} m
 */
export function degreeOptions(m) {
  const near = [m + 10, m - 10, m + 20, m - 20].filter(
    (v) => v > 0 && v < 180 && v !== m && v !== 180 - m,
  );
  const wrong = m === 90 ? near.slice(0, 3) : [180 - m, ...near.slice(0, 2)];
  const values = [m, ...wrong].sort((x, y) => x - y);
  return {
    options: values.map((v) => `${v}°`),
    answer: values.indexOf(m),
    optionLabels: values.map((v) => `${v} độ`),
  };
}

/** @type {Skill} */
export const protractorReading = {
  id: 'do-goc',
  label: 'Đo góc bằng thước đo góc',
  make(rand) {
    const m = int(rand, 3, 33) * 5;
    const side = rand() < 0.5 ? 'phai' : 'trai';
    const names = pick(rand, ANGLE_NAMES);
    const [o, a, b] = names;
    const ring = side === 'phai' ? 'trong' : 'ngoài';
    return {
      prompt: `Thước đo góc đặt lên góc đỉnh ${o}; cạnh ${o}${a}, ${o}${b}. Góc này có số đo bao nhiêu độ?`,
      ...degreeOptions(m),
      hint: `Cạnh ${o}${a} đi qua vạch 0 của vòng số ${ring}. Em đọc số ở vòng số ${ring}, chỗ cạnh ${o}${b} đi qua.`,
      solution: `Vạch 0 của vòng số ${ring} nằm trên cạnh ${o}${a}. Cạnh ${o}${b} đi qua vạch ${m} của vòng số đó. Vậy góc đỉnh ${o} bằng ${m}°.`,
      visual: { type: 'angle', m, side, protractor: true, names },
    };
  },
};

/** @type {Skill} */
export const quadSides = {
  id: 'hinh-binh-hanh',
  label: 'Hình bình hành, hình thoi',
  make(rand) {
    const names = pick(rand, VERTEX_SETS);
    const word = names.join('');
    if (rand() < 0.5) {
      const shape = pick(rand, /** @type {const} */ (['binh-hanh', 'thoi']));
      const side = int(rand, 0, 3);
      const right = sideName(names, oppositeSide(side));
      const wrong = [0, 1, 2, 3]
        .filter((i) => i !== side && i !== oppositeSide(side))
        .map((i) => sideName(names, i));
      return {
        prompt: `Trong ${SHAPE_NAME[shape]} ${word}, cạnh nào song song với cạnh ${sideName(names, side)}?`,
        ...mixOptions(rand, right, wrong),
        hint: `${capitalize(SHAPE_NAME[shape])} có hai cặp cạnh đối diện song song. Em tìm cạnh không có đỉnh chung với cạnh ${sideName(names, side)}.`,
        solution: `${sideName(names, side)} và ${right} là hai cạnh đối diện, nên ${sideName(names, side)} song song với ${right}.`,
        visual: { type: 'quad', shape, names },
      };
    }
    if (rand() < 0.5) {
      const asked = int(rand, 1, 3);
      const a = int(rand, 3, 9);
      return {
        prompt: `Hình thoi ${word} có cạnh ${sideName(names, 0)} = ${a} cm. Cạnh ${sideName(names, asked)} dài bao nhiêu xăng-ti-mét?`,
        ...mixOptions(rand, `${a} cm`, [`${a + 1} cm`, `${a * 2} cm`, `${a * 4} cm`]),
        hint: 'Hình thoi có bốn cạnh như thế nào với nhau?',
        solution: `Hình thoi có bốn cạnh bằng nhau. Vậy ${sideName(names, asked)} = ${sideName(names, 0)} = ${a} cm.`,
        visual: { type: 'quad', shape: 'thoi', names },
      };
    }
    const asked = int(rand, 1, 2);
    const long = int(rand, 5, 9);
    const short = int(rand, 2, long - 1);
    const right = asked === 2 ? long : short;
    const other = asked === 2 ? short : long;
    const twin = asked === 2 ? sideName(names, 0) : sideName(names, 3);
    return {
      prompt: `Hình bình hành ${word} có ${sideName(names, 0)} = ${long} cm, ${sideName(names, 3)} = ${short} cm. Cạnh ${sideName(names, asked)} dài bao nhiêu xăng-ti-mét?`,
      ...mixOptions(rand, `${right} cm`, [`${other} cm`, `${long + short} cm`]),
      hint: 'Hình bình hành có hai cặp cạnh đối diện bằng nhau. Em tìm cạnh đối diện với cạnh cần tính.',
      solution: `${sideName(names, asked)} là cạnh đối diện với ${twin}, nên ${sideName(names, asked)} = ${twin} = ${right} cm.`,
      visual: { type: 'quad', shape: 'binh-hanh', names },
    };
  },
};

/**
 * A two-unit conversion: `a big + b small = ? small`, with `ratio` small
 * units in one big unit.
 * @typedef {{ big: string, small: string, ratio: number }} Pair
 */

/** The mass conversions of the book. */
export const MASS_PAIRS = /** @type {const} */ ([
  { big: 'yến', small: 'kg', ratio: 10 },
  { big: 'tạ', small: 'kg', ratio: 100 },
  { big: 'tấn', small: 'kg', ratio: 1000 },
  { big: 'tạ', small: 'yến', ratio: 10 },
  { big: 'tấn', small: 'tạ', ratio: 10 },
  { big: 'tấn', small: 'yến', ratio: 100 },
]);

/** The area conversions of the book. */
export const AREA_PAIRS = /** @type {const} */ ([
  { big: 'cm²', small: 'mm²', ratio: 100 },
  { big: 'dm²', small: 'cm²', ratio: 100 },
  { big: 'm²', small: 'dm²', ratio: 100 },
  { big: 'm²', small: 'cm²', ratio: 10000 },
]);

/**
 * The amount `a big b small` as text: '3 tạ 60 kg', or '4 tấn' when b is 0.
 * @param {Pair} pair
 * @param {number} a
 * @param {number} b
 */
export const amountText = (pair, a, b) =>
  b > 0 ? `${fmt(a)} ${pair.big} ${fmt(b)} ${pair.small}` : `${fmt(a)} ${pair.big}`;

/**
 * Converting `a big b small` to the small unit, the book's "5 m² 52 dm² = ?
 * dm²"; or, with `back`, a whole number of small units to the big unit, the
 * book's "200 cm² = ? dm²".
 * @param {Pair} pair
 * @param {number} a
 * @param {number} b below `pair.ratio`
 * @param {boolean} [back]
 * @returns {Question}
 */
export function convertQuestion(pair, a, b, back = false) {
  const one = `1 ${pair.big} = ${fmt(pair.ratio)} ${pair.small}`;
  if (back) {
    const small = a * pair.ratio;
    return {
      prompt: `${fmt(small)} ${pair.small} = ? ${pair.big}`,
      ...slipOptions(a, [a * 10, small / 10, a * 100], { near: [1, -1], min: 1, unit: pair.big }),
      hint: `Em nhớ: ${one}. Em chia cho ${fmt(pair.ratio)}.`,
      solution: `${one}. ${fmt(small)} : ${fmt(pair.ratio)} = ${a}. Vậy ${fmt(small)} ${pair.small} = ${a} ${pair.big}.`,
    };
  }
  const right = a * pair.ratio + b;
  const slips = [a + b, a * pair.ratio * 10 + b, (a * pair.ratio) / 10 + b];
  const work =
    b > 0
      ? `${fmt(a)} ${pair.big} = ${fmt(a * pair.ratio)} ${pair.small}. ${fmt(a * pair.ratio)} + ${fmt(b)} = ${fmt(right)}.`
      : `${fmt(a)} × ${fmt(pair.ratio)} = ${fmt(right)}.`;
  return {
    prompt: `${amountText(pair, a, b)} = ? ${pair.small}`,
    ...slipOptions(right, slips, { near: [pair.ratio, -pair.ratio], min: 1, unit: pair.small }),
    hint: `Em nhớ: ${one}.`,
    solution: `${one}. ${work} Vậy ${amountText(pair, a, b)} = ${fmt(right)} ${pair.small}.`,
  };
}

/**
 * A part below the ratio, as the book writes amounts: 1 to 9 when the ratio
 * is 10, 1 to 99 when it is 100, and hundreds and tens of kilograms in a
 * tấn.
 * @param {() => number} rand
 * @param {number} ratio
 */
function smallPart(rand, ratio) {
  if (ratio === 10) return int(rand, 1, 9);
  if (ratio === 100) return int(rand, 1, 99);
  return int(rand, 1, 9) * 100 + int(rand, 0, 9) * 10;
}

/** @type {Skill} */
export const massConvert = {
  id: 'khoi-luong',
  label: 'Yến, tạ, tấn',
  make(rand) {
    const pair = pick(rand, MASS_PAIRS);
    if (rand() < 0.25) return convertQuestion(pair, int(rand, 2, 9), 0, true);
    const b = rand() < 0.3 ? 0 : smallPart(rand, pair.ratio);
    return convertQuestion(pair, int(rand, 2, 9), b);
  },
};

/** @type {Skill} */
export const areaConvert = {
  id: 'dien-tich',
  label: 'Đơn vị đo diện tích',
  make(rand) {
    const pair = pick(rand, AREA_PAIRS);
    if (rand() < 0.35) return convertQuestion(pair, int(rand, 2, 99), 0, true);
    const b = rand() < 0.3 || pair.ratio > 100 ? 0 : smallPart(rand, pair.ratio);
    return convertQuestion(pair, int(rand, 2, 25), b);
  },
};

/** Time units of the book: one big unit in small units. */
export const TIME_PAIRS = /** @type {const} */ ([
  { big: 'giờ', small: 'phút', ratio: 60 },
  { big: 'phút', small: 'giây', ratio: 60 },
  { big: 'thế kỉ', small: 'năm', ratio: 100 },
]);

/** @type {Skill} */
export const timeConvert = {
  id: 'thoi-gian',
  label: 'Giờ, phút, giây, thế kỉ',
  make(rand) {
    const pair = pick(rand, TIME_PAIRS);
    const one = `1 ${pair.big} = ${pair.ratio} ${pair.small}`;
    if (rand() < 0.35) {
      const parts = [2, 3, 4, 5, 6, 10].filter((q) => pair.ratio % q === 0);
      const q = pick(rand, parts);
      const right = pair.ratio / q;
      return {
        prompt: `1/${q} ${pair.big} = ? ${pair.small}`,
        ...slipOptions(right, [pair.ratio * q, pair.ratio - right, q * 10], {
          near: [5, -5],
          min: 1,
          unit: pair.small,
        }),
        hint: `Em nhớ: ${one}. Tìm 1/${q} của ${pair.ratio}.`,
        solution: `${one}. ${pair.ratio} : ${q} = ${right}. Vậy 1/${q} ${pair.big} = ${right} ${pair.small}.`,
      };
    }
    const a = int(rand, 2, 12);
    const b = pair.ratio === 100 || rand() < 0.3 ? 0 : int(rand, 1, 59);
    return convertQuestion(pair, a, b);
  },
};

/** Years from the book's history, with what happened. */
const YEARS = /** @type {const} */ ([
  { year: 938, what: 'Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng' },
  { year: 1010, what: 'Lý Công Uẩn dời đô về Thăng Long' },
  { year: 1288, what: 'quân dân nhà Trần thắng trận Bạch Đằng' },
  { year: 1789, what: 'vua Quang Trung đại phá quân Thanh' },
  { year: 1945, what: 'nước Việt Nam Dân chủ Cộng hoà ra đời' },
  { year: 1975, what: 'đất nước ta thống nhất' },
]);

/**
 * The century of a year as options, with the slip of reading its first
 * digits: thế kỉ XIX for 1945.
 * @param {number} year
 */
function centuryOptions(year) {
  const c = Math.ceil(year / 100);
  const values = [...new Set([c - 1, c, c + 1])].sort((x, y) => x - y);
  return {
    c,
    options: values.map((v) => `Thế kỉ ${toRoman(v)}`),
    answer: values.indexOf(c),
    optionLabels: values.map((v) => `Thế kỉ ${v}`),
  };
}

/**
 * The year a mother was born, from her child's age and the age gap, and its
 * century.
 * @param {number} now this year
 * @param {number} age the child's age
 * @param {number} gap how much younger the child is
 * @returns {Question}
 */
export function birthStory(now, age, gap) {
  const mother = age + gap;
  const year = now - mother;
  const { c, ...rest } = centuryOptions(year);
  return {
    prompt: `Năm ${now}, Nam ${age} tuổi, Nam kém mẹ ${gap} tuổi. Năm sinh của mẹ Nam thuộc thế kỉ nào?`,
    ...rest,
    hint: 'Em tìm tuổi mẹ, rồi tìm năm sinh của mẹ. Từ năm 1901 đến năm 2000 là thế kỉ XX.',
    solution: `Tuổi mẹ: ${age} + ${gap} = ${mother} (tuổi). Mẹ sinh năm ${now} − ${mother} = ${year}. Năm ${year} thuộc thế kỉ ${toRoman(c)}.`,
  };
}

/** @type {Skill} */
export const century = {
  id: 'the-ki',
  label: 'Năm thuộc thế kỉ nào',
  make(rand) {
    if (rand() < 0.5) return birthStory(int(rand, 2020, 2026), int(rand, 8, 11), int(rand, 25, 35));
    const { year, what } = pick(rand, YEARS);
    const { c, ...rest } = centuryOptions(year);
    return {
      prompt: `Năm ${year}, ${what}. Năm ${year} thuộc thế kỉ nào?`,
      ...rest,
      hint: 'Thế kỉ I từ năm 1 đến năm 100, thế kỉ II từ năm 101 đến năm 200, ... Em xem năm đó nằm trong khoảng nào.',
      solution: `Thế kỉ ${toRoman(c)} từ năm ${c * 100 - 99} đến năm ${c * 100}. Vậy năm ${year} thuộc thế kỉ ${toRoman(c)}.`,
    };
  },
};

/**
 * A shop with `tons` tấn `kg` kg of plain rice and sticky rice that is the
 * fraction `f` of it.
 * @param {number} tons
 * @param {number} kg
 * @param {import('./visual.js').Frac} f
 * @returns {Question}
 */
export function riceStory(tons, kg, f) {
  const plain = tons * 1000 + kg;
  const sticky = (plain / f.d) * f.n;
  const right = plain + sticky;
  return {
    prompt: `Một cửa hàng có ${tons} tấn ${kg} kg gạo tẻ. Số gạo nếp bằng ${fracText(f)} số gạo tẻ. Cửa hàng có tất cả bao nhiêu ki-lô-gam gạo?`,
    ...slipOptions(right, [sticky, tons + kg + sticky, plain - sticky], {
      near: [100, -100],
      min: 1,
      unit: 'kg',
    }),
    hint: `Em đổi ${tons} tấn ${kg} kg ra ki-lô-gam, rồi tìm ${fracText(f)} của số đó.`,
    solution: `${tons} tấn ${kg} kg = ${fmt(plain)} kg. Gạo nếp: ${fmt(plain)} × ${fracText(f)} = ${fmt(sticky)} (kg). Tất cả: ${fmt(plain)} + ${fmt(sticky)} = ${fmt(right)} (kg).`,
  };
}

/** @type {Skill} */
export const rice = {
  id: 'bai-toan-khoi-luong',
  label: 'Bài toán khối lượng',
  make(rand) {
    for (;;) {
      const f = simplest(rand, 3, 9);
      const tons = int(rand, 1, 3);
      const kg = int(rand, 1, 9) * 10 * f.d;
      if (kg >= 1000 || (tons * 1000 + kg) % f.d !== 0) continue;
      return riceStory(tons, kg, f);
    }
  },
};

/**
 * Square tiles of side `side` cm on a rectangular floor `length` m by
 * `width` m. Both sides of the floor are whole numbers of tiles.
 * @param {number} length
 * @param {number} width
 * @param {number} side
 * @returns {Question}
 */
export function tileStory(length, width, side) {
  const tile = side * side;
  const floor = length * width;
  const right = (floor * 10000) / tile;
  return {
    prompt: `Người ta dùng gạch men hình vuông cạnh ${side} cm để lát nền một phòng hình chữ nhật dài ${length} m, rộng ${width} m. Cần bao nhiêu viên gạch để lát kín nền phòng? (Phần mạch vữa không đáng kể.)`,
    ...slipOptions(right, [(floor * 10000) / side, right * 10, floor], {
      near: [right / 2, -right / 2],
      min: 1,
      unit: 'viên',
    }),
    hint: 'Em tính diện tích một viên gạch và diện tích nền phòng, đổi cùng đơn vị cm², rồi chia.',
    solution: `Một viên gạch: ${side} × ${side} = ${fmt(tile)} (cm²). Nền phòng: ${length} × ${width} = ${floor} (m²) = ${fmt(floor * 10000)} cm². Số viên gạch: ${fmt(floor * 10000)} : ${fmt(tile)} = ${fmt(right)} (viên).`,
  };
}

/** @type {Skill} */
export const tiles = {
  id: 'lat-gach',
  label: 'Bài toán lát gạch',
  make(rand) {
    const side = pick(rand, [20, 25, 40, 50]);
    const per = 100 / side;
    for (;;) {
      const length = int(rand, 4, 9);
      const width = int(rand, 3, length - 1);
      if (Number.isInteger(length * per) && Number.isInteger(width * per)) {
        return tileStory(length, width, side);
      }
    }
  },
};

/** The parts of the review of geometry and measures, in book order. */
export const GEOMETRY_MEASURE_SKILLS = [
  angleKind,
  massConvert,
  protractorReading,
  rice,
  quadSides,
  timeConvert,
  century,
  areaConvert,
  tiles,
];
