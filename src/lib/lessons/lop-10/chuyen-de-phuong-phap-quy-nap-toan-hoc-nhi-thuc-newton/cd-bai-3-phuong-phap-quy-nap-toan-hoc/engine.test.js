import { describe, expect, it } from 'vitest';
import { STATEMENTS, bigTex, dominoState, fallsTo, smallestFactor, verdict } from './engine.js';

/** @param {string} id */
const byId = (id) => {
  const s = STATEMENTS.find((x) => x.id === id);
  if (!s) throw new Error(id);
  return s;
};

describe('induction statements', () => {
  it('the proved statements hold for every n checked', () => {
    const bad = [];
    for (const s of STATEMENTS.filter((x) => x.stepOk && x.id !== 'chan')) {
      for (let n = s.start; n <= s.start + 60; n += 1) if (!s.check(n).ok) bad.push(`${s.id} ${n}`);
    }
    expect(bad).toEqual([]);
  });

  it('2^n > 2n + 1 fails below its start', () => {
    const s = byId('bat-dang-thuc');
    expect([1, 2].map((n) => s.check(n).ok)).toEqual([false, false]);
    expect(s.check(3).ok).toBe(true);
  });

  it('n^2 + n + 1 is never even', () => {
    const s = byId('chan');
    expect(Array.from({ length: 50 }, (_, i) => s.check(i + 1).ok).some(Boolean)).toBe(false);
  });

  it('n^2 - n + 41 is prime up to 40 and fails at 41', () => {
    const s = byId('nguyen-to');
    expect(Array.from({ length: 40 }, (_, i) => s.check(i + 1).ok).every(Boolean)).toBe(true);
    expect(s.check(41).ok).toBe(false);
    expect(s.check(41).text).toContain('41 \\cdot 41');
  });
});

describe('the domino chain', () => {
  it('falls forever when both steps hold', () => {
    expect(fallsTo(byId('le'))).toBe(Infinity);
    expect(dominoState(byId('le'), 30, true)).toBe('down');
    expect(dominoState(byId('le'), 30, false)).toBe('up');
  });

  it('marks dominoes before the start', () => {
    expect(dominoState(byId('bat-dang-thuc'), 2, true)).toBe('before');
    expect(dominoState(byId('bat-dang-thuc'), 3, true)).toBe('down');
  });

  it('never starts without the base step', () => {
    expect(fallsTo(byId('chan'))).toBe(0);
    expect(dominoState(byId('chan'), 1, true)).toBe('up');
    expect(verdict(byId('chan'), true)).toContain('không đổ');
  });

  it('stops at the first false case when the step is missing', () => {
    expect(fallsTo(byId('nguyen-to'))).toBe(40);
    expect(dominoState(byId('nguyen-to'), 41, true)).toBe('up');
    expect(verdict(byId('nguyen-to'), true)).toContain('quân số 41');
  });
});

describe('helpers', () => {
  it('groups big numbers and finds factors', () => {
    expect(bigTex(1048575n)).toBe('1\\,048\\,575');
    expect(bigTex(255n)).toBe('255');
    expect(smallestFactor(1681)).toBe(41);
    expect(smallestFactor(43)).toBe(43);
  });
});
