/**
 * The adaptive review of perimeter and area: rectangles and squares,
 * triangles (and a base from the area), trapezoids, the circumference and
 * area of a circle and of a half circle, and the two halves of a triangle cut
 * at the midpoint of a side. The book takes π as 3,14. Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { fmt, tidy } from '#lib/core/number-format.js';
import { num, valueOptions } from './decimals.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** The value of π the book uses. */
export const PI = 3.14;

/**
 * A length in whole units, or with one decimal place a third of the time.
 * @param {() => number} rand
 * @param {number} lo
 * @param {number} hi
 */
function length(rand, lo, hi) {
  if (rand() < 0.33) {
    const n = int(rand, lo * 10 + 1, hi * 10);
    return (n % 10 === 0 ? n + 5 : n) / 10;
  }
  return int(rand, lo, hi);
}

/** @type {Skill} */
export const rectangleSkill = {
  id: 'hinh-chu-nhat-hinh-vuong',
  label: 'Chu vi, diện tích hình chữ nhật, hình vuông',
  make(rand) {
    const unit = pick(rand, ['cm', 'm']);
    const square = rand() < 0.35;
    const a = int(rand, 6, 25);
    const b = square ? a : int(rand, 3, a - 1);
    const area = rand() < 0.5;
    const right = area ? a * b : (a + b) * 2;
    const what = area ? 'diện tích' : 'chu vi';
    const name = square
      ? `hình vuông cạnh ${a} ${unit}`
      : `hình chữ nhật có chiều dài ${a} ${unit}, chiều rộng ${b} ${unit}`;
    const u = area ? `${unit}²` : unit;
    return {
      prompt: `Tính ${what} ${name}.`,
      ...valueOptions(right, area ? [(a + b) * 2, a + b, a * b * 2] : [a * b, a + b, a * 2 + b], {
        near: [2, 4],
        unit: u,
      }),
      hint: area
        ? 'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo).'
        : 'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng rồi nhân với 2.',
      solution: area
        ? square
          ? `Diện tích hình vuông: ${a} × ${a} = ${fmt(right)} (${u}).`
          : `Diện tích hình chữ nhật: ${a} × ${b} = ${fmt(right)} (${u}).`
        : square
          ? `Chu vi hình vuông: ${a} × 4 = ${fmt(right)} (${u}).`
          : `Chu vi hình chữ nhật: (${a} + ${b}) × 2 = ${fmt(right)} (${u}).`,
      visual: square
        ? {
            type: 'measured',
            shape: 'hinh-vuong',
            labels: [`${a} ${unit}`],
            alt: `Hình vuông cạnh ${a} ${unit}.`,
          }
        : {
            type: 'measured',
            shape: 'hinh-chu-nhat',
            labels: [`${a} ${unit}`, `${b} ${unit}`],
            alt: `Hình chữ nhật dài ${a} ${unit}, rộng ${b} ${unit}.`,
          },
    };
  },
};

/** @type {Skill} */
export const triangleSkill = {
  id: 'dien-tich-tam-giac',
  label: 'Diện tích hình tam giác',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const a = length(rand, 3, 20);
    const h = length(rand, 2, 15);
    const right = tidy((a * h) / 2, 6);
    return {
      prompt: `Hình tam giác có độ dài đáy ${num(a)} ${unit}, chiều cao ${num(h)} ${unit}. Tính diện tích hình tam giác.`,
      ...valueOptions(right, [a * h, a + h, (a + h) * 2], { near: [0.5, 1], unit: `${unit}²` }),
      hint: 'Diện tích hình tam giác bằng độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2.',
      solution: `S = ${num(a)} × ${num(h)} : 2 = ${num(right)} (${unit}²).`,
      visual: {
        type: 'measured',
        shape: 'tam-giac',
        labels: [`${num(a)} ${unit}`, `${num(h)} ${unit}`],
        alt: `Hình tam giác có đáy ${num(a)} ${unit}, chiều cao ${num(h)} ${unit}.`,
      },
    };
  },
};

/** @type {Skill} */
export const baseSkill = {
  id: 'tim-do-dai-day',
  label: 'Tìm độ dài đáy của tam giác',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const a = int(rand, 4, 30);
    const h = int(rand, 3, 15);
    const area = tidy((a * h) / 2, 6);
    return {
      prompt: `Hình tam giác có diện tích ${num(area)} ${unit}², chiều cao ${h} ${unit}. Tính độ dài đáy.`,
      ...valueOptions(a, [area / h, area * 2, a * 2], { near: [1, 2], unit }),
      hint: 'Diện tích = đáy × chiều cao : 2. Vậy đáy = diện tích × 2 : chiều cao.',
      solution: `Độ dài đáy: ${num(area)} × 2 : ${h} = ${num(a)} (${unit}).`,
    };
  },
};

