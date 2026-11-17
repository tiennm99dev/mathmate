import { describe, expect, it } from 'vitest';
import { check, texDeg, verdict } from './engine.js';

describe('a flagpole on a yard', () => {
  it('is perpendicular to the yard when upright and checked on two crossing lines', () => {
    const r = check(0, 0, 60);
    expect(r.status).toBe('vuong-goc');
    expect(r.angles.c).toBeCloseTo(90);
    expect(verdict(r)).toContain('d \\perp (P)');
  });

  it('can be perpendicular to one line twice and still lean', () => {
    const r = check(20, 90, 0);
    expect(r.status).toBe('chua-du');
    expect(r.angles.a).toBeCloseTo(90);
    expect(r.cRight).toBe(false);
    expect(verdict(r)).toContain('chưa đủ');
    expect(verdict(check(0, 0, 0))).toContain('hãy xoay $b$');
  });

  it('says which lines a leaning pole misses', () => {
    const r = check(20, 0, 90);
    expect(r.angles.a).toBeCloseTo(70);
    expect(r.angles.b).toBeCloseTo(90);
    expect(verdict(r)).toBe('$d$ chưa vuông góc với $a$, nên chưa vuông góc với sân.');
    expect(texDeg(70.2)).toBe('70^\\circ');
  });
});
