/**
 * The adaptive review of geometry at the end of grade 5: naming triangles and
 * quadrilaterals, the area of a triangle and a trapezoid, the circumference
 * and area of a circle (π taken as 3,14, as in the book), the lateral and
 * total area of a box and a cube, and their volumes. Each question draws its
 * shape with the givens. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { tidy } from '#lib/core/number-format.js';
import { num, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** The value of π the book uses. */
export const PI = 3.14;

/** The shapes a child names, with their names. */
const NAMES = /** @type {const} */ ({
  'tam-giac-nhon': 'Hình tam giác nhọn',
  'tam-giac-vuong': 'Hình tam giác vuông',
  'tam-giac-tu': 'Hình tam giác tù',
  'hinh-thang': 'Hình thang',
  'hinh-binh-hanh': 'Hình bình hành',
  'hinh-thoi': 'Hình thoi',
});

/** What tells each shape apart, said once the question ends. */
const WHY = /** @type {const} */ ({
  'tam-giac-nhon': 'Hình tam giác này có ba góc nhọn.',
  'tam-giac-vuong': 'Hình tam giác này có một góc vuông.',
  'tam-giac-tu': 'Hình tam giác này có một góc tù.',
  'hinh-thang': 'Hình này có bốn cạnh, trong đó có đúng một cặp cạnh đối diện song song.',
  'hinh-binh-hanh': 'Hình này có hai cặp cạnh đối diện song song và bằng nhau.',
  'hinh-thoi': 'Hình này có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
});

/** @type {Skill} */
export const nameSkill = {
  id: 'nhan-dang-hinh',
  label: 'Nhận dạng hình',
  make(rand) {
    const shape = pick(rand, /** @type {(keyof typeof NAMES)[]} */ (Object.keys(NAMES)));
    const triangle = shape.startsWith('tam-giac');
    const family = /** @type {(keyof typeof NAMES)[]} */ (Object.keys(NAMES)).filter(
      (k) => k !== shape && k.startsWith('tam-giac') === triangle,
    );
    return {
      prompt: 'Hình dưới đây là hình gì?',
      ...mixOptions(
        rand,
        NAMES[shape],
        family.map((k) => NAMES[k]),
      ),
      hint: triangle
        ? 'Em nhìn các góc của hình tam giác: có góc vuông, góc tù hay cả ba góc đều nhọn?'
        : 'Em đếm số cặp cạnh đối diện song song, rồi xem các cạnh có bằng nhau không.',
      solution: `${WHY[shape]} Đó là ${NAMES[shape].toLowerCase()}.`,
      visual: { type: 'figure', shape, alt: 'Một hình phẳng cần gọi tên.' },
    };
  },
};

/** @type {Skill} */
export const triangleSkill = {
  id: 'dien-tich-tam-giac',
  label: 'Diện tích hình tam giác',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const a = int(rand, 4, 24);
    const h = int(rand, 3, 15);
    const right = tidy((a * h) / 2, 6);
    return {
      prompt: `Hình tam giác có độ dài đáy ${a} ${unit}, chiều cao ${h} ${unit}. Tính diện tích hình tam giác.`,
      ...valueOptions(right, [a * h, a + h, (a + h) * 2], { near: [1, 2], unit: `${unit}²` }),
      hint: 'Diện tích hình tam giác bằng độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2.',
      solution: `S = ${a} × ${h} : 2 = ${num(right)} (${unit}²).`,
      visual: {
        type: 'measured',
        shape: 'tam-giac',
        labels: [`${a} ${unit}`, `${h} ${unit}`],
        alt: `Hình tam giác có đáy ${a} ${unit}, chiều cao ${h} ${unit}.`,
      },
    };
  },
};

