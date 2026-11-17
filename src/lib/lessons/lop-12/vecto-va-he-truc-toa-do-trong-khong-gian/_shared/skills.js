/**
 * Question generators for the chapter "Vectơ và hệ trục toạ độ trong không
 * gian", for the drill board of the chapter review: dot products in a cube,
 * coordinates of vectors, sums and multiples, dot products, lengths,
 * perpendicular vectors, centroids and cross products. Every answer is an
 * integer or a fraction p/q, read with `readNumber` and written with
 * `numberText` from `#lib/core/decimal.js`. Prompts, hints and steps are rich
 * text.
 */

import { int, nonZero, pick, shuffle } from '#lib/core/drill.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import {
  P,
  add3,
  arrowTex,
  coordTex,
  coords,
  cross3,
  cubeDot,
  cubeVector,
  dot3,
  mul3,
  opTex,
  sub3,
} from './space.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */
/** @typedef {import('./space.js').P3} P3 */

/** The names of the three coordinates, in order. */
export const COORD_NAMES = ['hoành độ', 'tung độ', 'cao độ'];

/** @param {() => number} rand @param {number} [lo] @param {number} [hi] */
const point = (rand, lo = -4, hi = 4) => P(int(rand, lo, hi), int(rand, lo, hi), int(rand, lo, hi));

/** @param {() => number} rand a vector that is not the zero vector */
function vector(rand, lo = -3, hi = 3) {
  for (;;) {
    const v = point(rand, lo, hi);
    if (v.x || v.y || v.z) return v;
  }
}

/** Pairs of cube vectors whose dot product the drill asks for. */
const CUBE_PAIRS = /** @type {[[string, string], [string, string]][]} */ ([
  [
    ['A', 'B'],
    ["A'", "C'"],
  ],
  [
    ['A', 'B'],
    ['A', "C'"],
  ],
  [
    ['A', 'C'],
    ["B'", "D'"],
  ],
  [
    ['A', "D'"],
    ['B', "C'"],
  ],
  [
    ['A', 'C'],
    ["C'", "A'"],
  ],
  [
    ['A', "B'"],
    ['A', "D'"],
  ],
  [
    ['A', "C'"],
    ["A'", 'C'],
  ],
]);

