/**
 * The mixed practice of the chapter "Diện tích và thể tích của một số hình
 * khối": the lateral and total area of a box and of a cube, the volume of a
 * box and of a cube, measures in two units, boxes packed in a crate and the
 * wood left after a cube is cut away. One question of each part in a
 * shuffled order, the wrong options being the slips children make. Pure and
 * DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt } from '#lib/core/number-format.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import { boxAreas, boxVolume, cubeAreas } from '../_shared/measures.js';

/**
 * What the widget draws above a question: a box with its measures written
 * beside the edges (null leaves an edge bare).
 * @typedef {{ a: number, b: number, c: number, labels: (string | null)[], name: string }} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'sxq-hop': 'Diện tích xung quanh hình hộp chữ nhật',
  'stp-hop': 'Diện tích toàn phần hình hộp chữ nhật',
  'dien-tich-lp': 'Diện tích xung quanh, toàn phần hình lập phương',
  'the-tich-hop': 'Thể tích hình hộp chữ nhật',
  'the-tich-lp': 'Thể tích hình lập phương',
  'doi-don-vi': 'Đổi về cùng đơn vị đo rồi tính thể tích',
  'xep-hop': 'Xếp hộp vào thùng',
  'phan-con-lai': 'Thể tích phần còn lại',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** Wrong options near the answer when the slips are too few. */
const NEAR = [10, -10, 20, -20, 2, -2];

/**
 * The drawing of a box with each edge labelled in one unit.
 * @param {number} a @param {number} b @param {number} c
 * @param {string} unit
 * @param {string} name
 * @returns {Visual}
 */
const boxVisual = (a, b, c, unit, name) => ({
  a,
  b,
  c,
  labels: [`${fmt(a)} ${unit}`, `${fmt(b)} ${unit}`, `${fmt(c)} ${unit}`],
  name,
});

/**
 * The drawing of a cube with one edge labelled.
 * @param {number} a
 * @param {string} unit
 * @returns {Visual}
 */
const cubeVisual = (a, unit) => ({
  a: 1,
  b: 1,
  c: 1,
  labels: [`${fmt(a)} ${unit}`, null, null],
  name: `Hình lập phương cạnh ${fmt(a)} ${unit}`,
});

/**
 * Length, width and height of a box: the length the longest side.
 * @param {() => number} rand
 */
