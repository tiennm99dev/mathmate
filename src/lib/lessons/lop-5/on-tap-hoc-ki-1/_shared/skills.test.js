import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { AREA_SKILLS, PI } from './area-skills.js';
import { DECIMAL_SKILLS, comparePair, roundScaled } from './decimal-skills.js';
import { num, placesText, readDecimal, valueOptions } from './decimals.js';
import { GENERAL_SKILLS, mixedSkill } from './general-skills.js';
import { HEIGHT_POINTS, MEASURED, SHAPE_POINTS } from './figures.js';
import { AREA, LENGTH, MASS, MEASURE_SKILLS, convertQuestion, ratio } from './measure-skills.js';
import { OPERATION_SKILLS, misaligned } from './operation-skills.js';
import { SHAPE_SKILLS } from './shape-skills.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */

const SETS = [
  DECIMAL_SKILLS,
  OPERATION_SKILLS,
  SHAPE_SKILLS,
  AREA_SKILLS,
  MEASURE_SKILLS,
  GENERAL_SKILLS,
];

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * The number an option or a sentence starts with, read the book's way.
 * @param {string} text
 */
const firstValue = (text) =>
  Number((text.replace(/[\s\u202f]/g, '').match(/\d+(,\d+)?/) ?? ['NaN'])[0].replace(',', '.'));

