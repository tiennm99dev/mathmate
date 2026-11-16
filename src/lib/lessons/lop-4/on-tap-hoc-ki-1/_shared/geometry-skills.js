/**
 * The adaptive review of geometry: the kinds of angles (also between the
 * hands of a clock), measuring an angle with a protractor, perpendicular and
 * parallel sides, and the parallelogram and the rhombus. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { KINDS, KIND_NAME, clockAngle, kindOf } from '#lib/core/visuals/protractor.js';
import { SHAPE_NAME, VERTEX_SETS, oppositeSide, sideName, sidesAt } from './shapes.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** Names of an angle: the vertex, then a point on each side. */
const ANGLE_NAMES = /** @type {const} */ ([
  ['O', 'A', 'B'],
  ['O', 'M', 'N'],
  ['E', 'D', 'G'],
  ['B', 'A', 'C'],
]);

/** The four kinds of angles as option texts, in the book's order. */
export const KIND_OPTIONS = KINDS.map((k) => capitalize(KIND_NAME[k]));

/** What tells each kind apart, as the book says it. */
const KIND_WHY =
  /** @type {Record<import('#lib/core/visuals/protractor.js').AngleKind, string>} */ ({
    nhon: 'bé hơn góc vuông',
    vuong: 'đúng bằng góc vuông của ê ke',
    tu: 'lớn hơn góc vuông nhưng bé hơn góc bẹt',
    bet: 'hai cạnh nằm trên cùng một đường thẳng',
  });

/**
 * The kind of an angle as a question.
 * @param {number} m
 * @returns {{ options: string[], answer: number }}
 */
function kindOptions(m) {
  return { options: [...KIND_OPTIONS], answer: KINDS.indexOf(kindOf(m)) };
}

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
      ...kindOptions(m),
      hint: 'Em dùng ê ke để kiểm tra: góc vuông khớp với góc của ê ke. Góc bé hơn là góc nhọn, góc lớn hơn là góc tù. Hai cạnh thẳng hàng là góc bẹt.',
      solution: `Góc này bằng ${m}°, ${KIND_WHY[kind]}. Đó là ${KIND_NAME[kind]}.`,
      visual: { type: 'angle', m, side: rand() < 0.5 ? 'phai' : 'trai', protractor: false, names },
    };
  },
};

/** @type {Skill} */
export const clockHands = {
  id: 'kim-dong-ho',
  label: 'Góc của hai kim đồng hồ',
  make(rand) {
    const h = int(rand, 1, 11);
    const m = clockAngle(h);
    const kind = kindOf(m);
    return {
      prompt: `Đồng hồ chỉ ${h} giờ. Kim giờ và kim phút tạo thành góc gì?`,
      ...kindOptions(m),
      hint: 'Kim phút chỉ số 12. Lúc 3 giờ hai kim tạo thành góc vuông, lúc 6 giờ tạo thành góc bẹt. Em so sánh với hai góc đó.',
      solution: `Lúc ${h} giờ, góc giữa hai kim bằng ${m}°, ${KIND_WHY[kind]}. Đó là ${KIND_NAME[kind]}.`,
      visual: { type: 'clock', minutes: h * 60 },
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
export const perpendicular = {
  id: 'vuong-goc',
  label: 'Hai đường thẳng vuông góc',
  make(rand) {
    const names = pick(rand, VERTEX_SETS);
    const corner = int(rand, 0, 3);
    const [s, t] = sidesAt(corner);
    const pair = (/** @type {number} */ i, /** @type {number} */ j) =>
      `${sideName(names, i)} và ${sideName(names, j)}`;
    return {
      prompt: `Hình chữ nhật ${names.join('')} có bốn góc vuông. Cặp cạnh nào vuông góc với nhau?`,
      ...mixOptions(rand, pair(s, t), [pair(0, 2), pair(1, 3)]),
      hint: 'Hai cạnh vuông góc gặp nhau ở một đỉnh của hình chữ nhật và tạo thành góc vuông. Hai cạnh đối diện thì không gặp nhau.',
      solution: `Góc đỉnh ${names[corner]} là góc vuông, nên ${sideName(names, s)} vuông góc với ${sideName(names, t)}. Các cặp cạnh đối diện song song với nhau.`,
      visual: { type: 'quad', shape: 'chu-nhat', names },
    };
  },
};

/** @type {Skill} */
export const parallel = {
  id: 'song-song',
  label: 'Hai đường thẳng song song',
  make(rand) {
    const names = pick(rand, VERTEX_SETS);
    const shape = pick(rand, /** @type {const} */ (['chu-nhat', 'binh-hanh']));
    const side = int(rand, 0, 3);
    const right = sideName(names, oppositeSide(side));
    const wrong = [0, 1, 2, 3]
      .filter((i) => i !== side && i !== oppositeSide(side))
      .map((i) => sideName(names, i));
    return {
      prompt: `Trong ${SHAPE_NAME[shape]} ${names.join('')}, cạnh nào song song với cạnh ${sideName(names, side)}?`,
      ...mixOptions(rand, right, wrong),
      hint: `${capitalize(SHAPE_NAME[shape])} có hai cặp cạnh đối diện song song. Em tìm cạnh không có đỉnh chung với cạnh ${sideName(names, side)}.`,
      solution: `${sideName(names, side)} và ${right} là hai cạnh đối diện của ${SHAPE_NAME[shape]} ${names.join('')}, nên ${sideName(names, side)} song song với ${right}.`,
      visual: { type: 'quad', shape, names },
    };
  },
};

/** @type {Skill} */
export const shapeName = {
  id: 'hinh',
  label: 'Hình bình hành, hình thoi',
  make(rand) {
    const names = pick(rand, VERTEX_SETS);
    const thoi = rand() < 0.5;
    if (thoi) {
      return {
        prompt: `Hình tứ giác ${names.join('')} là hình gì?`,
        ...mixOptions(rand, 'Hình thoi', ['Hình chữ nhật', 'Hình vuông', 'Hình tam giác']),
        hint: 'Em so sánh độ dài bốn cạnh và xem hình có góc vuông không. Hình có bốn cạnh bằng nhau nhưng không có góc vuông là hình gì?',
        solution: `${names.join('')} có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau, nhưng không có góc vuông. Đó là hình thoi.`,
        visual: { type: 'quad', shape: 'thoi', names },
      };
    }
    return {
      prompt: `Hình tứ giác ${names.join('')} là hình gì?`,
      ...mixOptions(rand, 'Hình bình hành', ['Hình thoi', 'Hình chữ nhật', 'Hình vuông']),
      hint: 'Em xem các cặp cạnh đối diện có song song không, bốn cạnh có bằng nhau không và có góc vuông không.',
      solution: `${names.join('')} có hai cặp cạnh đối diện song song và bằng nhau, nhưng bốn cạnh không bằng nhau và không có góc vuông. Đó là hình bình hành.`,
      visual: { type: 'quad', shape: 'binh-hanh', names },
    };
  },
};

/** @type {Skill} */
export const sideLength = {
  id: 'canh',
  label: 'Cạnh của hình bình hành, hình thoi',
  make(rand) {
    const names = pick(rand, VERTEX_SETS);
    const thoi = rand() < 0.5;
    const word = names.join('');
    if (thoi) {
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

/** The parts of the review of geometry, in book order. */
export const GEOMETRY_SKILLS = [
  angleKind,
  clockHands,
  protractorReading,
  perpendicular,
  parallel,
  shapeName,
  sideLength,
];
