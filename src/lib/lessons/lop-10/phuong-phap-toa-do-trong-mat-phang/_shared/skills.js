/**
 * Drill skills of the chapter "Phương pháp toạ độ trong mặt phẳng" for the
 * end-of-chapter review: the common point of two lines, the angle between
 * two lines, the distance from a point to a line, the radius of a circle
 * written in expanded form, the focal length of an ellipse and the focal
 * distance of a point on a parabola. Every answer is a whole number.
 */
import { int, nonZero, pick, retryMake } from '#lib/core/drill.js';
import { angleOf, expandedTex, lineTex, normLine, op, termsTex } from './coords.js';

/** @typedef {{ x: number, y: number }} V */

/** Small normal vectors. */
const NORMALS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: -2 },
  { x: 2, y: -1 },
  { x: 1, y: 3 },
  { x: 3, y: 1 },
  { x: 1, y: -3 },
  { x: 3, y: -1 },
];

/**
 * The line through P with normal n, in lowest terms.
 * @param {V} P @param {V} n
 */
const lineAt = (P, n) => normLine(n.x, n.y, -(n.x * P.x + n.y * P.y));

/** @type {import('#lib/core/drill.js').Skill} */
export const INTERSECT_SKILL = {
  id: 'giao-diem',
  label: 'Bài 20. Giao điểm hai đường thẳng',
  make: (rand) =>
    retryMake(() => {
      const I = { x: int(rand, -5, 5), y: int(rand, -5, 5) };
      const n1 = pick(rand, NORMALS);
      const n2 = pick(rand, NORMALS);
      if (n1.x * n2.y - n2.x * n1.y === 0) return null;
      const l1 = lineAt(I, n1);
      const l2 = lineAt(I, n2);
      return {
        prompt: `Hai đường thẳng $${lineTex(l1)}$ và $${lineTex(l2)}$ cắt nhau tại $I$. Tìm hoành độ của $I$.`,
        answer: I.x,
        hints: ['Toạ độ của $I$ là nghiệm của hệ gồm hai phương trình.'],
        steps: [
          `Giải hệ $\\begin{cases} ${termsTex([
            [l1.a, 'x'],
            [l1.b, 'y'],
          ])} = ${-l1.c} \\\\ ${termsTex([
            [l2.a, 'x'],
            [l2.b, 'y'],
          ])} = ${-l2.c} \\end{cases}$.`,
          `Hệ có nghiệm $x = ${I.x}$, $y = ${I.y}$.`,
          `Vậy $I(${I.x}; ${I.y})$ và hoành độ của $I$ là $${I.x}$.`,
        ],
      };
    }),
};

/** @type {import('#lib/core/drill.js').Skill} */
export const ANGLE_SKILL = {
  id: 'goc-hai-duong-thang',
  label: 'Bài 20. Góc giữa hai đường thẳng',
  make: (rand) =>
    retryMake(() => {
      const n1 = pick(rand, NORMALS);
      const n2 = pick(rand, NORMALS);
      const l1 = lineAt({ x: int(rand, -3, 3), y: int(rand, -3, 3) }, n1);
      const l2 = lineAt({ x: int(rand, -3, 3), y: int(rand, -3, 3) }, n2);
      const deg = Math.round(angleOf(l1, l2));
      if (![45, 90].includes(deg) || Math.abs(angleOf(l1, l2) - deg) > 1e-9) return null;
      const dot = l1.a * l2.a + l1.b * l2.b;
      const s1 = l1.a ** 2 + l1.b ** 2;
      const s2 = l2.a ** 2 + l2.b ** 2;
      return {
        prompt: `Tính góc (theo độ) giữa hai đường thẳng $${lineTex(l1)}$ và $${lineTex(l2)}$.`,
        answer: deg,
        unit: '°',
        hints: [
          '$\\cos\\varphi = \\dfrac{|a_1a_2 + b_1b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}$.',
        ],
        steps: [
          `$\\vec n_1 = (${l1.a}; ${l1.b})$, $\\vec n_2 = (${l2.a}; ${l2.b})$.`,
          `$\\cos\\varphi = \\dfrac{|${dot}|}{\\sqrt{${s1}} \\cdot \\sqrt{${s2}}} = ${deg === 90 ? '0' : '\\dfrac{\\sqrt{2}}{2}'}$.`,
          `Vậy $\\varphi = ${deg}^\\circ$.`,
        ],
      };
    }),
};

/** Normals of length 5, so the distance is a whole number. */
const FIVES = [
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 3, y: -4 },
  { x: 4, y: -3 },
];

