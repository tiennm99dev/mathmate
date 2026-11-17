/**
 * Question generators for the chapter "Xác suất có điều kiện", for the drill
 * board of its review lesson. Every answer is an exact probability: a short
 * decimal or a fraction, read with `readProbability` and written with
 * `probText`. Prompts, hints and steps are rich text with inline TeX.
 */

import { int, pick } from '#lib/core/drill.js';
import { ratioTex } from '#lib/core/fractions.js';
import { numTex } from '#lib/core/number-format.js';
import { probTex } from './conditional.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** Two-way table settings: row and column traits of a surveyed group. */
const TABLES = [
  {
    who: 'học sinh',
    groups: ['Học sinh nam', 'Học sinh nữ'],
    rows: ['là nam', 'là nữ'],
    yes: 'đeo kính',
    no: 'không đeo kính',
  },
  {
    who: 'học sinh',
    groups: ['Lớp 12A', 'Lớp 12B'],
    rows: ['thuộc lớp 12A', 'thuộc lớp 12B'],
    yes: 'đạt điểm giỏi môn Toán',
    no: 'không đạt điểm giỏi môn Toán',
  },
  {
    who: 'sản phẩm',
    groups: ['Máy I', 'Máy II'],
    rows: ['do máy I sản xuất', 'do máy II sản xuất'],
    yes: 'bị lỗi',
    no: 'không bị lỗi',
  },
];

