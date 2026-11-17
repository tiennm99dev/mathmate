/**
 * The adaptive review of the whole term: mixed numbers and fractions written
 * as decimals, then a few parts from each review of this chapter (decimals,
 * operations, plane shapes, areas and measures). Pure and DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { circleAreaSkill, trapezoidSkill, triangleSkill } from './area-skills.js';
import { compareSkill, roundSkill } from './decimal-skills.js';
import { num, valueOptions } from '#lib/core/kid/decimals.js';
import { areaSkill } from './measure-skills.js';
import { convenientSkill, divideSkill, multiplySkill, storySkill } from './operation-skills.js';
import { heightSkill } from './shape-skills.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * Denominators that make a decimal fraction: each with the factor that turns
 * it into 10, 100 or 1 000 and the number of zeros that gives.
 */
const TO_DECIMAL = /** @type {const} */ ([
  { q: 2, m: 5, k: 1 },
  { q: 5, m: 2, k: 1 },
  { q: 4, m: 25, k: 2 },
  { q: 20, m: 5, k: 2 },
  { q: 25, m: 4, k: 2 },
  { q: 50, m: 2, k: 2 },
  { q: 125, m: 8, k: 3 },
  { q: 250, m: 4, k: 3 },
]);

/**
 * A mixed number written as a fraction.
 * @param {() => number} rand
 * @returns {Question}
 */
function mixedQuestion(rand) {
  const b = int(rand, 3, 10);
  const a = int(rand, 1, b - 1);
  const w = int(rand, 2, 9);
  const top = w * b + a;
  // Writing the digits side by side gives the right fraction when b is 10.
  const glued = b === 10 ? `${(w + 1) * b + a}/${b}` : `${w}${a}/${b}`;
  const wrong = [`${w + a}/${b}`, `${w * a + b}/${b}`, glued, `${top}/${a}`];
  return {
    prompt: `Hỗn số ${w} ${a}/${b} viết thành phân số nào?`,
    ...mixOptions(rand, `${top}/${b}`, wrong),
    hint: 'Em lấy phần nguyên nhân với mẫu số, rồi cộng với tử số. Mẫu số giữ nguyên.',
    solution: `${w} ${a}/${b} = (${w} × ${b} + ${a})/${b} = ${top}/${b}.`,
  };
}

/**
 * A fraction turned into a decimal fraction, then into a decimal.
 * @param {() => number} rand
 * @returns {Question}
 */
function fractionQuestion(rand) {
  const { q, m, k } = pick(rand, TO_DECIMAL);
  let p = int(rand, 1, Math.min(3 * q, Math.floor(999 / m)));
  if (p % q === 0) p += 1;
  const den = 10 ** k;
  const right = (p * m) / den;
  return {
    prompt: `Phân số ${p}/${fmt(q)} viết thành số thập phân là số nào?`,
    ...valueOptions(right, [(p * m) / den / 10, ((p * m) / den) * 10, p / den]),
    hint: `Em nhân cả tử số và mẫu số với cùng một số để mẫu số là 10; 100 hoặc ${fmt(1000)}.`,
    solution: `${p}/${fmt(q)} = (${p} × ${m})/(${fmt(q)} × ${m}) = ${p * m}/${fmt(den)} = ${num(right)}.`,
  };
}

/** @type {Skill} */
export const mixedSkill = {
  id: 'hon-so-phan-so',
  label: 'Hỗn số, phân số và số thập phân',
  make: (rand) => (rand() < 0.5 ? mixedQuestion(rand) : fractionQuestion(rand)),
};

/** @type {Skill[]} */
export const GENERAL_SKILLS = [
  mixedSkill,
  compareSkill,
  roundSkill,
  multiplySkill,
  divideSkill,
  convenientSkill,
  storySkill,
  heightSkill,
  triangleSkill,
  trapezoidSkill,
  circleAreaSkill,
  areaSkill,
];