/** @type {Skill} */
export const trapezoidSkill = {
  id: 'dien-tich-hinh-thang',
  label: 'Diện tích hình thang',
  make(rand) {
    const unit = pick(rand, ['cm', 'dm', 'm']);
    const a = int(rand, 10, 60);
    const b = int(rand, 4, a - 3);
    const h = length(rand, 3, 25);
    const right = tidy(((a + b) * h) / 2, 6);
    return {
      prompt: `Hình thang có đáy lớn ${a} ${unit}, đáy bé ${b} ${unit}, chiều cao ${num(h)} ${unit}. Tính diện tích hình thang.`,
      ...valueOptions(right, [(a + b) * h, (a * h) / 2, ((a - b) * h) / 2], {
        near: [1, 2],
        unit: `${unit}²`,
      }),
      hint: 'Diện tích hình thang bằng tổng độ dài hai đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2.',
      solution: `S = (${a} + ${b}) × ${num(h)} : 2 = ${num(right)} (${unit}²).`,
      visual: {
        type: 'measured',
        shape: 'hinh-thang',
        labels: [`${a} ${unit}`, `${b} ${unit}`, `${num(h)} ${unit}`],
        alt: `Hình thang có đáy lớn ${a} ${unit}, đáy bé ${b} ${unit}, chiều cao ${num(h)} ${unit}.`,
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
    const r = length(rand, 1, 20);
    const byRadius = rand() < 0.5;
    const right = tidy(r * 2 * PI, 6);
    const given = byRadius ? `bán kính ${num(r)} ${unit}` : `đường kính ${num(r * 2)} ${unit}`;
    return {
      prompt: `Tính chu vi hình tròn có ${given}.`,
      ...valueOptions(right, [r * PI, r * r * PI, r * 4 * PI], { unit }),
      hint: 'Chu vi hình tròn bằng đường kính nhân với 3,14, hoặc bán kính nhân 2 rồi nhân với 3,14.',
      solution: byRadius
        ? `C = ${num(r)} × 2 × 3,14 = ${num(right)} (${unit}).`
        : `C = ${num(r * 2)} × 3,14 = ${num(right)} (${unit}).`,
      visual: {
        type: 'measured',
        shape: byRadius ? 'ban-kinh' : 'duong-kinh',
        labels: [byRadius ? `${num(r)} ${unit}` : `${num(r * 2)} ${unit}`],
        alt: `Hình tròn có ${given}.`,
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
    const r = length(rand, 1, 12);
    const byRadius = rand() < 0.6;
    const right = tidy(r * r * PI, 6);
    const given = byRadius ? `bán kính ${num(r)} ${unit}` : `đường kính ${num(r * 2)} ${unit}`;
    return {
      prompt: `Tính diện tích hình tròn có ${given}.`,
      ...valueOptions(right, [r * 2 * r * 2 * PI, r * 2 * PI, r * PI], { unit: `${unit}²` }),
      hint: byRadius
        ? 'Diện tích hình tròn bằng bán kính nhân với bán kính rồi nhân với 3,14.'
        : 'Em tìm bán kính trước: bán kính bằng đường kính chia cho 2.',
      solution: byRadius
        ? `S = ${num(r)} × ${num(r)} × 3,14 = ${num(right)} (${unit}²).`
        : `Bán kính: ${num(r * 2)} : 2 = ${num(r)} (${unit}). S = ${num(r)} × ${num(r)} × 3,14 = ${num(right)} (${unit}²).`,
      visual: {
        type: 'measured',
        shape: byRadius ? 'ban-kinh' : 'duong-kinh',
        labels: [byRadius ? `${num(r)} ${unit}` : `${num(r * 2)} ${unit}`],
        alt: `Hình tròn có ${given}.`,
      },
    };
  },
};

/** @type {Skill} */
export const halfCircleSkill = {
  id: 'nua-hinh-tron',
  label: 'Diện tích nửa hình tròn',
  make(rand) {
    const r = int(rand, 2, 30) * 2;
    const full = tidy(r * r * PI, 6);
    const right = tidy(full / 2, 6);
    return {
      prompt: `Một hồ nước có dạng nửa hình tròn bán kính ${r} m. Diện tích mặt hồ là bao nhiêu mét vuông?`,
      ...valueOptions(right, [full, r * PI, right / 2], { unit: 'm²' }),
      hint: 'Em tính diện tích cả hình tròn, rồi lấy một nửa.',
      solution: `Diện tích hình tròn: ${r} × ${r} × 3,14 = ${num(full)} (m²). Diện tích nửa hình tròn: ${num(full)} : 2 = ${num(right)} (m²).`,
      visual: {
        type: 'measured',
        shape: 'nua-tron',
        labels: [`${r} m`],
        alt: `Nửa hình tròn có bán kính ${r} m.`,
      },
    };
  },
};

/** @type {Skill} */
export const midpointSkill = {
  id: 'trung-diem',
  label: 'Hai tam giác chung chiều cao',
  make(rand) {
    const area = int(rand, 6, 60) * 2;
    const right = area / 2;
    return {
      prompt: `Tam giác ABC có diện tích ${area} cm². M là trung điểm của cạnh BC. Diện tích tam giác ABM là bao nhiêu?`,
      ...valueOptions(right, [area, area / 4, area * 2], { unit: 'cm²' }),
      hint: 'Hai tam giác ABM và ACM có chung chiều cao kẻ từ A, và hai đáy BM, MC bằng nhau.',
      solution: `BM = MC và hai tam giác ABM, ACM có chung chiều cao từ A, nên diện tích của chúng bằng nhau, mỗi tam giác bằng một nửa diện tích tam giác ABC: ${area} : 2 = ${right} (cm²).`,
    };
  },
};

/** The parts of the perimeter and area review, in book order. */
export const AREA_SKILLS = [
  rectangleSkill,
  triangleSkill,
  baseSkill,
  trapezoidSkill,
  midpointSkill,
  circumferenceSkill,
  circleAreaSkill,
  halfCircleSkill,
];
