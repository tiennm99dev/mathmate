import { describe, it, expect } from 'vitest';
import { BASES } from '../_shared/plot.js';
import { RELATIONS, SETUP, sideTex, solve, valueAt, windowFor } from './engine.js';

const BASE_LIST = [BASES[2], BASES[3], BASES.half, BASES.third];

/**
 * @param {number} y @param {number} b @param {string} rel
 */
function holds(y, b, rel) {
  if (!Number.isFinite(y)) return false;
  if (rel === '=') return Math.abs(y - b) < 1e-9;
  if (rel === '>') return y > b + 1e-9;
  if (rel === '>=') return y > b - 1e-9;
  if (rel === '<') return y < b - 1e-9;
  return y < b + 1e-9;
}

/** @param {import('./engine.js').Interval[]} parts @param {number} x */
function inSet(parts, x) {
  return parts.some(
    (p) =>
      (x > p.lo || (p.loIn && Math.abs(x - p.lo) < 1e-9)) &&
      (x < p.hi || (p.hiIn && Math.abs(x - p.hi) < 1e-9)),
  );
}

describe('solving aˣ ⋈ b and logₐ x ⋈ b', () => {
  it('agrees with the graph at sample points', () => {
    const bad = [];
    for (const kind of /** @type {const} */ (['exp', 'log'])) {
      const { bMin, bMax } = SETUP[kind];
      for (const base of BASE_LIST) {
        for (let b = bMin; b <= bMax; b += 0.5) {
          for (const { id } of RELATIONS) {
            const sol = solve(kind, base, b, id);
            const probes = [-5, -1.3, -0.2, 0.4, 1.1, 2.7, 6.2, 15];
            if (sol.x0 !== null) probes.push(sol.x0, sol.x0 - 1e-3, sol.x0 + 1e-3);
            for (const x of probes) {
              const want = holds(valueAt(kind, base.value, x), b, id);
              // Points within 1e-9 of x₀ are decided by the closed ends.
              if (sol.x0 !== null && Math.abs(x - sol.x0) < 1e-6 && x !== sol.x0) continue;
              if (inSet(sol.parts, x) !== want) bad.push(`${kind} ${base.id} ${b} ${id} x=${x}`);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('writes the solution set the book way', () => {
    expect(solve('exp', BASES[2], 8, '=').setTex).toBe('S = \\{3\\}');
    expect(solve('exp', BASES[2], 3, '>').setTex).toBe('S = (\\log_{2} 3; +\\infty)');
    expect(solve('exp', BASES.half, 4, '>=').setTex).toBe('S = (-\\infty; -2]');
    expect(solve('exp', BASES[3], -1, '>').setTex).toBe('S = \\mathbb{R}');
    expect(solve('exp', BASES[3], 0, '<=').setTex).toBe('S = \\varnothing');
    expect(solve('log', BASES[2], 2, '<').setTex).toBe('S = (0; 4)');
    expect(solve('log', BASES.half, 1, '>=').setTex).toBe('S = (0; \\dfrac{1}{2}]');
    expect(solve('log', BASES[3], 0.5, '>').setTex).toBe('S = (3^{0{,}5}; +\\infty)');
    expect(solve('log', BASES.third, -1, '<').setTex).toBe('S = (3; +\\infty)');
    expect(sideTex('log', BASES.half)).toBe('\\log_{\\frac{1}{2}} x');
  });
});

describe('graph window', () => {
  it('keeps the meeting point of every log case in view', () => {
    const bad = [];
    for (const a of [2, 3, 1 / 2, 1 / 3]) {
      for (let b = SETUP.log.bMin; b <= SETUP.log.bMax; b += 0.5) {
        const x0 = a ** b;
        const win = windowFor('log', x0);
        if (!(x0 < win.xMax)) bad.push(`${a} ${b}`);
      }
    }
    expect(bad).toEqual([]);
    expect(windowFor('exp', 2)).toBe(SETUP.exp.win);
    expect(windowFor('log', 2)).toBe(SETUP.log.win);
  });
});
