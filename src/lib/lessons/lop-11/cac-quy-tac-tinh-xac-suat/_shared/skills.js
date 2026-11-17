/**
 * Question generators for the chapter "Các quy tắc tính xác suất", for the
 * drill board of its review lesson. Answers are counts of outcomes (natural
 * numbers) or probabilities, read with `readProbability` and written with
 * `probText`. Prompts, hints and steps are rich text with inline TeX.
 */

import { countsAsNaturals, int, pick } from '#lib/core/drill.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import { gcd } from '#lib/numtheory-engine/index.js';
import { countTex, isShortDecimal } from './probability.js';

/** @typedef {import('#lib/core/drill.js').Skill} Skill */

/** Divisor pairs for "chia hết cho a hoặc b" card questions. */
const DIVISORS = [
  [2, 3],
  [2, 5],
  [3, 4],
  [3, 5],
  [4, 6],
  [2, 7],
  [3, 7],
];

/**
 * The counts behind a card question: n(E), n(F), n(EF) among 1..m.
 * @param {number} m
 * @param {number} a
 * @param {number} b
 */
export function cardCounts(m, a, b) {
  const l = (a * b) / gcd(a, b);
  return { p: Math.floor(m / a), q: Math.floor(m / b), pq: Math.floor(m / l), l };
}

/** @param {() => number} rand */
function drawCards(rand) {
  const [a, b] = pick(rand, DIVISORS);
  const m = int(rand, 4, 8) * 5;
  return { a, b, m, ...cardCounts(m, a, b) };
}

/** @param {{ a: number, b: number, m: number }} c */
const cardStory = ({ a, b, m }) =>
  `Một hộp có $${m}$ tấm thẻ đánh số từ $1$ đến $${m}$; rút ngẫu nhiên một thẻ. $E$: "Số trên thẻ chia hết cho $${a}$", $F$: "Số trên thẻ chia hết cho $${b}$".`;

/** @type {Skill} */
export const hopGiao = countsAsNaturals({
  id: 'hop-giao',
  label: 'Bài 28. Biến cố hợp, biến cố giao',
  make(rand) {
    const c = drawCards(rand);
    if (rand() < 0.5) {
      return {
        prompt: `${cardStory(c)} Biến cố giao $EF$ có bao nhiêu kết quả thuận lợi?`,
        answer: c.pq,
        hints: [
          `$EF$: số trên thẻ chia hết cho cả $${c.a}$ và $${c.b}$, tức là chia hết cho $${c.l}$.`,
        ],
        steps: [
          `Số chia hết cho cả $${c.a}$ và $${c.b}$ là số chia hết cho $${c.l}$.`,
          `Từ $1$ đến $${c.m}$ có $${c.pq}$ số chia hết cho $${c.l}$.`,
        ],
      };
    }
    const u = c.p + c.q - c.pq;
    return {
      prompt: `${cardStory(c)} Biến cố hợp $E \\cup F$ có bao nhiêu kết quả thuận lợi?`,
      answer: u,
      hints: [`Đếm $n(E)$, $n(F)$, rồi trừ các số được đếm hai lần (chia hết cho $${c.l}$).`],
      steps: [
        `$n(E) = ${c.p}$, $n(F) = ${c.q}$, $n(EF) = ${c.pq}$ (các số chia hết cho $${c.l}$).`,
        `$n(E \\cup F) = ${c.p} + ${c.q} - ${c.pq} = ${u}$.`,
      ],
    };
  },
});

