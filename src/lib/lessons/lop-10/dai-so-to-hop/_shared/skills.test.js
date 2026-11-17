import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, COEFFICIENT_SKILL } from './skills.js';

describe('chapter drill skills', () => {
  it('make questions with integer answers and solution steps', () => {
    const rand = rng(7);
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (let i = 0; i < 40; i++) {
        const q = skill.make(rand);
        if (!Number.isInteger(q.answer) || q.steps.length === 0 || !q.prompt.includes('$'))
          bad.push(skill.id);
        // Four or more digits are grouped the book's way: 5\,040.
        if (q.steps.some((s) => /\d{4}/.test(s))) bad.push(`${skill.id}: ${q.steps.join(' ')}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives the coefficient read back from a full expansion', () => {
    const rand = rng(3);
    const bad = [];
    for (let i = 0; i < 60; i++) {
      const q = COEFFICIENT_SKILL.make(rand);
      const m = /x\^\{(\d)\}.*\((\d?)x ([+-]) (\d)\)\^\{(\d)\}/.exec(q.prompt);
      if (!m) {
        bad.push(q.prompt);
        continue;
      }
      const power = Number(m[1]);
      const p = m[2] === '' ? 1 : Number(m[2]);
      const b = (m[3] === '-' ? -1 : 1) * Number(m[4]);
      const n = Number(m[5]);
      // Multiply (px + b) out n times, lowest power first.
      let poly = [1];
      for (let j = 0; j < n; j++) {
        const next = Array(poly.length + 1).fill(0);
        poly.forEach((c, e) => {
          next[e] += c * b;
          next[e + 1] += c * p;
        });
        poly = next;
      }
      if (poly[power] !== q.answer) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
