import { describe, expect, it } from 'vitest';
import {
  PER_BRANCH,
  asymptoteDistances,
  asymptotesTex,
  equationTex,
  keyStep,
  noteAt,
  readout,
  samplesOf,
} from './engine.js';

describe('hyperbola board', () => {
  it('writes the equation and the asymptotes in lowest terms', () => {
    expect(equationTex(3, 4)).toBe('\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1');
    expect(asymptotesTex(3, 4)).toBe('y = \\pm \\dfrac{4}{3}x');
    expect(asymptotesTex(2, 2)).toBe('y = \\pm x');
    expect(asymptotesTex(1, 3)).toBe('y = \\pm 3x');
    expect(asymptotesTex(4, 2)).toBe('y = \\pm \\dfrac{1}{2}x');
  });

  it('keeps the product of the asymptote distances at a²b²/c²', () => {
    const bad = [];
    for (const [a, b] of [
      [3, 4],
      [1, 5],
      [4, 1],
    ])
      for (const M of samplesOf(a, b)) {
        const [d1, d2] = asymptoteDistances(a, b, M);
        if (Math.abs(d1 * d2 - (a * a * b * b) / (a * a + b * b)) > 1e-9) bad.push([a, b, M]);
      }
    expect(bad).toEqual([]);
  });

  it('reads the focal radii at the right vertex', () => {
    const vertex = samplesOf(3, 4)[(PER_BRANCH - 1) / 2];
    expect(vertex).toEqual({ x: 3, y: 0 });
    const lines = readout(3, 4, vertex, true);
    expect(lines[0]).toBe('$c = \\sqrt{a^2 + b^2} = 5$, $e = \\dfrac{c}{a} \\approx 1{,}667$');
    expect(lines[1]).toBe('$MF_1 = |a + ex| = 8$, $MF_2 = |a - ex| = 2$');
    expect(lines[3]).toBe(
      '$d(M, \\Delta_2) = 1{,}2$, $\\dfrac{MF_2}{d(M, \\Delta_2)} = e \\approx 1{,}667$',
    );
    // At the vertex both asymptotes are ab/c away: (12/5)² = 144/25.
    expect(lines[4]).toBe('Khoảng cách từ $M$ đến hai tiệm cận: $2{,}4$ và $2{,}4$');
    expect(lines[5]).toBe('Tích hai khoảng cách: $\\dfrac{a^2b^2}{c^2} = 5{,}76$');
    expect(noteAt(3, 4, vertex)).toContain('đỉnh $(3; 0)$');
  });

  it('notices when M hugs an asymptote', () => {
    const far = samplesOf(1, 1)[PER_BRANCH - 1];
    expect(noteAt(1, 1, far)).toContain('sát dần đường tiệm cận');
  });

  it('moves M along its branch with up and down, and across with left and right', () => {
    const top = PER_BRANCH - 1;
    expect(keyStep(10, 0, -1, false)).toBe(11);
    expect(keyStep(10, 0, 1, true)).toBe(5);
    expect(keyStep(top, 0, -1, false)).toBe(top);
    expect(keyStep(PER_BRANCH, 0, 1, false)).toBe(PER_BRANCH);
    expect(keyStep(2 * PER_BRANCH - 1, 0, -1, true)).toBe(2 * PER_BRANCH - 1);
    expect(keyStep(10, -1, 0, false)).toBe(PER_BRANCH + 10);
    expect(keyStep(PER_BRANCH + 10, 1, 0, false)).toBe(10);
    expect(keyStep(10, 1, 0, false)).toBe(10);
    const S = samplesOf(3, 4);
    expect(S[PER_BRANCH + 10]).toEqual({ x: -S[10].x, y: S[10].y });
  });
});