/** @type {Skill} */
export const bangHaiChieu = {
  id: 'bang-hai-chieu',
  label: 'Bài 18. Xác suất có điều kiện',
  make(rand) {
    const t = pick(rand, TABLES);
    const c = [int(rand, 3, 25), int(rand, 5, 30), int(rand, 3, 25), int(rand, 5, 30)];
    const n = c[0] + c[1] + c[2] + c[3];
    const k = int(rand, 0, 1);
    const inRow = c[2 * k] + c[2 * k + 1];
    const yes = c[0] + c[2];
    const story = `Thống kê $${n}$ ${t.who}. ${t.groups[0]}: $${c[0]}$ ${t.who} ${t.yes}, $${c[1]}$ ${t.who} ${t.no}. ${t.groups[1]}: $${c[2]}$ ${t.who} ${t.yes}, $${c[3]}$ ${t.who} ${t.no}. Chọn ngẫu nhiên một ${t.who}.`;
    if (rand() < 0.5) {
      return {
        prompt: `${story} Biết ${t.who} được chọn ${t.rows[k]}, tính xác suất ${t.who} đó ${t.yes}.`,
        answer: c[2 * k] / inRow,
        hints: [
          `Thu hẹp không gian mẫu: chỉ xét các ${t.who} ${t.rows[k]}, có $${inRow}$ ${t.who}.`,
        ],
        steps: [
          `Biết ${t.who} ${t.rows[k]}, không gian mẫu thu hẹp còn $${c[2 * k]} + ${c[2 * k + 1]} = ${inRow}$ kết quả.`,
          `Trong đó có $${c[2 * k]}$ ${t.who} ${t.yes}, nên xác suất cần tìm là $${ratioTex(c[2 * k], inRow)}$.`,
        ],
      };
    }
    return {
      prompt: `${story} Biết ${t.who} được chọn ${t.yes}, tính xác suất ${t.who} đó ${t.rows[k]}.`,
      answer: c[2 * k] / yes,
      hints: [`Thu hẹp không gian mẫu: chỉ xét các ${t.who} ${t.yes}, có $${yes}$ ${t.who}.`],
      steps: [
        `Biết ${t.who} ${t.yes}, không gian mẫu thu hẹp còn $${c[0]} + ${c[2]} = ${yes}$ kết quả.`,
        `Trong đó có $${c[2 * k]}$ ${t.who} ${t.rows[k]}, nên xác suất cần tìm là $${ratioTex(c[2 * k], yes)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const congThucNhan = {
  id: 'cong-thuc-nhan',
  label: 'Công thức nhân xác suất',
  make(rand) {
    const r = int(rand, 3, 8);
    const x = int(rand, 2, 7);
    const n = r + x;
    const box = `Một hộp có $${r}$ viên bi đỏ và $${x}$ viên bi xanh. Lấy ngẫu nhiên lần lượt hai viên bi, không hoàn lại.`;
    if (rand() < 0.5) {
      return {
        prompt: `${box} Tính xác suất cả hai viên bi đều màu đỏ.`,
        answer: (r * (r - 1)) / (n * (n - 1)),
        hints: [
          'Gọi $A$: "Viên thứ nhất màu đỏ", $B$: "Viên thứ hai màu đỏ"; dùng $P(AB) = P(A) \\cdot P(B|A)$.',
          `Sau khi lấy một viên đỏ, hộp còn $${n - 1}$ viên, trong đó $${r - 1}$ viên đỏ.`,
        ],
        steps: [
          `$P(A) = \\dfrac{${r}}{${n}}$, $P(B|A) = \\dfrac{${r - 1}}{${n - 1}}$.`,
          `$P(AB) = \\dfrac{${r}}{${n}} \\cdot \\dfrac{${r - 1}}{${n - 1}} = ${ratioTex(r * (r - 1), n * (n - 1))}$.`,
        ],
      };
    }
    return {
      prompt: `${box} Tính xác suất viên thứ nhất màu đỏ và viên thứ hai màu xanh.`,
      answer: (r * x) / (n * (n - 1)),
      hints: [
        'Gọi $A$: "Viên thứ nhất màu đỏ", $B$: "Viên thứ hai màu xanh"; dùng $P(AB) = P(A) \\cdot P(B|A)$.',
        `Sau khi lấy một viên đỏ, hộp còn $${n - 1}$ viên, trong đó vẫn có $${x}$ viên xanh.`,
      ],
      steps: [
        `$P(A) = \\dfrac{${r}}{${n}}$, $P(B|A) = \\dfrac{${x}}{${n - 1}}$.`,
        `$P(AB) = \\dfrac{${r}}{${n}} \\cdot \\dfrac{${x}}{${n - 1}} = ${ratioTex(r * x, n * (n - 1))}$.`,
      ],
    };
  },
};

/**
 * A random tree in exact steps: P(A) in tenths, P(B|A) and P(B|Ā) in
 * twentieths, with P(B|A) ≠ P(B|Ā) so that A and B are not independent.
 * @param {() => number} rand
 */
export function drawTree(rand) {
  const a = int(rand, 1, 9);
  const u = int(rand, 2, 19);
  let v = int(rand, 1, 18);
  if (v === u) v = u - 1;
  return { a, u, v };
}

/**
 * The given part of a tree question as rich text.
 * @param {{ a: number, u: number, v: number }} t
 */
const givenText = ({ a, u, v }) =>
  `$P(A) = ${numTex(a / 10)}$, $P(B|A) = ${numTex(u / 20)}$ và $P(B|\\overline{A}) = ${numTex(v / 20)}$`;

/**
 * The total probability step: '0{,}3 \cdot 0{,}5 + 0{,}7 \cdot 0{,}2 = …'.
 * @param {{ a: number, u: number, v: number }} t
 */
function totalTex({ a, u, v }) {
  const left = numTex(a / 10);
  const right = numTex((10 - a) / 10);
  return `${left} \\cdot ${numTex(u / 20)} + ${right} \\cdot ${numTex(v / 20)} = ${numTex((a * u) / 200)} + ${numTex(((10 - a) * v) / 200)} = ${numTex((a * u + (10 - a) * v) / 200)}`;
}

/** @type {Skill} */
export const toanPhan = {
  id: 'toan-phan',
  label: 'Bài 19. Công thức xác suất toàn phần',
  make(rand) {
    const t = drawTree(rand);
    return {
      prompt: `Cho hai biến cố $A$, $B$ với ${givenText(t)}. Tính $P(B)$.`,
      answer: (t.a * t.u + (10 - t.a) * t.v) / 200,
      hints: [
        'Dùng công thức $P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A})$.',
        `Nhớ rằng $P(\\overline{A}) = 1 - P(A) = ${numTex((10 - t.a) / 10)}$.`,
      ],
      steps: [`$P(\\overline{A}) = ${numTex((10 - t.a) / 10)}$.`, `$P(B) = ${totalTex(t)}$.`],
    };
  },
};

/** @type {Skill} */
export const bayes = {
  id: 'bayes',
  label: 'Công thức Bayes',
  make(rand) {
    const t = drawTree(rand);
    const top = t.a * t.u;
    const all = top + (10 - t.a) * t.v;
    return {
      prompt: `Cho hai biến cố $A$, $B$ với ${givenText(t)}. Tính $P(A|B)$ (viết dạng phân số tối giản hoặc số thập phân đúng).`,
      answer: top / all,
      hints: [
        'Tính $P(B)$ bằng công thức xác suất toàn phần trước.',
        'Dùng công thức Bayes $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}$.',
      ],
      steps: [
        `$P(B) = ${totalTex(t)}$.`,
        `$P(A|B) = \\dfrac{${numTex(top / 200)}}{${numTex(all / 200)}} = ${probTex(top / all)}$.`,
      ],
    };
  },
};

/** The skills of the chapter review, in book order. */
export const CHAPTER_SKILLS = [bangHaiChieu, congThucNhan, toanPhan, bayes];
