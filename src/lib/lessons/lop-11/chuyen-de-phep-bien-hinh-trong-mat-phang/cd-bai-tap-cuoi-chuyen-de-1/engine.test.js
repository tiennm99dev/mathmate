import { describe, expect, it } from 'vitest';
import { PUZZLES, fits, verdict } from './engine.js';

describe('which-transformation puzzles', () => {
  it('has exactly one fitting candidate in every puzzle', () => {
    const counts = PUZZLES.map((p) => p.options.filter((m) => fits(p, m)).length);
    expect(counts).toEqual(PUZZLES.map(() => 1));
  });

  it('names the kind of the fitting transformation', () => {
    const scale = PUZZLES[4];
    const right = scale.options.find((m) => fits(scale, m));
    expect(right && verdict(scale, right)).toContain('đồng dạng tỉ số $2$');
    const mirror = PUZZLES[1];
    const wrong = mirror.options.find((m) => !fits(mirror, m));
    expect(wrong && verdict(mirror, wrong)).toContain('Chưa đúng');
  });
});
