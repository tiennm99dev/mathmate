/**
 * The mixed practice of the chapter "Một số hình phẳng. Chu vi và diện
 * tích": the area of a triangle and of a trapezoid, the radius and the
 * diameter, the circumference and the area of a circle, the area of a plot
 * made of a rectangle and a triangle, a fence round a quarter circle or a
 * rolling wheel, and comparing the areas of three shapes. One question of each
 * part in a shuffled order; the figure with its measures is the question's
 * `visual`. Pure and DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { tidy } from '#lib/core/number-format.js';
import {
  PI,
  circleArea,
  circumference,
  num,
  trapezoidArea,
  triangleArea,
} from '../_shared/figures.js';

/**
 * The figure drawn above a question, with the measures written on it.
 * @typedef {{ shape: 'triangle', base: string, height: string }
 *   | { shape: 'trapezoid', a: string, b: string, h: string }
 *   | { shape: 'circle', r?: string, d?: string }
 *   | { shape: 'plot', long: string, wide: string, tip: string }
 *   | { shape: 'quarter', r: string }} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'tam-giac': 'Diện tích hình tam giác',
  'hinh-thang': 'Diện tích hình thang',
  'ban-kinh': 'Bán kính và đường kính',
  'chu-vi': 'Chu vi hình tròn',
  'dien-tich-tron': 'Diện tích hình tròn',
  'ghep-hinh': 'Diện tích hình ghép',
  'thuc-te': 'Bài toán thực tế',
  'so-sanh': 'So sánh diện tích',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/** The units a length may be given in, with the area unit. */
const UNITS = /** @type {const} */ ([
  ['cm', 'cm²'],
  ['dm', 'dm²'],
  ['m', 'm²'],
]);

/**
 * The right value among up to three wrong ones, each written the book's way
 * with the unit. Wrong values equal to the right one, repeated or not above 0
 * are dropped and the gap filled with near values, so there are always four
 * different options.
 * @param {() => number} rand
 * @param {number} right
 * @param {number[]} wrong
 * @param {string} unit
 */