function boxSize(rand) {
  const a = int(rand, 5, 12);
  return { a, b: int(rand, 2, a - 1), c: int(rand, 2, 9) };
}

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'sxq-hop'(rand) {
    const { a, b, c } = boxSize(rand);
    const s = boxAreas(a, b, c);
    return {
      prompt: `Hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm. Diện tích xung quanh là bao nhiêu?`,
      ...slipOptions(s.lateral, [(a + b) * c, s.total, a * b * c], {
        near: NEAR,
        min: 1,
        unit: 'cm²',
      }),
      hint: 'Diện tích xung quanh = chu vi mặt đáy × chiều cao.',
      solution: `Chu vi mặt đáy: ${s.steps.perimeter} (cm). Diện tích xung quanh: ${s.steps.lateral} (cm²).`,
      visual: boxVisual(a, b, c, 'cm', 'Hình hộp chữ nhật'),
    };
  },
  'stp-hop'(rand) {
    const { a, b, c } = boxSize(rand);
    const s = boxAreas(a, b, c);
    return {
      prompt: `Hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm. Diện tích toàn phần là bao nhiêu?`,
      ...slipOptions(s.total, [s.lateral, s.lateral + s.base, a * b * c], {
        near: NEAR,
        min: 1,
        unit: 'cm²',
      }),
      hint: 'Diện tích toàn phần = diện tích xung quanh + diện tích hai đáy.',
      solution: `Chu vi mặt đáy: ${s.steps.perimeter} (cm). Diện tích xung quanh: ${s.steps.lateral} (cm²). Diện tích một đáy: ${s.steps.base} (cm²). Diện tích toàn phần: ${s.steps.total} (cm²).`,
      visual: boxVisual(a, b, c, 'cm', 'Hình hộp chữ nhật'),
    };
  },
  'dien-tich-lp'(rand) {
    const a = int(rand, 2, 12);
    const s = cubeAreas(a);
    const lateral = rand() < 0.5;
    const right = lateral ? s.lateral : s.total;
    return {
      prompt: `Hình lập phương cạnh ${a} dm. Diện tích ${lateral ? 'xung quanh' : 'toàn phần'} là bao nhiêu?`,
      ...slipOptions(right, [lateral ? s.total : s.lateral, s.face, a * 4, a * a * a], {
        near: NEAR,
        min: 1,
        unit: 'dm²',
      }),
      hint: lateral
        ? 'Diện tích xung quanh = diện tích một mặt × 4.'
        : 'Diện tích toàn phần = diện tích một mặt × 6.',
      solution: `Diện tích một mặt: ${s.steps.face} (dm²). Diện tích ${lateral ? 'xung quanh' : 'toàn phần'}: ${lateral ? s.steps.lateral : s.steps.total} (dm²).`,
      visual: cubeVisual(a, 'dm'),
    };
  },
  'the-tich-hop'(rand) {
    const { a, b, c } = boxSize(rand);
    const v = boxVolume(a, b, c);
    return {
      prompt: `Hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm. Thể tích là bao nhiêu?`,
      ...slipOptions(v.volume, [v.layer, boxAreas(a, b, c).lateral, (a + b) * c], {
        near: NEAR,
        min: 1,
        unit: 'cm³',
      }),
      hint: 'Thể tích = chiều dài × chiều rộng × chiều cao.',
      solution: `Thể tích hình hộp chữ nhật là: ${v.steps.volume} (cm³).`,
      visual: boxVisual(a, b, c, 'cm', 'Hình hộp chữ nhật'),
    };
  },
  'the-tich-lp'(rand) {
    const a = int(rand, 2, 12);
    const v = a * a * a;
    return {
      prompt: `Hình lập phương cạnh ${a} cm. Thể tích là bao nhiêu?`,
      ...slipOptions(v, [a * a, a * a * 6, a * 3, a * a * 4], { near: NEAR, min: 1, unit: 'cm³' }),
      hint: 'Thể tích hình lập phương = cạnh × cạnh × cạnh.',
      solution: `Thể tích hình lập phương là: ${a} × ${a} × ${a} = ${fmt(v)} (cm³).`,
      visual: cubeVisual(a, 'cm'),
    };
  },
  'doi-don-vi'(rand) {
    const m = int(rand, 1, 3);
    const a = m * 10;
    const b = int(rand, 3, 9);
    const c = int(rand, 2, 9);
    const v = boxVolume(a, b, c);
    return {
      prompt: `Hình hộp chữ nhật dài ${m} m, rộng ${b} dm, cao ${c} dm. Thể tích là bao nhiêu đề-xi-mét khối?`,
      ...slipOptions(v.volume, [m * b * c, v.volume * 10, v.volume / 10], {
        near: NEAR,
        min: 1,
        unit: 'dm³',
      }),
      hint: 'Đổi chiều dài ra đề-xi-mét trước: 1 m = 10 dm.',
      solution: `${m} m = ${a} dm. Thể tích hình hộp chữ nhật là: ${v.steps.volume} (dm³).`,
      visual: {
        a,
        b,
        c,
        labels: [`${m} m`, `${b} dm`, `${c} dm`],
        name: 'Hình hộp chữ nhật',
      },
    };
  },
  'xep-hop'(rand) {
    const e = pick(rand, [2, 3, 5]);
    const n = [int(rand, 2, 4), int(rand, 1, 3), int(rand, 1, 3)];
    const left = n.map(() => (e > 2 && rand() < 0.5 ? int(rand, 1, e - 1) : 0));
    if (n[1] * e + left[1] > n[0] * e + left[0]) {
      // The length of the crate is its longer bottom side.
      [n[0], n[1]] = [n[1], n[0]];
      [left[0], left[1]] = [left[1], left[0]];
    }
    const [x, y, z] = n.map((k, i) => k * e + left[i]);
    const right = n[0] * n[1] * n[2];
    const byVolume = Math.floor((x * y * z) / (e * e * e));
    const along = ['Chiều dài', 'Chiều rộng', 'Chiều cao'].map((name, i) => {
      const d = [x, y, z][i];
      const rest = left[i] ? ` (dư ${left[i]})` : '';
      return `${name}: ${d} : ${e} = ${n[i]}${rest}.`;
    });
    return {
      prompt: `Thùng dài ${x} dm, rộng ${y} dm, cao ${z} dm. Xếp được nhiều nhất bao nhiêu hộp hình lập phương cạnh ${e} dm?`,
      ...slipOptions(right, [byVolume, x * y * z, n[0] * n[1], right * 2], {
        near: [1, -1, 2],
        min: 1,
        unit: 'hộp',
      }),
      hint: 'Mỗi chiều của thùng xếp được mấy hộp? Phần dư không đủ một hộp thì bỏ đi.',
      solution: `${along.join(' ')} Số hộp: ${n[0]} × ${n[1]} × ${n[2]} = ${right} (hộp).`,
      visual: boxVisual(x, y, z, 'dm', 'Thùng'),
    };
  },
  'phan-con-lai'(rand) {
    const a = int(rand, 4, 8);
    const b = int(rand, 3, a);
    const c = int(rand, 3, 6);
    const e = int(rand, 2, Math.min(b, c) - 1);
    const whole = a * b * c;
    const cube = e * e * e;
    const right = whole - cube;
    return {
      prompt: `Khối gỗ dài ${a} dm, rộng ${b} dm, cao ${c} dm. Bác thợ cắt đi một khối lập phương cạnh ${e} dm. Phần gỗ còn lại có thể tích bao nhiêu?`,
      ...slipOptions(right, [whole, whole + cube, whole - e * e, whole - e], {
        near: NEAR,
        min: 1,
        unit: 'dm³',
      }),
      hint: 'Lấy thể tích khối gỗ trừ đi thể tích khối lập phương cắt đi.',
      solution: `Khối gỗ: ${a} × ${b} × ${c} = ${fmt(whole)} (dm³). Khối cắt đi: ${e} × ${e} × ${e} = ${fmt(cube)} (dm³). Phần còn lại: ${fmt(whole)} − ${fmt(cube)} = ${fmt(right)} (dm³).`,
      visual: boxVisual(a, b, c, 'dm', 'Khối gỗ'),
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
