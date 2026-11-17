import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { FRACTION_OP_SKILLS } from './fraction-op-skills.js';
import { FRACTION_SKILLS, comparePair } from './fraction-skills.js';
import { add, div, fracSign, mul, reduce, sameValue, sub } from './fractions.js';
import {
  GEOMETRY_MEASURE_SKILLS,
  birthStory,
  convertQuestion,
  riceStory,
  tileStory,
} from './geometry-measure-skills.js';
import { NUMBER_SKILLS, cardNumbers } from './number-skills.js';
import {
  OPERATION_SKILLS,
  SUM_STORIES,
  fuelStory,
  productWords,
  sumDiffStory,
  trainStory,
} from './operation-skills.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */
/** @typedef {import('./visual.js').Frac} Frac */

const SETS = [
  NUMBER_SKILLS,
  OPERATION_SKILLS,
  FRACTION_SKILLS,
  FRACTION_OP_SKILLS,
  GEOMETRY_MEASURE_SKILLS,
];

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * The number a text holds, without its grouping: '21 000 l' is 21000.
 * @param {string} text
 */
const numberIn = (text) => Number((text.replace(/[\s\u202f]/g, '').match(/\d+/) ?? [])[0]);

/**
 * The fraction an option draws.
 * @param {Question} q
 * @param {number} i
 * @returns {Frac}
 */
const fracAt = (q, i) => /** @type {any} */ (q.options[i]).fracs[0];

describe('every year-end review question', () => {
  it('has distinct options, a valid answer and no broken text', () => {
    const bad = [];
    for (const skill of SETS.flat()) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')}`;
        if (new Set(texts).size !== texts.length || texts.length < 3) bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\.\d|Infinity|null|object| -\d/.test(all)) bad.push([skill.id, all]);
        const plain =
          skill.id === 'the-ki' ? all.replace(/\b(9\d\d|1\d{3}|20\d\d)\b/g, 'năm') : all;
        if (
          /(?<![\d/])\d{5,}(?![\d/])/.test(plain) ||
          /(?<![Nn]ăm |[\d/])\d{4}(?![\d/])/.test(plain)
        ) {
          bad.push([skill.id, 'ungrouped', all]);
        }
        const right = rightText(q);
        const word = new RegExp(
          `(?<![\\d/\u202f])${right.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\d/])`,
        );
        if (right.length > 2 && word.test(q.hint)) bad.push([skill.id, 'hint', right]);
        if (q.optionLabels && q.optionLabels.length !== texts.length)
          bad.push([skill.id, 'labels']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never offers two fraction options of the same value', () => {
    const bad = [];
    for (const skill of [...FRACTION_SKILLS, ...FRACTION_OP_SKILLS]) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        if (typeof q.options[0] === 'string') continue;
        const fracs = q.options.map((_, i) => fracAt(q, i));
        for (let i = 0; i < fracs.length; i++)
          for (let j = i + 1; j < fracs.length; j++)
            if (sameValue(fracs[i], fracs[j])) bad.push([skill.id, fracs]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps each review to one set of distinct parts', () => {
    for (const skills of SETS) {
      expect(skills.length).toBeLessThanOrEqual(12);
      expect(new Set(skills.map((s) => s.id)).size).toBe(skills.length);
    }
  });
});

describe('the answers', () => {
  it('works out the column calculations', () => {
    const bad = [];
    for (const skill of OPERATION_SKILLS) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        if (q.visual?.type !== 'column') continue;
        const { a, b, op } = q.visual;
        const want = op === '+' ? a + b : op === '-' ? a - b : a * b;
        if (numberIn(rightText(q)) !== want) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('works out the divisions', () => {
    const bad = [];
    const divide = OPERATION_SKILLS.find((s) => s.id === 'chia');
    for (let seed = 1; seed <= 80; seed++) {
      const q = /** @type {NonNullable<typeof divide>} */ (divide).make(rng(seed));
      const [n, d] = (q.prompt.replace(/\u202f/g, '').match(/\d+/g) ?? []).map(Number);
      const want = n % d ? `${Math.floor(n / d)} (dư ${n % d})` : `${Math.floor(n / d)}`;
      if (rightText(q).replace(/\u202f/g, '') !== want) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('works out the fraction calculations shown in a line', () => {
    const bad = [];
    const ops = { '+': add, '−': sub, '×': mul, ':': div };
    for (const skill of [...FRACTION_SKILLS, ...FRACTION_OP_SKILLS]) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        const v = q.visual;
        if (v?.type !== 'fracs' || typeof q.options[0] === 'string') continue;
        const items = v.items.map((it) =>
          it === '?' || typeof it !== 'string' || !/^\d+$/.test(it) ? it : { n: Number(it), d: 1 },
        );
        if (items.at(-2) !== '=' || items.length < 5) continue;
        if (
          items.some(
            (it, i) =>
              i % 2 === 1 && i < items.length - 2 && !(typeof it === 'string' && it in ops),
          )
        )
          continue;
        // Left to right, as these expressions only mix + and − or have one sign.
        let acc = /** @type {Frac} */ (items[0]);
        for (let i = 1; i < items.length - 2; i += 2) {
          acc = ops[/** @type {keyof typeof ops} */ (items[i])](
            acc,
            /** @type {Frac} */ (items[i + 1]),
          );
        }
        if (!sameValue(acc, fracAt(q, q.answer)))
          bad.push([skill.id, v.items, fracAt(q, q.answer)]);
        const r = fracAt(q, q.answer);
        if (reduce(r.n, r.d).d !== r.d && skill.id !== 'phan-so-bang-nhau')
          bad.push([skill.id, 'not reduced', r]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('compares fractions by cross-multiplying', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const { f, g } = comparePair(rng(seed));
      if (f.n * g.d === g.n * f.d) bad.push([f, g]);
      const sign = fracSign(f, g);
      if ((sign === '<') !== f.n / f.d < g.n / g.d) bad.push([f, g, sign]);
    }
    expect(bad).toEqual([]);
  });

  it('builds the smallest and largest numbers from the cards', () => {
    expect(cardNumbers([0, 1, 2, 3]).filter((v) => v % 2 === 0)[0]).toBe(1032);
    expect(cardNumbers([0, 1, 2, 3]).at(-1)).toBe(3210);
  });

  it('solves the stories of the book', () => {
    const tanker = sumDiffStory(SUM_STORIES[0], 18000, 3000, true);
    expect(numberIn(rightText(tanker))).toBe(21000);
    const train = trainStory(9, 8, 14500, 100);
    expect(train.prompt).toContain(fmt(15300));
    expect(train.prompt).toContain(fmt(13600));
    expect(numberIn(rightText(train))).toBe(14500);
    expect(numberIn(rightText(fuelStory(300, 10, 23400)))).toBe(702000);
    expect(productWords(305, 38)).toContain(`= ${fmt(11590)}.`);
    expect(numberIn(rightText(riceStory(1, 540, { n: 2, d: 7 })))).toBe(1980);
    expect(numberIn(rightText(tileStory(8, 6, 50)))).toBe(192);
    expect(rightText(birthStory(2024, 10, 30))).toBe('Thế kỉ XX');
    const area = convertQuestion({ big: 'm²', small: 'dm²', ratio: 100 }, 5, 52);
    expect(numberIn(rightText(area))).toBe(552);
    const back = convertQuestion({ big: 'dm²', small: 'cm²', ratio: 100 }, 2, 0, true);
    expect(rightText(back)).toBe('2 dm²');
  });
});
