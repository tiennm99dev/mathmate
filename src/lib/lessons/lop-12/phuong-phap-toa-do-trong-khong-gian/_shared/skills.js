/**
 * Question generators for the chapter "Phương pháp toạ độ trong không
 * gian", for the drill board of the chapter review: planes through a point,
 * distance from a point to a plane, perpendicular planes, points of a line,
 * where a line meets a plane, angles, and the centre and radius of a sphere.
 * Every answer is a whole number, read with `readNumber` and written with
 * `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are rich
 * text.
 */

import { int, nonZero, pick, shuffle } from '#lib/core/drill.js';
import {
  P,
  add3,
  coordTex,
  coords,
  dot3,
  mul3,
  affineTex,
  opTex,
  overSqrtTex,
  sqrtTex,
  paramTex,
  planeD,
  planeTex,
  sphereExpandedTex,
  sumTex,
} from './space.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('./space.js').P3} P3 */

/** The names of the three coordinates, in order. */
export const COORD_NAMES = ['hoành độ', 'tung độ', 'cao độ'];

/** @param {string} s */
const capital = (s) => `${s[0].toUpperCase()}${s.slice(1)}`;

/** @param {() => number} rand @param {number} [lo] @param {number} [hi] */
const point = (rand, lo = -3, hi = 3) => P(int(rand, lo, hi), int(rand, lo, hi), int(rand, lo, hi));

/** @param {() => number} rand a vector that is not the zero vector */
function vector(rand, lo = -3, hi = 3) {
  for (;;) {
    const v = point(rand, lo, hi);
    if (v.x || v.y || v.z) return v;
  }
}

/** Whole vectors with whole lengths: a² + b² + c² = d². */
const QUADRUPLES = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [1, 4, 8, 9],
  [4, 4, 7, 9],
  [2, 6, 9, 11],
];

/**
 * A normal vector of whole length: a quadruple's first three numbers,
 * shuffled and with random signs, and the length.
 * @param {() => number} rand
 */
function wholeNormal(rand) {
  const [a, b, c, d] = pick(rand, QUADRUPLES);
  const [x, y, z] = shuffle(rand, [a, b, c]).map((t) => (rand() < 0.5 ? -t : t));
  return { n: P(x, y, z), len: d };
}