/** @type {import('#lib/core/drill.js').Skill} */
export const DISTANCE_SKILL = {
  id: 'khoang-cach',
  label: 'Bài 20. Khoảng cách từ điểm đến đường thẳng',
  make(rand) {
    const n = pick(rand, FIVES);
    const M = { x: int(rand, -4, 4), y: int(rand, -4, 4) };
    const d = int(rand, 1, 4);
    const value = nonZero(rand, -1, 1) * 5 * d;
    const c = value - (n.x * M.x + n.y * M.y);
    const l = { a: n.x, b: n.y, c };
    return {
      prompt: `Tính khoảng cách từ $M(${M.x}; ${M.y})$ đến đường thẳng $\\Delta: ${lineTex(l)}$.`,
      answer: d,
      hints: ['$d(M, \\Delta) = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.'],
      steps: [
        `$d(M, \\Delta) = \\dfrac{|${n.x} \\cdot ${op(M.x)} + ${op(n.y)} \\cdot ${op(M.y)} + ${op(c)}|}{\\sqrt{${n.x}^2 + ${op(n.y)}^2}}$.`,
        `$= \\dfrac{${5 * d}}{5} = ${d}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const RADIUS_SKILL = {
  id: 'ban-kinh',
  label: 'Bài 21. Tâm và bán kính đường tròn',
  make(rand) {
    const I = { x: int(rand, -4, 4), y: int(rand, -4, 4) };
    const R = int(rand, 1, 6);
    const c = I.x * I.x + I.y * I.y - R * R;
    return {
      prompt: `Tính bán kính của đường tròn $${expandedTex(I, R * R)}$.`,
      answer: R,
      hints: ['So sánh với $x^2 + y^2 - 2ax - 2by + c = 0$.', '$R = \\sqrt{a^2 + b^2 - c}$.'],
      steps: [
        `$a = ${I.x}$, $b = ${I.y}$, $c = ${c}$.`,
        `$R = \\sqrt{${op(I.x)}^2 + ${op(I.y)}^2 - ${op(c)}} = \\sqrt{${R * R}} = ${R}$.`,
      ],
    };
  },
};

/** Whole (a, b, c) with a² = b² + c². */
const TRIPLES = [
  [5, 4, 3],
  [5, 3, 4],
  [10, 8, 6],
  [10, 6, 8],
  [13, 12, 5],
  [13, 5, 12],
  [17, 15, 8],
];

/** @type {import('#lib/core/drill.js').Skill} */
export const ELLIPSE_SKILL = {
  id: 'tieu-cu-elip',
  label: 'Bài 22. Tiêu cự của elip',
  make(rand) {
    const [a, b, c] = pick(rand, TRIPLES);
    return {
      prompt: `Tính tiêu cự của elip $\\dfrac{x^2}{${a * a}} + \\dfrac{y^2}{${b * b}} = 1$.`,
      answer: 2 * c,
      hints: ['Với elip, $c^2 = a^2 - b^2$; tiêu cự là $2c$.'],
      steps: [
        `$c = \\sqrt{${a * a} - ${b * b}} = \\sqrt{${c * c}} = ${c}$.`,
        `Tiêu cự $2c = ${2 * c}$.`,
      ],
    };
  },
};

/** @type {import('#lib/core/drill.js').Skill} */
export const PARABOLA_SKILL = {
  id: 'parabol',
  label: 'Bài 22. Parabol',
  make(rand) {
    const p = pick(rand, [2, 4, 6, 8]);
    const x0 = int(rand, 1, 9);
    return {
      prompt: `Điểm $M$ thuộc parabol $y^2 = ${2 * p}x$ có hoành độ bằng $${x0}$. Tính khoảng cách $MF$ từ $M$ đến tiêu điểm $F$.`,
      answer: x0 + p / 2,
      hints: ['Trên parabol, $MF = d(M, \\Delta) = x_0 + \\dfrac{p}{2}$.'],
      steps: [
        `$2p = ${2 * p}$ nên $p = ${p}$, đường chuẩn $\\Delta: x = -${p / 2}$.`,
        `$MF = d(M, \\Delta) = ${x0} + ${p / 2} = ${x0 + p / 2}$.`,
      ],
    };
  },
};

/** The skills of the chapter review, in book order. */
export const CHAPTER_SKILLS = [
  INTERSECT_SKILL,
  ANGLE_SKILL,
  DISTANCE_SKILL,
  RADIUS_SKILL,
  ELLIPSE_SKILL,
  PARABOLA_SKILL,
];
