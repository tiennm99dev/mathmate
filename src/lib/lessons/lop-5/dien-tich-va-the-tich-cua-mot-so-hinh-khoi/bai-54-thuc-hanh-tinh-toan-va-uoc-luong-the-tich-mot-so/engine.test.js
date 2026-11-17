import { describe, expect, it } from 'vitest';
import { THINGS, closestIndex, noteFor, rulerMax, rulerState, volumeOf } from './engine.js';

describe('estimate then measure', () => {
  it('has exactly one estimate close to each real volume', () => {
    const bad = THINGS.filter((t) => {
      const { volume } = volumeOf(t);
      const near = t.estimates.filter((e) => Math.abs(Math.log10(e / volume)) < 0.5);
      return (
        near.length !== 1 || t.estimates.indexOf(near[0]) !== closestIndex(t.estimates, volume)
      );
    }).map((t) => t.id);
    expect(bad).toEqual([]);
  });

  it('works out the volumes', () => {
    expect(THINGS.map((t) => volumeOf(t).volume)).toEqual([640, 1020, 5400, 72000, 96, 192]);
    expect(volumeOf(THINGS[0]).step).toBe('20 × 8 × 4 = 640');
  });

  it('lets every ruler reach past its edge', () => {
    const bad = THINGS.filter((t) => rulerMax(t) <= Math.max(...t.size)).map((t) => t.id);
    expect(bad).toEqual([]);
  });

  it('tells a short, a long and a fitting ruler apart', () => {
    expect([0, 3, 4, 5].map((m) => rulerState(m, 4))).toEqual(['none', 'short', 'fit', 'long']);
  });

  it('asks for an estimate first, then the edges in order, then compares', () => {
    const t = THINGS[0];
    expect(noteFor(t, null, [0, 0, 0]).tone).toBe('info');
    expect(noteFor(t, 1, [20, 0, 0]).text).toContain('chiều rộng');
    expect(noteFor(t, 1, [20, 9, 0]).tone).toBe('warn');
    const right = noteFor(t, 1, [20, 8, 4]);
    expect(right.tone).toBe('ok');
    expect(right.text).toContain('20 × 8 × 4 = 640 (cm³)');
    const big = noteFor(t, 2, [20, 8, 4]);
    expect(big.tone).toBe('warn');
    expect(big.text).toContain('lớn quá');
    expect(noteFor(t, 0, [20, 8, 4]).text).toContain('nhỏ quá');
  });
});