/** @type {Skill} */
export const trapezoidSkill = {
  id: 'dien-tich-hinh-thang',
  label: 'Diện tích hình thang',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const a = int(rand, 10, 40);
    const b = int(rand, 4, a - 3);
    const h = int(rand, 3, 20);
    const right = tidy(((a + b) * h) / 2, 6);
    return {
      prompt: `Hình thang có đáy lớn ${a} ${unit}, đáy bé ${b} ${unit}, chiều cao ${h} ${unit}. Tính diện tích hình thang.`,
      ...valueOptions(right, [(a + b) * h, (a * h) / 2, ((a - b) * h) / 2], {
        near: [1, 2],
        unit: `${unit}²`,
      }),
      hint: 'Diện tích hình thang bằng tổng độ dài hai đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2.',
      solution: `S = (${a} + ${b}) × ${h} : 2 = ${num(right)} (${unit}²).`,
      visual: {
        type: 'measured',
        shape: 'hinh-thang',
        labels: [`${a} ${unit}`, `${b} ${unit}`, `${h} ${unit}`],
        alt: `Hình thang có đáy lớn ${a} ${unit}, đáy bé ${b} ${unit}, chiều cao ${h} ${unit}.`,
      },
    };
  },
};

/** @type {Skill} */
export const circumferenceSkill = {
  id: 'chu-vi-hinh-tron',
  label: 'Chu vi hình tròn',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const byDiameter = rand() < 0.5;
    const r = int(rand, 2, 15);
    const d = r * 2;
    const right = tidy(d * PI, 6);
    const given = byDiameter ? d : r;
    return {
      prompt: `Tính chu vi hình tròn có ${byDiameter ? 'đường kính' : 'bán kính'} ${given} ${unit}.`,
      ...valueOptions(right, [tidy(r * PI, 6), tidy(r * r * PI, 6), tidy(d * 4 * PI, 6)], {
        unit,
      }),
      hint: byDiameter
        ? 'Chu vi hình tròn bằng đường kính nhân với 3,14.'
        : 'Chu vi hình tròn bằng bán kính nhân với 2 rồi nhân với 3,14.',
      solution: byDiameter
        ? `C = ${d} × 3,14 = ${num(right)} (${unit}).`
        : `C = ${r} × 2 × 3,14 = ${num(right)} (${unit}).`,
      visual: {
        type: 'measured',
        shape: byDiameter ? 'duong-kinh' : 'ban-kinh',
        labels: [`${given} ${unit}`],
        alt: `Hình tròn tâm O có ${byDiameter ? 'đường kính' : 'bán kính'} ${given} ${unit}.`,
      },
    };
  },
};

/** @type {Skill} */
export const circleAreaSkill = {
  id: 'dien-tich-hinh-tron',
  label: 'Diện tích hình tròn',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const r = int(rand, 2, 12);
    const right = tidy(r * r * PI, 6);
    return {
      prompt: `Tính diện tích hình tròn có bán kính ${r} ${unit}.`,
      ...valueOptions(right, [tidy(r * 2 * PI, 6), tidy(r * 2 * r * 2 * PI, 6), tidy(r * PI, 6)], {
        unit: `${unit}²`,
      }),
      hint: 'Diện tích hình tròn bằng bán kính nhân với bán kính rồi nhân với 3,14.',
      solution: `S = ${r} × ${r} × 3,14 = ${num(right)} (${unit}²).`,
      visual: {
        type: 'measured',
        shape: 'ban-kinh',
        labels: [`${r} ${unit}`],
        alt: `Hình tròn tâm O có bán kính ${r} ${unit}.`,
      },
    };
  },
};

/**
 * The three edges of a box: length, width and height, all different.
 * @param {() => number} rand
 */
function boxEdges(rand) {
  const a = int(rand, 6, 15);
  const b = int(rand, 3, a - 2);
  let c = int(rand, 2, 12);
  if (c === a || c === b) c += 1;
  return { a, b, c };
}

/** @type {Skill} */
export const boxAreaSkill = {
  id: 'dien-tich-hinh-hop',
  label: 'Diện tích xung quanh, toàn phần hình hộp chữ nhật',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const { a, b, c } = boxEdges(rand);
    const side = (a + b) * 2 * c;
    const base = a * b;
    const total = rand() < 0.5;
    const right = total ? side + base * 2 : side;
    return {
      prompt: `Hình hộp chữ nhật có chiều dài ${a} ${unit}, chiều rộng ${b} ${unit}, chiều cao ${c} ${unit}. Tính diện tích ${total ? 'toàn phần' : 'xung quanh'}.`,
      ...valueOptions(
        right,
        total ? [side, side + base, a * b * c] : [side + base * 2, (a + b) * c, a * b * c],
        {
          unit: `${unit}²`,
        },
      ),
      hint: total
        ? 'Diện tích toàn phần bằng diện tích xung quanh cộng với diện tích hai đáy.'
        : 'Diện tích xung quanh bằng chu vi mặt đáy nhân với chiều cao (cùng đơn vị đo).',
      solution: total
        ? `Diện tích xung quanh: (${a} + ${b}) × 2 × ${c} = ${num(side)} (${unit}²). Diện tích toàn phần: ${num(side)} + ${a} × ${b} × 2 = ${num(right)} (${unit}²).`
        : `Diện tích xung quanh: (${a} + ${b}) × 2 × ${c} = ${num(right)} (${unit}²).`,
      visual: {
        type: 'solid',
        shape: 'hop',
        labels: [`${a} ${unit}`, `${b} ${unit}`, `${c} ${unit}`],
        alt: `Hình hộp chữ nhật dài ${a} ${unit}, rộng ${b} ${unit}, cao ${c} ${unit}.`,
      },
    };
  },
};

