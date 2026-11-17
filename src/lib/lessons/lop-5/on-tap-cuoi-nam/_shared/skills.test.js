import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { GEOMETRY_SKILLS } from './geometry-skills.js';
import { MEASURE_SKILLS, hoursMinutes } from './measure-skills.js';
import { NUMBER_SKILLS, roundDecimalSkill } from './number-skills.js';
import { OPERATION_SKILLS, fractionOptions } from './operation-skills.js';
import { RATIO_SKILLS } from './ratio-skills.js';
import { GENERAL_SKILLS } from './general-skills.js';
import { MOTION_SKILLS } from './motion-skills.js';
import { STATS_SKILLS } from './stats-skills.js';
import { num, readDecimal, simplest, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */

const SETS = [
  NUMBER_SKILLS,
  OPERATION_SKILLS,
  RATIO_SKILLS,
  GEOMETRY_SKILLS,
  MEASURE_SKILLS,
  MOTION_SKILLS,
  STATS_SKILLS,
  GENERAL_SKILLS,
];

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * A number written the book's way read back: '12 345,5' → 12345.5.
 * @param {string} text
 */
const value = (text) => Number(text.replace(/[\s\u202f]/g, '').replace(',', '.'));

/**
 * The value of a plain operation written the book's way.
 * @param {string} text
 */
function evaluate(text) {
  const js = text
    .replace(/[\u202f]/g, '')
    .replace(/(\d) (\d)/g, '$1$2')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/(\d+)\/(\d+)/g, '($1/$2)')
    .replace(/×/g, '*')
    .replace(/:/g, '/')
    .replace(/−/g, '-');
  return Function(`"use strict"; return (${js});`)();
}