/** @type {Skill} */
export const congXacSuat = {
  id: 'cong',
  label: 'Bài 29. Công thức cộng xác suất',
  make(rand) {
    const v = int(rand, 0, 2);
    if (v === 0) {
      const c = drawCards(rand);
      const u = c.p + c.q - c.pq;
      return {
        prompt: `${cardStory(c)} Tính $P(E \\cup F)$, xác suất số trên thẻ chia hết cho $${c.a}$ hoặc cho $${c.b}$${isShortDecimal(u / c.m) ? '' : ' (viết dạng phân số)'}.`,
        answer: u / c.m,
        hints: [
          'Dùng công thức cộng $P(E \\cup F) = P(E) + P(F) - P(EF)$.',
          `$EF$: số chia hết cho $${c.l}$.`,
        ],
        steps: [
          `$n(E) = ${c.p}$, $n(F) = ${c.q}$, $n(EF) = ${c.pq}$.`,
          `$P(E \\cup F) = \\dfrac{${c.p}}{${c.m}} + \\dfrac{${c.q}}{${c.m}} - \\dfrac{${c.pq}}{${c.m}} = ${countTex(u, c.m)}$.`,
        ],
      };
    }
    const a = int(rand, 3, 7) / 10;
    const b = int(rand, 2, 6) / 10;
    const lo = Math.max(0, Math.round((a + b - 1) * 20));
    const hi = Math.round(Math.min(a, b) * 20);
    const ab = tidy(int(rand, Math.max(lo, 1), hi) / 20);
    const union = tidy(a + b - ab);
    if (v === 1) {
      return {
        prompt: `Cho hai biến cố $A$, $B$ với $P(A) = ${numTex(a)}$, $P(B) = ${numTex(b)}$ và $P(AB) = ${numTex(ab)}$. Tính $P(A \\cup B)$.`,
        answer: union,
        hints: ['Dùng công thức cộng xác suất; đừng quên trừ $P(AB)$.'],
        steps: [
          `$P(A \\cup B) = P(A) + P(B) - P(AB) = ${numTex(a)} + ${numTex(b)} - ${numTex(ab)} = ${numTex(union)}$.`,
        ],
      };
    }
    return {
      prompt: `Cho hai biến cố $A$, $B$ với $P(A) = ${numTex(a)}$, $P(B) = ${numTex(b)}$ và $P(A \\cup B) = ${numTex(union)}$. Tính $P(AB)$.`,
      answer: ab,
      hints: ['Viết công thức cộng rồi chuyển vế để tìm $P(AB)$.'],
      steps: [
        `$P(AB) = P(A) + P(B) - P(A \\cup B) = ${numTex(a)} + ${numTex(b)} - ${numTex(union)} = ${numTex(ab)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const nhanXacSuat = {
  id: 'nhan',
  label: 'Bài 30. Công thức nhân, sơ đồ cây',
  make(rand) {
    const p = int(rand, 5, 9) / 10;
    const q = int(rand, 4, 9) / 10;
    const np = tidy(1 - p);
    const nq = tidy(1 - q);
    const story = `Hai xạ thủ bắn độc lập vào một bia, mỗi người một viên, với xác suất bắn trúng lần lượt là $${numTex(p)}$ và $${numTex(q)}$.`;
    const v = int(rand, 0, 3);
    if (v === 0) {
      const ans = tidy(p * q);
      return {
        prompt: `${story} Tính xác suất cả hai xạ thủ đều bắn trúng.`,
        answer: ans,
        hints: ['Hai biến cố độc lập: dùng công thức nhân.'],
        steps: [`$P(AB) = ${numTex(p)} \\cdot ${numTex(q)} = ${numTex(ans)}$.`],
      };
    }
    if (v === 1) {
      const none = tidy(np * nq);
      const ans = tidy(1 - none);
      return {
        prompt: `${story} Tính xác suất có ít nhất một xạ thủ bắn trúng.`,
        answer: ans,
        hints: ['Biến cố đối là "cả hai đều bắn trượt".'],
        steps: [
          `$P(\\overline{A}\\,\\overline{B}) = ${numTex(np)} \\cdot ${numTex(nq)} = ${numTex(none)}$.`,
          `$P(A \\cup B) = 1 - ${numTex(none)} = ${numTex(ans)}$.`,
        ],
      };
    }
    if (v === 2) {
      const x = tidy(p * nq);
      const y = tidy(np * q);
      const ans = tidy(x + y);
      return {
        prompt: `${story} Tính xác suất có đúng một xạ thủ bắn trúng.`,
        answer: ans,
        hints: ['Có hai lá xung khắc trên sơ đồ cây: $A\\overline{B}$ và $\\overline{A}B$.'],
        steps: [
          `$P(A\\overline{B}) = ${numTex(p)} \\cdot ${numTex(nq)} = ${numTex(x)}$; $P(\\overline{A}B) = ${numTex(np)} \\cdot ${numTex(q)} = ${numTex(y)}$.`,
          `$P = ${numTex(x)} + ${numTex(y)} = ${numTex(ans)}$.`,
        ],
      };
    }
    const ans = tidy(np * nq);
    return {
      prompt: `${story} Tính xác suất cả hai xạ thủ đều bắn trượt.`,
      answer: ans,
      hints: ['$\\overline{A}$ và $\\overline{B}$ cũng độc lập.'],
      steps: [
        `$P(\\overline{A}\\,\\overline{B}) = ${numTex(np)} \\cdot ${numTex(nq)} = ${numTex(ans)}$.`,
      ],
    };
  },
};

/** @type {Skill} */
export const bienCoDoi = {
  id: 'doi',
  label: 'Biến cố đối, "ít nhất một"',
  make(rand) {
    const k = int(rand, 2, 3);
    const face = int(rand, 1, 6);
    const n = 6 ** k;
    const miss = 5 ** k;
    const word = k === 2 ? 'hai' : 'ba';
    return {
      prompt: `Gieo một con xúc xắc cân đối ${word} lần. Tính xác suất có ít nhất một lần xuất hiện mặt $${face}$ chấm (viết dạng phân số).`,
      answer: (n - miss) / n,
      hints: [
        `Biến cố đối: không lần nào ra mặt $${face}$ chấm. Đếm số kết quả của biến cố đối: mỗi lần gieo có $5$ mặt khác mặt $${face}$ chấm.`,
      ],
      steps: [
        `Không gian mẫu có $6^${k} = ${n}$ kết quả; biến cố "không lần nào ra mặt $${face}$ chấm" có $5^${k} = ${miss}$ kết quả, xác suất $\\dfrac{${miss}}{${n}}$.`,
        `Xác suất cần tìm: $1 - \\dfrac{${miss}}{${n}} = \\dfrac{${n - miss}}{${n}}$.`,
      ],
    };
  },
};

export const CHAPTER_SKILLS = [hopGiao, congXacSuat, nhanXacSuat, bienCoDoi];