/** @type {Skill} */
export const cubeAreaSkill = {
  id: 'dien-tich-hinh-lap-phuong',
  label: 'Diện tích xung quanh, toàn phần hình lập phương',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const a = int(rand, 2, 12);
    const face = a * a;
    const total = rand() < 0.5;
    const right = face * (total ? 6 : 4);
    return {
      prompt: `Hình lập phương có cạnh ${a} ${unit}. Tính diện tích ${total ? 'toàn phần' : 'xung quanh'}.`,
      ...valueOptions(right, [face * (total ? 4 : 6), face, a * a * a, a * 4], {
        unit: `${unit}²`,
      }),
      hint: total
        ? 'Hình lập phương có 6 mặt là các hình vuông bằng nhau.'
        : 'Diện tích xung quanh hình lập phương là diện tích 4 mặt bên.',
      solution: `Diện tích một mặt: ${a} × ${a} = ${face} (${unit}²). Diện tích ${total ? 'toàn phần' : 'xung quanh'}: ${face} × ${total ? 6 : 4} = ${num(right)} (${unit}²).`,
      visual: {
        type: 'solid',
        shape: 'lap-phuong',
        labels: [`${a} ${unit}`],
        alt: `Hình lập phương cạnh ${a} ${unit}.`,
      },
    };
  },
};

/** @type {Skill} */
export const volumeSkill = {
  id: 'the-tich',
  label: 'Thể tích hình hộp chữ nhật, hình lập phương',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    if (rand() < 0.5) {
      const a = int(rand, 2, 12);
      const right = a * a * a;
      return {
        prompt: `Tính thể tích hình lập phương có cạnh ${a} ${unit}.`,
        ...valueOptions(right, [a * a * 6, a * a, a * 3], { unit: `${unit}³` }),
        hint: 'Thể tích hình lập phương bằng cạnh nhân với cạnh rồi nhân với cạnh.',
        solution: `V = ${a} × ${a} × ${a} = ${num(right)} (${unit}³).`,
        visual: {
          type: 'solid',
          shape: 'lap-phuong',
          labels: [`${a} ${unit}`],
          alt: `Hình lập phương cạnh ${a} ${unit}.`,
        },
      };
    }
    const { a, b, c } = boxEdges(rand);
    const right = a * b * c;
    return {
      prompt: `Tính thể tích hình hộp chữ nhật có chiều dài ${a} ${unit}, chiều rộng ${b} ${unit}, chiều cao ${c} ${unit}.`,
      ...valueOptions(right, [(a + b) * 2 * c, a + b + c, a * b], { unit: `${unit}³` }),
      hint: 'Thể tích hình hộp chữ nhật bằng chiều dài nhân với chiều rộng rồi nhân với chiều cao (cùng đơn vị đo).',
      solution: `V = ${a} × ${b} × ${c} = ${num(right)} (${unit}³).`,
      visual: {
        type: 'solid',
        shape: 'hop',
        labels: [`${a} ${unit}`, `${b} ${unit}`, `${c} ${unit}`],
        alt: `Hình hộp chữ nhật dài ${a} ${unit}, rộng ${b} ${unit}, cao ${c} ${unit}.`,
      },
    };
  },
};

/** @type {Skill[]} */
export const GEOMETRY_SKILLS = [
  nameSkill,
  triangleSkill,
  trapezoidSkill,
  circumferenceSkill,
  circleAreaSkill,
  boxAreaSkill,
  cubeAreaSkill,
  volumeSkill,
];
