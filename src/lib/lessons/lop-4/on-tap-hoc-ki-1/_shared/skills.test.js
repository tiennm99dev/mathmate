import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { ADDSUB_SKILLS, SUM_STORIES, convenientTriple, sumDiffStory } from './addsub-skills.js';
import { GENERAL_SKILLS, evenCount, fenceStory, mulDiv, saltStory } from './general-skills.js';
import { GEOMETRY_SKILLS, degreeOptions, kindMeasure } from './geometry-skills.js';
import {
  MEASURE_SKILLS,
  calfStory,
  centuryQuestion,
  compareQuestion,
  convertQuestion,
  plotStory,
} from './measure-skills.js';
import { NUMBER_SKILLS, classDigits, writingSlips } from './number-skills.js';
import { oppositeSide, sideName, sidesAt } from './shapes.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */

const SETS = [NUMBER_SKILLS, ADDSUB_SKILLS, GEOMETRY_SKILLS, MEASURE_SKILLS, GENERAL_SKILLS];

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * The number an option starts with, without its grouping.
 * @param {string} text
 */
const firstNumber = (text) => Number((text.replace(/\s/g, '').match(/\d+/) ?? [])[0]);

describe('every review question', () => {
  it('has distinct options, a valid answer and no broken text', () => {
    const bad = [];
    for (const skill of SETS.flat()) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')}`;
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\.\d|Infinity|null| -\d/.test(all)) bad.push([skill.id, all]);
        if (/\b\d{5,}\b/.test(all) || /(?<![Nn]ăm )\b\d{4}\b/.test(all)) {
          bad.push([skill.id, 'ungrouped', all]);
        }
        const right = rightText(q);
        if (right.length > 2 && q.hint.includes(right)) bad.push([skill.id, 'hint', right]);
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

  it('stores the answers that the column work gives', () => {
    const bad = [];
    for (const skill of ADDSUB_SKILLS) {
      for (let seed = 1; seed <= 60; seed++) {
        const q = skill.make(rng(seed));
        if (q.visual?.type !== 'column') continue;
        const { a, b, op } = q.visual;
        const want = op === '+' ? a + b : a - b;
        if (firstNumber(rightText(q)) !== want || want > 999999) bad.push(q.prompt);
        if (!q.solution.endsWith(`= ${rightText(q)}.`)) bad.push(q.solution);
      }
    }
    expect(bad).toEqual([]);
  });

  it('works out multiplications and divisions', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = mulDiv.make(rng(seed));
      const [a, d] = q.prompt
        .replace(/\u202f/g, '')
        .match(/\d+/g)
        ?.map(Number) ?? [0, 0];
      const want = q.prompt.includes('×') ? a * d : a / d;
      if (firstNumber(rightText(q)) !== want || !Number.isInteger(want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('counts even and odd numbers', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const q = evenCount.make(rng(seed));
      const list =
        q.prompt
          .split(',')[0]
          .replace(/\u202f/g, '')
          .match(/\d+/g)
          ?.map(Number) ?? [];
      const even = list.filter((n) => n % 2 === 0).length;
      const want = q.prompt.includes('chẵn') ? even : list.length - even;
      if (list.length !== 5 || Number(rightText(q)) !== want) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});

describe('numbers to the class of millions', () => {
  it('lists the digits of a class', () => {
    expect(classDigits(517906384, 2)).toBe('5, 1, 7');
    expect(classDigits(517906384, 1)).toBe('9, 0, 6');
    expect(classDigits(517906384, 0)).toBe('3, 8, 4');
  });

  it('writes slips that are other numbers', () => {
    const slips = writingSlips(5240601);
    expect(slips).not.toContain(5240601);
    expect(slips.length).toBeGreaterThanOrEqual(3);
  });
});

describe('addition and subtraction', () => {
  it('pairs two numbers into a round ten thousand', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const { a, c } = convenientTriple(rng(seed));
      expect(a + c).toBe(10000);
      expect(a % 10).toBe(0);
    }
  });

  it('finds two numbers from their sum and difference', () => {
    const story = SUM_STORIES[0];
    expect(rightText(sumDiffStory(story, 269, 253, true))).toBe('522 km');
    expect(rightText(sumDiffStory(story, 269, 253, false))).toBe('269 km');
  });
});

describe('geometry', () => {
  it('names the sides of a quadrilateral as the book does', () => {
    const names = ['A', 'B', 'C', 'D'];
    expect([0, 1, 2, 3].map((i) => sideName(names, i))).toEqual(['AB', 'BC', 'DC', 'AD']);
    expect(sideName(names, oppositeSide(0))).toBe('DC');
    expect(sidesAt(0).map((i) => sideName(names, i))).toEqual(['AD', 'AB']);
  });

  it('offers the other scale of the protractor as a slip', () => {
    const q = degreeOptions(35);
    expect(q.options).toContain('145°');
    expect(q.options[q.answer]).toBe('35°');
    expect(degreeOptions(90).options).toHaveLength(4);
  });

  it('draws kind questions well away from a right angle', () => {
    for (let seed = 1; seed <= 40; seed++) {
      const m = kindMeasure(rng(seed));
      expect(m === 90 || m === 180 || Math.abs(m - 90) >= 20).toBe(true);
    }
  });
});

describe('measures', () => {
  it('converts the book amounts', () => {
    const ta = { big: 'tạ', small: 'kg', ratio: 100 };
    expect(rightText(convertQuestion(ta, 3, 60))).toBe('360 kg');
    expect(rightText(convertQuestion({ big: 'tấn', small: 'tạ', ratio: 10 }, 1, 7))).toBe('17 tạ');
    expect(rightText(convertQuestion({ big: 'dm²', small: 'cm²', ratio: 100 }, 1, 6))).toBe(
      '106 cm²',
    );
    expect(rightText(convertQuestion({ big: 'm²', small: 'cm²', ratio: 10000 }, 5, 0))).toBe(
      '50 000 cm²',
    );
  });

  it('compares the book amounts', () => {
    const ta = { big: 'tạ', small: 'kg', ratio: 100 };
    expect(rightText(compareQuestion(ta, 5, 40, 538))).toBe('>');
    const dm = { big: 'dm²', small: 'cm²', ratio: 100 };
    expect(rightText(compareQuestion(dm, 3, 90, 400))).toBe('<');
    const cm = { big: 'cm²', small: 'mm²', ratio: 100 };
    expect(rightText(compareQuestion(cm, 2, 50, 250))).toBe('=');
  });

  it('solves the book word problems', () => {
    expect(rightText(calfStory(40, 220))).toBe('500 kg');
    expect(rightText(plotStory(15, 6))).toBe('135 m²');
  });

  it('finds the century of a year', () => {
    const bad = [];
    for (let seed = 1; seed <= 40; seed++) {
      const q = centuryQuestion(rng(seed));
      const year = Number(q.prompt.match(/Năm (\d+)/)?.[1]);
      const roman = rightText(q).replace('Thế kỉ ', '');
      if (q.solution.indexOf(`thế kỉ ${roman}.`) < 0) bad.push(q.prompt);
      if (year === 1945 && roman !== 'XX') bad.push(q.prompt);
      if (year === 2010 && roman !== 'XXI') bad.push(q.prompt);
      if (year === 938 && roman !== 'X') bad.push(q.prompt);
      if (year === 1010 && roman !== 'XI') bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});

describe('the whole term', () => {
  it('solves the book word problems', () => {
    expect(rightText(fenceStory(45, 4))).toBe('266 m');
    expect(rightText(saltStory(5, 4, true))).toBe('27 tạ');
    expect(rightText(saltStory(5, 4, false))).toBe('23 tạ');
  });
});