/** @type {Skill} */
export const planeThroughPoint = {
  id: 'mat-phang-qua-diem',
  label: 'Bài 14. Mặt phẳng qua một điểm, biết vectơ pháp tuyến',
  make(rand) {
    const n = vector(rand);
    const m = point(rand);
    const D = planeD(n, m);
    const [A, B, C] = coords(n);
    return {
      prompt: `Mặt phẳng $(P)$ đi qua $M${coordTex(m)}$ và có vectơ pháp tuyến $\\vec{n} = ${coordTex(n)}$ có phương trình $${sumTex([A, B, C])} + D = 0$. Tìm $D$.`,
      answer: D,
      hints: ['Điểm $M$ thuộc $(P)$ nên toạ độ của $M$ thoả mãn phương trình của $(P)$.'],
      steps: [
        `Thay toạ độ của $M$: $${opTex(A)} \\cdot ${opTex(m.x)} + ${opTex(B)} \\cdot ${opTex(m.y)} + ${opTex(C)} \\cdot ${opTex(m.z)} + D = 0$.`,
        `$${dot3(n, m)} + D = 0$, nên $D = ${D}$ và $(P): ${planeTex(n, D)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const pointPlaneDistance = {
  id: 'khoang-cach-diem-mat-phang',
  label: 'Bài 14. Khoảng cách từ điểm đến mặt phẳng',
  make(rand) {
    const { n, len } = wholeNormal(rand);
    const m = point(rand);
    const k = nonZero(rand, -3, 3);
    // Choose D so that |n·M + D| = |k|·len and the distance is |k|.
    const D = k * len - dot3(n, m);
    const [A, B, C] = coords(n);
    const value = dot3(n, m) + D;
    return {
      prompt: `Tính khoảng cách từ điểm $M${coordTex(m)}$ đến mặt phẳng $(P): ${planeTex(n, D)}$.`,
      answer: Math.abs(k),
      hints: ['$d(M, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.'],
      steps: [
        `Tử số: $|${opTex(A)} \\cdot ${opTex(m.x)} + ${opTex(B)} \\cdot ${opTex(m.y)} + ${opTex(C)} \\cdot ${opTex(m.z)} + ${opTex(D)}| = ${Math.abs(value)}$.`,
        `Mẫu số: $\\sqrt{${A * A} + ${B * B} + ${C * C}} = ${len}$.`,
        `$d(M, (P)) = \\dfrac{${Math.abs(value)}}{${len}} = ${Math.abs(k)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const perpendicularPlanes = {
  id: 'hai-mat-phang-vuong-goc',
  label: 'Bài 14. Hai mặt phẳng vuông góc',
  make(rand) {
    for (;;) {
      const n2 = vector(rand);
      const i = int(rand, 0, 2);
      const c2 = coords(n2);
      if (c2[i] === 0) continue;
      const m = int(rand, -4, 4);
      const others = [0, 1, 2].filter((j) => j !== i);
      // n1 has m in place i; pick the other two so that n1 · n2 = 0.
      const a = nonZero(rand, -3, 3);
      const rest = a * c2[others[0]] + m * c2[i];
      if (rest % c2[others[1]] !== 0) continue;
      const b = -rest / c2[others[1]] + 0;
      if (Math.abs(b) > 6) continue;
      const n1 = /** @type {number[]} */ ([]);
      n1[i] = m;
      n1[others[0]] = a;
      n1[others[1]] = b;
      const d1 = int(rand, -5, 5);
      const d2 = int(rand, -5, 5);
      const names = ['x', 'y', 'z'];
      let pTex = '';
      for (let j = 0; j < 3; j++) {
        if (j === i) pTex += `${pTex ? ' + ' : ''}m${names[j]}`;
        else if (n1[j] !== 0) pTex += (pTex ? ' + ' : '') + sumTex([n1[j]], 0, [names[j]]);
      }
      pTex = pTex.replace(/\+ -/g, '- ');
      const constant = d1 === 0 ? '' : d1 < 0 ? ` - ${-d1}` : ` + ${d1}`;
      const products = [0, 1, 2].map((j) =>
        j === i ? `m \\cdot ${opTex(c2[j])}` : `${opTex(n1[j])} \\cdot ${opTex(c2[j])}`,
      );
      const s = a * c2[others[0]] + b * c2[others[1]];
      return {
        prompt: `Tìm $m$ để hai mặt phẳng $(P): ${pTex}${constant} = 0$ và $(Q): ${planeTex(n2, d2)}$ vuông góc với nhau.`,
        answer: m,
        hints: ['$(P) \\perp (Q) \\iff \\vec{n}_P \\cdot \\vec{n}_Q = 0$.'],
        steps: [
          `$\\vec{n}_P \\cdot \\vec{n}_Q = ${products.join(' + ')} = ${sumTex([c2[i]], s, ['m'])}$.`,
          `$${sumTex([c2[i]], s, ['m'])} = 0 \\iff m = ${m}$.`,
        ],
      };
    }
  },
};

/** @type {Skill} */
export const pointOnLine = {
  id: 'diem-tren-duong-thang',
  label: 'Bài 15. Điểm trên đường thẳng',
  make(rand) {
    for (;;) {
      const m = point(rand);
      const u = vector(rand, -3, 3);
      const t = nonZero(rand, -3, 3);
      const known = int(rand, 0, 2);
      if (coords(u)[known] === 0) continue;
      const ask = pick(
        rand,
        [0, 1, 2].filter((j) => j !== known),
      );
      const p = add3(m, mul3(u, t));
      const cp = coords(p);
      const cm = coords(m);
      const cu = coords(u);
      return {
        prompt: `Đường thẳng $\\Delta: ${paramTex(m, u)}$ có điểm $A$ với ${COORD_NAMES[known]} bằng $${cp[known]}$. Tìm ${COORD_NAMES[ask]} của $A$.`,
        answer: cp[ask],
        hints: [`Từ ${COORD_NAMES[known]} của $A$, tìm giá trị của tham số $t$.`],
        steps: [
          `$${affineTex(cm[known], cu[known])} = ${cp[known]}$, nên $t = ${t}$.`,
          `${capital(COORD_NAMES[ask])} của $A$: $${cm[ask]} + ${opTex(cu[ask])} \\cdot ${opTex(t)} = ${cp[ask]}$.`,
        ],
      };
    }
  },
};

/** @type {Skill} */
export const linePlaneMeet = {
  id: 'giao-diem-duong-thang-mat-phang',
  label: 'Bài 15. Giao điểm của đường thẳng và mặt phẳng',
  make(rand) {
    for (;;) {
      const m = point(rand);
      const u = vector(rand, -2, 2);
      const n = vector(rand, -2, 2);
      const nu = dot3(n, u);
      if (nu === 0) continue;
      const t = nonZero(rand, -2, 2);
      const p = add3(m, mul3(u, t));
      const D = planeD(n, p);
      const i = int(rand, 0, 2);
      const nm = dot3(n, m);
      return {
        prompt: `Tìm ${COORD_NAMES[i]} của giao điểm $I$ của đường thẳng $\\Delta: ${paramTex(m, u)}$ và mặt phẳng $(P): ${planeTex(n, D)}$.`,
        answer: coords(p)[i],
        hints: [
          'Thay $x$, $y$, $z$ theo $t$ từ phương trình của $\\Delta$ vào phương trình của $(P)$ để tìm $t$.',
        ],
        steps: [
          `Thay $x$, $y$, $z$ theo $t$ vào $(P)$ rồi rút gọn: $${sumTex([nu], nm + D, ['t'])} = 0$, nên $t = ${t}$.`,
          `$I${coordTex(p)}$, ${COORD_NAMES[i]} bằng $${coords(p)[i]}$.`,
        ],
      };
    }
  },
};

/**
 * Pairs of vectors with a whole angle between their lines (or planes):
 * the angle with cos = |u·v| / (|u|·|v|).
 */
const ANGLE_PAIRS = /** @type {Array<[P3, P3, number]>} */ ([
  [P(1, 0, 1), P(0, 1, 1), 60],
  [P(1, -1, 0), P(0, 1, -1), 60],
  [P(1, 0, 0), P(1, 1, 0), 45],
  [P(0, 1, 1), P(0, 0, 1), 45],
  [P(1, 1, 0), P(1, -1, 0), 90],
  [P(1, 2, 2), P(2, 1, -2), 90],
  [P(1, 0, -1), P(1, 0, 0), 45],
  [P(1, 1, 0), P(1, 0, 1), 60],
]);

/** @type {Skill} */
export const angleSkill = {
  id: 'goc',
  label: 'Bài 16. Góc trong không gian',
  make(rand) {
    const [u0, v0, cosAngle] = pick(rand, ANGLE_PAIRS);
    const swap = rand() < 0.5;
    const u = swap ? v0 : u0;
    const v = mul3(swap ? u0 : v0, pick(rand, [1, -1, 2]));
    const kind = int(rand, 0, 2);
    const dot = dot3(u, v);
    const uu = dot3(u, u);
    const vv = dot3(v, v);
    // Line and plane: sin(Δ, (P)) = |cos(u, n)|, so the angle is 90° − cosAngle.
    const answer = kind === 1 ? 90 - cosAngle : cosAngle;
    const setup = [
      `hai đường thẳng có vectơ chỉ phương $\\vec{u} = ${coordTex(u)}$ và $\\vec{u}' = ${coordTex(v)}$`,
      `đường thẳng có vectơ chỉ phương $\\vec{u} = ${coordTex(u)}$ và mặt phẳng có vectơ pháp tuyến $\\vec{n} = ${coordTex(v)}$`,
      `hai mặt phẳng có vectơ pháp tuyến $\\vec{n} = ${coordTex(u)}$ và $\\vec{n}' = ${coordTex(v)}$`,
    ][kind];
    const fn = kind === 1 ? '\\sin' : '\\cos';
    return {
      prompt: `Tính góc (theo độ) giữa ${setup}.`,
      answer,
      unit: '°',
      hints: [
        kind === 1
          ? 'Góc giữa đường thẳng và mặt phẳng: $\\sin = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$.'
          : 'Côsin của góc bằng giá trị tuyệt đối của tích vô hướng chia cho tích hai độ dài của hai vectơ.',
      ],
      steps: [
        `Tích vô hướng bằng $${dot}$, hai độ dài là $${sqrtTex(uu)}$ và $${sqrtTex(vv)}$.`,
        `$${fn} = \\dfrac{${Math.abs(dot)}}{${sqrtTex(uu)} \\cdot ${sqrtTex(vv)}} = ${overSqrtTex(Math.abs(dot), uu * vv)}$, nên góc bằng $${answer}^\\circ$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const sphereRadius = {
  id: 'ban-kinh-mat-cau',
  label: 'Bài 17. Bán kính mặt cầu',
  make(rand) {
    const centre = point(rand, -3, 3);
    const r = int(rand, 1, 5);
    const d = dot3(centre, centre) - r * r;
    const [a, b, c] = coords(centre);
    return {
      prompt: `Tính bán kính của mặt cầu $(S): ${sphereExpandedTex(centre, r * r)}$.`,
      answer: r,
      hints: [
        'Tâm có toạ độ bằng hệ số của $x$, $y$, $z$ chia cho $-2$.',
        '$R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
      ],
      steps: [
        `$a = ${a}$, $b = ${b}$, $c = ${c}$, $d = ${d}$.`,
        `$R = \\sqrt{${opTex(a)}^2 + ${opTex(b)}^2 + ${opTex(c)}^2 - ${opTex(d)}} = \\sqrt{${r * r}} = ${r}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const sphereCentre = {
  id: 'tam-mat-cau',
  label: 'Bài 17. Tâm mặt cầu',
  make(rand) {
    for (;;) {
      const centre = point(rand, -4, 4);
      const i = int(rand, 0, 2);
      if (coords(centre)[i] === 0) continue;
      const r = int(rand, 1, 5);
      const name = ['x', 'y', 'z'][i];
      return {
        prompt: `Tìm ${COORD_NAMES[i]} của tâm mặt cầu $(S): ${sphereExpandedTex(centre, r * r)}$.`,
        answer: coords(centre)[i],
        hints: ['So sánh với $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$.'],
        steps: [
          `Hệ số của $${name}$ là $${-2 * coords(centre)[i]}$, chia cho $-2$ được $${coords(centre)[i]}$.`,
          `Tâm $I${coordTex(centre)}$.`,
        ],
      };
    }
  },
};

export const CHAPTER_SKILLS = [
  planeThroughPoint,
  pointPlaneDistance,
  perpendicularPlanes,
  pointOnLine,
  linePlaneMeet,
  angleSkill,
  sphereRadius,
  sphereCentre,
];
