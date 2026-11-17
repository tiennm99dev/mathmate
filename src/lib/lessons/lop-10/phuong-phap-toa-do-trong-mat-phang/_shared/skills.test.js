import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  ANGLE_SKILL,
  CHAPTER_SKILLS,
  DISTANCE_SKILL,
  INTERSECT_SKILL,
  RADIUS_SKILL,
} from './skills.js';

/** Numbers of a TeX equation 'ax + by + c = 0' read back: [a, b, c]. @param {string} tex */
function coefficients(tex) {
  const lhs = tex.replace(/\s/g, '').split('=')[0];
  let a = 0;
  let b = 0;
  let c = 0;
  for (const m of lhs.matchAll(/([+-]?)(\d*)([xy]?)/g)) {
    if (m[0] === '') continue;
    const k = (m[1] === '-' ? -1 : 1) * (m[2] === '' ? 1 : Number(m[2]));
    if (m[3] === 'x') a = k;
    else if (m[3] === 'y') b = k;
    else c = k;
  }
  return [a, b, c];
}

describe('chapter drill skills', () => {
  it('make questions with whole-number answers and solution steps', () => {
    const rand = rng(7);
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (let i = 0; i < 40; i++) {
        const q = skill.make(rand);
        if (!Number.isInteger(q.answer) || q.steps.length === 0) bad.push(skill.id);
      }
    }
    expect(bad).toEqual([]);
  });

  it('give answers that solve the question', () => {
    const rand = rng(11);
    const bad = [];
    for (let i = 0; i < 40; i++) {
      const q = INTERSECT_SKILL.make(rand);
      const [l1, l2] = [...q.prompt.matchAll(/\$([^$]+)\$/g)].slice(0, 2).map((m) => m[1]);
      const [a1, b1, c1] = coefficients(l1);
      const [a2, b2, c2] = coefficients(l2);
      const x = q.answer;
      // y from whichever line has a y term.
      const y = b1 !== 0 ? -(a1 * x + c1) / b1 : -(a2 * x + c2) / b2;
      if (Math.abs(a1 * x + b1 * y + c1) > 1e-9 || Math.abs(a2 * x + b2 * y + c2) > 1e-9)
        bad.push(q.prompt);

      const d = DISTANCE_SKILL.make(rand);
      const M = d.prompt.match(/M\((-?\d+); (-?\d+)\)/);
      const [a, b, c] = coefficients(/** @type {string} */ (d.prompt.split('\\Delta: ')[1]));
      const dist = Math.abs(a * Number(M?.[1]) + b * Number(M?.[2]) + c) / Math.hypot(a, b);
      if (Math.abs(dist - d.answer) > 1e-9) bad.push(d.prompt);

      const r = RADIUS_SKILL.make(rand);
      if (r.answer < 1) bad.push(r.prompt);

      const g = ANGLE_SKILL.make(rand);
      if (![45, 90].includes(g.answer)) bad.push(g.prompt);
    }
    expect(bad).toEqual([]);
  });
});