/** @type {Skill} */
export const cubeDotSkill = {
  id: 'tich-vo-huong-hinh-lap-phuong',
  label: 'Bài 6. Tích vô hướng trong hình lập phương',
  make(rand) {
    const a = pick(rand, [1, 2, 3]);
    const [u, v] = pick(rand, CUBE_PAIRS);
    const d = cubeDot(cubeVector(u[0], u[1]), cubeVector(v[0], v[1]));
    const ut = arrowTex(u[0], u[1]);
    const vt = arrowTex(v[0], v[1]);
    const answer = d.k * a * a;
    return {
      prompt: `Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh $a = ${a}$. Tính $${ut} \\cdot ${vt}$.`,
      answer,
      hints: [
        'Đưa hai vectơ về chung điểm đầu bằng các vectơ bằng nhau trong hình lập phương để thấy góc giữa chúng.',
        `$|${ut}| = ${d.lenU}$, $|${vt}| = ${d.lenV}$.`,
      ],
      steps: [
        `$|${ut}| = ${d.lenU}$, $|${vt}| = ${d.lenV}$, $\\cos(${ut}, ${vt}) = ${d.cos}$.`,
        `$${ut} \\cdot ${vt} = ${d.lenU} \\cdot ${d.lenV} \\cdot ${d.cos.startsWith('-') ? `\\left(${d.cos}\\right)` : d.cos} = ${d.product}$.`,
        `Với $a = ${a}$: $${ut} \\cdot ${vt} = ${answer}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const vectorCoords = {
  id: 'toa-do-vecto',
  label: 'Bài 7. Toạ độ của vectơ theo hai điểm',
  make(rand) {
    const A = point(rand);
    const B = point(rand);
    const k = int(rand, 0, 2);
    const ab = sub3(B, A);
    const [ca, cb] = [coords(A), coords(B)];
    const parts = [0, 1, 2].map((i) => `${cb[i]} - ${opTex(ca[i])}`);
    return {
      prompt: `Cho $A${coordTex(A)}$ và $B${coordTex(B)}$. Tìm ${COORD_NAMES[k]} của vectơ $\\overrightarrow{AB}$.`,
      answer: coords(ab)[k],
      hints: [
        'Toạ độ của $\\overrightarrow{AB}$: lấy toạ độ điểm cuối $B$ trừ toạ độ điểm đầu $A$.',
      ],
      steps: [
        `$\\overrightarrow{AB} = (${parts.join('; ')}) = ${coordTex(ab)}$.`,
        `${COORD_NAMES[k][0].toUpperCase()}${COORD_NAMES[k].slice(1)} của $\\overrightarrow{AB}$ là $${coords(ab)[k]}$.`,
      ],
    };
  },
};

/** @param {number} k a coefficient in front of a vector: '', '-', '3' */
const coefTex = (k) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);

/** @type {Skill} */
export const combination = {
  id: 'cong-tru-nhan-so',
  label: 'Bài 8. Tổng, hiệu và tích với một số',
  make(rand) {
    const u = vector(rand);
    const v = vector(rand);
    const h = pick(rand, [1, 2, 3, -1, -2]);
    const k = pick(rand, [1, 2, 3, -1, -2, -3]);
    const w = add3(mul3(u, h), mul3(v, k));
    const i = int(rand, 0, 2);
    const expr = `${coefTex(h)}\\vec{u} ${k < 0 ? '-' : '+'} ${coefTex(Math.abs(k))}\\vec{v}`;
    return {
      prompt: `Cho $\\vec{u} = ${coordTex(u)}$ và $\\vec{v} = ${coordTex(v)}$. Tìm ${COORD_NAMES[i]} của vectơ $\\vec{w} = ${expr}$.`,
      answer: coords(w)[i],
      hints: [
        'Nhân từng toạ độ với số, rồi cộng các toạ độ tương ứng.',
        `$${coefTex(h)}\\vec{u} = ${coordTex(mul3(u, h))}$.`,
      ],
      steps: [
        `$${coefTex(h)}\\vec{u} = ${coordTex(mul3(u, h))}$, $${coefTex(k)}\\vec{v} = ${coordTex(mul3(v, k))}$.`,
        `$\\vec{w} = ${coordTex(w)}$, ${COORD_NAMES[i]} bằng $${coords(w)[i]}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const dotProduct = {
  id: 'tich-vo-huong',
  label: 'Bài 8. Tích vô hướng bằng toạ độ',
  make(rand) {
    const u = vector(rand);
    const v = vector(rand);
    const [a, b] = [coords(u), coords(v)];
    return {
      prompt: `Cho $\\vec{u} = ${coordTex(u)}$ và $\\vec{v} = ${coordTex(v)}$. Tính $\\vec{u} \\cdot \\vec{v}$.`,
      answer: dot3(u, v),
      hints: ["$\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$."],
      steps: [
        `$\\vec{u} \\cdot \\vec{v} = ${a.map((x, i) => `${opTex(x)} \\cdot ${opTex(b[i])}`).join(' + ')} = ${dot3(u, v)}$.`,
      ],
    };
  },
};

/** Whole vectors with whole lengths: (a, b, c) and a² + b² + c² = d². */
const QUADRUPLES = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [1, 4, 8, 9],
  [4, 4, 7, 9],
  [2, 6, 9, 11],
  [2, 10, 11, 15],
];

/** @type {Skill} */
export const distance = {
  id: 'do-dai',
  label: 'Bài 8. Độ dài và khoảng cách',
  make(rand) {
    const [a, b, c, d] = pick(rand, QUADRUPLES);
    const [x, y, z] = shuffle(rand, [a, b, c]).map((t) => (rand() < 0.5 ? -t : t));
    const A = point(rand, -3, 3);
    const B = add3(A, P(x, y, z));
    const ab = sub3(B, A);
    return {
      prompt: `Cho $A${coordTex(A)}$ và $B${coordTex(B)}$. Tính độ dài đoạn thẳng $AB$.`,
      answer: d,
      hints: [
        'Tìm toạ độ $\\overrightarrow{AB}$, rồi dùng $AB = \\sqrt{x^2 + y^2 + z^2}$ với $(x; y; z)$ là toạ độ của $\\overrightarrow{AB}$.',
      ],
      steps: [
        `$\\overrightarrow{AB} = ${coordTex(ab)}$.`,
        `$AB = \\sqrt{${coords(ab)
          .map((t) => `${opTex(t)}^2`)
          .join(' + ')}} = \\sqrt{${d * d}} = ${d}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const perpendicular = {
  id: 'vuong-goc',
  label: 'Bài 8. Hai vectơ vuông góc',
  make(rand) {
    // u = (m; b; c), v = (p; q; r): u · v = pm + bq + cr = 0.
    const p = nonZero(rand, -3, 3);
    const b = int(rand, -3, 3);
    const c = int(rand, -3, 3);
    const q = int(rand, -3, 3);
    const r = int(rand, -3, 3);
    const rest = b * q + c * r;
    const g = gcd(Math.abs(rest), Math.abs(p)) || 1;
    const answer = rest === 0 ? 0 : -rest / p;
    const num = rest === 0 ? 0 : (-rest * Math.sign(p)) / g;
    const den = Math.abs(p) / g;
    const mTex = den === 1 ? `${num}` : `${num < 0 ? '-' : ''}\\dfrac{${Math.abs(num)}}{${den}}`;
    return {
      prompt: `Tìm $m$ để hai vectơ $\\vec{u} = (m; ${b}; ${c})$ và $\\vec{v} = ${coordTex(P(p, q, r))}$ vuông góc với nhau.`,
      answer,
      hints: ['$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.'],
      steps: [
        `$\\vec{u} \\cdot \\vec{v} = ${opTex(p)}m + ${opTex(b)} \\cdot ${opTex(q)} + ${opTex(c)} \\cdot ${opTex(r)} = ${p === 1 ? '' : p === -1 ? '-' : p}m ${rest < 0 ? '-' : '+'} ${Math.abs(rest)}$.`,
        `$\\vec{u} \\cdot \\vec{v} = 0 \\iff m = ${mTex}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const centroid = {
  id: 'trong-tam',
  label: 'Bài 8. Trung điểm và trọng tâm',
  make(rand) {
    for (;;) {
      const A = point(rand);
      const B = point(rand);
      const G = point(rand, -2, 2);
      // C chosen so that A + B + C = 3G.
      const C = sub3(mul3(G, 3), add3(A, B));
      if ([C.x, C.y, C.z].some((t) => Math.abs(t) > 6)) continue;
      const lines = [A, B, C].map(coords);
      if (lines.some((l, i) => lines.findIndex((m) => m.join() === l.join()) !== i)) continue;
      const i = int(rand, 0, 2);
      const sums = [0, 1, 2].map((j) => lines.map((l) => opTex(l[j])).join(' + '));
      return {
        prompt: `Cho tam giác $ABC$ với $A${coordTex(A)}$, $B${coordTex(B)}$, $C${coordTex(C)}$. Tìm ${COORD_NAMES[i]} của trọng tâm $G$.`,
        answer: coords(G)[i],
        hints: ['Mỗi toạ độ của trọng tâm là trung bình cộng các toạ độ tương ứng của ba đỉnh.'],
        steps: [
          `${COORD_NAMES[i][0].toUpperCase()}${COORD_NAMES[i].slice(1)} của $G$: $\\dfrac{${sums[i]}}{3} = ${coords(G)[i]}$.`,
        ],
      };
    }
  },
};

/** @type {Skill} */
export const crossProduct = {
  id: 'tich-co-huong',
  label: 'Mở rộng. Tích có hướng',
  make(rand) {
    const u = vector(rand, -2, 3);
    const v = vector(rand, -2, 3);
    const w = cross3(u, v);
    const i = int(rand, 0, 2);
    const [x, y, z] = coords(u).map(opTex);
    const [x2, y2, z2] = coords(v).map(opTex);
    return {
      prompt: `Cho $\\vec{u} = ${coordTex(u)}$ và $\\vec{v} = ${coordTex(v)}$. Tìm ${COORD_NAMES[i]} của vectơ $[\\vec{u}, \\vec{v}]$.`,
      answer: coords(w)[i],
      hints: ["$[\\vec{u}, \\vec{v}] = (yz' - zy'; zx' - xz'; xy' - yx')$."],
      steps: [
        `$[\\vec{u}, \\vec{v}] = (${y} \\cdot ${z2} - ${z} \\cdot ${y2}; ${z} \\cdot ${x2} - ${x} \\cdot ${z2}; ${x} \\cdot ${y2} - ${y} \\cdot ${x2}) = ${coordTex(w)}$.`,
        `${COORD_NAMES[i][0].toUpperCase()}${COORD_NAMES[i].slice(1)} cần tìm là $${coords(w)[i]}$.`,
      ],
    };
  },
};

export const CHAPTER_SKILLS = [
  cubeDotSkill,
  vectorCoords,
  combination,
  dotProduct,
  distance,
  perpendicular,
  centroid,
  crossProduct,
];