export function choices(rand, right, wrong, unit) {
  const r = tidy(right);
  /** @type {number[]} */
  const kept = [];
  for (const w of [...wrong, r + 1, r * 2, r + 10, r * 10]) {
    const v = tidy(w);
    if (v > 0 && v !== r && !kept.includes(v) && kept.length < 3) kept.push(v);
  }
  return mixOptions(
    rand,
    `${num(r)} ${unit}`,
    kept.map((v) => `${num(v)} ${unit}`),
  );
}

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'tam-giac'(rand) {
    const [u, u2] = pick(rand, UNITS);
    const a = int(rand, 4, 20);
    const h = int(rand, 3, 15);
    const s = triangleArea(a, h);
    return {
      prompt: `Tính diện tích hình tam giác có độ dài đáy ${a} ${u}, chiều cao ${h} ${u}.`,
      visual: { shape: 'triangle', base: `${a} ${u}`, height: `${h} ${u}` },
      ...choices(rand, s, [a * h, a + h, a * h * 2], u2),
      hint: 'Lấy độ dài đáy nhân với chiều cao rồi chia cho 2.',
      solution: `S = ${a} × ${h} : 2 = ${num(s)} (${u2}).`,
    };
  },
  'hinh-thang'(rand) {
    const [u, u2] = pick(rand, UNITS);
    const a = int(rand, 6, 20);
    const b = int(rand, 2, a - 2);
    const h = int(rand, 2, 12);
    const s = trapezoidArea(a, b, h);
    return {
      prompt: `Tính diện tích hình thang có đáy lớn ${a} ${u}, đáy bé ${b} ${u}, chiều cao ${h} ${u}.`,
      visual: { shape: 'trapezoid', a: `${a} ${u}`, b: `${b} ${u}`, h: `${h} ${u}` },
      ...choices(rand, s, [(a + b) * h, (a * h) / 2, a + b + h], u2),
      hint: 'Cộng hai đáy, nhân với chiều cao, rồi chia cho 2.',
      solution: `S = (${a} + ${b}) × ${h} : 2 = ${num(s)} (${u2}).`,
    };
  },
  'ban-kinh'(rand) {
    const [u] = pick(rand, UNITS);
    const r = int(rand, 3, 40) / 2;
    const d = tidy(r * 2);
    if (rand() < 0.5) {
      return {
        prompt: `Hình tròn có bán kính ${num(r)} ${u}. Đường kính dài bao nhiêu?`,
        visual: { shape: 'circle', r: `${num(r)} ${u}` },
        ...choices(rand, d, [r / 2, r + 2, r * 4], u),
        hint: 'Đường kính dài gấp 2 lần bán kính.',
        solution: `d = ${num(r)} × 2 = ${num(d)} (${u}).`,
      };
    }
    return {
      prompt: `Hình tròn có đường kính ${num(d)} ${u}. Bán kính dài bao nhiêu?`,
      visual: { shape: 'circle', d: `${num(d)} ${u}` },
      ...choices(rand, r, [d * 2, d - 2, r / 2], u),
      hint: 'Bán kính bằng một nửa đường kính.',
      solution: `r = ${num(d)} : 2 = ${num(r)} (${u}).`,
    };
  },
  'chu-vi'(rand) {
    const [u] = pick(rand, UNITS);
    if (rand() < 0.5) {
      const d = int(rand, 2, 30);
      const c = circumference(d);
      return {
        prompt: `Tính chu vi hình tròn có đường kính ${d} ${u}.`,
        visual: { shape: 'circle', d: `${d} ${u}` },
        ...choices(rand, c, [d * 2 * PI, (d / 2) * (d / 2) * PI, d + PI], u),
        hint: 'C = d × 3,14.',
        solution: `C = ${d} × 3,14 = ${num(c)} (${u}).`,
      };
    }
    const r = int(rand, 3, 30) / 2;
    const d = tidy(r * 2);
    const c = circumference(d);
    return {
      prompt: `Tính chu vi hình tròn có bán kính ${num(r)} ${u}.`,
      visual: { shape: 'circle', r: `${num(r)} ${u}` },
      ...choices(rand, c, [r * PI, r * r * PI, r * 4 * PI], u),
      hint: 'Tìm đường kính trước: bán kính nhân 2. Rồi nhân với 3,14.',
      solution: `d = ${num(r)} × 2 = ${num(d)} (${u}). C = ${num(d)} × 3,14 = ${num(c)} (${u}).`,
    };
  },
  'dien-tich-tron'(rand) {
    const [u, u2] = pick(rand, UNITS);
    // r = 2 would give the same number for the circumference and the area.
    const r = pick(rand, [1, 3, 4, 5, 6, 7, 8, 9, 10, 0.5, 1.5, 2.5]);
    const s = circleArea(r);
    if (rand() < 0.5) {
      return {
        prompt: `Tính diện tích hình tròn có bán kính ${num(r)} ${u}.`,
        visual: { shape: 'circle', r: `${num(r)} ${u}` },
        ...choices(rand, s, [r * 2 * PI, r * PI, r * r], u2),
        hint: 'S = r × r × 3,14. Bán kính nhân bán kính, không phải nhân 2.',
        solution: `S = ${num(r)} × ${num(r)} × 3,14 = ${num(s)} (${u2}).`,
      };
    }
    const d = tidy(r * 2);
    return {
      prompt: `Tính diện tích hình tròn có đường kính ${num(d)} ${u}.`,
      visual: { shape: 'circle', d: `${num(d)} ${u}` },
      ...choices(rand, s, [d * d * PI, d * PI, r * 2 * PI], u2),
      hint: 'Đề cho đường kính. Em tìm bán kính trước: d : 2.',
      solution: `r = ${num(d)} : 2 = ${num(r)} (${u}). S = ${num(r)} × ${num(r)} × 3,14 = ${num(s)} (${u2}).`,
    };
  },
  'ghep-hinh'(rand) {
    const wide = int(rand, 4, 12);
    const long = int(rand, wide + 2, 25);
    const tip = int(rand, 2, 10);
    const rect = long * wide;
    const tri = triangleArea(wide, tip);
    const s = tidy(rect + tri);
    return {
      prompt: `Mảnh đất gồm một hình chữ nhật dài ${long} m, rộng ${wide} m và một hình tam giác có đáy là chiều rộng đó, chiều cao ${tip} m. Tính diện tích mảnh đất.`,
      visual: { shape: 'plot', long: `${long} m`, wide: `${wide} m`, tip: `${tip} m` },
      ...choices(rand, s, [rect + wide * tip, rect, tri + long + wide], 'm²'),
      hint: 'Tính diện tích hình chữ nhật và diện tích hình tam giác, rồi cộng lại.',
      solution: `Hình chữ nhật: ${long} × ${wide} = ${rect} (m²). Hình tam giác: ${wide} × ${tip} : 2 = ${num(tri)} (m²). Mảnh đất: ${rect} + ${num(tri)} = ${num(s)} (m²).`,
    };
  },
  'thuc-te'(rand) {
    if (rand() < 0.5) {
      const r = 2 * int(rand, 2, 15);
      const arc = tidy((r * 2 * PI) / 4);
      const fence = tidy(arc + 2 * r);
      return {
        prompt: `Mảnh vườn có dạng một phần tư hình tròn bán kính ${r} m. Người ta rào xung quanh vườn. Hàng rào dài bao nhiêu mét?`,
        visual: { shape: 'quarter', r: `${r} m` },
        ...choices(rand, fence, [arc, r * 2 * PI, arc + r], 'm'),
        hint: 'Hàng rào gồm một phần tư đường tròn và hai bán kính.',
        solution: `Chu vi cả hình tròn: ${r} × 2 × 3,14 = ${num(circumference(r * 2))} (m). Một phần tư: ${num(circumference(r * 2))} : 4 = ${num(arc)} (m). Hàng rào: ${num(arc)} + ${r} + ${r} = ${num(fence)} (m).`,
      };
    }
    const d = pick(rand, [0.5, 0.6, 0.65, 0.7, 0.8]);
    const turns = 10 * int(rand, 1, 10);
    const c = circumference(d);
    const way = tidy(c * turns);
    return {
      prompt: `Bánh xe có đường kính ${num(d)} m lăn trên mặt đất được ${turns} vòng. Bánh xe đi được bao nhiêu mét?`,
      visual: { shape: 'circle', d: `${num(d)} m` },
      ...choices(rand, way, [d * turns, (d / 2) * PI * turns, c], 'm'),
      hint: 'Lăn một vòng, bánh xe đi được quãng đường bằng chu vi bánh xe.',
      solution: `Chu vi bánh xe: ${num(d)} × 3,14 = ${num(c)} (m). Lăn ${turns} vòng: ${num(c)} × ${turns} = ${num(way)} (m).`,
    };
  },
  'so-sanh'(rand) {
    for (;;) {
      const r = int(rand, 2, 6);
      const ta = int(rand, 4, 16);
      const th = int(rand, 4, 16);
      const qa = int(rand, 5, 14);
      const qb = int(rand, 2, qa - 1);
      const qh = int(rand, 3, 12);
      const shapes = [
        { name: 'Hình tròn', s: circleArea(r), work: `${r} × ${r} × 3,14 = ${num(circleArea(r))}` },
        {
          name: 'Hình tam giác',
          s: triangleArea(ta, th),
          work: `${ta} × ${th} : 2 = ${num(triangleArea(ta, th))}`,
        },
        {
          name: 'Hình thang',
          s: trapezoidArea(qa, qb, qh),
          work: `(${qa} + ${qb}) × ${qh} : 2 = ${num(trapezoidArea(qa, qb, qh))}`,
        },
      ];
      const sorted = [...shapes].sort((x, y) => y.s - x.s);
      // Keep the largest clearly ahead so the question has one answer.
      if (sorted[0].s - sorted[1].s < 3) continue;
      const options = shuffle(
        rand,
        shapes.map((x) => x.name),
      );
      return {
        prompt: `Ba hình cắt từ cùng một tấm bìa: hình tròn bán kính ${r} cm; hình tam giác đáy ${ta} cm, chiều cao ${th} cm; hình thang hai đáy ${qa} cm và ${qb} cm, chiều cao ${qh} cm. Hình nào có diện tích lớn nhất?`,
        options,
        answer: options.indexOf(sorted[0].name),
        hint: 'Tính diện tích từng hình rồi so sánh.',
        solution: `${shapes.map((x) => `${x.name}: ${x.work} (cm²)`).join('. ')}. ${sorted[0].name} có diện tích lớn nhất.`,
      };
    }
  },
};

/**
 * One question of each part in a seeded order; seed 1 is the first round.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