describe('every review question', () => {
  it('has distinct options, a valid answer and no broken text', () => {
    const bad = [];
    for (const skill of SETS.flat()) {
      for (let seed = 1; seed <= 120; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')} ${q.visual?.alt ?? ''}`;
        if (new Set(texts).size !== texts.length || texts.length < 3) bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\d\.\d|Infinity|null|-\d|\[object|\/0\b|\b0\//.test(all))
          bad.push([skill.id, all]);
        if (/(?<![\d,/])\d{4,}(?![\d,])/.test(all.replace(/\d+\/\d+/g, ''))) {
          bad.push([skill.id, 'ungrouped', all]);
        }
        const right = rightText(q);
        if (
          right.length > 2 &&
          new RegExp(`(^|[^\\d,])${right.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(q.hint)
        )
          bad.push([skill.id, 'hint', right]);
        const bare = right
          .toLowerCase()
          .replace(/ (cm|dm|m|km|mm|kg|g|tấn|tạ|yến|ha|l|ml|phút|tháng|đồng)[²³]?$/, '')
          .replace(/%$/, '');
        if (!q.solution.toLowerCase().includes(bare) && !/^(>|<|=)$/.test(right)) {
          bad.push([skill.id, 'solution lacks answer', right, q.solution]);
        }
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

  it('stores the answer a plain operation gives', () => {
    const bad = [];
    let checked = 0;
    for (const skill of [...OPERATION_SKILLS, ...NUMBER_SKILLS]) {
      for (let seed = 1; seed <= 120; seed++) {
        const q = skill.make(rng(seed));
        const m = /^(?:Tính giá trị biểu thức: )?([\d\s\u202f,×:+−/]+?)(?: = \?)?$/.exec(q.prompt);
        if (!m || !/[×:+−]/.test(m[1])) continue;
        checked += 1;
        const got = evaluate(m[1]);
        const right = rightText(q);
        const stored = right.includes('/') ? evaluate(right) : value(right);
        if (Math.abs(got - stored) > 1e-9) bad.push([skill.id, q.prompt, right]);
      }
    }
    expect(checked).toBeGreaterThan(500);
    expect(bad).toEqual([]);
  });
});

describe('values', () => {
  it('writes and reads numbers the book way', () => {
    expect(num(0.1 + 0.2)).toBe('0,3');
    expect(num(12000)).toBe('12\u202f000');
    expect(readDecimal(5, 2)).toBe('không phẩy không năm');
    expect(readDecimal(12053, 3)).toBe('mười hai phẩy không năm mươi ba');
    expect(simplest(6, 8)).toBe('3/4');
    expect(simplest(8, 4)).toBe('2');
  });

  it('keeps the right option among the slips, in increasing order', () => {
    const q = valueOptions(2.8, [5.6, 0.28, 2.8, -1], { unit: 'dm²' });
    expect(q.options).toEqual(['0,28 dm²', '2,8 dm²', '5,6 dm²']);
    expect(q.answer).toBe(1);
  });

  it('drops fraction slips equal in value to the answer', () => {
    const q = fractionOptions(
      rng(1),
      [6, 8],
      [
        [3, 4],
        [1, 2],
        [9, 12],
      ],
    );
    expect(q.options.sort()).toEqual(['1/2', '3/4']);
  });
});

describe('numbers', () => {
  it('rounds decimals by the next digit and keeps the last place', () => {
    const bad = [];
    for (let seed = 1; seed <= 300; seed++) {
      const q = roundDecimalSkill.make(rng(seed));
      const m = /Làm tròn số ([\d\u202f,]+) đến (.+)\.$/.exec(q.prompt);
      if (!m) {
        bad.push(q.prompt);
        continue;
      }
      const places = m[2].startsWith('số') ? 0 : m[2].includes('mười') ? 1 : 2;
      const v = value(m[1]);
      const expected = Math.round(v * 10 ** places + 1e-9) / 10 ** places;
      if (Math.abs(value(rightText(q)) - expected) > 1e-9) bad.push([q.prompt, rightText(q)]);
    }
    expect(bad).toEqual([]);
  });
});

describe('ratios', () => {
  it('finds the two numbers the sum or the difference and the ratio give', () => {
    const bad = [];
    for (const id of ['tong-va-ti-so', 'hieu-va-ti-so']) {
      const skill = RATIO_SKILLS.find((s) => s.id === id);
      for (let seed = 1; seed <= 120; seed++) {
        const q = skill?.make(rng(seed));
        if (!q) continue;
        const m = /là ([\d\u202f]+)\. .* là (\d+)\/(\d+)\. Tìm số (lớn|bé)/.exec(q.prompt);
        if (!m) {
          bad.push(q.prompt);
          continue;
        }
        const [total, p, r] = [value(m[1]), Number(m[2]), Number(m[3])];
        const unit = id === 'tong-va-ti-so' ? total / (p + r) : total / (r - p);
        const expected = unit * (m[4] === 'lớn' ? r : p);
        if (value(rightText(q)) !== expected) bad.push([q.prompt, rightText(q)]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('measures', () => {
  it('writes hours and minutes', () => {
    expect(hoursMinutes(135)).toBe('2 giờ 15 phút');
    expect(hoursMinutes(120)).toBe('2 giờ');
    expect(hoursMinutes(45)).toBe('45 phút');
  });

  it('never offers a wrong time that is the right time written another way', () => {
    const skill = MEASURE_SKILLS.find((s) => s.id === 'cong-tru-thoi-gian');
    /** @param {string} t */
    const minutes = (t) =>
      Number(/(\d+) giờ/.exec(t)?.[1] ?? 0) * 60 + Number(/(\d+) phút/.exec(t)?.[1] ?? 0);
    const bad = [];
    for (let seed = 1; seed <= 300; seed++) {
      const q = skill?.make(rng(seed));
      if (!q) continue;
      const texts = q.options.map(optionText);
      const right = minutes(texts[q.answer]);
      if (texts.some((t, i) => i !== q.answer && minutes(t) === right)) bad.push(texts);
    }
    expect(bad).toEqual([]);
  });
});

describe('geometry', () => {
  it('never offers a name that also fits the drawn shape', () => {
    const skill = GEOMETRY_SKILLS.find((s) => s.id === 'nhan-dang-hinh');
    /** Names that are also true of a shape besides its own. */
    const alsoTrue = {
      'Hình thoi': ['Hình bình hành', 'Hình thang'],
      'Hình bình hành': ['Hình thang'],
    };
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      const q = skill?.make(rng(seed));
      if (!q) continue;
      const texts = q.options.map(optionText);
      const right = /** @type {keyof typeof alsoTrue} */ (texts[q.answer]);
      if ((alsoTrue[right] ?? []).some((t) => texts.includes(t))) bad.push(texts);
    }
    expect(bad).toEqual([]);
  });
});
