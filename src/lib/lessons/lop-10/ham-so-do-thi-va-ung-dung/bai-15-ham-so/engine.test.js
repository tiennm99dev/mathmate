import { describe, expect, it } from 'vitest';
import { FUNCTIONS, compareSentence, pointSentence, runAt, runText, valueOf } from './engine.js';

const byId = (/** @type {string} */ id) => {
  const fn = FUNCTIONS.find((f) => f.id === id);
  if (!fn) throw new Error(id);
  return fn;
};

describe('function machine', () => {
  it('evaluates inside the domain only', () => {
    expect(valueOf(byId('linear'), 1.5)).toBe(2);
    expect(valueOf(byId('root'), -2)).toBeNull();
    expect(valueOf(byId('root'), 3)).toBe(2);
    expect(valueOf(byId('inverse'), 0)).toBeNull();
    expect(valueOf(byId('inverse'), -0.5)).toBe(-4);
  });

  it('keeps every point of the slider range on the plane', () => {
    const off = [];
    for (const fn of FUNCTIONS) {
      for (let x = fn.lo; x <= fn.hi; x += 0.5) {
        const y = valueOf(fn, x);
        if (y !== null && (y < -4 || y > 6)) off.push(`${fn.id} ${x}`);
      }
    }
    expect(off).toEqual([]);
  });

  it('agrees with its runs of increase and decrease', () => {
    const wrong = [];
    for (const fn of FUNCTIONS) {
      for (const run of fn.runs) {
        const lo = Math.max(run.from, fn.lo);
        const hi = Math.min(run.to, fn.hi);
        for (let x = lo + 0.25; x + 0.25 < hi; x += 0.25) {
          const up = fn.f(x + 0.25) > fn.f(x);
          if (up !== run.up) wrong.push(`${fn.id} ${x}`);
        }
      }
    }
    expect(wrong).toEqual([]);
  });

  it('names the interval and the turning point', () => {
    expect(runText(byId('linear').runs[0])).toBe('ℝ');
    expect(runText(byId('square').runs[0])).toBe('(−∞; 0)');
    expect(runAt(byId('square'), 0)).toBeNull();
    expect(pointSentence(byId('square'), 0).text).toContain('chuyển từ nghịch biến sang đồng biến');
    expect(pointSentence(byId('inverse'), 0).tone).toBe('warn');
    expect(pointSentence(byId('root'), 0.5).text).toContain('f(0,5) ≈ 1,22');
    expect(pointSentence(byId('inverse'), 1).text).toContain('nghịch biến');
  });

  it('compares two values the way the definition does', () => {
    expect(compareSentence(byId('square'), 2, 1)).toContain('f(x₁) < f(x₂)');
    expect(compareSentence(byId('inverse'), -1, 1)).toContain('không kết luận');
    expect(compareSentence(byId('inverse'), 1, 2)).toContain('nghịch biến trên (0; +∞)');
    expect(compareSentence(byId('linear'), 1, 1)).toBeNull();
  });
});
