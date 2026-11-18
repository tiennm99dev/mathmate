import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { evaluate } from '#lib/algebra-engine/polynomial.js';
import { CHAPTER_SKILLS, quadraticWithWholePrimitive } from './skills.js';
import { simpson } from '#lib/core/visuals/plot.js';

describe('chapter skills', () => {
  it('G is an antiderivative of f with whole coefficients', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const { f, G } = quadraticWithWholePrimitive(rng(seed));
      const derivative = G.slice(1).map((c, i) => c * (i + 1));
      if (derivative.some((c, i) => c !== f[i])) bad.push(seed);
      if (!G.every(Number.isInteger)) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('every question is well formed and its answer survives writing and reading', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (let seed = 1; seed <= 80; seed++) {
        const q = skill.make(rng(seed));
        const text = [q.prompt, ...q.steps, ...(q.hints ?? [])].join(' ');
        if (/undefined|NaN/.test(text)) bad.push(`${skill.id} ${seed}: ${text}`);
        if (readNumber(numberText(q.answer)) !== q.answer) bad.push(`${skill.id} ${seed} answer`);
        if (q.steps.length < 2) bad.push(`${skill.id} ${seed} steps`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('integral answers agree with a numeric integral', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const q = CHAPTER_SKILLS[1].make(rng(seed));
      const m = /\\int_\{(-?\d+)\}\^\{(-?\d+)\}/.exec(q.prompt);
      if (!m) {
        bad.push(seed);
        continue;
      }
      // Rebuild the integrand from the same seed.
      const { f } = quadraticWithWholePrimitive(rng(seed));
      const value = simpson((x) => evaluate(f, x), Number(m[1]), Number(m[2]), 200);
      if (Math.abs(value - q.answer) > 1e-9) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('area and volume answers agree with a numeric integral', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const area = CHAPTER_SKILLS[2].make(rng(seed));
      const line = /y = (\d*)x\$/.exec(area.prompt);
      const square = /y = x\^2 - (\d+)\$/.exec(area.prompt);
      let expected = NaN;
      if (line) {
        const k = Number(line[1] || 1);
        expected = simpson((x) => k * x - x * x, 0, k, 200);
      } else if (square) {
        const k = Math.sqrt(Number(square[1]));
        expected = simpson((x) => k * k - x * x, -k, k, 200);
      }
      if (!(Math.abs(expected - area.answer) < 1e-9)) bad.push(`area ${seed}`);

      const vol = CHAPTER_SKILLS[3].make(rng(seed));
      const h = Number(/x = (\d+)\$ quanh/.exec(vol.prompt)?.[1]);
      const slope = /y = (\d*)x\$/.exec(vol.prompt);
      const f2 = slope
        ? (/** @type {number} */ x) => (Number(slope[1] || 1) * x) ** 2
        : (/** @type {number} */ x) => x;
      if (!(Math.abs(simpson(f2, 0, h, 200) - vol.answer) < 1e-9)) bad.push(`volume ${seed}`);
    }
    expect(bad).toEqual([]);
  });
});
