import { describe, expect, it } from 'vitest';
import {
  EQUATIONS,
  candidates,
  check,
  conclusion,
  equationTex,
  leftAt,
  rightAt,
  squared,
} from './engine.js';

const byId = (/** @type {string} */ id) => {
  const eq = EQUATIONS.find((e) => e.id === id);
  if (!eq) throw new Error(id);
  return eq;
};

describe('equations with a square root', () => {
  it('writes the equation and its square', () => {
    expect(equationTex(byId('ss-1'))).toBe('\\sqrt{2x^{2} - 4x - 2} = \\sqrt{x^{2} - x - 2}');
    expect(equationTex(byId('sl-1'))).toBe('\\sqrt{2x^{2} - 5x - 9} = x - 1');
    expect(squared(byId('ss-1')).tex).toBe('x^{2} - 3x = 0');
    expect(squared(byId('sl-1')).raw).toBe('2x^{2} - 5x - 9 = (x - 1)^2');
    expect(squared(byId('sl-1')).tex).toBe('x^{2} - 3x - 10 = 0');
    expect(squared(byId('ss-2')).tex).toBe('x^{2} - x - 2 = 0');
  });

  it('keeps the true roots and throws out the extraneous ones', () => {
    const kept = Object.fromEntries(
      EQUATIONS.map((eq) => [eq.id, candidates(eq).filter((x) => check(eq, x).ok)]),
    );
    expect(kept).toEqual({ 'ss-1': [3], 'ss-2': [-1, 2], 'sl-1': [5], 'sl-2': [1, 4], 'sl-3': [] });
    expect(candidates(byId('sl-3'))).toEqual([1, 2]);
    expect(check(byId('ss-1'), 0).text).toContain('−2 < 0');
    expect(check(byId('sl-1'), -2).text).toContain('vế phải bằng −3 < 0');
    expect(conclusion(byId('sl-3'))).toContain('vô nghiệm');
    expect(conclusion(byId('sl-2'))).toBe('Phương trình có hai nghiệm x = 1 và x = 4.');
  });

  it('every kept root makes both sides equal, and every candidate is on the plane', () => {
    const bad = [];
    for (const eq of EQUATIONS) {
      for (const x of candidates(eq)) {
        const ok = check(eq, x).ok;
        const same = Math.abs(leftAt(eq, x) - rightAt(eq, x)) < 1e-9;
        if (ok !== same) bad.push(`${eq.id} ${x}`);
        if (x < eq.view.xMin || x > eq.view.xMax) bad.push(`${eq.id} off ${x}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