describe('every review question', () => {
  it('has distinct options, a valid answer and no broken text', () => {
    const bad = [];
    for (const skill of SETS.flat()) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        const texts = q.options.map(optionText);
        const all = `${q.prompt} ${q.hint} ${q.solution} ${texts.join(' ')} ${q.visual?.alt ?? ''}`;
        if (new Set(texts).size !== texts.length || texts.length < 2) bad.push([skill.id, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, 'answer']);
        if (/undefined|NaN|\d\.\d|Infinity|null|−\d|-\d|\[object/.test(all))
          bad.push([skill.id, all]);
        if (/(?<![\d,])\d{4,}(?![\d,])/.test(all.replace(/\d+\/\d+/g, ''))) {
          bad.push([skill.id, 'ungrouped', all]);
        }
        const right = rightText(q);
        if (
          right.length > 2 &&
          new RegExp(`(^|[^\\d,])${right.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(q.hint)
        )
          bad.push([skill.id, 'hint', right]);
        if (
          !q.solution
            .toLowerCase()
            .includes(
              right
                .toLowerCase()
                .replace(
                  / (cm|dm|m|km|kg|g|ha|đoạn|phút|giây|năm|giờ|tháng|tạ|tấn|yến|mm|ml|l)²?$/,
                  '',
                ),
            ) &&
          !/^(Có|Không|>|<|=)$/.test(right)
        ) {
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
});

describe('decimals', () => {
  it('asks to read only decimals with no zero at the end', () => {
    const read = DECIMAL_SKILLS.find((s) => s.id === 'doc-so');
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      const q = read?.make(rng(seed));
      const shown = /Số ([\d\u202f ]+,\d+)/.exec(q?.prompt ?? '')?.[1] ?? '';
      if (!shown || shown.endsWith('0')) bad.push(q?.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('reads and writes decimals the book way', () => {
    expect(readDecimal(247, 2)).toBe('hai phẩy bốn mươi bảy');
    expect(readDecimal(5, 2)).toBe('không phẩy không năm');
    expect(readDecimal(12053, 3)).toBe('mười hai phẩy không năm mươi ba');
    expect(placesText(350, 2)).toBe('3,50');
    expect(placesText(5, 3)).toBe('0,005');
    expect(num(0.1 + 0.2)).toBe('0,3');
  });

  it('keeps the right option among the slips, in increasing order', () => {
    const q = valueOptions(2.8, [5.6, 0.28, 2.8, -1], { unit: 'dm²' });
    expect(q.options).toEqual(['0,28 dm²', '2,8 dm²', '5,6 dm²']);
    expect(q.answer).toBe(1);
  });

  it('rounds by the next digit', () => {
    expect(roundScaled(3470, 1)).toBe(35);
    expect(roundScaled(3130, 1)).toBe(31);
    expect(roundScaled(3497, 2)).toBe(350);
    expect(roundScaled(12500, 0)).toBe(13);
  });

  it('stores the comparison the digits give', () => {
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      const [a, b] = comparePair(rng(seed));
      const av = Number(
        placesText(a.n, a.places)
          .replace(/\u202f/g, '')
          .replace(',', '.'),
      );
      const bv = Number(
        placesText(b.n, b.places)
          .replace(/\u202f/g, '')
          .replace(',', '.'),
      );
      const q = DECIMAL_SKILLS[4].make(rng(seed));
      const sign = av === bv ? '=' : av > bv ? '>' : '<';
      if (rightText(q) !== sign) bad.push([seed, av, bv, rightText(q)]);
    }
    expect(bad).toEqual([]);
  });
});

describe('operations', () => {
  it('stores the answer the operation gives', () => {
    const bad = [];
    for (const skill of OPERATION_SKILLS.slice(0, 5)) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        const m = /^([\d\u202f,]+) ([+−×:]) ([\d\u202f,]+) = \?$/.exec(q.prompt);
        if (!m) {
          bad.push([skill.id, q.prompt]);
          continue;
        }
        const [a, b] = [firstValue(m[1]), firstValue(m[3])];
        const value = { '+': a + b, '−': a - b, '×': a * b, ':': a / b }[m[2]] ?? NaN;
        if (Math.abs(value - firstValue(rightText(q))) > 1e-9) bad.push([q.prompt, rightText(q)]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes the slip of lining up the last digits', () => {
    expect(misaligned({ n: 157, places: 1 }, { n: 157, places: 2 }, '+')).toBe(3.14);
  });
});

describe('areas', () => {
  it('stores the area formulas of the book', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const tri = AREA_SKILLS[1].make(rng(seed));
      const [a, h] = (tri.prompt.match(/\d+(,\d+)?/g) ?? []).map((t) =>
        Number(t.replace(',', '.')),
      );
      if (Math.abs((a * h) / 2 - firstValue(rightText(tri))) > 1e-9) bad.push(tri.prompt);
      const trap = AREA_SKILLS[3].make(rng(seed));
      const [x, y, z] = (trap.prompt.match(/\d+(,\d+)?/g) ?? []).map((t) =>
        Number(t.replace(',', '.')),
      );
      if (Math.abs(((x + y) * z) / 2 - firstValue(rightText(trap))) > 1e-9) bad.push(trap.prompt);
      const area = AREA_SKILLS[6].make(rng(seed));
      const [r] = (area.prompt.match(/\d+(,\d+)?/g) ?? []).map((t) => Number(t.replace(',', '.')));
      const radius = area.prompt.includes('bán kính') ? r : r / 2;
      if (Math.abs(radius * radius * PI - firstValue(rightText(area))) > 1e-6)
        bad.push(area.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('gives the book answers', () => {
    expect(num((3.5 * 1.6) / 2)).toBe('2,8');
    expect(num(((36 + 14) * 17) / 2)).toBe('425');
    expect(num(3 * 2 * PI)).toBe('18,84');
    expect(num(0.7 * 0.7 * PI)).toBe('1,5386');
    expect(num((60 * 60 * PI) / 2)).toBe('5\u202f652');
  });
});

describe('measures', () => {
  it('converts with the ratio of the two units', () => {
    expect(ratio(AREA, 'ha', 'm²')).toBe(10000);
    expect(ratio(AREA, 'km²', 'ha')).toBe(100);
    expect(ratio(MASS, 'tạ', 'kg')).toBe(100);
    expect(ratio(LENGTH, 'km', 'm')).toBe(1000);
  });

  it('stores conversions that go back to the given measure', () => {
    const bad = [];
    for (const table of [LENGTH, MASS, AREA]) {
      for (let seed = 1; seed <= 120; seed++) {
        const q = convertQuestion(rng(seed), table);
        const m = /^(.+) = \? (\S+)$/.exec(q.prompt);
        if (!m) {
          bad.push(q.prompt);
          continue;
        }
        const exp = /** @type {Record<string, number>} */ (table.exp);
        const parts = [...m[1].matchAll(/([\d\u202f,]+) (\S+)/g)];
        const base = parts.reduce((s, p) => s + firstValue(p[1]) * 10 ** exp[p[2]], 0);
        const want = base / 10 ** exp[m[2]];
        if (Math.abs(want - firstValue(rightText(q))) > 1e-9) bad.push([q.prompt, rightText(q)]);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('figures', () => {
  it('draws every shape, height and measured figure inside the board', () => {
    const pts = [
      ...Object.values(SHAPE_POINTS).flatMap((s) => s.pts),
      ...Object.values(HEIGHT_POINTS).flatMap((s) => [...s.pts, ...s.labelAt]),
      ...Object.values(MEASURED).flatMap((s) => [...s.pts, ...s.labelAt]),
    ];
    expect(pts.filter((p) => p.x < 0 || p.x > 240 || p.y < 0 || p.y > 170)).toEqual([]);
  });
});

describe('the general review', () => {
  it('writes mixed numbers and fractions with the right value', () => {
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      const q = mixedSkill.make(rng(seed));
      const right = rightText(q);
      const mixed = /Hỗn số (\d+) (\d+)\/(\d+)/.exec(q.prompt);
      const frac = /Phân số (\d+)\/(\d+)/.exec(q.prompt.replace(/\u202f/g, ''));
      if (mixed) {
        const [w, a, b] = mixed.slice(1).map(Number);
        if (right !== `${w * b + a}/${b}`) bad.push([q.prompt, right]);
      } else if (frac) {
        const value = Number(frac[1]) / Number(frac[2]);
        if (Math.abs(firstValue(right) - value) > 1e-9) bad.push([q.prompt, right]);
      } else bad.push(['prompt', q.prompt]);
    }
    expect(bad).toEqual([]);
  });
});
