import { describe, expect, it } from 'vitest';
import { sub3 } from '#lib/geom-engine/solid.js';
import { angle3, dist3, footOnPlane, lineAngle, planeThrough } from '#lib/geom-engine/space.js';
import { CASES, QUESTIONS, answerOf, figure, guideOf, isRight, solutionOf } from './engine.js';

describe('review questions on the pyramid S.ABCD with SA perpendicular to the base', () => {
  it('agrees with the geometry of the drawn figure', () => {
    const wrong = [];
    for (const [a, h] of CASES) {
      const f = figure(a, h);
      const k = a / 3;
      const base = /** @type {NonNullable<ReturnType<typeof planeThrough>>} */ (
        planeThrough(f.A, f.B, f.C)
      );
      const sbc = /** @type {NonNullable<ReturnType<typeof planeThrough>>} */ (
        planeThrough(f.S, f.B, f.C)
      );
      const checks = {
        'goc-sc': angle3(f.S, f.C, f.A),
        'nhi-dien': angle3(f.S, f.B, f.A),
        'd-a-sbc': dist3(f.A, footOnPlane(f.A, sbc)) * k,
        'd-sa-bd': dist3(f.A, f.O) * k,
        'the-tich': (a * a * dist3(f.S, footOnPlane(f.S, base)) * k) / 3,
      };
      for (const [id, v] of Object.entries(checks)) {
        const ans = answerOf(/** @type {any} */ (id), a, h).value;
        if (Math.abs(ans - v) > 1e-9) wrong.push(`${a},${h} ${id}`);
      }
      if (Math.abs(dist3(f.A, f.H) * k - checks['d-a-sbc']) > 1e-9) wrong.push(`${a},${h} H`);
      if (Math.abs(lineAngle(sub3(f.O, f.A), sub3(f.D, f.B)) - 90) > 1e-9) wrong.push('AO');
    }
    expect(wrong).toEqual([]);
  });

  it('knows the answers for SA = 4, AB = 3', () => {
    expect(Math.round(answerOf('goc-sc', 3, 4).value)).toBe(43);
    expect(Math.round(answerOf('nhi-dien', 3, 4).value)).toBe(53);
    expect(answerOf('d-a-sbc', 3, 4).value).toBeCloseTo(2.4);
    expect(answerOf('d-sa-bd', 3, 4).value).toBeCloseTo(2.1213);
    expect(answerOf('the-tich', 3, 4).value).toBeCloseTo(12);
  });

  it('accepts answers rounded the way the question asks', () => {
    expect(isRight('goc-sc', 3, 4, 43)).toBe(true);
    expect(isRight('goc-sc', 3, 4, 44)).toBe(false);
    expect(isRight('d-sa-bd', 3, 4, 2.12)).toBe(true);
    expect(isRight('d-sa-bd', 3, 4, 2.13)).toBe(false);
    expect(isRight('the-tich', 2, 2, 2.67)).toBe(true);
  });

  it('writes the working and the guide for every question', () => {
    const wrong = [];
    for (const q of QUESTIONS) {
      const s = solutionOf(q.id, 3, 4);
      if (!s.includes('$')) wrong.push(q.id);
      const g = guideOf(q.id, figure(3, 4));
      if (!g.lines.length) wrong.push(`${q.id} guide`);
    }
    expect(wrong).toEqual([]);
    expect(solutionOf('d-a-sbc', 3, 4)).toContain('= 2{,}4$');
    expect(solutionOf('goc-sc', 3, 4)).toContain('\\approx 43^\\circ');
  });
});
