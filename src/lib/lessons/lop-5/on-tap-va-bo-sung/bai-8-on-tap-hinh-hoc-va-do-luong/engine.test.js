import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { SKILLS, angleKind, massText } from './engine.js';

/** The number written first in an option ('1 250 kg' → 1250). @param {string} text */
const valueOf = (text) =>
  Number(
    text
      .replace(/[^\d ]/g, '')
      .trim()
      .replace(/\s/g, ''),
  );

describe('geometry and measures review', () => {
  it('makes questions with distinct options and one right answer the solution names', () => {
    const bad = [];
    for (const skill of SKILLS) {
      const rand = rng(7);
      for (let i = 0; i < 60; i++) {
        const q = skill.make(rand);
        const texts = q.options.map(optionText);
        if (texts.length < 3 || new Set(texts).size !== texts.length) bad.push([skill.id, q]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([skill.id, q]);
        if (!q.hint || !q.solution) bad.push([skill.id, q]);
        const right = texts[q.answer];
        const n = valueOf(right);
        const flat = q.solution.replace(/[\s\u202f]/g, '');
        if (/\d/.test(right) && !flat.includes(String(n)))
          bad.push([skill.id, q.prompt, right, q.solution]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('converts masses and times correctly', () => {
    const bad = [];
    const rand = rng(3);
    const mass = SKILLS.find((s) => s.id === 'khoi-luong');
    const time = SKILLS.find((s) => s.id === 'thoi-gian');
    const units = { tấn: 1000, tạ: 100, yến: 10, kg: 1 };
    for (let i = 0; i < 80; i++) {
      const q = /** @type {NonNullable<typeof mass>} */ (mass).make(rand);
      const m = q.prompt.match(/^(\d+) (tấn|tạ|yến)(?: (\d+) kg)? = \? (\S+)$/);
      if (!m) {
        bad.push(q.prompt);
        continue;
      }
      const kg = Number(m[1]) * units[/** @type {keyof typeof units} */ (m[2])] + Number(m[3] ?? 0);
      const want = kg / units[/** @type {keyof typeof units} */ (m[4])];
      if (valueOf(optionText(q.options[q.answer])) !== want) bad.push(q.prompt);
    }
    for (let i = 0; i < 80; i++) {
      const q = /** @type {NonNullable<typeof time>} */ (time).make(rand);
      const m = q.prompt.match(/^(\d+) (giờ|phút|thế kỉ)(?: (\d+) (?:phút|giây))? = \?/);
      const right = valueOf(optionText(q.options[q.answer]));
      if (m) {
        const rate = m[2] === 'thế kỉ' ? 100 : 60;
        if (right !== Number(m[1]) * rate + Number(m[3] ?? 0)) bad.push(q.prompt);
      } else {
        const p = q.prompt.match(/^(\d+)\/(\d+) (giờ|thế kỉ)/);
        const whole = p?.[3] === 'giờ' ? 60 : 100;
        if (!p || right !== (whole * Number(p[1])) / Number(p[2])) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('names angles and writes masses the book way', () => {
    expect([30, 90, 120, 180].map(angleKind)).toEqual([0, 1, 2, 3]);
    expect(massText(1250)).toBe('1 tấn 250 kg');
    expect(massText(2000)).toBe('2 tấn');
    expect(massText(800)).toBe('800 kg');
  });
});
